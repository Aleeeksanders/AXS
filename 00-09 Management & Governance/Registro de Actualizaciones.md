---
owner: Eris
tier: Directivo
status: Activo
---

# Registro de Actualizaciones (Changelog)

Este documento registra la historia de versiones, correcciones y ajustes masivos implementados en el repositorio base de Eris.

---

## v6.2 — Vault Restructure & Convenciones
Fecha: *[2026-07-30]*

- **`CLAUDE.md` en la raíz del vault:** convenciones extraídas y medidas del propio vault (wikilinks con ruta completa — 226 medidos, 0 simples; frontmatter y sus valores reales; vocabulario de tags; plantilla de notas de módulo). Incluye la regla de **verificar toda afirmación técnica contra el código** antes de escribirla.
- **Reestructuración Johnny Decimal:**
  - 5 docs técnicos (`Arquitectura y Core`, `Interfaz y Servidor WebSocket`, `Memoria y Compresión de Contexto`, `Query Engine`, `Sistema de Herramientas`) movidos de `00-09` → `20-29 R&D`, con reescritura de todos los enlaces entrantes.
  - `53 Decisions` movida de `00-09` → `50-59 Intelligence Feed`.
  - `06 - Archivo` → **`90-99 Archivo`** (respeta los rangos de dos dígitos).
- **Corrección en `CrystallizeTool.ts`:** tenía la ruta `00-09 .../53 Decisions` **hardcodeada** (habría recreado la carpeta vieja) y nombraba los archivos con **timestamp Unix**. Ahora escribe en `50-59` y genera slugs legibles (`decision-2026-05-04-optimizar-jornada-...`).
- **TSN:** integrado el preprint **v0.6.0** (vigente, PDF) en `10-19`; el `.md` v0.5.0 quedó `status: Histórico` con aviso de versión superada. El cluster TSN pasó de **0 enlaces entrantes** a estar conectado desde Dashboard, Panteón y Lander.
- **Índice del Intelligence Feed** (`50 - Índice del Feed`) para que logs, decisiones y reportes sean recuperables.
- **Dashboard** ampliado con Visión Estratégica y Feed.
- **Resultado medido:** 0 enlaces rotos · huérfanos **18 → 2** (solo `CLAUDE.md` y `MEMORY.md`, ambos por diseño) · 82 notas.

---

## v6.1 — Toji Performance & Hunter Wallet
Fecha: *[2026-07-26]* · App `eris-mobile` v1.1.2 (versionCode 3)

- **Hunter Wallet (Finanzas) — recalibración de tiers (Chile 2026, sueldo líquido):**
  - Escala de sueldo/ahorro reajustada a barreras reales del mercado (barrera del millón, 1.2M vs 1.8M, 2.5M).
  - Nuevo tier elite **SS** (sueldo > ~$5.1M / 10× SM); rango Hunter recalculado (`si*0.35 + vi*0.65`, ahorro pesa 65%).
  - Input aclarado como **sueldo líquido**, no bruto.
  - **"Consultar Eris" nativo:** panel de chat deslizante idéntico al de Toji (botón flotante + WebSocket streaming + "Ir a Eris →"), reemplazó el intento previo con modal WebView.

- **Toji / FORGE — saga de rendimiento y scroll** → ver [[20-29 R&D (The Forge)/Toji.md|Toji]]:
  - Eliminado `backdrop-filter: blur()` del tab bar fijo (repintado caro por frame en Android WebView).
  - WebViews de Toji/Finanzas ahora montan/desmontan por fase del portal (antes quedaban ambos vivos para siempre).
  - **Precompilación del JSX:** toji.html dejó de bajar `babel-standalone` (~2.87 MB) y transpilar en runtime; ahora React+ReactDOM van inline y el JSX precompilado → arranque instantáneo y offline.
  - **Fix de scroll (raíz):** un WebView dentro de una vista con `transform` animado pierde el scroll nativo del documento en Android → `PortalOverlay` quita el transform cuando el portal está `open` (sin remontar el WebView).
  - Bug de crash al logout/switch-account corregido (llamadas a estados eliminados `setTojiEverOpened`/`setWalletEverOpened`).

- **Decisión abierta:** migrar Toji de WebView/HTML a pantalla React Native nativa (plan documentado en [[20-29 R&D (The Forge)/Toji.md|Toji]]).

---

## v6.0 — Vault Integrity & Nutrition Hub
Fecha: *[2026-05-13]*

- **Auditoría Completa del Vault AXS:**
  - Reparación masiva de 76 archivos con doble-codificación UTF-8↔CP1252.
  - Corrección de YAML malformado en `Inbox.md`.
  - Eliminación de typos: `TyepScript`, `boveda`, `Gring`, pipe suelto en TSN Ciencia.
  - Enlace de nodos huérfanos: preprint TSN, ICA, Protocolo HRV, Blueprint.

- **Nutrición e Integración Metabólica:**
  - Implementación del `NutritionTool` y `GlucoTool` en el backend.
  - Integración de FatSecret API para búsqueda de alimentos por nombre y código de barras.
  - Dashboard de glucosa en `eris-mobile` con gráfico histórico y scanner de código de barras.
  - Sincronización de datos de Health Connect (HRV, sueño, pasos) hacia el Score Ejecutivo.

---

## v5.0 — Sovereign OS
Fecha: *[2026-04-25]*

- **Arquitectura Zero-Knowledge & Seguridad:**
  - Implementación de Handshake seguro en WebSocket sin credenciales en la URL.
  - Creación del `AuthRateLimiter` para bloquear intentos de fuerza bruta (10 intentos PIN, bloqueo 15 min).
  - Restricción de red estricta: Hestia solo opera en localhost.

- **Sistema de Roles (RBAC v2 — 2 roles):**
  - 🔱 **Hestia** (Admin Soberano): acceso absoluto al sistema, bóveda, bash.
  - ⚡ **Eris** (Usuario): acceso estándar, chat e inferencia.
  - *Nota: El rol Hefesto fue eliminado en esta versión por redundancia arquitectónica.*
  - El `QueryEngine` se instancia por perfil, filtrando el `ToolRegistry` según rol.
  - Inyección dinámica de `System Prompts` según identidad y metas biométricas del perfil.

- **Dashboard Ejecutivo Móvil (`eris-mobile`):**
  - App en React Native / Expo con navegación asíncrona segura.
  - Sincronización biométrica (Sueño, HRV, Pasos) mediante `Google Health Connect`.

---

## v2.0 — VaultService & Healing
Fecha: *[2026-04-20]*

- **VaultService nativo:** Operaciones de disco (lectura, escritura, búsquedas) sin binarios externos. Tiempo de búsqueda ~1s.
- **VaultHealerTool:** Detección e inyección de metadatos YAML a 53 archivos faltantes. Reparación de 981 caracteres rotos.
- **ExecutiveReportTool:** Reportes en Markdown estándar en lugar de HTML.
- **CSS refactor:** Reestructuración de la barra de input siguiendo estándares ergonómicos modernos de chat.

---

## v1.0 — Sovereign Dashboard
Fecha: *[2026-04-17]*

- Estabilización de UI/UX del Dashboard de Eris (temas Cyber/Lux, panel lateral, historial).
- "Executive Canvas" renderiza componentes estructurados e interactivos.
- Corrección de todos los botones y acciones del sistema.

---

## v0.1.0 — Red Neuronal Autocontenida
Fecha: *[2026-04-14]*

- **Arquitectura y Frontend:**
  - Servidor WebSocket en Bun para feedback de generación real Token-a-Token.
  - Interfaz Web de cero dependencias externas construida responsivamente.
  - Panel extensible para parsing nativo de `<think>` y `</think>`.

- **Manejo de Contextos Lógicos:**
  - Sistema de `Proyectos` con aislamiento de contexto independiente.
  - `Context Compressor`: auto-resumidor que previene exceder límites (< 12 msgs activos).

- **Estandarización Agéntica:**
  - `OllamaProvider` como único evaluador de pensamiento. Segregación asertiva anti "fugas de tags".

- **Infraestructura Evolutiva:**
  - Módulos para Fine-Tuning: `generate-dataset.ts`, extractor orgáúnico en Memory, combinador JSONL → ChatML.
