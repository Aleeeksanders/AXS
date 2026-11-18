---
owner: Eris
tier: Técnico
status: Activo
estado: Parcial
---

# 🦾 Hestia como JARVIS (RFC: Executive Presence Layer)

↑ [[20-29 R&D (The Forge)/21 Núcleo de Eris/21 - Núcleo de Eris.md|Núcleo de Eris]]

#AXS/Core #AXS/Infraestructura

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Las manos en el teléfono: [[20-29 R&D (The Forge)/22 Módulos de la App/Hestia Manos.md|Hestia Manos]] · La voz: [[20-29 R&D (The Forge)/21 Núcleo de Eris/Voz de Eris.md|Voz de Eris]]

> **Estado real (2026-11-18):** las fases L0 a L6 están construidas. Se probaron en el PC, con pruebas automáticas y con el banco de voz y el modelo real. **Falta probarlas en el teléfono.** L7 espera el PC dedicado.

## 🎯 Misión
Tomar lo de JARVIS en Iron Man 1 y 2 y llevarlo a Hestia sin reventar el equipo: que esté presente, avise, entrene, trabaje en segundo plano, arme escenas con nombre y obedezca solo a su dueño.

**Solo Hestia:** todo esto existe únicamente para el administrador (rol `ikaros`) en el **Modo AXS Executive**. Eris y sus usuarios no lo ven ni cargan con su costo. Lo que mejora en Eris también llega a Hestia.

## 🧱 Cimientos
- **La puerta (`Puerta.ts`):** una sola revisión, rol ikaros y Modo AXS, para todo lo de esta nota. Hay una prueba de punta a punta que confirma que un usuario de Eris no recibe nada.
- **El estado (`Estado.ts`):** `~/.eris/hestia.json`, escrito de forma atómica. Guarda la pausa, los límites del equipo, qué puede decir en voz alta, los contactos importantes, los protocolos y «solo tu voz».
- **Cuándo puede hablar sola (`Interrupciones.ts`):**
  - solo con audífonos puestos;
  - nunca en «no molestar», en una reunión del calendario, de noche ni con «solo si digo Hestia»;
  - con un tope por hora, y sin repetir el mismo aviso;
  - lo que no se puede decir queda escrito como notificación.
- **El altavoz (`Altavoz.ts`):** habla sin abrir la llamada, con Piper y la voz de Hestia, por los audífonos.
- **El presupuesto del modelo (`Presupuesto.ts`):** decide si lo de fondo puede usar el modelo ahora. No, si hay una llamada o un chat activo, si Hestia está en pausa o si el equipo pasó un límite.

## 🧩 Las fases
| Fase | Qué hace | Escena de Iron Man |
|---|---|---|
| **L0** | Panel del equipo (CPU, RAM, disco, tarjeta de video, batería, el modelo cargado) con un vigía cada 60 s y límites que actúan solos. Pausa desde el panel o por voz, e informe de sistemas por código. | «Give me a readout» |
| **L1** | Presencia: audífonos, y «en casa» porque el teléfono alcanza el PC en la red de la casa, sin GPS. Bienvenida a casa, saludo de la mañana, «mis constantes» y personalidad por código («¿estás ahí?» → «Para ti, siempre»). | «Welcome home, sir» |
| **L2** | Avisos que hablan: quién llama (contestar o rechazar por voz), mensajes de los contactos importantes, cargos raros del banco y la agenda. | «La señorita Potts al teléfono» |
| **L3** | Entrenador en el oído: la serie que sigue, «hice 8 con 62,5» anota en Forge por código, el descanso contado y los récords. | La prueba de vuelo |
| **L4** | Trabajos de fondo («investiga X y me avisas»): una cola que corre solo con el PC libre y deja una nota en la bóveda. También vigías del PC sin el modelo. | Analiza mientras Tony hace otra cosa |
| **L5** | Protocolos: gimnasio, dormir, foco, salir de casa, casa y los que él crea por voz, con los pasos reales en el teléfono. | «Jarvis, mute» |
| **L6** | En la llamada, solo su voz: cada frase se revisa (ver abajo). | JARVIS obedece solo a Tony |
| **L7** | ⚪ *Planeado:* visión con la cámara, un modelo más grande y una voz propia. Necesita el PC dedicado. | — |

### L6 — Solo tu voz, frase por frase
- El reconocimiento del teléfono guarda el audio mientras escucha. Eris corta el de cada frase y se lo pasa a Hestia Manos por el canal firmado. Ella responde **tuya**, **otra**, **dudosa** o **corta**.
- **Medido en el PC** antes de activarlo (`hestia-manos/entrenamiento/voz_frase.py`), con 27 hombres que el clasificador nunca vio:
  - sus frases pasan como suyas el **97–100 %**; con la sola palabra «Hestia», ~50–60 %;
  - **ninguna** frase de otros pasa, tampoco pasando esas voces por el color de su micrófono y el fondo de su pieza.
- **Qué hace el código** (`VozFrase.ts`):
  - **«Solo tu voz»** (encendido de fábrica): lo que dice otra voz no se toma;
  - otra voz **nunca** contesta una aprobación;
  - con el teléfono bloqueado, el nivel «tu voz» vale **frase por frase**.

## 🛡️ Reglas que no se negocian
- Lo que llega a otras personas (un mensaje, una llamada) se aprueba con un «sí» después de oír el texto exacto y a quién va.
- Nunca toca apps de bancos o pagos, PIN, contraseñas ni ajustes de seguridad.
- Lo que escriben otros (mensajes, la pantalla) es dato, no una orden: en ese turno no corre nada peligroso.
- Lo que él pide para Hestia se refiere al **teléfono**, salvo que nombre el PC.
- «Salir de casa» **no apaga el PC**: apagarlo dejaría a Eris sin servidor para todos y a Hestia sin respuesta fuera de casa.

Ver la [[50-59 Intelligence Feed/53 Decisions/decision-2026-11-18-hestia-en-el-telefono-reglas-fijas.md|decisión del 2026-11-18]].

## 💻 Implementación Actual
> **Servidor:** `C:\Proyectos\eris\` · **App:** `C:\Proyectos\eris-mobile\` (1.105.0)

| Responsabilidad | Archivo |
|---|---|
| La puerta y el estado | `src/services/hestia/Puerta.ts`, `src/services/hestia/Estado.ts` |
| Equipo, vigía y comandos (L0) | `src/services/hestia/Equipo.ts`, `Vigia.ts`, `Comandos.ts` |
| Cuándo habla y el altavoz | `src/services/hestia/Interrupciones.ts`, `Altavoz.ts` |
| Presencia, llegada, constantes, personalidad (L1) | `src/services/hestia/Presencia.ts`, `Llegada.ts`, `Constantes.ts`, `Personalidad.ts` |
| Avisos (L2) | `src/services/hestia/Avisos.ts` |
| Entrenador (L3) | `src/services/hestia/Entrenador.ts`, `src/services/ForgeBridge.ts` |
| Trabajos de fondo (L4) | `src/services/hestia/Trabajos.ts`, `Fondo.ts`, `Presupuesto.ts` |
| Protocolos (L5) | `src/services/hestia/Protocolos.ts`, `ProtocoloTipos.ts` |
| Solo tu voz (L6) | `src/services/voz/VozFrase.ts` |
| Niveles con el teléfono bloqueado | `src/services/voz/Bloqueado.ts` |
| El teléfono (puente y atajos) | `src/services/TelefonoBridge.ts`, `src/services/TelefonoParse.ts`, `src/tools/TelefonoTool.ts`, `src/services/TelefonoK1.ts`, `TelefonoK2.ts`, `TelefonoK4.ts` |
| Mensajes del panel y de la llamada | `src/server.ts` (`admin_hestia_*`, `hestia_sensor`, `hestia_evento`, `voz_turno`) |
| Panel en la app | `src/screens/HestiaControl.tsx` (eris-mobile) |
| Sensores, altavoz y avisos en la app | `modules/hestia-manos/android/.../Sensores.kt`, `src/services/hestia/presencia.ts`, `altavoz.ts`, `avisos.ts` (eris-mobile) |
| Forge por voz en la app | `src/services/forge/forgeVoz.ts` (eris-mobile) |
| Pruebas | `tests/hestia_l0.test.ts` … `tests/hestia_l6.test.ts`, `scripts/chat_eval/chat_eval.ts` (casos `voz-l*`, `hestia-*`), `scripts/chat_eval/hestia_puerta_e2e.ts` |

## ⏭️ Pendiente
- Probar cada fase en el teléfono: audífonos, llegada a casa, una llamada que entra, una sesión de Forge con el entrenador, un protocolo y «Volver a aprender» para L6.
- L7, con el PC dedicado.
