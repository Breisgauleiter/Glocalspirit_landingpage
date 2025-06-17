<?php
/**
 * Testnutzer-Backend für glocalSpirit (Strato-optimiert)
 * 
 * Verarbeitet Formular-Submissions und sendet:
 * - Admin-Benachrichtigungen per E-Mail
 * - Bestätigungs-E-Mails
 * - Loggt Anmeldungen in Datei
 * 
 * @author GitHub Copilot
 * @version 1.1 (Strato-optimiert)
 */

// Konfiguration laden
require_once 'config.php';

// Sofort CORS-Headers setzen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Max-Age: 3600");
header("Content-Type: application/json; charset=UTF-8");

// OPTIONS-Request behandeln (Preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Nur POST-Requests erlauben für echte Submissions
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // GET-Request: Status-Info zurückgeben
        echo json_encode([
            'status' => 'Backend aktiv',
            'version' => '1.1',
            'php_version' => phpversion(),
            'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
            'timestamp' => date('Y-m-d H:i:s'),
            'method_allowed' => 'POST',
            'current_method' => $_SERVER['REQUEST_METHOD']
        ]);
        exit();
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Nur POST-Requests erlaubt']);
        exit();
    }
}

// ===============================================
// 🛡️ SICHERHEIT & RATE LIMITING
// ===============================================

/**
 * Rate Limiting prüfen
 */
function checkRateLimit() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $rate_file = "rate_limit_" . md5($ip) . ".txt";
    
    $now = time();
    $requests = [];
    
    // Bestehende Requests laden
    if (file_exists($rate_file)) {
        $content = file_get_contents($rate_file);
        if ($content) {
            $requests = array_filter(explode("\n", $content));
        }
    }
    
    // Veraltete Requests entfernen (älter als 10 Minuten)
    $requests = array_filter($requests, function($timestamp) use ($now) {
        return ($now - intval($timestamp)) < (RATE_LIMIT_WINDOW * 60);
    });
    
    // Aktuellen Request hinzufügen
    $requests[] = $now;
    
    // Limit prüfen
    if (count($requests) > RATE_LIMIT_MAX_REQUESTS) {
        throw new Exception('Rate Limit überschritten. Versuchen Sie es später erneut.');
    }
    
    // Requests speichern
    file_put_contents($rate_file, implode("\n", $requests));
    
    return true;
}

/**
 * Entwicklungsumgebung erkennen
 */
function isDevelopmentEnvironment() {
    $host = $_SERVER['HTTP_HOST'] ?? '';
    return (strpos($host, 'localhost') !== false || 
            strpos($host, '127.0.0.1') !== false ||
            strpos($host, '.local') !== false);
}

// ===============================================
// 📧 E-MAIL FUNKTIONEN
// ===============================================

/**
 * Admin-Benachrichtigung per E-Mail senden
 */
function sendAdminNotification($name, $email, $newsletter) {
    // In Entwicklungsumgebung simulieren
    if (isDevelopmentEnvironment()) {
        error_log("🔧 DEV: Admin-E-Mail würde gesendet werden für: $name ($email)");
        return ['success' => true, 'simulated' => true];
    }
    
    $subject = ADMIN_EMAIL_SUBJECT;
    $message = getAdminEmailTemplate($name, $email, $newsletter);
    
    // E-Mail Headers
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . SENDER_NAME . ' <' . SENDER_EMAIL . '>',
        'Reply-To: ' . SENDER_EMAIL,
        'X-Mailer: glocalSpirit-Backend/1.0'
    ];
    
    $success = mail(ADMIN_EMAIL, $subject, $message, implode("\r\n", $headers));
    
    if (!$success) {
        error_log("⚠️ Admin-E-Mail konnte nicht versendet werden an: " . ADMIN_EMAIL);
        return ['success' => false, 'error' => 'Admin-E-Mail fehlgeschlagen'];
    }
    
    return ['success' => true];
}

/**
 * E-Mail-Template für Admin-Benachrichtigung
 */
function getAdminEmailTemplate($name, $email, $newsletter) {
    $newsletter_text = $newsletter ? 'Ja' : 'Nein';
    
    return "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .data-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .data-table th, .data-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        .data-table th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🎉 Neue Testnutzer-Anmeldung</h2>
            <p>glocalSpirit Landing Page</p>
        </div>
        <div class='content'>
            <p>Eine neue Person hat sich als Testnutzer angemeldet:</p>
            
            <table class='data-table'>
                <tr>
                    <th>Name:</th>
                    <td>$name</td>
                </tr>
                <tr>
                    <th>E-Mail:</th>
                    <td>$email</td>
                </tr>
                <tr>
                    <th>Newsletter:</th>
                    <td>$newsletter_text</td>
                </tr>
                <tr>
                    <th>Zeitpunkt:</th>
                    <td>" . date('d.m.Y H:i:s') . "</td>
                </tr>
            </table>
            
            <p>Die Person wurde automatisch über die Anmeldung informiert.</p>
            
            <hr>
            <p style='font-size: 12px; color: #666;'>
                Diese E-Mail wurde automatisch vom glocalSpirit Backend-System generiert.
            </p>
        </div>
    </div>
</body>
</html>";
}

/**
 * Bestätigungs-E-Mail senden
 */
function sendConfirmationEmail($name, $email) {
    // In Entwicklungsumgebung simulieren
    if (isDevelopmentEnvironment()) {
        error_log("🔧 DEV: E-Mail würde gesendet werden an: $email");
        return ['success' => true, 'simulated' => true];
    }
    
    $subject = EMAIL_SUBJECT;
    $message = getEmailTemplate($name);
    
    // E-Mail Headers
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . SENDER_NAME . ' <' . SENDER_EMAIL . '>',
        'Reply-To: ' . SENDER_EMAIL,
        'X-Mailer: glocalSpirit-Backend/1.0'
    ];
    
    $success = mail($email, $subject, $message, implode("\r\n", $headers));
    
    if (!$success) {
        throw new Exception('E-Mail konnte nicht versendet werden.');
    }
    
    return ['success' => true];
}

/**
 * E-Mail-Template für Testnutzer
 */
function getEmailTemplate($name) {
    return "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🎉 Willkommen bei glocalSpirit!</h2>
            <p>Ihre Testnutzer-Anmeldung war erfolgreich</p>
        </div>
        <div class='content'>
            <p>Hallo $name,</p>
            
            <p>vielen Dank für Ihr Interesse an glocalSpirit! Ihre Anmeldung als Testnutzer war erfolgreich.</p>
            
            <p>Wir werden Sie über die Entwicklungen unserer Plattform auf dem Laufenden halten und Sie rechtzeitig über den Start der Beta-Phase informieren.</p>
            
            <a href='https://glocalspirit.org' class='button'>Zur Website</a>
            
            <p>Bei Fragen können Sie uns jederzeit kontaktieren.</p>
            
            <p>Vielen Dank und herzliche Grüße,<br>
            Ihr glocalSpirit Team</p>
            
            <hr>
            <p style='font-size: 12px; color: #666;'>
                Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
            </p>
        </div>
    </div>
</body>
</html>";
}

// ===============================================
// 📁 LOGGING
// ===============================================

/**
 * Anmeldung in Log-Datei schreiben
 */
function logRegistration($name, $email, $newsletter) {
    $log_file = LOG_FILE;
    
    // Log-Datei rotieren wenn zu groß
    if (file_exists($log_file) && filesize($log_file) > MAX_LOG_SIZE) {
        $backup_file = str_replace('.txt', '_' . date('Y-m-d_H-i-s') . '.txt', $log_file);
        rename($log_file, $backup_file);
    }
    
    $log_entry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'newsletter' => $newsletter,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];
    
    $log_line = json_encode($log_entry) . "\n";
    
    if (file_put_contents($log_file, $log_line, FILE_APPEND | LOCK_EX) === false) {
        error_log("Warnung: Log-Datei konnte nicht geschrieben werden.");
    }
}

// ===============================================
// 🔍 VALIDATION
// ===============================================

/**
 * Input-Daten validieren und sanitizen
 */
function validateAndSanitizeInput($data) {
    $errors = [];
    
    // Name prüfen
    if (empty($data['name']) || trim($data['name']) === '') {
        $errors[] = 'Name darf nicht leer sein.';
    } elseif (strlen(trim($data['name'])) > 100) {
        $errors[] = 'Name ist zu lang (max. 100 Zeichen).';
    } elseif (!preg_match('/^[a-zA-ZäöüÄÖÜß\s\-\.]+$/u', trim($data['name']))) {
        $errors[] = 'Name enthält ungültige Zeichen.';
    }
    
    // E-Mail prüfen
    if (empty($data['email']) || trim($data['email']) === '') {
        $errors[] = 'E-Mail darf nicht leer sein.';
    } elseif (!filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'E-Mail-Adresse ist ungültig.';
    } elseif (strlen(trim($data['email'])) > 254) {
        $errors[] = 'E-Mail-Adresse ist zu lang.';
    }
    
    // Newsletter-Checkbox (optional)
    $newsletter = isset($data['newsletter']) && 
                  ($data['newsletter'] === true || 
                   $data['newsletter'] === 'true' || 
                   $data['newsletter'] === '1' || 
                   $data['newsletter'] === 1);
    
    if (!empty($errors)) {
        throw new Exception('Validierungsfehler: ' . implode(' ', $errors));
    }
    
    return [
        'name' => trim($data['name']),
        'email' => strtolower(trim($data['email'])),
        'newsletter' => $newsletter
    ];
}

// ===============================================
// 🔄 RESPONSE HANDLING
// ===============================================

/**
 * Erfolgreiche Response senden
 */
function sendSuccessResponse($message = 'Anmeldung erfolgreich verarbeitet.') {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit();
}

/**
 * Fehler-Response senden
 */
function sendErrorResponse($message, $code = 400) {
    http_response_code($code);
    echo json_encode([
        'success' => false,
        'error' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit();
}

// ===============================================
// 🚀 MAIN PROCESSING
// ===============================================

try {
    // Rate Limiting prüfen
    checkRateLimit();
    
    // JSON-Input lesen
    $json_input = file_get_contents('php://input');
    
    if (empty($json_input)) {
        throw new Exception('Keine Daten empfangen.');
    }
    
    $input_data = json_decode($json_input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Ungültige JSON-Daten: ' . json_last_error_msg());
    }
    
    // Daten validieren und sanitizen
    $clean_data = validateAndSanitizeInput($input_data);
    
    // Alle Aktionen ausführen
    $results = [];
    
    // 1️⃣ Bestätigungs-E-Mail an Nutzer senden
    try {
        $email_result = sendConfirmationEmail($clean_data['name'], $clean_data['email']);
        $results['email'] = $email_result;
    } catch (Exception $e) {
        error_log("E-Mail-Fehler: " . $e->getMessage());
        $results['email'] = ['success' => false, 'error' => $e->getMessage()];
    }
    
    // 2️⃣ Admin-Benachrichtigung senden
    try {
        $admin_result = sendAdminNotification($clean_data['name'], $clean_data['email'], $clean_data['newsletter']);
        $results['admin_email'] = $admin_result;
    } catch (Exception $e) {
        error_log("Admin-E-Mail-Fehler: " . $e->getMessage());
        $results['admin_email'] = ['success' => false, 'error' => $e->getMessage()];
    }
    
    // 3️⃣ Logging
    try {
        logRegistration($clean_data['name'], $clean_data['email'], $clean_data['newsletter']);
        $results['logging'] = ['success' => true];
    } catch (Exception $e) {
        error_log("Logging-Fehler: " . $e->getMessage());
        $results['logging'] = ['success' => false, 'error' => $e->getMessage()];
    }
    
    // Erfolg prüfen (mindestens E-Mail muss funktionieren)
    if ($results['email']['success']) {
        sendSuccessResponse('Anmeldung erfolgreich! Sie erhalten eine Bestätigungs-E-Mail.');
    } else {
        throw new Exception('E-Mail-Versand fehlgeschlagen: ' . ($results['email']['error'] ?? 'Unbekannter Fehler'));
    }
    
} catch (Exception $e) {
    error_log("Backend-Fehler: " . $e->getMessage());
    sendErrorResponse($e->getMessage());
}
?>
