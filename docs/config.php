<?php
/**
 * Konfigurationsdatei für Testnutzer-Backend
 * 
 * Hier werden alle wichtigen Einstellungen verwaltet.
 * Bitte alle Werte entsprechend deiner Umgebung anpassen!
 */

// ===============================================
// 🔧 TEAMS WEBHOOK KONFIGURATION (DEAKTIVIERT)
// ===============================================

// Teams Integration deaktiviert - verwenden E-Mail-only
// Kann später mit Power Automate aktiviert werden
define('TEAMS_WEBHOOK_URL', null); // Teams deaktiviert
define('ENABLE_TEAMS', false); // Teams-Nachrichten deaktivieren

// ===============================================
// 📧 E-MAIL KONFIGURATION
// ===============================================

// Absender-E-Mail (glocalSpirit konfiguriert)
define('SENDER_EMAIL', 'no-reply@glocalspirit.com');
define('SENDER_NAME', 'glocalSpirit Team');

// Empfänger für Benachrichtigungen (Admin-E-Mail)
define('ADMIN_EMAIL', 'info@glocalspirit.com');

// E-Mail Betreff und Template
define('EMAIL_SUBJECT', 'Willkommen als Testnutzer bei glocalSpirit');
define('ADMIN_EMAIL_SUBJECT', 'Neue Testnutzer-Anmeldung - glocalSpirit');

// ===============================================
// 📁 LOGGING KONFIGURATION
// ===============================================

// Pfad zur Log-Datei (relativ zum PHP-Script)
define('LOG_FILE', 'testnutzer_log.txt');

// Maximale Log-Datei-Größe in Bytes (10MB)
define('MAX_LOG_SIZE', 10 * 1024 * 1024);

// ===============================================
// 🛡️ SICHERHEITS-EINSTELLUNGEN
// ===============================================

// Erlaubte Origins für CORS (glocalSpirit konfiguriert)
$allowed_origins = [
    'https://glocalspirit.org',
    'https://www.glocalspirit.org',
    'http://localhost:8000', // Für lokale Entwicklung
];

// Rate Limiting: Maximal 5 Anfragen pro IP in 10 Minuten (Fenster in Minuten)
define('RATE_LIMIT_MAX_REQUESTS', 5);
define('RATE_LIMIT_WINDOW_MINUTES', 10); // Fenster in Minuten

// ===============================================
// 🎨 TEAMS NACHRICHT TEMPLATE
// ===============================================

function getTeamsMessage($name, $email, $newsletter) {
    return [
        "@type" => "MessageCard",
        "@context" => "http://schema.org/extensions",
        "themeColor" => "0078d4",
        "summary" => "Neue Testnutzer-Anmeldung",
        "sections" => [
            [
                "activityTitle" => "🎉 **Neue Testnutzer-Anmeldung**",
                "activitySubtitle" => "Jemand hat sich als Beta-Tester angemeldet!",
                "facts" => [
                    [
                        "name" => "👤 Name:",
                        "value" => $name
                    ],
                    [
                        "name" => "📧 E-Mail:",
                        "value" => $email
                    ],
                    [
                        "name" => "📰 Newsletter:",
                        "value" => $newsletter ? "✅ Ja" : "❌ Nein"
                    ],
                    [
                        "name" => "⏰ Zeitpunkt:",
                        "value" => date('d.m.Y H:i:s')
                    ]
                ],
                "markdown" => true
            ]
        ]
    ];
}

// ===============================================
// 📧 E-MAIL TEMPLATE
// ===============================================

function getEmailTemplate($name) {
    return "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .highlight { background: #e7f3ff; padding: 15px; border-left: 4px solid #2196f3; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🌍 Herzlich willkommen bei glocalSpirit!</h1>
            </div>
            <div class='content'>
                <p>Hallo <strong>" . htmlspecialchars($name) . "</strong>,</p>
                
                <p>vielen Dank für deine Anmeldung als Beta-Tester! Wir freuen uns sehr, dass du Teil unserer Community werden möchtest.</p>
                
                <div class='highlight'>
                    <h3>🚀 Was passiert als nächstes?</h3>
                    <ul>
                        <li>📧 Du erhältst weitere Informationen in den kommenden Tagen</li>
                        <li>🎯 Frühzeitiger Zugang zu neuen Features</li>
                        <li>💬 Direkter Draht zu unserem Entwicklerteam</li>
                        <li>🎁 Exklusive Beta-Tester Vorteile</li>
                    </ul>
                </div>
                
                <p>Bei Fragen kannst du uns jederzeit kontaktieren.</p>
                
                <p>Beste Grüße,<br>
                <strong>Das glocalSpirit Team</strong></p>
            </div>
            <div class='footer'>
                <p>Diese E-Mail wurde automatisch generiert am " . date('d.m.Y H:i:s') . "</p>
            </div>
        </div>
    </body>
    </html>";
}

// ===============================================
// 🔍 ENTWICKLUNGSUMGEBUNG ERKENNUNG
// ===============================================

function isDevelopmentEnvironment() {
    $host = $_SERVER['HTTP_HOST'] ?? '';
    return strpos($host, 'localhost') !== false || 
           strpos($host, '127.0.0.1') !== false ||
           strpos($host, '.local') !== false;
}

?>
