---
owner: Eris
tier: Técnico
status: Activo
estado: Construido
---

# 🥷 Toji / FORGE (RFC: Conditioning RPG Module)

↑ [[20-29 R&D (The Forge)/22 Módulos de la App/22 - Módulos de la App.md|Módulos de la App]]
#AXS/Producto #AXS/Salud

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]], [[20-29 R&D (The Forge)/21 Núcleo de Eris/Eris.Core.md|Eris.Core]]

## 🎯 Misión
Módulo de acondicionamiento físico gamificado estilo RPG (inspirado en Toji Fushiguro / *Cuerpo de Restricción Celestial*). Convierte el entrenamiento en progresión: niveles, XP, rangos, árbol de habilidades y misiones diarias, apoyado por el coach de Eris que lee la biometría de [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]].

Desde **Forge 2.0 (2026-10-17)** además registra el entreno **como se hace de verdad** (cada serie con su carga y qué tan cerca del fallo quedó), mide la **fuerza real**, arma **rutinas por código** y muestra el **progreso** en 1 mes / 3 / 6 / 1 año, sin perder el RPG (sobre todo el árbol).

## 🧩 Componentes (el RPG, intacto)
- **Niveles / XP / Rango:** 80 niveles, rangos por umbral (`El Despertar` → …).
- **Árbol de habilidades:** 79 skills (fundamentos, fuerza·calistenia, parkour, acrobacia·flips, forma final) con prerrequisitos.
- **Misiones diarias:** entrenamiento, comidas, glucosa, pasos, sueño, agua → XP diario + rollover y racha.
- **22 subgrupos musculares** con decaimiento, clases y atributos, títulos y la **Arena** (mismos enemigos y fórmulas).
- **Diario / Libro / Rutina** y el cálculo calórico del cuerpo.

## 🆕 Forge 2.0 (2026-10-17, app 1.51.0 → 1.54.0)
Pedido del usuario: metas que sepan cuándo va a entrenar («calorías fantasma»), carga real, músculos en el personaje, árbol automático, fuerza real, máquinas, rutinas de Eris, gráficos «como Smart Fit» y pesos que existan («no me sirve una pesa de 7,5 kg si son mancuernas de 7»). Se hizo **igual que Finanzas 2.0**: respaldo primero, núcleo puro con copia exacta en el servidor, migración «al peso» y pantallas nativas, con el HTML como vuelta atrás.

- **F0 — Respaldo (1.51.0):** copia **cifrada** de lo de Forge en el PC (una por día, las últimas 7), restaurable desde Perfil. Antes Forge vivía solo en el `localStorage` del WebView.
- **F1 — Núcleo y migración:**
  - La lógica del RPG se **genera** desde `toji.html` con un script (cambios mecánicos y nada más), así el XP no cambia ni un punto.
  - La migración lee el HTML con un WebView oculto y **compara al peso** (nivel, XP, músculos, racha, habilidades, Arena). Si algo no calza, sigue el HTML.
  - El XP del entreno se cuenta **por serie**: anotar una serie nunca resta XP (en el HTML, una serie más liviana bajaba el XP del día).
- **F2 — Forge nativo (1.52.0):** pestañas Hoy · Entrenar · Personaje · Árbol · Arena · Progreso · Rutina, con la cara del HTML (oscuro, rojo y dorado; Teko y Rajdhani).
  - **Registro por serie:** reps, carga y **RIR** (al fallo · 1 · 2 · 3+), calentamientos aparte.
  - **Catálogo de 130 ejercicios** (48 del HTML + 82 nuevos): máquinas de placas y de discos, poleas, barra, Smith, kettlebell, bandas y **asistidos** (la asistencia se resta del peso corporal, nunca pesos negativos).
  - **«Mi gimnasio»:** solo pesos que existen. Mancuernas (juego comercial o las tuyas), barra y discos con calculadora, cada máquina con su unidad (kg o lb) y su escalón, que se pregunta la primera vez. Presets Smart Fit, Sportlife, Upgrade (ex Pacific), «otro» y «en casa».
- **F3 — Gasto por carga y «¿entrenas hoy?» (1.53.0):**
  - El gasto depende de la **carga y el RIR**, no de un MET fijo: 3,5 liviano (RIR 3+) · 5,0 duro (RIR 1–2) · 6,0 al fallo o pesado (≥ 80 % del máximo), +0,5 en multiarticulares grandes; tiempo = reps × ~3 s + descanso; neto = (MET − 1) × 0,0175 × peso × minutos (Compendio 2024).
  - **«¿Entrenas hoy?»** en Inicio, en Forge, en un aviso con botones y por chat («hoy entreno pierna a las 7», «hoy descanso»). Se pregunta solo a quien entrena, y se insiste a las 12:30 y 16:30 si no respondió.
  - **Metas «según el día»** solo si respondió. El entreno planificado que falta es el **fantasma** de «te quedan X», con la línea «sin el entreno te pasarías por…». Avisos de comida antes y después del entreno.
- **F4 — Fuerza, músculos y árbol automático:**
  - Máximo estimado con Epley (reps + RIR, solo series de ≤ 10 reps y RIR ≤ 3) contra los estándares de **Strength Level** por sexo y peso. **Score de fuerza 0–100** = percentil, el mejor de cada patrón (empuje, tirón, pierna).
  - **Mapa muscular** en el personaje: series de la semana por músculo contra 10–20 (ACSM).
  - **Árbol automático:** 31 pasos de 20 habilidades se marcan solos con lo que REALMENTE entrenaste (p. ej. «8 dominadas estrictas» = una serie de 8+ sin asistencia). Los de técnica siguen a mano; desmarcar uno se respeta.
- **F5 — Rutinas de Eris:**
  - El generador decide por código: 2–3 días cuerpo completo, 4 torso/pierna, 5–6 empuje/tirón/pierna. Cubre todos los patrones, cuida las zonas con lesión y parte con cargas reales del equipo.
  - **Doble progresión** (al pasar el tope de reps sube el siguiente peso real) y descargas.
  - Cada día carga solo «lo de hoy». Hay un **score de entrenamiento** (constancia, progresión, volumen, RIR cumplido, sueño).
  - Por chat: `training_plan` con `build_routine` / `adjust_routine`.
- **F6 — Progreso (1.54.0):** PROGRESO › Gráficos con **1 mes · 3 meses · 6 meses · 1 año**.
  - **El mes es para que nadie abandone:** entrenos, mejor semana, racha y «primeras marcas».
  - **Desde el 3er mes:** la curva del score de fuerza semana a semana, **«tú hace 3 meses»** y la constancia.
  - **Siempre:** cada ejercicio (máximo, peso, reps o volumen), series por músculo contra la zona 10–20 y **récords** con sentido por equipo (peso como lo marca la máquina, lastre, menos asistencia, reps). Aviso «¡RÉCORD!» al anotar.
  - Eris lee lo mismo con `training_plan` → `get_progress` («¿cómo voy en el gym?»).

## 📝 Tu rutina escrita → plan por días, y músculos tocables (fase I8, app 1.62.0, 2026-10-23)
- **La rutina que escribiste se lee tal cual** (`forgeMdRoutine.ts`, núcleo con copia en el servidor):
  - días «Día 1: Empuje (Domingo)», «## Día A — …», «Lunes: …» o títulos con ejercicios debajo;
  - bloques dentro del día («Sesión A: Gym», «Sesión B: Casa»), calentamiento, notas del día y reglas generales;
  - listas (-, *, ·, 1.), tablas y dos ejercicios en una línea («Ab Wheel 3x10 + Elevación de piernas 3x12»);
  - series en reps, segundos («3 x 45 segundos», «4 rounds de 1 minuto») o metros («6 series de 30 metros»), «al fallo», «por brazo/lado/pierna», «(opcional)», RIR o RPE (también en las reglas: «Gym: … RPE 8-9»);
  - los pesos que nombra («65-75 kg en barra o 24-26 kg por mancuerna», «+10-15 kg de lastre») según el equipo de cada ejercicio, desde abajo y al peso real del gimnasio.
- **Emparejar con el catálogo:** nombre exacto (también los propios), sinónimos en español e inglés («ring rows», «ab wheel», «RDL», «Pendlay») con el equipo que nombra, y palabras en común. Una variante que el catálogo no tiene queda «¿es X?» para confirmarla. Lo que no existe se crea como **ejercicio propio** (músculos por palabras clave) solo al aceptarlo. Un ejercicio va una vez por día: la segunda variante pasa a ser propia.
- **Revisión antes de guardar** (RUTINA › «Revisar y convertir»): cada línea con su color (reconocido, por confirmar, nuevo, fuera) y sus opciones. **El texto no se reemplaza.** Con la rutina real del usuario: 4 días, 26 ejercicios (14 reconocidos, 3 por confirmar, 9 propios).
- **Plan por días de la semana:** si la rutina dice el día, «hoy toca» es el de hoy y los otros días son **descanso** (sin el plan de ayer; «Cargar igual» si quiere entrenar). El plan de hoy se agrupa por bloque en ENTRENAR. Al fallo y en metros se compara con la última vez; el resto sigue la doble progresión dentro del rango de la rutina.
- **Por chat:** «carga mi rutina» muestra cómo quedaría (los «¿es X?» y los propios nuevos) y pregunta «¿La cargo?». Con «Sí, cárgala» la manda al teléfono. Si el texto es la rutina que ya armó Eris, dice que ya es un plan.
- **Mapa muscular rehecho:** frente y espalda con contornos y degradados, y tres vistas: series de la semana, nivel y **recuperación** (~48 h, ACSM). El toque se resuelve **por coordenadas** (antes `onPress` en cada figura, que en Android no respondía). Tocar un músculo abre su hoja: nivel, series de la semana, recuperación, fuerza, en tu rutina y qué lo trabaja (con «+ Plan»).

## 🥋 Avatar, disciplinas y parámetros atléticos (fase I9, app 1.63.0, 2026-10-23)
- **Avatar vectorial** (decisión del usuario: dibujado por la app, no PixAI): un esqueleto con ángulos por pose de cada disciplina.
  - Poses: guardia con jab (boxeo), patada lateral alta (taekwondo), zenkutsu con oi-zuki (karate), rodillazo en el clinch (muay thai), parada de manos (calistenia), salto (parkour) y patada con giro en el aire (tricking).
  - El cuerpo va en un tono neutro y cada músculo en el color de su nivel (los del mapa). El aura es la del rango.
  - Cada clase suma lo suyo: guantes, mongkol, cinturón del color del rango, muñequeras, zapatillas y la estela del movimiento.
  - Con dos clases se elige la pose.
- **7 clases:** las 4 del HTML más **Parkour, Tricking y Muay Thai**. Sus bonos de combate entran a la Arena con la misma fórmula: se registran en la tabla de clases del RPG, y la lista del HTML no cambia.
- **6 ramas nuevas y 31 habilidades** (`forgeSkillsExt.ts`, extensión: lo generado desde el HTML no se toca y sus ids no cambian):
  - las ramas: golpeo, patadas, clinch y rodillas, defensa y pies, combinaciones y tricks;
  - cada habilidad tiene nivel, prerrequisitos (también del árbol del HTML), pasos reales y XP;
  - el XP de lo dominado entra al RPG por la vista (`rpgView`), así que nivel, rango y Arena lo cuentan igual.
- **Lo que se mide se marca solo:** 5 ejercicios de combate nuevos en el catálogo (sombra, saco, patadas al saco, rodillazos, escalera de agilidad), en rounds de segundos. Con ellos y la comba se marcan solos 14 pasos. En el árbol, «Disciplinas» muestra las ramas primero según tus clases.
- **Parámetros atléticos** (`forgeAthletic.ts`, 0–100): potencia, velocidad, agilidad, resistencia, flexibilidad, técnica y fuerza relativa.
  - Salen de las series de las últimas 4 semanas, los niveles de músculos y de lo atlético, lo que llevas del árbol y los pasos del reloj.
  - Cada clase los potencia entre +5 y +12 %.
  - Se ven en PERSONAJE (radar con de dónde sale cada uno) y en la ARENA. Eris también los nombra en «¿cómo voy en el gym?».

## 🏗️ Arquitectura
- **Forge nativo** (`src/screens/forge/`) sobre un **núcleo puro** (`src/services/forge/`) que el servidor copia **tal cual** (`eris/scripts/sync_forge_core.ts`). La prueba `eris/scripts/forge_parity_test.ts` compara archivos y resultados.
- **Estado:** el del HTML más lo nuevo. Las **series** (`sessions`) son la fuente de verdad; los campos viejos (`training`, `trainMeta`, `weights`) se recalculan para que el HTML pueda seguir leyéndolo.
- **El HTML queda** (`assets/toji.html` en `TojiScreen.tsx`) como vuelta atrás si la migración no calza.
  - ⚠️ Su `localStorage` vive en el origen `file:///android_asset/`: **no cambiar el `baseUrl`**.
  - ⚠️ `toji.html` está precompilado (sin el JSX original). La lógica del RPG se **regenera** con `eris/scripts/gen_forge_legacy.py` → `src/services/forge/forgeLegacy.ts`; no se edita a mano.

## 🐞 Historia: rendimiento y scroll del WebView (jul-2026)
Antes de ser nativo, Toji se sentía pesado. Se arregló por capas:
- sin `backdrop-filter`;
- un solo WebView montado a la vez;
- **JSX precompilado y React inline** (antes bajaba `babel-standalone` de ~2,87 MB y transpilaba en el teléfono);
- el `PortalOverlay` sin `transform`/`opacity` cuando está abierto (un WebView animado pierde el scroll nativo en Android).

Pasarlo a nativo (Forge 2.0) terminó con esta clase de bugs.

## 🔗 Integración con Eris
- **Eris escribe en Forge (2026-09-18):** `training_plan` carga el plan de hoy y, desde Forge 2.0, **arma y ajusta rutinas por código** y valida los ids contra el catálogo base.
- **Lo que el teléfono le cuenta al servidor** (`sync_forge_projection`): el gasto del plan de hoy, «Mi gimnasio», los máximos, la rutina y el **progreso**. Con eso el chat calcula «hoy entreno» y habla de récords con las mismas cifras.
- **Tu objetivo (1.29.0):** perder / recomposición / mantener / ganar. Ajusta calorías y proteína con la **misma tabla** que el servidor (`DailyTargets`). Ver [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]].
- **Nivel de actividad automático (1.50.0)** y gasto del día sin contar dos veces (1.49.1): lo calcula `src/services/activityLevel.ts`, igual que el servidor.
- **Avatares:** la idea de imágenes con PixAI (biblia en `eris/src/data/toji-avatar-bible.md`) quedó **reemplazada** por el avatar vectorial de la fase I9 (decisión del usuario, 2026-10-22).

## 💻 Implementación Actual
> **Rutas:** `C:\Proyectos\eris-mobile\` y `C:\Proyectos\eris\`

| Responsabilidad | Archivo |
|---|---|
| RPG del HTML, generado (no editar) | `src/services/forge/forgeLegacy.ts` (generador: `eris/scripts/gen_forge_legacy.py`) |
| Núcleo: series, carga, XP por serie, Arena | `src/services/forge/forgeCore.ts` |
| Catálogo (130), «Mi gimnasio», presets | `src/services/forge/forgeCatalog.ts` |
| Gasto por carga, «¿entrenas hoy?», proyección | `src/services/forge/forgeTrain.ts` |
| Fuerza, músculos de la semana, árbol automático | `src/services/forge/forgeStrength.ts` |
| Rutinas, progresión, score de entrenamiento; días de la semana y descanso (`nextRoutineDay`, `isRestDay`, `routineDayStart`) | `src/services/forge/forgeRoutine.ts` |
| Tu rutina escrita → plan (leer, emparejar, propios, plan) | `src/services/forge/forgeMdRoutine.ts` (`parseRoutineMd`, `matchExercise`, `defaultChoices`, `mdToRoutine`, `applyMdRoutine`) |
| Revisión de la rutina escrita | `src/screens/forge/MdReview.tsx` · `src/screens/forge/tabs/Rutina.tsx` |
| Disciplinas y habilidades nuevas (clases, ramas, XP por la vista) | `src/services/forge/forgeSkillsExt.ts`; criterios automáticos: `forgeStrength.ts` (`EXT_CRITERIA`, `ALL_CRITERIA`); ejercicios de combate: `forgeCatalog.ts` |
| Parámetros atléticos | `src/services/forge/forgeAthletic.ts`; pantalla: `src/screens/forge/AthleticRadar.tsx`; chat: `forgeProgress.ts` (`athletic`) → `eris/src/tools/TrainingPlanTool.ts` |
| Avatar vectorial (poses y dibujo) | `src/screens/forge/avatarPose.ts` · `src/screens/forge/ForgeAvatar.tsx`; en `tabs/Personaje.tsx`; Disciplinas en `tabs/Arbol.tsx` |
| Mapa muscular (dibujo y toque) y hoja del músculo | `src/screens/forge/muscleGeometry.ts` · `src/screens/forge/MuscleMap.tsx`; recuperación: `forgeStrength.ts` (`muscleRecovery`) |
| Progreso: historial, récords, «tú hace 3 meses» | `src/services/forge/forgeProgress.ts` |
| Store, migración, sincronización | `src/services/forge/forgeStore.ts` · `forgeMigrate.ts` · `forgeSync.ts` |
| «¿Entrenas hoy?» y metas del día (app) | `src/services/forge/trainingIntent.ts` · `src/components/TrainingIntentCard.tsx` |
| Pantallas nativas | `src/screens/forge/` (pestañas en `tabs/`, gráficos en `charts.tsx`) |
| HTML de vuelta atrás | `assets/toji.html` · `src/screens/TojiScreen.tsx` |
| Respaldo cifrado | `src/services/forgeBackup.ts` · `eris/src/services/ForgeBackup.ts` |
| Copia del núcleo en el servidor + paridad | `eris/src/services/forge/` · `eris/scripts/sync_forge_core.ts` · `eris/scripts/forge_parity_test.ts` |
| «Hoy entreno…» por chat y metas según el día | `eris/src/services/TrainingIntent.ts` · `eris/src/services/DailyTargets.ts` · `eris/src/tools/TrainingTodayTool.ts` |
| Rutinas y progreso por chat; «carga mi rutina» (`load_md_routine`) | `eris/src/tools/TrainingPlanTool.ts` |
| Avisos (preguntar, pre y post entreno) | `src/services/reminderRules.ts` · `src/services/ReminderPlanner.ts` |
