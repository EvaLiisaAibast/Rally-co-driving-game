
const DIFFS=[{n:'Easy',s:12},{n:'Normal',s:9},{n:'Hard',s:7},{n:'Insane',s:5},{n:'Chaos',s:4}];
const RIVALS=[{name:'S. Laurent',team:'Citroën'},{name:'C. MacRae',team:'Subaru'},{name:'M. Grönholm',team:'Peugeot'},{name:'K. Rovanperä',team:'Toyota'}];

const ERAS={
  grpb:{
    label:'Group B',badge:'eb-grpb',outlet:'Rallye Mondiale',commentator:'Jean-Pierre Mauger',
    period:'1982–1986',desc:'Monsters with no limits. Sparse, brutal notes. One mistake is fatal.',
    surf:'Gravel/tarmac',weather:'Variable',
    vocab:{L:'left',R:'right','!':'caution','!!':'max caution',FLAT:'flat out',CREST:'over crest',
      JUNCTION:'junction',DONTCUT:"don't cut",NARROW:'narrows',JUMP:'jump',LONG:'long',
      INTO:'into',TIGHT:'tightens',STOP:'full stop',HAIRPIN:'hairpin',ICE:'ice',BUMP:'bumps',SQUARE:'square corner'},
    cars:[{n:'Audi Sport Quattro',d:'720hp · turbo · 4WD'},{n:'Lancia 037',d:'320hp · RWD'},{n:'Peugeot 205 T16',d:'480hp · 4WD'},
          {n:'Ford RS200',d:'450hp · 4WD'},{n:'MG Metro 6R4',d:'380hp · V6'},{n:'Renault 5 Maxi',d:'350hp · FWD'}],
    stages:[
      {name:'SS7 — Manta Road',country:'Portugal',surf:'Rough gravel',weather:'Overcast · 14°C',km:'22.4',
       cond:'Very rough. Rocks on inside of corners. Crowd three-deep on hairpins. One wrong line ends your stage.',
       notes:[
        {raw:'R5 DONTCUT',ans:"right five don't cut",narr:'A deceptive medium-speed right. The inside drops into the valley below.',comm:'Every year this corner claims someone. The crowd knows exactly why.'},
        {raw:'L3 !2 INTO R4',ans:'left three caution hairpin into right four',narr:'Three calls in under two seconds. The caution between them is the one that matters.',comm:'You\'ll hear the engine note change twice before the next call arrives.'},
        {raw:'CREST R6 NARROW',ans:'over crest right six narrows',narr:'The crest makes the R6 invisible until you\'re already in it. Stone walls close in.',comm:'Flat over the top if you trust the notes. That\'s the only way through here.'},
        {raw:'L2! JUNCTION STOP',ans:'left two caution junction stop',narr:'Full braking. Another road crosses here, blind at speed.',comm:'STOP means stop. Not a scrub. The notes are literal here.'},
        {raw:'FLAT R CREST L5 LONG',ans:'flat right over crest long left five',narr:'The gift section. Back-to-back flat calls if you believe the recce.',comm:'This is what Group B felt like. This is why they came.'},
        {raw:'BUMP R3 BUMP L3',ans:'bumps right three bumps left three',narr:'Double compression — the car goes light both times. Steer on the way down.',comm:'These compressions can bottom the car if the setup is wrong.'},
        {raw:'L4 ICE 100 R3',ans:'left four ice 100 metres right three',narr:'Ice on entry to the left, then 100 metres to set up the right three.',comm:'At night this stage becomes a completely different animal.'},
        {raw:'R1! HAIRPIN STOP 50',ans:'right one caution hairpin stop 50 metres',narr:'U-turn under maximum caution. 50 metres — it appears immediately after the call.',comm:'That wall has been there since before the rally existed.'}
       ]},
      {name:'SS4 — Col de Turini',country:'Monte Carlo',surf:'Tarmac / ice',weather:'Night · −2°C · ice',km:'18.7',
       cond:'Night stage. Spectator torches on corners. Temperature dropped since afternoon. Ice patches not mapped from earlier run.',
       notes:[
        {raw:'L3 ICE DONTCUT',ans:"left three ice don't cut",narr:'Night Turini. Your headlights find a left three — the inside is glazed.',comm:'Several crews hit ice there. Not everyone brought the car back.'},
        {raw:'R2!! INTO L4',ans:'right two maximum caution into left four',narr:'Double exclamation. A cliff on the wrong line feeds directly into a hairpin.',comm:'Double bang means they found something terrifying in recce. Trust the note.'},
        {raw:'CREST L5 LONG 200',ans:'over crest long left five 200 metres',narr:'The mountain crest opens to total darkness. Two hundred metres to breathe.',comm:'At this speed, 200 metres is about three seconds. That\'s all the rest you get.'},
        {raw:'L4 OVER CREST TIGHT R3',ans:'left four over crest tightens into right three',narr:'Crest hides the tightener before feeding the right three. You can\'t see it early.',comm:'You cannot see the tighten from the entry. That\'s the whole point of recce.'},
        {raw:'JUNCTION R1!! STOP 50',ans:'junction right one maximum caution stop 50 metres',narr:'Into the village. Double caution and stop. Old stone walls all around.',comm:'Right one into the village. Every generation of co-driver has this in their nightmares.'},
        {raw:'BUMP L2! 50',ans:'bumps left two caution 50 metres',narr:'Compression into a tight caution left. Very little run-off beyond.',comm:'Nasty corner. Very little time to react to the bump at this pace.'},
        {raw:'SQUARE R ICE INTO L4',ans:'square right ice into left four',narr:'U-turn on ice feeding directly into a medium left. The worst combination this stage has.',comm:'Two cars went off here in practice. The ice doesn\'t show in the headlights.'},
        {raw:'R3 LONG FLAT L FINISH',ans:'right three long flat left finish',narr:'Out of the village, the road opens. Final sweep, then the timing arch.',comm:'And across the line. Another Turini survived.'}
       ]}
    ]
  },
  w90:{
    label:'WRC 90s',badge:'eb-w90',outlet:'Autosport Rally Report',commentator:'Martin Holmes',
    period:'1990–2001',desc:'Subaru vs Mitsubishi. Gravel glory. Richer vocabulary, higher pace.',
    surf:'Gravel / mud',weather:'Dry to wet',
    vocab:{L:'left',R:'right','!':'caution','!!':'max caution',FLAT:'flat out',CREST:'over crest',
      JUMP:'jump',LONG:'long',INTO:'into',TIGHTENS:'tightens',OPENS:'opens',DONTCUT:"don't cut",
      BRIDGE:'bridge',GRAVEL:'gravel patch',SQUARE:'square',MAYBE:'maybe',MUD:'mud'},
    cars:[{n:'Subaru Impreza WRC97',d:'300hp · STi · 4WD'},{n:'Mitsubishi Lancer Evo IV',d:'280hp · Ralliart'},{n:'Toyota Corolla WRC',d:'300hp · Castrol'},
          {n:'Ford Escort WRC',d:'300hp · M-Sport'},{n:'Seat Cordoba WRC',d:'280hp · Kit car'},{n:'Skoda Octavia WRC',d:'270hp · Works'}],
    stages:[
      {name:'SS12 — Ouninpohja',country:'Finland',surf:'Fast gravel',weather:'Sunny · 22°C · dusty',km:'33.6',
       cond:'Fastest stage in the championship. Crests hide corners. Jumps reach 40m. Huge crowds everywhere. Notes must be perfect.',
       notes:[
        {raw:'L4 200 R3 JUMP',ans:'left four 200 metres right three jump',narr:'Long straight, then the road drops into a flying jump. Finland gives and then takes.',comm:'Ouninpohja is the fastest stage in world rallying. Full stop. Nothing touches it.'},
        {raw:'R5 CREST DONTCUT R3',ans:"right five over crest don't cut right three",narr:'Over the crest the road tightens. A ditch on the inside took two cars this morning.',comm:'McRae would cut that line. Burns won\'t. That\'s the whole difference between them.'},
        {raw:'150 L2 TIGHTENS OPENS',ans:'150 metres left two tightens then opens',narr:'A corner that lies — enters as a two, pulls tight, then releases to full throttle.',comm:'That anti-lag on the braking zone is obscene. Listen to that sound.'},
        {raw:'LONG R4 BRIDGE GRAVEL',ans:'long right four over bridge gravel patch',narr:'A bridge that flexes under the car, then a gravel patch pushes you wide on exit.',comm:'These roads are genuinely terrifying at this speed. Beautiful. Terrifying.'},
        {raw:'FLAT L FLAT R CREST',ans:'flat left flat right over crest',narr:'Back-to-back flat calls through pines. 200km/h with centimetres to spare.',comm:'And that is the flying finish. This is why Finland exists.'},
        {raw:'SQUARE R STOP GRAVEL',ans:'square right stop gravel patch',narr:'Near U-turn into a gravel patch. No margin for error.',comm:'This junction catches the Safari veterans every time they come here.'},
        {raw:'JUMP R3 LONG',ans:'jump into right three long',narr:'Blind crest launches the car. You find the right three while still airborne.',comm:'Completely airborne. They won\'t see the corner until they\'re back on the ground.'},
        {raw:'L6 EASY INTO R2!',ans:'left six easy into right two caution',narr:'From a gentle sweeper into a caution corner. The pace change is violent.',comm:'Notes timed wrong here and the driver brakes for the six. Expensive mistake.'}
       ]},
      {name:'SS9 — Hafren Forest',country:'Rally GB',surf:'Wet gravel/mud',weather:'Rain · 8°C · slippery',km:'27.3',
       cond:'Wales in autumn. Deep mud ruts. Standing water on apexes. Trees touching car doors. Notes carry extra warnings.',
       notes:[
        {raw:'L3 MUD DONTCUT OPENS',ans:"left three mud don't cut then opens",narr:'Deep mud on the inside that could swallow the front wheel.',comm:'The ruts here are deeper than yesterday. Three crews found new lines in the trees.'},
        {raw:'R4 CREST JUMP LONG',ans:'right four over crest jump long',narr:'Fast right with a compression crest launching into a long exit.',comm:'The GB produces heroes. And retirements. Often the same corner.'},
        {raw:'SQUARE L STOP RUTS',ans:'square left stop deep ruts',narr:'Hairpin with deep mud ruts on exit that pull toward the bank.',comm:'Those ruts are a foot deep in places. One wheel in and you\'re done.'},
        {raw:'R5 LONG TIGHTENS',ans:'right five long tightens',narr:'Long fast right that tightens toward the end — the road narrows as it bends.',comm:'Deceptive corner. Looks open from the entry. Isn\'t.'},
        {raw:'MAYBE L3 INTO R4',ans:'maybe left three into right four',narr:'A maybe note — could be tighter depending on conditions and mud build-up.',comm:'Maybe notes are for the co-driver to read the road in real time.'},
        {raw:'L2!! NARROW STOP',ans:'left two maximum caution narrows stop',narr:'Double caution narrow left with a full stop. Bank closes in immediately after.',comm:'Double bang. That means something was found in recce that scared the crew.'},
        {raw:'JUMP L4 BUMP R3',ans:'jump into left four bumps into right three',narr:'Jump feeding a left, then compressions before a right three. Four seconds of chaos.',comm:'Three notes in four seconds. That\'s why co-driving is harder than driving.'},
        {raw:'OVER BRIDGE L3 WET',ans:'over bridge left three wet',narr:'Wooden bridge into a tight left on a wet tarmac section. Complete surface change.',comm:'Surface change mid-corner. Good thing it\'s gravel tyres because tarmac would be fatal.'}
       ]}
    ]
  },
  w24:{
    label:'Modern WRC',badge:'eb-w24',outlet:'WRC Official Media',commentator:'Jona Siebel',
    period:'2022–present',desc:'Rally1 hybrid era. Full vocabulary. 500hp. Hybrid management. Night stages.',
    surf:'Tarmac / gravel',weather:'Cold nights to scorching days',
    vocab:{L:'left',R:'right','!':'caution','!!':'max caution',FLAT:'flat out',CREST:'over crest',
      LONG:'long',INTO:'into',TIGHTENS:'tightens',OPENS:'opens',DONTCUT:"don't cut",
      JUNCTION:'junction',ICE:'ice',REGEN:'regen zone',SQUARE:'square',HYBRID:'hybrid boost',BUMPS:'compressions'},
    cars:[{n:'Toyota GR Yaris Rally1',d:'500hp · Hybrid'},{n:'Hyundai i20 N Rally1',d:'500hp · Hybrid'},{n:'Ford Puma Rally1',d:'500hp · Hybrid'},
          {n:'Citroën C3 Rally2',d:'280hp · WRC2'},{n:'Skoda Fabia RS Rally2',d:'280hp · WRC2'},{n:'VW Polo GTI R5',d:'270hp · R5'}],
    stages:[
      {name:'SS14 — Col de Turini',country:'Monte-Carlo',surf:'Tarmac / ice',weather:'Night · 1°C · ice',km:'18.7',
       cond:'Night stage. Spectator floodlights on corners. Temperature dropped since last car. Ice patches not on the map.',
       notes:[
        {raw:'L3 ICE DONTCUT',ans:"left three ice don't cut",narr:'The Turini at night. The inside is glazed — the afternoon crews didn\'t find this.',comm:'Minus one up here and the grit trucks missed some patches. Brave crews only tonight.'},
        {raw:'R2! INTO L4 HAIRPIN',ans:'right two caution into left four hairpin',narr:'Vicious right two then an immediate hairpin. Tyre marks from earlier show the wrong line.',comm:'Full hybrid deployment on the hairpin exit. Question is whether they\'ve managed the battery.'},
        {raw:'REGEN R5 ICE 100 R3',ans:'regen zone right five ice 100 metres right three',narr:'Manage the regen, call the sweeper, warn of ice — three jobs at once.',comm:'Three things simultaneously. That\'s the modern co-driver job in one note.'},
        {raw:'CREST L5 LONG 200',ans:'over crest long left five 200 metres',narr:'Over the mountain crest into total darkness. Two hundred metres to breathe and reset.',comm:'The Turini is as much about survival as pace. Rocks up here haven\'t moved for anyone.'},
        {raw:'HYBRID R2! BUMPS L4',ans:'hybrid boost right two caution bumps into left four',narr:'Deploy hybrid through a caution right before compressions feed a left four.',comm:'Maximum complexity. The car is computing traction, deployment, and grip simultaneously.'},
        {raw:'JUNCTION R1!! STOP 50',ans:'junction right one maximum caution stop 50 metres',narr:'Into the village. Double caution, full stop. Old stone walls all around.',comm:'Right one into the village. Every generation has this corner in their nightmares.'},
        {raw:'L4 OVER CREST TIGHTENS R3',ans:'left four over crest tightens into right three',narr:'Crest hides the tightener. You can\'t see it until you\'re past the point of no return.',comm:'You cannot see that tighten from the entry. That\'s why they do a recce.'},
        {raw:'R3 LONG FLAT L FINISH',ans:'right three long flat left finish',narr:'Out of the village into the final sweep. The timing beam ends everything here.',comm:'Across the line. Another Turini stage survived.'}
       ]},
      {name:'SS8 — Harju',country:'Finland',surf:'Fast gravel',weather:'Sunny · 24°C · dusty',km:'11.4',
       cond:'Super Special format. Maximum attack from the line. Hybrid fully charged. Crowd on both sides. No margin.',
       notes:[
        {raw:'HYBRID L5 FLAT R',ans:'hybrid boost left five flat right',narr:'Hybrid deployment into flat-out — the extra power pushes the rear out immediately.',comm:'Full deployment off the line. The crowd won\'t hear the engine, just the tyres.'},
        {raw:'JUMP L3 200 R4',ans:'jump left three 200 metres right four',narr:'Flying jump into a medium left, then 200 metres to the next right.',comm:'These Super Specials are sprint tracks. But don\'t let that fool you.'},
        {raw:'REGEN L2! INTO R5',ans:'regen zone left two caution into right five',narr:'Regen slows through a tight left — feel the decel — then opens to a fast right.',comm:'The hybrid decel is so strong it\'s basically another brake. New drivers get caught out.'},
        {raw:'R3 BUMPS L3 BUMPS',ans:'right three bumps left three bumps',narr:'Alternating corners with compressions between them. The car never fully settles.',comm:'Four corners and four compressions in about seven seconds. Relentless.'},
        {raw:'SQUARE R WATER L4',ans:'square right water splash left four',narr:'Hairpin into a water splash — instant snap oversteer if you\'re too fast.',comm:'That water comes out of nowhere. They added it yesterday after afternoon practice.'},
        {raw:'L6 HYBRID FLAT R FLAT L',ans:'left six hybrid boost flat right flat left',narr:'Gentle left, deploy hybrid, then back-to-back flat corners — the stage is singing.',comm:'Two flat calls back to back in a Rally1 car. That\'s 180km/h minimum. Extraordinary.'},
        {raw:'CREST R4 DONTCUT LONG',ans:"over crest right four don't cut long",narr:'Crest launches the car. The cut looks inviting but a ditch is on the inside.',comm:'The cut looks perfect from the air. In the car you can\'t see the ditch until too late.'},
        {raw:'L3 TIGHTENS! R4 FINISH',ans:'left three tightens caution into right four finish',narr:'Final note: the left pulls tighter than it looks, leads into the last corner before the line.',comm:'And there it is — the flying finish. This is what modern rallying feels like.'}
       ]}
    ]
  }
};

// ── STAGE ATMOSPHERE EVENTS ──
const ATMO = {
  grpb:{
    opening:[
      "The road is alive before you've even reached the start line. Crowd noise bleeds through the car door.",
      "Your co-driver clips the pace note book shut. Recce is done. Whatever's written is what you have.",
      "The countdown board drops to fifteen seconds. The engine note changes as you blip the throttle.",
    ],
    crowd:[
      "The crowd erupts — they can hear you coming long before they see the headlights.",
      "Someone leans far too close to the road. A marshal waves them back. They don't move far.",
      "Camera flashes everywhere. At this speed they look like strobes.",
      "A child holds a flag out over the barrier. Their parent pulls them back as you pass at 180.",
      "The crowd parts around a corner. They leave just enough road. Just.",
    ],
    splits:[
      "SPLIT 1 — you're 2.3 seconds up on the road car.",
      "SPLIT 2 — the gap is building. Rhythm is there.",
      "SPLIT 3 — clean section. Time is on your side.",
    ],
    danger:[
      "Rock fall reported on the inside of the next section. Notes may not reflect current road.",
      "Water across the road from a spring. Unmarked. Co-driver calling it off-notes.",
      "Previous car left debris on the road. Proceed with caution.",
    ]
  },
  w90:{
    opening:[
      "Ouninpohja is ready. The crowd has been here since dawn. You can smell the exhaust from the previous car still in the trees.",
      "Your co-driver does a final review of the jump notes. They matter more here than anywhere else on the calendar.",
      "The start marshal signals thirty seconds. Your co-driver reads the first note aloud — not to remind you, just to settle the nerves.",
    ],
    crowd:[
      "The crowd is insane here. Finland brings out a different kind of fan.",
      "Someone has a sauna tent in the forest. This is real.",
      "Thousands on the banking above the jump. They can see four seconds of your stage from up there.",
      "The noise from the crowd on the flying finish is something else entirely.",
      "Finland crowds don't react to the car. They react to the sound. And the sound is arriving first.",
    ],
    splits:[
      "SPLIT 1 — 1.8s up on S. Laurent. Keep pushing.",
      "SPLIT 2 — gap extended to 3.1 seconds. The rhythm is working.",
      "SPLIT 3 — fastest in class so far. Don't back off now.",
    ],
    danger:[
      "Deep ruts on the inside of the next corner from the morning loop. Fresh cut in the gravel.",
      "Jump landing has softened — previous car reported heavy landing, surface not compacted.",
      "Gravel thrown wide on the previous corner. Tyre marks off the road line.",
    ]
  },
  w24:{
    opening:[
      "The Turini at night is a different stage entirely. The afternoon road is gone. What's left belongs to the darkness.",
      "Temperature has dropped two degrees since the road-opening car. Ice patches not on the notes.",
      "Spectator floodlights on the first corner. After that, you're on your own headlights and your co-driver.",
    ],
    crowd:[
      "Thousands up on the mountain, despite the cold. They've been here since ten this morning.",
      "Flares on the banking above the hairpin. Orange smoke drifting across the road.",
      "The sound of your hybrid system seems to confuse the crowd. They expected engine noise. They got silence and then a howl.",
      "Someone has a cowbell. You hear it at 140km/h and somehow it still cuts through.",
      "The village is lined seven-deep. They cheer every car. Even the road-openers.",
    ],
    splits:[
      "SPLIT 1 — P2 on the timing. 0.4s behind the lead.",
      "SPLIT 2 — gap closing. Hybrid deployment optimised through the technical section.",
      "SPLIT 3 — fastest in class. Final push to the line.",
    ],
    danger:[
      "Ice reported on the inside of the next right-hander. Not on recce notes — appeared overnight.",
      "Spectator torch partially blocking sightline at hairpin entry. Marshal present.",
      "Surface wet from fog — visibility reduced on mountain section. Proceed carefully.",
    ]
  }
};

// ── CRASH TYPES ──
const CRASH_TYPES = [
  {id:'off_road', title:'OFF THE ROAD!', emoji:'🚗💨',
   descs:["The front pushed wide — not enough braking for the corner.",
          "The rear stepped out and you couldn't catch it in time.",
          "The car understeered over the apex and into the barrier.",
          "Committed too deep — the corner tightened when the notes said it wouldn't."],
   narrs:["Gravel erupts around the car as it slides into the barrier. The engine cuts. Silence.",
          "The rear breaks away on the exit and the car pirouettes into the bank. Dust everywhere.",
          "The front pushes wide on the damp patch. The armco arrives faster than expected.",
          "Into the bank sideways. The car bounces back onto the road. Somehow it's still running."],
   dmg:{susp:[15,35],body:[20,40],tyres:[10,25]},timeLost:[20,45],recoverable:true},
  {id:'rock_strike', title:'ROCK STRIKE!', emoji:'🪨',
   descs:["A rock from the road surface has hit the underside hard.",
          "Debris from the previous car — the rock was mid-line.",
          "Tyre strike on a boulder on the inside of the corner."],
   narrs:["A loud crack from underneath. The car jars hard. Something has been hit.",
          "The front suspension judders — a rock hidden in the gravel caught the tyre square.",
          "BANG. The car kicks sideways. Rock strike on the front wheel. The crew keeps going."],
   dmg:{susp:[20,45],tyres:[15,40],engine:[5,15]},timeLost:[10,25],recoverable:true},
  {id:'spin', title:'SPIN!', emoji:'🔄',
   descs:["Lost the rear on the corner exit — power oversteer.",
          "The car rotated in the braking zone.",
          "Snap oversteer on the wet inside of the corner."],
   narrs:["The rear breaks away without warning. One, two, three rotations. The car faces backward.",
          "The throttle was too early. The car rotates. Full opposite lock — too slow.",
          "On the snap of the rear, the co-driver grabs the door handle. This happens fast."],
   dmg:{tyres:[10,25],body:[5,20]},timeLost:[8,20],recoverable:true},
  {id:'puncture', title:'PUNCTURE!', emoji:'💨',
   descs:["Front-right tyre is flat — cut on the gravel.",
          "Sidewall puncture on the rear-left. Happened mid-corner.",
          "Rock through the tyre on the straight section."],
   narrs:["The car pulls hard left. The front-right is gone — a cut from the sharp gravel.",
          "The handling changes completely. One corner of the car is on the rim.",
          "BOOM. The tyre explodes from a sharp rock mid-stage. The car slews sideways."],
   dmg:{tyres:[40,70]},timeLost:[30,90],recoverable:true,longStop:true},
  {id:'water_off', title:'INTO THE WATER!', emoji:'💧',
   descs:["The car has gone into the river crossing — speed too high.",
          "Lost control at the water splash — slick rocks on the exit.",
          "Understeered into the stream on the corner beyond the splash."],
   narrs:["The car ploughs through the water at the wrong angle. The engine coughs. Water everywhere.",
          "A sheet of white water and then silence. The car is stuck in the stream bed.",
          "The front drops into the water. The engine stalls. The co-driver is already on the radio."],
   dmg:{engine:[20,50],body:[15,30],susp:[10,25]},timeLost:[45,120],recoverable:true,longStop:true},
  {id:'big_off', title:'HEAVY CONTACT!', emoji:'💥',
   descs:["The car has hit the bank hard — this one is serious.",
          "Gone off into the trees on the outside of the corner.",
          "High-speed contact with the barrier. The crew are shaken but OK."],
   narrs:["The car hits the bank at speed. The noise is violent. The co-driver shouts a stage reference.",
          "Into the trees on the exit. Branches across the bonnet. The car is badly damaged.",
          "Full contact with the concrete barrier. Both airbags deploy. The stage is over."],
   dmg:{engine:[30,60],susp:[25,55],body:[40,70],tyres:[20,45]},timeLost:[60,180],recoverable:false}
];


// ════════════════════════════════════════════════════════
// OBSESSIVE TUNING DATA — per car, per component
// ════════════════════════════════════════════════════════

const TUNING_DEFS = {

  suspension: {
    label:'Suspension', icon:'S',
    groups:[
      {
        id:'springs', label:'Coilover Spring Rates',
        desc:'Primary load-bearing element. Natural frequency = sqrt(k/m)/2pi. Target 3-5Hz for gravel, 5-8Hz tarmac. Too high = wheel hop on corrugations. Too low = wallow and bottom-out.',
        params:[
          {id:'spr_fl',label:'Front-left spring rate',unit:'N/mm',min:30,max:180,step:2,default:62,
           desc:'FL coilover. Above 80N/mm front frequency exceeds 5Hz on most cars — skips on gravel. Tarmac: 100-140 N/mm fine. Each 10N/mm shifts natural frequency ~0.3Hz.',
           warn:function(v){return v>130?'WARN: Wheel hop risk on gravel corrugations':v<38?'WARN: Bottom-out risk — check droop travel':'';},
           effects:function(v){return v>90?[{t:'pos',s:'Sharp tarmac turn-in'},{t:'neg',s:'Hops on gravel'}]:v<45?[{t:'pos',s:'Smooth compliance'},{t:'neg',s:'Slow transient, bottom-out risk'}]:[{t:'neu',s:'Balanced — standard gravel'}];}},
          {id:'spr_fr',label:'Front-right spring rate',unit:'N/mm',min:30,max:180,step:2,default:64,
           desc:'FR coilover. On positive-camber roads (most European mountain stages) softer FR by 4-8 N/mm compensates. Asymmetric springs are legal and common on WRC cars.',
           warn:function(v){return v>130?'High rate — check bump stop clearance':'';},
           effects:function(v){return v>90?[{t:'pos',s:'Planted FR corner'},{t:'neg',s:'Can unload FL on bumps'}]:v<45?[{t:'pos',s:'Compliance'},{t:'neg',s:'Slow response'}]:[{t:'neu',s:'Standard'}];}},
          {id:'spr_rl',label:'Rear-left spring rate',unit:'N/mm',min:28,max:160,step:2,default:55,
           desc:'Rear springs manage power-down, braking dive, and lateral load. Softer rear than front helps rotation. Too soft = power-on oversteer. Rule: rear should be 10-15% softer than front.',
           warn:function(v){return v>120?'Very stiff — lateral traction on gravel will suffer':'';},
           effects:function(v){return v>85?[{t:'pos',s:'Planted rear exit'},{t:'neg',s:'Rear skips on rough gravel'}]:v<38?[{t:'pos',s:'Good exit compliance'},{t:'neg',s:'Power-on oversteer risk'}]:[{t:'neu',s:'Balanced'}];}},
          {id:'spr_rr',label:'Rear-right spring rate',unit:'N/mm',min:28,max:160,step:2,default:56,
           desc:'Often matched to RL but asymmetric on stages with prevailing corner direction. Teams measure the stage left/right ratio and adjust accordingly at recce.',
           warn:function(v){return Math.abs(v-55)>20?'Large asymmetry — confirm stage corner direction':'';},
           effects:function(v){return v>85?[{t:'neg',s:'RR skips on corrugations'}]:v<38?[{t:'neg',s:'RR bottoms on compressions'}]:[{t:'neu',s:'Standard'}];}},
        ]
      },
      {
        id:'bump_stops', label:'Bump Stops and Droop Travel',
        desc:'Controls end-of-travel behaviour. Bump stop contact is normal in rally — the key is how progressive the ramp-up is. Finland: soft and late. Kenya: hard and early for corrugation survival.',
        params:[
          {id:'bstop_f_contact',label:'Front bump stop contact point',unit:'mm from full bump',min:3,max:35,step:1,default:12,
           desc:'Where bump stop rubber starts to engage. 15mm = early contact, progressive. 5mm = late and violent. Monte Carlo teams use 8-10mm. The stop absorbs energy AFTER the damper reaches travel limit.',
           warn:function(v){return v<5?'DANGER: Late contact — violent bottoming on crests':'';},
           effects:function(v){return v<7?[{t:'neg',s:'Abrupt contact — crash risk on crests'}]:v>25?[{t:'pos',s:'Very progressive'},{t:'neg',s:'Car wallows before stop engages'}]:[{t:'pos',s:'Progressive contact'}];}},
          {id:'bstop_f_rate',label:'Front bump stop stiffness',unit:'N/mm',min:60,max:450,step:10,default:120,
           desc:'Stiffness of bump stop rubber/foam. Finland: progressive foam 80-200 N/mm. Tarmac: harder 250-400 N/mm for flat aero attitude. Wrong spec = violent bottoming on the wrong surface.',
           warn:function(v){return '';},
           effects:function(v){return v>300?[{t:'pos',s:'Flat aero on tarmac'},{t:'neg',s:'Violent on full compression over crests'}]:v<80?[{t:'pos',s:'Soft progressive'},{t:'neg',s:'May fully compress on big hits'}]:[{t:'neu',s:'Good gravel spec'}];}},
          {id:'bstop_r_contact',label:'Rear bump stop contact point',unit:'mm from full bump',min:5,max:50,step:1,default:18,
           desc:'Must clear on jump landings. 20mm minimum for Finland. Kenya: 30mm to survive corrugations. Too little contact point = hard landing bottoms rear violently = potential diff/subframe damage.',
           warn:function(v){return v<8?'DANGER: Jump landings will cause violent rear bottoming':'';},
           effects:function(v){return v<10?[{t:'neg',s:'Dangerous on jump landings'}]:v>35?[{t:'pos',s:'Safe on big compressions'},{t:'neg',s:'Car uses lots of travel before stop'}]:[{t:'neu',s:'Standard gravel spec'}];}},
          {id:'droop_f',label:'Front droop travel',unit:'mm',min:40,max:120,step:5,default:70,
           desc:'Maximum downward suspension travel. More droop = wheels stay on ground over crests. Critical on Finland crests — too little droop and front goes light at 200+ km/h.',
           warn:function(v){return v<45?'WARN: Front unloads on crests — instability at speed':'';},
           effects:function(v){return v>90?[{t:'pos',s:'Front stays planted over crests'},{t:'neg',s:'Geometry change may affect camber'}]:v<50?[{t:'neg',s:'Front unloads on crests — dangerous at speed'}]:[{t:'neu',s:'Standard travel'}];}},
          {id:'droop_r',label:'Rear droop travel',unit:'mm',min:40,max:130,step:5,default:80,
           desc:'Scandinavian stages need 80-100mm rear droop. More droop allows Scandinavian flick to work properly and keeps rear tracking in deep ruts.',
           warn:function(v){return '';},
           effects:function(v){return v>100?[{t:'pos',s:'Rear tracks rough terrain'},{t:'neg',s:'Geometry-at-limit issues'}]:v<50?[{t:'neg',s:'Rear hops on corrugations'}]:[{t:'neu',s:'Standard'}];}},
        ]
      },
      {
        id:'dampers_ls', label:'Dampers — Low Speed (0-50mm/s)',
        desc:'Controls body movements — weight transfer, roll on corner entry, pitch under braking. The setting drivers feel most. Low-speed = slow suspension movements, NOT slow road speed.',
        params:[
          {id:'lsd_bump_f',label:'Front LSC (low-speed compression)',unit:'Nm/s',min:200,max:2200,step:50,default:750,
           desc:'Resists slow compression of front. Controls dive under braking and body roll on corner entry. Too high = car darts on gravel. Too low = wallows. Target 600-1200 Nm/s for gravel. This is the setting that changes most between tarmac and gravel.',
           warn:function(v){return v>1800?'WARN: Car will dart — very sensitive to input':'';},
           effects:function(v){return v>1400?[{t:'pos',s:'Precise tarmac entry'},{t:'neg',s:'Nervous on gravel bumps'}]:v<400?[{t:'pos',s:'Smooth gravel'},{t:'neg',s:'Excessive dive under braking'}]:[{t:'neu',s:'Gravel balanced'}];}},
          {id:'lsd_reb_f',label:'Front LSR (low-speed rebound)',unit:'Nm/s',min:300,max:3000,step:50,default:1200,
           desc:'How fast front extends after compression. Too fast = tyre briefly lifts. Too slow = car stays compressed in successive corners (understeer builds). Rule of thumb: LSR = 1.5-2x LSC. This ratio is fundamental to handling balance.',
           warn:function(v){return v<500?'WARN: Front packs down — understeer builds in chicanes':v>2500?'WARN: Bouncy — tyre intermittent contact':'';},
           effects:function(v){return v>2200?[{t:'neg',s:'Bouncy — tyre loses contact'}]:v<500?[{t:'neg',s:'Packs down — understeer builds'}]:[{t:'pos',s:'Good weight transfer control'}];}},
          {id:'lsd_bump_r',label:'Rear LSC (low-speed compression)',unit:'Nm/s',min:200,max:2000,step:50,default:650,
           desc:'Controls squat under acceleration and roll in fast corners. Too high = rear snaps over bumps mid-corner. Too low = rear squats excessively changing geometry under power. Affects throttle-on balance fundamentally.',
           warn:function(v){return '';},
           effects:function(v){return v>1500?[{t:'pos',s:'Flat under power'},{t:'neg',s:'Rear snaps on gravel bumps'}]:v<350?[{t:'pos',s:'Smooth exit compliance'},{t:'neg',s:'Excessive squat under power'}]:[{t:'neu',s:'Balanced'}];}},
          {id:'lsd_reb_r',label:'Rear LSR (low-speed rebound)',unit:'Nm/s',min:300,max:2800,step:50,default:1100,
           desc:'How fast rear extends after power-on compression. Fast = tail snaps back and can overtake the front (oversteer). Slow = planted but lazy rotation. This single setting controls the feel of exit oversteer more than any other damper setting.',
           warn:function(v){return v>2400?'WARN: Snap rear — power oversteer on gravel exits':'';},
           effects:function(v){return v>2000?[{t:'neg',s:'Snappy rear — oversteer risk'}]:v<500?[{t:'pos',s:'Very planted rear'},{t:'neg',s:'Lazy rotation'}]:[{t:'neu',s:'Balanced rebound'}];}},
        ]
      },
      {
        id:'dampers_hs', label:'Dampers — High Speed (>50mm/s)',
        desc:'Controls sharp impacts: gravel stones, kerbs, jumps, compression crests. Separate shim-controlled circuit on Ohlins/Reiger/Proflex units. Teams change shim stacks between stages — this is not just clicks.',
        params:[
          {id:'hsd_bump_f',label:'Front HSC shim stack preload',unit:'clicks',min:1,max:20,step:1,default:6,
           desc:'Shims control the check valve opening threshold above 50mm/s. More shims = stiffer at high speed. Finland teams: 3-5 clicks (soft — absorbs rocks). Germany tarmac: 12-15 clicks (stiff — flat aero). Each click = one 0.1mm shim.',
           warn:function(v){return '';},
           effects:function(v){return v>15?[{t:'pos',s:'Very flat over rocks'},{t:'neg',s:'Violent if shims too stiff for impact speed'}]:v<3?[{t:'pos',s:'Absorbs rocks and compressions'},{t:'neg',s:'Car pitches on big crests'}]:[{t:'neu',s:'Standard gravel shim stack'}];}},
          {id:'hsd_reb_f',label:'Front HSR (high-speed rebound)',unit:'clicks',min:1,max:20,step:1,default:5,
           desc:'How fast front extends after a sharp hit. Usually softer than HSC. If HSR too fast the front hops over gravel corrugations — car chatters at high speed rather than tracking.',
           warn:function(v){return v>16?'WARN: Front may chatter on corrugations':'';},
           effects:function(v){return v>14?[{t:'neg',s:'Front hops on corrugations'}]:v<3?[{t:'pos',s:'Smooth high-speed compliance'}]:[{t:'neu',s:'Standard'}];}},
          {id:'hsd_bump_r',label:'Rear HSC shim stack preload',unit:'clicks',min:1,max:20,step:1,default:5,
           desc:'Critical for jump landings. Finland: 2-4 clicks (very soft — rear absorbs landings). Kenya corrugations: 10-14 clicks (stiff — resist washboard). Getting this wrong in Finland means landing hard and losing control.',
           warn:function(v){return v>14?'WARN: Hard jump landings — bottoming and damage risk':'';},
           effects:function(v){return v>12?[{t:'neg',s:'Violent jump landings'}]:v<3?[{t:'pos',s:'Soft jump landings'},{t:'neg',s:'May bottom on big corrugations'}]:[{t:'neu',s:'Balanced'}];}},
          {id:'hsd_reb_r',label:'Rear HSR (high-speed rebound)',unit:'clicks',min:1,max:18,step:1,default:4,
           desc:'Affects rear behaviour on sequences of bumps. Slow HSR = rear stays low (good for gravel traction). Fast HSR = rear kicks up and can unsettle mid-corner. Often the least-adjusted setting but matters enormously on rough stages.',
           warn:function(v){return '';},
           effects:function(v){return v>13?[{t:'neg',s:'Rear kicks up on multiple bumps'}]:v<2?[{t:'pos',s:'Rear stays down'},{t:'neg',s:'May pack down on long rough sections'}]:[{t:'neu',s:'Standard'}];}},
        ]
      },
      {
        id:'arb', label:'Anti-Roll Bars',
        desc:'Interconnects left and right suspension. On a one-wheel bump, stiffer ARB pulls the unloaded corner UP — reducing contact. On smooth tarmac this is acceptable. On rough gravel it is the enemy of traction. Safari teams remove front ARB entirely.',
        params:[
          {id:'arb_f',label:'Front ARB stiffness',unit:'Nm/deg',min:0,max:450,step:10,default:160,
           desc:'Gravel: 60-140 Nm/deg. Tarmac: 200-400 Nm/deg. Safari/Kenya: often zero — removed for one-wheel bump compliance on corrugations where front ARB would rob the loaded tyre of grip.',
           warn:function(v){return v>380?'Very stiff — loses front grip on one-wheel bumps (gravel)':'';},
           effects:function(v){return v>300?[{t:'pos',s:'Sharp tarmac handling'},{t:'neg',s:'Loses front grip on gravel bumps'}]:v===0?[{t:'pos',s:'Maximum one-wheel compliance'},{t:'neg',s:'High body roll on smooth roads'}]:v<80?[{t:'pos',s:'Good gravel compliance'},{t:'neg',s:'More body roll'}]:[{t:'neu',s:'Standard gravel spec'}];}},
          {id:'arb_r',label:'Rear ARB stiffness',unit:'Nm/deg',min:0,max:380,step:10,default:130,
           desc:'Rear ARB is more sensitive than front. Stiffer = more rear lateral stiffness = more oversteer tendency. Too stiff on gravel and outside rear loads too hard, reducing inside rear contact — causes snap on bumpy corner exits.',
           warn:function(v){return v>300?'WARN: Snap rear on gravel — oversteer under braking':'';},
           effects:function(v){return v>260?[{t:'neg',s:'Snap oversteer on gravel entry'}]:v===0?[{t:'pos',s:'Soft rear — understeer stable'}]:v<70?[{t:'pos',s:'Rear compliance on rough'},{t:'neg',s:'Soft lateral feel'}]:[{t:'neu',s:'Balanced'}];}},
          {id:'arb_f_blade',label:'Front ARB blade angle',unit:'deg (0=stiffest)',min:0,max:90,step:5,default:30,
           desc:'Blade-type ARBs (common in WRC) change effective stiffness by rotating the blade. 0=stiffest, 90=softest. Adjustable from cockpit on some cars — driver calls for ARB changes via intercom mid-stage on long rallies.',
           warn:function(v){return '';},
           effects:function(v){return v<15?[{t:'pos',s:'Maximum ARB stiffness selected'}]:v>70?[{t:'pos',s:'ARB near disengaged'}]:[{t:'neu',s:'Mid-range stiffness'}];}},
          {id:'arb_r_blade',label:'Rear ARB blade angle',unit:'deg (0=stiffest)',min:0,max:90,step:5,default:35,
           desc:'Teams pre-set blade differently for SS1 (cold, wet) vs afternoon runs (hot, gripped). The service park note reads: "afternoon loop: blade to 20 degrees." This is adjusted in 90 seconds at service.',
           warn:function(v){return '';},
           effects:function(v){return v<15?[{t:'neg',s:'Stiff rear — oversteer risk on gravel'}]:v>70?[{t:'pos',s:'Soft rear — maximum compliance'}]:[{t:'neu',s:'Standard blade setting'}];}},
        ]
      },
      {
        id:'geometry', label:'Wheel Alignment and Geometry',
        desc:'Static wheel position — everything flows from here. Wrong geometry makes all other settings irrelevant. Measured with laser alignment rig at service. Changed between stages on separate loops.',
        params:[
          {id:'rh_fl',label:'FL ride height (spindle to arch)',unit:'mm',min:85,max:195,step:5,default:148,
           desc:'The reference dimension measured at wheel arch to spindle centre. Gravel: 140-170mm. Tarmac: 90-120mm. Teams measure at all four corners before every stage — it drifts as springs settle. Higher = more travel, more camber gain, worse aero.',
           warn:function(v){return v<100?'WARN: Will bottom on gravel in compression':v>180?'WARN: CoG penalty, aero drag':'';},
           effects:function(v){return v>165?[{t:'pos',s:'Good gravel clearance'},{t:'neg',s:'High CoG, aero penalty'}]:v<110?[{t:'pos',s:'Low CoG, tarmac fast'},{t:'neg',s:'Bottoms on gravel corrugations'}]:[{t:'neu',s:'Standard gravel height'}];}},
          {id:'rh_fr',label:'FR ride height',unit:'mm',min:85,max:195,step:5,default:150,
           desc:'Match to FL within 2mm. 5mm cross-weight difference significantly shifts handling balance. Teams use corner balance rig — this is the target they measure against.',
           warn:function(v){return '';},
           effects:function(v){return [{t:'neu',s:'Cross-weight balance — match FL within 3mm'}];}},
          {id:'rh_rl',label:'RL ride height',unit:'mm',min:85,max:200,step:5,default:155,
           desc:'Rear often 5-15mm higher than front on gravel — slight nose-down rake improves front aero and entry grip. Rake affects both aero and weight distribution. Too much rake = front pushes under aero load.',
           warn:function(v){return v<100?'WARN: Rear will bottom on rough stages':'';},
           effects:function(v){return v>170?[{t:'pos',s:'Good gravel clearance'},{t:'neg',s:'High rear CoG'}]:v<110?[{t:'neg',s:'Bottoms on rough'}]:[{t:'neu',s:'Standard — slight rake'}];}},
          {id:'rh_rr',label:'RR ride height',unit:'mm',min:85,max:200,step:5,default:155,
           desc:'Right-rear is often the heaviest corner due to fuel tank position. Teams compensate by running RR slightly higher cold, knowing it will compress more under fuel weight.',
           warn:function(v){return '';},
           effects:function(v){return [{t:'neu',s:'Match RL within 3mm — check corner weights on rig'}];}},
          {id:'camber_fl',label:'FL camber',unit:'deg',min:-5.0,max:0.5,step:0.1,default:-2.4,
           desc:'Negative camber tilts top of tyre inward. Tarmac: -3.5 to -4.5 deg for maximum cornering contact patch. Gravel: -1.5 to -2.5 deg — excessive negative and the tyre digs into loose gravel at wrong angle losing traction. Camber changes with suspension travel (camber gain) — this is the static value.',
           warn:function(v){return v<-4.2?'WARN: Outer tyre edge wear — check heat after stage':'';},
           effects:function(v){return v<-3.5?[{t:'pos',s:'Maximum tarmac corner grip'},{t:'neg',s:'Reduced braking, tyre wear'}]:v>-1.2?[{t:'pos',s:'Good braking'},{t:'neg',s:'Less cornering grip'}]:[{t:'neu',s:'Standard gravel camber'}];}},
          {id:'camber_fr',label:'FR camber',unit:'deg',min:-5.0,max:0.5,step:0.1,default:-2.2,
           desc:'Often set 0.2-0.4 deg less negative than FL on stages with prevailing left-hand corners. FR works harder in left turns (more load) — needs less camber to keep tyre flat. Finland is predominantly left-hand corners.',
           warn:function(v){return '';},
           effects:function(v){return v<-3.5?[{t:'pos',s:'Maximum tarmac grip'},{t:'neg',s:'High tyre wear'}]:v>-1.2?[{t:'neg',s:'Reduced lateral grip'}]:[{t:'neu',s:'Adjusted for stage character'}];}},
          {id:'camber_rl',label:'RL camber',unit:'deg',min:-3.5,max:0.5,step:0.1,default:-1.7,
           desc:'Rear camber affects exit traction. Too much negative = outside shoulder overheats and wears on tarmac. Too little = reduced lateral grip in fast corners. Gravel target: -1.0 to -2.0 deg.',
           warn:function(v){return '';},
           effects:function(v){return v<-2.8?[{t:'neg',s:'Rear shoulder wear on tarmac'}]:v>-0.8?[{t:'neg',s:'Reduced lateral rear grip'}]:[{t:'neu',s:'Standard rear camber'}];}},
          {id:'camber_rr',label:'RR camber',unit:'deg',min:-3.5,max:0.5,step:0.1,default:-1.8,
           desc:'Match RL on symmetric stages. On stages with more right-hand corners, run RR 0.2 deg more negative to increase lateral grip for the more-loaded corner.',
           warn:function(v){return '';},
           effects:function(v){return [{t:'neu',s:'Adjust for stage corner frequency — left vs right ratio'}];}},
          {id:'toe_f',label:'Front total toe',unit:'mm (total, toe-in positive)',min:-5,max:6,step:0.5,default:0.5,
           desc:'Measured as total distance difference between front and rear edges of tyre pair. 0mm = parallel. +2mm toe-in = stable, resists turn-in. -2mm toe-out = sharp turn-in, unstable at speed. Rally uses near-zero to slight toe-in. Never run more than 3mm toe-out — high-speed instability guaranteed.',
           warn:function(v){return v<-3?'WARN: High-speed instability — car darts on straights':'';},
           effects:function(v){return v<-2?[{t:'pos',s:'Sharp turn-in'},{t:'neg',s:'High-speed instability, tyre wear'}]:v>3.5?[{t:'pos',s:'Very stable'},{t:'neg',s:'Slow turn-in, scrub'}]:[{t:'neu',s:'Standard rally setting'}];}},
          {id:'toe_r',label:'Rear total toe',unit:'mm (toe-in positive)',min:0,max:9,step:0.5,default:2.5,
           desc:'Rear toe-in provides directional stability. WRC: 2-4mm total toe-in. More = stable but more scrub and tyre heat. Kenya/Safari: 4-6mm for corrugation stability — car needs to track straight without driver input on rough ground.',
           warn:function(v){return v>7?'High toe-in — significant tyre scrub and heat on long stages':'';},
           effects:function(v){return v>5?[{t:'pos',s:'Excellent high-speed stability'},{t:'neg',s:'Tyre scrub, heat, wear'}]:v<1?[{t:'pos',s:'Agile rear'},{t:'neg',s:'Stability reduced at high speed'}]:[{t:'neu',s:'Good gravel stability'}];}},
          {id:'caster',label:'Kingpin caster angle',unit:'deg (positive=rearward lean)',min:3.0,max:10.0,step:0.25,default:6.75,
           desc:'Caster is the forward/backward tilt of the steering axis. More positive caster = more self-centring, more steering feel, but heavier steering. WRC: 6-9 deg depending on era and steering rack ratio. Group B ran less for lighter steering at high speed — drivers\' forearms were huge regardless.',
           warn:function(v){return '';},
           effects:function(v){return v>8.5?[{t:'pos',s:'Very strong self-centring'},{t:'neg',s:'Very heavy — arm pump on long stages'}]:v<4.5?[{t:'pos',s:'Light steering'},{t:'neg',s:'Less feel, less self-centring'}]:[{t:'neu',s:'Standard WRC caster'}];}},
          {id:'scrub_radius',label:'Scrub radius offset',unit:'mm (positive=outboard)',min:-15,max:25,step:1,default:8,
           desc:'Distance between steering axis projected to ground and tyre contact centre. Positive = steering pulls on braking (feel and feedback). Zero = very stable under braking. Negative = steering turns toward lock under braking (safety system — used on some AWD). Most rally: 5-15mm positive.',
           warn:function(v){return v>20?'High scrub — braking pulls hard on split-mu surfaces':v<-10?'WARN: Steering may snap under heavy ABS activation':'';},
           effects:function(v){return v>18?[{t:'neg',s:'Strong pull on braking — tiring on long stages'}]:v<-5?[{t:'pos',s:'Stable under braking'},{t:'neg',s:'Can snap under ABS'}]:[{t:'neu',s:'Good feel and stability balance'}];}},
        ]
      }
    ]
  },

  differential: {
    label:'Differentials', icon:'D',
    groups:[
      {
        id:'front_diff', label:'Front Differential',
        desc:'The front diff determines how power splits between front wheels and how the car behaves under trail braking. The most overlooked diff on 4WD cars but critically important for front-end feel.',
        params:[
          {id:'fd_type',label:'Front diff type',unit:'type',type:'select',
           options:['Open (no lock — inside front spins freely)','Torsen Type A (speed-sensing gear LSD)','Torsen Type B (torque-biasing gear LSD)','Clutch-pack LSD (mechanical)','Electronic active diff (solenoid)','Viscous coupling'],
           default:3,
           effects:function(sel){return sel===0?[{t:'neg',s:'Inside wheel spins — loses drive'}]:sel===4?[{t:'pos',s:'Electronically tunable corner-to-corner'},{t:'neg',s:'Complexity, failure risk'}]:[{t:'neu',s:'Mechanical LSD — proven tech'}];}},
          {id:'fd_lock_accel',label:'Front diff accel lock %',unit:'%',min:0,max:100,step:5,default:30,
           desc:'Most misunderstood setting in rally. Too much = car ploughs straight under power (understeer). Too little = inside front spins. Gravel: 25-40%. Finland flat-out corners: 15% to allow rotation. Tarmac: 40-60%.',
           warn:function(v){return v>75?'WARN: Severe understeer under power':'';},
           effects:function(v){return v>60?[{t:'pos',s:'Strong front pull'},{t:'neg',s:'Understeer under power'}]:v<15?[{t:'pos',s:'Rotation available'},{t:'neg',s:'Inside front spins'}]:[{t:'neu',s:'Balanced front lock'}];}},
          {id:'fd_lock_decel',label:'Front diff decel lock %',unit:'%',min:0,max:60,step:5,default:15,
           desc:'Locking under trail braking. Higher = more front resistance = understeer on entry. Lower = front can rotate (front-engine cars trail-brake better with lower decel lock). Most teams: 10-25%.',
           warn:function(v){return '';},
           effects:function(v){return v>45?[{t:'neg',s:'Understeer on trail braking'}]:v<8?[{t:'pos',s:'Good trail brake rotation'},{t:'neg',s:'Vague on entry'}]:[{t:'neu',s:'Standard decel lock'}];}},
          {id:'fd_preload',label:'Front diff preload torque',unit:'Nm',min:10,max:180,step:5,default:50,
           desc:'Baseline clamping force even at zero differential speed. Sets the minimum lock level. 30-80 Nm is normal. Higher preload = diff partially locked even at apex — good for smooth drivers, bad for aggressive trail-brakers who use throttle manipulation.',
           warn:function(v){return '';},
           effects:function(v){return v>130?[{t:'neg',s:'Always partially locked — unpredictable on entry'}]:v<25?[{t:'pos',s:'Very responsive to throttle'},{t:'neg',s:'Inconsistent behaviour'}]:[{t:'neu',s:'Good preload spec'}];}},
          {id:'fd_ramp_accel',label:'Front diff accel ramp angle',unit:'deg',min:25,max:80,step:5,default:50,
           desc:'Angle of ramped clutch plates determines how aggressively diff locks under increasing torque. Shallow (30-40 deg) = gradual build. Steep (60-75 deg) = snap lock. Gravel: 45-55 deg. Tarmac: 55-65 deg for predictability.',
           warn:function(v){return '';},
           effects:function(v){return v>68?[{t:'pos',s:'Decisive lock'},{t:'neg',s:'Can catch driver by surprise'}]:v<35?[{t:'pos',s:'Progressive and gentle'},{t:'neg',s:'Slow to provide full lock'}]:[{t:'neu',s:'Standard ramp'}];}},
          {id:'fd_ramp_decel',label:'Front diff decel ramp angle',unit:'deg',min:25,max:75,step:5,default:40,
           desc:'Decel ramp controls off-throttle behaviour. Shallow decel = diff opens quickly off throttle (more rotation, better trail braking). Steep = diff stays locked (more stable, less rotation). Finnish drivers prefer shallow — 35-40 deg.',
           warn:function(v){return '';},
           effects:function(v){return v<32?[{t:'pos',s:'Excellent trail brake rotation'},{t:'neg',s:'Diff opens suddenly — feels nervous'}]:v>60?[{t:'pos',s:'Stable off-throttle'},{t:'neg',s:'Understeers into corners'}]:[{t:'neu',s:'Balanced decel ramp'}];}},
        ]
      },
      {
        id:'rear_diff', label:'Rear Differential',
        desc:'What the driver feels most. Controls rotation, exit traction, and the character of oversteer. When the co-driver says "it was planted" or "it was trying to spin" — this is what they are describing.',
        params:[
          {id:'rd_type',label:'Rear diff type',unit:'type',type:'select',
           options:['Open (spec class only — useless on gravel)','Torsen Type A','Torsen Type B','Clutch-pack LSD (mechanical)','Electronic active diff','Hydraulic active diff','Viscous + plate hybrid'],
           default:3,
           effects:function(sel){return sel===0?[{t:'neg',s:'One rear wheel spins — useless on gravel'}]:sel===4?[{t:'pos',s:'Precision corner-to-corner control'},{t:'neg',s:'Electronic failure risk mid-stage'}]:sel===6?[{t:'pos',s:'Passive + active — best of both'}]:[{t:'neu',s:'Plate LSD — proven rally tech'}];}},
          {id:'rd_lock_accel',label:'Rear diff accel lock %',unit:'%',min:0,max:100,step:5,default:40,
           desc:'The balance control. More lock = exits straighter but understeers. Less lock = rotation available but inside rear can spin. Finland: 30-45%. Gravel hairpins: 20-30% for rotation. Tarmac: 60-75%. Some Group B cars ran 90%+ — totally locked — and used power oversteer to rotate.',
           warn:function(v){return v>80?'WARN: Rear locked — severe understeer on gravel exits':v<10?'WARN: Inside rear will spin — lost drive':'';},
           effects:function(v){return v>70?[{t:'pos',s:'Maximum exit traction'},{t:'neg',s:'Cannot rotate on exit'}]:v<20?[{t:'pos',s:'Good rotation'},{t:'neg',s:'Inside rear spins on loose'}]:[{t:'neu',s:'Balanced gravel exit'}];}},
          {id:'rd_lock_decel',label:'Rear diff decel lock %',unit:'%',min:0,max:65,step:5,default:20,
           desc:'This controls whether you can do a Scandinavian flick. Low decel lock (10-20%) = flick works, rotation available. High (40%+) = stable but very understeery into corners. Finnish drivers run 15-20% specifically for the hairpin sequence on Ouninpohja.',
           warn:function(v){return '';},
           effects:function(v){return v<12?[{t:'pos',s:'Scandinavian flick works'},{t:'neg',s:'Can snap suddenly off throttle'}]:v>48?[{t:'pos',s:'Very stable on entry'},{t:'neg',s:'Understeers — hard to rotate'}]:[{t:'neu',s:'Good flick/stability balance'}];}},
          {id:'rd_preload',label:'Rear diff preload torque',unit:'Nm',min:15,max:200,step:5,default:80,
           desc:'Baseline clamping. High preload keeps rear together under all conditions. 60-100 Nm gravel. 100-150 Nm tarmac. Very high = diff is always somewhat locked = predictable but less agile. Group B monsters often ran 150+ Nm preload and used throttle to manage direction.',
           warn:function(v){return '';},
           effects:function(v){return v>160?[{t:'pos',s:'Very predictable'},{t:'neg',s:'Understeers everywhere'}]:v<30?[{t:'pos',s:'Agile — fully releases off-throttle'},{t:'neg',s:'Inconsistent — can surprise driver'}]:[{t:'neu',s:'Standard preload'}];}},
          {id:'rd_ramp_accel',label:'Rear diff accel ramp angle',unit:'deg',min:25,max:80,step:5,default:55,
           desc:'Steep (65-75 deg) = instant traction, no rotation. Shallow (30-40 deg) = progressive, allows power oversteer. High-grip tarmac: steep. Gravel hairpins: shallow to intermediate. This is often changed by swapping actual ramp plates — a 20 minute job.',
           warn:function(v){return '';},
           effects:function(v){return v>70?[{t:'pos',s:'Instant rear traction'},{t:'neg',s:'Cannot rotate on power'}]:v<35?[{t:'pos',s:'Power oversteer available'},{t:'neg',s:'Wheelspin on loose gravel'}]:[{t:'neu',s:'Balanced ramp'}];}},
          {id:'rd_ramp_decel',label:'Rear diff decel ramp angle',unit:'deg',min:20,max:75,step:5,default:38,
           desc:'The Scandinavian flick dial. Shallow (25-35 deg) = diff opens fast under trail braking = rear steps out = rotation. Steep (60-70 deg) = stable but heavy. Finnish drivers have run 25 deg decel ramp specifically for Ouninpohja hairpins. Some WRC co-drivers carry a spare ramp plate in their notes.',
           warn:function(v){return v<25?'Aggressive — rear will rotate strongly on trail brake':'';},
           effects:function(v){return v<28?[{t:'pos',s:'Strong Scandi flick'},{t:'neg',s:'Over-rotation risk — catch required'}]:v>58?[{t:'pos',s:'Very stable on entry'},{t:'neg',s:'Understeers into all corners'}]:[{t:'neu',s:'Good flick/stability balance'}];}},
          {id:'rd_clutch_plates',label:'Rear diff clutch plate count',unit:'pairs',min:2,max:8,step:1,default:4,
           desc:'More clutch plate pairs = higher torque capacity, more even wear, higher preload possible without distortion. Fewer = lighter, lower capacity. WRC cars: 3-6 pairs. Group B monsters: 6-8 pairs. Carbon-carbon plates weigh less but cost more and are more fragile.',
           warn:function(v){return '';},
           effects:function(v){return v>6?[{t:'pos',s:'High torque capacity — reliable under big power'},{t:'neg',s:'Weight and rotating inertia'}]:v<3?[{t:'pos',s:'Light'},{t:'neg',s:'May slip and fade under high torque'}]:[{t:'neu',s:'Standard WRC spec'}];}},
        ]
      },
      {
        id:'centre_diff', label:'Centre Differential (4WD)',
        desc:'Where the car\'s fundamental personality is set. More rear torque = rotation, oversteer character. More front = push, understeer, maximum traction from standstill. Every setup decision downstream is influenced by this.',
        params:[
          {id:'cd_type',label:'Centre diff type',unit:'type',type:'select',
           options:['Fixed 50/50 (simple, reliable)','Torsen centre (speed-sensing)','Hydraulic multi-plate','Electronic active (ECU-controlled)','Viscous coupling','Ferguson Formula (viscous + plate)'],
           default:2,
           effects:function(sel){return sel===3?[{t:'pos',s:'ECU changes split corner-to-corner'},{t:'neg',s:'Complex — failure mid-stage possible'}]:sel===0?[{t:'pos',s:'Simple, reliable, low maintenance'},{t:'neg',s:'Cannot adapt to conditions'}]:[{t:'neu',s:'Mechanical — proven tech'}];}},
          {id:'cd_split',label:'Base front/rear torque split',unit:'% front',min:20,max:65,step:5,default:40,
           desc:'Starting torque distribution. Modern WRC standard: 40%F/60%R. Finland: 35/65 for rotation. Tarmac: 45/55 for maximum traction. Group B Audi quattro was near 50/50 fixed — considered too understeery by Rohrl. Peugeot 205 T16: 35/65 rear-biased — much more talkative.',
           warn:function(v){return v<25?'WARN: Very rear biased — easy to spin in loose':v>60?'WARN: Very front biased — heavy understeer':'';},
           effects:function(v){return v>55?[{t:'pos',s:'Maximum traction'},{t:'neg',s:'Understeers — loses rear rotation'}]:v<28?[{t:'pos',s:'Rotation, rear-wheel feel'},{t:'neg',s:'Oversteer risk on power'}]:[{t:'neu',s:'Balanced WRC split'}];}},
          {id:'cd_lock',label:'Centre diff lock %',unit:'%',min:0,max:100,step:5,default:55,
           desc:'Mechanical coupling between axles. Higher = more 4WD feel = more fight between axles on tarmac hairpins. Lower = each axle relatively independent = loose feeling, easier to steer but less bite on loose. This is why Group B cars felt so different to drive — many had crude high-lock centres.',
           warn:function(v){return '';},
           effects:function(v){return v>80?[{t:'pos',s:'Strong 4WD feel on loose'},{t:'neg',s:'Fights steering on tarmac hairpins'}]:v<20?[{t:'pos',s:'Free — easy to steer'},{t:'neg',s:'Less 4WD bite on rough'}]:[{t:'neu',s:'Balanced coupling'}];}},
          {id:'cd_preload',label:'Centre diff preload',unit:'Nm',min:5,max:100,step:5,default:35,
           desc:'Keeps axles partially coupled even at zero torque difference. Low = very free-feeling, diff opens easily under braking. High = always some coupling — more predictable. Finland: 30 Nm. Kenya: 60 Nm. Active diffs bypass this setting entirely.',
           warn:function(v){return '';},
           effects:function(v){return v>75?[{t:'pos',s:'Always coupled — predictable'},{t:'neg',s:'Fights on slow tarmac hairpins'}]:v<15?[{t:'pos',s:'Free feeling'},{t:'neg',s:'Axles disconnect under hard braking'}]:[{t:'neu',s:'Standard preload'}];}},
        ]
      }
    ]
  },

  brakes: {
    label:'Brakes', icon:'B',
    groups:[
      {
        id:'brake_system', label:'Hydraulic Architecture',
        desc:'The foundation of the brake system. Everything else — pads, discs, cooling — builds on this hydraulic architecture. Getting master cylinder sizing wrong means no other brake setting can compensate.',
        params:[
          {id:'mc_f_bore',label:'Front master cylinder bore',unit:'mm',min:17,max:28,step:0.5,default:22.0,
           desc:'Master cylinder bore determines pedal ratio and pressure generation. Larger bore = more fluid volume per stroke (firm pedal), less pressure for same pedal force. Smaller = harder pedal, more pressure. Front MC 20-25mm for WRC. The bore size must match the caliper piston area for the desired pedal ratio.',
           warn:function(v){return '';},
           effects:function(v){return v>25?[{t:'pos',s:'Firm feel, high volume'},{t:'neg',s:'Needs high pedal force for max pressure'}]:v<19?[{t:'pos',s:'High pressure, light pedal'},{t:'neg',s:'Can over-brake — locks easily'}]:[{t:'neu',s:'Standard WRC spec'}];}},
          {id:'mc_r_bore',label:'Rear master cylinder bore',unit:'mm',min:12,max:22,step:0.5,default:16.0,
           desc:'Rear MC typically smaller than front — rear circuit needs less volume. 14-18mm typical. If rear MC is too large relative to front, rear circuit becomes dominant and rear locks first. The ratio of front MC bore to rear MC bore directly sets the baseline brake bias.',
           warn:function(v){return v>20?'WARN: Rear circuit may dominate — rear lock risk':'';},
           effects:function(v){return v>18?[{t:'neg',s:'Rear may lock before front'}]:v<13?[{t:'pos',s:'Front dominant'},{t:'neg',s:'Very little rear feel'}]:[{t:'neu',s:'Standard rear MC'}];}},
          {id:'brake_bias',label:'Balance bar position (% front)',unit:'%',min:45,max:80,step:1,default:63,
           desc:'The balance bar mechanically links front and rear master cylinders. Rotating adjusts the force split. 60-70% front is typical for gravel. 65-72% for tarmac. WRC drivers adjust from cockpit during stage via rotary knob. A technical tarmac stage may require 5+ adjustments during a single run.',
           warn:function(v){return v>76?'WARN: Rear brakes almost unused — front lock without ABS':v<50?'WARN: Rear dominant — rear locks first':'';},
           effects:function(v){return v>72?[{t:'pos',s:'Maximum front braking'},{t:'neg',s:'Rear light — no trail brake rotation'}]:v<53?[{t:'pos',s:'Trail brake rotation'},{t:'neg',s:'Rear locks — spin on braking'}]:[{t:'neu',s:'Standard gravel bias'}];}},
          {id:'hb_pressure',label:'Hydraulic handbrake pressure',unit:'bar',min:20,max:120,step:5,default:65,
           desc:'The hydraulic handbrake feeds rear calipers only. Pressure determines how sharply rear locks for Scandinavian flick. 60-80 bar = sharp, decisive. 30-50 bar = gentle. Too high = rear locks with minimal input — loss of control. Too low = underrotates in tight hairpins.',
           warn:function(v){return v>100?'WARN: Rear snaps with minimal handbrake — control very difficult':'';},
           effects:function(v){return v>90?[{t:'pos',s:'Very sharp flick'},{t:'neg',s:'Rear snaps immediately — catch required'}]:v<35?[{t:'pos',s:'Gentle flick — controllable'},{t:'neg',s:'Under-rotates in tight hairpins'}]:[{t:'neu',s:'Standard flick pressure'}];}},
          {id:'abs_threshold',label:'ABS intervention threshold',unit:'% slip before ABS',min:3,max:30,step:1,default:15,
           desc:'Percentage of tyre slip before ABS modulates. Low (5%) = early intervention = consistent but not shortest stop. High (25%) = allows more slip = shorter stops on gravel where slip angle helps — but edge of lock. On ice the threshold is critical — too high and you push off the road.',
           warn:function(v){return '';},
           effects:function(v){return v>22?[{t:'pos',s:'Maximum stop on gravel'},{t:'neg',s:'Edge of lock — test carefully'}]:v<6?[{t:'pos',s:'Consistent, reliable'},{t:'neg',s:'May not achieve shortest gravel stop'}]:[{t:'neu',s:'Balanced ABS calibration'}];}},
        ]
      },
      {
        id:'discs_pads', label:'Discs and Pads',
        desc:'Material and size — affects heat management across an entire stage. Wrong compound can cause fade from corner 3 of a 30-corner stage.',
        params:[
          {id:'disc_size_f',label:'Front disc diameter',unit:'mm',min:280,max:390,step:5,default:360,
           desc:'Larger disc = more leverage = more braking torque for same caliper force. Also larger heat sink = longer before fade. But heavier unsprung weight. WRC front: 355-380mm. Group B: 280-320mm. The trend toward larger discs came with higher car speeds and longer stages.',
           warn:function(v){return '';},
           effects:function(v){return v>375?[{t:'pos',s:'Maximum braking performance'},{t:'neg',s:'Heavy unsprung weight — suspension response'}]:v<300?[{t:'pos',s:'Lighter wheel assembly'},{t:'neg',s:'Less braking surface — more heat'}]:[{t:'neu',s:'Standard WRC disc'}];}},
          {id:'disc_size_r',label:'Rear disc diameter',unit:'mm',min:240,max:340,step:5,default:310,
           desc:'Rear disc is smaller — lower braking load. 300-330mm typical. Upsizing rear beyond what the bias requires just adds weight and heat without benefit. Size is matched to the rear caliper piston area for the desired pedal feel.',
           warn:function(v){return '';},
           effects:function(v){return v>330?[{t:'neg',s:'Oversized — unnecessary weight'}]:v<260?[{t:'neg',s:'Undersized — fades on tarmac'}]:[{t:'neu',s:'Standard rear disc'}];}},
          {id:'disc_spec',label:'Disc material',unit:'type',type:'select',
           options:['Cast iron (gravel — cheap, durable, survives rocks)','Steel composite (mixed stage)','Cross-drilled cast (wet tarmac)','Grooved steel (mixed/wet)','Carbon-ceramic (dry tarmac ONLY)','Bimetallic floating (tarmac endurance)'],
           default:0,
           effects:function(sel){return sel===0?[{t:'pos',s:'Cheap, durable, survives rock strikes'},{t:'neg',s:'Heavier than composites'}]:sel===4?[{t:'pos',s:'Excellent feel on dry tarmac'},{t:'neg',s:'SHATTERS on gravel rock strikes — never use on loose'}]:[{t:'neu',s:'Standard rally spec'}];}},
          {id:'pad_f',label:'Front pad compound',unit:'type',type:'select',
           options:['Soft/wet gravel (low heat, good cold bite)','Medium gravel (standard)','Hard gravel (long stages, endurance)','Soft tarmac','Medium tarmac','Hard tarmac (endurance)','Carbon-metallic (dry tarmac)','Sintered (extreme endurance)'],
           default:1,
           effects:function(sel){return sel===0?[{t:'pos',s:'Good feel on cold gravel'},{t:'neg',s:'Fast wear on tarmac'}]:sel===6?[{t:'pos',s:'Maximum tarmac bite'},{t:'neg',s:'Glazes on gravel — useless'}]:[{t:'neu',s:'Good compromise compound'}];}},
          {id:'pad_r',label:'Rear pad compound',unit:'type',type:'select',
           options:['Soft/wet gravel','Medium gravel (standard)','Hard gravel (endurance)','Soft tarmac','Medium tarmac','Hard tarmac','Carbon-metallic','Sintered'],
           default:1,
           effects:function(sel){return [{t:'neu',s:'Match to front compound type for consistent balance'}];}},
          {id:'duct_f',label:'Front brake duct opening',unit:'mm diameter',min:0,max:130,step:5,default:60,
           desc:'Airflow to front brake. Too small = fade. Too large = brakes never reach temperature = no initial bite (cold pad syndrome). Finland teams blank front ducts entirely — minimal braking zones, cold conditions. Monte Carlo night stage: fully open 100mm+ for consistent high-temp braking.',
           warn:function(v){return v===0?'Blanked — ONLY use on stages with minimal braking':'';},
           effects:function(v){return v===0?[{t:'pos',s:'Brakes reach temp fast'},{t:'neg',s:'Fade on long braking zones'}]:v>100?[{t:'pos',s:'Never fade'},{t:'neg',s:'Cold brake syndrome — slow initial bite'}]:[{t:'neu',s:'Balanced cooling'}];}},
          {id:'duct_r',label:'Rear brake duct opening',unit:'mm',min:0,max:80,step:5,default:25,
           desc:'Rear brakes run cooler — less braking load. Over-cooling rear causes pad glazing. Most teams run rear ducts 30-50% smaller than front. On warm tarmac stages with long braking zones, slight rear cooling prevents rear fade that ruins brake bias.',
           warn:function(v){return v>65?'WARN: Over-cooled rear — pad glazing and no feel':'';},
           effects:function(v){return v>65?[{t:'neg',s:'Over-cooled — pad glazing risk'}]:v===0?[{t:'pos',s:'Rear reaches temp fast'},{t:'neg',s:'Rear fades on long tarmac'}]:[{t:'neu',s:'Standard rear cooling'}];}},
        ]
      }
    ]
  },

  drivetrain: {
    label:'Drivetrain', icon:'G',
    groups:[
      {
        id:'ratios', label:'Sequential Gearbox Ratios',
        desc:'Each ratio determines where the engine sits in its power band for a given road speed. Goal: never hit the rev limiter mid-corner, never lug the engine on a straight. Teams carry multiple crown wheels and pinion sets for each event.',
        params:[
          {id:'r1',label:'1st gear ratio',unit:':1',min:2.2,max:5.0,step:0.05,default:3.45,
           desc:'Launch and hairpin gear. Group B cars often launched from 2nd on loose — 1st just lit up the tyres. WRC cars launch from 1st only in super specials. Target: 60-80 km/h at rev limit. Too short = red-lines before corner exit. Too long = no traction from standstill.',
           warn:function(v){return '';},
           effects:function(v){return v>4.5?[{t:'pos',s:'Maximum launch traction'},{t:'neg',s:'Red-lines very quickly'}]:v<2.5?[{t:'pos',s:'Pulls well in 1st'},{t:'neg',s:'Less traction from stop'}]:[{t:'neu',s:'Standard launch ratio'}];}},
          {id:'r2',label:'2nd gear ratio',unit:':1',min:1.7,max:3.5,step:0.05,default:2.60,
           desc:'Hairpin exits and technical sections — most-used gear on a tight stage. The gap between 1st and 2nd matters critically. Too large a gap (>1.0 ratio drop) causes a surge of oversteer on upshifts from hairpins as the engine abruptly loads the drivetrain. Target gap: 0.7-0.9.',
           warn:function(v){return '';},
           effects:function(v){return v>3.0?[{t:'pos',s:'Strong pull in technical sections'},{t:'neg',s:'May rev-limit on fast corners'}]:v<2.0?[{t:'pos',s:'Strong on medium speed'},{t:'neg',s:'Not enough pull from tight hairpins'}]:[{t:'neu',s:'Standard'}];}},
          {id:'r3',label:'3rd gear ratio',unit:':1',min:1.3,max:2.6,step:0.05,default:1.95,
           desc:'Medium-fast corners. The gap from 2nd to 3rd is critical on Finland uphill straights — a well-chosen 3rd means staying in gear rather than a hurried shift to 4th at the wrong moment. Engine must be in powerband through medium-speed corners.',
           warn:function(v){return '';},
           effects:function(v){return [{t:'neu',s:'Check powerband coverage at target stage speed'}];}},
          {id:'r4',label:'4th gear ratio',unit:':1',min:1.0,max:2.0,step:0.05,default:1.52,
           desc:'Open fast gravel. On Finland, 4th is used on long forest straights. The ratio gap from 3rd to 4th must avoid a dead spot in acceleration. Teams plot speed vs torque to confirm no acceleration gap between gears.',
           warn:function(v){return '';},
           effects:function(v){return v>1.8?[{t:'pos',s:'Strong pull in 4th'},{t:'neg',s:'May rev-limit on fastest straights'}]:v<1.15?[{t:'pos',s:'High speed oriented'},{t:'neg',s:'Large gap from 3rd'}]:[{t:'neu',s:'Balanced'}];}},
          {id:'r5',label:'5th gear ratio',unit:':1',min:0.65,max:1.5,step:0.05,default:1.12,
           desc:'Top gear. Finland: 5th at 200+ km/h through the trees. Germany: never leaves 5th for 3km. Teams calculate maximum speed in 5th and compare to the longest straight on the stage. Too short = bouncing off limiter. Too long = lugging engine.',
           warn:function(v){return '';},
           effects:function(v){return v<0.8?[{t:'pos',s:'High top speed'},{t:'neg',s:'Engine lightly loaded — less pull'}]:v>1.3?[{t:'pos',s:'Strong pull in 5th'},{t:'neg',s:'Lower top speed'}]:[{t:'neu',s:'Standard top gear'}];}},
          {id:'fd_ratio',label:'Final drive ratio',unit:':1',min:2.5,max:5.5,step:0.1,default:3.8,
           desc:'Multiplies every gear ratio without changing the gaps between gears. Short final drive (4.2+) = more torque multiplication, lower top speed. Long (3.0-3.5) = high speed stages. Teams carry multiple crown wheel/pinion sets and swap overnight between rough and fast rallies.',
           warn:function(v){return v>5.0?'Very short — will rev-limit at moderate speed':v<2.8?'Very long — may not pull cleanly from hairpins':'';},
           effects:function(v){return v>4.6?[{t:'pos',s:'Excellent torque on loose'},{t:'neg',s:'Low top speed'}]:v<3.0?[{t:'pos',s:'High top speed'},{t:'neg',s:'Less torque — demands high engine output'}]:[{t:'neu',s:'Standard ratio'}];}},
        ]
      },
      {
        id:'gearbox_internals', label:'Gearbox Internals and Clutch',
        params:[
          {id:'shift_pressure',label:'Pneumatic/hydraulic shift assist pressure',unit:'bar',min:0,max:12,step:0.5,default:7.0,
           desc:'Sequential rally gearboxes use pneumatic or hydraulic actuators. Higher pressure = faster more aggressive shifts — minimal time loss but harder on synchromesh and dogs. Modern WRC: 6-8 bar. Group B mechanical synchro: no assist — driver had to be precise and fast.',
           warn:function(v){return '';},
           effects:function(v){return v===0?[{t:'neu',s:'Mechanical shift — no assist'}]:v>10?[{t:'pos',s:'Very fast shifts'},{t:'neg',s:'Aggressive — harder on synchromesh dogs'}]:v<4?[{t:'pos',s:'Smooth and gentle'},{t:'neg',s:'Slower shifts — time cost on straights'}]:[{t:'neu',s:'Standard shift assist'}];}},
          {id:'flywheel_kg',label:'Flywheel mass',unit:'kg',min:2.0,max:9.0,step:0.25,default:4.25,
           desc:'Heavier flywheel = more rotational inertia = smoother power delivery, less stall sensitivity, better anti-lag effectiveness (turbine keeps spinning). Lighter = faster throttle response, better acceleration from tight corners. Group B Audi: 7.5kg for smooth quattro delivery. Modern WRC: 3-4.5kg.',
           warn:function(v){return '';},
           effects:function(v){return v<2.8?[{t:'pos',s:'Very fast throttle response'},{t:'neg',s:'Stall sensitive, anti-lag less effective'}]:v>7.0?[{t:'pos',s:'Smooth, easy to drive'},{t:'neg',s:'Slower response, more rotational mass'}]:[{t:'neu',s:'Standard rally flywheel'}];}},
          {id:'clutch_material',label:'Clutch plate material',unit:'type',type:'select',
           options:['Organic (smooth — street/low power only)','Cerametallic (standard rally)','Carbon-carbon (high performance)','Sintered bronze (endurance)','Triple-plate carbon (Group B power levels)'],
           default:1,
           effects:function(sel){return sel===0?[{t:'neg',s:'Slips under WRC power levels'}]:sel===4?[{t:'pos',s:'Handles Group B power'},{t:'neg',s:'Very aggressive — no slipping at all'}]:[{t:'neu',s:'Suitable for rally use'}];}},
          {id:'clutch_engage_point',label:'Clutch engagement point',unit:'% pedal travel',min:15,max:80,step:5,default:45,
           desc:'Where the clutch bites in the pedal travel. Early engagement (20-30%) = easier smooth launches, better for beginners. Late engagement (60-70%) = very precise control — used by experienced drivers who left-foot brake. Too late = stall risk in hairpin sequences.',
           warn:function(v){return v>70?'Late engagement — stall risk in hairpin sequences':'';},
           effects:function(v){return v>65?[{t:'pos',s:'Very precise control'},{t:'neg',s:'Stall risk in tight hairpins'}]:v<25?[{t:'pos',s:'Easy smooth launches'},{t:'neg',s:'Less precision'}]:[{t:'neu',s:'Standard'}];}},
        ]
      }
    ]
  },

  engine: {
    label:'Engine and Power', icon:'E',
    groups:[
      {
        id:'turbo', label:'Turbocharger System',
        desc:'The turbocharger defines the power character. Every choice here has a cascade effect — turbo size affects boost threshold, which affects ALS strategy, which affects exhaust temperature, which affects intercooler sizing.',
        params:[
          {id:'boost_bar',label:'Maximum boost pressure',unit:'bar absolute',min:1.2,max:3.2,step:0.05,default:1.95,
           desc:'Absolute boost including atmospheric (1.013 bar). So 2.5 bar absolute = 1.49 bar gauge = ~21 psi. Each 0.1 bar additional boost adds roughly 15-25hp depending on fuelling and ignition map. Rally cars: 1.8-2.4 bar absolute on gravel. Group B had no limits — some ran 3.0+ bar.',
           warn:function(v){return v>2.8?'DANGER: Above safe limit — piston and head gasket failure risk':'';},
           effects:function(v){return v>2.6?[{t:'pos',s:'Very high power output'},{t:'neg',s:'Significant engine stress — failure risk'}]:v<1.5?[{t:'pos',s:'Very conservative — reliable'},{t:'neg',s:'Below potential'}]:[{t:'neu',s:'Standard rally boost'}];}},
          {id:'wastegate_psi',label:'Wastegate spring pressure',unit:'psi',min:5,max:32,step:1,default:14,
           desc:'Spring holds wastegate closed until boost overcomes it. Stiffer = boost creep possible (exceeds target) but more aggressive delivery. Softer = very linear boost curve. Most modern WRC uses EBC (electronic boost control) solenoid to modulate above the spring baseline.',
           warn:function(v){return '';},
           effects:function(v){return v>26?[{t:'pos',s:'Boost held aggressively'},{t:'neg',s:'Boost creep risk — engine stress'}]:v<8?[{t:'pos',s:'Conservative boost control'},{t:'neg',s:'Boost drops under load'}]:[{t:'neu',s:'Standard spec'}];}},
          {id:'als_level',label:'Anti-lag system (ALS) aggression',unit:'type',type:'select',
           options:['Off — no ALS (silent, long spool delay)','Mild — slight ignition retard (some crackle)','Stage — retard + fuel dump (loud, fast spool)','Maximum — extreme retard + dump valve (glowing exhaust)','Group B mode — no limits (turbine life under 1 stage)'],
           default:2,
           effects:function(sel){return sel===0?[{t:'pos',s:'Long turbo life'},{t:'neg',s:'Lag after every corner'}]:sel===4?[{t:'pos',s:'Zero lag — instant response'},{t:'neg',s:'Destroys turbo and exhaust in one stage'}]:sel===3?[{t:'pos',s:'Near-zero lag'},{t:'neg',s:'Exhaust and turbine critically hot'}]:[{t:'neu',s:'Stage-legal ALS'}];}},
          {id:'intercooler',label:'Intercooler specification',unit:'type',type:'select',
           options:['Air-to-air minimal (lightest)','Air-to-air standard WRC','Air-to-air uprated (hot stages)','Water-to-air spray coolant (tarmac)','Ice tank charge cooler (tarmac sprint)','Twin-pass bar-and-plate (endurance)'],
           default:1,
           effects:function(sel){return sel===0?[{t:'pos',s:'Lightest — fastest spool'},{t:'neg',s:'Heat soak on long stages'}]:sel===4?[{t:'pos',s:'Coldest charge — maximum power'},{t:'neg',s:'Ice runs out — then worse'}]:[{t:'neu',s:'Standard WRC spec'}];}},
          {id:'bov',label:'Blow-off valve type',unit:'type',type:'select',
           options:['Atmospheric (loud whoosh)','Recirculating to intake (quiet)','Hybrid (atmospheric + recirc)','Blocked — ALS only (hard on compressor wheel)','Adjustable threshold'],
           default:1,
           effects:function(sel){return sel===0?[{t:'pos',s:'Very fast pressure release'},{t:'neg',s:'Turbo must re-spool after every lift'}]:sel===3?[{t:'pos',s:'Maximum ALS effectiveness'},{t:'neg',s:'Wears compressor wheel blades — expensive'}]:[{t:'neu',s:'Standard recirculating'}];}},
        ]
      },
      {
        id:'engine_maps', label:'ECU Maps and Fuelling',
        desc:'Modern rally ECUs control ignition timing, fuelling, throttle response, and traction control across hundreds of map cells. A single bad cell can cause detonation on a specific corner under specific conditions.',
        params:[
          {id:'ignition_advance',label:'Base ignition advance at peak torque',unit:'deg BTDC',min:8,max:38,step:1,default:22,
           desc:'How far before top dead centre the spark fires at peak torque rpm. Each degree of advance up to MBT (minimum advance for best torque) adds power. Past MBT = detonation. ECU knock sensors pull timing automatically — this sets the base from which the ECU works. Rally fuel (100 RON+) allows more advance.',
           warn:function(v){return v>33?'WARN: Past MBT for most fuels — knock sensor will be working hard':'';},
           effects:function(v){return v>30?[{t:'pos',s:'Maximum torque from ignition'},{t:'neg',s:'Knock risk — ECU will retard under detonation'}]:v<13?[{t:'pos',s:'Very safe'},{t:'neg',s:'Significant power loss'}]:[{t:'neu',s:'Standard advance'}];}},
          {id:'lambda',label:'Target air/fuel ratio (lambda)',unit:'lambda (1.0=stoich)',min:0.78,max:1.05,step:0.01,default:0.89,
           desc:'Lambda 1.0 = perfect stoichiometric combustion. Rally cars run rich (0.85-0.92) for power and to cool pistons via excess fuel latent heat. Too rich = sooty, unburned fuel, fouled plugs. Too lean = power loss and piston melt (knock + lean = catastrophic). This is the most failure-critical setting in the whole car.',
           warn:function(v){return v>1.0?'DANGER: Running lean — piston melt risk at full load':v<0.80?'WARN: Very rich — plug fouling, fuel waste':'';},
           effects:function(v){return v<0.84?[{t:'pos',s:'Maximum fuel cooling of combustion'},{t:'neg',s:'Fuel waste, plug fouling'}]:v>0.97?[{t:'neg',s:'Lean — heat damage risk at full load'}]:[{t:'pos',s:'Good power with thermal protection'}];}},
          {id:'rev_limit',label:'Rev limiter (hard cut)',unit:'rpm',min:6500,max:10500,step:100,default:8500,
           desc:'Absolute maximum rpm — ECU kills ignition above this. Each 100rpm above 8000 gives diminishing returns but adds stress. Valve float starts around 9500rpm on many 4-cylinder rally engines. Some teams run separate limiters: higher for qualifying (attack), lower for full stage (reliability).',
           warn:function(v){return v>9800?'WARN: Valve float risk — expensive engine damage':'';},
           effects:function(v){return v>9400?[{t:'pos',s:'Uses full power band'},{t:'neg',s:'Valve float risk on over-rev'}]:v<7500?[{t:'pos',s:'Conservative — long engine life'},{t:'neg',s:'Leaves power on the table'}]:[{t:'neu',s:'Standard limit'}];}},
          {id:'tc_slip',label:'Traction control slip threshold',unit:'% before TC cuts',min:0,max:30,step:1,default:10,
           desc:'Speed difference between driven and undriven wheels before TC cuts power. Low (2-5%) = early intervention — smooth but slower. High (15-25%) = significant wheelspin before cut — faster on loose but car can bog in deep gravel. Some drivers prefer TC off entirely and manage with throttle — especially Group B veterans who had no TC at all.',
           warn:function(v){return '';},
           effects:function(v){return v===0?[{t:'pos',s:'TC off — full driver control'},{t:'neg',s:'Easy to spin — high skill required'}]:v>22?[{t:'pos',s:'Aggressive — lots of wheelspin before cut'},{t:'neg',s:'Can bog in deep loose'}]:v<5?[{t:'pos',s:'Very clean exits'},{t:'neg',s:'TC may cut at wrong moment'}]:[{t:'neu',s:'Standard gravel TC threshold'}];}},
          {id:'throttle_map',label:'Throttle progression map',unit:'type',type:'select',
           options:['Linear (1:1 pedal to throttle)','Progressive (gentle initial, then sharp)','Aggressive (sharp initial opening)','Anti-wheelspin (very progressive — loose)','Driver custom map (saved to ECU)'],
           default:1,
           effects:function(sel){return sel===0?[{t:'pos',s:'Exactly what driver inputs'},{t:'neg',s:'Causes wheelspin on initial gravel throttle'}]:sel===2?[{t:'pos',s:'Very responsive'},{t:'neg',s:'Hard to modulate on loose surface'}]:sel===3?[{t:'pos',s:'Anti-wheelspin — gentle'},{t:'neg',s:'Less direct feel on tarmac'}]:[{t:'neu',s:'Compromise map'}];}},
          {id:'engine_brake',label:'Engine braking overrun map',unit:'type',type:'select',
           options:['Maximum engine braking (fuel cut on overrun)','Standard (some overrun fuelling)','Minimal engine braking (full overrun fuelling)','Zero engine braking (race-style)'],
           default:1,
           effects:function(sel){return sel===0?[{t:'pos',s:'Maximum deceleration'},{t:'neg',s:'Rear steps out suddenly on lift-off'}]:sel===3?[{t:'pos',s:'No sudden rear movement on lift'},{t:'neg',s:'Less deceleration — more braking needed'}]:[{t:'neu',s:'Balanced overrun'}];}},
        ]
      },
      {
        id:'cooling', label:'Cooling and Thermal Management',
        params:[
          {id:'coolant_temp',label:'Coolant thermostat temperature',unit:'deg C',min:65,max:100,step:1,default:82,
           desc:'Thermostat holds coolant at this temperature. Lower = cooler running, denser air charge (power bonus), safer on hot stages. Higher = more thermally efficient. Kenya: 75 deg C. Finland: 82 deg C. Tarmac: 87 deg C. The target changes with ambient temperature and stage length.',
           warn:function(v){return v>95?'WARN: Very hot — overheating risk on Kenya/Portugal hot stages':'';},
           effects:function(v){return v>92?[{t:'pos',s:'More thermal efficiency'},{t:'neg',s:'Hot — overheats in heat'}]:v<72?[{t:'pos',s:'Cool running — dense air charge bonus'},{t:'neg',s:'Slightly less efficient'}]:[{t:'neu',s:'Standard setting'}];}},
          {id:'oil_grade',label:'Engine oil specification',unit:'type',type:'select',
           options:['5W-30 (cold conditions, fast warmup)','10W-40 (standard mixed)','10W-60 (high temp/high load)','15W-50 (hot climate — Kenya/Portugal)','Synthetic 0W-40 (cold — Sweden/Monte)','Racing grade 5W-40 fully synthetic'],
           default:5,
           effects:function(sel){return sel===0?[{t:'pos',s:'Fast warmup, cold conditions'},{t:'neg',s:'Thin at high temp — bearing wear'}]:sel===3?[{t:'pos',s:'Protection in extreme heat'},{t:'neg',s:'Slow warmup — wear initially'}]:[{t:'neu',s:'Good all-round grade'}];}},
          {id:'rad_duct',label:'Radiator duct opening area',unit:'cm sq',min:20,max:220,step:10,default:100,
           desc:'Total front opening for cooling airflow. Finland cold air: 60-80 cm sq fine — teams add blanking panels. Kenya: 150-200 cm sq fully open. Every cm sq of duct is a drag penalty — the service park engineer spends time calculating this per event.',
           warn:function(v){return v<35?'WARN: May overheat on long hot stages':'';},
           effects:function(v){return v>180?[{t:'pos',s:'Excellent cooling in heat'},{t:'neg',s:'High drag penalty'}]:v<40?[{t:'pos',s:'Low drag'},{t:'neg',s:'Overheat risk in heat or low speed'}]:[{t:'neu',s:'Balanced cooling area'}];}},
        ]
      }
    ]
  },

  tyres: {
    label:'Tyres and Wheels', icon:'T',
    groups:[
      {
        id:'compounds', label:'Compound Selection',
        desc:'The single most consequential decision of the entire setup. Wrong compound loses minutes. On gravel: compound choice depends on aggregate size, surface hardness, humidity, temperature, and stage length. Teams get this information from recce notes and road car runs.',
        params:[
          {id:'cmp_fl',label:'FL tyre compound',unit:'type',type:'select',
           options:['Supersoft wet tarmac (SWS)','Soft wet tarmac (S)','Medium tarmac (M)','Hard tarmac (H)','Gravel soft (GS) — wet/cold loose','Gravel medium (GM) — standard loose','Gravel hard (GH) — hard-packed/dry','Ice/snow studded — full winter','Ice non-studded — Monte Carlo semi-winter'],
           default:5,
           effects:function(sel){return sel===4?[{t:'pos',s:'Excellent wet gravel grip'},{t:'neg',s:'Wears on hot hard-packed stages'}]:sel===6?[{t:'pos',s:'Lasts on hard gravel'},{t:'neg',s:'Less grip on soft/wet loose'}]:sel<4?[{t:'neg',s:'DO NOT use on gravel — rock cuts destroy tarmac tyre'}]:[{t:'neu',s:'Standard gravel compound'}];}},
          {id:'cmp_fr',label:'FR tyre compound',unit:'type',type:'select',
           options:['Supersoft wet tarmac','Soft wet tarmac','Medium tarmac','Hard tarmac','Gravel soft (GS)','Gravel medium (GM)','Gravel hard (GH)','Ice studded','Ice non-studded'],
           default:5,
           effects:function(sel){return [{t:'neu',s:'Match to FL unless asymmetric strategy needed'}];}},
          {id:'cmp_rl',label:'RL tyre compound',unit:'type',type:'select',
           options:['Supersoft wet tarmac','Soft wet tarmac','Medium tarmac','Hard tarmac','Gravel soft (GS)','Gravel medium (GM)','Gravel hard (GH)','Ice studded','Ice non-studded'],
           default:5,
           effects:function(sel){return [{t:'neu',s:'Rear different from front affects balance — check implications'}];}},
          {id:'cmp_rr',label:'RR tyre compound',unit:'type',type:'select',
           options:['Supersoft wet tarmac','Soft wet tarmac','Medium tarmac','Hard tarmac','Gravel soft (GS)','Gravel medium (GM)','Gravel hard (GH)','Ice studded','Ice non-studded'],
           default:5,
           effects:function(sel){return [{t:'neu',s:'Match to RL for symmetric stages'}];}},
        ]
      },
      {
        id:'pressures', label:'Corner Pressures',
        desc:'Set at ambient temperature (cold). Pressure rises as tyre heats under load. Target is correct working pressure (hot) — set cold pressure to compensate for heat soak expected on this specific stage. Measure hot with pyrometer after 3 corners on recce.',
        params:[
          {id:'pres_fl',label:'FL pressure (cold)',unit:'psi',min:18,max:52,step:0.5,default:28.5,
           desc:'Gravel target hot: 28-32 psi. Cold inflation depends on ambient and stage length. Short cold stage: cold pressure equals hot target. Long gravel with much braking: cold 26-28 psi, rises to 30 psi working. Too low cold = heat failure. Too high = small contact patch.',
           warn:function(v){return v<20?'WARN: Very low — heat cycle will cause tyre failure':v>48?'WARN: Very high — minimal contact patch':'';},
           effects:function(v){return v<24?[{t:'pos',s:'Large contact patch'},{t:'neg',s:'Heat failure risk on long stages'}]:v>42?[{t:'pos',s:'Puncture resistant'},{t:'neg',s:'Small contact — less grip'}]:[{t:'neu',s:'Standard cold pressure'}];}},
          {id:'pres_fr',label:'FR pressure (cold)',unit:'psi',min:18,max:52,step:0.5,default:28.0,
           desc:'On stages with many left corners (Finland, Wales), FR works harder and generates more heat — consider starting 1 psi lower cold so it reaches working pressure at same time as FL.',
           warn:function(v){return '';},
           effects:function(v){return [{t:'neu',s:'Adjust for corner frequency and ambient temperature'}];}},
          {id:'pres_rl',label:'RL pressure (cold)',unit:'psi',min:18,max:52,step:0.5,default:27.5,
           desc:'Rear tyres run cooler than fronts on most rally cars — less braking load. Can start slightly lower cold. But on powerful 4WD under heavy power, rear heats significantly. Check after SS1 and adjust at service.',
           warn:function(v){return '';},
           effects:function(v){return v<22?[{t:'pos',s:'Large exit contact patch'},{t:'neg',s:'Failure risk on hot stages'}]:v>44?[{t:'neg',s:'Hard — reduced exit traction'}]:[{t:'neu',s:'Standard rear pressure'}];}},
          {id:'pres_rr',label:'RR pressure (cold)',unit:'psi',min:18,max:52,step:0.5,default:28.0,
           desc:'RR often carries more weight due to fuel tank and driver offset. May need 0.5-1 psi more than RL to achieve same working temperature at the end of a long stage.',
           warn:function(v){return '';},
           effects:function(v){return [{t:'neu',s:'May need +0.5 psi vs RL for weight compensation'}];}},
          {id:'spare_count',label:'Spare wheels carried',unit:'type',type:'select',
           options:['Zero spares (minimum weight — take the risk)','One spare (standard short stage)','Two spares (standard long gravel)','Three spares (very rough — Acropolis/Kenya)','Four spares (Safari spec — survival mode)','Full set of 4 (extreme caution)'],
           default:1,
           effects:function(sel){return sel===0?[{t:'pos',s:'~15 kg weight saving'},{t:'neg',s:'One puncture = limp or retire'}]:sel===3?[{t:'pos',s:'Safe on rocky stages'},{t:'neg',s:'~45 kg weight penalty'}]:sel===5?[{t:'pos',s:'Cannot be stopped by punctures'},{t:'neg',s:'~75 kg — significant time cost'}]:[{t:'neu',s:'Standard strategy'}];}},
          {id:'runflat',label:'Run-flat insert specification',unit:'type',type:'select',
           options:['None (standard — puncture means stop)','Foam insert (max 5km flat)','Mousse insert (solid foam — 50km at 0 psi)','Rubber insert (30km, harsher ride)','Kevlar liner (lightweight runflat)'],
           default:0,
           effects:function(sel){return sel===0?[{t:'pos',s:'No weight penalty'},{t:'neg',s:'Puncture = immediate damage'}]:sel===2?[{t:'pos',s:'Mousse: drive 50km flat'},{t:'neg',s:'Heavier, harsher on smooth roads'}]:[{t:'neu',s:'Runflat protection installed'}];}},
          {id:'hub_bearing_preload',label:'Front hub bearing preload',unit:'Nm',min:5,max:45,step:1,default:18,
           desc:'Hub bearing preload affects bearing stiffness and heat generation. Too loose = play in bearing = shimmy at speed and bearing noise. Too tight = heat = premature failure. WRC spec: 15-25 Nm. Must be checked at every service — it drifts under racing conditions.',
           warn:function(v){return v>38?'WARN: Overbearing — heat failure on long stages':v<8?'WARN: Loose — shimmy at high speed':'';},
           effects:function(v){return v>35?[{t:'neg',s:'Bearing overheats on long stages'}]:v<10?[{t:'neg',s:'Loose bearing — high-speed shimmy'}]:[{t:'neu',s:'Correct preload'}];}},
        ]
      }
    ]
  },

  aero: {
    label:'Aerodynamics', icon:'A',
    groups:[
      {
        id:'downforce', label:'Downforce Package',
        desc:'Rally aero is a compromise. Maximum downforce helps on tarmac at 200 km/h. On gravel the benefit is smaller and the drag cost is always there. Finland: minimum aero. Germany: maximum. Teams change wings between stages overnight.',
        params:[
          {id:'rear_wing',label:'Rear wing angle',unit:'deg',min:0,max:32,step:1,default:14,
           desc:'Each degree adds roughly 8-12 kg rear downforce at 200 km/h. Also adds 3-6 kg drag. At 200 km/h: 30 deg wing = ~240 kg rear downforce but 150 kg total drag. Finland: 5-8 deg. Monte Carlo tarmac: 20-25 deg. Germany: 28-30 deg. The team brings multiple wing flaps to each rally.',
           warn:function(v){return v>28?'Maximum aero — major straight-line speed loss. Only on slow twisty stages':'';},
           effects:function(v){return v>24?[{t:'pos',s:'Planted at high speed'},{t:'neg',s:'Major drag — loses time on fast stages'}]:v<5?[{t:'pos',s:'Minimal drag — fast on Finland highways'},{t:'neg',s:'Light rear at 200+ km/h on crests'}]:[{t:'neu',s:'Balanced aero'}];}},
          {id:'front_splitter',label:'Front splitter depth',unit:'mm from bumper',min:0,max:150,step:5,default:45,
           desc:'Generates downforce by blocking underbody airflow creating low-pressure zone under nose. Longer = more front downforce but exposed on rough roads. Gravel: 30-60mm. Tarmac: 80-130mm. On gravel the splitter is often replaced with a simple skid plate — the aero function is abandoned for survival.',
           warn:function(v){return v>100?'Long splitter — will ground on gravel undulations. Tarmac only':'';},
           effects:function(v){return v>85?[{t:'pos',s:'Strong front downforce'},{t:'neg',s:'Destroys on gravel rocks'}]:v<20?[{t:'pos',s:'High clearance'},{t:'neg',s:'Light front at speed'}]:[{t:'neu',s:'Standard gravel splitter'}];}},
          {id:'diffuser',label:'Rear diffuser angle',unit:'deg',min:0,max:15,step:0.5,default:7.0,
           desc:'Expands underbody airflow. Higher angle = more underbody suction = more total downforce. But flow separates above about 12 deg and the diffuser stalls — losing suction suddenly at speed is dangerous. Never exceed 13 deg without CFD confirmation.',
           warn:function(v){return v>13?'WARN: Above stall angle — sudden downforce loss risk at speed':'';},
           effects:function(v){return v>11?[{t:'neg',s:'Near stall — sudden downforce loss risk'}]:v<3?[{t:'neg',s:'Minimal underbody downforce'}]:[{t:'pos',s:'Good underbody suction'}];}},
          {id:'rad_duct_aero',label:'Radiator duct opening',unit:'cm sq',min:20,max:220,step:10,default:100,
           desc:'Every cooling opening creates drag. Finland cold stage: 60 cm sq with blanking panels. Kenya hot stage: 200 cm sq fully open. Teams carry blanking tape and panel sets. The engineer calculates the cooling requirement vs the drag cost for each stage.',
           warn:function(v){return v<35?'WARN: May overheat on long hot stages or at low service speed':'';},
           effects:function(v){return v>180?[{t:'pos',s:'Excellent cooling'},{t:'neg',s:'High drag'}]:v<40?[{t:'pos',s:'Low drag'},{t:'neg',s:'Overheat risk in heat'}]:[{t:'neu',s:'Balanced'}];}},
        ]
      }
    ]
  },

  ballast: {
    label:'Ballast and Weight', icon:'W',
    groups:[
      {
        id:'corner_weights', label:'Corner Weight Targets',
        desc:'What a corner-balance rig measures. Every car has a target distribution. Getting close to it through ballast placement and spring preload is the setup engineer\'s job. The target changes between tarmac and gravel.',
        params:[
          {id:'fb_dist',label:'Front/rear weight distribution target',unit:'% front',min:40,max:62,step:0.5,default:51.5,
           desc:'The fundamental balance number. 50/50 is rare in rally. Most cars run 48-53% front. More front = understeer tendency, better braking. More rear = oversteer tendency, better exit traction. Engine position determines what\'s achievable without extreme ballast.',
           warn:function(v){return v>58?'Very front-heavy — significant understeer':v<44?'Very rear-heavy — oversteer on all surfaces':'';},
           effects:function(v){return v>56?[{t:'pos',s:'Strong braking traction'},{t:'neg',s:'Understeers — hard to rotate'}]:v<46?[{t:'pos',s:'Good rotation'},{t:'neg',s:'Oversteer tendency under power'}]:[{t:'neu',s:'Balanced distribution'}];}},
          {id:'cw_fl',label:'FL corner weight target',unit:'kg',min:220,max:420,step:5,default:305,
           desc:'Weight on front-left (measured on level ground, driver in seat, fuel half-full by convention). Gravel target: 290-330 kg. Adjust spring preload and ballast position to achieve. Recheck after every spring or ride height change.',
           warn:function(v){return '';},
           effects:function(v){return [{t:'neu',s:'Reference — adjust spring preload and ballast to achieve'}];}},
          {id:'cw_fr',label:'FR corner weight target',unit:'kg',min:220,max:420,step:5,default:295,
           desc:'Front-right weight. Driver weight shifts FL, so FR runs lighter on LHD cars (most WRC). Match FL within 5 kg for symmetric handling. More than 10 kg cross-weight difference is felt immediately in turn-in behaviour.',
           warn:function(v){return '';},
           effects:function(v){return [{t:'neu',s:'Match FL within 5 kg for symmetric handling'}];}},
          {id:'cw_rl',label:'RL corner weight target',unit:'kg',min:220,max:440,step:5,default:315,
           desc:'Rear-left weight. Fuel tank position affects rear balance. On left-side fuel tanks, RL runs heavy at full tank and light at end of stage — the car balance shifts during the stage. Teams calculate mid-stage balance.',
           warn:function(v){return '';},
           effects:function(v){return [{t:'neu',s:'Check at full AND minimum fuel — balance changes during stage'}];}},
          {id:'cw_rr',label:'RR corner weight target',unit:'kg',min:220,max:460,step:5,default:325,
           desc:'Right-rear — often the heaviest corner due to battery, fuel tank bias, and structural reinforcement on right side. Teams place ballast on left to compensate. Cannot run more than 20 kg cross-weight front-to-rear without noticeable handling effect.',
           warn:function(v){return '';},
           effects:function(v){return [{t:'neu',s:'Total car = four corner weights + driver + fuel'}];}},
        ]
      },
      {
        id:'ballast_position', label:'Ballast Placement',
        desc:'Within regulations, teams can move ballast freely. Location changes weight distribution AND polar moment of inertia — which affects rotation speed. Forward-placed ballast outside the wheelbase increases polar moment (lazy rotation). Central placement minimises it.',
        params:[
          {id:'ballast_mass',label:'Total ballast mass',unit:'kg',min:0,max:80,step:2,default:35,
           desc:'Mandatory minimum-weight ballast. Regulations specify minimum car+driver weight. Cars below minimum must add ballast. Any ballast above minimum is dead weight. Group B had no minimum — teams went as light as possible. A 10 kg saving at 200 km/h is a measurable straight-line time gain.',
           warn:function(v){return '';},
           effects:function(v){return v>65?[{t:'pos',s:'Lots of placement flexibility'},{t:'neg',s:'Mandatory weight penalty'}]:v===0?[{t:'pos',s:'Minimum weight'},{t:'neg',s:'No adjustment available'}]:[{t:'neu',s:'Standard fitment'}];}},
          {id:'ballast_long',label:'Ballast longitudinal position',unit:'mm from front axle',min:400,max:1800,step:25,default:1100,
           desc:'Each kg moved 100mm changes F/R distribution by ~0.08%. Fine-tuning tool. Target changes with fuel load — ballast compensates for fuel burn. Some teams pre-calculate ballast position for full tank vs empty tank and make a compromise that improves during the stage.',
           warn:function(v){return '';},
           effects:function(v){return v<700?[{t:'pos',s:'Ballast forward — more front weight'}]:v>1500?[{t:'pos',s:'Ballast rearward — more rear grip'}]:[{t:'neu',s:'Mid-car — neutral effect'}];}},
          {id:'ballast_lat',label:'Ballast lateral offset',unit:'mm from centreline',min:-150,max:150,step:5,default:-15,
           desc:'Moving ballast left/right compensates for driver weight (always on one side) and asymmetric component positions. Most teams target within 3 kg cross-weight after optimal longitudinal placement. A pencil mark on the floor at service and a measuring tape.',
           warn:function(v){return '';},
           effects:function(v){return v>80?[{t:'neu',s:'Right-biased — compensates heavy left components'}]:v<-80?[{t:'neu',s:'Left-biased — compensates heavy right side'}]:[{t:'neu',s:'Near-symmetric lateral placement'}];}},
          {id:'ballast_height',label:'Ballast mounting height',unit:'mm from floor',min:25,max:350,step:10,default:90,
           desc:'Directly controls centre of gravity height. Every 10mm lower CoG reduces body roll and improves weight transfer timing. Gravel: cannot mount below 60-70mm — rock strikes destroy mounts. Tarmac: can go to 30-40mm. This is where teams cheat if regulations allow.',
           warn:function(v){return v<50?'WARN: May ground on gravel — rock strike damage to mounts':'';},
           effects:function(v){return v<60?[{t:'pos',s:'Very low CoG'},{t:'neg',s:'Gravel rock strike risk'}]:v>250?[{t:'neg',s:'High CoG — more body roll, worse transient'}]:[{t:'neu',s:'Standard ballast height'}];}},
          {id:'fuel_load',label:'Starting fuel load',unit:'litres',min:15,max:85,step:5,default:62,
           desc:'Full tank adds 55-65 kg at start vs empty at finish. This fuel burn shifts weight distribution during the stage. Teams calculate what fuel load achieves target F/R at both full and end-of-stage, then choose a starting load that gives acceptable balance through the whole run.',
           warn:function(v){return v<25?'WARN: Risk of fuel starvation before stage end. Calculate consumption':'';},
           effects:function(v){return v>78?[{t:'pos',s:'No fuel concern'},{t:'neg',s:'~65 kg weight penalty all stage'}]:v<30?[{t:'pos',s:'Lighter — faster early stage'},{t:'neg',s:'Risk of running dry late stage'}]:[{t:'neu',s:'Standard load for stage length'}];}},
        ]
      }
    ]
  }

};


// ── TUNING STATE ──
let TUNE = {};
const TUNE_SECTIONS = Object.keys(TUNING_DEFS);
let activeTuneSection = TUNE_SECTIONS[0];

function defaultTune(){
  const t = {};
  Object.entries(TUNING_DEFS).forEach(([sec, secDef]) => {
    secDef.groups.forEach(grp => {
      grp.params.forEach(p => {
        t[p.id] = p.default;
      });
    });
  });
  return t;
}

// ── TUNING ACCESS FUNCTIONS ──
let tunReturnScreen = 'setup'; // where to go when done

function openTuningStandalone(){
  // From main menu — no era required, show era picker first
  tunReturnScreen = 'menu';
  if(!Object.keys(TUNE).length) TUNE = defaultTune();
  activeTuneSection = TUNE_SECTIONS[0];
  show('tuning');
  document.getElementById('tun-back-btn').textContent = '← Menu';
  document.getElementById('tun-title').textContent = 'Tuning Garage';
  // If no era, force the picker open
  if(!G.era){
    openTuningEraSelect();
  } else {
    _refreshTuningHeader();
    buildTuneNav();
    renderTuneSection(activeTuneSection);
  }
}

function openTuningFromSetup(){
  // From setup screen — era may or may not be selected
  tunReturnScreen = 'setup';
  if(!G.era){
    // Show era picker before anything else
    show('tuning');
    document.getElementById('tun-back-btn').textContent = '← Setup';
    document.getElementById('tun-title').textContent = 'Tuning Garage';
    openTuningEraSelect();
    return;
  }
  if(!Object.keys(TUNE).length) TUNE = defaultTune();
  activeTuneSection = TUNE_SECTIONS[0];
  show('tuning');
  document.getElementById('tun-back-btn').textContent = '← Setup';
  document.getElementById('tun-title').textContent = 'Tune: '+(G.car?.n||'Car');
  _refreshTuningHeader();
  buildTuneNav();
  renderTuneSection(activeTuneSection);
}

function openTuning(){
  // Legacy call — route through setup version
  openTuningFromSetup();
}

function tunBack(){
  show(tunReturnScreen);
}

function _refreshTuningHeader(){
  const carName = G.car?.n || 'No car';
  const eraName = G.era ? ERAS[G.era].label : '';
  document.getElementById('tun-car-badge').textContent = carName + (eraName?' · '+eraName:'');
  document.getElementById('tun-title').textContent = G.car ? 'Tune: '+carName : 'Tuning Garage';
}

function openTuningEraSelect(){
  const picker = document.getElementById('tun-era-picker');
  picker.style.display = 'block';
  // Pre-select current era
  const eraDrop = document.getElementById('tun-era-drop');
  if(G.era) eraDrop.value = G.era;
  tunEraChanged(); // populate car list
  if(G.car){
    const carDrop = document.getElementById('tun-car-drop');
    // select matching car if possible
    for(let i=0;i<carDrop.options.length;i++){
      if(carDrop.options[i].text === G.car.n){ carDrop.selectedIndex=i; break; }
    }
  }
}

function tunEraChanged(){
  const era = document.getElementById('tun-era-drop').value;
  const carDrop = document.getElementById('tun-car-drop');
  const cars = ERAS[era]?.cars || [];
  carDrop.innerHTML = cars.map((c,i)=>`<option value="${i}">${c.n} — ${c.d}</option>`).join('');
}

function tunCarChanged(){} // just for onchange hook

function confirmTunEra(){
  const eraDrop = document.getElementById('tun-era-drop');
  const carDrop = document.getElementById('tun-car-drop');
  G.era = eraDrop.value;
  const carIdx = parseInt(carDrop.value);
  G.car = ERAS[G.era].cars[carIdx];
  // Also update setup screen if visible
  if(document.getElementById('inp-drv')) {
    // Rebuild car grid in setup if era changed there too
  }
  document.getElementById('tun-era-picker').style.display = 'none';
  if(!Object.keys(TUNE).length) TUNE = defaultTune();
  _refreshTuningHeader();
  buildTuneNav();
  renderTuneSection(activeTuneSection);
}

function buildTuneNav(){
  const nav = document.getElementById('tun-nav');
  nav.innerHTML = '<div style="font-family:var(--font-mono,monospace);font-size:10px;letter-spacing:.1em;color:var(--text3);text-transform:uppercase;padding:10px 12px 4px">Sections</div>'
    + Object.entries(TUNING_DEFS).map(([k,s]) =>
    `<button class="tun-nav-btn${k===activeTuneSection?' on':''}" onclick="selectTuneSection('${k}')">
      <span style="font-size:14px;min-width:20px;text-align:center">${s.icon}</span>
      <span>${s.label}</span>
    </button>`
  ).join('');
}

function selectTuneSection(key){
  activeTuneSection = key;
  buildTuneNav();
  renderTuneSection(key);
}

function renderTuneSection(key){
  const sec = TUNING_DEFS[key];
  const main = document.getElementById('tun-main');
  if(!sec){main.innerHTML='';return;}

  // Summary bar at top
  const summary = buildTuneSummary();

  let html = `<div class="tun-section-hdr"><h2>${sec.label}</h2><p>${sec.label} configuration — all values persist to stage</p></div>`;
  html += buildTuneSummaryHTML(summary);

  sec.groups.forEach(grp => {
    html += `<div class="tun-group">
      <div class="tun-group-hdr"><h3>${grp.label}</h3><span class="tun-group-desc">${grp.desc}</span></div>`;
    grp.params.forEach(p => {
      html += buildParamRow(p);
    });
    html += `</div>`;
  });

  main.innerHTML = html;
  // Attach listeners
  main.querySelectorAll('.tun-slider').forEach(sl => {
    sl.addEventListener('input', function(){ onTuneChange(this.dataset.id, parseFloat(this.value)); });
  });
  main.querySelectorAll('.tun-select').forEach(sel => {
    sel.addEventListener('change', function(){ onTuneChange(this.dataset.id, parseInt(this.value)); });
  });
}

function buildParamRow(p){
  const val = TUNE[p.id] !== undefined ? TUNE[p.id] : p.default;
  if(p.type === 'select'){
    const opts = p.options.map((o,i) => `<option value="${i}"${i===val?' selected':''}>${o}</option>`).join('');
    const effs = p.effects(val);
    return `<div class="tun-row">
      <div class="tun-lbl"><div class="tun-lbl-name">${p.label}</div><div class="tun-lbl-desc">${p.desc||''}</div></div>
      <div class="tun-ctrl"><select class="tun-select" data-id="${p.id}">${opts}</select></div>
      <div class="tun-effect">${effs.map(e=>`<span class="eff-pill eff-${e.t}">${e.s}</span>`).join('')}</div>
    </div>`;
  }
  const pct = (val - p.min) / (p.max - p.min);
  const colour = pct < 0.3 ? '#00e5ff' : pct > 0.7 ? '#e8291c' : '#39ff14';
  const effs = p.effects(val);
  const displayVal = typeof val === 'number' && !Number.isInteger(val) ? val.toFixed(Math.abs(p.step) < 1 ? 2 : 1) : val;
  return `<div class="tun-row">
    <div class="tun-lbl"><div class="tun-lbl-name">${p.label}</div><div class="tun-lbl-desc">${p.desc||''}</div></div>
    <div class="tun-ctrl">
      <input type="range" class="tun-slider" data-id="${p.id}" min="${p.min}" max="${p.max}" step="${p.step}" value="${val}"
        style="background:linear-gradient(to right,${colour} 0%,${colour} ${Math.round(pct*100)}%,var(--surf2) ${Math.round(pct*100)}%,var(--surf2) 100%)"/>
    </div>
    <div class="tun-val-box"><div class="tun-val" id="tv-${p.id}">${displayVal}</div><div class="tun-unit">${p.unit}</div>
    <div class="tun-effect" id="te-${p.id}">${effs.map(e=>`<span class="eff-pill eff-${e.t}">${e.s}</span>`).join('')}</div>
    </div>
  </div>`;
}

function onTuneChange(id, val){
  TUNE[id] = val;
  // Update display
  const el = document.getElementById('tv-'+id);
  if(el){
    const display = typeof val === 'number' && !Number.isInteger(val) ? val.toFixed(2) : val;
    el.textContent = display;
  }
  // Update effects
  const param = findParam(id);
  if(param){
    const eff = document.getElementById('te-'+id);
    if(eff){
      const effs = param.effects(val);
      eff.innerHTML = effs.map(e=>`<span class="eff-pill eff-${e.t}">${e.s}</span>`).join('');
    }
    // Re-colour slider
    const sl = document.querySelector(`.tun-slider[data-id="${id}"]`);
    if(sl){
      const pct = (val - param.min) / (param.max - param.min);
      const colour = pct < 0.3 ? '#00e5ff' : pct > 0.7 ? '#e8291c' : '#39ff14';
      sl.style.background = `linear-gradient(to right,${colour} 0%,${colour} ${Math.round(pct*100)}%,var(--surf2) ${Math.round(pct*100)}%,var(--surf2) 100%)`;
    }
  }
  // Update summary
  const summary = buildTuneSummary();
  const sumEl = document.getElementById('tun-summary');
  if(sumEl) sumEl.outerHTML = buildTuneSummaryHTML(summary);
}

function findParam(id){
  for(const sec of Object.values(TUNING_DEFS)){
    for(const grp of sec.groups){
      const p = grp.params.find(x=>x.id===id);
      if(p) return p;
    }
  }
  return null;
}

function buildTuneSummary(){
  // Compute aggregate scores from current TUNE values
  let grip=50, stab=50, trac=50, power=50, reli=50;

  // Spring rates affect grip & stability
  if(TUNE.spring_f !== undefined){
    const sf = (TUNE.spring_f - 35) / (120-35);
    grip += (sf - 0.5) * -10;
    stab += (sf - 0.5) * 15;
  }
  // ARB
  if(TUNE.arb_f !== undefined){
    const af = (TUNE.arb_f - 50) / (400-50);
    grip += (af - 0.5) * -8;
    stab += (af - 0.5) * 12;
  }
  // Diff lock
  if(TUNE.rdiff_lock !== undefined){
    const dl = TUNE.rdiff_lock / 100;
    trac += dl * 20 - 10;
    grip += (dl - 0.5) * -8;
  }
  // Boost
  if(TUNE.boost !== undefined){
    const b = (TUNE.boost - 1.0) / (2.8-1.0);
    power += b * 30 - 10;
    reli -= b * 20;
  }
  // Anti-lag
  if(TUNE.anti_lag !== undefined){
    power += TUNE.anti_lag * 3;
    reli -= TUNE.anti_lag * 5;
  }
  // Tyre pressure
  if(TUNE.pres_fl !== undefined){
    const p = (TUNE.pres_fl - 22) / (50-22);
    grip += (0.5 - p) * 12;
    reli += (p - 0.5) * 10;
  }
  // Rear wing
  if(TUNE.rear_wing !== undefined){
    const w = TUNE.rear_wing / 30;
    stab += w * 15;
    power -= w * 8;
  }
  // Fuel load
  if(TUNE.fuel_load !== undefined){
    const f = (TUNE.fuel_load - 20) / (80-20);
    power -= f * 8;
    reli += f * 5;
  }
  // Camber
  if(TUNE.camber_f !== undefined){
    const c = Math.abs(TUNE.camber_f) / 4;
    grip += c * 15;
    reli -= c * 10;
  }
  // Clamping to 0–100
  const clamp = v => Math.min(100, Math.max(0, Math.round(v)));
  return { grip:clamp(grip), stab:clamp(stab), trac:clamp(trac), power:clamp(power), reli:clamp(reli) };
}

function buildTuneSummaryHTML(s){
  const bar = (v,col) => `<div class="tun-sum-bar"><div class="tun-sum-fill" style="width:${v}%;background:${col}"></div></div>`;
  const col = v => v > 70 ? '#39ff14' : v > 40 ? '#f5c518' : '#e8291c';
  return `<div class="tun-summary-grid" id="tun-summary">
    ${[['Grip',s.grip],['Stability',s.stab],['Traction',s.trac],['Power',s.power],['Reliability',s.reli]].map(([l,v])=>
      `<div class="tun-sum-card"><div class="tun-sum-lbl">${l}</div><div class="tun-sum-val" style="color:${col(v)}">${v}</div>${bar(v,col(v))}</div>`
    ).join('')}
  </div>`;
}

function applyTuning(){
  const s = buildTuneSummary();
  G.tuneEffects = {
    crashMod: 1.0 - (s.stab - 50) * 0.008 - (s.grip - 50) * 0.005,
    damageMod: 1.0 - (s.reli - 50) * 0.01,
    timeMod: 1.0 - (s.power - 50) * 0.003 - (s.grip - 50) * 0.002,
  };
  if(window._careerStageData){
    const stageData = window._careerStageData;
    window._careerStageData = null;
    beginStageWithData(stageData);
  } else {
    show(tunReturnScreen||'setup');
  }
}

function resetTuning(){
  TUNE = defaultTune();
  renderTuneSection(activeTuneSection);
}

function loadPreset(type){
  TUNE = defaultTune();
  if(type === 'safe'){
    // Conservative: softer chassis, lower power, stable diff setup
    if('spr_fl' in TUNE) TUNE.spr_fl = 46;
    if('spr_fr' in TUNE) TUNE.spr_fr = 48;
    if('spr_rl' in TUNE) TUNE.spr_rl = 42;
    if('spr_rr' in TUNE) TUNE.spr_rr = 44;
    if('arb_f' in TUNE) TUNE.arb_f = 90;
    if('arb_r' in TUNE) TUNE.arb_r = 80;
    if('lsd_bump_f' in TUNE) TUNE.lsd_bump_f = 500;
    if('lsd_reb_f' in TUNE) TUNE.lsd_reb_f = 900;
    if('lsd_bump_r' in TUNE) TUNE.lsd_bump_r = 450;
    if('lsd_reb_r' in TUNE) TUNE.lsd_reb_r = 750;
    if('rd_lock_accel' in TUNE) TUNE.rd_lock_accel = 25;
    if('rd_lock_decel' in TUNE) TUNE.rd_lock_decel = 30;
    if('rd_preload' in TUNE) TUNE.rd_preload = 60;
    if('fd_lock_accel' in TUNE) TUNE.fd_lock_accel = 20;
    if('cd_split' in TUNE) TUNE.cd_split = 45;
    if('boost_bar' in TUNE) TUNE.boost_bar = 1.65;
    if('als_level' in TUNE) TUNE.als_level = 1;
    if('wastegate_psi' in TUNE) TUNE.wastegate_psi = 11;
    if('tc_slip' in TUNE) TUNE.tc_slip = 6;
    if('rear_wing' in TUNE) TUNE.rear_wing = 20;
    if('pres_fl' in TUNE) TUNE.pres_fl = 31;
    if('pres_fr' in TUNE) TUNE.pres_fr = 31;
    if('pres_rl' in TUNE) TUNE.pres_rl = 30;
    if('pres_rr' in TUNE) TUNE.pres_rr = 31;
    if('fuel_load' in TUNE) TUNE.fuel_load = 72;
    if('droop_f' in TUNE) TUNE.droop_f = 95;
    if('droop_r' in TUNE) TUNE.droop_r = 105;
    if('bstop_f_contact' in TUNE) TUNE.bstop_f_contact = 20;
    if('bstop_r_contact' in TUNE) TUNE.bstop_r_contact = 28;
    if('brake_bias' in TUNE) TUNE.brake_bias = 61;
    if('camber_fl' in TUNE) TUNE.camber_fl = -2.0;
    if('camber_fr' in TUNE) TUNE.camber_fr = -2.0;
    if('camber_rl' in TUNE) TUNE.camber_rl = -1.4;
    if('camber_rr' in TUNE) TUNE.camber_rr = -1.4;
  } else if(type === 'attack'){
    // Maximum attack: stiffer, high boost, aggressive diffs, lighter fuel
    if('spr_fl' in TUNE) TUNE.spr_fl = 96;
    if('spr_fr' in TUNE) TUNE.spr_fr = 98;
    if('spr_rl' in TUNE) TUNE.spr_rl = 84;
    if('spr_rr' in TUNE) TUNE.spr_rr = 86;
    if('arb_f' in TUNE) TUNE.arb_f = 310;
    if('arb_r' in TUNE) TUNE.arb_r = 260;
    if('lsd_bump_f' in TUNE) TUNE.lsd_bump_f = 1200;
    if('lsd_reb_f' in TUNE) TUNE.lsd_reb_f = 2000;
    if('lsd_bump_r' in TUNE) TUNE.lsd_bump_r = 1100;
    if('lsd_reb_r' in TUNE) TUNE.lsd_reb_r = 1800;
    if('hsd_bump_fl' in TUNE) TUNE.hsd_bump_fl = 14;
    if('hsd_bump_rl' in TUNE) TUNE.hsd_bump_rl = 12;
    if('rd_lock_accel' in TUNE) TUNE.rd_lock_accel = 70;
    if('rd_lock_decel' in TUNE) TUNE.rd_lock_decel = 12;
    if('rd_preload' in TUNE) TUNE.rd_preload = 100;
    if('rd_ramp_decel' in TUNE) TUNE.rd_ramp_decel = 30;
    if('fd_lock_accel' in TUNE) TUNE.fd_lock_accel = 50;
    if('cd_split' in TUNE) TUNE.cd_split = 35;
    if('cd_lock' in TUNE) TUNE.cd_lock = 70;
    if('boost_bar' in TUNE) TUNE.boost_bar = 2.35;
    if('als_level' in TUNE) TUNE.als_level = 3;
    if('wastegate_psi' in TUNE) TUNE.wastegate_psi = 22;
    if('tc_slip' in TUNE) TUNE.tc_slip = 20;
    if('rev_limit' in TUNE) TUNE.rev_limit = 9100;
    if('rear_wing' in TUNE) TUNE.rear_wing = 6;
    if('front_splitter' in TUNE) TUNE.front_splitter = 75;
    if('pres_fl' in TUNE) TUNE.pres_fl = 26.5;
    if('pres_fr' in TUNE) TUNE.pres_fr = 26;
    if('pres_rl' in TUNE) TUNE.pres_rl = 25.5;
    if('pres_rr' in TUNE) TUNE.pres_rr = 26;
    if('fuel_load' in TUNE) TUNE.fuel_load = 38;
    if('brake_bias' in TUNE) TUNE.brake_bias = 67;
    if('hb_pressure' in TUNE) TUNE.hb_pressure = 80;
    if('ballast_height' in TUNE) TUNE.ballast_height = 70;
    if('lambda' in TUNE) TUNE.lambda = 0.87;
    if('camber_fl' in TUNE) TUNE.camber_fl = -3.2;
    if('camber_fr' in TUNE) TUNE.camber_fr = -3.1;
    if('camber_rl' in TUNE) TUNE.camber_rl = -2.0;
    if('camber_rr' in TUNE) TUNE.camber_rr = -2.0;
  }
  renderTuneSection(activeTuneSection);
}

// Hook tune effects into crash probability
const _origRollCrash = rollCrash;
function rollCrashTuned(noteRaw, isTimeout, isBadNote){
  const base = _origRollCrash(noteRaw, isTimeout, isBadNote);
  // Already a boolean — we can't modify, so we hook the probability calculation
  return base;
}


const CAREER_CAL=[
  {era:'grpb',sIdx:0,rally:'Rally de Portugal',pts:[25,18,15,12,10,8,6,4,2,1]},
  {era:'w90',sIdx:0,rally:'Rally Finland',pts:[25,18,15,12,10,8,6,4,2,1]},
  {era:'w24',sIdx:0,rally:'Rallye Monte-Carlo',pts:[25,18,15,12,10,8,6,4,2,1]},
  {era:'grpb',sIdx:1,rally:'Monte Carlo Classic',pts:[25,18,15,12,10,8,6,4,2,1]},
  {era:'w90',sIdx:1,rally:'Rally Great Britain',pts:[25,18,15,12,10,8,6,4,2,1]},
  {era:'w24',sIdx:1,rally:'Rally Finland Modern',pts:[25,18,15,12,10,8,6,4,2,1]},
];

const LESSONS=[
  {id:'intro',name:'What are pacenotes?',content:`
    <div class="lhdr"><h2>What are pacenotes?</h2><p>The co-driver's language — the foundation of all rally navigation</p></div>
    <div class="ltxt">In rally, the co-driver reads notes before each corner. These were written during a <strong>recce</strong> — a reconnaissance drive before the stage goes live. The driver memorises nothing. They trust the notes completely.</div>
    <div class="ltxt">Notes use compact shorthand. A corner is described by its <strong>direction</strong> (L or R) and <strong>severity</strong> (1–6, where 1 is a hairpin and 6 is a gentle sweep). Modifiers add hazards, distances, and instructions.</div>
    <div class="ndemo">L4 100 R3!</div>
    <div class="ntrans">Left four, 100 metres to right three — caution</div>
    <div class="ltxt">The driver hears this and knows: medium-speed left, then in 100 metres brake for a tight right with a danger warning. All encoded in seven characters and a symbol.</div>
    <div class="tip"><strong>Tip:</strong> 1 = tightest (hairpin), 6 = gentlest (fast sweep). Think of it as how open the corner is, not how sharp.</div>`},
  {id:'corners',name:'Corner severity 1–6',content:`
    <div class="lhdr"><h2>Corner severity — 1 through 6</h2><p>The heart of every pacenote call</p></div>
    <div class="vcgrid">
      <div class="vc"><div class="vc-r">1</div><div class="vc-m">Hairpin — U-turn</div><div class="vc-e">Full brake, rotate</div></div>
      <div class="vc"><div class="vc-r">2</div><div class="vc-m">Very tight — sharp</div><div class="vc-e">Heavy braking</div></div>
      <div class="vc"><div class="vc-r">3</div><div class="vc-m">Tight — moderate</div><div class="vc-e">Trail braking</div></div>
      <div class="vc"><div class="vc-r">4</div><div class="vc-m">Medium speed</div><div class="vc-e">Some brake needed</div></div>
      <div class="vc"><div class="vc-r">5</div><div class="vc-m">Open — light brake</div><div class="vc-e">Deceptive speed</div></div>
      <div class="vc"><div class="vc-r">6</div><div class="vc-m">Fast sweep</div><div class="vc-e">Maybe flat</div></div>
      <div class="vc"><div class="vc-r">FLAT</div><div class="vc-m">No braking</div><div class="vc-e">Full throttle</div></div>
      <div class="vc"><div class="vc-r">SQUARE</div><div class="vc-m">90° corner</div><div class="vc-e">Tighter than a 1</div></div>
    </div>
    <div class="ltxt"><strong>L3</strong> = left corner needing moderate braking. <strong>R6</strong> = fast right sweep. Direction plus severity tells you everything.</div>
    <div class="ndemo">R1! INTO L5 LONG</div>
    <div class="ntrans">Right hairpin with caution, into a long left five — carry the speed out</div>
    <div class="tip"><strong>Era note:</strong> Group B notes were shorter — drivers memorised more. Modern WRC notes are extremely detailed, with modifiers for everything.</div>`},
  {id:'hazards',name:'Caution marks — ! and !!',content:`
    <div class="lhdr"><h2>Caution marks — ! and !!</h2><p>The symbols that keep drivers alive</p></div>
    <div class="vcgrid">
      <div class="vc"><div class="vc-r">!</div><div class="vc-m">Caution</div><div class="vc-e">Something to watch</div></div>
      <div class="vc"><div class="vc-r">!!</div><div class="vc-m">Maximum caution</div><div class="vc-e">Do not deviate</div></div>
      <div class="vc"><div class="vc-r">DONTCUT</div><div class="vc-m">Stay outside</div><div class="vc-e">Ditch or drop inside</div></div>
      <div class="vc"><div class="vc-r">NARROW</div><div class="vc-m">Road narrows</div><div class="vc-e">Walls close in</div></div>
      <div class="vc"><div class="vc-r">STOP</div><div class="vc-m">Full stop needed</div><div class="vc-e">Junction or hazard</div></div>
      <div class="vc"><div class="vc-r">JUNCTION</div><div class="vc-m">Road crosses</div><div class="vc-e">Blind intersection</div></div>
    </div>
    <div class="ltxt"><strong>!</strong> means pay attention — something dangerous on or near the line. <strong>!!</strong> means maximum caution; a mistake here usually ends the stage or worse.</div>
    <div class="ndemo">L2!! JUNCTION STOP 50</div>
    <div class="ntrans">Left two, maximum caution, junction, full stop in 50 metres</div>
    <div class="tip"><strong>Real history:</strong> Henri Toivonen's fatal crash at Corsica 1986 ended Group B. The exclamation mark system became more standardised after that.</div>`},
  {id:'distance',name:'Distances and linking',content:`
    <div class="lhdr"><h2>Distance calls and linked corners</h2><p>How the co-driver manages pace and sequence</p></div>
    <div class="vcgrid">
      <div class="vc"><div class="vc-r">50</div><div class="vc-m">50 metres warning</div><div class="vc-e">Very close</div></div>
      <div class="vc"><div class="vc-r">100</div><div class="vc-m">100 metres</div><div class="vc-e">One braking zone</div></div>
      <div class="vc"><div class="vc-r">200</div><div class="vc-m">200 metres</div><div class="vc-e">Time to breathe</div></div>
      <div class="vc"><div class="vc-r">INTO</div><div class="vc-m">Directly linked</div><div class="vc-e">No gap between</div></div>
      <div class="vc"><div class="vc-r">LONG</div><div class="vc-m">Corner runs long</div><div class="vc-e">Hold the line</div></div>
      <div class="vc"><div class="vc-r">TIGHTENS</div><div class="vc-m">Decreasing radius</div><div class="vc-e">Corner gets tighter</div></div>
    </div>
    <div class="ltxt"><strong>Distance calls</strong> give the driver time to brake. Without them, the corner appears at whatever pace the car is doing. A 50 metre call means barely a second at speed. <strong>INTO</strong> links two corners with no gap between them.</div>
    <div class="ndemo">R4 LONG INTO L2! 100 R5</div>
    <div class="ntrans">Right four runs long, directly into caution left two, 100 metres to right five</div>`},
  {id:'era',name:'Group B vs WRC vs Modern',content:`
    <div class="lhdr"><h2>Era differences</h2><p>How note conventions changed across 40 years</p></div>
    <div class="era-blk">
      <h4>Group B (1982–1986)</h4>
      <div class="ltxt">Sparse by modern standards. Cars so fast co-drivers had seconds between calls. Less vocabulary, more trust in driver instinct. Exclamation marks were rare — when used, they were serious.</div>
      <div class="ndemo" style="background:#2a0800;color:#ff5533">R3 ! INTO L2 NARROW</div>
    </div>
    <div class="era-blk">
      <h4>WRC Golden Era (1990s–2000s)</h4>
      <div class="ltxt">Richer vocabulary. Distance calls standardised. TIGHTENS and OPENS appeared for variable-radius corners. MAYBE appeared — the corner might be tighter depending on conditions.</div>
      <div class="ndemo" style="background:#001a12;color:#00e5ff">150 L2 TIGHTENS OPENS INTO R4 LONG</div>
    </div>
    <div class="era-blk">
      <h4>Modern WRC Rally1 (2022–present)</h4>
      <div class="ltxt">Maximum complexity. Hybrid management calls (REGEN, HYBRID) added to corner sequences. Everything described. Co-driver now manages six things simultaneously.</div>
      <div class="ndemo" style="background:#001a08;color:#39ff14">REGEN R5 ICE 100 DONTCUT INTO L3!</div>
    </div>
    <div class="tip"><strong>Key insight:</strong> Group B drivers trusted their nerve. Modern WRC drivers trust their notes. The shift happened because cars got faster and the cost of mistakes became too high.</div>`},
  {id:'quiz',name:'Practice Quiz',content:`
    <div class="lhdr"><h2>Practice Quiz</h2><p>Translate notes with no timer — build your vocabulary before the stage</p></div>
    <div class="quiz-box">
      <h3>Translate this note</h3>
      <div class="quiz-note" id="qz-note">—</div>
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;flex-wrap:wrap">
        <button class="hear-btn" onclick="hearQuiz()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          Hear it
        </button>
        <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#888" id="qz-era-tag">—</span>
      </div>
      <input class="quiz-in" id="qz-input" type="text" placeholder="Type your translation…" autocomplete="off"/>
      <div class="quiz-fb" id="qz-fb"></div>
      <div class="qbtns">
        <button class="qb" onclick="checkQuiz()">Check</button>
        <button class="qb s" onclick="nextQuiz()">Next note</button>
        <button class="qb s" onclick="revealQuiz()">Reveal</button>
      </div>
    </div>`}
];

// ═══════════════ STATE ═══════════════
let G={era:null,driver:'Driver',codriver:'Co-driver',car:null,diff:0,timeLimit:12,
  notes:[],idx:0,correct:0,skipped:0,timer:null,remaining:0,results:[],
  careerMode:false,careerIdx:0,currentStageName:'',tuneEffects:null,stageEnded:false,
  damage:{engine:100,susp:100,tyres:100,body:100},
  crashed:false,dnf:false,totalTimeLost:0,crashCount:0,
  atmosIdx:0,crowdIdx:0,splitIdx:0};

// ── DAMAGE SYSTEM ──
function initDamage(){
  G.damage={engine:100,susp:100,tyres:100,body:100};
  G.totalTimeLost=0;G.crashCount=0;G.crashed=false;G.dnf=false;
  G.atmosIdx=0;G.crowdIdx=0;G.splitIdx=0;
  updateDamageHUD();
}
function updateDamageHUD(){
  const d=G.damage;
  const overall=Math.round((d.engine+d.susp+d.tyres+d.body)/4);
  const pairs=[['eng',d.engine,'db-eng','dv-eng'],['sus',d.susp,'db-sus','dv-sus'],
               ['tyr',d.tyres,'db-tyr','dv-tyr'],['bod',d.body,'db-bod','dv-bod']];
  pairs.forEach(([,val,barId,valId])=>{
    const bar=document.getElementById(barId);
    const vEl=document.getElementById(valId);
    if(bar){bar.style.width=val+'%';bar.style.background=val>60?'#39ff14':val>30?'#f5c518':'#e8291c';}
    if(vEl)vEl.textContent=Math.round(val);
  });
  const st=document.getElementById('dmg-status');
  if(st){
    if(overall>80)st.textContent='All systems nominal';
    else if(overall>60)st.textContent='Minor damage — keep going';
    else if(overall>40)st.style.color='#f5c518',st.textContent='Significant damage — careful';
    else if(overall>20)st.style.color='#e8291c',st.textContent='Car badly damaged — survive!';
    else st.style.color='#e8291c',st.textContent='Critical — retirement likely';
  }
}
function applyDamage(dmgSpec){
  const dmgModifier = (G.tuneEffects && G.tuneEffects.damageMod) ? G.tuneEffects.damageMod : 1.0;
  // dmgSpec like {susp:[15,35], body:[20,40]}
  const hits={};
  Object.entries(dmgSpec).forEach(([part,[min,max]])=>{
    const amount=(min+Math.random()*(max-min))*dmgModifier;
    G.damage[part]=Math.max(0,G.damage[part]-amount);
    hits[part]=Math.round(amount);
  });
  updateDamageHUD();
  updateCarSVG(hits);
  return hits;
}
function updateCarSVG(hits){
  // Flash hit areas
  const partMap={engine:'hit-body',susp:['hit-wfl','hit-wfr','hit-wrl','hit-wrr'],
    tyres:['hit-wfl','hit-wfr'],body:['hit-front','hit-rear','hit-body'],roof:'hit-roof'};
  Object.keys(hits).forEach(part=>{
    const ids=partMap[part];
    if(!ids)return;
    const arr=Array.isArray(ids)?ids:[ids];
    arr.forEach(id=>{
      const el=document.getElementById(id);
      if(!el)return;
      el.setAttribute('opacity','0.7');
      setTimeout(()=>el.setAttribute('opacity','0'),600);
    });
  });
}
function rollCrash(noteRaw, isTimeout, isBadNote){
  // Apply tuning effects if present
  const crashModifier = (G.tuneEffects && G.tuneEffects.crashMod) ? G.tuneEffects.crashMod : 1.0;
  // Crash probability based on note danger, timeout, bad answer, damage
  const era=ERAS[G.era];
  const hasCaution=noteRaw.includes('!');
  const hasDbl=noteRaw.includes('!!');
  const isHairpin=noteRaw.includes('1') || noteRaw.includes('SQUARE') || noteRaw.includes('HAIRPIN');
  const hasJump=noteRaw.includes('JUMP') || noteRaw.includes('CREST');
  const hasIce=noteRaw.includes('ICE') || noteRaw.includes('WET');
  const damage=G.damage;
  const avgDmg=(damage.engine+damage.susp+damage.tyres+damage.body)/4;
  let prob=0;
  if(isTimeout)prob+=0.25;
  if(isBadNote)prob+=0.12;
  if(hasDbl)prob+=0.18;
  if(hasCaution)prob+=0.08;
  if(isHairpin&&isTimeout)prob+=0.15;
  if(hasJump&&isTimeout)prob+=0.20;
  if(hasIce&&isTimeout)prob+=0.18;
  if(avgDmg<60)prob+=0.08;
  if(avgDmg<30)prob+=0.15;
  if(G.diff>=3)prob*=1.3;
  prob=Math.min(prob*crashModifier,0.85);
  return Math.random()<prob;
}
function triggerCrash(noteRaw){
  G.crashCount++;
  // Pick crash type based on note
  let pool=CRASH_TYPES.filter(c=>c.recoverable);
  if(noteRaw.includes('JUMP')||noteRaw.includes('CREST'))pool=CRASH_TYPES.filter(c=>c.id==='off_road'||c.id==='big_off'||c.id==='spin');
  if(noteRaw.includes('ICE')||noteRaw.includes('WET'))pool=CRASH_TYPES.filter(c=>c.id==='spin'||c.id==='off_road');
  if(noteRaw.includes('!')||noteRaw.includes('JUNCTION'))pool=CRASH_TYPES.filter(c=>c.id!=='puncture');
  if(noteRaw.includes('WATER'))pool=[CRASH_TYPES.find(c=>c.id==='water_off')];
  const avgDmg=(G.damage.engine+G.damage.susp+G.damage.tyres+G.damage.body)/4;
  if(avgDmg<35&&Math.random()<0.3)pool=[CRASH_TYPES.find(c=>c.id==='big_off')];
  if(!pool||!pool.length)pool=CRASH_TYPES.filter(c=>c.recoverable);
  const crash=pool[Math.floor(Math.random()*pool.length)];
  const hits=applyDamage(crash.dmg);
  const timeLost=crash.timeLost[0]+Math.random()*(crash.timeLost[1]-crash.timeLost[0]);
  G.totalTimeLost+=timeLost;
  const desc=crash.descs[Math.floor(Math.random()*crash.descs.length)];
  const narr=crash.narrs[Math.floor(Math.random()*crash.narrs.length)];
  const avgAfter=(G.damage.engine+G.damage.susp+G.damage.tyres+G.damage.body)/4;
  const isDNF=!crash.recoverable||(avgAfter<10);
  showCrashModal(crash,desc,narr,hits,timeLost,isDNF,crash.longStop);
  // Shake the game screen
  document.getElementById('game').classList.add('shake-screen');
  setTimeout(()=>document.getElementById('game').classList.remove('shake-screen'),450);
  // Speak crash
  if(window.speechSynthesis){
    window.speechSynthesis.cancel();
    const msg=isDNF?'The stage is over. Retirement confirmed.':crash.title.replace('!','')+'. '+desc;
    const u=new SpeechSynthesisUtterance(msg);u.rate=0.9;u.pitch=0.7;
    window.speechSynthesis.speak(u);
  }
  return isDNF;
}
function showCrashModal(crash,desc,narr,hits,timeLost,isDNF,longStop){
  document.getElementById('crash-emoji').textContent=crash.emoji;
  document.getElementById('crash-title').textContent=crash.title;
  document.getElementById('crash-desc').textContent=desc;
  document.getElementById('crash-narr').textContent=narr;
  document.getElementById('crash-time-lost').textContent=`+${Math.round(timeLost)} seconds lost`;
  const grid=document.getElementById('crash-dmg-grid');
  grid.innerHTML=Object.entries(hits).map(([p,v])=>`
    <div style="background:#1e1e28;border:1px solid #e8291c;padding:5px 8px;text-align:center">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#e8291c;text-transform:uppercase">${p}</div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:18px;color:#ff7070">-${v}%</div>
    </div>`).join('');
  const modal=document.getElementById('crash-modal');
  modal.style.display='flex';
  const okBtn=document.getElementById('crash-ok-btn');
  const dnfBtn=document.getElementById('crash-dnf-btn');
  const repWrap=document.getElementById('crash-repair-wrap');
  okBtn.style.display='none';dnfBtn.style.display='none';repWrap.style.display='none';
  if(isDNF){
    G.dnf=true;
    setTimeout(()=>{dnfBtn.style.display='block';},1200);
  } else if(longStop){
    repWrap.style.display='block';
    const bar=document.getElementById('crash-repair-bar');
    const txt=document.getElementById('crash-repair-txt');
    let prog=0;const interval=setInterval(()=>{
      prog+=2;bar.style.width=prog+'%';
      txt.textContent=prog<50?'Recovery crew reaching car…':prog<80?'Crew repairing damage…':'Getting back on the stage…';
      if(prog>=100){clearInterval(interval);okBtn.style.display='block';dnfBtn.style.display='block';}
    },60);
  } else {
    setTimeout(()=>{okBtn.style.display='block';dnfBtn.style.display='block';},1000);
  }
}
function dismissCrash(){
  document.getElementById('crash-modal').style.display='none';
  G.crashed=false;
  loadNote();
}
function crashDNF(){
  document.getElementById('crash-modal').style.display='none';
  G.dnf=true;
  // Force end stage with DNF result
  G.idx=G.notes.length;
  endStage();
}
// ── ATMOSPHERE INJECTION ──
function getAtmosEvent(){
  const era=G.era;if(!ATMO[era])return null;
  const a=ATMO[era];
  // Rotate through atmosphere types
  const type=G.idx%3;
  if(type===0&&a.crowd.length>0){
    const txt=a.crowd[G.crowdIdx%a.crowd.length];G.crowdIdx++;
    return {type:'crowd',txt};
  } else if(type===1&&a.splits.length>0){
    const txt=a.splits[G.splitIdx%a.splits.length];G.splitIdx++;
    return {type:'split',txt};
  }
  return null;
}
function injectAtmosphere(){
  const ev=getAtmosEvent();
  if(!ev)return;
  const main=document.getElementById('g-main');
  if(!main)return;
  const div=document.createElement('div');
  if(ev.type==='crowd')div.className='crowd-event';
  else if(ev.type==='split')div.className='split-time';
  else if(ev.type==='danger')div.className='danger-warning';
  div.textContent=ev.txt;
  // Insert before input block
  const inp=document.querySelector('.inp-block');
  if(inp&&main.contains(inp)){
    main.insertBefore(div,inp);
    setTimeout(()=>{if(div.parentNode)div.parentNode.removeChild(div);},4000);
  }
}
let CAREER={driver:'',codriver:'',car:null,currentStage:0,pts:0,completed:[],standings:[],started:false};
let lessonsCompleted=new Set();
let currentLesson='intro';
let quizBank=[],quizIdx=0,quizCurrent=null;

// ═══════════════ SCREEN NAV ═══════════════
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');}
function showMenu(){if(G.timer)clearInterval(G.timer);show('menu');}

// ═══════════════ SETUP ═══════════════
function openSetup(){
  G.careerMode=false;
  buildSetup();show('setup');
}
function buildSetup(){
  document.getElementById('inp-drv').value=G.driver!=='Driver'?G.driver:'';
  document.getElementById('inp-cod').value=G.codriver!=='Co-driver'?G.codriver:'';
  document.getElementById('era-grid').innerHTML=Object.entries(ERAS).map(([k,e])=>`
    <div class="era-card${G.era===k?' sel':''}" onclick="pickEra('${k}',this)">
      <div class="era-badge ${e.badge}">${e.label}</div>
      <div class="era-name">${e.label}</div>
      <div class="era-desc">${e.desc}</div>
      <div class="era-cars-mini">${e.cars.slice(0,3).map(c=>`<span class="ecm">${c.n.split(' ').pop()}</span>`).join('')}</div>
    </div>`).join('');
  document.getElementById('diff-row').innerHTML=DIFFS.map((d,i)=>`
    <div class="diff-btn${G.diff===i?' sel':''}" onclick="pickDiff(${i},this)">${d.n}<span class="diff-sec">${d.s}s</span></div>`).join('');
  if(G.era)buildCarGrid();
}
function pickEra(k,el){
  G.era=k;
  document.querySelectorAll('.era-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');buildCarGrid();
}
function buildCarGrid(){
  if(!G.era)return;
  document.getElementById('car-grid').innerHTML=ERAS[G.era].cars.map((c,i)=>`
    <div class="car-btn${G.car&&G.car.n===c.n?' sel':''}" onclick="pickCar(${i},this)">
      <div class="car-cn">${c.n}</div><div class="car-cd">${c.d}</div>
    </div>`).join('');
  if(!G.car)G.car=ERAS[G.era].cars[0];
}
function pickCar(i,el){
  G.car=ERAS[G.era].cars[i];
  document.querySelectorAll('.car-btn').forEach(b=>b.classList.remove('sel'));el.classList.add('sel');
}
function pickDiff(i,el){
  G.diff=i;G.timeLimit=DIFFS[i].s;
  document.querySelectorAll('.diff-btn').forEach(b=>b.classList.remove('sel'));el.classList.add('sel');
}

// ═══════════════ CAREER ═══════════════
function openCareer(){
  if(!CAREER.started){
    G.driver=prompt('Your driver name:','Mikko Lahti')||'Mikko Lahti';
    G.codriver=prompt('Your co-driver name:','Janne Salo')||'Janne Salo';
    G.era='grpb';G.car=ERAS['grpb'].cars[0];G.diff=1;G.timeLimit=DIFFS[1].s;
    CAREER.driver=G.driver;CAREER.codriver=G.codriver;CAREER.car=G.car;
    CAREER.currentStage=0;CAREER.pts=0;CAREER.completed=[];
    CAREER.standings=RIVALS.map(r=>({...r,pts:Math.floor(Math.random()*12)+3}));
    CAREER.started=true;
  }
  buildCareerScreen();show('career');
}
function buildCareerScreen(){
  document.getElementById('c-driver-name').textContent=CAREER.driver;
  document.getElementById('c-driver-sub').textContent='Co-driver: '+CAREER.codriver;
  document.getElementById('c-pts').textContent=CAREER.pts;
  document.getElementById('c-round').textContent=`Round ${CAREER.currentStage} / ${CAREER_CAL.length}`;
  const tickers=['CHAMPIONSHIP HEATING UP — '+CAREER.driver.toUpperCase()+' ON '+CAREER.pts+' POINTS',
    'NEXT ROUND: '+(CAREER_CAL[CAREER.currentStage]?.rally||'SEASON COMPLETE').toUpperCase(),
    'MAX POWER STAGE REPORT — THE FASTEST STAGE DEBRIEF IN RALLYING',
    CAREER.standings.length?'STANDINGS LEADER: '+[...CAREER.standings].sort((a,b)=>b.pts-a.pts)[0].name.toUpperCase()+' — '+[...CAREER.standings].sort((a,b)=>b.pts-a.pts)[0].pts+' PTS':''];
  document.getElementById('ticker-txt').textContent=tickers.join('   ·   ');
  document.getElementById('career-stage-list').innerHTML=CAREER_CAL.map((c,i)=>{
    const done=CAREER.completed[i];
    const isNext=i===CAREER.currentStage;
    const locked=i>CAREER.currentStage;
    const era=ERAS[c.era];const stage=era.stages[c.sIdx];
    const cls=locked?'locked-stage':done?'done-stage':isNext?'next-stage':'';
    const badgeCls=locked?'lock-b':done?'done-b':'next-b';
    const badge=locked?'LOCKED':done?'DONE':'NEXT';
    return `<div class="si ${cls}" onclick="${isNext?`startCareerStage(${i})`:locked?'':``}">
      <div class="si-era">${era.label} · Round ${i+1}</div>
      <div class="si-name">${c.rally}</div>
      <div class="si-det">${stage.name} · ${stage.km}km</div>
      ${done?`<div class="si-result">${done.pos} · ${done.acc}% acc · ${done.pts}pts</div>`:''}
      <div class="si-badge ${badgeCls}">${badge}</div>
    </div>`;
  }).join('');
  const allStd=[{name:CAREER.driver,team:'Private',pts:CAREER.pts,you:true},...CAREER.standings].sort((a,b)=>b.pts-a.pts);
  document.getElementById('c-standings').innerHTML=`<tr><th>Pos</th><th>Driver</th><th>Team</th><th class="p-col">Pts</th></tr>`
    +allStd.map((r,i)=>`<tr class="${r.you?'you':''}"><td>${i+1}</td><td>${r.name}</td><td>${r.team||''}</td><td class="p-col">${r.pts}</td></tr>`).join('');
  document.getElementById('c-stats').innerHTML=[
    {v:CAREER.pts,l:'Total Points'},{v:CAREER.completed.length,l:'Rounds Done'},
    {v:CAREER.completed.filter(c=>c&&c.pos==='P1').length,l:'Stage Wins'},
    {v:CAREER.completed.length?Math.round(CAREER.completed.filter(Boolean).reduce((s,c)=>s+(c.acc||0),0)/CAREER.completed.filter(Boolean).length):0,l:'Avg Accuracy %'}
  ].map(s=>`<div class="sg"><div class="sg-val">${s.v}</div><div class="sg-lbl">${s.l}</div></div>`).join('');
  const trophyDefs=[{n:'P1 Finish',i:'🏆',c:CAREER.completed.some(c=>c&&c.pos==='P1')},
    {n:'Stage Win',i:'⭐',c:CAREER.completed.some(c=>c&&c.acc>=80)},
    {n:'Clean Run',i:'💯',c:CAREER.completed.some(c=>c&&c.acc===100)},
    {n:'Podium',i:'🥇',c:CAREER.completed.some(c=>c&&['P1','P2','P3'].includes(c.pos))},
    {n:'Full Season',i:'🎖',c:CAREER.completed.length===CAREER_CAL.length}];
  document.getElementById('c-trophies').innerHTML=trophyDefs.map(t=>`
    <div class="trophy-item${t.c?' earned':''}">
      <div class="trophy-icon">${t.i}</div>
      <div class="trophy-lbl">${t.n}</div>
    </div>`).join('');
}
function startCareerStage(i){
  G.careerMode=true;G.careerIdx=i;
  const c=CAREER_CAL[i];G.era=c.era;G.diff=1;G.timeLimit=DIFFS[1].s;
  G.car=CAREER.car||ERAS[c.era].cars[0];G.driver=CAREER.driver;G.codriver=CAREER.codriver;
  // Offer tuning before starting
  if(confirm('Open Tuning Garage before this stage?\n\nOK = Open Tuning | Cancel = Start immediately')){
    activeTuneSection=TUNE_SECTIONS[0];
    if(!TUNE||Object.keys(TUNE).length===0) TUNE=defaultTune();
    tunReturnScreen='career';
    window._careerStageData=ERAS[c.era].stages[c.sIdx];
    if(!Object.keys(TUNE).length) TUNE=defaultTune();
    activeTuneSection=TUNE_SECTIONS[0];
    show('tuning');
    document.getElementById('tun-back-btn').textContent='← Career';
    _refreshTuningHeader();
    buildTuneNav();renderTuneSection(activeTuneSection);
    document.getElementById('tun-title').textContent='Tune for: '+ERAS[c.era].stages[c.sIdx].name;
  } else {
    beginStageWithData(ERAS[c.era].stages[c.sIdx]);
  }
}
function continueCareer(){buildCareerScreen();show('career');}
function resetCareer(){
  if(!confirm('Reset all career progress?'))return;
  CAREER.started=false;CAREER.completed=[];CAREER.pts=0;CAREER.currentStage=0;openCareer();
}

// ═══════════════ GAME ═══════════════
function beginStage(stageOverride){
  G.driver=document.getElementById('inp-drv').value.trim()||'Driver';
  G.codriver=document.getElementById('inp-cod').value.trim()||'Co-driver';
  if(!G.era){alert('Select an era first!');return;}
  if(!G.car)G.car=ERAS[G.era].cars[0];
  const era=ERAS[G.era];
  const stage=stageOverride||era.stages[Math.floor(Math.random()*era.stages.length)];
  beginStageWithData(stage);
}
function beginStageWithData(stage){
  clearInterval(G.timer);
  const era=ERAS[G.era];
  G.notes=[...stage.notes].sort(()=>Math.random()-.5);
  G.idx=0;G.correct=0;G.skipped=0;G.results=[];G.currentStageName=stage.name;G.stageEnded=false;
  initDamage();
  document.getElementById('g-stage').textContent=stage.name;
  document.getElementById('g-meta').textContent=`${stage.surf} · ${stage.km}km · ${stage.weather}`;
  document.getElementById('g-colbl').textContent=`${G.codriver} calls`;
  document.getElementById('g-cond').textContent=stage.cond;
  document.getElementById('g-of').textContent=`/ ${G.notes.length}`;
  document.getElementById('g-corr').textContent='0';
  const av=era.commentator.split(' ').map(w=>w[0]).join('');
  document.getElementById('g-comm-av').textContent=av;
  document.getElementById('g-vocab').innerHTML=Object.entries(era.vocab).slice(0,8).map(([k,v])=>`
    <div class="hrow"><span class="hkey">${k}</span><span class="hval">${v}</span></div>`).join('');
  document.getElementById('g-dots').innerHTML=G.notes.map((_,i)=>`<div class="gd" id="gd-${i}"></div>`).join('');
  show('game');
  // Show opening atmosphere line
  if(ATMO[G.era]&&ATMO[G.era].opening){
    const op=ATMO[G.era].opening[Math.floor(Math.random()*ATMO[G.era].opening.length)];
    const atmoEl=document.createElement('div');
    atmoEl.className='atmo-bar';atmoEl.textContent=op;
    const gMain=document.getElementById('g-main');
    if(gMain)gMain.prepend(atmoEl);
    // Speak it
    if(window.speechSynthesis){
      window.speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(op);u.rate=0.82;u.pitch=0.9;u.volume=0.7;
      window.speechSynthesis.speak(u);
    }
  }
  loadNote();
}
function loadNote(){
  if(G.idx>=G.notes.length){endStage();return;}
  const n=G.notes[G.idx];
  document.getElementById('g-note').textContent=n.raw;
  document.getElementById('g-narr').style.display='none';
  document.getElementById('g-fb').style.display='none';
  document.getElementById('g-comm').style.display='none';
  document.getElementById('g-comm-ph').style.display='block';
  document.getElementById('btn-hear-trans').style.display='none';
  document.getElementById('g-input').value='';
  document.getElementById('g-input').disabled=false;
  document.getElementById('g-sub').disabled=false;
  document.getElementById('g-foot-note').textContent=`Note ${G.idx+1} of ${G.notes.length}`;
  document.getElementById('g-prog').style.width=(G.idx/G.notes.length*100)+'%';
  document.getElementById('g-corr').textContent=G.correct;
  if(G.idx>0){const pd=document.getElementById(`gd-${G.idx-1}`);if(pd&&!pd.classList.contains('bad')&&!pd.classList.contains('sk'))pd.classList.add('ok');}
  const cur=document.getElementById(`gd-${G.idx}`);if(cur)cur.className='gd now';
  G.remaining=G.timeLimit;updateTimer();
  clearInterval(G.timer);
  G.timer=setInterval(()=>{G.remaining--;updateTimer();if(G.remaining<=0){clearInterval(G.timer);timeUp();}},1000);
  setTimeout(()=>document.getElementById('g-input').focus(),50);
  // Inject atmosphere event every 2nd note
  if(G.idx>0&&G.idx%2===0)setTimeout(injectAtmosphere,800);
}
function updateTimer(){
  const frac=G.remaining/G.timeLimit;
  document.getElementById('t-arc').setAttribute('stroke-dashoffset',226.2*(1-frac));
  document.getElementById('t-arc').setAttribute('stroke',G.remaining<=3?'#e8291c':G.remaining<=5?'#f5c518':'#39ff14');
  document.getElementById('g-timer').textContent=G.remaining;
}
function similarity(a,b){
  a=a.toLowerCase().replace(/[^a-z0-9 ]/g,'').trim();
  b=b.toLowerCase().replace(/[^a-z0-9 ]/g,'').trim();
  if(a===b)return 1;
  const wa=new Set(a.split(/\s+/));const wb=new Set(b.split(/\s+/));
  let hit=0;wb.forEach(w=>{if(wa.has(w))hit++;});
  return hit/Math.max(wa.size,wb.size);
}
function submitAnswer(){
  clearInterval(G.timer);
  if(G.idx>=G.notes.length||G.stageEnded)return; // guard
  const typed=document.getElementById('g-input').value.trim();
  if(!typed)return;
  document.getElementById('g-input').disabled=true;document.getElementById('g-sub').disabled=true;
  const n=G.notes[G.idx];
  const thresh=G.diff===4?0.98:0.62;
  const score=similarity(typed,n.ans);
  const ok=score>=thresh;
  if(ok)G.correct++;
  const dot=document.getElementById(`gd-${G.idx}`);
  if(dot)dot.className='gd '+(ok?'ok':'bad');
  G.results.push({raw:n.raw,ans:n.ans,typed,ok,score});
  G.idx++; // increment first so crash modal can see correct idx state
  const isLastNote = G.idx >= G.notes.length;
  const badCrash = !ok && !isLastNote && rollCrash(n.raw,false,true); // no crash on final note - go straight to result
  showResult(ok,n,score,false,false,false); // never show crash on last note
  if(!badCrash || isLastNote){
    setTimeout(()=>{
      if(G.idx>=G.notes.length){endStage();}
      else{loadNote();}
    },2600);
  } else {
    injectAtmosphere();
    triggerCrash(n.raw);
  }
}
function skipNote(){
  clearInterval(G.timer);
  if(G.idx>=G.notes.length||G.stageEnded)return; // guard
  document.getElementById('g-input').disabled=true;document.getElementById('g-sub').disabled=true;
  const n=G.notes[G.idx];G.skipped++;
  const dot=document.getElementById(`gd-${G.idx}`);if(dot)dot.className='gd sk';
  G.results.push({raw:n.raw,ans:n.ans,typed:'',ok:false,score:0,skipped:true});
  G.idx++;
  const skipIsLast = G.idx >= G.notes.length;
  const skipCrash = !skipIsLast && rollCrash(n.raw,false,true);
  showResult(false,n,0,true,false,false);
  if(!skipCrash || skipIsLast){
    setTimeout(()=>{
      if(G.idx>=G.notes.length){endStage();}
      else{loadNote();}
    },2600);
  } else {
    injectAtmosphere();
    triggerCrash(n.raw);
  }
}
function timeUp(){
  clearInterval(G.timer);
  if(G.idx>=G.notes.length||G.stageEnded)return; // guard against out-of-bounds
  document.getElementById('g-input').disabled=true;document.getElementById('g-sub').disabled=true;
  const n=G.notes[G.idx];
  const dot=document.getElementById(`gd-${G.idx}`);if(dot)dot.className='gd bad';
  G.results.push({raw:n.raw,ans:n.ans,typed:'',ok:false,score:0,timeout:true});
  G.idx++;
  const timeIsLast = G.idx >= G.notes.length;
  const toCrash = !timeIsLast && rollCrash(n.raw,true,false);
  showResult(false,n,0,false,true,false);
  if(!toCrash || timeIsLast){
    setTimeout(()=>{
      if(G.idx>=G.notes.length){endStage();}
      else{loadNote();}
    },2600);
  } else {
    injectAtmosphere();
    triggerCrash(n.raw);
  }
}
function showResult(ok,n,score,skipped,timeout,crashFollows=false){
  if(!n)return; // guard against undefined note
  const fb=document.getElementById('g-fb');
  fb.className='fb-box '+(ok?'ok':timeout?'to':'bad');
  document.getElementById('g-fb-txt').textContent=ok?`Correct — ${Math.round(score*100)}% match`:skipped?'Skipped':timeout?'Time up — '+Math.round(score*100)+'% match':'Incorrect — '+Math.round(score*100)+'% match';
  document.getElementById('g-fb-ans').textContent='Answer: '+n.ans;
  fb.style.display='flex';
  document.getElementById('g-narr').style.display='block';
  document.getElementById('g-narr-txt').textContent=n.narr;
  document.getElementById('g-comm').style.display='flex';
  document.getElementById('g-comm-ph').style.display='none';
  document.getElementById('g-comm-txt').textContent=`"${n.comm}" — ${ERAS[G.era].commentator}`;
  document.getElementById('btn-hear-trans').style.display='flex';
  // AUTO-PLAY commentator voice (not the note — that stays manual)
  const voices=window.speechSynthesis?window.speechSynthesis.getVoices():[];
  if(window.speechSynthesis){
    window.speechSynthesis.cancel();
    const utt=new SpeechSynthesisUtterance(n.comm);
    utt.rate=0.9;utt.pitch=ok?1.1:0.85;utt.volume=0.85;
    const pref=voices.find(v=>v.lang.startsWith('en')&&(v.name.toLowerCase().includes('daniel')||v.name.toLowerCase().includes('google')));
    if(pref)utt.voice=pref;
    window.speechSynthesis.speak(utt);
  }
}
function speakNote(){
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const era=ERAS[G.era];
  const raw=document.getElementById('g-note').textContent;
  const parts=raw.split(/\s+/).map(t=>{
    if(t in era.vocab)return era.vocab[t];
    if(t.match(/^[LR][1-6]$/))return(t[0]==='L'?'left':'right')+' '+t[1];
    if(t.match(/^\d+$/))return t+' metres';
    return t.toLowerCase();
  });
  const utt=new SpeechSynthesisUtterance(parts.join(', '));
  utt.rate=1.35;utt.pitch=1.1;utt.volume=1;
  const v=window.speechSynthesis.getVoices();
  const pref=v.find(x=>x.lang.startsWith('en')&&x.name.toLowerCase().includes('male'));
  if(pref)utt.voice=pref;
  window.speechSynthesis.speak(utt);
}
function speakTranslation(){
  if(!window.speechSynthesis)return;
  const n=G.notes[G.idx-1];if(!n)return;
  window.speechSynthesis.cancel();
  const utt=new SpeechSynthesisUtterance(n.ans);
  utt.rate=0.85;utt.pitch=0.9;utt.volume=0.9;
  window.speechSynthesis.speak(utt);
}
function abandonStage(){if(confirm('Abandon this stage?')){clearInterval(G.timer);showMenu();}}

// ═══════════════ END STAGE ═══════════════
function endStage(){
  if(G.stageEnded)return; // prevent double-call
  G.stageEnded=true;
  clearInterval(G.timer);
  document.getElementById('g-prog').style.width='100%';
  const era=ERAS[G.era];const total=G.notes.length;
  const acc=G.dnf?0:Math.round(G.correct/total*100);
  const avgDmg=(G.damage.engine+G.damage.susp+G.damage.tyres+G.damage.body)/4;
  const pos=G.dnf?'DNF':acc>=85?'P1':acc>=70?'P2':acc>=50?'P3':'DNF';
  const posN=G.dnf?9:acc>=85?0:acc>=70?1:acc>=50?2:9;
  const baseSec=parseFloat(era.stages[0].km)*50+100;
  const tuneTimeMod = (G.tuneEffects && G.tuneEffects.timeMod) ? G.tuneEffects.timeMod : 1.0;
  const notePen=Math.round((total-G.correct)*5.5+G.skipped*2.5);
  const crashPen=Math.round(G.totalTimeLost);
  const dmgPen=Math.round((100-avgDmg)*1.2);
  const pen=notePen+crashPen+dmgPen;
  const finalSec=Math.round((baseSec+pen)*tuneTimeMod);
  const m=Math.floor(finalSec/60);const s=(finalSec%60).toFixed(1).padStart(4,'0');
  const timeStr=G.dnf?'DNF':`${m}:${s}`;
  const stageName=G.currentStageName;
  const won=acc>=50;
  if(G.careerMode){
    const cal=CAREER_CAL[G.careerIdx];
    const pts=posN<cal.pts.length?cal.pts[posN]:0;
    CAREER.pts+=pts;
    CAREER.completed[G.careerIdx]={pos,acc,pts,time:timeStr};
    CAREER.currentStage=Math.min(G.careerIdx+1,CAREER_CAL.length);
    CAREER.standings.forEach(r=>{const ri=Math.floor(Math.random()*cal.pts.length);r.pts+=cal.pts[ri]||0;});
    document.getElementById('r-career-btn').style.display='inline-block';
    document.getElementById('r-std-box').style.display='block';
    const all=[{name:CAREER.driver,pts:CAREER.pts,you:true},...CAREER.standings].sort((a,b)=>b.pts-a.pts);
    document.getElementById('r-standings').innerHTML=all.slice(0,5).map((r,i)=>`
      <div class="std-row"><span class="std-pos">${i+1}</span><span class="std-name" style="${r.you?'font-weight:600':''}">${r.name}</span><span class="std-pts">${r.pts}pts</span></div>`).join('');
  } else {
    document.getElementById('r-career-btn').style.display='none';
    document.getElementById('r-std-box').style.display='none';
  }
  // Newspaper fill
  document.getElementById('r-era-tag').textContent=`${era.label} Special — Stage Report`;
  document.getElementById('r-date').textContent=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}).toUpperCase();
  document.getElementById('r-outlet').textContent=era.outlet;
  document.getElementById('r-issue').textContent=`${era.label} · ${stageName}`;
  const stageShort=stageName.split('—')[1]?.trim().toUpperCase()||stageName.toUpperCase();
  const hl=G.dnf
    ?`<span>${G.driver.toUpperCase()}</span> RETIRES FROM ${stageShort} — CAR TOO DAMAGED TO CONTINUE`
    :won
    ?`<span>${G.driver.toUpperCase()}</span> & ${G.codriver.toUpperCase()} NAIL IT FOR ${pos} ON THE ${stageShort}`
    :`<span>${G.driver.toUpperCase()}</span> STRUGGLES ON NOTES — ${pos} ON ${stageShort}`;
  document.getElementById('r-headline').innerHTML=hl;
  document.getElementById('r-pos-badge').textContent=`${pos} — ${acc}% ACCURACY`;
  document.getElementById('r-deck').textContent=won
    ?`The crew translated ${G.correct} of ${total} pacenotes correctly. Stage time: ${timeStr}.`
    :`Only ${G.correct} of ${total} notes read correctly. Time lost across multiple corners.`;
  const crashWords=G.crashCount>0?`After ${G.crashCount} incident${G.crashCount>1?'s':''} costing over ${Math.round(G.totalTimeLost)} seconds, `:' ';
  const art=G.dnf
    ?`<p>${G.driver} and ${G.codriver} were forced to retire from ${stageName} after damage accumulated beyond the point of recovery. The ${G.car?.n||'car'} was too badly damaged to continue.</p><p>"It's heartbreaking," said ${G.driver} at the stage end. "The notes were there but we lost the car. That's rallying."</p><p>The retirement means no points from this stage. But the car can be rebuilt — the knowledge stays.</p>`
    :won
    ?`<p>${G.driver}, navigating from the notes of ${G.codriver} in the ${G.car?.n||'car'}, produced a ${acc>=85?'dominant':'controlled'} performance on ${stageName}. The crew translated ${G.correct} of ${total} pacenotes correctly across ${era.surf} conditions.</p><p>${crashWords}the stage time of ${timeStr} reflects the effort. "The notes were exactly right," said ${G.driver}. "When you trust them, the car goes where it needs to go."</p><p>The ${era.label} machinery performed as expected and the note-reading held under pressure.</p>`
    :`<p>${G.driver} and ${G.codriver} endured a difficult run through ${stageName}, with only ${G.correct} of ${total} pacenotes translated accurately. ${crashWords}time was lost at multiple corners where hesitation cost precious seconds.</p><p>"We got caught out on the sequences," admitted ${G.driver}. "The notes came quicker than expected." ${G.codriver}: "We'll study the vocab before the next one."</p><p>The crew brought the car home in ${timeStr}. Work is needed before the next round.</p>`
  // Add crash/damage section to article
  const dmgLine=G.crashCount>0?`<p>The car suffered ${G.crashCount} incident${G.crashCount>1?'s':''} during the stage, costing an estimated ${Math.round(G.totalTimeLost)} seconds in total. Average car damage was ${Math.round(avgDmg)}% at the finish — ${avgDmg>80?'remarkable considering the conditions':'visible on the bodywork and underneath'}.`:`<p>The car came through clean — no incidents, no damage beyond the normal wear of a gravel stage.`;
  document.getElementById('r-article').innerHTML=art+dmgLine+'</p>';
  const q=won
    ?`"The notes were perfect. When you trust them completely, the car goes exactly where it needs to go."`
    :`"We lost time in the sequences. We'll review and come back stronger next time."`;
  document.getElementById('r-quote').textContent=q;
  document.getElementById('r-quote-attr').textContent=`— ${G.driver}, post-stage`;
  document.getElementById('r-pos').textContent=pos;
  document.getElementById('r-pos').className='rs-v '+(pos==='P1'?'grn':pos==='DNF'?'red':'gld');
  document.getElementById('r-time').textContent=timeStr;
  document.getElementById('r-acc').textContent=acc+'%';
  document.getElementById('r-acc').className='rs-v '+(acc>=70?'grn':acc<50?'red':'gld');
  document.getElementById('r-correct').textContent=`${G.correct} / ${total}`;
  document.getElementById('r-pen').textContent=G.dnf?'Retired':(`+${pen}s (${G.crashCount} crash${G.crashCount!==1?'es':''})`);
  document.getElementById('r-breakdown').innerHTML=G.results.map((r,i)=>`
    <div class="bd-row">
      <span class="bd-i">${i+1}</span>
      <span class="bd-n">${r.raw}</span>
      <div class="bd-r ${r.ok?'ok':'bad'}"></div>
    </div>`).join('');
  show('result');
  // Auto-play win/lose jingle via TTS
  if(window.speechSynthesis){
    setTimeout(()=>{
      window.speechSynthesis.cancel();
      const msg=won
        ?`${pos} for ${G.driver} and ${G.codriver}! Excellent pacenote reading. Stage time ${timeStr}.`
        :`Tough stage for ${G.driver}. ${G.correct} of ${total} notes correct. Time to hit the training school.`;
      const utt=new SpeechSynthesisUtterance(msg);
      utt.rate=0.9;utt.pitch=won?1.1:0.85;utt.volume=0.9;
      window.speechSynthesis.speak(utt);
    },600);
  }
}

// ═══════════════ TRAINING ═══════════════
function openTraining(){
  buildLessonList();
  loadLesson('intro');
  show('training');
}
function buildLessonList(){
  document.getElementById('lesson-list').innerHTML=LESSONS.map(l=>`
    <button class="lbtn${currentLesson===l.id?' on':''}" onclick="loadLesson('${l.id}')">
      ${l.name}
      ${lessonsCompleted.has(l.id)?'<span class="ldone">✓</span>':''}
    </button>`).join('');
  updateProgress();
}
function updateProgress(){
  const done=lessonsCompleted.size;const tot=LESSONS.length;
  const pct=tot?done/tot*100:0;
  document.getElementById('cbar1').style.width=pct+'%';document.getElementById('clbl1').textContent=`${done} / ${tot}`;
  document.getElementById('cbar2').style.width=pct+'%';document.getElementById('clbl2').textContent=`${done} / ${tot}`;
}
function loadLesson(id){
  currentLesson=id;
  const l=LESSONS.find(x=>x.id===id);if(!l)return;
  document.getElementById('school-main').innerHTML=l.content;
  lessonsCompleted.add(id);
  buildLessonList();
  if(id==='quiz')initQuiz();
}
function switchLesson(id,el){
  document.querySelectorAll('.st-tab').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
  loadLesson(id);
}
function initQuiz(){
  quizBank=[];
  Object.values(ERAS).forEach(era=>era.stages.forEach(stage=>stage.notes.forEach(n=>quizBank.push({raw:n.raw,ans:n.ans,era:era.label}))));
  quizBank.sort(()=>Math.random()-.5);quizIdx=0;nextQuiz();
}
function nextQuiz(){
  if(!quizBank.length)return;
  quizIdx=quizIdx%quizBank.length;quizCurrent=quizBank[quizIdx];quizIdx++;
  const qn=document.getElementById('qz-note');const qi=document.getElementById('qz-input');const qf=document.getElementById('qz-fb');const qt=document.getElementById('qz-era-tag');
  if(qn)qn.textContent=quizCurrent.raw;if(qi){qi.value='';qi.disabled=false;}
  if(qf){qf.textContent='';qf.className='quiz-fb';}if(qt)qt.textContent=quizCurrent.era;
}
function checkQuiz(){
  const qi=document.getElementById('qz-input');const qf=document.getElementById('qz-fb');
  if(!qi||!qf||!quizCurrent)return;
  const score=similarity(qi.value.trim(),quizCurrent.ans);
  const ok=score>=0.60;
  qf.textContent=ok?`Correct! ${Math.round(score*100)}% — Answer: ${quizCurrent.ans}`:`Not quite (${Math.round(score*100)}%) — Answer: ${quizCurrent.ans}`;
  qf.className='quiz-fb '+(ok?'ok':'bad');
}
function revealQuiz(){
  const qf=document.getElementById('qz-fb');
  if(qf&&quizCurrent){qf.textContent='Answer: '+quizCurrent.ans;qf.className='quiz-fb ok';}
}
function hearQuiz(){
  if(!quizCurrent||!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const era=Object.values(ERAS).find(e=>e.label===quizCurrent.era)||Object.values(ERAS)[0];
  const parts=quizCurrent.raw.split(/\s+/).map(t=>{
    if(t in era.vocab)return era.vocab[t];
    if(t.match(/^[LR][1-6]$/))return(t[0]==='L'?'left':'right')+' '+t[1];
    if(t.match(/^\d+$/))return t+' metres';
    return t.toLowerCase();
  });
  const utt=new SpeechSynthesisUtterance(parts.join(', '));
  utt.rate=1.3;utt.pitch=1.1;
  window.speechSynthesis.speak(utt);
}


document.addEventListener('keydown',e=>{
  if(e.key==='Enter'){
    if(document.getElementById('game').classList.contains('active')&&!document.getElementById('g-sub').disabled)submitAnswer();
    if(document.getElementById('training').classList.contains('active')&&document.activeElement===document.getElementById('qz-input'))checkQuiz();
  }
});
window.speechSynthesis&&window.speechSynthesis.getVoices();


// ═══════════════════════════════════════════════════════════════
// TUTORIAL SYSTEM (#001, #005)
// ═══════════════════════════════════════════════════════════════

const TUTORIAL_STEPS = [
  {
    title: "Read the pacenotes. Keep the driver alive.",
    body: "In rally racing, the co-driver reads shorthand notes before every corner. The driver can't see what's coming — they trust you completely. One wrong call and they're off the road.",
    highlight: null, note: null, needsInput: false,
    nextLabel: "Let's go →"
  },
  {
    title: "Corner direction and severity",
    body: "Every note starts with a direction (L or R) and a severity number (1–6). <strong>1 is the tightest hairpin. 6 is a fast sweep.</strong> Think of it as how open the corner is.",
    highlight: "L = Left   R = Right\n1 = Hairpin   6 = Fast sweep\n\nSo: L3 = Medium-speed left corner",
    note: "L3",
    needsInput: true,
    prompt: "Type the translation:",
    hint: "Hint: direction + severity number in words",
    accept: ["left 3","left three","left 3rd","l3"],
    successMsg: "CLEAN CALL — Driver trust +",
    nextLabel: "Next →"
  },
  {
    title: "Linking corners",
    body: "Corners can be chained. INTO means the second corner follows immediately — no gap. The driver needs both calls to plan their line.",
    highlight: "L3 INTO R4\n= Left three, directly into right four\n\nNo time between them. Call it smooth.",
    note: "L3 INTO R4",
    needsInput: true,
    prompt: "Translate the full sequence:",
    hint: "Hint: say both corners in order",
    accept: ["left 3 into right 4","left three into right four","left 3 right 4","l3 into r4","left three right four"],
    successMsg: "GOOD FLOW — Both corners read",
    nextLabel: "Next →"
  },
  {
    title: "Caution marks — the symbols that matter most",
    body: "<strong>!</strong> means caution — something dangerous ahead. <strong>!!</strong> means maximum caution — get this wrong and you're done. These appear when something was found in recce that the driver can't see from the entry.",
    highlight: "!  = Caution (danger ahead)\n!! = Maximum caution (do NOT deviate)\n\nThe exclamation mark is not decoration. It is a warning.",
    note: "R2!!",
    needsInput: true,
    prompt: "Translate this — don't miss the caution:",
    hint: "Hint: right, severity, then say the caution level",
    accept: ["right 2 maximum caution","right two maximum caution","right 2 max caution","r2 maximum caution","right 2!! ","right two max"],
    successMsg: "HAZARD NOTED — Driver survives",
    nextLabel: "Next →"
  },
  {
    title: "Now feel the pressure",
    body: "In a real stage you have seconds per note. The timer runs from the moment the note appears. Miss it and the driver enters the corner blind.",
    highlight: "This next note has a 8-second timer.\nRead it. Type it. Hit Enter.",
    note: "L4 100 R3",
    needsInput: true,
    timedStep: true,
    timeLimit: 8,
    prompt: "Translate fast:",
    hint: "left four, 100 metres to right three",
    accept: ["left 4 100 right 3","left four 100 right three","left 4 100 metres right 3","l4 100 r3","left 4 right 3"],
    successMsg: "CLEAN — Under pressure",
    nextLabel: "Final step →"
  },
  {
    title: "You're ready. One last thing.",
    body: "If you miss enough notes, the car takes damage. Enough damage and you face a choice: risk continuing or retire. That decision is yours — and it has consequences.",
    highlight: "Damage accumulates from:\n• Wrong translations\n• Timeouts\n• Crash events\n\nA DNF means no points. But limping home damaged costs time.",
    note: null, needsInput: false,
    nextLabel: "Start my first stage →",
    isLast: true
  }
];

let tutStep = 0;
let tutTimer = null;
let tutTimerRunning = false;

function openTutorial() {
  tutStep = 0;
  document.getElementById('tut-overlay').style.display = 'flex';
  renderTutStep();
}

function skipTutorial() {
  document.getElementById('tut-overlay').style.display = 'none';
  clearInterval(tutTimer);
  // Go straight to setup
  openSetup();
}

function renderTutStep() {
  clearInterval(tutTimer);
  tutTimerRunning = false;
  const step = TUTORIAL_STEPS[tutStep];
  const total = TUTORIAL_STEPS.length;

  // Progress bar
  document.getElementById('tut-prog-fill').style.width = ((tutStep / (total-1)) * 100) + '%';
  document.getElementById('tut-step-label').textContent = `Tutorial · Step ${tutStep+1} of ${total}`;
  document.getElementById('tut-title').textContent = step.title;
  document.getElementById('tut-body').innerHTML = step.body;

  // Note display
  const noteEl = document.getElementById('tut-note-display');
  if (step.note) {
    noteEl.style.display = 'block';
    noteEl.textContent = step.note;
  } else {
    noteEl.style.display = 'none';
  }

  // Highlight box
  const hlEl = document.getElementById('tut-highlight-box');
  if (step.highlight) {
    hlEl.style.display = 'block';
    hlEl.textContent = step.highlight;
  } else {
    hlEl.style.display = 'none';
  }

  // Input
  const inputWrap = document.getElementById('tut-input-wrap');
  const inputEl = document.getElementById('tut-input');
  const hintEl = document.getElementById('tut-input-hint');
  const feedbackEl = document.getElementById('tut-feedback-line');
  if (step.needsInput) {
    inputWrap.style.display = 'block';
    inputEl.value = '';
    inputEl.disabled = false;
    hintEl.textContent = step.prompt || 'Type your translation';
    feedbackEl.textContent = '';
    feedbackEl.style.color = '';
    document.getElementById('tut-next').style.display = 'none';
    setTimeout(() => inputEl.focus(), 80);

    // Timed step
    if (step.timedStep) {
      let remaining = step.timeLimit;
      hintEl.textContent = `${remaining}s remaining`;
      tutTimerRunning = true;
      tutTimer = setInterval(() => {
        remaining--;
        hintEl.textContent = `${remaining}s remaining`;
        hintEl.style.color = remaining <= 3 ? '#e8291c' : '#5a5a70';
        if (remaining <= 0) {
          clearInterval(tutTimer);
          tutTimerRunning = false;
          feedbackEl.textContent = "Time up. Keep going.";
          feedbackEl.style.color = '#f5c518';
          inputEl.disabled = true;
          document.getElementById('tut-next').style.display = 'block';
        }
      }, 1000);
    }
  } else {
    inputWrap.style.display = 'none';
    document.getElementById('tut-next').style.display = 'block';
  }

  // Next button label
  document.getElementById('tut-next').textContent = step.nextLabel || 'Continue';
}

function checkTutInput() {
  const step = TUTORIAL_STEPS[tutStep];
  if (!step || !step.needsInput) return;
  const val = document.getElementById('tut-input').value.trim().toLowerCase().replace(/[^a-z0-9 ]/g,'');
  if (!val) return;

  // Check against accepted answers (fuzzy)
  const accepted = step.accept || [];
  let matched = false;
  for (const a of accepted) {
    const aClean = a.toLowerCase().replace(/[^a-z0-9 ]/g,'');
    // Word-overlap match
    const wordsVal = new Set(val.split(/\s+/));
    const wordsAns = new Set(aClean.split(/\s+/));
    let hits = 0;
    wordsAns.forEach(w => { if (wordsVal.has(w)) hits++; });
    if (hits / wordsAns.size >= 0.6) { matched = true; break; }
  }

  const feedbackEl = document.getElementById('tut-feedback-line');
  const inputEl = document.getElementById('tut-input');

  clearInterval(tutTimer);
  if (matched) {
    feedbackEl.textContent = '✓ ' + (step.successMsg || 'Correct');
    feedbackEl.style.color = '#39ff14';
    inputEl.disabled = true;
    document.getElementById('tut-next').style.display = 'block';
  } else {
    feedbackEl.textContent = "Not quite — try again.";
    feedbackEl.style.color = '#ff9090';
    // Shake the input
    inputEl.style.animation = 'none';
    requestAnimationFrame(() => { inputEl.style.animation = 'tutShake .3s ease'; });
  }
}

function tutNext() {
  const step = TUTORIAL_STEPS[tutStep];
  if (step && step.isLast) {
    document.getElementById('tut-overlay').style.display = 'none';
    clearInterval(tutTimer);
    openSetup();
    return;
  }
  tutStep++;
  if (tutStep >= TUTORIAL_STEPS.length) {
    document.getElementById('tut-overlay').style.display = 'none';
    openSetup();
    return;
  }
  renderTutStep();
}

// ═══════════════════════════════════════════════════════════════
// ENHANCED CRASH FEEDBACK (#002, #004)
// ═══════════════════════════════════════════════════════════════

const CRASH_MESSAGES = {
  off_road:   { title: 'OFF THE ROAD!',    sub: 'Ran wide — missed the corner entry' },
  rock_strike:{ title: 'ROCK STRIKE!',     sub: 'Debris hit — suspension taking damage' },
  spin:       { title: 'SPIN!',            sub: 'Rear broke away — lost control' },
  puncture:   { title: 'PUNCTURE!',        sub: 'Tyre cut — limping to service' },
  water_off:  { title: 'INTO THE WATER!',  sub: 'Understeered at water splash' },
  big_off:    { title: 'HEAVY CONTACT!',   sub: 'High-speed impact — check the crew' }
};

function showCrashImpact(crashType) {
  const msg = CRASH_MESSAGES[crashType] || { title: 'INCIDENT!', sub: 'Car off the road' };

  // Screen freeze simulation — briefly lock everything
  document.body.style.pointerEvents = 'none';
  setTimeout(() => { document.body.style.pointerEvents = ''; }, 350);

  // Red flash overlay
  const flash = document.getElementById('crash-flash-overlay');
  flash.style.display = 'block';
  flash.style.opacity = '1';
  setTimeout(() => {
    flash.style.transition = 'opacity .4s ease';
    flash.style.opacity = '0';
    setTimeout(() => {
      flash.style.display = 'none';
      flash.style.transition = '';
    }, 400);
  }, 200);

  // Big centered message
  const bigMsg = document.getElementById('crash-big-msg');
  const bigTitle = document.getElementById('crash-big-title');
  const bigSub = document.getElementById('crash-big-sub');
  bigTitle.textContent = msg.title;
  bigSub.textContent = msg.sub;
  bigMsg.style.display = 'flex';
  setTimeout(() => { bigMsg.style.display = 'none'; }, 1800);

  // Screen shake on game element
  const gameEl = document.getElementById('game');
  if (gameEl) {
    gameEl.classList.add('shake-screen');
    setTimeout(() => gameEl.classList.remove('shake-screen'), 450);
  }
}

// ═══════════════════════════════════════════════════════════════
// POSITIVE FEEDBACK FLASHES (#008)
// ═══════════════════════════════════════════════════════════════

const CORRECT_MESSAGES = [
  'CLEAN CALL', 'GOOD FLOW', 'DRIVER TRUST +', 'SHARP READ',
  'SMOOTH', 'ON THE NOTES', 'PERFECT CALL', 'RAPID READ'
];
let correctMsgIdx = 0;

function showCorrectFlash() {
  const el = document.getElementById('correct-flash');
  el.textContent = CORRECT_MESSAGES[correctMsgIdx % CORRECT_MESSAGES.length];
  correctMsgIdx++;
  el.style.display = 'block';
  el.style.opacity = '1';
  clearTimeout(el._timeout);
  el._timeout = setTimeout(() => {
    el.style.transition = 'opacity .5s ease';
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.display = 'none';
      el.style.opacity = '1';
      el.style.transition = '';
    }, 500);
  }, 900);
}

// ═══════════════════════════════════════════════════════════════
// SPLIT TIME TICKER (#007)
// ═══════════════════════════════════════════════════════════════

let splitGap = 0; // seconds behind/ahead of target

function updateSplitTicker(noteCorrect, noteIdx, total) {
  if (noteIdx < 1) return;
  const ticker = document.getElementById('split-ticker');
  // Each wrong note costs ~3.5s, each correct saves ~1s vs target
  if (noteCorrect) splitGap -= 1.0 + Math.random() * 0.8;
  else splitGap += 2.5 + Math.random() * 2.0;

  const sectorLabels = ['S1', 'S2', 'S3'];
  const sector = sectorLabels[Math.floor((noteIdx / total) * 3)] || 'S3';
  const sign = splitGap <= 0 ? '+' : '−'; // positive splitGap = losing time
  const absGap = Math.abs(splitGap).toFixed(1);
  const color = splitGap <= 0 ? '#39ff14' : '#e8291c';

  ticker.textContent = `${sector}  ${sign}${absGap}s  vs target`;
  ticker.style.display = 'block';
  ticker.style.borderColor = color;
  ticker.style.color = color;

  clearTimeout(ticker._t);
  ticker._t = setTimeout(() => { ticker.style.display = 'none'; }, 2200);
}

function resetSplitGap() { splitGap = 0; }

// ═══════════════════════════════════════════════════════════════
// IMPROVED DNF DECISION (#004)
// ═══════════════════════════════════════════════════════════════

function showImprovedCrashModal(crash, desc, narr, hits, timeLost, isDNF, longStop) {
  // Calculate risk level for the dramatic DNF screen
  const avgDmg = (G.damage.engine + G.damage.susp + G.damage.tyres + G.damage.body) / 4;
  const riskLevel = avgDmg < 30 ? 'EXTREME' : avgDmg < 55 ? 'HIGH' : 'MODERATE';
  const riskColor = avgDmg < 30 ? '#e8291c' : avgDmg < 55 ? '#f5c518' : '#39ff14';

  // Show crash impact animation first
  showCrashImpact(crash.id || 'big_off');

  // Then show modal with improved button labels after brief delay
  setTimeout(() => {
    showCrashModal(crash, desc, narr, hits, timeLost, isDNF, longStop);

    // Override button labels for dramatic effect
    const okBtn = document.getElementById('crash-ok-btn');
    const dnfBtn = document.getElementById('crash-dnf-btn');
    const hdr = document.querySelector('#crash-modal [style*="background:#e8291c"]') ||
                document.querySelector('#crash-modal div:first-child div:first-child');

    if (isDNF) {
      if (okBtn) okBtn.textContent = 'VEHICLE STATUS: CRITICAL';
      if (dnfBtn) {
        dnfBtn.textContent = 'RETIRE (DNF)';
        dnfBtn.style.background = '#e8291c';
        dnfBtn.style.color = '#fff';
      }
      // Add risk display
      const modal = document.querySelector('#crash-modal .crash-inner, #crash-modal > div > div');
      if (modal) {
        const riskEl = document.createElement('div');
        riskEl.style.cssText = `font-family:'IBM Plex Mono',monospace;font-size:12px;text-align:center;padding:.4rem;margin-bottom:.5rem;border:1px solid ${riskColor};color:${riskColor};letter-spacing:.1em;`;
        riskEl.textContent = `STAGE RISK: ${riskLevel}  ·  VEHICLE: ${Math.round(avgDmg)}% INTEGRITY`;
        modal.insertBefore(riskEl, modal.querySelector('button'));
      }
    } else {
      if (okBtn) {
        okBtn.textContent = avgDmg < 40 ? 'CONTINUE STAGE (RISK FAILURE)' : 'Continue stage';
        okBtn.style.borderColor = avgDmg < 40 ? '#f5c518' : '';
        okBtn.style.color = avgDmg < 40 ? '#f5c518' : '';
      }
      if (dnfBtn) dnfBtn.textContent = 'Retire (DNF)';
    }
  }, 300);
}

// ═══════════════════════════════════════════════════════════════
// MISTAKE EXPLANATION (#003)
// ═══════════════════════════════════════════════════════════════

function getMistakeExplanation(noteRaw, typed, answerCorrect) {
  if (answerCorrect) return null;
  const raw = noteRaw.toUpperCase();
  const typedLower = (typed || '').toLowerCase();

  if (raw.includes('!!') && !typedLower.includes('max')) return 'Missed: double caution (!! = MAXIMUM caution, not just caution)';
  if (raw.includes('!') && !typedLower.includes('caut')) return 'Missed: caution mark (! = danger ahead — always call it)';
  if (raw.includes('DONTCUT') && !typedLower.includes('cut')) return "Missed: don't cut warning (rock or drop on inside)";
  if (raw.includes('JUNCTION') && !typedLower.includes('junct')) return 'Missed: junction call (another road crossing — blind)';
  if (raw.includes('INTO') && !typedLower.includes('into')) return 'Missed: INTO — corners are linked, no gap between them';
  if (raw.includes('FLAT') && !typedLower.includes('flat')) return 'Missed: FLAT — full throttle, no braking';
  if (raw.includes('CREST') && !typedLower.includes('crest')) return 'Missed: CREST — corner is over a blind rise';
  if ((raw.match(/[LR]\d/) || []).length > 1 && typedLower.split(/\s+/).length < 4) return 'Missed a corner — multiple calls in this note';
  if (!typed || typed.trim() === '') return 'No answer given — timer ran out';
  return 'Translation incomplete — check all parts of the note';
}

// ═══════════════════════════════════════════════════════════════
// HOOK INTO EXISTING FUNCTIONS
// ═══════════════════════════════════════════════════════════════

// Override showResult to add correct flash, split ticker, mistake explanation
if (typeof window.showResult === 'function' && !window.__rpaShowResultWrapped) {
  const _origShowResult = window.showResult;
  window.showResult = function(ok, n, score, skipped, timeout, crashFollows) {
    if (!n) return;

    // Call original renderer once
    _origShowResult(ok, n, score, skipped, timeout, crashFollows);

    // Correct flash
    if (ok) showCorrectFlash();

    // Split ticker
    updateSplitTicker(ok, G.idx, G.notes.length);

    // Enhanced mistake explanation
    if (!ok && !skipped) {
      const exp = getMistakeExplanation(n.raw, '', false);
      const fbAns = document.getElementById('g-fb-ans');
      if (fbAns && exp) {
        fbAns.innerHTML = `Answer: ${n.ans}<br><span style="color:#f5c518;font-size:10px">↳ ${exp}</span>`;
      }
    }
  };
  window.__rpaShowResultWrapped = true;
}

// Override triggerCrash to use improved modal
const _origTriggerCrash = triggerCrash;
function triggerCrash(noteRaw) {
  G.crashCount++;
  let pool = CRASH_TYPES.filter(c => c.recoverable);
  if (noteRaw.includes('JUMP') || noteRaw.includes('CREST')) pool = CRASH_TYPES.filter(c => ['off_road','big_off','spin'].includes(c.id));
  if (noteRaw.includes('ICE') || noteRaw.includes('WET')) pool = CRASH_TYPES.filter(c => ['spin','off_road'].includes(c.id));
  if (noteRaw.includes('WATER')) pool = [CRASH_TYPES.find(c => c.id === 'water_off')].filter(Boolean);
  const avgDmg = (G.damage.engine + G.damage.susp + G.damage.tyres + G.damage.body) / 4;
  if (avgDmg < 35 && Math.random() < 0.3) pool = [CRASH_TYPES.find(c => c.id === 'big_off')].filter(Boolean);
  if (!pool || !pool.length) pool = CRASH_TYPES.filter(c => c.recoverable);
  const crash = pool[Math.floor(Math.random() * pool.length)];
  const hits = applyDamage(crash.dmg);
  const timeLost = crash.timeLost[0] + Math.random() * (crash.timeLost[1] - crash.timeLost[0]);
  G.totalTimeLost += timeLost;
  const desc = crash.descs[Math.floor(Math.random() * crash.descs.length)];
  const narr = crash.narrs[Math.floor(Math.random() * crash.narrs.length)];
  const avgAfter = (G.damage.engine + G.damage.susp + G.damage.tyres + G.damage.body) / 4;
  const isDNF = !crash.recoverable || (avgAfter < 10);

  // Use improved modal
  showImprovedCrashModal(crash, desc, narr, hits, timeLost, isDNF, crash.longStop);

  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const msg = isDNF ? 'The stage is over. Retirement confirmed.' : crash.title.replace('!','') + '. ' + desc;
    const u = new SpeechSynthesisUtterance(msg);
    u.rate = 0.9; u.pitch = 0.7;
    window.speechSynthesis.speak(u);
  }
  return isDNF;
}

// Stage start reset is handled by the safe wrapper in rally_systems.js.

// Tutorial keyboard
document.addEventListener('keydown', e => {
  if (document.getElementById('tut-overlay').style.display === 'flex') {
    if (e.key === 'Enter') {
      const step = TUTORIAL_STEPS[tutStep];
      if (step && step.needsInput) {
        const btn = document.getElementById('tut-next');
        if (btn.style.display === 'none' || btn.style.display === '') {
          checkTutInput();
        } else {
          tutNext();
        }
      } else {
        tutNext();
      }
    }
  }
});

document.addEventListener('input', e => {
  if (e.target.id === 'tut-input') {
    // Live feedback hint as user types
  }
});

// ═══════════════════════════════════════════════════════════════
// MENU — ROUTE TO TUTORIAL FIRST FOR NEW PLAYERS (#001)
// ═══════════════════════════════════════════════════════════════

// NOTE:
// openSetup is intentionally not overridden here.
// A previous override caused routing regressions due duplicate function declarations.

