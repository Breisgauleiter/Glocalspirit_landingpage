// Add a retry counter to limit the number of retries
let gsapRetryCount = 0;
const GSAP_MAX_RETRIES = 20;

function initializeAnimations() {
    // Check if we're on the main landing page or a subpage
    const isMainPage = document.querySelector('.hero__title') !== null;
    
    if (!isMainPage) {
        console.log('Not on main landing page, skipping main page animations');
        // Don't try to initialize ScrollSmoother on subpages to avoid conflicts
        return;
    }

    console.log('Main landing page detected, initializing full animations...');
    
    const roadmapSVG = document.querySelector('.roadmap_svg');
    const svgVisible = roadmapSVG && window.getComputedStyle(roadmapSVG).display !== 'none';
    const viewportWidth = window.innerWidth;

    // Ensure DrawSVGPlugin is properly registered
    if (typeof DrawSVGPlugin === "undefined") {
        console.error("DrawSVGPlugin is not loaded. Ensure it is included in your project.");
        return;
    }
    
    // Ensure all GSAP plugins are loaded, with retry limit
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || typeof ScrollSmoother === "undefined") {
        gsapRetryCount++;
        if (gsapRetryCount > GSAP_MAX_RETRIES) {
            console.error("GSAP or plugins failed to load after maximum retries.");
            return;
        }
        console.log(`GSAP or plugins not fully loaded, retrying... (${gsapRetryCount}/${GSAP_MAX_RETRIES})`);
        setTimeout(() => initializeAnimations(), 200);
        return;
    }
    
    gsap.registerPlugin(DrawSVGPlugin, MotionPathHelper, MotionPathPlugin, ScrollTrigger, ScrollSmoother);

    // Disable ScrollTrigger markers globally
    ScrollTrigger.defaults({
        markers: false
    });

    // Only create ScrollSmoother if not already created and required elements exist
    const smoothWrapper = document.querySelector('#smooth-wrapper');
    const smoothContent = document.querySelector('#smooth-content');
    
    if (!ScrollSmoother.get() && smoothWrapper && smoothContent) {
        try {
            ScrollSmoother.create({
                wrapper: '#smooth-wrapper',
                content: '#smooth-content',
                smooth: 2,
                effects: true,
            });
        } catch (error) {
            console.log('ScrollSmoother could not be created:', error);
        }
    }

    // Header animation
    gsap.from(".header", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        delay: 2,
        onComplete: () => {
            gsap.set(".header", { clearProps: "all" });
        }
    });

    // Hero title animation
    const heroTitle = document.querySelector(".hero__title");
    if (heroTitle) {
        gsap.from(".hero__title", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power2.in",
        });
    }

    // Hero image animation (delayed)
    const heroImage = document.querySelector(".hero__image");
    if (heroImage) {
        gsap.from(".hero__image", {
            y: 50,
            opacity: 0,
            duration: 1.3,
            ease: "power2.in",
            delay: 1.5,
        });

        // ScrollTrigger animation for scaling .hero__image
        gsap.to(".hero__image", {
            scale: 1.5,
            scrollTrigger: {
                trigger: ".hero__image",
                start: "top 20%",
                end: "bottom top",
                scrub: 2,
                markers: false,
            },
        });
    }

    // ScrollTrigger animation for .about__wrapper--glasmorphism
    const aboutWrapper = document.querySelector(".about__wrapper--glasmorphism");
    if (aboutWrapper) {
        gsap.from(".about__wrapper--glasmorphism", {
            scale: 0.8,
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".about__wrapper--glasmorphism",
                start: "top 60%",
                end: "top 40%",
                scrub: 1.5,
            },
        });
    }

    // ScrollTrigger animation for .wrapper__content
    const wrapperContent = document.querySelector(".wrapper__content");
    if (wrapperContent) {
        gsap.from(".wrapper__content", {
            scale: 0.8,
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".wrapper__content",
                start: "top 55%",
                end: "top 35%",
                scrub: 1.5,
            },
        });
    }

    // ScrollTrigger animation for .roadmap__title
    const roadmapTitle = document.querySelector(".roadmap__title");
    if (roadmapTitle) {
        gsap.from(".roadmap__title", {
            scale: 0.8,
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".roadmap__title",
                start: "top 55%",
                end: "top 35%",
                scrub: 1.5,
            },
        });
    }

    // === DESKTOP ANIMATIONS (SVG VISIBLE) ===
    if (svgVisible) {
        // Create a timeline for sequential animations
        const main = gsap.timeline({
            scrollTrigger: {
                trigger: ".roadmap_svg",
                scrub: 1.5,
                start: "top 70%",
                end: "bottom 70%",
            },
        });

        // Animate the line
        main.from(".line", {
            drawSVG: 0,
            duration: 25,
            ease: "none",
        });

        // Animate the circles and cards together
        main.from(".circle_initial", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 0);

        main.from(".circle_01", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 1.5).from(".card01", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 8.75,
        }, 1.5).from(".text01", {
            opacity: 0,
            y: 20,
            ease: "power4.out",
            duration: 1.5,
        }, 1.5);

        main.from(".circle_02", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 4.75).from(".card02", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 8.75,
        }, 4.75);

        main.from(".circle_03", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 7.875).from(".card03", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 8.75,
        }, 7.875);

        main.from(".circle_04", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 10.875).from(".card04", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 8.75,
        }, 10.875).from(".text02", {
            opacity: 0,
            y: 20,
            ease: "power4.out",
            duration: 1.5,
        }, 10.875);

        main.from(".circle_05", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 13.75).from(".card05", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 8.75,
        }, 13.75);

        main.from(".circle_06", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 16.875).from(".card06", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 8.75,
        }, 16.875);

        main.from(".circle_07", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 20.625).from(".card07", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 8.75,
        }, 20.625);

        main.from(".circle_08", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 23.5).from(".card08", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 8.75,
        }, 23.5);

        main.from(".arrowhead", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 24.875);
    }
    // === MOBILE/TABLET ANIMATIONS ===
    else {
        console.log("Using simplified animations for mobile/tablet");

        const cards = document.querySelectorAll(".card01, .card02, .card03, .card04, .card05, .card06, .card07, .card08");
        if (cards.length === 0) {
            console.warn("No cards found for animation!");
            return;
        }

        // Reset card positions and prepare for mobile layout
        gsap.set(cards, {
            clearProps: "all",
            position: "relative",
            top: "auto",
            left: "auto",
            opacity: 0,
            y: 50,
            scale: 0.95
        });

        // Wait for layout to settle before creating scroll triggers
        requestAnimationFrame(() => {
            cards.forEach((card, index) => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: false,
                        once: true,
                        markers: false,
                        invalidateOnRefresh: true,
                        onEnter: () => {
                            if (card.classList.contains('card--current')) {
                                gsap.to(card, {
                                    backgroundColor: "rgba(85, 166, 217, 0.1)",
                                    borderColor: "rgba(85, 166, 217, 0.3)",
                                    duration: 0.3
                                });
                            }
                        }
                    },
                });
            });
            ScrollTrigger.refresh();
        });
    }

    // === CARD POSITIONING ===
    // Only position cards if SVG is visible
    if (svgVisible) {
        const roadmapContent = document.querySelector(".roadmap__content");
        const circles = document.querySelectorAll(".roadmap_svg .circle_01, .roadmap_svg .circle_02, .roadmap_svg .circle_03, .roadmap_svg .circle_04, .roadmap_svg .circle_05, .roadmap_svg .circle_06, .roadmap_svg .circle_07, .roadmap_svg .circle_08");
        const cards = document.querySelectorAll(".cards__wrapper .card");

        const cardOffsets = {
            circle_01: { left: 8 },
            circle_02: { left: -45 },
            circle_03: { left: 3 },
            circle_04: { left: -42 },
            circle_05: { left: 7 },
            circle_06: { left: -39 },
            circle_07: { left: 5 },
            circle_08: { left: -43 },
        };

        const customCardOffsets = {
            circle_01: { left: 10 },
            circle_02: { left: -50 },
            circle_03: { left: 5 },
            circle_04: { left: -38 },
            circle_05: { left: 10 },
            circle_06: { left: -37 },
            circle_07: { left: 8 },
            circle_08: { left: -40 },
        };

        function positionCards() {
            if (!roadmapContent) return;
            const roadmapContentWidth = roadmapContent.offsetWidth;

            circles.forEach((circle, index) => {
                const circleRect = circle.getBoundingClientRect();
                const roadmapContentRect = roadmapContent.getBoundingClientRect();
                const topPosition = circleRect.top - roadmapContentRect.top;

                const card = cards[index];
                if (card) {
                    const offsets = window.innerWidth <= 870 && window.innerWidth > 800 ? customCardOffsets : cardOffsets;
                    const circleClass = circle.classList[0];
                    const offset = offsets[circleClass] || { left: 0 };
                    const leftOffsetInPixels = (offset.left / 100) * roadmapContentWidth;

                    card.style.position = "absolute";
                    card.style.top = `${topPosition}px`;
                    card.style.left = `${circleRect.left - roadmapContentRect.left + leftOffsetInPixels}px`;
                }
            });
        }

        positionCards();
        window.addEventListener("resize", positionCards);
    }

    const smoother = ScrollSmoother.get();
    if (smoother && typeof smoother.refresh === 'function') {
        try {
            smoother.refresh();
        } catch (error) {
            console.log('ScrollSmoother refresh failed:', error);
        }
    }
    ScrollTrigger.refresh();
}

document.addEventListener("DOMContentLoaded", () => {
    // Wait for all resources including images and fonts to load
    window.addEventListener("load", () => {
        // Additional small delay to ensure DOM is fully stable
        setTimeout(() => {
            console.log("loaded")
            initializeAnimations();
            const smoother = ScrollSmoother.get();
            if (smoother && typeof smoother.refresh === 'function') {
                try {
                    smoother.refresh();
                } catch (error) {
                    console.log('ScrollSmoother refresh failed:', error);
                }
            }
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 200);
        }, 100);
    });

    let currentViewportWidth = window.innerWidth;

    window.addEventListener("resize", () => {
        console.log("resized___")
        const newViewportWidth = window.innerWidth;

        if (newViewportWidth !== currentViewportWidth) {
            currentViewportWidth = newViewportWidth;

            console.log("Resize event triggered due to width change");

            if (ScrollSmoother.get()) {
                console.log("Using ScrollSmoother to scroll to the top");
                ScrollSmoother.get().scrollTo(0, true);
            } else {
                console.log("Using window.scrollTo to scroll to the top");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }

            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            console.log("All ScrollTriggers killed");

            gsap.set(".header, .hero__title, .hero__image, .about__wrapper--glasmorphism, .wrapper__content, .roadmap__title, .roadmap_svg, .card01, .card02, .card03, .card04, .card05, .card06, .card07, .card08, .line, .text01, .text02", {
                clearProps: "all",
            });
            console.log("General elements reset to default state");

            gsap.set(".circle_01, .circle_02, .circle_03, .circle_04, .circle_05, .circle_06, .circle_07, .circle_08, .arrowhead, .circle_initial", {
                scale: 1,
                opacity: 1,
            });
            console.log("Circles and arrowhead reset (scale and opacity only)");

            // Wait for layout to settle before re-initializing animations and refreshing triggers
            setTimeout(() => {
                initializeAnimations();
                console.log("Animations reinitialized");

                const smoother = ScrollSmoother.get();
                if (smoother && typeof smoother.refresh === 'function') {
                    try {
                        smoother.refresh();
                        console.log("ScrollSmoother refreshed");
                    } catch (error) {
                        console.log('ScrollSmoother refresh failed:', error);
                    }
                }

                setTimeout(() => {
                    ScrollTrigger.refresh();
                    console.log("ScrollTrigger refreshed (after timeout)");
                }, 100);
            }, 100);
        }
    });
});