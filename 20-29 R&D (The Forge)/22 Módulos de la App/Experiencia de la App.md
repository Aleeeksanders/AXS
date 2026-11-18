---
owner: Eris
tier: Técnico
status: Activo
estado: Construido
---

# 🧭 Experiencia de la App (RFC: Simple-First Mobile UX)

↑ [[20-29 R&D (The Forge)/22 Módulos de la App/22 - Módulos de la App.md|Módulos de la App]]

#AXS/Producto

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[20-29 R&D (The Forge)/22 Módulos de la App/Nexus.md|Nexus]], [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]], [[20-29 R&D (The Forge)/21 Núcleo de Eris/Voz de Eris.md|Voz de Eris]], Visión de Eris

## 🎯 Misión
Que una app muy completa **se entienda fácil**. Pedido del fundador (2026-10-10): "es la más completa que he visto, pero la gente tiene que poder digerirla facilito". Por eso hay una sola entrada (Inicio y chat), módulos que se eligen y la profundidad completa disponible pero nunca obligatoria.

## 🗺️ Plan "digerible" (6 pasos)
1. 🟢 **Inicio simple** (1.35.1).
2. 🟢 **Bienvenida de 1 minuto** con elección de módulos (1.35.2). Desde la 1.36.0 sale **solo a cuentas nuevas**: lo decide el servidor.
3. 🟢 **Tip diario** que muestra una función cuando sirve (1.35.3).
4. 🟢 **Chat como puerta,** con ejemplos tocables (1.35.4).
5. 🟢 **Nombres simples y Perfil en 4 grupos** (1.35.5).
6. ⚪ **Prueba con 3 a 5 personas de la beta** con tareas guiadas. Pendiente. Ver Beta Privada.
/
Extras del mismo impulso: puntaje fijo y dinámico explicado en Métricas, y un **recorrido guiado** por la app (1.35.6–1.35.8).

## 🧩 Componentes
- **Tu día:** el reloj interno, un dial de 24 h que parte al despertar.
  - Muestra las ventanas de comida como "cielo del día", lo que ya pasó encendido y las comidas anotadas como puntos.
  - Al centro, la **fase de tu día** (mañana, mediodía, tarde, noche), "despierto hace X" y la hora real.
  - Lleva el puntaje en palabras: muy bien / bien / regular / bajo.
  - Detalle del horario en [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]].
- **Ahora:** UNA acción por prioridad: comida sin anotar, agua atrasada, ánimo de la noche, proteína baja o sueño cercano. Si no hay nada, "Vas bien".
- **Chips:** agua, kcal, sueño, pasos y plata. "Ver más de tu día" guarda lo detallado.
- **Modos:**
  - **Eris** para todos.
  - **Hestia** (Modo AXS Executive, solo el administrador) con las mismas pestañas.
  - **AXS** (panel de empresa: proyectos, pendientes, estado del PC).
  - Chats separados por asistente, y **chats temporales** (5 respuestas o menos) en su propia carpeta.
- **Notificaciones:** canales por tema (salud urgente, salud, respuestas, consejos, aprobaciones, comidas, agua, entreno, finanzas, resumen).
  - **Avisos del día** que empujan hacia la pauta óptima con las metas del cuerpo.
  - Topes por tipo, silencio de noche y botón "+250 ml" sin abrir la app.
  - Siguen el horario de cada persona (trasnochadores incluidos).
- **Burbuja de Eris** sobre otras apps (módulo nativo propio). Muestra estados (pensando, respuesta lista) y se cierra arrastrándola.
- **Arranque sin cortes:** sesión optimista, un portal que espera a que el módulo esté listo, y Forge y Finanzas precargados.
- **Marca en la app:** el condensado de Eris (núcleo menta) y de Hestia (núcleo brasa), con la nube teñida según el módulo. Ver Branding.

## 💻 Implementación Actual
> **Rutas:** `C:\Proyectos\eris-mobile\` y `C:\Proyectos\eris\src\`

| Responsabilidad | Archivo |
|---|---|
| Inicio (estructura y recorrido) | `src/screens/HomeScreen.tsx` |
| Modelo del día compartido | `src/components/home/dayModel.ts` |
| Reloj interno "Tu día" | `src/components/InternalClock.tsx` |
| Tarjeta "Ahora" | `src/components/home/NowCard.tsx` |
| Chips del día | `src/components/home/DayChips.tsx` |
| Tip diario | `src/services/tips.ts`, `src/components/home/TipCard.tsx` |
| Bienvenida | `src/screens/WelcomeFlow.tsx` |
| Bienvenida: decisión del servidor | `eris/src/server.ts` (`shouldWelcome`) |
| Chat con ejemplos | `src/components/ChatStarters.tsx` |
| Recorrido guiado | `src/components/tour/GuidedTour.tsx`, `src/components/tour/tourTargets.ts` |
| Puntaje fijo y dinámico | `src/screens/MetricsScreen.tsx` (`ScoreCard`) |
| Modos y persona | `src/config/appMode.ts`, `src/config/persona.ts` |
| Panel AXS (empresa) | `src/screens/EnterpriseScreens.tsx` |
| Notificaciones | `src/services/ErisNotifications.ts`, `src/services/notificationCopy.ts` |
| Avisos del día | `src/services/reminderRules.ts`, `src/services/ReminderPlanner.ts` |
| Burbuja (nativo) | `modules/eris-bubble/` (`BubbleService.kt`, `ErisMarkDrawer.kt`) |
| Portal y módulos precargados | `src/components/PortalOverlay.tsx`, `src/services/ModuleHtml.ts` |
| Módulos visibles por persona | `src/config/modules.ts` |

## ⏭️ Pendiente
- Paso 6: la prueba con personas.
- Responder escribiendo desde una notificación.
- El sonido de marca (logo sonoro sin elegir).
- Revisar etiquetas que juzgan: el anillo de puntaje en `HomeScreen.tsx` aún dice "Crítico". Ver [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-12-preciso-por-dentro-simple-por-fuera.md|preciso por dentro, simple por fuera]].
