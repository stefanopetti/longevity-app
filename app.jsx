const { useState, useEffect, useRef } = React;

// ============ ICONS (SVG inline) ============
const Icon = ({ d, size = 24, color = 'currentColor', fill = 'none', stroke = 'currentColor', strokeWidth = 2 }) => (
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill, stroke, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', style: { color, flexShrink: 0 } },
    typeof d === 'string' ? React.createElement('path', { d }) : d
  )
);
const Home = (p) => Icon({ ...p, d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' });
const Dumbbell = (p) => Icon({ ...p, d: 'M6.5 6.5l11 11 M21 21l-1-1 M3 3l1 1 M18 22l4-4 M2 6l4-4 M3 10l7-7 M14 21l7-7' });
const User = (p) => Icon({ ...p, d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' });
const Target = (p) => Icon({ ...p, d: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' });
const Activity = (p) => Icon({ ...p, d: 'M22 12h-4l-3 9L9 3l-3 9H2' });
const FileText = (p) => Icon({ ...p, d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8' });
const RotateCcw = (p) => Icon({ ...p, d: 'M1 4v6h6 M3.51 15a9 9 0 1 0 2.13-9.36L1 10' });
const Play = (p) => Icon({ ...p, d: 'M5 3l14 9-14 9V3z', fill: p?.fill || 'currentColor' });
const Pause = (p) => Icon({ ...p, d: 'M6 4h4v16H6z M14 4h4v16h-4z', fill: p?.fill || 'currentColor' });
const Check = (p) => Icon({ ...p, d: 'M20 6L9 17l-5-5' });
const ChevronDown = (p) => Icon({ ...p, d: 'M6 9l6 6 6-6' });
const ChevronUp = (p) => Icon({ ...p, d: 'M18 15l-6-6-6 6' });
const AlertCircle = (p) => Icon({ ...p, d: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 8v4 M12 16h.01' });
const TrendingUp = (p) => Icon({ ...p, d: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6' });
const TrendingDown = (p) => Icon({ ...p, d: 'M23 18l-9.5-9.5-5 5L1 6 M17 18h6v-6' });
const Minus = (p) => Icon({ ...p, d: 'M5 12h14' });
const Info = (p) => Icon({ ...p, d: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16v-4 M12 8h.01' });
const Award = (p) => Icon({ ...p, d: 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12' });
const Flame = (p) => Icon({ ...p, d: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z' });
const Download = (p) => Icon({ ...p, d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3' });
const Upload = (p) => Icon({ ...p, d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12' });
const X = (p) => Icon({ ...p, d: 'M18 6L6 18 M6 6l12 12' });

// ============ FONT SIZES (×1.5 sui critici) ============
const FS = {
  tiny: '13px', xs: '15px', sm: '17px', base: '19px', lg: '22px',
  xl: '24px', '2xl': '29px', '3xl': '36px', '6xl': '72px', '8xl': '115px', '12rem': '230px',
  numBig: '32px', // input numerici durante sessione
  numHuge: '44px' // top of input
};

// ============ DATA ============
const DEFAULT_PROFILE = {
  name: '', age: '', weight: '', height: '',
  hrMax: '',
  omega3: '', magnesium: '', creatine: '', vitD: '', otherSupp: '',
  cholTotal: '', ldl: '', hdl: '', trigl: '', apoB: '', lpa: '', homocysteine: '', glucose: '', hba1c: '', vitDBlood: '', bloodDate: ''
};

// ============ GLOSSARIO TERMINI CRITICI ============
const GLOSSARY = {
  RIR: {
    title: 'RIR — Reps in Reserve',
    body: 'Quante ripetizioni potresti ancora fare prima del cedimento.\n\nÈ il metrico più importante per la longevità: lavorare a RIR 1-3 dà ipertrofia e forza riducendo il rischio infortuni rispetto al cedimento totale.\n\nPer te a 53 anni: target RIR 2 (ferma 2 reps prima del cedimento).'
  },
  Sensazione: {
    title: 'Sensazione sessione',
    body: 'Valutazione soggettiva 1-10 di come è andata la sessione complessivamente.\n\n• 1-3 = Malissimo · stanchezza eccessiva, infortuni, pessima performance\n• 4-6 = Normale · seduta standard, nulla di particolare\n• 7-8 = Bene · buone performance, sentito carico giusto\n• 9-10 = Ottimo · sessione eccezionale, recupero perfetto\n\nCattura giornate buone/scarse che i numeri non vedono. Usa insieme a carichi e reps per capire il vero stato della forma.'
  },
  VO2max: {
    title: 'VO2max',
    body: 'Volume massimo di ossigeno consumato per kg di peso al minuto (ml/kg/min).\n\nÈ il singolo miglior predittore di mortalità all-cause. Range:\n• <30: a rischio\n• 35-45: buono\n• >45: ottimo per la tua età\n\nLo trovi nell\'app Salute → Cardio Fitness.'
  },
  HRV: {
    title: 'HRV — Heart Rate Variability',
    body: 'Variabilità tra battiti cardiaci (misurata di notte da Apple Watch).\n\n• HRV alta = sistema nervoso bilanciato, buon recovery\n• HRV bassa = stress o affaticamento\n\nIl trend mensile è più importante del valore assoluto.'
  },
  FCmax: {
    title: 'FC max — Frequenza Cardiaca Massima',
    body: 'Battiti massimi raggiungibili al minuto.\n\nStima: 220 - età. Per te (53 anni) = 167 bpm.\n\nServe per calcolare le zone di intensità cardio.'
  },
  Zone2: {
    title: 'Zone 2 Cardio',
    body: 'Cardio a bassa intensità: 60-70% FC max (105-125 bpm per te).\n\nDevi poter parlare, ma con un po\' di fatica.\n\nCostruisce base aerobica e densità mitocondriale. Allena il cuore senza stress.'
  },
  Norwegian: {
    title: 'Norwegian 4x4',
    body: 'Protocollo HIIT evidence-based:\n• 4 intervalli da 4 minuti a 85-95% FC max\n• Separati da 3 minuti di recupero attivo a 60-70%\n\nIl miglior protocollo per aumentare VO2max. Studi norvegesi mostrano +10-15% VO2max in 8 settimane.'
  },
  Deload: {
    title: 'Deload — Settimana di scarico',
    body: 'Settimana di scarico ogni 5-6 settimane.\n\nStesse reps ma carichi al 60-70% del normale.\n\nPermette super-compensazione e previene infortuni da overuse. Tornerai più forte la settimana successiva.'
  },
  DoubleProgression: {
    title: 'Double Progression',
    body: 'Strategia evidence-based:\n\n1. Fai il bottom del range reps (es. 8 su 8-12)\n2. Sessione dopo sessione, aggiungi reps con stesso carico\n3. Quando raggiungi il top del range con RIR ≥2 (12 reps con RIR 2), aumenta carico di 2.5kg\n4. Riparti dal bottom del range con il nuovo carico\n\nSemplice e funziona.'
  },
  HealthScore: {
    title: 'Indice Salute Generale',
    body: 'Score 0-100 composto da 4 driver evidence-based per longevità:\n\n• ADERENZA (35%)\n% sessioni completate ultime 4 settimane vs target 20.\n\n• SONNO (25%)\nMedia ore ultimi 7 giorni vs target 7.5h.\n5.5h → 0 · 7.5h → 100.\n\n• HRV (20%)\nTrend HRV vs baseline (prima misurazione). +10% → 100 · -10% → 0.\n\n• RECOVERY (20%)\nCalcolato da check-in mattutini (energia + soreness) ultimi 7 giorni.\n\nSe un componente manca, il peso si redistribuisce sugli altri.\n\nSoglie: 🟢 80-100 · 🟡 60-79 · 🔴 <60'
  }
};

// ============ TASKS ============
const TASKS = {
  upper: {
    id: 'upper', name: 'Forza Upper', icon: '💪', type: 'strength',
    suggestedDay: 1, color: '#84cc16',
    warmup: [
      'Cardio leggero 3 min (cyclette/rower)',
      'Rotazioni spalla controllate 2×10/lato',
      'Cat-cow 10 reps lente',
      'Band pull-apart 2×15',
      'Push-up a muro 2×10',
      'Trazioni vuote ai cavi 2×10 (se disponibili)'
    ],
    cooldown: [
      'Doorway pec stretch 30s/lato',
      'Cross-body shoulder stretch 30s/lato',
      'Lat stretch contro muro 30s/lato',
      'Thoracic extension su roller 1 min',
      'Respirazione diaframmatica 2 min'
    ],
    exercises: [
      { name: 'Trazioni (assistite se serve)', sets: 4, repsRange: [6, 10], rir: 2, rest: 120, type: 'bodyweight', note: 'RIR 2: ferma 2 reps prima del cedimento' },
      { name: 'Panca piana con manubri', sets: 4, repsRange: [8, 12], rir: 2, rest: 120, type: 'weighted', note: 'Carico moderato, eccentrica 2s' },
      { name: 'Rematore manubrio (per lato)', sets: 3, repsRange: [10, 12], rir: 2, rest: 90, type: 'weighted' },
      { name: 'Push-up', sets: 3, repsRange: [8, 20], rir: 2, rest: 90, type: 'bodyweight', note: 'Fermati a 2 dal cedimento' },
      { name: 'Face pull con elastico', sets: 3, repsRange: [12, 18], rir: 3, rest: 60, type: 'weighted', note: 'Salute spalle, no cedimento' },
      { name: 'Hollow body hold (finisher core)', sets: 3, repsRange: [20, 45], rir: 2, rest: 60, type: 'time', note: 'Lombare schiacciata a terra' }
    ]
  },
  zone2: {
    id: 'zone2', name: 'Zone 2 Cardio', icon: '🚴', type: 'zone2',
    suggestedDay: 2, color: '#3b82f6',
    structure: [
      { phase: 'Ramp-up', duration: 300, target: 'Salita graduale FC' },
      { phase: 'Zone 2 stabile', duration: 3000, target: 'FC 60-70% max (105-125 bpm)' },
      { phase: 'Cool-down', duration: 300, target: 'Recupero attivo' }
    ]
  },
  movement: {
    id: 'movement', name: 'Movement Quality (PT)', icon: '🧘', type: 'movement',
    suggestedDay: 3, color: '#a855f7',
    note: 'Sessione con PT focalizzata su mobilità, equilibrio, unilateralità',
    focus: [
      '🦴 Mobilità: toracica, anca, caviglia',
      '⚖️ Equilibrio: monopodalico, occhi chiusi, superfici instabili',
      '↔️ Unilaterali: single-leg deadlift, split squat, Cossack squat',
      '🏋️ Carry: farmer/suitcase carry (carichi asimmetrici)',
      '🌀 Pattern complessi: Turkish Get-Up, Bird Dog progressioni',
      '🦶 Propriocezione e core anti-rotazione (Pallof press)'
    ],
    tipForPT: 'Chiedi al PT: niente forza ripetitiva (la fai Lun/Ven autonomamente), focus su quello che da solo non faresti'
  },
  norwegian: {
    id: 'norwegian', name: 'Norwegian 4x4', icon: '🔥', type: 'hiit',
    suggestedDay: 4, color: '#ef4444',
    structure: [
      { phase: 'Warm-up', duration: 720, target: 'Riscaldamento progressivo' },
      { phase: 'Round 1 - ON', duration: 240, target: '85-95% FC max', intense: true },
      { phase: 'Round 1 - Recovery', duration: 180, target: '60-70% FC max' },
      { phase: 'Round 2 - ON', duration: 240, target: '85-95% FC max', intense: true },
      { phase: 'Round 2 - Recovery', duration: 180, target: '60-70% FC max' },
      { phase: 'Round 3 - ON', duration: 240, target: '85-95% FC max', intense: true },
      { phase: 'Round 3 - Recovery', duration: 180, target: '60-70% FC max' },
      { phase: 'Round 4 - ON', duration: 240, target: '85-95% FC max', intense: true },
      { phase: 'Round 4 - Recovery', duration: 180, target: '60-70% FC max' },
      { phase: 'Cool-down', duration: 600, target: 'Defaticamento' },
      { phase: 'Stretching', duration: 600, target: 'Allungamento' }
    ]
  },
  lower: {
    id: 'lower', name: 'Forza Lower + Core', icon: '🦵', type: 'strength',
    suggestedDay: 5, color: '#84cc16',
    warmup: [
      'Cardio leggero 3 min (cyclette/cammino salita)',
      'Hip circles 2×10/direzione',
      'Bodyweight squat 2×10 (profondi)',
      'Hip flexor stretch dinamico 2×5/lato',
      'Glute bridge 2×10',
      'Goblet squat vuoto 2×8 (attivazione)'
    ],
    cooldown: [
      'Pigeon stretch 45s/lato',
      'Hamstring stretch supino 30s/gamba',
      'Hip flexor stretch (lunge basso) 30s/lato',
      'Child pose 1 min',
      'Respirazione diaframmatica 2 min'
    ],
    exercises: [
      { name: 'Goblet squat', sets: 4, repsRange: [8, 12], rir: 2, rest: 120, type: 'weighted', note: 'Profondità prima del carico' },
      { name: 'Stacco rumeno con manubri', sets: 4, repsRange: [8, 12], rir: 2, rest: 120, type: 'weighted', note: 'Schiena neutra, carico al femorale' },
      { name: 'Hip thrust', sets: 3, repsRange: [10, 15], rir: 2, rest: 90, type: 'weighted' },
      { name: 'Split squat bulgaro (per gamba)', sets: 3, repsRange: [8, 12], rir: 2, rest: 90, type: 'weighted', note: 'Unilaterale: equilibrio + forza' },
      { name: 'Farmer carry', sets: 3, repsRange: [30, 45], rir: 2, rest: 90, type: 'time', note: 'Core + grip + postura' },
      { name: 'Pallof press (per lato)', sets: 3, repsRange: [10, 12], rir: 2, rest: 60, type: 'weighted', note: 'Anti-rotazione: core profondo' },
      { name: 'Dead bug', sets: 3, repsRange: [8, 12], rir: 2, rest: 60, type: 'bodyweight', note: 'Anti-extension lombare' }
    ]
  },
  travelStrength: {
    id: 'travelStrength', name: 'Travel Strength', icon: '✈️', type: 'strength',
    suggestedDay: 0, color: '#0ea5e9',
    travel: true,
    warmup: [
      'Marcia sul posto + circonduzioni braccia 2 min',
      'Cat-cow 10 reps',
      'Hip circles 2×10/direzione',
      'Bodyweight squat 2×10',
      'Push-up a muro 2×10',
      'Arm swings 2×10/direzione'
    ],
    cooldown: [
      'Doorway pec stretch 30s/lato',
      'Pigeon stretch 45s/lato',
      'Hamstring stretch supino 30s/gamba',
      'Child pose 1 min',
      'Respirazione diaframmatica 2 min'
    ],
    exercises: [
      { name: 'Push-up (variante adatta)', sets: 3, repsRange: [8, 20], rir: 2, rest: 75, type: 'bodyweight', note: 'Inclinato se troppo facile, decline se troppo difficile' },
      { name: 'Pike push-up (spalle)', sets: 3, repsRange: [6, 12], rir: 2, rest: 75, type: 'bodyweight', note: 'Anche/glutei in alto, testa verso terra' },
      { name: 'Rematore inverso a tavolo', sets: 3, repsRange: [8, 15], rir: 2, rest: 75, type: 'bodyweight', note: 'Sotto un tavolo solido, corpo dritto' },
      { name: 'Bulgarian split squat (sedia)', sets: 3, repsRange: [8, 12], rir: 2, rest: 75, type: 'bodyweight', note: 'Piede su sedia, monopodalico' },
      { name: 'Single-leg glute bridge', sets: 3, repsRange: [10, 15], rir: 2, rest: 60, type: 'bodyweight', note: 'Una gamba alla volta' },
      { name: 'Hollow body hold', sets: 3, repsRange: [20, 45], rir: 2, rest: 60, type: 'time', note: 'Lombare a terra' },
      { name: 'Pallof press isometrico (muro)', sets: 3, repsRange: [20, 30], rir: 2, rest: 60, type: 'time', note: 'Spingi avanti, resisti rotazione' }
    ]
  },
  travelCardio: {
    id: 'travelCardio', name: 'Travel Cardio', icon: '🏃', type: 'travelCardio',
    suggestedDay: 0, color: '#06b6d4',
    travel: true,
    note: 'Scegli A (camminata 30min = Zone 2) o B (Tabata bodyweight = Norwegian)'
  }
};

const KEY_LIFTS = ['Trazioni (assistite se serve)', 'Panca piana con manubri', 'Goblet squat', 'Stacco rumeno con manubri', 'Hip thrust'];
const DAYS_IT = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

// Soglie evidence-based per markers ematici (longevità + cardiovascolare)
const BLOOD_MARKERS = {
  ldl: { label: 'LDL', unit: 'mg/dL', evalLow: 0, evalHigh: 100, optimal: 'Ottimale: <100', warn: 'Borderline 100-130', high: 'Alto: >130' },
  apoB: { label: 'ApoB', unit: 'mg/dL', evalLow: 0, evalHigh: 90, optimal: 'Ottimale: <90', warn: 'Borderline 90-110', high: 'Alto: >110' },
  hdl: { label: 'HDL', unit: 'mg/dL', evalLow: 40, evalHigh: Infinity, optimal: 'Buono: >40 (>50 ottimale)', warn: 'Basso: 30-40', high: '' },
  trigl: { label: 'Trigliceridi', unit: 'mg/dL', evalLow: 0, evalHigh: 150, optimal: 'Ottimale: <100', warn: 'Borderline 100-150', high: 'Alto: >150' },
  lpa: { label: 'Lp(a)', unit: 'nmol/L', evalLow: 0, evalHigh: 75, optimal: 'Ottimale: <75', warn: '', high: 'Alto: >75 (rischio CV genetico)' },
  hba1c: { label: 'HbA1c', unit: '%', evalLow: 0, evalHigh: 5.7, optimal: 'Ottimale: <5.7', warn: 'Prediabete: 5.7-6.4', high: 'Diabete: ≥6.5' },
  glucose: { label: 'Glicemia', unit: 'mg/dL', evalLow: 0, evalHigh: 100, optimal: 'Ottimale: <100', warn: 'Borderline 100-125', high: 'Alto: ≥126' },
  vitDBlood: { label: 'Vit. D', unit: 'ng/mL', evalLow: 30, evalHigh: 100, optimal: 'Ottimale: 30-60', warn: 'Insufficiente: 20-30', high: 'Carente: <20' },
  homocysteine: { label: 'Omocisteina', unit: 'µmol/L', evalLow: 0, evalHigh: 10, optimal: 'Ottimale: <10', warn: 'Borderline 10-15', high: 'Alto: >15' }
};

const evalMarker = (key, value) => {
  const m = BLOOD_MARKERS[key];
  const v = parseFloat(value);
  if (!m || !v) return null;
  if (key === 'hdl') {
    if (v >= 40) return { status: 'ok', color: '#84cc16', msg: m.optimal };
    return { status: 'warn', color: '#fbbf24', msg: m.warn };
  }
  if (v >= m.evalLow && v <= m.evalHigh) return { status: 'ok', color: '#84cc16', msg: m.optimal };
  if (v > m.evalHigh) {
    // Borderline (warn) vs alto
    if (key === 'ldl' && v < 130) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (key === 'apoB' && v < 110) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (key === 'trigl' && v < 200) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (key === 'hba1c' && v < 6.5) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (key === 'glucose' && v < 126) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (key === 'homocysteine' && v < 15) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    return { status: 'high', color: '#f87171', msg: m.high };
  }
  if (v < m.evalLow) {
    if (key === 'vitDBlood' && v >= 20) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    return { status: 'high', color: '#f87171', msg: m.high };
  }
  return null;
};

// ============ STORAGE (localStorage Safari) ============
const STORAGE_PREFIX = 'longevity_';
const storage = {
  async get(key, fallback = null) {
    try {
      const v = localStorage.getItem(STORAGE_PREFIX + key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  async set(key, value) {
    try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); return true; }
    catch { return false; }
  },
  async delete(key) {
    try { localStorage.removeItem(STORAGE_PREFIX + key); return true; }
    catch { return false; }
  }
};

// ============ AUDIO ============
const playBeep = (freq = 880, dur = 200, vol = 0.5) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + dur / 1000);
    osc.start(); osc.stop(ctx.currentTime + dur / 1000);
  } catch (e) {}
};
const vibrate = (p) => { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} };
const alertEnd = () => { playBeep(880, 200); setTimeout(() => playBeep(1100, 300), 220); vibrate([200, 100, 400]); };
const alertIntense = () => { playBeep(1200, 150); setTimeout(() => playBeep(1200, 150), 200); setTimeout(() => playBeep(1200, 300), 400); vibrate([150, 80, 150, 80, 300]); };

// ============ UTILS ============
const fmtTime = (s) => { const m = Math.floor(s / 60), sec = s % 60; return `${m}:${sec.toString().padStart(2, '0')}`; };
const parseDecimal = (v) => parseFloat(String(v).replace(',', '.')) || 0;
const todayKey = () => new Date().toISOString().slice(0, 10);
const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };

const weekKey = (date = new Date()) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
};
const todayDayOfWeek = () => new Date().getDay() || 7;

// ============ SALUTO + FRASI CONTESTUALI ============
const getGreeting = (name) => {
  const h = new Date().getHours();
  const part = h < 12 ? 'Buongiorno' : h < 18 ? 'Buon pomeriggio' : 'Buonasera';
  return name ? `${part} ${name}` : part;
};

const getContextualMessage = (streak, coveredSlots, totalTasks, todayCheckIn, recentCheckIns, suggestedTaskToday) => {
  // Priorità: situazioni più urgenti/rilevanti per prime
  const remaining = totalTasks - coveredSlots;
  const dayOfWeek = todayDayOfWeek(); // 1=Lun, 7=Dom
  const daysLeftInWeek = 7 - dayOfWeek + 1; // include oggi

  // 1. Domenica + settimana completa
  if (dayOfWeek === 7 && remaining === 0) return { icon: '🏆', text: 'Settimana chiusa al 100%. Goditi il riposo.' };
  // 2. Settimana completata in anticipo
  if (remaining === 0) return { icon: '✅', text: 'Tutte le sessioni fatte questa settimana. Riposo o sessione extra a scelta.' };
  // 3. Recovery basso oggi
  if (todayCheckIn) {
    const recScore = (todayCheckIn.energy * 2) - (todayCheckIn.soreness * 1.5);
    if (recScore < 0) return { icon: '🛑', text: 'Recovery basso oggi. Considera riposo o Zone 2 leggero.' };
    if (recScore < 8 && suggestedTaskToday?.type === 'strength') return { icon: '⚠️', text: 'Recovery moderato. Per la forza usa -20% sui carichi.' };
  }
  // 4. Streak attivo
  if (streak >= 4) return { icon: '🔥', text: `${streak} settimane di fila. Sei in una grande striscia.` };
  if (streak >= 2) return { icon: '🔥', text: `${streak} settimane di fila. Continua così.` };
  // 5. A rischio di non chiudere la settimana
  if (remaining > daysLeftInWeek) return { icon: '⏰', text: `${remaining} sessioni in ${daysLeftInWeek} giorni: settimana a rischio. Prioritizza forza e Norwegian.` };
  // 6. Lunedì motivazionale
  if (dayOfWeek === 1) return { icon: '🎯', text: 'Lunedì: 5 task davanti. Una alla volta.' };
  // 7. Mancano poche sessioni
  if (remaining === 1) return { icon: '💪', text: 'Manca solo 1 sessione per chiudere la settimana.' };
  if (remaining === 2) return { icon: '📈', text: `${remaining} sessioni alla settimana completa.` };
  // 8. Check-in non fatto e già pomeriggio
  if (!todayCheckIn && new Date().getHours() >= 12) return { icon: '☀️', text: 'Hai saltato il check-in stamattina. Domani 15 secondi appena sveglio.' };
  // Default
  return { icon: '💚', text: `${coveredSlots}/${totalTasks} sessioni questa settimana.` };
};

// ============ DOUBLE PROGRESSION ENGINE ============
// Per ogni esercizio, calcola il target suggerito per la prossima sessione
const suggestNextSession = (exerciseName, history) => {
  const sessions = (history.workouts || [])
    .filter(w => w.exercises?.some(e => e.name === exerciseName))
    .slice(-1);
  if (sessions.length === 0) return null;

  const lastEx = sessions[0].exercises.find(e => e.name === exerciseName);
  if (!lastEx || !lastEx.sets) return null;

  // Trova range reps dall'esercizio in TASKS
  let range = null, exType = 'weighted';
  Object.values(TASKS).forEach(t => {
    if (t.exercises) {
      const found = t.exercises.find(e => e.name === exerciseName);
      if (found) { range = found.repsRange; exType = found.type; }
    }
  });
  if (!range) return null;

  // Analizza ultima sessione: tutte le serie al top del range con RIR ≥2?
  const validSets = lastEx.sets.filter(s => s.reps && s.weight !== undefined);
  if (validSets.length === 0) return null;

  const maxWeight = Math.max(...validSets.map(s => parseDecimal(s.weight)));
  const allTopRange = validSets.every(s => parseInt(s.reps) >= range[1] && (s.rir ?? 2) >= 2);
  const someUnder = validSets.some(s => parseInt(s.reps) < range[0] || (s.rir ?? 2) <= 0);
  const avgReps = Math.round(validSets.reduce((a, s) => a + (parseInt(s.reps) || 0), 0) / validSets.length);

  let suggestion;
  if (someUnder) {
    suggestion = {
      type: 'decrease',
      weight: exType === 'weighted' ? Math.max(0, maxWeight - 2.5) : null,
      reps: range[0],
      msg: 'Ultima volta troppo difficile: riduci carico'
    };
  } else if (allTopRange && exType === 'weighted') {
    suggestion = {
      type: 'increase',
      weight: maxWeight + 2.5,
      reps: range[0],
      msg: '🎯 Aumenta carico! +2.5kg, ricomincia dal bottom del range'
    };
  } else if (allTopRange && exType !== 'weighted') {
    suggestion = {
      type: 'increase_reps',
      weight: null,
      reps: range[1] + 1,
      msg: 'Hai battuto il top: prova +1 rep o variante più difficile'
    };
  } else {
    // Default: stesso carico, più reps
    suggestion = {
      type: 'progress',
      weight: maxWeight || null,
      reps: Math.min(avgReps + 1, range[1]),
      msg: 'Stesso carico, prova ad aggiungere reps'
    };
  }
  return suggestion;
};

// ============ AUTO-ADJUSTMENT ENGINE ============
// Analizza pattern e propone alert quando serve aggiustare
const checkAdjustments = (history, dailyLogs, dismissedAlerts) => {
  const alerts = [];
  const wk4Dates = []; for (let i = 0; i < 28; i++) wk4Dates.push(daysAgo(i));
  const recent = (history.workouts || []).filter(w => wk4Dates.includes(w.date?.slice(0, 10)));

  // 1. STALLO PROGRESSIONE: stesso peso × reps per 3+ sessioni su esercizio chiave
  KEY_LIFTS.forEach(lift => {
    const sessions = (history.workouts || []).filter(w => w.exercises?.some(e => e.name === lift)).slice(-3);
    if (sessions.length >= 3) {
      const maxes = sessions.map(s => {
        const ex = s.exercises.find(e => e.name === lift);
        return Math.max(...(ex.sets || []).map(st => parseDecimal(st.weight)));
      });
      const allSame = maxes.every(m => m === maxes[0]) && maxes[0] > 0;
      if (allSame) {
        const id = `stall-${lift}`;
        if (!dismissedAlerts.includes(id)) {
          alerts.push({
            id, severity: 'warn', icon: '⚠️',
            title: `Stallo su ${lift.split('(')[0].trim()}`,
            body: `3 sessioni di fila a ${maxes[0]}kg. Opzioni:\n• Cambia range reps (es. da 8-10 a 12-15)\n• Sostituisci con variante (es. panca → floor press)\n• Fai un deload di 1 settimana`
          });
        }
      }
    }
  });

  // 2. RECOVERY BASSO: media energia <5 e soreness >6 per 5gg
  const last5 = Array.from({ length: 5 }, (_, i) => daysAgo(i));
  const checkIns5 = last5.map(d => dailyLogs[d]?.checkIn).filter(Boolean);
  if (checkIns5.length >= 4) {
    const avgEnergy = checkIns5.reduce((a, c) => a + (c.energy || 5), 0) / checkIns5.length;
    const avgSoreness = checkIns5.reduce((a, c) => a + (c.soreness || 5), 0) / checkIns5.length;
    if (avgEnergy < 5 && avgSoreness > 6) {
      const id = 'recovery-low';
      if (!dismissedAlerts.includes(id)) {
        alerts.push({
          id, severity: 'high', icon: '🛑',
          title: 'Recovery basso da 5 giorni',
          body: `Energia media ${avgEnergy.toFixed(1)}/10, soreness ${avgSoreness.toFixed(1)}/10.\n\nAzione consigliata: deload settimanale (-30% volume) + sostituisci 1 forza con Zone 2 leggero.`
        });
      }
    }
  }

  // 3. ADERENZA BASSA: <3 sessioni/sett per 2 settimane
  const wk1 = weekKey(); const wk2 = weekKey(new Date(Date.now() - 7 * 86400000));
  const thisWeek = (history.workouts || []).filter(w => weekKey(new Date(w.date)) === wk1).length;
  const lastWeek = (history.workouts || []).filter(w => weekKey(new Date(w.date)) === wk2).length;
  if (thisWeek < 3 && lastWeek < 3 && (history.workouts || []).length >= 6) {
    const id = `adherence-low-${wk1}`;
    if (!dismissedAlerts.includes(id)) {
      alerts.push({
        id, severity: 'warn', icon: '📉',
        title: 'Aderenza bassa',
        body: `${thisWeek} sessioni questa settimana, ${lastWeek} la scorsa.\n\nConsiglio: riduci target a 4 sessioni/sett. Meglio costante che ambizioso.`
      });
    }
  }

  // 4. DELOAD: ogni 5-6 settimane di allenamento costante
  const totalWorkouts = (history.workouts || []).length;
  if (totalWorkouts > 0 && totalWorkouts % 25 === 0) {
    const id = `deload-${Math.floor(totalWorkouts / 25)}`;
    if (!dismissedAlerts.includes(id)) {
      alerts.push({
        id, severity: 'info', icon: '🔄',
        title: 'Tempo di deload',
        body: 'Hai accumulato 5+ settimane di allenamento costante.\n\nLa prossima settimana riduci carichi al 60-70%. Stesse reps, ma più leggero. Tornerai più forte la settimana dopo.'
      });
    }
  }

  return alerts;
};

// ============ HEALTH SCORE ============
const calcHealthScore = (history, measurements, dailyLogs) => {
  const wk4 = []; for (let i = 0; i < 4; i++) { const d = new Date(); d.setDate(d.getDate() - i * 7); wk4.push(weekKey(d)); }
  const components = [];
  const completed = (history.workouts || []).filter(w => wk4.includes(weekKey(new Date(w.date)))).length;
  components.push({ key: 'aderenza', value: Math.min(100, (completed / 20) * 100), weight: 35 });

  const last7 = Array.from({ length: 7 }, (_, i) => daysAgo(i));
  const sleepLogs = last7.map(d => dailyLogs[d]?.sleep || 0).filter(v => v > 0);
  if (sleepLogs.length >= 3) {
    const avg = sleepLogs.reduce((a, b) => a + b, 0) / sleepLogs.length;
    components.push({ key: 'sonno', value: Math.max(0, Math.min(100, ((avg - 5.5) / 2) * 100)), weight: 25 });
  }

  const hrvMeasures = (measurements || []).filter(m => m.hrv).sort((a, b) => new Date(a.date) - new Date(b.date));
  if (hrvMeasures.length >= 2) {
    const baseline = hrvMeasures[0].hrv;
    const recent = hrvMeasures[hrvMeasures.length - 1].hrv;
    const delta = ((recent - baseline) / baseline) * 100;
    components.push({ key: 'HRV', value: Math.max(0, Math.min(100, 50 + delta * 5)), weight: 20 });
  } else if (hrvMeasures.length === 1) {
    components.push({ key: 'HRV', value: 50, weight: 20 });
  }

  const checkIns = last7.map(d => dailyLogs[d]?.checkIn).filter(Boolean);
  if (checkIns.length >= 3) {
    const avg = checkIns.reduce((a, c) => a + ((c.energy * 8) - (c.soreness * 4)), 0) / checkIns.length;
    components.push({ key: 'recovery', value: Math.max(0, Math.min(100, avg + 20)), weight: 20 });
  }

  const totalWeight = components.reduce((a, c) => a + c.weight, 0);
  if (totalWeight === 0) return { score: null, components: [] };
  const score = components.reduce((a, c) => a + c.value * (c.weight / totalWeight), 0);
  return { score: Math.round(score), components };
};

// ============ STREAK ============
const calcStreak = (history) => {
  let streak = 0;
  const wk = new Date();
  while (true) {
    const k = weekKey(wk);
    const count = (history.workouts || []).filter(w => weekKey(new Date(w.date)) === k).length;
    if (count >= 3) streak++; else break;
    wk.setDate(wk.getDate() - 7);
  }
  return streak;
};

// ============ PR DETECTION ============
const getPRs = (history) => {
  const prs = {};
  KEY_LIFTS.forEach(lift => {
    const all = (history.workouts || []).filter(w => w.exercises?.some(e => e.name === lift));
    if (all.length === 0) return;
    let maxW = 0, maxReps = 0;
    all.forEach(w => {
      const ex = w.exercises.find(e => e.name === lift);
      (ex.sets || []).forEach(s => {
        const w_ = parseDecimal(s.weight);
        const r = parseInt(s.reps) || 0;
        if (w_ > maxW || (w_ === maxW && r > maxReps)) { maxW = w_; maxReps = r; }
      });
    });
    if (maxW > 0) prs[lift] = { weight: maxW, reps: maxReps };
  });
  return prs;
};

// ============ GOALS ============
const calcGoals = (profile, measurements) => {
  const goals = [];
  const sorted = (measurements || []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const latest = sorted[sorted.length - 1] || {};
  const baseline = sorted[0] || {};
  const w = parseFloat(profile.weight);

  const vo2 = parseFloat(latest.vo2max);
  if (vo2) goals.push({ id: 'vo2', label: 'VO2max', current: vo2, t3: +(vo2 * 1.05).toFixed(1), t6: +(vo2 * 1.11).toFixed(1), t12: +(vo2 * 1.165).toFixed(1), unit: 'ml/kg/min', better: 'up', baseline: baseline.vo2max, glossKey: 'VO2max' });
  const mm = parseFloat(latest.muscleMassKg);
  if (mm) goals.push({ id: 'mm', label: 'Massa muscolare', current: mm, t3: null, t6: +(mm + 1.5).toFixed(1), t12: +(mm + 2.75).toFixed(1), unit: 'kg', better: 'up', baseline: baseline.muscleMassKg });
  const bf = parseFloat(latest.bodyFat);
  if (bf) {
    if (bf > 20) goals.push({ id: 'bf', label: '% Grasso corporeo', current: bf, t3: +(bf - 1.5).toFixed(1), t6: +(bf - 3).toFixed(1), t12: Math.max(15, +(bf - 5).toFixed(1)), unit: '%', better: 'down' });
    else goals.push({ id: 'bf', label: '% Grasso (mantenimento)', current: bf, t3: bf, t6: bf, t12: bf, unit: '%', better: 'maintain' });
  }
  const hrR = parseFloat(latest.hrRest);
  if (hrR) goals.push({ id: 'hrR', label: 'FC riposo', current: hrR, t3: null, t6: hrR - 3, t12: hrR - 5, unit: 'bpm', better: 'down' });
  const hrv = parseFloat(latest.hrv);
  if (hrv) goals.push({ id: 'hrv', label: 'HRV', current: hrv, t3: +(hrv * 1.05).toFixed(0), t6: +(hrv * 1.10).toFixed(0), t12: +(hrv * 1.12).toFixed(0), unit: 'ms', better: 'up', glossKey: 'HRV' });
  if (w) {
    const protTarget = Math.round(w * 1.7);
    goals.push({ id: 'prot', label: 'Proteine target', current: null, t3: protTarget, t6: protTarget, t12: protTarget, unit: 'g/giorno', better: 'info', info: '1.7 g/kg · tracking esterno (MacroFactor)' });
  }
  return goals;
};

// ============ STYLES ============
const APP_STYLE = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif', color: '#fff', backgroundColor: '#0a0a0a' };
const card = { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 16 };
const cardLarge = { ...card, borderRadius: 20, padding: 20 };
const label = { fontSize: FS.xs, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' };
const labelTiny = { fontSize: FS.tiny, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' };
const btnPrimary = { backgroundColor: '#84cc16', color: '#000', borderRadius: 12, padding: 14, fontWeight: 600, fontSize: FS.base, border: 'none', minHeight: 44, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' };
const btnSecondary = { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 12, padding: 14, fontSize: FS.sm, border: 'none', minHeight: 44, cursor: 'pointer' };
const inputStyle = { width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 12, fontSize: FS.sm, color: '#fff', minHeight: 44, boxSizing: 'border-box' };

// ============ TOOLTIP (popup tap-to-open) ============
const InfoButton = ({ glossKey, onClick }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(glossKey); }}
    onMouseDown={(e) => e.preventDefault()}
    onTouchStart={(e) => e.preventDefault()}
    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', padding: 4, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', zIndex: 10 }}
  >
    <Info size={16} />
  </button>
);

const GlossaryModal = ({ termKey, onClose }) => {
  if (!termKey || !GLOSSARY[termKey]) return null;
  const g = GLOSSARY[termKey];
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: 24, maxWidth: 400, width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <h3 style={{ fontSize: FS.lg, fontWeight: 600, color: '#84cc16' }}>{g.title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 0 }}><X size={22} /></button>
        </div>
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.85)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{g.body}</div>
        <button onClick={onClose} style={{ ...btnPrimary, marginTop: 20 }}>Ho capito ✓</button>
      </div>
    </div>
  );
};

// ============ ADJUSTMENT ALERT MODAL ============
const AdjustmentAlertModal = ({ alert, onDismiss }) => {
  if (!alert) return null;
  const color = alert.severity === 'high' ? '#ef4444' : alert.severity === 'warn' ? '#f59e0b' : '#3b82f6';
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ backgroundColor: '#1a1a1a', border: `1px solid ${color}`, borderRadius: 20, padding: 24, maxWidth: 400, width: '100%' }}>
        <div style={{ textAlign: 'center', fontSize: '40px', marginBottom: 8 }}>{alert.icon}</div>
        <h3 style={{ fontSize: FS.xl, fontWeight: 600, textAlign: 'center', marginBottom: 12, color }}>{alert.title}</h3>
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.85)', whiteSpace: 'pre-line', lineHeight: 1.6, marginBottom: 20 }}>{alert.body}</div>
        <button onClick={() => onDismiss(alert.id)} style={{ ...btnPrimary, backgroundColor: color, color: '#fff' }}>OK, ho capito</button>
      </div>
    </div>
  );
};

// ============ MAIN ============
function LongevityAppV4() {
  const [tab, setTab] = useState('home');
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [history, setHistory] = useState({ workouts: [] });
  const [measurements, setMeasurements] = useState([]);
  const [dailyLogs, setDailyLogs] = useState({});
  const [dismissedAlerts, setDismissedAlerts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [glossOpen, setGlossOpen] = useState(null);
  const [activeAlert, setActiveAlert] = useState(null);

  useEffect(() => {
    (async () => {
      const p = await storage.get('profile', DEFAULT_PROFILE);
      const h = await storage.get('history', { workouts: [] });
      const m = await storage.get('measurements', []);
      const d = await storage.get('dailyLogs', {});
      const da = await storage.get('dismissedAlerts', []);
      setProfile(p); setHistory(h); setMeasurements(m); setDailyLogs(d); setDismissedAlerts(da); setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    let wakeLock = null;
    if (currentTask) {
      (async () => { try { if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen'); } catch (e) {} })();
    }
    return () => { if (wakeLock) try { wakeLock.release(); } catch (e) {} };
  }, [currentTask]);

  // Check adjustment alerts on every history/dailyLogs change
  useEffect(() => {
    if (!loaded) return;
    const alerts = checkAdjustments(history, dailyLogs, dismissedAlerts);
    if (alerts.length > 0 && !activeAlert) setActiveAlert(alerts[0]);
  }, [history, dailyLogs, dismissedAlerts, loaded]);

  const saveProfile = async (p) => { setProfile(p); await storage.set('profile', p); };
  const saveHistory = async (h) => { setHistory(h); await storage.set('history', h); };
  const saveMeasurements = async (m) => { setMeasurements(m); await storage.set('measurements', m); };
  const saveDaily = async (d) => { setDailyLogs(d); await storage.set('dailyLogs', d); };

  const dismissAlert = async (id) => {
    const next = [...dismissedAlerts, id];
    setDismissedAlerts(next);
    await storage.set('dismissedAlerts', next);
    setActiveAlert(null);
  };

  const exportData = () => {
    const data = { profile, history, measurements, dailyLogs, exportedAt: new Date().toISOString(), version: 4 };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `longevity-backup-${todayKey()}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  const importData = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.profile) await saveProfile(data.profile);
        if (data.history) await saveHistory(data.history);
        if (data.measurements) await saveMeasurements(data.measurements);
        if (data.dailyLogs) await saveDaily(data.dailyLogs);
        alert('Import completato ✓');
      } catch (err) { alert('Errore: file non valido'); }
    };
    reader.readAsText(file);
  };

  const todayCheckInDone = !!dailyLogs[todayKey()]?.checkIn;
  const health = calcHealthScore(history, measurements, dailyLogs);
  const goals = calcGoals(profile, measurements);
  const streak = calcStreak(history);
  const prs = getPRs(history);

  if (!loaded) return <div style={{ ...APP_STYLE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FS['2xl'] }}>Caricamento...</div>;
  if (currentTask) return (
    <>
      <TaskScreen task={TASKS[currentTask]} history={history} saveHistory={saveHistory} onExit={() => setCurrentTask(null)} onGloss={setGlossOpen} />
      <GlossaryModal termKey={glossOpen} onClose={() => setGlossOpen(null)} />
    </>
  );
  if (showCheckIn) return <CheckInScreen dailyLogs={dailyLogs} saveDaily={saveDaily} onExit={() => setShowCheckIn(false)} />;
  if (showReport) return <ReportScreen profile={profile} history={history} measurements={measurements} dailyLogs={dailyLogs} goals={goals} health={health} streak={streak} prs={prs} onExit={() => setShowReport(false)} />;

  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: 96 }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '24px 16px 0' }}>
        {tab === 'home' && <HomeTab profile={profile} health={health} streak={streak} history={history} todayCheckInDone={todayCheckInDone} onCheckIn={() => setShowCheckIn(true)} onStartTask={(id) => setCurrentTask(id)} onReport={() => setShowReport(true)} onGloss={setGlossOpen} dailyLogs={dailyLogs} />}
        {tab === 'tasks' && <TasksTab history={history} onStart={(id) => setCurrentTask(id)} />}
        {tab === 'goals' && <GoalsTab goals={goals} prs={prs} onGloss={setGlossOpen} />}
        {tab === 'measures' && <MeasuresTab measurements={measurements} saveMeasurements={saveMeasurements} history={history} onGloss={setGlossOpen} />}
        {tab === 'profile' && <ProfileTab profile={profile} saveProfile={saveProfile} onReport={() => setShowReport(true)} onReset={() => setShowReset(true)} onExport={exportData} onImport={importData} onGloss={setGlossOpen} />}
      </div>

      <BottomNav tab={tab} setTab={setTab} />

      <GlossaryModal termKey={glossOpen} onClose={() => setGlossOpen(null)} />
      <AdjustmentAlertModal alert={activeAlert} onDismiss={dismissAlert} />

      {showReset && <ResetModal onConfirm={async () => {
        await storage.delete('profile'); await storage.delete('history'); await storage.delete('measurements'); await storage.delete('dailyLogs'); await storage.delete('dismissedAlerts');
        setProfile(DEFAULT_PROFILE); setHistory({ workouts: [] }); setMeasurements([]); setDailyLogs({}); setDismissedAlerts([]);
        setShowReset(false);
      }} onCancel={() => setShowReset(false)} />}
    </div>
  );
}

const BottomNav = ({ tab, setTab }) => {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'tasks', icon: Dumbbell, label: 'Sessioni' },
    { id: 'goals', icon: Target, label: 'Obiettivi' },
    { id: 'measures', icon: Activity, label: 'Misure' },
    { id: 'profile', icon: User, label: 'Profilo' }
  ];
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.1)', zIndex: 40, paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
        {items.map(it => (
          <button key={it.id} onClick={() => setTab(it.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 12px', minWidth: 60, minHeight: 44, background: 'none', border: 'none', cursor: 'pointer' }}>
            <it.icon size={26} color={tab === it.id ? '#84cc16' : 'rgba(255,255,255,0.5)'} />
            <span style={{ fontSize: FS.tiny, marginTop: 4, color: tab === it.id ? '#84cc16' : 'rgba(255,255,255,0.5)' }}>{it.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============ HOME ============
const HomeTab = ({ profile, health, streak, history, todayCheckInDone, onCheckIn, onStartTask, onReport, onGloss, dailyLogs }) => {
  const wk = weekKey();
  const doneThisWeek = (history.workouts || []).filter(w => weekKey(new Date(w.date)) === wk);
  const STANDARD_TASKS = ['upper', 'zone2', 'movement', 'norwegian', 'lower'];
  const travelEquivalents = { travelStrength: ['upper', 'lower'], travelCardio: ['zone2', 'norwegian'] };
  const coveredSlots = new Set();
  doneThisWeek.forEach(w => {
    if (STANDARD_TASKS.includes(w.taskId)) coveredSlots.add(w.taskId);
    else if (travelEquivalents[w.taskId]) {
      const slot = travelEquivalents[w.taskId].find(s => !coveredSlots.has(s));
      if (slot) coveredSlots.add(slot);
    }
  });
  const totalTasks = STANDARD_TASKS.length;
  const today = todayDayOfWeek();
  const suggestedTaskToday = Object.values(TASKS).filter(t => !t.travel).find(t => t.suggestedDay === today && !doneThisWeek.some(w => w.taskId === t.id));

  const greeting = getGreeting(profile?.name);
  const todayCheckIn = dailyLogs[todayKey()]?.checkIn;
  const ctxMsg = getContextualMessage(streak, coveredSlots.size, totalTasks, todayCheckIn, [], suggestedTaskToday);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ paddingTop: 8 }}>
        <div style={label}>{new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        <h1 style={{ fontSize: FS['3xl'], fontWeight: 300, marginTop: 4 }}>{greeting}</h1>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 10, padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 12, borderLeft: '3px solid #84cc16' }}>
          <div style={{ fontSize: FS.base, flexShrink: 0 }}>{ctxMsg.icon}</div>
          <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{ctxMsg.text}</div>
        </div>
      </header>

      {!todayCheckInDone && (
        <button onClick={onCheckIn} style={{ ...card, backgroundColor: 'rgba(132,204,22,0.1)', borderColor: 'rgba(132,204,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 44, cursor: 'pointer', textAlign: 'left', color: '#fff' }}>
          <div>
            <div style={{ color: '#84cc16', fontWeight: 600, fontSize: FS.base }}>Check-in mattutino</div>
            <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.6)' }}>15 secondi · 3 slider</div>
          </div>
          <ChevronUp size={22} color="#84cc16" style={{ transform: 'rotate(90deg)' }} />
        </button>
      )}

      <div style={{ ...cardLarge, background: 'linear-gradient(135deg, rgba(132,204,22,0.1), transparent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ ...label, display: 'flex', alignItems: 'center', gap: 2 }}>
            Indice salute
            <InfoButton glossKey="HealthScore" onClick={onGloss} />
          </div>
          <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.4)' }}>/ 100</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: 8 }}>
          <div style={{ fontSize: FS['6xl'], fontWeight: 300, letterSpacing: '-0.05em', lineHeight: 1 }}>{health.score ?? '—'}</div>
          {health.score !== null && (
            <div style={{ marginLeft: 12, paddingBottom: 8, fontSize: FS['2xl'] }}>{health.score >= 80 ? '🟢' : health.score >= 60 ? '🟡' : '🔴'}</div>
          )}
        </div>
        {health.components.length > 0 && (
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: `repeat(${health.components.length}, 1fr)`, gap: 8 }}>
            {health.components.map(c => (
              <div key={c.key}>
                <div style={{ ...labelTiny, display: 'flex', alignItems: 'center', gap: 2 }}>
                  {c.key}
                  {c.key === 'HRV' && <InfoButton glossKey="HRV" onClick={onGloss} />}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: FS.base, fontWeight: 600 }}>{Math.round(c.value)}</div>
              </div>
            ))}
          </div>
        )}
        {health.score === null && <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>Completa qualche sessione e check-in per vedere il tuo indice</div>}
      </div>

      {streak > 0 && (
        <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)' }}>
          <Flame size={28} color="#f59e0b" />
          <div>
            <div style={{ fontSize: FS.lg, fontWeight: 600, color: '#fbbf24' }}>{streak} settiman{streak === 1 ? 'a' : 'e'} di fila</div>
            <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.6)' }}>≥3 sessioni/settimana</div>
          </div>
        </div>
      )}

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div style={label}>Questa settimana</div>
          <div style={{ fontSize: FS.sm, color: '#84cc16', fontWeight: 600 }}>{coveredSlots.size}/{totalTasks}</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {STANDARD_TASKS.map(tid => {
            const t = TASKS[tid];
            const done = coveredSlots.has(tid);
            return <div key={tid} style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: done ? t.color : 'rgba(255,255,255,0.1)' }} />;
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {STANDARD_TASKS.map(tid => <div key={tid} style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.5)', textAlign: 'center', flex: 1 }}>{TASKS[tid].icon}</div>)}
        </div>
      </div>

      <div>
        <div style={{ ...label, marginBottom: 8 }}>Oggi suggerito</div>
        {suggestedTaskToday ? (
          <button onClick={() => onStartTask(suggestedTaskToday.id)} style={{ width: '100%', backgroundColor: '#fff', color: '#000', borderRadius: 20, padding: 20, textAlign: 'left', border: 'none', minHeight: 44, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: FS.xs, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.5)' }}>Suggerita per oggi</div>
                <div style={{ fontSize: FS['2xl'], fontWeight: 600, marginTop: 4 }}>{suggestedTaskToday.icon} {suggestedTaskToday.name}</div>
              </div>
              <Play size={32} fill="currentColor" />
            </div>
          </button>
        ) : (
          <div style={cardLarge}>
            <div style={{ fontSize: FS.xl, fontWeight: 300 }}>Riposo o sessione a scelta</div>
            <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Vai su Sessioni per scegliere</div>
          </div>
        )}
      </div>

      <button onClick={onReport} style={btnPrimary}>
        <FileText size={20} /> Genera report per Claude
      </button>
    </div>
  );
};

// ============ TASKS TAB ============
const TasksTab = ({ history, onStart }) => {
  const wk = weekKey();
  const doneThisWeek = (history.workouts || []).filter(w => weekKey(new Date(w.date)) === wk).map(w => w.taskId);
  const standardTasks = Object.values(TASKS).filter(t => !t.travel);
  const travelTasks = Object.values(TASKS).filter(t => t.travel);

  const renderTaskCard = (t) => {
    const done = doneThisWeek.includes(t.id);
    const lastDone = (history.workouts || []).filter(w => w.taskId === t.id).slice(-1)[0];
    return (
      <button key={t.id} onClick={() => onStart(t.id)} style={{ ...cardLarge, width: '100%', textAlign: 'left', minHeight: 44, cursor: 'pointer', color: '#fff', borderColor: done ? t.color : 'rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: FS.xl }}>{t.icon}</span>
              <div style={{ fontSize: FS.xl, fontWeight: 600 }}>{t.name}</div>
              {done && <Check size={20} color={t.color} />}
            </div>
            <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
              {t.travel ? 'Quando sei in viaggio / senza palestra' : `Suggerita: ${DAYS_IT[t.suggestedDay]}`} · {t.type === 'strength' ? `${t.exercises.length} esercizi` : t.type === 'movement' ? 'Mobilità + equilibrio' : t.type === 'travelCardio' ? 'Camminata o Tabata' : `${Math.round(t.structure.reduce((a, p) => a + p.duration, 0) / 60)} min`}
            </div>
            {lastDone && <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Ultima: {new Date(lastDone.date).toLocaleDateString('it-IT')}</div>}
          </div>
          <Play size={24} color={t.color} fill={t.color} />
        </div>
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
      <header style={{ paddingTop: 8 }}>
        <h1 style={{ fontSize: FS['3xl'], fontWeight: 300 }}>Sessioni</h1>
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>5 task/settimana · schedule flessibile</div>
      </header>

      {standardTasks.map(renderTaskCard)}

      <div style={{ marginTop: 8 }}>
        <div style={{ ...label, marginBottom: 8, color: 'rgba(14,165,233,0.7)' }}>✈️ Quando sei in viaggio</div>
        <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.5)', marginBottom: 12, lineHeight: 1.4 }}>
          Sostituiscono una sessione standard equivalente (forza o cardio). Contano per l'aderenza settimanale.
        </div>
      </div>

      {travelTasks.map(renderTaskCard)}
    </div>
  );
};

// ============ TASK ROUTER ============
const TaskScreen = ({ task, history, saveHistory, onExit, onGloss }) => {
  if (task.type === 'strength') return <StrengthSession task={task} history={history} saveHistory={saveHistory} onExit={onExit} onGloss={onGloss} />;
  if (task.type === 'movement') return <MovementSession task={task} history={history} saveHistory={saveHistory} onExit={onExit} />;
  if (task.type === 'travelCardio') return <TravelCardioSession task={task} history={history} saveHistory={saveHistory} onExit={onExit} />;
  return <CardioSession task={task} history={history} saveHistory={saveHistory} onExit={onExit} onGloss={onGloss} />;
};

// ============ STRENGTH (con last perf + RIR + double progression) ============
const StrengthSession = ({ task, history, saveHistory, onExit, onGloss }) => {
  const lastSession = (history.workouts || []).filter(w => w.taskId === task.id).slice(-1)[0];

  const initEx = task.exercises.map((ex, i) => {
    const lastEx = lastSession?.exercises?.find(e => e.name === ex.name);
    const suggestion = suggestNextSession(ex.name, history);
    return {
      name: ex.name, repsRange: ex.repsRange, rir: ex.rir, rest: ex.rest, note: ex.note, type: ex.type,
      lastPerf: lastEx ? { sets: lastEx.sets } : null,
      suggestion,
      sets: Array.from({ length: ex.sets }, (_, j) => ({
        weight: lastEx?.sets?.[j]?.weight || '', reps: lastEx?.sets?.[j]?.reps || '', rir: 2, isPreFilled: !!lastEx
      }))
    };
  });

  const [exercises, setExercises] = useState(initEx);
  const [phase, setPhase] = useState('warmup');
  const [restRemaining, setRestRemaining] = useState(0);
  const [restActive, setRestActive] = useState(false);
  const [sessionFeeling, setSessionFeeling] = useState(5);
  const restRef = useRef(null);

  useEffect(() => {
    if (restActive && restRemaining > 0) restRef.current = setTimeout(() => setRestRemaining(r => r - 1), 1000);
    else if (restActive && restRemaining === 0) { setRestActive(false); alertEnd(); }
    return () => clearTimeout(restRef.current);
  }, [restActive, restRemaining]);

  const updateSet = (ei, si, field, v) => setExercises(p => p.map((ex, i) => i === ei ? { ...ex, sets: ex.sets.map((s, j) => j === si ? { ...s, [field]: v, isPreFilled: false } : s) } : ex));
  const updateEx = (ei, field, v) => setExercises(p => p.map((ex, i) => i === ei ? { ...ex, [field]: v } : ex));
  const startRest = (sec) => { setRestRemaining(sec); setRestActive(true); playBeep(660, 100, 0.3); };
  const skipRest = () => { setRestActive(false); setRestRemaining(0); clearTimeout(restRef.current); };

  const saveSession = async () => {
    const w = { taskId: task.id, date: new Date().toISOString(), name: task.name, exercises: exercises.map(ex => ({ name: ex.name, sets: ex.sets.map(s => ({ weight: s.weight, reps: s.reps, rir: s.rir })) })), feeling: sessionFeeling };
    await saveHistory({ ...history, workouts: [...(history.workouts || []), w] });
    onExit();
  };

  const exTypeLabel = (type) => type === 'time' ? 'sec' : type === 'bodyweight' ? 'BW' : 'kg';

  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: 128 }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={onExit} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, minHeight: 44, minWidth: 44, cursor: 'pointer' }}>← Esci</button>
          <div style={label}>{task.icon}</div>
        </div>
        <h1 style={{ fontSize: FS['2xl'], fontWeight: 300, marginBottom: 4 }}>{task.name}</h1>

        {/* RISCALDAMENTO STRUTTURATO */}
        {phase === 'warmup' && (
          <div style={{ ...cardLarge, backgroundColor: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.3)', marginBottom: 16 }}>
            <div style={{ fontWeight: 600, color: '#fbbf24', fontSize: FS.lg, marginBottom: 12 }}>🔥 Riscaldamento (10 min)</div>
            <ol style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {task.warmup.map((step, i) => (
                <li key={i} style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{step}</li>
              ))}
            </ol>
            <button onClick={() => setPhase('work')} style={{ marginTop: 16, backgroundColor: '#f59e0b', color: '#000', border: 'none', borderRadius: 10, padding: '12px 20px', fontSize: FS.base, fontWeight: 600, minHeight: 44, cursor: 'pointer', width: '100%' }}>Riscaldamento fatto, inizia lavoro →</button>
          </div>
        )}

        {/* LAVORO */}
        {phase === 'work' && exercises.map((ex, ei) => (
          <div key={ei} style={{ ...cardLarge, marginBottom: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <div style={label}>Esercizio {ei + 1}</div>
              <div style={{ fontSize: FS.lg, fontWeight: 600, marginTop: 4 }}>{ex.name}</div>
              <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.5)', marginTop: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                {ex.sets.length} × {ex.repsRange[0]}-{ex.repsRange[1]} reps · RIR {ex.rir}
                <InfoButton glossKey="RIR" onClick={onGloss} />
                {ex.note && <ExerciseNoteButton note={ex.note} />}
              </div>

              {/* SUGGERIMENTO TARGET (Double progression) */}
              {ex.suggestion && (
                <div style={{ marginTop: 10, padding: 10, backgroundColor: 'rgba(132,204,22,0.08)', borderRadius: 8, border: '1px solid rgba(132,204,22,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: FS.xs, color: '#84cc16', fontWeight: 600 }}>
                    🎯 OGGI SUGGERITO
                    <InfoButton glossKey="DoubleProgression" onClick={onGloss} />
                  </div>
                  <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.9)', marginTop: 4 }}>
                    {ex.suggestion.weight !== null ? `${ex.suggestion.weight}${exTypeLabel(ex.type)} × ${ex.suggestion.reps} reps` : `${ex.suggestion.reps} ${ex.type === 'time' ? 'sec' : 'reps'}`}
                  </div>
                  <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{ex.suggestion.msg}</div>
                </div>
              )}

              {/* PRECOMPILAZIONE NOTA */}
              {ex.lastPerf && ex.sets.some(s => s.isPreFilled) && (
                <div style={{ marginTop: 10, padding: 10, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>↓ Valori pre-compilati dall'ultima sessione · sovrascrivili</div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ex.sets.map((s, si) => (
                <div key={si} style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'stretch', gap: 8, marginBottom: 10 }}>
                    <div style={{ fontSize: FS.base, color: '#fff', width: 32, fontWeight: 700, display: 'flex', alignItems: 'center' }}>S{si + 1}</div>
                    {ex.type === 'weighted' && <BigNumberInput value={s.weight} onChange={v => updateSet(ei, si, 'weight', v)} step={1.25} placeholder="0" unit="kg" isPreFilled={s.isPreFilled} />}
                    <BigNumberInput value={s.reps} onChange={v => updateSet(ei, si, 'reps', v)} step={1} placeholder="0" unit={ex.type === 'time' ? 'sec' : 'reps'} isPreFilled={s.isPreFilled} />
                    <button onClick={() => startRest(ex.rest)} style={{ backgroundColor: '#84cc16', color: '#000', border: 'none', borderRadius: 10, padding: '0 16px', fontSize: FS.sm, fontWeight: 700, cursor: 'pointer', minHeight: 50, alignSelf: 'stretch' }}>Rec</button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.5)', width: 32 }}>RIR</div>
                    <div style={{ display: 'flex', gap: 4, flex: 1 }}>
                      {[0, 1, 2, 3, 4].map(n => (
                        <button key={n} onClick={() => updateSet(ei, si, 'rir', n)} style={{ flex: 1, minHeight: 36, borderRadius: 6, border: 'none', cursor: 'pointer', backgroundColor: s.rir === n ? '#84cc16' : 'rgba(255,255,255,0.08)', color: s.rir === n ? '#000' : '#fff', fontSize: FS.sm, fontWeight: 600 }}>{n}</button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {phase === 'work' && <button onClick={() => setPhase('cooldown')} style={{ ...btnSecondary, width: '100%', marginBottom: 12 }}>Vai a cool-down →</button>}

        {/* COOL-DOWN STRUTTURATO */}
        {phase === 'cooldown' && (
          <div style={{ ...cardLarge, backgroundColor: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.3)', marginBottom: 16 }}>
            <div style={{ fontWeight: 600, color: '#60a5fa', fontSize: FS.lg, marginBottom: 12 }}>❄️ Cool-down + Stretching (10 min)</div>
            <ol style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {task.cooldown.map((step, i) => (
                <li key={i} style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{step}</li>
              ))}
            </ol>

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: FS.sm, marginBottom: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 2 }}>Sensazione sessione
                  <InfoButton glossKey="Sensazione" onClick={onGloss} />
                </span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{sessionFeeling}/10</span>
              </div>
              <input type="range" min="1" max="10" value={sessionFeeling} onChange={e => setSessionFeeling(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#84cc16', height: 44 }} />
            </div>

            <button onClick={saveSession} style={{ marginTop: 16, backgroundColor: '#84cc16', color: '#000', border: 'none', borderRadius: 10, padding: '12px 20px', fontSize: FS.base, fontWeight: 600, minHeight: 44, cursor: 'pointer', width: '100%' }}>Chiudi sessione ✓</button>
          </div>
        )}
      </div>

      {/* TIMER RECUPERO */}
      {restActive && (
        <div onClick={skipRest} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: FS.sm, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Recupero</div>
          <div style={{ fontSize: FS['12rem'], fontWeight: 200, letterSpacing: '-0.05em', lineHeight: 1, color: restRemaining <= 5 ? '#ef4444' : '#84cc16' }}>{restRemaining}</div>
          <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>Tap ovunque per saltare</div>
        </div>
      )}
    </div>
  );
};

// ============ BIG NUMBER INPUT (layout verticale, numero grande visibile) ============
const BigNumberInput = ({ value, onChange, step = 1, placeholder, unit, isPreFilled = false }) => {
  const displayVal = (v) => {
    if (!v) return '';
    // Mostra con virgola italiana (sostituisci . con ,)
    return String(v).replace('.', ',');
  };
  const dec = () => onChange(Math.max(0, (parseDecimal(value) - step)).toString());
  const inc = () => onChange(((parseDecimal(value)) + step).toString());
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: isPreFilled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, flex: 1, overflow: 'hidden' }}>
      <input
        type="text"
        inputMode="decimal"
        value={displayVal(value)}
        onChange={e => {
          const v = e.target.value;
          const isValidInput = /^[0-9]*[.,]?[0-9]*$/.test(v);
          if (isValidInput) onChange(v);
        }}
        placeholder={placeholder}
        style={{ width: '100%', backgroundColor: 'transparent', textAlign: 'center', fontSize: FS.numBig, fontWeight: 700, color: isPreFilled ? 'rgba(255,255,255,0.55)' : '#fff', border: 'none', outline: 'none', padding: '10px 4px 2px', minHeight: 50, boxSizing: 'border-box', fontStyle: isPreFilled ? 'italic' : 'normal' }}
      />
      {unit && <div style={{ textAlign: 'center', fontSize: FS.tiny, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: -2, marginBottom: 4 }}>{unit}</div>}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={dec} style={{ flex: 1, padding: 10, color: '#fff', background: 'none', border: 'none', minHeight: 44, fontSize: FS.lg, cursor: 'pointer', fontWeight: 600, borderRight: '1px solid rgba(255,255,255,0.1)' }}>−</button>
        <button onClick={inc} style={{ flex: 1, padding: 10, color: '#fff', background: 'none', border: 'none', minHeight: 44, fontSize: FS.lg, cursor: 'pointer', fontWeight: 600 }}>+</button>
      </div>
    </div>
  );
};

// ============ EXERCISE NOTE BUTTON ============
const ExerciseNoteButton = ({ note }) => {
  const [open, setOpen] = useState(false);
  if (!note) return null;
  return (
    <>
      <button onClick={() => setOpen(true)} style={{ background: 'none', border: 'none', color: '#84cc16', padding: 4, cursor: 'pointer', fontSize: FS.xs, display: 'inline-flex', alignItems: 'center', gap: 4 }}>💡 nota</button>
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: 24, maxWidth: 380, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <h3 style={{ fontSize: FS.lg, fontWeight: 600, color: '#84cc16' }}>Nota esercizio</h3>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 0 }}><X size={22} /></button>
            </div>
            <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.85)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{note}</div>
            <button onClick={() => setOpen(false)} style={{ ...btnPrimary, marginTop: 20 }}>Ho capito ✓</button>
          </div>
        </div>
      )}
    </>
  );
};

// ============ MOVEMENT ============
const MovementSession = ({ task, history, saveHistory, onExit }) => {
  const [notes, setNotes] = useState('');
  const [feeling, setFeeling] = useState(7);
  const saveSession = async () => {
    const w = { taskId: task.id, date: new Date().toISOString(), name: task.name, notes, feeling, type: 'movement' };
    await saveHistory({ ...history, workouts: [...(history.workouts || []), w] });
    onExit();
  };
  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: 48 }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 0' }}>
        <button onClick={onExit} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, marginBottom: 16, minHeight: 44, cursor: 'pointer' }}>← Esci</button>
        <h1 style={{ fontSize: FS['2xl'], fontWeight: 300, marginBottom: 4 }}>{task.icon} {task.name}</h1>
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>60 minuti con il PT</div>

        <div style={{ ...cardLarge, backgroundColor: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.3)', marginBottom: 16 }}>
          <div style={{ fontWeight: 600, color: '#a855f7', fontSize: FS.base, marginBottom: 12 }}>🎯 Focus della sessione</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {task.focus.map((f, i) => <div key={i} style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{f}</div>)}
          </div>
        </div>

        <div style={{ ...card, backgroundColor: 'rgba(132,204,22,0.08)', borderColor: 'rgba(132,204,22,0.2)', marginBottom: 16 }}>
          <div style={{ fontSize: FS.xs, color: '#84cc16', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Tip per il PT</div>
          <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{task.tipForPT}</div>
        </div>

        <div style={{ ...cardLarge, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.sm, marginBottom: 8 }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Sensazione sessione</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{feeling}/10</span>
            </div>
            <input type="range" min="1" max="10" value={feeling} onChange={e => setFeeling(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#a855f7', height: 44 }} />
          </div>
          <div>
            <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Note (esercizi nuovi, sensazioni, focus per la prossima volta)</div>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Es. lavorato su Turkish Get-Up, mobilità anca sinistra ancora limitata..." style={{ ...inputStyle, minHeight: 100, resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
        </div>

        <button onClick={saveSession} style={{ ...btnPrimary, marginTop: 16, backgroundColor: '#a855f7', color: '#fff' }}>Chiudi sessione ✓</button>
      </div>
    </div>
  );
};

// ============ CARDIO ============
const CardioSession = ({ task, history, saveHistory, onExit, onGloss }) => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(task.structure[0].duration);
  const [running, setRunning] = useState(false);
  const [hrAvg, setHrAvg] = useState('');
  const [feeling, setFeeling] = useState(5);
  const tickRef = useRef(null);
  const currentPhase = task.structure[phaseIdx];

  useEffect(() => {
    if (running && secondsLeft > 0) tickRef.current = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    else if (running && secondsLeft === 0) {
      if (phaseIdx < task.structure.length - 1) {
        const ni = phaseIdx + 1; const next = task.structure[ni];
        if (next.intense) alertIntense(); else alertEnd();
        setPhaseIdx(ni); setSecondsLeft(next.duration);
      } else { alertEnd(); setRunning(false); }
    }
    return () => clearTimeout(tickRef.current);
  }, [running, secondsLeft, phaseIdx]);

  const saveSession = async () => {
    const w = { taskId: task.id, date: new Date().toISOString(), name: task.name, hrAvg, feeling, type: task.type };
    await saveHistory({ ...history, workouts: [...(history.workouts || []), w] });
    onExit();
  };

  const total = task.structure.reduce((a, p) => a + p.duration, 0);
  const elapsed = task.structure.slice(0, phaseIdx).reduce((a, p) => a + p.duration, 0) + (currentPhase.duration - secondsLeft);
  const progress = (elapsed / total) * 100;

  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 128px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={onExit} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, minHeight: 44, minWidth: 44, cursor: 'pointer' }}>← Esci</button>
          <div style={label}>{task.icon}</div>
        </div>
        <h1 style={{ fontSize: FS['2xl'], fontWeight: 300, display: 'flex', alignItems: 'center', gap: 4 }}>
          {task.name}
          {task.id === 'zone2' && <InfoButton glossKey="Zone2" onClick={onGloss} />}
          {task.id === 'norwegian' && <InfoButton glossKey="Norwegian" onClick={onGloss} />}
        </h1>
        <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Fase {phaseIdx + 1} di {task.structure.length}</div>
        <div style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ height: '100%', backgroundColor: '#84cc16', width: `${progress}%`, transition: 'width 0.3s' }} />
        </div>

        <div style={{ ...cardLarge, marginBottom: 24, textAlign: 'center', padding: 24, backgroundColor: currentPhase.intense ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)', borderColor: currentPhase.intense ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: FS.xs, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12, color: currentPhase.intense ? '#f87171' : 'rgba(255,255,255,0.4)' }}>{currentPhase.phase}</div>
          <div style={{ fontSize: FS['8xl'], fontWeight: 200, letterSpacing: '-0.05em', lineHeight: 1, color: currentPhase.intense ? '#f87171' : '#84cc16' }}>{fmtTime(secondsLeft)}</div>
          <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>{currentPhase.target}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
          <button onClick={() => setRunning(r => !r)} style={{ ...btnPrimary, backgroundColor: running ? 'rgba(255,255,255,0.1)' : '#84cc16', color: running ? '#fff' : '#000', padding: 16 }}>
            {running ? <><Pause size={20} fill="currentColor" /> Pausa</> : <><Play size={20} fill="currentColor" /> Avvia</>}
          </button>
          <button onClick={() => { if (phaseIdx < task.structure.length - 1) { const ni = phaseIdx + 1; setPhaseIdx(ni); setSecondsLeft(task.structure[ni].duration); } }} style={{ ...btnSecondary, padding: 16 }}>Salta fase →</button>
        </div>

        <div style={{ ...cardLarge, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={label}>Dati sessione</div>
          <input type="number" placeholder="FC media (da Apple Watch)" value={hrAvg} onChange={e => setHrAvg(e.target.value)} style={{ ...inputStyle, fontSize: FS.lg }} />
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.xs, marginBottom: 4 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Sensazione</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{feeling}/10</span>
            </div>
            <input type="range" min="1" max="10" value={feeling} onChange={e => setFeeling(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#84cc16', height: 44 }} />
          </div>
        </div>

        <button onClick={saveSession} style={{ ...btnPrimary, marginTop: 16 }}>Chiudi sessione ✓</button>
      </div>
    </div>
  );
};

// ============ TRAVEL CARDIO (scelta A walk / B tabata) ============
const TravelCardioSession = ({ task, history, saveHistory, onExit }) => {
  const [mode, setMode] = useState(null); // 'walk' o 'tabata'
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [hrAvg, setHrAvg] = useState('');
  const [feeling, setFeeling] = useState(5);
  const tickRef = useRef(null);

  // Walk: warm 3min + cammino veloce 25min + cool 2min = 30min, conta come Zone 2
  const walkStructure = [
    { phase: 'Warm-up', duration: 180, target: 'Inizia con passo lento' },
    { phase: 'Cammino veloce', duration: 1500, target: 'FC 60-70% max · puoi parlare con un po\' di fatica' },
    { phase: 'Cool-down', duration: 120, target: 'Rallenta' }
  ];

  // Tabata: warm 3min + 4 round (8 cicli × 30s = 4 min ON, alternati) + cool 2min
  // Versione semplificata Norwegian-like: 4 round di (4 min lavoro ON / 1 min OFF) bodyweight
  // Esercizi suggeriti: burpees, jumping jacks, mountain climbers, squat jumps
  const tabataStructure = [
    { phase: 'Warm-up', duration: 180, target: 'Marcia + circonduzioni' },
    { phase: 'Round 1 - ON (burpees)', duration: 240, target: '85-95% sforzo', intense: true },
    { phase: 'Round 1 - Recovery', duration: 60, target: 'Cammina/respira' },
    { phase: 'Round 2 - ON (jumping jacks)', duration: 240, target: '85-95% sforzo', intense: true },
    { phase: 'Round 2 - Recovery', duration: 60, target: 'Cammina/respira' },
    { phase: 'Round 3 - ON (mountain climbers)', duration: 240, target: '85-95% sforzo', intense: true },
    { phase: 'Round 3 - Recovery', duration: 60, target: 'Cammina/respira' },
    { phase: 'Round 4 - ON (squat jumps)', duration: 240, target: '85-95% sforzo', intense: true },
    { phase: 'Round 4 - Recovery', duration: 60, target: 'Cammina/respira' },
    { phase: 'Cool-down', duration: 180, target: 'Defaticamento + stretching' }
  ];

  const structure = mode === 'walk' ? walkStructure : mode === 'tabata' ? tabataStructure : [];
  const currentPhase = structure[phaseIdx];

  useEffect(() => {
    if (mode && phaseIdx === 0 && secondsLeft === 0) setSecondsLeft(structure[0].duration);
  }, [mode]);

  useEffect(() => {
    if (running && secondsLeft > 0) tickRef.current = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    else if (running && secondsLeft === 0) {
      if (phaseIdx < structure.length - 1) {
        const ni = phaseIdx + 1; const next = structure[ni];
        if (next.intense) alertIntense(); else alertEnd();
        setPhaseIdx(ni); setSecondsLeft(next.duration);
      } else { alertEnd(); setRunning(false); }
    }
    return () => clearTimeout(tickRef.current);
  }, [running, secondsLeft, phaseIdx]);

  const saveSession = async () => {
    // Travel walk conta come zone2, tabata come hiit (per aderenza e report)
    const equivalentType = mode === 'walk' ? 'zone2' : 'hiit';
    const w = { taskId: task.id, date: new Date().toISOString(), name: `${task.name} (${mode === 'walk' ? 'Camminata' : 'Tabata'})`, hrAvg, feeling, type: equivalentType, travel: true, mode };
    await saveHistory({ ...history, workouts: [...(history.workouts || []), w] });
    onExit();
  };

  // SCELTA MODE
  if (!mode) {
    return (
      <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: 48 }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 0' }}>
          <button onClick={onExit} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, marginBottom: 16, minHeight: 44, cursor: 'pointer' }}>← Esci</button>
          <h1 style={{ fontSize: FS['2xl'], fontWeight: 300, marginBottom: 4 }}>{task.icon} {task.name}</h1>
          <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>Scegli il tipo di sessione</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => setMode('walk')} style={{ ...cardLarge, textAlign: 'left', cursor: 'pointer', color: '#fff', border: '1px solid rgba(59,130,246,0.4)', backgroundColor: 'rgba(59,130,246,0.08)' }}>
              <div style={{ fontSize: FS.xl, fontWeight: 600, color: '#60a5fa' }}>🚶 A · Camminata veloce</div>
              <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>30 minuti totali · FC 60-70% max</div>
              <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Equivalente a Zone 2 Cardio</div>
            </button>
            <button onClick={() => setMode('tabata')} style={{ ...cardLarge, textAlign: 'left', cursor: 'pointer', color: '#fff', border: '1px solid rgba(239,68,68,0.4)', backgroundColor: 'rgba(239,68,68,0.08)' }}>
              <div style={{ fontSize: FS.xl, fontWeight: 600, color: '#f87171' }}>🔥 B · Tabata bodyweight</div>
              <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>~28 min · 4 round HIIT (burpees/jacks/climbers/squat jumps)</div>
              <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Equivalente a Norwegian 4x4</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SESSIONE TIMER
  const total = structure.reduce((a, p) => a + p.duration, 0);
  const elapsed = structure.slice(0, phaseIdx).reduce((a, p) => a + p.duration, 0) + (currentPhase ? currentPhase.duration - secondsLeft : 0);
  const progress = total > 0 ? (elapsed / total) * 100 : 0;

  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 128px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={onExit} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, minHeight: 44, minWidth: 44, cursor: 'pointer' }}>← Esci</button>
          <div style={label}>{task.icon}</div>
        </div>
        <h1 style={{ fontSize: FS['2xl'], fontWeight: 300 }}>{mode === 'walk' ? '🚶 Camminata' : '🔥 Tabata'}</h1>
        <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Fase {phaseIdx + 1} di {structure.length}</div>
        <div style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ height: '100%', backgroundColor: '#84cc16', width: `${progress}%`, transition: 'width 0.3s' }} />
        </div>

        {currentPhase && (
          <div style={{ ...cardLarge, marginBottom: 24, textAlign: 'center', padding: 24, backgroundColor: currentPhase.intense ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)', borderColor: currentPhase.intense ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: FS.xs, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12, color: currentPhase.intense ? '#f87171' : 'rgba(255,255,255,0.4)' }}>{currentPhase.phase}</div>
            <div style={{ fontSize: FS['8xl'], fontWeight: 200, letterSpacing: '-0.05em', lineHeight: 1, color: currentPhase.intense ? '#f87171' : '#84cc16' }}>{fmtTime(secondsLeft)}</div>
            <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>{currentPhase.target}</div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
          <button onClick={() => setRunning(r => !r)} style={{ ...btnPrimary, backgroundColor: running ? 'rgba(255,255,255,0.1)' : '#84cc16', color: running ? '#fff' : '#000', padding: 16 }}>
            {running ? <><Pause size={20} fill="currentColor" /> Pausa</> : <><Play size={20} fill="currentColor" /> Avvia</>}
          </button>
          <button onClick={() => { if (phaseIdx < structure.length - 1) { const ni = phaseIdx + 1; setPhaseIdx(ni); setSecondsLeft(structure[ni].duration); } }} style={{ ...btnSecondary, padding: 16 }}>Salta fase →</button>
        </div>

        <div style={{ ...cardLarge, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={label}>Dati sessione</div>
          <input type="number" placeholder="FC media (da Apple Watch)" value={hrAvg} onChange={e => setHrAvg(e.target.value)} style={{ ...inputStyle, fontSize: FS.lg }} />
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.xs, marginBottom: 4 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Sensazione</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{feeling}/10</span>
            </div>
            <input type="range" min="1" max="10" value={feeling} onChange={e => setFeeling(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#84cc16', height: 44 }} />
          </div>
        </div>

        <button onClick={saveSession} style={{ ...btnPrimary, marginTop: 16 }}>Chiudi sessione ✓</button>
      </div>
    </div>
  );
};

// ============ CHECK-IN ============
const CheckInScreen = ({ dailyLogs, saveDaily, onExit }) => {
  const [sleep, setSleep] = useState(7.5);
  const [energy, setEnergy] = useState(7);
  const [soreness, setSoreness] = useState(3);

  const save = async () => {
    const k = todayKey();
    const newLogs = { ...dailyLogs, [k]: { ...(dailyLogs[k] || {}), sleep, checkIn: { sleep, energy, soreness, ts: Date.now() } } };
    await saveDaily(newLogs); onExit();
  };

  const suggestion = () => {
    const score = (energy * 2) - (soreness * 1.5);
    if (score >= 8) return { msg: '✅ Procedi con sessione prevista', color: '#84cc16' };
    if (score >= 0) return { msg: '⚠️ Considera versione light (-20%) o Zone 2', color: '#fbbf24' };
    return { msg: '🛑 Riposo o solo camminata leggera consigliata', color: '#f87171' };
  };

  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: 48 }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 0' }}>
        <button onClick={onExit} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, marginBottom: 16, minHeight: 44, cursor: 'pointer' }}>← Esci</button>
        <h1 style={{ fontSize: FS['3xl'], fontWeight: 300, marginBottom: 4 }}>Check-in</h1>
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>15 secondi · 3 slider</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SliderField label="Ore di sonno" value={sleep} setValue={setSleep} min={3} max={12} step={0.5} suffix="h" />
          <SliderField label="Energia mattutina" value={energy} setValue={setEnergy} min={1} max={10} suffix="/10" />
          <SliderField label="Soreness muscolare" value={soreness} setValue={setSoreness} min={1} max={10} suffix="/10" reverse />
          <div style={{ ...card, color: suggestion().color, marginTop: 8 }}>
            <div style={{ ...labelTiny, marginBottom: 4 }}>Suggerimento</div>
            <div style={{ fontWeight: 600, fontSize: FS.base }}>{suggestion().msg}</div>
          </div>
          <button onClick={save} style={btnPrimary}>Salva check-in ✓</button>
        </div>
      </div>
    </div>
  );
};

const SliderField = ({ label: lbl, value, setValue, min, max, step = 1, suffix = '', reverse = false }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.sm, marginBottom: 8 }}>
      <span style={{ color: 'rgba(255,255,255,0.7)' }}>{lbl}</span>
      <span style={{ color: '#fff', fontWeight: 600, fontSize: FS.lg }}>{value}{suffix}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => setValue(parseFloat(e.target.value))} style={{ width: '100%', accentColor: reverse ? '#f87171' : '#84cc16', height: 44 }} />
  </div>
);

// ============ GOALS + PR ============
const GoalsTab = ({ goals, prs, onGloss }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
    <header style={{ paddingTop: 8 }}>
      <h1 style={{ fontSize: FS['3xl'], fontWeight: 300 }}>Obiettivi</h1>
      <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Target evidence-based</div>
    </header>

    {goals.length === 0 ? (
      <div style={{ ...cardLarge, padding: 24, textAlign: 'center' }}>
        <Target size={40} color="rgba(255,255,255,0.3)" style={{ margin: '0 auto' }} />
        <div style={{ marginTop: 12, color: 'rgba(255,255,255,0.6)', fontSize: FS.base }}>Aggiungi misurazioni per vedere gli obiettivi</div>
      </div>
    ) : goals.map(g => <GoalCard key={g.id} goal={g} onGloss={onGloss} />)}

    {Object.keys(prs).length > 0 && (
      <div style={cardLarge}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Award size={20} color="#fbbf24" />
          <div style={label}>Personal Records</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {Object.entries(prs).map(([lift, pr]) => (
            <div key={lift} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: FS.sm }}>{lift.split('(')[0].trim()}</div>
              <div style={{ fontSize: FS.base, fontWeight: 600, color: '#fbbf24' }}>{pr.weight}kg × {pr.reps}</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const GoalCard = ({ goal, onGloss }) => {
  const cur = typeof goal.current === 'number' ? goal.current : null;
  const t6 = typeof goal.t6 === 'number' ? goal.t6 : null;
  let progress = 0;
  if (cur !== null && t6 !== null && goal.baseline) {
    const baseline = parseFloat(goal.baseline);
    if (goal.better === 'up' && t6 > baseline) progress = Math.max(0, Math.min(100, ((cur - baseline) / (t6 - baseline)) * 100));
    if (goal.better === 'down' && t6 < baseline) progress = Math.max(0, Math.min(100, ((baseline - cur) / (baseline - t6)) * 100));
  }
  return (
    <div style={cardLarge}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ ...label, display: 'flex', alignItems: 'center', gap: 2 }}>
            {goal.label}
            {goal.glossKey && <InfoButton glossKey={goal.glossKey} onClick={onGloss} />}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: FS['2xl'], fontWeight: 600 }}>{goal.current ?? '—'}</span>
            <span style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.4)' }}>{goal.unit}</span>
          </div>
        </div>
      </div>
      {goal.info && <div style={{ fontSize: FS.xs, color: '#84cc16', marginBottom: 8, fontStyle: 'italic' }}>💡 {goal.info}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center', marginBottom: 12 }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 8 }}>
          <div style={{ fontSize: FS.tiny, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>3 mesi</div>
          <div style={{ fontSize: FS.sm, fontWeight: 600, marginTop: 2 }}>{goal.t3 ?? '—'}</div>
        </div>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 8 }}>
          <div style={{ fontSize: FS.tiny, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>6 mesi</div>
          <div style={{ fontSize: FS.sm, fontWeight: 600, marginTop: 2 }}>{goal.t6 ?? '—'}</div>
        </div>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 8 }}>
          <div style={{ fontSize: FS.tiny, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>12 mesi</div>
          <div style={{ fontSize: FS.sm, fontWeight: 600, marginTop: 2 }}>{goal.t12 ?? '—'}</div>
        </div>
      </div>
      {cur !== null && t6 !== null && goal.baseline && (
        <div style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', backgroundColor: '#84cc16', width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
};

// ============ MEASURES ============
const MeasuresTab = ({ measurements, saveMeasurements, history, onGloss }) => {
  const [showNew, setShowNew] = useState(false);
  const [newM, setNewM] = useState({ date: todayKey(), weight: '', bodyFat: '', muscleMassKg: '', vo2max: '', hrRest: '', hrv: '', bpSys: '', bpDia: '' });
  const sorted = (measurements || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  const fields = [
    { key: 'weight', label: 'Peso', unit: 'kg', better: 'maintain' },
    { key: 'bodyFat', label: '% Grasso', unit: '%', better: 'down' },
    { key: 'muscleMassKg', label: 'Massa muscolare', unit: 'kg', better: 'up' },
    { key: 'vo2max', label: 'VO2max', unit: 'ml/kg/min', better: 'up', glossKey: 'VO2max' },
    { key: 'hrRest', label: 'FC riposo', unit: 'bpm', better: 'down' },
    { key: 'hrv', label: 'HRV', unit: 'ms', better: 'up', glossKey: 'HRV' },
    { key: 'bpSys', label: 'Pressione sistolica', unit: 'mmHg', better: 'down' },
    { key: 'bpDia', label: 'Pressione diastolica', unit: 'mmHg', better: 'down' }
  ];

  const calcTrend = (key, better) => {
    const series = sorted.filter(m => m[key]).map(m => parseFloat(m[key]));
    if (series.length < 2) return null;
    const latest = series[0], previous = series[series.length - 1];
    const delta = ((latest - previous) / previous) * 100;
    const positive = better === 'up' ? delta > 0 : better === 'down' ? delta < 0 : Math.abs(delta) < 5;
    return { delta, positive, latest, previous };
  };

  const save = async () => {
    const m = { ...newM };
    Object.keys(m).forEach(k => { if (k !== 'date' && m[k] === '') delete m[k]; });
    if (Object.keys(m).length <= 1) { setShowNew(false); return; }
    await saveMeasurements([...measurements, m]);
    setNewM({ date: todayKey(), weight: '', bodyFat: '', muscleMassKg: '', vo2max: '', hrRest: '', hrv: '', bpSys: '', bpDia: '' });
    setShowNew(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
      <header style={{ paddingTop: 8 }}>
        <h1 style={{ fontSize: FS['3xl'], fontWeight: 300 }}>Misure</h1>
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Trend mensili</div>
      </header>

      <button onClick={() => setShowNew(true)} style={btnPrimary}>+ Aggiungi misurazione</button>

      {showNew && (
        <div style={{ ...cardLarge, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: FS.base, fontWeight: 600 }}>Nuova misurazione</div>
          <input type="date" value={newM.date} onChange={e => setNewM({ ...newM, date: e.target.value })} style={inputStyle} />
          {fields.map(f => (
            <div key={f.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.xs, marginBottom: 4 }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 2 }}>
                  {f.label}
                  {f.glossKey && <InfoButton glossKey={f.glossKey} onClick={onGloss} />}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{f.unit}</span>
              </div>
              <input type="number" inputMode="decimal" value={newM[f.key]} onChange={e => setNewM({ ...newM, [f.key]: e.target.value })} style={inputStyle} placeholder={f.unit === 'ml/kg/min' ? 'da Salute → Cardio Fitness' : 'da Salute o Withings'} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
            <button onClick={() => setShowNew(false)} style={btnSecondary}>Annulla</button>
            <button onClick={save} style={btnPrimary}>Salva</button>
          </div>
        </div>
      )}

      {fields.map(f => {
        const trend = calcTrend(f.key, f.better);
        if (!trend) return null;
        const Icon = Math.abs(trend.delta) < 2 ? Minus : (trend.delta > 0 ? TrendingUp : TrendingDown);
        return (
          <div key={f.key} style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ ...label, display: 'flex', alignItems: 'center', gap: 2 }}>
                  {f.label}
                  {f.glossKey && <InfoButton glossKey={f.glossKey} onClick={onGloss} />}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: FS['2xl'], fontWeight: 600 }}>{trend.latest}</span>
                  <span style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.4)' }}>{f.unit}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: trend.positive ? '#84cc16' : '#f87171' }}>
                <Icon size={18} />
                <span style={{ fontSize: FS.sm, fontWeight: 600 }}>{trend.delta > 0 ? '+' : ''}{trend.delta.toFixed(1)}%</span>
              </div>
            </div>
            <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>Da {trend.previous} → {trend.latest} (su {sorted.filter(m => m[f.key]).length} misurazioni)</div>
          </div>
        );
      })}

      {sorted.length === 0 && (
        <div style={{ ...cardLarge, padding: 24, textAlign: 'center' }}>
          <Activity size={40} color="rgba(255,255,255,0.3)" style={{ margin: '0 auto' }} />
          <div style={{ marginTop: 12, color: 'rgba(255,255,255,0.6)', fontSize: FS.base }}>Nessuna misurazione</div>
        </div>
      )}

      {history.workouts?.length > 0 && (
        <div style={cardLarge}>
          <div style={{ ...label, marginBottom: 12 }}>Ultime sessioni</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {history.workouts.slice().reverse().slice(0, 8).map((w, i) => {
              const t = TASKS[w.taskId];
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div style={{ fontSize: FS.sm }}>{t?.icon} {w.name}</div>
                    <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.4)' }}>{new Date(w.date).toLocaleDateString('it-IT')}</div>
                  </div>
                  <Check size={18} color={t?.color || '#84cc16'} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ============ PROFILE ============
const ProfileTab = ({ profile, saveProfile, onReport, onReset, onExport, onImport, onGloss }) => {
  const [open, setOpen] = useState({ bio: true, supp: false, blood: false });
  const update = (k, v) => saveProfile({ ...profile, [k]: v });
  const proteinTarget = profile.weight ? Math.round(parseFloat(profile.weight) * 1.7) : 0;
  const fileRef = useRef();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
      <header style={{ paddingTop: 8 }}>
        <h1 style={{ fontSize: FS['3xl'], fontWeight: 300 }}>Profilo</h1>
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Dati anagrafici stabili</div>
      </header>

      {proteinTarget > 0 && (
        <div style={{ ...card, backgroundColor: 'rgba(132,204,22,0.08)', borderColor: 'rgba(132,204,22,0.25)' }}>
          <div style={{ fontSize: FS.xs, color: '#84cc16', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Target proteine</div>
          <div style={{ fontSize: FS['2xl'], fontWeight: 600 }}>{proteinTarget} g/giorno</div>
          <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.6)', marginTop: 4, lineHeight: 1.4 }}>1.7 g/kg · evidence-based per sarcopenia prevention. Tracking esterno (MacroFactor) o regola visuale: 1 palmo per pasto × 4 pasti.</div>
        </div>
      )}

      <Section title="Anagrafica" open={open.bio} toggle={() => setOpen(s => ({ ...s, bio: !s.bio }))}>
        <Field label="Nome (per saluto in home)" value={profile.name} unit="" onChange={v => update('name', v)} type="text" placeholder="Il tuo nome" />
        <Field label="Età" value={profile.age} unit="anni" onChange={v => update('age', v)} type="number" />
        <Field label="Peso" value={profile.weight} unit="kg" onChange={v => update('weight', v)} type="number" placeholder="Aggiorna anche in Misure" />
        <Field label="Altezza" value={profile.height} unit="cm" onChange={v => update('height', v)} type="number" />
        <Field label="FC max" value={profile.hrMax} unit="bpm" onChange={v => update('hrMax', v)} type="number" placeholder={profile.age ? `Stima: ${220 - parseInt(profile.age)} (220-età)` : '220-età'} glossKey="FCmax" onGloss={onGloss} />
        <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.5)', marginTop: 4, lineHeight: 1.4, fontStyle: 'italic' }}>
          💡 VO2max, FC riposo, HRV, peso aggiornato e pressione vanno nella tab <strong>Misure</strong> (cambiano nel tempo).
        </div>
      </Section>

      <Section title="Supplementazione" open={open.supp} toggle={() => setOpen(s => ({ ...s, supp: !s.supp }))}>
        <Field label="Omega-3 (EPA+DHA)" value={profile.omega3} unit="mg" onChange={v => update('omega3', v)} type="text" />
        <Field label="Magnesio" value={profile.magnesium} unit="" onChange={v => update('magnesium', v)} type="text" placeholder="forma e dose" />
        <Field label="Creatina" value={profile.creatine} unit="g" onChange={v => update('creatine', v)} type="number" placeholder="3-5g/giorno" />
        <Field label="Vitamina D" value={profile.vitD} unit="UI" onChange={v => update('vitD', v)} type="number" />
        <Field label="Altri" value={profile.otherSupp} unit="" onChange={v => update('otherSupp', v)} type="text" />
      </Section>

      <Section title="Esami sangue" open={open.blood} toggle={() => setOpen(s => ({ ...s, blood: !s.blood }))}>
        {/* Alert esami scaduti */}
        {profile.bloodDate && (() => {
          const monthsAgo = (Date.now() - new Date(profile.bloodDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
          if (monthsAgo > 6) {
            return (
              <div style={{ ...card, backgroundColor: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.3)', marginBottom: 4 }}>
                <div style={{ fontSize: FS.sm, color: '#fbbf24', fontWeight: 600 }}>⚠️ Esami obsoleti</div>
                <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Ultimo esame {Math.round(monthsAgo)} mesi fa. Consigliato controllo periodico ogni 6 mesi a 53 anni.</div>
              </div>
            );
          }
          return null;
        })()}

        <Field label="Data ultimo esame" value={profile.bloodDate} unit="" onChange={v => update('bloodDate', v)} type="date" />
        <BloodField fieldKey="cholTotal" label="Colesterolo totale" value={profile.cholTotal} unit="mg/dL" onChange={v => update('cholTotal', v)} />
        <BloodField fieldKey="ldl" label="LDL" value={profile.ldl} unit="mg/dL" onChange={v => update('ldl', v)} />
        <BloodField fieldKey="hdl" label="HDL" value={profile.hdl} unit="mg/dL" onChange={v => update('hdl', v)} />
        <BloodField fieldKey="trigl" label="Trigliceridi" value={profile.trigl} unit="mg/dL" onChange={v => update('trigl', v)} />
        <BloodField fieldKey="apoB" label="ApoB" value={profile.apoB} unit="mg/dL" onChange={v => update('apoB', v)} />
        <BloodField fieldKey="lpa" label="Lp(a)" value={profile.lpa} unit="nmol/L" onChange={v => update('lpa', v)} />
        <BloodField fieldKey="homocysteine" label="Omocisteina" value={profile.homocysteine} unit="µmol/L" onChange={v => update('homocysteine', v)} />
        <BloodField fieldKey="glucose" label="Glicemia" value={profile.glucose} unit="mg/dL" onChange={v => update('glucose', v)} />
        <BloodField fieldKey="hba1c" label="HbA1c" value={profile.hba1c} unit="%" onChange={v => update('hba1c', v)} />
        <BloodField fieldKey="vitDBlood" label="Vit. D" value={profile.vitDBlood} unit="ng/mL" onChange={v => update('vitDBlood', v)} />
      </Section>

      <button onClick={onReport} style={btnPrimary}>
        <FileText size={20} /> Genera report per Claude
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button onClick={onExport} style={btnSecondary}>
          <Download size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Export JSON
        </button>
        <button onClick={() => fileRef.current?.click()} style={btnSecondary}>
          <Upload size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Import JSON
        </button>
        <input ref={fileRef} type="file" accept="application/json" onChange={e => e.target.files[0] && onImport(e.target.files[0])} style={{ display: 'none' }} />
      </div>

      <button onClick={onReset} style={{ ...btnPrimary, backgroundColor: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
        <RotateCcw size={20} /> Reset dati
      </button>
    </div>
  );
};

const Section = ({ title, open, toggle, children }) => (
  <div style={{ ...cardLarge, padding: 0, overflow: 'hidden' }}>
    <button onClick={toggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, minHeight: 44, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
      <span style={{ fontWeight: 600, fontSize: FS.base }}>{title}</span>
      {open ? <ChevronUp size={22} color="rgba(255,255,255,0.5)" /> : <ChevronDown size={22} color="rgba(255,255,255,0.5)" />}
    </button>
    {open && <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>}
  </div>
);

const Field = ({ label: lbl, value, unit, onChange, type = 'text', placeholder = '', glossKey, onGloss }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.xs, marginBottom: 4 }}>
      <span style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 2 }}>
        {lbl}
        {glossKey && <InfoButton glossKey={glossKey} onClick={onGloss} />}
      </span>
      {unit && <span style={{ color: 'rgba(255,255,255,0.4)' }}>{unit}</span>}
    </div>
    <input type={type} inputMode={type === 'number' ? 'decimal' : 'text'} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
  </div>
);

const BloodField = ({ fieldKey, label: lbl, value, unit, onChange }) => {
  const evaluation = value ? evalMarker(fieldKey, value) : null;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.xs, marginBottom: 4 }}>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>{lbl}</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>{unit}</span>
      </div>
      <div style={{ position: 'relative' }}>
        <input type="number" inputMode="decimal" value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, paddingRight: evaluation ? 36 : 12, borderColor: evaluation ? evaluation.color + '50' : 'rgba(255,255,255,0.1)' }} />
        {evaluation && (
          <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, borderRadius: '50%', backgroundColor: evaluation.color }} />
        )}
      </div>
      {evaluation && (
        <div style={{ fontSize: FS.tiny, color: evaluation.color, marginTop: 4, fontWeight: 500 }}>
          {evaluation.status === 'ok' ? '✓ ' : evaluation.status === 'warn' ? '⚠ ' : '⚠ '}{evaluation.msg}
        </div>
      )}
    </div>
  );
};

// ============ REPORT ============
const ReportScreen = ({ profile, history, measurements, dailyLogs, goals, health, streak, prs, onExit }) => {
  const report = generateReport(profile, history, measurements, dailyLogs, goals, health, streak, prs);
  const copy = async () => {
    try { await navigator.clipboard.writeText(report); alert('Report copiato ✓'); }
    catch (e) { alert('Tieni premuto il testo per copiare'); }
  };
  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: 48 }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={onExit} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, minHeight: 44, cursor: 'pointer' }}>← Esci</button>
          <button onClick={copy} style={{ backgroundColor: '#84cc16', color: '#000', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: FS.sm, fontWeight: 600, minHeight: 44, cursor: 'pointer' }}>Copia ✓</button>
        </div>
        <h1 style={{ fontSize: FS['2xl'], fontWeight: 300, marginBottom: 12, color: '#fff' }}>Report</h1>
        <pre style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, whiteSpace: 'pre-wrap', color: '#fff', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{report}</pre>
      </div>
    </div>
  );
};

const avg = (arr) => arr.length ? arr.reduce((a, b) => a + (parseFloat(b) || 0), 0) / arr.length : 0;
const fmt = (n, d = 1) => n ? n.toFixed(d) : '—';

const generateReport = (profile, history, measurements, dailyLogs, goals, health, streak, prs) => {
  const today = new Date().toLocaleDateString('it-IT');
  const last7 = Array.from({ length: 7 }, (_, i) => daysAgo(i));
  const wk4 = []; for (let i = 0; i < 4; i++) { const d = new Date(); d.setDate(d.getDate() - i * 7); wk4.push(weekKey(d)); }
  const recent = (history.workouts || []).filter(w => wk4.includes(weekKey(new Date(w.date))));
  const checkIns = last7.map(d => dailyLogs[d]?.checkIn).filter(Boolean);
  const proteinTarget = profile.weight ? Math.round(parseFloat(profile.weight) * 1.7) : 0;
  const latest = (measurements || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date))[0] || {};

  let r = `# Report Allenamento - ${today}\n\n`;
  r += `## Profilo\n- Età: ${profile.age || 53} anni · Peso: ${latest.weight || profile.weight || '—'} kg · Altezza: ${profile.height || '—'} cm\n`;
  r += `- FC max: ${profile.hrMax || '—'} · FC riposo: ${latest.hrRest || '—'} · VO2max: ${latest.vo2max || '—'}\n`;
  r += `- Pressione: ${latest.bpSys || '—'}/${latest.bpDia || '—'}\n`;
  r += `- Target proteine: ${proteinTarget || '—'}g/giorno (1.7 g/kg)\n\n`;

  r += `## Indice Salute: ${health.score ?? '—'}/100\n`;
  health.components.forEach(c => { r += `- ${c.key}: ${Math.round(c.value)}/100 (peso ${c.weight}%)\n`; });
  if (streak > 0) r += `\n🔥 **Streak**: ${streak} settiman${streak === 1 ? 'a' : 'e'} di fila con ≥3 sessioni\n`;

  if (latest.date) {
    r += `\n## Misurazioni recenti (${new Date(latest.date).toLocaleDateString('it-IT')})\n`;
    if (latest.weight) r += `- Peso: ${latest.weight} kg\n`;
    if (latest.bodyFat) r += `- % Grasso: ${latest.bodyFat}%\n`;
    if (latest.muscleMassKg) r += `- Massa muscolare: ${latest.muscleMassKg} kg\n`;
    if (latest.vo2max) r += `- VO2max: ${latest.vo2max} ml/kg/min\n`;
    if (latest.hrRest) r += `- FC riposo: ${latest.hrRest} bpm\n`;
    if (latest.hrv) r += `- HRV: ${latest.hrv} ms\n`;
  }

  r += `\n## Obiettivi 6 mesi\n`;
  goals.filter(g => g.id !== 'prot').forEach(g => { r += `- ${g.label}: ${g.current ?? '—'}${g.unit} → ${g.t6 ?? '—'}\n`; });

  r += `\n## Aderenza ultime 4 settimane\n- Sessioni totali: ${recent.length}/20 (${Math.round((recent.length / 20) * 100)}%)\n`;
  Object.values(TASKS).filter(t => !t.travel).forEach(t => {
    const n = recent.filter(w => w.taskId === t.id).length;
    r += `  - ${t.icon} ${t.name}: ${n}/4\n`;
  });
  const travelDone = recent.filter(w => TASKS[w.taskId]?.travel);
  if (travelDone.length > 0) {
    r += `  - ✈️ Sessioni travel: ${travelDone.length} (sostitutive)\n`;
  }

  if (Object.keys(prs).length > 0) {
    r += `\n## Personal Records\n`;
    Object.entries(prs).forEach(([lift, pr]) => { r += `- ${lift}: ${pr.weight}kg × ${pr.reps}\n`; });
  }

  r += `\n## Carichi e progressione (ultime 4 settimane)\n`;
  KEY_LIFTS.forEach(lift => {
    const sessions = recent.filter(w => w.exercises?.some(e => e.name === lift));
    if (sessions.length === 0) return;
    r += `### ${lift}\n`;
    sessions.forEach(s => {
      const ex = s.exercises.find(e => e.name === lift);
      const maxL = Math.max(...(ex.sets || []).map(st => parseDecimal(st.weight)));
      const avgRir = avg((ex.sets || []).map(st => st.rir).filter(v => v !== undefined && v !== null));
      const totReps = (ex.sets || []).reduce((a, st) => a + (parseInt(st.reps) || 0), 0);
      r += `- ${new Date(s.date).toLocaleDateString('it-IT')}: max ${maxL}kg · ${totReps} reps · RIR ${avgRir.toFixed(1)} · sens ${s.feeling || '—'}/10\n`;
    });
  });

  const cardio = recent.filter(w => w.type === 'zone2' || w.type === 'hiit');
  if (cardio.length > 0) {
    r += `\n## Cardio\n`;
    cardio.forEach(c => { r += `- ${new Date(c.date).toLocaleDateString('it-IT')} - ${c.name}: FC ${c.hrAvg || '—'} bpm, sens ${c.feeling}/10\n`; });
  }

  const movement = recent.filter(w => w.type === 'movement');
  if (movement.length > 0) {
    r += `\n## Movement Quality (PT)\n`;
    movement.forEach(m => {
      r += `- ${new Date(m.date).toLocaleDateString('it-IT')}: sens ${m.feeling}/10\n`;
      if (m.notes) r += `  Note: ${m.notes}\n`;
    });
  }

  r += `\n## Daily check-in (media 7gg)\n- Sonno: ${fmt(avg(checkIns.map(c => c.sleep)))}h · Energia: ${fmt(avg(checkIns.map(c => c.energy)))}/10 · Soreness: ${fmt(avg(checkIns.map(c => c.soreness)))}/10\n- Check-in compilati: ${checkIns.length}/7\n`;

  if (profile.omega3 || profile.creatine || profile.vitD) {
    r += `\n## Supplementazione\n`;
    if (profile.omega3) r += `- Omega-3: ${profile.omega3}\n`;
    if (profile.magnesium) r += `- Magnesio: ${profile.magnesium}\n`;
    if (profile.creatine) r += `- Creatina: ${profile.creatine}g\n`;
    if (profile.vitD) r += `- Vit D: ${profile.vitD} UI\n`;
  }

  if (profile.cholTotal || profile.ldl) {
    r += `\n## Esami sangue (${profile.bloodDate || 'data n/d'})\n`;
    if (profile.cholTotal) r += `- Colesterolo tot: ${profile.cholTotal}\n`;
    if (profile.ldl) r += `- LDL: ${profile.ldl}\n`;
    if (profile.hdl) r += `- HDL: ${profile.hdl}\n`;
    if (profile.apoB) r += `- ApoB: ${profile.apoB}\n`;
    if (profile.lpa) r += `- Lp(a): ${profile.lpa}\n`;
    if (profile.hba1c) r += `- HbA1c: ${profile.hba1c}%\n`;
  }

  r += `\n## Attività extra del mese (compilare a mano)\n_Aggiungi qui hiking, sci, padel, camminate lunghe, ecc._\n`;
  r += `\n---\nChiedi a Claude un check-up del piano e suggerimenti per progressione.`;
  return r;
};

const ResetModal = ({ onConfirm, onCancel }) => {
  const [step, setStep] = useState(1);
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 24, maxWidth: 360, width: '100%', color: '#fff' }}>
        <AlertCircle size={40} color="#f87171" style={{ margin: '0 auto', display: 'block' }} />
        <h2 style={{ fontSize: FS.xl, fontWeight: 600, textAlign: 'center', marginTop: 12 }}>{step === 1 ? 'Reset di tutti i dati?' : 'Sei davvero sicuro?'}</h2>
        <p style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 8 }}>{step === 1 ? 'Tutti i dati saranno eliminati. Operazione non reversibile.' : 'Conferma definitiva.'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 20 }}>
          <button onClick={onCancel} style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontWeight: 600, fontSize: FS.base, minHeight: 44, cursor: 'pointer' }}>Annulla</button>
          <button onClick={() => step === 1 ? setStep(2) : onConfirm()} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontWeight: 600, fontSize: FS.base, minHeight: 44, cursor: 'pointer' }}>{step === 1 ? 'Continua' : 'Sì, cancella'}</button>
        </div>
      </div>
    </div>
  );
};

// Render
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(LongevityAppV4));
