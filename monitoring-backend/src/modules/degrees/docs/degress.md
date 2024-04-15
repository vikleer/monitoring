# Documentación sobre carreras

## Carreras

Para consultar las carreras, realizar una petición HTTP GET al endpoint `http://localhost:3000/degrees`.

Precondiciones para realizar la petición:

- No se requiere cabecera de autenticación: `Authorization: Bearer <ACCESS_TOKEN>`

Respuesta exitosa esperada

200 OK

```json
[
    {
        "createdAt": "2024-04-15T16:16:29.127Z",
        "updatedAt": "2024-04-15T16:16:29.127Z",
        "deletedAt": null,
        "id": "8600e263-dffc-4e91-9113-50403f52f207",
        "name": "Tecnología en Desarrollo de Software"
    },
    {
        "createdAt": "2024-04-15T16:16:29.127Z",
        "updatedAt": "2024-04-15T16:16:29.127Z",
        "deletedAt": null,
        "id": "80370f8b-08bd-4397-af05-a0077567dd1e",
        "name": "Tecnología en Gestión de Mercadeo"
    }
]
```
