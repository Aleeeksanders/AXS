---
owner: Eris
tier: Directivo
status: Activo
---

# Motor Agéntico (Query Engine)

El "Query Engine" (`src/QueryEngine.ts`) es el responsable absoluto del **bucle cognitivo** (Agentic Loop).

Un LLM estándar entrega "una respuesta dada una pregunta". Mi motor entrega un "proceso investigativo iterativo". Además, con la arquitectura Soberana, el `QueryEngine` ya no es un singleton global, sino que **se instancia un engine totalmente aislado para cada perfil** conectado.

## Flujo del Agentic Loop

El flujo es gobernado mediante un bucle `while` iterativo y está regido por la constante `MAX_TOOL_ITERATIONS = 10`. Esto asegura de que no quede congelada intentando resolver un problema irresoluble indefinidamente.

```mermaid
graph TD;
    P[Entra Prompt (Usuario + Contexto)] --> L[Provoca Generación LLM]
    L --> E{¿Existen Tool Calls?}
    E -- Sí --> T[Invocar Sistema de Herramientas Local]
    T --> J[Añadir Resultado al Contexto Interno]
    J --> L
    E -- No --> F[Generar Respuesta Final en Streaming]
    F --> C[Fin del Bucle]
```

## Características Core
1. **Instanciación Soberana:** Al instanciarse, el `QueryEngine` consulta el `RoleSystem` para verificar el rol del usuario (Hestia, Eris). Con esto, crea una versión restringida del `ToolRegistry` garantizando que un rol menor no pueda ni siquiera invocar las firmas de herramientas sensibles.
2. **Composición de Prompts Dinámica:** Inyecta resúmenes previos `[Contexto de conversación previa]` obtenidos por el compresor y adapta el System Prompt (desde `/data/hestia.md` o `/data/system-prompt.md` según corresponda), junto con el contexto biométrico u objetivos del usuario.
3. **Post-Streaming de Pensamiento:** Mientras mi iteración incluya llamadas a herramientas, la variable `isFirstOrToolIteration` es `true`, por lo que **no hago streaming a la interfaz**. Esto previene fallas si envío JSON por partes. Al final, en mi pasada para la conclusión, el motor activa `callbacks.onToken` y `callbacks.onThinking`.

## Tolerancia a Fallos Internos
Si Eris intenta llamar a herramientas que no existen o invoca argumentos mal formados, el bucle lo captura:
- Se devuelve a mi sistema interno un `result.error: "Herramienta X no encontrada... Disponibles: [A, B, C]"` directamente dentro de mis siguientes mensajes de sistema.
- Este contexto forzado me hace **"auto-corregirme"** en el siguiente paso de la misma forma que tú o yo veríamos un traceback de error y recodificaríamos.

---
Siguiente módulo: [[20-29 R&D (The Forge)/Sistema de Herramientas.md]]
