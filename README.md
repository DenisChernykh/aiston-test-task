# Aiston Test Task Frontend

## Кратко о проекте

Проект реализует тестовое задание по макету Figma: экран заявок с адаптивной версткой, базовой интерактивностью и моковыми данными на стеке React + Vite + Chakra UI + TypeScript.

- Сделаны отдельные desktop/mobile представления с адаптивным поведением.
- Реализовано переключение табов по статусам заявок.
- Реализовано создание заявки через модалку (`Dialog` на desktop, `Drawer` на mobile).
- В модалке работают `Select`-поля с моковыми опциями и прикрепление файлов.
- После нажатия «Создать заявку» модалка закрывается, а данные выводятся в консоль (`createRequestDraft`).
- Добавлены поиск, фильтры таблицы, hover/focus-состояния и состояния `loading` / `empty` / `error`.

## Ссылки

- Репозиторий: [DenisChernykh/aiston-test-task](https://github.com/DenisChernykh/aiston-test-task)
- Макет Figma: [Тестовое задание Frontend](https://www.figma.com/design/GjDSK9UrOocDmrAwk3dS00/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-Frontend--Copy-?node-id=0-1&p=f&t=M4rSO16fG6smfNOV-0)

## Быстрый запуск

```bash
pnpm install
pnpm dev
```

Приложение в dev-режиме: `http://localhost:5173`.

Production-сборка и preview:

```bash
pnpm build
pnpm preview
```

## Проверка за 3 минуты

1. Открыть `http://localhost:5173`, переключить табы статусов и убедиться, что список меняется.
2. Включить «Показать только мои» и ввести текст в поле поиска, проверить фильтрацию.
3. Нажать «Создать новую заявку», заполнить форму, выбрать значения в выпадающих списках, прикрепить файл.
4. Нажать «Создать заявку» и проверить:
   - форма закрылась;
   - в консоли браузера есть `createRequestDraft` с данными формы.

---

## Стек

- React 19 + TypeScript
- Vite 7
- Chakra UI 3
- react-hook-form + zod (валидация формы)
- date-fns (форматирование дат)

## Скрипты

| Команда | Назначение |
| --- | --- |
| `pnpm dev` | Запуск dev-сервера Vite |
| `pnpm build` | TypeScript-check + production build |
| `pnpm preview` | Локальный просмотр production build |
| `pnpm lint` | Проверка ESLint |
| `pnpm format` | Форматирование Prettier |
| `pnpm format:check` | Проверка форматирования |
| `pnpm chakra:typegen` | Генерация Chakra type tokens |
| `pnpm test` | Запуск unit/UI тестов |
| `pnpm test:watch` | Запуск тестов в watch-режиме |

## Тесты

Тестовый стек:

- `Vitest`
- `@testing-library/react`
- `happy-dom`

Покрытые smoke UI-сценарии:

- `RequestSearchField` — рендер плейсхолдера и вызов `onChange`.
- `RequestOnlyMineToggle` — переключение `aria-pressed` и вызов `onChange`.
- `RequestStatusBadge` — корректный текст для всех статусов.

## Маппинг требований к реализации

### 1. Верстка desktop/mobile на Chakra UI — ✅
- Файлы:
  - [`src/pages/requests/ui/requests-page.tsx`](src/pages/requests/ui/requests-page.tsx)
  - [`src/widgets/header/ui/header.desktop.tsx`](src/widgets/header/ui/header.desktop.tsx)
  - [`src/widgets/header/ui/header.mobile.tsx`](src/widgets/header/ui/header.mobile.tsx)
  - [`src/widgets/requests-table/ui/requests-table.desktop.tsx`](src/widgets/requests-table/ui/requests-table.desktop.tsx)
  - [`src/widgets/requests-table/ui/requests-table.mobile.tsx`](src/widgets/requests-table/ui/requests-table.mobile.tsx)
- Комментарий: раздельные представления для брейкпоинтов `base/md`.

### 2. Адаптивность и отзывчивость — ✅
- Файлы:
  - [`src/shared/config/theme/system.ts`](src/shared/config/theme/system.ts)
  - [`src/widgets/requests-toolbar/ui/requests-toolbar.tsx`](src/widgets/requests-toolbar/ui/requests-toolbar.tsx)
- Комментарий: кастомные токены/размеры и mobile floating-actions.

### 3. Переключение по табам — ✅
- Файл: [`src/features/request-filters/ui/request-status-tabs.tsx`](src/features/request-filters/ui/request-status-tabs.tsx)
- Комментарий: табы статусов + отдельный порядок на mobile.

### 4. Создание заявки через модалку — ✅
- Файлы:
  - [`src/features/request-create/ui/request-create-modal.tsx`](src/features/request-create/ui/request-create-modal.tsx)
  - [`src/features/request-create/ui/request-create-modal.desktop.tsx`](src/features/request-create/ui/request-create-modal.desktop.tsx)
  - [`src/features/request-create/ui/request-create-modal.mobile.tsx`](src/features/request-create/ui/request-create-modal.mobile.tsx)
- Комментарий: `Dialog` на desktop, `Drawer` на mobile.

### 5. Select с моковыми данными в модалке — ✅
- Файлы:
  - [`src/features/request-create/ui/request-native-select-field.tsx`](src/features/request-create/ui/request-native-select-field.tsx)
  - [`src/features/request-create/model/use-request-create-form-options.ts`](src/features/request-create/model/use-request-create-form-options.ts)
  - [`src/entities/request/api/request-db.mock.ts`](src/entities/request/api/request-db.mock.ts)
- Комментарий: данные аптек/категорий/приоритетов из mock API.

### 6. Подгрузка фотографий/файлов — ✅
- Файлы:
  - [`src/features/request-create/ui/request-create-files-field.desktop.tsx`](src/features/request-create/ui/request-create-files-field.desktop.tsx)
  - [`src/features/request-create/ui/request-create-files-field.mobile.tsx`](src/features/request-create/ui/request-create-files-field.mobile.tsx)
- Комментарий: drag-and-drop на desktop, attach-кнопка на mobile.

### 7. Кнопка «Создать»: закрытие модалки и лог в консоль — ✅
- Файл: [`src/features/request-create/model/use-request-create-modal-controller.ts`](src/features/request-create/model/use-request-create-modal-controller.ts)
- Комментарий: лог `createRequestDraft` + закрытие и reset формы.

### 8. Фильтрация таблицы (доп. улучшение) — ✅
- Файлы:
  - [`src/widgets/requests-table/model/use-requests-table-view-model.ts`](src/widgets/requests-table/model/use-requests-table-view-model.ts)
  - [`src/widgets/requests-table/model/request-table-column-filters.ts`](src/widgets/requests-table/model/request-table-column-filters.ts)
  - [`src/widgets/requests-table/ui/requests-table.desktop.tsx`](src/widgets/requests-table/ui/requests-table.desktop.tsx)
  - [`src/features/request-filters/ui/request-filters-row.tsx`](src/features/request-filters/ui/request-filters-row.tsx)
  - [`src/features/request-search/ui/request-search-field.tsx`](src/features/request-search/ui/request-search-field.tsx)
- Комментарий: верхние фильтры (статус, «только мои», поиск) + колоночные фильтры для `Приоритет`, `Категория`, `Техник`.

### 9. Hover/focus/active эффекты — ✅
- Файл: [`src/shared/config/theme/recipes/button.recipe.ts`](src/shared/config/theme/recipes/button.recipe.ts)
- Комментарий: состояния кнопок и интерактивных элементов.

### 10. Loading/empty/error состояния — ✅
- Файлы:
  - [`src/widgets/requests-table/ui/requests-table.loading.tsx`](src/widgets/requests-table/ui/requests-table.loading.tsx)
  - [`src/widgets/requests-table/ui/requests-table.empty.tsx`](src/widgets/requests-table/ui/requests-table.empty.tsx)
  - [`src/widgets/requests-table/ui/requests-table.error.tsx`](src/widgets/requests-table/ui/requests-table.error.tsx)
- Комментарий: добавлены скелетоны, пустые и error-экраны.

### 11. Моковые данные — ✅
- Файл: [`src/entities/request/api/request-db.mock.ts`](src/entities/request/api/request-db.mock.ts)
- Комментарий: локальная база заявок + опции формы.

## Скриншоты

### Desktop: основной экран

![Desktop main](docs/screenshots/desktop-main.png)

### Mobile: основной экран

![Mobile main](docs/screenshots/mobile-main.png)

### Desktop: модалка создания заявки

![Desktop create modal](docs/screenshots/desktop-create-modal.png)

### Mobile: модалка создания заявки

![Mobile create modal](docs/screenshots/mobile-create-modal.png)

## Детальная проверка сценариев

1. Запустить проект (`pnpm dev`) и открыть `http://localhost:5173/`.
2. Проверить desktop/mobile UI через DevTools Responsive Mode.
3. Переключать табы статусов и toggle «Показать только мои», проверить фильтрацию таблицы.
4. Ввести текст в поиск, убедиться в фильтрации по номеру и теме.
5. В desktop нажать иконки фильтра в заголовках:
   - для `Приоритет`, `Категория`, `Техник` открывается popover с чекбоксами;
   - для остальных колонок показывается подсказка `Фильтр для этой колонки не предусмотрен`.
6. Проверить, что колоночные фильтры работают совместно со статусом/поиском/«только мои» и сбрасываются кнопкой `Сбросить фильтры`.
7. Нажать «Создать новую заявку», заполнить поля, прикрепить файл и отправить форму.
8. После клика «Создать заявку» проверить:
   - модалка закрылась;
   - в консоли браузера появился лог `createRequestDraft`.
9. Проверить мок-состояния данных по URL:
   - `http://localhost:5173/?requestsState=empty`
   - `http://localhost:5173/?requestsState=error`
   - `http://localhost:5173/?createRequestState=empty`
   - `http://localhost:5173/?createRequestState=error`

## Известные ограничения и нюансы

- Даты части строк в таблице генерируются динамически от текущего времени (через `createMockDate`), поэтому могут отличаться от статичных значений в макете.
- Иконка фильтра показана во всех заголовках desktop-таблицы по макету; рабочие фильтры доступны для `Приоритет`, `Категория`, `Техник`.
