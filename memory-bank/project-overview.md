# Project Overview

## Nombre

**Financial Metrics Dashboard** (Panel de Métricas Financieras)

## Origen

Proyecto educativo de [4Geeks Academy](https://4geeksacademy.com/) — bootcamp de **Ingeniería de IA**. Los equipos forkan el repo, ejecutan agentes de IA sobre frontend/backend y documentan reglas en `.agents/` y contexto en `memory-bank/`.

## Objetivo

Construir un **dashboard ejecutivo** que visualice métricas financieras de una empresa ficticia: ingresos, gastos, beneficio neto y margen, con evolución mensual en gráficos.

## Alcance funcional (visión)

| Área | Descripción |
|------|-------------|
| Visualización | KPIs agregados + gráficos de tendencia |
| Datos | Movimientos financieros con tipo, categoría y segmento de negocio |
| Segmentación | Líneas B2B y B2C |
| Análisis (API) | Resúmenes, comparaciones, top categorías, alertas de gasto |

## Equipo y enfoque actual

- El equipo está **centrado en frontend** en esta fase.
- Backend existe como API mock pero no es prioridad de desarrollo del equipo.
- Convenciones frontend documentadas en `frontend/README.md` y `.agents/rules/`.

## Estructura del monorepo

```text
./
├── frontend/          # React + TypeScript (foco del equipo)
├── backend/           # FastAPI mock API
├── .agents/rules/     # Reglas para agentes de IA
├── memory-bank/       # Este banco de memoria
├── docker-compose.yml
└── README.es.md
```

## Usuario objetivo del dashboard

Ejecutivos o responsables financieros que necesitan una **vista rápida** del rendimiento anual: cuánto entra, cuánto sale, beneficio y margen, sin navegar hojas de cálculo.
