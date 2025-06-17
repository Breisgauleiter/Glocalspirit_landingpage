<?php
// Ultra-einfaches Backend für glocalSpirit (Minimal-Version)
require_once 'config.php';

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// OPTIONS Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

// GET Request: Status
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'status' => 'Backend aktiv',
        'version' => 'minimal',
        'php_version' => phpversion()
    ]);
    exit();
}

// POST Request: Verarbeitung
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Input lesen
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (!$data) {
            throw new Exception('Keine Daten empfangen');
        }
        
        $name = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        $newsletter = $data['newsletter'] ?? false;
        
        // Einfache Validation
        if (empty($name)) throw new Exception('Name fehlt');
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Ungültige E-Mail');
        }
        
        // E-Mail senden (einfach)
        $subject = EMAIL_SUBJECT;
        $message = "Hallo $name,\n\nvielen Dank für Ihre Anmeldung bei glocalSpirit!\n\nIhr Team";
        $headers = "From: " . SENDER_EMAIL;
        
        $success = mail($email, $subject, $message, $headers);
        
        // Admin-E-Mail
        $admin_subject = "Neue Anmeldung: $name";
        $admin_message = "Neue Testnutzer-Anmeldung:\n\nName: $name\nE-Mail: $email\nNewsletter: " . ($newsletter ? 'Ja' : 'Nein');
        mail(ADMIN_EMAIL, $admin_subject, $admin_message, $headers);
        
        if ($success) {
            echo json_encode(['success' => true, 'message' => 'Anmeldung erfolgreich']);
        } else {
            throw new Exception('E-Mail konnte nicht versendet werden');
        }
        
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit();
}

// Andere Methoden
http_response_code(405);
echo json_encode(['error' => 'Methode nicht erlaubt']);
?>
