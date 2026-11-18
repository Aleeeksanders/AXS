---
owner: Eris
tier: Técnico
status: Concepto
estado: Visión
---

# 🌿 Hecate (RFC: Workflow Engine)

↑ [[10-19 Strategic Vision/11 Visión de Producto/11 - Visión de Producto.md|Visión de Producto]]

> ⚪ **Visión, aún no construido.** Es parte de hacia dónde va AXS; todavía no existe en el código. Lo construido está en [[20-29 R&D (The Forge)/20 - The Forge.md|The Forge]].

#AXS/Infraestructura

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
