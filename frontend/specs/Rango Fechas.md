# Filtro de rango de fechas

## Objetivo
Permitir que el equipo de finanzas analice periodos concretos sin ver todo el historico al mismo tiempo.

## Alcance funcional
- Agregar dos inputs de fecha en la parte superior del dashboard principal:
	- Fecha de inicio
	- Fecha de fin
- Ambos campos son opcionales.
- Si ambos campos estan vacios, el dashboard muestra todos los datos disponibles.
- Si uno o ambos campos tienen valor, todos los widgets del dashboard deben mostrar informacion filtrada por ese rango.

## Comportamiento esperado
- Formato de envio de fechas a la API: `YYYY-MM-DD`.
- Mostrar cerca de los inputs el rango valido disponible en dataset:
	- Fecha minima
	- Fecha maxima
- Validar UX basica del rango:
	- No bloquear que los campos esten vacios.
	- Si fecha inicio > fecha fin, mostrar mensaje claro y no disparar consulta invalida.

## Endpoints relevantes
- `GET /api/metrics/facets`
	- Se usa para obtener el rango de fechas disponible.
- Extension del endpoint de metricas existente
	- Debe aceptar filtros por fecha inicio y fecha fin.

## Criterios de aceptacion
1. El usuario puede cargar solo fecha inicio, solo fecha fin, ambas o ninguna.
2. Al cambiar filtros, los datos mostrados en KPIs y graficos se actualizan con el rango seleccionado.
3. Con filtros vacios, el comportamiento es equivalente al estado actual (sin filtro).
4. El rango disponible se visualiza de forma visible y entendible junto a los inputs.

