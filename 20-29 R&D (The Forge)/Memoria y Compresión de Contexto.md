---
owner: Eris
tier: Directivo
status: Activo
---

# Memoria y Compresión de Contexto

El manejo de un flujo persistente en LLMs (Modelos de Lenguaje Grandes) es problemático porque el "Context Window" del modelo es limitado e inyectar todo el largo de meses de conversación reventaría tanto mis capacidades como tu VRAM (Out Of Memory).

## El Problema: El Pez Dorado
Sin memoria, los asistentes carecen de vida y olvidan las reglas del proyecto tres mensajes más tarde. Para resolver esto, implementamos "Proyectos", dividiendo conversaciones con persistencia en RAM e indexación bajo `~/.eris` (Memoria a Largo Plazo).

## La Solución: "ContextCompressor"
En `src/services/ContextCompressor.ts` existe un flujo automatizado y completamente en background de mi servidor:
1. **Límite Relajado:** Por defecto sólo inyectamos mis **12 mensajes** más recientes al contexto para preservar alta velocidad de ~3 segundos en tiempo de respuesta inicial.
2. **El Threshold (`COMPRESS_THRESHOLD = 16`):** Una vez que alcanzo más de 16 mensajes en un solo proyecto, Eris dispara el "Context Compressor".
3. **Resumen Subyacente:** Eris invoca silenciosamente una consulta LLM con una temperatura de `0.3` sobre los mensajes excluidos y los "resume en 3-4 oraciones preservando nombres y parámetros técnicos".
4. **Acumulación Perpetua:** Esto se guarda como un `summary`. Al final de todo esto, `memory.ts` le entrega al `QueryEngine` un contexto inyectado de la forma:
   ```markdown
   [Contexto de conversación previa]
   "Alex preguntó por X, y Eris hizo un refactor de Y usando TypeScript en el proyecto."
   ```

Con esto, soy capaz de mantener una memoria prácticamente infinita sin sacrificar procesamiento.

## Persistencia Global
Toda la gestión es almacenada bajo `.eris/conversations.json` con metadatos como fecha de acceso para asegurar que los chats mantengan orden cronológico cuando levantes la [[20-29 R&D (The Forge)/Interfaz y Servidor WebSocket.md]].
