import { useState } from 'react';
import { Shield } from 'lucide-react';


// ============================================================================
// COMPONENTA ȘTAMPILĂ OFICIALĂ D.O.S. & BANNER TIPOGRAFIC
// ============================================================================
export const OfficialStamp = ({ text = 'APROBAT CONDUCEREA D.O.S.', variant = 'gold', size = 'md', className = '' }) => {
  const colorStyles = {
    gold: 'border-amber-400/80 text-amber-300 bg-amber-500/10 shadow-[0_0_18px_rgba(245,158,11,0.22)]',
    red: 'border-rose-500/80 text-rose-300 bg-rose-500/10 shadow-[0_0_18px_rgba(244,63,94,0.25)]',
    blue: 'border-cyan-400/80 text-cyan-200 bg-cyan-500/10 shadow-[0_0_18px_rgba(6,182,212,0.22)]',
    green: 'border-emerald-400/80 text-emerald-300 bg-emerald-500/10 shadow-[0_0_18px_rgba(16,185,129,0.22)]'
  };
  const sizeStyles = {
    sm: 'text-[9px] sm:text-[10px] px-2 py-0.5 border',
    md: 'text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 border-2',
    lg: 'text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 border-2'
  };
  return (
    <div className={`inline-flex flex-col items-center justify-center font-mono font-black tracking-widest uppercase rounded select-none transform -rotate-2 backdrop-blur-sm ${colorStyles[variant] || colorStyles.gold} ${sizeStyles[size]} ${className}`} style={{ letterSpacing: '0.12em' }}>
      <div className="flex items-center gap-1.5">
        <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
        <span className="text-center">{text}</span>
      </div>
      <span className="text-[7px] sm:text-[8px] opacity-80 tracking-[0.2em] mt-0.5">D.O.S. • MARV ROLEPLAY</span>
    </div>
  );
};

export const DosTypographicBanner = () => (
  <div className="relative overflow-hidden rounded-xl bg-black/90 border border-slate-700/80 py-3 px-4 my-4 shadow-inner flex items-center justify-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_70%)] pointer-events-none" />
    <span className="text-xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)] select-none text-center" style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif', letterSpacing: '0.04em' }}>
      DIRECȚIA DE OPERAȚIUNI SPECIALE
    </span>
  </div>
);

// ============================================================================
// FOTOGRAFII INTEGRATE (ILUSTRAȚII TACTICE DETALIATE)
// ============================================================================
export const TacticalUndercoverShowcase = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 my-6">
    <div className="bg-gradient-to-b from-slate-900/90 to-[#070a12] border border-slate-700/80 rounded-xl overflow-hidden shadow-2xl group hover:border-cyan-500/50 transition-all">
      <div className="relative bg-gradient-to-b from-[#2b2922] via-[#171920] to-[#0b0e14] p-3 sm:p-4 h-52 sm:h-60 flex items-end justify-center overflow-hidden">
        <div className="absolute top-2.5 left-2.5 flex items-center gap-2 z-10">
          <span className="px-2 py-0.5 bg-rose-600/25 border border-rose-500/50 text-rose-300 text-[9px] sm:text-[10px] font-mono uppercase rounded backdrop-blur-sm">UNITATE UNDERCOVER #01 • VITO</span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-10"><OfficialStamp text="STRICT SECRET" variant="red" size="sm" /></div>
        <svg viewBox="0 0 520 210" className="w-full h-full max-h-48 sm:max-h-52 drop-shadow-[0_12px_22px_rgba(0,0,0,0.95)]">
          <rect x="0" y="0" width="520" height="155" fill="#2a281f" opacity="0.55" />
          <rect x="25" y="15" width="75" height="95" fill="#181a20" stroke="#3f3d32" strokeWidth="2" />
          <rect x="125" y="15" width="75" height="95" fill="#181a20" stroke="#3f3d32" strokeWidth="2" />
          <rect x="225" y="15" width="75" height="95" fill="#181a20" stroke="#3f3d32" strokeWidth="2" />
          <rect x="0" y="155" width="520" height="55" fill="#1e222b" />
          <line x1="0" y1="155" x2="520" y2="155" stroke="#64748b" strokeWidth="2" />
          <polygon points="390,175 495,175 510,205 375,205" fill="#cbd5e1" opacity="0.7" />
          <polygon points="415,175 465,175 475,205 405,205" fill="#dc2626" opacity="0.75" />
          <path d="M22,150 L28,108 L85,68 L295,68 L308,148 Z" fill="#07090e" stroke="#334155" strokeWidth="2" />
          <path d="M88,71 L290,71" stroke="#94a3b8" strokeWidth="2" opacity="0.45" />
          <path d="M38,105 L88,74 L138,74 L138,105 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <rect x="145" y="74" width="68" height="31" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <rect x="218" y="74" width="75" height="31" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <circle cx="34" cy="127" r="7" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M34,120 L34,127 L29,132 M34,127 L39,132" stroke="#cbd5e1" strokeWidth="1.2" />
          <rect x="44" y="124" width="12" height="3.5" rx="1" fill="#38bdf8" className="animate-pulse" />
          <rect x="58" y="124" width="12" height="3.5" rx="1" fill="#ef4444" className="animate-pulse" />
          <circle cx="92" cy="152" r="22" fill="#090d16" stroke="#64748b" strokeWidth="3" />
          <circle cx="92" cy="152" r="10" fill="#cbd5e1" />
          <circle cx="255" cy="152" r="22" fill="#090d16" stroke="#64748b" strokeWidth="3" />
          <circle cx="255" cy="152" r="10" fill="#cbd5e1" />
          <g transform="translate(298, 66)">
            <rect x="12" y="0" width="26" height="25" rx="5" fill="#0b0f17" stroke="#334155" strokeWidth="1.5" />
            <rect x="26" y="7" width="16" height="9" rx="2" fill="#1e293b" stroke="#f97316" strokeWidth="1.2" />
            <circle cx="38" cy="11.5" r="3" fill="#0ea5e9" />
            <rect x="5" y="27" width="40" height="46" rx="2" fill="#1c212b" stroke="#334155" strokeWidth="1.5" />
            <polygon points="20,27 30,27 25,47" fill="#f8fafc" />
            <polygon points="24,29 26,29 27,51 25,54 23,51" fill="#090d16" />
            <rect x="-5" y="27" width="9" height="44" rx="2" fill="#1c212b" stroke="#334155" />
            <rect x="46" y="27" width="9" height="44" rx="2" fill="#1c212b" stroke="#334155" />
            <rect x="7" y="74" width="17" height="40" fill="#11151c" stroke="#334155" />
            <rect x="26" y="74" width="17" height="40" fill="#11151c" stroke="#334155" />
          </g>
          <g transform="translate(388, 66)">
            <rect x="12" y="0" width="26" height="25" rx="5" fill="#0b0f17" stroke="#334155" strokeWidth="1.5" />
            <rect x="24" y="7" width="16" height="9" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
            <circle cx="36" cy="11.5" r="3" fill="#0ea5e9" />
            <rect x="5" y="27" width="40" height="46" rx="2" fill="#1c212b" stroke="#334155" strokeWidth="1.5" />
            <polygon points="20,27 30,27 25,47" fill="#f8fafc" />
            <polygon points="24,29 26,29 27,51 25,54 23,51" fill="#090d16" />
            <rect x="-5" y="27" width="9" height="44" rx="2" fill="#1c212b" stroke="#334155" />
            <rect x="46" y="27" width="9" height="44" rx="2" fill="#1c212b" stroke="#334155" />
            <rect x="7" y="74" width="17" height="40" fill="#11151c" stroke="#334155" />
            <rect x="26" y="74" width="17" height="40" fill="#11151c" stroke="#334155" />
          </g>
        </svg>
      </div>
      <div className="p-3.5 sm:p-4 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-2 bg-slate-950/60">
        <div>
          <h4 className="text-white font-bold text-xs sm:text-sm">Echipă Filaj & Transport Operativ (Vito Undercover)</h4>
          <p className="text-slate-400 text-[11px] sm:text-xs mt-0.5">Regim sub acoperire • Semnale luminoase dezactivate în filaj (Secț. 4)</p>
        </div>
        <span className="text-[10px] sm:text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">UNDERCOVER</span>
      </div>
    </div>
    <div className="bg-gradient-to-b from-slate-900/90 to-[#070a12] border border-slate-700/80 rounded-xl overflow-hidden shadow-2xl group hover:border-amber-500/50 transition-all">
      <div className="relative bg-gradient-to-b from-[#1e261b] via-[#131817] to-[#0b0e14] p-3 sm:p-4 h-52 sm:h-60 flex items-end justify-center overflow-hidden">
        <div className="absolute top-2.5 left-2.5 flex items-center gap-2 z-10">
          <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[9px] sm:text-[10px] font-mono uppercase rounded backdrop-blur-sm">FORMAȚIE COMPLETĂ • 6 OPERATIVI D.O.S.</span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-10"><OfficialStamp text="APROBAT DIRECTOR" variant="gold" size="sm" /></div>
        <svg viewBox="0 0 520 210" className="w-full h-full max-h-48 sm:max-h-52 drop-shadow-[0_12px_22px_rgba(0,0,0,0.95)]">
          <polygon points="35,148 72,22 110,148" fill="#1a2e1a" opacity="0.85" />
          <polygon points="95,148 135,15 175,148" fill="#233b22" opacity="0.85" />
          <polygon points="345,148 385,18 425,148" fill="#1a2e1a" opacity="0.85" />
          <polygon points="410,148 452,25 495,148" fill="#233b22" opacity="0.85" />
          <rect x="0" y="158" width="520" height="52" fill="#1c2026" />
          <line x1="0" y1="158" x2="520" y2="158" stroke="#475569" strokeWidth="1.5" />
          <path d="M12,150 L18,112 L62,84 L175,84 L185,150 Z" fill="#07090e" stroke="#334155" strokeWidth="1.5" />
          <rect x="65" y="90" width="48" height="20" rx="2" fill="#111827" stroke="#334155" />
          <rect x="118" y="90" width="48" height="20" rx="2" fill="#111827" stroke="#334155" />
          <circle cx="46" cy="152" r="17" fill="#090d16" stroke="#64748b" strokeWidth="2.5" />
          <circle cx="46" cy="152" r="8" fill="#475569" />
          <circle cx="152" cy="152" r="17" fill="#090d16" stroke="#64748b" strokeWidth="2.5" />
          <circle cx="152" cy="152" r="8" fill="#475569" />
          <path d="M335,150 L345,84 L458,84 L502,112 L508,150 Z" fill="#07090e" stroke="#334155" strokeWidth="1.5" />
          <rect x="354" y="90" width="48" height="20" rx="2" fill="#111827" stroke="#334155" />
          <rect x="407" y="90" width="48" height="20" rx="2" fill="#111827" stroke="#334155" />
          <circle cx="368" cy="152" r="17" fill="#090d16" stroke="#64748b" strokeWidth="2.5" />
          <circle cx="368" cy="152" r="8" fill="#475569" />
          <circle cx="474" cy="152" r="17" fill="#090d16" stroke="#64748b" strokeWidth="2.5" />
          <circle cx="474" cy="152" r="8" fill="#475569" />
          {[132, 174, 216, 258, 300, 342].map((xPos, idx) => (
            <g key={idx} transform={`translate(${xPos}, 76)`}>
              <rect x="8" y="0" width="22" height="21" rx="4" fill="#0b0f17" stroke="#475569" strokeWidth="1.2" />
              <rect x="11" y="6" width="16" height="6" rx="1.5" fill={idx === 3 ? '#fbbf24' : '#38bdf8'} />
              <rect x="3" y="23" width="32" height="38" rx="2" fill="#1c212b" stroke="#475569" strokeWidth="1.2" />
              <polygon points="15,23 23,23 19,38" fill="#f8fafc" />
              <polygon points="18,24 20,24 20.5,41 19,43 17.5,41" fill="#090d16" />
              <rect x="-4" y="23" width="6" height="36" rx="1" fill="#1c212b" stroke="#475569" />
              <rect x="36" y="23" width="6" height="36" rx="1" fill="#1c212b" stroke="#475569" />
              <rect x="37" y="27" width="4" height="5" fill="#3b82f6" />
              <rect x="4" y="62" width="14" height="32" fill="#11151c" stroke="#475569" />
              <rect x="20" y="62" width="14" height="32" fill="#11151c" stroke="#475569" />
              <line x1="4" y1="73" x2="34" y2="73" stroke="#090d16" strokeWidth="2.5" />
            </g>
          ))}
        </svg>
      </div>
      <div className="p-3.5 sm:p-4 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-2 bg-slate-950/60">
        <div>
          <h4 className="text-white font-bold text-xs sm:text-sm">Dispozitiv Operativ D.O.S. – Convoi & Intervenție</h4>
          <p className="text-slate-400 text-[11px] sm:text-xs mt-0.5">Coordonare Alfa & Bravo • Identificare obligatorie la descindere (Secț. 7)</p>
        </div>
        <span className="text-[10px] sm:text-xs font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">ELITE UNIT</span>
      </div>
    </div>
  </div>
);

export const RoomClearingDiagram = () => {
  const [clearedSectors, setClearedSectors] = useState({ 1: true, 2: true, 3: true });
  const toggleSector = (sec) => setClearedSectors((prev) => ({ ...prev, [sec]: !prev[sec] }));
  const allClear = clearedSectors[1] && clearedSectors[2] && clearedSectors[3];
  return (
    <div className="bg-gradient-to-br from-slate-900/95 via-[#0c1322] to-slate-950 border border-slate-700/80 rounded-xl p-4 sm:p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">SCHEMA TACTICĂ CQB • ROOM CLEARING</span>
          <h3 className="text-base sm:text-lg font-bold text-white">Curățarea Încăperii & Unghiuri de Tragere (Sectoarele 1, 2, 3)</h3>
          <p className="text-xs text-slate-400">Apasă pe suspecții 1, 2, 3 de pe hartă sau pe butoane pentru a simula verificarea unghiurilor (CLEAR).</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[1, 2, 3].map((s) => (
            <button key={s} onClick={() => toggleSector(s)} className={`px-3 py-1.5 rounded font-mono text-xs font-bold border transition-all ${clearedSectors[s] ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'}`}>
              SECTOR {s}: {clearedSectors[s] ? 'CLEAR' : 'CONTACT!'}
            </button>
          ))}
        </div>
      </div>
      <div className="relative bg-[#070a10] border border-slate-800 rounded-lg p-3 sm:p-4 flex flex-col items-center">
        <svg viewBox="0 0 600 300" className="w-full max-w-2xl h-auto">
          <polygon points="140,40 460,40 560,240 40,240" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
          <line x1="140" y1="40" x2="140" y2="120" stroke="#475569" strokeWidth="2" />
          <line x1="460" y1="40" x2="460" y2="120" stroke="#475569" strokeWidth="2" />
          <line x1="140" y1="120" x2="460" y2="120" stroke="#475569" strokeWidth="2" />
          <line x1="40" y1="240" x2="245" y2="240" stroke="#94a3b8" strokeWidth="6" />
          <line x1="355" y1="240" x2="560" y2="240" stroke="#94a3b8" strokeWidth="6" />
          <line x1="270" y1="240" x2="95" y2="200" stroke={clearedSectors[3] ? '#22c55e' : '#ef4444'} strokeWidth="2.5" strokeDasharray="6,4" />
          <line x1="270" y1="240" x2="155" y2="155" stroke={clearedSectors[3] ? '#22c55e' : '#ef4444'} strokeWidth="2.5" />
          <text x="165" y="185" fill={clearedSectors[3] ? '#22c55e' : '#ef4444'} fontSize="11" fontFamily="monospace" fontWeight="bold" transform="rotate(-25 165,185)">{clearedSectors[3] ? 'CLEAR' : 'PERICOL'}</text>
          <line x1="285" y1="240" x2="245" y2="115" stroke={clearedSectors[2] ? '#22c55e' : '#ef4444'} strokeWidth="2.5" />
          <line x1="295" y1="240" x2="345" y2="115" stroke={clearedSectors[2] ? '#22c55e' : '#ef4444'} strokeWidth="2.5" />
          <text x="275" y="160" fill={clearedSectors[2] ? '#22c55e' : '#ef4444'} fontSize="11" fontFamily="monospace" fontWeight="bold" transform="rotate(-65 275,160)">{clearedSectors[2] ? 'CLEAR' : 'PERICOL'}</text>
          <line x1="310" y1="240" x2="430" y2="145" stroke={clearedSectors[1] ? '#22c55e' : '#ef4444'} strokeWidth="2.5" />
          <line x1="315" y1="240" x2="500" y2="205" stroke={clearedSectors[1] ? '#22c55e' : '#ef4444'} strokeWidth="2.5" strokeDasharray="6,4" />
          <text x="405" y="210" fill={clearedSectors[1] ? '#22c55e' : '#ef4444'} fontSize="11" fontFamily="monospace" fontWeight="bold" transform="rotate(-12 405,210)">{clearedSectors[1] ? 'CLEAR' : 'PERICOL'}</text>
          <g onClick={() => toggleSector(3)} className="cursor-pointer">
            <circle cx="145" cy="115" r="10" fill={clearedSectors[3] ? '#22c55e' : '#ef4444'} />
            <rect x="135" y="128" width="20" height="32" rx="4" fill={clearedSectors[3] ? '#22c55e' : '#ef4444'} />
            <text x="145" y="95" textAnchor="middle" fill="#60a5fa" fontSize="22" fontFamily="monospace" fontWeight="bold">3</text>
          </g>
          <g onClick={() => toggleSector(2)} className="cursor-pointer">
            <circle cx="355" cy="95" r="10" fill={clearedSectors[2] ? '#22c55e' : '#ef4444'} />
            <rect x="345" y="108" width="20" height="32" rx="4" fill={clearedSectors[2] ? '#22c55e' : '#ef4444'} />
            <text x="355" y="75" textAnchor="middle" fill="#60a5fa" fontSize="22" fontFamily="monospace" fontWeight="bold">2</text>
          </g>
          <g onClick={() => toggleSector(1)} className="cursor-pointer">
            <circle cx="495" cy="165" r="10" fill={clearedSectors[1] ? '#22c55e' : '#ef4444'} />
            <rect x="485" y="178" width="20" height="32" rx="4" fill={clearedSectors[1] ? '#22c55e' : '#ef4444'} />
            <text x="495" y="145" textAnchor="middle" fill="#60a5fa" fontSize="22" fontFamily="monospace" fontWeight="bold">1</text>
          </g>
          <ellipse cx="300" cy="245" rx="95" ry="32" fill="none" stroke="#22c55e" strokeWidth="2.5" />
          <ellipse cx="300" cy="245" rx="80" ry="25" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,4" />
          <circle cx="300" cy="235" r="11" fill="#090d16" stroke="#fbbf24" strokeWidth="2" />
          <rect x="288" y="247" width="24" height="34" rx="4" fill="#090d16" stroke="#fbbf24" strokeWidth="2" />
          <text x="300" y="294" textAnchor="middle" fill="#fbbf24" fontSize="11" fontFamily="monospace" fontWeight="bold">OPERATIV D.O.S. (PUNCT INTRARE)</text>
        </svg>
        <div className="mt-3 flex flex-wrap items-center justify-between w-full gap-2 pt-3 border-t border-slate-800">
          <div className="text-xs text-slate-300 font-mono">
            STATUS ÎNCĂPERE: {allClear ? <span className="text-emerald-400 font-bold">VERDE – TOATE SECTOARELE CLAREATE (1, 2, 3)</span> : <span className="text-rose-400 font-bold">COD ROȘU – AMENINȚARE ACTIVĂ ÎN ÎNCĂPERE!</span>}
          </div>
          <OfficialStamp text="PROTOCOL TACTIC D.O.S." variant={allClear ? 'green' : 'red'} size="sm" />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// APLICAȚIA PRINCIPALĂ D.O.S.
// ============================================================================
