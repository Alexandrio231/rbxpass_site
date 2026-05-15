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

// Process flow diagram component - circuit board style like AuthKit
export function ProcessFlow() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 relative">
      {/* Circuit board background lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" fill="none" preserveAspectRatio="xMidYMid meet">
        {/* Horizontal lines */}
        <path d="M0 200 L200 200" stroke="rgba(0,176,106,0.1)" strokeWidth="1" />
        <path d="M600 200 L800 200" stroke="rgba(0,176,106,0.1)" strokeWidth="1" />
        <path d="M300 200 L500 200" stroke="rgba(0,176,106,0.15)" strokeWidth="1.5" className="animate-pulse" />
        
        {/* Vertical lines */}
        <path d="M400 0 L400 120" stroke="rgba(0,176,106,0.08)" strokeWidth="1" />
        <path d="M400 280 L400 400" stroke="rgba(0,176,106,0.08)" strokeWidth="1" />
        
        {/* Diagonal connectors */}
        <path d="M250 200 L320 140" stroke="rgba(0,176,106,0.1)" strokeWidth="1" />
        <path d="M550 200 L480 140" stroke="rgba(0,176,106,0.1)" strokeWidth="1" />
        <path d="M250 200 L320 260" stroke="rgba(0,176,106,0.1)" strokeWidth="1" />
        <path d="M550 200 L480 260" stroke="rgba(0,176,106,0.1)" strokeWidth="1" />
        
        {/* Corner connectors */}
        <path d="M100 100 L100 150 L200 150" stroke="rgba(0,176,106,0.06)" strokeWidth="1" />
        <path d="M700 100 L700 150 L600 150" stroke="rgba(0,176,106,0.06)" strokeWidth="1" />
        <path d="M100 300 L100 250 L200 250" stroke="rgba(0,176,106,0.06)" strokeWidth="1" />
        <path d="M700 300 L700 250 L600 250" stroke="rgba(0,176,106,0.06)" strokeWidth="1" />
        
        {/* Small dots at intersections */}
        <circle cx="200" cy="200" r="3" fill="rgba(0,176,106,0.2)" />
        <circle cx="600" cy="200" r="3" fill="rgba(0,176,106,0.2)" />
        <circle cx="400" cy="120" r="2" fill="rgba(0,176,106,0.15)" />
        <circle cx="400" cy="280" r="2" fill="rgba(0,176,106,0.15)" />
        <circle cx="100" cy="150" r="2" fill="rgba(0,176,106,0.1)" />
        <circle cx="700" cy="150" r="2" fill="rgba(0,176,106,0.1)" />
        
        {/* Animated pulse dots traveling along paths */}
        <circle r="3" fill="#00b06a" opacity="0.6">
          <animateMotion dur="4s" repeatCount="indefinite" path="M200 200 L400 200" />
        </circle>
        <circle r="3" fill="#00b06a" opacity="0.6">
          <animateMotion dur="4s" repeatCount="indefinite" path="M400 200 L600 200" begin="2s" />
        </circle>
        <circle r="2" fill="#00b06a" opacity="0.4">
          <animateMotion dur="3s" repeatCount="indefinite" path="M400 120 L400 200" begin="1s" />
        </circle>
      </svg>

      {/* Main grid layout */}
      <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-4 md:gap-6 max-w-2xl mx-auto">
        {/* Top row - side nodes */}
        <div className="flex justify-center items-end">
          <CircuitNode
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 8h4M7 12h10M7 16h6" strokeLinecap="round" />
              </svg>
            }
            label="Ваш код"
            size="sm"
          />
        </div>
        <div /> {/* empty center top */}
        <div className="flex justify-center items-end">
          <CircuitNode
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4l2 2" strokeLinecap="round" />
              </svg>
            }
            label="Проверка"
            size="sm"
          />
        </div>

        {/* Middle row - main center node */}
        <div className="flex justify-center items-center">
          <CircuitNode
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="18" rx="3" />
                <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            label="GamePass"
            size="sm"
          />
        </div>
        <div className="flex justify-center items-center">
          <CircuitNode
            icon={
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#00b06a" strokeWidth="2" />
                <circle cx="16" cy="16" r="7" stroke="#00b06a" strokeWidth="1.5" opacity="0.5" />
                <text x="16" y="20" textAnchor="middle" fill="#00b06a" fontSize="10" fontWeight="bold" fontFamily="sans-serif">R$</text>
              </svg>
            }
            label="RBXPass"
            size="lg"
            highlighted
          />
        </div>
        <div className="flex justify-center items-center">
          <CircuitNode
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            label="Ваш аккаунт"
            size="sm"
          />
        </div>

        {/* Bottom row */}
        <div className="flex justify-center items-start">
          <CircuitNode
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="8" cy="9" r="2" fill="currentColor" opacity="0.6" />
                <circle cx="16" cy="9" r="2" fill="currentColor" opacity="0.6" />
                <rect x="8" y="15" width="8" height="2" rx="1" fill="currentColor" opacity="0.4" />
              </svg>
            }
            label="Roblox"
            size="sm"
          />
        </div>
        <div className="flex justify-center items-start">
          <CircuitNode
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" />
              </svg>
            }
            label="Транзакция"
            size="sm"
          />
        </div>
        <div className="flex justify-center items-start">
          <CircuitNode
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            }
            label="Robux"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}

function CircuitNode({ icon, label, size = "sm", highlighted = false }: {
  icon: React.ReactNode; label: string; size?: "sm" | "lg"; highlighted?: boolean;
}) {
  const sizeClasses = size === "lg" ? "w-20 h-20" : "w-14 h-14";
  const containerClasses = highlighted
    ? "border-[#00b06a]/40 bg-[#00b06a]/10 shadow-lg shadow-[#00b06a]/10 animate-glow-pulse"
    : "border-white/10 bg-white/[0.03] hover:border-[#00b06a]/30 hover:bg-[#00b06a]/5";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizeClasses} rounded-2xl border ${containerClasses} flex items-center justify-center text-[#00b06a] transition-all duration-300 hover:scale-105`}>
        {icon}
      </div>
      <span className="text-[10px] md:text-xs text-muted-foreground font-medium px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5">
        {label}
      </span>
    </div>
  );
}
