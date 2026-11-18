---
owner: Eris
tier: Técnico
status: Activo
estado: Parcial
---

# 🔭 Argos (RFC: Intelligence & Surveillance Layer)

↑ [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/23 - Plataforma e Infraestructura.md|Plataforma e Infraestructura]]
#AXS/Producto

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[10-19 Strategic Vision/11 Visión de Producto/GhostLine.md|GhostLine]], [[10-19 Strategic Vision/11 Visión de Producto/GhostWatch.md|GhostWatch]]

## 🎯 Misión
Capa de vigilancia e inteligencia ambiental del ecosistema AXS. Procesa señales del entorno para generar alertas proactivas.

## 📡 Fuentes de Datos
- Sensores de dispositivos Ghost (Ring, Watch, Lens).
- Feeds de contexto ambiental (ubicación, clima, calendario).

## ⚙️ Función Core
Agregar contexto externo para enriquecer el razonamiento de Eris con estado situacional en tiempo real.

## 💻 Estado Actual
> **Status:** Concepto — Sin capa de telemetría proactiva formal.

El **equivalente funcional parcial** es `LogManagementTool.ts` (`C:\Proyectos\eris\src\tools\LogManagementTool.ts`) y el log pasivo del servidor (`eris_server.log`). La agregación proactiva de contexto ambiental y alertas automáticas basadas en feeds es trabajo futuro.

### 🟡 Piezas que ya corren (sep–oct 2026)
- **Bitácora firmada:** `eris/src/services/security/AuditLog.ts` escribe en `~/.eris/audit/audit.jsonl`.
  - Es un JSONL encadenado con HMAC: editar, borrar o reordenar se detecta.
  - Guarda solo metadatos (secretos enmascarados): decisiones sobre herramientas, logins, administración y seguridad.
- **Estado del PC:** `eris/src/services/SystemStatus.ts` mide CPU, RAM, disco y los puertos 3000, 11434, 8081 y 5001. Se ve en el panel **AXS** de la app.
- **Panel de administración** (solo Ikaros): usuarios, roles, sesiones y "módulos con visto bueno" (`eris/src/services/security/AdminService.ts`, app `src/screens/AdminPanel.tsx`). **Nunca abre la memoria de otro perfil.**
- **Avisos del día** en el teléfono (comida, agua, entreno, finanzas): son la primera forma de "alerta proactiva". Ver [[20-29 R&D (The Forge)/22 Módulos de la App/Experiencia de la App.md|Experiencia de la App]].
