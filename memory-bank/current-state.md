# Current State

Estado del proyecto a **2026-05-29**, tras refactor frontend y creación de reglas + memory bank.

---

## Resumen ejecutivo

| Área | Estado | Notas |
|------|--------|-------|
| Frontend UI | ✅ Implementado | Dashboard completo con KPIs y 2 gráficos |
| Integración API | ⚠️ Parcial | Solo consume `GET /api/metrics` |
| Backend | ✅ Código listo | Mock API con tests; despliegue local depende de Python/Docker |
| Reglas agentes | ✅ Creadas | `.agents/rules/frontend-*.md` |
| Memory bank | ✅ Creado | Este directorio |
| Docker local | ⚠️ Instalado, WSL2 pendiente | Docker Desktop 4.74; daemon no arranca sin WSL |
| Dev local manual | ✅ Validado | Python 3.13 + uvicorn + npm run dev |

---

## Frontend — hecho

- [x] Layout dashboard (header, KPIs, gráficos)
- [x] Fetch vía `financial-api.ts` + `useFinancialData`
- [x] Cálculo KPIs y series mensuales en `financial-utils.ts`
- [x] Periodo dinámico (`derivePeriodLabel`)
- [x] Loading skeletons y banner de error
- [x] Tooltip compartido para gráficos
- [x] 7 tests Vitest en utilidades
- [x] Lint + build OK
- [x] Changelog en `frontend/README.md`
- [x] Proxy Vite configurable (`VITE_API_PROXY_TARGET`)

## Frontend — pendiente

- [ ] Filtros UI (fecha, categoría, B2B/B2C)
- [ ] Consumir `/api/metrics/summary`, `/facets`, `/alerts`, etc.
- [ ] Tests de componentes (Testing Library)
- [ ] Toggle tema claro/oscuro
- [ ] i18n unificado (hoy UI en inglés)

---

## Backend — contexto (sin foco de equipo)

- API mock funcional con 9+ endpoints
- 15 tests pytest
- No hay base de datos ni auth
- Datos determinísticos (`seed=42`)

---

## Riesgos y bloqueos conocidos

1. **Docker Desktop:** instalado pero requiere WSL2 (`wsl --install` como admin + reinicio) para `docker compose up`.
2. **Desalineación API/UI:** mucha capacidad analítica en backend sin pantalla.
3. **Seguridad en despliegue:** ver [`security-and-quality-review.md`](./security-and-quality-review.md).

---

## Flujo de datos actual

```
Browser → useFinancialData → fetchFinancialMovements
        → GET /api/metrics (proxy Vite → localhost:8000 o backend:8000 en Docker)
        → computeKPIs / computeMonthlyData / derivePeriodLabel
        → KPIRow + Charts
```

---

## Próximos pasos recomendados (equipo frontend)

1. Completar WSL2 + Docker Compose en el equipo
2. Añadir filtros de periodo en UI
3. Corregir bugs de timezone y profit chart (ver security review)
4. Documentar cada entrega en `frontend/README.md` changelog
