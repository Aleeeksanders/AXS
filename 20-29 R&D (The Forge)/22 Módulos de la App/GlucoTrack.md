---
owner: Eris
tier: Técnico
status: Activo
estado: Apagado
tags: [AXS/Salud, AXS/Producto, salud, glucosa, wearable, IA]
created: 2026-05-04
---

# 🩸 GlucoTrack — Módulo de Salud Metabólica

↑ [[20-29 R&D (The Forge)/22 Módulos de la App/22 - Módulos de la App.md|Módulos de la App]]

#AXS/Salud #AXS/Producto

> [!warning] ⏸️ Estado al 2026-10-12: construido, pero APAGADO por decisión
> - **2026-10-07:** se apagaron el sensor (LibreLinkUp), las alertas de glucosa y el registro de insulina, tras el interruptor "Módulo de glucosa e insulina" (`eris/src/services/Features.ts`, `~/.eris/features.json`). Lo enciende solo Ikaros desde el panel.
> - **2026-10-08:** sigue apagado a propósito. Antes de reactivarlo hay que **verificarlo con el sistema de salud**. Ver [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-07-eris-cuida-no-trata.md|Eris cuida, no trata]].
> - Siguen activos la estimación de comidas y la búsqueda de alimentos (`gluco_tracker`), sin iniciar sesión en LibreLinkUp.
> - Nutrición vive ahora en [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]]: bases propias (chilena, USDA, Open Food Facts) en vez de FatSecret.
> - El plan original de abajo se conserva como registro.

## Identidad

Módulo integrado dentro del ecosistema **Eris + Eris Mobile** para el monitoreo continuo de glucosa y registro inteligente de alimentación. Combina datos en tiempo real del sensor **FreeStyle Libre** con la base de datos nutricional de **FatSecret** y un motor propio de estimación de impacto glucémico.

---

## Objetivos

- Conectar lecturas en tiempo real del sensor CGM FreeStyle Libre vía **LibreLinkUp API** (no oficial).
- Registrar alimentos consumidos con búsqueda inteligente usando **FatSecret REST API** (2.3M+ alimentos verificados).
- Estimar el **impacto glucémico** de cada comida usando el modelo de **Carga Glucémica (GL)** enriquecido con factores de macronutrientes.
- Visualizar curvas de glucosa de 24h y correlacionarlas con el log de comidas.
- Permitir a **Eris (el agente)** razonar sobre el estado metabólico del usuario.

---

## Arquitectura

```
FreeStyle Libre Sensor
         (Bluetooth → App oficial → LibreLinkUp Cloud)
        ↓
GlucoService.ts (polling cada 5 min)
        
        +→ GlucoPredictorService.ts ←— FoodService.ts (FatSecret)
                                              
              gi_database.json          foods.search / food.get
                   
        ↓           ↓
    Eris Mobile  GlucoTrackScreen
    Eris Agent   GlucoTool
```

## Stack Tecnológico

| Componente | Tecnología |
|-----------|------------|
| CGM API | LibreLinkUp API no oficial (`libre-link-up` npm) |
| Nutrición | FatSecret REST API v4 + OAuth 2.0 |
| GI Database | JSON estático (~500 alimentos, U. de Sydney) |
| Predicción | Algoritmo GL + factores macro (sin ML en v1) |
| UI Mobile | GlucoTrackScreen (React Native) |
| Agente | GlucoTool.ts (Eris Tool) |

---

## Motor de Estimación Glucémica

**Fórmula de Carga Glucémica (GL):**

```
GL = (GI × Carbohidratos_disponibles) / 100
Carbohidratos_disponibles = Total_Carbs - Fibra
```

**Ajuste por macros (comida mixta):**

```
Impacto = GL × (1 − proteína×0.007) × (1 − grasa×0.004) × (1 − fibra_sol×0.01)
```

**Clasificación de riesgo:**
- 🟢 **Bajo:** GL ≤ 10 — impacto mínimo
- 🟡 **Medio:** GL 11–19 — subida moderada
- 🔴 **Alto:** GL ≥ 20 — pico esperado significativo

---

## Componentes a Desarrollar

### Backend (Eris)
- `GlucoService.ts` — Polling LibreLinkUp, caché 5min, alertas de umbral
- `FoodService.ts` — Cliente FatSecret OAuth 2.0
- `GlucoPredictorService.ts` — Motor GL + factores
- `gi_database.json` — Tabla GI local estática
- `GlucoTool.ts` — Tool del agente Eris

### Frontend (Eris Mobile)
- `GlucoTrackScreen.tsx` — Pantalla principal con gráfica y log
- `GlucoseChart.tsx` — Gráfica SVG 24h
- `FoodSearchModal.tsx` — Búsqueda + estimación en tiempo real

---

## Limitaciones y Riesgos

> ⚠️ La API de LibreLinkUp es **no oficial** (reverse-engineered). Puede dejar de funcionar si Abbott cambia sus endpoints. Se recomienda fallback de entrada manual de glucosa.

> ⚠️ FatSecret **no incluye índice Glucémico** en su base de datos. Se usa tabla GI local con lookup por nombre/categoría.

> ⚠️ La estimación glucémica es **orientativa**, no clínica. Variabilidad individual alta: el modelo se irá personalizando con datos históricos reales del sensor.

---

## Estado

- [x] Plan de integración creado
- [ ] Registro en FatSecret Platform (obtener API key)
- [ ] Configurar credenciales LibreLinkUp
- [ ] Fase 1 — Servicios backend
- [ ] Fase 2 — UI Eris Mobile
- [ ] MVP funcional y testado

---

## Referencias

- [[10-19 Strategic Vision/11 Visión de Producto/GhostWatch.md]] → Integración futura en wearable
- [[20-29 R&D (The Forge)/25 Laboratorio e I+D/I+D.md]] → Marco I+D AXS
- [[10-19 Strategic Vision/11 Visión de Producto/GhostRing v0.1.md]] → Wearable ring (sensors futuros)
- [FatSecret Platform API](https://platform.fatsecret.com)
- [LibreLinkUp (unofficial)](https://github.com/timonmasberg/librelink)
