# 🚀 Testnutzer-Formular PHP Backend

## Übersicht

Diese Integration verbindet das Testnutzer-Formular mit einem einfachen PHP-Backend auf Strato, um automatisch:
- 📨 Teams-Nachrichten per Webhook zu senden
- ✉️ Bestätigungsmails zu versenden
- 📝 Anmeldungen in ein Logfile zu schreiben

---

## 🔧 PHP Backend Setup

## 🔧 PHP Backend Setup

### Schritt 1: Teams Webhook einrichten

1. **Gehe zu deinem Teams Kanal**
2. **Klicke auf die drei Punkte** neben dem Kanalnamen
3. **Wähle "Connectors"**
4. **Suche "Incoming Webhook"** und klicke "Konfigurieren"
5. **Gib einen Namen** ein (z.B. "Testnutzer Anmeldungen")
6. **Kopiere die Webhook URL** - diese benötigst du für das PHP-Script

### Schritt 2: PHP-Dateien auf Strato hochladen

Die folgenden Dateien müssen in dein Webverzeichnis auf Strato:
- `submit_testuser.php` - Hauptverarbeitungslogik
- `config.php` - Konfigurationsdatei

### Schritt 3: Konfiguration anpassen

In der `config.php` die entsprechenden Werte eintragen (siehe unten).

---

## 🔗 Frontend-Integration aktivieren

### Schritt 1: PHP-Dateien auf Strato hochladen

1. **Lade folgende Dateien** in dein Webverzeichnis auf Strato hoch:
   - `config.php` - Konfigurationsdatei
   - `submit_testuser.php` - Hauptverarbeitungslogik

### Schritt 2: Konfiguration anpassen

**Datei:** `config.php`

```php
// Teams Webhook URL eintragen (erhalten über Teams > Kanal > ... > Connectors > Incoming Webhook)
define('TEAMS_WEBHOOK_URL', 'https://outlook.office.com/webhook/YOUR_WEBHOOK_ID/...');

// E-Mail-Absender anpassen
define('SENDER_EMAIL', 'no-reply@deine-domain.de');
define('SENDER_NAME', 'glocalSpirit Team');

// Erlaubte Origins für CORS
$allowed_origins = [
    'https://deine-domain.de',
    'https://www.deine-domain.de'
];
```

### Schritt 3: Frontend-URL konfigurieren

**Datei:** `docs/JS_Files/config.js`

```javascript
// Ersetze mit deiner echten Domain:
BACKEND_URL: 'https://deine-domain.de/submit_testuser.php',
```

### Schritt 4: Dateiberechtigungen setzen

```bash
# PHP-Dateien ausführbar machen
chmod 644 config.php
chmod 644 submit_testuser.php

# Log-Datei schreibbar machen
chmod 666 testnutzer_log.txt
```

---

## 🧪 Lokales Testing

### Development Server starten

```bash
# Lokalen HTTP-Server starten
python3 -m http.server 8000 --directory docs

# Oder mit PHP (falls installiert)
php -S localhost:8000 -t docs
```

### Testing-Ablauf

1. **Öffne:** http://localhost:8000/testformular.html
2. **Fülle das Formular aus** mit Testdaten
3. **Überprüfe die Browser-Konsole** (F12) auf Meldungen
4. **Im Development-Modus** werden alle Aktionen simuliert

### PHP-Backend lokal testen

```bash
# JSON-Request an Backend senden (mit curl)
curl -X POST http://localhost:8000/submit_testuser.php \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","newsletter":true}'
```

---

## 📁 Datei-Struktur

```
docs/
├── testformular.html          # Formular-Seite
├── config.php                # ⚙️ PHP Konfiguration (Teams Webhook, E-Mail, etc.)
├── submit_testuser.php       # 🔧 PHP Backend-Logik
├── testnutzer_log.txt        # 📝 Log-Datei (wird automatisch erstellt)
├── JS_Files/
│   ├── config.js             # ⚙️ Frontend-Konfiguration (Backend URL)
│   ├── form-backend.js       # 🔧 Backend-Integration
│   ├── form-validation.js    # ✅ Validierung & Submission
│   └── ...
└── ...
```

---

## ✅ Checkliste zur Aktivierung

- [ ] Teams Incoming Webhook erstellt und URL kopiert
- [ ] PHP-Dateien auf Strato hochgeladen
- [ ] `config.php` mit Teams Webhook URL und E-Mail-Einstellungen konfiguriert
- [ ] Frontend `config.js` mit Backend-URL konfiguriert
- [ ] Dateiberechtigungen gesetzt
- [ ] Lokaler Test erfolgreich
- [ ] Produktions-Test erfolgreich

---

## 🚨 Troubleshooting

### Häufige Probleme:

**1. Teams Webhook funktioniert nicht**
- URL in `config.php` korrekt eingetragen?
- Webhook in Teams richtig konfiguriert?
- Teste manuell mit curl: `curl -X POST "WEBHOOK_URL" -H "Content-Type: application/json" -d '{"text":"Test"}'`

**2. E-Mails kommen nicht an**
- `mail()` Funktion auf Strato aktiviert?
- Absender-E-Mail-Domain korrekt?
- Spam-Ordner prüfen

**3. CORS-Fehler**
- `$allowed_origins` in `config.php` prüfen
- Deine Domain in der Liste enthalten?

**4. PHP-Fehler**
- Error-Log auf Strato prüfen
- PHP-Version kompatibel? (7.x oder 8.x)
- Dateiberechtigungen korrekt?

**5. Log-Datei wird nicht erstellt**
- Schreibberechtigungen für Webverzeichnis?
- `chmod 666 testnutzer_log.txt`

### Debug-Modus aktivieren:

**Browser-Konsole (F12):**
```javascript
// Direkter Backend-Test
fetch('https://deine-domain.de/submit_testuser.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: 'Test', email: 'test@example.com', newsletter: true})
}).then(r => r.json()).then(console.log);
```

**PHP Error-Logging:**
```php
// Am Anfang von submit_testuser.php hinzufügen für Debugging:
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

---

## 📞 Support

Bei Fragen oder Problemen:
1. **Browser-Konsole** (F12) auf Fehlermeldungen prüfen
2. **Strato Error-Log** kontrollieren
3. **Teams-Kanal** auf neue Nachrichten prüfen
4. **Log-Datei** `testnutzer_log.txt` prüfen

**Erfolg! 🎉** Das Formular sollte jetzt vollständig mit dem PHP-Backend integriert sein.
