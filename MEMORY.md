# MEMORY INDEX - Eris (Layer 1)
Última actualización: 2026-07-26

## 🧠 Identidad y Reglas Core
- **Perfiles de Acceso**: `ikaros` (Usuario VIP / Admin con acceso total) y `eris` (Público / App).
- **Hestia**: La Soberana y Directora corporativa de AXS. Atiende exclusivamente bajo el perfil `ikaros`.
- **Eris**: IA Asistente General y Ejecutora de cara al público.
- **Lander**: Proyecto en R&D bajo la TSN (acompañante).
- **Dual-Mode**: Flash (⚡) y Deep (🧠) corren sobre el **mismo modelo** `qwen3.5:4b`; difieren en parámetros (temp, tokens, thinking), no en modelo.

## 🏛️ Arquitectura Actual
- **Backend**: Bun + TypeScript en `C:\Proyectos\eris\`
- **Vault**: Obsidian Vault en `C:\Proyectos\AXS\` (estructurado en carpetas 00-59)
- **Seguridad**: Perfiles de Acceso (`ikaros` = acceso VIP/Admin total, `eris` = público).
- **Móvil**: App React Native Edge-to-Edge (`C:\Proyectos\eris-mobile\`) con Health Connect.

## 📌 Decisiones Clave y Proyectos Activos
- **[Toji / FORGE]**: Módulo de acondicionamiento gamificado (WebView). Bug de scroll resuelto (jul-2026); JSX precompilado. → *Decisión abierta: migrar a React Native nativo.* Ver [[20-29 R&D (The Forge)/Toji.md|Toji]].
- **[Hunter Wallet]**: Módulo de finanzas personales (WebView, Preact+htm) con tiers de sueldo/ahorro (Chile 2026) y chat "Consultar Eris" nativo.
- **[Voice Live Mode]**: STT (Whisper) delegado al PC (RTX 3050), TTS nativo móvil (`expo-speech`). -> *En desarrollo (Fase 2).*
- **[Estructura de Red]**: Cloudflared + Tailscale para interfaz remota segura.

## 📋 Tareas Pendientes (Roadmap Inmediato)
- Reforzar los safeguards y permisos de las herramientas (`BashTool`).
- Completar la integración del servicio de audio (`VoiceService.ts`) en la app móvil.
