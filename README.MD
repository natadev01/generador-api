# Generador de APIs Dinámicas con Node.js y MongoDB

¡Bienvenido al **Generador de APIs Dinámicas**! Este proyecto te permite crear y gestionar endpoints personalizados de forma dinámica utilizando **Node.js** y **MongoDB**. Es ideal para generar APIs personalizadas de tipo CRUD sin necesidad de escribir código adicional para cada nuevo endpoint.

## Tabla de Contenidos

- [Generador de APIs Dinámicas con Node.js y MongoDB](#generador-de-apis-dinámicas-con-nodejs-y-mongodb)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Características](#características)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Requisitos Previos](#requisitos-previos)

## Características

- **Creación Dinámica de Endpoints:** Crea, actualiza y elimina endpoints personalizados a través de una API principal.
- **Soporte para Métodos HTTP:** GET, POST, PUT y DELETE.
- **Almacenamiento en MongoDB:** Utiliza MongoDB para almacenar las definiciones de los endpoints.
- **Validación Básica de Rutas y Métodos:** Asegura que las rutas y métodos sean válidos al crear o actualizar endpoints.
- **Documentación Automática:** (Opcional) Integración con Swagger para documentar la API.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework web para Node.js.
- **MongoDB**: Base de datos NoSQL para almacenar las definiciones de los endpoints.
- **Mongoose**: ODM para MongoDB que facilita la interacción con la base de datos.
- **Body-Parser**: Middleware para parsear cuerpos de solicitudes HTTP.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- **Node.js** (preferiblemente la última versión LTS)
- **MongoDB** (localmente o a través de un servicio en la nube como [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** (opcional, para clonar el repositorio)
- **Postman** o **Insomnia** (herramientas recomendadas para probar las APIs)
