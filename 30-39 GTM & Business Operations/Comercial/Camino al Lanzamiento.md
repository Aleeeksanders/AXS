---
owner: Eris
tier: Estratégico
status: Activo
---

# 🚀 Camino al Lanzamiento de Eris

↑ [[30-39 GTM & Business Operations/Comercial/Comercial.md|Comercial]]

#AXS/Comercial #AXS/Producto

Se apoya en: [[30-39 GTM & Business Operations/Comercial/Beta Privada.md|Beta Privada]] · [[30-39 GTM & Business Operations/Finanzas/Simulación del Negocio.md|Simulación del Negocio]] · [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/Medición de la Beta.md|Medición de la Beta]]

## 🎯 Para qué
Qué hace Eris hoy, y qué falta para tres pasos: una beta abierta (gratis, con gente de afuera), una beta pagada y la primera versión en Google Play. Revisado contra el código el 2026-11-11 (app 1.90.0).

## ✅ Lo que Eris hace hoy
- **Chat** escrito y por voz (Whisper y Piper locales). Anotar comida, agua, sueño y entreno lo resuelve el código; lo demás lo responde el modelo (Qwen 3.5 de 4B en Ollama), con herramientas.
- **Nutrición:**
  - registro hablando, escribiendo o con código de barras, sobre unos 4.500 productos chilenos y 546 alimentos con vitaminas y minerales;
  - calidad de la comida según la hora, agua del día y metas desde el cuerpo y el entreno.
- **Plan de Eris («al timón»):** tres caminos para el día, «Lo comí ✓» desde el aviso y piloto automático. El Modo Rendimiento solo lo ve la cuenta del fundador.
- **Forge:** rutinas, series con remate, descansos, recuperación muscular, progreso y récords.
- **Sueño:** desde el reloj o anotado a mano, y sueños partidos.
- **Finanzas:** libro nativo, boletas, cartolas y avisos del banco. Que se anoten solos los avisos solo lo ve la cuenta del fundador.
- **Inventario, Botiquín y suplementos:** vencimientos, lista de compras, despensa para el asesor de comida.
- **Métricas y Health Connect;** guía de síntomas con alarmas (131 y \*4141).
- **Avisos del día,** burbuja sobre otras apps y cuatro tonos (Brígida incluido).
- **Panel de administración:** cuentas, bitácora firmada, módulos con visto bueno y, desde la 1.90.0, la medición de la beta.
- **Apagado a propósito:** glucosa (hasta tener visto bueno de salud).

**Ojo:** buena parte de lo construido desde la 1.78 sigue **sin probarse en un teléfono**.

## 🧪 Paso 1 · Beta abierta (gratis, 10 a 20 personas, unas 4 semanas)
Para medir activación, vuelta al día 7 y 30, qué usan y cuánto PC ocupan. Falta:
- [ ] **PC de 12 GB como servidor.** Hoy corre en el notebook (48 s de mediana por respuesta del modelo) y se cae si el notebook se apaga.
- [ ] **Conexión pública cifrada.** Hoy cada tester tiene que instalar Tailscale y la app habla `ws://` a una IP fija (`usesCleartextTraffic` encendido). Hace falta un dominio, un túnel con TLS (`wss://`) y sacar la IP de la app.
- [ ] **Términos de la beta, política de privacidad y consentimiento expreso** para datos de salud. La Ley 21.719 rige desde el 1-dic-2026, trata la salud como dato sensible y no acepta casillas premarcadas. Edad mínima: con menores de 16 se necesita a sus representantes.
- [ ] **«Borrar mi cuenta»** en la app: hoy no existe, ni en la app ni en el servidor.
- [ ] **Errores de la app que lleguen solos al servidor.** Hoy se sacan por cable con `adb`.
- [ ] **Un botón de comentarios** en la app.
- [ ] **Quién puede entrar:** hoy cualquiera con la APK y una cuenta de Google crea un perfil. Hace falta una lista de invitados.
- [ ] **Respaldo del servidor fuera del PC.** Las copias de Finanzas, Forge e Inventario quedan en el mismo PC.
- [ ] **Revisión de un profesional de salud** de la guía de síntomas (pendiente desde octubre).
- [ ] Probar en un teléfono de la 1.78 a la 1.90.
- [x] **Medición de la beta** (2026-11-11).

## 💳 Paso 2 · Beta pagada (APK, fuera de Google Play)
Además del paso 1:
- [ ] **Decidir qué es gratis y qué se paga.** Ver la sección del chat más abajo.
- [ ] **Tope de uso del modelo por persona y por plan.** Hoy no hay ningún límite de mensajes por persona.
- [ ] **Cobro directo** (Flow o Mercado Pago, suscripción mensual). Mientras tanto, «Paga» se marca a mano en el panel.
- [ ] **Boleta por cada cobro:** inicio de actividades en el SII (como persona o como empresa; confirmarlo con un contador).
- [ ] **El informe del mes para el control médico** (decidido 2026-11-15): es lo que paga el completo para la gente con condiciones crónicas. Sin diagnósticos ni dosis. Fase 1 (el cálculo) lista el 2026-11-15; faltan la pantalla con PDF y el chat.
- [ ] **Qué funciones abre el pago** en la app y el servidor (gratis, cada módulo, completo, anual). Hoy todo está abierto para todos, y apagar un módulo solo esconde la pestaña: el chat igual lo lee. Con el pago, el chat tiene que usar solo los módulos que la persona tiene. Lo básico de salud nunca se bloquea, y las condiciones del perfil encienden lo que le sirve a cada persona (GlucoTrack básico con diabetes o prediabetes; Mente básico con depresión o ansiedad).

## 🏪 Paso 3 · Versión 1 en Google Play
Además de los pasos 1 y 2:
- [ ] **Cuenta de desarrollador.** Si es personal y nueva, Google exige una prueba cerrada con al menos 12 personas durante 14 días antes de publicar ([ayuda de Play Console](https://support.google.com/googleplay/android-developer/answer/14151465)). Como organización no se exige, pero pide empresa y número D-U-N-S. Conviene constituir la sociedad antes.
- [ ] **Android 16 (API 36).** Es obligatorio desde el 31-ago-2026 para apps nuevas y actualizaciones ([requisito de Google Play](https://developer.android.com/google/play/requirements/target-sdk)); la app está en 35.
- [ ] **Cobro con Google Play Billing:** es obligatorio para suscripciones dentro de apps de Play y cobra 15 %. La prueba de 30 días de Eris completo va como prueba gratis de Play (el medio de pago ya está guardado), y Eris avisa antes del primer cobro. No encontré Chile en los programas de cobro alternativo.
- [ ] **Declaraciones de Play Console:**
  - salud y Health Connect: justificar cada dato pedido y sacar lo que no se usa (`READ_BLOOD_GLUCOSE` mientras la glucosa esté apagada, `MANAGE_HEALTH_DATA`) ([guía de Health Connect](https://developer.android.com/health-and-fitness/guides/health-connect/publish/declare-access));
  - seguridad de los datos;
  - servicio en primer plano (`dataSync`), con un video;
  - permisos sensibles: la burbuja (`SYSTEM_ALERT_WINDOW`), NFC y los de almacenamiento antiguos.
- [ ] **`USE_EXACT_ALARM`:** Google lo restringe a apps de alarma, temporizador o calendario. Es probable que haya que cambiarlo por avisos inexactos o por `SCHEDULE_EXACT_ALARM` con permiso de la persona.
- [ ] **Política de privacidad pública y una página web para pedir el borrado** de la cuenta, aparte del botón en la app ([política de Google](https://support.google.com/googleplay/android-developer/answer/13327111)).
- [ ] **Ficha de la tienda:** textos, capturas e ícono. El kit de marca existe; falta revisar «AXS» antes de registrar la marca en INAPI.
- [ ] **Quitar la integración LibreView,** que guarda el correo y la contraseña de otro servicio, mientras la glucosa siga apagada.
- [ ] **Empresa:** sociedad, contador y una cuenta bancaria donde Google pague.

## 💬 El chat: ¿gratis?
Lo medido y lo que dice el simulador (2026-11-11):
- **Qué cuesta.** El código no ocupa el PC: anotar hablando, el agua, el sueño y la guía de síntomas. Lo que cuesta es cada respuesta del modelo: unos 15 s de PC en el equipo de 12 GB (estimado; en el notebook, 48 s).
- **Por persona.** Una persona que no paga y sigue usando el chat le cuesta al PC unos **$45 al mes**; una que paga, unos $91, y deja $2.278 (promedio de módulos, completo y anual). Un PC cuesta unos $40.400 al mes (equipo en 3 años y luz) y aguanta unas 445 personas.
- **Dar todo el chat gratis** cuesta, al mes 36:
  - en el caso base, unos $2.500 al mes (lo cubre 1 suscriptor de 247);
  - con 50.000 instalaciones el primer año, unos $160.000 al mes (66 de 2.444 suscriptores);
  - si quien no paga usa el modelo tanto como el fundador, el costo se duplica.
- **El tope casi no cambia el promedio,** porque quien no paga usaría cerca de 1 respuesta del modelo al día. Sirve para otra cosa: que una persona con 200 respuestas al día no ocupe el 22 % de un PC.
- **Lo que no se sabe:** si el chat gratis hace que más gente pague (prueba el valor) o menos (no necesita pagar). Lo dirá la beta.

**Decisión (2026-11-12, se mantiene el 2026-11-14):**
- **El chat es gratis.** La IA de Eris no paga por mensaje: solo ocupa el PC, y una persona activa sin pagar cuesta unos $45 al mes.
- **Solo hay un tope alto contra el abuso**, de 30 consultas al día, escritas o habladas. El promedio medido es cerca de 2 al día.
- **La voz también es gratis** (2026-11-14), dentro del mismo tope.
- **Cuando hay fila en el PC, quienes pagan Eris completo van primero.** Hay que construirlo junto con el cobro.

**Qué se paga (2026-11-14):** lo esencial es gratis (el chat, la comida y el agua, el sueño, el plan del día, las métricas y la salud). Forge, Finanzas e Inventario se pagan como módulos de $1.990 al mes, o todo junto en Eris completo ($4.990 al mes o $34.990 al año). Precios y planes: [[30-39 GTM & Business Operations/Comercial/Precios de Eris.md|Precios de Eris]].

## 🔗 Fuentes
- Retención de apps de salud y deporte al día 30: 3,4 % en Android ([Braze](https://www.braze.com/resources/articles/mobile-app-retention)); 8,5 % según OneSignal ([informe 2024](https://onesignal.com/mobile-app-benchmarks-2024)).
- Referencia de freemium: Duolingo tenía 10,3 M de suscriptores pagados con 130,2 M de usuarios activos al mes en el primer trimestre de 2025 (cerca de 8 %) ([resultados](https://investors.duolingo.com/node/10206/html)).
- Ley 21.719 ([texto en BCN](https://www.bcn.cl/leychile/navegar?idLey=21719)).
