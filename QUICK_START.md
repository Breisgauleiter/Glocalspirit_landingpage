# 🚀 Quick Start Guide - PHP Backend

## ⚡ In 5 Minuten startklar!

### 1️⃣ Teams Webhook erstellen (2 Min)

1. **Teams öffnen** → Zu deinem Kanal navigieren
2. **Kanal-Menü** (drei Punkte) → **"Connectors"**
3. **"Incoming Webhook" suchen** → **"Konfigurieren"**
4. **Name eingeben:** "Testnutzer Anmeldungen"
5. **Webhook URL kopieren** (sieht aus wie: `https://outlook.office.com/webhook/...`)

### 2️⃣ Dateien auf Strato hochladen (1 Min)

Lade diese Dateien in dein Webverzeichnis hoch:
- ✅ `config.php`
- ✅ `submit_testuser.php`
- ✅ `.htaccess`
- 🔧 `backend-test.html` (optional, für Tests)

### 3️⃣ Konfiguration anpassen (1 Min)

**Bearbeite `config.php`:**
```php
// Zeile 11: Teams Webhook URL eintragen
define('TEAMS_WEBHOOK_URL', 'DEINE_WEBHOOK_URL_HIER');

// Zeile 17: Deine E-Mail-Adresse
define('SENDER_EMAIL', 'no-reply@deine-domain.de');

// Zeile 33-36: Deine Domains
$allowed_origins = [
    'https://deine-domain.de',
    'https://www.deine-domain.de'
];
```

**Bearbeite `JS_Files/config.js`:**
```javascript
// Zeile 8: Backend URL eintragen
BACKEND_URL: 'https://deine-domain.de/submit_testuser.php',
```

### 4️⃣ Testen (1 Min)

1. **Öffne:** `https://deine-domain.de/backend-test.html`
2. **Klicke:** "✅ Gültige Daten senden"
3. **Prüfe:** Teams-Kanal auf neue Nachricht
4. **Prüfe:** E-Mail-Postfach

---

## ✅ Erfolg! 

Wenn alles funktioniert:
- 🎉 Teams erhält automatisch Nachrichten
- 📧 Bestätigungs-E-Mails werden versendet
- 📝 Anmeldungen werden geloggt
- 🛡️ Sicherheit & Rate Limiting aktiv

**Optional:** Lösche `backend-test.html` vor dem Produktivbetrieb.

---

## 🆘 Probleme?

**Teams-Nachricht kommt nicht an:**
- Webhook URL nochmal prüfen
- Test-Nachricht manuell senden: `curl -X POST "WEBHOOK_URL" -H "Content-Type: application/json" -d '{"text":"Test"}'`

**E-Mail kommt nicht an:**
- Spam-Ordner prüfen
- Absender-Domain bei Strato freischalten

**Formular funktioniert nicht:**
- Browser-Konsole (F12) öffnen
- Fehler-Meldungen prüfen
- `backend-test.html` verwenden

**Bei weiteren Fragen:** Siehe `BACKEND_SETUP.md` für detaillierte Anleitung.
