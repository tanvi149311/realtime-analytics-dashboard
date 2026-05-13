# 📊 Real-Time Analytics Dashboard

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)

A production-grade real-time analytics dashboard built with
React, TypeScript, and Recharts. Features live-updating metric
cards, streaming line charts, custom hooks, and full test coverage.

---

## ✨ Features

- **Live Metric Cards** — KPI cards updating every 2 seconds
  with trend indicators (↑ ↓ →)
- **Streaming Line Chart** — Rolling 20-point time-series chart
  with multiple data series
- **Custom React Hooks** — `useMetrics` and `useChartData`
  encapsulate all data logic
- **Type-Safe** — Fully typed with TypeScript interfaces
  and strict mode
- **Responsive Layout** — Works on desktop and tablet screens
- **Tested** — 24 unit and component tests with Vitest
  and React Testing Library
- **Dockerized** — Multi-stage Docker build served via Nginx

---

## 🛠 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | React 18 + TypeScript               |
| Build Tool  | Vite                                |
| Styling     | Tailwind CSS                        |
| Charts      | Recharts                            |
| Icons       | Lucide React                        |
| Date Utils  | date-fns                            |
| Testing     | Vitest + React Testing Library      |
| Container   | Docker + Nginx                      |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- npm v9+
- Docker (optional)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/realtime-analytics-dashboard.git

# 2. Navigate into the project
cd realtime-analytics-dashboard

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🐳 Docker

```bash
# Build the image
docker build -t realtime-analytics-dashboard .

# Run the container
docker run -p 8080:80 realtime-analytics-dashboard
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🧪 Tests

```bash
# Run all tests once
npm run test:run

# Run tests in watch mode
npm test

# Generate coverage report
npm run coverage
```

### Test Coverage
```
src/__tests__/
├── formatters.test.ts     # Utility function tests
├── MetricCard.test.tsx    # Component rendering tests
└── useMetrics.test.ts     # Custom hook behavior tests
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── ChartCard.tsx       # Chart wrapper component
│   │   └── LineChart.tsx       # Recharts line chart
│   ├── layout/
│   │   └── Header.tsx          # Top navigation bar
│   └── metrics/
│       ├── MetricCard.tsx      # Single KPI card
│       └── MetricsGrid.tsx     # Responsive card grid
├── hooks/
│   ├── useChartData.ts         # Live chart data hook
│   └── useMetrics.ts           # Live metrics hook
├── types/
│   └── index.ts                # TypeScript interfaces
├── utils/
│   └── formatters.ts           # Pure utility functions
├── constants/
│   └── index.ts                # App-wide constants
└── __tests__/
    ├── formatters.test.ts
    ├── MetricCard.test.tsx
    └── useMetrics.test.ts
```

---

## 🏗 Architecture Decisions

**Custom Hooks for Data Logic**
All data fetching and simulation lives in hooks (`useMetrics`,
`useChartData`), keeping components purely focused on rendering.
In production, these hooks would connect to a real WebSocket.

**Centralized Types**
All TypeScript interfaces live in `src/types/index.ts` —
a single source of truth that prevents type drift across files.

**Multi-Stage Docker Build**
Stage 1 builds the app with Node. Stage 2 serves it with
lightweight Nginx. This keeps the final image small and
production-ready.

---

## 📈 Roadmap

- [ ] WebSocket server integration
- [ ] Date range filtering
- [ ] Dark mode
- [ ] Export to CSV
- [ ] More chart types (bar, pie)

---

## 👩‍💻 Author

**Tanvi Pawale**
Senior Software Engineer
[LinkedIn](https://www.linkedin.com/in/tanvipawale) •
[GitHub](https://github.com/tanvi149311)
