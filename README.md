# Simple Train Tracker

**A real-time MBTA transit tracker for Boston trains and buses, built with React Native and Expo.**

## Screenshots

> _Add screenshots here — e.g., the stop list view, alert panel, and line picker._

## Features

- Live vehicle locations updated every 2.5 seconds across all MBTA subway and bus lines
- Stop-by-stop display showing which trains are stopped, boarding, or in transit
- Toggle between subway and bus modes with a single tap
- Inbound/outbound direction picker with terminal stop names shown inline
- Service alert panel per route, surfaced directly in the app
- Line color theming that updates the UI to match the selected route

## Tech Stack

`React Native` · `Expo` · `JavaScript` · `Railway` (backend hosting)

The app communicates with a custom Express server deployed on Railway, which proxies MBTA API requests and formats stop/vehicle data for the client.

## Getting Started

**Prerequisites:** Node.js, Expo CLI

```bash
npm install
```

**Run on device or simulator:**

```bash
npx expo start
```

Scan the QR code with Expo Go (iOS/Android) or press `i`/`a` to open in a simulator.

**Tunneling (useful on restricted networks, e.g., Windows with WSL):**

```bash
nvm use node
npx expo start --tunnel
```

## How It Works

The app polls a Railway-hosted backend every 2.5 seconds for vehicle positions via the MBTA V3 API. Each vehicle response includes a stop ID, which the app resolves to a human-readable stop name. Stop lists are fetched once on route or direction change; vehicle overlays are then rendered on top of the static stop list to show current locations and dwell status (`STOPPED_AT`, `IN_TRANSIT_TO`, `INCOMING_AT`).

Line colors are derived from the selected route ID and applied globally as a theme — background, buttons, and accent colors all update together.

## License

MIT License
