// Konfiguration für PHP Backend Integration
// Diese Datei enthält alle notwendigen Einstellungen für die Backend-Verbindung

const PHP_BACKEND_CONFIG = {
    // ===============================================
    // 🔧 PHP BACKEND URL KONFIGURATION
    // ===============================================
    
    // URL zu deinem PHP-Script auf Strato (glocalSpirit konfiguriert)
    BACKEND_URL: 'https://glocalspirit.org/submit_testuser.php',
    
    // Optional: Verschiedene URLs für verschiedene Umgebungen
    ENVIRONMENT_URLS: {
        development: 'http://localhost:8000/submit_testuser.php',
        staging: 'https://staging.glocalspirit.org/submit_testuser.php',
        production: 'https://glocalspirit.org/submit_testuser.php'
    },
    
    // Weitere Einstellungen
    SETTINGS: {
        timeout: 30000, // 30 Sekunden Timeout
        retryAttempts: 2, // Anzahl der Wiederholungsversuche bei Fehlern
        enableLogging: true, // Console-Logging aktivieren
        fallbackToSimulation: true // Fallback zur Simulation bei Fehlern
    }
};

// Hilfsfunktion um die richtige URL basierend auf der Umgebung zu bekommen
function getBackendUrl() {
    const hostname = window.location.hostname;
    
    // Bestimme Umgebung basierend auf Hostname
    let environment = 'production';
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        environment = 'development';
    } else if (hostname.includes('staging') || hostname.includes('test')) {
        environment = 'staging';
    }
    
    // Gib entsprechende URL zurück
    const envUrl = PHP_BACKEND_CONFIG.ENVIRONMENT_URLS[environment];
    return envUrl || PHP_BACKEND_CONFIG.BACKEND_URL;
}

// Export für andere Module
window.PHP_BACKEND_CONFIG = PHP_BACKEND_CONFIG;
window.getBackendUrl = getBackendUrl;

// Debug-Information
if (PHP_BACKEND_CONFIG.SETTINGS.enableLogging) {
    console.log('🔧 PHP Backend Config loaded');
    console.log('Environment:', window.location.hostname);
    console.log('Backend URL:', getBackendUrl());
}
