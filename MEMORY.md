# MEMORY INDEX - Eris (Layer 1)
Última actualización: 2026-11-18 (checkpoint de Hestia → log-2026-11-18; el resto, del 2026-10-12 → log-2026-10-12)

## 🧠 Identidad y Reglas Core
- **Perfiles de acceso:** `ikaros` (administrador; su perfil está en `roles.json`) y `eris` (público/app). Un rol desconocido cuenta como `eris`.
- **Hestia:** directora de AXS. Atiende al administrador en el **Modo AXS Executive** (selector Hestia · AXS).
- **Eris:** asistente de cuidado diario para todos. Tiene su propio motor, sin PC ni bóveda.
- **Lander:** proyecto en R&D bajo la TSN (acompañante). Pregunta ética abierta: [[10-19 Strategic Vision/Ética de la Conciencia Artificial.md|Ética de la Conciencia Artificial]].
- **Modelo:** `qwen3.5:4b` local para Flash, Deep y Auto (difieren en parámetros, no en modelo).
- **Leyes del producto:**
  - Eris **cuida, no trata**.
  - **La IA conecta, el código decide** (las cifras salen de herramientas).
  - **Preciso por dentro, simple por fuera** (todo disponible, nada obligatorio).
  - **Los datos de salud no salen del PC.**

## 🏛️ Arquitectura Actual
- **Backend:** Bun + TypeScript en `C:\Proyectos\eris\`.
- **Vault:** Obsidian en `C:\Proyectos\AXS\` (carpetas 00–99, reglas en `CLAUDE.md`).
- **Móvil:** React Native/Expo en `C:\Proyectos\eris-mobile\`, **versión 1.105.0**, con Health Connect. Se conecta por Tailscale.
- **Hestia Manos:** app Android aparte en `C:\Proyectos\hestia-manos\` (**0.11.0**), solo en el teléfono del administrador. Le da a Hestia las manos en el teléfono; habla con Eris por un canal firmado.
- **Seguridad:**
  - login solo con Google y aprobación humana para lo sensible;
  - bitácora firmada;
  - todo cifrado en disco desde el 2026-10-15: conversaciones, perfil y `kv_*` (también los respaldos).

## 📌 Decisiones Clave y Proyectos Activos
- **[Visión]:** una sola app que cruza todo, porque el cuerpo es un sistema. Eris nace de una condición de salud del fundador. → [[10-19 Strategic Vision/Visión de Eris.md|Visión de Eris]]
- **[Salud]:** registro por código, agua en una sola cuenta, metas únicas, horario del día y reloj interno, asesor y síntomas. → Valkyria
- **[Glucosa]:** construida y **apagada** hasta verificarla con el sistema de salud. → GlucoTrack
- **[Toji / FORGE]:** Eris carga el plan del día y el objetivo físico ajusta las metas. *Decisión abierta: migrar a React Native nativo.* → Toji
- **[Hunter Wallet]:** Bóveda, libro único, sueldo, fijos, cuotas y anotar por chat. → Hunter Wallet
- **[Voz]:** Whisper + VoiceFix + Piper (Daniela), todo local. Para Hestia, además, la llamada en tiempo real. → Voz de Eris
- **[Hestia en el teléfono]:** Hestia Manos (mensajes, llamadas, calendario, la palabra «Hestia», accesibilidad, su voz como llave) y «Hestia como JARVIS» L0–L6 (panel del equipo, presencia, avisos, entrenador, trabajos de fondo, protocolos, solo su voz). Falta probarlo en el teléfono. Reglas: [[50-59 Intelligence Feed/53 Decisions/decision-2026-11-18-hestia-en-el-telefono-reglas-fijas.md|decisión del 18-11]]. → Hestia como JARVIS
- **[Beta]:** 1 tester activo y 2 interesados. → [[30-39 GTM & Business Operations/Comercial/Beta Privada.md|Beta Privada]]
- **[Infra]:** todo en un notebook con RTX 3050 de 6 GB; se ahorra para un PC dedicado. → [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-11-pc-dedicado-para-eris.md|decisión]]

## 📋 Tareas Pendientes (Roadmap Inmediato)
- Probar en el teléfono lo de Hestia (llamada, Hestia Manos, L0–L6).
- Prueba con personas (paso 6), mensaje para testers y Tailscale propio para la beta.
- Respaldar `~/.eris/server_secret` fuera del PC (sin él no se abre ningún perfil, y ahora todo va cifrado).
- Resguardos contra la obsesión (modo sin números, señales de alerta, etiquetas sin juicio).
- Un profesional de salud que revise la guía de síntomas y la beta.
- Backlog completo: [[00-09 Management & Governance/Roadmap y Features.md|Roadmap y Features]].
