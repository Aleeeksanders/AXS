---
owner: Eris
tier: Estratégico
status: Activo
---

# 💳 Precios de Eris

↑ [[30-39 GTM & Business Operations/Comercial/Comercial.md|Comercial]]

#AXS/Comercial #AXS/Finanzas

Se apoya en: [[30-39 GTM & Business Operations/Finanzas/Simulación del Negocio.md|Simulación del Negocio]] · [[30-39 GTM & Business Operations/Comercial/Camino al Lanzamiento.md|Camino al Lanzamiento]]

## 🎯 Para qué
El fundador lo encargó el 2026-11-12: precios accesibles pero de alto ingreso, que no lleven a la quiebra, a partir del mercado chileno y la simulación. Reemplaza la propuesta del 2026-10-08 (módulo $1.490, completo $3.990, anual $34.990), la del 2026-11-11 (anual $39.990) y la de Eris+ del 2026-11-12.

## ✅ La decisión (2026-11-14, tercera versión)
**Núcleo gratis y módulos de pago.** El fundador, al revisar Eris+: «creo que estaríamos regalando Eris, por eso la idea era del módulo, porque no a todos les interesan las finanzas, o el inventario, o la nutrición». Lo esencial (la IA que cruza tu día, la comida y el plan) sigue gratis; se paga por las herramientas que cada persona quiere.

| Plan | Precio (con IVA) | Qué incluye |
| --- | --- | --- |
| Eris | Gratis, para siempre | Chat y voz con la IA (tope de 30 consultas al día, escritas o habladas, solo contra el abuso), comida y agua, sueño, plan del día, métricas y Health Connect, salud, guía de síntomas y Botiquín |
| Cada módulo | $1.990 al mes | Forge, Finanzas o Inventario (sin el Botiquín, que es gratis). Después, GlucoTrack (solo con visto bueno de salud) y Mente (no existe aún), con su parte básica gratis |
| Eris completo | $4.990 al mes o $34.990 al año ($2.916 al mes) | Todos los módulos, el informe del mes para el control médico y respuestas primero cuando hay fila |
| Fundador (beta pagada) | $24.990 al año | Eris completo para los primeros 200; se mantiene mientras siga suscrito |
| Empresas y alianzas (después) | Por persona | Empresas, cajas de compensación, gimnasios y nutricionistas pagan Eris completo para su gente |

- **Revisión final (2026-11-15):** los precios se quedan. En el simulador, moverlos da a lo más ±5 % y subirlos resta si al nicho le importa mucho el precio, como a la gente con condiciones crónicas. Con $4.990 / $34.990: $539 mil al mes 36; con $5.490 / $39.990: entre $524 y $595 mil; con $4.490: entre $500 y $577 mil.
- **Prueba: 30 días de Eris completo al instalar** (no módulo por módulo), con la prueba gratis de Google Play: la mayoría ya tiene su medio de pago guardado, así que no hay que ingresar tarjeta. Así se ve el ciclo completo (boleta → Finanzas → Inventario → despensa), que necesita varios módulos. Eris avisa antes del primer cobro. En la beta pagada, fuera de Play, la prueba es manual.
- **Un porqué para cada nicho:** con condiciones crónicas, el informe del mes para el control médico (por construir; reemplaza al «análisis del mes y del año», que no existía); los que se cuidan, Forge y el ciclo de la boleta; los que quieren mejorar porque sí, el Modo Rendimiento (construido, solo en la cuenta del fundador; sin decidir si entra al completo).
- **Plan Familia, después del lanzamiento:** hasta 4 cuentas, cada una privada, cerca de $54.990 al año (Fitia: $37.900). Suma instalaciones en vez de arriesgarlas, y una familia comparte despensa y boletas.
- **Nunca:** publicidad, vender datos ni cobrar la seguridad o el acceso a los propios datos.
- **El Botiquín es gratis** (remedios y vencimientos), aunque vive en Inventario. Lo confirmó el fundador el 2026-11-14.
- **El chat usa solo los módulos que tienes.** Sin Finanzas, ofrece probarla en vez de manejar tu plata. Falta construirlo: hoy apagar un módulo solo esconde la pestaña y el chat igual lo lee.
- **Fuera de Chile, después:** precio por país.
- **Por qué $1.990 el módulo:** queda bajo Hevy ($2.200 o más al mes), y los tres sumados ($5.970) hacen que el completo se vea como el buen negocio. El precio del módulo casi no mueve el resultado: $1.490, $1.990 y $2.490 dejan $520, $541 y $562 mil al mes 36.
- **Lo que cuesta lo gratis:** una persona activa sin pagar le cuesta al PC unos $45 al mes. La IA es propia: no se paga por mensaje.

## 🩺 El cuidado básico de salud nunca se cobra (2026-11-14)
**Principio del fundador:** «todo lo que implique un cuidado de salud básico no debería cobrarse, aunque enfaticemos en básico; tristemente no soy multimillonario aún».

**La línea:** básico es lo que te mantiene a salvo y te deja cuidarte día a día. Se cobra lo que optimiza o hace rendir más, lo que no es salud y la comodidad.

| Gratis siempre (cuidado básico) | Se paga |
| --- | --- |
| Comer y tomar agua: registro, metas de tu cuerpo y calidad según la hora | Forge: rutinas, progreso, récords y recuperación |
| Dormir: registro y avisos | Modo Rendimiento y la curva de alerta |
| Moverte: pasos, actividad y el «muévete» del plan del día | Finanzas y la despensa de Inventario |
| Tus remedios: Botiquín, recordatorios y vencimientos | Análisis del mes y del año |
| Tus condiciones: metas que las respetan | Respuestas primero cuando hay fila |
| Síntomas y alarmas (131 y \*4141) y el ánimo del día | |

**Módulos de salud futuros:** su parte básica es gratis.
- **GlucoTrack:** anotar la glucosa y sus alertas, gratis; los informes y los patrones largos, de pago. Sigue apagado hasta tener el visto bueno de salud.
- **Mente:** el ánimo, las señales de riesgo y la línea \*4141, gratis; foco, aprendizaje y carga mental, de pago.

**Se habilita según el perfil:** las condiciones que la persona marca en Perfil (`CONDITION_IDS` en `ProfileScreen.tsx`) encienden lo básico que le sirve, sin pagar. Con diabetes tipo 1 o 2 o prediabetes, GlucoTrack básico; con depresión o ansiedad, Mente básico. Falta construirlo, junto con el pago por módulo.

**Lo que cuesta:** casi nada. Lo básico lo responde el código (anotar, el agua, los remedios, la guía de síntomas), que no ocupa el PC; lo caro es el modelo, y el chat ya es gratis con su tope. El simulador no cambia.

**La voz es gratis para todos, con el mismo tope del chat (decidido el 2026-11-14).** Dictar y escuchar es común en las IA gratis, y para quien ve poco o le cuesta escribir es accesibilidad. Filtrarla por perfil obligaba a pedir que la gente declarara una discapacidad, un dato de salud sensible más (Ley 21.719). Whisper y Piper corren en el PC propio, y la medición de la beta ya registra cuánto tardan: si pesan más de lo esperado, se ajusta el tope.

**Lo que muestra el simulador (caso base, 2 % que paga):**
- al mes 36 quedan $541 mil al mes para sueldos (la mitad de las corridas, sobre $1,4 M);
- la operación se paga sola el mes 12, y antes del mes 24 en 98 % de las corridas;
- hay que poner $2,7 M (entre $2,3 M y $4,5 M);
- al mes 36, 278 suscriptores (entre 187 y 1.724).

**El riesgo de los módulos:** quien elige un módulo deja menos en su vida ($8.200) que quien paga el completo mes a mes ($17.100) o al año ($40.600). Los módulos solo ganan si paga más gente: empatan con Eris+ si paga 1,9 %, y con 1,5 % dejarían $360 mil. El supuesto de 2 % viene de RevenueCat (2,1 % en apps con versión gratis; 2,9 % en salud y deporte) y de que se paga por una herramienta concreta, no por comodidad. Lo mide la beta.

**Versiones anteriores:**
- **Segunda (2026-11-12, reemplazada):** todo gratis y Eris+ a $4.990 o $34.990 por comodidad (prioridad, análisis, voz, piloto automático y tonos). Con 1,5 % que paga, $505 mil al mes 36. El riesgo: vender solo comodidad; con 1 % que paga quedaban $275 mil y se pagaba sola el mes 19.
- **Primera (2026-11-12, descartada):** gratis con 3 consultas al día, módulos pagados y 2 % que paga: $734 mil y mes 8.

## 🇨🇱 El mercado chileno (App Store de Chile, 2026-11-12)
Precios de las compras dentro de cada app, en pesos:

| App | Qué cubre | Al mes | Al año |
| --- | --- | --- | --- |
| Fitia (#2 en Salud y fitness) | Calorías y coach | $4.200 o $7.990 | $22.490 a $24.900 (familiar $37.900) |
| MyFitnessPal | Calorías | $6.500 o $14.500 | $32.900 a $57.900 |
| FatSecret | Calorías | $6.290 o $8.990 | $13.990 a $39.990 |
| Yazio | Calorías | $5.500 a $12.900 | $11.500 a $22.900 |
| Lifesum | Calorías | $6.500 a $8.700 | $35.900 |
| Cal AI | Calorías por foto | — | $19.990 a $34.990 |
| MacroFactor | Calorías | $8.700 a $10.500 | $61.900 |
| Strava | Entrenamiento | $5.490 a $6.990 | $35.900 a $69.990 |
| Hevy | Entrenamiento | $2.200 a $4.500 | $17.500 |
| Fitbod | Entrenamiento | $6.490 a $14.990 | $37.490 a $74.900 |
| Bevel (solo iPhone) | Coach de salud con IA; su IA se cobra aparte en créditos ($5.990 a $59.990) | $17.990 | $99.990 |
| Welltory (también en Android, 5 M+ descargas) | Coach de salud con IA | $8.500 | $49.990 (coach con IA por un año) |
| YNAB | Finanzas | $14.500 | $99.990 |
| ChatGPT | IA general | Go $7.990 · Plus $19.990 | — |
| Google AI | IA general | Plus $4.690 · Pro $21.490 | — |

- **Foco en Android (2026-11-15):** la presentación compara solo apps que existen en Android. Bevel no está en Google Play (la «Bevel Health» de ahí es de otro desarrollador, con 1.000 descargas), así que se reemplazó por Welltory. Google Play no publica los precios de las suscripciones en su sitio: se usan los de la App Store de Chile.
- **Fitia es la referencia:** #2 en Salud y fitness y 32 mil reseñas en Chile. Ya registra por foto y voz y tiene coach con IA, pero solo de nutrición.
- **Dónde cae Eris:** cobra el anual de una sola app de un tema (MyFitnessPal $32.900, Lifesum $35.900, Strava $35.900) y cubre comida, entreno, sueño, plata, casa y salud.
  - Por mes, $4.990 queda bajo MyFitnessPal, FatSecret, Lifesum, Strava y ChatGPT Go, y apenas sobre el Fitia más barato.
  - Una app por cada cosa que cubre Eris completo (calorías, entreno y finanzas): Fitia, Strava y YNAB cuestan $160.790 al año, contra $34.990. (Antes la presentación sumaba Fitia, Strava y MyFitnessPal, $93.700: eran dos apps de calorías; se corrigió el 2026-11-15.)
- **Diferencias que nadie más junta:**
  - el día completo cruzado en una respuesta, sin otra IA;
  - cifras desde código y fuentes verificadas;
  - IA local, sin costo por mensaje;
  - español de Chile y la base de alimentos chilena.
- **Contexto:**
  - Android es cerca de 70 % de los teléfonos en Chile (StatCounter, agosto de 2026);
  - el sueldo mínimo es $553.553 desde mayo de 2026, y el anual de Eris equivale a 0,5 % de él al mes;
  - Fitia dice tener más de 10 millones de usuarios.

## 📊 Por qué estos precios (simulación del 2026-11-14)
Se compararon cinco opciones con todo lo demás igual. Lo que no se sabe es cuánto baja la conversión si sube el precio (la elasticidad), así que se probó con 0,2 (poco), 0,6 (base) y 1,2 (mucho):

| Opción | Para sueldos al mes 36 (0,2 · 0,6 · 1,2) | Se paga sola |
| --- | --- | --- |
| $3.990 · $39.990 · módulos $1.490 | $453 mil · $512 mil · $612 mil | mes 13 |
| Todo gratis y Eris+ $4.990 · $34.990 (paga 1,5 %) | $502 mil con las tres | mes 13 |
| $2.990 · $24.990 · módulos $1.490 | $318 mil · $432 mil · $647 mil | mes 15 |
| **$4.990 · $34.990 · módulos $1.990** | **$541 mil** con las tres | **mes 12** |
| $5.990 · $44.990 · módulos $2.490 | $668 mil · $608 mil · $526 mil | mes 10 |

- Cada instalación deja $453, contra $431 con Eris+ y $431 con los precios de antes.
- Con la elasticidad baja y la base, gana a lo de antes. Si la gente mira muchísimo el precio (1,2), los precios más bajos dejan más.
- $5.990 deja más si la gente mira poco o algo el precio, pero es menos accesible, y el fundador pidió un precio accesible.
- **El anual manda:**
  - quien lo toma deja $40.613 en total y quien paga mes a mes, $17.109;
  - RevenueCat 2026 mide que los planes anuales dejan cerca del doble por instalación y que en salud y deporte el 68 % elige el anual;
  - por eso el anual ahorra 42 % y se presenta como «$2.916 al mes»: en Latinoamérica, esa forma subió 10 % la elección del anual.
- **Lo gratis, generoso, pero no todo:**
  - RevenueCat mide que un modelo gratis generoso deja cerca de la novena parte por instalación que un muro de pago, y las apps con IA están acotando lo gratis. Por eso Eris+ (todo gratis y solo comodidad de pago) era riesgoso.
  - La IA de Eris no cuesta por mensaje, así que el núcleo gratis puede ser generoso y atraer gente; las herramientas que no todos usan se pagan.
  - Referencia: Duolingo deja gratis todo lo que enseña y cobra la comodidad. En el primer trimestre de 2025 tenía 10,3 M de suscriptores pagados con 130,2 M de usuarios activos al mes (cerca de 8 %).
- **El primer mes con todo:** RevenueCat mide que las pruebas de 17 a 32 días convierten 42,5 %, contra 25,5 % las de 4 días o menos. Ojo: esa cifra es de pruebas con tarjeta; la nuestra es sin tarjeta y la beta dirá cuánto convierte.

**Supuestos propios** (no medidos):
- cuánta gente elige el anual según cuánto ahorra (16 % → 25 %, 42 % → 50 %, nunca más de 68 %), entre quienes no eligen un módulo suelto;
- que 30 % elige un módulo suelto y que cada uno toma 1,2 módulos en promedio;
- la elasticidad (0,6);
- que la conversión de 2 % corresponde a un precio de $4.990, y que con solo comodidad de pago (Eris+) sería un cuarto menor.

## 💼 La ronda (propuesta, 2026-11-12; cifras del 2026-11-14)
- **US$ 50.000 (≈ CLP 49 M) para 24 meses:** de la beta a Google Play y a los primeros cientos de personas que pagan.
- **Cómo se calculó:** con un sueldo de $1.000.000 líquido desde el mes 1, $300.000 al mes de publicidad desde que se cobra y $4,5 M de puesta en marcha (legal, ley de datos personales, marca y revisión de salud). Con el núcleo gratis y los módulos de pago, 24 meses piden entre $31 M y $44 M en 8 de cada 10 corridas; US$ 50.000 cubre el caso malo.
- **Uso:** 65 % equipo (el sueldo), 14 % infraestructura (PC, luz, internet, contador y herramientas), 12 % lanzamiento y 9 % validación y legal.
- **Al mes 24:** entre 160 y 678 personas que pagan, en 8 de cada 10 corridas (la mitad, sobre 331).

## 🧭 Pendiente
- Confirmar con un contador el IVA y la boleta, y con un abogado la prueba sin tarjeta y la medición encendida por defecto.
- Medir en la beta pagada cuánto convierte el precio fundador y cuántos eligen el anual.
- Decidir el plan familia (Fitia cobra $37.900 al año).
- Construir el pago por módulo en la app y el servidor: que el chat use solo los módulos que la persona tiene.
- Medir en la beta cuántos eligen un módulo suelto, cuál y cuántos pasan al completo.

## 🔗 Fuentes
- App Store de Chile, fichas de cada app, 12 de noviembre de 2026.
- [RevenueCat, State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps).
- [StatCounter, sistemas operativos móviles en Chile](https://gs.statcounter.com/os-market-share/mobile/chile).
- Ingreso mínimo mensual: $553.553 desde el 1 de mayo de 2026 ([Buk](https://www.buk.cl/blog/sueldo-minimo-chile-reajuste)).
