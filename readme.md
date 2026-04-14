# Rally Pacenote Academy

A browser-based rally co-driver game and training tool. No install, no server — open the HTML file and play.

## What is it

In real rally racing, the co-driver reads handwritten shorthand notes to the driver before each corner. 
Things like `L3 !2 INTO R4` — which means "left three, caution hairpin, into right four." 
The driver hears this and reacts. Get it wrong and you're in the trees.

This game puts you in the co-driver seat. You see the raw pacenote shorthand and have to translate 
it into plain English against a countdown timer. The faster and more accurately you read the notes, 
the better your stage time.

## Features

- **Three eras** — Group B (1982–86), WRC 90s golden era, Modern Rally1 hybrid
- **Career mode** — six-round championship across all three eras with rival standings and championship points
- **Training school** — five lessons covering pacenote basics, corner severity, hazard marks, distances, and era differences, plus an untimed practice quiz
- **Obsessive tuning system** — 130+ parameters across suspension, differentials, brakes, drivetrain, engine, tyres, aerodynamics, and ballast. Every setting has a real mechanical explanation
- **Crash and damage system** — wrong reads and timeouts can trigger six crash types (spin, rock strike, puncture, water, off road, heavy contact) with real consequences including DNF
- **Stage atmosphere** — opening monologue, crowd events, split time reports, and commentator lines per era
- **Max Power tabloid newspaper result** — post-stage report in the style of a 2002 car magazine, with article, driver quotes, breakdown, and championship standings
- **Audio** — manual co-driver call button reads the note aloud at pace. Commentator lines auto-play after each answer. Stage result announced at the end

## How to play

1. Open `rally_maxpower.html` in Chrome or Firefox
2. Pick an era, name your crew, choose a car and difficulty
3. Each note appears on screen — type what it means in plain English
4. Hit Enter or Submit before the timer runs out
5. Survive eight notes to complete the stage and see the newspaper result

## Tuning

Click **Tuning Garage** from the setup screen or main menu. You can tune without picking a stage first. 
Your setup affects crash probability, damage taken, and stage time. Safe Setup and Attack Setup presets 
give you a starting point.

## No dependencies

Pure HTML, CSS, and JavaScript. One file. Works offline after download.
Uses the Web Speech API for audio — works in Chrome and most modern browsers.
