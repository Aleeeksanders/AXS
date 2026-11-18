---
owner: Eris
tier: Técnico
status: Activo
estado: Construido
---

# 📊 Medición de la Beta (RFC: Beta Usage Metrics)

↑ [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/23 - Plataforma e Infraestructura.md|Plataforma e Infraestructura]]

#AXS/Infraestructura #AXS/Comercial

Alimenta: [[30-39 GTM & Business Operations/Finanzas/Simulación del Negocio.md|Simulación del Negocio]] · [[30-39 GTM & Business Operations/Comercial/Camino al Lanzamiento.md|Camino al Lanzamiento]]

## 🎯 Misión
Saber con datos de Eris, y no de otras apps, si la gente se activa, si vuelve, qué usa, si paga y cuánto PC ocupa cada persona. Reemplaza los rangos del simulador y arma la lámina de cohorte para inversionistas. Construida el 2026-11-11 (servidor y app 1.90.0).

## 📏 Qué cuenta (y qué no)
Por persona y por día, **solo números**:
- **Uso:** inicios de sesión y «acciones» (mensajes, anotar agua, buscar un alimento, tocar «Lo comí ✓», anotar sueño…). Las sincronizaciones automáticas no cuentan como acción.
- **Chat:** mensajes, cuántos por voz, cuántos pasaron por el modelo (al menos una llamada) y el tiempo de respuesta por tramos.
- **PC:** segundos de trabajo del modelo según Ollama (`total_duration`), separados en chat, voz y tareas laterales; la espera en cola; Whisper y Piper; y en qué hora del día (hora punta).
- **Registros:** cuántos alimentos tiene el día, cuánta agua, si hubo sueño o entreno, y si se usó Finanzas, Inventario, suplementos, Forge o el plan de Eris.

**Nunca:** lo que escribe, come, gasta ni nada de su salud. Tampoco el perfil ni el correo: cada persona va con un alias (HMAC del perfil con la llave del servidor).

## 🔐 Privacidad
- **Perfil → «Ayudar a mejorar Eris»** (encendido por defecto): al apagarlo se deja de contar y se borra lo contado.
- La preferencia vive en el registro de la medición, fuera del perfil cifrado: la medición nunca abre el perfil.
- **Pendiente legal:** declararlo en la política de privacidad y en los términos de la beta. Lo de «encendido por defecto» lo tiene que confirmar un abogado con la Ley 21.719.

## 📈 Cómo se lee
- **Activada:** en sus primeras 48 horas anotó algo (comida, agua, sueño o entreno) e hizo al menos 3 cosas en la app.
- **Vuelve:** activa el día 1, 7 o 30 desde su alta (y la 2.ª o 5.ª semana, más estable con pocas personas).
- **No cuentan en las cohortes:** el rol Ikaros y quien el administrador marque como «Equipo». Su uso del PC sí se cuenta.
- **Pagan:** mientras no haya cobro en la app, el administrador marca a quién paga en el panel. La conversión se mide a los 35 días, igual que la referencia de RevenueCat.
- **Muestra chica:** con menos de 20 personas, el informe lo advierte.

## 🧭 Dónde se ve
- **App → Panel de administración → Beta:** activación, vuelta al día 7 y 30, conversión, cohortes por semana, días con registro, chat y PC.
- **Terminal:** `bun scripts/beta/informe.ts` (o `--json`; trae los parámetros del simulador con sus mismos nombres).

## 💻 Implementación Actual
| Responsabilidad | Archivo |
| --- | --- |
| Conteos por día, alias, preferencia y grupos | `eris/src/services/BetaMetrics.ts` |
| Informe de cohortes, chat y PC | `eris/src/services/BetaReport.ts` |
| Trabajo del modelo por persona | `eris/src/services/llm/ModelMeter.ts` + `OllamaProvider.ts` |
| Conexión con cada mensaje | `eris/src/server.ts` |
| Informe en la terminal | `eris/scripts/beta/informe.ts` |
| Prueba de punta a punta | `eris/scripts/beta/beta_e2e.ts` |
| Pruebas | `eris/tests/beta_metrics.test.ts` |
| Panel (pestaña Beta, grupos) | `eris-mobile/src/screens/AdminPanel.tsx` |
| Interruptor en Perfil | `eris-mobile/src/screens/ProfileScreen.tsx` |

Archivos de datos: `~/.eris/metricas/perfiles.json` y `uso-AAAA-MM.json`. Se guardan cada 20 s; si el proceso se corta de golpe, se pierden a lo más esos segundos.

## ⚠️ Pendiente
- Probar con el modelo encendido que los segundos por respuesta se midan bien. La prueba de punta a punta pasó con el modelo apagado.
- Medir el PC de 12 GB con esto apenas llegue: reemplaza los 15 s por respuesta estimados.
