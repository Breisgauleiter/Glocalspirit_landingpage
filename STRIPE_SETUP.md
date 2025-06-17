# 🚀 Stripe Integration#### Konfiguration anpassen: ✅ **BEREITS ERLEDIGT**
**submit_spenden.php - Price IDs sind bereits konfiguriert:**
```php
// Stripe Secret Key (noch einzusetzen)
\Stripe\Stripe::setApiKey('sk_live_YOUR_REAL_SECRET_KEY');

// Price IDs ✅ KONFIGURIERT
$validPriceIds = [
    'earlybird' => 'price_1RagqmPQ7hNB5R7goFBX14jJ',  // €22/Monat
    'premium' => 'price_1RanvQPQ7hNB5R7gOSpGuoMt',    // €44/Monat
    'business' => 'price_1Ranw8PQ7hNB5R7ghbOlhEka'    // €55/Monat
];
```pirit

## 📋 Installationsanleitung

### 1. Stripe Account Setup ✅ **ABGESCHLOSSEN**
1. **Stripe Account erstellt**: [stripe.com/register](https://stripe.com/register)
2. **Dashboard konfiguriert**: [dashboard.stripe.com](https://dashboard.stripe.com)
3. **Produkte erstellt** (Products):
   - ✅ **Early Bird Paket**: €22/Monat (`price_1RagqmPQ7hNB5R7goFBX14jJ`)
   - ✅ **Premium Paket**: €44/Monat (`price_1RanvQPQ7hNB5R7gOSpGuoMt`)
   - ✅ **Business Paket**: €55/Monat (`price_1Ranw8PQ7hNB5R7ghbOlhEka`)

### 2. Price IDs ✅ **KONFIGURIERT**
**Alle Price IDs sind bereits in den Code eingesetzt:**

### 3. Backend Setup (auf Server)

#### PHP Dependencies installieren:
```bash
# In docs/ Verzeichnis:
composer install
```

#### Konfiguration anpassen:
**submit_spenden.php (Zeilen 24-30):**
```php
// Stripe Secret Key
\Stripe\Stripe::setApiKey('sk_live_YOUR_REAL_SECRET_KEY');

// Price IDs ersetzen
$validPriceIds = [
    'earlybird' => 'price_YOUR_REAL_EARLY_BIRD_PRICE_ID',    // €22/Monat
    'premium' => 'price_YOUR_REAL_PREMIUM_PRICE_ID',         // €50/Monat 
    'celebration' => 'price_YOUR_REAL_CELEBRATION_PRICE_ID'  // €100/Monat
];

// Domain anpassen
$baseUrl = 'https://glocalspirit.org';
```

#### Frontend Setup: ✅ **BEREITS KONFIGURIERT**

**JS_Files/stripe-integration.js - Price IDs sind bereits gesetzt:**
```javascript
const publishableKey = 'pk_live_YOUR_REAL_PUBLISHABLE_KEY'; // TODO: Einsetzen
```

**spendenformular.html - Alle Price IDs sind bereits konfiguriert:**
```html
✅ data-price-id="price_1RagqmPQ7hNB5R7goFBX14jJ"  <!-- Early Bird €22/Monat -->
✅ data-price-id="price_1RanvQPQ7hNB5R7gOSpGuoMt"  <!-- Premium €44/Monat -->
✅ data-price-id="price_1Ranw8PQ7hNB5R7ghbOlhEka"  <!-- Business €55/Monat -->
```

### 5. Server Upload
**Dateien hochladen:**
- ✅ `submit_spenden.php`
- ✅ `spenden-success.html`
- ✅ `composer.json` + `vendor/` (nach composer install)
- ✅ Aktualisierte `stripe-integration.js`
- ✅ Aktualisierte `spendenformular.html`

### 6. Live-Test
1. **Test-Payment** mit kleinem Betrag durchführen
2. **Webhook-Events** in Stripe Dashboard überprüfen  
3. **Success-Page** testen
4. **E-Mail-Bestätigungen** validieren

## 🔧 Entwicklungshinweise

### Webhook Setup (Optional - für erweiterte Features):
**Dashboard → Developers → Webhooks:**
- Endpoint: `https://glocalspirit.org/stripe-webhook.php`
- Events: `checkout.session.completed`, `invoice.payment_succeeded`

### Fehlerbehandlung:
- Logs in `error_log()` werden in PHP error.log geschrieben
- Frontend-Errors in Browser Console
- Stripe Dashboard zeigt alle Payment-Events

### Sicherheit:
- ✅ Secret Keys niemals im Frontend verwenden
- ✅ Price ID Validation verhindert Manipulation
- ✅ CORS Headers konfiguriert
- ✅ Input Validation implementiert

## 📊 Testing Checklist

- [x] Stripe Account erstellt und konfiguriert ✅
- [x] 3 Produkte mit korrekten Preisen erstellt ✅
- [x] Price IDs in Code eingesetzt ✅
- [ ] **API Keys (Publishable & Secret Key) in Code einsetzen** ⏳
- [ ] `composer install` ausgeführt ⏳  
- [ ] Dateien auf Server hochgeladen ⏳
- [ ] Test-Payment durchgeführt ⏳
- [ ] Success-Page funktioniert ⏳
- [ ] E-Mail-Bestätigungen erhalten ⏳

**Nächster Schritt**: API Keys (pk_live_... & sk_live_...) einsetzen

**Geschätzte verbleibende Setup-Zeit**: 10-15 Minuten

---

**Support**: Bei Fragen zur Stripe-Integration wende dich an das glocalSpirit Entwicklungsteam.
