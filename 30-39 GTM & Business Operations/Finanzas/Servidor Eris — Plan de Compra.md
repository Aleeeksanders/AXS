---
owner: Eris
tier: Operativo
status: Planificado
---

# 🖥️ Servidor Eris — Plan de Compra

#AXS/Finanzas #AXS/Hardware

[[30-39 GTM & Business Operations/Finanzas/Finanzas.md|Finanzas del negocio]] · Decisión: [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-11-pc-dedicado-para-eris.md|PC dedicado para Eris]] · Infra: [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/TI.md|TI]]

## 🎯 Para qué
Un PC solo para Eris, para que el notebook quede libre y los testers no dependan de él. Lo que importa es la **memoria de la tarjeta de video**: con 12 GB, el modelo, el dictado y los servicios caben enteros en la tarjeta.

## 🧾 Opciones (precios de referencia en Chile, 2026-10-11)
- **A. Suficiente (recomendada) — ~$830.000 a $890.000**
  - PC base: Ryzen 5 5600/5600GT, 16 GB de RAM, SSD de 512 GB a 1 TB y fuente de 550–650 W de marca.
  - **RTX 3060 de 12 GB:** ~$410.000 (ASUS Dual V2, en efectivo).
  - Si el PC base viene armado, revisar que la fuente sea de 550 W reales con conector de 8 pines. Si no, sumar ~$50.000.
- **B. Holgada para la beta — ~$1.300.000 a $1.360.000**
  - El mismo PC base con una **RTX 5060 Ti de 16 GB** (~$880.000, MSI Ventus 2X OC Plus, en efectivo).
  - Permite 2 conversaciones a la vez o un modelo más grande más adelante.
- **16 GB de RAM alcanzan** si el modelo cabe en la tarjeta. En 2026 la RAM está muy cara (alzas fuertes desde fines de 2025).
- **Luz:** encendido 24/7, ~36 a 43 kWh al mes → **~$9.000 a $10.000 al mes** (promedio de Santiago, ~$236/kWh). Es una estimación.

> Precios de tiendas del 2026-10-11 (SoloTodo, Mercado Libre). La RAM y las tarjetas cambian mucho este año: **confirmar antes de comprar.**

## 💸 Plan de ahorro
- **Sueldo de referencia:** $1.000.000 líquidos, redondo como en el simulador (el real no va en la bóveda, que es pública). A la fecha no hay gastos anotados en Finanzas, así que no se pudo calcular cuánto queda libre de verdad.
- **Meta:** opción A, ~$850.000. **Con $150.000 al mes (15 %) son ~6 meses.**

| Ahorro mensual | % del sueldo | Opción A (~$850.000) | Opción B (~$1.330.000) |
| -------------- | ------------ | -------------------- | ---------------------- |
| $100.000       | 10 %         | 9 meses              | 14 meses               |
| $150.000       | 15 %         | 6 meses              | 9 meses                |
| $200.000       | 20 %         | 5 meses              | 7 meses                |
| $250.000       | 25 %         | 4 meses              | 6 meses                |

## 🪜 Cómo hacerlo
1. **Primero el PC base,** al juntar ~$450.000. Trae la RAM, que es lo que más sube. Se deja listo como servidor: servicios que se levantan solos y Tailscale.
2. **Después la tarjeta.** Al instalarla, Eris se muda del notebook al PC.
3. **Llevarlo en Eris:** en Finanzas → Metas de ahorro, crear "PC Eris" con fecha. Cada sueldo: "ahorré 150 lucas para el PC" por chat (Hunter Wallet).
4. **Si es para la beta de AXS:** conversar con Brian si se paga entre los dos o como gasto de la empresa, con factura si existe la sociedad.

## 🔬 Hardware y modelo: qué cambia de verdad (medido el 2026-11-05)
Pregunta del fundador: ¿mejorar el hardware y el modelo hace un cambio real?
**Respuesta:** el hardware, sí. Un modelo más grande, solo después del hardware y si gana en el banco de pruebas.

**Cómo está hoy (según el registro de Ollama del 2026-11-05):**
- De los 6 GB de la tarjeta, Ollama alcanza a usar **3,1 GB**. El resto lo ocupan Windows y las apps abiertas.
- `qwen3.5:4b` con contexto de 8.192 necesita **6,3 GB**:
  - el modelo, 3,6 GB;
  - la memoria de la conversación (KV en q8_0), 1,4 GB;
  - el espacio de cálculo, 1,4 GB.
- Solo **17 a 22 de sus 33 capas** caben en la tarjeta (4 y 5 de noviembre); el 23 de octubre eran 27 a 32. **Más de un tercio del modelo corre en el procesador.**
- El contexto queda casi siempre en 8.192. Las instrucciones, los números del día y las herramientas lo llenan casi entero, así que en los mensajes pesados entran solo 1 o 2 intercambios anteriores. El resto lo recorta `ContextFit` (desde la 1.84).
- Banco de chat real: 141/141, p90 de 19,2 s.

**Qué cambia en cada paso** (estimado; se confirma midiendo):

| Paso | Contexto | Historial que entra | Velocidad | Calidad |
| ---- | -------- | ------------------- | --------- | ------- |
| Hoy, en el notebook | 8.192 | 1–2 intercambios en mensajes pesados | más de un tercio del modelo en el procesador | la de un modelo 4B |
| PC con 12 GB, el mismo modelo | 16.384 seguro; hasta ~32.000, a medir | ~15–20 intercambios con 16.384 | todo en la tarjeta: varias veces más rápido | igual |
| PC con 12–16 GB y un modelo 8B | 16.384 con 12 GB; ~32.000 con 16 GB | como la fila anterior | más lento que el 4B en la misma tarjeta | entiende mejor y rompe menos llamadas a herramientas |
| Modelo más grande en el notebook | menos que hoy | menos | más lento | no conviene: no cabe |

**Plan** (sin fecha; espera la compra):
1. **H1 — Mudar Eris al PC de 12 GB (opción A)** con el mismo `qwen3.5:4b`.
   - En el código: sumar 24.576 y 32.768 a `CONTEXT_LEVELS` en `ContextPlanner.ts`, y dejar que el tope por memoria de video (`markOffloaded`) encuentre el límite solo.
   - Medir: capas en la tarjeta (meta 33/33), contexto típico, cuántas veces recorta `ContextFit` y el banco (p50 y p90).
2. **H2 — Probar un modelo mayor en ese PC**, sin cambiar nada más.
   - Candidatos: `qwen3:8b` (ya está descargado en Ollama, pero Eris no lo usa) u otro de 8–9 B que exista en Ollama en ese momento.
   - Se adopta solo si el banco queda igual o mejor y el p90 no empeora.
   - Con 16 GB (opción B) cabe con ~32.000 de contexto.
3. **H3 — Lo que no cambia.** La IA conecta y el código decide: cifras, registros, atajos y guardias siguen en el código, y un modelo mejor no los reemplaza. `ContextFit` queda como red de seguridad; si todo cabe, no toca nada.

**Lo que queda fuera del plan:**
- **La nube** (modelos grandes de pago): es el mayor salto de calidad y de contexto, pero cobra por mensaje y saca del PC los datos de salud y de plata. Solo entra si lo decide el fundador.
- **Liberar el notebook sin comprar nada:** cerrar lo que usa la tarjeta de video (fondo animado, grabador de juegos, superposiciones) le devuelve memoria a Eris. Pero la decisión del 2026-10-11 fue no condicionar el notebook a Eris.

## 📎 Fuentes
- SoloTodo: ASUS Dual RTX 3060 12GB V2 y MSI RTX 5060 Ti 16G Ventus 2X OC Plus.
- BioBioChile (2026-10-03): la memoria RAM está 6 veces más cara que hace un año.
- Reporte Minero (2026-06): precio del kWh en el Gran Santiago.
