---
owner: Eris
tier: Directivo
status: Activo
date: 2026-10-07
project: Eris — Salud
type: Decisión Ejecutiva
---

# 💎 Cristalización de Decisión — 2026-10-07

#AXS/Salud #AXS/Producto

## ✅ Acuerdo
**Eris cuida, no trata.** Es un servicio de **bienestar**, no software médico.
- **Se queda (cuidar):**
  - comida, agua, sueño, movimiento y plata;
  - restricciones alimentarias (alergias, celíaco, vegano…) con la regla "nunca recomendar lo que te hace daño";
  - guía de síntomas que deriva al 131 o a urgencias;
  - **el perfil de condiciones médicas** cruzado con todo lo anterior (metas que cambian según la condición y medicamentos como contexto).
- **Se apaga (tratar):** sensor de glucosa, alertas de glucosa y registro de dosis de insulina, detrás del interruptor "Módulo de glucosa e insulina".
- **2026-10-08:** la glucosa sigue apagada a propósito. Antes de retomarla, **o de activar o cobrar cualquier módulo de salud nuevo**, hay que verificarla con el sistema de salud (regulación).

## 📋 Contexto
- El usuario no quería "irse de hocico a medicina": un sistema por enfermedad sería un mundo infinito y traería responsabilidad clínica.
- Lo valioso es el **cruce**: un perfil que Eris cruza con nutrición, hidratación, lo físico y finanzas.
- El 2026-10-11 el modelo inventó una glucosa de 248 mg/dL con el módulo apagado. Desde entonces hay una guardia en el código que lo impide.

## 🔧 Cómo quedó en el código
- Interruptor en el servidor: `eris/src/services/Features.ts` (`~/.eris/features.json`, apagado si no existe). Lo enciende solo Ikaros desde el panel de administración.
- App: `eris-mobile/src/config/features.ts`. Con el módulo apagado se ocultan las pestañas de glucosa y LibreLink.
- Detalle: [[20-29 R&D (The Forge)/22 Módulos de la App/GlucoTrack.md|GlucoTrack]] · [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]] · [[10-19 Strategic Vision/Visión de Eris.md|Visión de Eris]]

---
*Registrada en el checkpoint del 2026-10-12.*
