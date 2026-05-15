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
  Search,
  Gamepad2,
  ArrowRight,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      if (data.ok) {
        setGames(data.games);
      }
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
      if (data.ok && data.orders) {
        setRecentOrders(data.orders);
      }
    } catch {
      // silently fail for recent orders
    }
  };

  const handleGameSearch = (value: string) => {
    setGameSearch(value);
    loadGames(value);
  };

  const validateCode = (code: string) => {
    const NEW_CODE_REGEX = /^[A-Z0-9]{2,6}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{1}$/i;
    return NEW_CODE_REGEX.test(code);
  };

  const handleCodeSubmit = async () => {
    if (!code.trim()) {
      setError("Введите код активации");
      return;
    }

    if (!validateCode(code)) {
      setError("Неверный формат кода. Используйте формат: PREFIX-XXXX-XXXX-Y");
      return;
    }

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

      if (!data.ok) {
        setError(data.error || "Ошибка проверки кода");
        return;
      }

      setActivationResult(data);
      setStep(2);
    } catch {
      setLoading(false);
      setError("Ошибка соединения с сервером");
    }
  };

  const handleActivation = async () => {
    if (!agreedToTerms) {
      setError("Необходимо принять пользовательское соглашение");
      return;
    }

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

      if (!data.ok) {
        setError(data.error || "Ошибка активации");
        return;
      }

      setActivationResult(data);
      setSuccess(data.message || "Код успешно активирован!");
    } catch {
      setLoading(false);
      setError("Ошибка соединения с сервером");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const resetForm = () => {
    setCode("");
    setSelectedGame(null);
    setGameSearch("");
    setNickname("");
    setTelegram("");
    setGamepassUrl("");
    setStep(1);
    setError(null);
    setSuccess(null);
    setActivationResult(null);
    setAgreedToTerms(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <Navigation currentPage="activation" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-12 pb-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">500+ успешных активаций</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text leading-tight">
              Активация кода
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Активируйте ваш код для получения купленного товара
            </p>
            <p className="text-sm text-muted-foreground/70">
              Roblox • Fortnite • PUBG • и другие игры
            </p>
          </div>
        </section>

        {/* Features row */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
            <div className="glass-card rounded-xl p-4 text-center">
              <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Мгновенная проверка</p>
              <p className="text-xs text-muted-foreground mt-1">1-2 секунды</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <Shield className="w-5 h-5 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium">Безопасно</p>
              <p className="text-xs text-muted-foreground mt-1">Защищённые транзакции</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <Users className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-medium">Поддержка 24/7</p>
              <p className="text-xs text-muted-foreground mt-1">Telegram & VK</p>
            </div>
          </div>
        </section>

        {/* Main Form */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
              <StepIndicator number={1} label="Проверка кода" active={step === 1} completed={step > 1} />
              <div className={`w-12 h-0.5 rounded ${step > 1 ? "bg-primary" : "bg-border"} transition-colors`} />
              <StepIndicator number={2} label="Активация" active={step === 2} completed={!!success} />
            </div>

            {/* Step 1: Code Input */}
            {step === 1 && (
              <Card className="glass-card border-white/10 shadow-2xl animate-scale-in">
                <CardContent className="space-y-6 pt-6">
                  {/* Game Selection */}
                  <div className="space-y-3">
                    <Label htmlFor="game" className="text-sm font-semibold flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-primary" />
                      Выберите игру или сервис
                    </Label>
                    <div className="space-y-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Поиск игры..."
                          value={gameSearch}
                          onChange={(e) => handleGameSearch(e.target.value)}
                          className="pl-10 bg-input/50 border-white/10 focus:border-primary/50"
                          disabled={loading || loadingGames}
                        />
                      </div>
                      <Select
                        value={selectedGame?.id.toString()}
                        onValueChange={(value) => {
                          const game = games.find((g) => g.id.toString() === value);
                          setSelectedGame(game || null);
                        }}
                        disabled={loading || loadingGames}
                      >
                        <SelectTrigger className="w-full h-12 bg-input/50 border-white/10">
                          <SelectValue placeholder="Выберите игру из списка">
                            {selectedGame ? (
                              <div className="flex items-center gap-2">
                                <span>{selectedGame.name}</span>
                                {selectedGame.description && (
                                  <span className="text-xs text-muted-foreground">
                                    ({selectedGame.description})
                                  </span>
                                )}
                              </div>
                            ) : (
                              "Выберите игру"
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-white/10">
                          {loadingGames ? (
                            <SelectItem value="loading" disabled>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                              Загрузка...
                            </SelectItem>
                          ) : games.length === 0 ? (
                            <SelectItem value="no-games" disabled>
                              Игры не найдены
                            </SelectItem>
                          ) : (
                            games.map((game) => (
                              <SelectItem key={game.id} value={game.id.toString()}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{game.name}</span>
                                  {game.description && (
                                    <span className="text-xs text-muted-foreground">
                                      {game.description}
                                    </span>
                                  )}
                                </div>
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {selectedGame && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          Выбрано: <strong className="text-foreground">{selectedGame.name}</strong>
                          {selectedGame.requires_gamepass && (
                            <span className="text-orange-400"> (требуется GamePass)</span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Code Input */}
                  <div className="space-y-3">
                    <Label htmlFor="code" className="text-sm font-semibold">
                      Код активации
                    </Label>
                    <Input
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="RBX-ABCD-EFGH-5"
                      className="font-mono text-lg text-center h-14 bg-input/50 border-white/10 focus:border-primary/50 tracking-wider"
                      disabled={loading}
                    />
                    <div className="text-center space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Формат: <span className="font-mono text-foreground/80">PREFIX-XXXX-XXXX-Y</span>
                      </p>
                      <div className="flex justify-center gap-4 text-xs text-muted-foreground/60">
                        <span className="font-mono">RBX-1A2B-3C4D-5</span>
                        <span className="font-mono">ANTI-C0DE-F1G2-8</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCodeSubmit}
                    disabled={!code.trim() || loading}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Проверка...
                      </>
                    ) : (
                      <>
                        Проверить код
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Confirmation */}
            {step === 2 && activationResult && !success && (
              <Card className="glass-card border-white/10 shadow-2xl animate-scale-in">
                <CardHeader className="border-b border-white/10 pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Подтверждение активации
                  </CardTitle>
                  <CardDescription>
                    Код проверен и готов к активации
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Code Info */}
                  <div className="rounded-xl p-5 space-y-3 bg-gradient-to-br from-primary/10 to-blue-600/10 border border-primary/20">
                    {activationResult.game && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Игра:</span>
                        <Badge variant="secondary" className="text-sm">
                          {activationResult.game.name}
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Код:</span>
                      <Badge variant="secondary" className="font-mono">
                        {code}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Номинал:</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-base px-3">
                        {activationResult.nominal}{" "}
                        {activationResult.game?.name === "Roblox" ? "Robux" : "единиц"}
                      </Badge>
                    </div>
                  </div>

                  {/* Activation Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nickname" className="text-sm">
                        {activationResult.game?.name === "Roblox"
                          ? "Ваш ник в Roblox"
                          : activationResult.game?.name
                          ? `Ваш ник в ${activationResult.game.name}`
                          : "Ваш игровой никнейм"}
                      </Label>
                      <Input
                        id="nickname"
                        placeholder={
                          activationResult.game?.name === "Roblox"
                            ? "Например, SuperPlayer123"
                            : "Введите ваш никнейм"
                        }
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        disabled={loading}
                        className="bg-input/50 border-white/10 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telegram" className="text-sm">Ваш Telegram</Label>
                      <Input
                        id="telegram"
                        placeholder="@username или номер телефона"
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        disabled={loading}
                        className="bg-input/50 border-white/10 focus:border-primary/50"
                      />
                      <p className="text-xs text-muted-foreground">
                        Для связи по вопросам активации
                      </p>
                    </div>
                    {activationResult.game?.requires_gamepass && (
                      <div className="space-y-2">
                        <Label htmlFor="gamepass" className="text-sm">Ссылка на ваш GamePass</Label>
                        <Input
                          id="gamepass"
                          placeholder="https://www.roblox.com/game-pass/..."
                          value={gamepassUrl}
                          onChange={(e) => setGamepassUrl(e.target.value)}
                          disabled={loading}
                          className="bg-input/50 border-white/10 focus:border-primary/50"
                        />
                        <p className="text-xs text-muted-foreground">
                          Необходимо для активации {activationResult.game.name}
                        </p>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Terms Agreement */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-input/50 text-primary focus:ring-primary/50 accent-purple-600"
                      disabled={loading}
                    />
                    <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      Я принимаю{" "}
                      <a href="/terms" target="_blank" className="text-primary hover:underline">
                        пользовательское соглашение
                      </a>{" "}
                      и{" "}
                      <a href="/privacy" target="_blank" className="text-primary hover:underline">
                        политику конфиденциальности
                      </a>
                      . Я подтверждаю, что мне исполнилось 14 лет.
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleActivation}
                      disabled={
                        loading ||
                        !nickname.trim() ||
                        !telegram.trim() ||
                        !agreedToTerms ||
                        (activationResult.game?.requires_gamepass && !gamepassUrl.trim())
                      }
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-green-600/20 hover:shadow-green-600/40"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Активация...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Активировать код
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={() => setStep(1)}
                      variant="ghost"
                      className="w-full h-10 text-muted-foreground hover:text-foreground"
                      disabled={loading}
                    >
                      ← Назад к вводу кода
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Success Message */}
            {success && activationResult && (
              <Card className="glass-card border-green-500/20 shadow-2xl animate-scale-in">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center animate-glow-pulse">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-green-400 mb-2">
                      Активация успешна!
                    </h2>
                    <p className="text-muted-foreground">{success}</p>
                  </div>

                  <div className="rounded-xl p-5 bg-white/5 border border-white/10 space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1 text-left">
                        <span className="text-xs text-muted-foreground uppercase">Код</span>
                        <p className="font-mono font-bold">{code}</p>
                      </div>
                      <div className="space-y-1 text-left">
                        <span className="text-xs text-muted-foreground uppercase">Номинал</span>
                        <p className="font-bold text-green-400">
                          {activationResult.nominal}{" "}
                          {activationResult.game?.name === "Roblox" ? "Robux" : "единиц"}
                        </p>
                      </div>
                      <div className="space-y-1 text-left">
                        <span className="text-xs text-muted-foreground uppercase">Статус</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Активирован
                        </Badge>
                      </div>
                      <div className="space-y-1 text-left">
                        <span className="text-xs text-muted-foreground uppercase">Время</span>
                        <p className="text-xs font-mono text-muted-foreground">
                          {new Date().toLocaleString("ru-RU")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={resetForm}
                      className="flex-1 h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                    >
                      Активировать другой код
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(code)}
                      variant="outline"
                      className="h-11 border-white/10 hover:bg-white/5"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="mt-6 animate-fade-in border-red-500/30 bg-red-500/10">
                <AlertDescription className="flex items-center justify-between">
                  <span className="font-medium">{error}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setError(null)}
                    className="ml-2 text-red-300 hover:text-red-200 hover:bg-red-500/20"
                  >
                    Закрыть
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </section>

        {/* Recent Orders Ticker */}
        {recentOrders.length > 0 && (
          <section className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 text-center">
                Последние активации
              </h3>
              <div className="overflow-hidden rounded-xl glass-card border-white/10 p-4">
                <div className="flex gap-4 animate-ticker">
                  {[...recentOrders, ...recentOrders].map((order, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Gamepad2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">{order.nickname}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.game} • {order.nominal} {order.game === "Roblox" ? "R$" : "ед."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Social Links */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-2xl mx-auto">
            <Card className="glass-card border-white/10 overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold">Наше сообщество</h3>
                  <p className="text-sm text-muted-foreground">
                    Следите за новостями, обновлениями и розыгрышами
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="https://t.me/rbxpass_loothub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#2AABEE]/10 border border-[#2AABEE]/30 text-[#2AABEE] hover:bg-[#2AABEE]/20 transition-all text-sm font-medium"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                      Telegram
                    </a>
                    <a
                      href="https://vk.com/rbxpass_loothub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#4C75A3]/10 border border-[#4C75A3]/30 text-[#4C75A3] hover:bg-[#4C75A3]/20 transition-all text-sm font-medium"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.042-2.763-5.32-2.763-5.778 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.17-3.608 2.17-3.608.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                      </svg>
                      VKontakte
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

function StepIndicator({
  number,
  label,
  active,
  completed,
}: {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
          completed
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : active
            ? "bg-primary/20 text-primary border border-primary/30 animate-glow-pulse"
            : "bg-white/5 text-muted-foreground border border-white/10"
        }`}
      >
        {completed ? <CheckCircle className="w-4 h-4" /> : number}
      </div>
      <span
        className={`text-xs font-medium hidden sm:inline ${
          active ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
