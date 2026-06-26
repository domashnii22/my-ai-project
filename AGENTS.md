# AGENTS.md

## Project

Семейные траты — клиент-серверное приложение для отслеживания расходов.
- **Frontend:** TypeScript / React / MUI / React Query + Axios (FSD-архитектура)
- **Backend:** TypeScript / NestJS / TypeORM / PostgreSQL (модульная архитектура)
- **Dev workflow:** только БД в Docker, фронт и бэк локально через dev-серверы

## Структура

```
packages/
├── shared/       # общие DTO и интерфейсы (без декораторов)
├── backend/      # NestJS — порт 4000
└── frontend/     # Vite + React — порт 5173, /api проксируется на бэк
```

## Команды

| Команда | Что делает |
|---|---|
| `docker compose up` | Поднять PostgreSQL на :5432 |
| `npm run dev:backend` | NestJS с hot-reload на :4000 |
| `npm run dev:frontend` | Vite с HMR на :5173 |
| `npm run lint` | ESLint всего монорепозитория |
| `npm run format` | Prettier всего монорепозитория |

## Backend

- Эндпоинты: `GET/POST/PATCH/DELETE /api/expenses`, `GET /api/expenses/stats`, `GET/POST /api/categories`, `GET/POST /api/buyers`
- Глобальный `AllExceptionsFilter` + `ValidationPipe` (whitelist, forbidNonWhitelisted)
- `synchronize: true` — TypeORM сам создаёт таблицы (для пет-проекта ок)
- Seed-данные категорий и покупателей лежат в `docker/db/init.sql`

## Frontend (FSD)

```
app/         — App.tsx, providers (Query, Theme)
pages/       — home/ (собирает виджеты и фичи)
widgets/     — expense-table/, expense-chart/
features/    — create-expense/, edit-expense/, filter-expenses/
entities/    — expense/, buyer/, category/ (api + lib/hooks + types)
shared/      — api/baseApi.ts, lib/, ui/
```

## БД (Buyer)

`buyer` — отдельная таблица с `name VARCHAR UNIQUE`. Сейчас два значения: Алексей, Анастасия. Расширяется через `POST /api/buyers`.

## Git

- Remote: `origin` → `https://github.com/domashnii22/my-ai-project.git`
- Default branch: `main`
- Не коммитить `.env`, `.opencode/`, `dist/`, `*.log`
