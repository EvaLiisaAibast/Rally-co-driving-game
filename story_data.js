// Story Data - All narrative content for Rally Pacenote Academy
// This file contains all story scenes, dialogue, and choice consequences

// CHARACTER DEFINITIONS AND MOTIVATIONS
// Jorge: Wants to build the perfect car that saves a driver he couldn't save before. KEY CALLBACK: "Machines don't lie"
// Elena: Wants Mikko to retire alive, even if it means giving up his dream. KEY CALLBACK: "The notes are the only real thing"
// Mikko: Wants to prove he's still the driver he was before the crash. KEY CALLBACK: The dent in the fender
// Laurent: Wants to stop racing the version of himself that lost his teammate. KEY CALLBACK: "The silence between notes"
// Sara: Wants to prove that technical excellence beats discrimination. KEY CALLBACK: "I don't need you to believe in me"
// Claire: Wants to protect the opportunities she fought to create for other women. KEY CALLBACK: "The experiment"

// Faction System - Each faction has a worldview, political philosophy, and internal contradictions
const Factions = {
  // Traditionalist Factory Teams - Believe in hierarchy, tradition, and proven methods
  factoryTeams: {
    name: "Factory Teams",
    philosophy: "Success comes from tradition, hierarchy, and controlled environments. Racing should be about engineering excellence, not individual heroics.",
    strengths: ["Unlimited resources", "Technical superiority", "Institutional knowledge"],
    weaknesses: ["Bureaucratic", "Risk-averse", "Slow to adapt"],
    internalContradictions: "They claim to value innovation but fire anyone who deviates from established procedures. They preach teamwork but reward individual engineers who claim credit for collective work.",
    classesBenefiting: ["Corporate engineers", "Sponsors", "Shareholders"],
    classesSuffering: ["Privateer teams", "Creative mechanics", "Young drivers"],
    leaderMotivation: "Maintain market dominance and preserve racing's 'respectable' image for sponsors",
    memberDisagreements: "Some engineers secretly admire privateer creativity. A few younger team members want to push boundaries."
  },
  
  // Privateer Rebels - Believe in freedom, adaptation, and individual skill
  privateers: {
    name: "Privateers", 
    philosophy: "Racing is about human skill and adaptation, not corporate budgets. Anyone with talent should have a chance, regardless of funding.",
    strengths: ["Flexibility", "Innovation", "Driver-focused"],
    weaknesses: ["Limited resources", "Inconsistent reliability", "Financial instability"],
    internalContradictions: "They preach freedom but often rely on factory cast-off parts. They claim to be about talent but still need money to compete.",
    classesBenefiting: ["Talented but underfunded drivers", "Creative mechanics", "Local racing communities"],
    classesSuffering: ["Sponsors seeking guaranteed exposure", "Engineers who prefer structure", "Risk-averse investors"],
    leaderMotivation: "Prove that passion beats corporate budgets, and create opportunities for those ignored by the establishment",
    memberDisagreements: "Some members want factory sponsorship to survive. Others argue that accepting factory money betrays their principles."
  },
  
  // The Progressives - Believe in safety, regulation, and controlled evolution
  progressives: {
    name: "The Progressives",
    philosophy: "Racing must evolve responsibly. Speed without responsibility is meaningless. Safety and innovation should be balanced with human cost.",
    strengths: ["Technical innovation", "Safety expertise", "Regulatory influence"],
    weaknesses: ["Perceived as controlling", "Slower acceptance of risk", "Sometimes overcautious"],
    internalContradictions: "They advocate for safety but profit from building safer cars. They claim to protect drivers but sometimes prioritize their own regulatory authority over actual driver input.",
    classesBenefiting: ["Safety engineers", "Insurance companies", "Regulatory bodies"],
    classesSuffering: ["Purist drivers", "Traditionalists", "Fans who love danger"],
    leaderMotivation: "Shape the future of racing according to their vision, and ensure their voice remains central to all decisions",
    memberDisagreements: "Some genuinely care about driver safety. Others see regulations as a way to control competition and protect their business interests."
  },
  
  // The Old Guard - Believe in the "golden age" of racing, raw danger, and minimal intervention
  oldGuard: {
    name: "The Old Guard",
    philosophy: "Racing is about danger, bravery, and the absolute limit. Safety regulations have made it sterile. Real racing requires the possibility of death.",
    strengths: ["Experience", "Historical knowledge", "Racing purity"],
    weaknesses: ["Resistant to change", "Disregard for safety", "Limited modern technical knowledge"],
    internalContradictions: "They claim to value courage but often take unnecessary risks that endanger others. They preach tradition but many of them made their careers by breaking with tradition.",
    classesBenefiting: ["Purist fans", "Historians", "Drivers who thrive on danger"],
    classesSuffering: ["Safety advocates", "Modern engineers", "Drivers with families"],
    leaderMotivation: "Preserve what they believe racing "should be," and prove that the modern era has lost something essential",
    memberDisagreements: "Some genuinely love the sport's history. Others are using nostalgia to mask their fear of becoming irrelevant."
  },
  
  // The Media Machine - Believe racing is entertainment, spectacle, and narrative
  mediaMachine: {
    name: "The Media Machine",
    philosophy: "Racing exists to entertain. Competition is secondary to the story. Dramatic conflicts, personalities, and narratives matter more than raw performance.",
    strengths: ["Public influence", "Storytelling ability", "Marketing power"],
    weaknesses: ["Sensationalism", "Distortion of truth", "Manipulation"],
    internalContradictions: "They claim to serve the fans but often create artificial drama. They preach authenticity but manufacture narratives for maximum engagement.",
    classesBenefiting: ["Sponsors", "Casual fans", "Drivers who court media attention"],
    classesSuffering: ["Private drivers", "Teams who avoid drama", "Purist racing enthusiasts"],
    leaderMotivation: "Control the narrative and profit from the emotional investment of fans",
    memberDisagreements: "Some journalists genuinely love the sport. Others see it purely as content for engagement metrics."
  }
};

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
              { speaker: 'mikko', text: 'Car\'s pushing wide. Or maybe the world\'s moving too fast today. Every time you call a note perfectly, it costs me something. Trust is expensive. You ready to pay that price, or just here for the ride?', emotion: 'slurred' }
            ],
            choices: [
              { 
                text: '"I\'m not here to judge. I\'m here to keep you alive."',
                consequence: {
                  text: 'Mikko: (studies you, then hands over the flask)\n\nHe walks toward the coffee machine without looking back. Some men drink to forget. He drinks to remember what surviving feels like.',
                  stats: { driverTrust: 15, teamRespect: 5, mentalStress: -5 },
                  flags: { driverSober: true },
                  driverState: { drunk: false }
                }
              },
              { 
                text: '"If trust is expensive, then let\'s make it worth it."',
                consequence: {
                  text: 'Mikko: (takes a drink, then another)\n\nThe flask is half-empty before he speaks again.\n\nMikko: The last co-driver who talked like that? He\'s still alive. But the car he was in isn\'t. There\'s a lesson there somewhere.',
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
              { speaker: 'narrator', text: 'She corners you behind the service tent. She looks like she hasn\'t slept. Not because she\'s angry—because she\'s been running the numbers for three years and getting the same result.' },
              { speaker: 'girlfriend', text: 'He\'s shaking. Did you see his hands? He\'s drinking because the last time he drove sober, the car came back but he didn\'t. Not entirely. I\'m not threatening you. I\'m telling you what I\'ve already paid.' },
              { speaker: 'you', text: 'What do you want me to do?' },
              { speaker: 'girlfriend', text: 'I don\'t want anything. That\'s not how this works. I ran the numbers once, accepted the cost, and now I live with it. You\'re running them too. I\'m just telling you: the price you pay isn\'t always the one you see on the receipt.' }
            ],
            choices: [
              { 
                text: '"I\'ll keep him alive. That\'s the only number that matters."',
                consequence: {
                  text: 'Girlfriend: (nods, not in agreement but in recognition)\n\nShe turns to leave, then stops.\n\nGirlfriend: He told me once that the notes are the only thing that\'s real in the car. Everything else—fear, doubt, the past—disappears when you call the right note at the right time. I hope you\'re right. For his sake. And for yours.',
                  stats: { driverTrust: 10, teamRespect: 5, mentalStress: 5 },
                  flags: { sawGirlfriendConfrontation: true, defendedDriver: true }
                }
              },
              { 
                text: '"What was the last co-driver\'s mistake?"',
                consequence: { 
                  text: 'Girlfriend: (looks at you like you\'ve asked the only question that matters)\nHis mistake? He thought the equation was about the car. About the notes. About being right.\n\nShe steps closer, her voice dropping.\n\nGirlfriend: The equation isn\'t about being right. It\'s about what you\'re willing to be wrong about. The last co-driver wouldn\'t be wrong about anything. So Mikko had to be wrong about everything.\n\nShe walks away. The math continues.',
                  stats: { driverTrust: 15, reputation: 5, mentalStress: 10 },
                  flags: { sawGirlfriendConfrontation: true }
                }
              },
              { 
                text: '"You\'re not asking me to save him. You\'re asking me to save yourself."',
                consequence: { 
                  text: 'Girlfriend: (doesn\'t flinch)\nMaybe. Or maybe I\'m asking you to understand that saving him and saving yourself aren\'t different equations. They\'re the same one, just written differently.\n\nShe studies you for a long moment, then nods.\n\nGirlfriend: You\'re the first one who didn\'t promise. That\'s something. Maybe the only thing that matters.',
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
              { speaker: 'jorge', text: 'Suspension\'s within spec. Driver\'s got a misfire.\n\nHe tightens a bolt with the precision of someone who\'s learned that loose bolts kill people.\n\nJorge: Machines don\'t lie. They don\'t hide. They don\'t drink because they\'re scared of a corner they haven\'t reached yet. That\'s why I prefer them.' },
              { speaker: 'you', text: 'Can you fix him?' },
              { speaker: 'jorge', text: 'I\'m a mechanic, not a priest. And even if I were a priest, I couldn\'t fix something that doesn\'t want to be fixed.\n\nHe finally looks at you. His eyes are tired, not angry.' }
            ],
            choices: [
              { 
                text: '"Machines don\'t have a choice. He does."',
                consequence: {
                  text: 'Jorge: (stops working, torque wrench mid-turn)\n\nHe goes back to the bolt, but slower now.\n\nJorge: The Group B car before this one? Driver made a choice too. Push when he should have lifted. I found pieces of him in three different ravines.\n\nHe tightens the bolt with a final turn.\n\nJorge: Watch the Slower calls. When he doesn\'t listen, that\'s when the choice has already been made.',
                  stats: { driverTrust: 10, teamRespect: 15, mentalStress: -10 },
                  driverState: { drunk: false, shaken: true },
                  relationships: { mechanicBond: 1 }
                }
              },
              { 
                text: '"You\'ve seen this before. What did the last co-driver do wrong?"',
                consequence: { 
                  text: 'Jorge: (sets down his wrench)\n\nHe wipes his hands on a rag, slowly, deliberately.\n\nJorge: Last co-driver didn\'t do anything wrong. Called perfect notes. Kept the car on the road. Did everything by the book.\n\nHe pauses, looking at the empty seat in the cockpit.\n\nJorge: That was his mistake. Doing everything by the book isn\'t the same as doing what needs to be done.\n\nHe picks up the wrench again.\n\nJorge: Stage starts in twenty. Don\'t make his mistake.',
                  stats: { driverTrust: 5, teamRespect: 10, mentalStress: 5 },
                  relationships: { mechanicBond: 1 }
                }
              },
              { 
                text: '"Then let him make his choice. I\'ll just call the notes."',
                consequence: { 
                  text: 'Jorge: (nods, not in agreement but in respect)\nFair enough.\n\nHe finishes the bolt and moves to the next one.\n\nJorge: Just so you know—this car, this suspension, this setup? Built it for a driver who trusts his notes.\n\nHe doesn\'t look up.\n\nJorge: If he doesn\'t trust them, the suspension won\'t matter anyway. But if he does... this car will carry him through things it shouldn\'t survive. That\'s my choice. Made it before I ever met him.',
                  stats: { teamRespect: 5, reputation: 5 },
                  driverState: { drunk: true, motivated: true }
                }
              },
              {
                text: '[Engineering] The dampers are too stiff for his state. Let me adjust them.',
                consequence: {
                  text: 'Jorge: (looks up, genuinely interested)\nToo stiff? You think?\n\nHe steps aside, lets you look at the setup.\n\nJorge: Go ahead then. Show me what you\'d change.\n\nYou adjust the dampers, softening the compression. Jorge watches, then nods slowly.\n\nJorge: Forgiving setup. Less likely to snap if he makes a mistake.\n\nHe looks at you with new respect.\n\nJorge: You\'re not just calling notes. You\'re engineering trust.\n\nHe finishes the bolt.\n\nJorge: Stage starts in twenty. He might actually survive this one.',
                  stats: { driverTrust: 15, teamRespect: 20, mentalStress: -15 },
                  driverState: { drunk: true, motivated: true },
                  relationships: { mechanicBond: 2 },
                  flags: { engineeringSolution: true }
                },
                condition: (ctx) => StorySystem.skills.engineering >= 35
              }
            ]
          }
        },
        {
          id: 'jorge_hired_bonus',
          condition: (ctx) => ctx.stage === 4 && StorySystem.state.flags.hiredJorge && !StorySystem.state.flags.sawJorgeHiredScene,
          scene: {
            location: 'SERVICE BAY · EARLY MORNING',
            background: 'garage',
            dialogue: [
              { speaker: 'narrator', text: 'Jorge is already there when you arrive, coffee in one hand, torque wrench in the other. The car looks better than it has all season.' },
              { speaker: 'jorge', text: 'Payroll. Proper procurement. That\'s new.' },
              { speaker: 'you', text: 'You keep him alive. Seemed like a good investment.' },
              { speaker: 'jorge', text: 'Three seasons of suspension rebuild on my own time. Now I get proper parts, proper hours.\n\nHe pats the roll cage like it\'s a precision instrument.\n\nJorge: Whatever happens out there today, won\'t be because this car let you down.' }
            ],
            choices: [
              {
                text: '"That\'s all I needed to hear."',
                consequence: {
                  text: 'Jorge nods once, satisfied, returns to the bench. Engine fires on first crank — hasn\'t done that all season.',
                  stats: { driverTrust: 5, mentalStress: -5 },
                  flags: { sawJorgeHiredScene: true },
                  relationships: { mechanicBond: 4 },
                  companionReactions: [{ companion: 'jorge', reaction: 'approve', intensity: 15 }]
                }
              }
            ]
          }
        },
        {
          id: 'factory_recruiter',
          condition: (ctx) => ctx.stage === 2 && !StorySystem.state.flags.factoryRecruiterSeen,
          scene: {
            location: 'FACTORY MOTORHOME · PRIVATE SUITE',
            background: 'office',
            dialogue: [
              { speaker: 'narrator', text: 'The factory team recruiter doesn\'t look like a racing person. He looks like someone who buys racing teams. The suit costs more than your car.' },
              { speaker: 'recruiter', text: 'We\'ve been watching you. Not Mikko — you. The way you handle him, the way you call notes, the way you manage the chaos. That\'s not something we can buy. That\'s something we have to recruit.' },
              { speaker: 'you', text: 'I\'m not looking to leave. We\'re building something here.' },
              { speaker: 'recruiter', text: 'Building. Passionate word. Privateer word.\n\nHe pours two drinks, doesn\'t ask if you want one.\n\nRecruiter: Here\'s what privateers don\'t understand: resources aren\'t just money. They\'re time. They\'re data. They\'re the ability to make mistakes without ending a career.\n\nHe slides a glass toward you.\n\nRecruiter: We can offer you a three-year contract. Technical director track. Your choice of drivers. And the kind of engineering support that turns potential into championships.' }
            ],
            choices: [
              {
                text: '"What\'s the catch?"',
                consequence: {
                  text: 'Recruiter: (smiles, appreciates the directness)\nThe catch is that you\'ll work for us, not with us. We\'ll tell you which drivers to develop. Which strategies to pursue. Which risks are acceptable.\n\nHe takes a sip of his drink.\n\nRecruiter: In exchange, you\'ll never have to worry about funding again. You\'ll never have to choose between the right part and the affordable part. And you\'ll have a say in the future of this sport — the way it should be run.\n\nHe sets the glass down.\n\nRecruiter: The question isn\'t whether there\'s a catch. The question is whether the price is worth paying.',
                  stats: { reputation: 10 },
                  flags: { factoryRecruiterSeen: true },
                  factionReputation: { factoryTeams: 15, privateers: -10 }
                }
              },
              {
                text: '"I don\'t sell my loyalty. I earn it."',
                consequence: {
                  text: 'Recruiter: (doesn\'t flinch)\nLoyalty. That\'s a word that gets people killed in this sport.\n\nHe finishes his drink in one swallow.\n\nRecruiter: The last co-driver who said that to me? He stayed with his privateer team. They won three championships together. Then the funding dried up. The driver retired. The co-driver? He\'s selling insurance now.\n\nHe stands up.\n\nRecruiter: Loyalty is a luxury. Security is a necessity. Think about which one you can actually afford.',
                  stats: { reputation: 5, grit: 10 },
                  flags: { factoryRecruiterSeen: true, rejectedFactory: true },
                  factionReputation: { factoryTeams: -10, privateers: 15 }
                }
              },
              {
                text: '"Tell me about the drivers you have in mind."',
                consequence: {
                  text: 'Recruiter: (genuinely pleased)\nNow that\'s the right question.\n\nHe pulls out a tablet, swipes through profiles.\n\nRecruiter: We have three prospects. One with raw speed but no discipline. One with perfect technique but no instinct. And one... one who reminds me of Mikko, before the world got to him.\n\nHe looks at you.\n\nRecruiter: The question is: are you the person who can turn potential into greatness? Or are you just the person who babysits greatness that\'s already there?',
                  stats: { reputation: 15 },
                  flags: { factoryRecruiterSeen: true, factoryInterested: true },
                  factionReputation: { factoryTeams: 10 }
                }
              }
            ]
          }
        },
        {
          id: 'privateer_mechanic',
          condition: (ctx) => ctx.stage === 3 && StorySystem.state.flags.factoryRecruiterSeen && !StorySystem.state.flags.privateerMechanicSeen,
          scene: {
            location: 'PRIVATEER GARAGE · LATE NIGHT',
            background: 'garage',
            dialogue: [
              { speaker: 'narrator', text: 'The privateer garage is empty except for one mechanic working under a single light. He\'s using parts that don\'t match — factory cast-offs welded together with creativity and desperation.' },
              { speaker: 'mechanic', text: 'Heard you talked to the factory rep. They come around every season, poaching anyone who shows promise. Like locusts in suits.' },
              { speaker: 'you', text: 'I didn\'t say yes.' },
              { speaker: 'mechanic', text: 'Didn\'t say no either, I bet.\n\nHe wipes grease on his pants, doesn\'t look up.\n\nMechanic: Here\'s what they don\'t tell you: factory teams don\'t make champions. They buy them. They find people who\'ve already proven themselves and put them in cars that can\'t lose.\n\nHe holds up a suspension arm that\'s been repaired three times.\n\nMechanic: We make champions here. With nothing. With talent. With the kind of desperation that factory teams can\'t buy.' }
            ],
            choices: [
              {
                text: '"What happens to this team if I leave?"',
                consequence: {
                  text: 'Mechanic: (stops working, finally looks at you)\nWe survive. We always survive. Someone else will come along. Someone hungry.\n\nHe goes back to the suspension arm.\n\nMechanic: But you? You\'ll have resources. You\'ll have security. You\'ll have a career that doesn\'t depend on whether the sponsor check clears.\n\nHe tightens a bolt with unnecessary force.\n\nMechanic: The question isn\'t what happens to us. The question is what happens to you. Do you become a factory cog? Or do you stay here and become something real?',
                  stats: { reputation: 5, mentalStress: 10 },
                  flags: { privateerMechanicSeen: true },
                  factionReputation: { privateers: 10, factoryTeams: -5 }
                }
              },
              {
                text: '"Show me what you\'re building. With nothing."',
                consequence: {
                  text: 'Mechanic: (grins, genuine)\nNow that\'s the right question.\n\nHe walks you through the car. Every part has a story. Every repair is a lesson in creativity.\n\nMechanic: This suspension? It\'s from three different cars. This differential? I rebuilt it from scrap because we couldn\'t afford a new one. This engine? It shouldn\'t run, but it does because I know exactly what it needs.\n\nHe pats the car like it\'s a living thing.\n\nMechanic: Factory teams have engineering departments. We have me. And we have something they\'ll never have: the freedom to try things that don\'t make sense on paper.',
                  stats: { teamRespect: 15, reputation: 10 },
                  flags: { privateerMechanicSeen: true, privateerImpressed: true },
                  factionReputation: { privateers: 20 },
                  relationships: { privateerBond: 1 }
                }
              },
              {
                text: '"Desperation isn\'t a business model."',
                consequence: {
                  text: 'Mechanic: (doesn\'t argue)\nNo. It\'s not.\n\nHe picks up a wrench, doesn\'t use it.\n\nMechanic: But passion? Creativity? The willingness to try something impossible because you have nothing to lose? That\'s how this sport started.\n\nHe looks at the factory motorhome in the distance.\n\nMechanic: They\'ve forgotten that. They think racing is about spreadsheets and focus groups. We remember what it actually is.\n\nHe turns back to the car.\n\nMechanic: If you leave, don\'t forget what it felt like to build something with nothing.',
                  stats: { reputation: 5 },
                  flags: { privateerMechanicSeen: true },
                  factionReputation: { privateers: 5, factoryTeams: 5 }
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
              { speaker: 'girlfriend', text: 'I\'m not saying you\'re wrong. I\'m saying that being right doesn\'t change the wall.\n\nShe glances at Mikko, then back to you.\n\nGirlfriend: He\'s not making excuses. He\'s running the numbers. Every time he enters a corner too fast, he\'s calculating whether the car will hold or whether he\'ll have to save it. Right now, he\'s calculating that the notes are the problem because that\'s easier than admitting the fear is.' },
              { speaker: 'mikko', text: 'Enough, Elena.', emotion: 'tired' },
              { speaker: 'girlfriend', text: 'I\'m not attacking him. I\'m telling you what the numbers look like from outside.\n\nShe turns to Mikko, her voice dropping.\n\nGirlfriend: You want to be the driver who trusts his notes. But you can\'t trust what you don\'t believe in. And right now, you don\'t believe in the notes. You don\'t believe in him. And you don\'t believe in yourself.' }
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
                  text: 'The silence hangs heavy. Mikko looks away. Elena doesn\'t smile—she just looks tired.\n\nGirlfriend: I\'ve seen this before. The silence, the wall, the pattern.\n\nShe turns to leave, then stops.\n\nGirlfriend: You know what the last co-driver did? He tried to fix everything. He tried to fix the car, the notes, Mikko, himself.\n\nShe doesn\'t look back.\n\nGirlfriend: Some things can\'t be fixed. They can only be survived.\n\nThe damage remains. The math continues.',
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
              { speaker: 'laurent', text: 'Ahead.\n\nHe takes a sip of coffee, then sets the cup down.\n\nLaurent: I\'ve been ahead of Mikko before. He\'s been ahead of me. Neither of us stays there.\n\nHe looks at you, really looks at you.\n\nLaurent: You think you\'re keeping him ahead. That\'s a generous way to put it. But I\'ve watched him for a long time. He doesn\'t stay ahead because of the notes. He stays ahead in spite of them.\n\nHe pauses, letting that sink in.\n\nLaurent: The question isn\'t whether he\'ll stop listening to the notes. The question is whether you\'ll stop noticing when he does.' }
            ],
            choices: [
              { 
                text: '"Then why do you care?"',
                consequence: { 
                  text: 'Laurent: (genuinely surprised)\nWhy?\n\nHe thinks about this, like it\'s a question he hasn\'t been asked before.\n\nLaurent: Because I lost a teammate once. Not to a wall. Not to another driver. To the silence between the notes.\n\nHe picks up his cup.\n\nLaurent: When you stop hearing what\'s not being said, that\'s when the road ends. Not for the car. For you.',
                  stats: { reputation: 10, mentalStress: 5 },
                  flags: { plantedSilenceCallback: true }
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
                  stats: { reputation: 5, mentalStress: 10 },
                  flags: { plantedSilenceCallback: true }
                }
              }
            ]
          }
        },
        {
          id: 'companion_conflict_jorge_elena',
          condition: (ctx) => ctx.stage === 3 && StorySystem.companions.availableCompanions.jorge.relationshipLevel > 50 && StorySystem.companions.availableCompanions.elena.relationshipLevel > 50 && !StorySystem.state.flags.sawCompanionConflict,
          scene: {
            location: 'SERVICE PARK · EVENING',
            background: 'service_park',
            dialogue: [
              { speaker: 'narrator', text: 'Jorge and Elena are arguing near the car. Not shouting—this is worse. This is the kind of quiet argument that\'s been happening for months.' },
              { speaker: 'jorge', text: 'Car\'s ready. Setup\'s within tolerance. If he drives the spec I built, he wins.' },
              { speaker: 'elena', text: 'He won\'t drive it the way you built it. He\'ll drive it the way he always drives—too fast, too early, trusting the car to save him.' },
              { speaker: 'jorge', text: 'Then he shouldn\'t be in the cockpit.' },
              { speaker: 'elena', text: 'That\'s your solution? Retirement? What about the championship? What about everything he\'s worked for?' },
              { speaker: 'jorge', text: 'What about his life? You\'ve seen the same impacts I have. You know what happens when the math goes wrong.' },
              { speaker: 'elena', text: 'I know. That\'s why I\'m here. That\'s why I\'m asking you to build a car that forgives mistakes. Not one that punishes them.' },
              { speaker: 'jorge', text: 'Forgiving suspension geometry doesn\'t win championships. Just makes errors survivable.' },
              { speaker: 'narrator', text: 'They both look at you. The question in their eyes is the same, but the answers they want are completely different.' }
            ],
            choices: [
              {
                text: '"Jorge\'s right. A forgiving setup creates bad habits."',
                consequence: {
                  text: 'Elena flinches, but doesn\'t argue. She\'s heard this before.\n\nElena: (quietly)\nI know. I just... I\'d rather he finish tenth and alive than first and broken.\n\nShe walks away. Jorge nods at you.\n\nJorge: Someone finally understands that performance and safety aren\'t opposites—they\'re tradeoffs. I\'ve made my choice.',
                  stats: { driverTrust: 5, teamRespect: 10 },
                  companionReactions: [
                    { companion: 'jorge', reaction: 'approve', intensity: 10 },
                    { companion: 'elena', reaction: 'disapprove', intensity: 15 }
                  ],
                  flags: { sawCompanionConflict: true, sidedWithJorge: true }
                }
              },
              {
                text: '"Elena\'s right. Survival matters more than seconds."',
                consequence: {
                  text: 'Jorge doesn\'t argue, but his hands tighten on the wrench he\'s holding.\n\nJorge: Survival.\n\nHe looks at the car like it\'s betrayed him.\n\nJorge: I\'ll adjust the setup. But you should know—every time you make a car safer, you make it slower. That\'s physics. That\'s not something I can engineer away.\n\nHe walks away. Elena touches your arm.\n\nElena: Thank you. You have no idea how much that means.',
                  stats: { driverTrust: 10, mentalStress: -10 },
                  companionReactions: [
                    { companion: 'elena', reaction: 'approve', intensity: 15 },
                    { companion: 'jorge', reaction: 'disapprove', intensity: 10 }
                  ],
                  flags: { sawCompanionConflict: true, sidedWithElena: true }
                }
              },
              {
                text: '"The question isn\'t the car. The question is whether he trusts the notes."',
                consequence: {
                  text: 'Both of them look at you, surprised. This isn\'t the answer either of them expected.\n\nJorge: The notes.\n\nElena: The notes.\n\nJorge: You\'re saying that if he trusts you, it doesn\'t matter how the car is set up?\n\nElena: You\'re saying that the problem isn\'t technical or emotional—it\'s trust.\n\nThey look at each other, then back at you.\n\nJorge: That\'s... that\'s actually a good point.\n\nElena: It doesn\'t solve the argument. But it changes the question.\n\nJorge: I\'ll build a car that rewards trust.\n\nElena: And I\'ll trust that if he does, you\'ll give him a reason to keep trusting it.\n\nThe argument doesn\'t end. But it changes. And that might be enough.',
                  stats: { driverTrust: 15, teamRespect: 10, reputation: 10, mentalStress: -5 },
                  companionReactions: [
                    { companion: 'jorge', reaction: 'approve', intensity: 5 },
                    { companion: 'elena', reaction: 'approve', intensity: 5 }
                  ],
                  flags: { sawCompanionConflict: true, resolvedConflict: true }
                }
              }
            ]
          }
        },
        {
          id: 'silence_callback',
          condition: (ctx) => ctx.stage === 3 && StorySystem.state.flags.plantedSilenceCallback && !StorySystem.state.flags.silenceCallbackPaid,
          scene: {
            location: 'COFFEE MACHINE · LATE NIGHT',
            background: 'service_park',
            dialogue: [
              { speaker: 'narrator', text: 'You\'re calling notes in your head, pacing the service park. Laurent appears beside you. He doesn\'t speak at first.' },
              { speaker: 'laurent', text: 'You\'re still doing it.\n\nHe watches you pace.\n\nLaurent: Hearing what\'s not being said.' },
              { speaker: 'you', text: 'You told me that\'s when the road ends.' },
              { speaker: 'laurent', text: 'I did.\n\nHe finishes his coffee.\n\nLaurent: But I didn\'t tell you the other part.\n\nHe looks at you.\n\nLaurent: Sometimes hearing the silence is the only way to find the road that actually goes somewhere.' },
              { speaker: 'you', text: 'What road is that?' },
              { speaker: 'laurent', text: 'The one that doesn\'t end.\n\nHe throws the cup in the trash.\n\nLaurent: My teammate? He stopped hearing the silence. He started hearing only what he wanted to hear.\n\nHe walks away, then stops.\n\nLaurent: You\'re still hearing it. That\'s why you\'re still alive.\n\nHe doesn\'t look back. The silence between you feels different now—like something you\'ve earned.'
            ],
            choices: [
              {
                text: '(Continue your pacing)',
                consequence: {
                  text: 'You keep calling notes in your head. The silence doesn\'t feel empty anymore. It feels like information.',
                  stats: { perception: 5, mentalStress: -5 },
                  flags: { silenceCallbackPaid: true }
                }
              }
            ]
          }
        },
        {
          id: 'reputation_reaction',
          condition: (ctx) => ctx.stage === 3 && StorySystem.state.stats.reputation > 70,
          scene: {
            location: 'SERVICE PARK · MAIN WALKWAY',
            background: 'service_park',
            dialogue: [
              { speaker: 'narrator', text: 'The paddock is different now. People don\'t just see you—they see the person who kept Mikko competitive. The one who called the notes that shouldn\'t have worked but did.' },
              { speaker: 'random_mechanic', text: 'Hey—aren\'t you the one who called that triple-flat in Sweden? The one everyone said was impossible?\n\nHe doesn\'t wait for an answer.\n\nRandom Mechanic: We\'ve been talking about that in the garage. How you knew to call it early. How you trusted him to commit. That\'s... that\'s not something you can teach.' },
              { speaker: 'you', text: 'I just read the road. The rest was him.' },
              { speaker: 'random_mechanic', text: 'Sure. That\'s the humble answer.\n\nHe looks around, lowers his voice.\n\nRandom Mechanic: But word is you made a call in service that saved the whole weekend. Something about the differential setup? The factory boys are pissed because they didn\'t see it.\n\nHe studies you.\n\nRandom Mechanic: You know what that means? It means the privateers actually have a chance this season. Because someone on our side knows what they\'re doing.' }
            ],
            choices: [
              {
                text: '"Knowledge isn\'t factional. It\'s just knowledge."',
                consequence: {
                  text: 'Mechanic: (laughs)\nThat\'s what the factory guys say. Then they lock their data behind paywalls and NDAs.\n\nHe claps you on the shoulder.\n\nMechanic: Whatever you say. Just know that there are a lot of us watching you now. And rooting for you.',
                  stats: { reputation: 10, teamRespect: 5 },
                  factionReputation: { privateers: 15, factoryTeams: -5 }
                }
              },
              {
                text: '"What\'s the factory saying about me?"',
                consequence: {
                  text: 'Mechanic: (glances at the factory motorhome)\nThey\'re saying you\'re lucky. That Mikko carried you. That you\'re in the right seat at the right time.\n\nHe turns back to you.\n\nMechanic: But they\'re scared. You can tell. They don\'t get scared often.\n\nHe walks away, leaving you with the realization that reputation cuts both ways.',
                  stats: { reputation: 5 },
                  factionReputation: { factoryTeams: -10, privateers: 10 }
                }
              },
              {
                text: '"Tell your team I\'m always willing to share what I learn."',
                consequence: {
                  text: 'Mechanic: (eyes widen)\nYou serious? The factory boys would kill for that kind of intel.\n\nHe looks at you with new respect.\n\nMechanic: That... that\'s not something you hear in this sport. Usually information is currency.\n\nHe nods slowly.\n\nMechanic: I\'ll pass that along. And I\'ll make sure they know you mean it.',
                  stats: { reputation: 15, teamRespect: 10 },
                  factionReputation: { privateers: 25, factoryTeams: -15 }
                }
              }
            ]
          }
        },
        {
          id: 'reputation_negative',
          condition: (ctx) => ctx.stage === 3 && StorySystem.state.stats.reputation < 30,
          scene: {
            location: 'SERVICE PARK · OUTSKIRTS',
            background: 'service_park',
            dialogue: [
              { speaker: 'narrator', text: 'The paddock feels colder. Not the temperature—the attitude. People move around you like you\'re not there, or worse, like you\'re a problem they\'re trying to avoid.' },
              { speaker: 'service_worker', text: 'Hey—move your equipment. You\'re blocking the fuel line.\n\nHe doesn\'t say it politely. He doesn\'t say it like he\'s talking to a peer. He says it like you\'re in the way.' },
              { speaker: 'you', text: 'We were here first. The fuel line can wait five minutes.' },
              { speaker: 'service_worker', text: 'Five minutes? That\'s cute.\n\nHe steps closer, not threatening, but establishing dominance.\n\nService Worker: Here\'s how this works: factory teams get priority. Privateers who might actually win get priority. People who cost their driver a championship because they called a note wrong? They get to move their equipment.\n\nHe waits for you to argue. He seems to want you to argue.' }
            ],
            choices: [
              {
                text: '(Move the equipment without argument)',
                consequence: {
                  text: 'You move the equipment. The service worker watches, disappointed that you didn\'t fight.\n\nService Worker: Smart choice. Reputation is earned. Disrespect is given.\n\nHe walks away. The equipment is moved. Your dignity is... unclear.',
                  stats: { reputation: -5, mentalStress: 10 },
                  flags: { humiliatedByService: true }
                }
              },
              {
                text: '"What note did I supposedly call wrong?"',
                consequence: {
                  text: 'Service Worker: (surprised you\'re engaging)\nStage 4. The hairpin. You called it flat. He should have lifted.\n\nHe crosses his arms.\n\nService Worker: Everyone knows it. Everyone\'s talking about it. The question is whether you\'re going to own it or keep pretending you didn\'t cost him the season.\n\nHe waits. This isn\'t about equipment anymore. It\'s about whether you\'ll admit what everyone already believes.',
                  stats: { reputation: -5, mentalStress: 15 },
                  flags: { reputationChallenged: true }
                }
              },
              {
                text: '"I don\'t answer to you. I answer to my driver."',
                consequence: {
                  text: 'Service Worker: (doesn\'t back down)\nYour driver. Right.\n\nHe looks toward your garage.\n\nService Worker: Ask him how he feels about that note. Ask him if he trusts you the way he did before that stage.\n\nHe steps aside, but it\'s not respect. It\'s pity.\n\nService Worker: The equipment can stay. But the reputation? That\'s already moved.',
                  stats: { reputation: -10, mentalStress: 20 },
                  flags: { reputationConfronted: true }
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
        },
        {
          id: 'sara_hired_bonus',
          condition: (ctx) => ctx.stage === 5 && StorySystem.state.flags.hiredSara && !StorySystem.state.flags.sawSaraHiredScene,
          scene: {
            location: 'TEAM TRUCK · ENGINEERING BAY',
            background: 'garage',
            dialogue: [
              { speaker: 'narrator', text: 'Sara has three laptops open and a setup sheet covered in her own shorthand. She doesn\'t look up when you walk in.' },
              { speaker: 'sara', text: 'You put me on retainer instead of borrowing me from the factory team for one weekend at a time. That means I get to actually finish what I start.' },
              { speaker: 'you', text: 'Figured you\'d earned a say in how this car gets built, not just patched between rallies.' },
              { speaker: 'sara', text: '(finally looks up)\nThat\'s the first time a co-driver has said that to me and meant it as more than a compliment.\n\nShe slides the setup sheet across the table.\n\nSara: This is what the car should have been all season. Let\'s find out what it actually is.' }
            ],
            choices: [
              {
                text: '"Let\'s find out."',
                consequence: {
                  text: 'Sara closes the laptops, one by one, like she\'s closing a case she\'s finally allowed to argue.',
                  stats: { teamRespect: 10, mentalStress: -5 },
                  flags: { sawSaraHiredScene: true }
                }
              }
            ]
          }
        }
      ],
      postStage: [
        {
          id: 'world_reacts_to_victory',
          condition: (ctx) => ctx.stage === 4 && StorySystem.state.stats.reputation > 60,
          scene: {
            location: 'FINISH LINE · POST-STAGE',
            background: 'finish',
            dialogue: [
              { speaker: 'narrator', text: 'The timing board shows your time. First place. But the reaction isn\'t just cheering—it\'s something else. Recognition.' },
              { speaker: 'fia_official', text: 'That\'s... that\'s a new record for this stage.\n\nHe checks the timing equipment, then checks it again.\n\nFIA Official: By three seconds. That shouldn\'t be possible in these conditions.\n\nHe looks at you, then at Mikko.\n\nFIA Official: The notes. That was the notes, wasn\'t it? You called the perfect line through a section everyone else lifted for.' },
              { speaker: 'you', text: 'We trusted the recce. We trusted each other.' },
              { speaker: 'fia_official', text: 'Trust.\n\nHe shakes his head, impressed despite himself.\n\nFIA Official: You know how many championships are lost because people stop trusting each other at exactly the wrong moment?\n\nHe signs the timing sheet.\n\nFIA Official: Keep doing that. This sport needs more of it.' }
            ],
            choices: [
              {
                text: '"It\'s not trust. It\'s preparation."',
                consequence: {
                  text: 'FIA Official: (smiles)\nSame thing, eventually.\n\nHe hands you the signed sheet.\n\nFIA Official: Whatever you call it, it works. Don\'t overthink it.',
                  stats: { reputation: 10, teamRespect: 5 }
                }
              },
              {
                text: '"Trust is easy when you have the right data."',
                consequence: {
                  text: 'FIA Official: (interested)\nData? You have data nobody else has?\n\nHe looks at you with new interest.\n\nFIA Official: That\'s dangerous information in this paddock. Make sure you know who you\'re sharing it with.',
                  stats: { reputation: 15 },
                  flags: { dataBrokerInterest: true }
                }
              },
              {
                text: '"What happens when we stop trusting each other?"',
                consequence: {
                  text: 'FIA Official: (doesn\'t hesitate)\nCrashes. Retirements. People walking away from the sport they love.\n\nHe looks toward the medical tent.\n\nFIA Official: I\'ve seen it too many times. The talent is there. The car is there. But the trust? That\'s the fragile part.\n\nHe claps you on the shoulder.\n\nFIA Official: You\'re doing it right. Don\'t let anyone convince you otherwise.',
                  stats: { reputation: 10, mentalStress: -5 }
                }
              }
            ]
          }
        },
        {
          id: 'world_reacts_to_failure',
          condition: (ctx) => ctx.stage === 4 && StorySystem.state.stats.reputation < 40,
          scene: {
            location: 'FINISH LINE · POST-STAGE',
            background: 'finish',
            dialogue: [
              { speaker: 'narrator', text: 'The timing board shows your time. Last place. The silence is worse than the booing would be.' },
              { speaker: 'team_manager', text: 'We need to talk about the notes.\n\nHe doesn\'t say it like it\'s a discussion. He says it like it\'s a verdict.\n\nTeam Manager: Mikko says you were late on the cautions. That you hesitated on the crests.\n\nHe studies your reaction.\n\nTeam Manager: I\'m not assigning blame. I\'m asking what happened.' }
            ],
            choices: [
              {
                text: '"The notes were right. He didn\'t trust them."',
                consequence: {
                  text: 'Team Manager: (doesn\'t blink)\nThat\'s a serious accusation.\n\nHe looks toward Mikko, who\'s walking away without looking back.\n\nTeam Manager: Here\'s the problem: the driver is the one who has to live with the consequences. If he doesn\'t trust you, it doesn\'t matter whether you\'re right.\n\nHe walks away, leaving you with the realization that being right isn\'t always enough.',
                  stats: { driverTrust: -10, reputation: -5, mentalStress: 15 },
                  flags: { blamedDriver: true }
                }
              },
              {
                text: '"I hesitated. The conditions were worse than we expected."',
                consequence: {
                  text: 'Team Manager: (nods)\nHonesty. I appreciate honesty.\n\nHe sighs.\n\nTeam Manager: Here\'s what nobody tells you: hesitation is fatal in this sport. But it\'s also human.\n\nHe looks at you.\n\nTeam Manager: The question is whether you can learn to trust yourself. Because if you don\'t, he certainly won\'t.',
                  stats: { reputation: 5, mentalStress: 5 },
                  flags: { admittedHesitation: true }
                }
              },
              {
                text: '"We both made mistakes. That\'s racing."',
                consequence: {
                  text: 'Team Manager: (considers this)\nBoth made mistakes.\n\nHe walks toward the garage.\n\nTeam Manager: That\'s the diplomatic answer. But here\'s the thing: in this sport, there\'s no such thing as shared mistakes. There\'s just the mistake that costs you the stage.\n\nHe stops, turns back.\n\nTeam Manager: Figure out which mistake was yours. Then fix it.',
                  stats: { reputation: -5, mentalStress: 10 },
                  flags: { sharedBlame: true }
                }
              }
            ]
          }
        },
        {
          id: 'small_story_mechanic_daughter',
          condition: (ctx) => ctx.stage === 2 && !StorySystem.state.flags.mechanicDaughterStory,
          scene: {
            location: 'SERVICE PARK · FAMILY AREA',
            background: 'service_park',
            dialogue: [
              { speaker: 'narrator', text: 'A young girl is sitting on a tire stack, watching the mechanics work. She\'s maybe eight years old, wearing a team shirt that\'s three sizes too big.' },
              { speaker: 'girl', text: 'My dad says you\'re the one who keeps the car on the road.\n\nShe doesn\'t look up from the car she\'s watching.\n\nGirl: He says most co-drivers just shout. But you? You do something else. He can\'t explain what.' },
              { speaker: 'you', text: 'I just read the road. Your dad does the hard part.' },
              { speaker: 'girl', text: 'He\'s been a mechanic for twenty years. He says he\'s never seen a driver trust someone the way Mikko trusts you.\n\nShe finally looks at you.\n\nGirl: Do you think I could do what you do someday?' }
            ],
            choices: [
              {
                text: '"Anyone can learn to read notes. It takes courage to trust them."',
                consequence: {
                  text: 'The girl considers this, like it\'s the first time anyone\'s given her a real answer.\n\nGirl: Courage.\n\nShe hops off the tire stack.\n\nGirl: My dad says courage is just fear with a plan.\n\nShe runs toward the garage, then stops and looks back.\n\nGirl: I\'m going to make a plan.\n\nYears later, you\'ll see a familiar name on a co-driver roster. The shirt will fit better then.',
                  stats: { reputation: 5 },
                  flags: { mechanicDaughterStory: true, inspiredFutureCodriver: true }
                }
              },
              {
                text: '"This isn\'t an easy job. The pressure is intense."',
                consequence: {
                  text: 'Girl: (nods)\nI know. I watch my dad come home exhausted. His hands shake sometimes.\n\nShe looks at her own hands.\n\nGirl: But he loves it. He says there\'s nothing like it when everything works.\n\nShe goes back to watching the mechanics. The dream is still there, but now it has weight.',
                  stats: { reputation: 5 },
                  flags: { mechanicDaughterStory: true, realisticDream: true }
                }
              },
              {
                text: '"What does your dad think about you being a co-driver?"',
                consequence: {
                  text: 'Girl: (surprised)\nHe doesn\'t know I want to.\n\nShe looks around to make sure nobody\'s listening.\n\nGirl: He says women belong in the timing stand, not the cockpit. But he also says the best mechanics he\'s ever worked with were women who had to fight to be taken seriously.\n\nShe looks at you.\n\nGirl: I think he\'d be proud. Eventually.\n\nShe runs back to the garage. Some conversations plant seeds that take years to grow.',
                  stats: { reputation: 10 },
                  flags: { mechanicDaughterStory: true, genderDynamicsNoticed: true }
                }
              }
            ]
          }
        },
        {
          id: 'small_story_old_photograph',
          condition: (ctx) => ctx.stage === 3 && !StorySystem.state.flags.oldPhotographStory,
          scene: {
            location: 'ABANDONED SERVICE BAY',
            background: 'garage',
            dialogue: [
              { speaker: 'narrator', text: 'You\'re cutting through an abandoned service bay when you see it—a photograph nailed to a beam, faded but preserved. It shows a rally car from another era, stopped at the side of a road.' },
              { speaker: 'narrator', text: 'Two people stand next to it. A driver with a confident smile. A co-driver who looks terrified but determined.' },
              { speaker: 'voice', text: 'Found you, didn\'t I?\n\nAn old mechanic emerges from the shadows. He doesn\'t look like he\'s been working here—he looks like he\'s been waiting here.\n\nOld Mechanic: That\'s the 1985 San Remo. The last stage before Group B was banned.' },
              { speaker: 'you', text: 'What happened to them?' },
              { speaker: 'old_mechanic', text: 'They won. Set a record that still stands.\n\nHe touches the photograph gently.\n\nOld Mechanic: Then the sport changed. The cars got safer. The regulations got stricter. The spirit... well.\n\nHe looks at you.\n\nOld Mechanic: The co-driver in that photo? She was my sister. First woman to win a Group B stage.' }
            ],
            choices: [
              {
                text: '"What was she like?"',
                consequence: {
                  text: 'Old Mechanic: (smiles)\nTerrified. Absolutely terrified.\n\nHe laughs softly.\n\nOld Mechanic: But she called the notes like she\'d been doing it her whole life. The driver trusted her completely. Said she had a way of seeing the road that nobody else did.\n\nHe takes the photograph down.\n\nOld Mechanic: She died in \'87. Not in a rally. Just... life. But I like to think she\'s still out there, somewhere, calling notes for someone who needs them.\n\nHe hands you the photograph.\n\nOld Mechanic: Keep it. Maybe it\'ll mean something to you someday.',
                  stats: { reputation: 5 },
                  flags: { oldPhotographStory: true, historicalConnection: true },
                  relationships: { mechanicBond: 1 }
                }
              },
              {
                text: '"Why keep the photo here?"',
                consequence: {
                  text: 'Old Mechanic: This is where they worked. This bay.\n\nHe looks around the abandoned space.\n\nOld Mechanic: Team went under in \'87. Garage shut down. I come back sometimes to remember when this place meant something.\n\nHe studies the photograph one more time.\n\nOld Mechanic: The sport moves on. People forget. But some of us remember what it was like before everything got so... safe.\n\nHe leaves the photograph where it is. Some memories belong to places, not people.',
                  stats: { reputation: 5 },
                  flags: { oldPhotographStory: true, historyPreserved: true }
                }
              },
              {
                text: '"Group B was dangerous. The ban was necessary."',
                consequence: {
                  text: 'Old Mechanic: (doesn\'t argue)\nNecessary.\n\nHe looks at the photograph with complicated eyes.\n\nOld Mechanic: But it was also alive. The whole sport was alive in a way it hasn\'t been since.\n\nHe turns to leave.\n\nOld Mechanic: You call notes for a living. You know the difference between surviving and living. Don\'t you?\n\nHe doesn\'t wait for an answer. The photograph stays on the beam. A ghost in a dead garage.',
                  stats: { reputation: 5 },
                  flags: { oldPhotographStory: true, moralAmbiguity: true }
                }
              }
            ]
          }
        }
      ]
    },
    
    // Chapter 3 - Political Complexity
    chapter3: {
      preStage: [
        {
          id: 'fia_politics',
          condition: (ctx) => ctx.stage === 1 && !StorySystem.state.flags.fiaPoliticsSeen,
          scene: {
            location: 'FIA MEETING ROOM · LATE NIGHT',
            background: 'office',
            dialogue: [
              { speaker: 'narrator', text: 'The FIA steward doesn\'t look like a bureaucrat. He looks like someone who\'s seen too many accidents and has decided the solution is more paperwork.' },
              { speaker: 'steward', text: 'We have a proposal. New safety regulations for Group B.\n\nHe slides a document across the table.\n\nSteward: Restrictor plates. Limited power. Mandatory roll cage upgrades. The usual suspects are opposed.' },
              { speaker: 'you', text: 'Which suspects?' },
              { speaker: 'steward', text: 'The manufacturers. They want to sell fast cars to the public. Safety hurts marketing.\n\nHe leans forward.\n\nSteward: But we have a proposal that might work. A compromise.\n\nHe taps the document.\n\nSteward: We create a new class. Super-Group B. Fewer restrictions, but mandatory safety certifications. Only teams who pass can compete.' },
              { speaker: 'you', text: 'And the problem?' },
              { speaker: 'steward', text: 'The certification process is expensive. Factory teams can afford it. Privateers can\'t.\n\nHe studies your reaction.\n\nSteward: We need someone to speak for the privateers in the meeting. Someone who understands both sides. Someone the manufacturers will listen to.' }
            ],
            choices: [
              {
                text: '"This just kills privateer competition under the guise of safety."',
                consequence: {
                  text: 'Steward: (doesn\'t argue)\nIt does. That\'s the tradeoff.\n\nHe looks at the document like it\'s a weapon he\'s not sure he should use.\n\nSteward: Every safety regulation in history has made racing more expensive. Every single one. The question is whether the lives saved are worth the competition lost.\n\nHe pushes the document toward you.\n\nSteward: We need someone who can argue for privateer exemptions. Not eliminate the certification, but make it accessible. Are you that person?',
                  stats: { reputation: 10 },
                  flags: { fiaPoliticsSeen: true, safetyVsAccessDebate: true },
                  factionReputation: { progressives: 10, privateers: 15 }
                }
              },
              {
                text: '"I\'ll speak for the privateers. But I want something in return."',
                consequence: {
                  text: 'Steward: (raises eyebrow)\negotiating with the FIA. Bold.\n\nHe considers this.\n\nSteward: What do you want?\n\nHe doesn\'t say yes, but he doesn\'t say no either. This is how politics works—not with good and evil, but with leverage and compromise.',
                  stats: { reputation: 15 },
                  flags: { fiaPoliticsSeen: true, politicalLeverage: true },
                  factionReputation: { progressives: 5, privateers: 20 }
                }
              },
              {
                text: '"Safety shouldn\'t be a luxury item. Either it\'s mandatory or it\'s not."',
                consequence: {
                  text: 'Steward: (genuinely impressed)\nThat\'s the moral position.\n\nHe sighs.\n\nSteward: Here\'s the problem: if we make it mandatory without exemptions, half the grid disappears. If we don\'t make it mandatory, people die.\n\nHe looks at you.\n\nSteward: Politics is the art of finding the least bad option. The moral position got us into this mess. It won\'t get us out.\n\nHe stands up.\n\nSteward: Think about whether you\'d rather be right or effective.',
                  stats: { reputation: 5 },
                  flags: { fiaPoliticsSeen: true, moralVsPractical: true },
                  factionReputation: { progressives: 15, oldGuard: -10 }
                }
              }
            ]
          }
        },
        {
          id: 'resource_conflict',
          condition: (ctx) => ctx.stage === 2 && StorySystem.state.flags.fiaPoliticsSeen && !StorySystem.state.flags.resourceConflictSeen,
          scene: {
            location: 'SUPPLIER WAREHOUSE',
            background: 'garage',
            dialogue: [
              { speaker: 'narrator', text: 'The parts supplier is doing something unusual—he\'s allocating inventory. When a sport runs on limited parts, allocation becomes power.' },
              { speaker: 'supplier', text: 'Factory team put in a massive order. They want to lock down the entire supply of differentials for the season.\n\nHe doesn\'t look happy about it.\n\nSupplier: They can afford to pay twice market rate. Privateers can\'t.\n\nHe looks at you.\n\nSupplier: I know what you\'re doing with the FIA. If you can get them to back off the exclusivity deal, I\'ll allocate enough for the privateer teams. But I need something in return.' },
              { speaker: 'you', text: 'What do you need?' },
              { speaker: 'supplier', text: 'Inside information. When the FIA makes its ruling on the safety certification, I need to know first. I can adjust my inventory accordingly.\n\nHe lowers his voice.\n\nSupplier: That information is worth millions to the right people. I\'m not asking for money. I\'m asking for advantage.' }
            ],
            choices: [
              {
                text: '"I won\'t betray the FIA process for parts allocation."',
                consequence: {
                  text: 'Supplier: (nods, not in anger but in respect)\nPrinciples. I respect principles.\n\nHe picks up the order form.\n\nSupplier: But principles don\'t fix differentials. The factory deal goes through. Privateers get scraps.\n\nHe hands you a card.\n\nSupplier: If you ever decide principles are too expensive, call me.',
                  stats: { reputation: 10 },
                  flags: { resourceConflictSeen: true, maintainedIntegrity: true },
                  factionReputation: { privateers: -10, factoryTeams: 5 }
                }
              },
              {
                text: '"I\'ll get you the information. But the privateers get guaranteed allocation."',
                consequence: {
                  text: 'Supplier: (extends hand)\nDeal.\n\nYou shake. The transaction feels dirty, but the privateers will get their parts.\n\nSupplier: You\'re learning. Politics isn\'t about being clean. It\'s about getting results.\n\nHe makes a note on the order form.\n\nSupplier: The factory gets their order. The privateers get theirs. And I get my advantage.\n\nHe looks at you.\n\nSupplier: Everyone wins. Especially you.',
                  stats: { reputation: 5 },
                  flags: { resourceConflictSeen: true, politicalCompromise: true },
                  factionReputation: { privateers: 20, factoryTeams: -5 }
                }
              },
              {
                text: '"What if I convince the FIA to block the exclusivity deal entirely?"',
                consequence: {
                  text: 'Supplier: (genuinely surprised)\nBlock it.\n\nHe considers this.\n\nSupplier: That would be... better for everyone. More competition means more customers for me.\n\nHe studies you.\n\nSupplier: But the factory team has friends in high places. Blocking them would mean making enemies.\n\nHe slides the order form toward you.\n\nSupplier: If you can pull that off, I\'ll give the privateers priority pricing. No information needed.\n\nHe smiles.\n\nSupplier: Sometimes the best deal is the one that doesn\'t require selling anything.',
                  stats: { reputation: 15 },
                  flags: { resourceConflictSeen: true, politicalAmbition: true },
                  factionReputation: { privateers: 25, factoryTeams: -15 }
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
              { speaker: 'girlfriend', text: 'I\'ve been running the numbers for three years. Every stage, every corner, every note.\n\nShe doesn\'t look at Mikko. She looks at you.\n\nGirlfriend: The numbers say retire with the points we have.\n\nShe pauses.\n\nGirlfriend: But I\'ve been wrong before. The numbers change when the variables change.\n\nShe glances at Mikko, then back to you.\n\nGirlfriend: You\'ve changed the variables. I don\'t know how. I don\'t know if it\'s enough. But the equation isn\'t what it was yesterday.' },
              { speaker: 'mikko', text: 'What do the notes say?', emotion: 'focused' },
              { speaker: 'you', text: 'The notes say there\'s a championship at the end of the next thirty kilometres.' },
              { speaker: 'mikko', text: 'That\'s not what the notes say.\n\nHe stands up, picks up his helmet.\n\nMikko: The notes say there\'s a corner. Then another. Then another.\n\nHe looks at you.\n\nMikko: Everything else—that\'s what we\'re saying. The notes don\'t say anything about championships or legacy or whether we should retire.\n\nHe puts on his helmet.\n\nMikko: They just say what\'s coming. The rest... the rest is up to us.' }
            ],
            choices: [
              { 
                text: '"Then let\'s go find out what\'s coming."',
                consequence: { 
                  text: 'Mikko: (nods)\nExactly.\n\nHe walks toward the car. Elena doesn\'t stop him. She doesn\'t say anything. She just watches.\n\nGirlfriend: (to you, quietly)\nThe numbers still say retire.\n\nShe looks at Mikko\'s back.\n\nGirlfriend: But sometimes you run the numbers wrong on purpose because the right answer is the one you can\'t live with.\n\nShe walks away. The road is calling. The math continues.',
                  stats: { driverTrust: 20, reputation: 15, legacy: 25, mentalStress: -5 },
                  flags: { finalStageMotivated: true }
                }
              },
              { 
                text: '"The notes say what\'s coming. We\'re what decides whether we survive it."',
                consequence: { 
                  text: 'Mikko: (stops at the car door, turns)\nSurvive it.\n\nHe considers this word like it\'s new.\n\nMikko: You know what the last co-driver said? Before the crash? He said we\'re going to survive this.\n\nHe opens the door.\n\nMikko: We didn\'t.\n\nHe gets in.\n\nMikko: But that doesn\'t mean we shouldn\'t try.\n\nElena stands in the doorway, watching.\n\nGirlfriend: The numbers say we\'re not going to survive this either.\n\nShe doesn\'t move.\n\nGirlfriend: But I\'m tired of being right about the wrong things.',
                  stats: { driverTrust: 15, reputation: 10, legacy: 20 },
                  driverState: { motivated: true }
                }
              },
              { 
                text: '"Some roads don\'t have an end you can see. We drive them anyway."',
                consequence: { 
                  text: 'Mikko: (laughs, softly)\nThat\'s... that\'s good.\n\nHe looks at Elena.\n\nMikko: Did you hear that?\n\nElena: (doesn\'t smile, but her eyes soften)\nI heard it.\n\nMikko: That\'s why she\'s in the car.\n\nHe points at you.\n\nMikko: She gets it.\n\nHe gets in. The engine starts.\n\nElena: (to you)\nThe numbers say this is the end.\n\nShe pauses.\n\nGirlfriend: But maybe the numbers are wrong.\n\nShe walks away. The road is calling. Nobody knows where it ends.',
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
              { speaker: 'steward', text: 'We\'ve received a formal complaint. Technical discrepancy in your notes—per regulation 14-B, section 3. Espionage implications.' },
              { speaker: 'you', text: 'That\'s ridiculous. I write my own notes. Every syllable is mine.' },
              { speaker: 'steward', text: 'Complaint originates from a registered competitor. They seek immediate suspension pending formal investigation—per protest protocols.' },
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
      postStage: [
        {
          id: 'female_political_pressure',
          condition: (ctx) => ctx.stage === 3 && !StorySystem.state.flags.femalePoliticalPressure,
          scene: {
            location: 'PRESS CONFERENCE',
            background: 'press',
            dialogue: [
              { speaker: 'narrator', text: 'The questions aren\'t about racing. They\'re about what you represent. The microphone feels like a weapon pointed at you.' },
              { speaker: 'reporter', text: 'There\'s a movement in the FIA to address gender disparities in motorsport. Some are saying your presence this season is proof that the system works.\n\nShe doesn\'t say it like a compliment.\n\nReporter: Others say you\'re being used as a token to avoid actual structural change.\n\nShe waits for you to walk into the trap she\'s set.' }
            ],
            choices: [
              {
                text: '"I\'m here because I earned it. Not because of anyone\'s agenda."',
                consequence: {
                  text: 'Reporter: (doesn\'t flinch)\nEarned it.\n\nShe makes a note.\n\nReporter: The question isn\'t whether you earned it. The question is whether the system would have let you earn it if you were anyone else.\n\nShe looks at you.\n\nReporter: Your individual success doesn\'t prove the system works. It just proves you\'re exceptional.\n\nThe interview continues, but the question hangs in the air: are you a sign of progress, or an exception that proves the rule?',
                  stats: { reputation: 10, grit: 15 },
                  flags: { femalePoliticalPressure: true, individualVsSystem: true }
                }
              },
              {
                text: '"The system doesn\'t work. That\'s why I had to be twice as good to get half the respect."',
                consequence: {
                  text: 'Reporter: (nods, genuinely interested)\nTwice as good.\n\nShe leans forward.\n\nReporter: What happens to the women who are just as good as the men, but not twice as good? Do they deserve to race?\n\nShe doesn\'t wait for an answer.\n\nReporter: That\'s the question the movement is asking. Your success is being used to argue that no systemic change is needed. How does that feel?',
                  stats: { reputation: 15, grit: 20 },
                  flags: { femalePoliticalPressure: true, systemicCritique: true },
                  factionReputation: { progressives: 15, mediaMachine: 10 }
                }
              },
              {
                text: '"I\'m not a symbol. I\'m a co-driver. Ask me about the notes, not the politics."',
                consequence: {
                  text: 'Reporter: (frustrated)\nThe notes.\n\nShe sighs.\n\nReporter: You can compartmentalize all you want. But the moment you stepped into that cockpit, you became political. Whether you wanted to or not.\n\nShe shuts her notebook.\n\nReporter: Just remember: refusing to engage with the politics is itself a political position. You\'re just choosing the side that maintains the status quo.\n\nShe walks away. The choice was made before you even spoke.',
                  stats: { reputation: 5, mentalStress: 10 },
                  flags: { femalePoliticalPressure: true, refusedPoliticalEngagement: true }
                }
              }
            ]
          }
        },
        {
          id: 'political_fallout',
          condition: (ctx) => ctx.stage === 4 && StorySystem.state.flags.fiaPoliticsSeen && !StorySystem.state.flags.politicalFalloutSeen,
          scene: {
            location: 'SERVICE PARK · NIGHT',
            background: 'service_park',
            dialogue: [
              { speaker: 'narrator', text: 'The paddock is buzzing with rumors. The FIA meeting is tomorrow, and everyone knows something big is being decided.' },
              { speaker: 'privateer_representative', text: 'Heard you\'re speaking for us at the FIA meeting.\n\nHe doesn\'t say it with gratitude. He says it like he\'s assessing whether you\'re an asset or a liability.\n\nPrivateer Rep: Here\'s the thing—some of us don\'t want the compromise. We\'d rather race in a separate series than deal with factory rules.\n\nHe studies your reaction.\n\nPrivateer Rep: If you negotiate a deal that keeps us in the same series but under factory control, are you actually helping us?' }
            ],
            choices: [
              {
                text: '"A separate series is a death sentence. No sponsors, no coverage, no future."',
                consequence: {
                  text: 'Privateer Rep: (doesn\'t argue)\nMaybe.\n\nHe looks at the factory motorhomes in the distance.\n\nPrivateer Rep: But at least we\'d control our own destiny. Instead of being the supporting act in someone else\'s show.\n\nHe walks away. The division in the privateer community is clearer now—some want survival, others want dignity, and nobody thinks they can have both.',
                  stats: { reputation: 5 },
                  flags: { politicalFalloutSeen: true, privateerDivisionExposed: true },
                  factionReputation: { privateers: -10 }
                }
              },
              {
                text: '"I\'m fighting for your survival. Whether you appreciate it or not."',
                consequence: {
                  text: 'Privateer Rep: (laughs, bitter)\nSurvival.\n\nHe shakes his head.\n\nPrivateer Rep: You know what the factory teams call us? "The chaff." The stuff that gets separated from the wheat.\n\nHe looks at you.\n\nPrivateer Rep: They\'re not wrong. We are the chaff. And no amount of negotiation will change that.\n\nHe walks away. The political fight suddenly feels different—not about winning, but about what\'s even worth fighting for.',
                  stats: { reputation: 5, mentalStress: 10 },
                  flags: { politicalFalloutSeen: true, harshTruthAccepted: true }
                }
              },
              {
                text: '"Then let\'s create a third option. A privateer series with FIA backing."',
                consequence: {
                  text: 'Privateer Rep: (stops, genuinely surprised)\nA third option.\n\nHe considers this.\n\nPrivateer Rep: That would require... that would require the FIA to admit that the current system is broken.\n\nHe looks at you with new respect.\n\nPrivateer Rep: They\'ll never do it. But I like that you\'re thinking bigger than compromise.\n\nHe extends his hand.\n\nPrivateer Rep: If you can actually pull that off, you\'re not just a co-driver. You\'re a revolutionary.',
                  stats: { reputation: 20 },
                  flags: { politicalFalloutSeen: true, revolutionaryPath: true },
                  factionReputation: { privateers: 25, progressives: 10 }
                }
              }
            ]
          }
        }
      ]
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
