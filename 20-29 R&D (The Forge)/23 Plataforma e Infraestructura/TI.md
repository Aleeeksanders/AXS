---
owner: Eris
tier: Técnico
status: Activo
estado: Construido
---

# 🖥️ AXS – TI / Infraestructura

↑ [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/23 - Plataforma e Infraestructura.md|Plataforma e Infraestructura]]
#AXS/TI

## Identidad
Mantener operativo el ecosistema digital AXS: cerebros, backups y automatizaciones.

## Subáreas
- [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/Core.md]]
- [[10-19 Strategic Vision/11 Visión de Producto/Automatización.md]]
- [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/Seguridad y backup.md]]

## 🖥️ Infraestructura real (al 2026-10-12)
- **Todo corre en el notebook del fundador.** CPU Intel Core 5 210H (8 núcleos / 12 hilos), 15,6 GB de RAM y **RTX 3050 Laptop de 6 GB**.
- **Servicios y puertos:**
  - backend Eris (Bun) en el 3000;
  - Ollama en el 11434 (`qwen3.5:4b`);
  - Whisper en el 8081 (dictado, en la CPU);
  - Piper en el 5001 (voz).
  - Detalle de la voz: [[20-29 R&D (The Forge)/21 Núcleo de Eris/Voz de Eris.md|Voz de Eris]].
- **Acceso remoto:** la app se conecta por **Tailscale**.
- **Cómo levantar los servicios sin que mueran:**
  - Lanzarlos con **WMI** (`Win32_Process Create`), no desde una sesión de terminal: los procesos atados a una sesión morían al reiniciarse (incidente del 2026-10-06).
  - Orden: Ollama → Whisper → Piper → backend.
- **Ollama** corre con `OLLAMA_FLASH_ATTENTION=1` y `OLLAMA_KV_CACHE_TYPE=q8_0`: el modelo pasa de 6,9 a 6,3 GB. Esos ajustes se pierden si se reinicia Ollama o el PC.
- **Datos:** perfiles cifrados en `~/.eris/profiles/` y respaldos en `~/.eris/backups/`.
  - ⚠️ **Respaldar `~/.eris/server_secret`:** sin él, los perfiles ligados a Google no se abren (ver [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/Nyx.md|Nyx]]).
- **Base de alimentos:** se regenera con `bun --env-file=.env scripts/build_food_db.ts`, que escribe la copia del servidor y la de la app. Después hay que reiniciar el backend.
- **APK:** siempre `Escritorio/eris-app-release.apk`, sobrescrita y sin versión en el nombre. La versión interna sube en `android/app/build.gradle`. El fundador la reemplaza en Drive.

## ⚠️ Límite actual: la tarjeta de video
- El modelo con su contexto mide **6,3 a 6,9 GB** y la tarjeta tiene 6 GB. Queda repartido entre GPU y CPU (llegó a 24 de 33 capas en la GPU) y responde lento.
- Las apps que usan la GPU (navegador, overlays, fondos animados, juegos) lo empeoran. El modelo retenido 30 minutos le quita memoria de video a los juegos.
- **Decisión:** un PC dedicado para Eris. Ver [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-11-pc-dedicado-para-eris.md|decisión]] y plan de compra.
- **Mitigación mientras tanto:** cada vez más mensajes se resuelven por código, sin la GPU.

## Objetivos
- Crear un flujo automático Inbox → área.
- Garantizar respaldo y cifrado de toda la bóveda Obsidian.
- Integrar scripts para automatizar tareas repetitivas.
- Migrar la beta a una **cuenta propia de Tailscale** (`eris.beta.axs`), para que los testers no entren a la red personal.

## Acciones actuales
- AXS-Core definido como bóveda principal de Obsidian.
- Automatización en proceso vía QuickAdd y Templater.
- Copias de seguridad iniciales en OneDrive.

## Ideas
- Implementar Git como backup paralelo.
- *(Histórico)* Integrar con la API de ChatGPT. Hoy choca con el principio de que **los datos de salud no salen del PC**.

## Referencias
- [[20-29 R&D (The Forge)/25 Laboratorio e I+D/ZeroPoint.md]]
