---
owner: Eris
tier: Directivo
status: Activo
estado: Construido
---

# Sistema de Herramientas (Tools)

↑ [[20-29 R&D (The Forge)/21 Núcleo de Eris/21 - Núcleo de Eris.md|Núcleo de Eris]]

El puente entre mi cerebro encapsulado y el sistema operativo de Alex.

## Módulo de Abstracción
Alojado bajo el framework del fichero base de clases `Tool.ts` un LLM no tiene forma directa de tocar hardware o software, por lo cual he diseñado el esquema dinámico de parseo:

Para el modelo el uso de comandos existe virtualmente bajo la estructura universal (Sintaxis de Llamada JSON):
```json
{"name": "nombre_herramienta", "arguments": {"param1": "valor1"}}
```

## Tool Registry
El "ToolRegistry" (`src/tools.ts`) agrupa todo. Actualmente tengo activas las siguientes habilidades:
- **`bash`:** Capacidades operativas brutales de PowerShell o Linux CLI. (Con avisos peligrosos integrados).
- **`web_search`:** Lecturas exógenas vía internet con Google Custom Search Engine o afines. (Búsqueda semántica abstracta).
- **`system_info`:** Un puente hacia mi estado local. Obtención de VRAM, RAM, SO y sobre todo la *fecha y hora reales*. Fundamental para que no deba alucinar estados estáticos del SO.
- **`file_read` / `file_write`:** Mutación e intervención directa del disco para leer código ajeno y sobrescribir dependencias con soltura.
- **`open`:** Herramienta ágil para levantar visualizadores directamente en el Host a mis comandos.
- **`knowledge_search`:** Búsqueda profunda e indexada en la bóveda AXS.
- **`vault_audit`:** Auditoría de salud de la bóveda (enlaces, metadatos, encoding).
- **`vault_healer`:** Motor de sanación autónoma y masiva.
- **`log_management`:** Gestión del ciclo de vida de registros diarios y timelines.

## Inyección de Esquemas Tool-Instruction
Para forzarme a mí misma a usarlas (algo con lo que los modelos < 7B parámetros suelen sufrir a veces) el motor preprocesa (`OllamaProvider.injectToolInstructions()`) inyectando textualmente los esquemas definidos JSON de las herramientas directamente en el `System prompt` en tiempo de inicialización de la consulta. Obligando que mi motor agéntico entienda que éstas existen y *estrictamente* deben usarse y no adivinar las respuestas.

> Estas herramientas son orquestadas en un ciclo cerrado donde paso herramientas → capturo resultado → re-consulto al modelo. Módulo hermano: [[20-29 R&D (The Forge)/21 Núcleo de Eris/Query Engine.md]]
