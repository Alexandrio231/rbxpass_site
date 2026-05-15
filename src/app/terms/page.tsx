import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold gradient-text mb-8">
            Пользовательское соглашение
          </h1>
          <Card className="glass-card border-white/10">
            <CardContent className="p-8 prose prose-invert prose-sm max-w-none space-y-6">
              <p className="text-muted-foreground text-sm">
                Дата последнего обновления: 15 мая 2026 г.
              </p>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">1. Общие положения</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует
                  отношения между администрацией сервиса RBXPass (далее — «Администрация»)
                  и пользователем (далее — «Пользователь») при использовании сервиса
                  активации кодов, расположенного по адресу https://rbxpass.ru (далее — «Сервис»).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">2. Предмет соглашения</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Сервис предоставляет Пользователю возможность активировать коды для получения
                  игровой валюты и цифровых товаров в поддерживаемых играх и платформах.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">3. Условия использования</h2>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
                  <li>Пользователь должен быть не младше 14 лет для использования Сервиса.</li>
                  <li>Пользователь обязуется предоставлять достоверные данные при активации кода.</li>
                  <li>Каждый код может быть активирован только один раз.</li>
                  <li>Пользователь несёт ответственность за правильность указанных данных (никнейм, ссылка на GamePass).</li>
                  <li>Запрещается использовать Сервис для мошеннических действий.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">4. Порядок активации</h2>
                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2 ml-2">
                  <li>Пользователь вводит код активации, полученный при покупке.</li>
                  <li>Система проверяет валидность кода.</li>
                  <li>Пользователь указывает необходимые данные для выполнения заказа.</li>
                  <li>После подтверждения заказ поступает в обработку.</li>
                  <li>Игровая валюта зачисляется в сроки, указанные для конкретной игры.</li>
                </ol>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">5. Сроки выполнения</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Стандартный срок выполнения заказа для Roblox составляет 5–7 рабочих дней
                  с момента активации кода. Для других игр и сервисов сроки могут отличаться.
                  Администрация прилагает все усилия для выполнения заказов в кратчайшие сроки.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">6. Ответственность сторон</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Администрация не несёт ответственности за:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li>Неверно указанные Пользователем данные</li>
                  <li>Блокировку аккаунта Пользователя со стороны игровой платформы</li>
                  <li>Технические сбои на стороне игровых платформ</li>
                  <li>Задержки, вызванные обстоятельствами непреодолимой силы</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">7. Возврат и отмена</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  После активации кода возврат средств не производится. Если заказ не может
                  быть выполнен по вине Администрации, Пользователю предоставляется замена
                  или возврат в индивидуальном порядке. Для решения спорных ситуаций
                  обращайтесь в поддержку.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">8. Контакты</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  По всем вопросам, связанным с использованием Сервиса, обращайтесь
                  в службу поддержки через Telegram: @loothub_support
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">9. Изменение соглашения</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Администрация оставляет за собой право изменять условия настоящего Соглашения.
                  Продолжение использования Сервиса после внесения изменений означает согласие
                  с новой редакцией Соглашения.
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
