---
owner: Eris
tier: Operativo
status: Activo
---

# 🥗 Regenerar la Base de Alimentos

#AXS/Salud

↑ [[40-49 Standards & SOPs/41 Runbooks/41 - Runbooks.md|Runbooks]] · Módulo: [[20-29 R&D (The Forge)/22 Módulos de la App/Valkyria.md|Valkyria]]

La base chilena genérica (`src/data/chilean-foods.json`) **no se edita a mano**. Se genera desde una especificación con datos del USDA y escribe dos copias: la del servidor y la de la app.

## 🪜 Paso a paso
1. **Editar la especificación:** `eris/scripts/food_db_spec.ts`.
   - Alimento nuevo → `NEW_FOODS`: nombre, alias, grupo, descripción USDA y porciones.
   - Alias a un alimento ya existente → en su entrada de `NEW_FOODS`. `ALIAS_ADDS` solo se aplica a las entradas que tienen `ENRICH`.
   - Un alimento que el catálogo del asesor ya tiene **debe** usar `cl:<id del catálogo>` y el mismo nombre (`CATALOG_SAME`). Si no, el registro por chat empata entre los dos y no anota nada.
2. **Simular:** `bun --env-file=.env scripts/build_food_db.ts --dry`. Muestra qué alimento del USDA eligió para cada descripción. Revisar los "⚠️" y las coincidencias dudosas.
3. **Generar:** el mismo comando sin `--dry`. Escribe `eris/src/data/chilean-foods.json`, `eris-mobile/src/data/chilean-foods.json` y `eris/src/data/food_catalog.json`.
4. **Reiniciar el backend:** el servidor guarda una copia de la base en memoria y, si no se reinicia, la pisa.
5. **Probar:** registrar por chat el alimento nuevo, y correr las pruebas del registro.
6. **Nueva APK** si la app debe ver el cambio en su buscador ([[40-49 Standards & SOPs/41 Runbooks/Publicar una Nueva APK.md|Publicar una Nueva APK]]).

## 📝 Notas
- Volver a correrlo **no reaplica** cambios de la especificación a lo que ya existe ("ya existe, se omite").
- Las respuestas del USDA quedan en caché en `scripts/data/usda_cache.json`, así que no se repiten consultas. La búsqueda del USDA por GET a veces responde 400; el script usa POST y funciona.
- **Envasados chilenos** (`packaged_cl.json`): bajar el volcado oficial de Open Food Facts → `python scripts/import_off_csv.py <csv.gz> <carpeta>` → `bun scripts/build_packaged.ts <carpeta>`.
  - **No rastrear la API de búsqueda de Open Food Facts:** bloquea la IP.
- Lo que el servidor aprende de USDA se guarda en la base local **solo si calza con todas las palabras** (2026-10-11).
