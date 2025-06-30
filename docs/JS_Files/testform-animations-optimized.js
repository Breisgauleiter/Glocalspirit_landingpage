// Testform animations - Safari optimized, no debug output
// Simplified version without ScrollSmoother conflicts

(function() {
    'use strict';
    
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        return;
    }
    
    // Configure GSAP for Safari optimization
    gsap.config({
        force3D: true,
        nullTargetWarn: false,
        trialWarn: false
    });
    
    // Basic form animations
    function initTestFormAnimations() {
        // Animate form container on load
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            gsap.fromTo(formContainer, 
                { 
                    opacity: 0, 
                    y: 30,
                    scale: 0.95
                }, 
                { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    duration: 0.8, 
                    ease: "power2.out",
                    delay: 0.1
                }
            );
        }
        
        // Animate form inputs on focus
        const formInputs = document.querySelectorAll('.form-input, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            input.addEventListener('blur', () => {
                gsap.to(input, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
        
        // Animate submit button
        const submitBtn = document.querySelector('.submit-button');
        if (submitBtn) {
            submitBtn.addEventListener('mouseenter', () => {
                gsap.to(submitBtn, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            submitBtn.addEventListener('mouseleave', () => {
                gsap.to(submitBtn, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            submitBtn.addEventListener('click', () => {
                gsap.to(submitBtn, {
                    scale: 0.98,
                    duration: 0.1,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                });
            });
        }
        
        // Animate success/error messages
        function animateMessage(messageElement) {
            if (!messageElement) return;
            
            gsap.fromTo(messageElement,
                {
                    opacity: 0,
                    y: -20,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }
            );
        }
        
        // Observe for message changes
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        
        if (successMessage) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (successMessage.style.display !== 'none') {
                            animateMessage(successMessage);
                        }
                    }
                });
            });
            observer.observe(successMessage, { attributes: true });
        }
        
        if (errorMessage) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (errorMessage.style.display !== 'none') {
                            animateMessage(errorMessage);
                        }
                    }
                });
            });
            observer.observe(errorMessage, { attributes: true });
        }
        
        // Animate form validation errors
        const errorTexts = document.querySelectorAll('.error-text');
        errorTexts.forEach(errorText => {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        if (errorText.textContent.trim()) {
                            gsap.fromTo(errorText,
                                { opacity: 0, x: -10 },
                                { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
                            );
                        }
                    }
                });
            });
            observer.observe(errorText, { childList: true, characterData: true, subtree: true });
        });
        
        // Animate checkbox selection
        const checkboxes = document.querySelectorAll('.checkbox-input');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const checkboxLabel = checkbox.closest('.checkbox-label');
                if (checkboxLabel) {
                    gsap.to(checkboxLabel, {
                        scale: checkbox.checked ? 1.02 : 1,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        // Loading animation for submit button
        function animateLoading(show) {
            const btnText = document.querySelector('.btn-text');
            const btnLoading = document.querySelector('.btn-loading');
            
            if (show) {
                if (btnText) gsap.to(btnText, { opacity: 0, duration: 0.2 });
                if (btnLoading) {
                    btnLoading.style.display = 'inline-flex';
                    gsap.to(btnLoading, { opacity: 1, duration: 0.2 });
                }
            } else {
                if (btnLoading) gsap.to(btnLoading, { opacity: 0, duration: 0.2, onComplete: () => {
                    btnLoading.style.display = 'none';
                }});
                if (btnText) gsap.to(btnText, { opacity: 1, duration: 0.2 });
            }
        }
        
        // Expose loading animation for form handling
        window.TestFormAnimations = {
            showLoading: () => animateLoading(true),
            hideLoading: () => animateLoading(false)
        };
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTestFormAnimations);
    } else {
        initTestFormAnimations();
    }
    
})();
