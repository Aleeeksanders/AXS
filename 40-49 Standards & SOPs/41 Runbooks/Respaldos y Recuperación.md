---
owner: Eris
tier: Operativo
status: Activo
---

# 💾 Respaldos y Recuperación

#AXS/Seguridad

↑ [[40-49 Standards & SOPs/41 Runbooks/41 - Runbooks.md|Runbooks]] · Seguridad: [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/Nyx.md|Nyx]]

## 🔴 Lo crítico
- **`~/.eris/server_secret`:** de aquí sale la clave de cada perfil ligado a Google. **Si se pierde, esos perfiles no se pueden abrir.** Respaldarlo fuera del PC y en un lugar seguro, porque es un secreto.
- **`~/.eris/profiles/<perfil>/`:** los datos de cada persona. Todo va cifrado desde el 2026-10-15: `conversations.json`, `profile.json` y `kv_*.json`.
  - Para abrir un perfil se necesitan **su `key.json` y `server_secret`**. Un respaldo de la carpeta del perfil sin `server_secret` no sirve.
  - Un respaldo de datos se cifra igual: `bun scripts/encrypt_at_rest.ts --aplicar` (con el backend detenido) cifra también lo que esté en `~/.eris/backups/`. Con `--sueltos=<perfil>` cifra los `kv_*` sueltos de esa carpeta con la llave de ese perfil.

## 📁 Qué hay en `~/.eris/`
- `accounts.json`, `sessions.json`: cuentas de Google y sesiones (el token se guarda como hash).
- `roles.json`: quién es `ikaros` (el administrador).
- `features.json`: los módulos con visto bueno. **Si no existe, todo está apagado** (la glucosa, por ejemplo).
- `audit/audit.jsonl`: la bitácora firmada (HMAC).
- `backups/`: respaldos puntuales, como el de antes de reparar el historial (2026-10-10).

## 🩹 Recuperar
- **Historial diario perdido:** el teléfono lo rellena una vez al día desde Health Connect (`backfill_rollup`), **solo en los huecos**, sin pisar lo existente. Lo de Finanzas y ánimo de días perdidos no se recupera.
- **Emergencia de acceso** (falla el login con Google): `ERIS_LEGACY_LOGIN=1` en el `.env` del backend y reiniciar. Volver a ponerlo en 0 apenas se resuelva.
- **Bóveda AXS:** son archivos de texto. Respaldar la carpeta `C:\Proyectos\AXS` completa antes de reorganizaciones grandes.
