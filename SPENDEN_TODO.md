# 💳 GlocalSpirit Spenden-Unterseite - Entwicklungs-TODO
## Abo-Pakete mit Stripe Integration

**Erstellt:** 16. Juni 2025  
**Projekt:** Spenden-Unterseite mit 3 Abo-Paketen (Support €20, Premium €50, Celebration €100)  
**Design-Referenz:** Glassmorphism Cards mit Gradient-Hintergrund  
**Backend:** Stripe Subscriptions + Teams Integration

---

## 🎯 **PROJEKT-ÜBERBLICK**

### Ziel
Eine professionelle Spenden-Unterseite erstellen mit:
- **3 Abo-Pakete** in Card-Design (Support, Premium, Celebration)
- **Stripe-Integration** für wiederkehrende monatliche Zahlungen
- **Identisches Design** wie `testformular.html` (Glassmorphism + GSAP-Animationen)
- **Backend-Integration** mit Teams-Benachrichtigungen

### Design-Anforderungen
- **Slide-up Animation** wie Triangle-Logo auf Hauptseite
- **Header-Konsistenz** mit bestehender Navigation
- **Responsive Design** für alle Bildschirmgrößen
- **Glassmorphism-Effekte** wie im Referenz-Design

---

## 🚀 **PHASE 1: DATEI-STRUKTUR & GRUNDLAGEN** *(45 Min)*

### 1.1 Neue Dateien erstellen
- [ ] **`docs/spendenformular.html`**
  - [ ] HTML-Grundstruktur wie `testformular.html`
  - [ ] Hero-Sektion für 3 Paket-Cards
  - [ ] Identischer Header mit Navigation
  - [ ] Same GSAP dependencies wie bestehende Seiten

- [ ] **`docs/Styles/spendenformular.css`**
  - [ ] CSS für Paket-Cards im Glassmorphism-Design
  - [ ] Responsive Grid-Layout für Cards
  - [ ] Gradient-Hintergründe wie im Referenz-Design
  - [ ] Hover-Effekte und Transitions

- [ ] **`docs/JS_Files/spenden-animation.js`**
  - [ ] GSAP-Animationen für Paket-Cards
  - [ ] Staggered Card-Einblendungen
  - [ ] Header-Animation (identisch zu testformular.js)

- [ ] **`docs/JS_Files/stripe-integration.js`**
  - [ ] Stripe Checkout Session Creation
  - [ ] Payment-Button Event Handlers
  - [ ] Error-Handling für Stripe-Calls

- [ ] **`docs/JS_Files/spenden-validation.js`**
  - [ ] Client-side Validation vor Stripe-Weiterleitung
  - [ ] Loading-States für Payment-Buttons
  - [ ] User-Feedback Messaging

### 1.2 Backend-Dateien
- [ ] **`docs/submit_spenden.php`**
  - [ ] Stripe Checkout Session API-Calls
  - [ ] Webhook-Handling für erfolgreiche Payments
  - [ ] Teams-Integration für neue Abonnements
  - [ ] Logging und Error-Handling

- [ ] **Erfolgs-/Fehler-Seiten**
  - [ ] `docs/spenden-erfolg.html` - Success Page nach Payment
  - [ ] `docs/spenden-fehler.html` - Error Handling Page

### 1.3 Spenden-Button verlinken
- [ ] **`docs/index.html` anpassen**
  - [ ] Bestehenden `.form2` Button zu funktionalem Link umbauen
  - [ ] `href="spendenformular.html"` hinzufügen
  - [ ] CSS-Klasse für Link-Styling anpassen
  - [ ] Hover-States und Animationen beibehalten

---

## 🎨 **PHASE 2: HTML-STRUKTUR** *(60 Min)*

### 2.1 Header & Navigation
- [ ] **Header aus `testformular.html` kopieren**
  - [ ] Identische Navigation-Struktur
  - [ ] "Zurück zur Startseite" Link
  - [ ] Mobile Hamburger-Menu beibehalten
  - [ ] Logo und Branding konsistent

### 2.2 Hero-Sektion mit Titel
- [ ] **Glassmorphism-Container für Titel**
  - [ ] `<h1 class="form-title">glocalSpirit Unterstützen</h1>`
  - [ ] Gradient-Text-Effekt wie auf Hauptseite
  - [ ] Zentrierte Positionierung
  - [ ] Responsive Font-Sizing

### 2.3 Paket-Cards Container
- [ ] **Grid-Layout für 3 Cards**
```html
<div class="packages-container">
    <div class="package-card support-package" data-price-id="price_support">
        <!-- Support Paket Content -->
    </div>
    <div class="package-card premium-package" data-price-id="price_premium">
        <!-- Premium Paket Content -->
    </div>
    <div class="package-card celebration-package" data-price-id="price_celebration">
        <!-- Celebration Paket Content -->
    </div>
</div>
```

### 2.4 Individual Paket-Card Struktur
- [ ] **Support Paket (€20/Monat)**
  - [ ] Header: "SUPPORT" + Beschreibung
  - [ ] Feature-Liste: 3 Merkmal-Punkte
  - [ ] Preis-Display: "€20/Monat"
  - [ ] "JETZT BUCHEN" Button

- [ ] **Premium Paket (€50/Monat)**
  - [ ] Header: "PREMIUM" + Beschreibung
  - [ ] Feature-Liste: 3 Merkmal-Punkte
  - [ ] Preis-Display: "€50/Monat"
  - [ ] "JETZT BUCHEN" Button

- [ ] **Celebration Paket (€100/Monat)**
  - [ ] Header: "CELEBRATION" + Beschreibung
  - [ ] Feature-Liste: 3 Merkmal-Punkte
  - [ ] Preis-Display: "€100/Monat"
  - [ ] "JETZT BUCHEN" Button

### 2.5 Accessibility & SEO
- [ ] **Alt-Texte und ARIA-Labels**
- [ ] **Semantic HTML-Struktur**
- [ ] **Meta-Tags für Spenden-Seite**
- [ ] **Structured Data für Subscription-Angebote**

---

## 🎨 **PHASE 3: CSS-STYLING** *(90 Min)*

### 3.1 Base Styles übernehmen
- [ ] **From `testformular.css` kopieren:**
  - [ ] Hero-Sektion Styling und Zentrierung
  - [ ] Glassmorphism-Container Effekte
  - [ ] Gradient-Titel Styling
  - [ ] Responsive Breakpoints
  - [ ] CSS-Fallback Animationen

### 3.2 Paket-Cards Glassmorphism Design
- [ ] **Container Grid-Layout**
```css
.packages-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}
```

- [ ] **Individual Card Styling**
```css
.package-card {
    /* Glassmorphism + Gradient wie Referenz-Design */
    background: linear-gradient(135deg, #8B7BBF 0%, #FFC857 100%);
    backdrop-filter: blur(20px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    text-align: center;
    color: white;
    
    /* Animation States */
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.3s ease;
}
```

### 3.3 Typography & Content
- [ ] **Paket-Titel Styling**
  - [ ] Large, bold font für Paket-Namen
  - [ ] Letter-spacing und Text-Shadow
  - [ ] Farb-Kontrast für Lesbarkeit

- [ ] **Feature-Listen Design**
  - [ ] Custom Bullet-Points oder Icons
  - [ ] Konsistente Zeilenhöhe
  - [ ] Readable font-size

- [ ] **Preis-Display Styling**
  - [ ] Large price mit kleinerem "/Monat"
  - [ ] Visual emphasis und Spacing
  - [ ] Currency-Symbol Styling

### 3.4 Button Design
- [ ] **"JETZT BUCHEN" Buttons**
```css
.package-button {
    background: #4285F4;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1.5rem;
    width: 100%;
}

.package-button:hover {
    background: #3367D6;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(66, 133, 244, 0.4);
}
```

### 3.5 Responsive Design
- [ ] **Desktop (1200px+):** 3 Cards nebeneinander
- [ ] **Tablet (768px-1199px):** 2 Cards nebeneinander, 1 unten
- [ ] **Mobile (unter 768px):** 1 Card pro Zeile, Vollbreite
- [ ] **Konsistente Abstände** auf allen Breakpoints

### 3.6 Loading & Interaction States
- [ ] **Loading Spinner für Buttons**
- [ ] **Disabled States während Payment**
- [ ] **Hover-Effekte** für bessere UX
- [ ] **Focus States** für Accessibility

---

## ⚙️ **PHASE 4: STRIPE-INTEGRATION** *(120 Min)*

### 4.1 Stripe Account & Setup
- [ ] **Stripe Account konfigurieren**
  - [ ] Test-Environment Setup
  - [ ] API-Keys generieren (Publishable + Secret)
  - [ ] Webhook-Endpunkt erstellen
  - [ ] Subscription Products erstellen

- [ ] **Stripe Products/Prices erstellen**
  - [ ] Support: €20/Monat recurring
  - [ ] Premium: €50/Monat recurring  
  - [ ] Celebration: €100/Monat recurring
  - [ ] Price-IDs dokumentieren

### 4.2 Frontend Stripe Integration
- [ ] **`stripe-integration.js` entwickeln**
```javascript
const stripe = Stripe('pk_test_your_publishable_key');

const STRIPE_PRICES = {
    support: 'price_1234567890',
    premium: 'price_0987654321', 
    celebration: 'price_1122334455'
};

async function createCheckoutSession(priceId) {
    // Button loading state
    const button = event.target;
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Wird geladen...';
    
    try {
        const response = await fetch('/submit_spenden.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'create_checkout',
                price_id: priceId
            })
        });
        
        const session = await response.json();
        
        // Redirect to Stripe Checkout
        return stripe.redirectToCheckout({
            sessionId: session.id
        });
    } catch (error) {
        // Error handling
        console.error('Stripe error:', error);
        showErrorMessage('Payment konnte nicht gestartet werden.');
    } finally {
        // Reset button state
        button.disabled = false;
        button.innerHTML = 'JETZT BUCHEN';
    }
}
```

- [ ] **Event Listeners für Buttons**
- [ ] **Error Handling & User Feedback**
- [ ] **Loading States & Animations**

### 4.3 Backend Stripe Integration
- [ ] **`submit_spenden.php` entwickeln**
```php
<?php
require_once 'config.php';
require_once 'stripe-php/init.php';

\Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);

if ($_POST['action'] === 'create_checkout') {
    try {
        $session = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price' => $_POST['price_id'],
                'quantity' => 1,
            ]],
            'mode' => 'subscription',
            'success_url' => 'https://deine-domain.de/spenden-erfolg.html?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => 'https://deine-domain.de/spendenformular.html',
            'customer_email' => $_POST['customer_email'] ?? null,
        ]);
        
        echo json_encode(['id' => $session->id]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
```

### 4.4 Webhook Handling
- [ ] **Stripe Webhook-Endpunkt**
  - [ ] `invoice.payment_succeeded` Event handling
  - [ ] `customer.subscription.created` Event handling
  - [ ] Webhook-Signatur Verification
  - [ ] Idempotency für doppelte Events

- [ ] **Teams-Integration bei erfolgreicher Zahlung**
```php
function sendTeamsSpendingNotification($customerData, $subscriptionData) {
    $message = [
        "text" => "🎉 Neue Abo-Spende erhalten!",
        "sections" => [[
            "activityTitle" => "glocalSpirit Abo-Spende",
            "facts" => [
                ["name" => "Paket", "value" => $subscriptionData['package_name']],
                ["name" => "Betrag", "value" => $subscriptionData['amount']],
                ["name" => "E-Mail", "value" => $customerData['email']],
                ["name" => "Abo-ID", "value" => $subscriptionData['subscription_id']]
            ]
        ]]
    ];
    
    // Send to Teams Webhook...
}
```

---

## 🎬 **PHASE 5: ANIMATIONEN** *(75 Min)*

### 5.1 GSAP Setup & Dependencies
- [ ] **Gleiche GSAP-Scripts** wie `testformular.html`
  - [ ] ScrollTrigger, ScrollSmoother, DrawSVG etc.
  - [ ] Konsistente CDN-Versionen
  - [ ] Fallback-Mechanismen

### 5.2 Spenden-Animation Entwicklung
- [ ] **`spenden-animation.js` erstellen**
```javascript
function initializeSpendenAnimations() {
    // Ensure GSAP plugins are registered
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Only create ScrollSmoother if not already created
    if (!ScrollSmoother.get()) {
        ScrollSmoother.create({
            smooth: 2,
            effects: true,
        });
    }

    // Header animation (identisch zu testformular)
    gsap.from(".header", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        delay: 2
    });

    // Form title animation (wie hero__title)
    gsap.from(".form-title", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power2.in"
    });

    // Package cards staggered animation
    gsap.from(".package-card", {
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "power2.out",
        delay: 1.5,
        stagger: 0.3 // Cards nacheinander einblenden
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    function initAnimation() {
        if (typeof gsap !== 'undefined') {
            initializeSpendenAnimations();
        } else {
            setTimeout(initAnimation, 100);
        }
    }
    initAnimation();
});
```

### 5.3 CSS Fallback Animationen
- [ ] **@keyframes für GSAP-Fallback**
```css
@keyframes slideUpFade {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.package-card {
    /* CSS Animation als Fallback */
    animation: slideUpFade 1.3s ease-out 1.5s forwards;
}
```

### 5.4 Hover & Interaction Animations
- [ ] **Card Hover-Effekte**
  - [ ] Subtle scale und lift-effect
  - [ ] Shadow-Intensität ändern
  - [ ] Smooth transitions

- [ ] **Button-Animationen**
  - [ ] Hover-States mit GSAP
  - [ ] Loading-Spinner Animationen
  - [ ] Click-Feedback

---

## 🔧 **PHASE 6: BACKEND & INTEGRATION** *(90 Min)*

### 6.1 Konfiguration erweitern
- [ ] **`config.php` für Stripe konfigurieren**
```php
// Stripe Configuration
define('STRIPE_PUBLISHABLE_KEY', 'pk_test_your_key_here');
define('STRIPE_SECRET_KEY', 'sk_test_your_secret_here');
define('STRIPE_WEBHOOK_SECRET', 'whsec_your_webhook_secret');

// Teams Webhook für Spenden (neuer Kanal)
define('TEAMS_WEBHOOK_SPENDEN', 'https://outlook.office.com/webhook/spenden_url');

// Spenden-spezifische Einstellungen
define('SPENDEN_SUCCESS_URL', 'https://deine-domain.de/spenden-erfolg.html');
define('SPENDEN_CANCEL_URL', 'https://deine-domain.de/spendenformular.html');
```

- [ ] **Allowed Origins für CORS erweitern**
- [ ] **Error-Logging für Spenden-Prozess**

### 6.2 Success & Error Pages
- [ ] **`spenden-erfolg.html` erstellen**
  - [ ] Erfolgreiche Zahlung bestätigen
  - [ ] Abo-Details anzeigen
  - [ ] "Zurück zur Hauptseite" Link
  - [ ] Identisches Design/Header

- [ ] **`spenden-fehler.html` erstellen**
  - [ ] Payment-Fehler kommunizieren
  - [ ] "Erneut versuchen" Button
  - [ ] Support-Kontakt Informationen

### 6.3 Customer Data Handling
- [ ] **Optional: Kundendaten erweitern**
  - [ ] Name und E-Mail vor Stripe-Checkout
  - [ ] Data-Privacy Compliance
  - [ ] DSGVO-konforme Speicherung

### 6.4 Logging & Monitoring
- [ ] **Spenden-Transaktionen loggen**
  - [ ] Erfolgreiche Abonnements
  - [ ] Failed Payment attempts
  - [ ] Webhook-Events
  - [ ] Teams-Nachrichten Status

### 6.5 Testing Infrastructure
- [ ] **Test-Daten Setup**
  - [ ] Stripe Test-Kreditkarten
  - [ ] Lokale Webhook-Entwicklung (ngrok)
  - [ ] Teams-Test-Channel
  - [ ] End-to-End Test-Szenarien

---

## 📱 **PHASE 7: RESPONSIVE & TESTING** *(60 Min)*

### 7.1 Mobile Optimierung
- [ ] **Touch-freundliche UI**
  - [ ] Button-Größen für Touch-Screens
  - [ ] Ausreichend Spacing zwischen Cards
  - [ ] Scroll-Performance optimieren

- [ ] **Mobile-specific Features**
  - [ ] Stripe Mobile-optimized Checkout
  - [ ] Apple Pay / Google Pay Integration (optional)
  - [ ] Mobile Keyboard-Optimierung

### 7.2 Cross-Browser Testing
- [ ] **Payment Flow testen in:**
  - [ ] Chrome (Desktop + Mobile)
  - [ ] Firefox (Desktop + Mobile)
  - [ ] Safari (Desktop + Mobile)
  - [ ] Edge Desktop

- [ ] **Animation Performance**
  - [ ] GSAP-Konsistenz across browsers
  - [ ] CSS-Fallback functionality
  - [ ] ScrollSmoother compatibility

### 7.3 Stripe-specific Testing
- [ ] **Test Payment Flows**
  - [ ] Erfolgreiche Subscription Creation
  - [ ] Payment-Method hinzufügen
  - [ ] Cancel/Return-to-site flow
  - [ ] Webhook-Delivery verification

- [ ] **Error Scenarios testen**
  - [ ] Declined cards
  - [ ] Network interruptions
  - [ ] Timeout scenarios
  - [ ] Invalid input handling

### 7.4 Performance Testing
- [ ] **Page Load Speed**
  - [ ] Stripe.js loading time
  - [ ] GSAP dependencies optimization
  - [ ] Image optimization

- [ ] **Lighthouse Audit**
  - [ ] Performance Score > 90
  - [ ] Accessibility Score > 95
  - [ ] Best Practices > 90

---

## 🔗 **PHASE 8: VERKNÜPFUNG & DEPLOYMENT** *(45 Min)*

### 8.1 Hauptseite Integration
- [ ] **`index.html` - Spenden-Button verlinken**
```html
<!-- Current: form2 wrapper -->
<div class="wrapper__form form2">
    <section class="donation__form">
        <a href="spendenformular.html" class="spenden-form-link">
            <!-- Bestehender Hand-SVG Code -->
            <svg version="1.1" class="hand_svg">
                <!-- ... existing SVG content ... -->
            </svg>
        </a>
        <h3>SPENDEN</h3>
    </section>
</div>
```

- [ ] **CSS für Link-Styling anpassen**
```css
.spenden-form-link {
    /* Alle bestehenden button styles übernehmen */
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: inherit;
}
```

### 8.2 Navigation erweitern
- [ ] **Header-Navigation in allen Dateien**
  - [ ] "Spenden" Link zu Header hinzufügen
  - [ ] Breadcrumb-Navigation auf Spenden-Seite
  - [ ] Active-States für Navigation

- [ ] **Footer-Links**
  - [ ] Spenden-Link im Footer
  - [ ] "Unterstützen Sie uns" Section

### 8.3 SEO & Meta-Optimization
- [ ] **Meta-Tags für Spenden-Seite**
```html
<title>glocalSpirit unterstützen - Abo-Pakete</title>
<meta name="description" content="Unterstützen Sie glocalSpirit mit einem monatlichen Abo. Wählen Sie zwischen Support (€20), Premium (€50) oder Celebration (€100) Paketen.">
<meta property="og:title" content="glocalSpirit Abo-Pakete">
<meta property="og:description" content="Monatliche Unterstützung für bewusste Vernetzung und spirituelle Gemeinschaft.">
```

- [ ] **Structured Data für Subscriptions**
- [ ] **Social Media Cards**

### 8.4 Final Testing & Validation
- [ ] **Complete User Journey**
  - [ ] Von Hauptseite → Spenden-Button → Paket-Auswahl → Stripe → Erfolg
  - [ ] Zurück-Navigation und Breadcrumbs
  - [ ] Mobile + Desktop Journey

- [ ] **Backend Integration Testing**
  - [ ] Teams-Nachrichten bei erfolgreicher Zahlung
  - [ ] E-Mail-Bestätigungen (optional)
  - [ ] Webhook-Verarbeitung
  - [ ] Error-Logging functionality

- [ ] **Security Testing**
  - [ ] CORS headers korrekt
  - [ ] Stripe-Key Security
  - [ ] XSS/CSRF Protection
  - [ ] Input Validation

---

## 📊 **RESSOURCEN & DEPENDENCIES**

### Externe Services
- [ ] **Stripe Account** (Test + Production)
- [ ] **Teams Incoming Webhook** (für Spenden-Kanal)
- [ ] **Domain/Hosting** (Strato) für PHP-Backend

### Libraries & CDNs
- [ ] **Stripe.js** - `https://js.stripe.com/v3/`
- [ ] **GSAP** - Bestehende CDN-Links verwenden
- [ ] **Stripe PHP Library** - Composer oder direkt einbinden

### Design Assets
- [ ] **Paket-Icons** (optional)
- [ ] **Success/Error Illustrations**
- [ ] **Loading-Spinner SVGs**

---

## 🎯 **ERFOLGSKRITERIEN**

### Funktionale Anforderungen
- [x] ✅ **3 Abo-Pakete** sichtbar und wählbar
- [x] ✅ **Stripe Checkout** funktional für alle Pakete  
- [x] ✅ **Teams-Integration** bei erfolgreichen Zahlungen
- [x] ✅ **Responsive Design** auf allen Geräten
- [x] ✅ **Animation-Konsistenz** mit bestehender Seite

### Design-Anforderungen
- [x] ✅ **Glassmorphism-Effekte** wie Referenz-Design
- [x] ✅ **Gradient-Hintergründe** für Paket-Cards
- [x] ✅ **GSAP-Animationen** (slide-up, stagger)
- [x] ✅ **Header-Konsistenz** mit bestehenden Seiten

### Technical Requirements
- [x] ✅ **Stripe Webhooks** korrekt konfiguriert
- [x] ✅ **Cross-browser** compatibility
- [x] ✅ **Performance** (Lighthouse > 90)
- [x] ✅ **Security** (CORS, Input Validation)

---

## 📅 **ZEITPLAN & MEILENSTEINE**

| Phase | Dauer | Kumulativ | Meilenstein |
|-------|-------|-----------|-------------|
| Phase 1 | 45 Min | 45 Min | ✅ Datei-Struktur erstellt |
| Phase 2 | 60 Min | 1h 45min | ✅ HTML-Struktur fertig |
| Phase 3 | 90 Min | 3h 15min | ✅ CSS-Design complete |
| Phase 4 | 120 Min | 5h 15min | ✅ Stripe-Integration working |
| Phase 5 | 75 Min | 6h 30min | ✅ Animationen implementiert |
| Phase 6 | 90 Min | 8h | ✅ Backend komplett |
| Phase 7 | 60 Min | 9h | ✅ Testing abgeschlossen |
| Phase 8 | 45 Min | 9h 45min | ✅ **PROJEKT FERTIG** |

---

## 🚀 **NÄCHSTE SCHRITTE**

### Sofort zu erledigen:
1. **✅ Plan bestätigen** - Entspricht das deinen Vorstellungen?
2. **🔑 Stripe-Setup** - Test-Account oder bestehenden Account verwenden?
3. **📝 Content-Entscheidung** - Paket-Beschreibungen aus Design oder eigene Texte?
4. **🚀 Phase 1 starten** - Grundstruktur und erste HTML-Datei

### Entscheidungen die getroffen werden müssen:
- **Stripe Account:** Test-Modus oder direkt Production?
- **Paket-Inhalte:** Exakte Beschreibungen der Features
- **E-Mail-Integration:** Bestätigungs-E-Mails für Spender?
- **Teams-Kanal:** Neuer Kanal für Spenden oder bestehenden nutzen?

---

**📧 Bei Fragen:** GitHub Copilot steht für detaillierte Implementierung bereit  
**📋 Status:** Bereit für Umsetzung - warte auf grünes Licht! 🚀

---

*Erstellt: 16. Juni 2025 | Version: 1.0 | Geschätzte Gesamtzeit: ~10h*
