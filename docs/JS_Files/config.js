// Konfiguration für PHP Backend Integration
const PHP_BACKEND_CONFIG = {
    BACKEND_URL: 'https://glocalspirit.org/submit_testuser_minimal.php',
    ENVIRONMENT_URLS: {
        development: 'http://localhost:8000/submit_testuser_minimal.php',
        production: 'https://glocalspirit.org/submit_testuser_minimal.php'
    },
    SETTINGS: {
        timeout: 30000,
        retryAttempts: 2,
        enableLogging: true,
        fallbackToSimulation: true
    }
};

function getBackendUrl() {
    // Immer den Production-Server verwenden (glocalspirit.org)
    return PHP_BACKEND_CONFIG.BACKEND_URL;
    
    // Alternative: Automatische Erkennung (auskommentiert)
    // const hostname = window.location.hostname;
    // let environment = 'production';
    // if (hostname === 'localhost' || hostname === '127.0.0.1') {
    //     environment = 'development';
    // }
    // const envUrl = PHP_BACKEND_CONFIG.ENVIRONMENT_URLS[environment];
    // return envUrl || PHP_BACKEND_CONFIG.BACKEND_URL;
}

window.PHP_BACKEND_CONFIG = PHP_BACKEND_CONFIG;
window.getBackendUrl = getBackendUrl;
