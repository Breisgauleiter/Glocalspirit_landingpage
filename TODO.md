# 📋 GlocalSpirit Landing Page - Entwicklungs-TODO

> **Projekt:** GlocalSpirit Landing Page Optimierung  
> **Start:** 16. Juni 2025  
> **Geschätzte Fertigstellung:** 6 Arbeitstage (11-16 Stunden)

---

## 🎯 **Phase 1: CTA-Funktionalität (PRIORITÄT)** *(3-4 Stunden)*

### Testen-Button Funktionalität
- [ ] **Testformular-Unterseite erstellen**
  - [ ] Neue HTML-Seite `/test-registration.html` erstellen
  - [ ] Testformular mit allen nötigen Feldern (Name, Email, Telefon, Motivation)
  - [ ] Navigation von Testen-Button zur Unterseite
  - [ ] Responsive Design für Testformular
  - [ ] Zurück-zur-Hauptseite Navigation

- [ ] **Testen-Button verlinken**
  - [ ] Aktuellen SVG-Button zu funktionalem Link umbauen
  - [ ] Link zu `/test-registration.html` einrichten
  - [ ] Hover-States und Animationen beibehalten
  - [ ] Mobile Touch-Optimierung

### Spenden-Button Funktionalität
- [ ] **Payment-Integration wählen**
  - [ ] PayPal vs. Stripe Entscheidung treffen
  - [ ] Account-Setup (PayPal Business oder Stripe)
  - [ ] Integration-Methode festlegen (direkt vs. externe Seite)

- [ ] **Spenden-Formular implementieren**
  - [ ] PayPal Donate Button einbauen ODER
  - [ ] Stripe Payment Form einbauen ODER  
  - [ ] Weiterleitung zu externer Spenden-Seite
  - [ ] Verschiedene Spendenbeträge anbieten
  - [ ] Erfolgs-/Fehler-Seiten erstellen

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

## ⚙️ **Phase 3: Funktionalität & UX** *(3-4 Stunden)*

### Navigation verbessern
- [ ] **Anchor-Links implementieren**
  - [ ] Navigation Links zu entsprechenden Sektionen verlinken
  - [ ] Smooth scrolling für interne Links
  - [ ] Active state für aktuelle Sektion
  - [ ] Mobile Navigation UX verbessern

### Forms funktional machen
- [ ] **Backend-Integration oder Service**
  - [ ] Netlify Forms oder anderer Service implementieren
  - [ ] Form validation (client-side) hinzufügen
  - [ ] Success/Error states implementieren
  - [ ] Loading states für Form-Submission
  - [ ] Email-Versand konfigurieren

### Mobile Experience
- [ ] **Touch-Optimierung**
  - [ ] Touch-Gesten für Slider optimieren
  - [ ] Mobile Performance verbessern
  - [ ] Hamburger-Menu UX verfeinern
  - [ ] Scroll-Performance auf Mobile testen

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

## 🚀 **Phase 5: Performance & Code-Optimierung (Zum Schluss)** *(2-3 Stunden)*

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

## 📊 **Fortschritt-Tracking**

**Gesamtfortschritt:** 0/65 Tasks (0%)

### Phase-Fortschritt:
- **Phase 1:** 0/12 Tasks (0%) ⏱️ *0/4 Stunden* **← AKTUELLE PRIORITÄT**
- **Phase 2:** 0/15 Tasks (0%) ⏱️ *0/6 Stunden*  
- **Phase 3:** 0/12 Tasks (0%) ⏱️ *0/4 Stunden*
- **Phase 4:** 0/13 Tasks (0%) ⏱️ *0/3 Stunden*
- **Phase 5:** 0/12 Tasks (0%) ⏱️ *0/3 Stunden* *(Performance - später)*
- **Phase 6:** 0/8 Tasks (0%) ⏱️ *0/2 Stunden*

---

## 📝 **Notizen & Entscheidungen**

### Technische Entscheidungen:
- [ ] **Video-Format entscheiden:** MP4 Background vs. YouTube Embed
- [ ] **Form-Backend entscheiden:** Netlify Forms vs. Custom Backend vs. Formspree
- [ ] **Analytics-Tool entscheiden:** Google Analytics vs. Matomo vs. Privacy-focused Alternative

### Design-Entscheidungen:
- [ ] **CTA-Button Style:** Conventional vs. Current SVG-Approach
- [ ] **Mobile-First vs. Desktop-First:** Responsive Breakpoints review

---

## 🎯 **Nächste Schritte**

**Aktueller Status:** Bereit für Phase 1  
**Nächste Aufgabe:** GSAP Bundle optimieren  
**Empfohlene Reihenfolge:** Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5

---

*Letzte Aktualisierung: 16. Juni 2025*
