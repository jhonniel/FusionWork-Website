# FUSION WORK — SaaS Company Website

A modern, futuristic marketing website for **FUSION WORK**, a software development and digital solutions company based in Davao City, Philippines.

## Tech Stack

- **React Native** + **Expo** (iOS, Android, Web)
- **TypeScript**
- **React Navigation** (native stack)
- **NativeWind** (Tailwind CSS)
- **React Native Reanimated** (animations)
- **Expo Linear Gradient** & **Expo Blur** (glassmorphism)

## Features

- Dark/light theme toggle (persisted)
- Animated loading screen
- Responsive layout (mobile, tablet, desktop)
- Glassmorphism UI with neon accents
- Particle background & scroll progress
- Web cursor glow effect
- Pages: Home, About, Services, Portfolio, Contact
- Bonus: Pricing, Blog preview, FAQ sections

## Getting Started

```bash
npm install
npm run web      # Browser (recommended for desktop layout)
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run build    # Static web export → dist/
```

## Deploy on Vercel

1. Push this repo to GitHub (or connect your Git provider in Vercel).
2. [Import the project](https://vercel.com/new) in Vercel — no framework preset is required; `vercel.json` sets the build.
3. Use the defaults (or confirm):
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install`
4. Deploy. Vercel runs `expo export --platform web` and serves the static site from `dist/`.

Client routes (`/about`, `/services`, etc.) are handled by React Navigation with SPA rewrites to `index.html`.

To verify locally before deploying:

```bash
npm run build
npx serve dist
```

## Project Structure

```
src/
  components/
    layout/     # Navbar, Footer, Loading, FAB, particles
    sections/   # Page sections (Hero, Services, etc.)
    ui/         # Reusable UI primitives
  constants/    # Company data, services, portfolio
  context/      # Theme provider
  hooks/        # Responsive breakpoints
  navigation/   # React Navigation stack
  screens/      # Route screens
  theme/        # Color tokens
```

## Company Contact

- **Phone:** +63 976 016 0087
- **Location:** Davao City, Philippines
- **Facebook:** [thefusionwork](https://www.facebook.com/thefusionwork/)
