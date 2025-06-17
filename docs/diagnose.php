<?php
// Einfacher PHP-Diagnose-Test für Strato
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== PHP DIAGNOSE TEST ===\n";
echo "PHP Version: " . phpversion() . "\n";
echo "Server: " . ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') . "\n";
echo "Datum: " . date('Y-m-d H:i:s') . "\n\n";

echo "=== CONFIG TEST ===\n";
try {
    require_once 'config.php';
    echo "✅ config.php geladen\n";
    
    echo "SENDER_EMAIL: " . (defined('SENDER_EMAIL') ? SENDER_EMAIL : 'NICHT DEFINIERT') . "\n";
    echo "ADMIN_EMAIL: " . (defined('ADMIN_EMAIL') ? ADMIN_EMAIL : 'NICHT DEFINIERT') . "\n";
    echo "RATE_LIMIT_MAX_REQUESTS: " . (defined('RATE_LIMIT_MAX_REQUESTS') ? RATE_LIMIT_MAX_REQUESTS : 'NICHT DEFINIERT') . "\n";
    echo "RATE_LIMIT_WINDOW: " . (defined('RATE_LIMIT_WINDOW') ? RATE_LIMIT_WINDOW : 'NICHT DEFINIERT') . "\n";
    
} catch (Exception $e) {
    echo "❌ Config-Fehler: " . $e->getMessage() . "\n";
}

echo "\n=== FUNCTION TEST ===\n";
try {
    function testFunction() {
        return "Funktionen funktionieren!";
    }
    echo "✅ " . testFunction() . "\n";
} catch (Exception $e) {
    echo "❌ Function-Fehler: " . $e->getMessage() . "\n";
}

echo "\n=== JSON TEST ===\n";
try {
    $test_array = ['status' => 'ok', 'test' => true];
    $json = json_encode($test_array);
    echo "✅ JSON: " . $json . "\n";
} catch (Exception $e) {
    echo "❌ JSON-Fehler: " . $e->getMessage() . "\n";
}

echo "\n=== ENDE DIAGNOSE ===\n";
?>
