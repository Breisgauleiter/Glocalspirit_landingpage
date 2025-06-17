# 📋 GlocalSpirit Landing Page - TODO_LATER
## Langfristige Optimierungen & Content-Verbesserungen

> **Erstellt:** 17. Juni 2025  
> **Zweck:** Langfristige Features und Optimierungen ausgelagert aus Haupt-TODO  
> **Priorität:** Niedrig - Nach Backend-Deployment und Phase 3 Abschluss

---

## 🎨 **Phase 2: Wireframe-Konformität** *(4-6 Stunden)*

### Hero-Sektion erweitern
- [ ] **Video-Element implementieren**
  - [ ] Video-Dateien beschaffen oder YouTube-Link definieren
  - [ ] Background-Video oder Embedded-Video entscheiden
  - [ ] Video-Element in Hero-Sektion einbauen
  - [ ] Fallback für mobile Geräte (statisches Bild)
  - [ ] Autoplay und Loop-Funktionalität

- [ ] **Produkt/Service-Beschreibung verbessern**
  - [ ] Klarere Headline unter dem Hero-Title
  - [ ] Kurze, prägnante Beschreibung hinzufügen
  - [ ] CTA-Button im Hero-Bereich

### About-Sektion überarbeiten
- [ ] **Company/Project-Information strukturieren**
  - [ ] Weniger icon-fokussiert, mehr text-basiert
  - [ ] Klarere Informationsarchitektur
  - [ ] Bessere Content-Hierarchie
  - [ ] Responsive Text-Layout optimieren

### CTA-Optimierung
- [ ] **Conventional Form Design**
  - [ ] SVG-Button-Design durch standard Forms ersetzen
  - [ ] Klarere Call-to-Action-Texte
  - [ ] Form-Styling konsistent gestalten
  - [ ] Better visual hierarchy für CTAs

---

## 🔍 **Phase 4: Content & SEO** *(2-3 Stunden)*

### SEO-Optimierung
- [ ] **Meta-Tags vervollständigen**
  - [ ] Open Graph tags hinzufügen
  - [ ] Twitter Card meta tags
  - [ ] Favicon implementieren
  - [ ] Robots.txt erstellen
  - [ ] Sitemap.xml generieren

- [ ] **Semantic HTML verbessern**
  - [ ] Alt-Texte für alle Bilder vervollständigen
  - [ ] ARIA-labels für Accessibility
  - [ ] Heading-Hierarchie überprüfen (h1, h2, h3...)
  - [ ] Schema.org structured data

### Performance finalisieren
- [ ] **Asset-Optimierung**
  - [ ] Image optimization (WebP, lazy loading)
  - [ ] Critical CSS inline implementieren
  - [ ] Font-loading optimieren
  - [ ] Gzip/Brotli compression check

---

## 🚀 **Phase 5: Performance & Code-Optimierung** *(2-3 Stunden)*

### Performance (später)
- [ ] **GSAP Bundle optimieren**
  - [ ] Alle 6 GSAP-Scripts analysieren (welche werden wirklich benötigt?)
  - [ ] Nicht verwendete GSAP-Plugins entfernen
  - [ ] GSAP-Scripts in eine minifizierte Datei zusammenfassen
  - [ ] CDN-Requests von 6 auf 1-2 reduzieren

- [ ] **Debug-Code aus Production entfernen**
  - [ ] Eruda debugging tool entfernen (`<script src="https://cdn.jsdelivr.net/npm/eruda">`)
  - [ ] Console.log statements in animations.js bereinigen
  - [ ] Console.log statements in app.js bereinigen

- [ ] **Memory Leaks beheben**
  - [ ] Resize Event Listeners in animations.js optimieren
  - [ ] ScrollTrigger cleanup beim Resize verbessern
  - [ ] Event Listener proper cleanup in app.js
  - [ ] Card listeners detach/attach Mechanismus optimieren

### Code Quality (später)
- [ ] **CSS aufräumen**
  - [ ] Auskommentierte Styles in style.css entfernen
  - [ ] Auskommentierte Styles in tablets.css entfernen
  - [ ] Auskommentierte Styles in smallscreens.css entfernen
  - [ ] Unused CSS classes identifizieren und entfernen

- [ ] **JavaScript Error-Handling**
  - [ ] DOM-Queries in app.js mit null-checks absichern
  - [ ] DOM-Queries in animations.js mit null-checks absichern
  - [ ] Try-catch blocks für kritische Funktionen hinzufügen

---

## 🧪 **Phase 6: Testing & Launch** *(1-2 Stunden)*

### Cross-Browser Testing
- [ ] **Browser-Kompatibilität**
  - [ ] Chrome/Edge/Firefox Desktop testing
  - [ ] Safari Desktop testing
  - [ ] Mobile Safari testing
  - [ ] Chrome Mobile testing

### Performance Testing
- [ ] **Lighthouse Audit**
  - [ ] Performance Score > 90
  - [ ] Accessibility Score > 95
  - [ ] Best Practices Score > 90
  - [ ] SEO Score > 90

### Final Checks
- [ ] **Deployment-Vorbereitung**
  - [ ] Production-Build erstellen
  - [ ] Environment-spezifische Konfiguration
  - [ ] Analytics-Integration (Google Analytics/Matomo)
  - [ ] Error-Monitoring (Sentry o.ä.)

---

## 📊 **ZUSÄTZLICHE SPENDEN-FEATURES (Optional - später)**

### Erweiterte Spenden-Funktionalität
- [ ] **Webhook-Backend für Abo-Management**
  - [ ] `docs/submit_spenden.php` - Stripe Webhook-Handling
  - [ ] Teams-Integration für neue Abonnements  
  - [ ] Automatische E-Mail-Bestätigung für Spender
  - [ ] Abo-Verwaltung und Kündigungsoptionen

- [ ] **Erfolgs-/Fehler-Seiten**
  - [ ] `docs/spenden-erfolg.html` - Success Page nach Payment
  - [ ] `docs/spenden-fehler.html` - Error Handling Page
  - [ ] Weiterleitung von Stripe Checkout zurück zur Website

- [ ] **Spenden-Button auf Hauptseite verlinken**
  - [ ] Bestehenden `.form2` Button zu funktionalem Link umbauen
  - [ ] `href="spendenformular.html"` in index.html hinzufügen
  - [ ] CSS-Klasse für Link-Styling anpassen
  - [ ] Hover-States und Animationen beibehalten

---

## 🌍 **INTERNATIONALISIERUNG IMPRESSUM/DATENSCHUTZ** *(Optional - später)*

### Rechtliche Seiten übersetzen
- [ ] **Englische Versionen erstellen**
  - [ ] `docs/impressum-en.html` - English Imprint/Legal Notice
  - [ ] `docs/privacy-en.html` - English Privacy Policy
  - [ ] Internationale rechtliche Anforderungen berücksichtigen
  - [ ] UK GDPR vs EU GDPR Unterschiede beachten

- [ ] **Footer-Navigation erweitern**
  - [ ] Sprachauswahl für Impressum/Datenschutz implementieren
  - [ ] Links je nach aktiver Sprache anzeigen
  - [ ] URL-Struktur: `/impressum` vs `/impressum-en`

- [ ] **Weitere Sprachen (bei Bedarf)**
  - [ ] Französisch (`impressum-fr.html`, `privacy-fr.html`)
  - [ ] Spanisch (`impressum-es.html`, `privacy-es.html`)  
  - [ ] Alle anderen i18n-Sprachen nach Nutzerbedarf
  - [ ] **Rechtliche Beratung** für jedes Land erforderlich

- [ ] **JavaScript-Integration**
  - [ ] i18n-ultra-simple.js erweitern für rechtliche Seiten
  - [ ] Automatische Weiterleitung je nach Browser-Sprache
  - [ ] Fallback auf deutsche Version bei nicht verfügbarer Übersetzung

### Rechtliche Überlegungen
- [ ] **Compliance pro Land prüfen**
  - [ ] Deutschland: TMG-konform ✅ (bereits erledigt)
  - [ ] UK: Companies Act requirements
  - [ ] USA: State-specific disclosure requirements  
  - [ ] EU: GDPR-konforme Übersetzungen
  - [ ] **Anwaltliche Prüfung** für internationale Versionen

**💡 Empfehlung:** Zunächst DE + EN implementieren (deckt ~80% der Nutzer ab)
**⏱️ Geschätzter Aufwand:** 60-90 Min für DE + EN Versionen

---

## 📝 **Notizen & Entscheidungen**

### Technische Entscheidungen:
- [ ] **Video-Format entscheiden:** MP4 Background vs. YouTube Embed
- [ ] **Analytics-Tool entscheiden:** Google Analytics vs. Matomo vs. Privacy-focused Alternative

### Design-Entscheidungen:
- [ ] **CTA-Button Style:** Conventional vs. Current SVG-Approach
- [ ] **Mobile-First vs. Desktop-First:** Responsive Breakpoints review

---

## 📊 **Fortschritt-Tracking Später**

**Gesamtfortschritt später:** 0/65 Tasks (0%) ⏱️

### Phase-Fortschritt später:
- **Phase 2:** 0/15 Tasks (0%) ⏱️ *0/6 Stunden*
- **Phase 4:** 0/13 Tasks (0%) ⏱️ *0/3 Stunden*  
- **Phase 5:** 0/12 Tasks (0%) ⏱️ *0/3 Stunden*
- **Phase 6:** 0/8 Tasks (0%) ⏱️ *0/2 Stunden*
- **Zusätzliche Spenden:** 0/12 Tasks (0%) ⏱️ *0/2 Stunden*
- **Entscheidungen:** 0/5 Tasks (0%) ⏱️ *0/1 Stunden*

---

## 🎯 **Wann diese Tasks angehen?**

**Nach Abschluss von:**
1. ✅ Backend-Deployment auf Strato
2. ✅ Phase 3 vollständig abgeschlossen
3. ✅ Grundlegende Funktionalität getestet
4. ✅ Erste User-Tests erfolgreich

**Priorisierung für später:**
1. **Phase 4 (SEO)** - für bessere Auffindbarkeit
2. **Phase 2 (Content)** - für bessere User Experience  
3. **Phase 5 (Performance)** - für optimale Performance
4. **Phase 6 (Testing)** - vor größerem Launch

---

*Ausgelagert aus Haupt-TODO am 17. Juni 2025 - Fokus auf kritische Features*
