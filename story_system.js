// Story System - RPG/Visual Novel mechanics for Rally Pacenote Academy
// Handles narrative scenes, dialogue choices, and relationship tracking

// Debug: Check if StoryData is available
if (typeof StoryData === 'undefined') {
  console.error('StoryData is not loaded! Make sure story_data.js is loaded before story_system.js');
  // Create empty placeholder to prevent errors
  window.StoryData = { male: {}, female: {} };
} else {
  console.log('StoryData loaded successfully');
}

const StorySystem = {
  // Game state for story progression
  state: {
    genderRoute: null, // 'male' or 'female'
    chapter: 1,
    stageIndex: 0,
    
    // Stats
    stats: {
      driverTrust: 50,      // 0-100, how much driver trusts you
      teamRespect: 50,      // 0-100, team opinion of you
      reputation: 50,       // 0-100, paddock-wide reputation
      mentalStress: 0,      // 0-100, affects performance
      grit: 0,              // Female route - determination under pressure
      legacy: 0,            // Career legacy score
    },
    
    // Relationship flags
    relationships: {
      driverSober: false,   // Male: helped Mikko sober up
      girlfriendHostile: false, // Male: Elena is hostile
      mechanicBond: 0,      // Jorge relationship
      saraImpressed: false, // Female: impressed engineer
    },
    
    // Story flags
    flags: {
      sawGirlfriendConfrontation: false,
      blamedForCrash: false,
      defendedDriver: false,
      usedToughLove: false,
    },
    
    // Driver states
    driverState: {
      drunk: false,
      shaken: false,
      motivated: false,
      injured: false,
    }
  },
  
  // Initialize story system
  init() {
    const saved = localStorage.getItem('rally_story_state');
    if (saved) {
      this.state = JSON.parse(saved);
    }
  },
  
  // Save state
  save() {
    localStorage.setItem('rally_story_state', JSON.stringify(this.state));
  },
  
  // Reset for new career
  reset() {
    this.state = {
      genderRoute: null,
      chapter: 1,
      stageIndex: 0,
      stats: {
        driverTrust: 50,
        teamRespect: 50,
        reputation: 50,
        mentalStress: 0,
        grit: 0,
        legacy: 0,
      },
      relationships: {
        driverSober: false,
        girlfriendHostile: false,
        mechanicBond: 0,
        saraImpressed: false,
      },
      flags: {
        sawGirlfriendConfrontation: false,
        blamedForCrash: false,
        defendedDriver: false,
        usedToughLove: false,
      },
      driverState: {
        drunk: false,
        shaken: false,
        motivated: false,
        injured: false,
      }
    };
    this.save();
  },
  
  // Select route at start
  selectRoute(route) {
    this.state.genderRoute = route;
    this.save();
  },
  
  // Apply choice consequences
  applyChoice(choice) {
    if (choice.stats) {
      Object.entries(choice.stats).forEach(([stat, value]) => {
        this.state.stats[stat] = Math.max(0, Math.min(100, this.state.stats[stat] + value));
      });
    }
    if (choice.flags) {
      Object.assign(this.state.flags, choice.flags);
    }
    if (choice.relationships) {
      Object.assign(this.state.relationships, choice.relationships);
    }
    if (choice.driverState) {
      Object.assign(this.state.driverState, choice.driverState);
    }
    this.save();
  },
  
  // Get current stage context
  getStageContext(era, stageIndex) {
    const eras = ['grpb', 'w90', 'w24'];
    const currentEra = eras.indexOf(era) + 1;
    const stageInChapter = stageIndex % 4;
    
    return {
      era: currentEra,
      chapter: currentEra,
      stage: stageInChapter + 1,
      isFirstStage: stageIndex === 0,
      isLastStage: stageIndex === 3 || stageIndex === 7 || stageIndex === 11,
      isChapterEnd: stageInChapter === 3,
    };
  }
};

// StoryData is now loaded from story_data.js
// Make sure story_data.js is loaded before story_system.js in index.html

// Story UI Controller
const StoryUI = {
  currentScene: null,
  onComplete: null,
  
  // Initialize story screen
  init() {
    // Create story screen if not exists
    if (!document.getElementById('story-screen')) {
      this.createStoryScreen();
    }
  },
  
  createStoryScreen() {
    const screen = document.createElement('div');
    screen.id = 'story-screen';
    screen.className = 'screen';
    screen.style.cssText = `
      background: #000;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
      font-family: 'IBM Plex Sans', sans-serif;
    `;
    
    screen.innerHTML = `
      <div id="story-location" style="
        font-family: 'Bebas Neue', sans-serif;
        font-size: 14px;
        letter-spacing: 3px;
        color: #f5c518;
        margin-bottom: 2rem;
        text-transform: uppercase;
        opacity: 0.8;
      "></div>
      
      <div id="story-content" style="
        max-width: 800px;
        width: 100%;
        text-align: center;
      ">
        <div id="story-speaker" style="
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: #9090a8;
          margin-bottom: 1rem;
          text-transform: uppercase;
        "></div>
        
        <div id="story-text" style="
          font-size: clamp(18px, 3vw, 24px);
          line-height: 1.6;
          color: #fff;
          margin-bottom: 3rem;
          min-height: 120px;
          white-space: pre-wrap;
        "></div>
        
        <div id="story-choices" style="
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 600px;
          margin: 0 auto;
        "></div>
      </div>
      
      <div id="story-stats" style="
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        display: flex;
        gap: 1.5rem;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        color: #606070;
      ">
        <span id="stat-trust">Trust: 50</span>
        <span id="stat-reputation">Rep: 50</span>
        <span id="stat-stress">Stress: 0</span>
        <span id="stat-grit">Grit: 0</span>
      </div>
      
      <button id="story-skip" onclick="StoryUI.skip()" style="
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: none;
        border: 1px solid #404050;
        color: #606070;
        padding: 0.5rem 1rem;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 11px;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
      ">Skip Story</button>
    `;
    
    document.body.appendChild(screen);
  },
  
  // Show story scene
  showScene(sceneData, onComplete) {
    this.init();
    this.currentScene = sceneData;
    this.onComplete = onComplete;
    
    const screen = document.getElementById('story-screen');
    // Ensure screen is visible
    screen.style.display = 'flex';
    const location = document.getElementById('story-location');
    const speaker = document.getElementById('story-speaker');
    const text = document.getElementById('story-text');
    const choices = document.getElementById('story-choices');
    
    // Update stats display
    this.updateStats();
    
    // Clear previous
    choices.innerHTML = '';
    
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Typewriter effect for text with TTS
    let dialogueIndex = 0;
    const showNextDialogue = () => {
      if (dialogueIndex >= sceneData.dialogue.length) {
        // Show choices
        this.showChoices(sceneData.choices);
        return;
      }
      
      const line = sceneData.dialogue[dialogueIndex];
      location.textContent = sceneData.location;
      const speakerName = line.speaker === 'you' ? 'You' : 
                           line.speaker === 'narrator' ? '' : 
                           line.speaker.charAt(0).toUpperCase() + line.speaker.slice(1);
      speaker.textContent = speakerName;
      
      // Text-to-speech for this line
      if (window.speechSynthesis && line.text) {
        const utt = new SpeechSynthesisUtterance(line.text);
        
        // Different voice settings based on speaker type
        if (line.speaker === 'narrator') {
          // Narrator: slower, deeper, more dramatic
          utt.rate = 0.85;
          utt.pitch = 0.8;
          utt.volume = 0.9;
        } else if (line.speaker === 'you') {
          // Player character: normal
          utt.rate = 0.95;
          utt.pitch = 1.0;
          utt.volume = 0.85;
        } else {
          // Other characters: slightly varied
          utt.rate = 0.9;
          utt.pitch = 0.95;
          utt.volume = 0.9;
          
          // Adjust for emotion if specified
          if (line.emotion === 'slurred' || line.emotion === 'tired') {
            utt.rate = 0.75;
            utt.pitch = 0.85;
          } else if (line.emotion === 'angry' || line.emotion === 'hostile' || line.emotion === 'furious') {
            utt.rate = 0.95;
            utt.pitch = 0.9;
            utt.volume = 1.0;
          } else if (line.emotion === 'gruff') {
            utt.pitch = 0.75;
          }
        }
        
        // Try to find a good English voice
        const voices = window.speechSynthesis.getVoices();
        const prefVoice = voices.find(v => v.lang.startsWith('en') && 
          (v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('uk')));
        if (prefVoice) utt.voice = prefVoice;
        
        window.speechSynthesis.speak(utt);
      }
      
      // Typewriter effect with Continue button
      let charIndex = 0;
      text.textContent = '';
      text.style.opacity = '1';
      text.style.cursor = 'pointer';
      
      // Function to advance to next line
      const advanceLine = () => {
        text.onclick = null;
        text.style.cursor = 'default';
        // Remove continue button if exists
        const existingBtn = document.getElementById('story-continue-btn');
        if (existingBtn) existingBtn.remove();
        dialogueIndex++;
        showNextDialogue();
      };
      
      let typeInterval = setInterval(() => {
        if (charIndex < line.text.length) {
          text.textContent += line.text[charIndex];
          charIndex++;
        } else {
          clearInterval(typeInterval);
          // Show Continue button
          const continueBtn = document.createElement('button');
          continueBtn.id = 'story-continue-btn';
          continueBtn.style.cssText = `
            background: transparent;
            border: 1px solid #606070;
            color: #9090a8;
            padding: 0.75rem 1.5rem;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 14px;
            letter-spacing: 2px;
            cursor: pointer;
            margin-top: 2rem;
            text-transform: uppercase;
          `;
          continueBtn.textContent = '► Continue';
          continueBtn.onmouseover = () => { continueBtn.style.borderColor = '#f5c518'; continueBtn.style.color = '#f5c518'; };
          continueBtn.onmouseout = () => { continueBtn.style.borderColor = '#606070'; continueBtn.style.color = '#9090a8'; };
          continueBtn.onclick = advanceLine;
          choices.appendChild(continueBtn);
        }
      }, 25);
      
      // Click text to skip typewriter and show Continue button
      text.onclick = () => {
        clearInterval(typeInterval);
        text.textContent = line.text;
        // Show Continue button if not already shown
        if (!document.getElementById('story-continue-btn')) {
          const continueBtn = document.createElement('button');
          continueBtn.id = 'story-continue-btn';
          continueBtn.style.cssText = `
            background: transparent;
            border: 1px solid #606070;
            color: #9090a8;
            padding: 0.75rem 1.5rem;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 14px;
            letter-spacing: 2px;
            cursor: pointer;
            margin-top: 2rem;
            text-transform: uppercase;
          `;
          continueBtn.textContent = '► Continue';
          continueBtn.onmouseover = () => { continueBtn.style.borderColor = '#f5c518'; continueBtn.style.color = '#f5c518'; };
          continueBtn.onmouseout = () => { continueBtn.style.borderColor = '#606070'; continueBtn.style.color = '#9090a8'; };
          continueBtn.onclick = advanceLine;
          choices.appendChild(continueBtn);
        }
      };
    };
    
    show('story-screen');
    showNextDialogue();
  },
  
  showChoices(choicesData) {
    const choices = document.getElementById('story-choices');
    choices.innerHTML = '';
    
    choicesData.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.style.cssText = `
        background: transparent;
        border: 1px solid #f5c518;
        color: #f5c518;
        padding: 1rem 1.5rem;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 16px;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s;
        width: 100%;
      `;
      btn.textContent = choice.text;
      btn.onmouseover = () => { btn.style.background = 'rgba(245, 197, 24, 0.1)'; };
      btn.onmouseout = () => { btn.style.background = 'transparent'; };
      btn.onclick = () => this.selectChoice(choice);
      choices.appendChild(btn);
    });
  },
  
  selectChoice(choice) {
    // Store the completion callback locally
    const completionCallback = this.onComplete;
    console.log('selectChoice called, completionCallback:', completionCallback);
    
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Apply consequences
    StorySystem.applyChoice(choice.consequence);
    
    // Show consequence text
    if (choice.consequence.text) {
      const text = document.getElementById('story-text');
      const speaker = document.getElementById('story-speaker');
      const choices = document.getElementById('story-choices');
      
      speaker.textContent = '';
      text.textContent = choice.consequence.text;
      choices.innerHTML = '';
      
      // TTS for consequence text
      if (window.speechSynthesis) {
        const utt = new SpeechSynthesisUtterance(choice.consequence.text);
        utt.rate = 0.9;
        utt.pitch = 0.9;
        utt.volume = 0.85;
        
        const voices = window.speechSynthesis.getVoices();
        const prefVoice = voices.find(v => v.lang.startsWith('en') && 
          (v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('google')));
        if (prefVoice) utt.voice = prefVoice;
        
        window.speechSynthesis.speak(utt);
      }
      
      const continueBtn = document.createElement('button');
      continueBtn.id = 'story-consequence-continue';
      continueBtn.style.cssText = `
        background: #f5c518;
        border: none;
        color: #000;
        padding: 1rem 2rem;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 18px;
        cursor: pointer;
        margin-top: 2rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        pointer-events: auto;
        z-index: 1000;
      `;
      continueBtn.textContent = 'Continue';
      continueBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Consequence Continue clicked, calling completionCallback');
        // Cancel speech and complete
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        
        // Explicitly hide story screen
        const storyScreen = document.getElementById('story-screen');
        if (storyScreen) {
          storyScreen.classList.remove('active');
          storyScreen.style.display = 'none';
        }
        
        if (completionCallback) {
          completionCallback();
        } else {
          console.warn('No completionCallback available');
          // Fallback: just hide the story screen and show career
          show('career');
        }
      });
      choices.appendChild(continueBtn);
      
      this.updateStats();
    } else {
      // No consequence text, complete immediately
      if (completionCallback) {
        completionCallback();
      } else {
        this.complete();
      }
    }
  },
  
  updateStats() {
    const stats = StorySystem.state.stats;
    document.getElementById('stat-trust').textContent = `Trust: ${stats.driverTrust}`;
    document.getElementById('stat-reputation').textContent = `Rep: ${stats.reputation}`;
    document.getElementById('stat-stress').textContent = `Stress: ${stats.mentalStress}`;
    document.getElementById('stat-grit').textContent = `Grit: ${stats.grit}`;
  },
  
  complete() {
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (this.onComplete) {
      this.onComplete();
    }
  },
  
  skip() {
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.complete();
  }
};

// Route selection screen
function showRouteSelection() {
  // Create selection screen if not exists
  let selectScreen = document.getElementById('route-select');
  if (!selectScreen) {
    selectScreen = document.createElement('div');
    selectScreen.id = 'route-select';
    selectScreen.className = 'screen';
    selectScreen.style.cssText = `
      background: linear-gradient(135deg, #0a0a0c 0%, #1a1a2e 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
    `;
    
    selectScreen.innerHTML = `
      <div style="
        font-family: 'Bebas Neue', sans-serif;
        font-size: clamp(24px, 5vw, 48px);
        letter-spacing: 4px;
        color: #f5c518;
        margin-bottom: 1rem;
        text-align: center;
      ">CHOOSE YOUR PATH</div>
      
      <div style="
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 14px;
        color: #9090a8;
        margin-bottom: 3rem;
        text-align: center;
        max-width: 500px;
      ">Select your co-driver route. Each offers a different story, different challenges, and different relationships.</div>
      
      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 900px;
        width: 100%;
      ">
        <button onclick="selectRoute('male')" style="
          background: linear-gradient(180deg, rgba(245,197,24,0.1) 0%, rgba(10,10,12,0.9) 100%);
          border: 2px solid #f5c518;
          padding: 2rem;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s;
        " onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 10px 30px rgba(245,197,24,0.3)'" 
        onmouseout="this.style.transform='';this.style.boxShadow=''">
          <div style="font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: #f5c518; margin-bottom: 1rem;">MALE CO-DRIVER</div>
          <div style="font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; color: #c0c0d0; line-height: 1.6;">
            Navigate the politics of the paddock. Keep a troubled driver sober. Face the girlfriend who blames you for every scratch. Prove that you can be the voice of reason when everything is sideways at 140.
          </div>
          <div style="margin-top: 1.5rem; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #606070;">
            Stats: Driver Trust · Team Respect · Mental Stress
          </div>
        </button>
        
        <button onclick="selectRoute('female')" style="
          background: linear-gradient(180deg, rgba(245,197,24,0.1) 0%, rgba(10,10,12,0.9) 100%);
          border: 2px solid #f5c518;
          padding: 2rem;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s;
        " onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 10px 30px rgba(245,197,24,0.3)'" 
        onmouseout="this.style.transform='';this.style.boxShadow=''">
          <div style="font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: #f5c518; margin-bottom: 1rem;">FEMALE CO-DRIVER</div>
          <div style="font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; color: #c0c0d0; line-height: 1.6;">
            Break barriers in a male-dominated sport. Turn doubt into determination. Build GRIT—the ability to stay precise when everything questions your right to be here. Forge your own legacy.
          </div>
          <div style="margin-top: 1.5rem; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #606070;">
            Stats: Grit · Reputation · Legacy
          </div>
        </button>
      </div>
    `;
    
    document.body.appendChild(selectScreen);
  }
  
  show('route-select');
}

function selectRoute(route) {
  StorySystem.selectRoute(route);
  
  // Show intro for selected route
  const intro = StoryData[route].intro;
  const introScene = {
    location: intro.location,
    dialogue: [
      { speaker: intro.speaker.toLowerCase(), text: intro.narrator }
    ],
    choices: [
      {
        text: 'Begin Your Journey',
        consequence: {
          text: 'The world of rally awaits. Your seat is ready.',
          stats: route === 'female' ? { grit: 10 } : { driverTrust: 5, mentalStress: 5 }
        }
      }
    ]
  };
  
  StoryUI.showScene(introScene, () => {
    // Start career after intro
    openCareer();
  });
}

// Show story before a stage
function showPreStageStory(stageIndex, onComplete) {
  const route = StorySystem.state.genderRoute;
  if (!route) {
    onComplete();
    return;
  }
  
  const era = G.era || 'grpb';
  const ctx = StorySystem.getStageContext(era, stageIndex);
  const chapterData = StoryData[route][`chapter${ctx.chapter}`];
  
  if (!chapterData || !chapterData.preStage) {
    onComplete();
    return;
  }
  
  // Find applicable scene
  const scene = chapterData.preStage.find(s => s.condition(ctx));
  
  if (scene) {
    StoryUI.showScene(scene.scene, onComplete);
  } else {
    onComplete();
  }
}

// Show story after a stage
function showPostStageStory(stageIndex, stageResult, onComplete) {
  const route = StorySystem.state.genderRoute;
  if (!route) {
    onComplete();
    return;
  }
  
  const era = G.era || 'grpb';
  const ctx = StorySystem.getStageContext(era, stageIndex);
  const chapterData = StoryData[route][`chapter${ctx.chapter}`];
  
  if (!chapterData || !chapterData.postStage) {
    onComplete();
    return;
  }
  
  // Find applicable scene
  const scene = chapterData.postStage.find(s => s.condition(ctx));
  
  if (scene) {
    // Modify scene based on stage result if needed
    const modifiedScene = {...scene.scene};
    StoryUI.showScene(modifiedScene, onComplete);
  } else {
    onComplete();
  }
}

// Initialize immediately when script loads (DOM may already be ready)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => StorySystem.init());
} else {
  StorySystem.init();
}
