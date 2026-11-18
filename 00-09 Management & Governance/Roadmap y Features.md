---
owner: Eris
tier: Directivo
status: Activo
---

# Roadmap y Features (Backlog técnico)

> **Este documento = el *qué* construir** (features y pipeline de inteligencia). Para el *ritmo* de trabajo (rituales diario/semanal) ver [[00-09 Management & Governance/00 - AXS Roadmap|Roadmap — Cadencia Operativa]].

El cerebro de Eris evolucionará constantemente respondiendo tanto al requerimiento de Alex como a las limitaciones técnicas del modelo y el hardware anfitrión. Este documento enlista los "Siguientes Pasos" de gran y pequeña escalabilidad.

## 🧭 Backlog vivo (checkpoint 2026-10-12)
> Contexto en log-2026-10-12. Orden sugerido: primero lo que baja el riesgo (personas, seguridad, salud) y después las funciones nuevas.

### 1. Beta y cuidado de las personas
- [ ] **Paso 6 del plan "digerible":** prueba con 3 a 5 personas, con tareas guiadas y preguntas (incluida "¿te sentiste presionado o culpable?"). Ver [[30-39 GTM & Business Operations/Comercial/Beta Privada.md|Beta Privada]].
- [ ] **Mensaje para testers** (beta, no reemplaza al médico, datos en el PC) y **cuenta propia de Tailscale** para la beta.
- [ ] **Resguardos** de [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-12-preciso-por-dentro-simple-por-fuera.md|preciso por dentro, simple por fuera]]:
  - niveles de detalle y modo "sin números";
  - señales de alerta sin diagnosticar;
  - etiquetas sin juicio: anillo "Crítico" en Inicio (el "Rank F" de Finanzas ya se reemplazó por un rating de conducta en Finanzas 2.0);
  - límites para menores y para un peso bajo.
- [ ] **Un profesional de salud** que revise la guía de síntomas y la beta.

### 2. Seguridad
- [x] **Cifrar `profile.json` y las claves `kv_*.json`** igual que las conversaciones (2026-10-15, incluidos los respaldos). Ver Eris.Memory.
- [ ] **Respaldo de `~/.eris/server_secret`** fuera del PC (sin él no se abren los perfiles).

### 3. Infraestructura
- [ ] **Servidor dedicado para Eris** (ahorro en curso). Ver [[30-39 GTM & Business Operations/Finanzas/Servidor Eris — Plan de Compra.md|plan de compra]].
- [ ] Con GPU propia: un Whisper mejor (`large-v3-turbo`) y quizás 2 conversaciones a la vez.

### 4. Salud y producto
- [ ] Borrar una bebida **por chat** debe restar su agua (hoy solo resta si se borra en la app).
- [ ] Corregir el almuerzo del tester del 2026-10-11 (quedó como chili).
- [ ] **Glucosa:** reactivarla solo tras verificarla con el sistema de salud ([[50-59 Intelligence Feed/53 Decisions/decision-2026-10-07-eris-cuida-no-trata.md|decisión]]).
- [ ] **Medicina como puente con el médico:** resumen para la consulta, síntomas registrados, recordatorios de medicamentos, cada condición con datos verificados ([[10-19 Strategic Vision/Visión de Eris.md|Visión de Eris]]).
- [ ] Precios y cobro: decidir con Brian y un contador, después implementar los desbloqueos validados en el servidor ([[30-39 GTM & Business Operations/Comercial/Modelo de negocio MVP.md|Modelo de negocio MVP]]).

### 4a. Chat de Eris (2026-10-16)
- [x] Banco de pruebas del chat (`scripts/chat_eval/`) y primera ronda de arreglos: de 23/36 a 37/37, latencia típica de 12 s a 4,6 s.
- [ ] Correr el banco después de cada cambio al prompt o a una herramienta, y sumar casos nuevos cuando aparezca una falla real.
- [ ] Revisar los chats reales con el rastro nuevo (`Message.trace`) para encontrar fallas que el banco aún no cubre.
- [ ] «Un yogurt» o «un pan» a secas: elegir la variante común por código (hoy empatan varias en la base y va al modelo, más lento).

### 4b. Finanzas 2.0 (plan aprobado el 2026-10-15)
- [x] **F0:** respaldo cifrado en el PC y restaurar desde Perfil (app 1.43.0).
- [x] **F1–F3:** núcleo con paridad, Finanzas nativa con migración al peso, tablero, presupuesto al día, rating, «¿y si me compro…?» y avisos (app 1.44.0).
- [ ] Verificar la migración con los datos reales en el teléfono y después retirar la versión web.
- [x] **F4 — anotar sin tipear (app 1.45.0):** timbre del SII de la boleta, avisos del banco (módulo local, solo las apps que elija la persona), cartola Excel/CSV con conciliación y «Por confirmar». Ninguna fuente anota sola.
- [x] Cartola en PDF (2026-10-16): texto con posición, protegidas sin clave y con la clave que escribe la persona.
- [x] Foto de la boleta (2026-10-16, 1.46.0): OCR de Windows en el PC, productos por categoría, cuadre con el total y un gasto por categoría de una vez.
- [ ] F4 pendiente: afinar la boleta con 10–15 boletas reales (el usuario las está juntando) y los lectores con avisos y cartolas reales.
- [x] **F5 (parcial):** presupuesto de comida al asesor como dato estructurado y comida fuera/delivery del mes como dato neutral.
- [ ] F5 pendiente: lo comprado en el súper a la despensa (depende del OCR de la boleta).

### 4c. Forge 2.0 (plan aprobado el 2026-10-17)
Entreno real, músculos, fuerza y rutinas de Eris **sin perder el RPG** (sobre todo el árbol). Detalle en Toji.
- [x] **F0:** respaldo cifrado de Forge en el PC (app 1.51.0).
- [x] **F1:** núcleo puro con el RPG generado desde el HTML, migración «al peso», copia en el servidor con paridad.
- [x] **F2:** Forge nativo, registro por serie con carga y RIR, 130 ejercicios (máquinas, poleas, asistidos) y «Mi gimnasio» con pesos que existen (app 1.52.0).
- [x] **F3:** gasto según la carga, «¿entrenas hoy?» con insistencia, metas según el día y el fantasma en «te quedan X» (app 1.53.0).
- [x] **F4:** máximo estimado, niveles de Strength Level y score de fuerza, mapa muscular con series de la semana, árbol automático.
- [x] **F5:** rutinas por código (generador, doble progresión, descargas, plan de cada día), score de entrenamiento y `build_routine`/`adjust_routine` en el chat.
- [x] **F6:** gráficos 1 mes / 3 / 6 / 1 año, «tú hace 3 meses», récords y `get_progress` en el chat (app 1.54.0).
- [ ] **Probar en el teléfono:** la migración con los datos reales (comparar con el HTML), una sesión con mancuernas, una máquina y una asistida, la pregunta del día y armar una rutina por chat. Después, retirar el HTML.
- [ ] Casos nuevos en `scripts/chat_eval`: «hoy entreno pierna a las 7», «hoy descanso», «arma mi rutina», «¿cómo voy en el gym?».
- [ ] Afinar los presets de máquinas por cadena con una visita real (pesos y escalones de cada sede).
- [ ] Aplicar el patrón de Finanzas 1.47.0 (guía «¿Cómo hago…?» y recorrido) a Forge.

### 4d. Hestia en el teléfono y como JARVIS (planes aprobados el 2026-11-16 y el 2026-11-17, solo Hestia)
- [x] **J1–J3:** la llamada en tiempo real con Hestia (app 1.92.0–1.94.0).
- [x] **K0–K5, Hestia Manos (app aparte, 0.1.0–0.8.0):** teléfono, mensajes y llamadas, calendario, la palabra «Hestia», accesibilidad y su voz como llave.
- [x] **L0:** panel del equipo, límites y pausa (1.98.0).
- [x] **L1:** presencia, bienvenida, constantes y personalidad (1.99.0).
- [x] **L2:** avisos que hablan (1.100.0).
- [x] **L3:** el entrenador en el oído (1.101.0).
- [x] **L4:** trabajos de fondo (1.103.0).
- [x] **L5:** protocolos (1.104.0).
- [x] **L6:** en la llamada, solo tu voz (1.105.0 + Manos 0.11.0).
- [ ] **Probar todo en el teléfono** (lo construido solo se probó en el PC).
- [ ] **L7:** visión con la cámara, un modelo mayor y voz propia. Espera el PC dedicado.

### 5. Propuestas en espera (no aprobadas)
- **⚪ Módulo físico** (propuesta del 2026-10-12, **solo Hestia** y detrás de un interruptor):
  - **Qué muestra, cada cosa en su escala:**
    - el objetivo de cambio físico (el de Forge + una meta concreta con fecha);
    - **hoy:** el balance de energía (comido vs gastado, solo la parte del día que se lleva);
    - **semana:** grasa y masa magra estimadas **con rango**;
    - **rumbo:** "a este ritmo llegas en N semanas" y qué lo empuja (proteína, entreno, sueño).
    - **Nunca un "% de grasa del día"**: el peso sube y baja 1–2 kg al día, así que sería precisión inventada.
  - **Cómo se calcula:**
    - **gasto real adaptativo:** lo comido frente a la tendencia del peso en 2–3 semanas, usando solo los días con registro completo;
    - **modelo dinámico de peso** (Hall/NIH) con el reparto grasa/masa magra de Forbes, ajustado por proteína y entreno;
    - **punto de partida real:** balanza de bioimpedancia o huincha (método Navy), recalibrado cada 2–4 semanas.
  - **Faltaba al 2026-10-12:** historial de peso en el servidor (solo guarda el último), una medición de grasa, y más días con la comida completa (25 de 47).
  - **Fases:**
    1. Datos: historial de peso, lectura de 30 días de Health Connect, ingreso de grasa, cintura y cuello.
    2. Gasto real + balance de hoy.
    3. Composición semanal + rumbo.
    4. El gasto real alimenta las metas del día; evaluar si va a Eris, con resguardos y verificación de salud.
- **⚪ Reloj biológico estimado:** para **después de la prueba con gente** ([[50-59 Intelligence Feed/53 Decisions/decision-2026-10-11-reloj-biologico-y-foco-diferidos.md|decisión]]).
- **⚪ Curva de foco y alerta:** reservada para NeuroSuite (módulo mental).
- **⚪ Segunda vuelta del reloj interno:** jet lag social semanal, deriva del despertar, Forge según el reloj, avatar o fondo según la hora interna.
- **⚪ Palabra de activación para Eris** ("Eris, ¿me escuchas?"): descartada por ahora. Hestia ya la tiene (sección 4d). Ver Voz de Eris.
- ~~**⚪ Toji nativo**~~: hecho en Forge 2.0 (2026-10-17, sección 4c).
- **Pendientes menores de la app:** responder escribiendo desde una notificación y el logo sonoro (sin elegir).

---

## Prioridad Alta (El Pipeline Real de Inteligencia)
- [ ] **Despliegue del Fine-Tuning**: Configurar el hardware en Google Colab o purgar dependencias locales (Python/Torch) y ejecutar una iteración real usando los Scripts exportados adaptados vía `Modelfile`. La personalidad se atará intrínsecamente.
- [ ] **Feedback Ultradirecto y Automatizado**: Incorporar a la GUI botones `+` y `-` para aceptar y rechazar respuestas, alterando orgánicamente el tag `approved: boolean` de la base JSONL sin interacción pesada de un IDE.

## Features del Sistema y Herramientas (Expansiones)

### Mejoras a la "Visión" y Comprensión Sensorial
- [ ] **Soporte de Contexto Expandido RAG**: Si la compresión actual de memoria empieza a difuminar contextos de proyectos técnicos grandes, implementar inserciones de DB vectoriales estáticas como Chroma o integraciones ligeras de SQLite paramétricas.
- [ ] **Capacidad Multimodal**: Adicionar un tool que acepte o interprete un parser OCR si el usuario pasa un screenshot a Eris de un error, en caso de que un modelo tipo LLaVA no sea el adecuado.

### Mejoramiento Motor Agéntico (The Query Loop)
- [ ] **Intervención y Auto-Recuperación de Schema**: Cuando el formato JSON entregado en `parameters` o `arguments` por la IA es malformado, incorporar un pre-parser ligero que trate de reparar las comas faltantes antes de inyectar la re-consulta en el loop.

### Mejoras en Accesibilidad Externa
- [x] **Reconocimiento y Sintetización de Voz**: Integración vía Local STT (Ej: Whisper.cpp) y un engine simple de TTS para interacción por voz. *Hecho en sep–oct 2026: Whisper + Piper + VoiceFix (Voz de Eris).*
- [ ] **Extensiones nativas para VS Code**: Adaptador WebSocket que hable directamente desde VS Code hacia el servidor actual.
