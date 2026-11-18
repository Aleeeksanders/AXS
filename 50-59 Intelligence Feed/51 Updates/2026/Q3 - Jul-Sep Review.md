---
owner: Eris
tier: Técnico
status: Histórico
---

# 📊 Reporte Q3 — Julio a Septiembre 2026

↑ [[50-59 Intelligence Feed/51 Updates/2026/Annual_2026_Report.md|Reporte Anual 2026]]

> Escrito el 2026-10-12 con el changelog (v6.1–v7.0), la nota diaria del 25-07 y la memoria de trabajo de septiembre.

## 📌 En una frase
**Eris se vuelve la app de la gente:** login con Google, aprobaciones de seguridad, voz, asesor metabólico, finanzas por chat y marca propia. La app pasa de la **1.1.2** a la **1.18+**.

## 🗓️ Julio — Forge y la bóveda
- **25-07 · Se resuelve el bug de scroll de Forge** después de un mes de pruebas: un WebView dentro de una vista animada pierde el scroll en Android.
- **26-07 · v6.1:**
  - Forge más rápido (JSX precompilado, sin descargar Babel);
  - Finanzas con niveles de sueldo y ahorro de Chile 2026 y chat "Consultar Eris";
  - **app v1.1.2**.
  - Nace la idea de migrar Forge a React Native.
- **30-07 · v6.2:** la bóveda se reordena con Johnny Decimal y se escriben sus reglas (`CLAUDE.md`). Huérfanas: de 18 a 2.
- **31-07 ·** Notas de Mini-Lander (lore) y "Producto estrella".

## 🗓️ Agosto
- Sin registros en la bóveda ni en el código.

## 🗓️ Septiembre (18 al 30) — la gran ola
- **18-09 · Eris escribe en Forge** (`training_plan`): propone el plan del día y lo carga en el módulo.
- **19-09 · Voz:** dictado con Whisper y respuesta con Piper ("Daniela"), todo local.
- **20-09 · Asesor metabólico:**
  - restricciones *fail-closed* (un celíaco nunca ve gluten);
  - catálogo de 195 alimentos con alérgenos;
  - envasados chilenos de Open Food Facts;
  - dietas (app 1.15.0).
- **21-09 · Seguridad y Hestia:**
  - instrucciones por proyecto (1.16.0);
  - **login solo con Google** (1.17.0);
  - **tarjetas de aprobación**, panel de administración y bitácora firmada (1.18.0);
  - Hestia con enrutador de herramientas y capa determinista sobre la bóveda.
- **22-09 ·** Las metas nutricionales llegan al teléfono.
- **27/28-09 · Marca:**
  - logo de AXS y nombre "Artificial eXperience System";
  - búsqueda en INAPI (riesgo con "AXS" sola);
  - ícono real de la app.
- **28-09 · App:**
  - burbuja de Eris sobre otras apps;
  - arreglado el cierre al registrar agua (carrera de Android);
  - registro de comida por código, porque el modelo "anotaba" sin anotar.
- **29/30-09 · Inicio de la separación Eris/Hestia** y **Finanzas con Bóveda**: fusión con Super-expenses y anotar gastos por chat.

## 🧠 Lecciones del trimestre
- **El modelo local de 4B inventa:** afirmaba registros que no hizo. Respuesta: resolver por código lo que se pueda y exigir la herramienta.
- **La seguridad no puede depender del prompt:** un shell manejado por un modelo chico necesita aprobación humana y una política de rutas.
- **Los bugs largos se resuelven aislando:** el scroll de Forge se resolvió probando capa por capa.

## 📌 Estado al cerrar el trimestre
- App ~1.18 con login con Google, voz, asesor, finanzas por chat y burbuja.
- Marca en desarrollo. Hestia con herramientas seguras sobre la bóveda.
- Arrastra a Q4: la separación completa de Eris y Hestia, la honestidad del modelo y que la app se entienda fácil.
