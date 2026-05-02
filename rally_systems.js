/* ═══════════════════════════════════════════════════════════════════════════
   RALLY PACENOTE ACADEMY — SYSTEMS ENGINE v3.0
   Covers: Analytics, AI Coaching, Adaptive Difficulty, Replay, Pacenote Editor,
           Extended Tutorial, Mode Toggle, Export, Audio System, Accessibility,
           Training Programs, Damage Physics, Pro Layer
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════════════════════════════
// 0. GLOBAL MODE STATE
// ═══════════════════════════════════════════════════════════════

const MODE = {
  pro: false, // toggled by user — Training Mode vs Game Mode
  get isPro() { return this.pro; },
  toggle() {
    this.pro = !this.pro;
    try { localStorage.setItem('rpa_pro_mode', this.pro ? '1' : '0'); } catch(e){}
    document.body.classList.toggle('pro-mode', this.pro);
    renderModeToggle();
    if (typeof renderAnalyticsOverlay === 'function') renderAnalyticsOverlay();
  },
  load() {
    try { this.pro = localStorage.getItem('rpa_pro_mode') === '1'; } catch(e){}
    document.body.classList.toggle('pro-mode', this.pro);
  }
};

// ═══════════════════════════════════════════════════════════════
// 1. ANALYTICS ENGINE — #024
// ═══════════════════════════════════════════════════════════════

const Analytics = {
  sessions: [],          // All completed stages
  currentSession: null,  // Live session being recorded

  startSession(era, stage, car, difficulty) {
    this.currentSession = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      era, stage, car, difficulty,
      notes: [],           // Per-note records
      totalNotes: 0,
      correct: 0,
      reactionTimes: [],   // ms from note display to first keypress
      inputStartTimes: {}, // noteIdx -> note display timestamp
      mistakes: [],        // { noteIdx, raw, ans, typed, category, timeLost }
      crashes: 0,
      dnf: false,
      stageTime: null,
      splitTimes: [],
      startTime: Date.now()
    };
  },

  noteDisplayed(noteIdx) {
    if (!this.currentSession) return;
    this.currentSession.inputStartTimes[noteIdx] = performance.now();
  },

  recordFirstKeypress(noteIdx) {
    if (!this.currentSession) return;
    const t0 = this.currentSession.inputStartTimes[noteIdx];
    if (t0) {
      const rt = Math.round(performance.now() - t0);
      this.currentSession.reactionTimes.push({ noteIdx, ms: rt });
    }
  },

  recordNote(noteIdx, raw, ans, typed, ok, score, timeLost) {
    if (!this.currentSession) return;
    const t0 = this.currentSession.inputStartTimes[noteIdx] || performance.now();
    const responseTime = Math.round(performance.now() - t0);

    const record = {
      noteIdx, raw, ans, typed, ok, score,
      responseTime,    // ms total response time
      timeLost: ok ? 0 : timeLost || 0,
      category: this._categorise(raw, typed, ok)
    };

    this.currentSession.notes.push(record);
    this.currentSession.totalNotes++;
    if (ok) this.currentSession.correct++;
    else this.currentSession.mistakes.push(record);
  },

  _categorise(raw, typed, ok) {
    if (ok) return 'correct';
    if (!typed || typed.trim() === '') return 'timeout';
    const r = raw.toUpperCase();
    const t = (typed || '').toLowerCase();
    if (r.includes('!!') && !t.includes('max')) return 'missed_double_caution';
    if (r.includes('!') && !t.includes('caut')) return 'missed_caution';
    if (r.includes('DONTCUT') && !t.includes('cut')) return 'missed_dontcut';
    if (r.includes('INTO') && !t.includes('into')) return 'missed_link';
    if (r.includes('FLAT') && !t.includes('flat')) return 'missed_flat';
    if (r.includes('CREST') && !t.includes('crest')) return 'missed_crest';
    if (r.includes('JUMP') && !t.includes('jump')) return 'missed_jump';
    if (r.includes('JUNCTION') && !t.includes('junct')) return 'missed_junction';
    const cornerPattern = /[LR]\d/g;
    const corners = r.match(cornerPattern) || [];
    if (corners.length > 1) return 'missed_sequence';
    return 'wrong_translation';
  },

  recordCrash() {
    if (this.currentSession) this.currentSession.crashes++;
  },

  recordSplit(sectorIdx, timeS) {
    if (this.currentSession) this.currentSession.splitTimes.push({ sector: sectorIdx, time: timeS });
  },

  endSession(dnf, stageTimeMs) {
    if (!this.currentSession) return null;
    const s = this.currentSession;
    s.dnf = dnf;
    s.stageTime = stageTimeMs;
    s.duration = Date.now() - s.startTime;
    s.accuracy = s.totalNotes > 0 ? Math.round((s.correct / s.totalNotes) * 100) : 0;
    s.avgReactionTime = s.reactionTimes.length
      ? Math.round(s.reactionTimes.reduce((a,b)=>a+b.ms,0) / s.reactionTimes.length)
      : 0;
    s.consistency = this._consistencyScore(s.reactionTimes.map(r=>r.ms));

    // Category breakdown
    s.mistakeBreakdown = {};
    s.mistakes.forEach(m => {
      s.mistakeBreakdown[m.category] = (s.mistakeBreakdown[m.category] || 0) + 1;
    });

    this.sessions.push(s);
    this._persist();
    const session = s;
    this.currentSession = null;
    return session;
  },

  _consistencyScore(times) {
    if (times.length < 2) return 100;
    const mean = times.reduce((a,b)=>a+b,0) / times.length;
    const variance = times.reduce((a,b)=>a+(b-mean)**2,0) / times.length;
    const stdDev = Math.sqrt(variance);
    // Lower stdDev relative to mean = more consistent
    const cv = mean > 0 ? (stdDev / mean) : 0;
    return Math.max(0, Math.round(100 - cv * 100));
  },

  _persist() {
    try {
      // Keep last 50 sessions
      const toSave = this.sessions.slice(-50);
      localStorage.setItem('rpa_analytics', JSON.stringify(toSave));
    } catch(e) { /* storage full — silently skip */ }
  },

  load() {
    try {
      const saved = localStorage.getItem('rpa_analytics');
      if (saved) this.sessions = JSON.parse(saved);
    } catch(e) { this.sessions = []; }
  },

  // Aggregated stats across all sessions
  getLifetimeStats() {
    const all = this.sessions;
    if (!all.length) return null;
    const totalNotes = all.reduce((a,s)=>a+s.totalNotes,0);
    const totalCorrect = all.reduce((a,s)=>a+s.correct,0);
    const allRT = all.flatMap(s=>s.reactionTimes.map(r=>r.ms));
    const allMistakes = all.flatMap(s=>s.mistakes);
    const breakdown = {};
    allMistakes.forEach(m => {
      breakdown[m.category] = (breakdown[m.category] || 0) + 1;
    });
    return {
      sessions: all.length,
      totalNotes,
      totalCorrect,
      lifetime_accuracy: totalNotes ? Math.round(totalCorrect/totalNotes*100) : 0,
      avg_reaction_ms: allRT.length ? Math.round(allRT.reduce((a,b)=>a+b,0)/allRT.length) : 0,
      best_reaction_ms: allRT.length ? Math.min(...allRT) : 0,
      worst_reaction_ms: allRT.length ? Math.max(...allRT) : 0,
      consistency: this._consistencyScore(allRT),
      mistakeBreakdown: breakdown,
      topMistake: Object.entries(breakdown).sort((a,b)=>b[1]-a[1])[0]?.[0] || null,
      dnfCount: all.filter(s=>s.dnf).length,
      bestAccuracy: Math.max(...all.map(s=>s.accuracy)),
      recentTrend: this._trend(all.slice(-5).map(s=>s.accuracy))
    };
  },

  _trend(vals) {
    if (vals.length < 2) return 'neutral';
    const first = vals.slice(0, Math.ceil(vals.length/2));
    const last = vals.slice(Math.floor(vals.length/2));
    const avgFirst = first.reduce((a,b)=>a+b,0)/first.length;
    const avgLast = last.reduce((a,b)=>a+b,0)/last.length;
    if (avgLast > avgFirst + 3) return 'improving';
    if (avgLast < avgFirst - 3) return 'declining';
    return 'stable';
  },

  exportJSON() {
    return JSON.stringify({ exported: new Date().toISOString(), sessions: this.sessions }, null, 2);
  },

  exportCSV() {
    const headers = ['session_id','timestamp','era','stage','car','difficulty','accuracy','avg_reaction_ms','consistency','correct','total','crashes','dnf','stage_time_ms','top_mistake'];
    const rows = this.sessions.map(s => [
      s.id, s.timestamp, s.era, s.stage, s.car, s.difficulty,
      s.accuracy, s.avgReactionTime, s.consistency,
      s.correct, s.totalNotes, s.crashes, s.dnf ? 1 : 0,
      s.stageTime || '', s.mistakeBreakdown ? Object.entries(s.mistakeBreakdown).sort((a,b)=>b[1]-a[1])[0]?.[0] || '' : ''
    ].map(v => `"${v}"`).join(','));
    return [headers.join(','), ...rows].join('\n');
  }
};

// ═══════════════════════════════════════════════════════════════
// 2. AI COACHING ENGINE — #025
// ═══════════════════════════════════════════════════════════════

const Coach = {
  // Pattern detection thresholds
  THRESHOLDS: {
    consistent_mistake: 3,    // same category 3+ times = pattern
    late_reaction: 7000,      // >7s avg reaction = "reacting late"
    fast_reaction: 3000,      // <3s avg = "reading ahead well"
    low_consistency: 60,      // CV consistency below 60 = erratic
    crash_rate: 0.3,          // >30% of stages with crash = systemic
  },

  TIPS: {
    missed_caution: {
      title: "You're missing caution marks",
      tips: [
        "The ! symbol always comes after the corner severity — e.g. 'R3!' not 'R3'.",
        "Scan the whole note before starting to type. Cautions are often at the end.",
        "In real co-driving, the ! is said with emphasis — try reading the note aloud."
      ]
    },
    missed_double_caution: {
      title: "Double caution (!!): you're not calling max caution",
      tips: [
        "!! is not the same as !. Type 'maximum caution' or 'max caution' — not just 'caution'.",
        "Double exclamation means something was found in recce that scared the crew. Treat it with more weight.",
        "If you see !!, slow down your reading — make sure both the corner AND the caution are in your answer."
      ]
    },
    missed_link: {
      title: "You're dropping the INTO connection",
      tips: [
        "INTO means the second corner follows immediately with no gap. The driver needs both.",
        "Write the sequence: 'left three into right four' — don't write just one corner.",
        "When you see INTO, always read the note to the end before typing."
      ]
    },
    missed_flat: {
      title: "You're missing FLAT calls",
      tips: [
        "FLAT means full throttle — no braking at all. It's one of the most important calls.",
        "Look for FLAT near the end of complex notes — it modifies the whole corner.",
        "In your answer, include 'flat out' or 'flat' to register the call."
      ]
    },
    missed_crest: {
      title: "Crest calls are being skipped",
      tips: [
        "CREST means the corner is over a blind rise — the driver can't see the apex until they're committed.",
        "Say 'over crest' before the corner: 'over crest right four'.",
        "Crests on fast notes (R5 CREST, R6 CREST) are particularly dangerous if missed."
      ]
    },
    missed_sequence: {
      title: "Multi-corner sequences — you're only calling one",
      tips: [
        "When a note has two corners, both need translating: 'left three, right four'.",
        "Read the full note before starting to type. Count the corners first.",
        "Linked sequences (L3 INTO R4) and spaced ones (L3 100 R4) both need both corners."
      ]
    },
    timeout: {
      title: "You're running out of time",
      tips: [
        "Read the note immediately when it appears — don't wait for your brain to process it fully.",
        "Type the direction first (left/right), then the number. You can finish the rest mid-type.",
        "On Easy difficulty there are 12 seconds — that's plenty. On Hard, you need 2-3 seconds per segment."
      ]
    },
    wrong_translation: {
      title: "Translation accuracy needs work",
      tips: [
        "Check the vocabulary panel on the right — it lists what each abbreviation means.",
        "Focus on the most common pattern: [direction][number] + any modifiers.",
        "L = left, R = right. 1 = hairpin, 6 = fast sweep. Everything else adds detail."
      ]
    }
  },

  analyse(session) {
    if (!session || !session.mistakes.length) return [];
    const tips = [];

    // Pattern detection
    const cats = session.mistakeBreakdown || {};
    const sorted = Object.entries(cats).sort((a,b)=>b[1]-a[1]);

    // Top mistake pattern
    if (sorted[0] && sorted[0][1] >= 2) {
      const cat = sorted[0][0];
      const tip = this.TIPS[cat];
      if (tip) tips.push({ priority: 'high', category: cat, ...tip });
    }

    // Secondary pattern
    if (sorted[1] && sorted[1][1] >= 2) {
      const cat = sorted[1][0];
      const tip = this.TIPS[cat];
      if (tip) tips.push({ priority: 'medium', category: cat, ...tip });
    }

    // Reaction time analysis
    const avgRT = session.avgReactionTime;
    if (avgRT > this.THRESHOLDS.late_reaction) {
      tips.push({
        priority: 'high',
        category: 'slow_reaction',
        title: "You're consistently reacting late",
        tips: [
          `Your average reaction time is ${(avgRT/1000).toFixed(1)}s. Target is under 5s.`,
          "Start reading the note the moment it appears — don't wait for the timer to start dropping.",
          "On harder difficulties, the timer is 4-5 seconds. Train your eyes to go to the start of the note instantly."
        ]
      });
    }

    // Consistency
    if (session.consistency < this.THRESHOLDS.low_consistency) {
      tips.push({
        priority: 'medium',
        category: 'inconsistency',
        title: "Your timing is erratic",
        tips: [
          "Some notes you answer very fast, others very slow. Try to develop a consistent reading rhythm.",
          "If you're fast on simple notes but slow on complex ones, focus on multi-element notes specifically.",
          "Consistency is what separates good co-drivers from great ones — the driver needs to trust the pace."
        ]
      });
    }

    // Crash frequency
    if (session.crashes > 2) {
      tips.push({
        priority: 'medium',
        category: 'crashes',
        title: "High crash rate this stage",
        tips: [
          "Crashes happen when notes with danger marks (!, !!, DONTCUT) are missed.",
          "Prioritise reading the caution symbols — they appear at the end of notes.",
          "At lower difficulties there's more time to spot hazards. Use Easy mode to build the habit."
        ]
      });
    }

    return tips;
  },

  // Lifetime pattern analysis
  analyseLifetime(stats) {
    if (!stats) return [];
    const tips = [];
    const top = stats.topMistake;
    if (top && this.TIPS[top]) tips.push({ priority: 'high', ...this.TIPS[top] });
    if (stats.avg_reaction_ms > this.THRESHOLDS.late_reaction) {
      tips.push({
        priority: 'high', category: 'slow_reaction',
        title: `Lifetime reaction time: ${(stats.avg_reaction_ms/1000).toFixed(1)}s average`,
        tips: ["Your long-term reaction time is above the recommended threshold. Practise the Training School timed quiz."]
      });
    }
    if (stats.recentTrend === 'declining') {
      tips.push({
        priority: 'medium', category: 'trend',
        title: "Recent performance dropping",
        tips: ["Your last 5 sessions show a declining trend. Return to an easier difficulty and rebuild fundamentals."]
      });
    }
    return tips;
  }
};

// ═══════════════════════════════════════════════════════════════
// 3. ADAPTIVE DIFFICULTY — #019
// ═══════════════════════════════════════════════════════════════

const AdaptiveDifficulty = {
  enabled: false,
  baseTime: 9,
  currentTime: 9,
  windowSize: 4,     // Notes to look back
  recentResults: [], // true/false per note

  reset(baseTimeS) {
    this.baseTime = baseTimeS;
    this.currentTime = baseTimeS;
    this.recentResults = [];
  },

  recordResult(correct) {
    this.recentResults.push(correct);
    if (this.recentResults.length > this.windowSize) {
      this.recentResults.shift();
    }
    this._adjust();
  },

  _adjust() {
    if (!this.enabled || this.recentResults.length < this.windowSize) return;
    const recentCorrect = this.recentResults.filter(Boolean).length;
    const ratio = recentCorrect / this.recentResults.length;

    if (ratio === 1.0) {
      // Perfect last 4 — tighten by 1s (harder)
      this.currentTime = Math.max(4, this.currentTime - 1);
    } else if (ratio <= 0.25) {
      // Only 0-1 of last 4 correct — ease by 1.5s
      this.currentTime = Math.min(15, this.currentTime + 1.5);
    } else if (ratio >= 0.75) {
      // 3-4 of last 4 correct — slight tighten
      this.currentTime = Math.max(4, this.currentTime - 0.5);
    }
    // Round to 1dp
    this.currentTime = Math.round(this.currentTime * 10) / 10;
  },

  getTimeLimit() {
    return this.enabled ? this.currentTime : G.timeLimit;
  },

  getLabel() {
    const t = this.currentTime;
    if (t <= 5) return 'ADAPTING — HARD';
    if (t <= 7) return 'ADAPTING — MEDIUM';
    return 'ADAPTING — EASY';
  }
};

// ═══════════════════════════════════════════════════════════════
// 4. REPLAY ENGINE — #016
// ═══════════════════════════════════════════════════════════════

const Replay = {
  recording: null,
  recordings: [],

  startRecording(stageId) {
    this.recording = {
      stageId, startTime: Date.now(),
      events: [], // { t, type, data }
      notes: []   // note sequence
    };
  },

  logEvent(type, data) {
    if (!this.recording) return;
    this.recording.events.push({
      t: Date.now() - this.recording.startTime,
      type, data
    });
  },

  logNote(note) {
    if (!this.recording) return;
    this.recording.notes.push({ t: Date.now() - this.recording.startTime, note });
  },

  logInput(char) { this.logEvent('input', { char }); },
  logSubmit(typed, ok, score) { this.logEvent('submit', { typed, ok, score }); },
  logTimeout() { this.logEvent('timeout', {}); },
  logCrash(type) { this.logEvent('crash', { type }); },

  endRecording(result) {
    if (!this.recording) return;
    this.recording.result = result;
    this.recording.duration = Date.now() - this.recording.startTime;
    // Tag mistake events
    this.recording.events.forEach(ev => {
      if (ev.type === 'submit' && !ev.data.ok) ev.isMistake = true;
      if (ev.type === 'timeout') ev.isMistake = true;
      if (ev.type === 'crash') ev.isMistake = true;
    });
    this.recordings.push(this.recording);
    if (this.recordings.length > 10) this.recordings.shift();
    try { localStorage.setItem('rpa_replays', JSON.stringify(this.recordings.slice(-5))); } catch(e){}
    const rec = this.recording;
    this.recording = null;
    return rec;
  },

  getTimeline(rec) {
    if (!rec) return [];
    const maxT = rec.duration;
    return rec.events.map(ev => ({
      ...ev,
      pct: maxT > 0 ? (ev.t / maxT) * 100 : 0
    }));
  },

  renderTimeline(rec, containerId) {
    const el = document.getElementById(containerId);
    if (!el || !rec) return;
    const timeline = this.getTimeline(rec);
    el.innerHTML = `
      <div class="replay-timeline-wrap">
        <div class="replay-bar">
          ${timeline.map(ev => `
            <div class="replay-event replay-event--${ev.type}${ev.isMistake?' replay-event--mistake':''}"
              style="left:${ev.pct.toFixed(1)}%"
              title="${ev.type}: ${JSON.stringify(ev.data)}">
            </div>`).join('')}
        </div>
        <div class="replay-legend">
          <span class="rleg rleg--submit">Submit</span>
          <span class="rleg rleg--timeout">Timeout</span>
          <span class="rleg rleg--crash">Crash</span>
          <span class="rleg rleg--mistake">Mistake</span>
        </div>
      </div>
    `;
  }
};

// ═══════════════════════════════════════════════════════════════
// 5. TRAINING PROGRAM PROGRESSION — #018 #027
// ═══════════════════════════════════════════════════════════════

const TrainingProgram = {
  LEVELS: [
    {
      id: 'beginner', label: 'Beginner', icon: '🟢',
      requirement: null,
      description: 'Learn the core pacenote vocabulary. No timer pressure.',
      drills: [
        { id: 'b1', name: 'Direction Recognition',      target: { accuracy: 80 }, timeLimit: 15, notes: 'basic_lr' },
        { id: 'b2', name: 'Corner Severity 1–6',        target: { accuracy: 80 }, timeLimit: 15, notes: 'severity' },
        { id: 'b3', name: 'Basic Full Notes',           target: { accuracy: 75 }, timeLimit: 12, notes: 'full_basic' },
      ],
      certification: { accuracy: 75, sessions: 2, label: 'Beginner Certified' }
    },
    {
      id: 'intermediate', label: 'Intermediate', icon: '🟡',
      requirement: 'beginner',
      description: 'Caution marks, links, and distances. Time pressure increases.',
      drills: [
        { id: 'i1', name: 'Caution Mark Recognition',  target: { accuracy: 80 }, timeLimit: 10, notes: 'cautions' },
        { id: 'i2', name: 'Linked Corners (INTO)',      target: { accuracy: 75 }, timeLimit: 10, notes: 'into_links' },
        { id: 'i3', name: 'Distance Calls',            target: { accuracy: 75 }, timeLimit: 10, notes: 'distances' },
        { id: 'i4', name: 'Mixed Stage Notes',         target: { accuracy: 70 }, timeLimit: 9,  notes: 'mixed' },
      ],
      certification: { accuracy: 70, sessions: 3, label: 'Intermediate Certified' }
    },
    {
      id: 'advanced', label: 'Advanced', icon: '🔴',
      requirement: 'intermediate',
      description: 'Era-specific vocabulary, GRAVEL, CREST, JUMP. Tight timers.',
      drills: [
        { id: 'a1', name: 'Group B Vocabulary',        target: { accuracy: 70 }, timeLimit: 8, notes: 'grpb_vocab' },
        { id: 'a2', name: 'WRC 90s Sequences',         target: { accuracy: 68 }, timeLimit: 7, notes: 'w90_seq' },
        { id: 'a3', name: 'Modern WRC + Hybrid Calls', target: { accuracy: 65 }, timeLimit: 7, notes: 'w24_hybrid' },
        { id: 'a4', name: 'Full Stage Simulation',     target: { accuracy: 65 }, timeLimit: 7, notes: 'full_stage' },
      ],
      certification: { accuracy: 65, sessions: 4, label: 'Advanced Certified' }
    },
    {
      id: 'expert', label: 'Expert', icon: '⭐',
      requirement: 'advanced',
      description: 'Maximum pressure. All eras. Chaos mode available.',
      drills: [
        { id: 'e1', name: 'Speed Run — 4s Timer',      target: { accuracy: 60 }, timeLimit: 4, notes: 'full_stage' },
        { id: 'e2', name: 'Chaos Mode',                target: { accuracy: 55 }, timeLimit: 4, notes: 'chaos' },
        { id: 'e3', name: 'Certification Stage',       target: { accuracy: 70 }, timeLimit: 6, notes: 'certification_stage' },
      ],
      certification: { accuracy: 70, sessions: 3, label: 'Expert Co-Driver' }
    }
  ],

  progress: {}, // { levelId: { certified: bool, drillsCompleted: [], sessions: [] } }

  load() {
    try {
      const saved = localStorage.getItem('rpa_training_progress');
      if (saved) this.progress = JSON.parse(saved);
    } catch(e) { this.progress = {}; }
    // Ensure beginner unlocked
    if (!this.progress.beginner) this.progress.beginner = { certified: false, drillsCompleted: [], sessions: [] };
  },

  save() {
    try { localStorage.setItem('rpa_training_progress', JSON.stringify(this.progress)); } catch(e){}
  },

  isUnlocked(levelId) {
    const level = this.LEVELS.find(l => l.id === levelId);
    if (!level) return false;
    if (!level.requirement) return true;
    return this.progress[level.requirement]?.certified === true;
  },

  isCertified(levelId) {
    return this.progress[levelId]?.certified === true;
  },

  recordDrillResult(levelId, drillId, accuracy, sessionId) {
    if (!this.progress[levelId]) {
      this.progress[levelId] = { certified: false, drillsCompleted: [], sessions: [] };
    }
    const p = this.progress[levelId];
    const level = this.LEVELS.find(l => l.id === levelId);
    const drill = level?.drills.find(d => d.id === drillId);

    if (drill && accuracy >= drill.target.accuracy) {
      if (!p.drillsCompleted.includes(drillId)) p.drillsCompleted.push(drillId);
    }
    p.sessions.push({ drillId, accuracy, sessionId, ts: Date.now() });
    this._checkCertification(levelId);
    this.save();
  },

  _checkCertification(levelId) {
    const level = this.LEVELS.find(l => l.id === levelId);
    const p = this.progress[levelId];
    if (!level || !p || p.certified) return;

    const cert = level.certification;
    const qualifyingSessions = p.sessions.filter(s => s.accuracy >= cert.accuracy);
    if (qualifyingSessions.length >= cert.sessions) {
      p.certified = true;
      p.certifiedAt = Date.now();
      // Unlock next level
      const idx = this.LEVELS.findIndex(l => l.id === levelId);
      if (idx < this.LEVELS.length - 1) {
        const next = this.LEVELS[idx + 1];
        if (!this.progress[next.id]) {
          this.progress[next.id] = { certified: false, drillsCompleted: [], sessions: [] };
        }
      }
      this._showCertificationBanner(level);
    }
  },

  _showCertificationBanner(level) {
    const banner = document.createElement('div');
    banner.style.cssText = `
      position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      z-index:99999;background:#000;border:2px solid #f5c518;
      padding:2rem 3rem;text-align:center;animation:certPop .3s ease;
    `;
    banner.innerHTML = `
      <div style="font-size:48px;margin-bottom:.5rem">${level.icon}</div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:3px;color:#f5c518">${level.certification.label}</div>
      <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:#9090a8;margin-top:.5rem">Next level unlocked</div>
    `;
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 3500);
  },

  getCurrentLevel() {
    // Highest certified level
    for (let i = this.LEVELS.length - 1; i >= 0; i--) {
      if (this.isCertified(this.LEVELS[i].id)) return this.LEVELS[i];
    }
    return this.LEVELS[0];
  }
};

// ═══════════════════════════════════════════════════════════════
// 6. ADVANCED CO-DRIVER AUDIO SYSTEM — #014 #026
// ═══════════════════════════════════════════════════════════════

const CoDriverAudio = {
  style: 'calm',    // 'calm' | 'aggressive' | 'mcrae'
  baseOffset: 0,    // ms lead/lag vs note display
  humanRandom: 80,  // ±ms randomness to prevent robotic feel
  currentUtterance: null,

  STYLES: {
    calm: {
      label: 'Calm & Precise',
      rate: 1.1, pitch: 1.0,
      preDelay: 200, description: 'Clear, measured calls. Like Nicky Grist.',
      // Pace note generation modifiers
      noteIntensity: 0.7,           // Less aggressive notes
      cautionFrequency: 1.0,        // Standard caution usage
      distanceVerbosity: 'high',    // Detailed distance calls
      linkWord: 'into',             // Gentle linking
      // Story/voice character
      voiceCharacter: 'measured',
      storyTone: 'professional',      // Professional, analytical post-stage comments
      commPhrases: ['Good pace', 'Measured approach', 'Clean execution', 'Precise notes'],
      narratorStyle: 'analytical'   // Analytical stage descriptions
    },
    aggressive: {
      label: 'Aggressive',
      rate: 1.45, pitch: 1.15,
      preDelay: 100, description: 'Fast, sharp calls. High pressure.',
      // Pace note generation modifiers
      noteIntensity: 1.3,           // More aggressive notes, higher stakes
      cautionFrequency: 1.3,        // More cautions (aggressive driving needs warnings)
      distanceVerbosity: 'low',     // Minimal distance calls - just corners
      linkWord: 'INTO',             // Urgent linking
      // Story/voice character
      voiceCharacter: 'intense',
      storyTone: 'aggressive',      // Intense, attacking post-stage comments
      commPhrases: ['Push harder', 'Attack the stage', 'Maximum commitment', 'Flat out everywhere'],
      narratorStyle: 'dramatic'     // Dramatic, high-tension descriptions
    },
    mcrae: {
      label: 'McRae Pace',
      rate: 1.6, pitch: 1.05,
      preDelay: 50, description: 'Maximum urgency. For the brave.',
      // Pace note generation modifiers
      noteIntensity: 1.5,           // Extreme intensity
      cautionFrequency: 0.8,      // Fewer cautions - trust the driver
      distanceVerbosity: 'minimal', // Very sparse calls
      linkWord: '>>',               // Very urgent linking
      // Story/voice character
      voiceCharacter: 'fearless',
      storyTone: 'bold',            // Fearless, legendary post-stage comments
      commPhrases: ['Flat to the floor', 'Give it everything', 'No fear', 'Maximum attack'],
      narratorStyle: 'legendary'    // Legendary, heroic descriptions
    }
  },

  setStyle(s) {
    if (this.STYLES[s]) this.style = s;
    try { localStorage.setItem('rpa_audio_style', s); } catch(e){}
  },

  setOffset(ms) {
    this.baseOffset = Math.max(-500, Math.min(1000, ms));
  },

  loadPrefs() {
    try {
      const s = localStorage.getItem('rpa_audio_style');
      if (s && this.STYLES[s]) this.style = s;
      const o = localStorage.getItem('rpa_audio_offset');
      if (o) this.baseOffset = parseInt(o);
    } catch(e){}
  },

  _getDelay() {
    const style = this.STYLES[this.style];
    const human = (Math.random() - 0.5) * this.humanRandom * 2;
    return Math.max(0, style.preDelay + this.baseOffset + human);
  },

  speak(text, intensity = 1.0) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const delay = this._getDelay();
    setTimeout(() => {
      const style = this.STYLES[this.style];
      const utt = new SpeechSynthesisUtterance(text);
      utt.rate = style.rate * (0.95 + intensity * 0.1);
      utt.pitch = style.pitch;
      utt.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const pref = voices.find(v =>
        v.lang.startsWith('en') &&
        (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('george'))
      );
      if (pref) utt.voice = pref;

      this.currentUtterance = utt;
      window.speechSynthesis.speak(utt);
    }, delay);
  },

  speakNote(rawNote, era) {
    const eraData = typeof ERAS !== 'undefined' ? ERAS[era] : null;
    const vocab = eraData?.vocab || {};
    const parts = rawNote.split(/\s+/).map(t => {
      if (t in vocab) return vocab[t];
      if (t.match(/^[LR][1-6]$/)) return (t[0]==='L'?'left':'right')+' '+t[1];
      if (t.match(/^\d+$/)) return t+' metres';
      return t.toLowerCase();
    });
    // Intensity scales with timer remaining
    const intensity = typeof G !== 'undefined' ? (G.remaining / G.timeLimit) : 1.0;
    this.speak(parts.join(', '), 1.0 - intensity * 0.2);
  },

  speakCommentary(text, ok) {
    const style = this.STYLES[this.style];
    const delay = this._getDelay() + 200;
    setTimeout(() => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.rate = 0.88;
      utt.pitch = ok ? 1.05 : 0.85;
      utt.volume = 0.85;
      window.speechSynthesis.speak(utt);
    }, delay);
  },

  // Get style-specific commentary phrase
  getCommPhrase() {
    const style = this.STYLES[this.style];
    const phrases = style.commPhrases || ['Good pace'];
    return phrases[Math.floor(Math.random() * phrases.length)];
  },

  // Get style-specific link word for pace notes
  getLinkWord() {
    const style = this.STYLES[this.style];
    return style.linkWord || 'into';
  },

  // Get story tone for post-stage reports
  getStoryTone() {
    const style = this.STYLES[this.style];
    return style.storyTone || 'professional';
  },

  // Get narrator style for stage descriptions
  getNarratorStyle() {
    const style = this.STYLES[this.style];
    return style.narratorStyle || 'analytical';
  },

  // Get note intensity modifier (for generating notes)
  getNoteIntensity() {
    const style = this.STYLES[this.style];
    return style.noteIntensity || 1.0;
  },

  // Get caution frequency modifier
  getCautionFrequency() {
    const style = this.STYLES[this.style];
    return style.cautionFrequency || 1.0;
  },

  // Get distance verbosity level
  getDistanceVerbosity() {
    const style = this.STYLES[this.style];
    return style.distanceVerbosity || 'high';
  },

  // Get voice character type
  getVoiceCharacter() {
    const style = this.STYLES[this.style];
    return style.voiceCharacter || 'measured';
  }
};

// ═══════════════════════════════════════════════════════════════
// 7. PACENOTE SYSTEMS — #022 #023
// ═══════════════════════════════════════════════════════════════

const PacenoteSystem = {
  // Multiple notation formats
  FORMATS: {
    wrc_standard: {
      label: 'WRC Standard',
      description: 'L/R + severity (1–6). INTO, CREST, JUMP, !, !!',
      cornerLeft: 'L', cornerRight: 'R',
      hairpin: '1', fastSweep: '6',
      caution: '!', maxCaution: '!!',
      flat: 'FLAT', link: 'INTO'
    },
    jemba: {
      label: 'Jemba/Navitrace',
      description: 'Numeric system with modifier codes. Used in some WRC2 teams.',
      cornerLeft: 'L', cornerRight: 'R',
      hairpin: '1', fastSweep: '6',
      caution: 'C', maxCaution: 'CC',
      flat: 'FLT', link: '>'
    },
    roadbook: {
      label: 'Road Book Style',
      description: 'Written-word style with explicit descriptions.',
      cornerLeft: 'Left', cornerRight: 'Right',
      hairpin: 'Hairpin', fastSweep: 'Sweeper',
      caution: 'Caution', maxCaution: 'Max Caution',
      flat: 'Flat out', link: 'into'
    }
  },

  activeFormat: 'wrc_standard',

  setFormat(f) {
    if (this.FORMATS[f]) { this.activeFormat = f; }
    try { localStorage.setItem('rpa_note_format', f); } catch(e){}
  },

  translate(rawNote) {
    // Convert any format to plain English
    const r = rawNote.trim().toUpperCase();
    const out = [];
    const tokens = r.split(/\s+/);

    for (const tok of tokens) {
      if (tok.match(/^L[1-6]$/)) out.push('left ' + tok[1]);
      else if (tok.match(/^R[1-6]$/)) out.push('right ' + tok[1]);
      else if (tok.match(/^L[1-6]!!$/)) out.push('left ' + tok[1] + ' maximum caution');
      else if (tok.match(/^L[1-6]!$/)) out.push('left ' + tok[1] + ' caution');
      else if (tok.match(/^R[1-6]!!$/)) out.push('right ' + tok[1] + ' maximum caution');
      else if (tok.match(/^R[1-6]!$/)) out.push('right ' + tok[1] + ' caution');
      else if (tok === '!!' || tok === 'CC') out.push('maximum caution');
      else if (tok === '!' || tok === 'C') out.push('caution');
      else if (tok.match(/^\d+$/) ) out.push(tok + ' metres');
      else if (tok === 'INTO' || tok === '>') out.push('into');
      else if (tok === 'FLAT' || tok === 'FLT') out.push('flat out');
      else if (tok === 'CREST') out.push('over crest');
      else if (tok === 'JUMP') out.push('jump');
      else if (tok === 'DONTCUT') out.push("don't cut");
      else if (tok === 'HAIRPIN') out.push('hairpin');
      else if (tok === 'NARROW') out.push('narrows');
      else if (tok === 'STOP') out.push('stop');
      else if (tok === 'LONG') out.push('long');
      else if (tok === 'JUNCTION') out.push('junction');
      else if (tok === 'TIGHTENS') out.push('tightens');
      else if (tok === 'OPENS') out.push('opens');
      else if (tok === 'SQUARE') out.push('square corner');
      else if (tok === 'ICE') out.push('ice patch');
      else if (tok === 'GRAVEL') out.push('gravel patch');
      else if (tok === 'WATER') out.push('water splash');
      else if (tok === 'MUD') out.push('mud');
      else if (tok === 'BUMP' || tok === 'BUMPS') out.push('bumps');
      else if (tok === 'REGEN') out.push('regen zone');
      else if (tok === 'HYBRID') out.push('hybrid boost');
      else if (tok === 'FINISH') out.push('finish');
      else out.push(tok.toLowerCase());
    }
    return out.join(', ');
  }
};

// Custom Stage Editor state
const StageEditor = {
  notes: [],
  stageName: 'My Custom Stage',
  country: 'Custom',

  addNote(raw) {
    const translated = PacenoteSystem.translate(raw);
    this.notes.push({
      id: Date.now() + Math.random(),
      raw: raw.toUpperCase().trim(),
      ans: translated,
      narr: 'Custom note from editor.',
      comm: 'Custom stage — practise your own routes.'
    });
  },

  removeNote(id) {
    this.notes = this.notes.filter(n => n.id !== id);
  },

  moveNote(id, dir) {
    const idx = this.notes.findIndex(n => n.id === id);
    if (dir === 'up' && idx > 0) {
      [this.notes[idx], this.notes[idx-1]] = [this.notes[idx-1], this.notes[idx]];
    } else if (dir === 'down' && idx < this.notes.length - 1) {
      [this.notes[idx], this.notes[idx+1]] = [this.notes[idx+1], this.notes[idx]];
    }
  },

  exportStage() {
    return JSON.stringify({
      name: this.stageName, country: this.country,
      notes: this.notes, createdAt: new Date().toISOString()
    }, null, 2);
  },

  importStage(json) {
    try {
      const data = JSON.parse(json);
      this.notes = data.notes || [];
      this.stageName = data.name || 'Imported Stage';
      this.country = data.country || 'Unknown';
      return true;
    } catch(e) { return false; }
  },

  toGameStage() {
    return {
      name: `Custom — ${this.stageName}`,
      country: this.country,
      surf: 'Custom', weather: 'Unknown', km: '??.?',
      cond: 'Custom stage from editor.',
      notes: this.notes
    };
  }
};

// ═══════════════════════════════════════════════════════════════
// 8. EXPORT SYSTEM — #028
// ═══════════════════════════════════════════════════════════════

const ExportSystem = {
  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },

  exportAnalyticsJSON() {
    const data = Analytics.exportJSON();
    this.downloadFile(data, `rally_analytics_${Date.now()}.json`, 'application/json');
  },

  exportAnalyticsCSV() {
    const data = Analytics.exportCSV();
    this.downloadFile(data, `rally_analytics_${Date.now()}.csv`, 'text/csv');
  },

  exportStage(stage) {
    const data = StageEditor.exportStage();
    this.downloadFile(data, `${StageEditor.stageName.replace(/\s/g,'_')}.json`, 'application/json');
  },

  exportTrainingReport() {
    const stats = Analytics.getLifetimeStats();
    const prog = TrainingProgram.progress;
    const report = {
      generated: new Date().toISOString(),
      driver: typeof G !== 'undefined' ? G.driver : 'Unknown',
      lifetimeStats: stats,
      trainingProgress: prog,
      certifications: TrainingProgram.LEVELS.filter(l => TrainingProgram.isCertified(l.id)).map(l => ({
        level: l.label, certifiedAt: prog[l.id]?.certifiedAt
      })),
      coachingTips: stats ? Coach.analyseLifetime(stats) : []
    };
    this.downloadFile(JSON.stringify(report, null, 2), `rally_training_report_${Date.now()}.json`, 'application/json');
  }
};

// ═══════════════════════════════════════════════════════════════
// 9. ACCESSIBILITY — #021
// ═══════════════════════════════════════════════════════════════

const Accessibility = {
  prefs: {
    timerAssist: false,      // extra +3s on timer
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    keyboardMode: false      // show keyboard shortcuts prominently
  },

  load() {
    try {
      const saved = localStorage.getItem('rpa_a11y');
      if (saved) Object.assign(this.prefs, JSON.parse(saved));
    } catch(e){}
    this.apply();
  },

  set(key, val) {
    this.prefs[key] = val;
    this.apply();
    try { localStorage.setItem('rpa_a11y', JSON.stringify(this.prefs)); } catch(e){}
  },

  apply() {
    const b = document.body;
    b.classList.toggle('a11y-high-contrast', this.prefs.highContrast);
    b.classList.toggle('a11y-large-text', this.prefs.largeText);
    b.classList.toggle('a11y-reduced-motion', this.prefs.reducedMotion);
    b.classList.toggle('a11y-keyboard-mode', this.prefs.keyboardMode);
  },

  getTimeBonus() {
    return this.prefs.timerAssist ? 3 : 0;
  }
};

// ═══════════════════════════════════════════════════════════════
// 10. EXTENDED TUTORIAL — ALL CONCEPTS + GRAVEL/SURFACE + MODE CHOICE
// ═══════════════════════════════════════════════════════════════

const EXTENDED_TUTORIAL_STEPS = [
  // ── INTRO ──
  {
    id: 'intro', phase: 'intro',
    title: "Read the pacenotes. Keep the driver alive.",
    body: "You're the co-driver. Your driver is going flat-out and can't see what's coming. You read handwritten shorthand notes before every corner. Get it right — they survive. Get it wrong — you're in the trees.",
    highlight: null, note: null, needsInput: false, nextLabel: "I'm ready →"
  },

  // ── CORNERS ──
  {
    id: 'corner_lr', phase: 'corners',
    title: "Direction: L and R",
    body: "Every note starts with a direction. <strong>L = Left, R = Right.</strong> Simple. Fast. Always comes first.",
    highlight: "L = Left turn\nR = Right turn\n\nThe driver needs to hear this before everything else.",
    note: null, needsInput: false, nextLabel: "Got it →"
  },
  {
    id: 'corner_severity', phase: 'corners',
    title: "Severity: 1 to 6",
    body: "<strong>1 = tightest hairpin. 6 = fast sweep.</strong> Think of it as how open the corner is — not how sharp. A 6 might be flat-out. A 1 is a U-turn.",
    highlight: "1 = Hairpin (U-turn)\n2 = Very tight\n3 = Tight\n4 = Medium\n5 = Open\n6 = Fast sweep (maybe flat)\nFLAT = Full throttle, no braking",
    note: null, needsInput: false, nextLabel: "Try one →"
  },
  {
    id: 'corner_l3', phase: 'corners',
    title: "Try it: L3",
    body: "Direction + severity. That's a medium-speed left corner. Type the translation below.",
    highlight: "L = Left\n3 = Medium-tight\nSo: L3 = ?",
    note: "L3",
    needsInput: true, prompt: "Translate:", hint: "left three",
    accept: ["left 3","left three","left 3rd"],
    successMsg: "✓ CORRECT — Clean read", nextLabel: "Next →"
  },
  {
    id: 'corner_r5', phase: 'corners',
    title: "Now try a fast one: R5",
    body: "A right 5 is quite fast — light braking or maybe no braking at all.",
    highlight: "R = Right\n5 = Open, quite fast",
    note: "R5",
    needsInput: true, prompt: "Translate:", hint: "right five",
    accept: ["right 5","right five"],
    successMsg: "✓ GOOD — Open corner read", nextLabel: "Next →"
  },

  // ── CAUTIONS ──
  {
    id: 'caution_intro', phase: 'hazards',
    title: "Caution marks: ! and !!",
    body: "These are the most important symbols. They appear when something dangerous was found in recce that the driver can't see from the entry. Missing them is how drivers get hurt.",
    highlight: "!  = Caution — something to watch for\n!! = MAXIMUM caution — do NOT deviate from the line\n\nAlways read caution marks. Always say them.",
    note: null, needsInput: false, nextLabel: "Try one →"
  },
  {
    id: 'caution_single', phase: 'hazards',
    title: "Single caution: R3!",
    body: "The ! comes after the severity. Say the corner first, then the caution.",
    highlight: "R3! = Right three — caution\nSay: 'right three caution'",
    note: "R3!",
    needsInput: true, prompt: "Translate:", hint: "right three caution",
    accept: ["right 3 caution","right three caution","right 3!","r3 caution"],
    successMsg: "✓ HAZARD NOTED", nextLabel: "Next →"
  },
  {
    id: 'caution_double', phase: 'hazards',
    title: "Double caution: L2!!",
    body: "Two exclamation marks means maximum caution. The line here is critical — wrong line and you're off the stage. Must say 'maximum caution' not just 'caution'.",
    highlight: "!! = MAXIMUM caution\nNot just 'caution' — the driver needs to know this is extreme.",
    note: "L2!!",
    needsInput: true, prompt: "Translate:", hint: "left two maximum caution",
    accept: ["left 2 maximum caution","left two maximum caution","left 2 max caution","left two max caution"],
    successMsg: "✓ MAX CAUTION CALLED — Driver lives", nextLabel: "Next →"
  },

  // ── SURFACE HAZARDS ──
  {
    id: 'surface_dontcut', phase: 'hazards',
    title: "Surface & line hazards: DONTCUT",
    body: "DONTCUT means there's a rock, ditch, or drop on the inside of the corner. If the driver cuts the apex they hit it. The note tells them to stay on the outside.",
    highlight: "DONTCUT = Stay on the outside line\nUsed when: rock on inside, drop-off, drainage channel",
    note: "R4 DONTCUT",
    needsInput: true, prompt: "Translate:", hint: "right four don't cut",
    accept: ["right 4 don't cut","right four don't cut","right 4 dontcut","right four dontcut","right 4 dont cut","right four dont cut"],
    successMsg: "✓ Inside hazard called", nextLabel: "Next →"
  },
  {
    id: 'surface_gravel', phase: 'hazards',
    title: "Surface: GRAVEL patch",
    body: "Gravel patches appear on tarmac stages or transitions — a patch of loose gravel that can throw the car wide. Particularly dangerous on corner exits.",
    highlight: "GRAVEL = Loose gravel on road\nCommon on tarmac/gravel transitions\nCan cause sudden oversteer on corner exit",
    note: "R3 GRAVEL INTO L4",
    needsInput: true, prompt: "Translate:", hint: "right three gravel patch into left four",
    accept: ["right 3 gravel into left 4","right three gravel into left four","right 3 gravel patch into left 4","right three gravel patch into left four"],
    successMsg: "✓ Surface hazard noted", nextLabel: "Next →"
  },
  {
    id: 'surface_ice', phase: 'hazards',
    title: "Surface: ICE",
    body: "On winter and mountain stages, ice patches appear — often inside corners where the sun doesn't reach. These must be called with the distance before them.",
    highlight: "ICE = Ice patch on road\nOften used with distance: 'L3 ICE 50'\nNight stages on Monte Carlo: most dangerous note type",
    note: "L3 ICE 50",
    needsInput: true, prompt: "Translate:", hint: "left three ice 50 metres",
    accept: ["left 3 ice 50","left three ice 50","left 3 ice 50 metres","left three ice 50 metres"],
    successMsg: "✓ Ice called — Monte Carlo mode", nextLabel: "Next →"
  },

  // ── DISTANCES & LINKING ──
  {
    id: 'distance_intro', phase: 'distances',
    title: "Distance calls",
    body: "Numbers like 50, 100, 200 are distances in metres to the next corner. They give the driver time to brake. Without a distance, the next corner appears at whatever speed they're doing.",
    highlight: "50 = 50 metres (very close)\n100 = one braking zone away\n200 = time to breathe\n\nThe bigger the distance, the more time to brake.",
    note: null, needsInput: false, nextLabel: "Try one →"
  },
  {
    id: 'distance_example', phase: 'distances',
    title: "Distance: L4 100 R3",
    body: "Left four, then 100 metres to a right three. The driver takes the left, then has 100m to set up for the right.",
    highlight: "L4 = Left four\n100 = 100 metres\nR3 = Right three\n\nSay all three parts.",
    note: "L4 100 R3",
    needsInput: true, prompt: "Translate all three:", hint: "left four 100 metres right three",
    accept: ["left 4 100 right 3","left four 100 right three","left 4 100 metres right 3","left four 100 metres right three"],
    successMsg: "✓ Full sequence called", nextLabel: "Next →"
  },
  {
    id: 'into_intro', phase: 'distances',
    title: "INTO — linked corners",
    body: "<strong>INTO</strong> means the second corner follows immediately — no gap, no recovery. Both corners need to be in one call. The driver plans for both at once.",
    highlight: "L3 INTO R4\n= Left three, directly into right four\n\nINTO = no gap between corners\nBoth must be called together",
    note: "L3 INTO R4",
    needsInput: true, prompt: "Translate the linked sequence:", hint: "left three into right four",
    accept: ["left 3 into right 4","left three into right four","left 3 right 4 into","l3 into r4"],
    successMsg: "✓ GOOD FLOW — Both corners read", nextLabel: "Next →"
  },

  // ── CREST / JUMP ──
  {
    id: 'crest', phase: 'advanced',
    title: "CREST — blind entry",
    body: "CREST means the corner is over a rise — the driver can't see the apex until they're committed. It's one of the most dangerous notes because the entry is completely blind.",
    highlight: "CREST = Corner over a blind rise\nSay: 'over crest'\nDriver is committed before seeing the apex — notes are everything",
    note: "CREST R4",
    needsInput: true, prompt: "Translate:", hint: "over crest right four",
    accept: ["over crest right 4","over crest right four","crest right 4","crest right four"],
    successMsg: "✓ Crest called — driver can commit", nextLabel: "Next →"
  },
  {
    id: 'jump', phase: 'advanced',
    title: "JUMP — airborne",
    body: "On Finnish stages especially, JUMP means the car goes airborne. The driver needs to know what corner follows the landing. You call the jump, then the landing corner.",
    highlight: "JUMP = Car leaves ground\nMust always say what comes after\nExample: 'jump into right three'\nFinland: 30–40m jumps at 180 km/h",
    note: "JUMP R3 LONG",
    needsInput: true, prompt: "Translate:", hint: "jump into right three long",
    accept: ["jump right 3 long","jump right three long","jump into right 3 long","jump into right three long"],
    successMsg: "✓ Jump called — landing right three", nextLabel: "Next →"
  },

  // ── FULL COMPLEX NOTE ──
  {
    id: 'complex', phase: 'advanced',
    title: "Full complex note",
    body: "Real pacenotes combine everything at once. Read the whole note before you start typing. Count the corners, spot the hazards, then translate.",
    highlight: "Strategy:\n1. Read the whole note first\n2. Count the corners\n3. Spot any ! or hazard words\n4. Type direction + severity for each part",
    note: "L3 !2 INTO R4 DONTCUT",
    needsInput: true, prompt: "Translate the full note:", hint: "left three caution hairpin into right four don't cut",
    accept: ["left 3 caution 2 into right 4","left three caution hairpin into right four don't cut","left 3 caution into right 4 dont cut","left 3 caution 2 right 4 dont cut","left three caution two into right four dontcut"],
    successMsg: "✓ PERFECT — Full note read", nextLabel: "Almost done →"
  },

  // ── TIMED PRESSURE ──
  {
    id: 'timed', phase: 'pressure',
    title: "Now feel the real pressure",
    body: "In a stage you have seconds. The timer starts when the note appears. There's no pause. The driver is already at speed.",
    highlight: "8 seconds. Translate this.\nDon't think too long — start typing.",
    note: "R5 CREST L3!",
    needsInput: true, timedStep: true, timeLimit: 8,
    prompt: "Translate fast:", hint: "right five over crest left three caution",
    accept: ["right 5 crest left 3 caution","right five crest left three caution","right 5 over crest left 3 caution","right five over crest left three caution"],
    successMsg: "✓ RAPID READ — Under pressure", nextLabel: "Final step →"
  },

  // ── MODE CHOICE ──
  {
    id: 'mode_choice', phase: 'complete',
    title: "You're ready. Choose your mode.",
    body: "Two ways to play. Both are valid.",
    highlight: null, note: null, needsInput: false,
    isModeChoice: true,
    nextLabel: null
  }
];

// Replace the existing TUTORIAL_STEPS with the extended version
if (typeof window !== 'undefined') {
  window.TUTORIAL_STEPS_EXTENDED = EXTENDED_TUTORIAL_STEPS;
}

// ═══════════════════════════════════════════════════════════════
// 11. MODE TOGGLE UI — "Game Mode" vs "Training Mode"
// ═══════════════════════════════════════════════════════════════

function renderModeToggle() {
  const el = document.getElementById('mode-toggle-btn');
  if (!el) return;
  el.textContent = MODE.isPro ? '🧠 Training Mode' : '🎮 Game Mode';
  el.style.borderColor = MODE.isPro ? '#f5c518' : '#252530';
  el.style.color = MODE.isPro ? '#f5c518' : '#9090a8';
}

// ═══════════════════════════════════════════════════════════════
// 12. ANALYTICS OVERLAY (PRO MODE ONLY) — #024
// ═══════════════════════════════════════════════════════════════

function renderAnalyticsOverlay() {
  const el = document.getElementById('pro-analytics-overlay');
  if (!el) return;
  el.style.display = MODE.isPro ? 'flex' : 'none';
  if (!MODE.isPro) return;

  const stats = Analytics.getLifetimeStats();
  if (!stats) {
    el.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:#5a5a70">No data yet — complete a stage</div>';
    return;
  }

  const trendIcon = { improving: '↑', declining: '↓', stable: '→' }[stats.recentTrend] || '→';
  const trendColor = { improving: '#39ff14', declining: '#e8291c', stable: '#f5c518' }[stats.recentTrend];

  el.innerHTML = `
    <div class="pro-stat"><span class="pro-stat-lbl">Lifetime accuracy</span><span class="pro-stat-val">${stats.lifetime_accuracy}%</span></div>
    <div class="pro-stat"><span class="pro-stat-lbl">Avg reaction</span><span class="pro-stat-val">${(stats.avg_reaction_ms/1000).toFixed(1)}s</span></div>
    <div class="pro-stat"><span class="pro-stat-lbl">Consistency</span><span class="pro-stat-val">${stats.consistency}/100</span></div>
    <div class="pro-stat"><span class="pro-stat-lbl">Trend</span><span class="pro-stat-val" style="color:${trendColor}">${trendIcon} ${stats.recentTrend}</span></div>
    <div class="pro-stat"><span class="pro-stat-lbl">Sessions</span><span class="pro-stat-val">${stats.sessions}</span></div>
    ${stats.topMistake ? `<div class="pro-stat"><span class="pro-stat-lbl">Top mistake</span><span class="pro-stat-val" style="color:#e8291c;font-size:10px">${stats.topMistake.replace(/_/g,' ')}</span></div>` : ''}
  `;
}

// ═══════════════════════════════════════════════════════════════
// 13. POST-STAGE PRO SUMMARY — #024 #025
// ═══════════════════════════════════════════════════════════════

function renderProSummary(session) {
  const el = document.getElementById('pro-summary');
  if (!el || !session) return;
  el.style.display = MODE.isPro ? 'block' : 'none';
  if (!MODE.isPro) return;

  const tips = Coach.analyse(session);
  const topTip = tips[0];

  // Reaction time sparkline
  const rts = session.reactionTimes.map(r => r.ms);
  const maxRT = Math.max(...rts, 1);
  const sparkline = rts.map(rt => {
    const h = Math.round((rt / maxRT) * 30);
    const col = rt > 8000 ? '#e8291c' : rt > 5000 ? '#f5c518' : '#39ff14';
    return `<span style="display:inline-block;width:8px;height:${h}px;background:${col};margin:0 1px;vertical-align:bottom"></span>`;
  }).join('');

  el.innerHTML = `
    <div class="pro-section-hdr">📊 Performance Analysis</div>
    <div class="pro-stats-grid">
      <div class="ps-card"><div class="ps-val">${session.accuracy}%</div><div class="ps-lbl">Accuracy</div></div>
      <div class="ps-card"><div class="ps-val">${(session.avgReactionTime/1000).toFixed(1)}s</div><div class="ps-lbl">Avg Reaction</div></div>
      <div class="ps-card"><div class="ps-val">${session.consistency}/100</div><div class="ps-lbl">Consistency</div></div>
      <div class="ps-card"><div class="ps-val">${session.crashes}</div><div class="ps-lbl">Incidents</div></div>
    </div>
    ${rts.length > 0 ? `<div class="pro-sparkline-wrap"><div class="pro-slbl">Reaction times per note</div><div style="padding:.5rem 0">${sparkline}</div></div>` : ''}
    ${Object.keys(session.mistakeBreakdown||{}).length > 0 ? `
      <div class="pro-mistake-breakdown">
        <div class="pro-slbl">Mistake breakdown</div>
        ${Object.entries(session.mistakeBreakdown).sort((a,b)=>b[1]-a[1]).map(([cat,n])=>`
          <div class="pmb-row">
            <span class="pmb-cat">${cat.replace(/_/g,' ')}</span>
            <div class="pmb-bar-wrap"><div class="pmb-bar" style="width:${Math.min(100,n*25)}%"></div></div>
            <span class="pmb-count">×${n}</span>
          </div>`).join('')}
      </div>` : ''}
    ${topTip ? `
      <div class="pro-coach-tip">
        <div class="pro-slbl">🧠 Coach says</div>
        <div class="pct-title">${topTip.title}</div>
        <ul class="pct-tips">${topTip.tips.map(t=>`<li>${t}</li>`).join('')}</ul>
      </div>` : ''}
    <div class="pro-export-row">
      <button class="pro-export-btn" onclick="ExportSystem.exportAnalyticsCSV()">Export CSV</button>
      <button class="pro-export-btn" onclick="ExportSystem.exportAnalyticsJSON()">Export JSON</button>
      <button class="pro-export-btn" onclick="ExportSystem.exportTrainingReport()">Full Report</button>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// 14. HOOK INTO EXISTING GAME FUNCTIONS
// ═══════════════════════════════════════════════════════════════

const __RPA_HOOKS = window.__RPA_HOOKS || (window.__RPA_HOOKS = {});

// Hook beginStageWithData
if (typeof window.beginStageWithData === 'function' && !window.beginStageWithData.__rpaWrapped) {
  const _sys_origBeginStageWithData = window.beginStageWithData;
  __RPA_HOOKS.beginStageWithData = _sys_origBeginStageWithData;
  const wrappedBeginStageWithData = function(stage) {
    if (__RPA_HOOKS._beginBusy) {
      return _sys_origBeginStageWithData(stage);
    }
    __RPA_HOOKS._beginBusy = true;
    try {
      Analytics.startSession(G.era, stage.name, G.car?.n || 'Unknown', DIFFS[G.diff]?.n || 'Normal');
      Replay.startRecording(stage.name);
      AdaptiveDifficulty.reset(G.timeLimit);
      resetSplitGap?.();
      return _sys_origBeginStageWithData(stage);
    } finally {
      __RPA_HOOKS._beginBusy = false;
    }
  };
  wrappedBeginStageWithData.__rpaWrapped = true;
  window.beginStageWithData = wrappedBeginStageWithData;
}

// Hook loadNote to record display time
if (typeof window.loadNote === 'function' && !window.loadNote.__rpaWrapped) {
  const _sys_origLoadNote = window.loadNote;
  __RPA_HOOKS.loadNote = _sys_origLoadNote;
  const wrappedLoadNote = function() {
    const out = _sys_origLoadNote();
    if (typeof G !== 'undefined' && G.idx < (G.notes?.length || 0)) {
      Analytics.noteDisplayed(G.idx);
      Replay.logNote(G.notes[G.idx]);
    }
    return out;
  };
  wrappedLoadNote.__rpaWrapped = true;
  window.loadNote = wrappedLoadNote;
}

// Hook input for reaction time tracking
document.addEventListener('keydown', e => {
  if (e.target.id === 'g-input' && e.key.length === 1) {
    if (typeof G !== 'undefined') Analytics.recordFirstKeypress(G.idx);
    Replay.logInput(e.key);
  }
});

// Hook submitAnswer
if (typeof window.submitAnswer === 'function' && !window.submitAnswer.__rpaWrapped) {
  const _sys_origSubmit = window.submitAnswer;
  __RPA_HOOKS.submitAnswer = _sys_origSubmit;
  const wrappedSubmitAnswer = function() {
    if (__RPA_HOOKS._submitBusy) {
      return _sys_origSubmit();
    }
    __RPA_HOOKS._submitBusy = true;
    try {
      const preIdx = typeof G !== 'undefined' ? G.idx : 0;
      const out = _sys_origSubmit();
      if (typeof G !== 'undefined' && G.results.length > 0) {
        const lastResult = G.results[G.results.length - 1];
        Analytics.recordNote(preIdx, lastResult.raw, lastResult.ans, lastResult.typed, lastResult.ok, lastResult.score, 0);
        AdaptiveDifficulty.recordResult(lastResult.ok);
        Replay.logSubmit(lastResult.typed, lastResult.ok, lastResult.score);
        if (lastResult.ok) {
          TrainingProgram.recordDrillResult?.(TrainingProgram.getCurrentLevel?.()?.id, 'session', G.correct / Math.max(1, G.notes.length) * 100, Analytics.currentSession?.id);
        }
      }
      return out;
    } finally {
      __RPA_HOOKS._submitBusy = false;
    }
  };
  wrappedSubmitAnswer.__rpaWrapped = true;
  window.submitAnswer = wrappedSubmitAnswer;
}

// Hook endStage
if (typeof window.endStage === 'function' && !window.endStage.__rpaWrapped) {
  const _sys_origEndStage = window.endStage;
  __RPA_HOOKS.endStage = _sys_origEndStage;
  const wrappedEndStage = function() {
    const out = _sys_origEndStage();
    const session = Analytics.endSession(G.dnf, null);
    Replay.endRecording(session);
    if (session && MODE.isPro) {
      setTimeout(() => renderProSummary(session), 800);
    }
    return out;
  };
  wrappedEndStage.__rpaWrapped = true;
  window.endStage = wrappedEndStage;
}

// ═══════════════════════════════════════════════════════════════
// 15. EXTENDED TUTORIAL RENDER — replaces original
// ═══════════════════════════════════════════════════════════════

function renderExtendedTutStep() {
  const steps = window.TUTORIAL_STEPS_EXTENDED;
  if (!steps) return;
  const currentStep = (typeof tutStep !== 'undefined') ? tutStep : 0;
  // Use existing tutStep counter
  const step = steps[currentStep];
  if (!step) { endExtendedTutorial(); return; }

  const total = steps.length;
  const pct = (currentStep / (total - 1)) * 100;

  document.getElementById('tut-prog-fill').style.width = pct + '%';
  document.getElementById('tut-step-label').textContent = `${step.phase?.toUpperCase() || 'TUTORIAL'} · Step ${currentStep + 1} of ${total}`;
  document.getElementById('tut-title').textContent = step.title;
  document.getElementById('tut-body').innerHTML = step.body;

  const noteEl = document.getElementById('tut-note-display');
  noteEl.style.display = step.note ? 'block' : 'none';
  if (step.note) noteEl.textContent = step.note;

  const hlEl = document.getElementById('tut-highlight-box');
  hlEl.style.display = step.highlight ? 'block' : 'none';
  if (step.highlight) hlEl.textContent = step.highlight;

  const inputWrap = document.getElementById('tut-input-wrap');
  const inputEl = document.getElementById('tut-input');
  const hintEl = document.getElementById('tut-input-hint');
  const feedbackEl = document.getElementById('tut-feedback-line');
  const nextBtn = document.getElementById('tut-next');

  if (step.isModeChoice) {
    inputWrap.style.display = 'none';
    nextBtn.style.display = 'none';
    // Inject mode choice buttons
    const existingChoice = document.getElementById('tut-mode-choice');
    if (!existingChoice) {
      const choiceDiv = document.createElement('div');
      choiceDiv.id = 'tut-mode-choice';
      choiceDiv.style.cssText = 'display:flex;gap:10px;margin-top:1rem;';
      choiceDiv.innerHTML = `
        <button onclick="chooseTutMode('game')" style="flex:1;padding:1.1rem;background:#111116;border:1px solid #252530;color:#f0f0f0;cursor:pointer;font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:2px;transition:all .15s">
          🎮 GAME MODE<div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#9090a8;font-weight:400;letter-spacing:.05em;margin-top:.35rem;text-transform:none">Play instantly · Simple feedback · Fun first</div>
        </button>
        <button onclick="chooseTutMode('pro')" style="flex:1;padding:1.1rem;background:#1a1400;border:1px solid #f5c518;color:#f5c518;cursor:pointer;font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:2px;transition:all .15s">
          🧠 TRAINING MODE<div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#9090a8;font-weight:400;letter-spacing:.05em;margin-top:.35rem;text-transform:none">Analytics · Coaching · Structured drills</div>
        </button>
      `;
      document.getElementById('tut-box').querySelector('div').appendChild(choiceDiv);
    }
    return;
  }

  // Remove mode choice if present
  const mc = document.getElementById('tut-mode-choice');
  if (mc) mc.remove();

  if (step.needsInput) {
    inputWrap.style.display = 'block';
    if (inputEl) { inputEl.value = ''; inputEl.disabled = false; }
    if (hintEl) hintEl.textContent = step.prompt || 'Type your translation';
    if (feedbackEl) { feedbackEl.textContent = ''; feedbackEl.style.color = ''; }
    nextBtn.style.display = 'none';
    setTimeout(() => inputEl?.focus(), 80);

    if (step.timedStep && step.timeLimit) {
      if (typeof tutTimer !== 'undefined') clearInterval(tutTimer);
      let remaining = step.timeLimit;
      if (hintEl) { hintEl.textContent = `${remaining}s remaining`; hintEl.style.color = '#5a5a70'; }
      window.tutTimer = setInterval(() => {
        remaining--;
        if (hintEl) {
          hintEl.textContent = `${remaining}s remaining`;
          hintEl.style.color = remaining <= 3 ? '#e8291c' : '#5a5a70';
        }
        if (remaining <= 0) {
          clearInterval(window.tutTimer);
          if (feedbackEl) { feedbackEl.textContent = 'Time up. Press Continue to retry the next step.'; feedbackEl.style.color = '#f5c518'; }
          if (inputEl) inputEl.disabled = true;
          nextBtn.style.display = 'block';
        }
      }, 1000);
    }
  } else {
    inputWrap.style.display = 'none';
    nextBtn.style.display = 'block';
    nextBtn.textContent = step.nextLabel || 'Continue';
  }
}

function chooseTutMode(mode) {
  MODE.pro = (mode === 'pro');
  try { localStorage.setItem('rpa_pro_mode', MODE.isPro ? '1' : '0'); } catch(e){}
  document.body.classList.toggle('pro-mode', MODE.isPro);
  renderModeToggle();
  document.getElementById('tut-overlay').style.display = 'none';
  if (typeof tutTimer !== 'undefined') clearInterval(tutTimer);
  // Go to quick stage or career depending on what they know
  openSetupFresh?.() || openSetup?.();
}

function endExtendedTutorial() {
  document.getElementById('tut-overlay').style.display = 'none';
  if (typeof tutTimer !== 'undefined') clearInterval(tutTimer);
  // Show mode choice screen if not already chosen
  openSetupFresh?.() || openSetup?.();
}

// Override renderTutStep to use extended steps
window.renderTutStep = function() {
  if (window.TUTORIAL_STEPS_EXTENDED) {
    renderExtendedTutStep();
  }
};

// Override tutNext to use extended steps
window.tutNext = function() {
  const steps = window.TUTORIAL_STEPS_EXTENDED;
  if (!steps) return;
  if (typeof tutStep === 'undefined') return;
  tutStep++;
  if (tutStep >= steps.length) { endExtendedTutorial(); return; }
  renderExtendedTutStep();
};

// Override checkTutInput to use extended accept lists
window.checkTutInput = function() {
  const steps = window.TUTORIAL_STEPS_EXTENDED;
  if (!steps) return;
  if (typeof tutStep === 'undefined') return;
  const step = steps[tutStep];
  if (!step || !step.needsInput) return;

  const inputEl = document.getElementById('tut-input');
  const feedbackEl = document.getElementById('tut-feedback-line');
  if (!inputEl || !feedbackEl) return;

  const val = inputEl.value.trim().toLowerCase().replace(/[^a-z0-9 ']/g,'');
  if (!val) return;

  const accepted = step.accept || [];
  let matched = false;
  for (const a of accepted) {
    const aClean = a.toLowerCase().replace(/[^a-z0-9 ']/g,'');
    const wordsVal = new Set(val.split(/\s+/));
    const wordsAns = new Set(aClean.split(/\s+/));
    let hits = 0; wordsAns.forEach(w => { if (wordsVal.has(w)) hits++; });
    if (hits / wordsAns.size >= 0.6) { matched = true; break; }
  }

  if (typeof tutTimer !== 'undefined') clearInterval(tutTimer);

  if (matched) {
    feedbackEl.textContent = '✓ ' + (step.successMsg || 'Correct');
    feedbackEl.style.color = '#39ff14';
    inputEl.disabled = true;
    document.getElementById('tut-next').style.display = 'block';
    document.getElementById('tut-next').textContent = step.nextLabel || 'Next →';
  } else {
    feedbackEl.textContent = 'Not quite — read the note again and try once more.';
    feedbackEl.style.color = '#ff9090';
    inputEl.style.animation = 'none';
    requestAnimationFrame(() => { inputEl.style.animation = 'tutShake .3s ease'; });
  }
};

// ═══════════════════════════════════════════════════════════════
// 16. INITIALISATION
// ═══════════════════════════════════════════════════════════════

function initSystems() {
  Analytics.load();
  TrainingProgram.load();
  CoDriverAudio.loadPrefs();
  Accessibility.load();
  MODE.load();
  renderModeToggle();
  renderAnalyticsOverlay();

  // Wire up mode toggle button if exists
  const modeBtn = document.getElementById('mode-toggle-btn');
  if (modeBtn) modeBtn.addEventListener('click', () => MODE.toggle());

  // Wire adaptive difficulty to game
  AdaptiveDifficulty.enabled = MODE.isPro;

  console.log('[RPA Systems] v3.0 initialised. Pro mode:', MODE.isPro);
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSystems);
} else {
  setTimeout(initSystems, 100);
}

// ═══════════════════════════════════════════════════════════════
// SCREEN OPEN FUNCTIONS FOR NEW SCREENS
// ═══════════════════════════════════════════════════════════════

function openAnalytics() {
  show('analytics');
  renderAnalyticsDashboard();
}

function openPrograms() {
  show('programs');
  renderTrainingPrograms();
}

function openEditor() {
  show('editor');
  renderEditorUI();
}

function openAccessibility() {
  show('accessibility');
  renderAccessibilitySettings();
}

function openSetupFresh() {
  // Called after tutorial — show mode choice first if needed
  openSetup?.();
}

// ── ANALYTICS DASHBOARD RENDER ──
function renderAnalyticsDashboard() {
  const body = document.getElementById('analytics-body');
  if (!body) return;
  const stats = Analytics.getLifetimeStats();
  const tips = stats ? Coach.analyseLifetime(stats) : [];

  if (!stats) {
    body.innerHTML = `<div style="font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--text2);padding:2rem;text-align:center">
      No sessions recorded yet.<br><br>Complete a stage to begin tracking.
    </div>`;
    return;
  }

  const trendColors = { improving:'#39ff14', declining:'#e8291c', stable:'#f5c518' };
  const trendIcons  = { improving:'↑', declining:'↓', stable:'→' };

  body.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:1.25rem">
      ${[
        ['Lifetime Accuracy', stats.lifetime_accuracy+'%', stats.lifetime_accuracy>70?'#39ff14':stats.lifetime_accuracy>50?'#f5c518':'#e8291c'],
        ['Sessions', stats.sessions, 'var(--text)'],
        ['Avg Reaction', (stats.avg_reaction_ms/1000).toFixed(1)+'s', stats.avg_reaction_ms<5000?'#39ff14':stats.avg_reaction_ms<8000?'#f5c518':'#e8291c'],
        ['Consistency', stats.consistency+'/100', stats.consistency>70?'#39ff14':stats.consistency>50?'#f5c518':'#e8291c'],
        ['Best Accuracy', stats.bestAccuracy+'%', '#39ff14'],
        ['Best Reaction', (stats.best_reaction_ms/1000).toFixed(2)+'s', '#39ff14'],
        ['DNF Count', stats.dnfCount, stats.dnfCount>3?'#e8291c':'var(--text)'],
        ['Trend', trendIcons[stats.recentTrend]+' '+stats.recentTrend, trendColors[stats.recentTrend]]
      ].map(([l,v,c])=>`<div style="background:var(--surf);border:1px solid var(--brd2);padding:.75rem;text-align:center">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:${c};letter-spacing:1px">${v}</div>
        <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--text3);text-transform:uppercase;margin-top:2px">${l}</div>
      </div>`).join('')}
    </div>

    ${Object.keys(stats.mistakeBreakdown).length > 0 ? `
    <div style="background:var(--surf);border:1px solid var(--brd2);padding:1rem;margin-bottom:1rem">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:var(--text2);margin-bottom:.75rem">Mistake Heatmap</div>
      ${Object.entries(stats.mistakeBreakdown).sort((a,b)=>b[1]-a[1]).map(([cat,n])=>{
        const maxN = Math.max(...Object.values(stats.mistakeBreakdown));
        const pct = Math.round((n/maxN)*100);
        const col = pct>70?'#e8291c':pct>40?'#f5c518':'#39ff14';
        return `<div style="display:flex;align-items:center;gap:10px;padding:4px 0;border-bottom:1px solid var(--brd)">
          <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text2);min-width:180px">${cat.replace(/_/g,' ')}</span>
          <div style="flex:1;height:6px;background:var(--brd2);border-radius:3px;overflow:hidden">
            <div style="height:100%;width:${pct}%;background:${col};border-radius:3px;transition:width .5s"></div>
          </div>
          <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:${col};min-width:24px;text-align:right">×${n}</span>
        </div>`;
      }).join('')}
    </div>` : ''}

    ${tips.length > 0 ? `
    <div style="background:var(--surf);border:1px solid var(--brd2);padding:1rem;margin-bottom:1rem">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:var(--gold);margin-bottom:.75rem">🧠 AI Coaching</div>
      ${tips.map(tip=>`<div style="background:${tip.priority==='high'?'#1a0a0a':'#1a1400'};border:1px solid ${tip.priority==='high'?'var(--red)':'var(--gold)'};padding:.75rem 1rem;margin-bottom:.5rem">
        <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:${tip.priority==='high'?'#ff7070':'var(--gold)'};margin-bottom:.5rem">${tip.title}</div>
        <ul style="padding-left:1.1rem;margin:0">${tip.tips.map(t=>`<li style="font-size:12px;color:var(--text2);line-height:1.6;margin-bottom:.2rem">${t}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>` : ''}

    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="gbtn sec2" onclick="ExportSystem.exportAnalyticsCSV()">Export CSV</button>
      <button class="gbtn sec2" onclick="ExportSystem.exportAnalyticsJSON()">Export JSON</button>
      <button class="gbtn" onclick="ExportSystem.exportTrainingReport()">Training Report</button>
    </div>
  `;
}

// ── TRAINING PROGRAMS RENDER ──
function renderTrainingPrograms() {
  const body = document.getElementById('programs-body');
  if (!body) return;
  const currentLevel = TrainingProgram.getCurrentLevel();

  body.innerHTML = `
    <div style="font-size:13px;color:var(--text2);margin-bottom:1rem;font-family:'IBM Plex Mono',monospace">
      Current level: <strong style="color:var(--gold)">${currentLevel.label}</strong>
    </div>
    ${TrainingProgram.LEVELS.map(level => {
      const unlocked = TrainingProgram.isUnlocked(level.id);
      const certified = TrainingProgram.isCertified(level.id);
      const prog = TrainingProgram.progress[level.id] || {};
      return `
      <div class="training-level ${!unlocked?'locked':''} ${certified?'certified':''}">
        <div class="tl-hdr">
          <span class="tl-icon">${level.icon}</span>
          <span class="tl-label">${level.label}</span>
          <span class="tl-badge ${certified?'cert':!unlocked?'locked':'active'}">
            ${certified ? '✓ CERTIFIED' : !unlocked ? 'LOCKED' : 'IN PROGRESS'}
          </span>
        </div>
        <div style="padding:.5rem 1rem;font-size:12px;color:var(--text2);border-bottom:1px solid var(--brd)">${level.description}</div>
        <div class="tl-drills">
          ${level.drills.map(drill => {
            const done = (prog.drillsCompleted||[]).includes(drill.id);
            return `<div class="tl-drill ${done?'done':''}">
              <span class="tl-drill-status">${done?'✓':'○'}</span>
              <span class="tl-drill-name">${drill.name}</span>
              <span class="tl-drill-target">Target: ${drill.target.accuracy}% · ${drill.timeLimit}s</span>
            </div>`;
          }).join('')}
        </div>
        <div style="padding:.5rem 1rem;font-size:11px;color:var(--text3);font-family:'IBM Plex Mono',monospace;border-top:1px solid var(--brd)">
          Certification: ${level.certification.accuracy}% accuracy across ${level.certification.sessions} sessions
          ${prog.sessions ? ` · ${prog.sessions.filter(s=>s.accuracy>=level.certification.accuracy).length}/${level.certification.sessions} qualifying runs` : ''}
        </div>
      </div>`;
    }).join('')}
  `;
}

// ── EDITOR FUNCTIONS ──
function renderEditorUI() {
  // Format buttons
  const fmtEl = document.getElementById('editor-format-btns');
  if (fmtEl) {
    fmtEl.innerHTML = Object.entries(PacenoteSystem.FORMATS).map(([k,f])=>`
      <button class="audio-style-btn ${PacenoteSystem.activeFormat===k?'on':''}" onclick="PacenoteSystem.setFormat('${k}');renderEditorUI()">
        ${f.label}<div style="font-size:9px;color:var(--text3);font-weight:400;letter-spacing:0;margin-top:2px">${f.description}</div>
      </button>`).join('');
  }
  // Audio style buttons
  const audEl = document.getElementById('editor-audio-btns');
  if (audEl) {
    audEl.innerHTML = Object.entries(CoDriverAudio.STYLES).map(([k,s])=>`
      <button class="audio-style-btn ${CoDriverAudio.style===k?'on':''}" onclick="CoDriverAudio.setStyle('${k}');renderEditorUI()">
        ${s.label}<div style="font-size:9px;color:var(--text3);font-weight:400;letter-spacing:0;margin-top:2px">${s.description}</div>
      </button>`).join('');
  }
  renderEditorNotes();

  // Live translation preview
  const noteInput = document.getElementById('editor-note-input');
  const preview = document.getElementById('editor-translation-preview');
  if (noteInput && preview) {
    noteInput.oninput = () => {
      const val = noteInput.value.trim();
      preview.textContent = val ? '→ ' + PacenoteSystem.translate(val) : '';
    };
  }
}

function renderEditorNotes() {
  const list = document.getElementById('editor-note-list');
  if (!list) return;
  if (!StageEditor.notes.length) {
    list.innerHTML = `<div style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--text3);padding:1rem;text-align:center">No notes yet. Type a note above and click Add.</div>`;
    return;
  }
  list.innerHTML = StageEditor.notes.map((n, i) => `
    <div class="editor-note-row">
      <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text3);min-width:20px">${i+1}</span>
      <span class="editor-note-raw">${n.raw}</span>
      <span class="editor-note-trans">${n.ans}</span>
      <button class="editor-ctrl-btn" onclick="StageEditor.moveNote('${n.id}','up');renderEditorNotes()">↑</button>
      <button class="editor-ctrl-btn" onclick="StageEditor.moveNote('${n.id}','down');renderEditorNotes()">↓</button>
      <button class="editor-ctrl-btn" onclick="editorPreviewNote('${n.raw}')">▶</button>
      <button class="editor-ctrl-btn" onclick="StageEditor.removeNote('${n.id}');renderEditorNotes()" style="border-color:var(--red);color:var(--red)">✕</button>
    </div>`).join('');
}

function editorAddNote() {
  const input = document.getElementById('editor-note-input');
  const name = document.getElementById('editor-stage-name');
  const country = document.getElementById('editor-country');
  if (!input || !input.value.trim()) return;
  StageEditor.stageName = name?.value || 'Custom Stage';
  StageEditor.country = country?.value || 'Custom';
  StageEditor.addNote(input.value);
  input.value = '';
  document.getElementById('editor-translation-preview').textContent = '';
  renderEditorNotes();
}

function editorPreviewNote(raw) {
  CoDriverAudio.speak(PacenoteSystem.translate(raw));
}

function playCustomStage() {
  if (!StageEditor.notes.length) { alert('Add some notes first.'); return; }
  G.era = G.era || 'grpb';
  G.driver = G.driver || 'Driver';
  G.codriver = G.codriver || 'Co-driver';
  G.car = G.car || (ERAS[G.era]?.cars[0]);
  G.diff = G.diff || 1;
  G.timeLimit = DIFFS[G.diff]?.s || 9;
  beginStageWithData?.(StageEditor.toGameStage());
}

function previewCustomStage() {
  alert(`Stage: ${StageEditor.stageName}\n${StageEditor.notes.length} notes\nFirst note: ${StageEditor.notes[0]?.raw || 'none'}`);
}

function editorImport() {
  const ta = document.getElementById('editor-import-json');
  if (!ta || !ta.value.trim()) return;
  if (StageEditor.importStage(ta.value)) {
    ta.value = '';
    renderEditorNotes();
  } else {
    alert('Invalid stage JSON.');
  }
}

// ── ACCESSIBILITY SETTINGS RENDER ──
function toggleAccessibilitySetting(key) {
  Accessibility.set(key, !Accessibility.prefs[key]);
  renderAccessibilitySettings();
}

function renderAccessibilitySettings() {
  const body = document.getElementById('accessibility-body');
  if (!body) return;

  body.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:1rem">
      ${[
        ['timerAssist', 'Timer Assist (+3 seconds)', 'Adds 3 seconds to every note timer. Good for learning without pressure.'],
        ['highContrast', 'High Contrast Mode', 'Increases contrast ratios for better readability.'],
        ['largeText', 'Large Text', 'Increases pacenote and input text size.'],
        ['reducedMotion', 'Reduced Motion', 'Disables animations and screen shake effects.'],
        ['keyboardMode', 'Keyboard Shortcuts Visible', 'Shows keyboard shortcuts prominently in the UI.'],
      ].map(([key, label, desc]) => `
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;background:var(--surf);border:1px solid var(--brd2);padding:.85rem 1rem">
          <div>
            <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:.25rem">${label}</div>
            <div style="font-size:12px;color:var(--text2)">${desc}</div>
          </div>
          <button onclick="toggleAccessibilitySetting('${key}')" style="
            padding:6px 14px;border:1px solid ${Accessibility.prefs[key]?'var(--green)':'var(--brd2)'};
            background:${Accessibility.prefs[key]?'#041a08':'none'};
            color:${Accessibility.prefs[key]?'var(--green)':'var(--text2)'};
            font-family:'IBM Plex Mono',monospace;font-size:12px;cursor:pointer;white-space:nowrap;transition:all .15s">
            ${Accessibility.prefs[key] ? 'ON' : 'OFF'}
          </button>
        </div>`).join('')}

      <div style="background:var(--surf);border:1px solid var(--brd2);padding:.85rem 1rem">
        <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:.5rem">Co-driver Style</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${Object.entries(CoDriverAudio.STYLES).map(([k,s])=>`
          <button class="audio-style-btn ${CoDriverAudio.style===k?'on':''}" onclick="CoDriverAudio.setStyle('${k}');renderAccessibilitySettings()">${s.label}</button>`).join('')}
        </div>
      </div>

      <div style="background:var(--surf);border:1px solid var(--brd2);padding:.85rem 1rem">
        <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:.25rem">Notation Format</div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:.5rem">Change how pacenotes are displayed</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${Object.entries(PacenoteSystem.FORMATS).map(([k,f])=>`
          <button class="audio-style-btn ${PacenoteSystem.activeFormat===k?'on':''}" onclick="PacenoteSystem.setFormat('${k}');renderAccessibilitySettings()">${f.label}</button>`).join('')}
        </div>
      </div>

      <div style="background:var(--surf);border:1px solid var(--brd2);padding:.85rem 1rem">
        <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:.25rem">Adaptive Difficulty</div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:.5rem">Timer automatically adjusts based on your performance</div>
        <button onclick="AdaptiveDifficulty.enabled=!AdaptiveDifficulty.enabled;renderAccessibilitySettings()" style="
          padding:6px 14px;border:1px solid ${AdaptiveDifficulty.enabled?'var(--cyan)':'var(--brd2)'};
          background:${AdaptiveDifficulty.enabled?'rgba(0,229,255,.08)':'none'};
          color:${AdaptiveDifficulty.enabled?'var(--cyan)':'var(--text2)'};
          font-family:'IBM Plex Mono',monospace;font-size:12px;cursor:pointer;transition:all .15s">
          ${AdaptiveDifficulty.enabled ? 'Adaptive ON' : 'Adaptive OFF'}
        </button>
      </div>

      <div style="background:var(--surf);border:1px solid var(--brd2);padding:.85rem 1rem">
        <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:.5rem">Game Mode / Training Mode</div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:.5rem">
          <strong style="color:var(--text)">Game Mode</strong> — Play instantly, simple feedback, fun first.<br>
          <strong style="color:var(--gold)">Training Mode</strong> — Analytics, AI coaching, structured drills, export tools. Every stage is measured and analysed.
        </div>
        <button id="mode-toggle-btn-a11y" onclick="MODE.toggle();renderAccessibilitySettings()" style="
          padding:8px 18px;border:1px solid ${MODE.isPro?'var(--gold)':'var(--brd2)'};
          background:${MODE.isPro?'#1a1400':'none'};
          color:${MODE.isPro?'var(--gold)':'var(--text2)'};
          font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:2px;cursor:pointer;transition:all .15s">
          ${MODE.isPro ? '🧠 Training Mode — Click to switch to Game' : '🎮 Game Mode — Click to switch to Training'}
        </button>
      </div>

      <div style="background:var(--surf);border:1px solid var(--brd2);padding:.85rem 1rem">
        <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:.25rem">💬 Send Feedback</div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:.5rem">
          Have a suggestion, bug report, or just want to say hi? Send a message directly to the developer.
        </div>
        <button onclick="showFeedbackForm()" style="
          padding:6px 14px;border:1px solid var(--gold);
          background:#1a1400;
          color:var(--gold);
          font-family:'IBM Plex Mono',monospace;font-size:12px;cursor:pointer;transition:all .15s">
          Send Message
        </button>
      </div>
    </div>
  `;
}

// ── SHOW PRO MENU ITEMS WHEN IN PRO MODE ──
function updateMenuForMode() {
  const analyticsBtn = document.getElementById('menu-analytics-btn');
  const programsBtn = document.getElementById('menu-programs-btn');
  if (analyticsBtn) analyticsBtn.style.display = MODE.isPro ? 'flex' : 'none';
  if (programsBtn) programsBtn.style.display = MODE.isPro ? 'flex' : 'none';
}

// Hook mode toggle to update menu
const _origModeToggle = MODE.toggle.bind(MODE);
MODE.toggle = function() {
  _origModeToggle();
  updateMenuForMode();
  AdaptiveDifficulty.enabled = this.isPro;
  renderAnalyticsOverlay();
};

// Run on init
setTimeout(updateMenuForMode, 200);

// ── FEEDBACK SYSTEM ──
function showFeedbackForm() {
  const overlay = document.createElement('div');
  overlay.id = 'feedback-overlay';
  overlay.className = 'screen active';
  overlay.style.cssText = 'z-index:10000;';
  
  overlay.innerHTML = `
    <div class="page-hdr">
      <button class="bk" onclick="document.getElementById('feedback-overlay').remove();">← Back</button>
      <div class="page-hdr-title">Send Feedback</div>
    </div>
    <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:2rem;">
      <div style="background:var(--surf2);border:1px solid var(--brd2);padding:2rem;max-width:500px;width:100%;">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--gold);margin-bottom:1rem;text-align:center;">💬 Send Feedback</div>
        <div style="font-size:12px;color:var(--text3);margin-bottom:1.5rem;text-align:center;">
          Your feedback helps improve the game! Send suggestions, bug reports, or just say hello.
        </div>
        
        <div style="margin-bottom:1rem;">
          <div style="font-size:12px;color:var(--text3);margin-bottom:0.5rem;">Your Name (optional):</div>
          <input type="text" id="feedback-name" placeholder="Your name or username" style="width:100%;padding:0.75rem;background:var(--surf);border:1px solid var(--brd);color:var(--text);">
        </div>
        
        <div style="margin-bottom:1rem;">
          <div style="font-size:12px;color:var(--text3);margin-bottom:0.5rem;">Your Email (optional):</div>
          <input type="email" id="feedback-email" placeholder="your@email.com" style="width:100%;padding:0.75rem;background:var(--surf);border:1px solid var(--brd);color:var(--text);">
        </div>
        
        <div style="margin-bottom:1rem;">
          <div style="font-size:12px;color:var(--text3);margin-bottom:0.5rem;">Message *</div>
          <textarea id="feedback-message" placeholder="Write your feedback here..." style="width:100%;padding:0.75rem;background:var(--surf);border:1px solid var(--brd);color:var(--text);min-height:120px;resize:vertical;font-family:inherit;"></textarea>
        </div>
        
        <div id="feedback-error" style="color:#e8291c;font-size:12px;margin-bottom:1rem;display:none;"></div>
        <div id="feedback-success" style="color:#39ff14;font-size:12px;margin-bottom:1rem;display:none;"></div>
        
        <button class="gbtn pri" onclick="sendFeedback()" style="width:100%;margin-bottom:0.5rem;">Send Feedback</button>
        <button class="gbtn" onclick="document.getElementById('feedback-overlay').remove();" style="width:100%;">Cancel</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
}

async function sendFeedback() {
  const name = document.getElementById('feedback-name').value.trim() || 'Anonymous';
  const email = document.getElementById('feedback-email').value.trim() || 'no-reply@rallyacademy.game';
  const message = document.getElementById('feedback-message').value.trim();
  const errorDiv = document.getElementById('feedback-error');
  const successDiv = document.getElementById('feedback-success');
  
  errorDiv.style.display = 'none';
  successDiv.style.display = 'none';
  
  if (!message || message.length < 10) {
    errorDiv.textContent = 'Please write a message (at least 10 characters)';
    errorDiv.style.display = 'block';
    return;
  }
  
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    
    const result = await response.json();
    
    if (result.success) {
      successDiv.textContent = '✓ Feedback sent! Thank you for your input.';
      successDiv.style.display = 'block';
      document.getElementById('feedback-message').value = '';
      setTimeout(() => {
        document.getElementById('feedback-overlay').remove();
      }, 2000);
    } else {
      errorDiv.textContent = result.error || 'Failed to send feedback. Please try again.';
      errorDiv.style.display = 'block';
    }
  } catch (e) {
    errorDiv.textContent = 'Network error. Please check your connection.';
    errorDiv.style.display = 'block';
  }
}
