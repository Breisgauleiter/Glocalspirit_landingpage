// Einfache Formular-Animation - nur von unten einfliegend

document.addEventListener('DOMContentLoaded', function() {
    // Warten bis GSAP geladen ist
    function initFormAnimation() {
        if (typeof gsap !== 'undefined') {
            // Formular Animation - wie Triangle auf Hauptseite
            gsap.from(".form-container", {
                y: 50,
                opacity: 0,
                duration: 1.3,
                ease: "power2.out",
                delay: 0.5
            });
            
            // Skip ScrollSmoother on form pages - let animations.js handle it
            // or handle it separately if needed
            console.log('Form animation initialized without ScrollSmoother');
        } else {
            // Retry wenn GSAP noch nicht geladen ist
            setTimeout(initFormAnimation, 100);
        }
    }
    
    initFormAnimation();
});
