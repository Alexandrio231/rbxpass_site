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
            <CardContent className="p-6 md:p-8 prose prose-invert prose-sm max-w-none space-y-6">
              <p className="text-muted-foreground text-sm">
                Дата последнего обновления: 16 мая 2026 г.
              </p>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">1. Оператор персональных данных</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Оператором персональных данных является Индивидуальный предприниматель
                  Тисленок Александр Егорович, ИНН 233101600808, ОГРНИП 325508100583521
                  (далее — «Оператор»).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Контактный адрес электронной почты: alexandertislenokk@gmail.com
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Адрес сервиса: https://rbxpass.ru (далее — «Сервис»).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">2. Общие положения</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Настоящая Политика конфиденциальности (далее — «Политика») разработана
                  в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных
                  данных» и определяет порядок обработки и защиты персональных данных
                  пользователей Сервиса (далее — «Пользователь»).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Использование Сервиса означает безоговорочное согласие Пользователя
                  с настоящей Политикой. В случае несогласия Пользователь должен воздержаться
                  от использования Сервиса.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">3. Правовые основания обработки</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Обработка персональных данных осуществляется на следующих основаниях:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li>Исполнение договора (публичной оферты), стороной которого является Пользователь (п.5 ч.1 ст.6 152-ФЗ)</li>
                  <li>Согласие Пользователя на обработку персональных данных (п.1 ч.1 ст.6 152-ФЗ), выраженное путём совершения активных действий на Сервисе (ввод данных, нажатие кнопки «Активировать»)</li>
                  <li>Законный интерес Оператора в обеспечении работоспособности и безопасности Сервиса (техническое логирование)</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">4. Перечень обрабатываемых данных</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Оператор обрабатывает следующие категории данных:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li><span className="text-foreground/80">Игровой никнейм</span> — имя пользователя на платформе Roblox</li>
                  <li><span className="text-foreground/80">Контакт в Telegram</span> — имя пользователя или номер телефона (предоставляется добровольно для связи по заказу)</li>
                  <li><span className="text-foreground/80">Ссылка на GamePass / ID GamePass</span> — для выполнения услуги активации</li>
                  <li><span className="text-foreground/80">Код активации</span> — уникальный код из приобретённого товара</li>
                  <li><span className="text-foreground/80">Скриншот покупки GamePass</span> — для подтверждения корректности заказа</li>
                  <li><span className="text-foreground/80">Техническая информация</span> — IP-адрес, тип и версия браузера, дата и время обращения (собирается автоматически)</li>
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Оператор не собирает и не обрабатывает: ФИО, паспортные данные, адреса
                  проживания, банковские реквизиты, данные платёжных карт.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">5. Цели обработки</h2>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li>Исполнение обязательств по договору — выполнение услуги активации кода</li>
                  <li>Связь с Пользователем при возникновении проблем с заказом</li>
                  <li>Обеспечение безопасности Сервиса и предотвращение злоупотреблений</li>
                  <li>Ведение внутренней статистики и улучшение качества Сервиса</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">6. Сроки обработки и хранения</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Персональные данные обрабатываются и хранятся в течение срока, необходимого
                  для достижения целей обработки:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li>Данные заказа (никнейм, GamePass, контакт) — 1 (один) год с момента выполнения заказа</li>
                  <li>Технические логи (IP, user-agent) — 90 (девяносто) дней</li>
                  <li>Скриншоты покупки — 6 (шесть) месяцев с момента выполнения заказа</li>
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  По истечении указанных сроков данные уничтожаются путём удаления из
                  информационных систем Оператора.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">7. Передача данных третьим лицам</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Оператор не продаёт, не передаёт и не раскрывает персональные данные
                  третьим лицам, за исключением следующих случаев:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li>По требованию уполномоченных государственных органов РФ в случаях, предусмотренных законодательством</li>
                  <li>Хостинг-провайдер (Timeweb) — для размещения Сервиса на серверах на территории РФ</li>
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  При выполнении услуги активации Оператор взаимодействует с платформой
                  Roblox Corporation (США) в объёме, необходимом для приобретения GamePass.
                  Передаваемые данные ограничены публичным игровым никнеймом и ID GamePass,
                  которые являются общедоступной информацией на платформе Roblox.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">8. Файлы cookie</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Сервис использует технические файлы cookie, необходимые для корректной
                  работы (авторизация администратора, сессионные данные). Сервис не использует
                  рекламные или аналитические cookie третьих сторон.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">9. Защита данных</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Оператор принимает необходимые и достаточные правовые, организационные
                  и технические меры для защиты персональных данных от неправомерного
                  или случайного доступа, уничтожения, изменения, блокирования, копирования,
                  распространения, а также от иных неправомерных действий с ними:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li>Шифрование соединения (HTTPS/TLS)</li>
                  <li>Ограничение доступа к данным (авторизация по ключу)</li>
                  <li>Хранение данных на серверах, расположенных на территории Российской Федерации</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">10. Права Пользователя</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  В соответствии со ст.14–17 Федерального закона № 152-ФЗ Пользователь
                  имеет право:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li>Получить информацию об обработке своих персональных данных</li>
                  <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>Обжаловать действия Оператора в Роскомнадзор или в суд</li>
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Для реализации своих прав направьте запрос на электронную почту{" "}
                  alexandertislenokk@gmail.com или в Telegram: @loothub_support. Срок ответа — 10 рабочих дней.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">11. Изменение Политики</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Оператор вправе вносить изменения в настоящую Политику. Новая редакция
                  вступает в силу с момента размещения на данной странице, если иное
                  не предусмотрено новой редакцией. Продолжение использования Сервиса
                  после публикации изменений означает согласие с обновлённой Политикой.
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
