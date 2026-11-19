// ============================================================================
// IERARHIE GRADE & GRILĂ SALARIALĂ D.O.S. (MARV ROLEPLAY)
// ============================================================================
export const SALARY_STRUCTURE = [
  {
    category: 'BIROU EXECUTIV',
    badgeColor: 'text-amber-300 border-amber-400/50 bg-amber-500/15',
    ranks: [
      { rank: 'Director', salary: 70000 },
      { rank: 'Director adjunct', salary: 70000 }
    ]
  },
  {
    category: 'CONDUCERE D.O.S / OFIȚERI SUPERIORI',
    badgeColor: 'text-rose-300 border-rose-400/50 bg-rose-500/15',
    ranks: [
      { rank: 'Supervizor', salary: 50000 },
      { rank: 'Supraveghetor', salary: 50000 },
      { rank: 'Comandant operativ', salary: 50000 },
      { rank: 'Șef de echipă', salary: 40000 }
    ]
  },
  {
    category: 'OFIȚERI INFERIORI',
    badgeColor: 'text-cyan-300 border-cyan-400/50 bg-cyan-500/15',
    ranks: [
      { rank: 'Șef birou', salary: 35000 },
      { rank: 'Căpitan', salary: 35000 },
      { rank: 'Locotenent', salary: 35000 },
      { rank: 'Sublocotenent', salary: 35000 },
      { rank: 'Operator', salary: 30000 },
      { rank: 'Ofițer de informații', salary: 30000 },
      { rank: 'Tactician operativ', salary: 30000 }
    ]
  },
  {
    category: 'SUB-OFIȚERI',
    badgeColor: 'text-emerald-300 border-emerald-400/50 bg-emerald-500/15',
    ranks: [
      { rank: 'Sergent', salary: 30000 },
      { rank: 'Specialist operativ', salary: 25000 },
      { rank: 'Agent senior', salary: 25000 },
      { rank: 'Agent', salary: 20000 },
      { rank: 'Agent în probe', salary: 20000 }
    ]
  }
];

export const RANKS = SALARY_STRUCTURE.flatMap((cat) => cat.ranks.map((r) => r.rank));

export const SENIOR_OR_LEADERSHIP_RANKS = [
  'Șef de echipă',
  'Comandant operativ',
  'Supraveghetor',
  'Supervizor',
  'Director adjunct',
  'Director'
];

export const getBaseSalaryForRank = (rank) => {
  const normalized = (rank || '').trim().toLowerCase();
  for (const cat of SALARY_STRUCTURE) {
    const found = cat.ranks.find((r) => r.rank.toLowerCase() === normalized);
    if (found) return found.salary;
  }
  return 20000;
};

// ============================================================================// REGISTRUL COMPLET AL CELOR 27 MEMBRI D.O.S. (PAROLE INDIVIDUALE + COOLDOWN)
// ============================================================================
export const INITIAL_USERS = [
  {
    id: 'm-01', selector: 'Vali | Alfa 69', name: 'Vali', username: 'DomnulVal0',
    robloxId: '5628041169', badge: 'Alfa | 69', rank: 'Director',
    isPilot: true, isInstructor: true, isHR: true, hoursWorked: 42,
    password: 'Vali@Alfa69', status: 'Activ pe Stație', hasTestAccess: true,
    cooldownUntil: null, cooldownReason: '', warnings: [],
    testHistory: [{ testName: 'Evaluare Comandament D.O.S.', score: '10/10', passed: true, date: '16.04.2026' }]
  },
  {
    id: 'm-02', selector: 'David | Bravo 01', name: 'David', username: 'David3354d',
    robloxId: '2903356806', badge: 'Bravo | 01', rank: 'Director adjunct',
    isPilot: false, isInstructor: false, isHR: true, hoursWorked: 38,
    password: 'David@Bravo01', status: 'Activ pe Stație', hasTestAccess: true,
    cooldownUntil: null, cooldownReason: '', warnings: [],
    testHistory: [{ testName: 'Evaluare Comandament D.O.S.', score: '10/10', passed: true, date: '18.04.2026' }]
  },
  {
    id: 'm-03', selector: 'Ton | Victor 72', name: 'Ton', username: 'oiramgaming17',
    robloxId: '213599379', badge: 'Victor | 72', rank: 'Supraveghetor',
    isPilot: false, isInstructor: false, isHR: true, hoursWorked: 30,
    password: 'Ton@Victor72', status: 'Sub Acoperire', hasTestAccess: true,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-04', selector: 'Kent | Echo 01', name: 'Kent', username: 'DranghetaK1en7t',
    robloxId: '1945359936', badge: 'Echo | 01', rank: 'Supraveghetor',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 28,
    password: 'Kent@Echo01', status: 'Sub Acoperire', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-05', selector: 'Aris | Charlie 00', name: 'Aris', username: 'Ar1s_Q',
    robloxId: '2483801810', badge: 'Charlie | 00', rank: 'Comandant operativ',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 26,
    password: 'Aris@Charlie00', status: 'Activ pe Stație', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-06', selector: 'Gabriel | X-ray 04', name: 'Gabriel', username: 'valentin440111',
    robloxId: '1813421717', badge: 'X-ray | 04', rank: 'Șef de echipă',
    isPilot: false, isInstructor: false, isHR: true, hoursWorked: 25,
    password: 'Gabriel@Xray04', status: 'Sub Acoperire', hasTestAccess: true,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-07', selector: 'Dragos | Oscar 28', name: 'Dragos', username: 'dragosgroza26',
    robloxId: '5223018723', badge: 'Oscar | 28', rank: 'Operator',
    isPilot: true, isInstructor: false, isHR: false, hoursWorked: 22,
    password: 'Dragos@Oscar28', status: 'Sub Acoperire', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-08', selector: 'Stefan | Delta 01', name: 'Stefan', username: 'stefan20391c',
    robloxId: '4413835275', badge: 'Delta | 01', rank: 'Operator',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 19,
    password: 'Stefan@Delta01', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-09', selector: 'Dede | Echo 77', name: 'Dede', username: 'GhepardulImperial117',
    robloxId: '1843312666', badge: 'Echo | 77', rank: 'Ofițer de informații',
    isPilot: false, isInstructor: true, isHR: true, hoursWorked: 24,
    password: 'Dede@Echo77', status: 'Activ pe Stație', hasTestAccess: true,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-10', selector: 'Vladutz | Whiskey 09', name: 'Vladutz', username: 'heffwge_V',
    robloxId: '2643518397', badge: 'Whiskey | 09', rank: 'Ofițer de informații',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 18,
    password: 'Vladutz@Whiskey09', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-11', selector: 'Edi | Delta 00', name: 'Edi', username: 'edi7525',
    robloxId: '4420097815', badge: 'Delta | 00', rank: 'Sublocotenent',
    isPilot: true, isInstructor: false, isHR: false, hoursWorked: 21,
    password: 'Edi@Delta00', status: 'Sub Acoperire', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-12', selector: 'Andrei | Oscar 18', name: 'Andrei', username: 'Andrei_Cash21',
    robloxId: '5114545513', badge: 'Oscar | 18', rank: 'Agent senior',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 16,
    password: 'Andrei@Oscar18', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-13', selector: 'Matei | Delta 01', name: 'Matei', username: 'MATTEI614',
    robloxId: '5335648282', badge: 'Delta | 01', rank: 'Agent senior',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 15,
    password: 'Matei@Delta01', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-14', selector: 'Daniel | Delta 04', name: 'Daniel', username: 'danielq828',
    robloxId: '5099404540', badge: 'Delta | 04', rank: 'Agent senior',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 14,
    password: 'Daniel@Delta04', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-15', selector: 'Mike | Mike 17', name: 'Mike', username: 'darinowtime',
    robloxId: '2895650598', badge: 'Mike | 17', rank: 'Agent senior',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 17,
    password: 'Mike@Mike17', status: 'Sub Acoperire', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-16', selector: 'Patrick | Mika 99', name: 'Patrick', username: 'pxtric123',
    robloxId: '4545933738', badge: 'Mika | 99', rank: 'Agent în probe',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 8,
    password: 'Patrick@Mika99', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-17', selector: 'Matei | X-ray 67', name: 'Matei', username: 'mateimains',
    robloxId: '5773742696', badge: 'X-ray | 67', rank: 'Agent în probe',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 7,
    password: 'Matei@Xray67', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-18', selector: 'Dark | Echo 19', name: 'Dark', username: 'darki11254',
    robloxId: '11129517540', badge: 'Echo | 19', rank: 'Agent',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 12,
    password: 'Dark@Echo19', status: 'Sub Acoperire', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-19', selector: 'Tudor | Victor 20', name: 'Tudor', username: 'Tudorel086',
    robloxId: '5412651740', badge: 'Victor | 20', rank: 'Agent senior',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 15,
    password: 'Tudor@Victor20', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-20', selector: 'Golf | XrMihai13 | 56', name: 'Mihai', username: 'XrMihai13',
    robloxId: '-', badge: 'Golf | 56', rank: 'Agent în probe',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 5,
    password: 'Mihai@Golf56', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-21', selector: 'Zulu | Deian1393 | 21', name: 'Deian', username: 'Deian1393',
    robloxId: '-', badge: 'Zulu | 21', rank: 'Agent în probe',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 6,
    password: 'Deian@Zulu21', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-22', selector: 'Ianiss | Delta | 02', name: 'Ianis', username: 'Ianiss',
    robloxId: '-', badge: 'Delta | 02', rank: 'Agent în probe',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 4,
    password: 'Ianis@Delta02', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-23', selector: 'Andrei_cpm | Echo | 90', name: 'Andrei_Cpm', username: 'Andrei_cpm',
    robloxId: '-', badge: 'Echo | 90', rank: 'Agent în probe',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 6,
    password: 'Andrei@Echo90', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-24', selector: 'Golf | Higi2373 | 14', name: 'Higi', username: 'Higi2373',
    robloxId: '-', badge: 'Golf | 14', rank: 'Agent în probe',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 5,
    password: 'Higi@Golf14', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-25', selector: 'daeriuidfsf | OSCAR | 68', name: 'Nike', username: 'daeriuidfsf',
    robloxId: '-', badge: 'Oscar | 68', rank: 'Agent în probe',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 4,
    password: 'Nike@Oscar68', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-26', selector: 'Falixor | Lima | 1', name: 'Alex', username: 'Falixor',
    robloxId: '-', badge: 'Lima | 01', rank: 'Agent în probe',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 5,
    password: 'Alex@Lima01', status: 'Offline', hasTestAccess: false,
    cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: []
  },
  {
    id: 'm-27', selector: 'X-ray | HatzGheGhe | 93', name: 'Hatz', username: 'HatzGheGhe',
    robloxId: '-', badge: 'X-ray | 93', rank: 'Agent în probe',
    isPilot: false, isInstructor: false, isHR: false, hoursWorked: 3,
    password: 'Hatz@Xray93', status: 'Offline', hasTestAccess: false,
    cooldownUntil: Date.now() + 23 * 3600 * 1000,
    cooldownReason: 'Tentativă Alt+Tab detectată în timpul evaluării (Cooldown 24h)',
    warnings: [], testHistory: []
  }
];

export const INITIAL_WANTED = [
  {
    id: 'W-101', name: 'Viktor "Vipera" Moraru',
    alias: 'Lider Rețea Trafic Arme • ID #8841', danger: 'CRITIC',
    location: 'Zona Industrială / Port • Mercedes G-Class Negru Mat',
    reward: '50.000 / Mandat Executat', status: 'ACTIV',
    crimes: 'Trafic de armament greu, Atac armat asupra forțelor de ordine, Răpire.',
    evidence: 'Filaj video DOS #442 - Livrare portuară vehicul negru.',
    sightings: ['18.11.2026 16:20 – Văzut în zona Portuară de către Echo | 01'],
    stamp: 'Aprobat Director', date: '14.11.2026', addedBy: 'DomnulVal0'
  },
  {
    id: 'W-102', name: 'Andrei "Fantoma" Dobre',
    alias: 'Curier Substanțe Interzise • ID #4190', danger: 'RIDICAT',
    location: 'Cartierul Rezidențial Nord • BMW M5 Negru',
    reward: '35.000 / Mandat Executat', status: 'ACTIV',
    crimes: 'Trafic de droguri de mare risc, Spălare de bani, Fuga de la locul faptei.',
    evidence: 'Interceptări comunicații + Fotografii operative sub acoperire.',
    sightings: [], stamp: 'Aprobat Director Adjunct', date: '16.11.2026', addedBy: 'valentin440111'
  },
  {
    id: 'W-103', name: 'Mihai Călin',
    alias: 'Suspect Jaf Bancar • ID #7723', danger: 'MEDIU',
    location: 'Centru / Bancă Principală • Audi RS6 Gri',
    reward: '25.000 / Mandat Executat', status: 'CAPTURAT',
    crimes: 'Complicitate la jaf armat, Deținere ilegală de muniție.',
    evidence: 'Raport misiune #89 - Reținut de echipa Bravo.',
    sightings: ['17.11.2026 19:30 – Reținut în urma descinderii Bravo'],
    stamp: 'Aprobat Conducerea DOS', date: '17.11.2026', addedBy: 'darki11254'
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'RAP-088', team: 'Alfa (valentin440111, darki11254)', date: '15.11.2026 21:40',
    type: 'Filaj & Supraveghere Sub Acoperire',
    summary: 'Monitorizare discretă în zona industrială timp de 45 minute cu Mercedes Vito undercover. Documentate 3 tranzacții ilegale fără compromiterea acoperirii. Semnalele luminoase nu au fost utilizate.',
    videoLink: 'https://medal.tv/dos-rec-088', stamp: 'Aprobat Director'
  },
  {
    id: 'RAP-089', team: 'Bravo (David3354d, Ar1s_Q, dragosgroza26)', date: '17.11.2026 19:15',
    type: 'Descindere & Intervenție Tactică (Patrulă Oficială)',
    summary: 'Identificare clară și repetată ca membri DOS. Echipa a efectuat manevra Clește și Room Clearing (Sectoarele 1, 2, 3 - CLEAR). Suspecții imobilizați fără victime civile.',
    videoLink: 'https://medal.tv/dos-rec-089', stamp: 'Aprobat Conducerea DOS'
  }
];

export const INITIAL_TEST_SUBMISSIONS = [
  {
    id: 'SUB-001', userId: 'm-18', username: 'darki11254', name: 'Dark',
    badge: 'Echo | 19', rank: 'Agent', testId: 'test-admitere',
    testTitle: 'Test 1: Evaluare Regulament & Protocol Operativ D.O.S.',
    score: '9/10', passed: true, reason: 'Promovat regulamentar', timestamp: '16.11.2026 18:45',
    answersBreakdown: [
      { question: 'Ce trebuie să faci când ești pe tură în regim sub acoperire și observi un jaf sau schimb de focuri?', chosenOption: 'Nu intervii – înregistrezi totul și postezi dovezile în canalul dedicat probelor', correctOption: 'Nu intervii – înregistrezi totul și postezi dovezile în canalul dedicat probelor', isCorrect: true },
      { question: 'Conform Art. 1.5, care este primul grad care are voie să meargă singur pe tură?', chosenOption: 'Agent', correctOption: 'Agent', isCorrect: true }
    ]
  },
  {
    id: 'SUB-002', userId: 'm-27', username: 'HatzGheGhe', name: 'Hatz',
    badge: 'X-ray | 93', rank: 'Agent în probe', testId: 'test-admitere',
    testTitle: 'Test 1: Evaluare Regulament & Protocol Operativ D.O.S.',
    score: '0/10 (ANULAT)', passed: false,
    reason: 'ANTI-CHEAT: Alt+Tab / Părăsire fereastră activă', timestamp: '17.11.2026 20:14',
    answersBreakdown: [
      { question: 'Ce trebuie să faci când ești pe tură în regim sub acoperire și observi un jaf sau schimb de focuri?', chosenOption: 'Întrerupt de sistemul Anti-Cheat la întrebarea #2', correctOption: 'Nu intervii – înregistrezi totul și postezi dovezile în canalul dedicat probelor', isCorrect: false }
    ]
  }
];

// FIX: Tura lui Kent eliminată — nu mai pornește automat la fiecare încărcare
export const INITIAL_ACTIVE_SHIFTS = [];

export const INITIAL_SHIFT_LOGS = [
  {
    id: 'TUR-101', userId: 'm-06', username: 'valentin440111', name: 'Gabriel',
    badge: 'X-ray | 04', rank: 'Șef de echipă', patrolType: 'Sub Acoperire (Filaj)',
    startTimeStr: '18.11.2026 11:00', endTimeStr: '18.11.2026 13:15',
    durationMinutes: 135, hoursCredited: 2.25, bonusEarned: 13500,
    stopType: 'OPRITĂ MANUAL', stoppedBy: 'valentin440111'
  }
];

export const formatDurationHMS = (totalSeconds) => {
  const safeSec = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(safeSec / 3600);
  const mins = Math.floor((safeSec % 3600) / 60);
  const secs = safeSec % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const REGULATION_SECTIONS = [
  {
    id: 'sec-1', title: 'Secțiunea 1: Confidențialitate și Discreție', badge: 'ESENȚIAL',
    items: [
      { subtitle: 'Confidențialitatea Identității', points: [
        'Membrii DOS trebuie să păstreze secretul identității lor și a altor membri. Orice dezvăluire neautorizată va fi sancționată sever.',
        'Evitați dezvăluirea apartenenței la DOS în public sau către jucători neautorizați.'
      ]},
      { subtitle: 'Utilizarea Vehiculelor Undercover', points: [
        'Agenții DOS trebuie să patruleze serverele folosind vehicule undercover pentru a evita identificarea și pentru a surprinde activitățile ilegale.',
        'Vehiculele undercover trebuie să fie bine întreținute și să nu atragă atenția.'
      ]},
      { subtitle: 'Comunicare Sigură', points: [
        'Folosiți doar canalele de comunicare securizate aprobate pentru discuțiile despre misiuni.',
        'Evitați discuțiile despre operațiuni în locuri publice sau în prezența persoanelor neautorizate.'
      ]}
    ]
  },
  {
    id: 'sec-2', title: 'Secțiunea 2: Interdicții și Sancțiuni', badge: 'DISCIPLINAR',
    items: [
      { subtitle: 'Interdicții Stricte', points: [
        'Nu dezvăluiți informații confidențiale despre misiuni, strategii sau membri DOS către jucători neautorizați.',
        'Nu folosiți resursele DOS în scopuri personale sau în afara misiunilor autorizate.',
        'Nu vă implicați în activități ilegale sau comportamente care ar putea compromite securitatea echipei DOS.',
        'Nu abuzați de putere sau autoritate pentru a intimida sau hărțui alți jucători.'
      ]},
      { subtitle: 'Consecințe și Sancțiuni', points: [
        'Încălcarea regulamentului va atrage sancțiuni, inclusiv avertismente, suspendări sau excluderea din echipă.',
        'Sancțiunile sunt decise de Directorul DOS sau alte persoane desemnate, în funcție de gravitatea încălcării.'
      ]}
    ]
  },
  {
    id: 'sec-3', title: 'Secțiunea 3: Comportament și Profesionalism', badge: 'CONDUITĂ',
    items: [
      { subtitle: 'Respectarea Protocolului', points: [
        'Respectați întotdeauna procedurile stabilite pentru misiuni și intervenții.',
        'Acționați conform instrucțiunilor primite de la superiori și coordonați-vă eficient cu colegii.'
      ]}
    ]
  },
  {
    id: 'sec-4', title: 'Secțiunea 4: Patrulare și Intervenții', badge: 'OPERATIV',
    items: [
      { subtitle: 'Patrulare', points: [
        'Patrulele trebuie să fie planificate și coordonate pentru a acoperi eficient zonele de interes.',
        'Fiecare patrulă trebuie să includă cel puțin doi membri pentru siguranță și eficiență (cu excepția gradului Agent conform Art. 1.5).'
      ]},
      { subtitle: 'Intervenții și Patrulare (Regim sub acoperire)', points: [
        'Când sunteți pe tură, nu participați la intervenții directe. Activitatea voastră este exclusiv sub acoperire. Rolul fiecărui agent este să supravegheze, să fileze și să documenteze activitățile ilegale desfășurate de mafioți sau civili.',
        'În momentul în care observați o ilegalitate (jaf, trafic, schimburi de focuri etc.), nu interveniți – totul se înregistrează și se postează ca dovezi ale ilegalității într-un canal dedicat probelor, folosit pentru întocmirea dosarelor și obținerea mandatelor.',
        'Pentru menținerea acoperirii, este interzis să purtați uniforma, vesta, arma la vedere sau alte elemente tactice. Nu interveniți sub nicio formă, chiar dacă sunteți martori la o agresiune.',
        'Singura excepție este situația în care sunteți în pericol direct (ex: se încearcă o răpire). În acel caz, reacționați pentru autoapărare, fără echipare, apoi vă retrageți. Revenirea în rol activ nu este permisă.'
      ]},
      { subtitle: 'Patrule Oficiale & Semnale Luminoase/Sonore', points: [
        'În cadrul patrulelor oficiale anunțate, este permisă purtarea uniformei complete și a echipamentului tactic. Doar în acest context se participă la intervenții.',
        'Semnalele luminoase și sonore ale vehiculelor undercover sunt folosite exclusiv în timpul intervențiilor desfășurate în patrulele oficiale. În timpul activității sub acoperire, acestea nu se folosesc pentru a nu compromite discreția.',
        'Mențineți o comunicare constantă cu ceilalți membri ai echipei și superiorii pentru a coordona acțiunile în timp real.'
      ]}
    ]
  },
  {
    id: 'sec-5', title: 'Secțiunea 5: Instruire și Dezvoltare', badge: 'ANTRENAMENT',
    items: [
      { subtitle: 'Antrenamente Regulate & Mentorat', points: [
        'Participarea la sesiunile de antrenament este obligatorie pentru toți agenții. Singura excepție o reprezintă antrenamentele anunțate în mod expres ca neobligatorii. Absențele nemotivate pot atrage sancțiuni disciplinare.',
        'Rămâneți la curent cu noile proceduri și tactici de intervenție.',
        'Membrii experimentați sunt încurajați să ofere mentorat recruților și agenților noi.'
      ]}
    ]
  },
  {
    id: 'sec-6', title: 'Secțiunea 6: Responsabilități Individuale', badge: 'AUTO-DISCIPLINĂ',
    items: [
      { subtitle: 'Auto-Disciplină și Pregătire Continuă', points: [
        'Mențineți un comportament profesional și respectuos.',
        'Asumați-vă responsabilitatea pentru acțiunile și deciziile voastre.',
        'Fiți proactivi în dezvoltarea competențelor necesare pentru a excela în rolul vostru.'
      ]}
    ]
  },
  {
    id: 'sec-7', title: 'Secțiunea 7: Reguli de Intervenție', badge: 'OBLIGATORIU',
    items: [
      { subtitle: 'Protocolul de Intervenție DOS', points: [
        'Identificarea Obligatorie: În timpul unei intervenții, agenții DOS trebuie să se identifice clar și repetat ca membri "DOS" pentru a asigura recunoașterea de către toate părțile implicate.',
        'Formarea Echipei de Intervenție: O intervenție DOS trebuie efectuată de o echipă formată din cel puțin două persoane, care pot comunica eficient prin Voice Chat (VC).',
        'Obligația de Înregistrare: Agenții DOS sunt obligați să înregistreze fiecare intervenție de la început până la sfârșit, pentru a asigura transparența și documentarea completă a operațiunilor (anunțați dacă aveți PC slab).',
        'Completarea Formularului de Rapoarte: După fiecare intervenție, echipa participantă trebuie să desemneze un membru care să completeze formularul „Rapoarte Misiuni" pe canalul desemnat.'
      ]}
    ]
  },
  {
    id: 'sec-9', title: 'Secțiunea 9: Confidențialitate și Discreție Operațională', badge: 'STRICT SECRET',
    items: [
      { subtitle: 'Securitatea Informațiilor Joc & Discord', points: [
        'Orice membru al echipei DOS are obligația de a se menține cât mai discret posibil, evitând să atragă atenția atât în mediul fizic din joc, cât și pe Discord.',
        'Este strict interzis să divulgi orice informație legată de echipa DOS, fie în joc, fie pe Discord: fotografii personale, echipamente, mașini, detalii despre misiuni, informații de pe Discord, imagini cu uniforme DOS, capturi de ecran din Discord, copierea mesajelor sau partajarea oricărui conținut legat de DOS (inclusiv iconița de pe Discord).',
        'Acumularea repetată de abateri privind divulgarea informațiilor va duce la excluderea din echipă pentru divulgare neautorizată.'
      ]}
    ]
  },
  {
    id: 'sec-10', title: 'Secțiunea 10: Reguli și Conduită Generală + Art. 1.5 & Note Conducere', badge: 'REGULI CHEIE',
    items: [
      { subtitle: 'Reguli Generale pe Tură și Stație', points: [
        'Este obligatoriu să vă prezentați atunci când sunteți chemați de un superior. Refuzul sau absența nemotivată atrage sancțiuni disciplinare.',
        'Este strict interzis să scrieți pe stație!',
        'Faptul că aveți un grad mai mare nu vă face superiori colegilor din alte divizii. Toți membrii DOS sunt considerați egali ca statut, indiferent de grad.',
        'Nu aveți voie să purtați conversații cu alți cetățeni sau membri ai altor structuri atunci când sunteți pe tură la DOS.',
        'Uniforma DOS poate fi purtată doar de membrii AAT. Cei din afara acestei divizii nu au voie să o folosească, nici măcar cu permisiune.',
        'Gradele considerate superioare în cadrul DOS sunt de la Șef de Echipă în sus.',
        'Este obligatoriu să fiți activi pe stație pe toată durata turei. Lipsa de reacție sau absența de pe stație în timpul activității este considerată abatere.'
      ]},
      { subtitle: 'Art. 1.5 & Reguli Agenți în Probe / AFK', points: [
        'Art. 1.5: Gradul care are voie să meargă singur pe tură este: Agent.',
        'Agenților în probe le este permis să meargă pe tură doar cu aprobarea conducerii / fără FTO = Sancțiune tip Warn, SAU când există deja un Agent Senior, SAU dacă agenții în probe s-au strâns într-un număr de două-trei persoane.',
        'AFK cât timp sunteți pe tura DOS este interzis și se sancționează cu Warn / Suspendare.',
        'Plățile sunt definitive și nerambursabile! Plățile se fac doar la conducerea autorizată.'
      ]}
    ]
  },
  {
    id: 'sec-11', title: 'Secțiunea 11: Conduita, Disciplina și Respectul Ierarhic (Art. 11.1 – 11.7)', badge: 'IERARHIE',
    items: [
      { subtitle: 'Art. 11.1 – 11.4: Comportament, Standard și Abateri Repetate', points: [
        'Art. 11.1: Toți membrii DOS au obligația de a menține un comportament decent, respectuos și disciplinat față de ofițerii inferiori, colegii de același rang, ofițerii superiori și conducerea echipei. Se aplică inclusiv pentru Conducere: fiecare membru de la agent în probe până la director trebuie respectat ierarhic.',
        'Art. 11.2: Limbajul necorespunzător, lipsa de respect, insubordonarea, provocările intenționate și comportamentul care afectează disciplina ori imaginea DOS constituie abateri disciplinare.',
        'Art. 11.3: Conducerea poate aplica sancțiuni cuprinse între avertisment și OUT (îndepărtarea din cadrul DOS), proporțional cu gravitatea abaterii.',
        'Art. 11.4: Membrii care au fost sancționați anterior și continuă să repete aceleași abateri pot fi sancționați progresiv, inclusiv prin demitere.'
      ]},
      { subtitle: 'Art. 11.5 – 11.7: Abateri Grave, Analiză și Aplicabilitate', points: [
        'Art. 11.5: În caz de lipsă gravă de respect, insubordonare majoră, amenințări, jigniri grave, se poate dispune sancțiunea OUT direct, fără avertisment prealabil.',
        'Art. 11.6: Înaintea aplicării unei sancțiuni severe (OUT), conducerea DOS analizează gravitatea faptei, dovezile și antecedentele. În situații urgente se pot dispune măsuri provizorii.',
        'Art. 11.7: Niciun membru nu este exceptat de la respectarea prezentei secțiuni, indiferent de grad, funcție, vechime sau relații personale. Necunoașterea regulamentului nu exonerează de răspundere.'
      ]}
    ]
  }
];

export const TACTICAL_CODES = [
  { code: 'ALFA', desc: 'Punct de referință sau liderul echipei.', category: 'Comandă' },
  { code: 'BRAVO', desc: 'Al doilea punct de referință sau a doua echipă.', category: 'Comandă' },
  { code: 'PERIMETRU', desc: 'Zona din jurul țintei care trebuie securizată.', category: 'Tactic' },
  { code: 'CONTACT', desc: 'Întâlnire cu inamicul sau suspecții.', category: 'Alertă' },
  { code: 'CLAREAZĂ', desc: 'Verifică și asigură-te că zona este sigură (Clear).', category: 'Tactic' },
  { code: 'SUSȚINE', desc: 'Oferă sprijin unui alt membru al echipei.', category: 'Echipă' },
  { code: 'BLOCARE', desc: 'Menținerea unei poziții pentru a împiedica mișcarea inamicului.', category: 'Tactic' },
  { code: 'DESCINDERE', desc: 'Intrare rapidă într-o clădire sau zonă controlată.', category: 'Asalt' },
  { code: 'EXTRAGERE', desc: 'Scoaterea rapidă a unui individ sau echipă dintr-o zonă periculoasă.', category: 'Asalt' },
  { code: 'TĂCERE RADIO', desc: 'Oprirea comunicațiilor radio pentru a preveni interceptarea.', category: 'Comunicații' },
  { code: 'RĂSPUNDE', desc: 'Întoarcerea focului către inamic.', category: 'Asalt' },
  { code: 'INTERVINE', desc: 'Intrarea într-o zonă pentru a neutraliza o amenințare.', category: 'Asalt' },
  { code: 'CLEȘTE', desc: 'Tactică de încercuire a inamicului din două direcții diferite.', category: 'Tactic' },
  { code: 'PAZĂ', desc: 'Menținerea unei poziții defensive pentru a proteja o anumită zonă.', category: 'Tactic' },
  { code: 'SCUT', desc: 'Folosirea scutului balistic pentru protecția echipei în timpul intervenției.', category: 'Echipament' },
  { code: 'COD ROȘU', desc: 'Indică o situație de urgență maximă care necesită acțiune imediată.', category: 'Alertă' },
  { code: 'VERDE', desc: 'Zona este sigură.', category: 'Status' },
  { code: 'ROȘU', desc: 'Zona este periculoasă.', category: 'Status' }
];

export const NATO_ALPHABET = {
  A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot',
  G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima',
  M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo',
  S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray',
  Y: 'Yankee', Z: 'Zulu',
  '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
  '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
};

export const TESTS_DATA = [
  {
    id: 'test-admitere',
    title: 'Test 1: Evaluare Regulament & Protocol Operativ D.O.S.',
    subtitle: 'Evaluare obligatorie privind regulamentul intern, regimul sub acoperire, limbajul tactic și echipamentul.',
    passingScore: 8, cooldownHours: 24,
    questions: [
      { q: 'Ce trebuie să faci când ești pe tură în regim sub acoperire și observi un jaf sau schimb de focuri?', options: ['Intervii imediat cu arma și îi arestezi pe suspecți','Pornești girofarul și sirena pentru a-i speria','Nu intervii – înregistrezi totul și postezi dovezile în canalul dedicat probelor','Te duci să discuți cu mafioții să îi avertizezi'], correct: 2 },
      { q: 'Care este singura excepție în care poți reacționa în regim sub acoperire?', options: ['Când vezi un coleg din altă structură amendând pe cineva','Când ești în pericol direct (ex: se încearcă o răpire) – reacționezi pentru autoapărare fără echipare, apoi te retragi','Când îți cere un civil ajutorul pe stradă','Oricând ai chef de acțiune'], correct: 1 },
      { q: 'Conform Art. 1.5, care este primul grad care are voie să meargă singur pe tură?', options: ['Agent în Probe','Agent','Director Adjunct','Orice recrut cu permisiune de la civili'], correct: 1 },
      { q: 'În ce condiții are voie un Agent în Probe să meargă pe tură?', options: ['Singur, la orice oră','Doar cu aprobarea conducerii / FTO, când există deja un Agent Senior sau în grup de 2-3 agenți în probe','Doar în uniformă completă de lunetist','Nu are voie deloc pe server'], correct: 1 },
      { q: 'Ce înseamnă termenul tactic „CLEȘTE" în Secțiunea 8?', options: ['Oprirea comunicațiilor radio','Scoaterea rapidă dintr-o zonă periculoasă','Tactică de încercuire a inamicului din două direcții diferite','Zona este sigură'], correct: 2 },
      { q: 'Care este echipamentul corect pentru @T | Agent În Probe?', options: ['Mască: Șapcă cu Căști, Vestă: 2, Uniforma 10','Cap: N/A, Mască: Cagulă 2, Vestă: 3, Uniforma: uniforma1, Spate: N/A, Picior stâng/drept (holdere)','Uniformă de poliție rutieră și vestă 5','Orice costum din magazin'], correct: 1 },
      { q: 'Ce este STRICT INTERZIS să faci pe stație conform Secțiunii 10?', options: ['Să vorbești pe Voice Chat','Să scrii pe stație','Să răspunzi superiorilor','Să folosești alfabetul NATO'], correct: 1 },
      { q: 'Cum se sancționează statul AFK cât timp sunteți pe tura D.O.S.?', options: ['Nu se sancționează','Cu o promovare','Cu Warn / Suspendare','Cu o felicitare pe Discord'], correct: 2 },
      { q: 'De la ce grad în sus sunt considerate gradele superioare în cadrul D.O.S.?', options: ['De la Agent în sus','De la Șef de Echipă în sus','Doar Directorul','De la Agent în Probe în sus'], correct: 1 },
      { q: 'Ce obligație ai în timpul unei intervenții oficiale D.O.S. (Secțiunea 7)?', options: ['Să nu spui cine ești și să tragi fără somație','Să te identifici clar și repetat ca membru "DOS", echipă min. 2 persoane pe VC, înregistrare video și raport post-misiune','Să intervii singur fără înregistrare','Să porți haine civile fără vestă'], correct: 1 }
    ]
  },
  {
    id: 'test-avansare',
    title: 'Test 2: Evaluare Avansată & Tactici Speciale (Lunetist / Șef Echipă)',
    subtitle: 'Evaluare avansată privind Planul Tactic General, Alfabetul NATO, Echipament Lunetist și Conduita Ierarhică.',
    passingScore: 6, cooldownHours: 48,
    questions: [
      { q: 'Cum se transmite cuvântul „ATAC" folosind Alfabetul Fonetic NATO?', options: ['Alpha Tango Alpha Charlie','Alfa Tomato Alfa Carlo','Alpha Tiger Alpha Cobra','Anton Tudor Anton Constantin'], correct: 0 },
      { q: 'Care este configurația exactă de echipament pentru @L | Lunetist Autorizat?', options: ['Mască Cagulă 2, Vestă 3, Uniforma 1','Cap N/A, Mască Șapcă cu Căști, Vestă 2, Uniforma 10 (penultima), Spate/Mână/Curea N/A, Picior stâng/drept (holdere)','Cască balistică, Vestă 4, Uniforma 5','Costum negru și cravată'], correct: 1 },
      { q: 'Ce presupune termenul tactic „TĂCERE RADIO"?', options: ['Închiderea jocului Roblox','Oprirea comunicațiilor radio pentru a preveni interceptarea','Vorbitul în șoaptă pe Discord','Schimbarea frecvenței cu civilii'], correct: 1 },
      { q: 'Cine are voie să poarte uniforma D.O.S. conform Secțiunii 10?', options: ['Oricine cere permisiune pe stație','Doar membrii AAT (cei din afara acestei divizii nu au voie nici măcar cu permisiune)','Orice polițist din LAPD','Doar recruții în prima zi'], correct: 1 },
      { q: 'Care este ordinea corectă a etapelor unei misiuni D.O.S.?', options: ['Executarea -> Evaluarea -> Planificarea','Analiza situației -> Planificare operativă -> Coordonare -> Executarea misiunii -> Evaluare post-misiune','Descinderea directă fără colectare de informații','Raportul final înainte de intervenție'], correct: 1 },
      { q: 'Conform Art. 11.5, ce măsură poate dispune conducerea în cazul unei abateri deosebit de grave (insubordonare majoră, amenințări, jigniri grave)?', options: ['Doar o discuție amicală','Sancțiunea OUT direct, inclusiv fără aplicarea prealabilă a unui avertisment','Suspendare 5 minute','Retrogradare cu un singur grad'], correct: 1 },
      { q: 'În schema tactică „Room Clearing", ce semnifică verificarea sectoarelor 1, 2 și 3 cu verde?', options: ['Retragerea imediată din clădire','Acoperirea completă a unghiurilor moarte din încăpere și confirmarea că zona este CLAREATĂ (CLEAR)','Aruncarea grenadelor fumigene fără verificare','Așteptarea civililor în interior'], correct: 1 }
    ]
  },
  {
    id: 'test-confidentialitate',
    title: 'Test 3: Evaluare Confidențialitate, Disciplină & Sancțiuni D.O.S.',
    subtitle: 'Evaluare privind confidențialitatea, discreția operațională, conduita ierarhică și sancțiunile din regulament.',
    passingScore: 7, cooldownHours: 24,
    questions: [
      { q: 'Ce trebuie să facă membrii D.O.S. în privința identității lor (Secțiunea 1)?', options: ['Să o dezvăluie doar prietenilor apropiați','Să păstreze secretul identității lor și a altor membri; dezvăluirea neautorizată se sancționează sever','Să o posteze pe Discord pentru transparență','Nu contează, identitatea e publică'], correct: 1 },
      { q: 'Ce vehicule trebuie să folosească agenții D.O.S. pentru patrulare (Secțiunea 1)?', options: ['Vehicule de poliție cu insigne vizibile','Vehicule undercover pentru a evita identificarea','Orice vehicul personal','Doar motociclete'], correct: 1 },
      { q: 'Pe ce canale trebuie să se desfșoare discuțiile despre misiuni (Secțiunea 1)?', options: ['Pe orice canal Discord public','Doar pe canalele de comunicare securizate aprobate','Pe stația radio publică','În joc, în locuri publice'], correct: 1 },
      { q: 'Ce se întâmplă în caz de încălcare a regulamentului (Secțiunea 2)?', options: ['Nimic, regulamentul e doar orientativ','Sancțiuni: avertismente, suspendări sau excluderea din echipă','Doar o discuție informală','Promovare automată'], correct: 1 },
      { q: 'Cine decide sancțiunile în caz de încălcare a regulamentului (Secțiunea 2)?', options: ['Orice membru cu grad mai mare','Directorul D.O.S. sau persoanele desemnate','Toți membrii votează','Doar Roblox adminii'], correct: 1 },
      { q: 'Ce este STRICT INTERZIS să divulgi conform Secțiunii 9?', options: ['Doar numele tău','Orice informație legată de D.O.S.: fotografii, echipamente, mașini, detalii misiuni, capturi Discord','Doar locația misiunilor','Nimic, totul e public'], correct: 1 },
      { q: 'Ce se întâmplă la acumularea repetată de abateri privind divulgarea informațiilor (Secțiunea 9)?', options: ['Nimic special','Excluderea din echipă pentru divulgare neautorizată','Doar un avertisment','Retrogradare temporară'], correct: 1 },
      { q: 'Conform Art. 11.1, ce obligație au toți membrii D.O.S.?', options: ['Să respecte doar pe Director','Să mențină comportament decent, respectuos și disciplinat față de toți, indiferent de grad','Să comande doar ei operațiunile','Să nu comunice cu membrii inferiori'], correct: 1 },
      { q: 'Conform Art. 11.3, ce gamă de sancțiuni poate aplica conducerea?', options: ['Doar avertismente verbale','Sancțiuni de la avertisment până la OUT (îndepărtarea din DOS), proporțional cu gravitatea','Doar excluderea imediată','Doar retrogradări'], correct: 1 },
      { q: 'Conform Art. 11.7, cine este exceptat de la respectarea regulamentului?', options: ['Directorul','Nimeni – niciun membru nu este exceptat, indiferent de grad, funcție sau vechime','Membrii fondatori','Cei cu grad de Agent Senior'], correct: 1 }
    ]
  }
];
