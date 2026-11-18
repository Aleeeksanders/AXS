---
owner: Eris
tier: Técnico
status: Concepto
estado: Visión
---

# 🛒 **Lista de compras — GhostRing v0.1**

↑ [[10-19 Strategic Vision/11 Visión de Producto/11 - Visión de Producto.md|Visión de Producto]]

> ⚪ **Visión, aún no construido.** Es parte de hacia dónde va AXS; todavía no existe en el código. Lo construido está en [[20-29 R&D (The Forge)/20 - The Forge.md|The Forge]].

#AXS/Producto
## 1. **Electrónica central**

- **MCU BLE (cerebro):**
    
    - Nordic **nRF52840 DK** (dev board para programar/ensayar). [Mouser/DigiKey]
        
    - Para montaje real: **nRF52832/840 WLCSP** (33 mm).
        
- **IMU (movimiento/gestos):**
    
    - Bosch **BMI270** o ST **LSM6DSO** (2.530.8 mm). [Adafruit/SparkFun/DigiKey]
        
- **Háptica:**
    
    - ERM vibrador mini 48 mm (Precision Microdrives, Mouser).
        
    - O **piezo coin** ultrafino (si quieres feedback más sutil).
        
- **Batería:**
    
    - LiPo 20–30 mAh, 31210 mm aprox. [Adafruit / SparkFun / Mouser].
        
- **Carga:**
    
    - Bobina inductiva flexible 8–10 mm (SparkFun, DigiKey).
        
    - IC de carga: TI **BQ24074** (clásico en wearables).
        

## 2. **Carcasa**

- **Cerámica técnica (ZrO₂) OEM vacía** (tipo Oura).
    
    - Buscar en Alibaba: “zirconia ceramic smart ring shell OEM”.
        
    - Alternativa maker: **impresión 3D en resina** → luego recubrimiento epóxico para biocompatibilidad.
        

## 3. **PCB**

- Rigid-flex (al menos 2 capas flex + 2 islas rígidas).
    
    - **Proveedor:** JLCPCB, OSH Park, Seeed.
        
    - Tamaño target: arco 240° → ancho 2–2.5 mm, pads para MCU + IMU + batería.
        

## 4. **Extras**

- Resina epóxica biocompatible (sellado).
    
- Juntas O-ring micro.
    
- Cinta de grafito (para balance térmico si hace falta).
    

---

# 🛠️ **Herramientas necesarias**

- Estación de soldadura fina + aire caliente.
    
- Microscopio/lupa de soldadura (WLCSP es pequeño).
    
- Multímetro.
    
- Cargador programable de baterías.
    
- Programador/debugger: Segger J-Link o ST-Link.
    
- Impresora 3D (opcional, para carcasa temporal).
    

---

# ⚙️ **Plan de operaciones — GhostRing v0.2**

### 🔹 **Fase 0 – Preparación (Semana 0–1)**

- Ordena todos los componentes (Nordic DK para desarrollo inmediato, IMU, vibrador, batería, bobina).
    
- Pide 2–3 carcasas cerámicas OEM vacías en Alibaba (tiempo 2–3 semanas).
    

### 🔹 **Fase 1 – Firmware básico (Semana 1–2)**

- Con el **nRF52840 DK**, programa:
    
    - Conexión BLE estable.
        
    - Lectura del IMU (ejes básicos).
        
    - Vibración como feedback.
        
- Meta: “doble tap detectado” → vibración.
    

### 🔹 **Fase 2 – Electrónica compacta (Semana 2–4)**

- Diseña PCB rigid-flex en KiCad/Altium.
    
- Envía a JLCPCB (pide 5–10 unidades).
    
- Monta componentes → test funcionalidad.
    

### 🔹 **Fase 3 – Integración física (Semana 4–6)**

- Inserta PCB + batería + bobina en carcasa cerámica.
    
- Sella con resina epóxica + O-ring.
    
- Prueba ergonomía + autonomía (target 24–48 h).
    

### 🔹 **Fase 4 – Validación GhostProtocol (Semana 6+)**

- Conecta gring a móvil/PC (mock gwatch).
    
- Mapea gestos → acciones (swipe = cambiar slide, tap = confirmar).
    
- Feedback háptico inmediato.
    

---

# 📦 Proveedores directos (links tópicos)

- **Mouser/DigiKey** → Nordic DK, IMU, drivers, ERM, ICs de carga.
    
- **Adafruit/SparkFun** → sensores, baterías pequeñas, bobinas de carga.
    
- **Alibaba/Aliexpress** → carcasas cerámicas OEM vacías.
    
- **JLCPCB** → fabricación PCB rigid-flex.
- **Adafruit/SparkFun** → sensores, baterías pequeñas, bobinas de carga.
    
- **Alibaba/Aliexpress** → carcasas cerámicas OEM vacías.
    
- **JLCPCB** → fabricación PCB rigid-flex.
    

---

# 🎯 Hito clave ASAP

👉 En **2–4 semanas**, con dev board + IMU + ERM + batería externa, ya tendrs un **“proto GhostRing”** en la mesa.  
👉 En **6–8 semanas**, con carcasa OEM, tendrs el **primer GhostRing usable en dedo**.

## 🔒 Protocolo de Seguridad Biométrica
→ [[40-49 Standards & SOPs/Protocolo AXS — Detección HRV HR.md|Protocolo HRV/HR — Detección de Riesgo]]
