import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold gradient-text mb-8">
            Политика конфиденциальности
          </h1>
          <Card className="glass-card border-white/10">
            <CardContent className="p-8 prose prose-invert prose-sm max-w-none space-y-6">
              <p className="text-muted-foreground text-sm">
                Дата последнего обновления: 15 мая 2026 г.
              </p>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">1. Общие положения</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Настоящая Политика конфиденциальности определяет порядок обработки и защиты
                  персональных данных пользователей сервиса RBXPass (далее — «Сервис»),
                  расположенного по адресу https://rbxpass.ru.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Используя Сервис, вы соглашаетесь с условиями данной Политики конфиденциальности.
                  Если вы не согласны с условиями, пожалуйста, не используйте Сервис.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">2. Какие данные мы собираем</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  При использовании Сервиса мы можем собирать следующие данные:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li>Игровой никнейм (имя пользователя в игре)</li>
                  <li>Контактные данные Telegram (для связи по вопросам активации)</li>
                  <li>Ссылка на GamePass (для выполнения активации)</li>
                  <li>Код активации (для обработки заказа)</li>
                  <li>Техническая информация (IP-адрес, тип браузера, время обращения)</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">3. Цели обработки данных</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Собранные данные используются исключительно для:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li>Выполнения заказа на активацию кода</li>
                  <li>Связи с пользователем по вопросам заказа</li>
                  <li>Предотвращения мошенничества и злоупотреблений</li>
                  <li>Улучшения качества Сервиса</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">4. Хранение и защита данных</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Мы принимаем необходимые технические и организационные меры для защиты
                  персональных данных от несанкционированного доступа, изменения, раскрытия
                  или уничтожения. Данные хранятся на защищённых серверах и доступны только
                  уполномоченным лицам.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">5. Передача данных третьим лицам</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Мы не передаём персональные данные третьим лицам, за исключением случаев,
                  предусмотренных законодательством Российской Федерации, а также случаев,
                  когда передача необходима для выполнения заказа (например, взаимодействие
                  с платформой Roblox для покупки GamePass).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">6. Права пользователя</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Вы имеете право:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li>Запросить информацию о хранящихся данных</li>
                  <li>Потребовать удаления ваших персональных данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Для реализации своих прав обратитесь в поддержку через Telegram: @loothub_support
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">7. Изменения политики</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Мы оставляем за собой право вносить изменения в настоящую Политику
                  конфиденциальности. Актуальная версия всегда доступна на данной странице.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
