# Simple Train Tracker

**A real-time MBTA transit tracker for Boston trains and buses, built with React Native and Expo.**

[![Available on the App Store](https://img.shields.io/badge/App%20Store-Download-blue?logo=apple)](https://apps.apple.com/us/app/mbta-train-bus-tracker/id6748243506)

> "The most reliable, simple, and easy to use MBTA train tracker on the App Store." — App Store review

**100+ downloads · 5.0 stars on the App Store · Free**

## Screenshots

<img width="1964" height="1031" alt="image" src="https://github.com/user-attachments/assets/62350289-c5a2-41e7-8cb1-19fd5363066a" />

## Features

- Live vehicle locations updated every 2.5 seconds across all MBTA subway and bus lines
- Stop-by-stop display showing which trains are stopped, boarding, or in transit
- Hold down on any stop to see the arrival time for that stop
- Toggle between subway and bus modes with a single tap
- Inbound/outbound direction picker with terminal stop names shown inline
- Service alert panel per route, surfaced via the top-right icon
- Line color theming that updates the entire UI to match the selected route
- Compatible with iPhone, iPad, Mac (macOS 12.0+), and Apple Vision

## Tech Stack

`React Native` · `Expo` · `JavaScript` · `Node.js / Express` · `Railway` (backend hosting)

The app communicates with a [custom Express backend](https://github.com/aaronmaster303/Simple-Train-Tracker-App-Server) deployed on Railway, which proxies MBTA V3 API requests and formats stop/vehicle data for the client.

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

## Related

**Web version:** A companion web app with the same functionality is available at [personal-train-tracker.netlify.app](https://personal-train-tracker.netlify.app/) ([source](https://github.com/aaronmaster303/Personal-Train-Tracker)) — built with vanilla HTML/CSS/JS and used by 300+ active users.

## Backend

The server that powers this app is open source: [Simple-Train-Tracker-App-Server](https://github.com/aaronmaster303/Simple-Train-Tracker-App-Server)

## Privacy Policy

[View Privacy Policy](https://aaronmaster303.github.io/MBTA-Train-Bus-Tracker-Privacy-Policy/) — no user data is collected by this app.

## License

MIT License
