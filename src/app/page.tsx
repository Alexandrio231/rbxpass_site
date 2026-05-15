"use client";
import { useState, useEffect } from "react";
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
  Copy,
  Sparkles,
  Gamepad2,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Clock,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { RobloxFloatingElements, ProcessFlow } from "@/components/roblox-elements";

interface Game {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  requires_gamepass: boolean;
}

interface RecentOrder {
  nickname: string;
  game: string;
  nominal: number;
}

export default function CodeActivationPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [code, setCode] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [gameSearch, setGameSearch] = useState("");
  const [loadingGames, setLoadingGames] = useState(false);
  const [nickname, setNickname] = useState("");
  const [telegram, setTelegram] = useState("");
  const [gamepassUrl, setGamepassUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activationResult, setActivationResult] = useState<any>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);

  useEffect(() => {
    loadGames();
    loadRecentOrders();
  }, []);

  const loadGames = async (search = "") => {
    setLoadingGames(true);
    try {
      const response = await fetch(`/api/games?search=${encodeURIComponent(search)}`);
      const data = await response.json();
      if (data.ok) setGames(data.games);
    } catch (err) {
      console.error("Error loading games:", err);
    } finally {
      setLoadingGames(false);
    }
  };

  const loadRecentOrders = async () => {
    try {
      const response = await fetch("/api/status?recent=true");
      const data = await response.json();
      if (data.ok && data.orders) setRecentOrders(data.orders);
    } catch { /* silent */ }
  };

  const handleGameSearch = (value: string) => {
    setGameSearch(value);
    loadGames(value);
  };

  // Keep these for future multi-game support
  void selectedGame;
  void games;
  void gameSearch;
  void loadingGames;
  void handleGameSearch;

  const validateCode = (code: string) => {
    const NEW_CODE_REGEX = /^[A-Z0-9]{2,6}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{1}$/i;
    return NEW_CODE_REGEX.test(code);
  };

  const handleCodeSubmit = async () => {
    if (!code.trim()) { setError("Введите код активации"); return; }
    if (!validateCode(code)) { setError("Неверный формат кода. Формат: PREFIX-XXXX-XXXX-Y"); return; }
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/validate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.toUpperCase() }),
      });
      const data = await response.json();
      setLoading(false);
      if (!data.ok) { setError(data.error || "Ошибка проверки кода"); return; }
      setActivationResult(data);
      setStep(2);
    } catch {
      setLoading(false);
      setError("Ошибка соединения с сервером");
    }
  };

  const handleActivation = async () => {
    if (!agreedToTerms) { setError("Необходимо принять пользовательское соглашение"); return; }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/activate-gamepass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.toUpperCase(),
          gamepassUrl: gamepassUrl.trim(),
          nickname: nickname.trim(),
          telegram: telegram.trim(),
        }),
      });
      const data = await response.json();
      setLoading(false);
      if (!data.ok) { setError(data.error || "Ошибка активации"); return; }
      setActivationResult(data);
      setSuccess(data.message || "Код успешно активирован!");
    } catch {
      setLoading(false);
      setError("Ошибка соединения с сервером");
    }
  };

  const copyToClipboard = (text: string) => { navigator.clipboard.writeText(text); };

  const resetForm = () => {
    setCode(""); setSelectedGame(null); setGameSearch("");
    setNickname(""); setTelegram(""); setGamepassUrl("");
    setStep(1); setError(null); setSuccess(null);
    setActivationResult(null); setAgreedToTerms(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise grid-pattern">
      {/* Roblox floating elements */}
      <RobloxFloatingElements />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#00b06a]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00b06a]/3 rounded-full blur-[150px]" />
      </div>

      <Navigation currentPage="activation" />

      <div className="relative z-10">
        {/* Hero Section - AuthKit style */}
        <section className="container mx-auto px-4 pt-16 md:pt-24 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00b06a]/10 border border-[#00b06a]/20 mb-8">
                <div className="w-2 h-2 bg-[#00b06a] rounded-full animate-pulse" />
                <span className="text-xs font-medium text-[#00b06a]">Сервис активен • 500+ активаций</span>
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up delay-100 leading-[1.1] tracking-tight" style={{ opacity: 0 }}>
              <span className="text-foreground">Активируй свой</span>
              <br />
              <span className="gradient-text-hero animate-text-glow">код на Robux</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200 leading-relaxed" style={{ opacity: 0 }}>
              Введи код, создай GamePass, получи Robux на свой аккаунт.
              <br className="hidden md:block" />
              Быстро, безопасно, с гарантией.
            </p>

            {/* CTA Scroll */}
            <div className="animate-fade-in-up delay-300" style={{ opacity: 0 }}>
              <button
                onClick={() => document.getElementById("activation-form")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-roblox px-8 py-4 text-base inline-flex items-center gap-2"
              >
                Активировать код
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Features - AuthKit style cards */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard
              icon={<Zap className="w-5 h-5" />}
              title="Мгновенно"
              description="Проверка кода за 1-2 секунды"
              delay="delay-200"
            />
            <FeatureCard
              icon={<Shield className="w-5 h-5" />}
              title="Безопасно"
              description="Защищённые транзакции"
              delay="delay-300"
            />
            <FeatureCard
              icon={<Clock className="w-5 h-5" />}
              title="5-7 дней"
              description="Зачисление Robux"
              delay="delay-400"
            />
          </div>
        </section>

        {/* Process Flow Diagram - Simple 3 steps */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-xs font-medium text-[#00b06a] uppercase tracking-wider mb-3 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
              Всего 3 шага
            </p>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 animate-fade-in-up delay-400" style={{ opacity: 0 }}>
              Как получить Robux?
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto animate-fade-in-up delay-500" style={{ opacity: 0 }}>
              Всё просто — введи код, создай GamePass и жди зачисления
            </p>
          </div>
          <ProcessFlow />
        </section>

        {/* Activation Form */}
        <section id="activation-form" className="container mx-auto px-4 pb-16">
          <div className="max-w-lg mx-auto">
            {/* Step indicators */}
            <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
              <StepDot number={1} active={step === 1} completed={step > 1} />
              <div className={`w-16 h-[2px] rounded-full transition-all duration-500 ${step > 1 ? "bg-[#00b06a]" : "bg-border"}`} />
              <StepDot number={2} active={step === 2} completed={!!success} />
            </div>

            {/* Step 1 */}
            {step === 1 && !success && (
              <Card className="glass-card border-white/8 shadow-2xl shadow-black/20 animate-scale-in">
                <CardHeader className="text-center pb-2">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#00b06a]/10 border border-[#00b06a]/20 flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-[#00b06a]" />
                  </div>
                  <CardTitle className="text-xl">Введите код активации</CardTitle>
                  <CardDescription>Код из вашей покупки для получения Robux</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pt-2">
                  <div className="space-y-3">
                    <Input
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="RBX-ABCD-EFGH-5"
                      className="font-mono text-center text-lg h-14 bg-[#1a1a28] border-white/10 focus:border-[#00b06a]/50 focus:ring-[#00b06a]/20 tracking-[0.2em] rounded-xl"
                      disabled={loading}
                    />
                    <p className="text-center text-xs text-muted-foreground">
                      Формат: <span className="font-mono text-foreground/70">PREFIX-XXXX-XXXX-Y</span>
                    </p>
                  </div>

                  <Button
                    onClick={handleCodeSubmit}
                    disabled={!code.trim() || loading}
                    className="w-full h-12 text-base font-semibold btn-roblox rounded-xl"
                    size="lg"
                  >
                    {loading ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Проверка...</>
                    ) : (
                      <>Проверить код<ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2 */}
            {step === 2 && activationResult && !success && (
              <Card className="glass-card border-white/8 shadow-2xl shadow-black/20 animate-scale-in">
                <CardHeader className="text-center pb-2">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#00b06a]/10 border border-[#00b06a]/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[#00b06a]" />
                  </div>
                  <CardTitle className="text-xl">Подтверждение</CardTitle>
                  <CardDescription>Код проверен — заполните данные для активации</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pt-2">
                  {/* Code info badge */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#00b06a]/5 border border-[#00b06a]/15">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00b06a]/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-[#00b06a]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{code}</p>
                        <p className="text-xs text-muted-foreground">Roblox</p>
                      </div>
                    </div>
                    <Badge className="bg-[#00b06a]/20 text-[#00b06a] border-[#00b06a]/30 text-base px-3 py-1">
                      {activationResult.nominal} R$
                    </Badge>
                  </div>

                  {/* Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nickname" className="text-sm">Ник в Roblox</Label>
                      <Input
                        id="nickname"
                        placeholder="Ваш никнейм"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        disabled={loading}
                        className="h-11 bg-[#1a1a28] border-white/10 focus:border-[#00b06a]/50 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telegram" className="text-sm">Telegram</Label>
                      <Input
                        id="telegram"
                        placeholder="@username"
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        disabled={loading}
                        className="h-11 bg-[#1a1a28] border-white/10 focus:border-[#00b06a]/50 rounded-xl"
                      />
                    </div>
                    {activationResult.game?.requires_gamepass && (
                      <div className="space-y-2">
                        <Label htmlFor="gamepass" className="text-sm">Ссылка на GamePass</Label>
                        <Input
                          id="gamepass"
                          placeholder="https://www.roblox.com/game-pass/..."
                          value={gamepassUrl}
                          onChange={(e) => setGamepassUrl(e.target.value)}
                          disabled={loading}
                          className="h-11 bg-[#1a1a28] border-white/10 focus:border-[#00b06a]/50 rounded-xl"
                        />
                      </div>
                    )}
                  </div>

                  <Separator className="bg-white/5" />

                  {/* Terms */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded accent-[#00b06a] bg-[#1a1a28] border-white/20"
                      disabled={loading}
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      Отправляя данные, я даю{" "}
                      <a href="/terms" target="_blank" className="text-[#00b06a] hover:underline">
                        Согласие на обработку персональных данных
                      </a>{" "}
                      и принимаю положения{" "}
                      <a href="/privacy" target="_blank" className="text-[#00b06a] hover:underline">
                        Политики обработки персональных данных
                      </a>
                    </label>
                  </div>

                  {/* Buttons */}
                  <Button
                    onClick={handleActivation}
                    disabled={loading || !nickname.trim() || !telegram.trim() || !agreedToTerms || (activationResult.game?.requires_gamepass && !gamepassUrl.trim())}
                    className="w-full h-12 text-base font-semibold btn-roblox rounded-xl"
                    size="lg"
                  >
                    {loading ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Активация...</>
                    ) : (
                      <><Sparkles className="w-5 h-5 mr-2" />Активировать</>
                    )}
                  </Button>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                    disabled={loading}
                  >
                    ← Назад
                  </button>
                </CardContent>
              </Card>
            )}

            {/* Success */}
            {success && activationResult && (
              <Card className="glass-card border-[#00b06a]/20 shadow-2xl shadow-[#00b06a]/5 animate-scale-in">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-[#00b06a]/20 animate-pulse" />
                    <div className="relative w-full h-full rounded-full bg-[#00b06a]/10 border border-[#00b06a]/30 flex items-center justify-center animate-glow-pulse">
                      <CheckCircle className="w-10 h-10 text-[#00b06a]" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#00b06a] mb-2">Успешно!</h2>
                    <p className="text-muted-foreground">{success}</p>
                  </div>

                  <div className="rounded-xl p-5 bg-white/[0.03] border border-white/8 space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-left">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Код</span>
                        <p className="font-mono font-bold mt-1">{code}</p>
                      </div>
                      <div className="text-left">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Номинал</span>
                        <p className="font-bold text-[#00b06a] mt-1">{activationResult.nominal} Robux</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={resetForm} className="flex-1 h-11 btn-roblox rounded-xl">
                      Активировать ещё
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(code)}
                      variant="outline"
                      className="h-11 px-4 border-white/10 hover:bg-white/5 rounded-xl"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error */}
            {error && (
              <Alert variant="destructive" className="mt-6 animate-fade-in border-red-500/20 bg-red-500/5 rounded-xl">
                <AlertDescription className="flex items-center justify-between">
                  <span className="text-sm">{error}</span>
                  <button onClick={() => setError(null)} className="text-xs text-red-300 hover:text-red-200 ml-3">
                    ✕
                  </button>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </section>

        {/* Recent Orders */}
        {recentOrders.length > 0 && (
          <section className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">Последние активации</p>
              </div>
              <div className="overflow-hidden rounded-2xl glass-card border-white/5 p-5">
                <div className="flex gap-4 animate-ticker">
                  {[...recentOrders, ...recentOrders].map((order, i) => (
                    <div key={i} className="flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-[#00b06a]/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#00b06a]" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">{order.nickname}</p>
                        <p className="text-xs text-muted-foreground">{order.nominal} R$</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Community Section */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up" style={{ opacity: 0 }}>
              Наше сообщество
            </h2>
            <p className="text-muted-foreground mb-8 animate-fade-in-up delay-100" style={{ opacity: 0 }}>
              Розыгрыши, новости и поддержка
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200" style={{ opacity: 0 }}>
              <a
                href="https://t.me/rbxpass_loothub"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-hover rounded-2xl px-6 py-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2AABEE]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#2AABEE]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Telegram</p>
                  <p className="text-xs text-muted-foreground">@rbxpass_loothub</p>
                </div>
              </a>
              <a
                href="https://vk.com/rbxpass_loothub"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-hover rounded-2xl px-6 py-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#4C75A3]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#4C75A3]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.042-2.763-5.32-2.763-5.778 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.17-3.608 2.17-3.608.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">VKontakte</p>
                  <p className="text-xs text-muted-foreground">rbxpass_loothub</p>
                </div>
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
    <div className={`glass-card-hover rounded-2xl p-6 text-center animate-fade-in-up ${delay}`} style={{ opacity: 0 }}>
      <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-[#00b06a]/10 border border-[#00b06a]/15 flex items-center justify-center text-[#00b06a]">
        {icon}
      </div>
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function StepDot({ number, active, completed }: { number: number; active: boolean; completed: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
        completed
          ? "bg-[#00b06a]/20 text-[#00b06a] border border-[#00b06a]/40"
          : active
          ? "bg-[#00b06a]/10 text-[#00b06a] border border-[#00b06a]/30 animate-glow-pulse"
          : "bg-white/5 text-muted-foreground border border-white/10"
      }`}>
        {completed ? <CheckCircle className="w-4 h-4" /> : number}
      </div>
    </div>
  );
}
