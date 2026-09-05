---
owner: Eris
tier: Directivo
status: Activo
---

# Roadmap y Features (Backlog técnico)

> **Este documento = el *qué* construir** (features y pipeline de inteligencia). Para el *ritmo* de trabajo (rituales diario/semanal) ver [[00-09 Management & Governance/00 - AXS Roadmap|Roadmap — Cadencia Operativa]].

El cerebro de Eris evolucionará constantemente respondiendo tanto al requerimiento de Alex como a las limitaciones técnicas del modelo y el hardware anfitrión. Este documento enlista los "Siguientes Pasos" de gran y pequeña escalabilidad.

## Prioridad Alta (El Pipeline Real de Inteligencia)
- [ ] **Despliegue del Fine-Tuning**: Configurar el hardware en Google Colab o purgar dependencias locales (Python/Torch) y ejecutar una iteración real usando los Scripts exportados adaptados vía `Modelfile`. La personalidad se atará intrínsecamente.
- [ ] **Feedback Ultradirecto y Automatizado**: Incorporar a la GUI botones `+` y `-` para aceptar y rechazar respuestas, alterando orgánicamente el tag `approved: boolean` de la base JSONL sin interacción pesada de un IDE.

## Features del Sistema y Herramientas (Expansiones)

### Mejoras a la "Visión" y Comprensión Sensorial
- [ ] **Soporte de Contexto Expandido RAG**: Si la compresión actual de memoria empieza a difuminar contextos de proyectos técnicos grandes, implementar inserciones de DB vectoriales estáticas como Chroma o integraciones ligeras de SQLite paramétricas.
- [ ] **Capacidad Multimodal**: Adicionar un tool que acepte o interprete un parser OCR si el usuario pasa un screenshot a Eris de un error, en caso de que un modelo tipo LLaVA no sea el adecuado.

### Mejoramiento Motor Agéntico (The Query Loop)
- [ ] **Intervención y Auto-Recuperación de Schema**: Cuando el formato JSON entregado en `parameters` o `arguments` por la IA es malformado, incorporar un pre-parser ligero que trate de reparar las comas faltantes antes de inyectar la re-consulta en el loop.

### Mejoras en Accesibilidad Externa
- [ ] **Reconocimiento y Sintetización de Voz**: Integración vía Local STT (Ej: Whisper.cpp) y un engine simple de TTS para interacción por voz.
- [ ] **Extensiones nativas para VS Code**: Adaptador WebSocket que hable directamente desde VS Code hacia el servidor actual.
