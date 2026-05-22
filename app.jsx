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
  name: '', birthDate: '', weight: '', height: '',
  hrMax: '',
  supplements: [],
  customGoalTargets: {},
  goalBaselines: {},
  goalTargets: {},
  lastBackupReminder: '',
  cholTotal: '', ldl: '', hdl: '', trigl: '', apoB: '', lpa: '', homocysteine: '', glucose: '', hba1c: '', vitDBlood: '',
  hsCRP: '', insulin: '', homa: '', testTot: '', testFree: '', shbg: '', tsh: '', ft3: '', ferritin: '', egfr: '',
  bloodDate: '', bloodDates: {},
  _migrated_v8: false
};

const MEASURE_KEYS = ['weight', 'bodyFat', 'muscleMassKg', 'visceralFat', 'vo2max', 'hrRest', 'hrv', 'grip', 'bpSys', 'bpDia'];
const BLOOD_FIELDS = [
  { key: 'hsCRP', label: 'hs-CRP', unit: 'mg/L' },
  { key: 'insulin', label: 'Insulina a digiuno', unit: 'µU/mL' },
  { key: 'homa', label: 'HOMA-IR', unit: '' },
  { key: 'cholTotal', label: 'Colesterolo totale', unit: 'mg/dL' },
  { key: 'ldl', label: 'LDL', unit: 'mg/dL' },
  { key: 'hdl', label: 'HDL', unit: 'mg/dL' },
  { key: 'trigl', label: 'Trigliceridi', unit: 'mg/dL' },
  { key: 'apoB', label: 'ApoB', unit: 'mg/dL' },
  { key: 'lpa', label: 'Lp(a)', unit: 'nmol/L' },
  { key: 'glucose', label: 'Glicemia', unit: 'mg/dL' },
  { key: 'hba1c', label: 'HbA1c', unit: '%' },
  { key: 'testTot', label: 'Testosterone totale', unit: 'ng/dL' },
  { key: 'testFree', label: 'Testosterone libero', unit: 'pg/mL' },
  { key: 'shbg', label: 'SHBG', unit: 'nmol/L' },
  { key: 'tsh', label: 'TSH', unit: 'mU/L' },
  { key: 'ft3', label: 'Free T3', unit: 'pg/mL' },
  { key: 'homocysteine', label: 'Omocisteina', unit: 'µmol/L' },
  { key: 'vitDBlood', label: 'Vit. D', unit: 'ng/mL' },
  { key: 'ferritin', label: 'Ferritina', unit: 'ng/mL' },
  { key: 'egfr', label: 'eGFR', unit: 'mL/min/1.73m²' }
];

const emptyMeasurementDraft = () => MEASURE_KEYS.reduce((acc, key) => ({
  ...acc,
  [key]: { value: '', date: todayKey() }
}), {});

const getLatestMeasurementSnapshot = (measurements = []) => {
  const latest = {};
  const latestDates = {};
  const sorted = measurements.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  sorted.forEach(m => {
    if (!m.date) return;
    MEASURE_KEYS.forEach(key => {
      if (m[key] !== undefined && m[key] !== '') {
        latest[key] = m[key];
        latestDates[key] = m.date;
      }
    });
  });
  const dates = Object.values(latestDates).sort((a, b) => new Date(b) - new Date(a));
  return { ...latest, _dates: latestDates, date: dates[0] || '' };
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
  'FCmax stimata': {
    title: 'FCmax stimata da età',
    body: 'Il valore di frequenza cardiaca massima mostrato è una stima ottenuta con la formula 220 - età, perché non hai ancora inserito un hrMax misurato nel tuo profilo. La formula ha un errore standard di ±10-12 bpm, quindi il tuo hrMax reale può essere significativamente diverso. Per dati accurati, misura la tua FC massima reale con un test all-out (es. ramp test su cyclette/tapis roulant sotto supervisione) e aggiornala nel profilo.'
  },
  Zone2: {
    title: 'Zone 2 Cardio',
    body: 'Cardio a bassa intensità: 60-70% FC max (105-125 bpm per te).\n\nDevi poter parlare, ma con un po\' di fatica.\n\nCostruisce base aerobica e densità mitocondriale. Allena il cuore senza stress.'
  },
  Norwegian: {
    title: 'Norwegian 5×4 (VO2max)',
    body: 'Protocollo HIIT ad alta intensità ottimizzato per massimo guadagno VO2max. Basato sugli studi di Wisløff et al. (2007) e Helgerud et al. (2007) sul protocollo 4×4 norvegese, esteso a 5 round per massimizzare lo stimolo single-session quando la frequenza settimanale è bassa (1×/settimana). Struttura: 10 min warm-up @ 60-70% FCmax, 5 round di 4 min @ 85-95% FCmax intervallati da 3 min recovery attivo @ 60-70% FCmax, 5 min cool-down @ 50-60% FCmax. Il tempo cumulativo in zona 85-95% FCmax è il driver principale degli adattamenti VO2max: arrivare a quel range nei primi 60-90 secondi di ogni round è essenziale. Monitorare la FC con cardiofrequenzimetro e mantenere ogni round all\'intensità target è più importante della velocità o della potenza assoluta.'
  },
  Deload: {
    title: 'Deload — Settimana di scarico',
    body: 'Settimana di scarico ogni 5-6 settimane.\n\nStesse reps ma carichi al 60-70% del normale.\n\nPermette super-compensazione e previene infortuni da overuse. Tornerai più forte la settimana successiva.'
  },
  DoubleProgression: {
    title: 'Double Progression',
    body: 'Strategia evidence-based:\n\n1. Fai il bottom del range reps (es. 8 su 8-12)\n2. Sessione dopo sessione, aggiungi reps con stesso carico\n3. Quando raggiungi il top del range con RIR ≥2 (12 reps con RIR 2), aumenta carico di 2.5kg\n4. Riparti dal bottom del range con il nuovo carico\n\nSemplice e funziona.'
  },
  'progressione carichi': {
    title: 'Progressione carichi',
    body: 'Aumento del +5% (min 0,5 kg, max 5 kg, arrotondato a step di 0,5 kg) quando completi tutte le serie al target alto del range reps. Approccio double progression evidence-based.'
  },
  'recovery-aware': {
    title: 'Recovery-aware',
    body: 'Se il check-in mattutino mostra energia<5 o soreness>7, il suggerimento mantiene lo stesso peso ma propone +1 rep invece di aumentare il carico, per evitare progressioni in stato di recupero insufficiente.'
  },
  'qualità sonno': {
    title: 'Qualità del sonno',
    body: 'Oltre alle ore, conta molto come hai dormito: continuità, profondità, sensazione al risveglio. L\'evidenza scientifica mostra che l\'architettura del sonno (fasi REM e profondo) ha impatto maggiore della sola durata. Per questo l\'Indice Salute pesa la qualità al 70% e le ore al 30% nel driver sonno.'
  },
  'grip strength': {
    title: 'Forza di presa (grip strength)',
    body: 'La forza di presa è un biomarker validato dell\'invecchiamento: una riduzione di 1 deviazione standard è associata a +17% di mortalità per ogni causa, indipendentemente da età e sesso. Misurala con un dinamometro: in piedi, braccio lungo il fianco senza toccare il corpo, 3 prove per mano. Registra la media delle 3 prove della mano dominante (o la media delle due mani, mantenendo sempre lo stesso protocollo). Per uomo 50-59 anni: <30kg basso, 38-44kg buono, >50kg ottimo.'
  },
  'composizione corporea': {
    title: 'Composizione corporea',
    body: 'Conta più del peso totale: ciò che importa per la longevità è quanto grasso porti, soprattutto quello viscerale. Il grasso corporeo segue una curva a J — sia troppo (>25% per uomo) sia troppo poco (<8%) aumentano i rischi; l\'ottimale per la longevità è ~14-18% per un uomo 50-59. Il grasso viscerale (quello profondo attorno agli organi) è il più pericoloso: correla con malattie cardiovascolari, diabete e mortalità, quindi più basso è meglio. Entrambi si misurano con la bilancia a bioimpedenza. La massa muscolare viene tracciata separatamente nel pannello misure; la forza muscolare è già catturata dal driver Forza di presa.'
  },
  'suggerimento giorno': {
    title: 'Suggerimento del giorno',
    body: 'L\'app analizza ogni giorno il tuo recovery (energia/soreness), il bilanciamento dei carichi degli ultimi giorni e le sessioni saltate nella settimana, e ti suggerisce la task più adatta. La programmazione settimanale fissa (Upper Lun, Zone2 Mar, ecc.) resta il riferimento di base — il suggerimento la integra solo quando serve.'
  },
  'recovery override': {
    title: 'Recovery override',
    body: 'Se al check-in mattutino energia<5 o soreness>7, l\'app sostituisce eventuali sessioni di forza con Zone2 o Movement per favorire il recupero attivo invece di accumulare fatica.'
  },
  'bilanciamento carico': {
    title: 'Bilanciamento carico',
    body: 'Dopo 2 sessioni di forza in giorni consecutivi, l\'app evita di proporre una terza forza consecutiva per dare ai muscoli il tempo di recupero necessario alla supercompensazione.'
  },
  OggiSuggerito: {
    title: 'Come funziona "Oggi suggerito"',
    body: 'L\'app suggerisce la sessione del giorno basandosi su:\n\n1. Giorno della settimana\n   • Lun → Forza Upper\n   • Mar → Zone 2\n   • Mer → Movement Quality (PT)\n   • Gio → Norwegian 4x4\n   • Ven → Forza Lower\n\n2. Cosa hai già fatto questa settimana\nSe oggi è suggerito "Upper" ma l\'hai già fatto, suggerisce un\'altra task ancora da completare.\n\n3. Recovery (se hai fatto check-in oggi)\nSe energia bassa o soreness alta, suggerisce alternativa più leggera.\n\nPuoi sempre scegliere altro da Sessioni: la schedule è flessibile.'
  },
  Algoritmo: {
    title: 'Come funziona l\'algoritmo',
    body: '1) SUGGERIMENTO GIORNALIERO\nGuarda giorno della settimana, cosa hai già fatto, e recovery dal check-in.\n\n2) SUGGERIMENTO CARICHI (Double Progression)\nPer ogni esercizio, dopo l\'ultima sessione:\n• Top range + RIR≥2 su tutte le serie → +2,5kg, ricomincia bottom range\n• Sotto range o RIR≤0 → -2,5kg\n• Altrimenti → stesso peso, +1 rep\n\n3) ALERT AUTOMATICI\n• Stallo (3 sessioni stesso peso/reps) → cambia variante o deload\n• Recovery basso (5 giorni) → riduci volume\n• Aderenza bassa (2 sett <3 sessioni) → riduci target\n• Deload week (ogni 25 sessioni)\n\n4) CORREZIONI MENSILI\nL\'app NON sostituisce esercizi automaticamente.\nOgni mese: Genera Report → condividi con Claude → review umana → modifiche scheda.'
  },
  HealthScore: {
    title: 'Indice Salute',
    body: 'Un punteggio 0-100 che riflette il tuo stato rispetto ai biomarker più validati scientificamente per la longevità. A differenza di un tracker di attività, non misura quanto ti alleni ma i RISULTATI fisiologici che contano davvero: se ti alleni bene, queste metriche migliorano. I driver: VO2max (peso maggiore, è il predittore #1 di mortalità per ogni causa), HRV e FC a riposo (salute cardiovascolare e autonomica), forza di presa (biomarker dell\'invecchiamento muscolare), e qualità del sonno. Ogni metrica è confrontata con le soglie ottimali per la tua fascia d\'età e sesso, quindi il punteggio resta significativo mentre invecchi. I valori si inseriscono manualmente da Apple Health e bilancia; un\'icona ⚠️ segnala quando un dato è più vecchio di 45 giorni e andrebbe aggiornato.'
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
      { name: 'Hollow body hold (finisher core)', sets: 3, repsRange: [20, 45], rir: 2, rest: 60, type: 'time', note: 'Lombare schiacciata a terra' },
      { name: 'Dead hang (grip + spalle)', sets: 3, repsRange: [20, 60], rir: 2, rest: 60, type: 'time', note: 'Appeso alla sbarra. Forza presa = predittore di longevità. Progressione: aumenta secondi nel tempo.' }
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
    id: 'norwegian', name: 'Norwegian 5×4 (VO2max)', icon: '🔥', type: 'hiit',
    suggestedDay: 4, color: '#ef4444',
    structure: [
      { phase: 'Warm-up', duration: 600, target: '60-70% FC max', bpmRange: [60, 70] },
      { phase: 'Round 1 - ON', duration: 240, target: '85-95% FC max', intense: true, bpmRange: [85, 95] },
      { phase: 'Round 1 - Recovery', duration: 180, target: '60-70% FC max', bpmRange: [60, 70] },
      { phase: 'Round 2 - ON', duration: 240, target: '85-95% FC max', intense: true, bpmRange: [85, 95] },
      { phase: 'Round 2 - Recovery', duration: 180, target: '60-70% FC max', bpmRange: [60, 70] },
      { phase: 'Round 3 - ON', duration: 240, target: '85-95% FC max', intense: true, bpmRange: [85, 95] },
      { phase: 'Round 3 - Recovery', duration: 180, target: '60-70% FC max', bpmRange: [60, 70] },
      { phase: 'Round 4 - ON', duration: 240, target: '85-95% FC max', intense: true, bpmRange: [85, 95] },
      { phase: 'Round 4 - Recovery', duration: 180, target: '60-70% FC max', bpmRange: [60, 70] },
      { phase: 'Round 5 - ON', duration: 240, target: '85-95% FC max', intense: true, bpmRange: [85, 95] },
      { phase: 'Cool-down', duration: 300, target: '50-60% FC max', bpmRange: [50, 60] },
      { phase: 'Stretching (opzionale)', duration: 600, target: 'Allungamento', optional: true }
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
      { name: 'Jump squat (power work)', sets: 3, repsRange: [3, 5], rir: 3, rest: 90, type: 'bodyweight', note: 'Power work iniziale a fibre fresche. Salto controllato, atterraggio morbido. 3-5 reps esplosivi, NO cedimento. Cruciale a 53 anni per fibre fast-twitch.' },
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
  hsCRP: { label: 'hs-CRP', unit: 'mg/L', evalLow: 0, evalHigh: 1.0, optimal: 'Ottimale: <1.0', warn: 'Borderline 1.0-3.0', high: 'Alto: >3.0 (infiammazione sistemica)' },
  insulin: { label: 'Insulina a digiuno', unit: 'µU/mL', evalLow: 0, evalHigh: 8, optimal: 'Ottimale: <8', warn: 'Borderline 8-12', high: 'Alto: >12 (insulino-resistenza)' },
  homa: { label: 'HOMA-IR', unit: '', evalLow: 0, evalHigh: 1.5, optimal: 'Ottimale: <1.5', warn: 'Borderline 1.5-2.5', high: 'Alto: >2.5 (IR conclamata)' },
  ldl: { label: 'LDL', unit: 'mg/dL', evalLow: 0, evalHigh: 100, optimal: 'Ottimale: <100', warn: 'Borderline 100-130', high: 'Alto: >130' },
  apoB: { label: 'ApoB', unit: 'mg/dL', evalLow: 0, evalHigh: 90, optimal: 'Ottimale: <90', warn: 'Borderline 90-110', high: 'Alto: >110' },
  hdl: { label: 'HDL', unit: 'mg/dL', evalLow: 40, evalHigh: Infinity, optimal: 'Buono: >40 (>50 ottimale)', warn: 'Basso: 30-40', high: '' },
  trigl: { label: 'Trigliceridi', unit: 'mg/dL', evalLow: 0, evalHigh: 150, optimal: 'Ottimale: <100', warn: 'Borderline 100-150', high: 'Alto: >150' },
  lpa: { label: 'Lp(a)', unit: 'nmol/L', evalLow: 0, evalHigh: 75, optimal: 'Ottimale: <75', warn: '', high: 'Alto: >75 (rischio CV genetico)' },
  hba1c: { label: 'HbA1c', unit: '%', evalLow: 0, evalHigh: 5.7, optimal: 'Ottimale: <5.7', warn: 'Prediabete: 5.7-6.4', high: 'Diabete: ≥6.5' },
  glucose: { label: 'Glicemia', unit: 'mg/dL', evalLow: 0, evalHigh: 100, optimal: 'Ottimale: <100', warn: 'Borderline 100-125', high: 'Alto: ≥126' },
  vitDBlood: { label: 'Vit. D', unit: 'ng/mL', evalLow: 30, evalHigh: 100, optimal: 'Ottimale: 30-60', warn: 'Insufficiente: 20-30', high: 'Carente: <20' },
  homocysteine: { label: 'Omocisteina', unit: 'µmol/L', evalLow: 0, evalHigh: 10, optimal: 'Ottimale: <10', warn: 'Borderline 10-15', high: 'Alto: >15' },
  testTot: { label: 'Testosterone totale', unit: 'ng/dL', evalLow: 500, evalHigh: 1000, optimal: 'Ottimale: 500-1000', warn: 'Basso: 350-500', high: 'Alto: >1000' },
  testFree: { label: 'Testosterone libero', unit: 'pg/mL', evalLow: 16, evalHigh: 31, optimal: 'Ottimale: 16-31', warn: 'Basso: 10-16', high: 'Alto: >31' },
  shbg: { label: 'SHBG', unit: 'nmol/L', evalLow: 20, evalHigh: 50, optimal: 'Ottimale: 20-50', warn: 'Borderline 50-70', high: 'Alto: >70' },
  tsh: { label: 'TSH', unit: 'mU/L', evalLow: 1.0, evalHigh: 2.5, optimal: 'Ottimale: 1.0-2.5', warn: 'Borderline 2.5-4.5', high: 'Alto: >4.5 (ipotiroidismo)' },
  ft3: { label: 'Free T3', unit: 'pg/mL', evalLow: 3.0, evalHigh: 3.5, optimal: 'Ottimale: 3.0-3.5', warn: 'Borderline 2.3-3.0', high: 'Alto: >4.0' },
  ferritin: { label: 'Ferritina', unit: 'ng/mL', evalLow: 70, evalHigh: 150, optimal: 'Ottimale: 70-150', warn: 'Borderline 30-70 o 150-200', high: 'Alto: >200 (sovraccarico/infiammazione)' },
  egfr: { label: 'eGFR', unit: 'mL/min/1.73m²', evalLow: 90, evalHigh: Infinity, optimal: 'Ottimale: >90', warn: 'Borderline 60-90', high: 'Basso: <60 (funzionalità renale ridotta)' }
};

const evalMarker = (key, value) => {
  const m = BLOOD_MARKERS[key];
  const v = parseDecimal(value);
  if (!m || !v) return null;
  if (key === 'testTot') {
    if (v < 350) return { status: 'high', color: '#f87171', msg: 'Molto basso, considera consulto' };
    if (v < 500) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (v <= 1000) return { status: 'ok', color: '#84cc16', msg: m.optimal };
    return { status: 'warn', color: '#fbbf24', msg: m.high };
  }
  if (key === 'testFree') {
    if (v < 10) return { status: 'high', color: '#f87171', msg: 'Molto basso, considera consulto' };
    if (v < 16) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (v <= 31) return { status: 'ok', color: '#84cc16', msg: m.optimal };
    return { status: 'warn', color: '#fbbf24', msg: m.high };
  }
  if (key === 'ferritin') {
    if (v < 30) return { status: 'high', color: '#f87171', msg: 'Carente: <30' };
    if (v < 70) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (v <= 150) return { status: 'ok', color: '#84cc16', msg: m.optimal };
    if (v <= 200) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    return { status: 'high', color: '#f87171', msg: m.high };
  }
  if (key === 'egfr') {
    if (v < 60) return { status: 'high', color: '#f87171', msg: m.high };
    if (v <= 90) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    return { status: 'ok', color: '#84cc16', msg: m.optimal };
  }
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
    if (key === 'hsCRP' && v <= 3) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (key === 'insulin' && v <= 12) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (key === 'homa' && v <= 2.5) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (key === 'shbg' && v <= 70) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (key === 'tsh' && v <= 4.5) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (key === 'ft3' && v <= 4) return { status: 'warn', color: '#fbbf24', msg: m.high };
    return { status: 'high', color: '#f87171', msg: m.high };
  }
  if (v < m.evalLow) {
    if (key === 'vitDBlood' && v >= 20) return { status: 'warn', color: '#fbbf24', msg: m.warn };
    if (key === 'ft3' && v >= 2.3) return { status: 'warn', color: '#fbbf24', msg: m.warn };
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
const isDecimalInput = (v) => /^-?\d*[.,]?\d*$/.test(String(v));
const displayDecimalInput = (v) => v == null ? '' : String(v).replace('.', ',');
const updateDecimalInput = (value, onChange) => {
  if (isDecimalInput(value)) onChange(value);
};
const fmtNumber = (n, d = 1) => (Number.isInteger(n) ? String(n) : n.toFixed(d)).replace('.', ',');

// Formula Brzycki: 1RM stimato da kg sollevati x reps fatti.
const calc1RM = (weight, reps) => {
  const w = parseDecimal(weight);
  const r = parseInt(reps);
  if (!w || !r || r < 1) return null;
  if (r === 1) return Math.round(w * 10) / 10;
  if (r > 15) return null;
  return Math.round((w / (1.0278 - 0.0278 * r)) * 10) / 10;
};

const calcAge = (birthDate) => {
  if (!birthDate) return null;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

// Curve longevity-optimal: punti di ancoraggio [valore_metrica, score 0-100].
// Score = percentile-per-eta. Interpolazione lineare tra punti.
// Fonti: FRIEND registry + ACSM (vo2max), meta-analisi mortalita (hrRest, hrv), British/China studies (grip).
const HEALTH_CURVES = {
  vo2max: {
    '50-59': [[25, 20], [31, 50], [38, 75], [44, 90], [50, 100]],
    '60-69': [[22, 20], [28, 50], [34, 75], [40, 90], [46, 100]],
    '70+': [[18, 20], [24, 50], [30, 75], [36, 90], [42, 100]]
  },
  hrRest: {
    '50-59': [[48, 100], [55, 85], [62, 65], [70, 45], [80, 20], [85, 0]],
    '60-69': [[50, 100], [57, 85], [64, 65], [72, 45], [82, 20], [87, 0]],
    '70+': [[52, 100], [60, 85], [67, 65], [75, 45], [85, 20], [90, 0]]
  },
  hrv: {
    '50-59': [[15, 15], [30, 45], [45, 65], [60, 82], [80, 100]],
    '60-69': [[12, 15], [25, 45], [38, 65], [52, 82], [70, 100]],
    '70+': [[10, 15], [20, 45], [32, 65], [45, 82], [60, 100]]
  },
  grip: {
    '50-59': [[25, 15], [33, 45], [39, 60], [44, 78], [52, 100]],
    '60-69': [[22, 15], [29, 45], [35, 60], [40, 78], [47, 100]],
    '70+': [[18, 15], [24, 45], [30, 60], [35, 78], [40, 100]]
  },
  bodyFat: {
    '50-59': [[8, 60], [12, 85], [15, 100], [18, 90], [22, 60], [28, 20], [35, 0]],
    '60-69': [[10, 60], [14, 85], [17, 100], [20, 90], [24, 60], [30, 20], [37, 0]],
    '70+': [[11, 60], [15, 85], [18, 100], [22, 90], [26, 60], [32, 20], [38, 0]]
  },
  visceralFat: {
    '50-59': [[2, 100], [6, 90], [10, 65], [13, 40], [16, 20], [20, 0]],
    '60-69': [[2, 100], [7, 90], [11, 65], [14, 40], [17, 20], [20, 0]],
    '70+': [[2, 100], [8, 90], [12, 65], [15, 40], [18, 20], [20, 0]]
  }
};

const getAgeBracket = (birthDate) => {
  const age = calcAge(birthDate);
  if (age === null) return '50-59';
  if (age < 60) return '50-59';
  if (age < 70) return '60-69';
  return '70+';
};

const scoreMetric = (metricKey, value, birthDate) => {
  const bracket = getAgeBracket(birthDate);
  const curve = HEALTH_CURVES[metricKey]?.[bracket];
  if (!curve || value == null || isNaN(value)) return null;

  if (value <= curve[0][0]) return curve[0][1];
  if (value >= curve[curve.length - 1][0]) return curve[curve.length - 1][1];

  for (let i = 0; i < curve.length - 1; i++) {
    const [x0, y0] = curve[i];
    const [x1, y1] = curve[i + 1];
    if (value >= x0 && value <= x1) {
      return y0 + (y1 - y0) * ((value - x0) / (x1 - x0));
    }
  }
  return null;
};

const HEALTH_FRESHNESS_DAYS = { default: 45, sonno: 10 };

const getEffectiveHrMax = (profile) => {
  if (profile?.hrMax && profile.hrMax > 0) return { value: profile.hrMax, estimated: false };
  const age = calcAge(profile?.birthDate);
  if (age !== null) return { value: 220 - age, estimated: true };
  return { value: null, estimated: false };
};

const calcBpmRange = (minPct, maxPct, hrMax) => {
  if (!hrMax) return null;
  return {
    min: Math.round(hrMax * minPct / 100),
    max: Math.round(hrMax * maxPct / 100)
  };
};

const migrateProfile = (old) => {
  if (!old || old._migrated_v8) return old;
  const p = { ...DEFAULT_PROFILE, ...old };
  // age → birthDate
  if (old.age && !p.birthDate) {
    const a = parseInt(old.age);
    if (a > 0 && a < 120) p.birthDate = `${new Date().getFullYear() - a}-01-01`;
  }
  delete p.age;
  // supplementi statici → array
  const suppMap = [
    { key: 'omega3', label: 'Omega-3 (EPA+DHA)' },
    { key: 'magnesium', label: 'Magnesio' },
    { key: 'creatine', label: 'Creatina' },
    { key: 'vitD', label: 'Vitamina D' },
    { key: 'otherSupp', label: 'Altri' }
  ];
  if (!Array.isArray(p.supplements)) p.supplements = [];
  suppMap.forEach(({ key, label }) => {
    if (old[key]) p.supplements.push({ name: label, dose: old[key], freq: 'giornaliero', startDate: '' });
    delete p[key];
  });
  if (!p.customGoalTargets) p.customGoalTargets = {};
  if (!p.goalBaselines) p.goalBaselines = {};
  if (!p.goalTargets) p.goalTargets = {};
  p._migrated_v8 = true;
  return p;
};

const migrateDailyLogs = (logs) => {
  if (!logs || logs._migrated_sleepQuality) return logs;
  const migrated = { ...logs };
  Object.keys(migrated).forEach(dateKey => {
    if (dateKey.startsWith('_')) return;
    const day = migrated[dateKey];
    if (day?.checkIn && day.checkIn.sleepQuality === undefined) {
      migrated[dateKey] = {
        ...day,
        checkIn: { ...day.checkIn, sleepQuality: 7 }
      };
    }
  });
  migrated._migrated_sleepQuality = true;
  return migrated;
};

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
const sameDay = (a, b) => a.getFullYear() === b.getFullYear()
  && a.getMonth() === b.getMonth()
  && a.getDate() === b.getDate();

const suggestTodayTask = (history, dailyLogs, todayCheckin, today) => {
  const now = new Date();
  const workouts = history.workouts || [];
  const doneToday = workouts.filter(w => sameDay(new Date(w.date), now));
  const doneThisWeek = workouts.filter(w => weekKey(new Date(w.date)) === weekKey(now));
  const isStrength = (taskId) => ['upper', 'lower', 'norwegian'].includes(taskId);
  const priorityOrder = (taskId) => ({ upper: 1, lower: 1, norwegian: 2, zone2: 3, movement: 4, travelStrength: 5, travelCardio: 5 }[taskId] || 99);
  const isDoneThisWeek = (taskId) => doneThisWeek.some(w => w.taskId === taskId);

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const dayBefore = new Date(now);
  dayBefore.setDate(dayBefore.getDate() - 2);
  const yesterdayStrength = workouts.some(w => sameDay(new Date(w.date), yesterday) && isStrength(w.taskId));
  const dayBeforeStrength = workouts.some(w => sameDay(new Date(w.date), dayBefore) && isStrength(w.taskId));

  const defaultToday = Object.values(TASKS).find(t => !t.travel && t.suggestedDay === today);
  const skipped = Object.values(TASKS)
    .filter(t => !t.travel && t.suggestedDay < today && !isDoneThisWeek(t.id))
    .sort((a, b) => priorityOrder(a.id) - priorityOrder(b.id));

  if (todayCheckin && (todayCheckin.energy < 5 || todayCheckin.soreness > 7)) {
    if (defaultToday && isStrength(defaultToday.id)) {
      const recoveryAlt = TASKS.zone2 || TASKS.movement;
      return { taskId: recoveryAlt.id, reason: 'Recovery basso: Zone2 invece di forza pesante', priority: 'alert' };
    }
  }

  if (yesterdayStrength && dayBeforeStrength && defaultToday && isStrength(defaultToday.id)) {
    return { taskId: 'zone2', reason: '2 sessioni forza consecutive: oggi recovery attivo', priority: 'alert' };
  }

  if (skipped.length > 0) {
    const main = skipped[0];
    const alternatives = today >= 5 ? skipped.slice(1, 3).map(t => t.id) : [];
    return { taskId: main.id, reason: `Recupero ${main.name} saltata`, priority: 'alert', alternatives };
  }

  if (defaultToday && !isDoneThisWeek(defaultToday.id)) {
    return { taskId: defaultToday.id, reason: 'Da programma settimanale', priority: 'regular' };
  }

  return null;
};

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
const roundLoadIncrement = (increment) => Math.round(increment / 0.5) * 0.5;

const calculateNextLoad = (exercise, lastSession, todayCheckin) => {
  const lastExercise = lastSession?.exercises?.find(ex => ex.name === exercise.name);
  const lastSets = (lastExercise?.sets || []).filter(s => s.reps !== undefined && s.reps !== '');
  if (lastSets.length === 0) return null;

  const repsTarget = exercise.repsRange?.[1] ?? exercise.repsRange?.[0];
  if (!repsTarget) return null;

  const lowRecovery = !!todayCheckin && (todayCheckin.energy < 5 || todayCheckin.soreness > 7);
  const hasWeight = lastSets.some(s => parseDecimal(s.weight) > 0);
  const lastWeight = hasWeight ? Math.max(...lastSets.map(s => parseDecimal(s.weight))) : null;
  const lastTarget = Math.max(...lastSets.map(s => parseInt(s.duration ?? s.reps) || 0));
  const allAtTarget = lastSets.every(s => (parseInt(s.duration ?? s.reps) || 0) >= repsTarget);

  if (hasWeight) {
    if (lowRecovery) {
      return {
        suggestedWeight: lastWeight,
        suggestedReps: repsTarget + 1,
        reason: 'recovery-aware: +1 rep invece di +peso'
      };
    }
    if (!allAtTarget) {
      return {
        suggestedWeight: lastWeight,
        suggestedReps: lastTarget,
        reason: 'consolidamento'
      };
    }

    const increment = Math.max(0.5, Math.min(5, roundLoadIncrement(lastWeight * 0.05)));
    return {
      suggestedWeight: +(lastWeight + increment).toFixed(2),
      suggestedReps: repsTarget,
      reason: 'progressione'
    };
  }

  if (lowRecovery) {
    return {
      suggestedWeight: null,
      suggestedReps: lastTarget,
      reason: 'recovery: mantieni'
    };
  }
  if (!allAtTarget) {
    return {
      suggestedWeight: null,
      suggestedReps: lastTarget,
      reason: 'consolidamento'
    };
  }

  return {
    suggestedWeight: null,
    suggestedReps: lastTarget + (exercise.type === 'time' ? 5 : 1),
    reason: 'progressione'
  };
};

const calcCompletionPct = (task, sessionData = {}) => {
  if (task.type === 'strength' || task.id === 'travelStrength') {
    const totalSets = task.exercises?.reduce((sum, ex) => sum + (ex.sets || 3), 0) || 0;
    if (totalSets === 0) return 0;
    const completedSets = (sessionData.exercises || []).reduce((sum, ex) => {
      const taskExercise = task.exercises?.find(tEx => tEx.name === ex.name);
      const repsRange = ex.repsRange || taskExercise?.repsRange;
      const targetReps = repsRange?.[1] ?? repsRange?.[0] ?? 0;
      return sum + (ex.sets || []).filter(s => {
        const actualReps = parseInt(s.reps) || 0;
        return targetReps > 0 && actualReps >= targetReps;
      }).length;
    }, 0);
    return Math.min(1, completedSets / totalSets);
  }

  if (task.id === 'norwegian') {
    return Math.min(1, (sessionData.roundsCompleted || 0) / 5);
  }

  if (task.type === 'cardio' || task.type === 'zone2' || task.type === 'hiit' || task.id === 'travelCardio') {
    const structure = sessionData.structure || task.structure || [];
    const targetSec = structure.reduce((sum, p) => sum + (p.duration || 0), 0);
    if (targetSec === 0) return 0;
    return Math.min(1, (sessionData.elapsedSeconds || 0) / targetSec);
  }

  if (task.type === 'movement') {
    const total = task.checklist?.length || task.focus?.length || 0;
    if (total === 0) return 0;
    return Math.min(1, (sessionData.checklistCompleted || []).length / total);
  }

  return 0;
};

const SESSION_MIN_SECONDS = 300;
const COMPLETION_THRESHOLD = 0.6;

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
const calcHealthScore = (history, measurements, dailyLogs, profile) => {
  const components = [];
  const birthDate = profile?.birthDate;

  const getLatestMetric = (key) => {
    const entries = (measurements || [])
      .filter(m => m[key] != null && m[key] !== '' && !isNaN(parseDecimal(m[key])))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    if (entries.length === 0) return null;
    const latest = entries[0];
    const ageInDays = Math.floor((Date.now() - new Date(latest.date).getTime()) / (1000 * 60 * 60 * 24));
    return { value: parseDecimal(latest[key]), date: latest.date, ageInDays };
  };

  const metricDrivers = [
    { key: 'vo2max', weight: 30 },
    { key: 'hrv', weight: 15 },
    { key: 'hrRest', weight: 15 },
    { key: 'grip', weight: 12 }
  ];

  metricDrivers.forEach(({ key, weight }) => {
    const metric = getLatestMetric(key);
    if (!metric) return;
    const value = scoreMetric(key, metric.value, birthDate);
    if (value === null) return;
    components.push({
      key,
      value,
      weight,
      stale: metric.ageInDays > HEALTH_FRESHNESS_DAYS.default,
      ageInDays: metric.ageInDays
    });
  });

  const bodyFatMetric = getLatestMetric('bodyFat');
  const visceralMetric = getLatestMetric('visceralFat');
  const compSubScores = [];
  let compStale = false;
  let compMaxAge = 0;

  if (bodyFatMetric) {
    const score = scoreMetric('bodyFat', bodyFatMetric.value, birthDate);
    if (score !== null) {
      compSubScores.push(score);
      if (bodyFatMetric.ageInDays > HEALTH_FRESHNESS_DAYS.default) compStale = true;
      compMaxAge = Math.max(compMaxAge, bodyFatMetric.ageInDays);
    }
  }
  if (visceralMetric) {
    const score = scoreMetric('visceralFat', visceralMetric.value, birthDate);
    if (score !== null) {
      compSubScores.push(score);
      if (visceralMetric.ageInDays > HEALTH_FRESHNESS_DAYS.default) compStale = true;
      compMaxAge = Math.max(compMaxAge, visceralMetric.ageInDays);
    }
  }
  if (compSubScores.length > 0) {
    const compValue = compSubScores.reduce((a, b) => a + b, 0) / compSubScores.length;
    components.push({ key: 'composizione', value: compValue, weight: 20, stale: compStale, ageInDays: compMaxAge });
  }

  const last7 = Array.from({ length: 7 }, (_, i) => daysAgo(i));
  const sleepData = last7
    .map(d => ({
      hours: dailyLogs[d]?.sleep || 0,
      quality: dailyLogs[d]?.checkIn?.sleepQuality
    }))
    .filter(s => s.hours > 0);
  if (sleepData.length >= 3) {
    const avgHours = sleepData.reduce((a, b) => a + b.hours, 0) / sleepData.length;
    const hoursScore = Math.max(0, Math.min(100, ((avgHours - 5.5) / 2) * 100));
    const qualityValues = sleepData.map(s => s.quality).filter(q => q !== undefined && q !== null);
    const avgQuality = qualityValues.length > 0
      ? qualityValues.reduce((a, b) => a + b, 0) / qualityValues.length
      : 7;
    const qualityScore = ((avgQuality - 1) / 9) * 100;
    const sleepDriverScore = hoursScore * 0.3 + qualityScore * 0.7;
    components.push({ key: 'sonno', value: sleepDriverScore, weight: 8, stale: false });
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
    let max1RM = 0, maxData = null;
    all.forEach(w => {
      const ex = w.exercises.find(e => e.name === lift);
      (ex.sets || []).forEach(s => {
        const oneRM = calc1RM(s.weight, s.reps);
        if (oneRM && oneRM > max1RM) {
          max1RM = oneRM;
          maxData = { weight: parseDecimal(s.weight), reps: parseInt(s.reps), oneRM, date: w.date };
        }
      });
    });
    if (maxData) prs[lift] = maxData;
  });
  return prs;
};

const checkNewPR = (history, justSavedWorkout) => {
  if (!justSavedWorkout?.exercises) return null;
  const previousHistory = {
    workouts: (history.workouts || []).filter(w => w !== justSavedWorkout && w.date !== justSavedWorkout.date)
  };
  const previousPRs = getPRs(previousHistory);
  let bestNew = null;

  KEY_LIFTS.forEach(lift => {
    const ex = justSavedWorkout.exercises.find(e => e.name === lift);
    if (!ex) return;
    (ex.sets || []).forEach(s => {
      const oneRM = calc1RM(s.weight, s.reps);
      if (!oneRM) return;
      const previous = previousPRs[lift]?.oneRM;
      if (!previous) return;
      if (oneRM > previous + 0.5 && (!bestNew || oneRM > bestNew.oneRM)) {
        bestNew = { lift, oneRM, weight: parseDecimal(s.weight), reps: parseInt(s.reps) };
      }
    });
  });

  return bestNew;
};

const getPRTrend = (history, lift) => {
  return (history.workouts || [])
    .filter(w => w.exercises?.some(e => e.name === lift))
    .map(w => {
      const ex = w.exercises.find(e => e.name === lift);
      const best = Math.max(0, ...(ex.sets || []).map(s => calc1RM(s.weight, s.reps) || 0));
      return best ? { date: w.date, oneRM: best } : null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

// ============ GOALS ============
const GOAL_CUSTOM_ALIASES = {
  vo2max: 'vo2',
  muscleMassKg: 'mm',
  bodyFat: 'bf',
  hrRest: 'hrR'
};

const computeTargetsFromBaseline = (key, baseValue, baselineDate) => {
  if (key === 'vo2max') return {
    t3: +(baseValue * 1.05).toFixed(1),
    t6: +(baseValue * 1.11).toFixed(1),
    t12: +(baseValue * 1.165).toFixed(1),
    baselineDate
  };
  if (key === 'muscleMassKg') return {
    t3: null,
    t6: +(baseValue + 1.5).toFixed(1),
    t12: +(baseValue + 2.75).toFixed(1),
    baselineDate
  };
  if (key === 'bodyFat') {
    if (baseValue > 20) return {
      t3: +(baseValue - 1.5).toFixed(1),
      t6: +(baseValue - 3).toFixed(1),
      t12: Math.max(15, +(baseValue - 5).toFixed(1)),
      baselineDate
    };
    return { t3: baseValue, t6: baseValue, t12: baseValue, baselineDate };
  }
  if (key === 'hrRest') return { t3: null, t6: baseValue - 3, t12: baseValue - 5, baselineDate };
  if (key === 'hrv') return {
    t3: +(baseValue * 1.05).toFixed(0),
    t6: +(baseValue * 1.10).toFixed(0),
    t12: +(baseValue * 1.12).toFixed(0),
    baselineDate
  };
  return null;
};

const lockGoalIfNeeded = (profile, measurements, saveProfile) => {
  const sortedM = (measurements || []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  if (sortedM.length === 0) return profile;
  const baselines = { ...(profile.goalBaselines || {}) };
  const targets = { ...(profile.goalTargets || {}) };
  let changed = false;
  const metricsToLock = ['vo2max', 'muscleMassKg', 'bodyFat', 'hrRest', 'hrv', 'weight'];

  metricsToLock.forEach(key => {
    const firstWithKey = sortedM.find(m => m[key] !== undefined && m[key] !== '' && m[key] !== null);
    if (!firstWithKey) return;
    const newBaseValue = parseDecimal(firstWithKey[key]);
    if (!newBaseValue) return;
    const existingBaseline = baselines[key];
    const shouldLock = !existingBaseline;
    const shouldReassess = existingBaseline && new Date(firstWithKey.date) < new Date(existingBaseline.date);
    if (!shouldLock && !shouldReassess) return;

    baselines[key] = { value: newBaseValue, date: firstWithKey.date };
    const nextTargets = computeTargetsFromBaseline(key, newBaseValue, firstWithKey.date);
    if (nextTargets && (shouldReassess || !targets[key])) {
      targets[key] = nextTargets;
    }
    changed = true;
  });

  if (changed) {
    const newProfile = { ...profile, goalBaselines: baselines, goalTargets: targets };
    saveProfile(newProfile);
    return newProfile;
  }
  return profile;
};

const calcExpectedNow = (baselineValue, baselineDate, targetValue, monthsTotal) => {
  if (!baselineValue || !targetValue || !baselineDate) return null;
  const now = new Date();
  const base = new Date(baselineDate);
  const monthsElapsed = (now - base) / (1000 * 60 * 60 * 24 * 30.44);
  if (monthsElapsed < 0) return baselineValue;
  if (monthsElapsed >= monthsTotal) return targetValue;
  const progress = monthsElapsed / monthsTotal;
  return baselineValue + (targetValue - baselineValue) * progress;
};

const paceLabel = (current, expectedNow, better) => {
  if (current === null || current === undefined || expectedNow === null || expectedNow === undefined) {
    return { icon: '', text: '', color: 'rgba(255,255,255,0.5)', status: 'unknown', pct: null };
  }
  const delta = current - expectedNow;
  const directionalDelta = better === 'up' ? delta : (better === 'down' ? -delta : Math.abs(delta));
  const pct = Math.abs(directionalDelta) / Math.abs(expectedNow) * 100;
  const pctStr = pct.toFixed(1);
  if (pct < 1) return { icon: '🟢', text: `In traiettoria ±${pctStr}%`, color: '#10b981', status: 'on-track', pct };
  if (directionalDelta > 0) return { icon: '🟢', text: `Avanti sul pace +${pctStr}%`, color: '#10b981', status: 'ahead', pct };
  return { icon: '🟡', text: `Indietro sul pace -${pctStr}%`, color: '#f59e0b', status: 'behind', pct };
};

const calcGoals = (profile, measurements) => {
  const latest = getLatestMeasurementSnapshot(measurements);
  const baselines = profile?.goalBaselines || {};
  const targets = profile?.goalTargets || {};
  const customTargets = profile?.customGoalTargets || {};

  const buildGoal = (key, label, unit, better, glossKey) => {
    const current = parseDecimal(latest[key]);
    if (!current && !baselines[key]) return null;
    const baseline = baselines[key];
    const customTarget = customTargets[key] || customTargets[GOAL_CUSTOM_ALIASES[key]];
    const t = customTarget || targets[key];
    if (!t) return null;
    const expectedNow = baseline && t.t6 ? calcExpectedNow(baseline.value, baseline.date, t.t6, 6) : null;
    const pace = paceLabel(current || null, expectedNow, better);

    return {
      id: key,
      label,
      current,
      baseline: baseline?.value,
      baselineDate: baseline?.date,
      t3: t.t3,
      t6: t.t6,
      t12: t.t12,
      unit,
      better,
      glossKey,
      isCustom: !!customTarget,
      expectedNow,
      pace: pace.status === 'unknown' ? null : pace,
      pacePct: pace.pct
    };
  };

  return [
    buildGoal('vo2max', 'VO2max', 'ml/kg/min', 'up', 'VO2max'),
    buildGoal('muscleMassKg', 'Massa muscolare', 'kg', 'up', null),
    buildGoal('bodyFat', '% Grasso corporeo', '%', 'down', null),
    buildGoal('hrRest', 'FC riposo', 'bpm', 'down', null),
    buildGoal('hrv', 'HRV', 'ms', 'up', 'HRV')
  ].filter(Boolean);
};

// ============ STYLES ============
const FONT_MONO = '"JetBrains Mono", "SF Mono", Consolas, monospace';
const COLORS = {
  primary: '#84cc16', forza: '#84cc16', cardio: '#3b82f6', movement: '#a855f7',
  recovery: '#f59e0b', alert: '#ef4444', success: '#10b981',
};
const APP_STYLE = { fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif', color: '#fff', backgroundColor: '#0a0a0a' };
const card = { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 16 };
const cardLarge = { ...card, borderRadius: 20, padding: 20 };
const label = { fontSize: FS.xs, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' };
const labelTiny = { fontSize: FS.tiny, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' };
const btnPrimary = { backgroundColor: '#84cc16', color: '#000', borderRadius: 12, padding: 14, fontWeight: 600, fontSize: FS.base, border: 'none', minHeight: 44, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' };
const btnSecondary = { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 12, padding: 14, fontSize: FS.sm, border: 'none', minHeight: 44, cursor: 'pointer' };
const inputStyle = { width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 12, fontSize: FS.sm, color: '#fff', minHeight: 44, boxSizing: 'border-box' };
const compactDateInputStyle = { ...inputStyle, minWidth: 0, maxWidth: '100%', padding: '10px 8px', fontSize: FS.sm, WebkitAppearance: 'none' };
const modalOverlayStyle = { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.84)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom))', boxSizing: 'border-box', overflowY: 'auto' };
const modalPanelStyle = { backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: 24, width: '100%', maxWidth: 400, maxHeight: 'calc(100vh - 32px - env(safe-area-inset-top) - env(safe-area-inset-bottom))', overflowY: 'auto', WebkitOverflowScrolling: 'touch', boxSizing: 'border-box' };
const sessionInstructionStyle = { fontSize: FS.base, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5 };
const pageTopPadding = 'calc(24px + env(safe-area-inset-top))';
const screenTopPadding = 'calc(18px + env(safe-area-inset-top))';
const pageBottomPadding = 'calc(132px + env(safe-area-inset-bottom))';
const screenBottomPadding = 'calc(64px + env(safe-area-inset-bottom))';

// ============ HAPTIC + PRESS ============
const haptic = (type = 'light') => {
  try { if (window.navigator.vibrate) window.navigator.vibrate(type === 'light' ? 10 : 30); } catch (e) {}
};

const TouchablePress = ({ children, onClick, style, ...rest }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{ ...style, transform: pressed ? 'scale(0.96)' : 'scale(1)', transition: 'transform 100ms ease-out', cursor: 'pointer' }}
      {...rest}
    >{children}</button>
  );
};

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

const HrRangeDisplay = ({ minPct, maxPct, label: rangeLabel, profile, onGloss, compact }) => {
  const { value: hrMax, estimated } = getEffectiveHrMax(profile);
  const bpm = calcBpmRange(minPct, maxPct, hrMax);

  return (
    <div style={{ fontSize: compact ? 13 : 14, color: '#fff' }}>
      {rangeLabel && <span style={{ fontWeight: 600 }}>{rangeLabel}: </span>}
      <span>{minPct}-{maxPct}% FCmax</span>
      {bpm && (
        <>
          <span> → </span>
          <span style={{ fontWeight: 600 }}>{bpm.min}-{bpm.max} bpm</span>
          {estimated && <InfoButton glossKey="FCmax stimata" onClick={onGloss} />}
        </>
      )}
    </div>
  );
};

const GlossaryModal = ({ termKey, onClose }) => {
  if (!termKey || !GLOSSARY[termKey]) return null;
  const g = GLOSSARY[termKey];
  return (
    <div onClick={onClose} style={modalOverlayStyle}>
      <div onClick={e => e.stopPropagation()} style={modalPanelStyle}>
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

const PRCelebrationModal = ({ pr, onExit }) => {
  useEffect(() => {
    if (pr) vibrate(200);
  }, [pr]);

  if (!pr) return null;
  return (
    <div style={{ ...modalOverlayStyle, backgroundColor: 'rgba(0,0,0,0.88)', zIndex: 120 }}>
      <div style={{ ...modalPanelStyle, backgroundColor: '#141414', border: `1px solid ${COLORS.success}`, maxWidth: 380, textAlign: 'center', boxShadow: '0 20px 80px rgba(16,185,129,0.18)' }}>
        <div style={{ fontSize: 60, lineHeight: 1, marginBottom: 12 }}>🏆</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: COLORS.success, marginBottom: 12 }}>NUOVO PERSONAL RECORD!</h3>
        <div style={{ fontSize: FS.base, color: '#fff', fontWeight: 600, marginBottom: 14 }}>{pr.lift}</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: FS['2xl'], fontWeight: 700, color: '#fff', marginBottom: 8 }}>{pr.weight}kg × {pr.reps} reps</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: FS.lg, color: COLORS.success, fontWeight: 700, marginBottom: 22 }}>1RM stimato: {pr.oneRM}kg</div>
        <TouchablePress onClick={onExit} style={{ ...btnPrimary, backgroundColor: COLORS.success }}>Avanti 💪</TouchablePress>
      </div>
    </div>
  );
};

// ============ ADJUSTMENT ALERT MODAL ============
const AdjustmentAlertModal = ({ alert, onDismiss }) => {
  if (!alert) return null;
  const color = alert.severity === 'high' ? '#ef4444' : alert.severity === 'warn' ? '#f59e0b' : '#3b82f6';
  return (
    <div style={modalOverlayStyle}>
      <div style={{ ...modalPanelStyle, border: `1px solid ${color}` }}>
        <div style={{ textAlign: 'center', fontSize: '40px', marginBottom: 8 }}>{alert.icon}</div>
        <h3 style={{ fontSize: FS.xl, fontWeight: 600, textAlign: 'center', marginBottom: 12, color }}>{alert.title}</h3>
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.85)', whiteSpace: 'pre-line', lineHeight: 1.6, marginBottom: 20 }}>{alert.body}</div>
        <button onClick={() => onDismiss(alert.id)} style={{ ...btnPrimary, backgroundColor: color, color: '#fff' }}>OK, ho capito</button>
      </div>
    </div>
  );
};

const ConfirmModal = ({ title, body, confirmLabel, cancelLabel, extraLabel, onConfirm, onCancel, onExtra }) => (
  <div onClick={onCancel} style={modalOverlayStyle}>
    <div onClick={e => e.stopPropagation()} style={{ ...modalPanelStyle, maxWidth: 360 }}>
      <h3 style={{ fontSize: FS.lg, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{title}</h3>
      <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 18 }}>{body}</div>
      <div style={{ display: 'grid', gridTemplateColumns: extraLabel ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
        {extraLabel && <button onClick={onExtra} style={{ ...btnSecondary, padding: 12 }}>{extraLabel}</button>}
        <button onClick={onCancel} style={{ ...btnSecondary, padding: 12 }}>{cancelLabel}</button>
        <TouchablePress onClick={onConfirm} style={{ ...btnPrimary, padding: 12 }}>{confirmLabel}</TouchablePress>
      </div>
    </div>
  </div>
);

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
      const raw = await storage.get('profile', DEFAULT_PROFILE);
      const p = migrateProfile(raw);
      if (p !== raw) await storage.set('profile', p);
      const h = await storage.get('history', { workouts: [] });
      const m = await storage.get('measurements', []);
      const d = await storage.get('dailyLogs', {});
      const dMigrated = migrateDailyLogs(d);
      if (dMigrated !== d) await storage.set('dailyLogs', dMigrated);
      const da = await storage.get('dismissedAlerts', []);
      const lockedProfile = lockGoalIfNeeded(p, m, async (np) => {
        await storage.set('profile', np);
      });
      const lastSnapshotDate = await storage.get('autoSnapshotDate', '');
      const todayStr = todayKey();
      if (lastSnapshotDate !== todayStr) {
        const dailySnapshot = { profile: lockedProfile, history: h, measurements: m, dailyLogs: dMigrated, snapshotAt: new Date().toISOString() };
        await storage.set('snapshot_yesterday', dailySnapshot);
        await storage.set('autoSnapshotDate', todayStr);
      }
      setProfile(lockedProfile); setHistory(h); setMeasurements(m); setDailyLogs(dMigrated); setDismissedAlerts(da); setLoaded(true);
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
    if (alerts.length > 0 && !activeAlert) { setActiveAlert(alerts[0]); return; }
    const today = new Date();
    if (today.getDate() === 1) {
      const monthKey = `${today.getFullYear()}-${today.getMonth() + 1}`;
      const lastReminder = profile?.lastBackupReminder || '';
      if (lastReminder !== monthKey && !activeAlert) {
        setActiveAlert({
          id: `backup-${monthKey}`,
          severity: 'info',
          icon: '📦',
          title: 'Backup mensile suggerito',
          body: 'È il primo del mese: salva un backup dei tuoi dati.\n\nApri Profilo → "Export JSON" e salva il file in iCloud Drive o email.\n\nProtegge i tuoi dati da reset Safari o cambio iPhone.',
          isBackupReminder: true
        });
      }
    }
  }, [history, dailyLogs, dismissedAlerts, loaded, profile]);

  const saveProfile = async (p) => { setProfile(p); await storage.set('profile', p); };
  const saveHistory = async (h) => { setHistory(h); await storage.set('history', h); };
  const saveMeasurements = async (m) => {
    setMeasurements(m);
    await storage.set('measurements', m);
    const profileToLock = await storage.get('profile', profile);
    lockGoalIfNeeded(profileToLock, m, async (np) => {
      setProfile(np);
      await storage.set('profile', np);
    });
  };
  const saveDaily = async (d) => { setDailyLogs(d); await storage.set('dailyLogs', d); };

  const dismissAlert = async (id) => {
    if (id.startsWith('backup-')) {
      const monthKey = id.replace('backup-', '');
      const newProfile = { ...profile, lastBackupReminder: monthKey };
      setProfile(newProfile);
      await storage.set('profile', newProfile);
    } else {
      const next = [...dismissedAlerts, id];
      setDismissedAlerts(next);
      await storage.set('dismissedAlerts', next);
    }
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
  const todayCheckin = dailyLogs[todayKey()]?.checkIn;
  const health = calcHealthScore(history, measurements, dailyLogs, profile);
  const goals = calcGoals(profile, measurements);
  const streak = calcStreak(history);
  const prs = getPRs(history);

  if (!loaded) return <div style={{ ...APP_STYLE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FS['2xl'] }}>Caricamento...</div>;
  if (currentTask) return (
    <>
      <TaskScreen task={TASKS[currentTask]} history={history} saveHistory={saveHistory} todayCheckin={todayCheckin} profile={profile} onExit={() => setCurrentTask(null)} onGloss={setGlossOpen} />
      <GlossaryModal termKey={glossOpen} onClose={() => setGlossOpen(null)} />
    </>
  );
  if (showCheckIn) return (
    <>
      <CheckInScreen dailyLogs={dailyLogs} saveDaily={saveDaily} onExit={() => setShowCheckIn(false)} onGloss={setGlossOpen} />
      <GlossaryModal termKey={glossOpen} onClose={() => setGlossOpen(null)} />
    </>
  );
  if (showReport) return <ReportScreen profile={profile} history={history} measurements={measurements} dailyLogs={dailyLogs} goals={goals} health={health} streak={streak} prs={prs} onExit={() => setShowReport(false)} />;

  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: pageBottomPadding }}>
      <div key={tab} className="tab-content" style={{ maxWidth: 480, margin: '0 auto', padding: `${pageTopPadding} 16px 0` }}>
        {tab === 'home' && <HomeTab profile={profile} health={health} streak={streak} history={history} todayCheckInDone={todayCheckInDone} onCheckIn={() => setShowCheckIn(true)} onStartTask={(id) => setCurrentTask(id)} onReport={() => setShowReport(true)} onGloss={setGlossOpen} dailyLogs={dailyLogs} />}
        {tab === 'tasks' && <TasksTab history={history} profile={profile} onGloss={setGlossOpen} onStart={(id) => setCurrentTask(id)} />}
        {tab === 'goals' && <GoalsTab goals={goals} prs={prs} history={history} onGloss={setGlossOpen} profile={profile} saveProfile={saveProfile} setTab={setTab} />}
        {tab === 'measures' && <MeasuresTab measurements={measurements} saveMeasurements={saveMeasurements} history={history} onGloss={setGlossOpen} profile={profile} setTab={setTab} />}
        {tab === 'profile' && <ProfileTab profile={profile} saveProfile={saveProfile} measurements={measurements} onReport={() => setShowReport(true)} onReset={() => setShowReset(true)} onExport={exportData} onImport={importData} onGloss={setGlossOpen} />}
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
    { id: 'measures', icon: Activity, label: 'Trend' },
    { id: 'profile', icon: User, label: 'Profilo' }
  ];
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 -12px 32px rgba(0,0,0,0.35)', zIndex: 40, paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', justifyContent: 'space-around', padding: '10px 0 12px' }}>
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

// ============ HEALTH RING ============
const HealthRing = ({ score, components, onGloss }) => {
  const cx = 100, cy = 100, outerR = 80, innerR = 58, outerStroke = 14, innerStroke = 8;
  const outerCirc = 2 * Math.PI * outerR;
  const scoreColor = score === null ? 'rgba(255,255,255,0.12)' : score >= 80 ? '#84cc16' : score >= 60 ? '#fbbf24' : '#ef4444';
  const driverColors = { vo2max: '#ef4444', hrv: '#a855f7', hrRest: '#3b82f6', grip: '#84cc16', composizione: '#f59e0b', sonno: '#6366f1' };
  const driverIcons = { vo2max: '🫀', hrv: '💗', hrRest: '💓', grip: '✊', composizione: '⚖️', sonno: '😴' };
  const driverLabels = { vo2max: 'VO2max', hrv: 'HRV', hrRest: 'FC riposo', grip: 'Forza', composizione: 'Composizione', sonno: 'Sonno' };
  const segCount = components.length || 1;
  const segGap = 10, segDeg = (360 - segCount * segGap) / segCount;
  const toRad = (d) => (d * Math.PI) / 180;
  const arcPath = (r, startDeg, endDeg) => {
    const s = toRad(startDeg - 90), e = toRad(endDeg - 90);
    const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ ...label, display: 'flex', alignItems: 'center', gap: 2 }}>
          Indice salute <InfoButton glossKey="HealthScore" onClick={onGloss} />
        </div>
      </div>
      <div style={{ position: 'relative', width: 200, height: 200 }}>
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ display: 'block' }}>
          <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={outerStroke} />
          <circle cx={cx} cy={cy} r={outerR} fill="none" stroke={scoreColor} strokeWidth={outerStroke}
            strokeDasharray={outerCirc} strokeDashoffset={score !== null ? outerCirc * (1 - score / 100) : outerCirc}
            strokeLinecap="round" transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dashoffset 800ms ease-out, stroke 400ms ease' }} />
          {components.map((c, i) => {
            const start = i * (segDeg + segGap), end = start + segDeg;
            const color = driverColors[c.key] || '#84cc16';
            return (
              <g key={c.key}>
                <path d={arcPath(innerR, start, end)} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={innerStroke} strokeLinecap="round" />
                <path d={arcPath(innerR, start, end)} fill="none" stroke={color} strokeWidth={innerStroke} strokeLinecap="round"
                  pathLength="100" strokeDasharray="100" strokeDashoffset={100 - c.value}
                  style={{ transition: 'stroke-dashoffset 800ms ease-out', opacity: 0.9 }} />
              </g>
            );
          })}
          {components.length === 0 && <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={innerStroke} />}
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 52, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: scoreColor }}>{score ?? '—'}</div>
          <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginTop: 2 }}>/100</div>
          {score !== null && <div style={{ fontSize: 14, marginTop: 3 }}>{score >= 80 ? '🟢' : score >= 60 ? '🟡' : '🔴'}</div>}
        </div>
      </div>
      {components.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(components.length, 3)}, 1fr)`, gap: 4, width: '100%' }}>
          {components.map(c => (
            <div key={c.key} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 15 }}>{driverIcons[c.key] || '●'}</div>
              <div title={c.stale ? `Dato vecchio di ${c.ageInDays} giorni, aggiorna` : undefined} style={{ fontFamily: FONT_MONO, fontSize: FS.sm, fontWeight: 700, color: driverColors[c.key] || '#84cc16', marginTop: 2 }}>
                {Math.round(c.value)}{c.stale && <span style={{ color: '#f59e0b', marginLeft: 2 }}>⚠️</span>}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: 1, lineHeight: 1.2 }}>{driverLabels[c.key] || c.key}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>Aggiungi dati per vedere l'indice</div>
      )}
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

  const greeting = getGreeting(profile?.name);
  const todayCheckIn = dailyLogs[todayKey()]?.checkIn;
  const smartSuggestion = suggestTodayTask(history, dailyLogs, todayCheckIn, today);
  const suggestedTaskToday = smartSuggestion ? TASKS[smartSuggestion.taskId] : null;
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
            <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.6)' }}>15 secondi · 4 slider</div>
          </div>
          <ChevronUp size={22} color="#84cc16" style={{ transform: 'rotate(90deg)' }} />
        </button>
      )}

      <div style={{ ...cardLarge, background: 'linear-gradient(135deg, rgba(132,204,22,0.08), transparent)' }}>
        <HealthRing score={health.score} components={health.components} onGloss={onGloss} />
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
        <div style={{ ...label, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 2 }}>Oggi suggerito<InfoButton glossKey="OggiSuggerito" onClick={onGloss} /></div>
        {suggestedTaskToday ? (
          <>
            <TouchablePress onClick={() => { haptic('light'); onStartTask(suggestedTaskToday.id); }} style={{ width: '100%', background: smartSuggestion.priority === 'alert' ? 'rgba(245,158,11,0.1)' : 'linear-gradient(135deg, #ffffff, #f8f8f8)', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', color: smartSuggestion.priority === 'alert' ? '#fff' : '#000', borderRadius: 20, padding: 20, textAlign: 'left', border: smartSuggestion.priority === 'alert' ? `1px solid ${COLORS.recovery}` : 'none', minHeight: 44 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: FS.xs, textTransform: 'uppercase', letterSpacing: '0.15em', color: smartSuggestion.priority === 'alert' ? COLORS.recovery : 'rgba(0,0,0,0.5)' }}>Suggerita per oggi</div>
                  <div style={{ fontSize: FS['2xl'], fontWeight: 600, marginTop: 4 }}>{suggestedTaskToday.icon} {suggestedTaskToday.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, color: smartSuggestion.priority === 'alert' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)', marginTop: 6 }}>
                    <span>{smartSuggestion.reason}</span>
                    <InfoButton glossKey={smartSuggestion.reason.startsWith('Recovery basso') ? 'recovery override' : smartSuggestion.reason.startsWith('2 sessioni forza') ? 'bilanciamento carico' : 'suggerimento giorno'} onClick={onGloss} />
                  </div>
                </div>
                <Play size={32} fill="currentColor" />
              </div>
            </TouchablePress>
            {smartSuggestion.alternatives?.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 10, fontSize: FS.xs, color: 'rgba(255,255,255,0.5)' }}>
                <span>Oppure:</span>
                {smartSuggestion.alternatives.map(taskId => (
                  <TouchablePress key={taskId} onClick={() => { haptic('light'); onStartTask(taskId); }} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 8, padding: '6px 8px', minHeight: 32 }}>
                    {TASKS[taskId].name}
                  </TouchablePress>
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={cardLarge}>
            <div style={{ fontSize: FS.xl, fontWeight: 300 }}>🎉 Settimana completata, riposo o sessione bonus a scelta</div>
          </div>
        )}
      </div>

      <TouchablePress onClick={() => { haptic('light'); onReport(); }} style={btnPrimary}>
        <FileText size={20} /> Genera report per Claude
      </TouchablePress>
      <button onClick={() => onGloss('Algoritmo')} style={{ ...btnSecondary, fontSize: FS.sm, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Info size={16} /> Come funziona l'algoritmo
      </button>

      <RecentHistoryCard history={history} compact />
    </div>
  );
};

// ============ TASKS TAB ============
const TasksTab = ({ history, profile, onGloss, onStart }) => {
  const wk = weekKey();
  const doneThisWeek = (history.workouts || []).filter(w => weekKey(new Date(w.date)) === wk).map(w => w.taskId);
  const standardTasks = Object.values(TASKS).filter(t => !t.travel);
  const travelTasks = Object.values(TASKS).filter(t => t.travel);

  const renderTaskCard = (t) => {
    const done = doneThisWeek.includes(t.id);
    const lastDone = (history.workouts || []).filter(w => w.taskId === t.id).slice(-1)[0];
    return (
      <TouchablePress key={t.id} onClick={() => { haptic('light'); onStart(t.id); }} style={{ ...cardLarge, width: '100%', textAlign: 'left', minHeight: 44, color: '#fff', borderColor: done ? t.color : 'rgba(255,255,255,0.1)', background: `linear-gradient(135deg, ${t.color}12, transparent)` }}>
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
            {t.id === 'norwegian' && (
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <HrRangeDisplay minPct={85} maxPct={95} label="Hard" profile={profile} onGloss={onGloss} compact />
                <HrRangeDisplay minPct={60} maxPct={70} label="Recovery" profile={profile} onGloss={onGloss} compact />
              </div>
            )}
            {lastDone && <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Ultima: {new Date(lastDone.date).toLocaleDateString('it-IT')}</div>}
          </div>
          <Play size={24} color={t.color} fill={t.color} />
        </div>
      </TouchablePress>
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
const TaskScreen = ({ task, history, saveHistory, todayCheckin, profile, onExit, onGloss }) => {
  if (task.type === 'strength') return <StrengthSession task={task} history={history} saveHistory={saveHistory} todayCheckin={todayCheckin} onExit={onExit} onGloss={onGloss} />;
  if (task.type === 'movement') return <MovementSession task={task} history={history} saveHistory={saveHistory} onExit={onExit} />;
  if (task.type === 'travelCardio') return <TravelCardioSession task={task} history={history} saveHistory={saveHistory} onExit={onExit} />;
  return <CardioSession task={task} history={history} saveHistory={saveHistory} profile={profile} onExit={onExit} onGloss={onGloss} />;
};

// ============ STRENGTH (con last perf + RIR + double progression) ============
const StrengthSession = ({ task, history, saveHistory, todayCheckin, onExit, onGloss }) => {
  const lastSessionForExercise = (exerciseName) => (history.workouts || [])
    .filter(w => w.taskId === task.id && w.exercises?.some(e => e.name === exerciseName))
    .slice(-1)[0];

  const initEx = task.exercises.map((ex, i) => {
    const lastSession = lastSessionForExercise(ex.name);
    const lastEx = lastSession?.exercises?.find(e => e.name === ex.name);
    return {
      name: ex.name, repsRange: ex.repsRange, rir: ex.rir, rest: ex.rest, note: ex.note, type: ex.type,
      lastPerf: lastEx ? { sets: lastEx.sets } : null,
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
  const [prModal, setPrModal] = useState(null);
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);
  const restRef = useRef(null);
  const sessionStartTimeRef = useRef(Date.now());
  const getElapsedSeconds = () => Math.floor((Date.now() - sessionStartTimeRef.current) / 1000);

  useEffect(() => {
    if (restActive && restRemaining > 0) restRef.current = setTimeout(() => setRestRemaining(r => r - 1), 1000);
    else if (restActive && restRemaining === 0) { setRestActive(false); alertEnd(); }
    return () => clearTimeout(restRef.current);
  }, [restActive, restRemaining]);

  const updateSet = (ei, si, field, v) => setExercises(p => p.map((ex, i) => i === ei ? { ...ex, sets: ex.sets.map((s, j) => j === si ? { ...s, [field]: v, isPreFilled: false } : s) } : ex));
  const updateEx = (ei, field, v) => setExercises(p => p.map((ex, i) => i === ei ? { ...ex, [field]: v } : ex));
  const useSuggestion = (ei, suggestion) => setExercises(p => p.map((ex, i) => {
    if (i !== ei || !suggestion) return ex;
    const suggestedWeight = suggestion.suggestedWeight != null ? parseDecimal(suggestion.suggestedWeight) : null;
    return {
      ...ex,
      sets: ex.sets.map(s => ({
        ...s,
        weight: suggestedWeight != null ? String(suggestedWeight) : s.weight,
        reps: String(suggestion.suggestedReps),
        isPreFilled: false
      }))
    };
  }));
  const startRest = (sec) => { setRestRemaining(sec); setRestActive(true); playBeep(660, 100, 0.3); };
  const skipRest = () => { setRestActive(false); setRestRemaining(0); clearTimeout(restRef.current); };

  const saveSession = async (isPartial = false) => {
    const elapsedSeconds = getElapsedSeconds();
    const completionPct = calcCompletionPct(task, { exercises });
    const w = {
      taskId: task.id,
      date: new Date().toISOString(),
      name: task.name,
      exercises: exercises.map(ex => ({ name: ex.name, sets: ex.sets.map(s => ({ weight: s.weight, reps: s.reps, rir: s.rir })) })),
      feeling: sessionFeeling,
      partial: isPartial,
      completionPct,
      elapsedSeconds
    };
    await saveHistory({ ...history, workouts: [...(history.workouts || []), w] });
    const newPR = checkNewPR(history, w);
    if (newPR) {
      setPrModal(newPR);
    } else {
      onExit();
    }
  };
  const buildSessionData = () => ({ exercises });
  const handleExitRequest = () => {
    if (getElapsedSeconds() < SESSION_MIN_SECONDS) {
      onExit();
      return;
    }
    const completionPct = calcCompletionPct(task, buildSessionData());
    if (completionPct >= COMPLETION_THRESHOLD) {
      saveSession(false);
      return;
    }
    setExitConfirmOpen(true);
  };

  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: screenBottomPadding }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: `${screenTopPadding} 16px 0` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={handleExitRequest} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, minHeight: 44, minWidth: 44, cursor: 'pointer' }}>← Esci</button>
          <div style={label}>{task.icon}</div>
        </div>
        <h1 style={{ fontSize: FS['2xl'], fontWeight: 300, marginBottom: 4 }}>{task.name}</h1>

        {/* RISCALDAMENTO STRUTTURATO */}
        {phase === 'warmup' && (
          <div style={{ ...cardLarge, backgroundColor: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.3)', marginBottom: 16 }}>
            <div style={{ fontWeight: 600, color: '#fbbf24', fontSize: FS.lg, marginBottom: 12 }}>🔥 Riscaldamento (10 min)</div>
            <ol style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {task.warmup.map((step, i) => (
                <li key={i} style={sessionInstructionStyle}>{step}</li>
              ))}
            </ol>
            <button onClick={() => setPhase('work')} style={{ marginTop: 16, backgroundColor: '#f59e0b', color: '#000', border: 'none', borderRadius: 10, padding: '12px 20px', fontSize: FS.base, fontWeight: 600, minHeight: 44, cursor: 'pointer', width: '100%' }}>Riscaldamento fatto, inizia lavoro →</button>
          </div>
        )}

        {/* LAVORO */}
        {phase === 'work' && exercises.map((ex, ei) => {
          const lastSession = lastSessionForExercise(ex.name);
          const suggestion = calculateNextLoad(ex, lastSession, todayCheckin);
          return (
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
              {suggestion && (
                <div style={{ marginTop: 10, padding: 10, backgroundColor: 'rgba(132,204,22,0.08)', borderRadius: 8, border: '1px solid rgba(132,204,22,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: FS.xs, color: '#84cc16', fontWeight: 600 }}>
                      💡 Suggerito
                      <InfoButton glossKey="_nextLoadReason" onClick={() => { GLOSSARY._nextLoadReason = { title: 'Perché questo suggerimento?', body: suggestion.reason }; onGloss('_nextLoadReason'); }} />
                    </div>
                    <button onClick={() => useSuggestion(ei, suggestion)} style={{ background: 'rgba(132,204,22,0.2)', border: 'none', color: '#84cc16', padding: '3px 8px', borderRadius: 6, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>Usa suggerito</button>
                  </div>
                  <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.9)', marginTop: 4 }}>
                    {suggestion.suggestedWeight != null ? `${fmtNumber(parseDecimal(suggestion.suggestedWeight))} kg × ` : ''}{suggestion.suggestedReps} {ex.type === 'time' ? 'sec' : 'reps'}
                  </div>
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
          );
        })}

        {phase === 'work' && <button onClick={() => setPhase('cooldown')} style={{ ...btnSecondary, width: '100%', marginBottom: 12 }}>Vai a cool-down →</button>}

        {/* COOL-DOWN STRUTTURATO */}
        {phase === 'cooldown' && (
          <div style={{ ...cardLarge, backgroundColor: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.3)', marginBottom: 16 }}>
            <div style={{ fontWeight: 600, color: '#60a5fa', fontSize: FS.lg, marginBottom: 12 }}>❄️ Cool-down + Stretching (10 min)</div>
            <ol style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {task.cooldown.map((step, i) => (
                <li key={i} style={sessionInstructionStyle}>{step}</li>
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

            <TouchablePress onClick={() => { haptic('medium'); saveSession(); }} style={{ marginTop: 16, backgroundColor: '#84cc16', color: '#000', border: 'none', borderRadius: 10, padding: '12px 20px', fontSize: FS.base, fontWeight: 600, minHeight: 44, width: '100%' }}>Chiudi sessione ✓</TouchablePress>
          </div>
        )}
      </div>

      {/* TIMER RECUPERO */}
      {restActive && (
        <div onClick={skipRest} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: FS.sm, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Recupero</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: FS['12rem'], fontWeight: 200, letterSpacing: '-0.05em', lineHeight: 1, color: restRemaining <= 5 ? '#ef4444' : '#84cc16' }}>{restRemaining}</div>
          <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>Tap ovunque per saltare</div>
        </div>
      )}
      {exitConfirmOpen && (
        <ConfirmModal
          title="Sessione incompleta"
          body={`Hai completato circa il ${Math.round(calcCompletionPct(task, buildSessionData()) * 100)}% della sessione. Vuoi salvarla come parziale?`}
          confirmLabel="Salva parziale"
          cancelLabel="Scarta"
          extraLabel="Annulla"
          onConfirm={() => { setExitConfirmOpen(false); saveSession(true); }}
          onCancel={() => { setExitConfirmOpen(false); onExit(); }}
          onExtra={() => setExitConfirmOpen(false)}
        />
      )}
      <PRCelebrationModal pr={prModal} onExit={onExit} />
    </div>
  );
};

// ============ BIG NUMBER INPUT (layout verticale, numero grande visibile) ============
const BigNumberInput = ({ value, onChange, step = 1, placeholder, unit, isPreFilled = false }) => {
  const displayVal = (v) => {
    if (!v) return '';
    return displayDecimalInput(v);
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
          updateDecimalInput(v, onChange);
        }}
        placeholder={placeholder}
        style={{ width: '100%', backgroundColor: 'transparent', textAlign: 'center', fontSize: FS.numBig, fontWeight: 700, fontFamily: FONT_MONO, color: isPreFilled ? 'rgba(255,255,255,0.55)' : '#fff', border: 'none', outline: 'none', padding: '10px 4px 2px', minHeight: 50, boxSizing: 'border-box', fontStyle: isPreFilled ? 'italic' : 'normal' }}
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
        <div onClick={() => setOpen(false)} style={modalOverlayStyle}>
          <div onClick={e => e.stopPropagation()} style={{ ...modalPanelStyle, maxWidth: 380 }}>
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
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);
  const sessionStartTimeRef = useRef(Date.now());
  const getElapsedSeconds = () => Math.floor((Date.now() - sessionStartTimeRef.current) / 1000);
  const saveSession = async (isPartial = false) => {
    const elapsedSeconds = getElapsedSeconds();
    const completionPct = calcCompletionPct(task, { elapsedSeconds, checklistCompleted: [] });
    const w = { taskId: task.id, date: new Date().toISOString(), name: task.name, notes, feeling, type: 'movement', partial: isPartial, completionPct, elapsedSeconds };
    await saveHistory({ ...history, workouts: [...(history.workouts || []), w] });
    onExit();
  };
  const buildSessionData = () => ({ elapsedSeconds: getElapsedSeconds(), checklistCompleted: [] });
  const handleExitRequest = () => {
    if (getElapsedSeconds() < SESSION_MIN_SECONDS) {
      onExit();
      return;
    }
    const completionPct = calcCompletionPct(task, buildSessionData());
    if (completionPct >= COMPLETION_THRESHOLD) {
      saveSession(false);
      return;
    }
    setExitConfirmOpen(true);
  };
  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: screenBottomPadding }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: `${screenTopPadding} 16px 0` }}>
        <button onClick={handleExitRequest} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, marginBottom: 16, minHeight: 44, cursor: 'pointer' }}>← Esci</button>
        <h1 style={{ fontSize: FS['2xl'], fontWeight: 300, marginBottom: 4 }}>{task.icon} {task.name}</h1>
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>60 minuti con il PT</div>

        <div style={{ ...cardLarge, backgroundColor: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.3)', marginBottom: 16 }}>
          <div style={{ fontWeight: 600, color: '#a855f7', fontSize: FS.base, marginBottom: 12 }}>🎯 Focus della sessione</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {task.focus.map((f, i) => <div key={i} style={sessionInstructionStyle}>{f}</div>)}
          </div>
        </div>

        <div style={{ ...card, backgroundColor: 'rgba(132,204,22,0.08)', borderColor: 'rgba(132,204,22,0.2)', marginBottom: 16 }}>
          <div style={{ fontSize: FS.xs, color: '#84cc16', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Tip per il PT</div>
          <div style={sessionInstructionStyle}>{task.tipForPT}</div>
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

        <TouchablePress onClick={() => { haptic('medium'); saveSession(); }} style={{ ...btnPrimary, marginTop: 16, backgroundColor: '#a855f7', color: '#fff' }}>Chiudi sessione ✓</TouchablePress>
      </div>
      {exitConfirmOpen && (
        <ConfirmModal
          title="Sessione incompleta"
          body={`Hai completato circa il ${Math.round(calcCompletionPct(task, buildSessionData()) * 100)}% della sessione. Vuoi salvarla come parziale?`}
          confirmLabel="Salva parziale"
          cancelLabel="Scarta"
          extraLabel="Annulla"
          onConfirm={() => { setExitConfirmOpen(false); saveSession(true); }}
          onCancel={() => { setExitConfirmOpen(false); onExit(); }}
          onExtra={() => setExitConfirmOpen(false)}
        />
      )}
    </div>
  );
};

// ============ CARDIO ============
const CardioSession = ({ task, history, saveHistory, profile, onExit, onGloss }) => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(task.structure[0].duration);
  const [phaseStartTime, setPhaseStartTime] = useState(null);
  const [pausedAt, setPausedAt] = useState(null);
  const [accumulatedPause, setAccumulatedPause] = useState(0);
  const [running, setRunning] = useState(false);
  const [skipConfirmOpen, setSkipConfirmOpen] = useState(false);
  const [backgroundAlertOpen, setBackgroundAlertOpen] = useState(false);
  const [backgroundAlertData, setBackgroundAlertData] = useState(null);
  const [backgroundEndModalOpen, setBackgroundEndModalOpen] = useState(false);
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [hrAvg, setHrAvg] = useState('');
  const [feeling, setFeeling] = useState(5);
  const tickRef = useRef(null);
  const advancingRef = useRef(false);
  const sessionStartTimeRef = useRef(null);
  const currentPhase = task.structure[phaseIdx];
  const getElapsedSeconds = () => sessionStartTimeRef.current
    ? Math.floor((Date.now() - sessionStartTimeRef.current) / 1000)
    : 0;

  const computeSecondsLeft = () => {
    if (!phaseStartTime) return task.structure[phaseIdx].duration;
    const now = Date.now();
    const effectiveStart = phaseStartTime + accumulatedPause;
    const elapsed = pausedAt
      ? Math.floor((pausedAt - effectiveStart) / 1000)
      : Math.floor((now - effectiveStart) / 1000);
    return Math.max(0, task.structure[phaseIdx].duration - elapsed);
  };
  const startPhaseTimer = (startTime = Date.now()) => {
    setPhaseStartTime(startTime);
    setAccumulatedPause(0);
    setPausedAt(null);
  };
  const advancePhase = () => {
    if (advancingRef.current) return;
    advancingRef.current = true;

    if (task.id === 'norwegian' && currentPhase.intense) {
      setRoundsCompleted(r => r + 1);
    }

    if (phaseIdx < task.structure.length - 1) {
      const ni = phaseIdx + 1;
      const next = task.structure[ni];
      if (next.intense) alertIntense(); else alertEnd();
      setPhaseIdx(ni);
      setSecondsLeft(next.duration);
      startPhaseTimer();
    } else {
      alertEnd();
      setRunning(false);
    }

    setTimeout(() => { advancingRef.current = false; }, 50);
  };

  useEffect(() => {
    if (!running) return undefined;
    const refreshCountdown = () => {
      const nextSecondsLeft = computeSecondsLeft();
      setSecondsLeft(nextSecondsLeft);
      if (nextSecondsLeft === 0) advancePhase();
    };
    refreshCountdown();
    tickRef.current = setInterval(refreshCountdown, 1000);
    return () => clearInterval(tickRef.current);
  }, [running, phaseStartTime, pausedAt, accumulatedPause, phaseIdx]);

  useEffect(() => {
    if (!running || !phaseStartTime) return undefined;

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') return;
      if (advancingRef.current) return;

      const now = Date.now();
      const effectiveStart = phaseStartTime + accumulatedPause;
      const elapsedInPhase = Math.floor((now - effectiveStart) / 1000);
      const currentPhaseDuration = task.structure[phaseIdx].duration;

      if (elapsedInPhase <= currentPhaseDuration) {
        setSecondsLeft(currentPhaseDuration - elapsedInPhase);
        return;
      }

      let overflowSeconds = elapsedInPhase - currentPhaseDuration;
      let targetPhaseIdx = phaseIdx + 1;
      let remainingInTargetPhase = 0;

      while (targetPhaseIdx < task.structure.length) {
        const dur = task.structure[targetPhaseIdx].duration;
        if (overflowSeconds < dur) {
          remainingInTargetPhase = dur - overflowSeconds;
          break;
        }
        overflowSeconds -= dur;
        targetPhaseIdx++;
      }

      if (targetPhaseIdx >= task.structure.length) {
        setRunning(false);
        setBackgroundEndModalOpen(true);
        return;
      }

      setBackgroundAlertData({
        phasesLost: targetPhaseIdx - phaseIdx,
        currentPhaseName: task.structure[phaseIdx].phase,
        targetPhaseIdx,
        targetPhaseName: task.structure[targetPhaseIdx].phase,
        remainingInTargetPhase
      });
      setBackgroundAlertOpen(true);
      setRunning(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [running, phaseStartTime, phaseIdx, accumulatedPause, task.structure]);

  const saveSession = async (isPartial = false) => {
    const elapsedSeconds = getElapsedSeconds();
    const completionPct = calcCompletionPct(task, { elapsedSeconds, roundsCompleted, structure: task.structure });
    const w = { taskId: task.id, date: new Date().toISOString(), name: task.name, hrAvg, feeling, type: task.type, partial: isPartial, completionPct, elapsedSeconds };
    await saveHistory({ ...history, workouts: [...(history.workouts || []), w] });
    onExit();
  };
  const buildSessionData = () => ({ elapsedSeconds: getElapsedSeconds(), roundsCompleted, structure: task.structure });
  const handleExitRequest = () => {
    if (getElapsedSeconds() < SESSION_MIN_SECONDS) {
      onExit();
      return;
    }
    const completionPct = calcCompletionPct(task, buildSessionData());
    if (completionPct >= COMPLETION_THRESHOLD) {
      saveSession(false);
      return;
    }
    setExitConfirmOpen(true);
  };
  const handleEndSession = async () => {
    await saveSession();
  };
  const handlePause = () => {
    if (running) {
      const nextPausedAt = Date.now();
      setPausedAt(nextPausedAt);
      setSecondsLeft(computeSecondsLeft());
      setRunning(false);
      return;
    }
    if (!phaseStartTime) {
      if (!sessionStartTimeRef.current) sessionStartTimeRef.current = Date.now();
      startPhaseTimer();
    } else if (pausedAt) {
      setAccumulatedPause(prev => prev + (Date.now() - pausedAt));
      setPausedAt(null);
    }
    setRunning(true);
  };
  const skipPhase = () => {
    if (phaseIdx < task.structure.length - 1) {
      const ni = phaseIdx + 1;
      setPhaseIdx(ni);
      setSecondsLeft(task.structure[ni].duration);
      if (running) {
        startPhaseTimer();
      } else {
        setPhaseStartTime(null);
        setAccumulatedPause(0);
        setPausedAt(null);
      }
    }
  };
  const handleSkipRequest = () => {
    if (task.id === 'norwegian') {
      setSkipConfirmOpen(true);
    } else {
      skipPhase();
    }
  };

  const total = task.structure.reduce((a, p) => a + p.duration, 0);
  const elapsed = task.structure.slice(0, phaseIdx).reduce((a, p) => a + p.duration, 0) + (currentPhase.duration - secondsLeft);
  const progress = (elapsed / total) * 100;

  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: `${screenTopPadding} 16px ${screenBottomPadding}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={handleExitRequest} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, minHeight: 44, minWidth: 44, cursor: 'pointer' }}>← Esci</button>
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
          <div style={{ fontSize: FS.sm, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, color: currentPhase.intense ? '#f87171' : 'rgba(255,255,255,0.55)' }}>
            {currentPhase.phase}
            {currentPhase.optional && (
              <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 8, marginLeft: 8 }}>
                Opzionale
              </span>
            )}
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: FS['8xl'], fontWeight: 200, letterSpacing: '-0.05em', lineHeight: 1, color: currentPhase.intense ? '#f87171' : '#84cc16' }}>{fmtTime(secondsLeft)}</div>
          <div style={{ fontSize: FS.base, color: 'rgba(255,255,255,0.82)', marginTop: 16, lineHeight: 1.4 }}>{currentPhase.target}</div>
          {task.id === 'norwegian' && currentPhase.bpmRange && (
            <div style={{ marginTop: 6 }}>
              <HrRangeDisplay minPct={currentPhase.bpmRange[0]} maxPct={currentPhase.bpmRange[1]} profile={profile} onGloss={onGloss} />
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
          <TouchablePress onClick={() => { haptic('light'); handlePause(); }} style={{ ...btnPrimary, backgroundColor: running ? 'rgba(255,255,255,0.1)' : '#84cc16', color: running ? '#fff' : '#000', padding: 16 }}>
            {running ? <><Pause size={20} fill="currentColor" /> Pausa</> : <><Play size={20} fill="currentColor" /> Avvia</>}
          </TouchablePress>
          <button onClick={handleSkipRequest} style={{ ...btnSecondary, padding: 16 }}>Salta fase →</button>
          {currentPhase.optional && (
            <TouchablePress onClick={handleEndSession} style={{ ...btnPrimary, gridColumn: '1 / -1' }}>
              Termina sessione qui ✓
            </TouchablePress>
          )}
        </div>

        <div style={{ ...cardLarge, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={label}>Dati sessione</div>
          <input type="text" inputMode="decimal" placeholder="FC media (da Apple Watch)" value={displayDecimalInput(hrAvg)} onChange={e => updateDecimalInput(e.target.value, setHrAvg)} style={{ ...inputStyle, fontSize: FS.lg }} />
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.xs, marginBottom: 4 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Sensazione</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{feeling}/10</span>
            </div>
            <input type="range" min="1" max="10" value={feeling} onChange={e => setFeeling(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#84cc16', height: 44 }} />
          </div>
        </div>

        <TouchablePress onClick={() => { haptic('medium'); saveSession(); }} style={{ ...btnPrimary, marginTop: 16 }}>Chiudi sessione ✓</TouchablePress>
      </div>
      {skipConfirmOpen && (
        <ConfirmModal
          title="Saltare questa fase?"
          body="Saltare un round riduce lo stimolo VO2max del protocollo 5×4 evidence-based. Confermi?"
          confirmLabel="Sì, salta"
          cancelLabel="Annulla"
          onConfirm={() => { skipPhase(); setSkipConfirmOpen(false); }}
          onCancel={() => setSkipConfirmOpen(false)}
        />
      )}
      {exitConfirmOpen && (
        <ConfirmModal
          title="Sessione incompleta"
          body={`Hai completato circa il ${Math.round(calcCompletionPct(task, buildSessionData()) * 100)}% della sessione. Vuoi salvarla come parziale?`}
          confirmLabel="Salva parziale"
          cancelLabel="Scarta"
          extraLabel="Annulla"
          onConfirm={() => { setExitConfirmOpen(false); saveSession(true); }}
          onCancel={() => { setExitConfirmOpen(false); onExit(); }}
          onExtra={() => setExitConfirmOpen(false)}
        />
      )}
      {backgroundAlertOpen && backgroundAlertData && (
        <ConfirmModal
          title="Sessione interrotta"
          body={`Sei stato in background. Hai perso ${backgroundAlertData.phasesLost} fase/i del protocollo. La fase reale ora sarebbe "${backgroundAlertData.targetPhaseName}". Vuoi riprendere da lì o restare su questa fase?`}
          confirmLabel={`Riprendi da ${backgroundAlertData.targetPhaseName}`}
          cancelLabel="Resta su questa fase"
          onConfirm={() => {
            const targetIdx = backgroundAlertData.targetPhaseIdx;
            const remaining = backgroundAlertData.remainingInTargetPhase;
            const targetDuration = task.structure[targetIdx].duration;

            setPhaseIdx(targetIdx);
            setSecondsLeft(remaining);
            setPhaseStartTime(Date.now() - (targetDuration - remaining) * 1000);
            setAccumulatedPause(0);
            setPausedAt(null);

            setBackgroundAlertOpen(false);
            setBackgroundAlertData(null);
            setRunning(true);
          }}
          onCancel={() => {
            setPhaseStartTime(Date.now());
            setAccumulatedPause(0);
            setPausedAt(null);
            setSecondsLeft(task.structure[phaseIdx].duration);

            setBackgroundAlertOpen(false);
            setBackgroundAlertData(null);
            setRunning(true);
          }}
        />
      )}
      {backgroundEndModalOpen && (
        <ConfirmModal
          title="Sessione terminata"
          body="Sei stato in background fino al termine della sessione. Vuoi salvare?"
          confirmLabel="Salva sessione"
          cancelLabel="Scarta"
          onConfirm={async () => {
            setBackgroundEndModalOpen(false);
            await saveSession();
          }}
          onCancel={() => {
            setBackgroundEndModalOpen(false);
            onExit();
          }}
        />
      )}
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
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);
  const tickRef = useRef(null);
  const sessionStartTimeRef = useRef(null);
  const getElapsedSeconds = () => sessionStartTimeRef.current
    ? Math.floor((Date.now() - sessionStartTimeRef.current) / 1000)
    : 0;

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

  const saveSession = async (isPartial = false) => {
    // Travel walk conta come zone2, tabata come hiit (per aderenza e report)
    const equivalentType = mode === 'walk' ? 'zone2' : 'hiit';
    const elapsedSeconds = getElapsedSeconds();
    const completionPct = calcCompletionPct(task, { elapsedSeconds, structure });
    const w = { taskId: task.id, date: new Date().toISOString(), name: `${task.name} (${mode === 'walk' ? 'Camminata' : 'Tabata'})`, hrAvg, feeling, type: equivalentType, travel: true, mode, partial: isPartial, completionPct, elapsedSeconds };
    await saveHistory({ ...history, workouts: [...(history.workouts || []), w] });
    onExit();
  };
  const handleToggleRunning = () => {
    if (!running && !sessionStartTimeRef.current) sessionStartTimeRef.current = Date.now();
    setRunning(r => !r);
  };
  const buildSessionData = () => ({ elapsedSeconds: getElapsedSeconds(), structure });
  const handleExitRequest = () => {
    if (getElapsedSeconds() < SESSION_MIN_SECONDS) {
      onExit();
      return;
    }
    const completionPct = calcCompletionPct(task, buildSessionData());
    if (completionPct >= COMPLETION_THRESHOLD) {
      saveSession(false);
      return;
    }
    setExitConfirmOpen(true);
  };

  // SCELTA MODE
  if (!mode) {
    return (
      <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: screenBottomPadding }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: `${screenTopPadding} 16px 0` }}>
          <button onClick={onExit} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, marginBottom: 16, minHeight: 44, cursor: 'pointer' }}>← Esci</button>
          <h1 style={{ fontSize: FS['2xl'], fontWeight: 300, marginBottom: 4 }}>{task.icon} {task.name}</h1>
          <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>Scegli il tipo di sessione</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => setMode('walk')} style={{ ...cardLarge, textAlign: 'left', cursor: 'pointer', color: '#fff', border: '1px solid rgba(59,130,246,0.4)', backgroundColor: 'rgba(59,130,246,0.08)' }}>
              <div style={{ fontSize: FS.xl, fontWeight: 600, color: '#60a5fa' }}>🚶 A · Camminata veloce</div>
              <div style={{ fontSize: FS.base, color: 'rgba(255,255,255,0.78)', marginTop: 6, lineHeight: 1.4 }}>30 minuti totali · FC 60-70% max</div>
              <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Equivalente a Zone 2 Cardio</div>
            </button>
            <button onClick={() => setMode('tabata')} style={{ ...cardLarge, textAlign: 'left', cursor: 'pointer', color: '#fff', border: '1px solid rgba(239,68,68,0.4)', backgroundColor: 'rgba(239,68,68,0.08)' }}>
              <div style={{ fontSize: FS.xl, fontWeight: 600, color: '#f87171' }}>🔥 B · Tabata bodyweight</div>
              <div style={{ fontSize: FS.base, color: 'rgba(255,255,255,0.78)', marginTop: 6, lineHeight: 1.4 }}>~28 min · 4 round HIIT (burpees/jacks/climbers/squat jumps)</div>
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
      <div style={{ maxWidth: 480, margin: '0 auto', padding: `${screenTopPadding} 16px ${screenBottomPadding}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={handleExitRequest} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, minHeight: 44, minWidth: 44, cursor: 'pointer' }}>← Esci</button>
          <div style={label}>{task.icon}</div>
        </div>
        <h1 style={{ fontSize: FS['2xl'], fontWeight: 300 }}>{mode === 'walk' ? '🚶 Camminata' : '🔥 Tabata'}</h1>
        <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Fase {phaseIdx + 1} di {structure.length}</div>
        <div style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ height: '100%', backgroundColor: '#84cc16', width: `${progress}%`, transition: 'width 0.3s' }} />
        </div>

        {currentPhase && (
          <div style={{ ...cardLarge, marginBottom: 24, textAlign: 'center', padding: 24, backgroundColor: currentPhase.intense ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)', borderColor: currentPhase.intense ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: FS.sm, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, color: currentPhase.intense ? '#f87171' : 'rgba(255,255,255,0.55)' }}>{currentPhase.phase}</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: FS['8xl'], fontWeight: 200, letterSpacing: '-0.05em', lineHeight: 1, color: currentPhase.intense ? '#f87171' : '#84cc16' }}>{fmtTime(secondsLeft)}</div>
            <div style={{ fontSize: FS.base, color: 'rgba(255,255,255,0.82)', marginTop: 16, lineHeight: 1.4 }}>{currentPhase.target}</div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
          <TouchablePress onClick={() => { haptic('light'); handleToggleRunning(); }} style={{ ...btnPrimary, backgroundColor: running ? 'rgba(255,255,255,0.1)' : '#84cc16', color: running ? '#fff' : '#000', padding: 16 }}>
            {running ? <><Pause size={20} fill="currentColor" /> Pausa</> : <><Play size={20} fill="currentColor" /> Avvia</>}
          </TouchablePress>
          <button onClick={() => { if (phaseIdx < structure.length - 1) { const ni = phaseIdx + 1; setPhaseIdx(ni); setSecondsLeft(structure[ni].duration); } }} style={{ ...btnSecondary, padding: 16 }}>Salta fase →</button>
        </div>

        <div style={{ ...cardLarge, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={label}>Dati sessione</div>
          <input type="text" inputMode="decimal" placeholder="FC media (da Apple Watch)" value={displayDecimalInput(hrAvg)} onChange={e => updateDecimalInput(e.target.value, setHrAvg)} style={{ ...inputStyle, fontSize: FS.lg }} />
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.xs, marginBottom: 4 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Sensazione</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{feeling}/10</span>
            </div>
            <input type="range" min="1" max="10" value={feeling} onChange={e => setFeeling(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#84cc16', height: 44 }} />
          </div>
        </div>

        <TouchablePress onClick={() => { haptic('medium'); saveSession(); }} style={{ ...btnPrimary, marginTop: 16 }}>Chiudi sessione ✓</TouchablePress>
      </div>
      {exitConfirmOpen && (
        <ConfirmModal
          title="Sessione incompleta"
          body={`Hai completato circa il ${Math.round(calcCompletionPct(task, buildSessionData()) * 100)}% della sessione. Vuoi salvarla come parziale?`}
          confirmLabel="Salva parziale"
          cancelLabel="Scarta"
          extraLabel="Annulla"
          onConfirm={() => { setExitConfirmOpen(false); saveSession(true); }}
          onCancel={() => { setExitConfirmOpen(false); onExit(); }}
          onExtra={() => setExitConfirmOpen(false)}
        />
      )}
    </div>
  );
};

// ============ CHECK-IN ============
const CheckInScreen = ({ dailyLogs, saveDaily, onExit, onGloss }) => {
  const todayLog = dailyLogs[todayKey()]?.checkIn;
  const [sleep, setSleep] = useState(7.5);
  const [sleepQuality, setSleepQuality] = useState(todayLog?.sleepQuality ?? 7);
  const [energy, setEnergy] = useState(7);
  const [soreness, setSoreness] = useState(3);

  const save = async () => {
    const k = todayKey();
    const newLogs = { ...dailyLogs, [k]: { ...(dailyLogs[k] || {}), sleep, checkIn: { sleep, sleepQuality, energy, soreness, ts: Date.now() } } };
    await saveDaily(newLogs); onExit();
  };

  const suggestion = () => {
    const score = (energy * 2) - (soreness * 1.5);
    if (score >= 8) return { msg: '✅ Procedi con sessione prevista', color: '#84cc16' };
    if (score >= 0) return { msg: '⚠️ Considera versione light (-20%) o Zone 2', color: '#fbbf24' };
    return { msg: '🛑 Riposo o solo camminata leggera consigliata', color: '#f87171' };
  };

  return (
    <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: screenBottomPadding }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: `${screenTopPadding} 16px 0` }}>
        <button onClick={onExit} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: FS.sm, marginBottom: 16, minHeight: 44, cursor: 'pointer' }}>← Esci</button>
        <h1 style={{ fontSize: FS['3xl'], fontWeight: 300, marginBottom: 4 }}>Check-in</h1>
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>15 secondi · 4 slider</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SliderField label="Ore di sonno" value={sleep} setValue={setSleep} min={3} max={12} step={0.5} suffix="h" />
          <div>
            <SliderField label="Qualità sonno" value={sleepQuality} setValue={setSleepQuality} min={1} max={10} step={1} glossKey="qualità sonno" onGloss={onGloss} />
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: -4, marginBottom: 12, textAlign: 'right' }}>
              {sleepQuality <= 3 ? 'Pessimo (frammentato, risvegli)' : sleepQuality <= 6 ? 'Mediocre' : sleepQuality <= 8 ? 'Buono' : 'Eccellente (riposato, energico)'}
            </div>
          </div>
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

const SliderField = ({ label: lbl, value, setValue, min, max, step = 1, suffix = '', reverse = false, glossKey, onGloss }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.sm, marginBottom: 8 }}>
      <span style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 2 }}>
        {lbl}
        {glossKey && <InfoButton glossKey={glossKey} onClick={onGloss} />}
      </span>
      <span style={{ color: '#fff', fontWeight: 600, fontSize: FS.lg, fontFamily: FONT_MONO }}>{value}{suffix}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => setValue(parseFloat(e.target.value))} style={{ width: '100%', accentColor: reverse ? '#f87171' : '#84cc16', height: 44 }} />
  </div>
);

// ============ GOALS + PR ============
const PRSparkline = ({ history, lift }) => {
  const points = getPRTrend(history, lift);
  if (points.length < 2) {
    return <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>Aggiungi 1 sessione per vedere trend</div>;
  }

  const width = 100;
  const height = 30;
  const pad = 3;
  const values = points.map(p => p.oneRM);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const coords = points.map((p, i) => {
    const x = pad + (i / (points.length - 1)) * (width - pad * 2);
    const y = height - pad - ((p.oneRM - min) / range) * (height - pad * 2);
    return { x, y };
  });
  const d = coords.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const last = coords[coords.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ marginTop: 8, display: 'block' }}>
      <path d={d} fill="none" stroke={COLORS.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r="3" fill={COLORS.success} />
    </svg>
  );
};

const Sparkline = ({ points, color = '#84cc16', height = 30, width = 100 }) => {
  const clean = (points || []).map(p => ({ ...p, value: parseDecimal(p.value) })).filter(p => p.value);
  if (clean.length < 2) {
    return <div style={{ height, width, fontSize: 10, color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>—</div>;
  }

  const values = clean.map(p => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const padding = 4;
  const w = width - padding * 2;
  const h = height - padding * 2;
  const pathPoints = clean.map((p, i) => {
    const x = padding + (i / (clean.length - 1)) * w;
    const y = padding + h - ((p.value - min) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const linePath = `M ${pathPoints.join(' L ')}`;
  const lastX = padding + w;
  const lastY = padding + h - ((values[values.length - 1] - min) / range) * h;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
    </svg>
  );
};

const METRIC_OPTIMAL = {
  vo2max: { min: 38, max: 50, note: 'Uomo 50-59 anni: <30 a rischio, 35-45 buono, >45 ottimo' },
  hrRest: { min: 50, max: 70, note: 'Atleti 50-60, sedentari 70-80, allenato 50-65 bpm' },
  hrv: { min: 30, max: 100, note: 'Trend mensile > valore assoluto. Cala 5-10% con stress' },
  bodyFat: { min: 12, max: 18, note: 'Uomo 50+: 11-22% normale, 12-18% atletico' },
  bpSys: { min: 90, max: 120, note: '<120 ottimale, 120-129 elevata, ≥130 ipertensione (<90 ipotensione clinica)' },
  bpDia: { min: 60, max: 80, note: '<80 ottimale, 80-89 elevata, ≥90 ipertensione (<60 ipotensione clinica)' }
};

const evalAbsolute = (key, value, better = 'maintain') => {
  const optimal = METRIC_OPTIMAL[key];
  if (!optimal) return null;
  const v = parseDecimal(value);
  if (!v) return null;
  const buffer = (optimal.max - optimal.min) * 0.15;

  if (better === 'down') {
    if (v <= optimal.max) return { status: 'ok', color: '#10b981', icon: '🟢', label: 'In range ottimale' };
    if (v <= optimal.max + buffer) return { status: 'warn', color: '#f59e0b', icon: '🟡', label: 'Borderline' };
    return { status: 'out', color: '#ef4444', icon: '🔴', label: 'Fuori range' };
  }

  if (better === 'up') {
    if (v >= optimal.min) return { status: 'ok', color: '#10b981', icon: '🟢', label: 'In range ottimale' };
    if (v >= optimal.min - buffer) return { status: 'warn', color: '#f59e0b', icon: '🟡', label: 'Borderline' };
    return { status: 'out', color: '#ef4444', icon: '🔴', label: 'Fuori range' };
  }

  if (v >= optimal.min && v <= optimal.max) return { status: 'ok', color: '#10b981', icon: '🟢', label: 'In range ottimale' };
  if (v >= optimal.min - buffer && v <= optimal.max + buffer) return { status: 'warn', color: '#f59e0b', icon: '🟡', label: 'Borderline' };
  return { status: 'out', color: '#ef4444', icon: '🔴', label: 'Fuori range' };
};

const calcTrendLine = (points) => {
  const clean = (points || []).map(p => parseDecimal(p.value)).filter(Boolean);
  const n = clean.length;
  if (n < 2) return null;
  const xs = clean.map((_, i) => i);
  const ys = clean;
  const sumX = xs.reduce((a, b) => a + b, 0);
  const sumY = ys.reduce((a, b) => a + b, 0);
  const sumXY = xs.reduce((s, x, i) => s + x * ys[i], 0);
  const sumX2 = xs.reduce((s, x) => s + x * x, 0);
  const denom = n * sumX2 - sumX * sumX;
  if (!denom) return null;
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
};

const CHART_MONTHS_IT = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];

const formatXLabel = (date, totalRangeMonths) => {
  const d = new Date(date);
  const yy = String(d.getFullYear()).slice(-2);
  const mm = CHART_MONTHS_IT[d.getMonth()];
  const dd = d.getDate();
  if (totalRangeMonths < 1) return `${dd} ${mm}`;
  return `${mm} ${yy}`;
};

const formatFullXLabel = (date) => {
  const d = new Date(date);
  return `${d.getDate()} ${CHART_MONTHS_IT[d.getMonth()]} ${d.getFullYear()}`;
};

const chartDayKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

const estimateLabelWidth = (text) => text.length * 6;

const formatRangeText = (firstDate, lastDate) => {
  const f = new Date(firstDate);
  const l = new Date(lastDate);
  const diffMs = l - f;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30.44);
  if (diffDays === 0) return 'stesso giorno';
  if (diffDays === 1) return '1 giorno';
  if (diffDays < 30) return `${diffDays} giorni`;
  if (diffMonths < 1.5) return '1 mese';
  if (diffMonths < 12) return `${Math.round(diffMonths)} mesi`;
  const years = diffMonths / 12;
  if (years < 1.5) return '1 anno';
  return `${Math.round(years * 10) / 10} anni`;
};

const pickXLabelsTimeRange = (startDate, endDate, n = 4) => {
  const labels = [];
  const totalMs = endDate - startDate;
  for (let i = 0; i <= n; i++) {
    labels.push(new Date(startDate.getTime() + (totalMs * i / n)));
  }
  return labels;
};

const FullChartModal = ({ metric, points, profile, measurements, setTab, onClose }) => {
  const clean = (points || []).map(p => ({ ...p, value: parseDecimal(p.value) })).filter(p => p.value).sort((a, b) => new Date(a.date) - new Date(b.date));
  if (!metric) return null;
  const goal = calcGoals(profile, measurements).find(g => g.id === metric.key);

  const width = 340;
  const height = 180;
  const pad = { top: 18, right: 16, bottom: 34, left: 42 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const values = clean.map(p => p.value);
  const optimal = metric.optimalRange;
  const goalValues = [goal?.baseline, goal?.t6].map(parseDecimal).filter(Boolean);
  const minData = values.length ? Math.min(...values) : (goalValues.length ? Math.min(...goalValues) : 0);
  const maxData = values.length ? Math.max(...values) : (goalValues.length ? Math.max(...goalValues) : 1);
  const min = Math.min(minData, optimal?.min ?? minData, ...(goalValues.length ? goalValues : [minData]));
  const max = Math.max(maxData, optimal?.max ?? maxData, ...(goalValues.length ? goalValues : [maxData]));
  const range = max - min || 1;
  const firstPointDate = clean[0] ? new Date(clean[0].date) : new Date();
  const lastPointDate = clean[clean.length - 1] ? new Date(clean[clean.length - 1].date) : firstPointDate;
  const startDate = goal?.baselineDate
    ? new Date(Math.min(new Date(goal.baselineDate).getTime(), firstPointDate.getTime()))
    : firstPointDate;
  const lastPointPlusPadding = new Date(lastPointDate);
  lastPointPlusPadding.setDate(lastPointPlusPadding.getDate() + 14);
  const targetEndDate = goal?.baselineDate ? new Date(goal.baselineDate) : null;
  if (targetEndDate) targetEndDate.setMonth(targetEndDate.getMonth() + 6);
  const endDate = targetEndDate && targetEndDate > lastPointPlusPadding ? targetEndDate : lastPointPlusPadding;
  const totalRangeMs = endDate - startDate || 1;
  const totalRangeMonths = totalRangeMs / (1000 * 60 * 60 * 24 * 30.44);
  const innerPaddingX = 14;
  const xScale = (date) => !goal?.baselineDate && clean.length < 2
    ? pad.left + chartW / 2
    : pad.left + innerPaddingX + ((new Date(date) - startDate) / totalRangeMs) * (chartW - innerPaddingX * 2);
  const yFor = (v) => pad.top + chartH - ((v - min) / range) * chartH;
  const dataPath = clean.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.date).toFixed(1)} ${yFor(p.value).toFixed(1)}`).join(' ');
  const trend = clean.length >= 3 ? calcTrendLine(clean) : null;
  const trendPath = trend ? `M ${xScale(clean[0].date).toFixed(1)} ${yFor(trend.intercept).toFixed(1)} L ${xScale(clean[clean.length - 1].date).toFixed(1)} ${yFor(trend.intercept + trend.slope * (clean.length - 1)).toFixed(1)}` : '';
  const optimalY1 = optimal ? yFor(optimal.max) : 0;
  const optimalY2 = optimal ? yFor(optimal.min) : 0;
  const goalPace = goal ? paceLabel(goal.current, goal.expectedNow, goal.better) : null;
  const first = clean[0];
  const last = clean[clean.length - 1];
  const delta = first && last ? ((last.value - first.value) / first.value) * 100 : 0;
  const rangeText = first && last ? formatRangeText(first.date, last.date) : '';
  const avgVal = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  const allPointsSameDay = clean.length > 1 && clean.every(p => chartDayKey(p.date) === chartDayKey(first.date));
  const rawXLabels = clean.length === 1 && !goal?.baselineDate
    ? [{ idx: 0, x: pad.left + chartW / 2, label: formatFullXLabel(first.date), centered: true }]
    : allPointsSameDay && !goal?.baselineDate
    ? [{ idx: 0, x: pad.left + chartW / 2, label: 'Oggi', centered: true }]
    : pickXLabelsTimeRange(startDate, endDate, 4)
      .map((date, idx) => ({
        idx,
        x: xScale(date),
        label: formatXLabel(date, totalRangeMonths)
      }));
  const labels = rawXLabels.slice().sort((a, b) => a.x - b.x);
  const filteredLabels = labels.reduce((filtered, current, i) => {
    if (filtered.length === 0) {
      filtered.push(current);
      return filtered;
    }
    const previous = filtered[filtered.length - 1];
    const minGap = (estimateLabelWidth(current.label) + estimateLabelWidth(previous.label)) / 2 + 12;
    if (current.x - previous.x >= minGap) filtered.push(current);
    else if (i === labels.length - 1) filtered[filtered.length - 1] = current;
    return filtered;
  }, []);
  const xLabels = filteredLabels.slice().sort((a, b) => a.x - b.x);

  return (
    <div onClick={onClose} style={{ ...modalOverlayStyle, backgroundColor: 'rgba(0,0,0,0.86)', zIndex: 120 }}>
      <div onClick={e => e.stopPropagation()} style={{ ...modalPanelStyle, backgroundColor: '#151515', border: '1px solid rgba(255,255,255,0.14)', padding: 18, maxWidth: 390, color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
          <div>
            <h3 style={{ fontSize: FS.xl, fontWeight: 700, margin: 0 }}>{metric.label}</h3>
            <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{metric.unit}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', padding: 4 }}><X size={22} /></button>
        </div>

        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
          <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + chartH} stroke="rgba(255,255,255,0.16)" />
          <line x1={pad.left} y1={pad.top + chartH} x2={pad.left + chartW} y2={pad.top + chartH} stroke="rgba(255,255,255,0.16)" />
          {optimal && <rect x={pad.left} y={Math.min(optimalY1, optimalY2)} width={chartW} height={Math.abs(optimalY2 - optimalY1)} fill={COLORS.success} opacity="0.15" />}
          <text x={pad.left - 8} y={pad.top + 4} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.45)">{fmtNumber(max)}</text>
          <text x={pad.left - 8} y={pad.top + chartH} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.45)">{fmtNumber(min)}</text>
          {goal?.t6 != null && (
            <>
              <line x1={pad.left} y1={yFor(goal.t6)} x2={pad.left + chartW} y2={yFor(goal.t6)} stroke="#10b981" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.7" />
              <text x={targetEndDate ? xScale(targetEndDate) : pad.left + chartW} y={yFor(goal.t6) - 6} fill="#10b981" fontSize="10" textAnchor="end">Target T+6m: {fmtNumber(goal.t6)}</text>
            </>
          )}
          {goal?.baseline != null && (
            <>
              <line x1={pad.left} y1={yFor(goal.baseline)} x2={pad.left + chartW} y2={yFor(goal.baseline)} stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              <text x={pad.left + 4} y={yFor(goal.baseline) - 4} fill="rgba(255,255,255,0.5)" fontSize="9">Baseline: {fmtNumber(goal.baseline)}</text>
            </>
          )}
          {goal?.baseline != null && goal?.t6 != null && goal?.baselineDate && targetEndDate && (
            <>
              <line x1={xScale(goal.baselineDate)} y1={yFor(goal.baseline)} x2={xScale(targetEndDate)} y2={yFor(goal.t6)} stroke="#10b981" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
              <circle cx={xScale(targetEndDate)} cy={yFor(goal.t6)} r="4" fill="#10b981" />
            </>
          )}
          {clean.length >= 2 && <path d={dataPath} fill="none" stroke={metric.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />}
          {clean.length === 1 && <circle cx={xScale(clean[0].date)} cy={yFor(clean[0].value)} r="4" fill={metric.color} />}
          {clean.map((p, i) => (
            <React.Fragment key={`${p.date}-${i}`}>
              {i === clean.length - 1 && <circle cx={xScale(p.date)} cy={yFor(p.value)} r="6" fill="none" stroke={metric.color} strokeWidth="1" opacity="0.5" />}
              <circle cx={xScale(p.date)} cy={yFor(p.value)} r="3.5" fill="#151515" stroke={metric.color} strokeWidth="2" />
            </React.Fragment>
          ))}
          {xLabels.map((xLabel, i) => (
            <text
              key={`${xLabel.idx}-${xLabel.label}`}
              x={xLabel.x}
              y={height - 8}
              textAnchor={xLabel.centered ? 'middle' : i === 0 ? 'start' : i === xLabels.length - 1 ? 'end' : 'middle'}
              fontSize="10"
              fill="rgba(255,255,255,0.5)"
            >
              {xLabel.label}
            </text>
          ))}
          {trend && <path d={trendPath} fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="1.8" strokeDasharray="5 4" strokeLinecap="round" />}
        </svg>

        {clean.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14, fontSize: FS.xs, color: 'rgba(255,255,255,0.68)', lineHeight: 1.45 }}>
            {clean.length === 1 ? (
              <div>Valore corrente: {fmtNumber(last.value)}</div>
            ) : (
              <div>Primo valore: {fmtNumber(first.value)} · Ultimo: {fmtNumber(last.value)}</div>
            )}
            {rangeText === 'stesso giorno' ? (
              <div>{clean.length === 1 ? '1 misurazione oggi' : `${clean.length} misurazioni oggi`}</div>
            ) : (
              <div>Variazione: {delta > 0 ? '+' : ''}{delta.toFixed(1)}% in {rangeText}</div>
            )}
            <div>Media: {fmtNumber(avgVal)} · Min: {fmtNumber(minData)} · Max: {fmtNumber(maxData)}</div>
          </div>
        ) : (
          <div style={{ marginTop: 14, fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>Aggiungi misurazioni per vedere il grafico</div>
        )}

        {optimal?.note && (
          <div style={{ marginTop: 14, padding: 10, borderRadius: 10, backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)', fontSize: FS.xs, color: 'rgba(255,255,255,0.78)', lineHeight: 1.45 }}>
            💡 Range ottimale per uomo 50+: {optimal.min}-{optimal.max}. {optimal.note}
          </div>
        )}

        {goal && (
          <div style={{ marginTop: 14, padding: 12, borderRadius: 10, backgroundColor: 'rgba(132,204,22,0.08)', border: '1px solid rgba(132,204,22,0.2)' }}>
            <div style={{ ...labelTiny, marginBottom: 7 }}>Obiettivo</div>
            <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.9)' }}>Target T+6m: {goal.t6 != null ? fmtNumber(goal.t6) : '—'} {goal.unit}</div>
            {goalPace?.text && (
              <div style={{ fontSize: FS.xs, color: goalPace.color, fontWeight: 600, marginTop: 5 }}>Pace attuale: {goalPace.icon} {goalPace.text}</div>
            )}
            <button onClick={() => { onClose(); setTab('goals'); }} style={{ ...btnSecondary, width: '100%', marginTop: 10 }}>Vai a obiettivi</button>
          </div>
        )}
      </div>
    </div>
  );
};

const RecentHistoryCard = ({ history, compact = false }) => {
  if (!history.workouts?.length) return null;
  return (
    <div style={compact ? card : cardLarge}>
      <div style={{ ...label, marginBottom: 12 }}>Storico recente</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {history.workouts.slice().reverse().slice(0, compact ? 5 : 8).map((w, i) => {
          const t = TASKS[w.taskId];
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <div style={{ fontSize: FS.sm, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span>{t?.icon} {w.name}</span>
                  {w.partial && (
                    <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(245,158,11,0.2)', color: '#f59e0b', padding: '2px 8px', borderRadius: 6, marginLeft: 8 }}>
                      Parziale {Math.round((w.completionPct || 0) * 100)}%
                    </span>
                  )}
                </div>
                <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.4)' }}>{new Date(w.date).toLocaleDateString('it-IT')}</div>
              </div>
              <Check size={18} color={t?.color || '#84cc16'} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GoalsTab = ({ goals, prs, history, onGloss, profile, saveProfile, setTab }) => {
  const saveCustomTarget = (goalId, t3, t6, t12) => {
    saveProfile({ ...profile, customGoalTargets: { ...(profile.customGoalTargets || {}), [goalId]: { t3, t6, t12 } } });
  };
  const resetCustomTarget = (goalId) => {
    const next = { ...(profile.customGoalTargets || {}) };
    delete next[goalId];
    if (GOAL_CUSTOM_ALIASES[goalId]) delete next[GOAL_CUSTOM_ALIASES[goalId]];
    saveProfile({ ...profile, customGoalTargets: next });
  };
  return (
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
      ) : goals.map(g => <GoalCard key={g.id} goal={g} onGloss={onGloss} onSaveCustom={saveCustomTarget} onResetCustom={resetCustomTarget} onViewHistory={() => setTab('measures')} />)}

      {Object.keys(prs).length > 0 && (
        <div style={cardLarge}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Award size={20} color="#fbbf24" />
            <div style={label}>Personal Records</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(prs).map(([lift, pr]) => (
              <div key={lift} style={{ padding: 14, border: `1px solid ${COLORS.success}55`, borderRadius: 12, backgroundColor: 'rgba(16,185,129,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: FS.sm, fontWeight: 600, lineHeight: 1.3 }}>{lift.split('(')[0].trim()}</div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: FS.base, fontWeight: 600, color: '#fff', marginTop: 6 }}>{pr.weight}kg × {pr.reps} reps</div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: FS.sm, fontWeight: 700, color: COLORS.success, marginTop: 4 }}>1RM: {pr.oneRM}kg</div>
                  </div>
                  <PRSparkline history={history} lift={lift} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const GoalCard = ({ goal, onGloss, onSaveCustom, onResetCustom, onViewHistory }) => {
  const [editing, setEditing] = useState(false);
  const [editT3, setEditT3] = useState('');
  const [editT6, setEditT6] = useState('');
  const [editT12, setEditT12] = useState('');

  const cur = typeof goal.current === 'number' ? goal.current : null;
  const t6val = typeof goal.t6 === 'number' ? goal.t6 : null;
  const baseline = parseDecimal(goal.baseline);
  const progressFor = (value) => {
    if (value === null || value === undefined || !baseline || t6val === null || t6val === baseline) return null;
    const raw = goal.better === 'down'
      ? ((baseline - value) / (baseline - t6val)) * 100
      : ((value - baseline) / (t6val - baseline)) * 100;
    return Math.max(0, Math.min(100, raw));
  };
  const currentProgress = progressFor(cur);
  const expectedProgress = progressFor(goal.expectedNow);
  const monthsElapsed = goal.baselineDate ? Math.max(0, (new Date() - new Date(goal.baselineDate)) / (1000 * 60 * 60 * 24 * 30.44)) : 0;
  const nearestTarget = [3, 6, 12].reduce((closest, month) => (
    Math.abs(monthsElapsed - month) < Math.abs(monthsElapsed - closest) ? month : closest
  ), 3);
  const pace = paceLabel(goal.current, goal.expectedNow, goal.better);

  const startEditing = () => {
    setEditT3(goal.t3 != null ? String(goal.t3) : '');
    setEditT6(goal.t6 != null ? String(goal.t6) : '');
    setEditT12(goal.t12 != null ? String(goal.t12) : '');
    setEditing(true);
  };
  const saveEdit = () => {
    onSaveCustom(goal.id, parseDecimal(editT3) || null, parseDecimal(editT6) || null, parseDecimal(editT12) || null);
    setEditing(false);
  };

  return (
    <div style={cardLarge}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ ...label, display: 'flex', alignItems: 'center', gap: 2 }}>
            {goal.label}
            {goal.glossKey && <InfoButton glossKey={goal.glossKey} onClick={onGloss} />}
            {goal.isCustom && <span style={{ fontSize: FS.tiny, color: '#f59e0b', marginLeft: 4 }}>custom</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: FS['2xl'], fontWeight: 600 }}>{goal.current != null ? fmtNumber(goal.current) : '—'}</span>
            <span style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.4)' }}>{goal.unit}</span>
          </div>
          {pace.text && (
            <div style={{ fontSize: FS.xs, color: pace.color, fontWeight: 600, marginTop: 5 }}>
              {pace.icon} {pace.text}
            </div>
          )}
        </div>
        {!editing && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
            <button onClick={startEditing} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: FS.xs, cursor: 'pointer', padding: 4, minHeight: 36 }}>Modifica</button>
            <button onClick={onViewHistory} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: FS.tiny, cursor: 'pointer', padding: 4, minHeight: 36 }}>Vedi storico</button>
          </div>
        )}
      </div>

      {editing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[['3 mesi', editT3, setEditT3], ['6 mesi', editT6, setEditT6], ['12 mesi', editT12, setEditT12]].map(([lbl, val, setter]) => (
              <div key={lbl}>
                <div style={{ fontSize: FS.tiny, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{lbl}</div>
                <input type="text" inputMode="decimal" value={displayDecimalInput(val)} onChange={e => updateDecimalInput(e.target.value, setter)} style={{ ...inputStyle, padding: '8px 6px', fontSize: FS.sm, textAlign: 'center' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: goal.isCustom ? '1fr 1fr 1fr' : '1fr 1fr', gap: 8 }}>
            <button onClick={() => setEditing(false)} style={btnSecondary}>Annulla</button>
            {goal.isCustom && <button onClick={() => { onResetCustom(goal.id); setEditing(false); }} style={{ ...btnSecondary, color: '#f87171' }}>Reset</button>}
            <button onClick={saveEdit} style={btnPrimary}>Salva</button>
          </div>
        </div>
      ) : (
        <>
          {goal.info && <div style={{ fontSize: FS.xs, color: '#84cc16', marginBottom: 8, fontStyle: 'italic' }}>💡 {goal.info}</div>}
          {baseline && goal.baselineDate && (
            <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>
              Baseline: {fmtNumber(baseline)} {goal.unit} · da {new Date(goal.baselineDate).toLocaleDateString('it-IT')}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center', marginBottom: 12 }}>
            {[[3, goal.t3], [6, goal.t6], [12, goal.t12]].map(([month, target]) => (
              <div key={month} style={{ backgroundColor: nearestTarget === month ? 'rgba(132,204,22,0.14)' : 'rgba(255,255,255,0.05)', border: nearestTarget === month ? '1px solid rgba(132,204,22,0.36)' : '1px solid transparent', borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: FS.tiny, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{month} mesi</div>
                <div style={{ fontSize: FS.sm, fontWeight: 600, marginTop: 2 }}>{target != null ? fmtNumber(target) : '—'}</div>
              </div>
            ))}
          </div>
          {currentProgress !== null && expectedProgress !== null && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.tiny, color: 'rgba(255,255,255,0.38)', marginBottom: 5 }}>
                <span>Baseline</span>
                <span>T+6m</span>
              </div>
              <div style={{ position: 'relative', height: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6 }}>
                <div style={{ height: '100%', backgroundColor: 'rgba(132,204,22,0.38)', borderRadius: 6, width: `${currentProgress}%` }} />
                <div title="Pace atteso" style={{ position: 'absolute', top: -3, left: `calc(${expectedProgress}% - 1px)`, width: 2, height: 18, backgroundColor: '#fff', opacity: 0.8 }} />
                <div title="Valore corrente" style={{ position: 'absolute', top: 1, left: `calc(${currentProgress}% - 5px)`, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#84cc16', border: '2px solid #111', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.tiny, color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>
                <span>Atteso {fmtNumber(goal.expectedNow)}</span>
                <span>Oggi {cur != null ? fmtNumber(cur) : '—'}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ============ MEASURES ============
const MeasuresTab = ({ measurements, saveMeasurements, history, onGloss, profile, setTab }) => {
  const [showNew, setShowNew] = useState(false);
  const [newM, setNewM] = useState(emptyMeasurementDraft);
  const [chartModal, setChartModal] = useState(null);
  const sorted = (measurements || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  const fields = [
    { key: 'weight', label: 'Peso', unit: 'kg', better: 'maintain', color: COLORS.recovery },
    { key: 'bodyFat', label: '% Grasso', unit: '%', better: 'down', glossKey: 'composizione corporea', color: COLORS.recovery, optimalRange: METRIC_OPTIMAL.bodyFat },
    { key: 'muscleMassKg', label: 'Massa muscolare', unit: 'kg', better: 'up', color: COLORS.forza },
    { key: 'visceralFat', label: 'Grasso viscerale', unit: 'indice', better: 'down', glossKey: 'composizione corporea', color: COLORS.recovery },
    { key: 'vo2max', label: 'VO2max', unit: 'ml/kg/min', better: 'up', glossKey: 'VO2max', color: COLORS.cardio, optimalRange: METRIC_OPTIMAL.vo2max },
    { key: 'hrRest', label: 'FC riposo', unit: 'bpm', better: 'down', color: COLORS.cardio, optimalRange: METRIC_OPTIMAL.hrRest },
    { key: 'hrv', label: 'HRV', unit: 'ms', better: 'up', glossKey: 'HRV', color: COLORS.cardio, optimalRange: METRIC_OPTIMAL.hrv },
    { key: 'grip', label: 'Forza presa', unit: 'kg', better: 'up', glossKey: 'grip strength', color: COLORS.forza },
    { key: 'bpSys', label: 'Pressione sistolica', unit: 'mmHg', better: 'down', color: COLORS.alert, optimalRange: METRIC_OPTIMAL.bpSys },
    { key: 'bpDia', label: 'Pressione diastolica', unit: 'mmHg', better: 'down', color: COLORS.alert, optimalRange: METRIC_OPTIMAL.bpDia }
  ];

  const getPointsFor = (key, limit = 12) => {
    const points = (measurements || [])
      .filter(m => m[key] !== undefined && m[key] !== '')
      .map(m => ({ date: m.date, value: m[key] }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return limit ? points.slice(-limit) : points;
  };

  const calcTrend = (key, better) => {
    const series = getPointsFor(key).map(p => parseDecimal(p.value)).filter(Boolean);
    if (series.length < 2) return null;
    const latest = series[series.length - 1], previous = series[0];
    const delta = ((latest - previous) / previous) * 100;
    const positive = better === 'up' ? delta > 0 : better === 'down' ? delta < 0 : Math.abs(delta) < 5;
    return { delta, positive, latest, previous };
  };

  const save = async () => {
    const entries = fields
      .map(f => ({ key: f.key, value: newM[f.key]?.value || '', date: newM[f.key]?.date || todayKey() }))
      .filter(f => f.value !== '')
      .map(f => ({ date: f.date, [f.key]: f.value }));
    if (entries.length === 0) { setShowNew(false); return; }
    await saveMeasurements([...measurements, ...entries]);
    setNewM(emptyMeasurementDraft());
    setShowNew(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
      <header style={{ paddingTop: 8 }}>
        <h1 style={{ fontSize: FS['3xl'], fontWeight: 300 }}>Trend</h1>
        <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Trend mensili</div>
      </header>

      <button onClick={() => setShowNew(true)} style={btnPrimary}>+ Aggiungi misurazione</button>

      {showNew && (
        <div style={{ ...cardLarge, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: FS.base, fontWeight: 600 }}>Nuova misurazione</div>
          {fields.map(f => (
            <div key={f.key}>
              <div style={{ fontSize: FS.xs, marginBottom: 4 }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 2 }}>
                  {f.label}
                  {f.glossKey && <InfoButton glossKey={f.glossKey} onClick={onGloss} />}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 8, fontSize: FS.tiny, marginBottom: 4 }}>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>Valore{f.unit ? ` (${f.unit})` : ''}</span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>Data</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 8 }}>
                <input type="text" inputMode="decimal" value={displayDecimalInput(newM[f.key]?.value || '')} onChange={e => updateDecimalInput(e.target.value, value => setNewM({ ...newM, [f.key]: { ...(newM[f.key] || {}), value } }))} style={inputStyle} placeholder={f.unit === 'ml/kg/min' ? 'da Salute → Cardio Fitness' : 'da Salute o Withings'} />
                <input type="date" value={newM[f.key]?.date || todayKey()} onChange={e => setNewM({ ...newM, [f.key]: { ...(newM[f.key] || {}), date: e.target.value } })} style={compactDateInputStyle} />
              </div>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
            <button onClick={() => setShowNew(false)} style={btnSecondary}>Annulla</button>
            <button onClick={save} style={btnPrimary}>Salva</button>
          </div>
        </div>
      )}

      {fields.map(f => {
        const points = getPointsFor(f.key);
        const latestPoint = points[points.length - 1];
        if (!latestPoint) return null;
        const latest = parseDecimal(latestPoint.value);
        const trend = calcTrend(f.key, f.better);
        const Icon = !trend || Math.abs(trend.delta) < 2 ? Minus : (trend.delta > 0 ? TrendingUp : TrendingDown);
        const trendColor = !trend ? 'rgba(255,255,255,0.45)' : trend.positive ? '#84cc16' : '#f87171';
        const absolute = evalAbsolute(f.key, latest, f.better);
        return (
          <TouchablePress key={f.key} onClick={() => { haptic('light'); setChartModal(f); }} style={{ ...card, width: '100%', textAlign: 'left', color: '#fff', borderColor: `${f.color}44`, minHeight: 44 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ ...label, display: 'flex', alignItems: 'center', gap: 2 }}>
                <span>
                  {f.label}
                </span>
                {f.glossKey && (
                  <span
                    onClick={(e) => { e.stopPropagation(); onGloss(f.glossKey); }}
                    style={{ color: 'rgba(255,255,255,0.4)', padding: 4, display: 'inline-flex', alignItems: 'center' }}
                  >
                    <Info size={16} />
                  </span>
                )}
              </div>
              <span style={{ fontSize: FS.lg, color: 'rgba(255,255,255,0.4)' }}>→</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: FS['2xl'], fontWeight: 700, fontFamily: FONT_MONO }}>{fmtNumber(latest)}</span>
              <span style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.4)' }}>{f.unit}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginTop: 8 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
                  <div>
                    <div style={labelTiny}>Trend</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: trendColor, marginTop: 2 }}>
                      <Icon size={18} />
                      <span style={{ fontSize: FS.sm, fontWeight: 600 }}>{trend ? `${trend.delta > 0 ? '+' : ''}${trend.delta.toFixed(1)}%` : '—'}</span>
                    </div>
                  </div>
                  {absolute && (
                    <div>
                      <div style={labelTiny}>Stato</div>
                      <div style={{ fontSize: FS.xs, color: absolute.color, fontWeight: 600, marginTop: 4 }}>
                        {absolute.icon} {absolute.label}
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                  {trend ? `Da ${fmtNumber(trend.previous)} → ${fmtNumber(trend.latest)} (${points.length} mis.)` : `${points.length} misurazione`}
                </div>
              </div>
              <Sparkline points={points} color={f.color} />
            </div>
          </TouchablePress>
        );
      })}

      {sorted.length === 0 && (
        <div style={{ ...cardLarge, padding: 24, textAlign: 'center' }}>
          <Activity size={40} color="rgba(255,255,255,0.3)" style={{ margin: '0 auto' }} />
          <div style={{ marginTop: 12, color: 'rgba(255,255,255,0.6)', fontSize: FS.base }}>Nessuna misurazione</div>
        </div>
      )}

      {chartModal && <FullChartModal metric={chartModal} points={getPointsFor(chartModal.key, 12)} profile={profile} measurements={measurements} setTab={setTab} onClose={() => setChartModal(null)} />}
    </div>
  );
};

// ============ SUPPLEMENTS MANAGER ============
const SupplementsManager = ({ supplements, onChange }) => {
  const list = supplements || [];
  const FREQ_OPTIONS = ['giornaliero', 'post-workout', '2x settimana', '3x settimana', 'settimanale', 'al bisogno'];

  const update = (i, field, value) => {
    const next = list.map((s, idx) => idx === i ? { ...s, [field]: value } : s);
    onChange(next);
  };
  const remove = (i) => onChange(list.filter((_, idx) => idx !== i));
  const add = () => onChange([...list, { name: '', dose: '', freq: 'giornaliero', startDate: '' }]);

  if (list.length === 0) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: FS.sm, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', textAlign: 'center', padding: '8px 0' }}>Nessun supplemento. Tap "+" per aggiungere.</div>
      <button onClick={add} style={{ ...btnSecondary, fontSize: FS.sm }}>+ Aggiungi supplemento</button>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {list.map((s, i) => (
        <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="text" value={s.name} onChange={e => update(i, 'name', e.target.value)} placeholder="Nome (es. Omega-3)" style={{ ...inputStyle, flex: 2, padding: '8px 10px', fontSize: FS.sm }} />
            <button onClick={() => remove(i)} style={{ background: 'none', border: 'none', color: '#f87171', fontSize: FS.lg, cursor: 'pointer', minWidth: 36, minHeight: 44, flexShrink: 0 }}>×</button>
          </div>
          <input type="text" value={s.dose} onChange={e => update(i, 'dose', e.target.value)} placeholder="Dose (es. 2g EPA+DHA)" style={{ ...inputStyle, padding: '8px 10px', fontSize: FS.sm }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 8 }}>
            <select value={s.freq} onChange={e => update(i, 'freq', e.target.value)} style={{ ...inputStyle, padding: '8px 10px', fontSize: FS.sm }}>
              {FREQ_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <input type="date" value={s.startDate} onChange={e => update(i, 'startDate', e.target.value)} style={{ ...compactDateInputStyle, padding: '8px 10px' }} />
          </div>
        </div>
      ))}
      <button onClick={add} style={{ ...btnSecondary, fontSize: FS.sm }}>+ Aggiungi supplemento</button>
    </div>
  );
};

// ============ PROFILE ============
const ProfileTab = ({ profile, saveProfile, measurements, onReport, onReset, onExport, onImport, onGloss }) => {
  const [open, setOpen] = useState({ bio: true, supp: false, blood: false });
  const update = (k, v) => saveProfile({ ...profile, [k]: v });
  const age = calcAge(profile.birthDate);
  const latestWeight = getLatestMeasurementSnapshot(measurements).weight;
  const proteinTarget = latestWeight ? Math.round(parseDecimal(latestWeight) * 1.7) : 0;
  const fileRef = useRef();
  const bloodDateFor = (key) => profile.bloodDates?.[key] || profile.bloodDate || '';
  const updateBloodDate = (key, value) => saveProfile({ ...profile, bloodDates: { ...(profile.bloodDates || {}), [key]: value } });
  const latestBloodDate = BLOOD_FIELDS
    .filter(m => profile[m.key])
    .map(m => bloodDateFor(m.key))
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a))[0];

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
        <Field label="Data di nascita" value={profile.birthDate} unit={age !== null ? `${age} anni` : ''} onChange={v => update('birthDate', v)} type="date" />
        <Field label="Altezza" value={profile.height} unit="cm" onChange={v => update('height', v)} type="number" />
        <Field label="FC max" value={profile.hrMax} unit="bpm" onChange={v => update('hrMax', v)} type="number" placeholder={age !== null ? `Stima: ${220 - age} (220-età)` : '220-età'} glossKey="FCmax" onGloss={onGloss} />
        <div style={{ fontSize: FS.tiny, color: 'rgba(255,255,255,0.5)', marginTop: 4, lineHeight: 1.4, fontStyle: 'italic' }}>
          💡 Peso, VO2max, FC riposo, HRV e pressione vanno nella tab <strong>Trend</strong> (cambiano nel tempo).
        </div>
      </Section>

      <Section title="Supplementazione" open={open.supp} toggle={() => setOpen(s => ({ ...s, supp: !s.supp }))}>
        <SupplementsManager supplements={profile.supplements || []} onChange={list => update('supplements', list)} />
      </Section>

      <Section title="Esami sangue" open={open.blood} toggle={() => setOpen(s => ({ ...s, blood: !s.blood }))}>
        {/* Alert esami scaduti */}
        {latestBloodDate && (() => {
          const monthsAgo = (Date.now() - new Date(latestBloodDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
          if (monthsAgo > 6) {
            return (
              <div style={{ ...card, backgroundColor: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.3)', marginBottom: 4 }}>
                <div style={{ fontSize: FS.sm, color: '#fbbf24', fontWeight: 600 }}>⚠️ Esami obsoleti</div>
                <div style={{ fontSize: FS.xs, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Esame più recente {Math.round(monthsAgo)} mesi fa. Consigliato controllo periodico ogni 6 mesi a 53 anni.</div>
              </div>
            );
          }
          return null;
        })()}

        <BloodGroupHeader>🔥 Infiammazione e metabolismo</BloodGroupHeader>
        <BloodField fieldKey="hsCRP" label="hs-CRP" value={profile.hsCRP} unit="mg/L" onChange={v => update('hsCRP', v)} date={bloodDateFor('hsCRP')} onDateChange={v => updateBloodDate('hsCRP', v)} />
        <BloodField fieldKey="insulin" label="Insulina a digiuno" value={profile.insulin} unit="µU/mL" onChange={v => update('insulin', v)} date={bloodDateFor('insulin')} onDateChange={v => updateBloodDate('insulin', v)} />
        <BloodField fieldKey="homa" label="HOMA-IR" value={profile.homa} unit="" onChange={v => update('homa', v)} date={bloodDateFor('homa')} onDateChange={v => updateBloodDate('homa', v)} />
        <BloodGroupHeader>❤️ Lipidi e cardiovascolare</BloodGroupHeader>
        <BloodField fieldKey="cholTotal" label="Colesterolo totale" value={profile.cholTotal} unit="mg/dL" onChange={v => update('cholTotal', v)} date={bloodDateFor('cholTotal')} onDateChange={v => updateBloodDate('cholTotal', v)} />
        <BloodField fieldKey="ldl" label="LDL" value={profile.ldl} unit="mg/dL" onChange={v => update('ldl', v)} date={bloodDateFor('ldl')} onDateChange={v => updateBloodDate('ldl', v)} />
        <BloodField fieldKey="hdl" label="HDL" value={profile.hdl} unit="mg/dL" onChange={v => update('hdl', v)} date={bloodDateFor('hdl')} onDateChange={v => updateBloodDate('hdl', v)} />
        <BloodField fieldKey="trigl" label="Trigliceridi" value={profile.trigl} unit="mg/dL" onChange={v => update('trigl', v)} date={bloodDateFor('trigl')} onDateChange={v => updateBloodDate('trigl', v)} />
        <BloodField fieldKey="apoB" label="ApoB" value={profile.apoB} unit="mg/dL" onChange={v => update('apoB', v)} date={bloodDateFor('apoB')} onDateChange={v => updateBloodDate('apoB', v)} />
        <BloodField fieldKey="lpa" label="Lp(a)" value={profile.lpa} unit="nmol/L" onChange={v => update('lpa', v)} date={bloodDateFor('lpa')} onDateChange={v => updateBloodDate('lpa', v)} />
        <BloodGroupHeader>🍬 Glicemia</BloodGroupHeader>
        <BloodField fieldKey="glucose" label="Glicemia" value={profile.glucose} unit="mg/dL" onChange={v => update('glucose', v)} date={bloodDateFor('glucose')} onDateChange={v => updateBloodDate('glucose', v)} />
        <BloodField fieldKey="hba1c" label="HbA1c" value={profile.hba1c} unit="%" onChange={v => update('hba1c', v)} date={bloodDateFor('hba1c')} onDateChange={v => updateBloodDate('hba1c', v)} />
        <BloodGroupHeader>⚡ Ormonale</BloodGroupHeader>
        <BloodField fieldKey="testTot" label="Testosterone totale" value={profile.testTot} unit="ng/dL" onChange={v => update('testTot', v)} date={bloodDateFor('testTot')} onDateChange={v => updateBloodDate('testTot', v)} />
        <BloodField fieldKey="testFree" label="Testosterone libero" value={profile.testFree} unit="pg/mL" onChange={v => update('testFree', v)} date={bloodDateFor('testFree')} onDateChange={v => updateBloodDate('testFree', v)} />
        <BloodField fieldKey="shbg" label="SHBG" value={profile.shbg} unit="nmol/L" onChange={v => update('shbg', v)} date={bloodDateFor('shbg')} onDateChange={v => updateBloodDate('shbg', v)} />
        <BloodField fieldKey="tsh" label="TSH" value={profile.tsh} unit="mU/L" onChange={v => update('tsh', v)} date={bloodDateFor('tsh')} onDateChange={v => updateBloodDate('tsh', v)} />
        <BloodField fieldKey="ft3" label="Free T3" value={profile.ft3} unit="pg/mL" onChange={v => update('ft3', v)} date={bloodDateFor('ft3')} onDateChange={v => updateBloodDate('ft3', v)} />
        <BloodGroupHeader>🩸 Altri marker</BloodGroupHeader>
        <BloodField fieldKey="homocysteine" label="Omocisteina" value={profile.homocysteine} unit="µmol/L" onChange={v => update('homocysteine', v)} date={bloodDateFor('homocysteine')} onDateChange={v => updateBloodDate('homocysteine', v)} />
        <BloodField fieldKey="vitDBlood" label="Vit. D" value={profile.vitDBlood} unit="ng/mL" onChange={v => update('vitDBlood', v)} date={bloodDateFor('vitDBlood')} onDateChange={v => updateBloodDate('vitDBlood', v)} />
        <BloodField fieldKey="ferritin" label="Ferritina" value={profile.ferritin} unit="ng/mL" onChange={v => update('ferritin', v)} date={bloodDateFor('ferritin')} onDateChange={v => updateBloodDate('ferritin', v)} />
        <BloodField fieldKey="egfr" label="eGFR" value={profile.egfr} unit="mL/min/1.73m²" onChange={v => update('egfr', v)} date={bloodDateFor('egfr')} onDateChange={v => updateBloodDate('egfr', v)} />
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

const Field = ({ label: lbl, value, unit, onChange, type = 'text', placeholder = '', glossKey, onGloss }) => {
  const inputType = type === 'number' ? 'text' : type;
  const inputMode = type === 'number' ? 'decimal' : undefined;
  const inputValue = type === 'number' ? displayDecimalInput(value) : value;
  const handleChange = e => {
    if (type === 'number') updateDecimalInput(e.target.value, onChange);
    else onChange(e.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FS.xs, marginBottom: 4 }}>
        <span style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 2 }}>
          {lbl}
          {glossKey && <InfoButton glossKey={glossKey} onClick={onGloss} />}
        </span>
        {unit && <span style={{ color: 'rgba(255,255,255,0.4)' }}>{unit}</span>}
      </div>
      <input type={inputType} inputMode={inputMode} value={inputValue} onChange={handleChange} placeholder={placeholder} style={type === 'date' ? compactDateInputStyle : inputStyle} />
    </div>
  );
};

const BloodGroupHeader = ({ children }) => (
  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 16, marginBottom: 8 }}>
    {children}
  </div>
);

const BloodField = ({ fieldKey, label: lbl, value, unit, onChange, date, onDateChange }) => {
  const evaluation = value ? evalMarker(fieldKey, value) : null;
  return (
    <div>
      <div style={{ fontSize: FS.xs, marginBottom: 4 }}>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>{lbl}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 8, fontSize: FS.tiny, marginBottom: 4 }}>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>Valore{unit ? ` (${unit})` : ''}</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>Data</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 8 }}>
        <div style={{ position: 'relative', minWidth: 0 }}>
          <input type="text" inputMode="decimal" value={displayDecimalInput(value)} onChange={e => updateDecimalInput(e.target.value, onChange)} style={{ ...inputStyle, paddingRight: evaluation ? 36 : 12, borderColor: evaluation ? evaluation.color + '50' : 'rgba(255,255,255,0.1)' }} />
          {evaluation && (
            <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, borderRadius: '50%', backgroundColor: evaluation.color }} />
          )}
        </div>
        <input type="date" value={date || ''} onChange={e => onDateChange(e.target.value)} style={compactDateInputStyle} />
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
    <div style={{ ...APP_STYLE, minHeight: '100vh', paddingBottom: screenBottomPadding }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: `${screenTopPadding} 16px 0` }}>
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

const avg = (arr) => arr.length ? arr.reduce((a, b) => a + parseDecimal(b), 0) / arr.length : 0;
const fmt = (n, d = 1) => n ? n.toFixed(d) : '—';

const generateReport = (profile, history, measurements, dailyLogs, goals, health, streak, prs) => {
  const today = new Date().toLocaleDateString('it-IT');
  const last7 = Array.from({ length: 7 }, (_, i) => daysAgo(i));
  const wk4 = []; for (let i = 0; i < 4; i++) { const d = new Date(); d.setDate(d.getDate() - i * 7); wk4.push(weekKey(d)); }
  const recent = (history.workouts || []).filter(w => wk4.includes(weekKey(new Date(w.date))));
  const checkIns = last7.map(d => dailyLogs[d]?.checkIn).filter(Boolean);
  const latest = getLatestMeasurementSnapshot(measurements);
  const reportAge = calcAge(profile.birthDate);
  const proteinTarget = latest.weight ? Math.round(parseDecimal(latest.weight) * 1.7) : 0;

  let r = `# Report Allenamento - ${today}\n\n`;
  r += `## Profilo\n- Età: ${reportAge ?? '—'} anni · Peso: ${latest.weight || '—'} kg · Altezza: ${profile.height || '—'} cm\n`;
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

  r += `\n## Obiettivi\n`;
  goals.forEach(g => {
    const pace = paceLabel(g.current, g.expectedNow, g.better);
    r += `\n### ${g.label}${g.baselineDate ? ` (locked da ${g.baselineDate})` : ''}\n`;
    r += `${g.current != null ? fmtNumber(g.current) : '—'} ${g.unit} (target T+6m: ${g.t6 != null ? fmtNumber(g.t6) : '—'})\n\n`;
    r += `Baseline: ${g.baseline != null ? fmtNumber(g.baseline) : '—'}${g.baselineDate ? ` (da ${g.baselineDate})` : ''} · oggi: ${g.current != null ? fmtNumber(g.current) : '—'} · pace expected: ${g.expectedNow != null ? fmtNumber(g.expectedNow) : '—'}\n`;
    if (pace.text) r += `${pace.icon} ${pace.text}\n`;
  });

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
    Object.entries(prs).forEach(([lift, pr]) => { r += `- ${lift}: ${pr.weight}kg × ${pr.reps} (1RM stimato ${pr.oneRM}kg)\n`; });
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

  if (profile.supplements && profile.supplements.length > 0) {
    r += `\n## Supplementazione\n`;
    profile.supplements.forEach(s => {
      if (s.name) r += `- ${s.name}: ${s.dose || '—'} (${s.freq || 'giornaliero'}${s.startDate ? `, da ${s.startDate}` : ''})\n`;
    });
  }

  if (BLOOD_FIELDS.some(m => profile[m.key])) {
    r += `\n## Esami sangue\n`;
    BLOOD_FIELDS.forEach(m => {
      if (!profile[m.key]) return;
      const markerDate = profile.bloodDates?.[m.key] || profile.bloodDate || 'data n/d';
      r += `- ${m.label}: ${profile[m.key]}${m.unit ? ` ${m.unit}` : ''} (${markerDate})\n`;
    });
  }

  r += `\n## Attività extra del mese (compilare a mano)\n_Aggiungi qui hiking, sci, padel, camminate lunghe, ecc._\n`;
  r += `\n---\nChiedi a Claude un check-up del piano e suggerimenti per progressione.`;
  return r;
};

const ResetModal = ({ onConfirm, onCancel }) => {
  const [step, setStep] = useState(1);
  return (
    <div style={{ ...modalOverlayStyle, zIndex: 50 }}>
      <div style={{ ...modalPanelStyle, border: '1px solid rgba(255,255,255,0.1)', maxWidth: 360, color: '#fff' }}>
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
