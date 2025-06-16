// Backend Integration für Testnutzer-Formular
// PHP Backend Integration

class FormBackend {
    constructor() {
        // Verwende die Konfiguration wenn verfügbar, sonst Fallback
        this.backendUrl = window.getBackendUrl ? getBackendUrl() : 
            'https://deine-domain.de/submit_testuser.php';
        
        // Backup URL für Entwicklung/Testing
        this.isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        // Einstellungen aus Konfiguration laden
        this.config = window.PHP_BACKEND_CONFIG?.SETTINGS || {
            timeout: 30000,
            retryAttempts: 2,
            enableLogging: true,
            fallbackToSimulation: true
        };
    }

    /**
     * Sendet Formulardaten an PHP Backend
     * @param {Object} formData - Die Formulardaten
     * @param {string} formData.name - Name des Benutzers
     * @param {string} formData.email - E-Mail des Benutzers
     * @param {boolean} formData.newsletter - Newsletter-Subscription
     * @returns {Promise<Object>} Response vom Backend
     */
    async submitForm(formData) {
        // Validierung der Eingabedaten
        this.validateFormData(formData);

        // Request Body für PHP Backend
        const requestBody = {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            newsletter: Boolean(formData.newsletter),
            timestamp: new Date().toISOString(),
            source: 'glocalSpirit_Landing_Page'
        };

        console.log('Sending data to PHP Backend:', requestBody);

        try {
            // HTTP POST Request an PHP Backend mit Timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

            const response = await fetch(this.backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // Response verarbeiten
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log('PHP Backend Response:', responseData);

            return {
                success: true,
                message: 'Anmeldung erfolgreich verarbeitet',
                data: responseData
            };

        } catch (error) {
            console.error('Form submission error:', error);
            
            // Fallback für Entwicklungsumgebung oder wenn in Konfiguration aktiviert
            if (this.isDevelopment || this.config.fallbackToSimulation) {
                return await this.simulateSubmission(requestBody);
            }

            // Fehlerbehandlung für Produktion
            throw new Error(this.getErrorMessage(error));
        }
    }

    /**
     * Validiert die Formulardaten
     * @param {Object} formData - Die zu validierenden Daten
     */
    validateFormData(formData) {
        if (!formData) {
            throw new Error('Keine Formulardaten übermittelt');
        }

        if (!formData.name || formData.name.trim().length < 2) {
            throw new Error('Name muss mindestens 2 Zeichen lang sein');
        }

        if (!formData.email || !this.isValidEmail(formData.email)) {
            throw new Error('Bitte gib eine gültige E-Mail-Adresse ein');
        }
    }

    /**
     * E-Mail Validierung
     * @param {string} email - Die zu validierende E-Mail
     * @returns {boolean} True wenn gültig
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Generiert benutzerfreundliche Fehlermeldungen
     * @param {Error} error - Der ursprüngliche Fehler
     * @returns {string} Benutzerfreundliche Fehlermeldung
     */
    getErrorMessage(error) {
        if (error.message.includes('Failed to fetch')) {
            return 'Verbindung zum Server fehlgeschlagen. Bitte überprüfe deine Internetverbindung.';
        }
        
        if (error.message.includes('HTTP Error: 500')) {
            return 'Serverfehler. Bitte versuche es später erneut.';
        }
        
        if (error.message.includes('HTTP Error: 400')) {
            return 'Ungültige Daten übermittelt. Bitte überprüfe deine Eingaben.';
        }
        
        if (error.message.includes('HTTP Error: 429')) {
            return 'Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut.';
        }

        return 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.';
    }

    /**
     * Simuliert die Formularübermittlung für Entwicklungszwecke
     * @param {Object} requestBody - Die zu sendenden Daten
     * @returns {Promise<Object>} Simulierte Response
     */
    async simulateSubmission(requestBody) {
        console.log('🔧 Development Mode: Simulating form submission');
        console.log('Data that would be sent to Power Automate:', requestBody);

        // Simuliere Netzwerk-Delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simuliere 95% Erfolgsrate
        if (Math.random() > 0.05) {
            return {
                success: true,
                message: 'Anmeldung erfolgreich verarbeitet (Simulation)',
                data: {
                    id: Math.random().toString(36).substring(7),
                    timestamp: new Date().toISOString()
                }
            };
        } else {
            throw new Error('Simulierter Netzwerkfehler');
        }
    }

    /**
     * Setzt die PHP Backend URL (für Konfiguration)
     * @param {string} url - Die neue URL
     */
    setBackendUrl(url) {
        this.backendUrl = url;
    }
}

// Export der Klasse für die Verwendung in anderen Dateien
window.FormBackend = FormBackend;

// Beispiel für die Integration:
// const backend = new FormBackend();
// backend.setBackendUrl('https://deine-domain.de/submit_testuser.php');
// const result = await backend.submitForm({ name: 'Test', email: 'test@example.com', newsletter: true });
