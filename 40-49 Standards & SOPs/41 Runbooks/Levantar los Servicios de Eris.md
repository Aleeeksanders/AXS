---
owner: Eris
tier: Operativo
status: Activo
---

# ▶️ Levantar los Servicios de Eris

#AXS/TI

↑ [[40-49 Standards & SOPs/41 Runbooks/41 - Runbooks.md|Runbooks]]

## 🧩 Qué tiene que estar corriendo
| Servicio | Puerto | Para qué |
|---|---|---|
| Ollama (`qwen3.5:4b`) | 11434 | el modelo del chat |
| Whisper (`whisper-server`, modelo `small`) | 8081 | dictado |
| Piper (voz Daniela) | 5001 | voz |
| Backend Eris (Bun) | 3000 | todo lo demás: registro, sincronización, avisos, Finanzas |

**Para registrar basta el backend.** Ollama, Whisper y Piper son para el chat y la voz. Desde el 2026-10-14 el backend arranca aunque Ollama esté apagado: el chat queda en pausa y responde «El chat de Eris está en pausa por ahora» en vez de un error.

## ⚡ La forma corta: el script
`C:\Proyectos\eris\scripts\servicios.ps1` hace todo lo de este runbook, con WMI. Probado el 2026-10-15.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File C:\Proyectos\eris\scripts\servicios.ps1 <acción>
```

- `estado`: puertos, procesos, modelo cargado, GPU y RAM.
- `levantar`: Ollama (con los ajustes de memoria) → Whisper → Piper → backend, si no está.
- `solo-registro`: pausa el chat para liberar RAM y GPU. Descarga el modelo y apaga Ollama, Whisper y Piper; el backend sigue.
- `reanudar-chat`: igual que `levantar`. El backend no se reinicia: toma Ollama, Whisper y Piper en el siguiente pedido y carga el modelo con el primer mensaje.
- `reiniciar-backend`: detiene el backend y lo vuelve a crear, con o sin Ollama.
- `iniciar`, `detener` o `reiniciar` seguido de `ollama`, `whisper`, `piper`, `backend` o `chat` (los tres del chat juntos): un servicio a la vez (2026-10-15).

El log del backend queda en `%USERPROFILE%\.eris\logs\servidor.log`.

## 📱 Desde la app: Sistema, en el Modo AXS
Desde el 2026-10-15 (app 1.42.1), cada servicio tiene en **Sistema** sus botones **Iniciar · Detener · Reiniciar**, y una tarjeta **Chat completo** que inicia o detiene los tres juntos.
- **Sin modelo:** no pasan por el chat, así que funcionan aunque el chat esté en pausa.
- **Cómo funcionan:** usan el mismo script, con acciones fijas (`services/ServiceControl.ts`). Antes de detener o reiniciar, la app pide confirmación.
- **Permisos y registro:** solo los ve Ikaros con Google (canal `admin_service`), y cada uno queda en la bitácora.
- **El servidor solo se reinicia.** Lo hace un proceso aparte lanzado con WMI, y la app se reconecta sola en unos segundos.
  - Detenerlo desde la app la dejaría sin conexión para volver a iniciarlo. Si el backend está caído, hay que usar el script en el PC.

*Para agentes:* córrelo desde una terminal propia, no desde el chat de Eris. El chat depende de esos mismos servicios: pausarlos o reiniciar el backend corta la conversación que lo pidió.

## ⚠️ Regla: lanzar con WMI, no desde una terminal
Los procesos lanzados desde una sesión de terminal (o de un agente) mueren cuando esa sesión se reinicia (incidente del 2026-10-06). Hay que crearlos con WMI, desde PowerShell:

```powershell
Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
  CommandLine = 'cmd /c "<comando>"'; CurrentDirectory = 'C:\Proyectos\eris' }
```

Un proceso creado así ve el PATH del usuario: encuentra `bun`, `python` y `ollama` sin ruta completa (verificado el 2026-10-15).

## 🪜 Paso a paso (lo mismo que hace el script)
**Orden:** Ollama → Whisper → Piper → backend. Si Whisper, Piper u Ollama se levantan después del backend, el backend los toma sin reiniciarse, porque los revisa en cada pedido.

1. **Ollama, con los ajustes que lo hacen caber mejor en la tarjeta de video:**
   `set "OLLAMA_FLASH_ATTENTION=1" && set "OLLAMA_KV_CACHE_TYPE=q8_0" && start "" "%LOCALAPPDATA%\Programs\Ollama\ollama app.exe"`
   - Estos ajustes valen solo para ese proceso: se pierden si Ollama o el PC se reinician.
   - Para confirmarlos, `%LOCALAPPDATA%\Ollama\server.log` debe decir `OLLAMA_FLASH_ATTENTION:true` y `OLLAMA_KV_CACHE_TYPE:q8_0`.
2. **Whisper:** `whisper\start-whisper-server.bat`. Usa `-t 8`, `--convert` y el `ffmpeg.exe` de `whisper\bin\Release`. Tarda unos segundos en cargar el modelo.
3. **Piper:** `python -m piper.http_server -m es_AR-daniela-high --data-dir piper\voices --port 5001`. El mismo comando está en `piper\start-piper-servers.bat` y, con Whisper, en `start-voice-services.bat`; esos dos abren ventanas propias, así que para WMI conviene el comando directo.
4. **Backend:** `bun run src/server.ts`, con la salida redirigida a un log. Está listo cuando el log dice:
   - **"🔥 Modelo precargado en memoria."** si Ollama está arriba;
   - **"⚠️ Ollama no está disponible: el chat queda en pausa…"** si no lo está (modo solo registro).

## ⏸️ Pausar el chat (modo solo registro)
Para liberar RAM y tarjeta de video sin cortar el registro (por ejemplo, para jugar o compilar):
1. **Descargar el modelo de forma ordenada:** `POST http://127.0.0.1:11434/api/generate` con `{"model":"qwen3.5:4b","keep_alive":0}`.
2. **Apagar Ollama, cerrando primero `ollama app.exe`** (el ícono de la bandeja): si no, vuelve a levantar `ollama serve`. Después, `ollama.exe`.
3. **Apagar `whisper-server.exe` y el `python.exe` de Piper.**
4. **No tocar el backend.**

Resultado medido el 2026-10-13: la GPU pasó de 5,3 a 1,3 GB y la RAM libre de 2,2 a 5,0 GB.

En la app:
- registrar comida y agua, la sincronización, Finanzas y los avisos del día siguen funcionando;
- los avisos traen su comida concreta, que el servidor elige por código, sin el modelo;
- el chat responde que está en pausa.

## 🔁 Reiniciar el backend
1. Detener el `bun.exe` cuya línea de comando dice `src/server.ts`.
2. Crearlo de nuevo con WMI (paso 4).

Arranca igual con Ollama apagado. Mientras se reinicia, el teléfono pierde la conexión unos segundos y se reconecta solo.

## 🖥️ Al reiniciar el PC
- **Ollama se abre solo** con Windows (acceso `Ollama.lnk` en Inicio), pero **sin** los ajustes de memoria. No carga el modelo hasta el primer mensaje.
- **El backend, Whisper y Piper NO arrancan solos.** Hasta levantarlos, la app no registra en el servidor.
- Después de reiniciar: `servicios.ps1 levantar`, o `solo-registro` si se quiere dejar el chat en pausa.

## ✅ Verificar
- **Todo junto:** `servicios.ps1 estado`.
- **Puertos:** `netstat -ano | findstr ":3000 :11434 :8081 :5001"`.
- **Modelo en la GPU:** `ollama ps`. En "PROCESSOR", lo ideal es 100 % GPU. Si sale repartido (por ejemplo 51 %/49 % CPU/GPU) va a responder lento.
  - El detalle está en `%LOCALAPPDATA%\Ollama\server.log` ("offloaded N/33 layers").
- **Voz:** `http://127.0.0.1:8081/` responde 200 y `http://127.0.0.1:5001/?text=hola` devuelve un audio WAV.
- **Desde el teléfono:** que Tailscale esté conectado (`tailscale status`; el teléfono a veces queda "offline").

## 🩹 Si algo falla
- **"Eris está caída":** revisar los puertos y el log de Ollama antes de pensar en un bug.
- **"model requires more system memory":** falta RAM o memoria de video. Cerrar apps que usen la GPU (navegador con muchas pestañas, overlays, fondos animados, juegos).
  - *Para agentes:* nunca cerrarle apps al usuario sin su permiso.
- **Poca RAM justo después de compilar la APK:** los daemons de Gradle y Kotlin quedan vivos (~2,8 GB). Se cierran con `gradlew --stop` en `eris-mobile\android`.
- **Variables útiles del backend:**
  - `ERIS_PORT` (por defecto 3000);
  - `ERIS_KEEP_ALIVE` (cuánto se queda el modelo cargado; por defecto 30m; bajarlo libera la tarjeta antes);
  - `ERIS_QUICK_REPLY=0` (apaga las respuestas por código, solo para pruebas).

Contexto: [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/TI.md|TI]]
