# Dve Shepi Brashno

"Dve Shepi Brashno" is a full-featured e-commerce web application for authentic Bulgarian desserts, prepared with love and traditional childhood recipes. The platform provides a complete online shopping experience with product browsing, cart management, order placement, user profiles, and an admin panel for managing products and orders.

## 📋 Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Pages Overview](#pages-overview)
- [State Management](#state-management)
- [Firebase Integration](#firebase-integration)
- [Admin Panel](#admin-panel)
- [Styling & Theme](#styling--theme)
- [Node Version](#node-version)

## Requirements

- **Node.js**: version >= 22.12.0
- **Firebase account** (for backend services)

## Getting Started

1. Clone the repository

2. From the root directory, install dependencies:
	```sh
	npm install
	# or
	yarn install
	```

3. Configure Firebase:
   - Create a Firebase project
   - Update `src/config/firebase.ts` with your Firebase credentials

4. Start the application:
	```sh
	npm run dev
	# or
	yarn dev
	```

5. Build for production:
	```sh
	npm run build
	# or
	yarn build
	```

## Technologies Used

### Core Technologies
- **React 19** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server

### State Management & Routing
- **Redux Toolkit** - Global state management
- **React Router v7** - Client-side routing and navigation

### Styling
- **Styled Components** - CSS-in-JS styling solution
- **TailwindCSS** - Utility-first CSS framework

### Backend & Database
- **Firebase Authentication** - User authentication
- **Cloud Firestore** - NoSQL database
- **Firebase Storage** - File and image storage

### Additional Libraries
- **react-day-picker** - Date selection for delivery scheduling

## Features

### User Features
- 🛍️ **Product Catalog** - Browse cakes and desserts with detailed information
- 🛒 **Shopping Cart** - Add/remove items, adjust quantities
- 📅 **Delivery Scheduling** - Choose delivery or pickup dates
- 💳 **Checkout Process** - Complete order with customer details
- 👤 **User Profiles** - Manage personal information and profile image
- 📦 **Order History** - View past orders and their status
- ❌ **Order Cancellation** - Cancel orders before preparation
- ❓ **FAQ Section** - Comprehensive frequently asked questions
- 📞 **Contact Form** - Submit inquiries and questions
- 🎨 **DIY Section** - "Do It Yourself" recipes and ideas
- 🌓 **Dark/Light Mode** - Toggle between theme modes

### Admin Features
- 📊 **Dashboard** - Overview of store statistics
- ➕ **Product Management** - Create, edit, delete products
- 📷 **Image Upload** - Manage product images with Firebase Storage
- 📋 **Order Management** - View and manage customer orders
- 💬 **Inquiries** - Review customer questions and contact form submissions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── AppInput.tsx    # Universal input component
│   ├── Header.tsx      # Main navigation header
│   └── ...
├── pages/              # Page components
│   ├── Admin/          # Admin panel pages
│   ├── Authentication/ # Login, Register, Password Reset
│   ├── Cart/           # Shopping cart
│   ├── Checkout/       # Order finalization
│   ├── Contacts/       # Contact page
│   ├── DIY/            # DIY recipes
│   ├── FAQ/            # Frequently asked questions
│   ├── Home/           # Landing page
│   ├── MyProfile/      # User profile management
│   ├── OrderDetails/   # Individual order view
│   ├── ProductDetails/ # Product details page
│   └── Products/       # Product listing
├── store/              # Redux state management
│   ├── cartSlice.ts    # Shopping cart state
│   ├── productsSlice.ts # Products state
│   └── userSlice.ts    # User authentication state
├── services/           # API and database services
│   └── db/             # Firestore CRUD operations
├── navigation/         # Routing configuration
│   ├── AppRoutes.tsx   # Main route definitions
│   └── AdminRouteGuard.tsx # Admin access protection
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── config/             # Configuration files
│   ├── firebase.ts     # Firebase initialization
│   └── theme.ts        # Theme definitions
├── constants/          # App-wide constants
├── context/            # React Context providers
├── helpers/            # Utility functions
├── styles/             # Styled components
└── utils/              # Helper utilities
```

## Pages Overview

### Public Pages
- **HomePage** - Hero section with call-to-action buttons
- **ProductsPage** - Grid view of all available products
- **ProductDetailsPage** - Detailed product view with gallery, ingredients, and ordering
- **FAQPage** - Accordion-style frequently asked questions
- **ContactsPage** - Contact form and business information
- **DIYPage** - Do-it-yourself recipes and ideas
- **CartPage** - Shopping cart with item management
- **CheckoutPage** - Order finalization with delivery date picker
- **NotFoundPage** - 404 error page

### Authentication Pages
- **LoginPage** - User login
- **RegisterPage** - New user registration
- **ForgottenPasswordPage** - Password recovery

### Protected Pages (Requires Login)
- **MyProfilePage** - User profile with tabs for personal info, orders, and account deletion
- **OrderDetailsPage** - Detailed view of individual orders

### Admin Pages (Requires Admin Role)
- **AdminDashboardPage** - Admin statistics overview
- **AdminProductsPage** - Product list with CRUD operations
- **AdminCreateProductPage** - Create new product
- **AdminEditProductPage** - Edit existing product
- **AdminOrdersPage** - Manage customer orders
- **AdminInquiriesPage** - View customer inquiries

## State Management

The application uses Redux Toolkit for state management with three main slices:

### Cart Slice (`cartSlice.ts`)
- Manages shopping cart items
- Actions: `addItemToCart`, `removeItemFromCart`, `updateCartItemQuantity`, `clearCart`
- Automatically calculates total prices

### Products Slice (`productsSlice.ts`)
- Manages product catalog and individual product details
- Async thunks: `fetchProducts`, `fetchProductById`
- Handles loading states and errors

### User Slice (`userSlice.ts`)
- Manages user authentication state
- Actions: `setUser`, `clearUser`, `updateUser`
- Stores user profile information

## Firebase Integration

### Authentication
- Email/password authentication
- User profile creation and management
- Session persistence

### Firestore Database Collections
- **products** - Product catalog
- **users** - User profiles
- **orders** - Customer orders
- **inquiries** - Contact form submissions (planned)

### Storage
- Product images
- User profile pictures

## Admin Panel

The admin panel is protected by `AdminRouteGuard` which checks:
1. User is authenticated
2. User has `userType: "admin"`

Admin routes are prefixed with `/admin/` and use a dedicated `AdminLayout` with sidebar navigation.

## Styling & Theme

### Styled Components
All components use styled-components for styling with full TypeScript support.

### Theme System
- **Light Mode** - Beige background (`#f2ecdb`), warm colors
- **Dark Mode** - Dark background with adjusted contrast
- Responsive breakpoints: mobile, tablet, desktop
- Custom fonts: Bad Script, Podkova, Neucha

### Responsive Design
All pages are fully responsive with mobile-first approach using media queries defined in `theme.ts`.

## Node Version

The project requires Node.js >= 22.12.0. For easier version management, an `.nvmrc` file is included:
```
22.12.0
```
If you use nvm, simply run:
```sh
nvm use
```
to switch to the required Node version.

---

For questions and suggestions, use the contact form or visit our Instagram profile.

---
---

# Две шепи брашно

"Две шепи брашно" е пълнофункционално уеб приложение за електронна търговия с автентични български десерти, приготвени с любов и традиционни рецепти от детството. Платформата предоставя цялостно онлайн пазаруване с разглеждане на продукти, управление на количка, поръчки, потребителски профили и админ панел за управление на продукти и поръчки.

## 📋 Съдържание

- [Изисквания](#изисквания)
- [Стартиране](#стартиране)
- [Технологии](#технологии)
- [Функционалности](#функционалности)
- [Структура на проекта](#структура-на-проекта)
- [Страници](#страници)
- [Управление на състоянието](#управление-на-състоянието)
- [Firebase интеграция](#firebase-интеграция)
- [Админ панел](#админ-панел)
- [Стилизация и тема](#стилизация-и-тема)
- [Node версия](#node-версия)

## Изисквания

- **Node.js**: версия >= 22.12.0
- **Firebase акаунт** (за backend услугите)

## Стартиране

1. Клонирайте репозиторито

2. В коренната директория инсталирайте зависимостите:
	```sh
	npm install
	# или
	yarn install
	```

3. Конфигурирайте Firebase:
   - Създайте Firebase проект
   - Обновете `src/config/firebase.ts` с вашите Firebase credentials

4. Стартирайте приложението:
	```sh
	npm run dev
	# или
	yarn dev
	```

5. Build за продукция:
	```sh
	npm run build
	# или
	yarn build
	```

## Технологии

### Основни технологии
- **React 19** - UI библиотека
- **TypeScript** - Типова безопасност и по-добър developer experience
- **Vite** - Бърз build tool и dev server

### State Management & Routing
- **Redux Toolkit** - Глобално управление на състоянието
- **React Router v7** - Client-side routing и навигация

### Стилизация
- **Styled Components** - CSS-in-JS решение за стилизация
- **TailwindCSS** - Utility-first CSS framework

### Backend & Database
- **Firebase Authentication** - Потребителска автентикация
- **Cloud Firestore** - NoSQL база данни
- **Firebase Storage** - Съхранение на файлове и изображения

### Допълнителни библиотеки
- **react-day-picker** - Избор на дата за доставка

## Функционалности

### Потребителски функции
- 🛍️ **Каталог с продукти** - Разглеждане на торти и десерти с подробна информация
- 🛒 **Количка за пазаруване** - Добавяне/премахване на артикули, промяна на количества
- 📅 **Планиране на доставка** - Избор на дата за доставка или вземане
- 💳 **Процес на поръчка** - Финализиране на поръчка с данни на клиента
- 👤 **Потребителски профили** - Управление на лична информация и профилна снимка
- 📦 **История на поръчките** - Преглед на минали поръчки и техния статус
- ❌ **Анулиране на поръчка** - Отказване на поръчки преди приготвянето им
- ❓ **FAQ секция** - Изчерпателни често задавани въпроси
- 📞 **Контактна форма** - Изпращане на запитвания и въпроси
- 🎨 **DIY секция** - Рецепти и идеи "Направи си сам"
- 🌓 **Тъмен/Светъл режим** - Превключване между теми

### Админ функции
- 📊 **Dashboard** - Преглед на статистики на магазина
- ➕ **Управление на продукти** - Създаване, редакция, изтриване на продукти
- 📷 **Качване на изображения** - Управление на продуктови снимки с Firebase Storage
- 📋 **Управление на поръчки** - Преглед и управление на клиентски поръчки
- 💬 **Запитвания** - Преглед на клиентски въпроси и контактни формуляри

## Структура на проекта

```
src/
├── components/          # Преизползваеми UI компоненти
│   ├── admin/          # Админ-специфични компоненти
│   ├── AppInput.tsx    # Универсален input компонент
│   ├── Header.tsx      # Основна навигация
│   └── ...
├── pages/              # Страници
│   ├── Admin/          # Админ панел страници
│   ├── Authentication/ # Вход, Регистрация, Забравена парола
│   ├── Cart/           # Количка за пазаруване
│   ├── Checkout/       # Финализиране на поръчка
│   ├── Contacts/       # Контакти
│   ├── DIY/            # DIY рецепти
│   ├── FAQ/            # Често задавани въпроси
│   ├── Home/           # Начална страница
│   ├── MyProfile/      # Потребителски профил
│   ├── OrderDetails/   # Детайли на поръчка
│   ├── ProductDetails/ # Детайли на продукт
│   └── Products/       # Списък с продукти
├── store/              # Redux state management
│   ├── cartSlice.ts    # Състояние на количката
│   ├── productsSlice.ts # Състояние на продуктите
│   └── userSlice.ts    # Потребителско състояние
├── services/           # API и database услуги
│   └── db/             # Firestore CRUD операции
├── navigation/         # Routing конфигурация
│   ├── AppRoutes.tsx   # Основни route дефиниции
│   └── AdminRouteGuard.tsx # Админ защита
├── hooks/              # Custom React hooks
├── types/              # TypeScript типове
├── config/             # Конфигурационни файлове
│   ├── firebase.ts     # Firebase инициализация
│   └── theme.ts        # Теми
├── constants/          # Константи
├── context/            # React Context providers
├── helpers/            # Помощни функции
├── styles/             # Styled components
└── utils/              # Утилити
```

## Страници

### Публични страници
- **HomePage** - Hero секция с призовни бутони
- **ProductsPage** - Grid изглед на всички налични продукти
- **ProductDetailsPage** - Детайлен изглед на продукт с галерия, съставки и поръчване
- **FAQPage** - Често задавани въпроси в accordion стил
- **ContactsPage** - Контактна форма и бизнес информация
- **DIYPage** - "Направи си сам" рецепти и идеи
- **CartPage** - Количка с управление на артикули
- **CheckoutPage** - Финализиране на поръчка с избор на дата
- **NotFoundPage** - 404 грешка

### Автентикационни страници
- **LoginPage** - Вход
- **RegisterPage** - Регистрация
- **ForgottenPasswordPage** - Възстановяване на парола

### Защитени страници (изискват вход)
- **MyProfilePage** - Потребителски профил с табове за информация, поръчки и изтриване на акаунт
- **OrderDetailsPage** - Детайлен изглед на индивидуални поръчки

### Админ страници (изискват Admin роля)
- **AdminDashboardPage** - Преглед на админ статистики
- **AdminProductsPage** - Списък с продукти с CRUD операции
- **AdminCreateProductPage** - Създаване на нов продукт
- **AdminEditProductPage** - Редакция на съществуващ продукт
- **AdminOrdersPage** - Управление на клиентски поръчки
- **AdminInquiriesPage** - Преглед на клиентски запитвания

## Управление на състоянието

Приложението използва Redux Toolkit за управление на състоянието с три основни slice-а:

### Cart Slice (`cartSlice.ts`)
- Управлява артикулите в количката
- Действия: `addItemToCart`, `removeItemFromCart`, `updateCartItemQuantity`, `clearCart`
- Автоматично изчислява общите цени

### Products Slice (`productsSlice.ts`)
- Управлява каталога с продукти и детайли на индивидуални продукти
- Async thunks: `fetchProducts`, `fetchProductById`
- Управлява loading състояния и грешки

### User Slice (`userSlice.ts`)
- Управлява състоянието на потребителската автентикация
- Действия: `setUser`, `clearUser`, `updateUser`
- Съхранява информация за потребителския профил

## Firebase интеграция

### Автентикация
- Email/password автентикация
- Създаване и управление на потребителски профили
- Запазване на сесията

### Firestore Database колекции
- **products** - Каталог с продукти
- **users** - Потребителски профили
- **orders** - Клиентски поръчки
- **inquiries** - Контактни формуляри (планирано)

### Storage
- Снимки на продукти
- Профилни снимки на потребители

## Админ панел

Админ панелът е защитен от `AdminRouteGuard`, който проверява:
1. Потребителят е автентикиран
2. Потребителят има `userType: "admin"`

Админ маршрутите започват с `/admin/` и използват специален `AdminLayout` със sidebar навигация.

## Стилизация и тема

### Styled Components
Всички компоненти използват styled-components за стилизация с пълна TypeScript поддръжка.

### Тема система
- **Светъл режим** - Бежов фон (`#f2ecdb`), топли цветове
- **Тъмен режим** - Тъмен фон с адаптиран контраст
- Responsive breakpoints: mobile, tablet, desktop
- Персонализирани шрифтове: Bad Script, Podkova, Neucha

### Responsive дизайн
Всички страници са напълно responsive с mobile-first подход, използвайки media queries дефинирани в `theme.ts`.

## Node версия

Проектът изисква Node.js >= 22.12.0. За по-лесно управление на версиите е добавен файл `.nvmrc`:
```
22.12.0
```
Ако използвате nvm, просто изпълнете:
```sh
nvm use
```
за да превключите към нужната версия.

---

За въпроси и предложения използвайте контактната форма или посетете нашия Instagram профил.

---
За въпроси и предложения използвайте формата за контакт или Instagram профила.
# Две шепи брашно

"Две шепи брашно" е уеб приложение за автентични български десерти, приготвени с любов и традиционни рецепти от детството ни. Платформата позволява разглеждане на продукти, поръчки, често задавани въпроси и управление на профил.

## Изисквания

- **Node.js**: версия >= 22.12.0
- **Yarn**: инсталирайте глобално с `npm install -g yarn`

## Стартиране на проекта

1. Клонирайте репозиторито
2. В коренната директория изпълнете:
	```sh
	yarn install
	```
3. Стартирайте приложението:
	```sh
	yarn dev
	```

## Технологии

- React 19
- Redux Toolkit
- React Router
- Styled Components
- TailwindCSS
- Firebase
- TypeScript
- Vite

## Бележки

- Препоръчително е да използвате Node.js >= 22.12.0. Може да добавите файл `.nvmrc` или `.node-version` с:
  ```
  22.12.0
  ```
  за по-лесно управление на версиите.

---
За въпроси и предложения използвайте формата за контакт или Instagram профила.
