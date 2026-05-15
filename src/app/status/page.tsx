"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, CheckCircle, Clock, XCircle, AlertCircle, User } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { RobloxFloatingElements } from "@/components/roblox-elements";

const statusConfig = {
  queued: { label: "В очереди", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock, description: "Заказ ожидает обработки" },
  processing: { label: "В обработке", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Loader2, description: "Заказ обрабатывается" },
  done: { label: "Выполнен", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle, description: "Robux зачислены!" },
  error: { label: "Ошибка", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: XCircle, description: "Обратитесь в поддержку" },
};

interface OrderResult {
  short_code: string;
  status: string;
  nickname?: string;
  created_at: string;
}

export default function StatusPage() {
  const [searchType, setSearchType] = useState<"code" | "nickname">("nickname");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderResult[]>([]);
  const [singleOrder, setSingleOrder] = useState<OrderResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function check() {
    setLoading(true);
    setError(null);
    setOrders([]);
    setSingleOrder(null);

    const param = searchType === "nickname" ? `nickname=${encodeURIComponent(query)}` : `code=${encodeURIComponent(query.toUpperCase())}`;
    const res = await fetch(`/api/status?${param}`);
    const data = await res.json();
    setLoading(false);

    if (!data.ok) {
      setError(data.error ?? "Не найдено");
      return;
    }

    if (data.orders) {
      setOrders(data.orders);
    } else if (data.order) {
      setSingleOrder(data.order);
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise grid-pattern">
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
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Статус заказа</h1>
            <p className="text-muted-foreground">Проверьте статус по нику Roblox или коду заказа</p>
          </div>

          {/* Main Card */}
          <Card className="glass-card border-white/8 shadow-2xl animate-scale-in">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="text-xl">Поиск заказа</CardTitle>
              <CardDescription>Найдите ваш заказ по нику в Roblox или короткому коду</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              {/* Search type toggle */}
              <div className="flex gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/8">
                <button
                  onClick={() => { setSearchType("nickname"); setQuery(""); setError(null); setOrders([]); setSingleOrder(null); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    searchType === "nickname" ? "bg-[#00b06a]/10 text-[#00b06a] border border-[#00b06a]/20" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <User className="w-4 h-4" />
                  По нику Roblox
                </button>
                <button
                  onClick={() => { setSearchType("code"); setQuery(""); setError(null); setOrders([]); setSingleOrder(null); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    searchType === "code" ? "bg-[#00b06a]/10 text-[#00b06a] border border-[#00b06a]/20" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Search className="w-4 h-4" />
                  По коду заказа
                </button>
              </div>

              {/* Search input */}
              <div className="space-y-2">
                <Label htmlFor="search-query" className="text-sm">
                  {searchType === "nickname" ? "Ник в Roblox" : "Код заказа"}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="search-query"
                    value={query}
                    onChange={(e) => setQuery(searchType === "code" ? e.target.value.toUpperCase() : e.target.value)}
                    placeholder={searchType === "nickname" ? "Ваш ник в Roblox" : "ABC123"}
                    className="font-mono bg-[#1a1a28] border-white/10 focus:border-[#00b06a]/50 rounded-xl"
                    onKeyDown={(e) => e.key === "Enter" && query.trim() && check()}
                  />
                  <Button
                    onClick={check}
                    disabled={loading || !query.trim()}
                    className="px-6 btn-roblox rounded-xl"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Single order result */}
              {singleOrder && (
                <OrderCard order={singleOrder} />
              )}

              {/* Multiple orders result */}
              {orders.length > 0 && (
                <div className="space-y-3 animate-fade-in">
                  <p className="text-sm text-muted-foreground">Найдено заказов: {orders.length}</p>
                  {orders.map((order) => (
                    <OrderCard key={order.short_code} order={order} />
                  ))}
                </div>
              )}

              {/* Error */}
              {error && (
                <Alert variant="destructive" className="border-red-500/20 bg-red-500/5 rounded-xl animate-fade-in">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function OrderCard({ order }: { order: OrderResult }) {
  const statusInfo = statusConfig[order.status as keyof typeof statusConfig];
  const StatusIcon = statusInfo?.icon || AlertCircle;

  return (
    <div className="rounded-xl p-4 bg-white/[0.03] border border-white/8 animate-scale-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <StatusIcon className="w-4 h-4 text-[#00b06a]" />
          <span className="text-sm font-medium">Заказ: {order.short_code}</span>
        </div>
        {statusInfo && <Badge className={statusInfo.color}>{statusInfo.label}</Badge>}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{statusInfo?.description}</span>
        <span>{new Date(order.created_at).toLocaleDateString("ru-RU")}</span>
      </div>
      {order.nickname && (
        <p className="text-xs text-muted-foreground mt-1">Ник: {order.nickname}</p>
      )}
    </div>
  );
}
