# Generador de APIs Dinámicas con Node.js y MongoDB

¡Bienvenido al **Generador de APIs Dinámicas**! Este proyecto te permite crear y gestionar endpoints personalizados de forma dinámica utilizando **Node.js** y **MongoDB**. Es ideal para generar APIs personalizadas de tipo CRUD sin necesidad de escribir código adicional para cada nuevo endpoint.

## Tabla de Contenidos

- [Generador de APIs Dinámicas con Node.js y MongoDB](#generador-de-apis-dinámicas-con-nodejs-y-mongodb)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Características](#características)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación](#instalación)
    - [1. Clonar el Repositorio](#1-clonar-el-repositorio)
    - [2. Instalar las Dependencias](#2-instalar-las-dependencias)
    - [3. Configurar Variables de Entorno (Opcional)](#3-configurar-variables-de-entorno-opcional)
  - [Configuración](#configuración)
    - [1. Conexión a MongoDB](#1-conexión-a-mongodb)
    - [2. Iniciar el Servidor](#2-iniciar-el-servidor)
      - [Modo Desarrollo](#modo-desarrollo)
      - [Modo Producción](#modo-producción)
  - [Uso](#uso)
    - [Paso 1: Crear un Nuevo Endpoint](#paso-1-crear-un-nuevo-endpoint)
      - [Estructura de la Solicitud](#estructura-de-la-solicitud)
        - [Método HTTP: POST](#método-http-post)
          - [URL: http://localhost:3000/api/endpoints](#url-httplocalhost3000apiendpoints)
          - [Encabezados](#encabezados)
          - [Cuerpo de la Solicitud (JSON)](#cuerpo-de-la-solicitud-json)
      - [Ejemplo con curl](#ejemplo-con-curl)
      - [Ejemplo con Postman](#ejemplo-con-postman)
        - [1. Abre Postman y crea una nueva solicitud](#1-abre-postman-y-crea-una-nueva-solicitud)
        - [2. Configura los siguientes parámetros](#2-configura-los-siguientes-parámetros)
          - [Crear endpoints, Método HTTP: POST](#crear-endpoints-método-http-post)
          - [POST URL: http://localhost:3000/api/endpoints](#post-url-httplocalhost3000apiendpoints)
          - [Encabezados JSON](#encabezados-json)
          - [Cuerpo de la Solicitud](#cuerpo-de-la-solicitud)
        - [3. Haz clic en "Send" y verifica que la respuesta tenga un código de estado 201 Created con los detalles del nuevo endpoint](#3-haz-clic-en-send-y-verifica-que-la-respuesta-tenga-un-código-de-estado-201-created-con-los-detalles-del-nuevo-endpoint)
    - [Paso 2: Verificar el Endpoint Creado](#paso-2-verificar-el-endpoint-creado)
      - [Obtener Todos los Endpoints](#obtener-todos-los-endpoints)
        - [Método HTTP: GET](#método-http-get)
        - [GET URL: http://localhost:3000/api/endpoints](#get-url-httplocalhost3000apiendpoints)
        - [Ejemplo con curl GET](#ejemplo-con-curl-get)
        - [Respuesta Exitosa (200 OK)](#respuesta-exitosa-200-ok)
    - [3. Actualizar un Endpoint](#3-actualizar-un-endpoint)
      - [Ejemplo de Actualización con curl](#ejemplo-de-actualización-con-curl)
        - [Solicitud UPDATE](#solicitud-update)
      - [Respuesta Exitosa UPDATE (200 OK)](#respuesta-exitosa-update-200-ok)
    - [4. Eliminar un Endpoint](#4-eliminar-un-endpoint)
      - [Ejemplo de Eliminación con curl](#ejemplo-de-eliminación-con-curl)
      - [Solicitud DELETE](#solicitud-delete)
      - [Respuesta Exitosa del DELETE (200 OK)](#respuesta-exitosa-del-delete-200-ok)

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

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/natadev01/generador-api.git
cd generador-api
```

### 2. Instalar las Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno (Opcional)

```bash
MONGODB_URI=mongodb://localhost:27017/generador-api
PORT=3000
```

## Configuración

### 1. Conexión a MongoDB

Por defecto, la aplicación intenta conectarse a MongoDB en mongodb://localhost:27017/generador-api. Si utilizas una URI diferente, actualiza el archivo de configuración:

ruta: config/db.js

``` javaScript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/generador-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Nota: useCreateIndex está deprecado en versiones recientes
    });
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    process.exit(1); // Termina el proceso si la conexión falla
  }
};

module.exports = connectDB;
```

### 2. Iniciar el Servidor

#### Modo Desarrollo

``` bash
npm run dev
```

#### Modo Producción

``` bash
npm start
```

## Uso

La API principal está disponible en <http://localhost:3000/api>. A continuación, se describen los diferentes pasos para gestionar tus endpoints personalizados.

### Paso 1: Crear un Nuevo Endpoint

Para crear un nuevo endpoint personalizado, debes enviar una solicitud POST a la ruta /api/endpoints con la información necesaria.

#### Estructura de la Solicitud

##### Método HTTP: POST

###### URL: <http://localhost:3000/api/endpoints>

###### Encabezados

```Content-Type: application/json```

###### Cuerpo de la Solicitud (JSON)

``` json
{
  "name": "Nombre del Endpoint",
  "method": "GET",
  "path": "/ruta-del-endpoint",
  "requestSchema": {
    // Esquema de la solicitud (opcional)
  },
  "responseSchema": {
    // Esquema de la respuesta
  }
}
```

#### Ejemplo con curl

``` bash
curl -X POST http://localhost:3000/api/endpoints \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Obtener Usuarios",
           "method": "GET",
           "path": "/usuarios",
           "requestSchema": {},
           "responseSchema": {
             "usuarios": [
               {
                 "id": "1",
                 "nombre": "Juan Pérez",
                 "email": "juan@example.com"
               },
               {
                 "id": "2",
                 "nombre": "María López",
                 "email": "maria@example.com"
               }
             ]
           }
         }'
```

#### Ejemplo con Postman

##### 1. Abre Postman y crea una nueva solicitud

##### 2. Configura los siguientes parámetros

###### Crear endpoints, Método HTTP: POST

###### POST URL: <http://localhost:3000/api/endpoints>

###### Encabezados JSON

```Content-Type: application/json```

###### Cuerpo de la Solicitud

Selecciona la opción ```raw``` y luego ```JSON```.
Ingresa el siguiente JSON:

``` json
{
  "name": "Obtener Usuarios",
  "method": "GET",
  "path": "/usuarios",
  "requestSchema": {},
  "responseSchema": {
    "usuarios": [
      {
        "id": "1",
        "nombre": "Juan Pérez",
        "email": "juan@example.com"
      },
      {
        "id": "2",
        "nombre": "María López",
        "email": "maria@example.com"
      }
    ]
  }
}

```

##### 3. Haz clic en "Send" y verifica que la respuesta tenga un código de estado 201 Created con los detalles del nuevo endpoint

### Paso 2: Verificar el Endpoint Creado

Una vez que hayas creado un endpoint, puedes verificar su existencia y detalles mediante solicitudes GET.

#### Obtener Todos los Endpoints

##### Método HTTP: GET

##### GET URL: <http://localhost:3000/api/endpoints>

##### Ejemplo con curl GET

``` bash
curl http://localhost:3000/api/endpoints
```

##### Respuesta Exitosa (200 OK)

``` bash
[
  {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "Obtener Usuarios",
    "method": "GET",
    "path": "/usuarios",
    "requestSchema": {},
    "responseSchema": {
      "usuarios": [
        {
          "id": "1",
          "nombre": "Juan Pérez",
          "email": "juan@example.com"
        },
        {
          "id": "2",
          "nombre": "María López",
          "email": "maria@example.com"
        }
      ]
    },
    "createdAt": "2023-10-10T14:48:00.000Z",
    "__v": 0
  }
  // ... otros endpoints
]
```

### 3. Actualizar un Endpoint

Para actualizar la información de un endpoint existente, debes enviar una solicitud PUT a la ruta /api/endpoints/:id con los nuevos datos.

#### Ejemplo de Actualización con curl

##### Solicitud UPDATE

``` bash
curl -X PUT http://localhost:3000/api/endpoints/60d0fe4f5311236168a109ca \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Actualizar Usuarios",
           "method": "GET",
           "path": "/usuarios",
           "requestSchema": {},
           "responseSchema": {
             "usuarios": [
               {
                 "id": "1",
                 "nombre": "Juan Pérez",
                 "email": "juan.perez@example.com"
               },
               {
                 "id": "2",
                 "nombre": "María López",
                 "email": "maria.lopez@example.com"
               }
             ]
           }
         }'
```

#### Respuesta Exitosa UPDATE (200 OK)

``` json
{
  "_id": "60d0fe4f5311236168a109ca",
  "name": "Actualizar Usuarios",
  "method": "GET",
  "path": "/usuarios",
  "requestSchema": {},
  "responseSchema": {
    "usuarios": [
      {
        "id": "1",
        "nombre": "Juan Pérez",
        "email": "juan.perez@example.com"
      },
      {
        "id": "2",
        "nombre": "María López",
        "email": "maria.lopez@example.com"
      }
    ]
  },
  "createdAt": "2023-10-10T14:48:00.000Z",
  "__v": 0
}
```

### 4. Eliminar un Endpoint

Para eliminar un endpoint personalizado existente, debes enviar una solicitud DELETE a la ruta /api/endpoints/:id.

#### Ejemplo de Eliminación con curl

#### Solicitud DELETE

``` bash
curl -X DELETE http://localhost:3000/api/endpoints/60d0fe4f5311236168a109ca
```

#### Respuesta Exitosa del DELETE (200 OK)

``` json
{
  "message": "Endpoint eliminado exitosamente"
}
```
