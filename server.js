const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

const SMTP_KEY = process.env.SMTP_KEY || crypto.randomBytes(32).toString('hex');
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
let redisClient = null;
let redisPubClient = null;
let redisSubClient = null;
const SALT_ROUNDS = 10;

async function initRedis() {
  try {
    redisClient = createClient({ url: REDIS_URL });
    redisClient.on('error', (err) => console.error('Redis Client Error', err));
    await redisClient.connect();
    redisPubClient = redisClient.duplicate();
    redisSubClient = redisClient.duplicate();
    await redisPubClient.connect();
    await redisSubClient.connect();
    io.adapter(createAdapter(redisPubClient, redisSubClient));
    console.log('✓ Redis connected');
    return true;
  } catch (err) {
    console.warn('Redis connection failed:', err.message);
    console.log('Running without Redis (single server mode)');
    return false;
  }
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

const DATA_DIR = path.join(__dirname, 'data');
const ACCOUNTS_FILE = path.join(DATA_DIR, 'accounts.json');
const LEADERBOARD_FILE = path.join(DATA_DIR, 'leaderboard.json');
const SAVEFILES_DIR = path.join(DATA_DIR, 'savefiles');
const STORIES_FILE = path.join(DATA_DIR, 'stories.json');
const FORUM_FILE = path.join(DATA_DIR, 'forum.json');
const PASSWORD_RESETS_FILE = path.join(DATA_DIR, 'password_resets.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(SAVEFILES_DIR)) fs.mkdirSync(SAVEFILES_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOADS_DIR));
function loadJSON(file, defaultValue = {}) {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (e) {
    console.error(`Error loading ${file}:`, e);
  }
  return defaultValue;
}

function saveJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    console.error(`Error saving ${file}:`, e);
    return false;
  }
}

const DB = {
  accounts: loadJSON(ACCOUNTS_FILE, {}),
  leaderboard: loadJSON(LEADERBOARD_FILE, []),
  stories: loadJSON(STORIES_FILE, {}),
  forum: loadJSON(FORUM_FILE, { boards: [], threads: [], posts: [] }),
  passwordResets: loadJSON(PASSWORD_RESETS_FILE, {})
};

setInterval(() => {
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  saveJSON(LEADERBOARD_FILE, DB.leaderboard);
  saveJSON(STORIES_FILE, DB.stories);
  saveJSON(FORUM_FILE, DB.forum);
  saveJSON(PASSWORD_RESETS_FILE, DB.passwordResets);
}, 30000);

async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

async function createAccount(email, username, password, displayName) {
  for (const key in DB.accounts) {
    if (DB.accounts[key].email === email.toLowerCase()) {
      return { error: 'Email already registered' };
    }
    if (DB.accounts[key].username === username) {
      return { error: 'Username already exists' };
    }
  }

  if (!email.includes('@') || !email.includes('.')) {
    return { error: 'Invalid email address' };
  }

  if (username.length < 3 || username.length > 20) {
    return { error: 'Username must be 3-20 characters' };
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' };
  }

  const account = {
    email: email.toLowerCase(),
    username,
    passwordHash: await hashPassword(password),
    displayName: displayName || username,
    createdAt: Date.now(),
    lastLogin: Date.now(),
    token: generateToken(),
    isEmailVerified: false,
    verificationToken: generateToken(),
    stats: {
      totalRaces: 0,
      wins: 0,
      totalAccuracy: 0,
      bestAccuracy: 0,
      totalTime: 0,
      crashes: 0,
      perfectStages: 0,
      eraProgress: {
        grpb: { completed: 0, bestTime: null, unlocked: true },
        w90: { completed: 0, bestTime: null, unlocked: false },
        w24: { completed: 0, bestTime: null, unlocked: false }
      },
      careerLevel: 1,
      experience: 0,
      rank: 'Novice'
    },
    achievements: [],
    friends: [],
    blockedUsers: [],
    settings: {
      coDriverStyle: 'calm',
      audioEnabled: true,
      notifications: true,
      theme: 'default',
      showOnlineStatus: true
    },
    profile: {
      bio: '',
      location: '',
      favoriteCar: '',
      favoriteStage: '',
      joinedAt: Date.now(),
      displayStyle: {
        fontFamily: 'Bebas Neue',
        color: '#f5c518',
        effects: [], // glow, rainbow, fire, etc.
        badge: null,
        avatar: null,
        background: null,
        signature: ''
      },
      social: {
        youtube: '',
        twitch: '',
        twitter: '',
        discord: ''
      },
      stats: {
        reputation: 0,
        upvotesReceived: 0,
        postsMade: 0,
        threadsCreated: 0
      }
    }
  };
  
  DB.accounts[username] = account;
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  createSavefile(username);
  
  return { success: true, account: sanitizeAccount(account), token: account.token };
}

async function login(emailOrUsername, password) {
  let account = null;

  if (emailOrUsername.includes('@')) {
    for (const key in DB.accounts) {
      if (DB.accounts[key].email === emailOrUsername.toLowerCase()) {
        account = DB.accounts[key];
        break;
      }
    }
  } else {
    account = DB.accounts[emailOrUsername];
  }

  if (!account) {
    return { error: 'Invalid email/username or password' };
  }

  const isValidPassword = await verifyPassword(password, account.passwordHash);
  if (!isValidPassword) {
    return { error: 'Invalid email/username or password' };
  }
  
  account.lastLogin = Date.now();
  account.token = generateToken();
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  
  return { success: true, account: sanitizeAccount(account), token: account.token };
}
function encryptSmtpPassword(password) {
  if (!password) return null;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SMTP_KEY, 'hex'), iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decryptSmtpPassword(encrypted) {
  if (!encrypted) return null;
  try {
    const parts = encrypted.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedPass = parts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SMTP_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedPass, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (e) {
    return null;
  }
}
async function sendPlayerEmail(account, subject, htmlContent) {
  if (!account.smtpSettings) {
    return { error: 'No SMTP configured. Please set up email in Account Settings.' };
  }
  
  const { host, port, user, pass, from } = account.smtpSettings;
  const decryptedPass = decryptSmtpPassword(pass);
  
  if (!decryptedPass) {
    return { error: 'Invalid SMTP password encryption' };
  }
  
  const transporter = nodemailer.createTransporter({
    host: host,
    port: parseInt(port) || 587,
    secure: (parseInt(port) || 587) === 465,
    auth: {
      user: user,
      pass: decryptedPass
    }
  });
  
  try {
    await transporter.sendMail({
      from: from || user,
      to: account.email,
      subject: subject,
      html: htmlContent
    });
    return { success: true };
  } catch (error) {
    return { error: 'Email failed: ' + error.message };
  }
}
async function requestPasswordReset(email) {
  let account = null;
  let username = null;
  
  for (const key in DB.accounts) {
    if (DB.accounts[key].email === email.toLowerCase()) {
      account = DB.accounts[key];
      username = key;
      break;
    }
  }
  
  if (!account) {
    return { error: 'No account found with this email' };
  }
  if (!account.smtpSettings) {
    return { 
      error: 'Email not configured',
      message: 'Please go to Account Settings > Email Setup to configure your SMTP settings first.'
    };
  }
  
  const resetToken = generateToken();
  const expiresAt = Date.now() + 3600000; // 1 hour
  
  DB.passwordResets[resetToken] = {
    username,
    email,
    expiresAt,
    used: false
  };
  
  saveJSON(PASSWORD_RESETS_FILE, DB.passwordResets);
  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
  const emailResult = await sendPlayerEmail(
    account,
    'Rally Pacenote Academy - Password Reset',
    `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#1a1a2e;color:#fff;">
      <h2 style="color:#f5c518;">Password Reset Request</h2>
      <p>Hello ${account.displayName || username},</p>
      <p>You requested a password reset for your Rally Pacenote Academy account.</p>
      <p><strong>Reset Token:</strong> <code style="background:#252540;padding:5px 10px;border-radius:4px;">${resetToken}</code></p>
      <p style="margin-top:20px;">
        <a href="${resetUrl}" style="background:#f5c518;color:#0a0a0c;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;font-weight:bold;">Reset Password</a>
      </p>
      <p style="font-size:12px;color:#888;margin-top:30px;">
        This link expires in 1 hour. If you didn't request this, please ignore this email.<br>
        Rally Pacenote Academy
      </p>
    </div>`
  );
  
  if (!emailResult.success) {
    return { 
      error: 'Failed to send email: ' + emailResult.error,
      message: 'Check your SMTP settings in Account Settings > Email Setup'
    };
  }
  
  return { success: true, message: 'Password reset link sent to your email' };
}

async function resetPassword(resetToken, newPassword) {
  const resetData = DB.passwordResets[resetToken];

  if (!resetData) {
    return { error: 'Invalid or expired reset token' };
  }

  if (resetData.used) {
    return { error: 'This reset link has already been used' };
  }

  if (Date.now() > resetData.expiresAt) {
    return { error: 'Reset link has expired' };
  }

  if (newPassword.length < 6) {
    return { error: 'Password must be at least 6 characters' };
  }

  const account = DB.accounts[resetData.username];

  if (!account) {
    return { error: 'Account not found' };
  }

  account.passwordHash = await hashPassword(newPassword);
  resetData.used = true;
  
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  saveJSON(PASSWORD_RESETS_FILE, DB.passwordResets);
  
  return { success: true, message: 'Password reset successfully' };
}

function updateProfile(username, updates) {
  const account = DB.accounts[username];
  if (!account) return { error: 'Account not found' };
  if (updates.displayName && updates.displayName.length >= 2 && updates.displayName.length <= 30) {
    account.displayName = updates.displayName;
  }
  if (updates.profilePicture && updates.profilePicture.startsWith('data:image')) {
    try {
      const base64Data = updates.profilePicture.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const ext = updates.profilePicture.match(/\/([^;]+);/)?.[1] || 'png';
      const filename = `avatar_${username}_${Date.now()}.${ext}`;
      const filepath = path.join(UPLOADS_DIR, filename);
      fs.writeFileSync(filepath, buffer);
      if (account.profile?.avatarUrl) {
        const oldFile = path.join(__dirname, account.profile.avatarUrl);
        if (fs.existsSync(oldFile) && oldFile.includes('avatar_')) {
          fs.unlinkSync(oldFile);
        }
      }
      
      if (!account.profile) account.profile = {};
      account.profile.avatarUrl = `/uploads/${filename}`;
      delete updates.profilePicture; // Remove from updates
    } catch (e) {
      console.error('Error saving profile picture:', e);
    }
  }
  if (updates.banner && updates.banner.startsWith('data:image')) {
    try {
      const base64Data = updates.banner.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const ext = updates.banner.match(/\/([^;]+);/)?.[1] || 'png';
      const filename = `banner_${username}_${Date.now()}.${ext}`;
      const filepath = path.join(UPLOADS_DIR, filename);
      fs.writeFileSync(filepath, buffer);
      if (account.profile?.bannerUrl) {
        const oldFile = path.join(__dirname, account.profile.bannerUrl);
        if (fs.existsSync(oldFile) && oldFile.includes('banner_')) {
          fs.unlinkSync(oldFile);
        }
      }
      
      if (!account.profile) account.profile = {};
      account.profile.bannerUrl = `/uploads/${filename}`;
      delete updates.banner; // Remove from updates
    } catch (e) {
      console.error('Error saving banner:', e);
    }
  }
  if (updates.profile) {
    account.profile = { ...account.profile, ...updates.profile };
  }
  if (updates.displayStyle) {
    if (!account.profile) account.profile = {};
    account.profile.displayStyle = { ...account.profile.displayStyle, ...updates.displayStyle };
  }
  if (updates.settings) {
    account.settings = { ...account.settings, ...updates.settings };
  }
  
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  
  return { success: true, account: sanitizeAccount(account) };
}

function authenticate(token) {
  for (const username in DB.accounts) {
    if (DB.accounts[username].token === token) {
      return DB.accounts[username];
    }
  }
  return null;
}

function sanitizeAccount(account) {
  const { passwordHash, token, verificationToken, ...safe } = account;
  return safe;
}

function sanitizePublicProfile(account) {
  return {
    username: account.username,
    displayName: account.displayName,
    profile: account.profile,
    stats: account.stats,
    achievements: account.achievements,
    rank: account.stats?.rank || 'Novice',
    level: account.stats?.careerLevel || 1,
    isOnline: (Date.now() - account.lastLogin) < 300000 // Online if active in last 5 min
  };
}

function updateStats(username, raceData) {
  const account = DB.accounts[username];
  if (!account) return;
  
  const stats = account.stats;
  stats.totalRaces++;
  
  if (raceData.position === 1) stats.wins++;
  if (raceData.accuracy === 100) stats.perfectStages++;
  
  stats.totalAccuracy = ((stats.totalAccuracy * (stats.totalRaces - 1)) + raceData.accuracy) / stats.totalRaces;
  if (raceData.accuracy > stats.bestAccuracy) stats.bestAccuracy = raceData.accuracy;
  
  stats.totalTime += raceData.time;
  stats.crashes += raceData.crashes || 0;
  const xpGain = Math.floor(raceData.accuracy * (raceData.position === 1 ? 2 : 1));
  stats.experience += xpGain;
  const xpNeeded = stats.careerLevel * 1000;
  if (stats.experience >= xpNeeded) {
    stats.careerLevel++;
    stats.experience -= xpNeeded;
  }
  stats.rank = calculateRank(stats.careerLevel);
  if (raceData.era && raceData.accuracy >= 70) {
    const era = stats.eraProgress[raceData.era];
    if (era) {
      era.completed++;
      if (era.completed >= 3 && raceData.era === 'grpb') {
        stats.eraProgress.w90.unlocked = true;
      }
      if (era.completed >= 3 && raceData.era === 'w90') {
        stats.eraProgress.w24.unlocked = true;
      }
    }
  }
  
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  updateLeaderboard(username, stats);
}

function calculateRank(level) {
  if (level >= 50) return 'Legend';
  if (level >= 40) return 'Master';
  if (level >= 30) return 'Pro';
  if (level >= 20) return 'Expert';
  if (level >= 10) return 'Advanced';
  return 'Novice';
}

function getSavefilePath(username) {
  return path.join(SAVEFILES_DIR, `${username}.json`);
}

function createSavefile(username) {
  const savefile = {
    username,
    createdAt: Date.now(),
    lastSave: Date.now(),
    career: {
      currentStage: 0,
      completedStages: [],
      championships: [],
      garage: ['starter'],
      tuningPresets: {}
    },
    training: {
      completedLessons: [],
      quizScores: {},
      bestTimes: {}
    },
    multiplayer: {
      rating: 1000,
      gamesPlayed: 0,
      winStreak: 0
    }
  };
  
  fs.writeFileSync(getSavefilePath(username), JSON.stringify(savefile, null, 2));
  return savefile;
}

function loadSavefile(username) {
  const filepath = getSavefilePath(username);
  if (!fs.existsSync(filepath)) {
    return createSavefile(username);
  }
  
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (e) {
    return createSavefile(username);
  }
}

function saveSavefile(username, data) {
  data.lastSave = Date.now();
  fs.writeFileSync(getSavefilePath(username), JSON.stringify(data, null, 2));
  return true;
}

function updateLeaderboard(username, stats) {
  const entry = {
    username,
    displayName: DB.accounts[username]?.displayName || username,
    rank: stats.rank,
    level: stats.careerLevel,
    experience: stats.experience,
    totalRaces: stats.totalRaces,
    wins: stats.wins,
    winRate: stats.totalRaces > 0 ? Math.round((stats.wins / stats.totalRaces) * 100) : 0,
    bestAccuracy: stats.bestAccuracy,
    perfectStages: stats.perfectStages,
    lastUpdated: Date.now()
  };
  DB.leaderboard = DB.leaderboard.filter(e => e.username !== username);
  DB.leaderboard.push(entry);
  DB.leaderboard.sort((a, b) => (b.level * 1000 + b.experience) - (a.level * 1000 + a.experience));
  
  saveJSON(LEADERBOARD_FILE, DB.leaderboard);
}

function getLeaderboard(page = 1, perPage = 50) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  return {
    total: DB.leaderboard.length,
    page,
    perPage,
    entries: DB.leaderboard.slice(start, end).map((e, i) => ({
      rank: start + i + 1,
      ...e
    }))
  };
}

function getPlayerRank(username) {
  const index = DB.leaderboard.findIndex(e => e.username === username);
  return index >= 0 ? index + 1 : null;
}
const lobbies = new Map();
const players = new Map();

function createLobby(hostId, hostName, settings = {}) {
  const lobbyCode = generateLobbyCode();
  const lobby = {
    code: lobbyCode,
    hostId: hostId,
    players: new Map(),
    settings: {
      era: settings.era || 'grpb',
      stage: settings.stage || null,
      maxPlayers: settings.maxPlayers || 4,
      private: settings.private || false,
      ...settings
    },
    state: 'waiting', // waiting, countdown, racing, finished
    raceData: {
      startTime: null,
      stageNotes: null,
      results: new Map()
    }
  };
  
  lobbies.set(lobbyCode, lobby);
  return lobby;
}

function generateLobbyCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function joinLobby(lobbyCode, playerId, playerName) {
  const lobby = lobbies.get(lobbyCode);
  if (!lobby) return { error: 'Lobby not found' };
  if (lobby.players.size >= lobby.settings.maxPlayers) return { error: 'Lobby full' };
  if (lobby.state !== 'waiting') return { error: 'Race already in progress' };
  
  const player = {
    id: playerId,
    name: playerName,
    ready: false,
    connected: true,
    joinTime: Date.now()
  };
  
  lobby.players.set(playerId, player);
  return { success: true, lobby };
}

function leaveLobby(lobbyCode, playerId) {
  const lobby = lobbies.get(lobbyCode);
  if (!lobby) return;
  
  lobby.players.delete(playerId);
  if (lobby.players.size === 0) {
    lobbies.delete(lobbyCode);
    return;
  }
  if (lobby.hostId === playerId) {
    const newHost = lobby.players.values().next().value;
    if (newHost) {
      lobby.hostId = newHost.id;
    }
  }
  
  return lobby;
}

function startRace(lobbyCode) {
  const lobby = lobbies.get(lobbyCode);
  if (!lobby) return { error: 'Lobby not found' };
  const notReady = Array.from(lobby.players.values()).filter(p => !p.ready);
  if (notReady.length > 0) {
    return { error: 'Not all players ready' };
  }
  
  lobby.state = 'countdown';
  const stageNotes = generateStageNotes(lobby.settings);
  lobby.raceData.stageNotes = stageNotes;
  
  return { success: true, stageNotes };
}

function generateStageNotes(settings) {
  const { era } = settings;
  const notes = [];
  const baseNotes = getBaseNotesForEra(era);
  const shuffled = [...baseNotes].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 32; i++) {
    notes.push(shuffled[i % shuffled.length]);
  }
  
  return notes;
}

function getBaseNotesForEra(era) {
  const pools = {
    grpb: [
      { raw: 'R3 EASY', ans: 'right three easy' },
      { raw: 'L4 150', ans: 'left four 150 metres' },
      { raw: 'R2 INTO L3', ans: 'right two into left three' },
      { raw: 'FLAT R5', ans: 'flat right five' },
      { raw: 'L2! OPENS', ans: 'left two caution opens' },
      { raw: 'R3 CREST', ans: 'right three over crest' },
      { raw: 'SQUARE R', ans: 'square right' },
      { raw: 'L3 LONG', ans: 'left three long' }
    ],
    w90: [
      { raw: 'R4 100', ans: 'right four 100 metres' },
      { raw: 'L3 INTO R4', ans: 'left three into right four' },
      { raw: 'R5 FLAT', ans: 'right five flat' },
      { raw: 'L2!', ans: 'left two caution' },
      { raw: 'R3 TIGHTENS', ans: 'right three tightens' },
      { raw: 'CREST L4', ans: 'over crest left four' },
      { raw: 'R6 LONG', ans: 'right six long' },
      { raw: 'L3 DONTCUT', ans: "left three don't cut" }
    ],
    w24: [
      { raw: 'R5 REGEN', ans: 'right five regen' },
      { raw: 'L4 80', ans: 'left four 80 metres' },
      { raw: 'R3 INTO L4', ans: 'right three into left four' },
      { raw: 'HYBRID L5', ans: 'hybrid left five' },
      { raw: 'R2!!', ans: 'right two maximum caution' },
      { raw: 'L6 FLAT', ans: 'left six flat' },
      { raw: 'R4 JUMP', ans: 'right four jump' },
      { raw: 'L3 ICE', ans: 'left three ice' }
    ]
  };
  
  return pools[era] || pools.grpb;
}

const RedisLobbyStore = {
  async saveLobby(lobby) {
    if (!redisClient) return false;
    try {
      const key = `lobby:${lobby.code}`;
      await redisClient.setEx(key, 1800, JSON.stringify(lobby)); // 30 min TTL
      return true;
    } catch (e) {
      console.error('Redis save lobby error:', e);
      return false;
    }
  },
  async getLobby(lobbyCode) {
    if (!redisClient) return null;
    try {
      const key = `lobby:${lobbyCode.toUpperCase()}`;
      const data = await redisClient.get(key);
      if (data) {
        const lobby = JSON.parse(data);
        lobby.players = new Map(Object.entries(lobby.players));
        return lobby;
      }
      return null;
    } catch (e) {
      console.error('Redis get lobby error:', e);
      return null;
    }
  },
  async deleteLobby(lobbyCode) {
    if (!redisClient) return false;
    try {
      await redisClient.del(`lobby:${lobbyCode.toUpperCase()}`);
      return true;
    } catch (e) {
      return false;
    }
  },
  async getAllLobbies() {
    if (!redisClient) return [];
    try {
      const keys = await redisClient.keys('lobby:*');
      const lobbies = [];
      for (const key of keys) {
        const data = await redisClient.get(key);
        if (data) {
          const lobby = JSON.parse(data);
          lobby.players = new Map(Object.entries(lobby.players));
          lobbies.push(lobby);
        }
      }
      return lobbies;
    } catch (e) {
      return [];
    }
  }
};
const MatchmakingQueue = {
  async addPlayer(playerData) {
    if (!redisClient) return { error: 'Redis not available' };
    try {
      const queueKey = `queue:${playerData.era || 'any'}`;
      const playerEntry = {
        ...playerData,
        timestamp: Date.now(),
        socketId: playerData.socketId
      };
      await redisClient.lPush(queueKey, JSON.stringify(playerEntry));
      await redisClient.expire(queueKey, 300); // 5 min TTL
      return { success: true };
    } catch (e) {
      return { error: e.message };
    }
  },
  async findMatch(era, playerSocketId) {
    if (!redisClient) return null;
    try {
      const queueKey = `queue:${era || 'any'}`;
      const queueLength = await redisClient.lLen(queueKey);
      
      if (queueLength < 2) return null; // Need at least 2 players
      const entries = await redisClient.lRange(queueKey, 0, -1);
      
      for (const entry of entries) {
        const player = JSON.parse(entry);
        if (player.socketId !== playerSocketId) {
          await redisClient.lRem(queueKey, 0, entry);
          return player;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  },
  async removePlayer(socketId, era) {
    if (!redisClient) return;
    try {
      const queueKey = `queue:${era || 'any'}`;
      const entries = await redisClient.lRange(queueKey, 0, -1);
      for (const entry of entries) {
        const player = JSON.parse(entry);
        if (player.socketId === socketId) {
          await redisClient.lRem(queueKey, 0, entry);
          break;
        }
      }
    } catch (e) {}
  },
  async getStats() {
    if (!redisClient) return {};
    try {
      const keys = await redisClient.keys('queue:*');
      const stats = {};
      for (const key of keys) {
        const era = key.replace('queue:', '');
        stats[era] = await redisClient.lLen(key);
      }
      return stats;
    } catch (e) {
      return {};
    }
  }
};

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);
  players.set(socket.id, {
    id: socket.id,
    name: null,
    lobbyCode: null,
    inMatchmaking: false
  });
  
  socket.on('create-lobby', (data, callback) => {
    const { playerName, settings } = data;
    const player = players.get(socket.id);
    player.name = playerName;
    if (player.lobbyCode) {
      leaveLobby(player.lobbyCode, socket.id);
      socket.leave(player.lobbyCode);
    }
    
    const lobby = createLobby(socket.id, playerName, settings);
    player.lobbyCode = lobby.code;
    joinLobby(lobby.code, socket.id, playerName);
    socket.join(lobby.code);
    
    console.log(`Lobby created: ${lobby.code} by ${playerName}`);
    callback({ success: true, lobbyCode: lobby.code, lobby: serializeLobby(lobby) });
  });
  
  socket.on('join-lobby', (data, callback) => {
    const { lobbyCode, playerName } = data;
    const player = players.get(socket.id);
    player.name = playerName;
    if (player.lobbyCode) {
      leaveLobby(player.lobbyCode, socket.id);
      socket.leave(player.lobbyCode);
    }
    
    const result = joinLobby(lobbyCode.toUpperCase(), socket.id, playerName);
    
    if (result.error) {
      callback({ success: false, error: result.error });
      return;
    }
    
    player.lobbyCode = lobbyCode.toUpperCase();
    socket.join(lobbyCode.toUpperCase());
    
    const lobby = lobbies.get(lobbyCode.toUpperCase());
    socket.to(lobbyCode.toUpperCase()).emit('player-joined', {
      player: serializePlayer(result.lobby.players.get(socket.id))
    });
    
    console.log(`${playerName} joined lobby: ${lobbyCode}`);
    callback({ success: true, lobby: serializeLobby(lobby) });
  });
  
  socket.on('leave-lobby', () => {
    const player = players.get(socket.id);
    if (player && player.lobbyCode) {
      const lobby = leaveLobby(player.lobbyCode, socket.id);
      socket.leave(player.lobbyCode);
      
      if (lobby) {
        io.to(player.lobbyCode).emit('player-left', { playerId: socket.id });
        io.to(player.lobbyCode).emit('lobby-updated', { lobby: serializeLobby(lobby) });
      }
      
      player.lobbyCode = null;
    }
  });
  
  socket.on('set-ready', (data) => {
    const player = players.get(socket.id);
    if (!player || !player.lobbyCode) return;
    
    const lobby = lobbies.get(player.lobbyCode);
    if (!lobby) return;
    
    const lobbyPlayer = lobby.players.get(socket.id);
    if (lobbyPlayer) {
      lobbyPlayer.ready = data.ready;
      io.to(player.lobbyCode).emit('player-ready', { 
        playerId: socket.id, 
        ready: data.ready 
      });
      io.to(player.lobbyCode).emit('lobby-updated', { lobby: serializeLobby(lobby) });
    }
  });
  
  socket.on('update-lobby-settings', (data) => {
    const player = players.get(socket.id);
    if (!player || !player.lobbyCode) return;
    
    const lobby = lobbies.get(player.lobbyCode);
    if (!lobby || lobby.hostId !== socket.id) return;
    
    lobby.settings = { ...lobby.settings, ...data };
    io.to(player.lobbyCode).emit('lobby-settings-updated', { settings: lobby.settings });
  });
  
  socket.on('start-race', (callback) => {
    const player = players.get(socket.id);
    if (!player || !player.lobbyCode) {
      callback({ success: false, error: 'Not in a lobby' });
      return;
    }
    
    const lobby = lobbies.get(player.lobbyCode);
    if (!lobby || lobby.hostId !== socket.id) {
      callback({ success: false, error: 'Only host can start race' });
      return;
    }
    
    const result = startRace(player.lobbyCode);
    if (result.error) {
      callback({ success: false, error: result.error });
      return;
    }
    io.to(player.lobbyCode).emit('race-countdown', { 
      countdown: 3,
      stageNotes: result.stageNotes 
    });
    setTimeout(() => {
      lobby.state = 'racing';
      lobby.raceData.startTime = Date.now();
      io.to(player.lobbyCode).emit('race-start', { 
        startTime: lobby.raceData.startTime,
        stageNotes: result.stageNotes
      });
    }, 3000);
    
    callback({ success: true });
  });
  
  socket.on('submit-note-result', (data) => {
    const player = players.get(socket.id);
    if (!player || !player.lobbyCode) return;
    
    const lobby = lobbies.get(player.lobbyCode);
    if (!lobby || lobby.state !== 'racing') return;
    socket.to(player.lobbyCode).emit('player-progress', {
      playerId: socket.id,
      playerName: player.name,
      noteIndex: data.noteIndex,
      correct: data.correct,
      totalNotes: data.totalNotes
    });
  });
  
  socket.on('finish-race', (data) => {
    const player = players.get(socket.id);
    if (!player || !player.lobbyCode) return;
    
    const lobby = lobbies.get(player.lobbyCode);
    if (!lobby) return;
    lobby.raceData.results.set(socket.id, {
      playerId: socket.id,
      playerName: player.name,
      finishTime: Date.now(),
      correctNotes: data.correctNotes,
      totalNotes: data.totalNotes,
      crashCount: data.crashCount,
      totalTime: data.totalTime,
      dnf: data.dnf || false
    });
    io.to(player.lobbyCode).emit('player-finished', {
      playerId: socket.id,
      playerName: player.name,
      result: lobby.raceData.results.get(socket.id)
    });
    if (lobby.raceData.results.size >= lobby.players.size) {
      lobby.state = 'finished';
      const results = Array.from(lobby.raceData.results.values());
      results.sort((a, b) => {
        if (a.dnf && !b.dnf) return 1;
        if (!a.dnf && b.dnf) return -1;
        if (a.dnf && b.dnf) return 0;
        return a.finishTime - b.finishTime;
      });
      
      io.to(player.lobbyCode).emit('race-complete', { results });
    }
  });
  
  socket.on('request-rematch', () => {
    const player = players.get(socket.id);
    if (!player || !player.lobbyCode) return;
    
    const lobby = lobbies.get(player.lobbyCode);
    if (!lobby) return;
    lobby.state = 'waiting';
    lobby.raceData = {
      startTime: null,
      stageNotes: null,
      results: new Map()
    };
    lobby.players.forEach(p => p.ready = false);
    
    io.to(player.lobbyCode).emit('rematch-available', { 
      lobby: serializeLobby(lobby) 
    });
  });
  
  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    
    const player = players.get(socket.id);
    if (player && player.lobbyCode) {
      const lobby = leaveLobby(player.lobbyCode, socket.id);
      if (lobby) {
        io.to(player.lobbyCode).emit('player-disconnected', { 
          playerId: socket.id,
          playerName: player.name 
        });
        io.to(player.lobbyCode).emit('lobby-updated', { 
          lobby: serializeLobby(lobby) 
        });
      }
    }
    
    players.delete(socket.id);
  });
});

function serializeLobby(lobby) {
  return {
    code: lobby.code,
    hostId: lobby.hostId,
    players: Array.from(lobby.players.values()).map(serializePlayer),
    settings: lobby.settings,
    state: lobby.state,
    raceData: lobby.state === 'finished' ? {
      results: Array.from(lobby.raceData.results.values())
    } : null
  };
}

function serializePlayer(player) {
  return {
    id: player.id,
    name: player.name,
    ready: player.ready,
    connected: player.connected
  };
}

app.post('/api/register', async (req, res) => {
  const { email, username, password, displayName } = req.body;
  const result = await createAccount(email, username, password, displayName);
  res.json(result);
});

app.post('/api/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;
  const result = await login(emailOrUsername, password);
  res.json(result);
});

app.get('/api/account', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ account: sanitizeAccount(account) });
});

app.post('/api/account/update', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { displayName, settings } = req.body;
  if (displayName) account.displayName = displayName;
  if (settings) account.settings = { ...account.settings, ...settings };
  
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  res.json({ success: true, account: sanitizeAccount(account) });
});

app.post('/api/account/profile', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const result = updateProfile(account.username, req.body);
  res.json(result);
});

app.get('/api/account/profile/:username', (req, res) => {
  const { username } = req.params;
  const account = DB.accounts[username];
  if (!account) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({ profile: sanitizePublicProfile(account) });
});
app.post('/api/account/smtp', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { host, port, user, pass, from } = req.body;
  
  if (!host || !port || !user || !pass) {
    return res.status(400).json({ error: 'Missing required SMTP settings' });
  }
  
  account.smtpSettings = {
    host,
    port: parseInt(port) || 587,
    user,
    pass: encryptSmtpPassword(pass),
    from: from || user,
    updatedAt: Date.now()
  };
  
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  res.json({ success: true, message: 'SMTP settings saved' });
});

app.get('/api/account/smtp', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  if (!account.smtpSettings) {
    return res.json({ configured: false });
  }
  res.json({
    configured: true,
    host: account.smtpSettings.host,
    port: account.smtpSettings.port,
    user: account.smtpSettings.user,
    from: account.smtpSettings.from,
    updatedAt: account.smtpSettings.updatedAt
  });
});
app.post('/api/account/smtp/test', async (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  if (!account.smtpSettings) {
    return res.status(400).json({ error: 'SMTP not configured' });
  }
  
  const result = await sendPlayerEmail(
    account,
    'Test Email - Rally Pacenote Academy',
    '<p>This is a test email from Rally Pacenote Academy. Your SMTP settings are working!</p>'
  );
  
  res.json(result);
});
app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  const result = await requestPasswordReset(email);
  res.json(result);
});

app.post('/api/auth/reset-password', (req, res) => {
  const { resetToken, newPassword } = req.body;
  const result = resetPassword(resetToken, newPassword);
  res.json(result);
});
app.post('/api/account/delete', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { password } = req.body;
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  if (passwordHash !== account.passwordHash) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  const username = account.username;
  const savefilePath = path.join(SAVEFILES_DIR, `${username}.json`);
  if (fs.existsSync(savefilePath)) {
    fs.unlinkSync(savefilePath);
  }
  if (account.profile?.avatarUrl) {
    const avatarPath = path.join(__dirname, account.profile.avatarUrl);
    if (fs.existsSync(avatarPath)) fs.unlinkSync(avatarPath);
  }
  if (account.profile?.bannerUrl) {
    const bannerPath = path.join(__dirname, account.profile.bannerUrl);
    if (fs.existsSync(bannerPath)) fs.unlinkSync(bannerPath);
  }
  delete DB.accounts[username];
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  
  res.json({ success: true, message: 'Account deleted successfully' });
});
app.get('/api/matchmaking/stats', async (req, res) => {
  const stats = await MatchmakingQueue.getStats();
  res.json({ stats, redisConnected: !!redisClient });
});

app.post('/api/matchmaking/join', async (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { era, socketId } = req.body;
  const result = await MatchmakingQueue.addPlayer({
    username: account.username,
    displayName: account.displayName,
    era: era || 'any',
    socketId: socketId || null,
    timestamp: Date.now()
  });
  
  res.json(result);
});

app.post('/api/matchmaking/leave', async (req, res) => {
  const { socketId, era } = req.body;
  await MatchmakingQueue.removePlayer(socketId, era);
  res.json({ success: true });
});
app.get('/api/lobbies', async (req, res) => {
  if (redisClient) {
    const lobbies = await RedisLobbyStore.getAllLobbies();
    res.json({ lobbies, source: 'redis' });
  } else {
    const lobbies = Array.from(lobbies.values());
    res.json({ lobbies, source: 'memory' });
  }
});
app.post('/api/feedback', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!message || message.length < 5) {
    return res.status(400).json({ error: 'Message too short' });
  }
  const feedbackEntry = {
    timestamp: new Date().toISOString(),
    name: name || 'Anonymous',
    email: email || 'not provided',
    message: message.substring(0, 2000) // Limit length
  };
  const feedbackLogPath = path.join(__dirname, 'data', 'feedback.json');
  try {
    let feedbacks = [];
    if (fs.existsSync(feedbackLogPath)) {
      const data = fs.readFileSync(feedbackLogPath, 'utf8');
      feedbacks = JSON.parse(data);
    }
    feedbacks.push(feedbackEntry);
    fs.writeFileSync(feedbackLogPath, JSON.stringify(feedbacks, null, 2));
  } catch (e) {
    console.error('Failed to save feedback log:', e);
  }
  const creatorEmail = process.env.CREATOR_EMAIL || 'aevaliisa@gmail.com';
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransporter({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: (parseInt(process.env.SMTP_PORT) || 587) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });
      
      await transporter.sendMail({
        from: `"Rally Academy Feedback" <${smtpUser}>`,
        to: creatorEmail,
        replyTo: email || smtpUser,
        subject: `🎮 Game Feedback from ${name || 'Anonymous'}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#1a1a2e;color:#fff;">
            <h2 style="color:#f5c518;">💬 New Feedback Received</h2>
            <p><strong>From:</strong> ${name || 'Anonymous'}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <hr style="border-color:#333;margin:20px 0;">
            <p style="white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            <hr style="border-color:#333;margin:20px 0;">
            <p style="font-size:12px;color:#888;">
              Rally Pacenote Academy Feedback System<br>
              This message was sent from the game feedback form.
            </p>
          </div>
        `,
        text: `Feedback from ${name || 'Anonymous'} (${email || 'no email'}):\n\n${message}`
      });
      
      console.log('✓ Feedback email sent to', creatorEmail);
    } catch (emailError) {
      console.error('Failed to send feedback email:', emailError.message);
    }
  } else {
    console.log('ℹ️ Feedback received (email not sent - SMTP not configured). Check data/feedback.json');
  }
  
  res.json({ success: true, message: 'Feedback received. Thank you!' });
});
app.get('/api/savefile', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const savefile = loadSavefile(account.username);
  res.json({ savefile });
});

app.post('/api/savefile', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const currentSave = loadSavefile(account.username);
  const newSave = { ...currentSave, ...req.body, username: account.username };
  
  if (saveSavefile(account.username, newSave)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to save' });
  }
});
app.get('/api/leaderboard', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 50;
  res.json(getLeaderboard(page, perPage));
});

app.get('/api/leaderboard/rank', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const rank = getPlayerRank(account.username);
  res.json({ rank, total: DB.leaderboard.length });
});

function createForumBoard(name, description, category) {
  const board = {
    id: 'board_' + generateToken().substring(0, 8),
    name,
    description,
    category,
    createdAt: Date.now(),
    threadCount: 0,
    postCount: 0,
    moderators: []
  };
  DB.forum.boards.push(board);
  saveJSON(FORUM_FILE, DB.forum);
  return board;
}

function createForumThread(boardId, title, content, author) {
  const board = DB.forum.boards.find(b => b.id === boardId);
  if (!board) return { error: 'Board not found' };
  
  const thread = {
    id: 'thread_' + generateToken().substring(0, 12),
    boardId,
    title,
    content,
    author: author.username,
    authorDisplayName: author.displayName,
    authorStyle: author.profile?.displayStyle || {},
    createdAt: Date.now(),
    updatedAt: Date.now(),
    views: 0,
    upvotes: 0,
    downvotes: 0,
    voteScore: 0,
    isPinned: false,
    isLocked: false,
    replyCount: 0,
    tags: []
  };
  
  DB.forum.threads.push(thread);
  board.threadCount++;
  const account = DB.accounts[author.username];
  if (account) {
    account.profile.stats.threadsCreated++;
  }
  
  saveJSON(FORUM_FILE, DB.forum);
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  
  return { success: true, thread };
}

function createForumPost(threadId, content, author, parentId = null) {
  const thread = DB.forum.threads.find(t => t.id === threadId);
  if (!thread) return { error: 'Thread not found' };
  
  if (thread.isLocked) return { error: 'Thread is locked' };
  
  const post = {
    id: 'post_' + generateToken().substring(0, 16),
    threadId,
    parentId, // For nested replies
    content,
    author: author.username,
    authorDisplayName: author.displayName,
    authorStyle: author.profile?.displayStyle || {},
    createdAt: Date.now(),
    updatedAt: Date.now(),
    upvotes: 0,
    downvotes: 0,
    voteScore: 0,
    isEdited: false,
    isDeleted: false
  };
  
  DB.forum.posts.push(post);
  thread.replyCount++;
  thread.updatedAt = Date.now();
  const board = DB.forum.boards.find(b => b.id === thread.boardId);
  if (board) board.postCount++;
  const account = DB.accounts[author.username];
  if (account) {
    account.profile.stats.postsMade++;
  }
  
  saveJSON(FORUM_FILE, DB.forum);
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  
  return { success: true, post };
}

function voteOnPost(postId, username, voteType) {
  const post = DB.forum.posts.find(p => p.id === postId);
  if (!post) return { error: 'Post not found' };
  
  if (post.author === username) return { error: 'Cannot vote on your own post' };
  
  const existingVoteIndex = post.votes?.findIndex(v => v.username === username);
  
  if (!post.votes) post.votes = [];
  
  if (existingVoteIndex >= 0) {
    const oldVote = post.votes[existingVoteIndex];
    if (oldVote.type === voteType) {
      post.votes.splice(existingVoteIndex, 1);
      if (voteType === 'up') post.upvotes--;
      else post.downvotes--;
    } else {
      oldVote.type = voteType;
      if (voteType === 'up') {
        post.upvotes++;
        post.downvotes--;
      } else {
        post.upvotes--;
        post.downvotes++;
      }
    }
  } else {
    post.votes.push({ username, type: voteType, createdAt: Date.now() });
    if (voteType === 'up') post.upvotes++;
    else post.downvotes++;
  }
  
  post.voteScore = post.upvotes - post.downvotes;
  const author = DB.accounts[post.author];
  if (author) {
    author.profile.stats.reputation += voteType === 'up' ? 1 : -1;
    if (voteType === 'up') author.profile.stats.upvotesReceived++;
  }
  
  saveJSON(FORUM_FILE, DB.forum);
  saveJSON(ACCOUNTS_FILE, DB.accounts);
  
  return { success: true, score: post.voteScore };
}

function getForumBoards() {
  return DB.forum.boards.map(board => ({
    ...board,
    recentThreads: DB.forum.threads
      .filter(t => t.boardId === board.id)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 3)
      .map(t => ({
        id: t.id,
        title: t.title,
        author: t.authorDisplayName,
        updatedAt: t.updatedAt,
        replyCount: t.replyCount
      }))
  }));
}

function getBoardThreads(boardId, page = 1, sort = 'hot') {
  const perPage = 20;
  let threads = DB.forum.threads.filter(t => t.boardId === boardId);
  if (sort === 'hot') {
    threads.sort((a, b) => b.voteScore - a.voteScore || b.updatedAt - a.updatedAt);
  } else if (sort === 'new') {
    threads.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sort === 'top') {
    threads.sort((a, b) => b.upvotes - a.upvotes);
  }
  
  const total = threads.length;
  const start = (page - 1) * perPage;
  const paginatedThreads = threads.slice(start, start + perPage);
  
  return {
    threads: paginatedThreads,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage)
  };
}

function getThreadWithPosts(threadId) {
  const thread = DB.forum.threads.find(t => t.id === threadId);
  if (!thread) return { error: 'Thread not found' };
  
  thread.views++;
  saveJSON(FORUM_FILE, DB.forum);
  
  const posts = DB.forum.posts
    .filter(p => p.threadId === threadId && !p.isDeleted)
    .sort((a, b) => a.createdAt - b.createdAt);
  const postMap = new Map();
  const rootPosts = [];
  
  posts.forEach(post => {
    post.replies = [];
    postMap.set(post.id, post);
  });
  
  posts.forEach(post => {
    if (post.parentId && postMap.has(post.parentId)) {
      postMap.get(post.parentId).replies.push(post);
    } else {
      rootPosts.push(post);
    }
  });
  
  return { thread, posts: rootPosts };
}
if (DB.forum.boards.length === 0) {
  createForumBoard('General Discussion', 'Talk about anything rally-related', 'general');
  createForumBoard('Strategy & Tips', 'Share and discuss co-driving strategies', 'strategy');
  createForumBoard('Stage Reviews', 'Discuss specific stages and techniques', 'stages');
  createForumBoard('Multiplayer', 'Find races and discuss multiplayer', 'multiplayer');
  createForumBoard('Showcase', 'Share your achievements and customizations', 'showcase');
  createForumBoard('Bug Reports', 'Report issues and suggest features', 'feedback');
  saveJSON(FORUM_FILE, DB.forum);
}
app.get('/api/forum/boards', (req, res) => {
  res.json({ boards: getForumBoards() });
});

app.get('/api/forum/board/:boardId', (req, res) => {
  const { boardId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort || 'hot';
  
  const board = DB.forum.boards.find(b => b.id === boardId);
  if (!board) return res.status(404).json({ error: 'Board not found' });
  
  const threads = getBoardThreads(boardId, page, sort);
  res.json({ board, ...threads });
});

app.post('/api/forum/thread', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) return res.status(401).json({ error: 'Unauthorized' });
  
  const { boardId, title, content, tags } = req.body;
  
  if (!title || title.length < 3) return res.status(400).json({ error: 'Title too short' });
  if (!content || content.length < 10) return res.status(400).json({ error: 'Content too short' });
  
  const result = createForumThread(boardId, title, content, account);
  if (result.error) return res.status(400).json(result);
  
  res.json(result);
});

app.get('/api/forum/thread/:threadId', (req, res) => {
  const { threadId } = req.params;
  const result = getThreadWithPosts(threadId);
  
  if (result.error) return res.status(404).json(result);
  res.json(result);
});

app.post('/api/forum/post', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) return res.status(401).json({ error: 'Unauthorized' });
  
  const { threadId, content, parentId } = req.body;
  
  if (!content || content.length < 2) return res.status(400).json({ error: 'Content too short' });
  
  const result = createForumPost(threadId, content, account, parentId);
  if (result.error) return res.status(400).json(result);
  
  res.json(result);
});

app.post('/api/forum/vote', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) return res.status(401).json({ error: 'Unauthorized' });
  
  const { postId, voteType } = req.body;
  
  if (!['up', 'down'].includes(voteType)) {
    return res.status(400).json({ error: 'Invalid vote type' });
  }
  
  const result = voteOnPost(postId, account.username, voteType);
  if (result.error) return res.status(400).json(result);
  
  res.json(result);
});

app.get('/api/forum/recent', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  
  const recentThreads = DB.forum.threads
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, limit)
    .map(t => ({
      ...t,
      boardName: DB.forum.boards.find(b => b.id === t.boardId)?.name || 'Unknown'
    }));
  
  res.json({ threads: recentThreads });
});
app.post('/api/forum/upload', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) return res.status(401).json({ error: 'Unauthorized' });
  
  const { filename, data, threadId } = req.body;
  
  if (!data || !filename) {
    return res.status(400).json({ error: 'Missing file data or filename' });
  }
  
  try {
    const FORUM_UPLOADS_DIR = path.join(UPLOADS_DIR, 'forum');
    if (!fs.existsSync(FORUM_UPLOADS_DIR)) {
      fs.mkdirSync(FORUM_UPLOADS_DIR, { recursive: true });
    }
    const base64Data = data.replace(/^data:.*\/.*;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const ext = path.extname(filename) || '.bin';
    const uniqueFilename = `${account.username}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filepath = path.join(FORUM_UPLOADS_DIR, uniqueFilename);
    fs.writeFileSync(filepath, buffer);
    const mimeType = data.match(/^data:(.*);base64,/)?.[1] || 'application/octet-stream';
    const isVideo = mimeType.startsWith('video/');
    const isAudio = mimeType.startsWith('audio/');
    const isImage = mimeType.startsWith('image/');
    
    const fileUrl = `/uploads/forum/${uniqueFilename}`;
    
    res.json({ 
      success: true, 
      url: fileUrl,
      filename: filename,
      size: buffer.length,
      type: mimeType,
      isVideo,
      isAudio,
      isImage
    });
  } catch (e) {
    console.error('Forum upload error:', e);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

const STORY_CAMPAIGN = {
  chapters: [
    {
      id: 'ch1',
      title: 'The Novice',
      subtitle: 'Learning the Ropes',
      description: 'You are a young co-driver dreaming of rally glory. Your first steps into the world of pacenotes begin in the local junior championship.',
      stages: [
        { id: 'ch1_s1', name: 'Junior Academy - Lesson 1', era: 'grpb', difficulty: 'beginner', requiredAccuracy: 50 },
        { id: 'ch1_s2', name: 'Junior Academy - Lesson 2', era: 'grpb', difficulty: 'beginner', requiredAccuracy: 60 },
        { id: 'ch1_s3', name: 'First Competition', era: 'grpb', difficulty: 'beginner', requiredAccuracy: 65 },
        { id: 'ch1_s4', name: 'Regional Finals', era: 'grpb', difficulty: 'beginner', requiredAccuracy: 70 }
      ],
      reward: { type: 'era_unlock', era: 'w90', title: 'Advanced License' }
    },
    {
      id: 'ch2',
      title: 'The Contender',
      subtitle: 'Rising Through the Ranks',
      description: 'Your skills have caught attention. You are now competing in the national championship against seasoned professionals.',
      stages: [
        { id: 'ch2_s1', name: 'National Debut', era: 'w90', difficulty: 'intermediate', requiredAccuracy: 70 },
        { id: 'ch2_s2', name: 'Rain and Mud', era: 'w90', difficulty: 'intermediate', requiredAccuracy: 72 },
        { id: 'ch2_s3', name: 'Night Stages', era: 'w90', difficulty: 'intermediate', requiredAccuracy: 75 },
        { id: 'ch2_s4', name: 'The Championship Battle', era: 'w90', difficulty: 'intermediate', requiredAccuracy: 78 }
      ],
      reward: { type: 'title', title: 'National Champion' }
    },
    {
      id: 'ch3',
      title: 'The Professional',
      subtitle: 'World Stage',
      description: 'You have earned a seat in the World Rally Championship. The world is watching as you take on the best co-drivers on the planet.',
      stages: [
        { id: 'ch3_s1', name: 'Monte Carlo Debut', era: 'w24', difficulty: 'advanced', requiredAccuracy: 75 },
        { id: 'ch3_s2', name: 'Safari Rally Kenya', era: 'w24', difficulty: 'advanced', requiredAccuracy: 78 },
        { id: 'ch3_s3', name: 'Rally Finland', era: 'w24', difficulty: 'advanced', requiredAccuracy: 82 },
        { id: 'ch3_s4', name: 'The Final Stage', era: 'w24', difficulty: 'advanced', requiredAccuracy: 85 }
      ],
      reward: { type: 'title', title: 'World Champion' }
    },
    {
      id: 'ch4',
      title: 'The Legend',
      subtitle: 'Eternal Glory',
      description: 'You are now a rally legend. But true legends never stop pushing. Challenge the ultimate tests of skill and nerve.',
      stages: [
        { id: 'ch4_s1', name: 'Group B Revival', era: 'grpb', difficulty: 'expert', requiredAccuracy: 85 },
        { id: 'ch4_s2', name: 'The Iron Road', era: 'w90', difficulty: 'expert', requiredAccuracy: 88 },
        { id: 'ch4_s3', name: 'Midnight Run', era: 'w24', difficulty: 'expert', requiredAccuracy: 90 },
        { id: 'ch4_s4', name: 'The Perfect Stage', era: 'w24', difficulty: 'expert', requiredAccuracy: 95 }
      ],
      reward: { type: 'title', title: 'Living Legend' }
    }
  ]
};
app.get('/api/story/campaign', (req, res) => {
  res.json(STORY_CAMPAIGN);
});

app.get('/api/story/progress', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const savefile = loadSavefile(account.username);
  res.json({ 
    chapters: STORY_CAMPAIGN.chapters,
    currentChapter: savefile.career.currentChapter || 'ch1',
    completedStages: savefile.career.completedStages || []
  });
});

app.post('/api/story/complete', (req, res) => {
  const token = req.headers.authorization;
  const account = authenticate(token);
  if (!account) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { stageId, accuracy, time } = req.body;
  const savefile = loadSavefile(account.username);
  
  if (!savefile.career.completedStages.includes(stageId)) {
    savefile.career.completedStages.push(stageId);
  }
  
  saveSavefile(account.username, savefile);
  updateStats(account.username, {
    accuracy,
    time,
    position: 1,
    era: req.body.era
  });
  
  res.json({ success: true, savefile });
});

const PORT = process.env.PORT || 3000;
async function startServer() {
  await initRedis();
  
  server.listen(PORT, () => {
    console.log(`╔════════════════════════════════════════════════════════════╗`);
    console.log(`║     RALLY PACENOTE ACADEMY - MULTIPLAYER SERVER            ║`);
    console.log(`║                                                            ║`);
    console.log(`║     Server running on port ${PORT}                          ║`);
    console.log(`║     WebSocket endpoint: ws://localhost:${PORT}              ║`);
    if (redisClient) {
      console.log(`║     Redis: Connected (multi-server support enabled)      ║`);
    } else {
      console.log(`║     Redis: Not connected (single server mode)              ║`);
    }
    console.log(`╚════════════════════════════════════════════════════════════╝`);
  });
}

startServer();
setInterval(async () => {
  const now = Date.now();
  for (const [code, lobby] of lobbies) {
    if (lobby.players.size === 0 && now - lobby.createdAt > 300000) {
      lobbies.delete(code);
      if (redisClient) {
        await RedisLobbyStore.deleteLobby(code);
      }
    }
  }
}, 60000);
