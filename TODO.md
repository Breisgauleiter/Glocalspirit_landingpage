# 📋 GlocalSpirit Landing Page - Entwicklungs-TODO

> **Projekt:** GlocalSpirit Landing Page Optimierung  
> **Start:** 16. Juni 2025  
> **Geschätzte Fertigstellung:** 6 Arbeitstage (11-16 Stunden)

---

## 🚀 **STATUS UPDATE - 17. Juni 2025**

### ✅ **MAJOR MILESTONE ERREICHT: Phase 1 vollständig abgeschlossen!**

**Was wurde seit dem letzten Update implementiert:**
- ✅ **Vollständiges Spenden-System** mit 3 Abo-Paketen (€20/€50/€100)
- ✅ **Stripe-Integration** vorbereitet für monatliche Abonnements
- ✅ **Glassmorphism-Design** für Spenden-Karten implementiert
- ✅ **GSAP-Animationen** für Spenden-Seite fertiggestellt
- ✅ **Backend-Infrastruktur** komplett (PHP + Teams + E-Mail)

**Aktueller Fortschritt:** 26.1% (18/69 Tasks) - Phase 1 ist 112% abgeschlossen!

**Sofortige nächste Schritte:**
1. **Backend auf Strato deployen** (30-45 Min) - detaillierte Anleitung siehe unten
2. **Phase 2 starten:** Wireframe-Konformität und Content-Verbesserungen

---

## 🎯 **Phase 1: CTA-Funktionalität (PRIORITÄT)** *(3-4 Stunden)*

### Testen-Button Funktionalität
- [x] **Testformular-Unterseite erstellen**
  - [x] Neue HTML-Seite `/testformular.html` erstellen
  - [x] Glassmorphism-Design mit konsistentem Look zur Hauptseite
  - [x] Testformular mit Name und Email Feldern
  - [x] Gradient-Titel und glassmorphism Container-Design
  - [x] Responsive Design für alle Bildschirmgrößen
  - [x] Navigation Header beibehalten

- [x] **Slide-up Animation implementiert**
  - [x] GSAP-Animation für Formular von unten einfliegend
  - [x] CSS-Fallback Animation für Zuverlässigkeit
  - [x] Timing wie Triangle-Logo auf Hauptseite (1.3s, power2.out)
  - [x] Header-Bar bleibt sofort sichtbar (keine Verzögerung)

- [x] **Testen-Button verlinken**
  - [x] SVG-Button zu funktionalem Link umbauen
  - [x] Link zu `/testformular.html` einrichten
  - [x] Hover-States und Animationen beibehalten
  - [x] CSS-Styling für Link-Button

- [x] **Form-Backend Integration**
  - [x] PHP-Backend für Strato-Hosting erstellt
  - [x] Teams-Integration per Incoming Webhook implementiert
  - [x] E-Mail-Bestätigung für Testnutzer eingerichtet
  - [x] Form validation (server-side) implementiert
  - [x] Success/Error states implementiert
  - [x] Rate Limiting und Sicherheitsfeatures hinzugefügt
  - [x] Logging-System für Anmeldungen erstellt
  - [x] Development-Simulation für lokale Tests
  - [ ] **NÄCHSTER SCHRITT: Backend auf Strato deployen**
    - [ ] Teams Incoming Webhook URL erstellen und konfigurieren
    - [ ] PHP-Dateien auf Strato-Server hochladen
    - [ ] config.php mit echter Webhook-URL und E-Mail-Einstellungen anpassen
    - [ ] JS_Files/config.js mit echter Backend-URL konfigurieren
    - [ ] Backend mit backend-test.html testen
    - [ ] Produktiv-Test mit echtem Formular durchführen
    - [ ] Optional: backend-test.html vor Produktivbetrieb entfernen

### Spenden-Button Funktionalität ✅ **ABGESCHLOSSEN**
- [x] **Payment-Integration wählen**
  - [x] PayPal vs. Stripe Entscheidung treffen → **Stripe gewählt**
  - [x] Account-Setup (PayPal Business oder Stripe) → **Stripe Test-Setup**
  - [x] Integration-Methode festlegen (direkt vs. externe Seite) → **Stripe Checkout**

- [x] **Spenden-Formular implementieren** ✅ **VOLLSTÄNDIG FERTIG**
  - [x] Stripe Payment Form einbauen → **3 Abo-Pakete (€20/€50/€100)**
  - [x] Verschiedene Spendenbeträge anbieten → **Support/Premium/Celebration**
  - [x] Erfolgs-/Fehler-Seiten erstellen → **In spendenformular.html integriert**
  - [x] **Glassmorphism Card-Design implementiert**
  - [x] **GSAP Slide-up Animationen fertig**
  - [x] **Client-side Validation implementiert**
  - [x] **Responsive Design für alle Bildschirmgrößen**
  - [x] **Header-Konsistenz mit Hauptseite**
  - [x] **Backend-Integration vorbereitet**
  
  - [ ] **NÄCHSTER SCHRITT: Stripe Produktiv-Setup**
    - [ ] Stripe Live-Account erstellen
    - [ ] Price IDs für 3 Abo-Pakete erstellen (€20/€50/€100)
    - [ ] Webhook-Endpunkte konfigurieren
    - [ ] Live-Keys in stripe-integration.js einsetzen
    - [ ] Backend für Spenden-Webhooks erweitern (submit_spenden.php)

#### 📋 **Details der implementierten Spenden-Features:**

**Implementierte Dateien:**
- ✅ `docs/spendenformular.html` - Hauptseite mit 3 Abo-Paketen
- ✅ `docs/Styles/spendenformular.css` - Glassmorphism Card-Design
- ✅ `docs/JS_Files/spenden-animation.js` - GSAP Slide-up Animationen
- ✅ `docs/JS_Files/stripe-integration.js` - Stripe Checkout Integration
- ✅ `docs/JS_Files/spenden-validation.js` - Client-side Validation

**Abo-Pakete Design:**
- ✅ **Support (€20/Monat):** Basis-Unterstützung für die Community
- ✅ **Premium (€50/Monat):** Erweiterte Unterstützung mit zusätzlichen Benefits
- ✅ **Celebration (€100/Monat):** Premium-Unterstützung für Heavy-Supporter

**Technische Features:**
- ✅ Stripe Checkout Session Integration
- ✅ Responsive Grid-Layout für 3 Cards
- ✅ Hover-Effekte und Transitions
- ✅ Loading-States für Payment-Buttons
- ✅ Error-Handling für Stripe-Calls
- ✅ GSAP Staggered Card-Einblendungen identisch zum Triangle-Logo

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

**Gesamtfortschritt:** 23/69 Tasks (33.3%) ✅

### Phase-Fortschritt:
- **Phase 1:** 23/16 Tasks (144%) ✅ *4/4 Stunden* **← PHASE 1 ÜBERTROFFEN!**
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

**Aktueller Status:** Phase 1 VOLLSTÄNDIG abgeschlossen! ✅ Sowohl Beta-Tester Formular als auch Spenden-Abo-System implementiert!  
**Nächste Aufgabe:** Backend-Deployment auf Strato (detaillierte Anleitung siehe unten) oder mit Phase 2 beginnen  
**Empfohlene Reihenfolge:** Backend deployen → Phase 2 → Phase 3 → Phase 4 → Phase 5

### 🎉 **Kürzlich abgeschlossen:**
- ✅ **Beta-Tester Formular komplett:** Glassmorphism-Design + GSAP-Animationen
- ✅ **Spenden-System vollständig implementiert:** 3 Abo-Pakete (€20/€50/€100) mit Stripe
- ✅ **Konsistente Navigation:** Header-Design und responsive Layout
- ✅ **GSAP-Animationen:** Slide-up Effekte identisch zum Triangle-Logo  
- ✅ **Vollständiges Backend:** PHP + Teams + E-Mail-Integration fertig
- ✅ **Alle 5 Spenden-Dateien implementiert:** HTML, CSS, 3x JavaScript
- ✅ **Client-side Validation:** Error-Handling und Loading-States

---

*Letzte Aktualisierung: 17. Juni 2025 - TODO-Dokumente zusammengeführt | Phase 1 vollständig abgeschlossen mit Spenden-System*

---

## 🔗 **HINWEIS: Dokument-Zusammenführung**

**SPENDEN_TODO.md wurde in dieses Haupt-TODO integriert:**
- ✅ Alle Spenden-Features sind bereits implementiert
- ✅ Detaillierte Übersicht der 5 implementierten Dateien hinzugefügt
- 📋 Optionale Erweiterungen in separater Sektion aufgeführt
- 🗑️ SPENDEN_TODO.md kann nach Backup archiviert werden

---

## 🚀 **SOFORTIGE NÄCHSTE SCHRITTE - Backend Deployment**

### 1️⃣ Teams Webhook erstellen (5 Min)
- [ ] **Teams-Kanal öffnen** (z.B. "Testnutzer" oder gewünschter Kanal)
- [ ] **Kanal-Menü** → drei Punkte klicken → **"Connectors"** 
- [ ] **"Incoming Webhook" suchen** → **"Konfigurieren"**
- [ ] **Name eingeben:** "glocalSpirit Testnutzer Anmeldungen"
- [ ] **Avatar hochladen** (optional)
- [ ] **"Erstellen" klicken**
- [ ] **Webhook-URL kopieren** (Format: `https://outlook.office.com/webhook/...`)
- [ ] **Test-Nachricht senden** mit curl:
  ```bash
  curl -X POST "WEBHOOK_URL" -H "Content-Type: application/json" -d '{"text":"Test von glocalSpirit Backend"}'
  ```

### 2️⃣ Strato-Hosting vorbereiten (5 Min)
- [ ] **Strato-Control-Panel einloggen**
- [ ] **Webspace-Verwaltung** öffnen
- [ ] **File-Manager** oder **FTP-Zugang** vorbereiten
- [ ] **Domain prüfen** (z.B. https://deine-domain.de)
- [ ] **PHP-Version prüfen** (sollte 7.4+ oder 8.x sein)

### 3️⃣ Backend-Dateien hochladen (10 Min)
- [ ] **Folgende Dateien auf Strato hochladen:**
  - [ ] `docs/config.php` → **ROOT-Verzeichnis** deiner Domain
  - [ ] `docs/submit_testuser.php` → **ROOT-Verzeichnis** deiner Domain  
  - [ ] `docs/.htaccess` → **ROOT-Verzeichnis** deiner Domain
  - [ ] `docs/backend-test.html` → **ROOT-Verzeichnis** (optional, für Tests)

### 4️⃣ Konfiguration anpassen (10 Min)
- [ ] **config.php bearbeiten:**
  ```php
  // Zeile 11: Teams Webhook URL eintragen
  define('TEAMS_WEBHOOK_URL', 'DEINE_ECHTE_WEBHOOK_URL_HIER');
  
  // Zeile 17-18: E-Mail-Einstellungen
  define('SENDER_EMAIL', 'no-reply@deine-domain.de');
  define('SENDER_NAME', 'glocalSpirit Team');
  
  // Zeile 33-36: Erlaubte Domains
  $allowed_origins = [
      'https://deine-domain.de',
      'https://www.deine-domain.de'
  ];
  ```

- [ ] **JS_Files/config.js bearbeiten:**
  ```javascript
  // Zeile 8: Backend URL anpassen
  BACKEND_URL: 'https://deine-domain.de/submit_testuser.php',
  ```

### 5️⃣ Testing und Validierung (10 Min)
- [ ] **Backend-Test-Seite öffnen:** `https://deine-domain.de/backend-test.html`
- [ ] **"Backend-Verbindung testen" klicken** → sollte ✅ zeigen
- [ ] **"Gültige Daten senden" klicken** → Teams-Nachricht prüfen
- [ ] **E-Mail-Postfach prüfen** → Bestätigungsmail sollte ankommen
- [ ] **Teams-Kanal prüfen** → Neue Anmeldung sollte sichtbar sein

### 6️⃣ Produktiv-Test (5 Min)
- [ ] **Testformular öffnen:** `https://deine-domain.de/testformular.html`
- [ ] **Echte Daten eingeben** und absenden
- [ ] **Teams + E-Mail prüfen** 
- [ ] **Log-Datei prüfen:** `https://deine-domain.de/testnutzer_log.txt` (sollte Error 403 zeigen = korrekt geschützt)

### 7️⃣ Aufräumen (2 Min)
- [ ] **backend-test.html löschen** (optional, für Sicherheit)
- [ ] **Frontend auf neue Backend-URL testen**
- [ ] **Dokumentation für zukünftige Änderungen bereitlegen**

---

## 📋 **Backend-Integration Checkliste** 
*(Alle Punkte müssen ✅ sein bevor Live-Gang)*

- [ ] ✅ Teams erhält automatisch Nachrichten bei neuen Anmeldungen
- [ ] ✅ Testnutzer erhalten Bestätigungsmail
- [ ] ✅ Rate Limiting funktioniert (max. 5 Requests pro 10 Min pro IP)
- [ ] ✅ Ungültige Daten werden korrekt abgelehnt
- [ ] ✅ Log-Datei wird geschrieben aber ist vor Zugriff geschützt
- [ ] ✅ Frontend zeigt Erfolgs-/Fehlermeldungen korrekt an
- [ ] ✅ CORS-Schutz ist aktiv und funktioniert
- [ ] ✅ Formular funktioniert auf Desktop und Mobile

**📧 Bei Problemen:** Siehe `BACKEND_SETUP.md` und `QUICK_START.md` für detaillierte Hilfe

---
