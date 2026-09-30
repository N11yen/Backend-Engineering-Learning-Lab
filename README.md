# Messages API | Backend Engineering Learning Lab

Esta es una **REST API** desarrollada como un entorno de aprendizaje avanzado para la construcción de servicios backend robustos, escalables y testeables. El proyecto implementa prácticas de ingeniería de software orientadas a la separación de responsabilidades y la calidad de código.

## 🚀 Tech Stack

| Categoría | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Runtime** | [Node.js](https://nodejs.org/) | Entorno de ejecución de JavaScript. |
| **Framework** | [Express](https://expressjs.com/) | Framework web minimalista para la gestión de rutas y middleware. |
| **ORM** | [Prisma](https://www.prisma.io/) | ORM moderno para la interacción con la base de datos PostgreSQL. |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Sistema de gestión de bases de datos relacionales. |
| **Validation** | [Zod](https://zod.dev/) | Librería de declaración y validación de esquemas de TypeScript/JS. |
| **Testing** | [Jest](https://jestjs.io/) | Framework de pruebas unitarias e integración. |
| **Mocking/HTTP** | [Supertest](https://github.com/ladjs/supertest) | Librería para realizar pruebas de integración sobre endpoints HTTP. |
| **Documentation** | [Swagger](https://swagger.io/) | Especificación OpenAPI para documentación interactiva de la API. |
| **Security** | [Helmet](https://helmetjs.github.io/) | Middleware para asegurar cabeceras HTTP. |
| **Logging** | [Morgan](https://github.com/expressjs/morgan) | Middleware de logging para peticiones HTTP. |

## 🏗️ Architecture & Design Patterns

La API sigue una **Arquitectura por Capas (Layered Architecture)** para asegurar la mantenibilidad y facilitar las pruebas unitarias:

1.  **Routes Layer**: Define los puntos de entrada (endpoints) y delega la ejecución a los controladores.
2.  **Controller Layer**: Gestiona el flujo de la petición HTTP, la extracción de datos y la respuesta al cliente.
3.  **Service Layer**: Contiene la lógica de negocio principal, actuando como intermediario entre los controladores y los repositorios.
4.  **Repository Layer**: Encapsula el acceso directo a la base de datos mediante Prisma, abstrayendo la persistencia de la lógica de negocio.
5.  **Middleware Layer**: Implementa lógica transversal como el manejo de errores centralizado (`errorHandler`), logging de peticiones y validación de esquemas.

### Principios Aplicados:
*   **Separation of Concerns (SoC)**: Cada capa tiene una responsabilidad única y bien definida.
*   **Centralized Error Handling**: Uso de una jerarquía de errores personalizados (`AppError`, `NotFoundError`, etc.) gestionados por un middleware único.
*   **Data Validation**: Validación estricta de la entrada de datos en la capa de controlador mediante esquemas de Zod.

## 🛠️ API Reference

### Messages Resource

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/messages` | Recupera la lista completa de mensajes almacenados. |
| `POST` | `/messages` | Crea un nuevo mensaje (requiere `content` y opcionalmente `author`). |
| `DELETE` | `/messages` | Elimina de forma masiva todos los mensajes de la base de datos. |

## 🚦 Getting Started

### Requisitos Previos
*   Node.js (v18+)
*   PostgreSQL instalado y corriendo.

### Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd messages-api
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz con la siguiente variable:
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
    ```

4.  **Preparar la base de datos:**
    ```bash
    npm run prisma:generate
    npm run prisma:migrate
    ```

5.  **Ejecutar la aplicación:**
    ```bash
    npm run dev
    ```

## 🧪 Testing & Quality

El proyecto cuenta con una suite de pruebas robusta que incluye pruebas unitarias (para validadores y servicios) e integraciones (para controladores y middlewares).

*   **Ejecutar todos los tests:**
    ```bash
    npm test
    ```
*   **Generar reporte de cobertura:**
    *(Nota: Asegúrate de tener configurado el reporter de coverage en Jest para ver los resultados en la carpeta `/coverage`)*.

## 📊 Project Status & Roadmap

**Estado Actual:** `MVP - Estable` ✅
*   [x] Implementación de arquitectura por capas.
*   [x] Gestión de mensajes (CRUD parcial).
*   [x] Sistema de validación de esquemas con Zod.
*   [x] Manejo de errores centralizado.
*   [x] Cobertura de pruebas base.
*   [x] Documentación Swagger integrada.

**Próximos Pasos (Roadmap):**
*   [ ] Implementación de Autenticación y Autorización (JWT).
*   [ ] Implementación de filtrado y paginación avanzada en `GET /messages`.
*   [ ] Refactorización para soporte de TypeScript.
*   [ ] Implementación de integración con Docker.
