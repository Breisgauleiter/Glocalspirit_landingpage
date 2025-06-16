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
            
            // Optional: ScrollSmoother falls verfügbar
            if (typeof ScrollSmoother !== 'undefined' && !ScrollSmoother.get()) {
                ScrollSmoother.create({
                    smooth: 2,
                    effects: true,
                });
            }
        } else {
            // Retry wenn GSAP noch nicht geladen ist
            setTimeout(initFormAnimation, 100);
        }
    }
    
    initFormAnimation();
});
