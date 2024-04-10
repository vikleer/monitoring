# MONITORING SKETCH

## Database

### ChatGPT prompt

Estoy creando un sistema de monitorias, donde hay estudiantes y monitores. Los monitores pueden crear monitorias y los estudiantes pueden agendar esas monitorias.

Necesito modelar la base de datos. Mi requerimiento para las monitorias es el siguiente:

Un monitor puede crear una monitoria, y puede configurar fechas de disponibilidad únicas o recurrentes para que los estudiantes agenden las monitorias, ejemplos:

Ejemplo 1: El monitor crea una monitoria y configura que se pueda agendar los martes de cada semana.
Ejemplo 2: El monitor crea una monitoria y configura que se pueda agendar los lunes y los miércoles de cada semana.
Ejemplo 3: El monitor crea una monitoria y configura que se pueda agendar el primer jueves de cada mes.
Ejemplo 4: El monitor crea una monitoria y configura que se pueda agendar el 15 de cada mes.
Ejemplo 5: El monitor crea una monitoria y configura que se pueda agendar el 15 de enero y el 15, 16 y 17 de febrero de determinado año.
Ejemplo 6: El monitor crea una monitoria y configura que se pueda agendar el 20 de enero de cada año.

Cómo podría modelar la base de datos para almacenar la configuración de disponibilidad.

Muéstrame las tablas en formateo de tabla.

## Availability configuration of monitoring

ÚNICAS
El monitor puede elegir fechas especificas, ejemplos:

- 15 de enero de 2024 entre las 13:00 y las 15:00
- 16 de enero de 2024 entre las 13:00 y las 15:00
- 5 de febrero de 2024 entre las 13:00 y las 15:00

RECURRENTES
El monitor puede seleccionar recurrencia, semanal, mensual o anual

Para la recurrencia semanal
El monitor puede seleccionar los días de la semanal, ejemplos:

- El lunes de cada semana entre las 13:00 y las 15:00
- El lunes y jueves de cada semana entre las 13:00 y las 15:00

Para la recurrencia mensual
El monitor puede seleccionar los días de la semana o fechas especificas dentro del mes, ejemplos:

- El primer lunes de cada mes entre las 13:00 y las 15:00
- El primer lunes y jueves de cada mes entre las 13:00 y las 15:00
- El 5 y 9 de cada mes entre las 13:00 y las 15:00

Para la recurrencia anual
El monitor puede seleccionar los días de la semana o fechas especificas dentro del año, ejemplos:

- El primer lunes de cada año entre las 13:00 y las 15:00
- El primer lunes y jueves de cada año entre las 13:00 y las 15:00
- El 5 de enero y 5 de febrero de cada año entre las 13:00 y las 15:00

## Database schema

Si unique, campo fechas y campo horario
Si weekly, campo días de la semana y campo horario
Si monthly, campo primeros días de la semana, campo días y campo horario
Si annually, campo primeros días de la semana, campo fechas y campo horario

monitoring {
    id int fk
    user_id > users.id
}

availabilities {
    id int fk
    type enum(unique, weekly, monthly, annually)
    recurrence json
    monitoring_id > monitoring.id
}

monitoring {
    id 1
    user_id 1
}

availabilities {
    id 1
    type unique
    recurrence {
        dates [
            {
                date "02/23/2024"
                time {
                    start "13:00"
                    end "15:00"
                }
            }
            {
                date "03/23/2024"
                time {
                    start "13:00"
                    end "15:00"
                }
            }
        ]
    }
    monitoring_id 1
}

availabilities {
    id 2
    type weekly
    recurrence {
        week_days [
            {
                day 2
                time {
                    start "13:00"
                    end "15:00"
                }
            }
            {
                day 4
                time {
                    start "13:00"
                    end "15:00"
                }
            }
        ]
    }
    monitoring_id 1
}

availabilities {
    id 3
    type monthly
    recurrence {
        first_week_days [
            {
                day 3
                time {
                    start "13:00"
                    end "15:00"
                }
            }
            {
                day 4
                time {
                    start "13:00"
                    end "15:00"
                }
            }
        ]
        month_days [
            {
                day 10
                time {
                    start "13:00"
                    end "15:00"
                }
            }
            {
                day 11
                time {
                    start "13:00"
                    end "15:00"
                }
            }
        ]
    }
    monitoring_id 1
}

availabilities {
    id 4
    type annually
    recurrence {
        first_week_days [
            {
                day 2
                time {
                    start "13:00"
                    end "15:00"
                }
            }
            {
                day 4
                time {
                    start "13:00"
                    end "15:00"
                }
            }
        ]
        dates [
            {
                date "02/23/2024"
                time {
                    start "13:00"
                    end "15:00"
                }
            }
            {
                date "03/23/2024"
                time {
                    start "13:00"
                    end "15:00"
                }
            }
        ]
    }
    monitoring_id 1
}
