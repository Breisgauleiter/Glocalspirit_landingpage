<?php
/**
 * Saubere Konfigurationsdatei für glocalSpirit Backend
 * (Minimal-Version ohne Funktionen)
 */

// ===============================================
// 📧 E-MAIL KONFIGURATION
// ===============================================

// Absender-E-Mail 
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

// Erlaubte Origins für CORS
$allowed_origins = [
    'https://glocalspirit.org',
    'https://www.glocalspirit.org',
    'http://localhost:8000'
];

// Rate Limiting: Maximal 5 Anfragen pro IP in 10 Minuten
define('RATE_LIMIT_MAX_REQUESTS', 5);
define('RATE_LIMIT_WINDOW', 10);

// Teams Integration deaktiviert
define('TEAMS_WEBHOOK_URL', null);
define('ENABLE_TEAMS', false);

?>
