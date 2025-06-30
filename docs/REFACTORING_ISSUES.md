# 🛠️ Refactoring Roadmap & Issues für GlocalSpirit Landingpage

## 1. JavaScript-Code-Duplikation beseitigen

### Issue 1.1: Safari-Fixes konsolidieren
- [ ] **Alte Dateien entfernen:** `safari-fixes.js`, `safari-fixes-production.js`
- [ ] **Alle Seiten auf `safari-fixes-unified.js` umstellen**
- [ ] **Debug/Production-Config per globalem Flag steuerbar machen**
- [ ] **Unit-Tests für alle Fixes schreiben**

### Issue 1.2: Animation-Code vereinheitlichen
- [ ] **Alte Animation-Dateien entfernen:** `testform-animations.js`, `testform-animations-optimized.js`, `testformular-animations.js`, `spenden-animation.js`
- [ ] **Alle Animationen in `animation-factory.js` bündeln**
- [ ] **Alle Seiten auf Factory-Pattern umstellen**
- [ ] **GSAP-Initialisierung zentralisieren**

### Issue 1.3: i18n vereinfachen
- [ ] **Alte i18n-Dateien entfernen:** `i18n-ultra-simple.js`, `i18n-simple.js`, `i18n.js`, `i18n-prepare.js`, `i18n-production.js`
- [ ] **Modulares System (`i18n-modular.js`) überall verwenden**
- [ ] **Sprachdateien in `/locales/{lang}/` auslagern**
- [ ] **Lazy Loading für Übersetzungen aktivieren**

## 2. CSS-Optimierung & Utility-Klassen

### Issue 2.1: Glassmorphism & Backdrop-Filter vereinheitlichen
- [ ] **Alle doppelten CSS-Regeln durch Utility-Klassen ersetzen**
- [ ] **`utilities.css` überall importieren**
- [ ] **Alte, redundante CSS entfernen**

### Issue 2.2: Responsive Breakpoints standardisieren
- [ ] **Alle Media Queries auf Standard-Breakpoints umstellen**
- [ ] **Responsive Utilities (`utilities.css`) nutzen**
- [ ] **Inkonsistente Breakpoints entfernen**

## 3. Dateiorganisation & Struktur

### Issue 3.1: JS-Files restrukturieren
- [ ] **Neue Ordnerstruktur anlegen (`core/`, `features/`, `i18n/`, `utils/`, `legacy/`)**
- [ ] **Dateien verschieben und umbenennen**
- [ ] **Alte, nicht mehr genutzte Dateien löschen**

### Issue 3.2: HTML-Referenzen anpassen
- [ ] **Alle `<script>`- und `<link>`-Tags auf neue Struktur anpassen**
- [ ] **Testen, ob alle Seiten weiterhin funktionieren**

## 4. Formulare & Validierung

### Issue 4.1: Form-Validation vereinheitlichen
- [ ] **Zentrale Validation-Utils erstellen**
- [ ] **Alle Formulare auf Utility-Pattern umstellen**
- [ ] **Fehlermeldungen i18n-fähig machen**

## 5. Testing & Qualitätssicherung

### Issue 5.1: Automatisierte Tests für alle Module
- [ ] **Unit-Tests für alle neuen Module schreiben**
- [ ] **Responsives Verhalten automatisiert testen**
- [ ] **Cross-Browser-Tests (Safari, Chrome, Firefox, Edge)**

---

## 📅 **Empfohlene Reihenfolge**
1. Konsolidierung & Utilities (JS/CSS)
2. Dateiorganisation & HTML-Refactoring
3. i18n & Formulare
4. Testing & Clean-Up

---

**Jedes Issue kann als eigenes GitHub/GitLab-Issue übernommen werden.**

**Tipp:** Für jedes Issue ein eigenes Branch anlegen und Pull-Request nutzen!
