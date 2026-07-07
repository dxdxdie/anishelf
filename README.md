# anishelf

Учебный проект — трекер аниме на Next.js (App Router), использующий публичное [Jikan API](https://jikan.moe/) (неофициальный REST API для MyAnimeList).

## Стек

- [Next.js 16](https://nextjs.org/) (App Router)
- React 19
- [TanStack Query](https://tanstack.com/query/latest) — кэширование и загрузка данных
- Tailwind CSS 4
- TypeScript

## Структура

```
app/(routes)/      страницы: главная, поиск, библиотека, профиль
comp/layout/       header, footer
comp/providers/    QueryClientProvider
hooks/             хуки для запросов (useTopAnime и др.)
lib/jikan.ts       клиент Jikan API
types/anime.ts     типы ответов Jikan API
```

## Начало работы

Установить зависимости и запустить dev-сервер:

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

## Скрипты

- `npm run dev` — запуск в режиме разработки
- `npm run build` — сборка
- `npm run start` — запуск production-сборки
- `npm run lint` — линтинг

## Статус

Проект в разработке: сейчас реализована загрузка топ-аниме на главной странице через TanStack Query; страницы поиска, библиотеки и профиля — заглушки.
