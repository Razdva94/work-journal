# Журнал работ

## Стек

- **Backend:** NestJS, Prisma, PostgreSQL
- **Frontend:** React, TypeScript, Vite

**Почему так:** NestJS — чёткая модульная архитектура. Prisma выбрал, потому что с ней проще работать, чем с другими ORM: схема, миграции и типы из коробки. React — привычный инструмент для UI.

## Запуск

```bash
cd work-journal
cp .env.example .env
docker compose up --build
```

http://127.0.0.1:3001

Перед первым запуском скопируйте `.env.example` в `.env` и при необходимости поправьте значения (подключение к БД, порт, URL API для фронта).
