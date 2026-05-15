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
  PlayCircle,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useState } from "react";

export default function InstructionsPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      number: 1,
      title: "Откройте Roblox Studio или сайт Roblox",
      description: "Перейдите на https://www.roblox.com/ и войдите в свой аккаунт",
      icon: Globe,
      link: "https://www.roblox.com/",
      linkText: "Открыть Roblox",
    },
    {
      number: 2,
      title: "Перейдите в раздел «Создание» (Create)",
      description: "В меню сверху выберите вкладку Create или перейдите по ссылке",
      icon: Settings,
      link: "https://create.roblox.com/",
      linkText: "Открыть Create",
    },
    {
      number: 3,
      title: "Выберите свою игру (Experience)",
      description: "Найдите игру, в которой хотите создать GamePass, и нажмите Manage Experience",
      icon: Gamepad2,
    },
    {
      number: 4,
      title: "Создайте GamePass",
      description: 'В меню слева выберите Passes → Create a Pass. Введите название и описание (любые — например, "Донат")',
      icon: CreditCard,
    },
    {
      number: 5,
      title: "Укажите цену",
      description: "После создания откройте GamePass, нажмите Configure → Sales, включите «Item for Sale» и укажите цену в Robux (смотрите таблицу ниже)",
      icon: DollarSign,
    },
    {
      number: 6,
      title: "Скопируйте ссылку на GamePass",
      description: "После сохранения скопируйте ссылку из адресной строки браузера:",
      icon: LinkIcon,
      example: "https://www.roblox.com/game-pass/123456789/Donation",
    },
    {
      number: 7,
      title: "Вставьте ссылку и код на сайте",
      description: "Перейдите на главную, вставьте ссылку на GamePass и код, полученный после покупки",
      icon: CheckCircle,
    },
    {
      number: 8,
      title: "Дождитесь зачисления Robux",
      description: "После активации Robux поступят на ваш аккаунт в течение 5–7 дней",
      icon: CheckCircle,
    },
  ];

  // Full price table from the screenshot
  const priceTable = [
    { nominal: "200", price: "260" },
    { nominal: "201", price: "261" },
    { nominal: "250", price: "325" },
    { nominal: "300", price: "390" },
    { nominal: "301", price: "391" },
    { nominal: "350", price: "455" },
    { nominal: "400", price: "520" },
    { nominal: "401", price: "521" },
    { nominal: "450", price: "585" },
    { nominal: "500", price: "650" },
    { nominal: "501", price: "651" },
    { nominal: "550", price: "715" },
    { nominal: "600", price: "780" },
    { nominal: "601", price: "781" },
    { nominal: "650", price: "845" },
    { nominal: "700", price: "910" },
    { nominal: "701", price: "911" },
    { nominal: "750", price: "975" },
    { nominal: "800", price: "1040" },
    { nominal: "801", price: "1041" },
    { nominal: "850", price: "1105" },
    { nominal: "900", price: "1170" },
    { nominal: "901", price: "1171" },
    { nominal: "950", price: "1235" },
    { nominal: "1000", price: "1300" },
    { nominal: "1001", price: "1301" },
    { nominal: "1200", price: "1560" },
    { nominal: "1201", price: "1561" },
    { nominal: "1250", price: "1625" },
    { nominal: "1300", price: "1690" },
    { nominal: "1301", price: "1691" },
    { nominal: "1400", price: "1820" },
    { nominal: "1401", price: "1821" },
    { nominal: "1500", price: "1950" },
    { nominal: "1501", price: "1951" },
    { nominal: "1800", price: "2340" },
    { nominal: "1801", price: "2341" },
    { nominal: "2000", price: "2600" },
    { nominal: "2001", price: "2601" },
    { nominal: "2500", price: "3250" },
    { nominal: "2501", price: "3251" },
    { nominal: "3000", price: "3900" },
    { nominal: "3001", price: "3901" },
    { nominal: "3500", price: "4550" },
    { nominal: "3501", price: "4551" },
    { nominal: "4000", price: "5200" },
    { nominal: "4001", price: "5201" },
    { nominal: "4500", price: "5850" },
    { nominal: "4501", price: "5851" },
    { nominal: "5000", price: "6500" },
    { nominal: "5001", price: "6501" },
    { nominal: "6000", price: "7800" },
    { nominal: "6001", price: "7801" },
    { nominal: "7000", price: "9100" },
    { nominal: "7001", price: "9101" },
    { nominal: "8000", price: "10400" },
    { nominal: "8001", price: "10401" },
    { nominal: "9000", price: "11700" },
    { nominal: "9001", price: "11701" },
    { nominal: "10000", price: "13000" },
    { nominal: "10001", price: "13001" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#00b06a]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-[#00b06a]/3 rounded-full blur-[100px]" />
      </div>

      <Navigation currentPage="instructions" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
              Инструкция по созданию GamePass
            </h1>
            <p className="text-muted-foreground">
              Пошаговое руководство для получения Robux
            </p>
          </div>

          {/* Video Section */}
          <Card className="glass-card border-white/10 mb-8 animate-fade-in-up delay-100" style={{ opacity: 0 }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <PlayCircle className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Видеоинструкция</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Посмотрите видео, если предпочитаете наглядное объяснение
              </p>
              <div className="aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                <iframe
                  src="https://rutube.ru/play/embed/a2652268ba8a379f99c77eecb5ac7745"
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay"
                  title="Видеоинструкция по созданию GamePass"
                />
              </div>
            </CardContent>
          </Card>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.number}
                  className="glass-card border-white/10 animate-fade-in-up hover:border-primary/20 transition-all duration-300"
                  style={{ opacity: 0, animationDelay: `${0.15 + index * 0.08}s`, animationFillMode: "forwards" }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs border-white/20 text-muted-foreground">
                            Шаг {step.number}
                          </Badge>
                          <h3 className="text-sm font-semibold">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>

                        {step.example && (
                          <div className="flex items-center gap-2 mt-2 p-2.5 rounded-lg bg-white/5 border border-white/10">
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
                                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        )}

                        {step.link && (
                          <Button asChild size="sm" variant="outline" className="mt-2 border-white/10 hover:bg-white/5">
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
          <Card className="glass-card border-white/10 mt-10 animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.8s", animationFillMode: "forwards" }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold">Таблица номиналов и цен GamePass</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Найдите ваш купленный номинал и укажите соответствующую цену при создании GamePass.
                Формула: цена GamePass = номинал × 1.3 (округлённо).
              </p>
              <div className="overflow-x-auto rounded-lg border border-white/10 max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b border-white/10 bg-card">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Купленный номинал (Robux)</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Цена GamePass</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceTable.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-2 font-mono text-sm">{row.nominal}</td>
                        <td className="px-4 py-2 font-mono text-sm text-green-400">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Important Info */}
          <Card className="glass-card border-white/10 mt-6 animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.9s", animationFillMode: "forwards" }}>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Важная информация
              </h2>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Время зачисления:</strong> Robux поступят в течение 5–7 дней после активации
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Безопасность:</strong> Все операции защищены. Ваши данные в безопасности
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Поддержка:</strong> Если возникли вопросы — обратитесь в Telegram @loothub_support
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Цена GamePass:</strong> Если вашего номинала нет в таблице — умножьте его на 1.3 и округлите вверх
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
