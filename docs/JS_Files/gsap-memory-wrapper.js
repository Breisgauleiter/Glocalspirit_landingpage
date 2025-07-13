/**
 * GSAP Memory Wrapper - Verhindert Memory-Lecks bei Safari
 */

(function() {
    'use strict';
    
    // Warten bis GSAP geladen ist
    function waitForGSAP(callback) {
        if (typeof gsap !== 'undefined') {
            callback();
        } else {
            setTimeout(() => waitForGSAP(callback), 100);
        }
    }
    
    waitForGSAP(() => {
        console.log('🔧 GSAP Memory-Wrapper aktiv');
        
        // Original GSAP-Methoden speichern
        const originalTo = gsap.to;
        const originalFrom = gsap.from;
        const originalFromTo = gsap.fromTo;
        const originalSet = gsap.set;
        
        // Animation-Tracking
        const activeAnimations = new WeakMap();
        let animationCounter = 0;
        
        // Memory-optimierte to-Methode
        gsap.to = function(targets, vars) {
            const animation = originalTo.call(this, targets, vars);
            
            // Memory-Management hinzufügen
            const originalOnComplete = vars.onComplete;
            animation.vars.onComplete = function() {
                // Element-Cleanup nach Animation
                const targetElements = gsap.utils.toArray(targets);
                targetElements.forEach(element => {
                    if (element.style) {
                        element.style.willChange = 'auto';
                        // Entferne addClass falls gesetzt
                        if (element.classList) {
                            element.classList.remove('active-animation', 'animating');
                        }
                    }
                });
                
                if (originalOnComplete) {
                    originalOnComplete.call(this);
                }
            };
            
            return animation;
        };
        
        // Memory-optimierte from-Methode
        gsap.from = function(targets, vars) {
            // Füge CSS-Klasse für Hardware-Beschleunigung hinzu
            const targetElements = gsap.utils.toArray(targets);
            targetElements.forEach(element => {
                if (element.classList) {
                    element.classList.add('animating');
                }
            });
            
            return originalFrom.call(this, targets, vars);
        };
        
        // Memory-optimierte fromTo-Methode
        gsap.fromTo = function(targets, fromVars, toVars) {
            // CSS-Klasse für Hardware-Beschleunigung
            const targetElements = gsap.utils.toArray(targets);
            targetElements.forEach(element => {
                if (element.classList) {
                    element.classList.add('animating');
                }
            });
            
            return originalFromTo.call(this, targets, fromVars, toVars);
        };
        
        // Verhindere globale force3D-Anwendung
        gsap.set = function(targets, vars) {
            // Warnung bei globaler force3D-Anwendung
            if (targets === "*" && vars.force3D === true) {
                console.warn('🚫 Globale force3D-Anwendung verhindert - Memory-Optimierung aktiv');
                return;
            }
            
            return originalSet.call(this, targets, vars);
        };
        
        // Memory-Monitoring
        if (performance.memory) {
            let lastMemoryCheck = 0;
            
            setInterval(() => {
                const currentMemory = performance.memory.usedJSHeapSize / 1024 / 1024;
                
                if (currentMemory > lastMemoryCheck + 10) {
                    console.warn(`🧠 Memory-Anstieg: +${(currentMemory - lastMemoryCheck).toFixed(2)}MB`);
                }
                
                lastMemoryCheck = currentMemory;
            }, 5000);
        }
        
        console.log('✅ GSAP Memory-Optimierung aktiviert');
    });
    
})();