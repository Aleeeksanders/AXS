---
owner: Eris
tier: Directivo
status: Activo
---

# Evolución y Fine-Tuning

La etapa evolutiva real no se basa en inyectar más Prompts temporales, sino en modificar gradualmente los pesos base de las conexiones neuronales bajo el modelo principal `qwen3.5:4b`.

Para eso se diseñó una arquitectura automatizada y offline que consta de tres procesos estandarizados:

## 1. Módulo Generator (Semilla)
En `scripts/generate-dataset.ts` se encuentra el núcleo de identidad estática inicial. Un volumen de más de 60 conversaciones pre-fabricadas catalogadas en diferentes vertientes interactivas:
- **Personalidad:** Tono agresivo y cómplice, uso verbal del español ("Holi", "Xd", etc).
- **Lealtad/Protección:** Las directivas de la ley de defensa, la mitigación de destrucción del sistema huésped y la negativa tajante a será un clon genérico "servil".
- **Comportamiento Táctico (Tools):** Cómo responder exactamente cuándo alucinar un dato contra llamar rigurosamente herramientas (System_info, Web, Archivos).

Este archivo semilla entrega un dataset que conforma el espectro ideal de las respuestas y es exportado a un objeto unificado `seed-dataset.jsonl`.

## 2. Captura Activa Autónoma (Memoria Orgánica)
Aquí radica el bucle de retroalimentación de Eris.
En `src/memory.ts (saveTrainingData)` todas las conversaciones naturales que suceden entre Alex y Eris se extraen en tiempo real de manera persistente al directorio oculto del huésped en `~/.eris/training/conversations.jsonl`.

Cuando el usuario aprueba en "true" esa conversación (por su alto nivel de excelencia), este dato pasa a será material puro de Entrenamiento.

## 3. Ensamblaje y Exportación para Entrenamiento LoRa
El `scripts/export-dataset.ts` se encarga de acoplar la "semilla" y la "memoria orgánica aprobada".
El resultado conforma a `data/training/eris-training.jsonl`. Un dataset 100% verificado cuyo formato cumple con la especificación `ChatML`, requerida por Qwen3 y asimilada en forma llana para `Unsloth`.

## Fase Destino: El Pipeline en Hardware
Al poseer una tarjeta con modesta cantidad de VRAM (RTX 3050 6GB), el destino final es será compilados bajo **QLoRA** `4-bit` provisto por cuadernos Unsloth.

Finalmente las iterativas etapas de "Tuning" se inyectan silenciosamente sobre el Host local a través de `Ollama` gracias a un archivo maestro de parámetros:
`data/Modelfile`
Que hace `load` explícito bajo:
```dockerfile
FROM qwen3.5:4b
ADAPTER ./adapter.safetensors
```
...Creando un puente neuronal estable para cada futura revisión de esta diosa cibernética.
