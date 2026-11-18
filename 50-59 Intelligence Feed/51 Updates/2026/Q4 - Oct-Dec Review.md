---
owner: Eris
tier: Técnico
status: Activo
---

# 📊 Reporte Q4 — Octubre a Diciembre 2026 *(en curso)*

↑ [[50-59 Intelligence Feed/51 Updates/2026/Annual_2026_Report.md|Reporte Anual 2026]]

> **Cubre del 01-10 al 12-10.** Detalle día a día en el [[50-59 Intelligence Feed/52 Logs/log-2026-10-12.md|log del checkpoint]]. Actualizar al cerrar el trimestre.

## 📌 En una frase
**De app completa a app digerible, honesta y en manos de otros:** primera beta con personas reales, metas de salud con una sola fuente, y principios de producto escritos. App **1.20 → 1.36.0**.

## 🧩 Lo construido (01-10 al 12-10)
- **Finanzas:** libro único de movimientos, sueldo con "¿Llegó?", fijos y cuotas.
- **Calidad nutricional** según la hora de cada comida, y códigos de barras.
- **Velocidad:**
  - respuestas al instante por código;
  - las llamadas secundarias ya no recargan el modelo;
  - APK de 101 a 52 MB.
- **Eris y Hestia separadas**, con motor propio cada una. Hestia con identidad (ícono de núcleo brasa).
- **Salud (07-10):**
  - **glucosa apagada** hasta verificarla con el sistema de salud;
  - **metas del día con fuente única**, y el objetivo de Forge ajusta calorías y proteína;
  - notificaciones y avisos del día;
  - guardias anti-invento.
- **Comida y voz (09-10):**
  - si no encuentra un alimento, no lo anota;
  - buscador estándar;
  - dictado con contexto.
- **Agua y día (10-10):**
  - agua en una sola cuenta, incluida la de la comida;
  - insuficiencia cardíaca sin meta de agua;
  - **la hora de la comida decide la comida**;
  - trasnochadores;
  - **reloj interno**;
  - modos Eris · Hestia · AXS.
- **Plan "digerible" (10/11-10):** Inicio simple, bienvenida, tip diario, chat con ejemplos, nombres simples, Perfil en grupos, puntaje explicado y recorrido guiado.
- **Correcciones con testers (11-10):**
  - lo esperable se mide desde el despertar;
  - guardias de glucosa inventada y de tono alarmista;
  - registro por código ampliado;
  - bienvenida solo para cuentas nuevas.

## 🧩 Lo construido en noviembre (al 18-11)
- **Hestia en el teléfono:** la llamada de voz en tiempo real, la app aparte Hestia Manos (mensajes, llamadas, calendario, la palabra «Hestia», accesibilidad, su voz como llave) y «Hestia como JARVIS» (L0–L6).
- **App 1.91 → 1.105.0** y 861 pruebas automáticas. Falta probar lo de Hestia en el teléfono.
- Checkpoint en el log del 18-11 (Índice del Feed).

## ⚖️ Decisiones del trimestre
- [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-07-eris-cuida-no-trata.md|Eris cuida, no trata]]
- [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-11-pc-dedicado-para-eris.md|PC dedicado para Eris]]
- [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-11-reloj-biologico-y-foco-diferidos.md|Reloj biológico y foco, para después]]
- [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-12-preciso-por-dentro-simple-por-fuera.md|Preciso por dentro, simple por fuera]]
- [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-12-la-ia-conecta-el-codigo-decide.md|La IA conecta, el código decide]]

## 🧪 Beta
- **1 tester activo** (el primer tester) y **2 personas más** que quieren probarla "porque les gusta la idea".
- Lo que enseñó en su primer día:
  - una espera de 7 minutos (la tarjeta de video al límite);
  - "carne roja" anotada como chili enlatado;
  - la bienvenida repetida.
  - Las tres cosas se corrigieron en la 1.36.0.

## 🩹 Incidentes
- **Pérdida de 17 días del historial diario** (10-10): ahora la escritura es atómica y hay relleno desde Health Connect.
- **Glucosa de 248 mg/dL inventada** con el módulo apagado (11-10): ahora hay una guardia.
- **Al revisar la bóveda** (12-10): el perfil y los registros del día **no estaban cifrados**, aunque la documentación decía lo contrario. Quedó como pendiente de seguridad. **Resuelto el 15-10:** todo va cifrado, incluidos los respaldos (89 archivos migrados con verificación, sin pérdida).

## 🗂️ Bóveda
- **Checkpoint** del 18-09 al 12-10.
- **Reorganización en jerarquía:** mapas por área, 5 subcarpetas técnicas y 7 runbooks.
- **Revisión completa:** datos viejos, codificación rota y etiquetas sueltas consolidadas.

## ⏭️ Para lo que queda del trimestre
- [ ] Prueba con personas (paso 6) y mensaje para testers.
- [ ] Cuenta propia de Tailscale para la beta.
- [ ] Cifrar el perfil y los registros del día, y respaldar `server_secret`.
- [ ] Resguardos de "preciso por dentro" (modo sin números, señales de alerta, etiquetas sin juicio).
- [ ] Un profesional de salud que revise la beta.
- [ ] Precios con Brian y un contador.
- [ ] Ahorro para el servidor dedicado (~6 meses con $150.000 al mes).
