---
owner: Eris
tier: Operativo
status: Activo
---

# 📦 Publicar una Nueva APK

#AXS/TI

↑ [[40-49 Standards & SOPs/41 Runbooks/41 - Runbooks.md|Runbooks]]

## 🪜 Paso a paso
1. **Subir la versión** en `eris-mobile/android/app/build.gradle`: `versionCode` +1 y `versionName` (por ejemplo 1.36.0 → 1.36.1). Así se ve en el teléfono qué versión está instalada.
2. **Compilar** (en `eris-mobile/android`, con el SDK en el entorno):
   ```bash
   export ANDROID_HOME="$LOCALAPPDATA/Android/Sdk" ANDROID_SDK_ROOT="$LOCALAPPDATA/Android/Sdk"
   ./gradlew assembleRelease -q
   ```
   - Si **solo cambió un HTML de módulo** (`assets/toji.html` o `assets/hunter-wallet.html`), primero hay que forzar `:app:createBundleReleaseJsAndAssets --rerun`. Si no, la APK sale con el HTML viejo. Después, comparar la hora y el tamaño.
3. **Copiar al escritorio, siempre con el mismo nombre:** `Escritorio\eris-app-release.apk`, sobrescribiendo la anterior y sin versión en el nombre. El fundador la reemplaza en Drive.
4. **Verificar:** `aapt dump badging Escritorio\eris-app-release.apk` (aapt está en el SDK, `build-tools`) debe mostrar el `versionCode` y el `versionName` nuevos.
5. **Instalar por adb (opcional):**
   - `adb install -r Escritorio\eris-app-release.apk` (con el teléfono desbloqueado);
   - abrirla con `adb shell monkey -p com.aleeeksanders.erismobile -c android.intent.category.LAUNCHER 1`.

## 📝 Notas
- La APK es solo ARM (`reactNativeArchitectures=armeabi-v7a,arm64-v8a` en `android/gradle.properties`) y pesa ~53 MB. Para un emulador: `-PreactNativeArchitectures=x86_64`.
- Antes de compilar, revisar los tipos: `npx tsc --noEmit` en `eris-mobile`. Hay un error viejo conocido en `gen-qr-bun.ts`, que no afecta.
- Si el cambio también fue en el servidor, reiniciarlo ([[40-49 Standards & SOPs/41 Runbooks/Levantar los Servicios de Eris.md|Levantar los Servicios de Eris]]).
