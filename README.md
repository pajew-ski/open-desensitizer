# Open Desensitizer

> **Ein Open-Source Tool für Bilaterale Stimulation, Stressreduktion und Trauma-Integration.**

[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)
[![Status: Live](https://img.shields.io/badge/Status-Live_Demo-green)](https://pajew-ski.github.io/open-desensitizer/)

**Open Desensitizer** ist eine minimalistische Web-Applikation für **Bilaterale Stimulation** (ähnlich dem visuellen und auditiven Teil von EMDR). Sie nutzt rhythmische Augenbewegungen und alternierende Töne, um die Kommunikation zwischen den Gehirnhälften zu synchronisieren, die Amygdala-Aktivität zu dämpfen und Stress oder belastende Emotionen zu verarbeiten.

**Live Demo:** [https://pajew-ski.github.io/open-desensitizer/](https://pajew-ski.github.io/open-desensitizer/)

---

## Das Konzept

Wenn wir gestresst sind oder starke Emotionen verarbeiten, ist unser rationales Denken (Präfrontaler Cortex) oft vom emotionalen Zentrum (Amygdala) abgekoppelt. Bilaterale Stimulation hilft dabei, diese Blockade zu lösen.

* **Visuell:** Das Verfolgen eines sich bewegenden Objekts mit den Augen imitiert den **REM-Schlaf** (Rapid Eye Movement), den natürlichen Verarbeitungsmechanismus des Gehirns.
* **Auditiv:** Panning-Sounds (Links/Rechts) unterstützen die neurologische Integration zusätzlich.
* **Souverän:** Ein Werkzeug zur Selbstregulation, das zu 100% dir gehört. Keine Clouds, keine Tracker, volle Kontrolle.

---

## Features

* **Visuelle Stimulation:** Anpassbare Geschwindigkeit (Hz), Objektgröße und Farbe für die Augenführung.
* **Auditive Stimulation:** Optionaler Sinuston, der synchron zur Bewegung zwischen dem linken und rechten Ohr wandert (Web Audio API Panning).
* **Safety Anchor (Not-Aus):** Ein integrierter **Grounding-Modus**. Wenn eine Session zu intensiv wird, führt dich die Leertaste sofort in eine geführte Atemübung zur Stabilisierung zurück.
* **Adaptives UI:** Wähle zwischen einem klaren **Light Mode** (klinisch/fokussiert) und einem augenschonenden **Dark Mode** (entspannt/Nacht).
* **Privacy First:** Die App läuft vollständig lokal in deinem Browser. Deine emotionalen Prozesse gehen niemanden etwas an.

---

## Nutzung

1.  **Vorbereitung:** Setze dich bequem hin. Wenn du Audio nutzen möchtest, trage Kopfhörer.
2.  **Einstellung:**
    * Wähle eine Geschwindigkeit, die angenehm, aber fordernd für die Augen ist (meist 0.5 Hz - 1.0 Hz).
    * Wähle eine Farbe, die du als beruhigend empfindest (Standard ist "smaragdgrün").
3.  **Start:** Drücke "Session Starten" oder nutze den Vollbildmodus [F].
4.  **Prozess:** Halte den Kopf still und folge dem Punkt nur mit den Augen. Denke an das Thema, das du bearbeiten möchtest (Desensibilisierung) oder nutze es einfach zur Entspannung (Ressourcierung).
5.  **Notfall:** Sollten die Gefühle überwältigend werden, drücke die **LEERTASTE**. Der Schirm wird grün, die Bewegung stoppt, und eine Atem-Hilfe erscheint.

---

## Wichtiger Haftungsausschluss

**Dieses Tool ist "Biohacking"-Software zur Selbsthilfe und Stressregulation.**

* Es ersetzt **keine** professionelle Traumatherapie.
* Nutze es nicht, wenn du an **Epilepsie** oder schweren dissoziativen Störungen leidest, ohne vorherige ärztliche Absprache.
* Die Nutzung erfolgt auf eigene Verantwortung.

---

## Installation (Lokal)

Da es sich um eine einzelne HTML-Datei handelt ("Single File Component"), ist die Installation trivial:

```bash
# Repository klonen
git clone [https://github.com/pajew-ski/open-desensitizer.git](https://github.com/pajew-ski/open-desensitizer.git)

# Öffnen
cd open-desensitizer
open index.html
````

-----

## Tech Stack

  * **HTML5 Canvas:** Für flüssige 60fps Animationen.
  * **Web Audio API:** Für präzises Stereo-Panning.
  * **Vanilla JS:** Keine Frameworks, keine Abhängigkeiten.
  * **CSS Variables:** Für dynamisches Theming.

-----

## Lizenz

Dieses Projekt ist unter der **Unlicense** veröffentlicht. Das bedeutet, es ist **Public Domain**. Du kannst den Code kopieren, verändern, verkaufen oder als Basis für eigene (kommerzielle oder private) Projekte nutzen, ohne um Erlaubnis zu fragen.

Wissen und Werkzeuge zur Heilung sollten frei sein. Dieses Werkzeug soll jedem frei zur Verfügung stehen, der Heilung oder Ruhe sucht.

-----

Made with 🤍 in Regensburg.
