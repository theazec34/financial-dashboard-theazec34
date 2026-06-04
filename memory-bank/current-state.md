# Current State

Estado del proyecto a **2026-06-04**, tras mejoras de accesibilidad, rendimiento y mantenimiento operativo.

---

## Resumen ejecutivo

| Área             | Estado                       | Notas                                                                     |
| ---------------- | ---------------------------- | ------------------------------------------------------------------------- |
| Frontend UI      | ✅ Implementado              | Dashboard completo con KPIs y 2 gráficos                                  |
| Integración API  | ⚠️ Parcial                   | Solo consume `GET /api/metrics`                                           |
| Backend          | ✅ Código listo              | Mock API con tests; despliegue local depende de Python/Docker             |
| Reglas agentes   | ✅ Creadas                   | `.agents/rules/frontend-*.md`                                             |
| Skills agentes   | ✅ Activas                   | `accessibility`, `vercel-react-best-practices`, `operational-maintenance` |
| Memory bank      | ✅ Actualizado               | Documentación alineada con cambios del 2026-06-04                         |
| Docker local     | ⚠️ Instalado, WSL2 pendiente | Docker Desktop 4.74; daemon no arranca sin WSL                            |
| Dev local manual | ✅ Validado                  | `npm run lint`, `npm run test`, `npm run build`, `pytest -q` en verde     |

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
- [x] Skip link + `aria-busy` + `role="status"` para carga/empty states
- [x] `:focus-visible` global y `prefers-reduced-motion`
- [x] Code splitting de gráficos con `React.lazy` + `Suspense`
- [x] Optimización de `computeKPIs` a un solo bucle

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
3. **Dependencias frontend:** `npm audit` reporta 2 vulnerabilidades moderadas (`postcss`, `brace-expansion`) con fix disponible.
4. **Seguridad en despliegue:** ver [`security-and-quality-review.md`](./security-and-quality-review.md).

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
3. Corregir bug de timezone en `financial-utils.ts` (parseo de fechas)
4. Aplicar `npm audit fix` y revalidar `lint/test/build`
5. Documentar cada entrega en `frontend/README.md` changelog
