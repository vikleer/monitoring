# MONITORING AGENDAS

Dados `monitoringId`, `startDate` y `endDate`, encontrar todas las agendas creadas y no creadas para la monitoria dada.

Se deben conocer las recurrencias de la monitorización para generar las fechas correspondiente según el rango de fechas proporcionado.

Buscar la monitorización usando el `monitoringId` proporcionado, calcular las fechas para el rango de fechas dado, y usar esas fechas para consultar las agendas: para las agendas creadas (En DB), usarlas con normalidad, y para las no creadas (No en DB), crear una agendaS "virtual" y usarlas.
