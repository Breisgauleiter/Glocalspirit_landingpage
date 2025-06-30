// Animation Factory - Eliminating Animation Code Duplication
// Reusable animation patterns for all forms and pages

class AnimationFactory {
    constructor(config = {}) {
        this.config = {
            debug: false,
            defaultDuration: 0.8,
            defaultEase: "power2.out",
            staggerDelay: 0.1,
            ...config
        };
        
        this.initGSAP();
    }
    
    initGSAP() {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, animations disabled');
            return false;
        }
        
        gsap.config({
            force3D: true,
            nullTargetWarn: false,
            trialWarn: false
        });
        
        return true;
    }
    
    log(...args) {
        if (this.config.debug) {
            console.log('[AnimationFactory]', ...args);
        }
    }
    
    // Common animation patterns
    animations = {
        // Form container entrance
        formEntrance: (selector, options = {}) => {
            const elements = document.querySelectorAll(selector);
            if (!elements.length) return null;
            
            const settings = {
                y: 30,
                opacity: 0,
                scale: 0.95,
                duration: this.config.defaultDuration,
                ease: this.config.defaultEase,
                delay: 0.1,
                ...options
            };
            
            return gsap.fromTo(elements, 
                { 
                    opacity: 0, 
                    y: settings.y,
                    scale: settings.scale
                }, 
                { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    duration: settings.duration, 
                    ease: settings.ease,
                    delay: settings.delay,
                    stagger: this.config.staggerDelay
                }
            );
        },
        
        // Header fade-in
        headerEntrance: (selector = '.header', options = {}) => {
            const element = document.querySelector(selector);
            if (!element) return null;
            
            const settings = {
                duration: 0.8,
                ease: "power2.in",
                delay: 0.2,
                ...options
            };
            
            return gsap.from(element, {
                opacity: 0,
                duration: settings.duration,
                ease: settings.ease,
                delay: settings.delay,
                onComplete: () => {
                    gsap.set(element, { clearProps: "all" });
                }
            });
        },
        
        // Input focus effects
        inputFocus: (selector, options = {}) => {
            const inputs = document.querySelectorAll(selector);
            if (!inputs.length) return;
            
            const settings = {
                scale: 1.02,
                duration: 0.2,
                ...options
            };
            
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    gsap.to(input, {
                        scale: settings.scale,
                        duration: settings.duration,
                        ease: this.config.defaultEase
                    });
                });
                
                input.addEventListener('blur', () => {
                    gsap.to(input, {
                        scale: 1,
                        duration: settings.duration,
                        ease: this.config.defaultEase
                    });
                });
            });
        },
        
        // Button hover effects
        buttonHover: (selector, options = {}) => {
            const buttons = document.querySelectorAll(selector);
            if (!buttons.length) return;
            
            const settings = {
                scale: 1.05,
                duration: 0.2,
                ...options
            };
            
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    if (!button.disabled) {
                        gsap.to(button, {
                            scale: settings.scale,
                            duration: settings.duration,
                            ease: this.config.defaultEase
                        });
                    }
                });
                
                button.addEventListener('mouseleave', () => {
                    if (!button.disabled) {
                        gsap.to(button, {
                            scale: 1,
                            duration: settings.duration,
                            ease: this.config.defaultEase
                        });
                    }
                });
            });
        },
        
        // Message animations
        messageDisplay: (messageElement, options = {}) => {
            if (!messageElement) return null;
            
            const settings = {
                duration: 0.5,
                ease: "back.out(1.7)",
                ...options
            };
            
            return gsap.fromTo(messageElement,
                {
                    opacity: 0,
                    y: -20,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: settings.duration,
                    ease: settings.ease
                }
            );
        },
        
        // Loading state animation
        loadingState: (element, show = true, options = {}) => {
            const btnText = element?.querySelector('.btn-text');
            const btnLoading = element?.querySelector('.btn-loading');
            
            if (show) {
                if (btnText) gsap.to(btnText, { opacity: 0, duration: 0.2 });
                if (btnLoading) {
                    btnLoading.style.display = 'inline-flex';
                    gsap.to(btnLoading, { opacity: 1, duration: 0.2 });
                }
            } else {
                if (btnLoading) gsap.to(btnLoading, { 
                    opacity: 0, 
                    duration: 0.2, 
                    onComplete: () => btnLoading.style.display = 'none'
                });
                if (btnText) gsap.to(btnText, { opacity: 1, duration: 0.2 });
            }
        }
    };
    
    // Page-specific animation sets
    initFormPage(pageType = 'default') {
        this.log(`Initializing ${pageType} form animations`);
        
        // Common animations for all forms
        this.animations.headerEntrance();
        this.animations.formEntrance('.form-container, .hero__form');
        this.animations.inputFocus('.form-input, .form-textarea');
        this.animations.buttonHover('.submit-button, .package-button');
        
        // Set up message observers
        this.setupMessageObservers();
        
        this.log(`${pageType} form animations initialized`);
    }
    
    setupMessageObservers() {
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        
        [successMessage, errorMessage].forEach(message => {
            if (!message) return;
            
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (message.style.display !== 'none') {
                            this.animations.messageDisplay(message);
                        }
                    }
                });
            });
            observer.observe(message, { attributes: true });
        });
    }
    
    // Public API for external use
    createAnimation(type, selector, options = {}) {
        if (this.animations[type]) {
            return this.animations[type](selector, options);
        } else {
            console.warn(`Animation type '${type}' not found`);
            return null;
        }
    }
}

// Global instance
window.AnimationFactory = AnimationFactory;

// Auto-initialize for forms
document.addEventListener('DOMContentLoaded', () => {
    // Detect page type
    let pageType = 'default';
    if (document.querySelector('.testform')) pageType = 'testform';
    else if (document.querySelector('.packages-container')) pageType = 'donation';
    
    // Initialize animations
    const animations = new AnimationFactory({ debug: false });
    animations.initFormPage(pageType);
    
    // Expose for external use
    window.formAnimations = animations;
});
