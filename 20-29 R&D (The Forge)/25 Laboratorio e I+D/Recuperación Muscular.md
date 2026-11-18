---
owner: Eris
tier: Técnico
status: Activo
estado: Parcial
---

# 💪 Recuperación Muscular (Muscle Recovery Evidence)

↑ [[20-29 R&D (The Forge)/25 Laboratorio e I+D/25 - Laboratorio e I+D.md|25 — Laboratorio e I+D]]

#AXS/Salud #AXS/Producto

## 🎯 Misión
Decir con honestidad cómo viene cada músculo: con evidencia, con los datos de cada persona y sin un número fijo. Sale de una objeción del fundador (2026-11-06): Forge lo marcó «listo» mientras tenía agujetas, y dudó de que 48 horas sirvieran para todos. Tenía razón: el «listo» contaba días de calendario y salió unas 26 horas después de entrenar.

## 🔬 Lo que dice la evidencia
- **Las agujetas son un proceso normal y no equivalen a un músculo sin recuperar, en quien entrena seguido.** Con 6 series de banca, la velocidad volvió entre 24 y 48 h mientras el dolor seguía. Con 6 series al fallo en 3 ejercicios, a las 48 h el dolor estaba en su peak y el rendimiento ya no difería de forma significativa.
- **En quien no está acostumbrado sí pesa:** en sedentarios la fuerza siguió entre −13 % y −49 % al cuarto día, y el segundo intento dañó mucho menos. Con semanas de entreno regular el daño baja.
- **El esfuerzo manda:** sin llegar al fallo, recuperación a las 6 h; al fallo, banca hasta 48 h y salto hasta 72 h.
- **Hay gente muy distinta:** con el mismo estímulo, 21 de 29 personas no se recuperaron a las 48 h y 8 casi no cambiaron. Por eso se mide a cada uno.
- **Un sistema no dice cómo está otro:** el pulso y la variabilidad vuelven antes que el músculo; no sirven para juzgarlo.
- **Lo que no se sabe:**
  - no hay fórmula validada que junte sueño, comida y estrés, por eso van como aviso y no como horas;
  - no se encontró un estudio que responda directamente si entrenar con agujetas agrava el daño. Lo más cercano: 3 días consecutivos a la semana durante 12 semanas dieron la misma fuerza y masa que días alternos.
- **Creatina:** una revisión narrativa dice que «puede» ayudar, pero el meta-análisis de 13 estudios no halló efecto en fuerza ni dolor hasta 96 h. No entra al cálculo.
- **Proteína:** comerla cerca del entreno conserva fuerza y baja el marcador de daño, pero no reduce el dolor (hombres jóvenes; faltan datos en mujeres).
- **Alarma:** dolor muy fuerte, mucha hinchazón u orina oscura ya no son agujetas normales (rabdomiólisis): hay que consultar.

## ⚙️ El modelo
Rango estimado por lo que se hizo (estimación propia a partir de los estudios, no un dato de ellos):

| Sesión | Rinde normal entre |
| --- | --- |
| Poco y lejos del fallo | 12 y 24 h |
| 4 series o más, o 3 cerca del fallo | 24 y 48 h |
| 6 series o más, cerca del fallo | 48 y 72 h |
| No lo entrena seguido | el máximo sube 24 h |

Encima de eso:
- **Lo que dice la persona manda:** «me limita» deja el músculo cargado; «agujetas» no cambia la estimación; «sin molestia» lo da por recuperado solo si ya pasó el mínimo.
- **Lo que aprende de cada uno:** cada vez que repite un ejercicio compara su primera serie con la anterior, según las horas desde que trabajó ese músculo y si tenía agujetas. Con 3 comparaciones parecidas lo dice y corrige el rango. Si no hay datos, lo dice en vez de inventar.
- **Nunca bloquea el entreno.**

## 💻 Implementación Actual

| Responsabilidad | Archivo |
| --- | --- |
| Rango, estados, aprendizaje y pregunta | `eris-mobile/src/services/forge/forgeRecovery.ts` |
| Mapa y hoja del músculo | `eris-mobile/src/screens/forge/MuscleMap.tsx` |
| Pregunta de un toque | `eris-mobile/src/screens/forge/tabs/Entrenar.tsx` |
| Respuesta en el chat | `eris/src/services/EntrenoChat.ts` |
| Pruebas | `eris-mobile/tests/forge_recuperacion.test.ts` |

## 📊 Datos reales del fundador (2026-11-06)
- 9 días con series desde junio; con hora y RIR solo desde el 18 de octubre; casi siempre a 0–1 repeticiones del fallo.
- Vuelve a cada músculo cada 8 a 17 días, así que todavía no se puede medir su recuperación corta. La app lo dice.
- La hipótesis del fundador («con costumbre el músculo rinde igual y solo es incómodo») está respaldada en gente entrenada, pero él entrena cada músculo poco seguido: hay que comprobarlo con sus propios datos.

## 📚 Fuentes
**Leídas completas:**
- Refalo y otros, 2023, *Sports Medicine – Open* (PMC9908800).
- Flatt y otros, 2019, *Sports* (PMC6835520).
- Morán-Navarro y otros, 2017, *Eur J Appl Physiol*.
- *Sports*, 2026, volumen en atletas jóvenes (PMC13119994).
- Wilke y Behringer, 2021, *Int J Mol Sci* (PMC8431437; hipótesis de la fascia).
- Días consecutivos vs alternos, 2018, *Front Physiol* (PMC6015912; discusión y métodos).

**Leídas en parte (discusión o resultados):**
- Variabilidad individual, 2023, *Front Physiol* (PMC10803508).
- Refalo y otros, 2025, *Eur J Sport Sci* (PMC11832030).
- Craven y otros, 2022, *Sports Med*.
- Wax y otros, 2021, *Nutrients* (PMC8228369).
- Rabdomiólisis, 2017, *Sports Med* (PMC5371628).
- Pearson y otros, 2023, *Eur J Clin Nutr* (PMC10393778; proteína cerca del entreno: conserva fuerza, no reduce el dolor; solo hombres jóvenes).

**Solo el resumen (de pago o bloqueadas):**
- Northeast y Clifford, 2021 (PMID 33631721).
- Eur J Sport Sci 2021 (PMID 32594858).
- Ahtiainen 2011 (PMID 21311349).
- Soares 2015 (PMID 25807025).
- Chen 2019 (PMID 30663816).
- Damas 2016 (PMID 27219125 y 27116346).
- Pelland 2026 (PMID 41343037).
- Stults-Kolehmainen 2014 (PMID 24343323).
- Lamon 2021 (PMID 33400856).
- Knowles 2018 (PMID 29422383).
- Dáttilo 2020 (PMID 31469710).
- Vieira 2022 (PMID 34881412).
- Varela-Olalla 2025 (PMID 40644670).
