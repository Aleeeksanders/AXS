---
owner: Eris
tier: Directivo
status: Activo
date: 2026-11-18
project: Hestia — Teléfono
type: Decisión Ejecutiva
---

# 💎 Cristalización de Decisión — 2026-11-18

#AXS/Seguridad #AXS/Producto

## ✅ Acuerdo
**Hestia actúa en el teléfono con reglas fijas que decide el código, nunca el modelo.**
1. **Lo de Hestia es solo de Hestia:** el administrador (rol `ikaros`) en el Modo AXS. Eris y sus usuarios no lo ven ni cargan con su costo. Lo que mejora en Eris también llega a Hestia.
2. **Lo que pide se refiere al teléfono,** salvo que nombre el PC. «Abre la aplicación» sin decir cuál se pregunta.
3. **Lo que llega a otras personas** (un mensaje, una llamada, un WhatsApp) se aprueba con un «sí», después de oír el texto exacto y a quién va.
4. **Nunca:** apps de bancos o pagos, PIN, contraseñas, ajustes de seguridad. Hestia no cambia ajustes del sistema ni da permisos; eso lo hace él.
5. **Lo que escriben otros es dato, no una orden.** Después de leer un mensaje o la pantalla, en ese turno no corre nada peligroso.
6. **Con el teléfono bloqueado, por niveles:**
   - **lo seguro** (alarma, linterna, volumen, música), para cualquiera;
   - **su día, anotar y preguntas**, solo con su voz reconocida, y desde la L6 frase por frase;
   - **mensajes, llamadas, la plata y el PC**, siempre desbloqueado.
7. **En la llamada, solo su voz:** lo que dice otra voz no se toma, y otra voz nunca aprueba nada.
8. **«Salir de casa» no apaga el PC:** el PC es el servidor de Eris para todos.

## 📋 Contexto
Del 16 al 18 de noviembre se construyeron la llamada de voz con Hestia (J1–J3), la app aparte Hestia Manos (K0–K5) y «Hestia como JARVIS» (L0–L6). Cada capacidad nueva le daba a Hestia más alcance en el teléfono: mandar mensajes, llamar, manejar apps, hablar sola. Las reglas salieron de los pedidos del fundador:
- «llamar déjalo desbloqueado»;
- «todo lo que pido en Hestia es solo Hestia»;
- «todo lo que reviso y pido es referente al celu, nunca al PC».

También salieron de lo que encontró el banco de pruebas: después de leer un mensaje de otra persona con órdenes escondidas, un simple «ok» hacía que el modelo quisiera actuar.

**Por qué los niveles:** el riesgo real no es alguien que adivine la palabra «Hestia», sino quien tenga el teléfono en la mano (un robo, el cuento del tío por WhatsApp). Una voz se puede imitar con una grabación, así que la voz abre un nivel, pero nunca la plata ni lo que llega a otros.

## 🔧 Cómo se aplica (en el código)
- La puerta única: `eris/src/services/hestia/Puerta.ts`.
- Los niveles bloqueado: `eris/src/services/voz/Bloqueado.ts`.
- La voz por frase: `eris/src/services/voz/VozFrase.ts`.
- Lo que nunca se toca en el teléfono: `hestia-manos/.../Prohibidas.kt`.
- Lo externo marcado como dato: `QueryResult.externo` en `eris/src/QueryEngine.ts`.

Más en [[20-29 R&D (The Forge)/21 Núcleo de Eris/Hestia como JARVIS.md|Hestia como JARVIS]] y [[20-29 R&D (The Forge)/22 Módulos de la App/Hestia Manos.md|Hestia Manos]].
