---
owner: Eris
tier: Operativo
status: Activo
---

**Objetivo:** Diseñar un protocolo operativo, ético y técnico (lista de pasos, parámetros, flujos y plantillas) para que dispositivos Ghost (Ring / Watch / Lens) usen HRV/HR + contexto para **detectar riesgo en el momento de extracción/uso** y ejecutar un **protocolo escalonado** (alerta → soft-lock → revisión humana → escalado). Todo orientado a Chile (consentimiento, Carabineros) y alineado con la visión AXS: proteger usuarios sin hacer diagnósticos médicos, con trazabilidad forense y human-in-the-loop.

> Documento ultra-detallado y listo para integrar en la documentación de producto, SOPs de Eris y el equipo de I+D / Seguridad. Contiene: principios, arquitectura, métricas, reglas, pseudocódigo, plantillas de notificación y checklist de pruebas.

---

# 1. Principios no negociables (legal / ético / product)

↑ [[40-49 Standards & SOPs/40 - Estándares y Procedimientos.md|Estándares y Procedimientos]]

1. **No diagnóstico:** El sistema solo detecta _anomalas fisiológicas o de comportamiento_, nunca hace un juicio clínico o criminal por cuenta propia.
    
2. **Consentimiento explícito:** Owner debe firmar consentimiento informado (configuración inicial) que autoriza medidas automáticas descritas aquí. Registro firmado por device y server.
    
3. **Minimización & privacidad:** Procesamiento en borde cuando sea posible; solo enviar lo mínimo necesario al backend. Retención por defecto 30 días, auditable.
    
4. **Human-in-the-loop (HITL):** Cualquier acción irreversible o de alto impacto requiere revisión humana (propietario, operador autorizado, o autoridad legal con orden).
    
5. **Trazabilidad forense:** Todos los eventos críticos deben estar firmados por el Secure Element del dispositivo (ATECC / SE) para cadena de custodia.
    
6. **Seguridad y control de abuso:** Auditorías, roles, logs inmutables y límites de acceso. No permitir uso con fines de perfilamiento discriminatorio.
    

---

# 2. Alcance del protocolo

- **Eventos cubiertos:** extracción forzada, uso por tercero no-owner, intento de extracción durante estado de alta agitación (HR/HRV anómalos), préstamos temporales no autorizados.
    
- **Acciones posibles:** registro + telemetría forense; notificación a owner y contactos; soft-lock (restricciones funcionales); apertura de ticket en panel Eris; escalado a autoridad (solo con procedimientos legales / orden).
    
- **No cubre:** diagnósticos clínicos, detenciones físicas automáticas, o acciones que pongan en riesgo la seguridad física del portador.
    

---

# 3. Arquitectura resumida (alto nivel)

- **Edge (device):** ESP32-class MCU + MAX30102 (PPG) o equivalente, IMU (accelerometer/gyro), sensor de contacto piel, NFC/BLE owner proximity, ATECC608A (secure element). Calcula IBI, RMSSD, HR en ventana rolling (30 s). Genera eventos firmados.
    
- **Backend (Eris):** receptor de eventos con verificación de firma, base segura (KMS + cifrado en reposo), motor de reglas y panel de incidentes (HITL). Notificaciones push/SMS.
    
- **UI (app / web):** configuración, baseline/calibración, revisión de alertas, control de sensibilidad, registros de consentimientos y appeals.
    
- **Governance:** SOPs legales para entrega de logs a Carabineros con orden judicial; auditorías y comités de ética.
    

---

# 4. Señales y sensores (qué se usa y por qué)

- **PPG (MAX30102 / MAX30105):** para detectar pulsos → IBI → HR y HRV (RMSSD, SDNN, pNN50). HRV = indicador de variabilidad autonómica (stress/agitación).
    
- **IMU (MPU6050 / ICM42688):** corroborar movimientos bruscos, caídas o extracción violenta.
    
- **Sensor skin-contact / Irá:** evita falsos positivos cuando no hay contacto.
    
- **NFC/BLE owner tag / paired phone:** confirma proximidad del owner/paired device (reduce falsas alarmas).
    
- **Tamper switch:** detecta apertura física/manipulación.
    
- **Secure Element (ATECC608A):** firma ECDSA de eventos para integridad y cadena de custodia.
    

---

# 5. Métricas y cálculo (definiciones técnicas)

**Ventana de cálculo:** 30 s (configurable 15–60 s).  
**Variables:**

- `t_i` = timestamp de cada latido (ms).
    
- `IBI_i = t_{i+1} - t_i` (ms).
    
- `HR = 60000 / mean(IBI)` (bpm).
    
- `RMSSD = sqrt( (1/M) * Σ (ΔIBI_i^2) )` con `ΔIBI_i = IBI_{i+1}-IBI_i` y `M = número de ΔIBI`.
    
- `SDNN = stddev(IBI)`.
    

**Cálculo paso a paso (ejemplo):**

- IBI = [800, 820, 780, 790] ms → ΔIBI = [20, -40, 10] → squares = [400, 1600, 100] → sum=2100 → M=3 → RMSSD = sqrt(700) ≈ 26.46 ms.
    

**Umbrales iniciales (punto de partida — calibrar por usuario):**

- **HR crítico:** ≥ 120 bpm → riesgo alto.
    
- **HR moderado:** 100–119 bpm → riesgo medio.
    
- **RMSSD absoluto bajo:** < 15 ms en reposo → bandera.
    
- **RMSSD relativa:** cada > 40% respecto baseline → bandera.
    
- **SDNN:** < 20 ms contribuye a bandera.
    

> **Importante:** Baseline individual es obligatorio — ver Sección 9.

---

# 6. Lógica de decisión y puntaje de riesgo (reglas)

Cada señal aporta puntos; sumar y decidir:

|Condición|Puntos|
|---|---|
|HR ≥ 120 bpm|+2|
|HR 100–119 bpm|+1|
|RMSSD < 15 ms|+2|
|RMSSD < 0.6 * baseline_RMSSD (drop >40%)|+2|
|SDNN < 20 ms|+1|
|IMU indica extracción/impacto violento|+1|
|Skin contact == false|ignore event|
|Owner proximity (NFC/BLE) == true|-2|

**Escala de riesgo:**

- `riesgo >= 3` → **Crítico**
    
- `riesgo == 2` → **Moderado**
    
- `riesgo <=1` → **Bajo / Normal**
    

**Voting temporal:** el estado debe mantenerse durante ≥ 10 s (o 2 lecturas dentro de ventana) para confirmar. Evita picos momentáneos.

---

# 7. Protocolos de respuesta (niveles y acciones concretas)

## 7.1 Protocolo Crítico (riesgo ≥ 3)

1. **Soft-lock inmediato** en device:
    
    - Desactivar: emparejamientos nuevos, factory reset remoto, pagos/funciones críticas.
        
    - Mantener: botón SOS, llamadas de emergencia y modo lectura/passive.
        
2. **Alerta local al usuario:** vibración prolongada + patrón LED + notificación en pantalla si aplica: “Se ha detectado situación de alto estrés — acción iniciada.”
    
3. **Evento forense firmado:** enviar a backend `{device_id, ts, hr, rmssd, sdnn, accel_snapshot, owner_prox, signature}`.
    
4. **Notificaciones:** push + SMS al owner y hasta 2 contactos de emergencia preconfigurados. Mensaje corto (ver plantilla Sección 12).
    
5. **Apertura de ticket automatico en Eris:** prioridad Alta, incluye payload y recommended actions.
    
6. **Escalado humano:** operador revisa evidencia en <N minutos (configurable, p. ej. 10 min). Si owner no responde o confirma riesgo real, activar proceso legal/escalado (ver SOP legal Sección 11).
    
7. **Retención forense:** almacenar eventos y snapshots 90 días por defecto (ajustable con justificativo legal).
    

## 7.2 Protocolo Moderado (riesgo == 2)

1. **Notificación silenciosa** al owner con petición de confirmación (push).
    
2. **Requerir autenticación local** para seguirá usando (PIN / NFC owner tag / biometría) — ventana de gracia 10 min.
    
3. **Registro forense** y envío de evento al backend en bucket de revisión (Prioridad Medium).
    
4. **Si no hay confirmación en ventana → escalar a soft-lock.**
    

## 7.3 Protocolo Bajo / Registro (riesgo ≤ 1)

1. **Registrar evento** local y enviar telemetría resumida al backend para análisis offline.
    
2. **No acciones intrusivas.**
    

---

# 8. Soft-lock vs Hard-lock — definiciones y reglas

- **Soft-lock (recomendado):** restricciones funcionales reversibles por owner o por proceso de revisión (ej.: bloquear pagos, emparejamientos y reset remoto). Implementable automáticamente.
    
- **Hard-lock (no automático):** requeriría intervención legal o proceso de appeals y cadena de custodia; no debe activarse automáticamente por algoritmo.
    

**Regla:** nunca cortar comunicación SOS o la capacidad de hacer llamadas de emergencia. Seguridad de la persona primero.

---

# 9. Baseline personal y calibración (proceso)

1. **Captura inicial:** al activarse por primera vez (o cuando el owner lo valide), recopilar 48–72 h de datos en reposo (noche + periodos de calma).
    
2. **Rolling baseline:** actualizar baseline con ventana de 7 días; usar medianas y percentiles para robustez.
    
3. **Ajustes automáticos:** Eris sugiere sensibilidad si baseline es inestable (fitness, edad, condiciones médicas). Owner puede bajar/ subir sensibilidad con advertencias.
    
4. **Fallback:** si no hay baseline suficiente, usar umbrales poblacionales conservadores y solicitar calibración activa (app instruye usuario para 10 min de reposo).
    

---

# 10. Logs, firma y cadena de custodia

- **Formato de evento:** JSON firmado por device (ATECC). Ejemplo en Sección 13.
    
- **Almacenamiento:** cifrado en reposo (AES-GCM con KMS), retención configurada por política.
    
- **Acceso:** auditoría de cada acceso, roles y justificación.
    
- **Entrega a autoridades:** solo con orden judicial o consentimiento explícito del owner; se debe generar un registro de acceso y notificar al owner (si la ley lo permite).
    

---

# 11. SOP legal (Chile) — pasos en caso de riesgo verificado

1. Revisión humana valida riesgo (operator/owner).
    
2. Si hay indicios de delito en curso y riesgo para la persona: contactar **Carabineros de Chile** (comunicación con folio + entrega de evidencia firmada). Plantilla de notificación abajo.
    
3. Registrar folio policial en ticket Eris y mantener cadena de custodia digital.
    
4. Si solicita autoridad, exportar paquete forense firmado (JSON + metadatos + firma) y registrar autorización.
    
5. Asesoría legal en cada caso crítico; mantener comité de ética y cumplimiento.
    

> **Nota legal:** adaptar la política específica con asesoría local; este protocolo no sustituye asesoría jurídica.

---

# 12. Plantillas de notificación (texto)

## 12.1 Notificación push / SMS al owner (Crítico)

> **AXS Alert — Evento Crítico**  
> Se detectó un episodio de riesgo en tu dispositivo _GhostRing_ (ID: `DEV1234`) a las `2025-10-27T12:21:00Z`.  
> Parámetros: HR=132 bpm, RMSSD=12 ms. Acción iniciada: _Soft-lock_ y envío de datos forenses.  
> Responde **CONFIRMAR** en la app o llama al botón SOS si estás en peligro. Si no confirmas en 10 min, el caso será revisado por un operador.  
> Si necesitas asistencia inmediata, llama al 133 (Carabineros) o pulsa SOS.

## 12.2 Mensaje a contacto de emergencia

> [Nombre], AXS ha detectado un episodio de riesgo vinculado al dispositivo de [Owner]. Se han enviado datos codificados y se solicita atención. Revisa la app AXS o contacta a [Owner]. Si crees que la persona está en peligro, contacta a Carabineros (133).

## 12.3 Plantilla para notificación a Carabineros (si procede)

> Asunto: Solicitud de intervención — posible situación de riesgo  
> Fecha/Hora: `2025-10-27T12:21:00Z`  
> Dispositivo: GhostRing ID `DEV1234`  
> Datos adjuntos: paquete forense firmado (JSON).  
> Resumen: Se detectó HR=132 bpm y RMSSD=12 ms concurrente con movimiento de extracción violenta. Se solicita intervención inmediata para verificación presencial. Contacto: [Owner tel/email].  
> (Adjuntar firma ECDSA y metadatos)

---

# 13. Ejemplo de payload de evento (JSON firmado)

`{   "device_id": "DEV1234",   "ts": "2025-10-27T12:21:00Z",   "event_level": "critical",   "hr": 132.4,   "rmssd": 12.02,   "sdnn": 16.5,   "ibi_window_ms": [800, 820, 780, 790, ...],   "accel_snapshot": {"ax": 2.1, "ay": -0.4, "az": 9.2, "impact": true},   "skin_contact": true,   "owner_proximity": false,   "device_fw": "v0.6.1",   "device_cert": "CERT123456",   "signature": "MEUCIQD... (ECDSA signature of payload)" }`

- **Verificación:** backend valida `device_cert` contra CA interna y verifica `signature` con la clave pública del device.
    

---

# 14. Pseudocódigo completo (implementación reference)

`LOOP every SAMPLE_PERIOD:   read PPG samples -> detectó beats -> store timestamps t_i   read IMU snapshot   if not skin_contact(): continue    if elapsed_window >= WINDOW_Más:     ibi = compute_IBI(timestamps)     rmssd = compute_RMSSD(ibi)     sdnn = compute_SDNN(ibi)     hr = 60000 / mean(ibi)     baseline = read_baseline_from_NVS()      riesgo = 0     if hr >= 120: riesgo += 2     else if hr >= 100: riesgo += 1     if rmssd < 15 or rmssd < 0.6 * baseline.rmssd: riesgo += 2     if sdnn < 20: riesgo += 1     if imu_indicates_violent_movement(): riesgo += 1     if owner_proximity(): riesgo -= 2      if riesgo >= 3 and persisted_for >= VOTE_TIME:       trigger_critical_protocol(payload)     elif riesgo == 2 and persisted_for >= VOTE_TIME:       trigger_moderate_protocol(payload)     else:       log_normal(payload)`

---

# 15. Firmware — acciones concretas a implementar en device (lista técnica)

1. Integrar lectura PPG (lib adecuada) y beat detection robusta (pre-filtrado, motion artifact rejection).
    
2. Implementar skin_contact check (Irá threshold).
    
3. Implementar buffer circular de timestamps y cálculo RMSSD/SDNN/HR.
    
4. Store baseline en NVS; actualizaciones y fallbacks.
    
5. Secure signing: integrar ATECC + esquema de firma ECDSA en todos los eventos críticos.
    
6. Implementar soft-lock flags en NVS/secure storage. APIs locales para override (PIN + owner NFC).
    
7. Comunicación: MQTT over TLS (mTLS) o HTTPS + client cert. Retries y cache si offline.
    
8. Power management: no agotar batería por mediciones continuas; usar duty cycle adaptativo.
    
9. UI feedback local (vibración, LED, pantalla).
    
10. Tests unitarios y bench tests con datasets sintéticos.
    

---

# 16. Panel Eris & Flujos Humanos (SOP operativo)

- **Operador** consulta ticket con payload firmado. Visual: timeline, HR/HRV chart, accel snapshot, owner proximity map.
    
- **Acciones del operador:** contactar owner, pedir confirmación, autorizar revertir soft-lock; si owner no responde y riesgo verificado → contactar contactos o autoridad.
    
- **Registro:** cada acción queda registrada con usuario, timestamp, y justificación.
    
- **Escalado:** si se contacta autoridad, adjuntar paquete forense y registrar folio.
    

---

# 17. Plan de pruebas (QA / Red Team / Calibration)

1. **Unit tests:** beat detection, RMSSD calculation (deterministic vectors).
    
2. **Bench tests:** datasets con latidos reales y artefactos; medir false positive rate.
    
3. **Simulaciones controladas:** voluntarios sanos, escenarios de extracción simulada, prestar a otra persona. Recalibrar umbrales.
    
4. **Pruebas de integración:** secure signing, network outages, key rotation.
    
5. **Red Team:** intentos de abuso (spoof owner tag, inject false sensor values, replay attacks).
    
6. **Field trials (beta):** 100 devices en Chile con consentimiento, medir KPIs por 4 semanas.
    
7. **KPIs a medir:** tasa falsos positivos (<5%), tiempo medio detección→notificación (<30 s), porcentaje eventos con intervención humana, porcentaje revertidos por owner.
    

---

# 18. Checklist de despliegue mínimo viable (MVP)

-  Consentimiento legal y texto T&C en español (Chile).
    
-  Firmware básico con PPG + RMSSD + skin_contact + signing.
    
-  Backend Eris con verificación firma y panel básico de tickets.
    
-  Push/SMS gateway y contactos de emergencia en app.
    
-  SOP operador y plantillas de notificación.
    
-  Plan de pruebas y dataset de calibración.
    
-  Auditoría de seguridad y revisión ética pre-lanzamiento.
    

---

# 19. Riesgos principales y mitigaciones (resumen rápido)

- **Falsos positivos:** baseline + IMU + voting temporal + skin_contact.
    
- **Abuso / perfilamiento:** control de acceso y comité de ética.
    
- **Problemas legales:** no entregar datos sin orden; asesoría legal.
    
- **Problema de seguridad física:** no recomendar hard-locks automáticos. Priorizar seguridad de la persona.
    

---

# 20. Roadmap y entregables (priorizado, 0–90 días)

**0–7 días**

- Documento de consentimiento y T&C en español.
    
- Firmware PoC: PPG → IBI → RMSSD + envío de eventos no firmados.
    

**7–21 días**

- Integración ATECC (firma), soft-lock y lógica de puntos de riesgo.
    
- Backend Eris básico: verificación firma, almacenamiento cifrado y panel de tickets.
    

**21–60 días**

- UX app para baseline, configuración de sensibilidad y contactos.
    
- Pruebas de calibración con cohort de voluntarios (n=50–100).
    
- Red team y patching.
    

**60–90 días**

- Beta pública controlada (n=100–500 dispositivos), iteración de umbrales y reducción FP.
    
- Preparar paquete legal y SOP para escalado a autoridades.
    

---

# 21. Apéndice A — Cálculos RMSSD (fórmulas)

- `ibi_i = t_{i+1} - t_i`
    
- `Δ_i = ibi_{i+1} - ibi_i`
    
- `RMSSD = sqrt( (1/(M)) * Σ (Δ_i^2) )` donde `M = number of Δ_i`.
    

---

# 22. Apéndice B — Puntos de integración con AXS (cómo esto empuja la visión)

- **I+D:** oportunidad de patentar sensor-fusion privada y algoritmos de detección on-device.
    
- **Comercial:** posicionar Ghost como “seguro y protector” — ventaja frente a competidores.
    
- **Operaciones / Legal:** establecer partnerships con aseguradoras y fuerzas públicas locales (Chile).
    
- **Marketing:** campaña basada en seguridad y privacidad: “AXS protege a las personas, no las perfila.”
    
- **Ciencia:** publicar whitepaper sobre ética y método de detección (educativo y posicionamiento académico).
    

---

# 23. Próximos pasos recomendados (acción inmediata)

1. Acordar versión MVP y recursos (hardware prototipos: 10 dispositivos).
    
2. Preparar consentimiento legal con abogado chileno.
    
3. Implementar firmware PoC basado en sketch (incluido en versiones previas de conversaciones).
    
4. Diseñar plan de field trial con indicadores y criterios de éxito.
    

---

# 24. Contactos y responsabilidades (template)

- **Responsable I+D (AXS):** [Nombre] — prototipado y firmware.
    
- **Responsable Backend (AXS):** [Nombre] — Eris + verificación firma.
    
- **Responsable Legal (AXS):** [Abogado] — consentimiento, entregas a autoridades.
    
- **Responsable Operaciones:** [Nombre] — panel de incidentes y SOP.
