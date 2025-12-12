# StyleCut ✂️ - Full Stack Barber Shop Management System


Una aplicación web completa (**Full Stack**) para la gestión y reserva de citas en barberías, con tienda de productos integrada. Desarrollada con arquitectura moderna separando Frontend y Backend.


## 🚀 Demo en Vivo (Despliegue)

El proyecto está desplegado y funcionando en la nube:

- **🌐 Web Pública:** (https://stylecut-barber.netlify.app/)
- **👮‍♂️ Panel de Administración:** https://stylecut-barber.netlify.app//admin
- **🔌 Backend API:** Hospedado en Render (Dockerizado).

---

## ✨ Funcionalidades Clave

### 1. Sistema de Reservas Inteligente 📅
- El usuario selecciona un servicio (Corte, Barba, etc.).
- El Backend calcula automáticamente los **huecos disponibles** basándose en la duración del servicio.
- Validación en servidor para evitar conflictos de horario.

### 2. Tienda de Productos (E-commerce) 🛒
- Catálogo dinámico cargado desde base de datos.
- Carrito de compras global gestionado con **Zustand** .
- Diseño responsive con Grid System.

### 3. Panel de Administración 📊
- Visualización de todas las citas confirmadas.
- Datos del cliente y estado del servicio en tiempo real.
- Conectado a base de datos **PostgreSQL**.

---

## 🛠️ Stack Tecnológico

Este proyecto utiliza una arquitectura **SPA** conectada a una **REST API**.

### Frontend (Cliente)
- **Framework:** React + Vite
- **Estilos:** TailwindCSS
- **Estado:** Zustand 
- **UX:** Sonner
- **Hosting:** Netlify

### Backend (Servidor)
- **Framework:** Laravel 11
- **Base de Datos:** PostgreSQL
- **Containerización:** Docker
- **Hosting:** Render Cloud