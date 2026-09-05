---
owner: Eris
tier: Técnico
status: Activo
---

# 🥷 Toji / FORGE (RFC: Conditioning RPG Module)
#AXS/Producto #AXS/Salud

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[20-29 R&D (The Forge)/Valkyria.md|Valkyria]], [[20-29 R&D (The Forge)/Eris.Core.md|Eris.Core]]

## 🎯 Misión
Módulo de acondicionamiento físico gamificado estilo RPG (inspirado en Toji Fushiguro / *Cuerpo de Restricción Celestial*). Convierte el entrenamiento en progresión: niveles, XP, rangos, árbol de habilidades y misiones diarias, apoyado por el coach de Eris que lee la biometría de [[20-29 R&D (The Forge)/Valkyria.md|Valkyria]].

## 🧩 Componentes
- **Niveles / XP / Rango:** 80 niveles, rangos por umbral (`El Despertar` → …).
- **Árbol de habilidades:** ~79 skills (fundamentos, fuerza·calistenia, parkour, acrobacia·flips, forma final) con pan/zoom y prerequisitos.
- **Misiones diarias (6):** entrenamiento, comidas, glucosa, pasos, sueño, agua → XP diario + rollover.
- **Registro / Diario / Libro / Rutina:** historial de días, editor de rutina en Markdown, cálculo calórico (TDEE = basal × factor actividad).
- **Consultar Eris:** panel de chat **nativo** (no WebView) que replica el patrón de Toji; rutea por WebSocket al backend con la biometría + estado Toji como contexto.

## 🏗️ Arquitectura
> **WebView** que carga `eris-mobile/assets/toji.html` sobre `baseUrl: file:///android_asset/`.

- **UI:** React 18 con JSX. **Desde jul-2026 el JSX va precompilado a JS plano e inline** (ver abajo) — antes se transpilaba con `babel-standalone` en runtime.
- **Estado:** `localStorage` del WebView, clave por perfil `toji-rpg-v1-${profileId}` (migración automática desde la clave legacy `toji-rpg-v1`).
  - ⚠️ El origen del `localStorage` es el `baseUrl` (`file:///android_asset/`). **No cambiar el `baseUrl`** o se pierde el acceso al progreso guardado.
- **Puente nativo:** `injectedJavaScriptBeforeContentLoaded` inyecta `window.__ERIS_DATA__` (biometría) y `__ERIS_PROFILE_ID__`. Mensajes `CONSULT_ERIS` / `TOJI_WORKOUT_SYNC` vía `postMessage`.
- **Contraste con Finanzas:** el módulo Hunter Wallet (`assets/hunter-wallet.html`) usa **Preact + htm** (≈4 KB, sin transpilación) → siempre fue liviano.

## 🐞 Saga de rendimiento y scroll (jul-2026)
Toji se sentía pesado / no respondía al táctil mientras Finanzas iba suave. Se investigó por capas:

1. **`backdrop-filter: blur()`** en el tab bar fijo + zoom bar + overlay → caro en Android WebView al repintar en cada frame de scroll. **Eliminado** (fondos casi opacos). Mejora, pero no era el cuello.
2. **WebViews simultáneos:** los flags `tojiEverOpened`/`walletEverOpened` mantenían ambos WebViews montados para siempre. Se cambió a montar/desmontar según la fase del portal (`phase !== 'hidden'`). El estado persiste en `localStorage`, así que desmontar no pierde progreso.
3. **Arranque (causa del "congelamiento"):** toji.html bajaba de CDN `React` + `ReactDOM` + **`babel-standalone` (~2.87 MB)** y transpilaba ~2600 líneas de JSX **en el teléfono, en cada montaje**. Fix: **precompilar el JSX** a JS plano (preset `react`) e **inlinear React+ReactDOM** dentro del HTML → sin Babel, sin CDN, arranca offline e instantáneo.
   - *Gotcha del build:* al inlinear el React minificado con `String.replace`, las secuencias `$` (p.ej. `"$&/"` del escape de keys) se interpretan y corrompen el código → usar **función de reemplazo**.
4. **Bug de scroll (causa raíz del "no responde"):** el contenido del WebView no scrolleaba al tacto **excepto el árbol de habilidades** (que tiene su propio `overflow:auto`). Diagnóstico: un WebView dentro de una vista con **`transform`/`opacity` animados** (el `PortalOverlay`) **pierde el scroll nativo del documento en Android**; el scroll interno de un div lo maneja el compositor de Chromium y sobrevive. El HTML/CSS se verificó limpio (scroll y `touch-action` OK en navegador). **Fix:** en `PortalOverlay`, cuando la fase es `open` se elimina el `transform`/`opacity` del contenedor de contenido (mismo `Animated.View` → el WebView **no se remonta**). Además el WebView de Toji alineado con Finanzas (`overScrollMode="never"`, sin barra de scroll).

> ⚠️ **toji.html ya está transpilado**: el JSX legible ya no existe en el archivo (está como `React.createElement`). Para cambios grandes conviene mantener una fuente JSX aparte y re-correr la precompilación, o editar con cuidado el JS.

## 🚀 Plan de migración a nativo (propuesto)
Eliminar el WebView/HTML y reescribir Toji como pantalla React Native mata **toda** esta clase de bugs.

| Parte | Esfuerzo | Notas |
|---|---|---|
| Lógica (estado, XP, niveles, skills, ejercicios, TDEE, persistencia) | Bajo | Ya es JS; se porta casi directo. `localStorage` → `AsyncStorage` con la misma clave por perfil. |
| UI de pestañas (Hoy, Cuerpo, Diario, Libro, Rutina, Arena) | Medio-alto | `div`+CSS → `View`/`Text`/`ScrollView`+`StyleSheet`. Mecánico pero extenso. |
| Árbol de skills con pan/zoom | Alto | `react-native-gesture-handler` + `reanimated` en vez del canvas HTML. |
| Markdown (Rutina/Libro) | Bajo | Reutiliza `react-native-markdown-display` (ya en el chat). |

Ventaja: scroll nativo perfecto, menos memoria, sin dependencia del render del WebView. Costo: horas, mejor por pestañas y probando cada una.

## 💻 Implementación Actual
> **Rutas:** `C:\Proyectos\eris-mobile\`

| Responsabilidad | Archivo |
|---|---|
| UI del módulo (WebView app, precompilada) | `assets/toji.html` |
| Pantalla nativa host + panel "Consultar Eris" | `src/screens/TojiScreen.tsx` |
| Transición de portal (montaje + fix de scroll) | `src/components/PortalOverlay.tsx` |
| Wiring de fases / navegación a Eris | `App.tsx` |
| Avatares por rango+clase | Sistema PixAI (2 ejes: rango + clase, 10 clases, 5 tiers) — biblia de prompts en repo |
