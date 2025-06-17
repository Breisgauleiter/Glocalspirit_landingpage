<?php
echo "=== CONFIG TEST ===\n";

// Test 1: Dateizugriff
if (file_exists('config.php')) {
    echo "✅ config.php existiert\n";
} else {
    echo "❌ config.php nicht gefunden\n";
    exit();
}

// Test 2: Config laden
try {
    require_once 'config.php';
    echo "✅ config.php geladen\n";
} catch (Error $e) {
    echo "❌ Config-Fehler: " . $e->getMessage() . "\n";
    exit();
}

// Test 3: Konstanten prüfen
$required_constants = [
    'SENDER_EMAIL',
    'ADMIN_EMAIL', 
    'EMAIL_SUBJECT',
    'ADMIN_EMAIL_SUBJECT'
];

foreach ($required_constants as $const) {
    if (defined($const)) {
        echo "✅ $const: " . constant($const) . "\n";
    } else {
        echo "❌ $const nicht definiert\n";
    }
}

echo "=== ENDE CONFIG TEST ===\n";
?>
