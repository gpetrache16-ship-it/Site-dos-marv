import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield, Lock, Unlock, Terminal, Users, AlertTriangle,
  Search, Crosshair, Radio, Eye, Award, LogOut,
  LogIn, UserPlus, Trash2, Play, ChevronDown, ChevronUp,
  ClipboardList, Siren, Target, BookOpen, ShieldAlert, Key,
  Send, Plus, UserCheck, DollarSign, Clock, Plane, GraduationCap,
  Menu, X, ShieldOff, EyeOff, Edit3, RotateCcw,
  Timer, Square, PowerOff, RefreshCw, Activity, CheckCircle2, XCircle, MapPin
} from 'lucide-react';


import {
  SALARY_STRUCTURE, RANKS, SENIOR_OR_LEADERSHIP_RANKS, getBaseSalaryForRank,
  INITIAL_USERS, INITIAL_WANTED, INITIAL_REPORTS, INITIAL_TEST_SUBMISSIONS,
  INITIAL_ACTIVE_SHIFTS, INITIAL_SHIFT_LOGS, formatDurationHMS,
  REGULATION_SECTIONS, TACTICAL_CODES, NATO_ALPHABET, TESTS_DATA
} from './dos-data.jsx';
import {
  OfficialStamp, DosTypographicBanner, TacticalUndercoverShowcase, RoomClearingDiagram
} from './dos-components.jsx';

export default function App() {
  const [users, setUsers] = useState(() => {
    try { const saved = localStorage.getItem('dos_marv_users_v5'); return saved ? JSON.parse(saved) : INITIAL_USERS; } catch { return INITIAL_USERS; }
  });
  const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem('dos_marv_current_user_v5') || null);
  const [leadershipPin, setLeadershipPin] = useState(() => localStorage.getItem('dos_marv_hq_pin_v5') || 'DOS-2026-HQ');
  const [hqUnlocked, setHqUnlocked] = useState(false);
  const [hqPinInput, setHqPinInput] = useState('');
  const [hqPinError, setHqPinError] = useState('');
  const [newHqPinSetting, setNewHqPinSetting] = useState('');
  const [wantedList, setWantedList] = useState(() => {
    try { const saved = localStorage.getItem('dos_marv_wanted_v5'); return saved ? JSON.parse(saved) : INITIAL_WANTED; } catch { return INITIAL_WANTED; }
  });
  const [reports, setReports] = useState(() => {
    try { const saved = localStorage.getItem('dos_marv_reports_v5'); return saved ? JSON.parse(saved) : INITIAL_REPORTS; } catch { return INITIAL_REPORTS; }
  });
  const [testSubmissions, setTestSubmissions] = useState(() => {
    try { const saved = localStorage.getItem('dos_marv_test_subs_v5'); return saved ? JSON.parse(saved) : INITIAL_TEST_SUBMISSIONS; } catch { return INITIAL_TEST_SUBMISSIONS; }
  });
  const [activeShifts, setActiveShifts] = useState(() => {
    try { const saved = localStorage.getItem('dos_marv_active_shifts_v5'); return saved ? JSON.parse(saved) : INITIAL_ACTIVE_SHIFTS; } catch { return INITIAL_ACTIVE_SHIFTS; }
  });
  const [shiftLogs, setShiftLogs] = useState(() => {
    try { const saved = localStorage.getItem('dos_marv_shift_logs_v5'); return saved ? JSON.parse(saved) : INITIAL_SHIFT_LOGS; } catch { return INITIAL_SHIFT_LOGS; }
  });
  const [autoStopMinutes, setAutoStopMinutes] = useState(() => {
    const saved = localStorage.getItem('dos_marv_autostop_min_v5'); return saved ? Math.max(1, parseInt(saved, 10) || 180) : 180;
  });
  const [nowTimestamp, setNowTimestamp] = useState(() => Date.now());
  const [selectedPatrolType, setSelectedPatrolType] = useState('Sub Acoperire (Filaj)');
  const [selectedProbeCondition, setSelectedProbeCondition] = useState('Cu FTO / Agent Senior');
  const [shiftHistoryFilter, setShiftHistoryFilter] = useState('TOATE');

  useEffect(() => { try { localStorage.setItem('dos_marv_users_v5', JSON.stringify(users)); } catch (e) { console.error(e); } }, [users]);
  useEffect(() => {
    if (currentUserId) { localStorage.setItem('dos_marv_current_user_v5', currentUserId); }
    else { localStorage.removeItem('dos_marv_current_user_v5'); setHqUnlocked(false); }
  }, [currentUserId]);
  useEffect(() => {
    try {
      localStorage.setItem('dos_marv_hq_pin_v5', leadershipPin);
      localStorage.setItem('dos_marv_wanted_v5', JSON.stringify(wantedList));
      localStorage.setItem('dos_marv_reports_v5', JSON.stringify(reports));
      localStorage.setItem('dos_marv_test_subs_v5', JSON.stringify(testSubmissions));
      localStorage.setItem('dos_marv_active_shifts_v5', JSON.stringify(activeShifts));
      localStorage.setItem('dos_marv_shift_logs_v5', JSON.stringify(shiftLogs));
      localStorage.setItem('dos_marv_autostop_min_v5', String(autoStopMinutes));
    } catch (e) { console.error(e); }
  }, [leadershipPin, wantedList, reports, testSubmissions, activeShifts, shiftLogs, autoStopMinutes]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentNow = Date.now();
      setNowTimestamp(currentNow);
      const maxMs = autoStopMinutes * 60 * 1000;
      const expiredShifts = activeShifts.filter((sh) => currentNow - sh.startedAt >= maxMs);
      if (expiredShifts.length > 0) {
        const expiredIds = new Set(expiredShifts.map((s) => s.id));
        const expiredUserIds = new Set(expiredShifts.map((s) => s.userId));
        setActiveShifts((prev) => prev.filter((s) => !expiredIds.has(s.id)));
        const newLogEntries = expiredShifts.map((sh) => {
          const endTs = sh.startedAt + maxMs;
          return {
            id: 'TUR-' + Math.floor(100 + Math.random() * 899), userId: sh.userId, username: sh.username, name: sh.name, badge: sh.badge, rank: sh.rank, patrolType: sh.patrolType,
            startTimeStr: new Date(sh.startedAt).toLocaleString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            endTimeStr: new Date(endTs).toLocaleString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            durationMinutes: autoStopMinutes, hoursCredited: 0, bonusEarned: 0, stopType: 'OPRITĂ AUTOMAT (Limită depășită / Anti-AFK)', stoppedBy: 'SISTEM ANTI-AFK'
          };
        });
        setShiftLogs((prev) => [...newLogEntries, ...prev]);
        setUsers((prev) => prev.map((u) => (expiredUserIds.has(u.id) ? { ...u, status: 'Offline' } : u)));
        triggerToast(`ALERTĂ ANTI-AFK: ${expiredShifts.length} tură(e) oprită(e) automat la limita de ${autoStopMinutes} min!`, 'error');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeShifts, autoStopMinutes]);

  const currentUser = useMemo(() => users.find((u) => u.id === currentUserId) || null, [users, currentUserId]);
  const isLeadershipOrHR = useMemo(() => {
    if (!currentUser) return false;
    const rankMatch = SENIOR_OR_LEADERSHIP_RANKS.some((r) => r.toLowerCase() === currentUser.rank.toLowerCase());
    return rankMatch || Boolean(currentUser.isHR);
  }, [currentUser]);
  const isExecutive = useMemo(() => {
    if (!currentUser) return false;
    return ['Director', 'Director adjunct'].some((r) => r.toLowerCase() === currentUser.rank.toLowerCase());
  }, [currentUser]);

  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // FIX: Doar HR are acces la canalul de Teste
  const canSeeTestsChannel = useMemo(() => {
    if (!currentUser) return false;
    return Boolean(currentUser.isHR);
  }, [currentUser]);

  useEffect(() => {
    if (activeTab === 'teste' && !canSeeTestsChannel) { setActiveTab('home'); }
  }, [activeTab, canSeeTestsChannel]);

  const triggerToast = (msg, type = 'info') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const [regSearch, setRegSearch] = useState('');
  const [openSections, setOpenSections] = useState({ 'sec-1': true, 'sec-4': true, 'sec-7': true, 'sec-10': true });
  const [memberSearch, setMemberSearch] = useState('');
  const [natoInput, setNatoInput] = useState('ATAC');
  const natoTranslated = useMemo(() => {
    return natoInput.toUpperCase().split('').map((char) => { if (char === ' ') return ' / '; return NATO_ALPHABET[char] || char; }).join(' ').replace(/\s+\/\s+/g, '  |  ');
  }, [natoInput]);
  const [wantedFilter, setWantedFilter] = useState('TOATE');
  const [sightingInputMap, setSightingInputMap] = useState({});
  const [newSuspect, setNewSuspect] = useState({ name: '', alias: '', danger: 'RIDICAT', location: '', reward: '35.000 / Mandat Executat', crimes: '', evidence: '' });
  const [newReport, setNewReport] = useState({ team: '', type: 'Filaj & Supraveghere Sub Acoperire', summary: '', videoLink: '' });
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [examSessionVerified, setExamSessionVerified] = useState(false);
  const [examVerifyUser, setExamVerifyUser] = useState('');
  const [examVerifyPass, setExamVerifyPass] = useState('');
  const [examVerifyError, setExamVerifyError] = useState('');
  const [testAnswers, setTestAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);
  const [cheatViolationAlert, setCheatViolationAlert] = useState(null);
  const [expandedSubmissionId, setExpandedSubmissionId] = useState(null);

  const isUserOnCooldown = useMemo(() => {
    if (!currentUser || !currentUser.cooldownUntil) return false;
    return currentUser.cooldownUntil > nowTimestamp;
  }, [currentUser, nowTimestamp]);
  const cooldownRemainingSeconds = useMemo(() => {
    if (!currentUser || !currentUser.cooldownUntil) return 0;
    return Math.max(0, Math.floor((currentUser.cooldownUntil - nowTimestamp) / 1000));
  }, [currentUser, nowTimestamp]);

  useEffect(() => {
    const isTestActivelyRunning = activeTab === 'teste' && Boolean(selectedTestId) && examSessionVerified && !testResult && !cheatViolationAlert && Boolean(currentUser);
    if (!isTestActivelyRunning) return;
    const triggerAntiCheatViolation = (reasonText) => {
      const testObj = TESTS_DATA.find((t) => t.id === selectedTestId);
      const cdHours = testObj?.cooldownHours || 24;
      const cooldownEnd = Date.now() + cdHours * 3600 * 1000;
      const nowStr = new Date().toLocaleString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const breakdown = testObj ? testObj.questions.map((q, idx) => ({ question: q.q, chosenOption: testAnswers[idx] !== undefined ? q.options[testAnswers[idx]] : 'Nerăspuns (Oprit de Anti-Cheat)', correctOption: q.options[q.correct], isCorrect: testAnswers[idx] === q.correct })) : [];
      const subEntry = { id: 'SUB-' + Math.floor(100 + Math.random() * 899), userId: currentUser.id, username: currentUser.username, name: currentUser.name, badge: currentUser.badge, rank: currentUser.rank, testId: selectedTestId, testTitle: testObj ? testObj.title : selectedTestId, score: `0/${testObj ? testObj.questions.length : 10} (ANULAT)`, passed: false, reason: `ANTI-CHEAT: ${reasonText}`, timestamp: nowStr, answersBreakdown: breakdown };
      setTestSubmissions((prev) => [subEntry, ...prev]);
      setUsers((prev) => prev.map((u) => u.id === currentUser.id ? { ...u, cooldownUntil: cooldownEnd, cooldownReason: `Anti-Cheat (${reasonText}) • Cooldown ${cdHours}h`, testHistory: [{ testName: `${testObj ? testObj.title : 'Test D.O.S.'} [ANULAT ANTI-CHEAT]`, score: '0/10 (COOLDOWN)', passed: false, date: nowStr }, ...u.testHistory] } : u));
      setCheatViolationAlert({ reason: reasonText, timestamp: nowStr, testName: testObj ? testObj.title : 'Evaluare D.O.S.', cooldownHours: cdHours });
      setSelectedTestId(null);
      setExamSessionVerified(false);
    };
    const handleVisibilityChange = () => { if (document.hidden) triggerAntiCheatViolation('Schimbare tab / minimizare browser sau aplicație telefon'); };
    const handleWindowBlur = () => triggerAntiCheatViolation('Alt+Tab / Părăsire fereastră activă');
    const handleCopyPaste = (e) => { e.preventDefault(); triggerAntiCheatViolation('Tentativă de copiere/lipire text în timpul examinării'); };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
    };
  }, [activeTab, selectedTestId, examSessionVerified, testResult, cheatViolationAlert, currentUser, testAnswers]);

  const [cmdInput, setCmdInput] = useState('');
  const [cmdLogs, setCmdLogs] = useState([{ time: 'SYSTEM', text: 'Consolă Tactică D.O.S. & HR inițializată. Tastează /help pentru lista de comenzi.', type: 'system' }]);
  const [newMemberForm, setNewMemberForm] = useState({ selector: '', name: '', username: '', robloxId: '', badge: '', rank: 'Agent în probe', password: '', isPilot: false, isInstructor: false, isHR: false, hasTestAccess: false });
  const [editingCredentialsUserId, setEditingCredentialsUserId] = useState(null);
  const [editCredForm, setEditCredForm] = useState({ username: '', password: '' });
  const [showPasswordsMap, setShowPasswordsMap] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    const q = loginUsername.trim().toLowerCase();
    const found = users.find((u) => (u.username.toLowerCase() === q || u.name.toLowerCase() === q || u.selector.toLowerCase() === q) && u.password === loginPassword);
    if (!found) { setLoginError('Acces respins! Numele Roblox / utilizator sau parola individuală sunt incorecte.'); return; }
    setCurrentUserId(found.id); setLoginError(''); setLoginUsername(''); setLoginPassword(''); setHqUnlocked(false); setActiveTab('home');
    triggerToast(`Bine ai venit, ${found.name} (${found.username}) • Grad: ${found.rank}`, 'success');
  };
  const handleLogout = () => { setCurrentUserId(null); setHqUnlocked(false); setActiveTab('home'); setMobileMenuOpen(false); triggerToast('Deconectat din rețeaua securizată D.O.S.', 'info'); };
  const updateStatus = (newStatus) => { if (!currentUser) return; setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? { ...u, status: newStatus } : u))); triggerToast(`Status actualizat: ${newStatus}`, 'success'); };

  const currentUserActiveShift = useMemo(() => { if (!currentUser) return null; return activeShifts.find((s) => s.userId === currentUser.id) || null; }, [activeShifts, currentUser]);

  const handleStartShift = () => {
    if (!currentUser) return;
    if (activeShifts.some((s) => s.userId === currentUser.id)) { triggerToast('Ai deja o tură activă în desfășurare!', 'error'); return; }
    const isProbeAgent = currentUser.rank.toLowerCase() === 'agent în probe';
    const shiftObj = { id: 'SH-' + Date.now(), userId: currentUser.id, username: currentUser.username, name: currentUser.name, badge: currentUser.badge, rank: currentUser.rank, patrolType: selectedPatrolType, probeMode: isProbeAgent ? selectedProbeCondition : 'Autorizat Singur (Art. 1.5)', startedAt: Date.now() };
    setActiveShifts((prev) => [shiftObj, ...prev]);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? { ...u, status: selectedPatrolType.includes('Oficială') ? 'Patrulă Oficială' : 'Sub Acoperire' } : u)));
    triggerToast(`Tură D.O.S. PORNITĂ (${selectedPatrolType})! Protecția Anti-AFK (${autoStopMinutes} min) este activă.`, 'success');
  };

  const handleStopShift = (shiftId, options = { creditHours: true, stoppedByLabel: null, reasonLabel: null }) => {
    const targetShift = activeShifts.find((s) => s.id === shiftId);
    if (!targetShift) return;
    const endMs = Date.now();
    const elapsedSeconds = Math.max(1, Math.floor((endMs - targetShift.startedAt) / 1000));
    const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    const exactHours = Number((elapsedSeconds / 3600).toFixed(2));
    const creditedHours = options.creditHours ? exactHours : 0;
    const bonusEarned = options.creditHours ? Math.round(exactHours * 6000) : 0;
    const stopper = options.stoppedByLabel || (currentUser ? `${currentUser.username} (${currentUser.rank})` : 'Agent');
    const stopStatus = options.reasonLabel || (options.stoppedByLabel && options.stoppedByLabel.startsWith('HR') ? (options.creditHours ? 'OPRITĂ DE HR (Cu Pontaj Salvat)' : 'OPRITĂ DE HR (Tură Uitată / Anulată)') : 'OPRITĂ MANUAL');
    const logItem = { id: 'TUR-' + Math.floor(100 + Math.random() * 899), userId: targetShift.userId, username: targetShift.username, name: targetShift.name, badge: targetShift.badge, rank: targetShift.rank, patrolType: targetShift.patrolType, startTimeStr: new Date(targetShift.startedAt).toLocaleString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }), endTimeStr: new Date(endMs).toLocaleString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }), durationMinutes, hoursCredited: creditedHours, bonusEarned, stopType: stopStatus, stoppedBy: stopper };
    setActiveShifts((prev) => prev.filter((s) => s.id !== shiftId));
    setShiftLogs((prev) => [logItem, ...prev]);
    setUsers((prev) => prev.map((u) => (u.id === targetShift.userId ? { ...u, status: 'Offline', hoursWorked: Number(((u.hoursWorked || 0) + creditedHours).toFixed(2)) } : u)));
    triggerToast(options.creditHours ? `Tură oprită pentru ${targetShift.name}: +${creditedHours}h adăugate (+${bonusEarned.toLocaleString('ro-RO')} bonus).` : `Tură oprită fără pontare pentru ${targetShift.name} (${stopStatus}).`, options.creditHours ? 'success' : 'info');
  };

  const handleSimulateForgottenShift = (shiftId) => {
    setActiveShifts((prev) => prev.map((s) => (s.id === shiftId ? { ...s, startedAt: Date.now() - (autoStopMinutes * 60 * 1000 + 2000) } : s)));
    triggerToast('Simulare activată: tura va fi oprită automat de sistemul Anti-AFK în 1 secundă...', 'info');
  };

  const handleStopAllShiftsHR = () => {
    if (activeShifts.length === 0) return;
    const snapshot = [...activeShifts];
    snapshot.forEach((sh) => { handleStopShift(sh.id, { creditHours: true, stoppedByLabel: `HR: ${currentUser?.username || 'Conducere'}`, reasonLabel: 'OPRITĂ ÎN MASĂ DE HR / CONDUCERE' }); });
  };

  // FIX: Plătește salarii lunare — resetează orele la 0 pentru toți membrii
  const handlePayMonthlySalaries = () => {
    setUsers((prev) => prev.map((u) => ({ ...u, hoursWorked: 0 })));
    triggerToast('Salarii lunare plătite cu succes! Orele tuturor membrilor au fost resetate la 0.', 'success');
  };

  const handleVerifyHqPin = (e) => {
    e.preventDefault();
    if (hqPinInput.trim() === leadershipPin) { setHqUnlocked(true); setHqPinError(''); setHqPinInput(''); triggerToast('Cod Securitate Conducere / HR verificat! Acces deblocat.', 'success'); }
    else { setHqPinError('Cod de securitate incorect! Accesul în Panoul Conducere / HR a fost blocat.'); }
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberForm.username.trim() || !newMemberForm.name.trim() || !newMemberForm.password.trim()) { triggerToast('Completează Numele, Username-ul Roblox și Parola!', 'error'); return; }
    if (users.some((u) => u.username.toLowerCase() === newMemberForm.username.trim().toLowerCase())) { triggerToast('Există deja un membru cu acest username!', 'error'); return; }
    const badgeVal = newMemberForm.badge.trim() || `Delta | ${Math.floor(10 + Math.random() * 89)}`;
    const created = { id: 'm-' + Date.now(), selector: newMemberForm.selector.trim() || `${newMemberForm.name.trim()} | ${badgeVal}`, name: newMemberForm.name.trim(), username: newMemberForm.username.trim(), robloxId: newMemberForm.robloxId.trim() || '-', badge: badgeVal, rank: newMemberForm.rank, isPilot: newMemberForm.isPilot, isInstructor: newMemberForm.isInstructor, isHR: newMemberForm.isHR, hoursWorked: 0, password: newMemberForm.password.trim(), status: 'Offline', hasTestAccess: newMemberForm.isHR, cooldownUntil: null, cooldownReason: '', warnings: [], testHistory: [] };
    setUsers((prev) => [...prev, created]);
    setNewMemberForm({ selector: '', name: '', username: '', robloxId: '', badge: '', rank: 'Agent în probe', password: '', isPilot: false, isInstructor: false, isHR: false, hasTestAccess: false });
    triggerToast(`Membru adăugat: ${created.name} (${created.username}) cu parolă unică!`, 'success');
  };

  const saveMemberCredentials = (userId) => {
    if (!editCredForm.username.trim() || !editCredForm.password.trim()) { triggerToast('Numele și parola nu pot fi goale!', 'error'); return; }
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, username: editCredForm.username.trim(), password: editCredForm.password.trim() } : u)));
    setEditingCredentialsUserId(null);
    triggerToast('Credențialele (nume + parolă) au fost actualizate!', 'success');
  };

  const toggleUserField = (userId, field) => { setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, [field]: !u[field] } : u))); triggerToast('Datele membrului au fost actualizate!', 'success'); };
  const removeUserCooldown = (userId) => { setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, cooldownUntil: null, cooldownReason: '' } : u))); triggerToast('Cooldown-ul a fost ridicat/scos de către Conducere/HR!', 'success'); };
  const resetUserTestAttempts = (userId) => { setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, cooldownUntil: null, cooldownReason: '', testHistory: [] } : u))); setTestSubmissions((prev) => prev.filter((s) => s.userId !== userId)); triggerToast('Înregistrările testelor au fost resetate de Conducere/HR! Candidatul poate susține din nou.', 'success'); };
  const applyManualCooldown = (userId, hours = 24, reason = 'Cooldown aplicat manual de Conducere/HR') => { setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, cooldownUntil: Date.now() + hours * 3600 * 1000, cooldownReason: reason } : u))); triggerToast(`Cooldown de ${hours}h aplicat membrului.`, 'info'); };
  const updateUserHours = (userId, hours) => { const num = Math.max(0, Number(hours) || 0); setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, hoursWorked: num } : u))); };
  // FIX: schimbarea gradului nu mai acordă automat acces la teste
  const changeUserRank = (userId, newRank) => { setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, rank: newRank } : u))); triggerToast(`Grad actualizat la ${newRank}`, 'success'); };
  const deleteUser = (userId) => { if (userId === currentUser?.id) { triggerToast('Nu îți poți șterge propriul cont activ!', 'error'); return; } setUsers((prev) => prev.filter((u) => u.id !== userId)); triggerToast('Membru eliminat (OUT) din baza de date D.O.S.', 'info'); };

  const executeCommand = (e) => {
    e.preventDefault();
    const raw = cmdInput.trim();
    if (!raw) return;
    const now = new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const addLog = (text, type = 'info') => setCmdLogs((prev) => [...prev, { time: now, text, type }]);
    addLog(`> ${raw}`, 'cmd');
    const parts = raw.split(' ');
    const command = parts[0].toLowerCase();
    const findTarget = (query) => users.find((u) => u.username.toLowerCase() === query?.toLowerCase() || u.name.toLowerCase() === query?.toLowerCase());

    if (command === '/help') {
      addLog('Comenzi: /removecooldown <user>, /resettest <user>, /addcooldown <user> <ore>, /addtest <user>, /removetest <user>, /stoptura <user>, /autotura <min>, /setpass <user> <parola>, /hr <user> <da|nu>, /setgrad <user> <grad>, /ore <user> <nr>, /warn <user> <motiv>, /stamp <id> <director|adjunct|conducere>, /paysalaries', 'system');
    } else if (command === '/removecooldown' || command === '/resettest') {
      const target = findTarget(parts[1]);
      if (!target) addLog(`Eroare: Membrul "${parts[1] || ''}" nu a fost găsit.`, 'error');
      else { removeUserCooldown(target.id); addLog(`SUCCES: Cooldown-ul a fost scos/ridicat pentru ${target.name} (${target.username}).`, 'success'); }
    } else if (command === '/addcooldown') {
      const target = findTarget(parts[1]); const hrs = parseInt(parts[2], 10) || 24;
      if (!target) addLog('Folosire: /addcooldown <user> <ore>', 'error');
      else { applyManualCooldown(target.id, hrs, `Cooldown ${hrs}h aplicat prin comandă de ${currentUser.username}`); addLog(`SUCCES: Cooldown ${hrs}h aplicat pentru ${target.name}.`, 'success'); }
    } else if (command === '/stoptura') {
      const target = findTarget(parts[1]);
      if (!target) addLog(`Eroare: Membrul "${parts[1] || ''}" nu a fost găsit.`, 'error');
      else { const activeSh = activeShifts.find((s) => s.userId === target.id); if (!activeSh) addLog(`Info: ${target.name} nu are nicio tură activă în acest moment.`, 'error'); else { const cancelHours = parts[2]?.toLowerCase() === 'anuleaza'; handleStopShift(activeSh.id, { creditHours: !cancelHours, stoppedByLabel: `HR: ${currentUser.username}` }); addLog(`SUCCES: Tura lui ${target.name} a fost oprită de HR (${cancelHours ? 'fără ore' : 'cu ore salvate'}).`, 'success'); } }
    } else if (command === '/autotura') {
      const mins = parseInt(parts[1], 10);
      if (isNaN(mins) || mins < 1) addLog('Folosire: /autotura <minute_maxime>', 'error');
      else { setAutoStopMinutes(mins); addLog(`SUCCES: Limita de oprire automată a turelor a fost setată la ${mins} minute.`, 'success'); }
    } else if (command === '/addtest') {
      const target = findTarget(parts[1]);
      if (!target) addLog(`Eroare: Membrul "${parts[1] || ''}" nu a fost găsit.`, 'error');
      else { setUsers((prev) => prev.map((u) => (u.id === target.id ? { ...u, hasTestAccess: true } : u))); addLog(`SUCCES: Acces Canal Privat Teste acordat pentru ${target.name} (${target.username}).`, 'success'); }
    } else if (command === '/removetest') {
      const target = findTarget(parts[1]);
      if (!target) addLog(`Eroare: Membrul "${parts[1] || ''}" nu a fost găsit.`, 'error');
      else { setUsers((prev) => prev.map((u) => (u.id === target.id ? { ...u, hasTestAccess: false } : u))); addLog(`SUCCES: Acces Canal Privat Teste revocat pentru ${target.name}.`, 'success'); }
    } else if (command === '/setpass') {
      const target = findTarget(parts[1]); const newPass = parts[2];
      if (!target || !newPass) addLog('Folosire: /setpass <user> <parola_noua>', 'error');
      else { setUsers((prev) => prev.map((u) => (u.id === target.id ? { ...u, password: newPass } : u))); addLog(`SUCCES: Parola pentru ${target.username} a fost schimbată.`, 'success'); }
    } else if (command === '/hr') {
      const target = findTarget(parts[1]); const val = parts[2]?.toLowerCase() === 'da';
      if (!target) addLog('Folosire: /hr <user> <da|nu>', 'error');
      else { setUsers((prev) => prev.map((u) => (u.id === target.id ? { ...u, isHR: val, hasTestAccess: val } : u))); addLog(`SUCCES: Rol HR setat la ${val ? 'DA' : 'NU'} pentru ${target.name}.`, 'success'); }
    } else if (command === '/setgrad') {
      const target = findTarget(parts[1]); const newRankRaw = parts.slice(2).join(' '); const matchedRank = RANKS.find((r) => r.toLowerCase() === newRankRaw.toLowerCase());
      if (!target || !matchedRank) addLog('Eroare: Folosire: /setgrad <user> <grad_valid>', 'error');
      else { changeUserRank(target.id, matchedRank); addLog(`SUCCES: ${target.name} (${target.username}) a primit gradul ${matchedRank}.`, 'success'); }
    } else if (command === '/ore') {
      const target = findTarget(parts[1]); const hrs = parseInt(parts[2], 10);
      if (!target || isNaN(hrs)) addLog('Eroare: Folosire: /ore <user> <numar_ore>', 'error');
      else { updateUserHours(target.id, hrs); addLog(`SUCCES: ${target.name} are acum ${hrs} ore pontate.`, 'success'); }
    } else if (command === '/warn') {
      const target = findTarget(parts[1]); const reason = parts.slice(2).join(' ') || 'Abatere regulamentară';
      if (!target) addLog(`Eroare: Utilizatorul "${parts[1] || ''}" nu a fost găsit.`, 'error');
      else { const warnEntry = { date: new Date().toLocaleDateString('ro-RO'), reason, by: currentUser.username }; setUsers((prev) => prev.map((u) => (u.id === target.id ? { ...u, warnings: [...u.warnings, warnEntry] } : u))); addLog(`AVERTISMENT APLICAT: ${target.name} | Motiv: ${reason}`, 'success'); }
    } else if (command === '/stamp') {
      const targetId = parts[1]?.toUpperCase(); const stampType = parts[2]?.toLowerCase();
      const stampMap = { director: 'Aprobat Director', adjunct: 'Aprobat Director Adjunct', conducere: 'Aprobat Conducerea DOS' };
      const chosenStamp = stampMap[stampType];
      if (!targetId || !chosenStamp) addLog('Eroare: Folosire: /stamp <ID_Mandat ex: W-101> <director|adjunct|conducere>', 'error');
      else { const exists = wantedList.some((w) => w.id.toUpperCase() === targetId); if (!exists) addLog(`Eroare: Mandatul ${targetId} nu există în Wanted List.`, 'error'); else { setWantedList((prev) => prev.map((w) => (w.id.toUpperCase() === targetId ? { ...w, stamp: chosenStamp } : w))); addLog(`ȘTAMPILAT: Mandatul ${targetId} a primit ștampila "${chosenStamp}".`, 'success'); } }
    } else if (command === '/paysalaries') {
      handlePayMonthlySalaries(); addLog('SUCCES: Salariile lunare au fost plătite. Orele resetate la 0 pentru toți membrii.', 'success');
    } else { addLog(`Comandă necunoscută: ${command}. Tastează /help.`, 'error'); }
    setCmdInput('');
  };

  const handleAddSuspect = (e) => {
    e.preventDefault();
    if (!newSuspect.name.trim() || !newSuspect.crimes.trim()) return;
    const item = { id: `W-${Math.floor(104 + Math.random() * 890)}`, name: newSuspect.name.trim(), alias: newSuspect.alias.trim() || 'Suspect Monitorizat', danger: newSuspect.danger, location: newSuspect.location.trim() || 'Necunoscută / În curs de localizare', reward: newSuspect.reward.trim() || '30.000 / Mandat Executat', status: 'ACTIV', crimes: newSuspect.crimes.trim(), evidence: newSuspect.evidence.trim() || 'Probă video atașată la dosar.', sightings: [], stamp: isLeadershipOrHR ? 'Aprobat Conducerea DOS' : 'În Așteptare Aprobare', date: new Date().toLocaleDateString('ro-RO'), addedBy: currentUser ? currentUser.username : 'Operativ' };
    setWantedList((prev) => [item, ...prev]);
    setNewSuspect({ name: '', alias: '', danger: 'RIDICAT', location: '', reward: '35.000 / Mandat Executat', crimes: '', evidence: '' });
    triggerToast(`Suspect adăugat în Canalul Wanted (${item.id})`, 'success');
  };

  const handleReportSighting = (wantedId) => {
    const note = (sightingInputMap[wantedId] || '').trim();
    if (!note) { triggerToast('Introdu locația sau detaliile filajului înainte de raportare!', 'error'); return; }
    const nowStr = new Date().toLocaleString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const sightingText = `${nowStr} – Raportat de ${currentUser.badge} (${currentUser.name}): ${note}`;
    setWantedList((prev) => prev.map((w) => (w.id === wantedId ? { ...w, location: note, sightings: [sightingText, ...(w.sightings || [])] } : w)));
    setSightingInputMap((prev) => ({ ...prev, [wantedId]: '' }));
    triggerToast(`Locație / Filaj raportat în dosarul ${wantedId}!`, 'success');
  };

  const toggleWantedStatus = (wantedId, newStatus) => { setWantedList((prev) => prev.map((w) => (w.id === wantedId ? { ...w, status: newStatus } : w))); triggerToast(`Status mandat ${wantedId} actualizat: ${newStatus}`, 'success'); };
  const handleRemoveFromWanted = (wantedId) => { const target = wantedList.find((w) => w.id === wantedId); setWantedList((prev) => prev.filter((w) => w.id !== wantedId)); triggerToast(`Suspectul ${target ? `${target.name} (${wantedId})` : wantedId} a fost scos definitiv din Wanted List!`, 'info'); };
  const applyStampToWanted = (id, stampText) => { setWantedList((prev) => prev.map((w) => (w.id === id ? { ...w, stamp: stampText } : w))); triggerToast(`Ștampilă aplicată pe ${id}: ${stampText}`, 'success'); };

  const handleAddReport = (e) => {
    e.preventDefault();
    if (!newReport.team.trim() || !newReport.summary.trim()) return;
    const rep = { id: `RAP-${Math.floor(90 + Math.random() * 900)}`, team: newReport.team.trim(), date: new Date().toLocaleString('ro-RO', { dateStyle: 'short', timeStyle: 'short' }), type: newReport.type, summary: newReport.summary.trim(), videoLink: newReport.videoLink.trim() || 'Înregistrare arhivată intern (PC Slab / Cloud)', stamp: isLeadershipOrHR ? 'Aprobat Conducerea DOS' : 'Verificare Conducere' };
    setReports((prev) => [rep, ...prev]);
    setNewReport({ team: '', type: 'Filaj & Supraveghere Sub Acoperire', summary: '', videoLink: '' });
    triggerToast(`Raport misiune înregistrat (${rep.id})`, 'success');
  };

  const applyStampToReport = (id, stampText) => { setReports((prev) => prev.map((r) => (r.id === id ? { ...r, stamp: stampText } : r))); triggerToast(`Raport ${id} ștampilat: ${stampText}`, 'success'); };

  const handleVerifyExamSession = (e) => {
    e.preventDefault();
    if (!currentUser || !selectedTestId) return;
    const chosenTest = TESTS_DATA.find((t) => t.id === selectedTestId);
    const alreadyTaken = testSubmissions.some((s) => s.userId === currentUser.id && s.testId === selectedTestId) || (chosenTest && currentUser.testHistory.some((h) => h.testName.includes(chosenTest.title)));
    if (alreadyTaken && !isLeadershipOrHR) { setExamVerifyError('Acest test a fost deja susținut! Nu poate fi redat.'); return; }
    if (isUserOnCooldown && !isLeadershipOrHR) { setExamVerifyError('Contul tău are Cooldown activ! Nu poți susține testul.'); return; }
    const q = examVerifyUser.trim().toLowerCase();
    const matchesUser = currentUser.username.toLowerCase() === q || currentUser.name.toLowerCase() === q;
    if (!matchesUser || examVerifyPass !== currentUser.password) { setExamVerifyError('Credențiale de examinare incorecte! Introdu exact numele și parola contului tău.'); return; }
    setExamVerifyError(''); setExamSessionVerified(true); setExamVerifyUser(''); setExamVerifyPass('');
    triggerToast('Sesiune examinare pornită! Atenție: dacă pici sau dai Alt+Tab, se aplică Cooldown.', 'info');
  };

  const handleSubmitTest = () => {
    const testObj = TESTS_DATA.find((t) => t.id === selectedTestId);
    if (!testObj || !currentUser) return;
    let score = 0;
    const breakdown = testObj.questions.map((q, idx) => { const chosenIdx = testAnswers[idx]; const isCorrect = chosenIdx === q.correct; if (isCorrect) score++; return { question: q.q, chosenOption: chosenIdx !== undefined ? q.options[chosenIdx] : 'Nerăspuns', correctOption: q.options[q.correct], isCorrect }; });
    const passed = score >= testObj.passingScore;
    const nowStr = new Date().toLocaleString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const resultData = { testName: testObj.title, score: `${score}/${testObj.questions.length}`, passed, date: nowStr, cooldownApplied: !passed ? `${testObj.cooldownHours}h` : null };
    const submissionItem = { id: 'SUB-' + Math.floor(100 + Math.random() * 899), userId: currentUser.id, username: currentUser.username, name: currentUser.name, badge: currentUser.badge, rank: currentUser.rank, testId: testObj.id, testTitle: testObj.title, score: `${score}/${testObj.questions.length}`, passed, reason: passed ? 'Promovat regulamentar' : `Picat (Scor ${score}/${testObj.questions.length} < minim ${testObj.passingScore}) – Cooldown ${testObj.cooldownHours}h activat`, timestamp: nowStr, answersBreakdown: breakdown };
    setTestSubmissions((prev) => [submissionItem, ...prev]);
    setTestResult(resultData);
    const cdMs = testObj.cooldownHours * 3600 * 1000;
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? { ...u, cooldownUntil: !passed ? Date.now() + cdMs : u.cooldownUntil, cooldownReason: !passed ? `Test picat (${score}/${testObj.questions.length}) • Cooldown ${testObj.cooldownHours}h` : u.cooldownReason, testHistory: [resultData, ...u.testHistory] } : u)));
    triggerToast(passed ? `FELICITĂRI! Ai promovat testul (${score}/${testObj.questions.length})!` : `TEST PICAT (${score}/${testObj.questions.length})! S-a activat Cooldown de ${testObj.cooldownHours} ore.`, passed ? 'success' : 'error');
  };

  const filteredRegulations = useMemo(() => {
    if (!regSearch.trim()) return REGULATION_SECTIONS;
    const q = regSearch.toLowerCase();
    return REGULATION_SECTIONS.map((sec) => ({ ...sec, items: sec.items.filter((item) => item.subtitle.toLowerCase().includes(q) || item.points.some((p) => p.toLowerCase().includes(q)) || sec.title.toLowerCase().includes(q)) })).filter((sec) => sec.items.length > 0);
  }, [regSearch]);

  const filteredMembers = useMemo(() => {
    if (!memberSearch.trim()) return users;
    const q = memberSearch.toLowerCase();
    return users.filter((u) => u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || u.badge.toLowerCase().includes(q) || u.rank.toLowerCase().includes(q) || u.selector.toLowerCase().includes(q));
  }, [users, memberSearch]);

  const calculateTotalSalary = (member) => {
    const base = getBaseSalaryForRank(member.rank);
    const pilotBonus = member.isPilot ? 40000 : 0;
    const instructorBonus = member.isInstructor ? 15000 : 0;
    const hoursBonus = (member.hoursWorked || 0) * 6000;
    return { base, pilotBonus, instructorBonus, hoursBonus, total: base + pilotBonus + instructorBonus + hoursBonus };
  };

  const navTabs = useMemo(() => {
    const baseTabs = [
      { id: 'home', label: 'Acasă & Info', icon: Shield },
      { id: 'ture', label: `Canal Ture (${activeShifts.length})`, icon: Timer, live: activeShifts.length > 0 },
      { id: 'regulament', label: 'Regulament', icon: BookOpen },
      { id: 'tactic', label: 'Echipament & NATO', icon: Crosshair },
      { id: 'wanted', label: `Wanted List (${wantedList.filter((w) => w.status === 'ACTIV').length})`, icon: Siren, alert: true }
    ];
    if (canSeeTestsChannel) { baseTabs.push({ id: 'teste', label: 'Teste D.O.S.', icon: Unlock, restricted: true }); }
    baseTabs.push({ id: 'rapoarte', label: 'Rapoarte', icon: ClipboardList });
    baseTabs.push({ id: 'profile', label: 'Profilul Meu', icon: Award });
    if (isLeadershipOrHR) {
      baseTabs.push({ id: 'salarii', label: 'Membri & Salarii (HR)', icon: DollarSign, hrRestricted: true });
      baseTabs.push({ id: 'conducere', label: 'Conducere & HR', icon: Terminal, admin: true });
    }
    return baseTabs;
  }, [currentUser, isLeadershipOrHR, canSeeTestsChannel, activeShifts.length, wantedList]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#101d36_0%,#070b14_55%,#030508_100%)] text-slate-100 flex flex-col justify-between p-4 sm:p-6 selection:bg-cyan-500 selection:text-black">
        <div className="max-w-5xl w-full mx-auto flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 text-cyan-400"><span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" /><span>TERMINAL SECURIZAT D.O.S. • MARV ROLEPLAY</span></div>
          <span className="hidden sm:inline text-slate-500">ACCES STRICT AUTORIZAT</span>
        </div>
        <div className="max-w-md w-full mx-auto my-auto py-6">
          <div className="bg-gradient-to-b from-slate-900/90 via-[#0b1222]/95 to-black/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(6,182,212,0.14)] relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black border-2 border-amber-400/70 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.25)] mb-3">
                <Shield className="w-8 h-8 text-amber-400" /><span className="text-[9px] font-black tracking-widest text-white">D.O.S.</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight text-white">DIRECȚIA DE OPERAȚIUNI SPECIALE</h1>
              <p className="text-xs font-mono text-cyan-400 mt-1">MARV ROLEPLAY • PORTAL INTERN OPERATIV</p>
              <div className="mt-3"><OfficialStamp text="ACCES RESTRICȚIONAT D.O.S." variant="gold" size="sm" /></div>
            </div>
            {loginError && (
              <div className="mb-4 p-3 bg-rose-950/70 border border-rose-500/80 rounded-xl text-xs text-rose-200 flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /><span>{loginError}</span></div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Nume Roblox / Indicativ Operativ</label>
                <input type="text" required value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} placeholder="Ex: DomnulVal0, valentin440111, pxtric123..." className="w-full bg-slate-950/90 border border-slate-700/90 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Parolă Individuală D.O.S.</label>
                <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-950/90 border border-slate-700/90 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-colors" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20">
                <LogIn className="w-5 h-5" /> Autentificare Securizată
              </button>
            </form>
            <p className="mt-5 text-center text-[11px] text-slate-500 font-mono">Sistem Anti-Cheat Activ • Toate acțiunile sunt înregistrate</p>
          </div>
        </div>
        <div className="text-center text-[10px] font-mono text-slate-600 pb-2">© 2026 D.O.S. MARV ROLEPLAY • SISTEM INTERN CLASIFICAT</div>
      </div>
    );
  }

  const renderTabContent = () => {
    if (activeTab === 'home') {
      return (
        <div className="space-y-4">
          <DosTypographicBanner />
          <TacticalUndercoverShowcase />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-700/80 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3"><Users className="w-5 h-5 text-cyan-400" /><h3 className="text-sm font-bold text-white">Membri Activi D.O.S.</h3></div>
              <p className="text-3xl font-black text-cyan-300">{users.filter((u) => u.status !== 'Offline').length}</p>
              <p className="text-xs text-slate-400 mt-1">din {users.length} total membri înregistrați</p>
            </div>
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-700/80 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3"><Timer className="w-5 h-5 text-amber-400" /><h3 className="text-sm font-bold text-white">Ture Active Acum</h3></div>
              <p className="text-3xl font-black text-amber-300">{activeShifts.length}</p>
              <p className="text-xs text-slate-400 mt-1">Protecție Anti-AFK: {autoStopMinutes} min</p>
            </div>
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-700/80 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3"><Siren className="w-5 h-5 text-rose-400" /><h3 className="text-sm font-bold text-white">Mandate Active</h3></div>
              <p className="text-3xl font-black text-rose-300">{wantedList.filter((w) => w.status === 'ACTIV').length}</p>
              <p className="text-xs text-slate-400 mt-1">{wantedList.filter((w) => w.status === 'CAPTURAT').length} capturați</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-700/80 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3"><Shield className="w-5 h-5 text-amber-400" /><h3 className="text-sm font-bold text-white">Briefing D.O.S. – Bun venit, {currentUser.name}</h3></div>
            <div className="space-y-2 text-sm text-slate-300">
              <p>• Grad actual: <span className="text-cyan-300 font-bold">{currentUser.rank}</span> | Indicativ: <span className="text-amber-300 font-mono">{currentUser.badge}</span></p>
              <p>• Status curent: <span className="text-white font-bold">{currentUser.status}</span></p>
              {currentUser.isPilot && <p>• <Plane className="w-4 h-4 inline text-cyan-400" /> Calificare Pilot Autorizat (Bonus +40.000/lună)</p>}
              {currentUser.isInstructor && <p>• <GraduationCap className="w-4 h-4 inline text-emerald-400" /> Instructor D.O.S. (Bonus +15.000/lună)</p>}
              {currentUser.isHR && <p className="text-amber-300">• <Key className="w-4 h-4 inline" /> Acces HR / Conducere activat — poți vedea Testele D.O.S.</p>}
              {!currentUser.isHR && <p className="text-slate-500">• Acces la Teste D.O.S.: <Lock className="w-3.5 h-3.5 inline" /> Doar HR are acces la canalul de Teste.</p>}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'ture') {
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-700/80 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4"><Timer className="w-5 h-5 text-amber-400" /><h2 className="text-base font-bold text-white">Canal Ture D.O.S. — Pontaj & Anti-AFK</h2></div>
            {!currentUserActiveShift ? (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Tip Patrulă</label>
                    <select value={selectedPatrolType} onChange={(e) => setSelectedPatrolType(e.target.value)} className="w-full bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white">
                      <option>Sub Acoperire (Filaj)</option><option>Patrulă Oficială (Intervenție)</option><option>Filaj Staționar (Supraveghere)</option>
                    </select>
                  </div>
                  {currentUser.rank.toLowerCase() === 'agent în probe' && (
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Condiție Probe</label>
                      <select value={selectedProbeCondition} onChange={(e) => setSelectedProbeCondition(e.target.value)} className="w-full bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white">
                        <option>Cu FTO / Agent Senior</option><option>Grup de 2-3 Agenți în Probe</option><option>Cu Aprobare Conducere</option>
                      </select>
                    </div>
                  )}
                </div>
                <button onClick={handleStartShift} className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                  <Play className="w-5 h-5" /> Pornește Tură D.O.S.
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" /><span className="text-emerald-300 font-bold text-sm">TURĂ ACTIVĂ — {currentUserActiveShift.patrolType}</span></div>
                  <div className="text-2xl font-mono font-black text-amber-300">{formatDurationHMS((nowTimestamp - currentUserActiveShift.startedAt) / 1000)}</div>
                </div>
                <div className="text-xs text-slate-400">Pornită la: {new Date(currentUserActiveShift.startedAt).toLocaleString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })} • Auto-stop la {autoStopMinutes} min</div>
                <button onClick={() => handleStopShift(currentUserActiveShift.id)} className="w-full bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                  <Square className="w-5 h-5" /> Oprește Tură (Salvează Ore)
                </button>
              </div>
            )}
          </div>
          {activeShifts.filter((s) => s.userId !== currentUser.id).length > 0 && (
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
              <h3 className="text-sm font-bold text-white mb-3">Alte Ture Active ({activeShifts.filter((s) => s.userId !== currentUser.id).length})</h3>
              <div className="space-y-2">
                {activeShifts.filter((s) => s.userId !== currentUser.id).map((sh) => (
                  <div key={sh.id} className="flex items-center justify-between bg-slate-950/60 rounded-lg px-3 py-2 border border-slate-800">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /><span className="text-sm text-white font-medium">{sh.name}</span><span className="text-xs text-slate-400 font-mono">{sh.badge}</span></div>
                    <div className="text-sm font-mono text-amber-300">{formatDurationHMS((nowTimestamp - sh.startedAt) / 1000)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {isLeadershipOrHR && activeShifts.length > 0 && (
            <button onClick={handleStopAllShiftsHR} className="w-full bg-rose-600/20 border border-rose-500/50 text-rose-300 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-rose-600/30 transition-all">
              <PowerOff className="w-4 h-4" /> OPREȘTE TOATE TURELE (HR / Conducere)
            </button>
          )}
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">Istoric Ture ({shiftLogs.length})</h3>
              <select value={shiftHistoryFilter} onChange={(e) => setShiftHistoryFilter(e.target.value)} className="bg-slate-950/90 border border-slate-700/90 rounded-lg px-2 py-1 text-xs text-white">
                <option>TOATE</option><option>OPRITĂ MANUAL</option><option>OPRITĂ AUTOMAT</option><option>OPRITĂ DE HR</option>
              </select>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {shiftLogs.filter((log) => shiftHistoryFilter === 'TOATE' || log.stopType.includes(shiftHistoryFilter.replace('OPRITĂ ', '').replace('AUTOMAT', 'AUTOMAT').replace('DE HR', 'HR'))).slice(0, 50).map((log) => (
                <div key={log.id} className="bg-slate-950/60 rounded-lg px-3 py-2.5 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">{log.name} ({log.badge})</span>
                    <span className={`font-mono ${log.stopType.includes('AUTOMAT') ? 'text-rose-400' : log.stopType.includes('HR') ? 'text-amber-400' : 'text-emerald-400'}`}>{log.stopType}</span>
                  </div>
                  <div className="text-slate-400">{log.startTimeStr} → {log.endTimeStr} • {log.durationMinutes} min • +{log.hoursCredited}h • +{log.bonusEarned.toLocaleString('ro-RO')} bonus</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'regulament') {
      return (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3"><BookOpen className="w-5 h-5 text-cyan-400" /><h2 className="text-base font-bold text-white">Regulament D.O.S. — Marv Roleplay</h2></div>
            <input type="text" value={regSearch} onChange={(e) => setRegSearch(e.target.value)} placeholder="Caută în regulament..." className="w-full bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none" />
          </div>
          {filteredRegulations.map((sec) => (
            <div key={sec.id} className="bg-slate-900/80 border border-slate-700/80 rounded-xl overflow-hidden">
              <button onClick={() => setOpenSections((prev) => ({ ...prev, [sec.id]: !prev[sec.id] }))} className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2"><span className="px-2 py-0.5 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase rounded">{sec.badge}</span><h3 className="text-sm font-bold text-white">{sec.title}</h3></div>
                {openSections[sec.id] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {openSections[sec.id] && (
                <div className="px-4 pb-4 space-y-3 border-t border-slate-800">
                  {sec.items.map((item, i) => (
                    <div key={i} className="pt-3">
                      <h4 className="text-sm font-bold text-amber-300 mb-1.5">{item.subtitle}</h4>
                      <ul className="space-y-1">{item.points.map((p, j) => (<li key={j} className="text-sm text-slate-300 flex items-start gap-2"><span className="text-cyan-500 mt-0.5">▸</span><span>{p}</span></li>))}</ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'tactic') {
      return (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3"><Crosshair className="w-5 h-5 text-cyan-400" /><h2 className="text-base font-bold text-white">Echipament & Coduri Tactice D.O.S.</h2></div>
            <div className="mb-4">
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Translator Alfabet Fonetic NATO</label>
              <input type="text" value={natoInput} onChange={(e) => setNatoInput(e.target.value)} className="w-full bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white font-mono uppercase focus:border-cyan-400 focus:outline-none" />
              <p className="mt-2 text-sm text-cyan-300 font-mono">{natoTranslated}</p>
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
            <h3 className="text-sm font-bold text-white mb-3">Coduri Tactice D.O.S.</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TACTICAL_CODES.map((tc) => (
                <div key={tc.code} className="bg-slate-950/60 rounded-lg px-3 py-2 border border-slate-800 flex items-center justify-between">
                  <div><span className="text-cyan-300 font-mono font-bold text-sm">{tc.code}</span><p className="text-xs text-slate-400 mt-0.5">{tc.desc}</p></div>
                  <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 bg-slate-800/50 rounded">{tc.category}</span>
                </div>
              ))}
            </div>
          </div>
          <RoomClearingDiagram />
        </div>
      );
    }

    if (activeTab === 'wanted') {
      const filteredWanted = wantedFilter === 'TOATE' ? wantedList : wantedList.filter((w) => w.status === wantedFilter);
      return (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-2"><Siren className="w-5 h-5 text-rose-400" /><h2 className="text-base font-bold text-white">Wanted List D.O.S.</h2></div>
              <select value={wantedFilter} onChange={(e) => setWantedFilter(e.target.value)} className="bg-slate-950/90 border border-slate-700/90 rounded-lg px-2 py-1 text-xs text-white">
                <option>TOATE</option><option>ACTIV</option><option>CAPTURAT</option>
              </select>
            </div>
            {isLeadershipOrHR && (
              <form onSubmit={handleAddSuspect} className="space-y-2 mb-4 p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input type="text" value={newSuspect.name} onChange={(e) => setNewSuspect({ ...newSuspect, name: e.target.value })} placeholder="Nume suspect" className="bg-slate-900/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                  <input type="text" value={newSuspect.alias} onChange={(e) => setNewSuspect({ ...newSuspect, alias: e.target.value })} placeholder="Alias / ID" className="bg-slate-900/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                  <select value={newSuspect.danger} onChange={(e) => setNewSuspect({ ...newSuspect, danger: e.target.value })} className="bg-slate-900/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white">
                    <option>CRITIC</option><option>RIDICAT</option><option>MEDIU</option><option>SCĂZUT</option>
                  </select>
                  <input type="text" value={newSuspect.location} onChange={(e) => setNewSuspect({ ...newSuspect, location: e.target.value })} placeholder="Locație / Vehicul" className="bg-slate-900/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                  <input type="text" value={newSuspect.reward} onChange={(e) => setNewSuspect({ ...newSuspect, reward: e.target.value })} placeholder="Recompensă" className="bg-slate-900/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                  <input type="text" value={newSuspect.crimes} onChange={(e) => setNewSuspect({ ...newSuspect, crimes: e.target.value })} placeholder="Crimă comisă" className="bg-slate-900/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                </div>
                <input type="text" value={newSuspect.evidence} onChange={(e) => setNewSuspect({ ...newSuspect, evidence: e.target.value })} placeholder="Dovezi" className="w-full bg-slate-900/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                <button type="submit" className="w-full bg-rose-600/20 border border-rose-500/50 text-rose-300 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-rose-600/30 transition-all"><Plus className="w-4 h-4" /> Adaugă Suspect</button>
              </form>
            )}
          </div>
          {filteredWanted.map((w) => (
            <div key={w.id} className={`bg-slate-900/80 border rounded-xl p-4 ${w.danger === 'CRITIC' ? 'border-rose-500/60' : w.danger === 'RIDICAT' ? 'border-orange-500/50' : 'border-yellow-500/40'}`}>
              <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2"><span className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded ${w.status === 'ACTIV' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'}`}>{w.status}</span><span className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded ${w.danger === 'CRITIC' ? 'bg-rose-600/30 text-rose-200' : w.danger === 'RIDICAT' ? 'bg-orange-600/30 text-orange-200' : 'bg-yellow-600/30 text-yellow-200'}`}>{w.danger}</span></div>
                  <h3 className="text-base font-bold text-white mt-1">{w.name}</h3>
                  <p className="text-xs text-slate-400">{w.alias}</p>
                </div>
                <OfficialStamp text={w.stamp} variant={w.danger === 'CRITIC' ? 'red' : 'gold'} size="sm" />
              </div>
              <div className="space-y-1 text-sm text-slate-300 mt-2">
                <p><MapPin className="w-4 h-4 inline text-cyan-400" /> {w.location}</p>
                <p><Target className="w-4 h-4 inline text-amber-400" /> Recompensă: {w.reward}</p>
                <p><AlertTriangle className="w-4 h-4 inline text-rose-400" /> {w.crimes}</p>
                <p className="text-xs text-slate-500"><Eye className="w-3.5 h-3.5 inline" /> {w.evidence}</p>
              </div>
              {w.sightings && w.sightings.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-800">
                  <p className="text-[11px] font-mono text-slate-500 uppercase mb-1">Semnalări:</p>
                  {w.sightings.map((s, i) => (<p key={i} className="text-xs text-slate-400">{s}</p>))}
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <input type="text" value={sightingInputMap[w.id] || ''} onChange={(e) => setSightingInputMap((prev) => ({ ...prev, [w.id]: e.target.value }))} placeholder="Raportează locație / filaj..." className="flex-1 min-w-[150px] bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-1.5 text-xs text-white" />
                <button onClick={() => handleReportSighting(w.id)} className="bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-cyan-600/30 transition-all">Raportează</button>
                {isLeadershipOrHR && (
                  <>
                    <button onClick={() => toggleWantedStatus(w.id, w.status === 'ACTIV' ? 'CAPTURAT' : 'ACTIV')} className="bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-700 transition-all">{w.status === 'ACTIV' ? 'Marchează Capturat' : 'Reactivează'}</button>
                    <button onClick={() => handleRemoveFromWanted(w.id)} className="bg-rose-600/20 border border-rose-500/40 text-rose-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-600/30 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'teste') {
      // FIX: Doar HR are acces la Teste
      if (!currentUser.isHR) {
        return (
          <div className="bg-slate-900/80 border border-rose-500/40 rounded-xl p-8 text-center">
            <Lock className="w-12 h-12 text-rose-400 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-white">Acces Restricționat</h2>
            <p className="text-sm text-slate-400 mt-2">Doar membrii HR au acces la canalul de Teste D.O.S.</p>
          </div>
        );
      }
      if (cheatViolationAlert) {
        return (
          <div className="bg-rose-950/80 border border-rose-500/60 rounded-xl p-6 text-center">
            <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-rose-200">ALERTĂ ANTI-CHEAT</h2>
            <p className="text-sm text-rose-300 mt-2">{cheatViolationAlert.reason}</p>
            <p className="text-xs text-slate-400 mt-2">Test: {cheatViolationAlert.testName} • Cooldown: {cheatViolationAlert.cooldownHours}h • {cheatViolationAlert.timestamp}</p>
            <button onClick={() => { setCheatViolationAlert(null); setTestResult(null); setSelectedTestId(null); setExamSessionVerified(false); setTestAnswers({}); }} className="mt-4 bg-slate-800 border border-slate-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-all">Înapoi la Teste</button>
          </div>
        );
      }
      if (testResult) {
        return (
          <div className={`bg-slate-900/80 border rounded-xl p-6 text-center ${testResult.passed ? 'border-emerald-500/60' : 'border-rose-500/60'}`}>
            {testResult.passed ? <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" /> : <XCircle className="w-12 h-12 text-rose-400 mx-auto mb-3" />}
            <h2 className="text-xl font-bold text-white">{testResult.passed ? 'TEST PROMOVAT!' : 'TEST PICAT'}</h2>
            <p className="text-3xl font-black mt-2 {testResult.passed ? 'text-emerald-300' : 'text-rose-300'}">{testResult.score}</p>
            {!testResult.passed && <p className="text-sm text-rose-300 mt-2">Cooldown activat: {testResult.cooldownApplied}</p>}
            <button onClick={() => { setTestResult(null); setSelectedTestId(null); setExamSessionVerified(false); setTestAnswers({}); }} className="mt-4 bg-slate-800 border border-slate-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-all">Înapoi la Teste</button>
          </div>
        );
      }
      if (!selectedTestId) {
        return (
          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2"><Unlock className="w-5 h-5 text-cyan-400" /><h2 className="text-base font-bold text-white">Teste D.O.S. — Canal HR</h2></div>
              <p className="text-xs text-slate-400">Selectează un test pentru a-l administra. Sistem Anti-Cheat activ (Alt+Tab / schimbare tab = anulare automată + cooldown).</p>
            </div>
            {TESTS_DATA.map((test) => (
              <button key={test.id} onClick={() => { setSelectedTestId(test.id); setExamSessionVerified(false); setTestAnswers({}); }} className="w-full text-left bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 hover:border-cyan-500/50 transition-all">
                <h3 className="text-sm font-bold text-white">{test.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{test.subtitle}</p>
                <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-slate-500">
                  <span>{test.questions.length} întrebări</span><span>•</span><span>Minim {test.passingScore}/{test.questions.length} pentru promovare</span><span>•</span><span>Cooldown {test.cooldownHours}h la picare</span>
                </div>
              </button>
            ))}
            {testSubmissions.length > 0 && (
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-3">Rezultate Recente ({testSubmissions.length})</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {testSubmissions.slice(0, 20).map((sub) => (
                    <div key={sub.id} className="bg-slate-950/60 rounded-lg px-3 py-2 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{sub.name} ({sub.badge})</span>
                        <span className={sub.passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{sub.score}</span>
                      </div>
                      <div className="text-slate-500 mt-0.5">{sub.testTitle} • {sub.timestamp}</div>
                      <div className={`text-[11px] mt-0.5 ${sub.passed ? 'text-emerald-500' : 'text-rose-500'}`}>{sub.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }
      const chosenTest = TESTS_DATA.find((t) => t.id === selectedTestId);
      if (!examSessionVerified) {
        return (
          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
              <h2 className="text-base font-bold text-white mb-2">{chosenTest.title}</h2>
              <p className="text-xs text-slate-400 mb-4">Verificare identitate pentru examinare. Introdu numele și parola contului tău D.O.S.</p>
              {examVerifyError && <div className="mb-3 p-2 bg-rose-950/70 border border-rose-500/60 rounded-lg text-xs text-rose-200">{examVerifyError}</div>}
              <form onSubmit={handleVerifyExamSession} className="space-y-3">
                <input type="text" value={examVerifyUser} onChange={(e) => setExamVerifyUser(e.target.value)} placeholder="Nume / Username Roblox" className="w-full bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                <input type="password" value={examVerifyPass} onChange={(e) => setExamVerifyPass(e.target.value)} placeholder="Parolă D.O.S." className="w-full bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                <button type="submit" className="w-full bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-600/30 transition-all"><Key className="w-4 h-4" /> Verifică & Începe Examinarea</button>
              </form>
            </div>
          </div>
        );
      }
      return (
        <div className="space-y-4">
          <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-200">EXAMINARE ÎN DESFĂȘURARE — Nu părăsi fereastra! Alt+Tab / schimbare tab = anulare automată + cooldown {chosenTest.cooldownHours}h.</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 space-y-4">
            {chosenTest.questions.map((q, qIdx) => (
              <div key={qIdx}>
                <p className="text-sm font-bold text-white mb-2">{qIdx + 1}. {q.q}</p>
                <div className="space-y-1.5">
                  {q.options.map((opt, oIdx) => (
                    <button key={oIdx} onClick={() => setTestAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))} className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${testAnswers[qIdx] === oIdx ? 'bg-cyan-600/30 border-cyan-500 text-white' : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-600'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleSubmitTest} className="w-full bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-600/30 transition-all"><Send className="w-5 h-5" /> Trimite Testul</button>
          </div>
        </div>
      );
    }

    if (activeTab === 'rapoarte') {
      return (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3"><ClipboardList className="w-5 h-5 text-cyan-400" /><h2 className="text-base font-bold text-white">Rapoarte Misiuni D.O.S.</h2></div>
            <form onSubmit={handleAddReport} className="space-y-2 mb-4 p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <input type="text" value={newReport.team} onChange={(e) => setNewReport({ ...newReport, team: e.target.value })} placeholder="Echipă (ex: Alfa (valentin440111, darki11254))" className="w-full bg-slate-900/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
              <select value={newReport.type} onChange={(e) => setNewReport({ ...newReport, type: e.target.value })} className="w-full bg-slate-900/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white">
                <option>Filaj & Supraveghere Sub Acoperire</option><option>Descindere & Intervenție Tactică (Patrulă Oficială)</option><option>Patrulă Sub Acoperire</option><option>Altul</option>
              </select>
              <textarea value={newReport.summary} onChange={(e) => setNewReport({ ...newReport, summary: e.target.value })} placeholder="Rezumat misiune..." rows={3} className="w-full bg-slate-900/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white resize-none" />
              <input type="text" value={newReport.videoLink} onChange={(e) => setNewReport({ ...newReport, videoLink: e.target.value })} placeholder="Link înregistrare (medal.tv etc.)" className="w-full bg-slate-900/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
              <button type="submit" className="w-full bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-600/30 transition-all"><Plus className="w-4 h-4" /> Adaugă Raport</button>
            </form>
          </div>
          {reports.map((rep) => (
            <div key={rep.id} className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2"><span className="text-xs font-mono text-cyan-300">{rep.id}</span><span className="text-xs text-slate-500">{rep.date}</span></div>
                  <h3 className="text-sm font-bold text-white mt-1">{rep.type}</h3>
                  <p className="text-xs text-slate-400">Echipă: {rep.team}</p>
                </div>
                <OfficialStamp text={rep.stamp} variant="blue" size="sm" />
              </div>
              <p className="text-sm text-slate-300 mt-2">{rep.summary}</p>
              <a href={rep.videoLink} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:text-cyan-300 mt-2 inline-block">▶ {rep.videoLink}</a>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'profile') {
      const salary = calculateTotalSalary(currentUser);
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-700/80 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-black border-2 border-amber-400/60 flex items-center justify-center"><Shield className="w-7 h-7 text-amber-400" /></div>
              <div>
                <h2 className="text-lg font-bold text-white">{currentUser.name}</h2>
                <p className="text-xs text-slate-400 font-mono">{currentUser.username} • {currentUser.badge}</p>
                <p className="text-sm text-cyan-300 font-bold mt-0.5">{currentUser.rank}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800"><p className="text-[10px] font-mono text-slate-500 uppercase">Status</p><p className="text-sm text-white font-bold">{currentUser.status}</p></div>
              <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800"><p className="text-[10px] font-mono text-slate-500 uppercase">Ore Lucrate</p><p className="text-sm text-amber-300 font-bold">{currentUser.hoursWorked}h</p></div>
              <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800"><p className="text-[10px] font-mono text-slate-500 uppercase">Salariu Lunar</p><p className="text-sm text-emerald-300 font-bold">{salary.total.toLocaleString('ro-RO')} $</p></div>
            </div>
            <div className="mt-3 space-y-1 text-xs text-slate-400">
              <p>• Salariu de bază: {salary.base.toLocaleString('ro-RO')} $</p>
              {salary.pilotBonus > 0 && <p>• Bonus Pilot: +{salary.pilotBonus.toLocaleString('ro-RO')} $</p>}
              {salary.instructorBonus > 0 && <p>• Bonus Instructor: +{salary.instructorBonus.toLocaleString('ro-RO')} $</p>}
              <p>• Bonus Ore: +{salary.hoursBonus.toLocaleString('ro-RO')} $ ({currentUser.hoursWorked}h × 6.000)</p>
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
            <h3 className="text-sm font-bold text-white mb-3">Schimbă Status</h3>
            <div className="flex flex-wrap gap-2">
              {['Activ pe Stație', 'Sub Acoperire', 'Patrulă Oficială', 'Offline'].map((st) => (
                <button key={st} onClick={() => updateStatus(st)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${currentUser.status === st ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200' : 'bg-slate-950/60 border-slate-700 text-slate-400 hover:border-slate-600'}`}>{st}</button>
              ))}
            </div>
          </div>
          {currentUser.testHistory && currentUser.testHistory.length > 0 && (
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
              <h3 className="text-sm font-bold text-white mb-3">Istoric Teste</h3>
              <div className="space-y-2">
                {currentUser.testHistory.map((th, i) => (
                  <div key={i} className="bg-slate-950/60 rounded-lg px-3 py-2 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between"><span className="text-white">{th.testName}</span><span className={th.passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{th.score}</span></div>
                    <div className="text-slate-500 mt-0.5">{th.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {isUserOnCooldown && (
            <div className="bg-rose-950/60 border border-rose-500/40 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1"><ShieldAlert className="w-5 h-5 text-rose-400" /><span className="text-sm font-bold text-rose-200">Cooldown Activ</span></div>
              <p className="text-xs text-rose-300">{currentUser.cooldownReason}</p>
              <p className="text-xs text-slate-400 mt-1">Timp rămas: {formatDurationHMS(cooldownRemainingSeconds)}</p>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'salarii') {
      return (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-emerald-400" /><h2 className="text-base font-bold text-white">Membri & Salarii Lunare (HR)</h2></div>
              {/* FIX: Buton Plătește Salarii Lunare */}
              <button onClick={handlePayMonthlySalaries} className="bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-600/30 transition-all text-sm">
                <DollarSign className="w-4 h-4" /> Plătește Salarii Lunare (Resetează Ore)
              </button>
            </div>
            <input type="text" value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)} placeholder="Caută membru..." className="w-full mt-3 bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
          </div>
          <div className="space-y-2">
            {filteredMembers.map((m) => {
              const sal = calculateTotalSalary(m);
              return (
                <div key={m.id} className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white">{m.name.charAt(0)}</div>
                      <div>
                        <p className="text-sm text-white font-medium">{m.name} <span className="text-xs text-slate-500 font-mono">({m.badge})</span></p>
                        <p className="text-xs text-slate-400">{m.rank} • {m.hoursWorked}h</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-300">{sal.total.toLocaleString('ro-RO')} $</p>
                      <p className="text-[10px] text-slate-500 font-mono">lunar</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.isPilot && <span className="text-[10px] px-2 py-0.5 bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 rounded">Pilot</span>}
                    {m.isInstructor && <span className="text-[10px] px-2 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded">Instructor</span>}
                    {m.isHR && <span className="text-[10px] px-2 py-0.5 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded">HR</span>}
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${m.isHR || m.hasTestAccess ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-slate-800/50 text-slate-500 border-slate-700'}`}>{m.isHR || m.hasTestAccess ? 'Teste: PERMIS' : 'Teste: BLOCAT'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <select value={m.rank} onChange={(e) => changeUserRank(m.id, e.target.value)} className="bg-slate-950/90 border border-slate-700/90 rounded px-2 py-1 text-xs text-white">
                      {RANKS.map((r) => (<option key={r} value={r}>{r}</option>))}
                    </select>
                    <input type="number" value={m.hoursWorked} onChange={(e) => updateUserHours(m.id, e.target.value)} className="w-20 bg-slate-950/90 border border-slate-700/90 rounded px-2 py-1 text-xs text-white" />
                    <button onClick={() => toggleUserField(m.id, 'isPilot')} className={`text-[10px] px-2 py-1 rounded border ${m.isPilot ? 'bg-cyan-600/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800/50 text-slate-500 border-slate-700'}`}>Pilot</button>
                    <button onClick={() => toggleUserField(m.id, 'isInstructor')} className={`text-[10px] px-2 py-1 rounded border ${m.isInstructor ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800/50 text-slate-500 border-slate-700'}`}>Instructor</button>
                    <button onClick={() => toggleUserField(m.id, 'isHR')} className={`text-[10px] px-2 py-1 rounded border ${m.isHR ? 'bg-amber-600/20 text-amber-300 border-amber-500/40' : 'bg-slate-800/50 text-slate-500 border-slate-700'}`}>HR</button>
                    <button onClick={() => toggleUserField(m.id, 'hasTestAccess')} className={`text-[10px] px-2 py-1 rounded border ${m.hasTestAccess ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800/50 text-slate-500 border-slate-700'}`}>Teste</button>
                    <button onClick={() => deleteUser(m.id)} className="text-[10px] px-2 py-1 rounded border bg-rose-600/20 text-rose-300 border-rose-500/40"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (activeTab === 'conducere') {
      return (
        <div className="space-y-4">
          {!hqUnlocked ? (
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3"><Terminal className="w-5 h-5 text-amber-400" /><h2 className="text-base font-bold text-white">Panou Conducere & HR — Verificare Cod Securitate</h2></div>
              {hqPinError && <div className="mb-3 p-2 bg-rose-950/70 border border-rose-500/60 rounded-lg text-xs text-rose-200">{hqPinError}</div>}
              <form onSubmit={handleVerifyHqPin} className="space-y-3">
                <input type="password" value={hqPinInput} onChange={(e) => setHqPinInput(e.target.value)} placeholder="Cod securitate conducere..." className="w-full bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white font-mono" />
                <button type="submit" className="w-full bg-amber-600/20 border border-amber-500/50 text-amber-300 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-600/30 transition-all"><Key className="w-4 h-4" /> Deblochează Panou</button>
              </form>
            </div>
          ) : (
            <>
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3"><Terminal className="w-5 h-5 text-amber-400" /><h2 className="text-base font-bold text-white">Consolă Tactică & HR D.O.S.</h2></div>
                <form onSubmit={executeCommand} className="flex gap-2">
                  <input type="text" value={cmdInput} onChange={(e) => setCmdInput(e.target.value)} placeholder="/help pentru comenzi..." className="flex-1 bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white font-mono" />
                  <button type="submit" className="bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-cyan-600/30 transition-all"><Send className="w-4 h-4" /></button>
                </form>
                <div className="mt-3 bg-black/60 rounded-lg p-3 max-h-48 overflow-y-auto font-mono text-xs space-y-1">
                  {cmdLogs.map((log, i) => (
                    <div key={i} className={log.type === 'error' ? 'text-rose-400' : log.type === 'success' ? 'text-emerald-400' : log.type === 'cmd' ? 'text-cyan-300' : log.type === 'system' ? 'text-amber-300' : 'text-slate-400'}>
                      [{log.time}] {log.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><UserPlus className="w-4 h-4 text-cyan-400" /> Adaugă Membru Nou</h3>
                <form onSubmit={handleAddMember} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input type="text" value={newMemberForm.name} onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })} placeholder="Nume" className="bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                  <input type="text" value={newMemberForm.username} onChange={(e) => setNewMemberForm({ ...newMemberForm, username: e.target.value })} placeholder="Username Roblox" className="bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                  <input type="text" value={newMemberForm.robloxId} onChange={(e) => setNewMemberForm({ ...newMemberForm, robloxId: e.target.value })} placeholder="Roblox ID" className="bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                  <input type="text" value={newMemberForm.badge} onChange={(e) => setNewMemberForm({ ...newMemberForm, badge: e.target.value })} placeholder="Indicativ (ex: Delta | 01)" className="bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                  <select value={newMemberForm.rank} onChange={(e) => setNewMemberForm({ ...newMemberForm, rank: e.target.value })} className="bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white">
                    {RANKS.map((r) => (<option key={r} value={r}>{r}</option>))}
                  </select>
                  <input type="text" value={newMemberForm.password} onChange={(e) => setNewMemberForm({ ...newMemberForm, password: e.target.value })} placeholder="Parolă individuală" className="bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                  <div className="flex flex-wrap gap-3 items-center">
                    <label className="flex items-center gap-1.5 text-xs text-slate-300"><input type="checkbox" checked={newMemberForm.isPilot} onChange={(e) => setNewMemberForm({ ...newMemberForm, isPilot: e.target.checked })} className="accent-cyan-500" /> Pilot</label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-300"><input type="checkbox" checked={newMemberForm.isInstructor} onChange={(e) => setNewMemberForm({ ...newMemberForm, isInstructor: e.target.checked })} className="accent-emerald-500" /> Instructor</label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-300"><input type="checkbox" checked={newMemberForm.isHR} onChange={(e) => setNewMemberForm({ ...newMemberForm, isHR: e.target.checked })} className="accent-amber-500" /> HR</label>
                  </div>
                  <button type="submit" className="sm:col-span-2 bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-600/30 transition-all"><UserPlus className="w-4 h-4" /> Adaugă Membru</button>
                </form>
              </div>
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-3">Setări Sistem</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Limită Auto-Stop Ture (minute)</label>
                    <input type="number" value={autoStopMinutes} onChange={(e) => setAutoStopMinutes(Math.max(1, parseInt(e.target.value, 10) || 180))} className="w-32 bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Cod Securitate Conducere</label>
                    <div className="flex gap-2">
                      <input type="text" value={newHqPinSetting} onChange={(e) => setNewHqPinSetting(e.target.value)} placeholder="Cod nou..." className="flex-1 bg-slate-950/90 border border-slate-700/90 rounded-lg px-3 py-2 text-sm text-white font-mono" />
                      <button onClick={() => { if (newHqPinSetting.trim()) { setLeadershipPin(newHqPinSetting.trim()); setNewHqPinSetting(''); triggerToast('Cod securitate actualizat!', 'success'); } }} className="bg-amber-600/20 border border-amber-500/40 text-amber-300 px-3 py-2 rounded-lg text-sm font-bold hover:bg-amber-600/30 transition-all">Schimbă</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#101d36_0%,#070b14_55%,#030508_100%)] text-slate-100">
      {/* Toast */}
      {toastMessage && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg border backdrop-blur-md ${toastMessage.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200' : toastMessage.type === 'error' ? 'bg-rose-950/90 border-rose-500/60 text-rose-200' : 'bg-slate-900/90 border-cyan-500/40 text-cyan-200'}`}>
          {toastMessage.msg}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-800 to-black border border-amber-400/60 flex items-center justify-center"><Shield className="w-5 h-5 text-amber-400" /></div>
            <div>
              <h1 className="text-sm font-black italic uppercase tracking-tight text-white">D.O.S.</h1>
              <p className="text-[10px] font-mono text-cyan-400">MARV ROLEPLAY</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs text-white font-medium">{currentUser.name} • {currentUser.rank}</p>
              <p className="text-[10px] text-slate-400 font-mono">{currentUser.badge} • {currentUser.status}</p>
            </div>
            <button onClick={handleLogout} className="bg-rose-600/15 border border-rose-500/40 text-rose-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-rose-600/25 transition-all"><LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Deconectare</span></button>
          </div>
        </div>
        {/* Nav */}
        <nav className="max-w-6xl mx-auto px-4 pb-2 overflow-x-auto">
          <div className="flex gap-1.5 min-w-max">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap border transition-all ${activeTab === tab.id ? 'bg-cyan-600/25 border-cyan-500/50 text-cyan-200' : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:border-slate-600 hover:text-slate-300'} ${tab.alert ? 'border-rose-500/30' : ''} ${tab.restricted ? 'border-amber-500/20' : ''}`}>
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.live && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-4 pb-20">
        {renderTabContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 text-center">
        <p className="text-[10px] font-mono text-slate-600">© 2026 D.O.S. MARV ROLEPLAY • SISTEM INTERN CLASIFICAT • ANTI-CHEAT ACTIV</p>
      </footer>
    </div>
  );
}
