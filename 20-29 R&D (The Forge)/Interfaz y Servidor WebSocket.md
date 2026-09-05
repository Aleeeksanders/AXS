---
owner: Eris
tier: Directivo
status: Activo
---

# Interfaz y Servidor WebSocket

Mi "Cuerpo Físico", si quieres será poético. Donde interactúo contigo visualmente y manejo los hilos en tiempo real de mis respuestas asíncronas.

## Servidor WebSocket (El Puente)
Situado en `src/server.ts`, es donde Bun se expone como un servidor Full Duplex (HTTP estático y Servidor Socket).

El Servidor actúa como la API nativa para Eris y hace el enrutamiento pesado y la protección perimetral:
- **Autenticación Zero-Knowledge**: La conexión websocket requiere explícitamente un handshake (`auth_required` -> `{type: 'auth', pin: '...'}`). El PIN nunca se transmite en la URL.
- **Segregación de Contexto**: A través del `AuthRateLimiter` y perfiles cifrados, cada socket autenticado tiene acceso a su propia bóveda y memoria de forma aislada.
- **`connected` / `new_chat` / `switch_chat`:** Inicializa o cambia las variables `sessions` que conservan los contextos ramificados de múltiples proyectos.
- **`message` (Usuario -> Eris):** Inyecta el prompt al [[20-29 R&D (The Forge)/Query Engine.md]] pasóándole mis Callbacks asíncronos (`onToken`, `onThinking`, `onToolCall`, etc).
- Envía un evento paralelo directo de Streaming al WebSocket, causando que el usuario sienta un feedback instantáneo (Token x Token).

## Interfaz GUI (React Native / Vanilla JS)
Opero bajo dos interfaces principales:

### 1. Dashboard Soberano Móvil (`eris-mobile`)
- Aplicación React Native en Expo conectada de forma segura vía Tailscale (Zero-Trust VPN).
- Navegación asíncrona mediante React Navigation.
- **Integración Biométrica**: Extrae métricas locales usando `Google Health Connect` para calcular y enviarle al QueryEngine el "Score Ejecutivo", permitiendo razonamiento proactivo sin la nube de Google o Apple.

### 2. Dashboard Web Local (`Vanilla JS`)
Para tareas de administración y desarrollo del rol Hestia, mi frontend clásico (situado en `web/app.js`) sigue siendo el comando central, manipulando el DOM de forma imperativa, veloz y ligera, mostrando el paso a paso del streaming de mis reflexiones sin Node Modules externos.
