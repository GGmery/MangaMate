# 🎌 MangaMate

**MangaMate** es una aplicación web moderna desarrollada con Angular que te permite buscar, descubrir y organizar tus animes favoritos usando la API pública de Jikan (MyAnimeList).

## ✨ Funcionalidades

### Funcionalidades Mínimas ✅

1. **Buscador de Animes**
   - Búsqueda en tiempo real usando la API de Jikan
   - Visualización de resultados en tarjetas atractivas
   - Feedback visual durante la carga, errores y sin resultados

2. **Detalle del Anime**
   - Vista completa con información detallada
   - Listado de episodios con fechas de emisión
   - Reseñas de usuarios
   - Añadir/editar anime en tu lista personal
   - Sistema de puntuación personal

3. **Gestión de "Mi Lista"**
   - Guardado persistente en localStorage
   - Estados: Pendiente, Viendo, Completado, Abandonado
   - Sistema de favoritos
   - Filtros por estado
   - CRUD completo de animes

4. **Buscador Avanzado**
   - Filtros por tipo (TV, Película, OVA, etc.)
   - Filtros por estado de emisión
   - Filtros por clasificación
   - Ordenamiento personalizable
   - Formularios reactivos

5. **Enrutamiento**
   - `/` - Página de inicio con buscador
   - `/match` - Modo descubrimiento estilo Tinder
   - `/anime/:id` - Detalle del anime
   - `/mi-lista` - Lista personal del usuario

6. **Personalización**
   - Identidad visual propia con logo y nombre
   - Diseño moderno y responsivo

### Funcionalidades Opcionales ✅

1. **Modo Descubrimiento (Match) - Estilo Tinder** ⭐
   - Vista estilo Tinder para descubrir animes aleatorios
   - Desliza a la derecha o haz clic en ❤️ para guardar
   - Desliza a la izquierda o haz clic en ❌ para omitir
   - Soporte táctil (móvil) y mouse (desktop)
   - Estadísticas de guardados y omitidos
   - Animaciones fluidas de deslizamiento
   - Los animes guardados se añaden automáticamente a "Mi Lista" como "Pendiente"

2. **Modo Oscuro**
   - Toggle para cambiar entre tema claro y oscuro
   - Persistencia de preferencia en localStorage
   - Detección automática de preferencias del sistema

3. **Animaciones**
   - Transiciones suaves entre rutas
   - Animaciones en tarjetas al cargar
   - Efectos hover mejorados
   - Animaciones de swipe en modo Match

4. **Filtros en Mi Lista**
   - Filtrado por estados (Pendiente, Viendo, Completado, Abandonado)
   - Vista de favoritos
   - Contadores por categoría

5. **Puntuación Personal**
   - Sistema de calificación del 0 al 10
   - Comparación con la puntuación de la API
   - Visualización de diferencias

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. Clona o descarga el proyecto
2. Navega a la carpeta del proyecto:
```bash
cd mangamate
```

3. Instala las dependencias:
```bash
npm install
```

4. Inicia el servidor de desarrollo:
```bash
npm start
```

5. Abre tu navegador en `http://localhost:4200`

### Construcción para Producción

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/mangamate`.

## 📁 Estructura del Proyecto

```
mangamate/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/              # Página principal con buscador
│   │   │   ├── match/             # Modo descubrimiento estilo Tinder
│   │   │   ├── anime-detail/      # Detalle del anime
│   │   │   ├── my-list/           # Gestión de lista personal
│   │   │   ├── anime-card/        # Tarjeta de anime reutilizable
│   │   │   ├── search-bar/        # Barra de búsqueda simple
│   │   │   ├── advanced-search/   # Formulario de búsqueda avanzada
│   │   │   └── navbar/            # Navegación principal
│   │   ├── services/
│   │   │   ├── jikan.service.ts   # Servicio para API de Jikan
│   │   │   ├── my-list.service.ts # Gestión de lista local
│   │   │   └── theme.service.ts   # Gestión de tema oscuro/claro
│   │   ├── models/
│   │   │   └── anime.interface.ts # Interfaces TypeScript
│   │   ├── app.routes.ts          # Configuración de rutas
│   │   └── app.config.ts          # Configuración de la aplicación
│   └── styles.css                 # Estilos globales
└── package.json
```

## 🎨 Tecnologías Utilizadas

- **Angular 20.3** - Framework principal
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva
- **Jikan API** - API pública de MyAnimeList
- **CSS3** - Estilos personalizados con gradientes y animaciones

## 📡 API Utilizada

Este proyecto utiliza la [Jikan API](https://docs.api.jikan.moe/), una API REST gratuita y sin necesidad de autenticación que proporciona datos de MyAnimeList.

### Endpoints Utilizados:
- `GET /anime` - Búsqueda de animes
- `GET /anime/{id}` - Detalle de un anime
- `GET /anime/{id}/episodes` - Episodios de un anime
- `GET /anime/{id}/reviews` - Reseñas de un anime
- `GET /random/anime` - Anime aleatorio (usado en modo Match)

## 💾 Almacenamiento

Los datos de "Mi Lista" se almacenan localmente en el navegador usando `localStorage`. Esto significa que:
- Los datos persisten entre sesiones
- Cada usuario tiene su propia lista en su navegador
- No se requiere registro ni servidor backend

## 🎯 Características de Diseño

- **Diseño Responsivo**: Adaptado para móviles, tablets y escritorio
- **Modo Oscuro**: Tema oscuro completo con persistencia
- **Animaciones Suaves**: Transiciones y efectos visuales atractivos
- **UI Moderna**: Diseño limpio con gradientes y sombras
- **Accesibilidad**: Navegación por teclado y etiquetas ARIA

## 🔮 Posibles Mejoras Futuras

- Exportar/Importar lista personal
- Compartir lista con otros usuarios
- Notificaciones de nuevos episodios
- Integración con más APIs de anime

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso educativo y personal.

## 👨‍💻 Desarrollo

Desarrollado con ❤️ usando Angular y la API de Jikan.

---

**¡Disfruta descubriendo y organizando tus animes favoritos con MangaMate!** 🎌✨