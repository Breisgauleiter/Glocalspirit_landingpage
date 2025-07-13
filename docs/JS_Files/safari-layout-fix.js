// Safari-spezifische Layout-Korrekturen
(function() {
    'use strict';
    
    // Safari detection
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isSafari || isIOS) {
        console.log('🍎 Safari Layout Fix wird angewendet');
        
        function fixSafariLayout() {
            // ScrollSmoother wrapper deaktivieren
            const smoothWrapper = document.querySelector('#smooth-wrapper');
            const smoothContent = document.querySelector('#smooth-content');
            
            if (smoothWrapper) {
                smoothWrapper.style.height = 'auto';
                smoothWrapper.style.overflow = 'visible';
                smoothWrapper.classList.add('safari-fixed');
            }
            
            if (smoothContent) {
                smoothContent.style.height = 'auto';
                smoothContent.style.overflow = 'visible';
                smoothContent.style.transform = 'none';
                smoothContent.classList.add('safari-fixed');
            }
            
            
            console.log('✅ Safari Layout Fix angewendet');
        }
        
        // Layout fix nach DOM load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fixSafariLayout);
        } else {
            fixSafariLayout();
        }
        
        // Zusätzlicher Fix nach GSAP initialization
        setTimeout(fixSafariLayout, 1000);
    }
    
})();
