# Time Tracker

A desktop time tracker built with Nuxt 4 and Tauri 2.

## Features
- Start/Stop timer with Shortcut "CmdOrControl+Option+T"
- Start/Stop/Pause/Resume timer through UI in system tray
- Idle notification after a specific idle time (default: 10 minutes)


## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the Tauri app with the Nuxt development server on `http://localhost:3000`:

```bash
npm run tauri dev
```

## Production

Build the application for production:

```bash
npm run tauri build
```

To verify only the macOS app bundle without creating a DMG:

```bash
npm run tauri build -- --bundles app
```
