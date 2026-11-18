---
owner: Eris
tier: Técnico
status: Activo
estado: Construido
---

# 🎙️ Voz de Eris (RFC: Local Voice Pipeline)

↑ [[20-29 R&D (The Forge)/21 Núcleo de Eris/21 - Núcleo de Eris.md|Núcleo de Eris]]

#AXS/Producto #AXS/Infraestructura

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]] · Relacionado: [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/Aether.md|Aether]], [[20-29 R&D (The Forge)/22 Módulos de la App/Experiencia de la App.md|Experiencia de la App]], [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/TI.md|TI]]

## 🎯 Misión
Hablarle a Eris y que responda con voz, **todo local**: el audio no sale del PC.

## 🧩 Componentes
- **Dictado (STT):** `whisper-server` con el modelo `small`, en el procesador (puerto 8081, `-t 8`). Usa `--convert` + `ffmpeg` porque Android graba en `.m4a`.
- **Voz (TTS):** Piper con **"Daniela" (es_AR, alta calidad)** en el puerto 5001.
  - Eris tiene persona femenina. Una segunda voz (es_MX) se descartó porque sonaba masculina.
  - No existe una voz chilena pública en Piper.
- **Dictado con contexto (VoiceFix, 2026-10-09).** El dictado ya no se toma literal. Por ejemplo, "para a el bípedo" → "paralelepípedo".
  1. **Pista a Whisper:** vocabulario base, las comidas frecuentes y los medicamentos del perfil, y lo último que dijo Eris.
  2. **Palabras dudosas:** las que no existen en un diccionario español local (Hunspell es_ES + chilenismos) o con baja probabilidad.
  3. **Corrección por sonido**, sin modelo, solo si suena casi igual a UNA palabra conocida.
  4. **Revisión con el modelo**, cambio por cambio. Solo se acepta si reemplaza algo dudoso, suena parecido y mantiene las cifras.
  - Resultado en una prueba dura: de 12/31 a **23/31** palabras clave. La app muestra "🎙 Oí «…»" cuando corrige.
- **Velocidad:** `no_language_probabilities` ahorra 2,7 s por dictado.

## 📞 La llamada con Hestia (2026-11-16, solo Hestia)
Una conversación en tiempo real, no un dictado: solo para el administrador, en el Modo AXS.
- **El reconocimiento va en el teléfono,** en el aparato y sin internet. Hay tres formas de usarlo y se recuerda la que entrega texto; en su Pixel, la «continua».
- **El servidor** usa un motor propio para la voz (`#voz`), con un prompt corto (`data/prompts/hestia-voz.md`) y solo las herramientas de la intención.
- **La respuesta suena por frases** con Piper, apenas está lista cada una.
  - Las cifras las convierte a palabras el código (`Hablar.ts`), no el modelo.
  - Lo largo queda escrito en la pantalla.
- **Interrumpirla:** con audífonos, se la interrumpe hablándole encima.
- **Aprobaciones:** lo seguro se aprueba con un «sí»; lo riesgoso, tocando la pantalla; lo destructivo, nunca por voz.
- **Saludo y resumen, por código:** saluda en la primera llamada del día y deja un resumen al colgar.
- **Sigue sonando** con la pantalla apagada o el teléfono en el bolsillo.
- **Medido:** ~2,1 s hasta el primer audio con el modelo caliente. Las respuestas por código, al instante.
- **Con el teléfono bloqueado,** por niveles. Y desde la L6, **solo su voz**: cada frase se revisa en el teléfono. Ver [[20-29 R&D (The Forge)/21 Núcleo de Eris/Hestia como JARVIS.md|Hestia como JARVIS]].

## ⚠️ Operación
- Whisper y Piper **no arrancan solos** con el backend: hay que levantarlos antes, con `start-voice-services.bat` o con WMI (ver [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/TI.md|TI]]).
- Si están abajo, el chat sigue funcionando y solo la voz muestra un error visible.

## 💻 Implementación Actual
> **Ruta:** `C:\Proyectos\eris\`

| Responsabilidad | Archivo |
|---|---|
| Cliente de Whisper | `src/services/stt/WhisperProvider.ts` |
| Corrección con contexto | `src/services/stt/VoiceFix.ts` |
| Diccionario español | `src/services/stt/SpanishWords.ts` (datos en `src/data/dict/es_ES/`) |
| Cliente de Piper | `src/services/tts/PiperProvider.ts` |
| Mensajes de voz (WS `voice_message`) | `src/server.ts` |
| La llamada: turnos, cortar y muletillas | `src/services/voz/VozSesion.ts`, `CortadorFrases.ts`, `CacheVoz.ts` |
| Lo que se dice en voz alta | `src/services/voz/Hablar.ts`, `Directas.ts` |
| Aprobaciones por voz | `src/services/voz/AprobacionVoz.ts` |
| Saludo y resumen de la llamada | `src/services/voz/Saludo.ts`, `ResumenLlamada.ts` |
| Bloqueado y solo tu voz | `src/services/voz/Bloqueado.ts`, `VozFrase.ts` |
| La llamada en la app | `src/screens/HestiaLlamada.tsx`, `src/services/voz/escucha.ts`, `reproductor.ts` (eris-mobile) |
| Arranque de los servicios | `start-voice-services.bat`, `whisper/start-whisper-server.bat`, `piper/start-piper-servers.bat` |

## ⏭️ Pendiente
- **Palabra de activación para Eris** ("Eris, ¿me escuchas?"): **descartada por ahora** (2026-09-21) por los límites de Android y la latencia del modelo. Para **Hestia** sí existe desde noviembre, en la app aparte [[20-29 R&D (The Forge)/22 Módulos de la App/Hestia Manos.md|Hestia Manos]], con un detector propio de «Hestia». Falta probarla en el teléfono.
- Un Whisper mejor (`large-v3-turbo`) necesita GPU. Llegaría con el [[50-59 Intelligence Feed/53 Decisions/decision-2026-10-11-pc-dedicado-para-eris.md|PC dedicado]].
