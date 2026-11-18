---
owner: Eris
tier: Técnico
status: Activo
estado: Parcial
---

# 🌑 Nyx (RFC: Sovereign Security Layer)

↑ [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/23 - Plataforma e Infraestructura.md|Plataforma e Infraestructura]]
#AXS/Infraestructura #AXS/Seguridad

[[00-09 Management & Governance/00.05 - Panteón Arquitectónico AXS|Panteón Arquitectónico]]

## 🎯 Misión
Proteger la integridad y privacidad del ecosistema total. "La guardiana de la sombra".

## 🔒 Funciones Principales
- **Encryption:** Cifrado en reposo y en tránsito.
- **Secrets Vault:** Almacenamiento seguro de APIs y credenciales (`.env`).
- **Device Trust:** Verificación de qué dispositivos tienen permitido conectar a AXS.
- **Auth:** Rate limiting y validación de perfiles (Ikaros vs Eris).

## 🛠️ Stack & Tecnologías
- **Algoritmo:** AES-256-GCM (`CryptoService`) para la memoria y conversaciones por-perfil de Eris (`eris/data`). *Las notas de la bóveda Obsidian son texto plano local-first.*
- **Key Store:** Almacén local de llaves criptográficas.
- **Acceso:** Biometric unlock y validación por PIN jerárquico.

## 🏛️ Principios Fundamentales
1. **Local-first:** La clave de cifrado NUNCA sale del dispositivo primario.
2. **Zero Knowledge:** La base de datos es opaca sin el PIN correcto.

## 🛡️ Lo que se agregó (septiembre 2026)
- **Login solo con Google (1.17.0, 2026-09-21):**
  - el servidor verifica el token de Google;
  - las sesiones se guardan como hash;
  - cada perfil se cifra con una clave derivada de `server_secret`, así que nadie escribe un PIN.
  - El acceso antiguo con ID+PIN está **apagado** (`ERIS_LEGACY_LOGIN=0`).
  - ⚠️ **`~/.eris/server_secret` es crítico:** si se pierde, los perfiles ligados a Google no se pueden abrir. Hay que respaldarlo.
- **Aprobación humana (1.18.0):** las herramientas sensibles (bash, escribir archivos, abrir, notas de la bóveda, cristalizar) muestran una tarjeta Aprobar/Rechazar.
  - Solo la misma conexión y el mismo perfil pueden aprobar, así que ni el modelo ni un texto inyectado pueden hacerlo.
  - Hay tope de tarjetas por turno, y vencen a los 3 minutos (= rechazo).
- **Política de rutas y comandos:**
  - solo se escribe dentro de la bóveda AXS, Escritorio, Documentos, Descargas y tmp;
  - nunca se toca `~/.eris`, `.env` ni las llaves;
  - se bloquean los comandos ofuscados.
- **Defensa contra inyección:** lo que viene de la web, de archivos o de la bóveda se marca como dato no confiable. En ese turno quedan bloqueadas las herramientas peligrosas.
- **Roles *fail-closed*:** un rol desconocido cuenta como `eris`. El administrador real tiene el rol `ikaros` (su perfil está en `roles.json`).
- **Bitácora firmada:** ver [[20-29 R&D (The Forge)/23 Plataforma e Infraestructura/Argos.md|Argos]].

## 💻 Implementación Actual
> **Ruta:** `C:\Proyectos\eris\src\services\security\`
> *(Pendiente renombrar a `services/nyx/` para alinear con el Panteón)*

| Responsabilidad             | Archivo                 |
|-----------------------------|-------------------------|
| Cifrado/descifrado AES-256  | `CryptoService.ts`      |
| Sistema de roles y permisos | `RoleSystem.ts`         |
| Gestión dinámica de roles   | `RoleManager.ts`        |
| Protección anti-fuerza bruta | `AuthRateLimiter.ts`   |
| Login con Google | `SsoAuth.ts`, `GoogleAuth.ts` |
| Cuentas y sesiones | `AccountStore.ts` |
| Política de rutas y comandos | `PathPolicy.ts` |
| Panel de administración | `AdminService.ts` |
| Bitácora con firma HMAC | `AuditLog.ts` |
