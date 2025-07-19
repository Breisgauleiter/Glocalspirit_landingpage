<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config.php';

$locale = isset($_GET['locale']) ? $_GET['locale'] : 'en';
$validLocales = ['en', 'de', 'es', 'fr'];

if (!in_array($locale, $validLocales)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid locale']);
    exit;
}

$messagesFile = "../../locales/$locale/messages.json";

if (!file_exists($messagesFile)) {
    http_response_code(404);
    echo json_encode(['error' => 'Messages not found']);
    exit;
}

$messages = json_decode(file_get_contents($messagesFile), true);

if ($messages === null) {
    http_response_code(500);
    echo json_encode(['error' => 'Invalid message data']);
    exit;
}

echo json_encode($messages);
