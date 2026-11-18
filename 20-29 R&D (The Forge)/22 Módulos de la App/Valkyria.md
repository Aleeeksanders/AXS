---
owner: Eris
tier: Técnico
status: Activo
estado: Construido
---

# 🧬 Valkyria (RFC: Metabolic Operating System)

↑ [[20-29 R&D (The Forge)/22 Módulos de la App/22 - Módulos de la App.md|Módulos de la App]]
#AXS/Producto #AXS/Salud

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[20-29 R&D (The Forge)/22 Módulos de la App/GlucoTrack.md|GlucoTrack]], [[20-29 R&D (The Forge)/25 Laboratorio e I+D/ZeroPoint.md|ZeroPoint]], [[20-29 R&D (The Forge)/22 Módulos de la App/Toji.md|Toji / FORGE]], [[20-29 R&D (The Forge)/22 Módulos de la App/Experiencia de la App.md|Experiencia de la App]]

## 🎯 Misión
Vigilar y cuidar el estado del cuerpo cruzando comida, agua, sueño, movimiento y condiciones médicas. Es el BioOS del ecosistema.

> **Límite de producto:** Valkyria **cuida, no trata** (bienestar, no software médico). Ver [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-07-eris-cuida-no-trata.md|decisión del 2026-10-07]].
> La glucosa y la insulina ([[20-29 R&D (The Forge)/22 Módulos de la App/GlucoTrack.md|GlucoTrack]]) están **apagadas** hasta verificarlas con el sistema de salud.

## 📡 Fuentes de Datos
- **Health Connect:** sueño (con fases), pulso, pasos, distancia, calorías activas, ejercicios, SpO₂, respiración, VO₂, peso, altura, nutrición e hidratación.
- **Lo que anota la persona:** en la app o por chat (comida, agua, sueño, ánimo, exámenes como la HbA1c).
- **Bases de alimentos:**
  - base chilena genérica (288 alimentos, generada desde USDA);
  - catálogo con alérgenos verificados (195);
  - envasados chilenos de Open Food Facts (~4.400);
  - USDA y Open Food Facts en vivo.
  - Ya no se usa FatSecret.
- **Forge:** cuerpo, objetivo y entreno de hoy. Ver [[20-29 R&D (The Forge)/22 Módulos de la App/Toji.md|Toji / FORGE]].

## 🟢 Lo que corre hoy (2026-10-16)

### 🍽️ Registro de comida
- **Por código, sin el modelo,** cuando el mensaje es claro: "anota 2 hallullas con palta", "almorcé…", "¿me puedes anotar…?", "50g de papa", "2 porciones de carne roja". Ante la duda va al modelo.
- **No inventa calorías.** Si un alimento no está en ninguna base (ni corrigiendo el nombre), no lo anota y lo dice ("Entendí «chocapig» como Chocapic").
- **El resultado de la búsqueda tiene que calzar de verdad** (`foodFit`): más de la mitad de las palabras, o la palabra principal. Antes "carne roja" terminó como un chili enlatado.
- **Los gramos salen de lo dicho:** "3 empanadas para la cena y una para la once" → 3 × la unidad de la base en la cena y 1 en la once.
- **Buscador estándar:** misma normalización en el servidor y en la app (tildes, plural, sonido, tipeo, orden de palabras).
- **El registro vive en 3 lugares** (teléfono, Health Connect y servidor) y se mantiene alineado: borrar por chat o en la app llega a los tres.
- **Ayer, anoche y anteayer por chat** (2026-10-16, app 1.48.0):
  - «ayer cené 2 empanadas» queda en la cena de ayer, y «anoche» cuenta como cena;
  - si no dice la comida, Eris pregunta «¿En qué comida de ayer fue?» con botones;
  - el teléfono la guarda en ese día, también si estaba desconectado (la pide al conectarse);
  - lo más antiguo se agrega en la app.

### 💧 Agua (una sola cuenta)
- **Total = bebido + el agua que trae la comida** (100 − proteína − carbohidratos − grasa − fibra − 1, por 100 g). Una jalea de 200 g suma ~176 ml.
- **Las bebidas cuentan como agua**, salvo el alcohol. Se avisa del azúcar.
- **Sin meta de agua** con enfermedad renal o insuficiencia cardíaca: el límite lo define su especialista.

### 🎯 Metas del día: fuente única (`DailyTargets`)
- Calorías (Mifflin × actividad + entreno de hoy), agua y proteína: **la misma cifra en Forge, Inicio, Nutrición, Métricas, el chat y el asesor.**
- El objetivo de Forge (perder / recomposición / mantener / ganar) ajusta calorías y proteína (1,6–2,2 g/kg), con pisos de seguridad.
- Las condiciones y los medicamentos modifican las metas: tope de proteína renal, sodio con hipertensión, azúcar con diabetes, agua ×1,3 con SGLT2.
- **Metas «según el día» (Forge 2.0, 2026-10-17):** solo si la persona respondió «¿entrenas hoy?» (en Inicio, Forge, un aviso o el chat).
  - **Cálculo:** basal × 1,2 + su movimiento diario (nivel automático) + el entreno del día, el mayor entre lo hecho y lo planificado (`forgeTrain.byDaySpend`). El descanso baja la meta y el entreno la sube.
  - **El fantasma:** lo planificado que todavía no hizo entra en «te quedan X», con «sin el entreno te pasarías por…».
  - **Si no respondió:** la meta estable de siempre.

### 🕐 Horario del día y reloj interno
- **La hora de la COMIDA decide la comida,** no la hora en que se anota: "desayuno" a las 12 es colación. Hay una tabla única de ventanas en el servidor y la app (copia exacta).
- **Una comida nombrada que aún no llega se respeta** (2026-10-16): «para la cena» a las 11 queda en la cena de hoy, a su hora. Lo mismo al elegir «Cena» en la app.
  - En Health Connect se escribe con la hora de ahora, porque Inicio y Métricas leen «hasta ahora».
- **Mis comidas** (el editor de Nutrición, 1.48.0):
  - **Orden:** siempre el del día; la once va antes de la cena. Antes la lista por defecto las tenía al revés y ese orden quedaba guardado.
  - **Ocultar en vez de borrar:** las seis de siempre se ocultan y no se borran, así lo anotado en ellas sigue en su lugar.
  - **Comidas propias** con su hora.
  - **Validación:**
    - un nombre vacío vuelve al anterior;
    - no se aceptan nombres repetidos;
    - siempre queda al menos una comida a la vista.
- **Trasnochadores:** las ventanas se corren con el despertar, y el **día de comida termina al dormir**.
- **Lo esperable a esta hora** (comida, agua) se mide **desde el despertar** (`normDayHour`), no con el reloj. Desde la 1.35.9, a los 33 minutos de despertar no se le exige a nadie haber comido.
- **El agua en el chat (1.54.1):** Eris la juzga a esta hora con la misma cuenta de los cuadros (`trackGoal`, vía `services/WaterToday.ts`): «para ir al día te faltan 2 vasos». Lo que falta para la meta del día se reparte hasta la noche, nunca «a reponer».
- **Reloj interno** en Inicio: ver [[20-29 R&D (The Forge)/22 Módulos de la App/Experiencia de la App.md|Experiencia de la App]]. A Eris y Hestia les llega "Su día: despertó a las X, va en el N % de su día, le quedan almuerzo, once y cena…".

### 🥗 Calidad y asesoría
- **Calidad nutricional según el horario** (30 puntos del puntaje dinámico): estilo Nutri-Score + NOVA + sellos "ALTO EN", y cuándo se comió.
  - Los sellos van solo en lo procesado: un alimento natural (NOVA 1) no los lleva, porque la Ley 20.606 es para azúcar, sal y grasas agregadas. Antes una manzana salía «ALTO EN azúcares» (corregido el 2026-10-15).
  - **El mismo cálculo en la app y en el chat.** El núcleo (`nutritionQualityCore.ts`) es puro y el servidor tiene una copia exacta. `scripts/quality_parity_test.ts` compara el archivo y los resultados.
  - Desde la app 1.42.0, el teléfono manda los valores por 100 g de cada alimento, así que el chat parte del mismo día.
- **Simular antes de comer** (2026-10-15):
  - **En Nutrición:** bajo «Valores para X g» se ve la nota del día antes → después.
  - **En el chat:** «¿y si me como un completo?» se responde al instante por código. No anota nada y funciona aunque el chat esté en pausa. Dice cuánto cambia la nota del día, la letra del alimento y qué aporta.
  - **Qué convendría más:** agua en vez de bebida, un acompañamiento, media porción o un cambio completo (colación de los avisos o plato del recomendador). Cada opción ya viene simulada y pasa por sus restricciones y condiciones. Si el alimento choca con una restricción, solo se ofrece cambiarlo.
- **Cuadros de Nutrición «a la hora»** en Métricas (1.40–1.41):
  - una barra fantasma con la meta del día y una marca en lo esperable ahora;
  - el estado en palabras («Para ir al día: +0,3 L (2 vasos)»);
  - rojo solo si va muy atrás para la hora.
- **Avisos con comida concreta** (1.37): «un puñado de almendras», elegido por código según las restricciones, las condiciones, el presupuesto, el objetivo de Forge y la despensa, en el tono de cada persona.
- **Código de barras:** varias fuentes en cascada. Si nadie tiene el producto, se agrega desde la etiqueta.
- **Asesor metabólico** (`metabolic_advisor`): pregunta qué tienes a mano, mira el presupuesto de Finanzas, y aplica las restricciones *fail-closed* (un celíaco nunca ve gluten).
- **Movimiento** (1.48.1): cuenta como «entrenó hoy» Forge de hoy o 20 min o más de ejercicio en Health Connect. Entonces no se pide caminar, ni en el chat, ni en los avisos, ni en «Pregúntale a Eris». Antes solo se contaban los pasos y Forge.
- **Actividad sin «modo entrenamiento»** (1.49.0):
  - Detecta los bloques de actividad con el pulso (reserva cardíaca), los pasos y las calorías del reloj, y adivina el tipo; la persona lo confirma en Métricas.
  - Suma a la meta de calorías y de agua del día, tomando el mayor entre Forge y el reloj.
  - El nivel de actividad de Forge ya trae el ejercicio de un día típico: basal × (nivel − 1,2). El día suma solo lo que pase de eso (`extraExerciseKcal`, con copia en Forge), y Forge sugiere el nivel según las últimas 4 semanas.
- **Análisis del Día y desvíos** contra la línea base personal. Ver [[20-29 R&D (The Forge)/25 Laboratorio e I+D/ZeroPoint.md|ZeroPoint]].

### 🔎 Lo anotado y el buscador (fase I4, app 1.58.0, 2026-10-23)
- **Tocar algo anotado** en Nutrición abre su detalle:
  - la porción con macros, fibra, azúcar, sodio, grasa saturada y el agua que trae (o la que suma una bebida);
  - la calidad: letra, sellos «ALTO EN», procesamiento NOVA y grupo;
  - los alérgenos: los declarados en el envase y sus trazas (Open Food Facts y la base de envasados), y los que puede tener por el nombre;
  - de dónde salen los datos.
  
  Lo que la fuente no trae (el chat no anota azúcar ni sodio) dice «sin dato» o va estimado con «≈». Las vitaminas y los minerales llegan con la base ampliada (fase I5).
- **Corregir lo anotado:**
  - la cantidad, por porciones o en gramos o ml;
  - la comida y la hora: si solo cambia la comida, queda a la hora de esa comida.
  
  Se borra lo de antes y se anota lo nuevo por los mismos caminos (Health Connect, servidor, agua de la bebida y despensa), en el mismo lugar de la lista y nunca con la misma clave.
- **Tu versión de un alimento** («Editar información nutricional»):
  - Tus valores por 100 g reemplazan al original en el buscador y **en el chat**: el teléfono manda la lista (`my_foods_sync`) y el registro por chat y «¿y si me como…?» la usan antes que la base, solo si es exactamente ese alimento.
  - Hay una versión por alimento, y se puede dejar de usar.
- **Lo natural primero** (pedido del usuario: «si digo manzana… no jugo de manzana»):
  - Lo ya anotado sube solo si es **exactamente** lo buscado; con marca, solo si se nombró la marca.
  - El alimento base va antes que sus derivados (jugo, néctar, kuchen, vinagre, mermelada…) y que los envasados (`naturalBoost`, `sameFood` en `FoodText`, iguales en la app y el servidor).
  - En el servidor, la base chilena y el catálogo se ordenan por calce, con lo natural primero.
  - Arreglado de paso: a medio escribir, «manz» no encontraba «manzana».

### 💊 Vitaminas, minerales y suplementos (fase I5, app 1.59.0, 2026-10-23)
- **La base de alimentos pasó de 290 a 546**, generada con USDA FoodData Central (`scripts/build_food_db.ts` + `food_db_spec.ts`):
  - frutas y verduras de Chile, legumbres, pescados y mariscos, cortes, lácteos, cereales, frutos secos, aderezos y bebidas;
  - preparaciones caseras chilenas por receta (ceviche, guatitas, lomo saltado, ají de gallina, salpicón, chupe, tomaticán…).
  
  **545 alimentos traen vitaminas y minerales** por 100 g: A, C, D, E, K, B1, B2, B3, B6, B12, folato, calcio, hierro, magnesio, potasio, zinc y fósforo. La lúcuma no está en USDA.
  - Los platos los calculan por su receta.
  - Los alimentos de la base original sin referencia toman los micronutrientes de un alimento parecido o de una receta (`MICRO_FROM`), sin cambiar sus calorías ni macros.
  - Lo de Open Food Facts usa lo que declara el envase.
- **El detalle de lo anotado** muestra las vitaminas y minerales de la porción y el % de lo recomendado para la edad y el sexo de Forge (NIH). Lo anotado por chat usa el alimento de la base con ese nombre, marcado con «≈».
- **Por chat**, «¿cuánta vitamina C tiene una naranja?» responde por código con la base y su fuente (`MicroAnswer`). El modelo había dicho ~100 mg; la base da ~80 mg.
- **Fichas de 12 suplementos:** creatina, omega-3, vitamina D, magnesio, B12, hierro, zinc, proteína en polvo, cafeína, electrolitos, calcio y vitamina C. Cada una trae:
  - qué hace y qué tan estudiado está;
  - la dosis de los estudios como **referencia** con su fuente (NIH ODS, ISSN, EFSA, ACSM);
  - los cuidados **según el perfil**: condiciones (enfermedad renal, presión alta…), remedios (metformina con la B12, anticoagulantes con el omega-3, losartán con los electrolitos…) y alergias.
  
  Nunca indican empezar ni una dosis. *Textos escritos con IA a partir de las fuentes: necesitan revisión de un profesional antes de abrir la app a más gente.*
- **«Mis suplementos»** (Nutrición):
  - la dosis la escribe la persona; un aviso suave si pasa el límite superior (UL);
  - horario por toma, aviso con «Tomado ✓» sin abrir la app y «Tomado» en un toque;
  - constancia de 7 días y aporte a vitaminas y minerales;
  - stock en el Botiquín, que baja con cada toma.
  
  Por chat: «me tomé la creatina», «¿qué suplementos me faltan?», «¿sirve el magnesio?». Lo aplica el teléfono (`SupplementBridge`).
- **Núcleo puro con copia exacta en el servidor** (`supplementCore` ↔ `SupplementCore`, paridad). El servidor guarda el estado cifrado y lo devuelve si el teléfono aparece sin nada.

### 📊 Métricas (fase I6, app 1.60.0, 2026-10-23)
- **Vista simple o completa:** se elige arriba y se recuerda.
  - **Simple:** el puntaje del día, energía, proteína, agua y sueño, **«Ahora»** con una sola acción, y una línea para la calidad, las vitaminas y minerales y los suplementos.
  - **Completa:** todo el detalle.
- **Cuánto te pasaste**, también en:
  - **grasa saturada:** el límite es menos del 10 % de la meta de calorías (OMS);
  - **carbohidratos:** contra una referencia del 45 % de la meta de calorías, el mismo reparto del asesor.
- **Vitaminas y minerales de hoy:** comida (verde) y suplementos (morado) en la misma barra, con el % de lo recomendado para la edad y el sexo de Forge (NIH).
  - Avisa cuánto de lo comido trae el dato y qué es lo que menos llevas, con dónde encontrarlo.
  - Si se pasa un límite superior, lo dice en ámbar.
- **Suplementos:** los de hoy y la constancia de los últimos 7 días, sin rachas ni rojos.
- **Calidad v2** (`evaluateDay`, núcleo con paridad):
  - La nota suma las **vitaminas y minerales a esta hora**: los diez que más suelen faltar (`SCORE_KEYS`; sin vitamina D, que sale del sol), con lo de los suplementos.
  - Pesos: qué comiste 55 %, si alcanza 20 %, vitaminas y minerales 10 % y horarios 15 %.
  - Si menos del 60 % de la energía comida trae el dato, esa parte no cuenta y la nota es la de antes.
  - Cada alimento toma sus micronutrientes de la base **por el nombre exacto** (`localExact`), en la app y en el servidor.
  - La tarjeta muestra **de qué sale la nota**.
  - El chat («¿y si me como…?») usa las mismas referencias y los suplementos del día (último estado del teléfono), así que da la misma nota.

### 🤝 Asesor con la despensa, antojos y modo estricto (fase I7, app 1.61.0, 2026-10-23)
- **Lo que hay en casa primero:** el asesor arma la comida con lo que hay en **Alimentos y Despensa** del Inventario (el último respaldo que mandó el teléfono, `HomePantry`), para llegar a las metas del día.
  - Lo que vence en 3 días o menos va primero («vence pronto, úsalo hoy»).
  - Lo vencido o agotado no se propone, y lo que el catálogo no reconoce (una galleta de marca, el detergente) no entra.
  - Reemplaza el «¿qué tienes a mano?» dicho de palabra. Si no alcanza, ofrece «Tengo otras cosas» o «No tengo nada, revisa mi presupuesto».
  - Los avisos con comida concreta también usan la despensa.
- **Antojos («tengo antojo de…», «me tinca…», «se me antoja…»):** se simulan como «¿y si me como…?». Si no calzan, muestran el impacto y una **contrapartida concreta** (`Antojo.ts`):
  - la próxima comida principal más liviana (hasta 40 % menos de lo típico de esa comida);
  - si no alcanza, minutos de caminata a paso rápido según el peso, **con tope de 45 min**;
  - lo que quede se dice con calma («un día así no es un problema»), **nunca se pasa a mañana**;
  - con insuficiencia cardíaca o EPOC no se indica caminar: «la actividad que te indique tu médico».
- **El trato:** con «Acepto la contrapartida» (dentro de 30 min) queda el trato del día.
  - El asesor propone esa comida más liviana.
  - «¿Cómo voy hoy?» lo recuerda.
- **Modo estricto** (interruptor en Perfil, apagado por defecto): el antojo se recomienda solo si aceptas la contrapartida; con «Mejor no», Eris propone otra opción. Lo guarda el teléfono por cuenta y el servidor lo recibe al conectar.

### 🧩 Cómo se adapta a cada condición (verificado en el código, 2026-11-15)
Para la presentación de Eris: el fundador quiere poner mucho énfasis aquí («eso es una bestia»). Todo es cuidado, no tratamiento: Eris ajusta metas y sugerencias y deriva lo médico al especialista.

| Condición | Lo que cambia |
| --- | --- |
| Diabetes tipo 1, tipo 2 y prediabetes | Evita alimentos de índice glucémico alto (salvo cerca del entreno), carbohidratos moderados; en la rutina, un día entre músculos repetidos y glucosa antes y después; si quiere bajar de peso, coordinar el déficit con su médico; keto con insulina o SGLT2, con aviso; cautelas de diabetes en la guía de síntomas |
| Hipertensión | Evita lo muy salado y lo procesado; máximo 2 cafés al día; en la rutina, no aguantar la respiración ni llegar al fallo en los pesados; cafeína y electrolitos, con aviso |
| Enfermedad renal crónica | Sin meta de agua (la define el nefrólogo); proteína con tope de 0,8 g/kg, que manda sobre cualquier objetivo; evita potasio, fósforo y sal; magnesio, calcio, vitamina D y C, creatina y proteína en polvo, solo con su nefrólogo |
| Insuficiencia cardíaca | Sin meta de agua (la define el cardiólogo; cuenta la jalea y las sopas); máximo 2 cafés; un antojo no se compensa caminando; cafeína y electrolitos, con su cardiólogo |
| EPOC | Un antojo no se compensa caminando |
| Celiaquía | Sin gluten, estricto |
| Colon irritable | Avisa lo que suele caer mal (legumbres, cebolla, ajo, lácteos, algunas frutas) |
| Dislipidemia | Evita la grasa saturada y lo procesado; prefiere aceite de oliva, pescado y frutos secos |
| Ansiedad | Máximo 2 cafés; la cafeína de los suplementos, con aviso |
| Embarazo y lactancia (texto libre) | Café: 0 en el embarazo, máximo 2 en la lactancia |

**Con los remedios:** metformina → preguntar por la B12; anticoagulantes → cuidado con el omega-3 en dosis altas; losartán, enalapril y similares → ojo con el potasio de los electrolitos; levotiroxina → separar el hierro y el calcio 4 horas; SGLT2 → +30 % de agua.

**Sin reglas propias todavía:** hipotensión, hipotiroidismo (sí por la levotiroxina), hipertiroidismo, obesidad, asma y depresión. Eris las conoce por el perfil y las considera al conversar.

Archivos: `DietaryRestrictions.ts`, `MealRecommender.ts`, `DailyTargets.ts` (`waterRule`, `proteinRule`), `SupplementCore.ts`, `DayPlan.ts` (`cafeTope`), `Antojo.ts`, `SymptomGuide.ts` (servidor); `forgeRoutine.ts` y `targetRules.ts` (app).

### 📋 Informe del mes para el control médico (fase 1 de 3, 2026-11-15)
Lo que paga Eris completo para la gente con condiciones crónicas. La fase 1 es el cálculo en el servidor, puro y con pruebas:
- **Perfil:** condiciones, remedios activos con dosis y horario, el último resultado de cada examen y las restricciones de comida.
- **Comida:** días anotados y promedios de energía, proteína, carbohidratos y grasas, con la meta actual como referencia. No compara cada día con la meta de hoy, porque la meta cambia según el día y el historial no la guarda.
- **Agua:** litros al día. Con enfermedad renal o insuficiencia cardíaca, sin meta: el informe pide mostrarle la cifra al especialista.
- **Sueño, movimiento y ánimo:** promedios, noches de menos de 6 horas, días bajo 5.000 pasos, entrenos, pulso en reposo y si cambió, ánimo y check-ins.
- **Suplementos:** tomas anotadas frente a las que tocaban desde que se agregaron.
- **Para conversar con tu médico:** patrones calculados por código, solo con datos suficientes.
- **Lo que no muestra:** lo dice, sin inventar. Por ejemplo, las tomas de remedios (se anotan en el teléfono), la glucosa (apagada) y la presión (no se registra).
- **Nunca** diagnósticos ni dosis.

Probado en solo lectura con el perfil real (octubre: 31 de 31 días con datos). Faltan la fase 2 (pantalla en Métricas y PDF para compartir) y la 3 (pedirlo por chat e incluirlo en Eris completo).

### 🩺 Síntomas y datos médicos
- **Guía de síntomas** (`symptom_guide`) determinista: 17 síntomas, señales de alarma primero (131 SAMU, *4141 prevención del suicidio), sin dosis. *Contenido conservador escrito con IA: necesita revisión de un profesional antes de abrirlo más.*
- **Exámenes:** HbA1c en el perfil, con la glucosa promedio estimada como referencia.
- **Fichas de medicamentos por nombre:** DPP-4, SGLT2 y otros.

### 🛡️ Honestidad
Guardias contra lo inventado: registro afirmado sin herramienta, glucosa sin medición, tono alarmista. Ver [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-12-la-ia-conecta-el-codigo-decide.md|la IA conecta, el código decide]].

## 💻 Implementación Actual
> **Rutas:** `C:\Proyectos\eris\src\` (servidor) y `C:\Proyectos\eris-mobile\src\` (app)

| Responsabilidad | Archivo |
|---|---|
| Registro de comida y agua (herramienta) | `tools/NutritionTool.ts` |
| Registro por código, horarios dichos, gramos dichos | `services/FoodParse.ts` |
| Resolver un nombre a un alimento | `services/FoodResolve.ts` |
| Normalización e índice de búsqueda; lo natural primero (`naturalBoost`, `sameFood`) | `services/FoodText.ts` (copia: app `services/foodText.ts`) |
| Buscador de la app (lo anotado, tus versiones, la base, envasados y Open Food Facts) | app `services/FoodSearchService.ts` (`merge`, `saveMyVersion`, `syncMyFoods`) |
| Detalle y edición de lo anotado | app `components/LoggedFoodSheet.tsx`, `services/foodDetail.ts`; registro: `screens/NutritionScreen.tsx` (`handleEditFood`) |
| Vitaminas y minerales, fichas de suplementos y «Mis suplementos» (núcleo) | app `services/supplements/supplementCore.ts` (copia: `services/SupplementCore.ts`; `scripts/sync_supplement_core.ts`, `scripts/supplement_parity_test.ts`) |
| «Mis suplementos» en el teléfono (guardar, avisos, stock del Botiquín) | app `services/supplements/supplementStore.ts`, `services/ErisNotifications.ts` (`scheduleSupplements`, «Tomado ✓») |
| Pantallas de suplementos | app `components/supplements/SupplementsCard.tsx`, `components/supplements/SupplementsSheet.tsx` |
| Suplementos por chat | `tools/SupplementTrackerTool.ts`, `services/SupplementParse.ts`, `services/SupplementBridge.ts`, `server.ts` (`update_supplement_context`, `supplement_state_get`) |
| «¿Cuánta vitamina C tiene…?» por código | `services/MicroAnswer.ts` |
| Micronutrientes de la base (USDA) | `scripts/build_food_db.ts` (`microOf`, `recipeMicro`), `scripts/food_db_spec.ts` (`MICRO_FROM`), `scripts/data/usda_micro_cache.json` |
| Tu versión de un alimento en el chat | `services/FoodResolve.ts` (`cleanMyFoods`, `myFoodFor`), `server.ts` (`my_foods_sync`), `tools/NutritionTool.ts` |
| Bases de alimentos | `services/gluco/UnifiedFoodService.ts`, `services/PackagedFoods.ts` |
| Base chilena (se genera) | `data/chilean-foods.json` ← `scripts/food_db_spec.ts` + `scripts/build_food_db.ts` |
| Agua del día | `services/WaterToday.ts`, `services/FoodWater.ts`, `services/Beverage.ts` |
| Metas del día | `services/DailyTargets.ts` (reglas en app: `config/targetRules.ts`) |
| Horario y día de comida | `services/MealSchedule.ts` (copia: app `services/mealSchedule.ts`), `services/NutritionDay.ts` |
| Horario en el teléfono | app `services/daySchedule.ts` |
| Mis comidas (orden, ocultar, hora propia, hora al anotar) | app `services/mealSlots.ts` |
| Actividad sin modo entrenamiento | app `services/activityDetect.ts`, `MetricsService.detectActivityToday`, `components/ActivityCard.tsx`; metas: `services/DailyTargets.ts` (`activity`) |
| Nivel de actividad automático (4 semanas reales) | app `services/activityLevel.ts`, `MetricsService.readAutoLevel` / `backfillActivityDays`; Forge `effActivity`; metas: `DailyTargets` (`autoLevel`) |
| Comidas de ayer y anteayer por chat | `services/FoodParse.ts` (`pastDayOf`, `pastMealTimingOf`), `services/NutritionLog.ts` (`addToPastRollup`), app `services/NutritionBackend.ts` (`applyPastEntries`) |
| Registro por día (3 lugares) | `services/NutritionLog.ts`, app `services/NutritionBackend.ts` |
| Calidad nutricional (núcleo) | app `services/nutritionQualityCore.ts` (copia: `services/NutritionQualityCore.ts`; `scripts/sync_quality_core.ts`) |
| Calidad con los datos del teléfono (v2: referencias y suplementos; `dayMicrosToday`) | app `services/NutritionQuality.ts` |
| Métricas: vista simple y completa, excesos, vitaminas y suplementos | app `screens/MetricsScreen.tsx`, `components/MicrosCard.tsx`, `components/supplements/SupplementsSummary.tsx`, `components/FoodQualityCard.tsx` (desglose) |
| El día en vitaminas y minerales (`microDia`, `microRef`, `SCORE_KEYS`) | app `services/supplements/supplementCore.ts` (copia en el servidor) |
| Simular antes de comer | app `components/QualityPreview.tsx`; chat: `services/WhatIfFood.ts`, `services/FoodParse.ts` (`parseWhatIfMessage`) |
| Comida concreta en los avisos | `services/NudgeSuggest.ts`, app `services/nudgeSuggest.ts`, `services/reminderRules.ts` |
| Tono (humor, directo, usted) | `services/Tone.ts`, app `services/tone.ts` |
| Asesor metabólico | `tools/MetabolicAdvisorTool.ts`, `services/MetabolicAnalysis.ts`, `services/MealRecommender.ts`, `services/DietaryRestrictions.ts` |
| La despensa del Inventario para el asesor y los avisos | `services/HomePantry.ts` (`homePantry`, `pantryFrom`); `services/MealRecommender.ts` (`prefer`, `fromInventory`, `kcalMenos`) |
| Antojos: contrapartida, trato y respuesta | `services/Antojo.ts`; `services/WhatIfFood.ts` (`contra`, `strict`); `tools/NutritionTool.ts` (`antojo_respuesta`); frases en `services/FoodParse.ts` (`WHATIF_RX`) |
| Modo estricto | app `services/strictMode.ts`, `screens/ProfileScreen.tsx`; `server.ts` (`set_strict_mode`) |
| Línea base y Análisis del Día | `services/BaselineEngine.ts` |
| Guía de síntomas | `tools/SymptomGuideTool.ts`, `services/SymptomGuide.ts`, `data/symptom_guide.json` |
| Exámenes | `tools/LabResultsTool.ts`, `services/LabParse.ts` |
| Sueño anotado | `tools/SleepLogTool.ts`, `services/SleepParse.ts` |
| Contexto de hoy para el modelo | `services/LiveContext.ts` |
| Guardias de la respuesta | `services/ReplyGuards.ts` |
| Perfil médico | `memory.ts` (`MedicalProfile`) |
| Biometría Health Connect | app `services/MetricsService.ts` |

## ⏭️ Pendiente y propuestas
- Borrar una bebida **por chat** aún no resta su agua.
- **Módulo físico** (propuesta, solo Hestia): objetivo de cambio físico, gasto real, composición semanal con rango y rumbo hacia la meta. Ver Roadmap y Features.
- **Reloj biológico:** para después de la prueba con gente. Ver [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-11-reloj-biologico-y-foco-diferidos.md|decisión]].
- Pendiente agrupar el código en `services/valkyria/` para alinearlo con el Panteón.

## 📋 Protocolo de Detección de Riesgo
→ [[40-49 Standards & SOPs/Protocolo AXS — Detección HRV HR.md|Protocolo HRV/HR — Detección de Riesgo para GhostLine]]
