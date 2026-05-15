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

// Process flow diagram component
export function ProcessFlow() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Step 1 */}
        <FlowStep
          number={1}
          title="Введи код"
          description="Код из покупки"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M7 8h4M7 12h10M7 16h6" strokeLinecap="round" />
            </svg>
          }
          delay="delay-100"
        />

        {/* Arrow */}
        <FlowArrow />

        {/* Step 2 */}
        <FlowStep
          number={2}
          title="Создай GamePass"
          description="По инструкции"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="18" rx="3" />
              <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          delay="delay-300"
        />

        {/* Arrow */}
        <FlowArrow />

        {/* Step 3 */}
        <FlowStep
          number={3}
          title="Получи Robux"
          description="5-7 дней"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" stroke="none">R$</text>
            </svg>
          }
          delay="delay-500"
        />
      </div>
    </div>
  );
}

function FlowStep({ number, title, description, icon, delay }: {
  number: number; title: string; description: string; icon: React.ReactNode; delay: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-3 animate-fade-in-up ${delay}`} style={{ opacity: 0 }}>
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-[#00b06a]/10 border border-[#00b06a]/20 flex items-center justify-center text-[#00b06a] transition-all duration-300 hover:scale-110 hover:bg-[#00b06a]/15 hover:border-[#00b06a]/40 hover:shadow-lg hover:shadow-[#00b06a]/10">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00b06a] text-white text-xs font-bold flex items-center justify-center">
          {number}
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden md:flex items-center px-2">
      <div className="w-12 h-[2px] bg-gradient-to-r from-[#00b06a]/40 to-[#00b06a]/10 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-[#00b06a]/40 border-y-[4px] border-y-transparent" />
      </div>
    </div>
  );
}
