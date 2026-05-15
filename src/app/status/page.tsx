"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { RobloxFloatingElements } from "@/components/roblox-elements";

const statusConfig = {
  queued: {
    label: "В очереди",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    icon: Clock,
    description: "Ваш заказ добавлен в очередь на обработку",
  },
  processing: {
    label: "В обработке",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    icon: Loader2,
    description: "Заказ обрабатывается, пожалуйста, подождите",
  },
  done: {
    label: "Выполнен",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    icon: CheckCircle,
    description: "Заказ успешно выполнен! Robux должны быть на вашем аккаунте",
  },
  error: {
    label: "Ошибка",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    icon: XCircle,
    description: "Произошла ошибка при обработке заказа",
  },
};

export default function StatusPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function check() {
    setLoading(true);
    setError(null);
    setStatus(null);
    const res = await fetch(`/api/status?code=${encodeURIComponent(code)}`);
    const data = await res.json();
    setLoading(false);
    if (!data.ok) return setError(data.error ?? "Заказ не найден");
    setStatus(data.order.status);
  }

  const statusInfo = status ? statusConfig[status as keyof typeof statusConfig] : null;
  const StatusIcon = statusInfo?.icon || AlertCircle;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise grid-pattern">
      {/* Background effects */}
      <RobloxFloatingElements />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#00b06a]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[#00b06a]/3 rounded-full blur-[100px]" />
      </div>

      <Navigation currentPage="status" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
              Статус заказа
            </h1>
            <p className="text-muted-foreground">
              Проверьте текущий статус вашего заказа
            </p>
          </div>

          {/* Main Card */}
          <Card className="glass-card border-white/10 shadow-2xl animate-fade-in-up delay-100" style={{ opacity: 0 }}>
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-xl">Проверка статуса</CardTitle>
              <CardDescription>
                Введите код заказа из подтверждения активации
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="status-code" className="text-sm">Код заказа</Label>
                <div className="flex gap-2">
                  <Input
                    id="status-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="ABC123"
                    className="font-mono bg-input/50 border-white/10 focus:border-primary/50"
                  />
                  <Button
                    onClick={check}
                    disabled={loading || !code.trim()}
                    className="px-6 bg-gradient-to-r from-[#00b06a] to-[#00d47e] hover:from-[#00c876] hover:to-[#00e88a] shadow-lg shadow-[#00b06a]/20"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Проверить
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Status Display */}
              {status && statusInfo && (
                <div className="animate-scale-in rounded-xl p-5 bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <StatusIcon className="h-5 w-5 text-primary" />
                    <span className="font-medium">Текущий статус:</span>
                    <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{statusInfo.description}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <Alert variant="destructive" className="border-red-500/30 bg-red-500/10 animate-fade-in">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Help Text */}
              <div className="rounded-xl p-4 bg-primary/5 border border-primary/20">
                <h3 className="font-medium text-sm mb-1">Где найти код заказа?</h3>
                <p className="text-xs text-muted-foreground">
                  Короткий код заказа (например, ABC123) вы получили после успешной активации.
                  Он отображается в сообщении подтверждения.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Status Legend */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
            {Object.entries(statusConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="glass-card rounded-xl p-4 border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{config.label}</h3>
                      <p className="text-xs text-muted-foreground">{config.description.split(".")[0]}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
