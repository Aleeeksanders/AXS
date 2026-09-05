---
owner: Eris
tier: Técnico
status: Activo
---

# 🌑 Nyx (RFC: Sovereign Security Layer)
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

## 💻 Implementación Actual
> **Ruta:** `C:\Proyectos\eris\src\services\security\`
> *(Pendiente renombrar a `services/nyx/` para alinear con el Panteón)*

| Responsabilidad             | Archivo                 |
|-----------------------------|-------------------------|
| Cifrado/descifrado AES-256  | `CryptoService.ts`      |
| Sistema de roles y permisos | `RoleSystem.ts`         |
| Gestión dinámica de roles   | `RoleManager.ts`        |
| Protección anti-fuerza bruta | `AuthRateLimiter.ts`   |
