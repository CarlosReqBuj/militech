<div align="center">

# ⚡ MILITECH ⚡

**Panel web de gestión corporativa para Militech Corporation**

Departamentos · Empleados · Vehículos

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

</div>

---

## 📖 Descripción

**Militech** es una aplicación web construida con **Next.js (App Router)** que permite consultar y organizar la información de una corporación: sus **departamentos**, los **empleados** que trabajan en ellos y la **flota de vehículos** asignada.

La interfaz tiene una estética oscura con acentos amarillos, y los datos se leen directamente desde una base de datos **PostgreSQL** mediante **Prisma**.

## ✨ Características

- 🏢 **Departamentos**: listado con su descripción, empleados y vehículos asociados.
- 👤 **Empleados**: ficha con nombre, apellidos, alias, email, salario, fecha de alta, cargo y estado (activo/inactivo).
- 🚙 **Vehículos**: matrícula, marca, modelo, tipo (terrestre, blindado, aéreo o transporte) y estado operativo.
- 🎖️ **Cargos** jerárquicos con nivel (1 = más bajo, mayor número = más alto).
- 🔎 Listados con **ordenación y tarjetas** reutilizables gracias a la librería de componentes interna *SimpleUI*.
- 🌗 Soporte de **tema claro/oscuro** con `next-themes`.
- 🔔 **Notificaciones flotantes** (toasts) con `sonner`.
- ⚡ Renderizado moderno con **Suspense**, `cacheComponents` y **prefetch parcial** de Next.js.

## 🧰 Stack tecnológico

| Capa | Tecnología |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI** | [React 19](https://react.dev/) |
| **Estilos** | [Tailwind CSS 4](https://tailwindcss.com/) con `@tailwindcss/turbopack` |
| **Base de datos** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Prisma 7](https://www.prisma.io/) con `@prisma/adapter-pg` y `pg` |
| **Componentes** | SimpleUI (`components/simpleui`, v0.5.3) |
| **Temas** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Notificaciones** | [Sonner](https://sonner.emilkowal.ski/) |
| **Tipografía** | [Geist](https://vercel.com/font) (`next/font`) |
| **Calidad de código** | ESLint 9 + `eslint-config-next` |
| **Lenguaje** | JavaScript (JSX) con configuración de TypeScript 5 |

## 🗄️ Modelo de datos

```
Departamento 1 ──── N Empleado N ──── 1 Cargo
     │                   │
     └──── 1 ── N Vehiculo ── N ──── N Empleado
```

| Modelo | Campos principales |
| --- | --- |
| `Departamento` | `nombre` (único), `descripcion` |
| `Cargo` | `nombre` (único), `nivel` (único) |
| `Empleado` | `nombre`, `apellidos`, `alias`, `email` (único), `salario`, `fechaAlta`, `activo`, `departamento`, `cargo` |
| `Vehiculo` | `matricula` (única), `marca` (por defecto *Militech*), `modelo`, `tipo`, `operativo`, `departamento` |

Tipos de vehículo (`TipoVehiculo`): `TERRESTRE`, `BLINDADO`, `AEREO`, `TRANSPORTE`.

## 📁 Estructura del proyecto

```
militech/
├── app/
│   ├── page.jsx                 # Portada con botón de entrada
│   ├── inicio/                  # Menú principal
│   ├── apartados/
│   │   ├── departamentos/
│   │   ├── empleados/
│   │   └── vehiculos/
│   ├── layout.jsx               # Layout raíz (fuentes y Toaster)
│   └── globals.css              # Tailwind + variables de tema
├── components/
│   ├── Card*.jsx                # Tarjetas de departamento, empleado y vehículo
│   ├── Boton*.jsx               # Botones reutilizables
│   ├── MensajeFlotante.jsx
│   └── simpleui/                # Librería de componentes (client + server)
├── lib/
│   └── prisma.js                # Cliente de Prisma con adaptador de PostgreSQL
├── prisma/
│   └── schema.prisma            # Modelos y enums
├── prisma7.config.ts            # Configuración de Prisma
└── next.config.ts
```

## 🚀 Puesta en marcha

### Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior
- Una base de datos [PostgreSQL](https://www.postgresql.org/) accesible

### 1. Clonar el repositorio

```bash
git clone https://github.com/Solrak25/militech.git
cd militech
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/militech"
```

### 4. Preparar la base de datos

```bash
# Genera el cliente de Prisma
npm run prisma

# Crea las tablas a partir del esquema
npx prisma db push --config prisma7.config.ts
```

### 5. Arrancar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📜 Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el cliente de Prisma y compila para producción |
| `npm run start` | Sirve la versión de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run prisma` | Genera el cliente de Prisma |

## ☁️ Despliegue

El proyecto está pensado para desplegarse fácilmente en [Vercel](https://vercel.com/). Recuerda definir la variable `DATABASE_URL` en la configuración del proyecto; el script `build` ya se encarga de ejecutar `prisma generate`.

## 👤 Autor

Hecho por [**Solrak25**](https://github.com/Solrak25).

---

<div align="center">

⚡ *Militech Corporation* ⚡

</div>
