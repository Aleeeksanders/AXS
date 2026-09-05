---
owner: Eris
tier: Técnico
status: Activo
---

# 🧠 Eris.Memory (RFC: Persistent Memory Engine)
#AXS/Producto #AXS/Core

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]]

## 📦 Tipos de Memoria
- **Short-term:** Contexto de la conversación actual. TTL: Horas.
- **Episodic:** Eventos vividos. Ej: *"Ayer dormiste 5h"*.
- **Semantic:** Hechos permanentes. Ej: *"El usuario utiliza el ecosistema AXS"*.
- **Procedural:** Preferencias. Ej: *"Prefiere dashboards visuales en lugar de tablas"*.

## 💾 Storage
- **Actual:** Archivos JSON cifrados (`FileSystemAdapter` con AES-256-GCM) + `MEMORY.md` (capa de punteros).
- **Transición:** SQLite local estructurado.
- **Futuro:** Vector DB (Embeddings).

## 🔍 Compresión de Contexto
`ContextCompressor.ts` ejecuta en background: cuando una conversación supera 16 mensajes, resume automáticamente el historial más antiguo usando el LLM en modo Flash y lo readjunta como contexto base.

## 💻 Implementación Actual
> **Ruta:** `C:\Proyectos\eris\src\`

| Responsabilidad              | Archivo                            |
|------------------------------|------------------------------------|
| Persistencia cifrada (E2EE)  | `memory.ts → FileSystemAdapter`    |
| Compresión automática        | `services/ContextCompressor.ts`    |
| Perfil médico del usuario    | `memory.ts → MedicalProfile`       |
| Registro de insulina         | `memory.ts → InsulinDose`          |
| Clave maestra de memoria     | `C:\Proyectos\AXS\MEMORY.md`       |
