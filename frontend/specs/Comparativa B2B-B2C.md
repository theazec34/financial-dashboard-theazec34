# Vista comparativa B2B vs B2C

## Objetivo
Crear una vista dedicada para comparar el rendimiento de ingresos entre las lineas de negocio B2B y B2C.

## Alcance funcional
- Crear una nueva pagina dentro del dashboard.
- La pagina tiene dos secciones en paralelo:
	- Seccion B2B
	- Seccion B2C
- Cada seccion debe incluir una tabla con las 5 categorias de ingreso principales de su grupo.

## Datos mostrados por tabla
Cada fila debe mostrar:
1. Nombre de categoria
2. Total de ingresos
3. Porcentaje sobre el total del grupo (B2B o B2C)

## Grafico comparativo
- Debajo de ambas tablas, incluir un unico grafico comparando total de ingresos B2B vs B2C.

## Filtros
- Permitir filtrar la comparativa por rango de fechas.
- Formato de fechas: `YYYY-MM-DD`.
- El filtro debe afectar tanto tablas como grafico.

## Endpoints relevantes
- `GET /api/metrics/categories/top?operation_type=income&limit=5`
- `GET /api/metrics/facets`

## Criterios de aceptacion
1. La nueva pagina muestra ambas secciones y su comparativa de forma simultanea.
2. Cada seccion lista exactamente el top 5 de categorias de ingreso del grupo correspondiente.
3. El grafico inferior refleja los totales agregados B2B vs B2C.
4. El rango de fechas modifica de forma consistente todos los datos de esta vista.

