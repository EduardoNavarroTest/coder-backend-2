# Proyecto Coderhouse Backend 2 FINALIZADO

# Datos para validar el Usuario admin
admin@admin.com 
Pass: 123


## Descripción

Este proyecto es un backend construido con Node.js y Express que utiliza diversas tecnologías para autenticación, almacenamiento de archivos, bases de datos, paginación y más.

## Tecnologías Utilizadas

### Dependencias principales:

- **bcrypt**: Para el hash y validación de contraseñas.
- **cookie-parser**: Middleware de Express para el manejo de cookies.
- **dotenv**: Carga variables de entorno desde un archivo `.env`.
- **express**: Framework para la creación de servidores web en Node.js.
- **express-handlebars**: Motor de plantillas para generar HTML dinámico.
- **jsonwebtoken**: Implementa tokens JWT para la autenticación basada en tokens.
- **mongoose**: ODM para MongoDB, utilizado para modelar los datos.
- **mongoose-paginate-v2**: Plugin de Mongoose para agregar funcionalidad de paginación a las consultas.
- **multer**: Middleware para manejo de archivos (uploads).
- **passport**: Middleware para autenticación.
- **passport-jwt**: Estrategia de Passport para autenticación utilizando JWT.
- **socket.io**: Biblioteca para la comunicación en tiempo real entre el cliente y el servidor (WebSockets).

### Dependencias de desarrollo:

- **nodemon**: Herramienta que reinicia automáticamente el servidor cuando se detectan cambios en el código fuente.

## Scripts

- **dev**: Inicia el servidor en modo de desarrollo con nodemon.
- **start**: Inicia el servidor en modo producción.

## Requisitos

- **Node.js**: Se requiere una versión `14.x` de Node.js para ejecutar el proyecto.

## Cómo ejecutar el proyecto

1. Clonar el repositorio.
2. Instalar las dependencias usando `npm install`.
3. Ejecutar el proyecto en modo desarrollo usando `npm run dev`

## Licencia

Este proyecto está bajo la licencia ISC.
