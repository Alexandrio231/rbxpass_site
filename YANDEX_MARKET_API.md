# Интеграция с Яндекс Маркетом (FBY API)

## Обзор

LootHub поддерживает интеграцию с Яндекс Маркетом через FBY (Fulfillment by Yandex) API для продажи цифровых кодов активации.

## API Endpoints

### 1. Получение остатков товаров

**GET** `/api/yandex-market/stocks`

Возвращает список доступных товаров с остатками.

**Параметры запроса:**
- `sku` (опционально) - фильтр по конкретному SKU товара

**Пример запроса:**
```bash
GET /api/yandex-market/stocks
GET /api/yandex-market/stocks?sku=roblox-100
```

**Пример ответа:**
```json
{
  "ok": true,
  "stocks": [
    {
      "sku": "roblox-100",
      "offerId": "roblox-100",
      "name": "Roblox - 100 Robux",
      "category": "robux",
      "count": 5,
      "available": true
    },
    {
      "sku": "fortnite-1000",
      "offerId": "fortnite-1000",
      "name": "Fortnite - 1000 единиц",
      "category": "fortnite",
      "count": 10,
      "available": true
    }
  ],
  "total": 2
}
```

### 2. Обработка заказов

**POST** `/api/yandex-market/orders`

Принимает заказы от Яндекс Маркета и резервирует коды.

**Формат запроса:**
```json
{
  "orderId": "12345678",
  "items": [
    {
      "id": "item-1",
      "offerId": "roblox-100",
      "count": 2
    }
  ],
  "buyer": {
    "firstName": "Иван",
    "lastName": "Иванов",
    "phone": "+79991234567",
    "email": "buyer@example.com"
  }
}
```

**Формат ответа:**
```json
{
  "orderId": "12345678",
  "status": "PROCESSED",
  "items": [
    {
      "id": "item-1",
      "status": "ACCEPTED",
      "codes": [
        {
          "code": "RBX100-TEST-CODE",
          "nominal": 100,
          "orderId": "ABC123"
        }
      ]
    }
  ]
}
```

### 3. Отправка кодов покупателю

**POST** `/api/yandex-market/shipments`

Активирует коды и отправляет их покупателю после подтверждения оплаты.

**Формат запроса:**
```json
{
  "orderId": "12345678",
  "shipmentId": "shipment-123",
  "items": [
    {
      "id": "item-1"
    }
  ]
}
```

**Формат ответа:**
```json
{
  "ok": true,
  "shipmentId": "shipment-123",
  "orderId": "12345678",
  "codes": [
    {
      "code": "RBX100-TEST-CODE",
      "game": "Roblox",
      "nominal": "RBX100-TEST-CODE"
    }
  ],
  "message": "Коды успешно активированы и отправлены покупателю"
}
```

## Формат SKU (offerId)

SKU товара должен быть в формате: `{game-slug}-{nominal}`

**Примеры:**
- `roblox-100` - Roblox, 100 Robux
- `fortnite-1000` - Fortnite, 1000 V-Bucks
- `ps-plus-12` - PlayStation Plus, 12 месяцев
- `xbox-gamepass-1` - Xbox Game Pass, 1 месяц
- `steam-500` - Steam, 500 рублей

## Настройка в Яндекс Маркете

1. **Регистрация в FBY:**
   - Зарегистрируйтесь в программе FBY (Fulfillment by Yandex)
   - Получите доступ к API

2. **Настройка товаров:**
   - Создайте товары с SKU в формате `{game-slug}-{nominal}`
   - Укажите категорию товара

3. **Настройка webhook:**
   - Укажите URL вашего API: `https://yourdomain.com/api/yandex-market/orders`
   - Настройте авторизацию (если требуется)

4. **Синхронизация остатков:**
   - Регулярно вызывайте `/api/yandex-market/stocks` для обновления остатков
   - Или настройте автоматическую синхронизацию

## Безопасность

⚠️ **Важно:** В продакшене добавьте:
- Аутентификацию через API ключи
- Проверку подписи запросов от Яндекс Маркета
- Rate limiting
- Логирование всех операций

## Пример интеграции

```typescript
// Получение остатков
const stocks = await fetch('https://yourdomain.com/api/yandex-market/stocks')
  .then(res => res.json());

// Обработка заказа
const order = await fetch('https://yourdomain.com/api/yandex-market/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    orderId: '12345678',
    items: [{ id: 'item-1', offerId: 'roblox-100', count: 1 }],
    buyer: { phone: '+79991234567' }
  })
}).then(res => res.json());

// Отправка кодов
const shipment = await fetch('https://yourdomain.com/api/yandex-market/shipments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    orderId: '12345678',
    shipmentId: 'shipment-123',
    items: [{ id: 'item-1' }]
  })
}).then(res => res.json());
```

## Поддерживаемые игры

- Roblox (требует GamePass)
- Fortnite
- PlayStation Plus
- Xbox Game Pass
- Steam

Для добавления новых игр используйте seed скрипт или админ-панель.


