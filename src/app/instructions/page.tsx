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
      description: "После создания откройте GamePass, нажмите Configure → Sales, включите «Item for Sale» и укажите цену в Robux",
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

  const priceTable = [
    { nominal: "101", price: "131" },
    { nominal: "201", price: "261" },
    { nominal: "301", price: "391" },
    { nominal: "401", price: "521" },
    { nominal: "501", price: "651" },
    { nominal: "601", price: "781" },
    { nominal: "701", price: "911" },
    { nominal: "801", price: "1041" },
    { nominal: "901", price: "1171" },
    { nominal: "1001", price: "1301" },
    { nominal: "1201", price: "1561" },
    { nominal: "1401", price: "1821" },
    { nominal: "1601", price: "2081" },
    { nominal: "1701", price: "2211" },
    { nominal: "2001", price: "2601" },
    { nominal: "2501", price: "3251" },
    { nominal: "3001", price: "3901" },
    { nominal: "4501", price: "5851" },
    { nominal: "10001", price: "13001" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-600/8 rounded-full blur-3xl" />
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

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.number}
                  className="glass-card border-white/10 animate-fade-in-up"
                  style={{ opacity: 0, animationDelay: `${index * 0.08}s`, animationFillMode: "forwards" }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
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
          <Card className="glass-card border-white/10 mt-10">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold">Таблица цен GamePass</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Укажите соответствующую цену для вашего номинала кода
              </p>
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Купленный номинал</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Цена GamePass</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceTable.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-sm">Roblox {row.nominal}</td>
                        <td className="px-4 py-2.5 font-mono text-sm text-green-400">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Important Info */}
          <Card className="glass-card border-white/10 mt-6">
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
