---
owner: Eris
tier: Estratégico
status: Activo
---

# 📈 Simulación del Negocio

↑ [[30-39 GTM & Business Operations/Finanzas/Finanzas.md|Finanzas del negocio]]

#AXS/Finanzas #AXS/Comercial

## 🎯 Para qué
Saber cuánta plata entra, cuánta sale y cuánto queda para sueldos en Eris y en AXS, mes a mes, con lo más real que hay hoy. Sale de una pregunta del fundador (2026-11-11): cómo simular gastos e ingresos «lo más real posible». Como no hay sueldos definidos, el sueldo es un resultado: lo que el negocio puede pagar en cada escenario.

- **Página:** https://claude.ai/artifact/X8pK4nWYK41MnM36nHuW7F (privada).
- **Modelo:** `eris/scripts/simulacion/modelo.js`; página, `eris/scripts/simulacion/pagina.html`; pruebas, `eris/tests/simulacion.test.ts`.

## ⚙️ Cómo funciona
1. **Gente:** instalaciones al mes (con crecimiento) → una parte paga → cada mes una parte renueva.
2. **Plata que entra:** al precio se le resta el IVA y, sobre lo que queda, la comisión de la tienda.
3. **Plata que sale:** PC propios según la hora punta, luz, internet, contador, puesta en marcha, publicidad, sueldos (si se activan) e impuesto a la utilidad.
4. **Lo incierto:** va como rango. El modelo se corre 600 veces con valores al azar dentro de cada rango y muestra dónde cae el resultado en 8 de cada 10 corridas.
5. **Qué mueve más:** cada supuesto se lleva a su valor bajo y alto con el resto en la base.

## 🧾 Decisiones del fundador (2026-11-11)
- **Precios (actualizado el 2026-11-14):** lo esencial gratis; Forge, Finanzas e Inventario a $1.990 al mes cada uno; Eris completo a $4.990 al mes o $34.990 al año. Ver [[30-39 GTM & Business Operations/Comercial/Precios de Eris.md|Precios de Eris]]. Antes: módulo $1.490, completo $3.990 y anual $39.990 (2026-11-11), y todo gratis con Eris+ por comodidad (2026-11-12).
- **Sueldos:** hoy no hay.
- **Equipo:** propio, sin nube.
- **Mercado:** Chile y bienestar general primero. La etapa con condiciones médicas necesita aprobaciones legales y médicas, y no está en la simulación.

## 📏 Medido con datos reales (2026-11-11)
Conversaciones del fundador del 3 de septiembre al 7 de noviembre de 2026 y registro de Ollama:
- 235 mensajes en 66 días; 3,0 al día en los últimos 30 días. Chatea 35 de cada 66 días.
- 43 de 62 respuestas con traza pasaron por el modelo (69 %). Es menos de lo que se suponía: en el banco de pruebas la mayoría la responde el código.
- La hora más cargada concentra el 13 % del día.
- En el notebook, cada respuesta del modelo tardó 48 s de mediana (p90, 107 s) y cada llamada a Ollama, 14 s (1.210 llamadas).
- Es una sola persona, y es quien desarrolla la app: sirve como punto de partida, no como promedio de usuarios.

## 📚 Referencias
| Supuesto | Valor base | Rango | Fuente |
| --- | --- | --- | --- |
| De instalación a pago | 2,0 % | 1,0–5,0 % | RevenueCat 2026: 1,5 % en Latinoamérica, 2,1 % con versión gratis; 2,9 % en salud y deporte (citado por Sahha) |
| Renuevan el segundo mes | 57 % | 46–68 % | RevenueCat 2026, salud y deporte (leído en la fuente) |
| Renuevan el plan anual | 25 % | 16–37 % | RevenueCat 2026, salud y deporte (leído en la fuente) |
| IVA | 19 % | — | Ayuda de Play Console: quien reside en Chile lo cobra y lo entera |
| Comisión | 15 % | — | Google Play, suscripciones; se calcula sobre el precio sin IVA |
| Costo por instalación | US$ 0,80 | 0,34–2,00 | Blogs de proveedores, Latinoamérica; sin cifra de Chile |
| PC | $850.000 | $830.000–$1.360.000 | Plan de compra del servidor |
| Luz | $236 el kWh | — | Plan de compra del servidor |
| Impuesto a la utilidad | 12,5 %, 15 %, 25 % | — | Pro Pyme 2027 y 2028; desde 2029 las fuentes no coinciden (23 % o 25 %) |
| Contador | $90.000 al mes | — | Blogs: $70.000–$150.000 |

## ⚠️ Estimaciones propias (sin respaldo)
- Instalaciones del primer mes (300) y su crecimiento (6 % al mes).
- Mezcla de planes (2026-11-14): 30 % un módulo suelto (1,2 módulos por persona) y, de los demás, la mitad elige el anual (35 % de todos). La referencia de salud y deporte es 68 % anual (RevenueCat 2026, todo el mundo).
- Renovaciones mensuales siguientes (85 %) y anuales siguientes (60 %).
- Segundos del PC por respuesta en el equipo de 12 GB (15 s): se mide al mudar Eris.
- Parte de quienes instalan que usa el chat gratis (25 %).
- Puesta en marcha ($600.000): marca, textos legales y cuenta de Google Play. Hay que cotizar.
- Costo de un sueldo para la empresa: 1,31 veces el líquido. Afinar con un contador.

## 🔎 Lo que muestra el caso base (36 meses)
**Desde el 2026-11-14, núcleo gratis y módulos de pago.** Paga 2 % de quienes instalan (30 % un módulo de $1.990, el resto Eris completo a $4.990 o $34.990) y el chat gratis tiene un tope de 30 al día:
- hay que poner $2,7 M (entre $2,3 M y $4,5 M);
- la operación se paga sola el mes 12, y antes del mes 24 en 98 % de las corridas;
- al mes 36: 278 suscriptores (entre 187 y 1.724) y $541 mil al mes para sueldos (la mitad de las corridas, sobre $1,4 M);
- un sueldo de $1 M alcanza en 52 % de las corridas.

Con todo gratis y Eris+ por comodidad (2026-11-12, 1,5 % que paga) eran $2,7 M, el mes 13 y $505 mil. Los módulos empatan con eso si paga 1,9 %. La primera versión del 2026-11-12 (3 consultas gratis al día y módulos) daba $2,4 M, el mes 8 y $734 mil.

El simulador suma la elasticidad (cuánto baja la conversión si sube el precio; 0,6 estimado, a $4.990 de referencia) y una tabla «¿Qué precio?» que compara cuatro opciones.

Cifras anteriores (2026-11-11 en la noche, con $3.990 y $39.990), ya con la gente que no paga y sigue usando el chat mes a mes:
- **Hay que poner:** cerca de $2,8 M antes de que la caja deje de bajar (entre $2,0 M y $4,3 M).
- **Se paga sola** (operación, sin sueldos): mes 14. En 97 % de las corridas, antes del mes 24.
- **Suscriptores al mes 36:** 247 (entre 215 y 1.647; la mitad de las corridas termina sobre 593).
- **Queda para sueldos al mes 36:** $474.000 al mes, promedio de los últimos tres meses (entre $380.000 y $4,4 M; la mitad de las corridas, sobre $1,4 M).
- **Un sueldo de $1.000.000 líquido** le cuesta a la empresa cerca de $1.310.000. Junto con los costos fijos pide unos 605 suscriptores, y al mes 36 alcanza en la mitad de las corridas.
- **El plan anual pesa mucho:** una persona en el anual deja cerca de $46.400 en su vida y una en el mensual, cerca de $13.700. Con 60 % en el anual en vez de 25 %, se paga sola el mes 7 en vez del 14 y quedan $813.000 al mes para sueldos en vez de $473.000. El rango llega hasta el 68 % de salud y deporte (RevenueCat 2026); la base queda en 25 % porque el anual de Eris ahorra solo 16 %.
- **El caso base es el lado cauto.** Usa el valor más probable de cada supuesto, y los rangos tienen más espacio hacia arriba que hacia abajo (instalaciones 100–300–1.000, pago 1–2–5 %). Por eso la mitad de las corridas termina cerca del doble. Esos rangos de instalaciones son estimación propia: es lo primero que la beta tiene que reemplazar.
- **De cada $3.990 llegan $2.850:** $637 son IVA y $503, comisión. Con 10.000 suscriptores son $28,5 M al mes, no los $39,9 M de la lámina de escenarios.
- **Un PC aguanta cerca de 445 personas.** Atender a cada suscriptor cuesta unos cientos de pesos al mes: el equipo no es el problema.
- **Lo que más pesa:** cuánta gente instala, cuánto crece eso y cuántos pagan. El equipo y la luz casi no mueven el resultado.
- **Publicidad:** con las referencias, cada persona que paga deja cerca de $20.500 y traerla costaría cerca de $39.000. No se paga sola.

## 💬 El chat para quien no paga (2026-11-11)
El modelo ahora cuenta a quien no paga mes a mes:
- prueba la app el primer mes (25 % de los que instalan);
- al mes sigue el 5 % (referencia de salud y deporte: entre 3,4 % en Android y 8,5 %);
- cada mes siguiente se queda el 80 % de esos (estimado);
- usa el modelo la mitad que el fundador (estimado).

Se comparan tres formas de dar el chat: todo gratis, gratis el código más unas respuestas del modelo al día, o gratis solo el código. En corto:
- Una persona activa que no paga cuesta unos $45 al mes de PC.
- Dar todo el chat gratis cuesta 1 suscriptor en el caso base y 66 de 2.444 con 50.000 instalaciones el primer año.
- El tope protege de quien usa muchísimo, pero no baja el promedio.

Detalle y recomendación: [[30-39 GTM & Business Operations/Comercial/Camino al Lanzamiento.md|Camino al Lanzamiento]]. Los números reales saldrán de la [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/Medición de la Beta.md|Medición de la Beta]] (`bun scripts/beta/informe.ts --json` trae los parámetros con los mismos nombres del simulador).

## 🧭 Pendiente
- Reemplazar los rangos por datos de la beta: instalaciones, quiénes pagan y quiénes renuevan.
- Medir los segundos por respuesta en el PC de 12 GB.
- Cotizar la puesta en marcha, incluida la ley de datos personales (21.719): rige desde el 1 de diciembre de 2026, con un proyecto en trámite para postergarla a 2027.
- Decidir qué es gratis: de eso depende cuántos usan el chat sin pagar. Con 50.000 instalaciones en un año, el chat gratis es la mitad de los PC (6 con chat gratis, 3 sin él).
- Medir la beta desde el servidor (solo conteos por perfil, sin contenido): activación del primer día, vuelta al día 7 y al 30, días con registro por semana y quiénes pagan. Esos datos reemplazan los rangos y van a la lámina de cohorte para inversionistas.
- Corregir la lámina de escenarios y el precio anual en las presentaciones.
