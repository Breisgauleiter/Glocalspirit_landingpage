// Simple animations for testformular page without ScrollSmoother conflicts

document.addEventListener('DOMContentLoaded', function() {
    function initTestFormAnimations() {
        if (typeof gsap !== 'undefined') {
            console.log('Initializing test form animations...');
            
            // Simple form container animation
            const formContainer = document.querySelector(".form-container");
            if (formContainer) {
                gsap.from(formContainer, {
                    y: 50,
                    opacity: 0,
                    duration: 1.3,
                    ease: "power2.out",
                    delay: 0.5
                });
            }
            
            // Header animation
            const header = document.querySelector(".header");
            if (header) {
                gsap.from(header, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.in",
                    delay: 0.2
                });
            }
            
            console.log('Test form animations initialized successfully');
        } else {
            // Retry if GSAP not loaded yet
            setTimeout(initTestFormAnimations, 100);
        }
    }
    
    initTestFormAnimations();
});
