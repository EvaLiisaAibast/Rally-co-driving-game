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
              { speaker: 'narrator', text: 'Mikko is leaning against the fender of the car. He\'s holding a flask. The air smells like cheap brandy and expensive racing fuel. He isn\'t taping his wrists; he\'s staring at a dent he made in testing. The dent is shaped like a memory he\'s trying to forget.' },
              { speaker: 'mikko', text: 'The car... it\'s pushing wide. Or maybe the world is just moving too fast today. Every time you call a note perfectly, it costs me something. Trust is expensive. You ready to pay that price, or are you just here for the ride?', emotion: 'slurred' }
            ],
            choices: [
              { 
                text: '"I\'m not here to judge. I\'m here to keep you alive."',
                consequence: { 
                  text: 'Mikko: (studies you, then hands over the flask)\nAlive. That\'s the word, isn\'t it. Not fast. Not winning. Alive.\n\nHe walks toward the coffee machine without looking back. Some men drink to forget. He drinks to remember what surviving feels like.',
                  stats: { driverTrust: 15, teamRespect: 5, mentalStress: -5 },
                  flags: { driverSober: true },
                  driverState: { drunk: false }
                }
              },
              { 
                text: '"If trust is expensive, then let\'s make it worth it."',
                consequence: { 
                  text: 'Mikko:\nWorth it. That\'s a calculation. I like calculations.\n\nHe takes a drink, then another. The flask is half-empty before he speaks again.\n\nMikko: The last co-driver who talked like that? He\'s still alive. But the car he was in isn\'t. There\'s a lesson there somewhere.',
                  stats: { driverTrust: 5, mentalStress: 10 },
                  driverState: { drunk: true }
                }
              },
              { 
                text: '"The price of trust is what you pay it. Not what it costs you."',
                consequence: { 
                  text: 'Mikko: (laughs, genuinely surprised)\nNow that... that\'s something different.\n\nHe sets the flask down on the fender. Doesn\'t drink. Doesn\'t hand it over. Just leaves it there between you like a question neither of you has to answer yet.',
                  stats: { driverTrust: 10, reputation: 5, mentalStress: 5 },
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
              { speaker: 'narrator', text: 'She corners you behind the service tent. She looks like she hasn\'t slept. Not because she\'s angry—because she\'s been making the same calculation for three years and getting the same result.' },
              { speaker: 'girlfriend', text: 'He\'s shaking. Did you see his hands? He\'s drinking because the last time he drove sober, the car came back but he didn\'t. Not entirely. I\'m not threatening you. I\'m telling you what I\'ve already paid.' },
              { speaker: 'you', text: 'What do you want me to do?' },
              { speaker: 'girlfriend', text: 'I don\'t want anything. That\'s not how this works. I made a calculation once, accepted the cost, and now I live with it. You\'re making a calculation too. I\'m just telling you: the price you pay isn\'t always the one you see on the receipt.' }
            ],
            choices: [
              { 
                text: '"I\'ll keep him alive. That\'s the only calculation that matters."',
                consequence: { 
                  text: 'Girlfriend: (nods, not in agreement but in recognition)\nAlive. Yes. That\'s the word the last one used too.\n\nShe turns to leave, then stops.\n\nGirlfriend: He told me once that the notes are the only thing that\'s real in the car. Everything else—fear, doubt, the past—disappears when you call the right note at the right time. I hope you\'re right. For his sake. And for yours.',
                  stats: { driverTrust: 10, teamRespect: 5, mentalStress: 5 },
                  flags: { sawGirlfriendConfrontation: true, defendedDriver: true }
                }
              },
              { 
                text: '"What was the last co-driver\'s mistake?"',
                consequence: { 
                  text: 'Girlfriend: (looks at you like you\'ve asked the only question that matters)\nHis mistake? He thought the calculation was about the car. About the notes. About being right.\n\nShe steps closer, her voice dropping.\n\nGirlfriend: The calculation isn\'t about being right. It\'s about what you\'re willing to be wrong about. The last co-driver wouldn\'t be wrong about anything. So Mikko had to be wrong about everything.\n\nShe walks away. The calculation continues.',
                  stats: { driverTrust: 15, reputation: 5, mentalStress: 10 },
                  flags: { sawGirlfriendConfrontation: true }
                }
              },
              { 
                text: '"You\'re not asking me to save him. You\'re asking me to save yourself."',
                consequence: { 
                  text: 'Girlfriend: (doesn\'t flinch)\nMaybe. Or maybe I\'m asking you to understand that saving him and saving yourself aren\'t different calculations. They\'re the same one, just written differently.\n\nShe studies you for a long moment, then nods.\n\nGirlfriend: You\'re the first one who didn\'t promise. That\'s something. Maybe the only thing that matters.',
                  stats: { driverTrust: 5, reputation: 10, mentalStress: -5 },
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
              { speaker: 'narrator', text: 'Jorge doesn\'t look up from the suspension arm he\'s adjusting. He\'s been here since before Group B was called Group B, before the cars were monsters, before the drivers were ghosts.' },
              { speaker: 'jorge', text: 'The suspension is fine. The driver is the one with the misfire.\n\nHe tightens a bolt with the precision of someone who\'s learned that loose bolts kill people.\n\nJorge: Machines don\'t lie. They don\'t hide. They don\'t drink because they\'re scared of a corner they haven\'t reached yet. That\'s why I prefer them.' },
              { speaker: 'you', text: 'Can you fix him?' },
              { speaker: 'jorge', text: 'I\'m a mechanic, not a priest. And even if I were a priest, I couldn\'t fix something that doesn\'t want to be fixed.\n\nHe finally looks at you. His eyes are tired, not angry.' }
            ],
            choices: [
              { 
                text: '"Machines don\'t have a choice. He does."',
                consequence: { 
                  text: 'Jorge: (stops working, considers this)\nChoice. Yes. That\'s the word.\n\nHe goes back to the bolt, but slower now.\n\nJorge: The Group B car before this one? The driver made a choice too. He chose to push when he should have lifted. I found pieces of him in three different ravines.\n\nHe tightens the bolt with a final turn.\n\nJorge: Watch the Slower calls. When he doesn\'t listen, that\'s when the choice has already been made.',
                  stats: { driverTrust: 10, teamRespect: 15, mentalStress: -10 },
                  driverState: { drunk: false, shaken: true },
                  relationships: { mechanicBond: 1 }
                }
              },
              { 
                text: '"You\'ve seen this before. What did the last co-driver do wrong?"',
                consequence: { 
                  text: 'Jorge: (sets down his wrench)\nWrong.\n\nHe wipes his hands on a rag, slowly, deliberately.\n\nJorge: The last co-driver didn\'t do anything wrong. He called perfect notes. He kept the car on the road. He did everything you\'re supposed to do.\n\nHe pauses, looking at the empty seat in the cockpit.\n\nJorge: That was his mistake. Doing everything you\'re supposed to do isn\'t the same as doing what needs to be done.\n\nHe picks up the wrench again.\n\nJorge: Stage starts in twenty. Don\'t make his mistake.',
                  stats: { driverTrust: 5, teamRespect: 10, mentalStress: 5 },
                  relationships: { mechanicBond: 1 }
                }
              },
              { 
                text: '"Then let him make his choice. I\'ll just call the notes."',
                consequence: { 
                  text: 'Jorge: (nods, not in agreement but in respect)\nFair enough.\n\nHe finishes the bolt and moves to the next one.\n\nJorge: Just so you know—this car, this suspension, this setup? I built it for a driver who trusts his notes.\n\nHe doesn\'t look up.\n\nJorge: If he doesn\'t trust them, the suspension won\'t matter anyway. But if he does... this car will carry him through things it shouldn\'t survive. That\'s my choice. I made it before I ever met him.',
                  stats: { teamRespect: 5, reputation: 5 },
                  driverState: { drunk: true, motivated: true }
                }
              }
            ]
          }
        },
      ],
      
      postStage: [
        {
          id: 'blame_game',
          condition: (ctx) => ctx.stage === 1 && StorySystem.state.flags.sawGirlfriendConfrontation,
          scene: {
            location: 'SERVICE PARK',
            background: 'service_park',
            dialogue: [
              { speaker: 'narrator', text: 'After a messy stage where Mikko clipped a wall. The damage is cosmetic but the silence between them isn\'t.' },
              { speaker: 'girlfriend', text: 'He said you were late on the hairpins. He said the intercom was fuzzy.\n\nShe doesn\'t look angry. She looks like someone who\'s seen this pattern before and knows how it ends.' },
              { speaker: 'you', text: 'The notes were right. He was carrying too much speed for the entry.' },
              { speaker: 'girlfriend', text: 'I\'m not saying you\'re wrong. I\'m saying that being right doesn\'t change the wall.\n\nShe glances at Mikko, then back to you.\n\nGirlfriend: He\'s not making excuses. He\'s making a calculation. Every time he enters a corner too fast, he\'s calculating whether the car will hold or whether he\'ll have to save it. Right now, he\'s calculating that the notes are the problem because that\'s easier than admitting the fear is.' },
              { speaker: 'mikko', text: 'Enough, Elena.', emotion: 'tired' },
              { speaker: 'girlfriend', text: 'I\'m not attacking him. I\'m telling you what the calculation looks like from outside.\n\nShe turns to Mikko, her voice dropping.\n\nGirlfriend: You want to be the driver who trusts his notes. But you can\'t trust what you don\'t believe in. And right now, you don\'t believe in the notes. You don\'t believe in him. And you don\'t believe in yourself.' }
            ],
            choices: [
              { 
                text: '"The notes were early. I called them right. He\'s the one who has to trust them."',
                consequence: { 
                  text: 'Mikko looks at you. There\'s something in his eyes—not shame, not respect, but recognition.\n\nMikko: She\'s wrong about one thing. I do believe in the notes.\n\nHe walks toward the car, runs his hand along the damaged fender.\n\nMikko: I believe in them too much. That\'s the problem. When you believe in something that much, you stop questioning whether you\'re hearing it right.\n\nHe doesn\'t look back.\n\nMikko: You were early. I was late. But the difference between us? I knew I was late. I just didn\'t care.',
                  stats: { driverTrust: 15, reputation: 5 },
                  flags: { defendedDriver: true }
                }
              },
              { 
                text: '"You\'re both right. The notes don\'t matter if the driver won\'t listen."',
                consequence: { 
                  text: 'Elena studies you, surprised.\n\nGirlfriend: That\'s the first time someone\'s admitted that without choosing sides.\n\nShe looks at Mikko, then at the car.\n\nGirlfriend: The wall doesn\'t care who\'s right. The car doesn\'t either.\n\nShe walks away, leaving the two of you with the damage and the silence.\n\nMikko: (quietly) She\'s smarter than I give her credit for. But she\'s wrong about one thing.\n\nHe looks at you.\n\nMikko: I do listen. I just... I listen to the wrong things sometimes.',
                  stats: { driverTrust: 10, teamRespect: 5, mentalStress: -5 },
                  flags: { blamedForCrash: false }
                }
              },
              { 
                text: '(Stay silent)',
                consequence: { 
                  text: 'The silence hangs heavy. Mikko looks away. Elena doesn\'t smile—she just looks tired.\n\nGirlfriend: I\'ve seen this before. The silence, the wall, the pattern.\n\nShe turns to leave, then stops.\n\nGirlfriend: You know what the last co-driver did? He tried to fix everything. He tried to fix the car, the notes, Mikko, himself.\n\nShe doesn\'t look back.\n\nGirlfriend: Some things can\'t be fixed. They can only be survived.\n\nThe damage remains. The calculation continues.',
                  stats: { driverTrust: -5, reputation: -5, mentalStress: 15 },
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
              { speaker: 'narrator', text: 'Laurent doesn\'t look like a rival. He looks like someone who\'s been watching the same pattern repeat for ten years and is tired of pretending not to see it.' },
              { speaker: 'laurent', text: 'You\'re the one sitting next to Mikko.\n\nHe doesn\'t say it with malice. He says it like it\'s a fact he\'s checking.' },
              { speaker: 'you', text: 'I\'m the one keeping him ahead of you.' },
              { speaker: 'laurent', text: 'Ahead. Yes. That\'s the word.\n\nHe takes a sip of coffee, then sets the cup down.\n\nLaurent: I\'ve been ahead of Mikko before. He\'s been ahead of me. Neither of us stays there.\n\nHe looks at you, really looks at you.\n\nLaurent: You think you\'re keeping him ahead. That\'s a generous way to put it. But I\'ve watched him for a long time. He doesn\'t stay ahead because of the notes. He stays ahead in spite of them.\n\nHe pauses, letting that sink in.\n\nLaurent: The question isn\'t whether he\'ll stop listening to the notes. The question is whether you\'ll stop noticing when he does.' }
            ],
            choices: [
              { 
                text: '"Then why do you care?"',
                consequence: { 
                  text: 'Laurent: (genuinely surprised)\nWhy?\n\nHe thinks about this, like it\'s a question he hasn\'t been asked before.\n\nLaurent: Because I lost a teammate once. Not to a wall. Not to another driver. To the silence between the notes.\n\nHe picks up his cup.\n\nLaurent: When you stop hearing what\'s not being said, that\'s when the road ends. Not for the car. For you.',
                  stats: { reputation: 10, mentalStress: 5 }
                }
              },
              { 
                text: '"I notice everything. Including that you\'re not actually racing him."',
                consequence: { 
                  text: 'Laurent: (smiles, not in mockery but in respect)\nSharp.\n\nHe finishes his coffee.\n\nLaurent: You\'re right. I\'m not racing him. I\'m racing the version of myself that thought winning was about being faster than the person next to me.\n\nHe throws the cup in the trash.\n\nLaurent: Mikko? He\'s racing something else entirely. And you... you\'re either helping him win or you\'re helping him lose. The difference is smaller than you think.',
                  stats: { reputation: 15, driverTrust: 5 }
                }
              },
              { 
                text: '"What happened to the last co-driver who noticed too much?"',
                consequence: { 
                  text: 'Laurent: (doesn\'t flinch)\nHe\'s in Paris now. Sells insurance.\n\nHe says it\'s easier. When someone crashes on the track, it\'s physics. When they crash in life, it\'s... complicated.\n\nHe walks away, then stops.\n\nLaurent: But here\'s the thing—he\'s happy. The happiest former co-driver I know.\n\nHe doesn\'t look back.\n\nLaurent: Think about why that might be.',
                  stats: { reputation: 5, mentalStress: 10 }
                }
              }
            ]
          }
        },
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
              { speaker: 'narrator', text: 'Mikko is sitting in the dark. No flask this time. Just a glass of water and a thousand-yard stare. The Girlfriend is standing over him, not whispering—just being there. She stops when you approach, not because you interrupted, but because she\'s been waiting for you.' },
              { speaker: 'girlfriend', text: 'I\'ve been making the same calculation for three years. Every stage, every corner, every note.\n\nShe doesn\'t look at Mikko. She looks at you.\n\nGirlfriend: The calculation says retire with the points we have.\n\nShe pauses.\n\nGirlfriend: But I\'ve been wrong before. The calculation changes when the variables change.\n\nShe glances at Mikko, then back to you.\n\nGirlfriend: You\'ve changed the variables. I don\'t know how. I don\'t know if it\'s enough. But the calculation isn\'t what it was yesterday.' },
              { speaker: 'mikko', text: 'What do the notes say?', emotion: 'focused' },
              { speaker: 'you', text: 'The notes say there\'s a championship at the end of the next thirty kilometres.' },
              { speaker: 'mikko', text: 'That\'s not what the notes say.\n\nHe stands up, picks up his helmet.\n\nMikko: The notes say there\'s a corner. Then another. Then another.\n\nHe looks at you.\n\nMikko: Everything else—that\'s what we\'re saying. The notes don\'t say anything about championships or legacy or whether we should retire.\n\nHe puts on his helmet.\n\nMikko: They just say what\'s coming. The rest... the rest is up to us.' }
            ],
            choices: [
              { 
                text: '"Then let\'s go find out what\'s coming."',
                consequence: { 
                  text: 'Mikko: (nods)\nExactly.\n\nHe walks toward the car. Elena doesn\'t stop him. She doesn\'t say anything. She just watches.\n\nGirlfriend: (to you, quietly)\nThe calculation still says retire.\n\nShe looks at Mikko\'s back.\n\nGirlfriend: But sometimes you calculate wrong on purpose because the right answer is the one you can\'t live with.\n\nShe walks away. The road is calling. The calculation continues.',
                  stats: { driverTrust: 20, reputation: 15, legacy: 25, mentalStress: -5 },
                  flags: { finalStageMotivated: true }
                }
              },
              { 
                text: '"The notes say what\'s coming. We\'re what decides whether we survive it."',
                consequence: { 
                  text: 'Mikko: (stops at the car door, turns)\nSurvive it.\n\nHe considers this word like it\'s new.\n\nMikko: You know what the last co-driver said? Before the crash? He said we\'re going to survive this.\n\nHe opens the door.\n\nMikko: We didn\'t.\n\nHe gets in.\n\nMikko: But that doesn\'t mean we shouldn\'t try.\n\nElena stands in the doorway, watching.\n\nGirlfriend: The calculation says we\'re not going to survive this either.\n\nShe doesn\'t move.\n\nGirlfriend: But I\'m tired of being right about the wrong things.',
                  stats: { driverTrust: 15, reputation: 10, legacy: 20 },
                  driverState: { motivated: true }
                }
              },
              { 
                text: '"Some roads don\'t have an end you can see. We drive them anyway."',
                consequence: { 
                  text: 'Mikko: (laughs, softly)\nThat\'s... that\'s good.\n\nHe looks at Elena.\n\nMikko: Did you hear that?\n\nElena: (doesn\'t smile, but her eyes soften)\nI heard it.\n\nMikko: That\'s why she\'s in the car.\n\nHe points at you.\n\nMikko: She gets it.\n\nHe gets in. The engine starts.\n\nElena: (to you)\nThe calculation says this is the end.\n\nShe pauses.\n\nGirlfriend: But maybe the calculation is wrong.\n\nShe walks away. The road is calling. Nobody knows where it ends.',
                  stats: { driverTrust: 10, reputation: 20, legacy: 30, mentalStress: -15 },
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
                text: '"I didn\'t come here to be a novelty. I came here to win."',
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
