# Security & Quality Review

Revisión del código — **2026-05-29**. Proyecto demo con datos mock; riesgos críticos aplican si se despliega más allá de desarrollo local.

## Leyenda de severidad

| Nivel | Significado |
|-------|-------------|
| 🔴 CRITICAL | Explotable o RCE; corregir antes de cualquier despliegue |
| 🟠 HIGH | Riesgo de seguridad o fallo grave en producción |
| 🟡 MEDIUM | Bug o deuda que afecta calidad/confiabilidad |
| 🟢 LOW | Mejora recomendada |

---

## Vulnerabilidades y seguridad

| Sev | Issue | Ubicación | Acción |
|-----|-------|-----------|--------|
| 🔴 | **debugpy expuesto** en `0.0.0.0:5678` — RCE si el puerto es accesible | `backend/Dockerfile`, `docker-compose.yml` | Quitar de imagen prod; solo profile dev |
| 🟠 | **CORS `allow_origins=["*"]` + `allow_credentials=True`** | `backend/app/main.py` | Orígenes explícitos; credentials solo si hay auth |
| 🟠 | **Sin autenticación** en todos los endpoints | `backend/app/routes.py` | API keys / JWT antes de datos reales |
| 🟠 | **Dependencias Python sin pin** | `backend/requirements.txt` | Fijar versiones + `pip-audit` |
| 🟠 | **`uvicorn --reload` en Docker** | `backend/Dockerfile` | Solo desarrollo |
| 🟡 | **Sin validación runtime de JSON** en frontend | `financial-api.ts` | Zod u otro schema validator |
| 🟡 | **Swagger público** `/docs` | FastAPI defaults | Deshabilitar en prod |
| 🟡 | **npm audit: brace-expansion** (moderate, dev dep) | `node_modules` vía eslint | `npm audit fix` |
| 🟢 | Sin security headers (CSP, HSTS) | Backend / reverse proxy | Middleware o nginx |
| 🟢 | Sin rate limiting | API | Middleware cuando salga de demo |

**Positivo:** No hay SQL injection, shell injection, `eval`, ni `dangerouslySetInnerHTML`.

---

## Errores (bugs)

| Sev | Issue | Ubicación | Acción |
|-----|-------|-----------|--------|
| 🟡 | **Timezone en fechas ISO** — `new Date("2024-01-10")` puede cambiar de mes en UTC− | `financial-utils.ts` | Parsear `YYYY-MM-DD` como fecha local |
| 🟡 | **`random.seed()` global** no thread-safe | `backend/routes.py` | `random.Random(seed)` por request |
| 🟡 | **`hasData` en profit chart** — margen 0% oculta gráfico | `profit-percent-chart.tsx` | Usar `income > 0 \|\| outcome > 0` |
| 🟡 | **Comparación de fechas** sin validar `start <= end` | `get_metrics_comparison` | Validación 422 |
| 🟢 | **`IndexError` potencial** si movements vacío | `build_metrics_facets` | Guard clause |
| 🟢 | **JSON parse errors** poco descriptivos | `financial-api.ts` | try/catch en `.json()` |

**Corregido en esta sesión:** Proxy Vite solo Docker (`backend:8000`) → configurable con `VITE_API_PROXY_TARGET`.

---

## Mejoras de producto y arquitectura

| Prioridad | Mejora | Impacto |
|-----------|--------|---------|
| Alta | Filtros UI (fecha, categoría, B2B/B2C) | Usar capacidad real de la API |
| Alta | Consumir `/api/metrics/summary` | Evitar duplicar lógica cliente/servidor |
| Alta | Tests de componentes (Testing Library) | Cubrir loading/error/empty |
| Media | Error Boundary en React | Evitar pantalla en blanco |
| Media | Botón reintentar en error de carga | UX en `useFinancialData` |
| Media | CI (GitHub Actions): lint + test + build | Calidad en PRs |
| Media | Docker multi-stage frontend (build + nginx) | Imagen prod real |
| Media | `Decimal` para dinero en backend | Precisión financiera |
| Baja | Toggle tema claro/oscuro | Ya hay tokens CSS |
| Baja | Prettier unificado | Consistencia comillas |
| Baja | Healthchecks en docker-compose | Arranque ordenado |
| Baja | `.env` en `frontend/.gitignore` | Evitar commits accidentales |

---

## Roadmap sugerido (equipo frontend)

### Sprint 1 — Estabilidad
1. Fix timezone en `financial-utils.ts`
2. Fix `hasData` en profit chart
3. Validación Zod en `financial-api.ts`
4. Error Boundary + botón retry

### Sprint 2 — Features
1. Filtros con `/api/metrics/facets`
2. Selector de periodo
3. Vista B2B vs B2C

### Sprint 3 — Hardening (si hay despliegue)
1. Quitar debugpy del Dockerfile prod
2. CORS restrictivo
3. Pin de dependencias
4. CI pipeline

---

## Referencias

- Reglas frontend: [`.agents/rules/`](../.agents/rules/)
- Estado actual: [`current-state.md`](./current-state.md)
- Changelog: [`../frontend/README.md`](../frontend/README.md)
