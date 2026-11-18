---
owner: Eris
tier: Operativo
status: Activo
---

# 📱 Depurar la App en el Teléfono

#AXS/TI

↑ [[40-49 Standards & SOPs/41 Runbooks/41 - Runbooks.md|Runbooks]]

**Regla:** ante un "se cierra la app", primero el log y después las teorías. El cierre al registrar agua de sep-2026 tenía un diagnóstico equivocado hasta que se leyó el log.

## 🔌 Conectar
- **adb:** `%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe`. El teléfono va por USB con la depuración activada.
- `adb devices` debe listarlo. Si sale "device offline": `adb reconnect offline`.
- **Si una instalación queda esperando,** suele ser el teléfono bloqueado: hay que desbloquearlo.
  - *Para agentes:* solo deslizar (desbloqueo ampliado), **nunca escribir el PIN**.

## 🔎 Ver por qué se cerró
- `adb logcat -b crash -d`: los cierres recientes, con el stack.
- `adb shell dumpsys dropbox --print data_app_crash`: trae el cierre aunque ya haya pasado hace rato.
- Una vez encontrada la causa, reproducirla en una prueba antes de arreglar. Ejemplo: `fgs_test`, la carrera del servicio en primer plano.

## 🧭 Para agentes
- No tomar capturas mientras el usuario está en otras apps.
- No navegar por las secciones médicas del Perfil ni por chats sin necesidad.
- Abrir la app: `adb shell monkey -p com.aleeeksanders.erismobile -c android.intent.category.LAUNCHER 1`.
