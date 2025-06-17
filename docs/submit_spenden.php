<?php
/**
 * Stripe Checkout Session Handler für glocalSpirit Abo-Pakete
 * Erstellt Stripe Checkout Sessions für monatliche Abonnements
 * 
 * @author glocalSpirit Team
 * @version 1.0
 */

// CORS Headers für Frontend-Integration
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Nur POST-Requests erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Stripe PHP SDK laden (via Composer oder direkt)
require_once 'vendor/autoload.php'; // Falls Composer verwendet wird
// Alternativ: require_once 'stripe-php/init.php'; // Falls direkt eingebunden

// Stripe konfigurieren
$stripeSecretKey = getenv('STRIPE_SECRET_KEY');
if (!$stripeSecretKey) {
    http_response_code(500);
    echo json_encode(['error' => 'Stripe Secret Key nicht gesetzt']);
    exit();
}
\Stripe\Stripe::setApiKey($stripeSecretKey); // Stripe Secret Key aus Umgebungsvariable

try {
    // JSON Input parsen
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Keine gültigen JSON-Daten empfangen');
    }
    
    // Validierung der erforderlichen Parameter
    if (!isset($input['priceId']) || !isset($input['packageType'])) {
        throw new Exception('Fehlende Parameter: priceId und packageType erforderlich');
    }
    
    $priceId = $input['priceId'];
    $packageType = $input['packageType'];
    
    // Validierung der Package-Typen
    $allowedPackages = ['earlybird', 'premium', 'business'];
    if (!in_array($packageType, $allowedPackages)) {
        throw new Exception('Ungültiger Package-Typ');
    }
    
    // Stripe Price IDs Mapping (Sicherheitscheck)
    $validPriceIds = [
        'earlybird' => 'price_1RagqmPQ7hNB5R7goFBX14jJ',  // €22/Monat
        'premium' => 'price_1RanvQPQ7hNB5R7gOSpGuoMt',    // €44/Monat
        'business' => 'price_1Ranw8PQ7hNB5R7ghbOlhEka'    // €55/Monat
    ];
    
    // Sicherheitsprüfung: Nur erlaubte Price IDs verwenden
    if (!in_array($priceId, $validPriceIds) || $validPriceIds[$packageType] !== $priceId) {
        throw new Exception('Ungültige Price ID');
    }
    
    // Package-Details für Metadaten
    $packageDetails = [
        'earlybird' => [
            'name' => 'Early Bird Paket', 
            'amount' => 2200, // €22.00
            'description' => 'Persönliches Onboarding'
        ],
        'premium' => [
            'name' => 'Premium Paket', 
            'amount' => 4400, // €44.00
            'description' => 'Persönliches Onboarding + Support Mentor'
        ],
        'business' => [
            'name' => 'Business Paket', 
            'amount' => 5500, // €55.00
            'description' => 'Premium + Newsletter-Versand + Pinnwand'
        ]
    ];
    
    // Success und Cancel URLs
    $baseUrl = 'https://glocalspirit.org'; // TODO: Durch echte Domain ersetzen
    $successUrl = $baseUrl . '/spenden-success.html?session_id={CHECKOUT_SESSION_ID}';
    $cancelUrl = $baseUrl . '/spendenformular.html?cancelled=true';
    
    // Stripe Checkout Session erstellen
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card', 'sepa_debit'],
        'mode' => 'subscription',
        'line_items' => [[
            'price' => $priceId,
            'quantity' => 1,
        ]],
        'success_url' => $successUrl,
        'cancel_url' => $cancelUrl,
        'metadata' => [
            'package_type' => $packageType,
            'package_name' => $packageDetails[$packageType]['name'],
            'package_description' => $packageDetails[$packageType]['description'],
            'source' => 'glocalSpirit_Landing_Page',
            'timestamp' => date('Y-m-d H:i:s')
        ],
        'subscription_data' => [
            'metadata' => [
                'package_type' => $packageType,
                'source' => 'glocalSpirit_Landing_Page'
            ]
        ],
        'customer_creation' => 'always',
        'billing_address_collection' => 'required',
        'locale' => 'de'
    ]);
    
    // Erfolgreiche Response
    $response = [
        'success' => true,
        'id' => $session->id,
        'url' => $session->url,
        'package' => $packageType,
        'message' => 'Checkout Session erfolgreich erstellt'
    ];
    
    // Logging für Debugging (optional)
    error_log("Stripe Checkout Session erstellt: " . $session->id . " für Package: " . $packageType);
    
    echo json_encode($response);
    
} catch (\Stripe\Exception\CardException $e) {
    // Karten-spezifische Fehler
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Kartenfehler: ' . $e->getError()->message
    ]);
    
} catch (\Stripe\Exception\RateLimitException $e) {
    // Rate Limit erreicht
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'error' => 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.'
    ]);
    
} catch (\Stripe\Exception\InvalidRequestException $e) {
    // Ungültige Parameter
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Ungültige Anfrage: ' . $e->getMessage()
    ]);
    
} catch (\Stripe\Exception\AuthenticationException $e) {
    // Authentifizierungsfehler
    http_response_code(401);
    error_log("Stripe Authentication Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => 'Authentifizierungsfehler'
    ]);
    
} catch (\Stripe\Exception\ApiConnectionException $e) {
    // Netzwerk-Verbindungsfehler
    http_response_code(503);
    echo json_encode([
        'success' => false,
        'error' => 'Verbindungsfehler. Bitte versuchen Sie es später erneut.'
    ]);
    
} catch (\Stripe\Exception\ApiErrorException $e) {
    // Allgemeine Stripe API Fehler
    http_response_code(500);
    error_log("Stripe API Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
    ]);
    
} catch (Exception $e) {
    // Allgemeine Fehler
    http_response_code(500);
    error_log("Allgemeiner Fehler in submit_spenden.php: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => 'Ein unerwarteter Fehler ist aufgetreten: ' . $e->getMessage()
    ]);
}
?>
