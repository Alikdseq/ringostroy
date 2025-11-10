# RingooStroy Frontend

Frontend приложение для RingooStroy на React + TypeScript + Tailwind CSS

## Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить dev сервер
npm run dev

# Собрать для production
npm run build

# Предпросмотр production сборки
npm run preview
```

Приложение запустится на http://localhost:3000

## Особенности

- ✅ React 18 с TypeScript
- ✅ Tailwind CSS для стилей
- ✅ React Router для навигации
- ✅ Axios для API запросов
- ✅ Responsive дизайн
- ✅ Интеграция с Django API

## API Endpoints

- `/api/v1/services/` - все услуги
- `/api/v1/services/popular/` - популярные услуги
- `/api/v1/equipment/` - вся техника

## Структура проекта

```
frontend/
├── src/
│   ├── components/     # Переиспользуемые компоненты
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── pages/          # Страницы
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   └── Equipment.tsx
│   ├── services/       # API сервисы
│   │   └── api.ts
│   ├── types/          # TypeScript типы
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```
