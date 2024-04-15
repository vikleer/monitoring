# Documentación sobre autenticación

## Registro

Para registrar un usuario, realizar una petición HTTP POST al endpoint `http://localhost:3000/auth/sign-up` con el siguiente cuerpo (Tomar como ejemplo):

Precondiciones para realizar la petición:

- No se requiere cabecera de autenticación: `Authorization: Bearer <ACCESS_TOKEN>`
- Se requiere el identificador de una carrera, ver documentación sobre carreras en el directorio `modules/degrees/docs`

Cuerpo de ejemplo:

```json
{
    "email": "r.rivera@gmail.com",
    "password": "123",
    "profile": {
        "firstName": "Ricardo",
        "lastName": "Rivera",
        "age": 31,
        "gender": "Male",
        "overview": "Software developer",
        "degreeId": "8600e263-dffc-4e91-9113-50403f52f207"
    }
}
```

Respuesta exitosa esperada

201 CREATED

## Inicio de sesión

Para iniciar sesión, realizar una petición HTTP POST al endpoint `http://localhost:3000/auth/sign-in` con el siguiente cuerpo (Tomar como ejemplo):

Precondiciones para realizar la petición:

- No se requiere cabecera de autenticación: `Authorization: Bearer <ACCESS_TOKEN>`

Cuerpo de ejemplo:

```json
{
    "email": "r.rivera@gmail.com",
    "password": "123"
}
```

Respuesta exitosa esperada

200 OK

```json
{
    "accessToken": <ACCESS_TOKEN>,
    "refreshToken": <REFRESH_TOKEN>
}
```

Almacenar los tokens en el cliente (Aplicación Angular) en dos lugares, 1. En un servicio de forma que puedan ser accedidos por componentes o servicios según sea necesarios, por ejemplo, para el interceptor de autenticación y 2. En el LocalStorage para persistir la sesión del usuario durante cierres del navegador.
