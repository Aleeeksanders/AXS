---
owner: Eris
tier: Técnico
status: Activo
---

# ⌚ AXS — GhostWatch (Smartwatch HUD)
#AXS/Producto

## Identidad
Primer wearable AXS. Un HUD minimalista que conecta lo físico y lo digital.

## Objetivos
- Prototipo básico en 30 días (ESP32).  
- Enviar notas rápidas a [[00-09 Management & Governance/Inbox|Inbox]] vía botón físico.  
- Dar feedback silencioso mediante vibración.  

## Avances
- Código base ESP32 iniciado.  
- Diseño inicial de interfaz definido.  
- Pendiente → pruebas de batería y red.  

## Ideas
- Integrar notificaciones de AXS-Dashboard.  
- HUD con vibración lateral según prioridades.  
- **Display de glucosa en tiempo real** desde [[20-29 R&D (The Forge)/GlucoTrack.md]] → mostrar valor actual, tendencia (↑↓→) y color de alerta directamente en el watch face.  
- Vibración de alerta si glucosa sale de rango (< 70 o > 180 mg/dL).  

## Referencias
- [[20-29 R&D (The Forge)/ZeroPoint.md]]
- [[30-39 GTM & Business Operations/Comercial/Comercial.md]]
- [[20-29 R&D (The Forge)/GhostRing v0.1.md]]
- [[20-29 R&D (The Forge)/GlucoTrack.md]]
- [[40-49 Standards & SOPs/Protocolo AXS — Detección HRV HR.md|Protocolo HRV/HR — Detección de Riesgo]]
