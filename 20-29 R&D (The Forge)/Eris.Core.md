---
owner: Eris
tier: Técnico
status: Activo
---

# ⚡ Eris.Core (RFC: Orchestration Kernel)
#AXS/Producto #AXS/Core

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]]

## 🎯 Misión
Kernel interno de Eris. Actúa como el "brainstem" del sistema operativo.

## ⚙️ Responsabilidades
- **Session Manager:** Gestión del ciclo de vida de sesiones.
- **Routing:** Direccionamiento de intenciones al módulo correcto.
- **Permission Checks:** Verificación de roles (Hestia vs. Eris) y permisos.
- **Command Execution:** Ejecución local de herramientas y binarios.
- **Retry Logic:** Tolerancia a fallos y reintentos (hasta 10 iteraciones).

## 🔄 Estados
- Idle (En espera)
- Listening (Escuchando/Leyendo)
- Processing (Procesamiento LLM)
- Delegating (Delegando a otros módulos vía AXS.Link)
- Responding (Streaming de vuelta al usuario)

## 💻 Implementación Actual
> **Ruta:** `C:\Proyectos\eris\src\`

| Responsabilidad        | Archivo                   |
|------------------------|---------------------------|
| Loop agéntico + routing | `QueryEngine.ts`         |
| Servidor HTTP/WebSocket | `server.ts`              |
| Registro de herramientas | `tools.ts → ToolRegistry` |
| Interfaz CLI           | `ui-readline.ts` / `ui-ink.ts` |

## 📋 Interfaces / JSON Example
```json
{
 "intent": "daily_score",
 "target": "Valkyria"
}
```
