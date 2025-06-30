// Spenden-Formular GSAP Animationen
// Konsistent mit testformular-animations.js

document.addEventListener('DOMContentLoaded', function() {
    // Warten bis GSAP geladen ist
    function initSpendenAnimation() {
        if (typeof gsap !== 'undefined') {
            initializeSpendenAnimations();
        } else {
            // Retry wenn GSAP noch nicht geladen ist
            setTimeout(initSpendenAnimation, 100);
        }
    }
    
    initSpendenAnimation();
});

function initializeSpendenAnimations() {
    // Ensure GSAP plugins are registered
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    if (typeof ScrollSmoother !== 'undefined') {
        gsap.registerPlugin(ScrollSmoother);
    }

    // Only create ScrollSmoother if not already created
    if (typeof ScrollSmoother !== 'undefined' && !ScrollSmoother.get()) {
        ScrollSmoother.create({
            smooth: 2,
            effects: true,
        });
    }

    // Header animation (identisch zu testformular.js)
    gsap.from(".header", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        delay: 2,
        onComplete: () => {
            gsap.set(".header", { clearProps: "all" });
        }
    });

    // Package title animations (statt form-title)
    gsap.from(".package-title", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power2.in",
        stagger: 0.2
    });

    // Hero description animation
    gsap.from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 1.3,
        ease: "power2.out",
        delay: 0.8
    });

    // Package cards staggered animation (wie Triangle auf Hauptseite)
    gsap.from(".package-card", {
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "power2.out",
        delay: 1.5,
        stagger: 0.3 // Cards nacheinander einblenden
    });

    // Optional: ScrollTrigger animation für Cards (falls Seite länger wird)
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.to(".package-card", {
            scrollTrigger: {
                trigger: ".packages-container",
                start: "top center",
                end: "bottom center",
                scrub: 1,
                onEnter: () => {
                    // Additional effects when cards come into view
                    gsap.to(".package-card", {
                        scale: 1.02,
                        duration: 0.3,
                        stagger: 0.1,
                        yoyo: true,
                        repeat: 1
                    });
                }
            }
        });
    }

    // Button hover animations
    const packageButtons = document.querySelectorAll('.package-button');
    packageButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!button.disabled) {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });

        button.addEventListener('mouseleave', () => {
            if (!button.disabled) {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });
    });

    // Card hover effects
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    console.log('✅ Spenden-Animationen initialisiert');
}

// Animation für Success/Error Messages
function animateMessage(messageElement, isShow = true) {
    if (!messageElement) return;

    if (isShow) {
        gsap.fromTo(messageElement, 
            {
                opacity: 0,
                x: 100,
                scale: 0.8
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            }
        );
    } else {
        gsap.to(messageElement, {
            opacity: 0,
            x: 100,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                messageElement.style.display = 'none';
            }
        });
    }
}

// Animation für Button Loading States
function animateButtonLoading(button, isLoading = true) {
    if (!button) return;

    const buttonText = button.querySelector('.button-text');
    const buttonLoading = button.querySelector('.button-loading');

    if (isLoading) {
        // Button zu Loading-State animieren
        gsap.to(buttonText, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                buttonText.style.display = 'none';
                buttonLoading.style.display = 'flex';
                gsap.fromTo(buttonLoading, 
                    { opacity: 0 },
                    { opacity: 1, duration: 0.2 }
                );
            }
        });
        
        button.disabled = true;
    } else {
        // Button zurück zu Normal-State
        gsap.to(buttonLoading, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                buttonLoading.style.display = 'none';
                buttonText.style.display = 'inline';
                gsap.fromTo(buttonText,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.2 }
                );
            }
        });
        
        button.disabled = false;
    }
}

// Export für andere Scripts
window.animateMessage = animateMessage;
window.animateButtonLoading = animateButtonLoading;
