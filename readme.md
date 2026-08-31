# TAKE ME TO THE HAIRPIN

**You're not the driver. You're the reason the driver survives.**

A high-intensity rally co-driver simulator where you read pacenotes under pressure, translate them instantly, and keep the car out of the trees.

Voice input. Story mode. 18 legendary rally cars. Career progression. This is the co-driver experience.

------

## QUICK START

### Play in Browser (Recommended)

1. **Download or clone** the game files

2. **Open `index.html`** in any modern browser

3. **Start playing** — no installation, no server required

### Server Mode (Optional)

For account persistence, leaderboards, and enhanced features:

**Requirements:**
* Node.js 18+ (https://nodejs.org)
* npm (comes with Node.js)

**Setup:**
```bash
npm install
npm start
```
Then open `http://localhost:3000` in your browser.

---

### Voice Input Requirements

* **Microphone access** — for voice pacenote calls
* **Modern browser** — Chrome, Edge, Firefox, or Safari with Web Speech API support
* **Optional: Vosk WASM** — offline voice recognition (auto-downloads on first use)

---

## ABOUT THIS GAME

In rally racing, the most important role isn't behind the wheel.

It's the voice telling the driver what's coming next — at speed, without hesitation, and without mistakes.

Pacenotes look like this:

> **L3 !2 INTO R4**

You have seconds to process it.
Then you say:

> *"Left tight, caution hairpin, into right medium."*

Get it right — the stage continues.
Get it wrong — you might not.

**TAKE ME TO THE HAIRPIN turns that responsibility into a game.**

---

## KEY FEATURES

### Voice Input

* Speak real rally pacenotes using Web Speech API
* Offline Vosk WASM engine for reliable recognition with crash recovery
* Supports standard rally notation (1-6, square, hairpin, etc.)
* Training Mode (voice + typing) and Full Co-Driver Mode (voice only)
* Instant feedback on timing and accuracy
* Tight/right ambiguity tolerance for voice mode
* Considers up to 3 speech-recognition alternatives per result
* Similarity short-circuit threshold lowered to 20% for better recognition accuracy

---

### Story Mode

* Narrative-driven career progression
* Multiple rally teams and driver profiles
* Branching storylines based on your decisions
* Character-specific coaching dialogue (Mikko, Reko, Elin)
* Driver states affect gameplay:
  - **Drunk state:** +2 seconds to reaction time
  - **High mental stress (>70):** -0.5 seconds to timing window
  - **Low driver trust (<40):** In-character coaching tips
* Optional toggle — play with or without story

---

### 18 Legendary Rally Cars

* **Group B** — MG Metro 6R4, Audi Sport Quattro, Lancia 037, Peugeot 205 T16
* **WRC 90s** — Mitsubishi Lancer Evo IV, Ford Escort WRC, SEAT Córdoba WRC, Škoda Octavia WRC, Subaru Impreza WRC97
* **Rally2/R5** — Citroën C3 Rally2, Škoda Fabia R5 Rally2, VW Polo GTI R5
* **Modern Rally1** — Ford Puma Rally1, Hyundai i20N Rally1, Toyota GR Yaris Rally1, Toyota Corolla WRC
* **Classic** — Ford RS2000, Renault 5 Maxi

Each car has unique stats: acceleration, handling, stability, turbo lag, expert level.

---

### Car Tuning System

* Realistic tuning options: ARB stiffness, damping, turbo boost, brake bias, tire pressure
* Car stats affect gameplay — stability reduces damage, handling reduces crash probability
* Visible tuning warnings — see consequences before the stage
* Preset setups: Safe, Attack, Gravel, Tarmac, Ice/Snow

---

### Adaptive Difficulty

* Complexity-aware timing — busy notes get more time, simple notes get less
* Weather conditions affect visibility and reaction time
* Streak bonuses and urgency modifiers
* Story-driven difficulty changes (driver stress, intoxication)

---

### Team Management

* Budget system earned from career stage points
* Hireable staff roster (4 positions) with gameplay modifiers
* 4 tire compounds affecting performance
* Staff and tires feed into crash-probability and timing systems
* Hiring unlocks additional story dialogue (Jorge and Sara bonus scenes)

---

### Driver Profiles

* 4 unique drivers with distinct pacenote notation styles
* Career mode assigns driver profiles per round
* Briefing modals show new driver's quirks
* On-screen note display remaps to driver's symbols (e.g., !→C, INTO→>)

---

### Achievements System

* 9 unique achievements across skill levels
* Persistent storage — progress is saved
* In-game notifications when you unlock achievements
* Includes: First Pace Note, No Looking Down, Group B Survivor, Engineer Brain, Walter's Apprentice, Clean Sweep, Speed Demon, Era Master, Occupational Hazard

---

### Statistics & Analytics

* Accuracy percentage per stage and overall
* Reaction time tracking for each pacenote
* Stage completion rates and crash statistics
* Performance comparison across different cars
* Historical data to track improvement over time

---

### Coach System

* AI coaching tips based on mistake patterns
* Character-specific dialogue when driver trust is low
* Detects missed corners, wrong translations, and sequence errors
* Order-aware detection for reversed corner sequences

---

### Audio System

* Always-visible volume sliders for soundtrack and voice
* Separate controls for music and co-driver calls
* Placeholder soundtrack (Texas blues rock energy)

---

### UI/UX Features

* Rally notebook-style note presentation with paper texture
* Quick Play button — time to first pacenote under 10 seconds
* Interior view video background for immersion
* Easter eggs (rare random events)
* S keyboard shortcut to skip story dialogue

---

## WHAT THIS GAME IS

* A **co-driver simulator**
* A **voice-controlled pacenote recognition challenge**
* A game about **processing information under pressure**
* A **narrative-driven career experience**

---

## WHAT THIS GAME IS NOT

* Not a driving simulator
* Not a physics-based racing game
* Not a multiplayer game (single-player focused)
* Not forgiving

---

## SYSTEM REQUIREMENTS

* **Browser:** Chrome, Edge, Firefox, or Safari (modern version)
* **Microphone:** Required for voice input
* **Internet:** Required for Vosk model download (first-time only)
* **Storage:** ~50MB for game files

Runs on desktop and mobile browsers.

---

## GAME MODES

### Quick Play
Jump straight into gameplay — no setup required. Time to first pacenote under 10 seconds.

### Career Mode
Six-stage championship with story progression, team management, and driver relationships.

### Training School
Learn pacenote fundamentals with vocabulary panels, practice modes, and tutorial guidance.

---

## CONTROLS

### Voice Input
* Speak pacenotes naturally (e.g., "Left three, caution hairpin, into right medium")
* Microphone activates automatically in voice-only mode
* Supports standard rally notation and variations

### Keyboard
* **S** — Skip story dialogue
* **Enter** — Submit typed answer (Training Mode)
* **Escape** — Pause menu

---

## PROJECT STATUS

This is an active student project with regular updates.Check the website at https://evaliisaaibast.github.io/Take-me-to-the-hairpin-_website/ for the latest news and development updates.

---

## FINAL WORD

Rally drivers don't see the road ahead.

They trust the voice beside them.

**Now that voice is you.**
