# Доктор Панг

Интернет-витрина на Next.js 16, React 19, Tailwind CSS 4 и встроенном в Node.js SQLite.

## Запуск

Требуется Node.js 24 и pnpm 11.

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Сайт: http://localhost:3000

Админка: http://localhost:3000/admin

В development без `.env.local` пароль админки — `admin`. В production обязательно задайте `ADMIN_PASSWORD` и `ADMIN_SESSION_SECRET`.

Для почтовых уведомлений заполните `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` и `MAIL_TO`. Без этих значений заявки продолжат сохраняться в админке, но письмо отправляться не будет.

База создаётся автоматически в `data/trepang.sqlite` и при первом запуске наполняется товарами старого Nuxt-сайта. Загруженные через админку изображения сохраняются в `public/uploads`.

SQLite и локальные загрузки требуют постоянного диска, поэтому приложение рассчитано на self-hosted Node/VPS, а не на эфемерный serverless filesystem.

## Проверка

```bash
pnpm check
```
