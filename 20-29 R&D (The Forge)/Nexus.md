---
owner: Eris
tier: Técnico
status: Activo
---

# 🛸 Nexus (RFC: Command Center)
#AXS/Producto #AXS/Hub

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]]

## 🎯 Misión
Visualizar el estado total del ecosistema AXS en una interfaz centralizada. Es el "cockpit" de Ikaros.

## 📊 Widgets Principales
- **Executive Score:** Puntuación global del estado (físico y mental).
- **Alerts:** Alertas de anomalías críticas (provenientes de Valkyria, GhostLine, Nyx).
- **Uptime:** Disponibilidad de los servicios locales y túneles.
- **Memory Health:** Estado de compresión y uso de la base de conocimiento.
- **Integrations:** Estado de Aether (sincronizaciones activas/fallidas).

## 🖥️ Vistas
- **Daily:** Visión ejecutiva del día actual.
- **Weekly:** Tendencias de recuperación y productividad.
- **System:** Diagnóstico técnico (logs, túneles, uso de VRAM).
- **Security:** Intentos de acceso, estado Zero-Knowledge.

## 👤 Usuarios
Diseñado exclusivamente para el usuario soberano (**Ikaros**).

## 💻 Estado Actual
> **Status:** Parcial — Sovereign Dashboard activo, sin todos los widgets del concepto final.

El **Sovereign Dashboard** en `C:\Proyectos\eris\web\` (Vanilla JS + CSS, servido por `server.ts`) cumple actualmente la función de Nexus para el perfil Ikaros/Hestia. Los widgets de Executive Score, Memory Health e Integrations del concepto completo son trabajo futuro.
