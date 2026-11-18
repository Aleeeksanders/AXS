---
owner: Eris
tier: Técnico
status: Activo
estado: Construido
---

# 🌐 Aether (RFC: Connectivity & Sync Layer)

↑ [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/23 - Plataforma e Infraestructura.md|Plataforma e Infraestructura]]
#AXS/Producto

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[10-19 Strategic Vision/11 Visión de Producto/AXS.Link.md|AXS.Link]]

## 🎯 Misión
Capa de conectividad y sincronización del ecosistema. Gestiona el túnel seguro entre dispositivos y el servidor soberano.

## 🔒 Tecnologías
- **Tailscale**: VPN Zero-Trust para acceso remoto seguro.
- **Cloudflared**: Túnel HTTP/S hacia el servidor local.
- **WebSocket**: Streaming bidireccional Token-a-Token.

## ⚙️ Función Core
Garantizar que todos los dispositivos del ecosistema (móvil, wearables, web) mantengan comunicación cifrada de extremo a extremo con el servidor Eris.

## 💻 Estado Actual
> **Status:** Activo — Implementado como infraestructura de red, no como módulo de código.

| Tecnología    | Rol                                              | Ubicación          |
|---------------|--------------------------------------------------|---------|
| **Tailscale** | VPN Zero-Trust para acceso remoto desde el móvil | Configuración OS |
| **Cloudflared** | Túnel HTTP/S hacia el servidor local           | `C:\Proyectos\cloudflared.exe` + `config.yml` |
| **WebSocket** | Canal de streaming bidireccional Token-a-Token   | `server.ts` en Eris Core |
