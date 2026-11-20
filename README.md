# Militech

### Aplicación web de gestión corporativa

Militech es una aplicación web desarrollada como proyecto del módulo de Desarrollo Web en Entorno Servidor (DWES).

Permite gestionar de forma centralizada los departamentos, empleados, cargos, vehículos y proyectos de una organización mediante una interfaz web personalizada, una base de datos relacional y servicios externos de almacenamiento de imágenes.

**Aplicación desplegada:** https://militech-gules.vercel.app/

**Repositorio:** https://github.com/CarlosReqBuj/militech

---

## Funcionalidades

### Gestión de departamentos

- Consulta y administración de departamentos.
- Organización de las diferentes áreas de la empresa.
- Relación con empleados, vehículos y proyectos.

### Gestión de empleados

- Creación, consulta, modificación y eliminación de empleados.
- Gestión de información personal y profesional.
- Asignación de departamentos y cargos.
- Gestión de salarios y estado laboral.
- Asociación con vehículos y proyectos.

### Gestión de vehículos

- Registro y administración de vehículos.
- Información de marca, modelo y matrícula.
- Clasificación por tipo de vehículo.
- Gestión de fotografías mediante Cloudinary.
- Asociación con departamentos y empleados.

### Gestión de cargos

- Definición de puestos y niveles jerárquicos.
- Asociación de cargos con empleados.

### Gestión de proyectos

- Registro y administración de proyectos.
- Identificación mediante códigos.
- Gestión de presupuestos y fechas.
- Seguimiento de estados.
- Clasificación por niveles de confidencialidad.
- Asociación de empleados y departamentos.

---

## Tecnologías utilizadas

| Tecnología     | Función                                 |
| -------------- | --------------------------------------- |
| Next.js 16     | Framework de desarrollo web             |
| React 19       | Construcción de interfaces              |
| JavaScript     | Lenguaje principal                      |
| Tailwind CSS 4 | Diseño y estilos                        |
| PostgreSQL     | Base de datos relacional                |
| Neon           | Servicio de PostgreSQL en la nube       |
| Prisma ORM 7   | Acceso y gestión de datos               |
| Cloudinary     | Almacenamiento de imágenes              |
| Server Actions | Ejecución de operaciones en el servidor |
| Sonner         | Sistema de notificaciones               |
| ESLint         | Análisis del código                     |

---

## Base de datos

El proyecto utiliza PostgreSQL alojado en Neon para almacenar la información de la aplicación.

La gestión y consulta de los datos se realiza mediante Prisma ORM, que permite definir modelos, relaciones y restricciones dentro del esquema de la base de datos.

### Entidades principales

| Entidad      | Descripción                          |
| ------------ | ------------------------------------ |
| Departamento | Áreas organizativas de la empresa    |
| Empleado     | Trabajadores de la organización      |
| Cargo        | Puestos y jerarquía corporativa      |
| Vehículo     | Vehículos de la empresa              |
| Proyecto     | Proyectos y operaciones corporativas |

### Relaciones entre entidades

El modelo de datos incorpora relaciones de tipo uno a muchos (1:N) y muchos a muchos (N:M).

**Relaciones 1:N:**

- Departamento y empleados.
- Departamento y vehículos.
- Departamento y proyectos.
- Cargo y empleados.

**Relaciones N:M:**

- Empleados y vehículos.
- Empleados y proyectos.

Estas relaciones permiten representar la estructura de la organización y mantener la integridad de los datos.

### Enumeraciones

**Tipos de vehículos:**

- TERRESTRE
- BLINDADO
- AEREO
- TRANSPORTE

**Estados de proyectos:**

- PLANIFICADO
- EN_CURSO
- PAUSADO
- COMPLETADO
- CANCELADO

**Niveles de confidencialidad:**

- CONFIDENCIAL
- SECRETO
- ULTRASECRETO

---

## Gestión de imágenes

La aplicación utiliza Cloudinary como servicio externo de almacenamiento y gestión de imágenes.

La integración se realiza mediante Server Actions, que permiten ejecutar las operaciones desde el servidor.

El proceso contempla:

1. Selección de imágenes desde los formularios.
2. Procesamiento de las solicitudes en el servidor.
3. Subida de imágenes a Cloudinary.
4. Almacenamiento de las referencias correspondientes en PostgreSQL.
5. Recuperación y visualización de las imágenes en la aplicación.

De esta forma, los archivos multimedia se almacenan externamente y la base de datos conserva sus referencias.

---

## Progressive Web App (PWA)

Militech incorpora características de Progressive Web App, permitiendo instalar la aplicación desde navegadores compatibles.

Entre sus características se incluyen:

- Manifest de aplicación web.
- Iconos personalizados.
- Nombre y configuración de la aplicación.
- Modo de visualización independiente.
- Instalación en dispositivos compatibles.

---

## Estructura del proyecto

```text
militech/
│
├── app/
│   ├── page.jsx
│   ├── inicio/
│   ├── apartados/
│   │   ├── departamentos/
│   │   ├── empleados/
│   │   └── vehiculos/
│   ├── layout.jsx
│   └── globals.css
│
├── actions/
│
├── components/
│   └── simpleui/
│
├── lib/
│   └── prisma.js
│
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── prisma7.config.ts
├── next.config.ts
├── package.json
└── README.md
```

---

## Instalación y ejecución

### Requisitos previos

- Node.js 20.9 o superior.
- npm.
- Una base de datos PostgreSQL.
- Una cuenta de Neon.
- Una cuenta de Cloudinary.

### 1. Clonar el repositorio

```bash
git clone https://github.com/CarlosReqBuj/militech.git

cd militech
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://usuario:contraseña@host/base_de_datos?sslmode=require"

CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"
```

Sustituir los valores por las credenciales correspondientes.

No se deben subir las credenciales al repositorio.

### 4. Generar el cliente de Prisma

```bash
npm run prisma
```

### 5. Sincronizar el esquema de la base de datos

```bash
npx prisma db push --config prisma7.config.ts
```

### 6. Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en:

http://localhost:3000

---

## Scripts disponibles

| Comando          | Descripción                           |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Inicia el servidor de desarrollo      |
| `npm run build`  | Genera Prisma y compila la aplicación |
| `npm run start`  | Inicia la aplicación en producción    |
| `npm run lint`   | Ejecuta ESLint                        |
| `npm run prisma` | Genera el cliente de Prisma           |

---

## Despliegue

La aplicación está desplegada en Vercel y utiliza servicios externos para la gestión de datos e imágenes.

| Servicio   | Uso                         |
| ---------- | --------------------------- |
| Vercel     | Despliegue de la aplicación |
| Neon       | Base de datos PostgreSQL    |
| Cloudinary | Almacenamiento de imágenes  |

Para desplegar la aplicación es necesario configurar las variables de entorno correspondientes en la plataforma de alojamiento.

---

## Autor

**CarlosReqBuj**

Proyecto desarrollado como parte del módulo de Desarrollo Web en Entorno Servidor (DWES).
