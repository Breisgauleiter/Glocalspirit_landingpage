<?php
// Einfacher PHP-Test für Strato-Server
echo "PHP funktioniert! ✅\n";
echo "PHP Version: " . phpversion() . "\n";
echo "Server: " . $_SERVER['SERVER_SOFTWARE'] . "\n";
echo "POST erlaubt: " . (in_array('POST', explode(',', strtoupper($_SERVER['REQUEST_METHOD'] ?? ''))) ? 'Ja' : 'Unbekannt') . "\n";
echo "Aktueller Pfad: " . __DIR__ . "\n";
echo "Datum: " . date('Y-m-d H:i:s') . "\n";
?>
