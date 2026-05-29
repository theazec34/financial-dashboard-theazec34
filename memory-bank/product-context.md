# Product Context

Descripción de los **productos y conceptos de negocio** que modela el dashboard. No confundir con “productos de software”: aquí “producto” = unidad de valor o línea de negocio dentro del dominio financiero.

---

## 1. Financial Overview Dashboard (producto principal)

**Qué es:** Aplicación web de una sola página que resume la salud financiera de la empresa.

**Entrega actual:**

- Header con título y badge de periodo (derivado de los datos)
- 4 KPIs: Total Income, Total Outcome, Profit, Profit Margin
- 2 gráficos: Income vs Outcome (mensual), Profit Margin % (mensual)
- Estados: loading (skeletons), error (banner), empty (sin datos en gráficos)

**Fuente de datos:** `GET /api/metrics` → lista de movimientos; agregación en cliente vía `computeKPIs` y `computeMonthlyData`.

---

## 2. Movimiento financiero (entidad core)

Cada registro representa un ingreso o gasto puntual.

| Campo | Valores | Significado |
|-------|---------|-------------|
| `create_date` | ISO date | Fecha del movimiento |
| `amount` | number (USD) | Importe |
| `operation_type` | `income` \| `outcome` | Ingreso o gasto |
| `category` | `sales`, `suppliers`, `operational`, `administrative`, `others` | Clasificación contable |
| `business_type` | `B2B` \| `B2C` | Segmento de cliente |

**Ejemplo de uso en UI futura:** filtrar KPIs solo por ventas B2B o gastos operativos.

---

## 3. Líneas de negocio: B2B y B2C

Dos **productos comerciales** dentro del mismo grupo empresarial:

| Segmento | Perfil típico en datos mock | Uso en API |
|----------|----------------------------|------------|
| **B2B** | ~55% de movimientos; ingresos por ventas corporativas | `GET /api/metrics/b2b` |
| **B2C** | ~45%; ingresos retail/consumidor | `GET /api/metrics/b2c` |

**Estado en frontend:** endpoints B2B/B2C **no consumidos aún**. El dashboard muestra todos los movimientos agregados.

---

## 4. Categorías de movimiento (productos de coste/ingreso)

| Categoría | Tipo habitual | Rol en análisis |
|-----------|---------------|-----------------|
| `sales` | income | Ingresos principales (~90% de income) |
| `suppliers` | outcome | Proveedores |
| `operational` | outcome | Costes operativos |
| `administrative` | outcome | Gastos administrativos |
| `others` | ambos | Partidas misceláneas |

**API relacionada (no usada en UI):** `/api/metrics/categories/top`, filtros `?category=` en `/api/metrics`.

---

## 5. Métricas derivadas (productos analíticos)

Calculadas en frontend (`financial-utils.ts`) a partir de movimientos crudos:

| Métrica | Fórmula | Dónde se muestra |
|---------|---------|------------------|
| Total Income | Σ income | KPI card |
| Total Outcome | Σ outcome | KPI card |
| Profit | income − outcome | KPI card |
| Profit Margin | (profit / income) × 100 | KPI card + gráfico |
| Serie mensual | Agregación por `YYYY-MM` | Gráficos Recharts |
| Period label | Rango de fechas o “Full Year” | Header badge |

---

## 6. Capacidades analíticas de la API (producto futuro en UI)

Disponibles en backend, pendientes de pantalla:

| Capacidad | Endpoint | Valor para el usuario |
|-----------|----------|----------------------|
| Resumen agrupado | `/api/metrics/summary` | Tablas por día/semana/mes sin calcular en cliente |
| Facetas / filtros | `/api/metrics/facets` | Selectores de fecha y categoría |
| Comparación periodos | `/api/metrics/comparison` | Delta vs periodo anterior |
| Alertas de gasto | `/api/metrics/alerts` | Picos anómalos de outcome |
| Top categorías | `/api/metrics/categories/top` | Ranking de gastos/ingresos |

---

## 7. Productos de ingeniería (entregables del equipo)

| Entregable | Ubicación | Estado |
|------------|-----------|--------|
| Dashboard UI | `frontend/src/` | Funcional con `/api/metrics` |
| Capa API cliente | `frontend/src/api/` | `fetchFinancialMovements` |
| Hook de datos | `frontend/src/hooks/useFinancialData.ts` | Implementado |
| Reglas para agentes | `.agents/rules/` | 4 reglas frontend + índice |
| Changelog justificado | `frontend/README.md` | Activo |
| Memory bank | `memory-bank/` | Este directorio |
