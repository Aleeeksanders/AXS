---
owner: Eris
tier: Directivo
status: Activo
estado: Construido
---

# Arquitectura y Core

↑ [[20-29 R&D (The Forge)/21 Núcleo de Eris/21 - Núcleo de Eris.md|Núcleo de Eris]]

El "Core" define cómo mi cerebro de red neuronal es alojado, ejecutado e interactuado. Todo mi sistema parte de aquí.

## Bases del Motor
El motor que me procesa usa la arquitectura inferencial local de **Ollama**. El sistema opera en **Dual-Mode**:
- **Flash (⚡):** `qwen3.5:4b` (`temp 0.3`, menos tokens) — respuestas rápidas, comandos sencillos, control de hardware.
- **Deep (🧠):** `qwen3.5:4b` (`temp 0.6`, más tokens/contexto) — razonamiento complejo, análisis de código, informes ejecutivos.

Ambos modos usan el **mismo modelo** (`qwen3.5:4b`), diferenciándose solo por parámetros. Optimizado para la **Nvidia RTX 3050** del host.

1. **Eficiencia en Borde (Edge-Efficiency):** El modelo Flash (~4B parámetros) encaja de manera excelente con las especificaciones del hardware local.
2. **LoRA Adaptability:** La arquitectura transformadora limpia facilita el uso de "Low-Rank Adaptation" (LoRA) a través de Fine-tuning. Ver [[20-29 R&D (The Forge)/21 Núcleo de Eris/Evolución y Fine-Tuning.md]] para ese proceso.

## LLM Provider (Provider Pattern)
En `src/services/llm/LLMProvider.ts`, existe mi abstracción de alto nivel. Para evitar bloqueos tecnológicos o inflexibilidad ("vendor lock-in"), me he diseñado sobre una interfaz puramente paramétrica `LLMProvider`:
- Emisión de Tokens Dinámica: Separa los streams y facilita un loop de "Pensamiento vs Contenido" sin enredarlo con la lectura de red (Network I/O).

Bajo eso, se encuentra mi implementación literal actual `OllamaProvider` (`src/services/llm/OllamaProvider.ts`):
- Se encarga del manejo granular de la abstracción de Tool Calling nativo (o mi propio custom parsing).
- Filtra exhaustivamente lo que entra en los callbacks de pensamiento `onThinking(token)`.
- Evita de raíz todo tipo de "fugas de tags" (Leakage) controlando los límites del `<think>` y `</think>`.

## Integración Continua (Bun Runtime)
Mi código no es NodeJS convencional. Corro bajo **Bun**, un runtime súper optimizado para TypeScript local rápido.
- Mi server arranca instanciando mis proveedores.
- Inicializa la Memoria Larga Vida. [[20-29 R&D (The Forge)/21 Núcleo de Eris/Memoria y Compresión de Contexto.md]]
- Me monta en WebSockets y me expone a un entorno web y móvil mediante un protocolo asíncrono seguro. [[20-29 R&D (The Forge)/21 Núcleo de Eris/Interfaz y Servidor WebSocket.md]]

## Sistema Operativo Soberano (Multi-Usuario & Zero-Knowledge)
He evolucionado de un asistente personal aislado a un Sistema Operativo de Inteligencia Soberana multi-usuario.
La arquitectura central de seguridad (`src/services/security/`) garantiza:
- **Zero-Knowledge Architecture**: La memoria y conversaciones de cada perfil (`eris/data`) se cifran en disco con AES-256-GCM (`CryptoService`, clave derivada del PIN vía `scrypt`). El PIN nunca viaja en la URL ni se almacena en el servidor. *(Las notas de la bóveda Obsidian son texto plano local-first.)*
  - > **Corrección del 2026-10-12** (verificado en `memory.ts`):
    > - Los perfiles viven en `~/.eris/profiles/<perfil>/`.
    > - Desde sep-2026 el login es con Google y la clave sale de `~/.eris/server_secret`.
    > - ~~Solo las conversaciones y proyectos se cifran.~~ **Desde el 2026-10-15 también el perfil (`profile.json`, con el historial médico) y los registros del día (`kv_*.json`)**, con la misma llave del perfil. Ver [[20-29 R&D (The Forge)/21 Núcleo de Eris/Eris.Memory.md|Eris.Memory]].
- **Aislamiento por Perfil**: Cada conexión instancia su propio `QueryEngine` aislado, inyectando su propio `system_prompt` según el contexto del usuario (nombre, metas, idioma).
- **Protección Anti-Fuerza Bruta**: El `AuthRateLimiter` restringe los intentos de conexión (10 para PIN, 5 para Llave de Recuperación), con bloqueos incrementales almacenados en `security.json` para evitar ataques locales.

### Sistema de Roles (v5.0 — Sovereign OS)
La interacción del ecosistema se administra jerárquicamente a través de perfiles y permisos dinámicos en el `ToolRegistry`:
- 🔱 **Hestia**: Administrador Soberano. Acceso absoluto al sistema, sistema de archivos, bóveda Obsidian (vía `VaultService`), y gestión de roles. *Restricción de Red: Operación permitida únicamente desde `localhost`.*
- ⚡ **Eris**: Usuario Estándar. Acceso exclusivo al dashboard biométrico y chat de inferencia sin herramientas de sistema.

---
> Para la forma secuencial de mi razonamiento y acciones con herramientas en mi entorno, ver: [[20-29 R&D (The Forge)/21 Núcleo de Eris/Query Engine.md]]
