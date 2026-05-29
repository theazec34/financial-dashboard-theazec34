# Tech Stack

## Resumen

| Capa | Tecnologías |
|------|-------------|
| Frontend | React 19, TypeScript 6, Vite 8, Tailwind CSS 4, Recharts, Lucide |
| Backend | FastAPI, Python 3.13, Pydantic, Uvicorn |
| Tests | Vitest (frontend), pytest (backend) |
| Contenedores | Docker Compose (frontend + backend) |
| Tooling | ESLint 9, shadcn/ui (New York), path alias `@/` |

---

## Frontend (`frontend/`)

### Runtime y build

- **Vite 8** — dev server `:5173`, HMR, proxy `/api`
- **TypeScript** — `strict`-ish (`noUnusedLocals`, `verbatimModuleSyntax`)
- **React 19** — StrictMode en `main.tsx`

### UI y estilos

- **Tailwind CSS 4** — `@tailwindcss/vite`, tokens en `index.css` (oklch)
- **shadcn/ui** — `Card`, `Skeleton`; convención `cn()` + CVA
- **Recharts 3** — gráficos de líneas
- **Lucide React** — iconos en KPIs y header

### Arquitectura de código

```text
src/api/          → HTTP (financial-api.ts)
src/hooks/        → useFinancialData
src/lib/          → tipos, utils puras, tests
src/components/   → dashboard + ui
App.tsx           → composición
```

### Variables de entorno

| Variable | Uso |
|----------|-----|
| `VITE_API_BASE_URL` | Origen del backend (opcional; vacío = proxy Vite) |

### Scripts

```bash
npm run dev      # :5173
npm run build    # tsc + vite build
npm run test     # vitest
npm run lint     # eslint
```

---

## Backend (`backend/`) — referencia

> El equipo no está desarrollando backend activamente; se documenta para integración.

- **FastAPI** — OpenAPI en `/docs`
- **Datos mock** — `generate_mock_movements(seed=42)`, 360 registros/año
- **CORS** — `allow_origins=["*"]`
- **Debug** — debugpy en `:5678` dentro de Docker

### Endpoints principales

- `GET /health`
- `GET /api/metrics` (+ filtros query)
- `GET /api/metrics/summary`, `/facets`, `/comparison`, `/alerts`, `/b2b`, `/b2c`, etc.

---

## Infraestructura

### Docker Compose

```yaml
frontend:5173  → depends_on backend
backend:8000   → uvicorn --reload
backend:5678   → debugpy
```

### Proxy Vite (desarrollo)

```ts
// vite.config.ts
proxy: { "/api": { target: "http://backend:8000" } }
```

**Nota:** El target `backend:8000` resuelve dentro de Docker Compose. En desarrollo local sin Docker, el proxy debe apuntar a `http://localhost:8000` o hay que levantar ambos servicios manualmente.

---

## Agentes de IA

| Recurso | Path |
|---------|------|
| Reglas | `.agents/rules/` |
| Memory bank | `memory-bank/` |
| Guía | `AGENTS.md` |

---

## Versiones clave (package.json / requirements)

**Frontend dependencies:** react ^19.2.4, recharts ^3.8.1, tailwindcss ^4.2.2, vite ^8.0.4

**Backend:** fastapi, uvicorn[standard], pytest, httpx
