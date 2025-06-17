// Stripe Integration für glocalSpirit Abo-Pakete
// Handling von Checkout Sessions und Payment Processing

// Stripe Instance (wird initialisiert wenn Stripe.js geladen ist)
let stripe = null;

// Stripe Price IDs (echte IDs von Stripe Dashboard)
const STRIPE_PRICES = {
    earlybird: 'price_1RagqmPQ7hNB5R7goFBX14jJ',  // €22/Monat
    premium: 'price_1RanvQPQ7hNB5R7gOSpGuoMt',    // €44/Monat
    business: 'price_1Ranw8PQ7hNB5R7ghbOlhEka'    // €55/Monat
};

// Backend URL für Stripe-Integration
const STRIPE_BACKEND_URL = '/submit_spenden.php';

// Initialisierung wenn DOM und Stripe.js bereit sind
document.addEventListener('DOMContentLoaded', function() {
    initializeStripeIntegration();
});

function initializeStripeIntegration() {
    // Warten bis Stripe.js geladen ist
    if (typeof Stripe === 'undefined') {
        setTimeout(initializeStripeIntegration, 100);
        return;
    }

    // Stripe mit Publishable Key initialisieren (später durch echten Key ersetzen)
    const publishableKey = 'pk_test_your_publishable_key_here'; // TODO: Durch echten Key ersetzen
    stripe = Stripe(publishableKey);

    // Event Listeners für alle Package Buttons
    const packageButtons = document.querySelectorAll('.package-button');
    packageButtons.forEach(button => {
        button.addEventListener('click', handlePackageSelection);
    });

    console.log('✅ Stripe Integration initialisiert');
}

// Handle Package Selection und Stripe Checkout
async function handlePackageSelection(event) {
    event.preventDefault();
    
    const button = event.target;
    const packageType = button.getAttribute('data-package');
    const priceId = button.getAttribute('data-price-id');

    if (!packageType || !priceId) {
        showErrorMessage('Fehler: Paket-Informationen nicht gefunden.');
        return;
    }

    // Button Loading State
    if (typeof animateButtonLoading === 'function') {
        animateButtonLoading(button, true);
    } else {
        button.disabled = true;
        button.innerHTML = '<span class="spinner"></span> Wird geladen...';
    }

    try {
        // Checkout Session erstellen
        const sessionData = await createCheckoutSession(priceId, packageType);
        
        if (sessionData && sessionData.id) {
            // Weiterleitung zu Stripe Checkout
            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionData.id
            });

            if (error) {
                throw new Error(error.message);
            }
        } else {
            throw new Error('Checkout Session konnte nicht erstellt werden.');
        }

    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        showErrorMessage(`Payment konnte nicht gestartet werden: ${error.message}`);
        
        // Button Loading State zurücksetzen
        if (typeof animateButtonLoading === 'function') {
            animateButtonLoading(button, false);
        } else {
            button.disabled = false;
            button.innerHTML = 'JETZT BUCHEN';
        }
    }
}

// Checkout Session über Backend erstellen
async function createCheckoutSession(priceId, packageType) {
    try {
        const response = await fetch(STRIPE_BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'create_checkout',
                price_id: priceId,
                package_type: packageType,
                // Optional: Customer-Daten falls verfügbar
                customer_email: getCustomerEmail() // Falls wir Email-Input haben
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const sessionData = await response.json();
        
        if (sessionData.error) {
            throw new Error(sessionData.error);
        }

        return sessionData;

    } catch (error) {
        console.error('Backend API Error:', error);
        throw error;
    }
}

// Optional: Customer Email ermitteln (falls wir ein Input-Feld haben)
function getCustomerEmail() {
    const emailInput = document.querySelector('input[type="email"]');
    return emailInput ? emailInput.value : null;
}

// Error Message anzeigen
function showErrorMessage(message) {
    const errorContainer = document.getElementById('error-message');
    const messageText = errorContainer.querySelector('.message-text');
    
    if (errorContainer && messageText) {
        messageText.textContent = message;
        errorContainer.style.display = 'flex';
        
        // Container sichtbar machen
        const messageContainer = document.getElementById('message-container');
        if (messageContainer) {
            messageContainer.style.display = 'block';
        }
        
        // Animation wenn verfügbar
        if (typeof animateMessage === 'function') {
            animateMessage(errorContainer, true);
        }
        
        // Auto-hide nach 8 Sekunden
        setTimeout(() => {
            hideMessage();
        }, 8000);
    } else {
        // Fallback: Browser alert
        alert(`Fehler: ${message}`);
    }
}

// Success Message anzeigen
function showSuccessMessage(message) {
    const successContainer = document.getElementById('success-message');
    const messageText = successContainer.querySelector('.message-text');
    
    if (successContainer && messageText) {
        messageText.textContent = message;
        successContainer.style.display = 'flex';
        
        // Container sichtbar machen
        const messageContainer = document.getElementById('message-container');
        if (messageContainer) {
            messageContainer.style.display = 'block';
        }
        
        // Animation wenn verfügbar
        if (typeof animateMessage === 'function') {
            animateMessage(successContainer, true);
        }
        
        // Auto-hide nach 5 Sekunden
        setTimeout(() => {
            hideMessage();
        }, 5000);
    }
}

// Message verstecken
function hideMessage() {
    const errorContainer = document.getElementById('error-message');
    const successContainer = document.getElementById('success-message');
    const messageContainer = document.getElementById('message-container');
    
    if (typeof animateMessage === 'function') {
        if (errorContainer && errorContainer.style.display !== 'none') {
            animateMessage(errorContainer, false);
        }
        if (successContainer && successContainer.style.display !== 'none') {
            animateMessage(successContainer, false);
        }
    } else {
        if (errorContainer) errorContainer.style.display = 'none';
        if (successContainer) successContainer.style.display = 'none';
    }
    
    // Container verstecken wenn keine Messages mehr sichtbar
    setTimeout(() => {
        if (messageContainer) {
            const hasVisibleMessages = 
                (errorContainer && errorContainer.style.display !== 'none') ||
                (successContainer && successContainer.style.display !== 'none');
            
            if (!hasVisibleMessages) {
                messageContainer.style.display = 'none';
            }
        }
    }, 500);
}

// URL Parameter für Success/Error Handling
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Success Parameter (von Stripe Success URL)
    if (urlParams.get('success') === 'true') {
        const sessionId = urlParams.get('session_id');
        showSuccessMessage('Vielen Dank für deine Unterstützung! Dein Abo wurde erfolgreich erstellt.');
        
        // URL Parameter entfernen für saubere URL
        if (window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
    
    // Error Parameter
    if (urlParams.get('error') === 'true') {
        const errorMsg = urlParams.get('error_message') || 'Es gab ein Problem mit der Zahlung.';
        showErrorMessage(decodeURIComponent(errorMsg));
        
        // URL Parameter entfernen
        if (window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
}

// URL Parameters beim Laden der Seite prüfen
document.addEventListener('DOMContentLoaded', function() {
    // Kurz warten, damit andere Scripts geladen sind
    setTimeout(handleURLParameters, 500);
});

// Global verfügbare Funktionen
window.hideMessage = hideMessage;
window.showErrorMessage = showErrorMessage;
window.showSuccessMessage = showSuccessMessage;

// Debug-Funktion für Entwicklung
function debugStripeIntegration() {
    console.log('🔍 Stripe Integration Debug Info:');
    console.log('Stripe Instance:', stripe);
    console.log('Price IDs:', STRIPE_PRICES);
    console.log('Backend URL:', STRIPE_BACKEND_URL);
    console.log('Package Buttons:', document.querySelectorAll('.package-button').length);
}

// Debug in Development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugStripeIntegration = debugStripeIntegration;
}
