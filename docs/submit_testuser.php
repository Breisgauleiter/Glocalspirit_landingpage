<?php
/**
 * Testnutzer-Backend für glocalSpirit
 * 
 * Verarbeitet Formular-Submissions und sendet:
 * - Teams-Nachrichten per Webhook
 * - Bestätigungs-E-Mails
 * - Loggt Anmeldungen in Datei
 * 
 * @author GitHub Copilot
 * @version 1.0
 */

// Konfiguration laden
require_once 'config.php';

// ===============================================
// 🛡️ SICHERHEIT & CORS
// ===============================================

/**
 * CORS Headers setzen
 */
function setCorsHeaders() {
    global $allowed_origins;
    
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
    }
    
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 3600");
}

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
        $requests = $content ? json_decode($content, true) : [];
    }
    
    // Alte Requests entfernen (außerhalb des Zeitfensters)
    $requests = array_filter($requests, function($timestamp) use ($now) {
        return ($now - $timestamp) < RATE_LIMIT_TIME_WINDOW;
    });
    
    // Prüfen ob Limit erreicht
    if (count($requests) >= RATE_LIMIT_MAX_REQUESTS) {
        sendErrorResponse('Zu viele Anfragen. Bitte warte einen Moment.', 429);
        return false;
    }
    
    // Aktuelle Request hinzufügen
    $requests[] = $now;
    file_put_contents($rate_file, json_encode($requests));
    
    return true;
}

// ===============================================
// 📝 VALIDIERUNG
// ===============================================

/**
 * Eingaben validieren
 */
function validateInput($data) {
    $errors = [];
    
    // Name prüfen
    if (empty($data['name']) || trim($data['name']) === '') {
        $errors[] = 'Name darf nicht leer sein.';
    } elseif (strlen(trim($data['name'])) < 2) {
        $errors[] = 'Name muss mindestens 2 Zeichen lang sein.';
    } elseif (strlen(trim($data['name'])) > 100) {
        $errors[] = 'Name darf maximal 100 Zeichen lang sein.';
    } elseif (!preg_match('/^[a-zA-ZäöüÄÖÜß\s\-\.\']+$/u', trim($data['name']))) {
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
    
    return $errors;
}

/**
 * Eingaben säubern
 */
function sanitizeInput($data) {
    return [
        'name' => trim(htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8')),
        'email' => trim(strtolower($data['email'])),
        'newsletter' => isset($data['newsletter']) ? (bool)$data['newsletter'] : false
    ];
}

// ===============================================
// 📨 TEAMS WEBHOOK
// ===============================================

/**
 * Nachricht an Teams senden
 */
function sendTeamsMessage($name, $email, $newsletter) {
    $webhook_url = TEAMS_WEBHOOK_URL;
    
    // In Entwicklungsumgebung simulieren
    if (isDevelopmentEnvironment()) {
        error_log("🔧 DEV: Teams-Nachricht würde gesendet werden für: $name ($email)");
        return ['success' => true, 'simulated' => true];
    }
    
    // Webhook URL prüfen
    if (strpos($webhook_url, 'YOUR_WEBHOOK_ID') !== false) {
        throw new Exception('Teams Webhook URL ist noch nicht konfiguriert.');
    }
    
    $message = getTeamsMessage($name, $email, $newsletter);
    
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => [
                'Content-Type: application/json',
                'User-Agent: glocalSpirit-Backend/1.0'
            ],
            'content' => json_encode($message),
            'timeout' => 10
        ]
    ]);
    
    $result = @file_get_contents($webhook_url, false, $context);
    
    if ($result === false) {
        throw new Exception('Teams-Webhook konnte nicht erreicht werden.');
    }
    
    return ['success' => true, 'response' => $result];
}

// ===============================================
// 📧 E-MAIL VERSAND
// ===============================================

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
// 🔄 RESPONSE HANDLING
// ===============================================

/**
 * Erfolgreiche Response senden
 */
function sendSuccessResponse($message = 'Anmeldung erfolgreich verarbeitet.') {
    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'message' => $message,
        'timestamp' => date('c')
    ]);
    exit;
}

/**
 * Fehler-Response senden
 */
function sendErrorResponse($message, $code = 400) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => $message,
        'timestamp' => date('c')
    ]);
    exit;
}

// ===============================================
// 🚀 HAUPTVERARBEITUNG
// ===============================================

try {
    // CORS Headers setzen
    setCorsHeaders();
    
    // OPTIONS Request (Preflight) behandeln
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
    
    // Nur POST-Requests erlauben
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendErrorResponse('Nur POST-Requests sind erlaubt.', 405);
    }
    
    // Rate Limiting prüfen
    if (!checkRateLimit()) {
        exit; // Response wird in checkRateLimit() gesendet
    }
    
    // JSON-Daten lesen
    $json_input = file_get_contents('php://input');
    $input_data = json_decode($json_input, true);
    
    // JSON-Parsing prüfen
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendErrorResponse('Ungültige JSON-Daten.');
    }
    
    // Eingaben validieren
    $validation_errors = validateInput($input_data);
    if (!empty($validation_errors)) {
        sendErrorResponse('Validierungsfehler: ' . implode(' ', $validation_errors));
    }
    
    // Eingaben säubern
    $clean_data = sanitizeInput($input_data);
    
    // Alle Aktionen ausführen
    $results = [];
    
    // 1️⃣ Teams-Nachricht senden
    try {
        $teams_result = sendTeamsMessage($clean_data['name'], $clean_data['email'], $clean_data['newsletter']);
        $results['teams'] = $teams_result;
    } catch (Exception $e) {
        error_log("Teams-Fehler: " . $e->getMessage());
        $results['teams'] = ['success' => false, 'error' => $e->getMessage()];
    }
    
    // 2️⃣ E-Mail senden
    try {
        $email_result = sendConfirmationEmail($clean_data['name'], $clean_data['email']);
        $results['email'] = $email_result;
    } catch (Exception $e) {
        error_log("E-Mail-Fehler: " . $e->getMessage());
        $results['email'] = ['success' => false, 'error' => $e->getMessage()];
    }
    
    // 3️⃣ Logging
    try {
        logRegistration($clean_data['name'], $clean_data['email'], $clean_data['newsletter']);
        $results['logging'] = ['success' => true];
    } catch (Exception $e) {
        error_log("Logging-Fehler: " . $e->getMessage());
        $results['logging'] = ['success' => false, 'error' => $e->getMessage()];
    }
    
    // Erfolgreiche Response (auch bei Teil-Fehlern)
    $success_message = "Anmeldung erfolgreich verarbeitet!";
    
    // In Entwicklungsumgebung Details hinzufügen
    if (isDevelopmentEnvironment()) {
        $success_message .= " (Debug: " . json_encode($results) . ")";
    }
    
    sendSuccessResponse($success_message);
    
} catch (Exception $e) {
    // Allgemeine Fehlerbehandlung
    error_log("Backend-Fehler: " . $e->getMessage());
    sendErrorResponse('Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.', 500);
}

?>
