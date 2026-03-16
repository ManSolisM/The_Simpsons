# 🍩 The Simpsons Explorer

Aplicación React que consume la API de Los Simpson con login/registro, fondo animado y todas las secciones de datos disponibles.

## 🚀 Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Desarrollo local
npm run dev
# → http://localhost:3000
```

## 📦 Estructura del proyecto

```
src/
├── components/
│   ├── animated/       # Fondo animado de Springfield
│   ├── layout/         # Navbar y Layout principal
│   └── ui/             # Spinner, ProtectedRoute
├── features/
│   ├── auth/           # Login y Registro
│   └── simpsons/
│       ├── components/ # Dashboard, Quotes, Characters, Stats
│       └── hooks/      # useQuotes, useCharacters, useStats
├── services/
│   └── simpsonsApi.js  # Axios + helpers de la API
├── store/
│   └── AuthContext.jsx # Contexto global de autenticación
└── styles/
    └── globals.css     # Variables CSS y animaciones
```

## 🌐 Deploy en GitHub Pages

### Paso 1 — Crear el repositorio en GitHub
```bash
git init
git add .
git commit -m "🍩 Initial commit - The Simpsons Explorer"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/simpsons-app.git
git push -u origin main
```

### Paso 2 — Configurar tu usuario en package.json y vite.config.js
Reemplaza `<TU_USUARIO>` en:
- `package.json` → campo `"homepage"`
- `src/App.jsx` → `basename="/simpsons-app"` (ya configurado)

### Paso 3 — Deploy
```bash
npm run deploy
```
Este comando construye el proyecto y lo sube a la rama `gh-pages` automáticamente.

### Paso 4 — Activar GitHub Pages
1. Ve a tu repositorio en GitHub
2. **Settings → Pages**
3. En *Source* selecciona la rama **gh-pages**
4. Guarda. En ~1 min tu app estará en:
   `https://TU_USUARIO.github.io/simpsons-app`

## 📡 API utilizada

**The Simpsons Quote API** — `https://thesimpsonsquoteapi.glitch.me`

| Endpoint | Descripción |
|----------|-------------|
| `GET /quotes?count=N` | N citas aleatorias |
| `GET /quotes?character=NAME&count=N` | Citas de un personaje |

## ✨ Funcionalidades

- 🔐 **Auth** — Registro e inicio de sesión con localStorage
- 🏠 **Dashboard** — Resumen con estadísticas y ranking
- 💬 **Citas** — Grid de citas con búsqueda y filtro por cantidad
- 👥 **Personajes** — Tarjetas con imagen + modal con todas sus frases
- 📊 **Estadísticas** — Gráficas de barras, donut SVG y tabla completa
- 🎨 **Fondo animado** — Springfield con nubes, donuts, sol y skyline

## 🛠️ Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `/dist` |
| `npm run preview` | Preview del build |
| `npm run deploy` | Build + deploy a GitHub Pages |
