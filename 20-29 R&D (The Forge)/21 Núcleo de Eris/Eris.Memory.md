---
owner: Eris
tier: Técnico
status: Activo
estado: Construido
---

# 🧠 Eris.Memory (RFC: Persistent Memory Engine)

↑ [[20-29 R&D (The Forge)/21 Núcleo de Eris/21 - Núcleo de Eris.md|Núcleo de Eris]]
#AXS/Producto #AXS/Core

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]]

## 📦 Tipos de Memoria
- **Short-term:** Contexto de la conversación actual. TTL: Horas.
- **Episodic:** Eventos vividos. Ej: *"Ayer dormiste 5h"*.
- **Semantic:** Hechos permanentes. Ej: *"El usuario utiliza el ecosistema AXS"*.
- **Procedural:** Preferencias. Ej: *"Prefiere dashboards visuales en lugar de tablas"*.

## 💾 Storage
- **Actual:** `FileSystemAdapter` en `~/.eris/profiles/<perfil>/` + `MEMORY.md` (capa de punteros).
  - **Cifrado (AES-256-GCM), con la llave maestra del perfil:**
    - `conversations.json` (conversaciones y proyectos) y el registro de entrenamiento;
    - **desde el 2026-10-15**, también `profile.json` (con el historial médico) y las claves `kv_*.json` (comida, agua, snapshot de salud, historial diario, Finanzas, metas).
  - **Cómo se reconocen:** empiezan con `ERISENC1:` (`ENC_PREFIX`). Un archivo viejo sin prefijo se sigue leyendo y se cifra la próxima vez que el perfil entra (`encryptAtRest`, en `load()`).
    - Antes de reemplazar cada archivo, lo cifra, lo vuelve a abrir y lo compara con el original. Si no calza, el original queda intacto.
  - **Sin llave no se escribe en claro:** `set` y `saveProfile` fallan si el perfil no está desbloqueado (antes `encrypt` devolvía el texto tal cual).
  - **Migración de una vez:** `bun scripts/encrypt_at_rest.ts` (simula) y `--aplicar` (con el backend detenido) cifran los perfiles con cuenta de Google y sus respaldos. El 2026-10-15 se cifraron 89 archivos (3 perfiles y el respaldo del 10-10). Los perfiles viejos con PIN propio se cifran cuando esa persona vuelva a entrar.
  - **Escritura atómica** de las claves y del perfil (archivo temporal + renombrar) desde el 2026-10-10, tras perder 17 días del historial diario. La lectura distingue "no existe" de "no se pudo leer" y reintenta.
  - La clave de cifrado de cada perfil sale de `~/.eris/server_secret` (login con Google). Ver [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/Nyx.md|Nyx]].
- **Transición:** SQLite local estructurado.
- **Futuro:** Vector DB (Embeddings).

## 🔍 Compresión de Contexto
`ContextCompressor.ts` ejecuta en background: cuando una conversación supera 16 mensajes, resume automáticamente el historial más antiguo usando el LLM en modo Flash y lo readjunta como contexto base.

## 💻 Implementación Actual
> **Ruta:** `C:\Proyectos\eris\src\`

| Responsabilidad              | Archivo                            |
|------------------------------|------------------------------------|
| Persistencia cifrada (conversaciones, perfil y kv) | `memory.ts → FileSystemAdapter` |
| Cifrado AES-256-GCM          | `services/security/CryptoService.ts` |
| Migración de archivos viejos | `scripts/encrypt_at_rest.ts`       |
| Compresión automática        | `services/ContextCompressor.ts`    |
| Perfil médico del usuario    | `memory.ts → MedicalProfile`       |
| Registro de insulina         | `memory.ts → InsulinDose`          |
| Clave maestra de memoria     | `C:\Proyectos\AXS\MEMORY.md`       |
