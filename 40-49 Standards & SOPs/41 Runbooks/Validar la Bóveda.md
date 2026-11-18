---
owner: Eris
tier: Operativo
status: Activo
---

# ✅ Validar la Bóveda

#AXS/TI

↑ [[40-49 Standards & SOPs/41 Runbooks/41 - Runbooks.md|Runbooks]]

Después de crear, mover o editar notas en cantidad.

## 🪜 Paso a paso
1. **Correr el revisor:**
   ```bash
   cd C:\Proyectos\eris
   bun scripts/vault_check.ts
   ```
   - Usa el mismo linter que Hestia (`vault_audit`) y además busca enlaces rotos y notas huérfanas.
   - Debe terminar en **"🟢 Bóveda en orden."**
   - Las únicas huérfanas aceptadas son `CLAUDE.md` y `MEMORY.md`.
2. **Si moviste o renombraste notas:** los enlaces llevan la ruta completa, así que hay que reescribir todos los entrantes **en la misma pasada**, con un script de reemplazo y no a mano. Después, volver al paso 1.
3. **Si agregaste una nota:** que cuelgue de su **mapa** (la nota "2X - …" de su carpeta) y que el mapa la enlace. Los logs y las decisiones van en el Índice del Feed.

## 🧭 Orden de la bóveda (reglas del 2026-10-12)
- **Jerarquía, no malla.** Dashboard → mapas por rango (10, 20, 30, 40, 50) → mapas por área → notas.
- Cada nota enlaza hacia arriba a su mapa, y solo a lo demás que de verdad aporte. Nada de "Relacionado:" de relleno.
- Los documentos de estado (Estado Actual, changelog, roadmap, logs) **nombran** los módulos y enlazan a su mapa, no a cada nota.
- Las reglas completas están en `CLAUDE.md`, en la raíz de la bóveda.
