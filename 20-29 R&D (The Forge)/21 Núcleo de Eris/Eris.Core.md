---
owner: Eris
tier: Técnico
status: Activo
estado: Construido
---

# ⚡ Eris.Core (RFC: Orchestration Kernel)

↑ [[20-29 R&D (The Forge)/21 Núcleo de Eris/21 - Núcleo de Eris.md|Núcleo de Eris]]
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

## 🧠 Cómo responde hoy (2026-10-12)
- **Modelo:** `qwen3.5:4b` local en Ollama (`src/types/config.ts`). Flash y Deep usan el mismo modelo con otros parámetros; el modo Auto decide.
- **Un motor por modo:**
  - **Modo Eris:** el prompt de Eris y solo las herramientas de cuidado (14), sin PC, bóveda ni administración.
  - **Modo AXS Executive:** Hestia, con todo.
  - El servidor arma un segundo motor por perfil (`perfil#eris`), y el modo viaja en cada mensaje.
- **Enrutador de herramientas (`ToolRouter`):** por mensaje, el modelo solo ve los grupos que tocan (salud, finanzas, AXS, sistema, admin, web). El prompt pasa de ~11.400 a 4.600–6.500 tokens.
- **Respuesta por código antes que el modelo:**
  - `preroute` resuelve agua, comida, consultas del día, finanzas, síntomas, sueño y el briefing de la bóveda;
  - `quickReply` responde al instante, sin una segunda pasada.
- **Bloques deterministas (`appendToReply`):** las listas con cifras las arma el código. El modelo lee solo "hechos calculados".
- **Contexto adaptativo (`ContextPlanner`):** niveles 8192 / 10240 / 12288 / 16384.
  - Nunca baja el contexto mientras el modelo esté cargado.
  - Veta los niveles que dejan el modelo fuera de la GPU.
  - Las llamadas secundarias (resumen, voz, tip) usan el nivel ya cargado y van sin razonamiento.
- **Razonamiento:** se apaga en las iteraciones con herramientas y en las órdenes de anotar comida (1.36.0). Antes, un tester esperó 7 minutos.
- **Guardias en la respuesta final (`ReplyGuards`):** un reintento y, si insiste, se corrige o se dice la verdad.
  - registro o "lo guardé" sin herramienta;
  - montos sin respaldo;
  - razonamiento a la vista;
  - repeticiones;
  - glucosa sin medición y tono alarmista (1.35.9);
  - cifras a la chilena.
  - Ver [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-12-la-ia-conecta-el-codigo-decide.md|la IA conecta, el código decide]].
- **Aprobaciones:** bash, escribir archivos, abrir, notas de la bóveda y cristalizar decisiones piden una tarjeta de aprobación humana. Ver [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/Nyx.md|Nyx]].

## 💻 Implementación Actual
> **Ruta:** `C:\Proyectos\eris\src\`

| Responsabilidad        | Archivo                   |
|------------------------|---------------------------|
| Loop agéntico, guardias y aprobaciones | `QueryEngine.ts` |
| Servidor HTTP/WebSocket y motores por modo | `server.ts` |
| Registro de herramientas | `tools.ts → ToolRegistry` |
| Enrutador de herramientas | `services/ToolRouter.ts` |
| Contexto adaptativo | `services/llm/ContextPlanner.ts` |
| Guardias de la respuesta | `services/ReplyGuards.ts` |
| Contexto de hoy (metas, día, plata) | `services/LiveContext.ts` |
| Modelos y modos | `types/config.ts` |
| Interfaz CLI           | `ui-readline.ts` / `ui-ink.ts` |

## 📋 Interfaces / JSON Example
```json
{
 "intent": "daily_score",
 "target": "Valkyria"
}
```
