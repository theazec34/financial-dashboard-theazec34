# Services Validation

Validación ejecutada el **2026-05-29** (segunda pasada, con backend activo).

## Resumen

| Servicio | URL | Estado | Evidencia |
|----------|-----|--------|-----------|
| Frontend | http://localhost:5173 | ✅ OK | HTTP 200, KPIs con datos reales |
| Backend | http://localhost:8000 | ✅ OK | `/health` → `{"status":"ok"}` |
| API Docs | http://localhost:8000/docs | ✅ OK | Swagger UI "Financial Metrics API" |
| Integración E2E | Frontend → `/api/metrics` | ✅ OK | KPIs: $1,258,147 income, gráficos cargados |

---

## Instalación realizada en esta sesión

| Componente | Resultado |
|------------|-----------|
| Docker Desktop 4.74.0 | ✅ Instalado vía winget |
| WSL2 | ❌ No instalado (requiere admin + posible reinicio) |
| Docker daemon | ❌ No arranca sin WSL2 |
| Python 3.13.13 | ✅ Instalado vía winget |
| Backend manual | ✅ `uvicorn app.main:app --port 8000` |

### Para completar Docker

Ejecutar **PowerShell como administrador** y luego reiniciar:

```powershell
wsl --install
```

Tras reinicio, abrir Docker Desktop y ejecutar:

```bash
docker compose up --build
```

---

## Validación detallada

### Backend — http://localhost:8000 ✅

```bash
curl http://localhost:8000/health
# {"status":"ok"}

curl -o /dev/null -w "%{http_code}" http://localhost:8000/docs
# 200

curl http://localhost:8000/api/metrics
# JSON array, 360 movimientos (seed=42)
```

Endpoints visibles en Swagger: `/health`, `/api/metrics`, `/facets`, `/summary`, `/comparison`, `/alerts`, `/b2b`, `/b2c`.

### Frontend — http://localhost:5173 ✅

- Título: Financial Metrics Dashboard
- Datos cargados vía proxy → `localhost:8000`
- KPIs renderizados: Total Income, Outcome, Profit, Profit Margin
- Gráficos Income vs Outcome y Profit Margin % activos
- Periodo dinámico en header

### Fix aplicado para dev local

`vite.config.ts` usa `VITE_API_PROXY_TARGET` (default `http://localhost:8000`). Docker Compose define `VITE_API_PROXY_TARGET=http://backend:8000` para el servicio frontend.

---

## Comandos para re-validar

```bash
# Terminal 1 — Backend
cd backend && pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000

# Terminal 2 — Frontend
cd frontend && npm install && npm run dev
```

Checklist:

- [x] `GET /health` → ok
- [x] `GET /docs` → Swagger
- [x] `GET /api/metrics` → JSON
- [x] http://localhost:5173 → KPIs numéricos
- [x] Gráficos con datos
- [ ] `docker compose up` (pendiente WSL2)
