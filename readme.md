# Rally Pacenote Academy

**You’re not the driver. You’re the reason the driver survives.**

A high-intensity rally co-driver simulator where you read pacenotes under pressure, translate them instantly, and keep the car out of the trees.

Now with **multiplayer support** — host LAN parties or play online with friends.

------

## SERVER INSTALLATION

### Requirements

* Node.js 18+ (https://nodejs.org)
* npm (comes with Node.js)
* Redis (optional, for multi-server support)

### Quick Setup

1. **Clone or download the game files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### LAN Party Setup

1. Find your local IP address:
   * Windows: Run `ipconfig` in Command Prompt
   * Mac/Linux: Run `ifconfig` or `ip addr`

2. Start the server on the host machine

3. Other players join using the host's IP:
   ```
   http://192.168.x.x:3000
   ```

   Or click the **"Host LAN"** button in-game to automatically create a lobby and show connection info.

### Environment Variables

Create a `.env` file in the root directory (optional):

```
REDIS_URL=redis://localhost:6379
SMTP_KEY=your_secret_key_for_email_encryption
```

### Account System

The server includes a full account system with:
* User registration and login
* Password hashing with bcrypt
* Email verification support
* Leaderboards and stats tracking
* Save file system

Accounts are stored in `data/accounts.json`.

### Troubleshooting

**Port 3000 is already in use**
Change the port in `server.js` or kill the process using it.

**Windows Firewall blocking connections**
Add an exception for Node.js or port 3000 in Windows Firewall settings.

**Redis connection failed**
The server will run in single-server mode without Redis. Install Redis only if you need multi-server support.

---

## ABOUT THIS GAME

In rally racing, the most important role isn’t behind the wheel.

It’s the voice telling the driver what’s coming next — at speed, without hesitation, and without mistakes.

Pacenotes look like this:

> **L3 !2 INTO R4**

You have seconds to process it.
Then you say:

> *“Left three, caution hairpin, into right four.”*

Get it right — the stage continues.
Get it wrong — you might not.

**Rally Pacenote Academy turns that responsibility into a game.**

---

## KEY FEATURES

### Read. React. Survive.

* Translate real rally pacenote shorthand into plain English
* Beat the countdown timer on every call
* Chain multiple instructions under increasing pressure
* Accuracy and timing both affect your result

---

### Three distinct rally eras

* **Group B** — raw speed and chaos
* **90s WRC** — technical precision
* **Modern Rally1** — fast, dense, unforgiving

Each era changes pacing, complexity, and difficulty.

---

### Career mode

* Six-stage championship
* Rival drivers and points standings
* Progress through all three eras

---

### Training school

Learn how to actually read pacenotes:

* corner severity and numbering
* hazard markers and cautions
* distances and “into” chaining
* era-specific notation differences

Plus free practice mode.

---

### Consequences that matter

Mistakes aren’t just wrong answers.

* Spins, punctures, off-road excursions, heavy impacts
* Damage affects performance — or ends your run entirely
* One bad call can cost the stage

---

### Tuning Garage (for those who want it)

* Deep setup system with 100+ parameters
* Suspension, differentials, brakes, tyres, aero, and more
* Influences risk, damage, and stage performance

Or pick:

* **Safe Setup**
* **Attack Setup**

---

### Full stage presentation

* Opening stage intros and atmosphere
* Split times and performance feedback
* Dynamic commentator reactions
* Post-stage tabloid-style race report

All built around a single question:
**did you get the notes right?**

---

## WHAT THIS GAME IS

* A **co-driver simulator**
* A **high-speed recognition and reaction challenge**
* A game about **processing information under pressure**

---

## WHAT THIS GAME IS NOT

* Not a driving simulator
* Not a physics-based racing game
* Not forgiving

---

## SYSTEM REQUIREMENTS

Runs on anything that can open a browser.
Desktop version included.

---

## ROADMAP

* Expanded career mode
* More complex pacenote structures
* Improved input recognition and flexibility
* Optional realism vs arcade modes
* Additional eras and stages

---

## FINAL WORD

Rally drivers don’t see the road ahead.

They trust the voice beside them.

**Now that voice is you.**
