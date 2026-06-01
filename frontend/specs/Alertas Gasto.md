# Tabla de alertas de anomalias

## Objetivo
Detectar y destacar periodos donde el gasto sube de forma inesperada en el dashboard principal.

## Alcance funcional
- Debajo de los graficos existentes, agregar una tabla de alertas.
- Incluir un input numerico configurable por el usuario para definir el umbral de alerta.

## Parametro configurable
- Nombre: umbral de alerta.
- Tipo: ratio decimal.
- Rango permitido: `0.01` a `1.0`.
- Valor por defecto: `0.3`.

## Estructura de la tabla
La tabla debe mostrar estas 4 columnas:
1. Periodo
2. Outcome registrado
3. Media movil de los 3 periodos anteriores
4. Incremento porcentual

## Comportamiento esperado
- Si no hay anomalias para el umbral actual, mostrar estado vacio explicito.
- El componente no debe desaparecer silenciosamente.
- Si hay filtro de fechas activo (Funcionalidad 1), esta tabla tambien debe respetarlo.

## Endpoint relevante
- `GET /api/metrics/alerts?threshold=<ratio>`

## Criterios de aceptacion
1. El usuario puede ajustar el umbral y ver resultados recalculados.
2. La tabla lista correctamente las anomalias con las 4 columnas requeridas.
3. El estado vacio aparece cuando no hay resultados.
4. El filtro de rango de fechas impacta tambien los datos de alertas.

