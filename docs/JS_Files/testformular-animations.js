// Testformular Animationen - gleich wie Triangle Logo

function initializeTestFormAnimations() {
    // Ensure GSAP plugins are registered
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Only create ScrollSmoother if not already created
    if (!ScrollSmoother.get()) {
        ScrollSmoother.create({
            smooth: 2,
            effects: true,
        });
    }

    // Header animation (wie auf Hauptseite)
    gsap.from(".header", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        delay: 2,
        onComplete: () => {
            gsap.set(".header", { clearProps: "all" });
        }
    });

    // Form title animation (wie hero__title)
    gsap.from(".form-title", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power2.in",
    });

    // Form container animation (wie hero__image - das Triangle)
    gsap.from(".hero__form", {
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "power2.in",
        delay: 1.5,
    });

    // Form inputs staggered animation
    gsap.from(".form-group", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 2.5,
        stagger: 0.2
    });

    // Submit button animation
    gsap.from(".submit-button", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 3.2
    });

    // ScrollTrigger animation for form scaling (wie beim Triangle)
    gsap.to(".hero__form", {
        scale: 0.8,
        scrollTrigger: {
            trigger: ".hero__form",
            start: "top center",
            end: "bottom center",
            scrub: true,
        }
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all GSAP scripts are loaded
    setTimeout(initializeTestFormAnimations, 100);
});

// Fallback for when window is fully loaded
window.addEventListener('load', function() {
    // Only initialize if not already done
    if (!gsap.getById('testform-animations')) {
        initializeTestFormAnimations();
    }
});
