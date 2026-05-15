"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Copy,
  CheckCircle,
  Globe,
  Gamepad2,
  CreditCard,
  Settings,
  Link as LinkIcon,
  DollarSign,
  Monitor,
  Smartphone,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { RobloxFloatingElements } from "@/components/roblox-elements";
import { useState } from "react";

export default function InstructionsPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    { number: 1, title: "Откройте Roblox Studio или сайт Roblox", description: "Перейдите на https://www.roblox.com/ и войдите в свой аккаунт", icon: Globe, link: "https://www.roblox.com/", linkText: "Открыть Roblox" },
    { number: 2, title: "Перейдите в раздел «Создание» (Create)", description: "В меню сверху выберите вкладку Create или перейдите по ссылке", icon: Settings, link: "https://create.roblox.com/", linkText: "Открыть Create" },
    { number: 3, title: "Выберите свою игру (Experience)", description: "Найдите игру, в которой хотите создать GamePass, и нажмите Manage Experience", icon: Gamepad2 },
    { number: 4, title: "Создайте GamePass", description: 'В меню слева выберите Passes → Create a Pass. Введите название и описание (любые — например, "Донат")', icon: CreditCard },
    { number: 5, title: "Укажите цену", description: "После создания откройте GamePass, нажмите Configure → Sales, включите «Item for Sale» и укажите цену в Robux (смотрите таблицу ниже)", icon: DollarSign },
    { number: 6, title: "Скопируйте ссылку на GamePass", description: "После сохранения скопируйте ссылку из адресной строки браузера:", icon: LinkIcon, example: "https://www.roblox.com/game-pass/123456789/Donation" },
    { number: 7, title: "Вставьте ссылку и код на сайте", description: "Перейдите на главную, вставьте ссылку на GamePass и код, полученный после покупки", icon: CheckCircle },
    { number: 8, title: "Дождитесь зачисления Robux", description: "После активации Robux поступят на ваш аккаунт в течение 5–7 дней", icon: CheckCircle },
  ];

  const priceTable = [
    { nominal: "200", price: "286" }, { nominal: "201", price: "288" },
    { nominal: "250", price: "358" }, { nominal: "300", price: "429" },
    { nominal: "301", price: "430" }, { nominal: "350", price: "500" },
    { nominal: "400", price: "572" }, { nominal: "401", price: "573" },
    { nominal: "450", price: "643" }, { nominal: "500", price: "715" },
    { nominal: "501", price: "716" }, { nominal: "550", price: "786" },
    { nominal: "600", price: "858" }, { nominal: "601", price: "859" },
    { nominal: "650", price: "929" }, { nominal: "700", price: "1000" },
    { nominal: "701", price: "1002" }, { nominal: "750", price: "1072" },
    { nominal: "800", price: "1143" }, { nominal: "801", price: "1145" },
    { nominal: "850", price: "1215" }, { nominal: "900", price: "1286" },
    { nominal: "901", price: "1288" }, { nominal: "950", price: "1358" },
    { nominal: "1000", price: "1429" }, { nominal: "1001", price: "1431" },
    { nominal: "1200", price: "1715" }, { nominal: "1201", price: "1716" },
    { nominal: "1250", price: "1786" }, { nominal: "1300", price: "1858" },
    { nominal: "1301", price: "1859" }, { nominal: "1400", price: "2000" },
    { nominal: "1401", price: "2002" }, { nominal: "1500", price: "2143" },
    { nominal: "1501", price: "2145" }, { nominal: "1800", price: "2572" },
    { nominal: "1801", price: "2573" }, { nominal: "2000", price: "2858" },
    { nominal: "2001", price: "2859" }, { nominal: "2500", price: "3572" },
    { nominal: "2501", price: "3573" }, { nominal: "3000", price: "4286" },
    { nominal: "3001", price: "4288" }, { nominal: "3500", price: "5000" },
    { nominal: "3501", price: "5002" }, { nominal: "4000", price: "5715" },
    { nominal: "4001", price: "5716" }, { nominal: "4500", price: "6429" },
    { nominal: "4501", price: "6430" }, { nominal: "5000", price: "7143" },
    { nominal: "5001", price: "7145" }, { nominal: "6000", price: "8572" },
    { nominal: "6001", price: "8573" }, { nominal: "7000", price: "10000" },
    { nominal: "7001", price: "10002" }, { nominal: "8000", price: "11429" },
    { nominal: "8001", price: "11430" }, { nominal: "9000", price: "12858" },
    { nominal: "9001", price: "12859" }, { nominal: "10000", price: "14286" },
    { nominal: "10001", price: "14288" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise grid-pattern">
      <RobloxFloatingElements />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#00b06a]/4 rounded-full blur-[150px]" />
      </div>

      <Navigation currentPage="instructions" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <Badge className="mb-4 bg-[#00b06a]/10 text-[#00b06a] border-[#00b06a]/20">
              Roblox-only гайд
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="gradient-text">Инструкция по созданию GamePass</span>
              <span className="text-foreground"> (Roblox)</span>
            </h1>
            <p className="text-muted-foreground">
              Пошаговое руководство только для Roblox
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Следуйте инструкции ниже, чтобы создать GamePass и активировать ваш код
            </p>
          </div>

          {/* Video Instructions - 3 cards */}
          <div className="mb-12">
            <h2 className="text-center text-lg font-semibold mb-6 animate-fade-in-up delay-100" style={{ opacity: 0 }}>
              Видеоинструкции
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <VideoCard
                icon={<Monitor className="w-6 h-6" />}
                badge="Через браузер"
                badgeColor="bg-blue-500/10 text-blue-400 border-blue-500/20"
                title="Создание GamePass на сайте Roblox"
                url="https://rutube.ru/video/a2652268ba8a379f99c77eecb5ac7745/"
                delay="delay-200"
              />
              <VideoCard
                icon={<Smartphone className="w-6 h-6" />}
                badge="Через приложение Roblox"
                badgeColor="bg-orange-500/10 text-orange-400 border-orange-500/20"
                title="Создание GamePass в мобильном приложении"
                url="https://rutube.ru/video/private/4a902225b74162d06b7d044da2fa79aa/?p=AVVvRc654dFjj42QcA-4Jw"
                delay="delay-300"
              />
              <VideoCard
                icon={<Settings className="w-6 h-6" />}
                badge="Верификация плейса"
                badgeColor="bg-rose-500/10 text-rose-400 border-rose-500/20"
                title="Как пройти View questionnaire (важно для покупок через Pass)"
                url="https://rutube.ru/shorts/48672fa13933fbf472aa243a6f1ff2cf/"
                delay="delay-400"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.number}
                  className="glass-card border-white/8 animate-fade-in-up hover:border-[#00b06a]/20 transition-all duration-300"
                  style={{ opacity: 0, animationDelay: `${0.4 + index * 0.08}s`, animationFillMode: "forwards" }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#00b06a]/10 border border-[#00b06a]/20 flex items-center justify-center transition-transform hover:scale-110">
                        <Icon className="w-5 h-5 text-[#00b06a]" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs border-white/15 text-muted-foreground">
                            Шаг {step.number}
                          </Badge>
                          <h3 className="text-sm font-semibold">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>

                        {step.example && (
                          <div className="flex items-center gap-2 mt-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/8">
                            <code className="text-xs font-mono text-muted-foreground break-all flex-1">
                              {step.example}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(step.example!, step.number)}
                              className="h-7 w-7 p-0 hover:bg-white/10"
                            >
                              {copiedStep === step.number ? (
                                <CheckCircle className="w-3.5 h-3.5 text-[#00b06a]" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        )}

                        {step.link && (
                          <Button asChild size="sm" variant="outline" className="mt-2 border-white/10 hover:bg-white/5 hover:border-[#00b06a]/30">
                            <a href={step.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                              {step.linkText}
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Price Table */}
          <Card className="glass-card border-white/8 mt-10">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-[#00b06a]" />
                <h2 className="text-lg font-semibold">Таблица номиналов и цен GamePass</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Найдите ваш купленный номинал и укажите соответствующую цену при создании GamePass.
              </p>
              <div className="overflow-x-auto rounded-xl border border-white/8 max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b border-white/8 bg-[#12121a]">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Номинал (Robux)</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Цена GamePass</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceTable.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                        <td className="px-4 py-2 font-mono text-sm">{row.nominal}</td>
                        <td className="px-4 py-2 font-mono text-sm text-[#00b06a]">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Important Info */}
          <Card className="glass-card border-white/8 mt-6">
            <CardContent className="p-6 space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00b06a]" />
                Важная информация
              </h2>
              <div className="space-y-2">
                <InfoPoint color="bg-[#00b06a]" text="Время зачисления: Robux поступят в течение 5–7 дней после активации" />
                <InfoPoint color="bg-blue-400" text="Безопасность: Все операции защищены. Ваши данные в безопасности" />
                <InfoPoint color="bg-purple-400" text="Поддержка: Если возникли вопросы — обратитесь в Telegram @loothub_support" />
                <InfoPoint color="bg-yellow-400" text="Цена GamePass: Если вашего номинала нет в таблице — умножьте его на 1.3 и округлите вверх" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function VideoCard({ icon, badge, badgeColor, title, url, delay }: {
  icon: React.ReactNode; badge: string; badgeColor: string; title: string; url: string; delay: string;
}) {
  return (
    <Card className={`glass-card-hover border-white/8 animate-fade-in-up ${delay}`} style={{ opacity: 0 }}>
      <CardContent className="p-6 flex flex-col items-center text-center gap-4 h-full">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
        <Badge className={`${badgeColor} border text-xs`}>{badge}</Badge>
        <p className="text-sm text-muted-foreground flex-1">{title}</p>
        <Button asChild className="w-full btn-roblox rounded-xl" size="sm">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Смотреть
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

function InfoPoint({ color, text }: { color: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-1.5 h-1.5 ${color} rounded-full mt-2 flex-shrink-0`} />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
