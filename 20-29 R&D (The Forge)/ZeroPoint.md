---
owner: Eris
tier: Técnico
status: Concepto
---

# ⭐ Zero Point (RFC: Personal Baseline Engine)
#AXS/Producto #AXS/Core

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[20-29 R&D (The Forge)/Valkyria.md|Valkyria]]

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
