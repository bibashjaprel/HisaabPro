# HisaabPro (Expo React Native MVP v1)

HisaabPro is an offline-first Nepali expense tracker mobile app built with Expo + React Native + TypeScript.

## Tech Stack

- Expo + React Native
- TypeScript
- Expo Router (root: `src/app`)
- NativeWind (Tailwind)
- Zustand + AsyncStorage persistence
- React Hook Form + Zod validation
- react-native-gifted-charts
- Expo Haptics
- Expo Splash Screen
- Expo Image
- ESLint + Prettier

## Features Implemented

- Splash + onboarding flow
- Home dashboard with balance, income, expense, quick category actions, recent transactions
- Center floating Add action with Add Expense / Add Income
- Add Expense and Add Income with:
  - amount validation (`> 0`)
  - quick amount chips
  - category selector
  - note
  - payment method selector
  - haptic feedback on save
- Reports screen with daily/weekly/monthly/yearly filters
- Monthly selector with previous/next month controls
- Donut and bar charts
- Transaction detail with edit and delete confirmation
- Category management (default categories locked from delete)
- Search and filters:
  - keyword
  - type
  - payment method
  - category
  - month
- Profile and settings (NPR currency, dark mode UI toggle, placeholders)
- Full offline persistence for transactions/categories/settings

## Currency Rules

- Default and fixed currency: NPR
- Uses `Rs` and `रु`
- Does not use Indian `₹` symbol in app logic

## Project Structure

```txt
src/
  app/
    _layout.tsx
    index.tsx
    onboarding.tsx
    splash.tsx
    (tabs)/
      _layout.tsx
      home.tsx
      reports.tsx
      profile.tsx
    transaction/
      [id].tsx
    add-expense.tsx
    add-income.tsx
    categories.tsx
    search.tsx

  components/
    ui/
    cards/
    charts/
    forms/
    navigation/
    transactions/

  store/
    transactionStore.ts
    categoryStore.ts
    settingsStore.ts

  lib/
    storage.ts
    formatCurrency.ts
    date.ts
    calculations.ts

  constants/
    colors.ts
    categories.ts

  types/
    transaction.ts
    category.ts
    settings.ts
```

## Setup

```bash
npm install
npx expo start
```

Then press:
- `a` for Android
- `i` for iOS (macOS)
- `w` for web

## App Config

- App icon: `assets/icon.png` (from uploaded assets)
- Splash: `assets/splash.png` (from uploaded assets)
- `app.json` configured for app name, slug, Android package, splash, adaptive icon

## Scripts

```bash
npm run lint
npm run format
npx tsc --noEmit
```

## Play Store v1 Testing Checklist

- Install on at least 3 common Android screen sizes
- Verify splash and icon quality on install launcher
- Complete onboarding once, relaunch app, confirm onboarding does not repeat
- Add/edit/delete expense and income; verify persistence after app restart
- Validate amount errors (`0`, empty, non-numeric)
- Verify payment methods and category mapping in transaction detail
- Ensure default categories cannot be deleted
- Verify custom categories can be added/edited/deleted
- Check reports totals and charts across all filters
- Test search + filters together (type/payment/category/month)
- Toggle dark mode UI switch and ensure setting persists
- Verify no `₹` symbol appears anywhere
- Test offline mode (airplane mode) for all core flows
- Run lint and TypeScript checks before release
