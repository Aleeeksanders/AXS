---
owner: Eris
tier: Técnico
status: Activo
estado: Parcial
---

# 🤲 Hestia Manos (RFC: Phone Companion App)

↑ [[20-29 R&D (The Forge)/22 Módulos de la App/22 - Módulos de la App.md|Módulos de la App]]

#AXS/Producto #AXS/Seguridad

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Lo que hace Hestia con estas manos: [[20-29 R&D (The Forge)/21 Núcleo de Eris/Hestia como JARVIS.md|Hestia como JARVIS]]

> **Estado real (2026-11-18):** versión **0.11.0**. Está construida y probada en el PC (pruebas de paridad de las cuentas de voz y banco de voz con un teléfono falso). En el teléfono se probaron abrir la llamada sobre la pantalla de bloqueo y el enlace con Eris (K3a). **El resto falta probarlo en el teléfono.**

## 🎯 Misión
Darle a Hestia autonomía en el teléfono del administrador, sin ensuciar Eris. Es una **app aparte**: Eris queda limpia para Google Play y los permisos fuertes viven solo aquí.

## 🔐 Cómo se habla con ella
- Eris se enlaza a su servicio (`ManosService`) y le manda cada pedido como un mensaje.
- Antes de hacer nada, Hestia Manos revisa **quién** lo manda: solo Eris, firmada con la misma llave. Cualquier otra app recibe «no autorizado».
- Lo que pasa en el teléfono (una llamada que entra, un mensaje nuevo) le llega a Eris por el mismo canal, y Eris también revisa la firma.
- **No tiene internet:** todo lo que va al PC pasa por Eris.

## 🧩 Lo que hace
| Fase | Capacidades |
|---|---|
| **K0** | Abrir apps, alarma y temporizador, linterna, volumen, Maps y batería. |
| **K1** | Mensajes (lee las notificaciones de las apps de mensajería y oculta los códigos), responder, contactos, llamar, SMS, WhatsApp y la música que está sonando. |
| **K2** | El calendario del teléfono: leer y agendar. |
| **K3** | Abrir la llamada con Hestia: un botón en los ajustes rápidos, el asistente del teléfono y un detector propio de la palabra «Hestia» (openWakeWord, entrenado con su voz). Funciona también con el teléfono bloqueado. |
| **K4** | Manejar apps con la accesibilidad: leer la pantalla y tocar con aprobación. Tiene una lista de lo que nunca toca: bancos, pagos, contraseñas, ajustes, y los campos de PIN, tarjeta o RUT. |
| **K5** | Su voz como llave: al decir «Hestia», ¿era él? Con el teléfono bloqueado abre un nivel más. |
| **L2** | Llamadas que entran: quién llama, contestar y rechazar. |
| **L5** | El «No molestar» de los protocolos, en modo prioridad (las alarmas suenan). Se quita solo al terminar. |
| **L6** | En la llamada, cada frase: tuya, otra, dudosa o corta. |

## 🗣️ Su voz (K5 y L6)
- Dos modelos de voces (CAM++ de 3D-Speaker y ResNet34 de WeSpeaker, Apache 2.0) dan una huella. Un clasificador «él contra otros» se aprende **en el teléfono** con sus grabaciones.
- Lo aprendido queda en los archivos privados de la app. El APK solo lleva huellas de **otras** voces.
- Las cuentas del teléfono (`VozCalculo.kt`) son una copia exacta de `entrenamiento/vozpropia.py`. Una prueba compara las dos.
- Los umbrales salen del PC, medidos con voces que el clasificador nunca vio (`entrenamiento/voz_id.py` y `voz_frase.py`).

## 💻 Implementación Actual
> **Ruta:** `C:\Proyectos\hestia-manos\` (Kotlin, Gradle propio, repositorio local)

| Responsabilidad | Archivo |
|---|---|
| El servicio y la firma | `app/src/main/java/com/aleeeksanders/hestiamanos/ManosService.kt`, `Firma.kt` |
| Las acciones | `Acciones.kt`, `Contactos.kt`, `Calendario.kt` |
| Mensajes y llamadas | `NotificacionesService.kt`, `Mensajes.kt`, `Llamadas.kt`, `Eventos.kt` |
| Abrir la llamada | `Despertar.kt`, `HestiaTile.kt` |
| La palabra «Hestia» | `Oido.kt`, `OidoService.kt`, `Grabadora.kt` (modelo en `assets/oido/`) |
| Accesibilidad | `ManosAccesibilidad.kt`, `Prohibidas.kt` |
| Tu voz | `VozPropia.kt`, `VozCalculo.kt` (modelos y cohortes en `assets/voz/`) |
| No molestar | `NoMolestar.kt` |
| Pantalla de permisos | `MainActivity.kt` |
| Entrenamiento y medición | `entrenamiento/` (README con los pasos y resultados) |
| Del lado de Eris | `modules/hestia-manos/` en eris-mobile (`HestiaManosModule.kt`, `index.ts`) |

## ⚠️ Operación
- Play Protect pide permiso una vez al instalarla desde fuera de Play, porque usa notificaciones y accesibilidad.
- La accesibilidad y el acceso a «No molestar» los enciende él en Ajustes. Hestia nunca cambia ajustes del sistema.
