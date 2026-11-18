---
owner: Eris
tier: Técnico
status: Activo
estado: Construido
---

# 📦 Inventario (RFC: Household Inventory Module)

↑ [[20-29 R&D (The Forge)/22 Módulos de la App/22 - Módulos de la App.md|Módulos de la App]]
#AXS/Producto

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[20-29 R&D (The Forge)/22 Módulos de la App/Hunter Wallet.md|Hunter Wallet]], [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]]

## 🎯 Misión
Lo que la persona tiene en su casa, **fiel a la realidad** (pedido del usuario, 2026-10-22: «meticulosidad absoluta en mantener el inventario fiel a la realidad»):
- qué hay y dónde, lo que se vence, lo que se acaba;
- la lista de compras, que se arma sola (desde «Eris administra» A3, 2026-10-30, también con lo que **se va a acabar**: a tu ritmo de consumo de las últimas 2 semanas, lo que alcanza para 3 días o menos entra solo, con la cantidad de una semana; se apaga en «Así manejo tu casa»);
- que Eris lo sepa por chat.

Es la base para que Nutrición arme primero con lo que hay en la despensa (fase I7) y para que la boleta de Finanzas llene el inventario (fase I3).

**Fase I2 (2026-10-22, app 1.56.0):** módulo nuevo, nativo, con portal propio, como Forge y Finanzas.

## 🧩 Componentes
- **Núcleo (`inventoryCore`):** todas las reglas en un módulo puro, sin imports. El servidor tiene una **copia exacta**, y una prueba de paridad compara archivo y resultados.
  - **Áreas:** Alimentos (frescos y refrigerados), Despensa, Baño e higiene, Limpieza y hogar, Botiquín, Ropa, Objetos y Mascotas (oculta por defecto). Se pueden esconder sin borrar lo que tienen.
  - **Cada cosa:** cantidad y unidad (u, paquete, g, kg, ml, L) y lo que trae cada unidad («1 L», «400 g»). Así «usé 500 ml» descuenta media caja. Además: vencimiento (el más próximo), mínimo, ubicación, último precio por unidad, marca y código de barras.
  - **Historial de movimientos:** compra, consumo, conteo, botado y movido. Cada número tiene su porqué y se puede deshacer.
  - **Lectura del texto:** cantidades en palabras («media docena», «2 paquetes de fideos de 400 g»), plurales del castellano y el área por el nombre.
- **Lo que pide atención:**
  - lo que vence en 7 días, y lo vencido en rojo;
  - lo que se acabó o quedó bajo su mínimo;
  - la **revisión de la semana**: un toque por cosa sin contar hace 7 días, «está bien» o cuánto hay.
- **Lista de compras:**
  - se arma sola con lo que se acaba, más lo anotado a mano;
  - cuánto comprar: lo de la última compra;
  - costo estimado con el último precio, **cruzado con el tope del mes de cada categoría de Finanzas**;
  - «✓ Lo compré» y «Compartir».
- **Pantallas nativas** (patrón de Finanzas 1.47: secciones fijas y un solo «+»):
  - **🏠 Hoy:** por vencer, se acabó o queda poco, revisión y tu casa por área. Si está vacío, «Empieza aquí» por área;
  - **🗂 Áreas:** grilla con alertas, buscador y cada área con «−» (usé una) y «+» (compré una);
  - **🛒 Compras:** la lista y el cruce con el presupuesto;
  - **+ Agregar:** a mano o escaneando el código (el nombre sale de la misma cascada de Nutrición). Si ya existe, se suma;
  - detalle de cada cosa con usar, contar, botar (aparte del consumo), editar y su historial;
  - guía «¿Cómo hago…?», ⚙ (áreas y respaldo), recorrido y botones ⓘ.
  - Estética propia: verde azulado de despensa, ámbar para lo que se vence y rojo para lo vencido. El portal tiene una repisa que se llena.
- **Por chat (`inventory_tracker`):**
  - «compré 2 L de leche y 6 huevos», «se me acabó el shampoo», «me quedan 3 huevos», «usé 500 g de arroz», «boté el yogur»;
  - «¿tengo arroz?», «¿qué tengo en la despensa?», «¿qué me falta comprar?», «¿qué se vence?».
  - Lo claro se resuelve por código y lo aplica el teléfono (`inventory_op`). Eris solo dice «anotado» con su confirmación.
  - Las consultas, sin el teléfono conectado, salen del último respaldo, avisando de cuándo es.
  - Lo que trae plata va a Finanzas y lo que se come, a Nutrición.
- **Respaldo:** cifrado en el PC, una copia por día (las últimas 7). Un inventario vacío nunca pisa uno con datos. Se restaura desde ⚙ o desde Perfil, y la app lo ofrece sola si apareces vacío.

## 💻 Implementación Actual
> **Rutas:** `C:\Proyectos\eris-mobile\` y `C:\Proyectos\eris\`

| Responsabilidad | Archivo |
|---|---|
| Núcleo (áreas, unidades, cantidades, lista, vencimientos, revisión, chat) | `src/services/inventory/inventoryCore.ts` |
| Estado por cuenta, guardar, respaldo y contexto para Eris | `src/services/inventory/inventoryStore.ts` |
| Respaldo y restaurar (teléfono) | `src/services/inventoryBackup.ts` |
| Pantallas (Hoy, Áreas, Compras) | `src/screens/inventory/InventoryScreen.tsx`, `src/screens/inventory/tabs/*.tsx` |
| Formularios, detalle, revisión, guía y ajustes | `src/screens/inventory/Sheets.tsx` |
| Piezas y colores | `src/screens/inventory/parts.tsx`, `src/screens/inventory/ix.ts` |
| Portal y pestaña | `App.tsx`, `src/components/PortalOverlay.tsx` (tema `inventario`) |
| Copia del núcleo en el servidor y paridad | `src/services/InventoryCore.ts`, `scripts/sync_inventory_core.ts`, `scripts/inventory_parity_test.ts` |
| Herramienta del chat, lectura de frases y respuestas | `src/tools/InventoryTrackerTool.ts`, `src/services/InventoryParse.ts`, `src/services/InventoryReply.ts` |
| Puente con el teléfono | `src/services/InventoryBridge.ts` |
| Respaldo cifrado (servidor) | `src/services/InventoryBackup.ts` |

## 🔄 Se mantiene solo (fase I3, app 1.57.0)
- **La boleta de Finanzas:**
  - un solo gasto con el total y su desglose por categoría;
  - cada producto, revisado línea por línea, va a su área. Si ya lo tienes, se suma ahí en su unidad (abreviaturas expandidas, kg → unidades por el peso típico).
- **Lo que comes:**
  - lo anotado en Nutrición (a mano o por chat) sale de Alimentos y Despensa, convirtiendo por el peso;
  - lo que no se puede convertir queda «por confirmar»;
  - si se borra la comida, vuelve, y «Lo comí fuera» lo devuelve.
- **💊 Botiquín:** los remedios del perfil con stock y días que alcanzan (bajan solos con las tomas que anota la persona, sin indicar dosis), suplementos y el **historial médico** en el perfil: grupo sanguíneo, alergias, condiciones, exámenes, consultas y eventos.

| Responsabilidad | Archivo |
|---|---|
| Tomas diarias, comida → despensa, boleta → inventario (núcleo) | `src/services/inventory/inventoryCore.ts` (`aplicarTomas`, `procesarComidas`, `lineaDeBoleta`, `destinoBoleta`) |
| Correr solo (al abrir, al volver y al cambiar el registro de comidas) | `src/services/inventory/inventoryAuto.ts` |
| Botiquín y perfil médico | `src/screens/inventory/tabs/Botiquin.tsx`, `src/screens/inventory/useMedical.ts` |
| Revisión de la boleta (un gasto + inventario) | `src/screens/finance/Sheets.tsx`, `financeCore.ts` (`partes`, `partesDe`) |
| Historial médico (servidor) | `src/server.ts` (`medical_history_add/delete`), `src/memory.ts` (`MedicalEvent`) |

- **Suplementos (fase I5, app 1.59.0):** un suplemento de «Mis suplementos» (Nutrición) puede llevar su stock en el Botiquín. Baja con cada «Tomado», no por día, así no se descuenta dos veces.

- **La despensa para el asesor (fase I7, app 1.61.0):** el asesor de comida arma primero con lo que hay en Alimentos y Despensa, y usa antes lo que vence pronto, para llegar a las metas de Forge. Lo vencido o agotado no se propone (`eris/src/services/HomePantry.ts`; detalle en Valkyria).
