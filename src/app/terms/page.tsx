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
            Публичная оферта (Пользовательское соглашение)
          </h1>
          <Card className="glass-card border-white/10">
            <CardContent className="p-6 md:p-8 prose prose-invert prose-sm max-w-none space-y-6">
              <p className="text-muted-foreground text-sm">
                Дата последнего обновления: 16 мая 2026 г.
              </p>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">1. Общие положения</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  1.1. Настоящий документ является публичной офертой (далее — «Оферта»)
                  Индивидуального предпринимателя Тисленок Александр Егорович, ИНН 233101600808,
                  ОГРНИП 325508100583521 (далее — «Исполнитель»), адресованной любому
                  физическому лицу (далее — «Заказчик»), и определяет условия оказания
                  услуг по активации цифровых кодов через сервис RBXPass, расположенный
                  по адресу https://rbxpass.ru (далее — «Сервис»).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  1.2. В соответствии со ст.437 Гражданского кодекса Российской Федерации
                  настоящий документ является публичной офертой. Акцептом оферты является
                  совершение Заказчиком действий по активации кода на Сервисе (нажатие
                  кнопки «Активировать» или аналогичной).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  1.3. Акцепт оферты означает полное и безоговорочное принятие Заказчиком
                  всех условий настоящей Оферты без каких-либо изъятий и ограничений,
                  и приравнивается к заключению договора в письменной форме (п.3 ст.438 ГК РФ).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">2. Предмет Оферты</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  2.1. Исполнитель оказывает Заказчику услугу по активации цифрового кода,
                  приобретённого Заказчиком у Исполнителя через торговые площадки
                  (Wildberries, Ozon и др.), результатом которой является зачисление
                  игровой валюты (Robux) на аккаунт Заказчика в игре Roblox посредством
                  механизма GamePass.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  2.2. Товаром, приобретаемым на торговой площадке, является физический
                  носитель (карточка/конверт) с уникальным кодом активации. Сервис
                  rbxpass.ru является инструментом для использования (активации) данного кода.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  2.3. Услуга считается оказанной в момент приобретения GamePass Заказчика
                  Исполнителем и зачисления соответствующей суммы Robux на аккаунт Заказчика.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">3. Порядок оказания услуги</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  3.1. Заказчик приобретает товар (карточку с кодом) на торговой площадке.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  3.2. Заказчик переходит на Сервис и вводит код активации.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  3.3. Заказчик указывает: игровой никнейм в Roblox, ссылку на созданный
                  GamePass (или его ID), контакт для связи (Telegram), загружает скриншот
                  подтверждения покупки GamePass.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  3.4. После подтверждения заказ поступает в обработку. Исполнитель
                  приобретает указанный GamePass, в результате чего Robux зачисляются
                  на аккаунт Заказчика.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  3.5. Каждый код активации может быть использован только один раз.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">4. Сроки выполнения</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  4.1. Стандартный срок выполнения заказа составляет до 7 (семи) рабочих дней
                  с момента активации кода.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  4.2. Исполнитель прилагает разумные усилия для выполнения заказов
                  в кратчайшие сроки. Фактический срок может быть меньше указанного.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  4.3. В случае невозможности выполнения заказа в установленный срок
                  Исполнитель уведомляет Заказчика через указанный контакт.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">5. Стоимость и порядок оплаты</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  5.1. Стоимость услуги включена в цену товара (карточки с кодом),
                  приобретаемого на торговой площадке. Дополнительная оплата на Сервисе
                  не взимается.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  5.2. Номинал зачисляемой игровой валюты соответствует номиналу,
                  указанному на карточке и в описании товара на торговой площадке.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">6. Обязанности Заказчика</h2>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
                  <li>Предоставить достоверные данные при активации кода (корректный никнейм, рабочую ссылку на GamePass)</li>
                  <li>Создать GamePass с ценой, соответствующей номиналу кода (формула расчёта указана на Сервисе)</li>
                  <li>Отключить Regional Pricing в настройках GamePass</li>
                  <li>Не передавать код активации третьим лицам</li>
                  <li>Не использовать Сервис в мошеннических или иных противоправных целях</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">7. Обязанности Исполнителя</h2>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
                  <li>Выполнить заказ в установленные сроки при условии корректности предоставленных данных</li>
                  <li>Уведомить Заказчика о проблемах с выполнением заказа</li>
                  <li>Обеспечить сохранность персональных данных в соответствии с Политикой конфиденциальности</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">8. Ограничение ответственности</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  8.1. Исполнитель не несёт ответственности за:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                  <li>Последствия предоставления Заказчиком недостоверных или неполных данных</li>
                  <li>Действия платформы Roblox в отношении аккаунта Заказчика (блокировки, ограничения)</li>
                  <li>Технические сбои на стороне платформы Roblox или иных третьих лиц</li>
                  <li>Задержки, вызванные обстоятельствами непреодолимой силы</li>
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  8.2. Совокупная ответственность Исполнителя по настоящей Оферте
                  ограничена стоимостью конкретного заказа.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">9. Возврат и рекламации</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  9.1. В случае невозможности выполнения заказа по вине Исполнителя
                  (технический сбой на стороне Сервиса, ошибка обработки) Заказчику
                  предоставляется повторное выполнение услуги или возврат денежных средств
                  в порядке, предусмотренном законодательством РФ.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  9.2. Возврат товара (карточки с кодом), приобретённого на торговой площадке,
                  осуществляется в соответствии с правилами соответствующей торговой площадки
                  и законодательством РФ о защите прав потребителей.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  9.3. После успешного выполнения услуги (зачисления Robux на аккаунт
                  Заказчика) возврат денежных средств не производится, поскольку услуга
                  оказана в полном объёме (п.3 ст.781 ГК РФ).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  9.4. Для решения спорных ситуаций Заказчик может обратиться в службу
                  поддержки: Telegram @loothub_support или по электронной почте alexandertislenokk@gmail.com.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">10. Возрастные ограничения</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  10.1. Сервис предназначен для лиц, достигших 14 лет.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  10.2. Лица в возрасте от 14 до 18 лет используют Сервис с согласия
                  законных представителей (родителей, опекунов). Акцепт настоящей Оферты
                  несовершеннолетним подтверждает наличие такого согласия.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">11. Персональные данные</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  11.1. Акцептуя настоящую Оферту, Заказчик даёт согласие на обработку
                  персональных данных в соответствии с Политикой конфиденциальности,
                  размещённой по адресу: https://rbxpass.ru/privacy.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  11.2. Заказчик подтверждает, что ознакомлен с перечнем обрабатываемых
                  данных, целями и сроками обработки.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">12. Порядок разрешения споров</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  12.1. Все споры и разногласия разрешаются путём переговоров.
                  Претензионный порядок обязателен. Срок рассмотрения претензии — 10 рабочих дней.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  12.2. При невозможности урегулирования спора в досудебном порядке
                  спор передаётся на рассмотрение в суд по месту нахождения Исполнителя
                  в соответствии с законодательством Российской Федерации.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">13. Заключительные положения</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  13.1. Настоящая Оферта вступает в силу с момента размещения на Сервисе
                  и действует бессрочно.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  13.2. Исполнитель вправе в одностороннем порядке изменять условия Оферты.
                  Изменения вступают в силу с момента публикации новой редакции на Сервисе.
                  Продолжение использования Сервиса после публикации изменений означает
                  согласие с новой редакцией.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  13.3. К отношениям сторон применяется законодательство Российской Федерации.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">14. Реквизиты Исполнителя</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ИП Тисленок Александр Егорович<br />
                  ИНН: 233101600808<br />
                  ОГРНИП: 325508100583521<br />
                  E-mail: alexandertislenokk@gmail.com<br />
                  Telegram поддержки: @loothub_support
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
