"use client";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Loader2,
  Sparkles,
  Gamepad2,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Clock,
  AlertTriangle,
  Upload,
  Link as LinkIcon,
  Hash,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { RobloxFloatingElements, ProcessFlow } from "@/components/roblox-elements";

interface Game {
  id: number; name: string; slug: string; category: string;
  description: string | null; requires_gamepass: boolean;
}

// Price calculation: nominal / 0.7 rounded up (Roblox takes 30% commission)
function calculateGamePassPrice(nominal: number): number {
  return Math.ceil(nominal / 0.7);
}

export default function CodeActivationPage() {
  // Steps: 1=code, 2=nickname, 3=gamepass, 4=telegram+screenshot+confirm
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [telegram, setTelegram] = useState("");
  const [gamepassInput, setGamepassInput] = useState("");
  const [gamepassMode, setGamepassMode] = useState<"url" | "id">("url");
  const [gamepassChecked, setGamepassChecked] = useState(false);
  const [gamepassValid, setGamepassValid] = useState(false);
  const [gamepassInfo, setGamepassInfo] = useState<{ name: string; price: number | null; isForSale: boolean } | null>(null);
  const [regionalPricingConfirmed, setRegionalPricingConfirmed] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotUploading, setScreenshotUploading] = useState(false);
  const [screenshotPath, setScreenshotPath] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activationResult, setActivationResult] = useState<any>(null);
  const [nominal, setNominal] = useState<number>(0);
  const [gameInfo, setGameInfo] = useState<Game | null>(null);

  // Keep for future multi-game support
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    fetch("/api/games").then(r => r.json()).then(d => { if (d.ok) setGames(d.games); }).catch(() => {});
  }, []);
  void games;

  const requiredPrice = calculateGamePassPrice(nominal);

  const validateCode = (code: string) => {
    return /^[A-Z0-9]{2,6}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{1}$/i.test(code);
  };

  // Step 1: Validate code
  const handleCodeSubmit = async () => {
    if (!code.trim()) { setError("Введите код активации"); return; }
    if (!validateCode(code)) { setError("Неверный формат кода. Формат: PREFIX-XXXX-XXXX-Y"); return; }
    setError(null); setLoading(true);
    try {
      const res = await fetch("/api/validate-code", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.toUpperCase() }),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.ok) { setError(data.error || "Ошибка проверки кода"); return; }
      setNominal(data.nominal);
      setGameInfo(data.game);
      setActivationResult(data);
      setStep(2);
    } catch { setLoading(false); setError("Ошибка соединения с сервером"); }
  };

  // Step 2: Nickname -> next
  const handleNicknameSubmit = () => {
    if (!nickname.trim()) { setError("Введите ник в Roblox"); return; }
    setError(null);
    setStep(3);
  };

  // Step 3: Check GamePass
  const extractGamePassId = useCallback((input: string): string | null => {
    if (gamepassMode === "id") return input.trim() || null;
    const match = input.match(/\/game-pass\/(\d+)/);
    return match ? match[1] : null;
  }, [gamepassMode]);

  const checkGamePass = async () => {
    const gpId = extractGamePassId(gamepassInput);
    if (!gpId) { setError("Введите ссылку или ID GamePass"); return; }
    setError(null); setLoading(true); setGamepassChecked(false); setGamepassValid(false);
    try {
      const res = await fetch(`/api/check-gamepass?id=${encodeURIComponent(gpId)}`);
      const data = await res.json();
      setLoading(false); setGamepassChecked(true);
      if (!data.ok) {
        setError(data.error);
        setGamepassValid(false);
        return;
      }
      setGamepassInfo(data.gamepass);
      // Check price
      if (data.gamepass.price !== null && data.gamepass.price === requiredPrice) {
        setGamepassValid(true);
      } else if (data.gamepass.price !== null && data.gamepass.price !== requiredPrice) {
        setError(`Цена GamePass: ${data.gamepass.price}. Нужна: ${requiredPrice}. Измените цену и проверьте снова.`);
        setGamepassValid(false);
      } else {
        // Price is null (not for sale?)
        setGamepassValid(true); // Let them proceed but warn
      }
      if (!data.gamepass.isForSale) {
        setError("GamePass не выставлен на продажу. Включите 'Item for Sale' в настройках.");
        setGamepassValid(false);
      }
    } catch { setLoading(false); setError("Ошибка проверки GamePass"); }
  };

  const handleGamePassSubmit = () => {
    if (!gamepassValid || !regionalPricingConfirmed) return;
    setError(null);
    setStep(4);
  };

  // Step 4: Upload screenshot and activate
  const handleScreenshotUpload = async (file: File) => {
    setScreenshotFile(file);
    setScreenshotUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload-screenshot", { method: "POST", body: formData });
      const data = await res.json();
      setScreenshotUploading(false);
      if (!data.ok) { setError(data.error); return; }
      setScreenshotPath(data.path);
    } catch { setScreenshotUploading(false); setError("Ошибка загрузки файла"); }
  };

  const handleActivation = async () => {
    if (!agreedToTerms) { setError("Примите пользовательское соглашение"); return; }
    if (!screenshotPath) { setError("Загрузите скриншот покупки"); return; }
    setLoading(true); setError(null);
    const gpId = extractGamePassId(gamepassInput);
    try {
      const res = await fetch("/api/activate-gamepass", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.toUpperCase(),
          gamepassUrl: gamepassMode === "url" ? gamepassInput.trim() : `https://www.roblox.com/game-pass/${gpId}`,
          nickname: nickname.trim(),
          telegram: telegram.trim(),
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.ok) { setError(data.error || "Ошибка активации"); return; }
      setActivationResult(data);
      setSuccess(data.message || "Код успешно активирован!");
    } catch { setLoading(false); setError("Ошибка соединения с сервером"); }
  };

  const resetForm = () => {
    setCode(""); setNickname(""); setTelegram(""); setGamepassInput("");
    setGamepassMode("url"); setGamepassChecked(false); setGamepassValid(false);
    setGamepassInfo(null); setRegionalPricingConfirmed(false);
    setScreenshotFile(null); setScreenshotPath(null); setAgreedToTerms(false);
    setStep(1); setError(null); setSuccess(null); setActivationResult(null);
    setNominal(0); setGameInfo(null);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise grid-pattern">
      <RobloxFloatingElements />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#00b06a]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00b06a]/3 rounded-full blur-[150px]" />
      </div>

      <Navigation currentPage="activation" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 md:pt-20 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00b06a]/10 border border-[#00b06a]/20 mb-6">
                <div className="w-2 h-2 bg-[#00b06a] rounded-full animate-pulse" />
                <span className="text-xs font-medium text-[#00b06a]">Сервис активен</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up delay-100 leading-[1.1]" style={{ opacity: 0 }}>
              <span className="text-foreground">Активируй </span>
              <span className="gradient-text-hero">код на Robux</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
              Быстро, безопасно, с гарантией
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard icon={<Zap className="w-5 h-5" />} title="Мгновенно" description="Проверка за 1-2 сек" delay="delay-200" />
            <FeatureCard icon={<Shield className="w-5 h-5" />} title="Безопасно" description="Защищённые транзакции" delay="delay-300" />
            <FeatureCard icon={<Clock className="w-5 h-5" />} title="5-7 дней" description="Зачисление Robux" delay="delay-400" />
          </div>
        </section>

        {/* How it works */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in-up delay-300" style={{ opacity: 0 }}>Как получить Robux?</h2>
            <p className="text-sm text-muted-foreground animate-fade-in-up delay-400" style={{ opacity: 0 }}>Всего 3 шага</p>
          </div>
          <ProcessFlow />
        </section>

        {/* Activation Form */}
        <section id="activation-form" className="container mx-auto px-4 pb-16">
          <div className="max-w-lg mx-auto">
            {/* Step progress */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s < step ? "bg-[#00b06a] text-white" :
                    s === step ? "bg-[#00b06a]/20 text-[#00b06a] border border-[#00b06a]/40 animate-glow-pulse" :
                    "bg-white/5 text-muted-foreground border border-white/10"
                  }`}>
                    {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                  </div>
                  {s < 4 && <div className={`w-6 h-[2px] rounded ${s < step ? "bg-[#00b06a]" : "bg-white/10"}`} />}
                </div>
              ))}
            </div>

            {/* STEP 1: Code */}
            {step === 1 && !success && (
              <Card className="glass-card border-white/8 shadow-2xl animate-scale-in">
                <CardHeader className="text-center pb-2">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#00b06a]/10 border border-[#00b06a]/20 flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-[#00b06a]" />
                  </div>
                  <CardTitle className="text-xl">Введите код активации</CardTitle>
                  <CardDescription>Код из вашей покупки</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pt-2">
                  <Input
                    value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="RBX-ABCD-EFGH-5"
                    className="font-mono text-center text-lg h-14 bg-[#1a1a28] border-white/10 focus:border-[#00b06a]/50 tracking-[0.15em] rounded-xl"
                    disabled={loading}
                    onKeyDown={(e) => e.key === "Enter" && handleCodeSubmit()}
                  />
                  <p className="text-center text-xs text-muted-foreground">
                    Формат: <span className="font-mono text-foreground/70">PREFIX-XXXX-XXXX-Y</span>
                  </p>
                  <Button onClick={handleCodeSubmit} disabled={!code.trim() || loading} className="w-full h-12 text-base font-semibold btn-roblox rounded-xl" size="lg">
                    {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Проверка...</> : <>Проверить код<ArrowRight className="w-5 h-5 ml-2" /></>}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* STEP 2: Nickname */}
            {step === 2 && !success && (
              <Card className="glass-card border-white/8 shadow-2xl animate-scale-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#00b06a]" />
                    Шаг 1 из 3: ваш ник в Roblox
                  </CardTitle>
                  <CardDescription>Код проверен, теперь укажите ваш никнейм</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pt-2">
                  {/* Code info */}
                  <div className="rounded-xl p-4 bg-[#00b06a]/5 border border-[#00b06a]/15 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Код:</span><span className="font-mono font-bold">{code}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Номинал:</span><Badge className="bg-[#00b06a] text-white inline-flex items-center gap-1"><RobuxIcon />{nominal}</Badge></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Тип:</span><Badge variant="outline">Roblox</Badge></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Статус:</span><Badge className="bg-[#00b06a]/20 text-[#00b06a] border-[#00b06a]/30"><CheckCircle className="w-3 h-3 mr-1" />Готов к активации</Badge></div>
                  </div>

                  {/* Warning */}
                  <Alert className="border-yellow-500/20 bg-yellow-500/5 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <AlertDescription className="text-sm text-yellow-200/80">
                      <strong>Robux ещё НЕ начислены.</strong> Сначала создайте GamePass и заполните данные.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label className="text-sm">Ник в Roblox</Label>
                    <Input
                      value={nickname} onChange={(e) => setNickname(e.target.value)}
                      placeholder="Например, SuperPlayer123"
                      className="h-12 bg-[#1a1a28] border-white/10 focus:border-[#00b06a]/50 rounded-xl"
                      onKeyDown={(e) => e.key === "Enter" && handleNicknameSubmit()}
                    />
                  </div>

                  <Button onClick={handleNicknameSubmit} disabled={!nickname.trim()} className="w-full h-12 btn-roblox rounded-xl font-semibold">
                    Далее <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <button onClick={() => setStep(1)} className="w-full text-center text-sm text-muted-foreground hover:text-foreground py-2">← Назад к вводу кода</button>
                </CardContent>
              </Card>
            )}

            {/* STEP 3: GamePass */}
            {step === 3 && !success && (
              <Card className="glass-card border-white/8 shadow-2xl animate-scale-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Шаг 2 из 3: GamePass</CardTitle>
                  <CardDescription>Создайте GamePass и вставьте ссылку или ID</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pt-2">
                  {/* Instructions box */}
                  <div className="rounded-xl p-4 bg-[#00b06a]/5 border border-[#00b06a]/15 space-y-2">
                    <p className="text-sm font-semibold text-[#00b06a]">Создайте GamePass:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>откройте <a href="https://create.roblox.com/" target="_blank" className="text-[#00b06a] hover:underline">Creator Dashboard</a></li>
                      <li>создайте GamePass — <a href="/instructions" target="_blank" className="text-[#00b06a] hover:underline">как создать →</a></li>
                      <li>установите цену <strong className="text-foreground inline-flex items-center gap-1"><RobuxIcon />{requiredPrice}</strong> для этого кода</li>
                      <li>отключите Regional Pricing — <a href="/instructions" target="_blank" className="text-[#00b06a] hover:underline">как отключить →</a></li>
                      <li>если Roblox просит верификацию — <a href="https://rutube.ru/shorts/48672fa13933fbf472aa243a6f1ff2cf/" target="_blank" className="text-[#00b06a] hover:underline">видео как пройти →</a></li>
                    </ul>
                  </div>

                  {/* Nickname display */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/8">
                    <span className="text-sm text-muted-foreground">Ник в Roblox: <strong className="text-foreground">{nickname}</strong></span>
                    <button onClick={() => setStep(2)} className="text-xs text-[#00b06a] hover:underline">Изменить</button>
                  </div>

                  {/* Mode toggle */}
                  <div className="flex gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/8">
                    <button onClick={() => { setGamepassMode("url"); setGamepassChecked(false); setGamepassValid(false); setError(null); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${gamepassMode === "url" ? "bg-[#00b06a]/10 text-[#00b06a] border border-[#00b06a]/20" : "text-muted-foreground"}`}>
                      <LinkIcon className="w-3.5 h-3.5" />По ссылке
                    </button>
                    <button onClick={() => { setGamepassMode("id"); setGamepassChecked(false); setGamepassValid(false); setError(null); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${gamepassMode === "id" ? "bg-[#00b06a]/10 text-[#00b06a] border border-[#00b06a]/20" : "text-muted-foreground"}`}>
                      <Hash className="w-3.5 h-3.5" />По GamePass ID
                    </button>
                  </div>

                  {/* Input */}
                  <div className="space-y-2">
                    <Input
                      value={gamepassInput} onChange={(e) => { setGamepassInput(e.target.value); setGamepassChecked(false); setGamepassValid(false); }}
                      placeholder={gamepassMode === "url" ? "https://www.roblox.com/game-pass/1234567/Name" : "1234567"}
                      className="h-11 bg-[#1a1a28] border-white/10 focus:border-[#00b06a]/50 rounded-xl font-mono text-sm"
                    />
                    {gamepassMode === "id" && (
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong className="text-foreground">Где взять GamePass ID:</strong></p>
                        <p>Откройте страницу GamePass в Roblox и скопируйте цифры после /game-pass/</p>
                        <p className="font-mono text-muted-foreground/70">Пример: .../game-pass/<span className="text-[#00b06a]">1234567</span>/... → GamePass ID: <span className="text-[#00b06a]">1234567</span></p>
                      </div>
                    )}
                  </div>

                  {/* Check button */}
                  <Button onClick={checkGamePass} disabled={!gamepassInput.trim() || loading} variant="outline" className="w-full h-10 rounded-xl border-white/10 hover:bg-white/5">
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    Проверить GamePass
                  </Button>

                  {/* GamePass check result */}
                  {gamepassChecked && gamepassValid && gamepassInfo && (
                    <div className="rounded-xl p-3 bg-[#00b06a]/5 border border-[#00b06a]/20 animate-fade-in">
                      <div className="flex items-center gap-2 text-sm text-[#00b06a]">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">GamePass найден: {gamepassInfo.name}</span>
                      </div>
                      {gamepassInfo.price !== null && (
                        <p className="text-xs text-muted-foreground mt-1">Цена: {gamepassInfo.price} R$ ✓</p>
                      )}
                    </div>
                  )}

                  {/* Regional Pricing warning */}
                  {gamepassValid && (
                    <div className="rounded-xl p-4 bg-yellow-500/5 border border-yellow-500/15 space-y-3 animate-fade-in">
                      <p className="text-sm font-medium text-yellow-400">⚠️ Проверьте перед продолжением</p>

                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-0.5">•</span>
                          <span>Regional Pricing должен быть <Badge variant="outline" className="text-[10px] bg-white/5 py-0">Disabled</Badge>. Если <strong className="text-yellow-400">Enabled</strong> — <a href="/instructions" target="_blank" className="text-[#00b06a] hover:underline">как отключить →</a></span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-0.5">•</span>
                          <span>Если GamePass не работает (404) — пройдите верификацию. <a href="/instructions" target="_blank" className="text-[#00b06a] hover:underline">как пройти →</a></span>
                        </div>
                      </div>

                      {/* Visual table example */}
                      <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Пример вкладки Creations → Monetization → Passes:</p>
                      <div className="rounded-lg overflow-hidden border border-white/10 text-[11px]">
                        <div className="grid grid-cols-4 bg-white/5 border-b border-white/10 font-medium text-muted-foreground">
                          <div className="px-2 py-1.5">Passes</div>
                          <div className="px-2 py-1.5 border-l border-white/10 text-[#00b06a]">Pass ID</div>
                          <div className="px-2 py-1.5 border-l border-white/10">Price</div>
                          <div className="px-2 py-1.5 border-l border-white/10">Regional Pricing</div>
                        </div>
                        <div className="grid grid-cols-4 items-center">
                          <div className="px-2 py-1.5 flex items-center gap-1">
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" fill="#E8A820" /><line x1="4" y1="6" x2="12" y2="6" stroke="#8B6914" strokeWidth="0.8"/><line x1="4" y1="8" x2="12" y2="8" stroke="#8B6914" strokeWidth="0.8"/><circle cx="7" cy="11" r="0.8" fill="#8B6914"/><circle cx="9" cy="11" r="0.8" fill="#8B6914"/></svg>
                            <span className="text-muted-foreground/70 italic">(ваш pass)</span>
                          </div>
                          <div className="px-2 py-1.5 border-l border-white/10">
                            <span className="font-mono text-[#00b06a] text-[10px] border border-[#00b06a]/30 rounded px-1 py-0.5">{extractGamePassId(gamepassInput)}</span>
                          </div>
                          <div className="px-2 py-1.5 border-l border-white/10 inline-flex items-center gap-0.5">
                            <RobuxIcon /><span>{requiredPrice}</span>
                          </div>
                          <div className="px-2 py-1.5 border-l border-white/10">
                            <span className="bg-white/10 rounded px-1.5 py-0.5">Disabled</span>
                            <span className="text-red-400 ml-0.5">←</span>
                          </div>
                        </div>
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer pt-1">
                        <input type="checkbox" checked={regionalPricingConfirmed} onChange={(e) => setRegionalPricingConfirmed(e.target.checked)}
                          className="mt-0.5 w-5 h-5 rounded accent-[#00b06a]" />
                        <span className="text-sm text-muted-foreground">
                          Подтверждаю: Regional Pricing выключен и верификация пройдена
                        </span>
                      </label>
                    </div>
                  )}

                  <Separator className="bg-white/5" />

                  <Button onClick={handleGamePassSubmit} disabled={!gamepassValid || !regionalPricingConfirmed} className="w-full h-12 btn-roblox rounded-xl font-semibold">
                    Перейти к шагу 3 — отправка данных <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <button onClick={() => setStep(2)} className="w-full text-center text-sm text-muted-foreground hover:text-foreground py-2">← Назад</button>
                </CardContent>
              </Card>
            )}

            {/* STEP 4: Telegram + Screenshot + Confirm */}
            {step === 4 && !success && (
              <Card className="glass-card border-white/8 shadow-2xl animate-scale-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Шаг 3 из 3: подтверждение</CardTitle>
                  <CardDescription>Telegram, скриншот покупки и активация</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pt-2">
                  {/* Nickname display */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/8">
                    <span className="text-sm text-muted-foreground">Ник: <strong className="text-foreground">{nickname}</strong></span>
                    <button onClick={() => setStep(2)} className="text-xs text-[#00b06a] hover:underline">Изменить</button>
                  </div>

                  {/* Telegram */}
                  <div className="space-y-2">
                    <Label className="text-sm">Telegram для обратной связи</Label>
                    <Input
                      value={telegram} onChange={(e) => setTelegram(e.target.value)}
                      placeholder="@username или номер телефона"
                      className="h-11 bg-[#1a1a28] border-white/10 focus:border-[#00b06a]/50 rounded-xl"
                    />
                  </div>

                  {/* Screenshot upload */}
                  <div className="space-y-3">
                    <Label className="text-sm">
                      Скриншот покупки <span className="text-[#00b06a]">(обязательное поле)</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Загрузите скриншот, где видно, что товар доставлен (дата и статус «доставлено»). Без скрина заказ не принимается в работу.
                    </p>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleScreenshotUpload(f); }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={screenshotUploading}
                      />
                      <div className={`flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-dashed transition-all ${
                        screenshotPath ? "border-[#00b06a]/30 bg-[#00b06a]/5" : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                      }`}>
                        {screenshotUploading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /><span className="text-sm">Загрузка...</span></>
                        ) : screenshotPath ? (
                          <><CheckCircle className="w-4 h-4 text-[#00b06a]" /><span className="text-sm text-[#00b06a]">{screenshotFile?.name}</span></>
                        ) : (
                          <><Upload className="w-4 h-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">Загрузить скриншот</span></>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Формат: JPG, PNG или WEBP, максимум 5 МБ</p>
                      <a href="/images/wb-example.jpg" target="_blank" className="text-xs text-[#00b06a] hover:underline">Пример скриншота →</a>
                    </div>
                  </div>

                  {/* Info box */}
                  <div className="rounded-xl p-3 bg-white/[0.02] border border-white/8 text-xs text-muted-foreground">
                    После активации проверка может занять до 5 минут. Статус заказа можно проверить по нику на <a href="/status" className="text-[#00b06a] hover:underline">странице проверки</a>.
                  </div>

                  <Separator className="bg-white/5" />

                  {/* Terms */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded accent-[#00b06a]" disabled={loading} />
                    <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      Отправляя данные, я даю{" "}
                      <a href="/terms" target="_blank" className="text-[#00b06a] hover:underline">Согласие на обработку персональных данных</a>{" "}
                      и принимаю положения{" "}
                      <a href="/privacy" target="_blank" className="text-[#00b06a] hover:underline">Политики обработки персональных данных</a>
                    </label>
                  </div>

                  <Button onClick={handleActivation}
                    disabled={loading || !telegram.trim() || !screenshotPath || !agreedToTerms}
                    className="w-full h-12 btn-roblox rounded-xl font-semibold text-base">
                    {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Активация...</> : <><Sparkles className="w-5 h-5 mr-2" />Активировать код</>}
                  </Button>
                  <button onClick={() => setStep(3)} className="w-full text-center text-sm text-muted-foreground hover:text-foreground py-2">← Назад</button>
                </CardContent>
              </Card>
            )}

            {/* SUCCESS */}
            {success && activationResult && (
              <Card className="glass-card border-[#00b06a]/20 shadow-2xl shadow-[#00b06a]/5 animate-scale-in">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#00b06a]/10 border border-[#00b06a]/30 flex items-center justify-center animate-glow-pulse">
                    <CheckCircle className="w-10 h-10 text-[#00b06a]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#00b06a] mb-2">Успешно!</h2>
                    <p className="text-muted-foreground">{success}</p>
                  </div>
                  <div className="rounded-xl p-4 bg-white/[0.03] border border-white/8 text-sm text-left space-y-2">
                    <div className="flex justify-between"><span className="text-muted-foreground">Код:</span><span className="font-mono font-bold">{code}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Номинал:</span><span className="text-[#00b06a] font-bold inline-flex items-center gap-1"><RobuxIcon />{nominal}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Ник:</span><span>{nickname}</span></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Проверяйте статус на <a href="/status" className="text-[#00b06a] hover:underline">странице статуса</a></p>
                  <Button onClick={resetForm} className="w-full h-11 btn-roblox rounded-xl">Активировать ещё</Button>
                </CardContent>
              </Card>
            )}

            {/* Error */}
            {error && (
              <Alert variant="destructive" className="mt-4 border-red-500/20 bg-red-500/5 rounded-xl animate-fade-in">
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </section>

        {/* Community */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-6">Наше сообщество</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://t.me/rbxpass_loothub" target="_blank" rel="noopener noreferrer" className="glass-card-hover rounded-2xl px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2AABEE]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#2AABEE]" />
                </div>
                <div className="text-left"><p className="text-sm font-medium">Telegram</p><p className="text-xs text-muted-foreground">@rbxpass_loothub</p></div>
              </a>
              <a href="https://vk.com/rbxpass_loothub" target="_blank" rel="noopener noreferrer" className="glass-card-hover rounded-2xl px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#4C75A3]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#4C75A3]" />
                </div>
                <div className="text-left"><p className="text-sm font-medium">VKontakte</p><p className="text-xs text-muted-foreground">rbxpass_loothub</p></div>
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: string }) {
  return (
    <div className={`glass-card-hover rounded-2xl p-5 text-center animate-fade-in-up ${delay}`} style={{ opacity: 0 }}>
      <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-[#00b06a]/10 border border-[#00b06a]/15 flex items-center justify-center text-[#00b06a]">{icon}</div>
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function RobuxIcon() {
  return (
    <svg className="w-4 h-4 inline-block" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L14.5 4.5V11.5L8 15L1.5 11.5V4.5L8 1Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <rect x="6.5" y="6.5" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
