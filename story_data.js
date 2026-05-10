// Story Data - All narrative content for Rally Pacenote Academy
// This file contains all story scenes, dialogue, and choice consequences

const StoryData = {
  // MALE CO-DRIVER ROUTE
  male: {
    intro: {
      narrator: `They expect you to be the voice of reason.
The steady hand when the car is sideways at 140.
You aren't here to be a passenger. You're the navigator of a guided missile.
If you blink, he crashes. If you stutter, he dies.
Keep the rhythm. Don't let him off the hook.`,
      location: '',
      speaker: 'Narrator'
    },
    
    // Chapter 1 - Group B
    chapter1: {
      preStage: [
        {
          id: 'meeting_mikko',
          condition: (ctx) => ctx.isFirstStage,
          scene: {
            location: 'SERVICE PARK · THE TRAILER · 22:00',
            background: 'service_park',
            dialogue: [
              { speaker: 'narrator', text: 'Mikko is leaning against the fender of the car. He\'s holding a flask. The air smells like cheap brandy and expensive racing fuel. He isn\'t taping his wrists; he\'s staring at a dent he made in testing.' },
              { speaker: 'mikko', text: 'The car... it\'s pushing wide. Or maybe the world is just moving too fast today. You ready to tell me where to go, or are you just here for the ride?', emotion: 'slurred' }
            ],
            choices: [
              { 
                text: '"You\'re drunk. Give me the flask."',
                consequence: { 
                  text: 'Mikko: (laughs harshly, hands it over)\nIt\'s just... taking the edge off. This car is a monster. I needed to be a monster to match it.\n\nYou:\nI need a driver, not a monster. Go get coffee. We start in four hours.',
                  stats: { driverTrust: 10, teamRespect: 5, mentalStress: -5 },
                  flags: { driverSober: true },
                  driverState: { drunk: false }
                }
              },
              { 
                text: '"I\'m ready. Are you?"',
                consequence: { 
                  text: 'Mikko:\nGood. Because I can\'t see the apexes, but I can hear your voice. Don\'t let it shake.',
                  stats: { driverTrust: 5, mentalStress: 5 },
                  driverState: { drunk: true }
                }
              },
              { 
                text: '"If you bin it, I\'m taking the steering wheel."',
                consequence: { 
                  text: 'Mikko: (narrows eyes, then grins)\nYou\'ve got teeth. I like that. But you\'ll need more than teeth to keep us on the road.',
                  stats: { driverTrust: -5, reputation: 10, mentalStress: 10 },
                  flags: { usedToughLove: true },
                  driverState: { drunk: true, motivated: true }
                }
              }
            ]
          }
        },
        {
          id: 'girlfriend_confrontation',
          condition: (ctx) => ctx.stage === 2 && !StorySystem.state.flags.sawGirlfriendConfrontation,
          scene: {
            location: 'BEHIND THE SERVICE TENT',
            background: 'tent',
            dialogue: [
              { speaker: 'narrator', text: 'She corners you behind the service tent. She looks like she hasn\'t slept.' },
              { speaker: 'girlfriend', text: 'He\'s shaking. Did you see his hands? He\'s drinking because he\'s scared of the Group B transition.' },
              { speaker: 'you', text: 'Everyone is scared of these cars. That\'s why we have notes.' },
              { speaker: 'girlfriend', text: 'If you let him go out there like that—if you don\'t call a \'Slower\' when he\'s overdriving—I\'ll hold you responsible. Not the team. You.', emotion: 'hostile' }
            ],
            choices: [
              { 
                text: '"I\'m his co-driver, not his mother."',
                consequence: { 
                  text: 'Girlfriend: (low voice)\nThen be a good one. Because if he doesn\'t come back, I\'m coming for you.',
                  stats: { driverTrust: -5, reputation: -5, mentalStress: 15 },
                  flags: { sawGirlfriendConfrontation: true },
                  relationships: { girlfriendHostile: true }
                }
              },
              { 
                text: '"I\'ll keep him on the road. That\'s my job."',
                consequence: { 
                  text: 'Girlfriend: (studies you)\nSee that you do. Because the last co-driver who let him down... he\'s selling tyres in Helsinki now.',
                  stats: { driverTrust: 5, teamRespect: 5, mentalStress: 5 },
                  flags: { sawGirlfriendConfrontation: true, defendedDriver: true }
                }
              },
              { 
                text: '"Maybe you should be the one talking to him."',
                consequence: { 
                  text: 'Girlfriend: (bitter laugh)\nI tried. He said \'rally is my church and the co-driver is my priest.\' That\'s you, priest. Give him communion or last rites. Your choice.',
                  stats: { reputation: -10, mentalStress: 10 },
                  flags: { sawGirlfriendConfrontation: true }
                }
              }
            ]
          }
        },
        {
          id: 'mechanic_jorge',
          condition: (ctx) => ctx.stage === 3 && StorySystem.state.driverState.drunk,
          scene: {
            location: 'SERVICE BAY',
            background: 'garage',
            dialogue: [
              { speaker: 'jorge', text: 'The suspension is fine. The driver is the one with the misfire.' },
              { speaker: 'you', text: 'Can you fix him?' },
              { speaker: 'jorge', text: 'I\'m a mechanic, not a priest. Give him some oxygen and tell him if he vomits in my cockpit, he\'s cleaning it with his racing suit.', emotion: 'gruff' }
            ],
            choices: [
              { 
                text: '"I\'ll talk to him."',
                consequence: { 
                  text: 'Jorge: (grunts)\nTalk fast. Stage starts in twenty. And co-driver? Watch the \'Slower\' calls. He\'s carrying too much fear into the corners.',
                  stats: { driverTrust: 10, teamRespect: 5, mentalStress: -10 },
                  driverState: { drunk: false, shaken: true }
                }
              },
              { 
                text: '"Not my problem."',
                consequence: { 
                  text: 'Jorge: (eyes narrow)\nEverything in that car is your problem. That\'s why they pay you the big money. (muttering) Amateur.',
                  stats: { teamRespect: -15, reputation: -10 },
                  relationships: { mechanicBond: -1 }
                }
              }
            ]
          }
        }
      ],
      
      postStage: [
        {
          id: 'blame_game',
          condition: (ctx) => ctx.stage === 1 && StorySystem.state.flags.sawGirlfriendConfrontation,
          scene: {
            location: 'SERVICE PARK',
            background: 'service_park',
            dialogue: [
              { speaker: 'narrator', text: 'After a messy stage where Mikko clipped a wall.' },
              { speaker: 'girlfriend', text: 'He said you were late on the hairpins. He said the intercom was fuzzy, but I think you were just hesitant.', emotion: 'accusing' },
              { speaker: 'you', text: 'The notes were right. He was carrying too much speed for the entry.' },
              { speaker: 'girlfriend', text: 'See? He\'s already making excuses. He\'s going to get you killed because he can\'t keep up with your feet.', emotion: 'angry' },
              { speaker: 'mikko', text: 'Enough, Elena.', emotion: 'tired' },
              { speaker: 'girlfriend', text: 'No. It\'s not enough. If there\'s a scratch on him after the Power Stage, I\'ll make sure no team in this paddock touches your contract again.' }
            ],
            choices: [
              { 
                text: '"The notes were early. He was late."',
                consequence: { 
                  text: 'Mikko looks at you. There\'s something in his eyes—shame, or maybe respect.\n\nMikko: She\'s wrong. You were early. I was... I was thinking about the last corner. Not the next one. Won\'t happen again.',
                  stats: { driverTrust: 15, reputation: 5 },
                  flags: { defendedDriver: true }
                }
              },
              { 
                text: '(Stay silent)',
                consequence: { 
                  text: 'The silence hangs heavy. Mikko looks away. Elena smiles—a cold, victory smile.\n\nGirlfriend: Even he knows I\'m right.',
                  stats: { driverTrust: -10, reputation: -10, mentalStress: 20 },
                  flags: { blamedForCrash: true }
                }
              }
            ]
          }
        },
        {
          id: 'laurent_rivalry',
          condition: (ctx) => ctx.stage === 2,
          scene: {
            location: 'COFFEE MACHINE',
            background: 'service_park',
            dialogue: [
              { speaker: 'laurent', text: 'You\'re the one sitting next to the Finn who drinks his nerves away?' },
              { speaker: 'you', text: 'I\'m the one keeping him ahead of you.' },
              { speaker: 'laurent', text: 'For now. But a man like that... he\'ll eventually stop listening to the notes and start listening to the ghosts.' },
              { speaker: 'you', text: 'Then I\'ll just have to shout louder.' }
            ],
            choices: [
              { 
                text: '"Or I\'ll let the times do the talking."',
                consequence: { 
                  text: 'Laurent raises his cup in mock salute.\n\nLaurent: Times don\'t lie. But drivers do. Remember that, co-driver.',
                  stats: { reputation: 10, mentalStress: 5 }
                }
              },
              { 
                text: '"Ghosts don\'t win championships."',
                consequence: { 
                  text: 'Laurent\'s smile fades slightly.\n\nLaurent: No. But they end careers. His. Maybe yours too.',
                  stats: { reputation: 5, driverTrust: 5 }
                }
              }
            ]
          }
        }
      ]
    },
    
    // Chapter 2 - WRC 90s
    chapter2: {
      preStage: [
        {
          id: 'sara_meeting',
          condition: (ctx) => ctx.isFirstStage,
          scene: {
            location: 'TEAM TRUCK · ENGINEERING BAY',
            background: 'garage',
            dialogue: [
              { speaker: 'sara', text: 'I\'ve been watching your call data. Most guys in that seat just shout to be heard over the engine.' },
              { speaker: 'you', text: 'Volume isn\'t authority. Precision is.' },
              { speaker: 'sara', text: '(smiles)\nIs that what you tell Mikko when he\'s mid-slide?' },
              { speaker: 'you', text: 'I don\'t tell him anything mid-slide. If he\'s sliding, I\'m already three notes ahead, telling him how to get out of it.' }
            ],
            choices: [
              { 
                text: '"You engineer the car. I engineer his confidence."',
                consequence: { 
                  text: 'Sara: (nodding slowly)\nConfidence. That\'s what separates the good teams from the champions. He trusts you. That\'s rare in this sport.',
                  stats: { teamRespect: 15, driverTrust: 5 },
                  relationships: { saraImpressed: true }
                }
              },
              { 
                text: '"The car needs to match the notes, not the other way around."',
                consequence: { 
                  text: 'Sara: (laughs)\nYou sound like the old Group B engineers. They\'d say: \'Build the car, let the driver adapt.\' Different world now.',
                  stats: { reputation: 10, teamRespect: 5 }
                }
              }
            ]
          }
        }
      ],
      postStage: []
    },
    
    // Chapter 4 - The Legend (Drama Climax)
    chapter4: {
      preStage: [
        {
          id: 'final_service',
          condition: (ctx) => ctx.isLastStage,
          scene: {
            location: 'THE FINAL SERVICE · 03:00',
            background: 'dark_garage',
            dialogue: [
              { speaker: 'narrator', text: 'Mikko is sitting in the dark. No flask this time. Just a glass of water and a thousand-yard stare. The Girlfriend is standing over him, whispering. She stops when you approach.' },
              { speaker: 'girlfriend', text: 'Tell him. Tell him the stage is too dangerous. Tell him we should retire with the points we have.' },
              { speaker: 'mikko', text: 'What do the notes say?', emotion: 'focused' },
              { speaker: 'you', text: 'The notes say there\'s a championship at the end of the next thirty kilometres.' },
              { speaker: 'girlfriend', text: 'You\'re a sociopath. You\'d rather win a trophy than save your friend.', emotion: 'furious' }
            ],
            choices: [
              { 
                text: '"I\'m saving his legacy."',
                consequence: { 
                  text: 'Mikko: (stands up, steadies himself)\nShe\'s right. You are a sociopath.\n(He grabs his helmet)\nThat\'s why we\'re going to win.',
                  stats: { driverTrust: 20, reputation: 15, legacy: 25, mentalStress: 20 },
                  flags: { finalStageMotivated: true }
                }
              },
              { 
                text: '"He\'s a driver. Let him drive."',
                consequence: { 
                  text: 'Mikko: (meets your eyes)\nDamn right. I didn\'t come this far to hide from the dark.\n\nGirlfriend: (turns away)\nThen both of you can burn together.',
                  stats: { driverTrust: 15, reputation: 10, legacy: 20 },
                  driverState: { motivated: true }
                }
              },
              { 
                text: '"The road is calling. We\'re going."',
                consequence: { 
                  text: 'Mikko: (half-smile)\nThe road is calling. I like that. Sounds like something I\'d say.\n\nHe rises. No more words needed.',
                  stats: { driverTrust: 10, reputation: 20, legacy: 15, mentalStress: -10 },
                  driverState: { motivated: true, shaken: false }
                }
              }
            ]
          }
        }
      ]
    }
  },

  // FEMALE CO-DRIVER ROUTE - HIGH DRAMA
  female: {
    intro: {
      narrator: `You don't just call the notes. You translate fear into focus.
The car is a weapon. Your voice is the trigger.
They doubted you in the paddock. They called you 'the girl in the seat.'
Show them why the best co-drivers are the ones who've had to fight for every syllable.
Grit isn't optional. It's survival.`,
      location: '',
      speaker: 'Narrator'
    },
    
    chapter1: {
      preStage: [
        {
          id: 'first_meeting_female',
          condition: (ctx) => ctx.isFirstStage,
          scene: {
            location: 'SERVICE PARK · THE TRAILER',
            background: 'service_park',
            dialogue: [
              { speaker: 'narrator', text: 'The team manager looks at his clipboard, then at you. He\'s already made up his mind about you. He just hasn\'t said it yet.' },
              { speaker: 'manager', text: 'The driver\'s nervous. First female co-driver he\'s had. Hell, first female co-driver anyone\'s had in Group B. You ready for this?' },
              { speaker: 'you', text: 'I\'ve been ready for years. The question is: is he ready for me?' }
            ],
            choices: [
              { 
                text: '"I didn't come here to be a novelty. I came here to win."',
                consequence: { 
                  text: 'Manager: (raises eyebrow)\nBold. The driver likes bold. Don\'t let him down—or me.\n\nYou feel the weight settle. This is your door. Walk through it.',
                  stats: { grit: 20, reputation: 10, driverTrust: 5 }
                }
              },
              { 
                text: '"Just watch the times. That\'s all that matters."',
                consequence: { 
                  text: 'Manager: (grunts)\nCold. I like cold. Easier to work with than hot heads.\n\nHe marks something on his clipboard. You\'re in. For now.',
                  stats: { grit: 15, teamRespect: 10, reputation: 5 }
                }
              },
              { 
                text: '"Tell him to focus on the road, not my gender."',
                consequence: { 
                  text: 'Manager: (stiffens)\nCareful. You\'re already walking on thin ice. But... (half-smile) I like the fire. Just aim it at the competition.',
                  stats: { grit: 25, reputation: 15, mentalStress: 10 }
                }
              }
            ]
          }
        },
        {
          id: 'driver_first_meeting',
          condition: (ctx) => ctx.isFirstStage,
          scene: {
            location: 'THE COCKPIT · 04:30',
            background: 'cockpit',
            dialogue: [
              { speaker: 'narrator', text: 'He\'s young. Too young for Group B, some say. But he has the eyes—hungry, scared, desperate to prove himself.' },
              { speaker: 'driver', text: 'Sofia, right? Look... I\'m not gonna lie. I asked for a guy. Someone who could... you know... handle the pressure.' },
              { speaker: 'you', text: 'Handle the pressure? Or handle your ego?' }
            ],
            choices: [
              { 
                text: '"I\'ve handled worse than you. Let\'s drive."',
                consequence: { 
                  text: 'He blinks. Then laughs—nervous, surprised.\n\nDriver: Jesus. Okay. Okay, let\'s see what you\'ve got.',
                  stats: { grit: 15, driverTrust: 10, reputation: 5 }
                }
              },
              { 
                text: '"Close your eyes. Listen to my voice. That\'s all that matters."',
                consequence: { 
                  text: 'He stares at you. Then slowly nods.\n\nDriver: Yeah. Okay. Just... don\'t let me die out there.',
                  stats: { driverTrust: 15, mentalStress: -5 },
                  driverState: { nervous: true }
                }
              },
              { 
                text: '"You asked for a guy. You got the best co-driver on the grid. Deal with it."',
                  consequence: { 
                    text: 'Silence. Then he extends his hand.\n\nDriver: I\'m Marcus. Let\'s go shock the world.',
                    stats: { grit: 20, reputation: 10, driverTrust: 5, mentalStress: 5 }
                  }
              }
            ]
          }
        }
      ],
      postStage: [
        {
          id: 'first_stage_aftermath',
          condition: (ctx) => ctx.stage === 1,
          scene: {
            location: 'SERVICE PARK',
            background: 'service_park',
            dialogue: [
              { speaker: 'narrator', text: 'The mechanics work in silence. Marcus is trembling—adrenaline or fear, you can\'t tell.' },
              { speaker: 'driver', text: 'I\'ve never... I mean... those speeds. The notes came so fast. You were like... like you weren\'t even breathing.' },
              { speaker: 'you', text: 'I wasn\'t. Neither were you. That\'s the point.' }
            ],
            choices: [
              { 
                text: '"You trusted me. That\'s the hardest part done."',
                consequence: { 
                  text: 'Marcus looks at you differently now. Less doubt. More... something else.\n\nDriver: I did. I actually did. Let\'s do it again.',
                  stats: { driverTrust: 20, grit: 10, mentalStress: -10 }
                }
              },
              { 
                text: '"Next time, trust the notes, not your fear."',
                consequence: { 
                  text: 'He nods, chastened but hungry.\n\nDriver: Teach me. I want to learn.',
                  stats: { driverTrust: 15, teamRespect: 5, grit: 5 }
                }
              }
            ]
          }
        }
      ]
    },

    chapter2: {
      preStage: [
        {
          id: 'rival_female_codriver',
          condition: (ctx) => ctx.isFirstStage,
          scene: {
            location: 'PRESS PEN',
            background: 'press',
            dialogue: [
              { speaker: 'narrator', text: 'She\'s been in the sport longer. She\'s earned her seat. And she sees you as a threat to everything she\'s built.' },
              { speaker: 'claire', text: 'So you\'re the experiment. The token. Tell me—how does it feel knowing every mistake you make closes the door for the rest of us?' },
              { speaker: 'you', text: 'Every mistake I don\'t make kicks that door wide open.' }
            ],
            choices: [
              { 
                text: '"I\'m not a token. I\'m a weapon."',
                consequence: { 
                  text: 'Claire studies you. No smile. Just assessment.\n\nClaire: Good answer. Now prove it.',
                  stats: { grit: 20, reputation: 15, mentalStress: 10 }
                }
              },
              { 
                text: '"I\'m carrying the weight for all of us. I won\'t drop it."',
                consequence: { 
                  text: 'Claire\'s expression softens—barely.\n\nClaire: That\'s the first honest thing you\'ve said. Carry it well.',
                  stats: { grit: 15, reputation: 10, teamRespect: 5 }
                }
              },
              { 
                text: '"Watch the times. Then tell me if I\'m an experiment."',
                consequence: { 
                  text: 'Claire laughs—genuine, surprised.\n\nClaire: Oh, I like you. I actually like you. That\'s dangerous.',
                  stats: { reputation: 20, grit: 10 }
                }
              }
            ]
          }
        }
      ],
      postStage: []
    },
    
    chapter3: {
      preStage: [
        {
          id: 'relationship_drama',
          condition: (ctx) => ctx.stage === 1,
          scene: {
            location: 'TEAM HOTEL · BAR',
            background: 'hotel',
            dialogue: [
              { speaker: 'narrator', text: 'You shouldn\'t be here. He shouldn\'t be here. But the rally is a pressure cooker, and something\'s about to blow.' },
              { speaker: 'marcus', text: 'My girlfriend thinks I\'m sleeping with you. She says the way you look at me in the car... it\'s intimate.' },
              { speaker: 'you', text: 'The way I look at you? I\'m reading the road ahead. That\'s not intimate, that\'s survival.' },
              { speaker: 'marcus', text: 'She wants me to request a different co-driver. Says you\'re... distracting.' }
            ],
            choices: [
              { 
                text: '"I\'m not your problem. Your girlfriend\'s insecurity is."',
                consequence: { 
                  text: 'Marcus flinches. Then nods slowly.\n\nMarcus: You\'re right. I\'ll talk to her. But... just so you know? You\'re not distracting. You\'re the only thing that makes sense out there.',
                  stats: { driverTrust: 15, mentalStress: 10, grit: 5 }
                }
              },
              { 
                text: '"Tell her the car is too small for drama. Keep it out of the cockpit."',
                consequence: { 
                  text: 'Marcus: (half-smile)\nToo small for drama. I like that. I\'ll use that.',
                  stats: { driverTrust: 10, reputation: 5 }
                }
              },
              { 
                text: '"If she\'s threatened by me, what happens when we win?"',
                consequence: { 
                  text: 'Marcus looks at you—really looks at you.\n\nMarcus: Then I guess we\'ll find out what she\'s really made of.',
                  stats: { grit: 20, mentalStress: 15, reputation: 10 }
                }
              }
            ]
          }
        },
        {
          id: 'sabotage_accusation',
          condition: (ctx) => ctx.stage === 2,
          scene: {
            location: 'FIA INVESTIGATION ROOM',
            background: 'office',
            dialogue: [
              { speaker: 'steward', text: 'There\'s been a complaint. Notes found in another team\'s format in your car. They\'re accusing you of espionage.' },
              { speaker: 'you', text: 'That\'s ridiculous. I write my own notes. Every syllable is mine.' },
              { speaker: 'steward', text: 'The complaint comes from a senior team. They want you suspended pending investigation.' },
              { speaker: 'marcus', text: '(bursting in)\nShe didn\'t do it. I\'ll stake my license on it. We\'re racing today. Try to stop us.' }
            ],
            choices: [
              { 
                text: '"Marcus, don\'t. I can handle this."',
                consequence: { 
                  text: 'Marcus: (fierce)\nNo. You\'re my co-driver. They come for you, they come through me.\n\nThe steward looks between you. Something shifts in the room.',
                  stats: { driverTrust: 25, reputation: 10, grit: 15 }
                }
              },
              { 
                text: '"Check my notebooks. Every page is dated. Every note is documented."',
                consequence: { 
                  text: 'You produce your notebooks—meticulous, obsessive, dated. The steward\'s case crumbles.\n\nSteward: This... this is thorough. The complaint is dismissed.',
                  stats: { reputation: 20, teamRespect: 15 }
                }
              },
              { 
                text: '"Who filed the complaint? Let me guess—Claire Rennick?"',
                consequence: { 
                  text: 'The steward\'s silence confirms it. Marcus curses.\n\nMarcus: She\'s scared of you. Good. Let her be scared.',
                  stats: { grit: 20, mentalStress: 10, reputation: 15 }
                }
              }
            ]
          }
        }
      ],
      postStage: []
    },
    
    chapter4: {
      preStage: [
        {
          id: 'championship_climax',
          condition: (ctx) => ctx.isLastStage,
          scene: {
            location: 'THE FINAL SERVICE · 04:00',
            background: 'dark_garage',
            dialogue: [
              { speaker: 'narrator', text: 'This is it. One stage. One championship. Everything you\'ve fought for. Everything they said you couldn\'t have.' },
              { speaker: 'claire', text: '(appearing from the shadows)\nYou made it further than I thought. But this stage? This is where experiments end.' },
              { speaker: 'you', text: 'Or where legends begin.' },
              { speaker: 'marcus', text: '(to both of you)\nI\'m not a passenger in this story. I\'m the driver. And I choose who sits next to me. I choose her.' },
              { speaker: 'claire', text: 'Then when you crash, remember—I offered you wisdom. You chose... novelty.' }
            ],
            choices: [
              { 
                text: '"Get out of our garage. We have a championship to win."',
                consequence: { 
                  text: 'Claire leaves. Marcus grips your shoulder.\n\nMarcus: Let\'s go make history. Together.',
                  stats: { grit: 30, driverTrust: 20, legacy: 30, mentalStress: -20 }
                }
              },
              { 
                text: '"Marcus, look at me. Eyes on my voice. Nothing else exists."',
                consequence: { 
                  text: 'He centers. Breathes. Becomes the driver he was meant to be.\n\nMarcus: I\'m ready. Call the notes. I\'ll follow you anywhere.',
                  stats: { driverTrust: 25, legacy: 25, grit: 20 }
                }
              },
              { 
                text: '"Claire, watch the stage. Watch me prove you wrong."',
                consequence: { 
                  text: 'Claire\'s mask cracks—just for a second. Envy? Respect?\n\nClaire: I\'ll be watching. Don\'t disappoint me.',
                  stats: { reputation: 25, grit: 25, legacy: 20 }
                }
              }
            ]
          }
        }
      ],
      postStage: [
        {
          id: 'victory_or_defeat',
          condition: (ctx) => true,
          scene: {
            location: 'FINISH LINE',
            background: 'finish',
            dialogue: [
              { speaker: 'narrator', text: 'The timing beam. The silence. Then the world explodes—or it doesn\'t.' }
            ],
            choices: [
              { 
                text: '(If Won) Accept the trophy',
                consequence: { 
                  text: 'Champagne. Cameras. Marcus lifts you onto the car—a co-driver\'s place, but elevated. Visible.\n\nReporter: What do you say to those who doubted you?\n\nYou: I told them to watch the times.',
                  stats: { legacy: 50, reputation: 30, grit: 20 }
                }
              },
              { 
                text: '(If Lost) Face the press',
                consequence: { 
                  text: 'The questions are cruel. But you stand there. Take them.\n\nReporter: Was it worth it? The fight?\n\nYou: Ask me next season. I\'m not done.',
                  stats: { grit: 30, legacy: 10, mentalStress: 10 }
                }
              }
            ]
          }
        }
      ]
    }
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StoryData };
}
