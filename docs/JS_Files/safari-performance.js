// Safari Performance Optimization Script
// Loads before main animations to optimize Safari performance

(function() {
    'use strict';
    
    // Safari detection
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isSafari || isIOS) {
        console.log('🍎 Safari detected - applying performance optimizations');
        
        // 1. Disable ScrollSmoother on Safari to prevent jank
        window.DISABLE_SCROLL_SMOOTHER = true;
        
        // 2. Optimize GSAP config for Safari
        if (typeof gsap !== 'undefined') {
            gsap.config({
                force3D: true,
                nullTargetWarn: false,
                trialWarn: false,
                autoSleep: 60
            });
        }
        
        // 3. Add CSS optimizations for Safari
        const safariOptimizations = document.createElement('style');
        safariOptimizations.textContent = `
            /* Safari performance optimizations */
            * {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }
            
            /* Disable smooth scrolling on Safari - use native */
            html {
                scroll-behavior: auto;
            }
            
            /* Optimize animations for Safari */
            .animate-optimized {
                will-change: transform, opacity;
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            }
            
            /* Reduce animation complexity on Safari */
            @media screen and (-webkit-min-device-pixel-ratio: 1) {
                .complex-animation {
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(safariOptimizations);
        
        // 4. Throttle scroll events for better performance
        let isScrolling = false;
        const originalAddEventListener = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
            if (type === 'scroll') {
                const throttledListener = function(event) {
                    if (!isScrolling) {
                        window.requestAnimationFrame(function() {
                            listener(event);
                            isScrolling = false;
                        });
                        isScrolling = true;
                    }
                };
                return originalAddEventListener.call(this, type, throttledListener, options);
            }
            return originalAddEventListener.call(this, type, listener, options);
        };
        
        console.log('✅ Safari optimizations applied');
    }
    
})();
