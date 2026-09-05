# CLAUDE.md — Reglas del Vault AXS

Bóveda Obsidian de **AXS** (Artificial eXperience System) en `C:\Proyectos\AXS\`.
Es la memoria de largo plazo del ecosistema: la leen el humano (Alexander/AXS), **Eris** vía `knowledge_search`/`vault_audit`, y agentes de Claude Code.

Estructura **Johnny Decimal**. Idioma de contenido: **español**.

---

## 🔴 Reglas duras (romperlas rompe el vault)

### 1. Wikilinks SIEMPRE con ruta completa desde la raíz
El vault **no usa** enlaces simples. Verificado: 226 enlaces con ruta, **0** enlaces `[[Nota]]` sueltos.

```markdown
✅ [[20-29 R&D (The Forge)/Toji.md|Toji]]
✅ [[00-09 Management & Governance/Inbox|Inbox]]
❌ [[Toji]]          ← NUNCA. Rompe la convención y la resolución de Eris.
```

Estilo preferido para notas nuevas: **`[[ruta/Nota.md|Alias]]`** (ruta completa + alias legible).

### 2. Mover o renombrar exige reescribir los enlaces entrantes
Como los enlaces llevan **ruta completa**, mover un archivo **rompe todos sus enlaces entrantes**.
Nunca muevas/renombres una nota sin, en la **misma operación**:
1. Buscar todos los enlaces entrantes (`grep -rn "NombreNota" --include="*.md"`).
2. Reescribir cada ruta.
3. Verificar que no quedan enlaces rotos.

### 3. Toda afirmación técnica se verifica contra el código antes de escribirla
El vault ya sufrió deriva grave: documentaba modelos LLM inexistentes (`qwen3:8b`) y "cifrado AES en Obsidian" que no existía. **No escribas de memoria ni por inercia narrativa.**
- Rutas de código, nombres de archivo, modelos y algoritmos → confírmalos en `C:\Proyectos\eris\` o `C:\Proyectos\eris-mobile\`.
- Si no puedes verificar algo, márcalo explícitamente como *planeado* / *concepto*, no como hecho.

### 4. Frontmatter obligatorio en toda nota nueva
```yaml
---
owner: Eris
tier: Directivo | Técnico | Operativo | Estratégico
status: Activo | Concepto | Planificado | Histórico
---
```
`tier: Por clasificar` existe en 2 notas legadas — **no lo uses** en notas nuevas.
`status: Histórico` marca versiones superadas que se conservan como registro (ej. `TSN_v0.5.0_preprint.md`).

---

## 🗂️ Dónde va cada cosa

| Rango | Contenido |
|---|---|
| `00-09 Management & Governance` | Gobernanza: manifiesto, identidades, mapas, dashboard, changelog, roadmaps, Inbox. Los docs canónicos van numerados `00.NN - Título`. |
| `10-19 Strategic Vision` | Visión de largo plazo, TSN, ICA. |
| `20-29 R&D (The Forge)` | **Toda documentación técnica**: módulos, RFCs, arquitectura de subsistemas, prototipos. |
| `30-39 GTM & Business Operations` | Negocio: Comercial, Marketing, Finanzas (del negocio), Administración. |
| `40-49 Standards & SOPs` | Procedimientos, protocolos, blueprints. |
| `50-59 Intelligence Feed` | Salida generada: `51 Updates` (reportes Q/anuales), `52 Logs` (logs diarios), `53 Decisions` (cristalizaciones del Protocolo Antigravity). |
| `90-99 Archivo` | Histórico. |

**Notas de módulo** (en 20-29) siguen esta plantilla:
frontmatter → `# emoji Nombre (RFC: Descriptor en inglés)` → tags → enlace al Panteón + relacionados → `## 🎯 Misión` → componentes/arquitectura → **`## 💻 Implementación Actual`** con tabla `Responsabilidad | Archivo` de **rutas reales**.

---

## 🏷️ Nomenclatura

- **Notas:** `Título en Español Con Espacios.md`. Sin snake_case, sin kebab-case.
  - Excepción legada: `TSN_v0.5.0_preprint.md`.
- **Docs canónicos de gobernanza:** `00.NN - Título`.
- **Logs:** `log-YYYY-MM-DD.md` · **Notas diarias:** `YYYY-MM-DD.md` (raíz del vault).
- **Decisiones:** `decision-YYYY-MM-DD-<slug-descriptivo>.md`.
  ⚠️ La legada `decision-2026-05-04-1777920680731.md` usa timestamp Unix — **no repetir ese patrón**.
- Nombres de archivo **únicos en todo el vault** (los duplicados rompen enlaces).

### Tags — vocabulario controlado
Formato `#AXS/<Área>`. Reutiliza los existentes antes de inventar:

`#AXS/Producto` `#AXS/Core` `#AXS/Salud` `#AXS/Finanzas` `#AXS/Comercial` `#AXS/Marketing` `#AXS/Administración` `#AXS/TI` `#AXS/Infraestructura` `#AXS/Seguridad` `#AXS/Hardware` `#AXS/TSN` `#AXS/Dashboard` `#AXS/Roadmap`

Con acento cuando corresponde (`#AXS/Administración`). No crees variantes nuevas de un área que ya existe.

Existen además singletons fragmentados de un solo uso — `#AXS/ID` `#AXS/Hub` `#AXS/Daily` `#AXS/Mente` `#AXS/Doctrina` `#AXS/Logica` (sin acento) `#AXS/Red` — pendientes de consolidar en las áreas de arriba. **No los propagues.**

---

## ✍️ Estilo de contenido

- Encabezados con emoji: `## 🎯 Misión`, `## ⚙️ Responsabilidades`, `## 💻 Implementación Actual`.
- Tablas para mapear responsabilidad → archivo real.
- **Marcadores de estado real** en notas de arquitectura (usados en el Panteón): 🟢 construido · 🟡 parcial · ⚪ concepto/planeado. Mantén la distinción entre lo que **corre** y lo que es **visión** — buena parte del Panteón es aspiracional.
- Enlaza generosamente, pero **siempre con ruta completa**.

---

## ✅ Reestructuración de 2026-07-30 (ya aplicada — respetar)

- Los 5 docs técnicos (`Arquitectura y Core`, `Interfaz y Servidor WebSocket`, `Memoria y Compresión de Contexto`, `Query Engine`, `Sistema de Herramientas`) **ya se movieron** de `00-09` a `20-29`. No los devuelvas.
- `53 Decisions` **ya se movió** a `50-59 Intelligence Feed`. La ruta está hardcodeada en `eris/src/tools/CrystallizeTool.ts` — **si mueves esa carpeta otra vez, actualiza el código también**.
- `06 - Archivo` → renombrada a **`90-99 Archivo`**.
- Cluster TSN **ya conectado** al núcleo (entrantes desde Dashboard, Panteón y Lander).
- Preprint TSN: **v0.6.0 (PDF) es el vigente**; el `.md` v0.5.0 quedó como `status: Histórico`.

- Índice del feed creado: **[[50-59 Intelligence Feed/50 - Índice del Feed.md|50 - Índice del Feed]]**. Al generar un log, decisión o reporte nuevo, **enlázalo ahí** (así no vuelven a quedar huérfanos).

## ⚠️ Anomalías pendientes (NO imitar)

1. **Subcarpeta sin numerar:** `00-09 .../Entrenamiento y Evolución/`.
2. **Tags fragmentados:** 7 singletons pendientes de consolidar (ver sección de tags).
3. **v0.6.0 solo en PDF:** Eris no puede buscar dentro del preprint vigente. Falta exportarlo a Markdown.
4. **Huérfanos aceptables:** solo `CLAUDE.md` (archivo de agente) y `MEMORY.md` (índice legible por máquina). Cualquier otro huérfano es un descuido.

## 🔗 Wikilinks dentro de tablas
Un `|` de alias rompe la tabla, y escaparlo (`\|`) puede confundir al parser de Eris.
**Prefiere listas** para enumerar enlaces, o usa el enlace sin alias dentro de la celda.

---

## 📌 Fuentes de verdad externas

- **Código Eris (backend):** `C:\Proyectos\eris\` — modelos LLM en `src/types/config.ts`, cifrado en `src/services/security/CryptoService.ts`.
- **App móvil:** `C:\Proyectos\eris-mobile\`.
- **TSN:** la versión viva (**v0.6.0**) está en una carpeta **fuera de este vault**. El `TSN_v0.5.0_preprint.md` de aquí **no es la última versión** — no lo cites como vigente sin confirmar.
- `MEMORY.md` (raíz) es el índice de memoria Layer 1 de Eris, no una nota narrativa.

---

## 🚫 No hacer

- No escribir `[[Nota]]` sin ruta.
- No mover/renombrar sin reescribir enlaces entrantes.
- No afirmar capacidades técnicas sin verificarlas en el código.
- No crear notas técnicas en `00-09` (van a `20-29`).
- No inventar tags nuevos si ya existe el área.
- No presentar como construido lo que es concepto.

> Este archivo es para agentes, no una nota del vault. Para ocultarlo en Obsidian:
> *Configuración → Archivos y enlaces → Archivos excluidos* → añadir `CLAUDE.md`.
