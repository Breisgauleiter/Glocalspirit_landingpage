// Spenden-Formular Validation und UX Enhancements
// Client-side Validierung vor Stripe-Weiterleitung

document.addEventListener('DOMContentLoaded', function() {
    initializeSpendenValidation();
});

function initializeSpendenValidation() {
    // Form Validation Setup
    setupClientValidation();
    
    // UX Enhancements
    setupUXEnhancements();
    
    console.log('✅ Spenden-Validation initialisiert');
}

// Client-side Validation Setup
function setupClientValidation() {
    const packageButtons = document.querySelectorAll('.package-button');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            if (!validateBeforeStripe(event)) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        });
    });
}

// Validation vor Stripe-Weiterleitung
function validateBeforeStripe(event) {
    const button = event.target;
    const packageCard = button.closest('.package-card');
    
    // Check if button is already processing
    if (button.disabled) {
        showValidationError('Zahlung wird bereits verarbeitet. Bitte warten...');
        return false;
    }
    
    // Check if package data is valid
    const packageType = button.getAttribute('data-package');
    const priceId = button.getAttribute('data-price-id');
    
    if (!packageType || !priceId) {
        showValidationError('Fehler: Paket-Informationen sind unvollständig.');
        return false;
    }
    
    // Check if Stripe is loaded
    if (typeof Stripe === 'undefined') {
        showValidationError('Zahlung-Service wird geladen. Bitte versuchen Sie es in einem Moment erneut.');
        return false;
    }
    
    // Check internet connection (basic)
    if (!navigator.onLine) {
        showValidationError('Keine Internetverbindung. Bitte prüfen Sie Ihre Verbindung.');
        return false;
    }
    
    // All validations passed
    return true;
}

// UX Enhancements Setup
function setupUXEnhancements() {
    // Double-click prevention
    setupDoubleClickPrevention();
    
    // Loading states for better UX
    setupLoadingStates();
    
    // Keyboard navigation
    setupKeyboardNavigation();
    
    // Focus management
    setupFocusManagement();
}

// Prevent double-clicking on buttons
function setupDoubleClickPrevention() {
    const packageButtons = document.querySelectorAll('.package-button');
    
    packageButtons.forEach(button => {
        let isProcessing = false;
        
        button.addEventListener('click', function(event) {
            if (isProcessing) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            
            isProcessing = true;
            
            // Reset after 10 seconds (fallback)
            setTimeout(() => {
                isProcessing = false;
            }, 10000);
        });
    });
}

// Enhanced Loading States
function setupLoadingStates() {
    const packageButtons = document.querySelectorAll('.package-button');
    
    packageButtons.forEach(button => {
        // Add loading class for CSS animations
        button.addEventListener('click', function() {
            if (!button.disabled) {
                button.classList.add('loading');
                
                // Remove loading class if process fails
                setTimeout(() => {
                    if (button.classList.contains('loading')) {
                        button.classList.remove('loading');
                    }
                }, 30000); // 30 second timeout
            }
        });
    });
}

// Keyboard Navigation Support
function setupKeyboardNavigation() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        const button = card.querySelector('.package-button');
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        
        // Enter key activates button
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                if (button && !button.disabled) {
                    button.click();
                }
            }
        });
        
        // Arrow key navigation
        card.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                navigatePackages(event.key, card);
            }
        });
    });
}

// Arrow key navigation between packages
function navigatePackages(direction, currentCard) {
    const allCards = Array.from(document.querySelectorAll('.package-card'));
    const currentIndex = allCards.indexOf(currentCard);
    
    let nextIndex;
    if (direction === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % allCards.length;
    } else {
        nextIndex = currentIndex === 0 ? allCards.length - 1 : currentIndex - 1;
    }
    
    const nextCard = allCards[nextIndex];
    if (nextCard) {
        nextCard.focus();
    }
}

// Focus Management
function setupFocusManagement() {
    // Return focus to appropriate element after modal/alert closes
    let lastFocusedElement = null;
    
    document.addEventListener('focusin', function(event) {
        lastFocusedElement = event.target;
    });
    
    // Focus management for messages
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const isVisible = messageContainer.style.display !== 'none';
                    if (isVisible) {
                        // Focus close button when message appears
                        const closeButton = messageContainer.querySelector('.message-close');
                        if (closeButton) {
                            setTimeout(() => closeButton.focus(), 100);
                        }
                    }
                }
            });
        });
        
        observer.observe(messageContainer, { attributes: true });
    }
}

// Show validation error
function showValidationError(message) {
    // Use existing error message system if available
    if (typeof showErrorMessage === 'function') {
        showErrorMessage(message);
    } else {
        // Fallback to alert
        alert(message);
    }
    
    console.warn('Validation Error:', message);
}

// Form data validation (if we add email input later)
function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Network status monitoring
function setupNetworkMonitoring() {
    window.addEventListener('online', function() {
        showSuccessMessage('Internetverbindung wiederhergestellt.');
    });
    
    window.addEventListener('offline', function() {
        showValidationError('Internetverbindung unterbrochen. Zahlungen sind momentan nicht möglich.');
    });
}

// Initialize network monitoring
setupNetworkMonitoring();

// Utility function: Check if all required services are available
function checkServiceAvailability() {
    const checks = {
        stripe: typeof Stripe !== 'undefined',
        network: navigator.onLine,
        gsap: typeof gsap !== 'undefined'
    };
    
    return checks;
}

// Debug function for development
function debugValidation() {
    console.log('🔍 Validation Debug Info:');
    console.log('Service Availability:', checkServiceAvailability());
    console.log('Package Buttons:', document.querySelectorAll('.package-button').length);
    console.log('Package Cards:', document.querySelectorAll('.package-card').length);
}

// Export for debugging
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugValidation = debugValidation;
    window.checkServiceAvailability = checkServiceAvailability;
}

// Global utility functions
window.validateEmailFormat = validateEmailFormat;
window.showValidationError = showValidationError;
