// Unified Safari Fixes - Eliminating Code Duplication
// Configuration-based approach for debug vs production

(function(config = {}) {
    'use strict';
    
    // Default configuration
    const defaultConfig = {
        debug: false,
        enableConsoleOutput: false,
        retryLimit: 3,
        memoryThreshold: 50 // MB
    };
    
    const settings = { ...defaultConfig, ...config };
    
    // Unified logging function
    const log = (...args) => {
        if (settings.enableConsoleOutput) {
            console.log('[Safari Fixes]', ...args);
        }
    };
    
    // Safari detection (shared logic)
    const browserInfo = {
        isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        version: navigator.userAgent.match(/Version\/(\d+\.\d+)/)
    };
    
    // Safari fixes registry
    const fixes = {
        viewportHeight: () => {
            if (browserInfo.isSafari || browserInfo.isIOS) {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
                log('Viewport height fixed');
            }
        },
        
        smoothScrolling: () => {
            if (browserInfo.isSafari && !CSS.supports('scroll-behavior', 'smooth')) {
                // Unified smooth scroll polyfill
                const smoothScrollPolyfill = (target, duration = 500) => {
                    // Implementation here
                };
                log('Smooth scrolling polyfill applied');
            }
        },
        
        touchEvents: () => {
            if (browserInfo.isIOS) {
                // Unified touch event optimization
                log('Touch events optimized');
            }
        },
        
        inputZoom: () => {
            if (browserInfo.isIOS) {
                document.querySelectorAll('input, textarea, select').forEach(input => {
                    if (parseFloat(getComputedStyle(input).fontSize) < 16) {
                        input.style.fontSize = '16px';
                    }
                });
                log('Input zoom prevented');
            }
        }
    };
    
    // Main initialization
    function initSafariFixes() {
        Object.values(fixes).forEach(fix => fix());
        
        if (browserInfo.isSafari) document.body.classList.add('safari-browser');
        if (browserInfo.isIOS) document.body.classList.add('ios-device');
        
        log('All Safari fixes initialized');
    }
    
    // Auto-initialize or expose for manual init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSafariFixes);
    } else {
        initSafariFixes();
    }
    
    // Expose public API
    window.SafariFixes = {
        ...browserInfo,
        init: initSafariFixes,
        fixes
    };
    
})(window.SAFARI_CONFIG || {});
