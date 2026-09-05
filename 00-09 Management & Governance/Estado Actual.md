---
owner: Eris
tier: Directivo
status: Activo
---

# Estado Actual de Eris

Este documento resume mis capacidades operativas y técnicas al día de hoy. Eris es un asistente de IA 100% local, centrado en la ejecución autónoma y el acompañamiento como par técnico.

## Capacidades Core Activas
- **Inferencia Local:** Corriendo sobre `Ollama` con el modelo `qwen3.5:4b` para ambos modos (Flash ⚡ / Deep 🧠, diferenciados por parámetros: temperatura, tokens y `enableThinking`), en hardware doméstico (RTX 3050 6GB). Contexto de 4096 tokens en Flash para latencia mínima.
- **Protocolo Antigravity:** Razonamiento ejecutivo basado en ciclos de Investigación → Planificación → Ejecución → Verificación. Eris actúa bajo un mandato de "Carta Blanca" para mantenimiento no estructural.
- **Razonamiento Transparente:** La inferencia separa el pensamiento analítico (`<think>`) de la conversación. Visualizable en la interfaz gráfica en tiempo real.
- **Motor Agéntico:** Capacidad de encadenar acciones de forma iterativa y autónoma antes de entregar la respuesta final (hasta 10 reintentos si ocurren errores).
- **Aislamiento Soberano:** Sistema multi-perfil donde cada conexión instancia su propio `QueryEngine`, inyectando el contexto biométrico, de personalidad y roles específicos del usuario.
- **Seguridad Zero-Knowledge:** La **memoria y conversaciones de cada perfil** de Eris (`eris/data`) se cifran en disco con AES-256-GCM (`CryptoService`, clave derivada del PIN vía `scrypt`). *Nota: las notas de esta bóveda Obsidian (`AXS/*.md`) son texto plano local-first, no cifradas.* Autenticación protegida por `AuthRateLimiter` (bloqueo 15 min ante fuerza bruta) y restricción de red (Hestia opera *exclusivamente* desde localhost).
- **Memoria por Proyectos:** El panel lateral soporta manejar múltiples ramas de conversación de forma independiente.
- **Persistencia Atómica:** Sistema de escritura de archivos blindado contra corrupción de datos.
- **Tolerancia a Context Window (Compresión):** Capacidad de mantener conversaciones "infinitas", al resumir en background los mensajes más antiguos cada vez que la cuenta supera los 16 mensajes y readjuntarlos a la base del sistema.

## Catálogo de Herramientas Operativo
En el estado actual poseo control e interfaz con las siguientes vertientes del sistema Host mediante invocaciones seguras en JSON:
- `bash`: Ejecución de scripts o consultas locales al S.O.
- `web_search`: Evasión del límite de la fecha de mis datos a través de peticiones online.
- `system_info`: Extracción de mi fecha, VRAM y estado de recursos.
- `file_read` / `file_write`: Modificación granular del sistema de archivos.
- `knowledge_search`: Búsqueda profunda e indexada en la bóveda AXS.
- `log_management`: Gestión del ciclo de vida de registros diarios y timelines.
- `vault_audit`: Herramienta de auditoría de salud (enlaces, metadatos).
- `vault_healer`: Motor de sanación autónoma y masiva.
- `open`: Explorador y launcher de dependencias locales.

## Ecosistema Activo
- **Servidor:** Bun Runtime + WebSocket para transmisión Token por Token. Autenticación Zero-Knowledge en handshake sin transmisión de PIN por URL.
- **Interfaz Web (Local):** Vanilla JS + CSS (Soporte Dark mode nativo). Centro de operaciones principal para el rol Hestia.
- **Interfaz Móvil (`eris-mobile`):** Aplicación React Native Expo. Actúa como Dashboard Ejecutivo, sincronizando biométricas mediante `Google Health Connect` para proveer "Score Ejecutivo" y enviar telemetría a la inferencia del servidor vía `Tailscale`.
- **Pipeline Evolutivo:** Generación de Dataset base estandarizada y captura en tiempo real de nuevas conversaciones para proceso iterativo de `Fine-Tuning`.

## Sistema de Roles (v5.0)
- 🔱 **Hestia (Admin Soberano)**: Acceso absoluto. Bóveda Obsidian, sistema de archivos, bash, asignación de roles. Restricción de red: solo opera desde `localhost`.
- ⚡ **Eris (Usuario)**: Perfil estándar para chat e inferencia con integración al dashboard biométrico.
