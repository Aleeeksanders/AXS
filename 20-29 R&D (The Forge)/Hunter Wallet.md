---
owner: Eris
tier: Técnico
status: Activo
---

# 💰 Hunter Wallet (RFC: Personal Finance Module)
#AXS/Producto #AXS/Finanzas

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[20-29 R&D (The Forge)/Toji.md|Toji]], [[20-29 R&D (The Forge)/Eris.Core.md|Eris.Core]]

## 🎯 Misión
Finanzas personales gamificadas dentro de `eris-mobile` (pestaña **Finanzas**). Clasifica al usuario en un **rango Hunter** según sueldo líquido y ahorro, y le da un chat de asesoría con Eris.

> ⚠️ Es el módulo de finanzas **personales del usuario** (app), distinto de [[30-39 GTM & Business Operations/Finanzas/Finanzas.md|Finanzas]] (contabilidad del negocio AXS).

## 🧩 Componentes
- **Sistema de tiers (F → SS):** escala de sueldo y ahorro calibrada a barreras reales del mercado **chileno 2026** (sueldo **líquido**, no bruto), en múltiplos del salario mínimo (~$510.000).
  - Tier elite **SS** para sueldos > ~$5.1M (10× SM).
  - **Rango Hunter** = combinación ponderada: `si·0.35 + vi·0.65` (el ahorro pesa 65 %).
- **Consultar Eris (nativo):** panel de chat deslizante idéntico al de [[20-29 R&D (The Forge)/Toji.md|Toji]] (botón flotante + streaming por WebSocket + "Ir a Eris →"), con el contexto financiero inyectado.

## 🏗️ Arquitectura
- **UI:** WebView que carga `eris-mobile/assets/hunter-wallet.html`, hecha con **Preact + htm** (≈4 KB, sin transpilación runtime) → liviana por diseño.
- **Estado:** `localStorage` del WebView + `postMessage` (`hw_context`) al layer nativo, que lo reenvía al backend como contexto financiero.

## 💻 Implementación Actual
> **Rutas:** `C:\Proyectos\eris-mobile\`

| Responsabilidad | Archivo |
|---|---|
| UI del módulo (WebView, Preact+htm) | `assets/hunter-wallet.html` |
| Pantalla nativa host + panel "Consultar Eris" | `src/screens/HunterWalletScreen.tsx` |
| Transición de portal | `src/components/PortalOverlay.tsx` |
