"use client";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { RobloxFloatingElements } from "@/components/roblox-elements";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, MessageCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise grid-pattern">
      {/* Background effects */}
      <RobloxFloatingElements />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#00b06a]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#00b06a]/3 rounded-full blur-[100px]" />
      </div>

      <Navigation currentPage="support" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-2 animate-pulse" />
              Поддержка онлайн
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                Поддержка RBXPass
              </h1>
            </div>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Вы можете активировать код самостоятельно на главной странице RBXPass.
              Если возникнут вопросы — наша поддержка всегда готова помочь.
              Свяжитесь с нами любым удобным способом ниже.
            </p>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
            {/* Telegram */}
            <Card className="glass-card border-white/10 hover:border-[#2AABEE]/30 transition-all duration-300 group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#2AABEE]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#2AABEE]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Telegram поддержка</h3>
                  <p className="text-sm text-muted-foreground">
                    Быстрый канал связи для решения вопросов
                  </p>
                </div>
                <a
                  href="https://t.me/loothub_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-5 py-2.5 rounded-lg bg-[#2AABEE] hover:bg-[#229ED9] text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#2AABEE]/20"
                >
                  Написать в Telegram
                </a>
              </CardContent>
            </Card>

            {/* VK */}
            <Card className="glass-card border-white/10 hover:border-[#4C75A3]/30 transition-all duration-300 group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#4C75A3]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#4C75A3]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.042-2.763-5.32-2.763-5.778 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.17-3.608 2.17-3.608.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">VK поддержка</h3>
                  <p className="text-sm text-muted-foreground">
                    Альтернативный канал связи ВКонтакте
                  </p>
                </div>
                <a
                  href="https://vk.com/rbxpass_loothub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-5 py-2.5 rounded-lg bg-[#4C75A3] hover:bg-[#3D6490] text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#4C75A3]/20"
                >
                  Написать в VK
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Warning */}
          <div className="animate-fade-in-up delay-300" style={{ opacity: 0 }}>
            <Card className="glass-card border-yellow-500/20 bg-yellow-500/5">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground italic">
                  Пожалуйста, не отправляйте в поддержку полный код активации и пароли.
                  Для проверки обычно достаточно короткого кода заказа и краткого описания проблемы.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Telegram Bot Chat Widget */}
          <div className="mt-8 animate-fade-in-up delay-400" style={{ opacity: 0 }}>
            <Card className="glass-card border-white/10">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#2AABEE]/10 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-[#2AABEE]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Онлайн-чат</h3>
                  <p className="text-sm text-muted-foreground">
                    Напишите нам в Telegram — ответим в течение нескольких минут
                  </p>
                </div>
                <a
                  href="https://t.me/loothub_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#2AABEE]/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Открыть чат в Telegram
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
