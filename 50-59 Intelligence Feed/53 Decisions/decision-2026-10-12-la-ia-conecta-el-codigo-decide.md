---
owner: Eris
tier: Directivo
status: Activo
date: 2026-10-12
project: Eris — Arquitectura
type: Decisión Ejecutiva
---

# 💎 Cristalización de Decisión — 2026-10-12

#AXS/Core #AXS/Producto

## ✅ Acuerdo
**Ley del producto: la IA conecta y conversa; los números y las reglas médicas salen de código y de fuentes verificadas.**
- Toda cifra (calorías, agua, plata, glucosa), toda regla de salud y toda acción ("lo anoté", "lo guardé") sale de una herramienta determinista que de verdad corrió.
- El modelo solo redacta lo que esa herramienta devuelve.
- Cada condición o módulo de salud nuevo entra así: datos verificados en código, la IA como puente.

## 📋 Contexto
Se formalizó al cerrar el checkpoint, pero se aplicó durante todo el período porque el modelo local de 4B (`qwen3.5:4b`) inventa:
- escribía "✅ Cena registrada" sin llamar a la herramienta;
- inventó saldos y metas de agua;
- guardó un sueño como nota permanente;
- "verificó" una meta de proteína "según tu médico";
- dedujo una glucosa de 248 mg/dL de la "baja energía", con el módulo apagado.

## 🔧 Cómo se aplica (patrones en el código)
- **Respuesta por código (`preroute` + `quickReply`):** agua, comida, consultas del día, finanzas, síntomas y sueño se resuelven sin el modelo cuando el mensaje es claro. Ante la duda, al modelo.
- **Bloque determinista anexado (`appendToReply`):** asesor metabólico, guía de síntomas, briefing de la bóveda. El modelo lee solo "hechos calculados".
- **Guardias en la respuesta final** (`eris/src/services/ReplyGuards.ts`, cableadas en `QueryEngine.ts`): registro afirmado sin herramienta, montos sin respaldo, razonamiento a la vista, repeticiones, glucosa inventada y tono alarmista. Un reintento y, si insiste, se corrige o se dice la verdad.
- **Metas con fuente única** (`DailyTargets.ts`) y horario con tabla única (`MealSchedule.ts`, copia exacta en la app).

Relacionado: [[20-29 R&D (The Forge)/21 Núcleo de Eris/Eris.Core.md|Eris.Core]] · [[10-19 Strategic Vision/Visión de Eris.md|Visión de Eris]]
