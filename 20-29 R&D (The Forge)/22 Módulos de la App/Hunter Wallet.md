---
owner: Eris
tier: Técnico
status: Activo
estado: Construido
---

# 💰 Hunter Wallet (RFC: Personal Finance Module)

↑ [[20-29 R&D (The Forge)/22 Módulos de la App/22 - Módulos de la App.md|Módulos de la App]]
#AXS/Producto #AXS/Finanzas

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[20-29 R&D (The Forge)/22 Módulos de la App/Toji.md|Toji]], [[20-29 R&D (The Forge)/21 Núcleo de Eris/Eris.Core.md|Eris.Core]], [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]]

## 🎯 Misión
Finanzas personales dentro de `eris-mobile` (portal **Finanzas**). Lleva cuentas, gastos, sueldo, fijos, cuotas y ahorro. Le da a Eris el contexto para conversar de plata y cruzarla con la comida (presupuesto de alimentación).

> ⚠️ Es el módulo de finanzas **personales del usuario** (app), distinto de Finanzas (contabilidad del negocio AXS).

**Finanzas 2.0 (2026-10-15, app 1.44.0):** el módulo pasó de un WebView de un solo archivo a pantallas **nativas** con un **núcleo puro y probado**. Es el mismo camino que siguió Nutrición. La meta es que sea mejor que las apps de finanzas del mercado:
- anotar sin tipear y sin entregar las claves del banco;
- lo chileno (cuotas, sueldo y quincena, «lucas»);
- «¿llego a fin de mes?»;
- todo local y cifrado.

## 🧩 Componentes
- **Núcleo (`financeCore`):** todas las reglas de la plata en un módulo puro, sin dependencias.
  - Lo portado de la web: libro único, saldos calculados, sueldo «¿Llegó?», fijos, cuotas, préstamos y operaciones del chat.
  - Lo nuevo: el tablero, el presupuesto al día, el rating y la simulación.
  - El servidor tiene una **copia exacta**, y una prueba de paridad compara archivo y resultados.
- **Libro único (desde v2, 2026-10-01):** un solo libro de movimientos (gasto, ingreso, abono, giro, transferencia, ajuste, préstamo, cobro, ahorro). **Los saldos siempre se calculan**, no se guardan.
- **Sueldo, fijos y cuotas:**
  - el sueldo se configura una vez (líquido, día de pago, quincena) y cada mes se confirma con la tarjeta «¿Llegó?»;
  - los gastos fijos se anotan solos en su día;
  - las compras en cuotas usan el cupo completo y cuentan una cuota por mes desde el siguiente.
- **Pantallas nativas, estilo «terminal fintech»** (oscuro, morado y cian, números monoespaciados):
  - **Ordenada por «dónde se hace cada cosa» (2026-10-16, app 1.47.0, pedido del usuario: «más claro, simple en identificar dónde hacer cada cosa»):** cinco secciones fijas con ícono y un solo botón para anotar:
    - **🏠 Hoy:** en palabras simples, cuánto puedes gastar hasta el sueldo y por día, si a tu ritmo te alcanza, lo que llegó para confirmar, lo que viene (¿llegó el sueldo?, fijos, cuotas) y un vistazo de cómo vas. Si está vacío, «Empieza aquí» en 3 pasos;
    - **↕ Movimientos:** todo lo anotado, por mes;
    - **🏦 Cuentas:** dónde está la plata (efectivo, cuentas, tarjetas, ahorro) y lo que te deben; las acciones poco usadas de cada cuenta (importar cartola, corregir saldo, quitar) van tras «⋯»;
    - **🎯 Plan:** sueldo, lo que se repite cada mes, topes por categoría y metas de ahorro;
    - **📊 Análisis:** la terminal (curva del mes contra el ritmo ideal, los números del mes, categorías contra el mes pasado al mismo día, rating y 6 meses);
    - **«+ Anotar»:** un menú con TODO lo que se anota (gasto, foto de la boleta, me entró plata, transferir, sacar efectivo, pagar la tarjeta, ahorrar, prestar, importar la cartola);
    - **? (guía «¿Cómo hago…?»):** cada tarea, dónde está y un botón para hacerla; **⚙ Ajustes:** avisos del banco, respaldo, recorrido y empezar de cero. Ya no existe la pestaña «Más»;
    - **Recorrido guiado** la primera vez (el mismo de Inicio): ilumina lo que puedes gastar, el botón Anotar, cada sección y la guía;
  - **Presupuesto al día del mes:** barra fantasma con lo esperable a hoy, y estado en palabras («al día», «para cerrar en presupuesto: ≤ $X/día»);
  - **Rating financiero AAA…CCC.** Reemplaza al Rango Hunter, que juzgaba por cuánto se gana ([[50-59 Intelligence Feed/53 Decisions/decision-2026-10-12-preciso-por-dentro-simple-por-fuera.md|preciso por dentro, simple por fuera]]). Califica la **conducta**: ahorro 30 %, colchón 25 %, deuda de tarjetas 20 %, presupuesto 15 % y runway 10 %. Siempre dice qué lo sube.
- **Anotar rápido:** atajos «LO DE SIEMPRE» (lo más repetido de los últimos 90 días) y la cuenta de la última vez. Las fechas se eligen en un **calendario** propio (Hoy/Ayer o el mes en cuadrícula; sin escribir, 1.47.1) y los días de pago o de un fijo en una cuadrícula del 1 al 31 (`src/screens/finance/Calendario.tsx`). Antes de guardar muestra **«si lo anotas…»**: la simulación de cómo quedaría.
- **Categoría Hogar/aseo** (nueva): detergente, confort, etc. Lo pide la boleta del súper.
- **Anotar por chat (`finance_tracker`):** «5 lucas en el super con la BCI», «luca y media», «1 palo», «me lo devuelve el viernes», «en 3 cuotas».
  - Lo claro se resuelve por código; lo ambiguo va al modelo.
  - Con Finanzas nativa, la operación se aplica directo en el store del teléfono.
- **«¿Y si me compro…?» por chat:** «¿y si me compro unas zapatillas de 60 lucas?», «¿me alcanza para un celular de 300 lucas en 6 cuotas?».
  - El servidor simula con su copia del núcleo sobre el último respaldo, sin el modelo (~0,1 s).
  - Dice cuánto quedaría para gastar y por día, el ritmo, el tope de la categoría y, en cuotas, la cuota y la deuda.
  - **No anota nada.**
- **Respaldo cifrado en el PC (F0, 2026-10-15):**
  - cada cambio manda un volcado de Finanzas al servidor, que lo guarda **cifrado** (una copia por día, las últimas 7);
  - un Finanzas vacío nunca pisa un respaldo con datos: ofrece restaurarlo;
  - se restaura desde Perfil → «Respaldo de Finanzas».
- **Migración desde la web (una vez y sin riesgo):**
  - un WebView oculto con el mismo origen lee todas las claves `hw*`;
  - se pasa a nativa **solo si el resumen calculado por la web y por el núcleo coincide al peso**;
  - si no coincide, sigue la versión web; los datos de la web no se borran.
- **Anotar sin tipear (F4, app 1.45.0).** Cada fuente PROPONE y la persona confirma; nada se anota solo.
  - **Escanear la boleta:** la cámara lee el **timbre electrónico del SII** (PDF417). De ahí salen exactos el total, la fecha, la razón social, el folio y el primer producto.
    - RUT + tipo + folio forman una clave: la misma boleta no se anota dos veces.
    - Una nota de crédito o una guía no se anota como gasto.
  - **Foto de la boleta (2026-10-16, app 1.46.0):** una foto, todos los productos, anotados de una vez.
    - La foto viaja al PC y se lee con el **OCR que trae Windows** (`Windows.Media.Ocr`, en español, sin internet ni descargas, ~0,8 s); la imagen se borra al terminar.
    - El código (no la IA) rearma las filas por posición, separa productos, cantidades («2 X 1.290»), descuentos (se restan al producto anterior) y el TOTAL; lo de después del total (pago, vuelto, IVA) no son productos.
    - **Cuadre:** la suma de los productos contra el TOTAL (o contra el timbre, si la cámara alcanzó a leerlo mientras encuadrabas). Si no cuadra, se avisa y se puede anotar solo el total.
    - Revisión: los productos agrupados por categoría (comida por defecto en el súper; aseo → Hogar, alcohol → Ocio, mascotas → Otros); se toca uno para moverlo. Se anota **un gasto por categoría**, todos unidos a la boleta (con sus productos guardados para la despensa más adelante).
    - *Probado con boletas de prueba dibujadas (dos formatos, derecha y girada); falta afinarlo con boletas reales.*
  - **Avisos del banco:** módulo nativo local con lectura de notificaciones.
    - La persona da el acceso en Ajustes de Android y elige las apps de su banco.
    - Solo de esas se guardan los avisos con montos; de las demás, solo el nombre de la app.
    - Un lector por código saca el monto, el comercio, la tarjeta (últimos 4) y el tipo. Compras y transferencias enviadas se proponen; saldos, ofertas y códigos no.
    - Avisa «¿ya está?» si hay un gasto del mismo monto ±1 día.
    - **Eris anota sola (2026-10-30, «Eris administra» A0; app 1.74.0):** con el interruptor encendido, cada aviso se decide por código (`bankAuto.decidir`):
      - **anota** la compra si la cuenta está clara: la que la persona eligió antes para esa app y tarjeta, la tarjeta que dice el nombre de la cuenta, o la única cuenta de ese banco (con «crédito» o «débito» del aviso si tiene dos). La categoría es la que usó antes para ese comercio; si no, la del comercio;
      - **vincula** el aviso a lo que ya anotó por chat, con la boleta o un fijo (mismo monto, ±1 día), sin duplicarlo; el mismo cargo avisado dos veces a los minutos se ignora;
      - **propone** («Por confirmar», con la razón) lo dudoso: otra app o un banco sin cuenta, varias cuentas sin pista, un comercio nuevo sobre el tope (por defecto $100.000), un saldo que no alcanza en lo anotado, transferencias y giros (fase A1);
      - se procesa sin abrir Finanzas: al abrir la app, al volver a ella, cuando llega un aviso y, con la app cerrada, con una tarea headless que lanza el propio servicio de Android (`BankHeadlessService.kt` → `ErisBankAuto`). Si Android no la deja correr, el aviso espera en la cola y se anota con su hora real;
      - avisa en silencio («Anoté $12.990 · Lider») con **Deshacer** (sin abrir la app; vuelve a «Por confirmar») y **Cambiar** (abre el movimiento, donde ahora se corrigen la categoría y la cuenta, y la cuenta queda aprendida para esa tarjeta);
      - en Hoy, el panel **«🤖 Anotó Eris»** (últimas 36 h) y, la primera vez, la oferta «¿Que Eris anote sola?»; en ⚙, «Que anote sola / Solo proponer» y el tope;
      - con visto bueno: primero solo Ikaros; el público, con el interruptor del panel de administración (`finanzasAuto` en `features.json`). El texto de los avisos no sale del teléfono.
    - **Transferencias, sueldo y cobros (2026-10-30, «Eris administra» A1; app 1.75.0):** los mismos avisos, ahora con todo lo que mueve plata:
      - **entre tus cuentas** = UNA transferencia (no es gasto ni ingreso): las dos mitades (sale de A y entra en B, mismo monto, ≤ 2 h; si llega una sola, espera 15 min a la otra), una transferencia a tu nombre (el de tu perfil), la cuenta de destino que es tuya («a tu cuenta ****5678») o lo que respondiste antes con ese nombre. Si llega la otra mitad después de anotar la primera, se unen. A una cuenta de ahorro queda como ahorro;
      - **a otra persona** = un gasto «Transferencia a Juan», con la categoría que le pusiste la última vez; una persona nueva sobre el tope la confirmas tú;
      - **lo que entra:** tu **sueldo** (±15 %, ±7 días, su cuenta) confirma solo el «¿Llegó?» con el monto real (y dice la diferencia; el del día 1 que llega el 30 es del mes siguiente; la planilla se anota igual); un **ingreso fijo** (±5 %); un **«Me debe»** que te devolvieron (monto exacto y el nombre si el aviso lo dice, o una parte si el nombre calza); si no calza con nada, **abono** (no cuenta como ingreso) con «Fue un ingreso», que se aprende para esa persona;
      - **giro** → a tu efectivo (sin efectivo, pregunta una vez); **pago de la tarjeta** → transferencia de tu cuenta a la tarjeta (más que la deuda, lo confirmas tú);
      - **sin duplicar:** lo que ya anotaste por chat (una transferencia, el sueldo con otra cifra) se enlaza; la misma compra por la app y por correo del mismo banco cuenta una vez;
      - «Por confirmar» abre la hoja **«Aviso del banco»** (¿qué fue? pago o gasto · a otra cuenta mía · le presté · abono · ingreso · mi sueldo o un fijo · me devolvieron · a mi efectivo · pago de tarjeta), con lo que Eris sugiere; al anotar una mitad, la otra se enlaza sola. El detalle de un movimiento suma «¿Fue un ingreso?», «Era un abono» y «¿Fue a otra cuenta tuya?»;
      - lectores: montos en «pesos», tarjeta «*1234», con quién («a JUAN PEREZ», «de EMPRESA SPA», «Juan te envió…»), la otra cuenta y el saldo del aviso (para cuadrar en A2);
      - **correos y SMS del banco** (apagado): de Gmail, Outlook y Mensajes, solo lo que manda un banco conocido por el remitente, y nunca la publicidad.
    - **«Tus finanzas no calzan» (2026-10-30, «Eris administra» A2; app 1.76.0):** lo que dice el banco contra lo anotado **a esa hora** (lo anotado después no cuenta):
      - **el saldo del banco** viene del aviso («saldo disponible $X»), de una **captura** de la app del banco (se lee en el PC y se borra; vuelven solo los saldos), del saldo final de la **cartola** o del **chat** («mi BCI tiene 412 lucas»); se guarda en el libro (`hw2_banco`, solo números);
      - **por qué no calza, por código** (lo más probable primero): un aviso en «Por confirmar» (o descartado) de ese monto · algo anotado dos veces (chat + aviso) · un gasto anotado en la cuenta equivocada · un fijo cobrado antes de su día · el sueldo que llegó y no está confirmado · una comisión como la del mes pasado · 2–3 avisos pendientes que suman justo la diferencia;
      - **arreglos:** cada explicación con un botón (Anotar, Quitar el repetido, Cambiar de cuenta, Confirmar); si nada calza: revisar con la cartola, «fue un gasto que no recuerdo», «mi saldo incluye la línea de crédito» o **ajustar al saldo del banco** (solo con el toque de la persona);
      - **solo:** con «Eris anota sola», lo exacto que no viene de «Por confirmar» se arregla solo y avisa «Cuadré tus finanzas» con Deshacer; lo deshecho no se vuelve a arreglar solo;
      - **aviso tranquilo** «Tus finanzas no calzan: tu BCI dice $X y yo llevo $Y. Creo que…» con **Arreglar** (sin abrir la app) y **Ver**, una vez al día por cuenta; también una cuenta en negativo. La transferencia a medias (> 24 h) y el sueldo atrasado (2 días hábiles) se muestran en Hoy;
      - **Hoy → «⚖ Cuadre con tu banco»** («✓ Calza · hace 2 h» / «No calza por $X → Cuadrar») y la hoja **«Cuadrar»**; el **Plan de Eris** suma «⚖ Cuadra tu BCI (2 min)»; por chat: «¿mis finanzas calzan?», «mi BCI tiene 412 lucas», «arregla mi BCI» (solo lo exacto), «ajusta mi BCI al banco»; sin el teléfono, el servidor responde con el último respaldo;
      - **«Compartir ejemplos de avisos»** (⚙): los textos que ya leyó Eris, sin nombres ni números, para afinar los lectores; se abre el menú de compartir y la persona elige.
    - **«Así manejo tu plata» (2026-10-30, «Eris administra» A3; app 1.77.0):** la hoja (desde 🧭 o el Plan de Eris) con lo que Eris hace sola, cada cosa con su interruptor: anotar lo que avisa el banco · confirmar el sueldo (apagado: se propone) · cuadrar y arreglar lo exacto (apagado: solo avisa) · el tope de gasto del día en el Plan. Lo que pregunta (lo nuevo sobre el tope, cuentas que no conoce, el ajuste al banco) y lo que no hace nunca (mover plata, pagar, sacar el texto de los avisos del teléfono).
  - **Importar la cartola** (por cuenta, en Cuentas):
    - la persona elige el archivo (Excel .xlsx, CSV, tabla HTML o **PDF**) y el PC lo lee **en memoria, sin guardarlo**;
    - **PDF (2026-10-16):**
      - se extrae el texto con su posición y cada trozo va a la columna del título que tiene encima; una línea sin fecha justo debajo continúa la descripción;
      - las cartolas «protegidas» solo con restricciones se abren sin clave (cifrado estándar RC4, AES-128 y AES-256, comprobado con el valor de control del archivo);
      - si el PDF pide clave, la persona la escribe en la app: viaja solo para abrir ese archivo y no se guarda;
      - un PDF escaneado (foto) no trae texto;
    - el lector busca la fila de títulos (fecha, descripción, cargo/abono o monto, saldo) en vez de suponer columnas;
    - el núcleo concilia con lo anotado (mismo monto, ±2 días, misma cuenta, cada movimiento una vez) y solo lo que falta va a «Por confirmar»;
    - *.xls antiguo (binario): todavía no.* Se le dice a la persona cómo descargarla en Excel.
  - **«Por confirmar»** en Hoy: lo que llegó del banco o de la cartola (y Eris no anotó sola, con la razón), con Anotar / ✕. Al anotar, recuerda qué cuenta corresponde a esa tarjeta.
- **Cruces con la comida (F5):**
  - el asesor de comida usa el **presupuesto de comida al día como dato** (la misma cifra por día que la pantalla de Presupuesto); el texto queda de respaldo;
  - Eris ve un dato neutral de **comida fuera y delivery del mes** (monto y veces), sin juicio;
  - *Pendiente:* que lo comprado en el súper pase a la despensa (necesita el detalle por producto de la boleta).
- **Metas de ahorro:** tarjetas con su avance contra el ahorro acumulado.
- **Avisos:**
  - 3 días sin movimientos, un fijo que vence mañana, sueldo por confirmar y el día 1 del mes;
  - **presupuesto al día:** un aviso, la categoría más pasada, con lo que puede gastar por día para cerrar el mes;
  - los lunes, si lo que se cobra antes del sueldo no alcanza;
  - todos con el tono que eligió la persona.

## 🏗️ Arquitectura
- **Estado:** un solo `FinanceState` por cuenta en el teléfono (`finance_state_v1` en AsyncStorage, separado por perfil con ScopedStorage). Solo el teléfono escribe.
- **Respaldo:** el teléfono manda el volcado, y el servidor lo guarda cifrado con la llave del perfil (`ERISENC1:`).
- **Lo que lee Eris:** el núcleo arma el contexto y los números (rating, lo libre, presupuesto al día) y los manda al servidor en cada cambio.
  - *Regla interna:* no escribir líneas nuevas con «Disponible:» en el resumen, porque el asesor metabólico toma la primera.
- **Versión web** (`hunter-wallet.html`): queda como respaldo para volver atrás si la migración no cuadra. Se retira cuando la nativa esté probada con datos reales.
- **Lo que sigue** (*planeado*, no construido):
  - detalle por producto de la boleta (OCR en el teléfono), con 10–15 boletas reales;
  - lectores afinados con avisos reales del banco de la persona;
  - lo comprado en el súper a la despensa.

## 💻 Implementación Actual
> **Rutas:** `C:\Proyectos\eris-mobile\` y `C:\Proyectos\eris\`

| Responsabilidad | Archivo |
|---|---|
| Núcleo (reglas, tablero, presupuesto al día, rating, simulación) | `src/services/finance/financeCore.ts` |
| Estado por cuenta, guardar y avisar cambios | `src/services/finance/financeStore.ts` |
| Migración desde la web (comparación al peso) | `src/services/finance/financeMigrate.ts`, `src/screens/finance/FinanceMigrator.tsx` |
| Resumen para Eris desde el núcleo | `src/services/finance/financeContext.ts` |
| Pantallas nativas (Hoy, Movimientos, Cuentas, Plan, Análisis) | `src/screens/finance/FinanceScreen.tsx`, `src/screens/finance/tabs/*.tsx` |
| Menú «+ Anotar», guía «¿Cómo hago…?», Ajustes, elegir la cuenta de la cartola | `src/screens/finance/HubSheets.tsx` |
| Formularios, atajos y «si lo anotas…» | `src/screens/finance/Sheets.tsx` |
| Primer uso | `src/screens/finance/Onboarding.tsx` |
| Respaldo y restaurar (teléfono) | `src/services/financeBackup.ts` |
| Timbre de la boleta (PDF417 del SII) | `src/services/finance/receiptTed.ts`, `src/screens/finance/ReceiptScanner.tsx` |
| Foto de la boleta (cámara, revisión por categoría) | `src/screens/finance/ReceiptPhoto.tsx`, `src/services/finance/boletaFoto.ts`, `src/screens/finance/Sheets.tsx` |
| Avisos del banco (módulo nativo) | `modules/eris-bank-notifications/` (`BankNotificationService.kt`, `index.ts`) |
| Leer los avisos y «Por confirmar» | `src/services/finance/bankNotif.ts`, `src/services/finance/financeInbox.ts`, `src/screens/finance/Inbox.tsx` |
| Eris anota sola: decidir cada aviso (cuenta, categoría, duplicados, tope) | `src/services/finance/bankAuto.ts` |
| Procesar la cola sin abrir Finanzas, registro y Deshacer | `src/services/finance/financeAuto.ts`, `index.ts` (tarea `ErisBankAuto`), `modules/eris-bank-notifications/android/.../BankHeadlessService.kt` |
| Transferencias entre tus cuentas, sueldo, «Me debe», giros, pago de tarjeta (A1) | `src/services/finance/bankAuto.ts` (`emparejar`, `fijoDelAviso`, `cobroDelAviso`, `anotarAviso`, `convertirEnPropia`) |
| La hoja «Aviso del banco» de «Por confirmar» | `src/screens/finance/AvisoSheet.tsx` |
| Correos y SMS del banco (interruptor) | `modules/eris-bank-notifications/android/.../BankNotificationService.kt` (`MAIL_SMS`, `BANK`) |
| Cuadre con el banco: comparar, explicar, arreglar (A2; copia exacta en el servidor) | `src/services/finance/financeCore.ts` (`cuadre`, `arreglarCuadre`, `ajustarAlBanco`, `saldoFinalCartola`) |
| Saldos del banco, arreglos solos, avisos y chat del cuadre | `src/services/finance/financeCuadre.ts` |
| Panel «Cuadre con tu banco» y hoja «Cuadrar» | `src/screens/finance/Cuadre.tsx` |
| Saldo desde una captura (OCR en el PC) | `eris/src/services/ReceiptOcr.ts` (`leerSaldoCaptura`) |
| Importar la cartola (teléfono) | `src/services/finance/cartola.ts`, `src/screens/finance/tabs/Cuentas.tsx` |
| Aplicar lo del chat (nativo primero, web de respaldo) | `src/services/FinanceBridge.ts` |
| Avisos de plata | `src/services/reminderRules.ts`, `src/services/ReminderPlanner.ts` |
| Versión web (respaldo) | `assets/hunter-wallet.html`, `src/screens/HunterWalletScreen.tsx` |
| Copia del núcleo en el servidor | `eris/src/services/FinanceCore.ts` |
| Copiar y comprobar la copia | `eris/scripts/sync_finance_core.ts`, `eris/scripts/finance_parity_test.ts` |
| Respaldo cifrado (servidor) | `eris/src/services/FinanceBackup.ts` |
| Leer la cartola (xlsx/CSV/PDF, en memoria) | `eris/src/services/FinanceStatement.ts` |
| Leer la foto de la boleta (OCR de Windows + productos y cuadre) | `eris/src/services/ReceiptOcr.ts`, `eris/scripts/ocr.ps1` |
| Texto con posición de un PDF (también cifrado sin clave o con la que da la persona) | `eris/src/services/PdfText.ts` |
| Presupuesto de comida como dato para el asesor | `eris/src/services/MetabolicAnalysis.ts` (`foodBudgetFromSummary`) |
| Herramienta del chat (anotar y `simular`) | `eris/src/tools/FinanceTrackerTool.ts` |
| Reconocer frases chilenas y «¿y si…?» por código | `eris/src/services/FinanceParse.ts` |
| Respuesta con cifras reales | `eris/src/services/FinanceReply.ts` |
