---
owner: Eris
tier: Operativo
status: Activo
---

# 🧪 Probar con un Servidor Aislado

#AXS/TI

↑ [[40-49 Standards & SOPs/41 Runbooks/41 - Runbooks.md|Runbooks]]

Sirve para probar cambios del backend **sin tocar los datos reales** ni el servidor de producción.

## 🪜 Cómo
- **Datos aparte:** `USERPROFILE=<carpeta temporal>`. Eso hace que `~/.eris` (perfiles, cuentas, secretos) quede en esa carpeta.
- **Otro puerto:** `ERIS_PORT=3100`. Corre en paralelo al servidor real del 3000.
- **Cuentas de prueba:** se crean con `AccountStore.createSession` (por ejemplo, un perfil "ikaros" y otro "ana") y se habla por WebSocket con ese token.
- **Paridad:** `ERIS_QUICK_REPLY=0` hace que todo pase por el modelo, para comparar con las respuestas por código.

## ⏰ Pruebas que dependen de la hora
- `bun test` corre en **UTC**. Las pruebas que usan el día o la hora de Chile se corren con `TZ=America/Santiago`, o arman las claves con `nutritionDayKey`.
- Si no, fallan después de las 21:00 de Chile.

## 🔒 Leer datos reales (solo cuando hace falta)
- Siempre con el **id explícito del perfil** (el del fundador está en `roles.json`), usando `FileSystemAdapter` + `AccountStore.derivePin`. **Nunca "la sesión más reciente".**
- Leer lo mínimo necesario. Todo va cifrado (conversaciones, perfil y registros del día), así que se lee con `get`/`getProfile` del adaptador, nunca abriendo los `.json` a mano.
