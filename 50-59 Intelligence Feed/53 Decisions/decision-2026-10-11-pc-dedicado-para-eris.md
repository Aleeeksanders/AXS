---
owner: Eris
tier: Directivo
status: Activo
date: 2026-10-11
project: AXS — Infraestructura
type: Decisión Ejecutiva
---

# 💎 Cristalización de Decisión — 2026-10-11

#AXS/Infraestructura #AXS/Hardware

## ✅ Acuerdo
**Eris tendrá un PC propio**, separado del notebook del fundador. Se descartó un "modo juego" que bajara a Eris al procesador mientras se juega.

Se ahorra para comprarlo con una meta de **~$850.000**: PC base con 16 GB de RAM y una **RTX 3060 de 12 GB**. La opción holgada para la beta es una RTX 5060 Ti de 16 GB, por ~$1,33 M. Plan completo: [[30-39 GTM & Business Operations/Finanzas/Servidor Eris — Plan de Compra.md|Servidor Eris — Plan de Compra]].

## 📋 Contexto
- Hoy todo corre en un notebook con una **RTX 3050 de 6 GB**: el modelo `qwen3.5:4b` con su contexto, el dictado y la voz.
- El modelo ocupa **6,3 a 6,9 GB** y queda repartido entre la tarjeta de video y el procesador. Con otras apps abiertas llegó a quedar solo **24 de 33 capas en la GPU** (51 %).
- El 2026-10-11 un tester esperó **7 minutos** y detuvo una respuesta que nunca llegó.
- Además, el modelo retenido en la tarjeta (30 min) le quita memoria de video a los juegos. Así el fundador no puede jugar sin afectar a los testers.
- Su postura: "no necesito quedarme sin note por esto".

## 🔧 Qué cambia
- Con 12 GB, el modelo, el dictado y los servicios caben enteros en la tarjeta: respuestas varias veces más rápidas.
- Encendido 24/7 gastaría ~36 a 43 kWh al mes (**~$9.000 a $10.000 de luz** al promedio de Santiago).
- Mientras tanto, cada mensaje que se resuelve por código (comida, agua, consultas del día, síntomas) deja de depender de la tarjeta.

Relacionado: [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/TI.md|TI]]
