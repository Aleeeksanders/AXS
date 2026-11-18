---
owner: Eris
tier: Directivo
status: Activo
---

# Estado Actual de Eris

> **Actualizado:** 2026-11-18 (checkpoint de Hestia; el resto, del 2026-10-12). Línea de tiempo y pendientes en log-2026-10-12 y log-2026-11-18 · Visión en [[10-19 Strategic Vision/Visión de Eris.md|Visión de Eris]].

Eris es un asistente de IA **100 % local** que cruza comida, agua, sueño, entreno, plata y condiciones médicas para acompañar a cada persona. Hestia es su contraparte ejecutiva para el fundador y para AXS.

## Capacidades Core Activas
- **Inferencia local:** Ollama con `qwen3.5:4b` (`src/types/config.ts`). Flash, Deep y Auto usan el mismo modelo con otros parámetros.
  - Contexto adaptativo de 8192 a 16384 tokens que no se reduce mientras el modelo está cargado y veta los niveles que lo dejan fuera de la GPU.
  - Hardware: RTX 3050 de 6 GB. **Es el límite actual**, ver TI.
- **Dos personas, dos motores:**
  - **Eris** (todos los usuarios): cuidado diario con 14 herramientas, sin PC ni bóveda.
  - **Hestia** (Modo AXS Executive, solo el administrador): todo, incluido el panel **AXS** de empresa.
  - Chats separados por asistente, más chats temporales.
- **Respuestas por código antes que el modelo:** agua, comida (también varias comidas en un mensaje), consultas del día, «¿cómo voy?», finanzas, síntomas y sueño se resuelven al instante cuando el mensaje es claro.
- **El modelo ve solo lo que necesita (2026-10-16):** herramientas por intención y prompt por secciones, para no pasar el contexto de 8192. Se mide con el banco de pruebas del chat (`scripts/chat_eval/`, 37/37 casos).
- **Guardias de honestidad:** nada de "lo anoté" sin herramienta, montos, glucosas ni tono alarmista inventados. Ver [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-12-la-ia-conecta-el-codigo-decide.md|la IA conecta, el código decide]].
- **Aprobación humana** para acciones sensibles del PC y de la bóveda, con bitácora firmada (HMAC).
- **Motor agéntico** de hasta 10 iteraciones, con rescate si falla la redacción después de que las herramientas ya actuaron.
- **Memoria por proyectos** con instrucciones fijas por proyecto, y compresión del historial en segundo plano.

## 🔱 Hestia en el teléfono (2026-11-16 → 18, solo el administrador)
Todo esto existe solo en el Modo AXS Executive. Eris, la de los usuarios, no lo tiene. **Está construido y probado en el PC; falta probarlo en el teléfono.**
- **La llamada de voz en tiempo real:** el reconocimiento va en el teléfono, sin internet; la respuesta suena por frases con Piper, y se la interrumpe hablando. Ver [[20-29 R&D (The Forge)/21 Núcleo de Eris/Voz de Eris.md|Voz de Eris]].
- **Hestia Manos (app aparte, 0.11.0):**
  - mensajes, llamadas y WhatsApp, con un «sí» después de oír el texto;
  - el calendario;
  - la palabra «Hestia»;
  - manejar apps con la accesibilidad, con una lista de lo que nunca toca;
  - su voz como llave con el teléfono bloqueado.
  - Ver [[20-29 R&D (The Forge)/22 Módulos de la App/Hestia Manos.md|Hestia Manos]].
- **Hestia como JARVIS (L0–L6):**
  - panel del equipo con límites y pausa;
  - presencia (audífonos, en casa) y avisos que hablan;
  - el entrenador en el oído con Forge;
  - trabajos de fondo;
  - protocolos (gimnasio, dormir, foco, salir, casa);
  - en la llamada, solo su voz, frase por frase.
  - Ver [[20-29 R&D (The Forge)/21 Núcleo de Eris/Hestia como JARVIS.md|Hestia como JARVIS]].
- **Reglas fijas por código:** [[50-59 Intelligence Feed/53 Decisions/decision-2026-11-18-hestia-en-el-telefono-reglas-fijas.md|decisión del 2026-11-18]].

## 🔐 Datos y privacidad (estado real, verificado en `memory.ts`)
- **Todo queda en el PC.** El modelo, la voz y los datos son locales, y los datos de salud no salen a servicios externos.
- **Cifrado en disco:**
  - **Se cifra todo (AES-256-GCM) desde el 2026-10-15:**
    - las **conversaciones y proyectos** (`conversations.json`) y el registro de entrenamiento;
    - el **perfil** (`profile.json`, con el historial médico);
    - las claves del día `kv_*.json`: comida, agua, snapshot de salud, historial diario, Finanzas y metas.
  - Todo eso está en `~/.eris/profiles/<perfil>/`, en el PC. Los respaldos de `~/.eris/backups/` también quedaron cifrados.
  - Los perfiles viejos de prueba con PIN propio se cifran cuando esa persona vuelva a entrar.
- **Acceso:** login solo con Google. La clave de cada perfil sale de `~/.eris/server_secret` (**respaldar**).
- *Las notas de esta bóveda Obsidian son texto plano local-first, no cifradas.*

## Módulos de producto
- 🟢 **Salud (Valkyria):**
  - registro de comida por chat y en la app;
  - agua en una sola cuenta (con la de la comida);
  - metas únicas;
  - horario del día y reloj interno;
  - calidad nutricional;
  - asesor metabólico;
  - guía de síntomas;
  - exámenes (HbA1c).
- ⏸️ **Glucosa e insulina (GlucoTrack):** construido, **apagado** hasta verificarlo con el sistema de salud.
- 🟢 **Finanzas (Hunter Wallet), versión 2.0 nativa (2026-10-15, app 1.44.0):** núcleo probado con copia exacta en el servidor, respaldo cifrado en el PC, migración desde la web solo si cuadra al peso, Resumen tipo terminal (para gastar hasta el sueldo, runway, patrimonio, tickers), presupuesto al día del mes, rating AAA…CCC por conducta (reemplaza al Rango Hunter), «¿y si me compro…?» por chat y avisos de presupuesto. Desde la 1.45.0 anota sin tipear: timbre de la boleta, avisos del banco y cartola, siempre con «Por confirmar».
- 🟢 **Forge (Toji):** Eris carga el plan del día, y el objetivo físico ajusta las metas.
- 🟢 **Experiencia (Experiencia de la App):** Inicio simple, bienvenida, recorrido, notificaciones con avisos del día, y burbuja sobre otras apps.
- 🟢 **Voz (Voz de Eris):** dictado con contexto y respuesta hablada.

## Catálogo de Herramientas (selección)
- **Cuidado (modo Eris):**
  - `nutrition_tracker`, `metabolic_advisor`, `carb_options`, `symptom_guide`, `sleep_log`, `lab_results`;
  - `finance_tracker`, `training_plan`, `personal_baseline`, `get_live_context`, `personal_journal`, `web_search`;
  - `gluco_tracker` (solo la estimación de comidas; el sensor está apagado).
- **Hestia / AXS:**
  - `axs_briefing`, `vault_note`, `vault_audit`, `knowledge_search`, `crystallize`;
  - `bash`, `file_read`/`file_write`, `open`, `system_info`, `admin_overview`;
  - `telefono` (el teléfono vía Hestia Manos, desde 2026-11-16).
  - Las acciones sensibles piden aprobación.

## Ecosistema Activo
- **Servidor:** Bun + WebSocket con streaming token a token (`C:\Proyectos\eris\`).
- **Interfaz móvil (`eris-mobile`):** React Native / Expo, **versión 1.105.0** (2026-11-18). Usa Health Connect, la conexión con el servidor va por Tailscale y la APK se reparte por Drive.
- **Interfaz web local:** Sovereign Dashboard (`eris/web`).
- **Beta privada:** 1 tester activo y 2 interesados. Ver [[30-39 GTM & Business Operations/Comercial/Beta Privada.md|Beta Privada]].
- **Pipeline evolutivo:** captura de conversaciones para un futuro fine-tuning (no ejecutado).

## Roles
- 🔱 **Ikaros / Hestia** (administrador): todo, con aprobación humana para lo sensible. Ya no depende de localhost: entra con Google desde el teléfono, en el Modo AXS Executive.
- ⚡ **Eris** (usuarios): cuidado diario. Un rol desconocido cuenta como Eris (*fail-closed*).
