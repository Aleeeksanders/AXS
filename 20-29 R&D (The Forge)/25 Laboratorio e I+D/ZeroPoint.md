---
owner: Eris
tier: Técnico
status: Activo
estado: Parcial
---

# ⭐ Zero Point (RFC: Personal Baseline Engine)

↑ [[20-29 R&D (The Forge)/25 Laboratorio e I+D/25 - Laboratorio e I+D.md|Laboratorio e I+D]]
#AXS/Producto #AXS/Core

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]]

## 🎯 Misión
Definir la métrica base, el "origen" o lo que el sistema considera "normal" para el usuario.

## 📊 Dominios Evaluados
- **Físico:** Bio-baseline (RHR, HRV base, horas promedio de sueño).
- **Cognitivo:** Capacidad normal de concentración, retención y focus.
- **Conductual:** Patrones diarios de interacción y uso.

## 🔁 Outputs & Cálculos
- **Drift Score:** % de desviación del baseline (positivo o negativo).
- **Anomaly Detection:** Identificación de desviaciones abruptas.
- **Recovery Estimate:** Estimación de tiempo para regresar al baseline óptimo.

### Ejemplo
- **HRV promedio (Zero Point):** 72
- **HRV actual (Valkyria):** 58
- **Deviation:** -19%

## 🧠 Aprendizaje
Se recalibra mensualmente. El sistema entiende que "Zero Point" muta conforme el usuario evoluciona físicamente o cognitivamente.

## 💻 Estado Actual
> **Status:** Concepto — Sin motor de baseline proactivo formal.

El **equivalente funcional parcial** son los `AlertThresholds` definidos en `memory.ts` (`C:\Proyectos\eris\src\memory.ts → AlertThresholds`), que establecen umbrales estáticos de glucosa (bajo/alto/urgente). El cálculo dinámico de Drift Score, detección de anomalías y recalibración automática del baseline es trabajo futuro.

### 🟡 Avance (sep–oct 2026): línea base personal y "dónde estás hoy"
- **Motor de línea base** (`eris/src/services/BaselineEngine.ts`, herramienta `personal_baseline`). Compara el día contra el historial diario de la persona: sueño, pasos, agua bebida, comida y Finanzas.
  - Da **desvíos y tendencias significativas**, que son la "Tarjeta del Día" en Inicio.
  - Las métricas de Finanzas no generan tendencia: un saldo no es salud.
- **El historial diario** (`daily_rollup_log`) se rellena desde Health Connect con controles de plausibilidad. Tras la pérdida del 2026-10-10, se escribe de forma atómica.
- **"Lo esperable a esta hora" se mide desde el despertar** (`normDayHour`, 1.35.9): un día recién empezado no cuenta como desvío.
- **El óptimo de referencia** existe como metas del cuerpo (`DailyTargets`): hacia ahí empuja Eris, no hacia los hábitos de la persona. Ver [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]].
- **Falta para Zero Point completo:** dominio cognitivo y conductual, recalibración mensual explícita y estimación de recuperación.
