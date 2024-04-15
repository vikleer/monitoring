# Documentación sobre usuarios

## Información del usuario

Para consultar la información del usuario, realizar una petición HTTP GET al endpoint `http://localhost:3000/users/:id` con el siguiente identificador (Tomar como ejemplo):

URL de ejemplo:

`http://localhost:3000/users/3706dfba-34e1-4026-bc99-3bcc9bb587e5`

Precondiciones para realizar la petición:

- Se requiere cabecera de autenticación: `Authorization: Bearer <ACCESS_TOKEN>`

Respuesta exitosa esperada

200 OK

```json
{
    "createdAt": "2024-04-15T16:35:04.296Z",
    "updatedAt": "2024-04-15T16:35:04.296Z",
    "deletedAt": null,
    "id": "3706dfba-34e1-4026-bc99-3bcc9bb587e5",
    "email": "lorem@gmail.com",
    "password": "$argon2id$v=19$m=65536,t=3,p=4$3tA1+WeLba8ubifCS3+Aqg$ZV3/YapO8FxlOvBcosVq+MlgOt3u7hAe9k9fsSK0gQg",
    "profile": {
        "createdAt": "2024-04-15T16:35:04.116Z",
        "updatedAt": "2024-04-15T16:35:04.116Z",
        "deletedAt": null,
        "id": "16783dd1-fc38-43b6-88b5-addd4ae36a9c",
        "firstName": "Lorem",
        "lastName": "Ipsum",
        "age": 31,
        "gender": "Male",
        "overview": "Software developer",
        "degree": null
    },
    "authorizations": [
        {
            "createdAt": "2024-04-15T16:35:04.431Z",
            "updatedAt": "2024-04-15T16:35:04.431Z",
            "deletedAt": null,
            "id": "afe87c22-7fab-4774-9acb-45bff4306f75",
            "role": {
                "createdAt": "2024-04-15T16:16:29.127Z",
                "updatedAt": "2024-04-15T16:16:29.127Z",
                "deletedAt": null,
                "id": "eb005b10-bbda-49b5-8182-9988256999d1",
                "name": "User",
                "description": "User",
                "permissions": [
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "f8b88ae4-e6da-42d4-95f9-331251338a0f",
                        "action": "read",
                        "subject": "UserSession",
                        "conditions": {
                            "user.id": "${user.id}"
                        }
                    },
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "e5a57b81-2bb6-4215-b428-476a950bed28",
                        "action": "refresh",
                        "subject": "UserSession",
                        "conditions": {
                            "user.id": "${user.id}"
                        }
                    },
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "a70d6b08-6edd-45e8-9c23-a43347a7e4da",
                        "action": "delete",
                        "subject": "UserSession",
                        "conditions": {
                            "user.id": "${user.id}"
                        }
                    },
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "6e9f092d-cb02-45f5-b8c6-ea08a81eb50b",
                        "action": "read",
                        "subject": "User",
                        "conditions": {
                            "id": "${user.id}"
                        }
                    },
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "7b277c5c-5835-4ed6-ae59-a467f83a9a30",
                        "action": "update",
                        "subject": "User",
                        "conditions": {
                            "id": "${user.id}"
                        }
                    },
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "0c5d3f4a-3d6b-487c-bf10-3fe4e082d483",
                        "action": "delete",
                        "subject": "User",
                        "conditions": {
                            "id": "${user.id}"
                        }
                    },
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "2c7a8463-dea6-4a72-9a74-607e66b5d452",
                        "action": "read",
                        "subject": "MonitoringSchedule",
                        "conditions": {
                            "user.id": "${user.id}"
                        }
                    },
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "fead4eb8-954a-4219-9c92-13bb38559384",
                        "action": "schedule",
                        "subject": "MonitoringSchedule",
                        "conditions": null
                    },
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "5adfb95e-8751-435a-b285-5ca5cd6fe659",
                        "action": "unschedule",
                        "subject": "MonitoringSchedule",
                        "conditions": {
                            "user.id": "${user.id}"
                        }
                    }
                ]
            }
        },
        {
            "createdAt": "2024-04-15T16:35:04.431Z",
            "updatedAt": "2024-04-15T16:35:04.431Z",
            "deletedAt": null,
            "id": "46b2af42-c4b6-4c9a-b69e-439014a7b54f",
            "role": {
                "createdAt": "2024-04-15T16:16:29.127Z",
                "updatedAt": "2024-04-15T16:16:29.127Z",
                "deletedAt": null,
                "id": "5742a998-ecb8-4281-97ae-6b57ebc91da3",
                "name": "Monitor",
                "description": "Monitor",
                "permissions": [
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "e52973fd-5d72-4584-a4f4-9d176d7ea0ba",
                        "action": "create",
                        "subject": "Monitoring",
                        "conditions": null
                    },
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "acffdce5-a326-4609-8a53-14a30b82a663",
                        "action": "update",
                        "subject": "Monitoring",
                        "conditions": {
                            "createdBy.id": "${user.id}"
                        }
                    },
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "f12c45e8-4d25-4221-a586-b64010877789",
                        "action": "delete",
                        "subject": "Monitoring",
                        "conditions": {
                            "createdBy.id": "${user.id}"
                        }
                    },
                    {
                        "createdAt": "2024-04-15T16:16:29.127Z",
                        "updatedAt": "2024-04-15T16:16:29.127Z",
                        "deletedAt": null,
                        "id": "d0551516-53de-42ae-83d6-8b66d642ed87",
                        "action": "update",
                        "subject": "MonitoringAvailability",
                        "conditions": {
                            "monitoring.createdBy.id": "${user.id}"
                        }
                    }
                ]
            }
        }
    ]
}
```
