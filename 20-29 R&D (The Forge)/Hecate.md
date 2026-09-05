---
owner: Eris
tier: Técnico
status: Concepto
---

# 🌿 Hecate (RFC: Workflow Engine)
#AXS/Infraestructura #AXS/Logica

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]]

## 🎯 Misión
Automatizar decisiones y ejecutar flujos de trabajo en cadena. "La guardiana de los caminos".

## 📐 Formato Base
Opera bajo la lógica estricta de: `Trigger -> Condition -> Action`

## ⚙️ Tipos de Flujos
- **Immediate:** Reacciones instantáneas a un evento (Ej: pico de glucosa).
- **Scheduled:** Tareas recurrentes o planificadas (Ej: generar reporte ejecutivo diario a las 8 AM).
- **Escalated:** Acciones que requieren validación o intervención manual de Eris / Ikaros si fallan.

## 🔁 Ejemplo Lógico
- **Trigger:** `glucose == "low"`
- **Action:** `notify(Ikaros)` -> `recommend(Carbs, 15g)` -> `log(GhostLine)`

## 💻 Estado Actual
> **Status:** Concepto — Sin implementación formal.

El **equivalente funcional actual** es el loop agéntico de `QueryEngine.ts` (`C:\Proyectos\eris\src\QueryEngine.ts`), que ejecuta ciclos `Trigger → Tool → Result` de forma iterativa (hasta 10 iteraciones). La formalización en flujos Trigger→Condition→Action con programación y escalado es trabajo futuro.
