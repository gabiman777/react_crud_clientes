# React CRUD Clientes
Crud clientes con datos locales simulados con json-server

- Lista Clientes
- Agregar un cliente sólo con su nombre
- Borrar un cliente
- Usa json-server para simular datos de un API (db.json)

# Cómo ejecutarlo

Arrancar api y frontend  — se necesitan dos terminales:

Terminal 1 (API):
npm run api

Deberías ver:
  JSON Server started on PORT :3001
  Endpoints:
  http://localhost:3001/clientes

Terminal 2 (frontend):
npm run dev

Probar la API en el navegador

Abre estas URLs directamente:

URL	--- Qué devuelve
http://localhost:3001/clientes	--- El array completo
http://localhost:3001/clientes/1 --- Solo 1 cliente, el de id 1: "Ana" en este caso

Si ves el JSON, la API funciona.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
