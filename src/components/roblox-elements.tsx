"use client";

// Floating Roblox-themed SVG elements for background decoration
export function RobloxFloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Robux coin */}
      <div className="absolute top-[15%] left-[8%] animate-float-slow opacity-20">
        <RobuxIcon size={48} />
      </div>
      <div className="absolute top-[60%] right-[5%] animate-float opacity-15 delay-300">
        <RobuxIcon size={32} />
      </div>
      <div className="absolute bottom-[20%] left-[15%] animate-float-slow delay-500 opacity-10">
        <RobuxIcon size={56} />
      </div>

      {/* Roblox blocks */}
      <div className="absolute top-[25%] right-[12%] animate-float delay-200 opacity-15">
        <RobloxBlock size={36} />
      </div>
      <div className="absolute top-[70%] left-[5%] animate-float-slow delay-400 opacity-10">
        <RobloxBlock size={28} />
      </div>
      <div className="absolute bottom-[35%] right-[18%] animate-float delay-600 opacity-12">
        <RobloxBlock size={42} />
      </div>

      {/* Roblox character head */}
      <div className="absolute top-[40%] left-[3%] animate-float-slow delay-100 opacity-10">
        <RobloxHead size={44} />
      </div>
      <div className="absolute top-[10%] right-[20%] animate-float delay-500 opacity-8">
        <RobloxHead size={36} />
      </div>

      {/* Plus signs (like game items) */}
      <div className="absolute top-[50%] right-[8%] animate-spin-slow opacity-10">
        <PlusIcon size={24} />
      </div>
      <div className="absolute bottom-[15%] right-[30%] animate-spin-slow delay-300 opacity-8">
        <PlusIcon size={20} />
      </div>
      <div className="absolute top-[80%] left-[25%] animate-spin-slow delay-700 opacity-8">
        <PlusIcon size={16} />
      </div>

      {/* Dots / particles */}
      <div className="absolute top-[30%] left-[30%] w-2 h-2 bg-[#00b06a] rounded-full animate-float opacity-20" />
      <div className="absolute top-[55%] right-[25%] w-1.5 h-1.5 bg-[#00b06a] rounded-full animate-float-slow delay-200 opacity-15" />
      <div className="absolute bottom-[40%] left-[40%] w-1 h-1 bg-[#00d47e] rounded-full animate-float delay-400 opacity-20" />
      <div className="absolute top-[20%] left-[50%] w-2 h-2 bg-[#3b82f6] rounded-full animate-float-slow delay-600 opacity-10" />
      <div className="absolute bottom-[25%] right-[40%] w-1.5 h-1.5 bg-[#00b06a] rounded-full animate-float delay-100 opacity-15" />
    </div>
  );
}

function RobuxIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke="#00b06a" strokeWidth="2.5" fill="none" />
      <circle cx="20" cy="20" r="12" stroke="#00b06a" strokeWidth="1.5" fill="none" opacity="0.5" />
      <text x="20" y="25" textAnchor="middle" fill="#00b06a" fontSize="14" fontWeight="bold" fontFamily="sans-serif">R$</text>
    </svg>
  );
}

function RobloxBlock({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="4" y="4" width="28" height="28" rx="4" stroke="#00b06a" strokeWidth="2" fill="none" />
      <circle cx="13" cy="14" r="3" fill="#00b06a" opacity="0.6" />
      <circle cx="23" cy="14" r="3" fill="#00b06a" opacity="0.6" />
      <rect x="12" y="22" width="12" height="3" rx="1.5" fill="#00b06a" opacity="0.4" />
    </svg>
  );
}

function RobloxHead({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="6" y="6" width="28" height="28" rx="6" stroke="#00b06a" strokeWidth="2" fill="none" />
      <circle cx="15" cy="17" r="2.5" fill="#00b06a" opacity="0.7" />
      <circle cx="25" cy="17" r="2.5" fill="#00b06a" opacity="0.7" />
      <path d="M14 26 C14 26 17 29 20 29 C23 29 26 26 26 26" stroke="#00b06a" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}

function PlusIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 4 L10 16 M4 10 L16 10" stroke="#00b06a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Process flow - simple 3-step visual for kids
export function ProcessFlow() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center animate-fade-in-up delay-200" style={{ opacity: 0 }}>
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-[#00b06a]/20 to-[#00b06a]/5 border-2 border-[#00b06a]/30 flex items-center justify-center mb-4 hover:scale-110 hover:border-[#00b06a]/60 hover:shadow-lg hover:shadow-[#00b06a]/20 transition-all duration-300 group">
            {/* Key icon */}
            <svg className="w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform" viewBox="0 0 48 48" fill="none">
              <circle cx="18" cy="18" r="8" fill="none" stroke="#00b06a" strokeWidth="3"/>
              <circle cx="18" cy="18" r="4" fill="#00b06a" opacity="0.3"/>
              <path d="M24 24 L40 40" stroke="#00b06a" strokeWidth="3" strokeLinecap="round"/>
              <path d="M36 36 L40 32" stroke="#00b06a" strokeWidth="3" strokeLinecap="round"/>
              <path d="M32 32 L36 28" stroke="#00b06a" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#00b06a] text-white text-sm font-bold flex items-center justify-center mb-2 shadow-lg shadow-[#00b06a]/30">
            1
          </div>
          <h3 className="text-base font-bold mb-1">Введи код</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Код из покупки на маркетплейсе
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center animate-fade-in-up delay-400" style={{ opacity: 0 }}>
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-2 border-blue-500/30 flex items-center justify-center mb-4 hover:scale-110 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
            {/* Golden ticket icon */}
            <svg className="w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform" viewBox="0 0 48 48" fill="none">
              <rect x="6" y="14" width="36" height="20" rx="3" fill="#E8A820" transform="rotate(-8 24 24)"/>
              <line x1="12" y1="20" x2="34" y2="17" stroke="#8B6914" strokeWidth="1.2"/>
              <line x1="12" y1="24" x2="34" y2="21" stroke="#8B6914" strokeWidth="1.2"/>
              <path d="M20 30 L22 28 L24 30 L26 28 L28 30" stroke="#8B6914" strokeWidth="1" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center mb-2 shadow-lg shadow-blue-500/30">
            2
          </div>
          <h3 className="text-base font-bold mb-1">Создай GamePass</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            По нашей инструкции за 2 минуты
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center animate-fade-in-up delay-600" style={{ opacity: 0 }}>
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/30 flex items-center justify-center mb-4 hover:scale-110 hover:border-yellow-500/60 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 group animate-bounce-subtle">
            {/* Robux hexagon icon - matching the official logo */}
            <svg className="w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L43 14V34L24 44L5 34V14L24 4Z" fill="none" stroke="#E8A820" strokeWidth="3.5" strokeLinejoin="round"/>
              <path d="M24 12L36 18.5V31.5L24 38L12 31.5V18.5L24 12Z" fill="none" stroke="#E8A820" strokeWidth="2.5" strokeLinejoin="round"/>
              <rect x="20" y="20" width="8" height="8" rx="1" fill="#E8A820"/>
            </svg>
          </div>
          <div className="w-7 h-7 rounded-full bg-yellow-500 text-white text-sm font-bold flex items-center justify-center mb-2 shadow-lg shadow-yellow-500/30">
            3
          </div>
          <h3 className="text-base font-bold mb-1">Получи Robux</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Robux придут за 5-7 дней
          </p>
        </div>
      </div>
    </div>
  );
}
