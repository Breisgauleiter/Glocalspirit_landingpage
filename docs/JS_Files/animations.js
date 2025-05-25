function initializeAnimations() {
    const viewportWidth = window.innerWidth;

    // Ensure DrawSVGPlugin is properly registered
    if (typeof DrawSVGPlugin === "undefined") {
        console.error("DrawSVGPlugin is not loaded. Ensure it is included in your project.");
        return;
    }
    gsap.registerPlugin(DrawSVGPlugin, MotionPathHelper, MotionPathPlugin, ScrollTrigger, ScrollSmoother);

    // Only create ScrollSmoother if not already created
    if (!ScrollSmoother.get()) {
        ScrollSmoother.create({
            smooth: 2,
            effects: true,
        });
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
    gsap.from(".hero__title", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power2.in",
    });

    // Hero image animation (delayed)
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

    // ScrollTrigger animation for .about__wrapper--glasmorphism
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

    // ScrollTrigger animation for .wrapper__content
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

    // ScrollTrigger animation for .roadmap__title
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

    // Roadmap SVG animations (only for viewport > 800px)
    if (viewportWidth > 800) {
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

    } else {
        console.log("Viewport width is less than or equal to 800px. custom animations are displayed.");

        const cards = document.querySelectorAll(".card01, .card02, .card03, .card04, .card05, .card06, .card07, .card08");
        console.log("Cards found:", cards);

        if (cards.length === 0) {
            console.warn("No cards found for animation!");
            return;
        }

        // First ensure all cards are visible and in their final position
        gsap.set(cards, {
            clearProps: "all",
            position: "relative",
            top: "auto",
            left: "auto",
            opacity: 1
        });

        // Use double requestAnimationFrame to ensure layout is complete
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                cards.forEach((card, index) => {
                    // Create the ScrollTrigger first
                    const trigger = ScrollTrigger.create({
                        trigger: card,
                        start: "top bottom-=100",
                        end: "top center",
                        markers: true,
                        onEnter: () => console.log(`Card ${index + 1} entering`),
                        onLeave: () => console.log(`Card ${index + 1} leaving`),
                    });

                    // Then create the animation
                    gsap.fromTo(card, 
                        {
                            opacity: 0,
                            y: 50,
                            scale: 0.8
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.75,
                            ease: "power2.out",
                            scrollTrigger: trigger
                        }
                    );
                });

                // Final refresh after all animations are set up
                ScrollTrigger.refresh(true);
            });
        });

        console.log("finished cards");
    }

    // Position roadmap cards
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
                if (viewportWidth > 800) {
                    const offsets = viewportWidth <= 870 && viewportWidth > 800 ? customCardOffsets : cardOffsets;
                    const circleClass = circle.classList[0];
                    const offset = offsets[circleClass] || { left: 0 };
                    const leftOffsetInPixels = (offset.left / 100) * roadmapContentWidth;

                    card.style.position = "absolute";
                    card.style.top = `${topPosition}px`;
                    card.style.left = `${circleRect.left - roadmapContentRect.left + leftOffsetInPixels}px`;
                } else {
                    card.style.position = "relative";
                    card.style.top = "auto";
                    card.style.left = "auto";
                }
            }
        });
    }

    positionCards();
    // window.addEventListener("resize", positionCards);

    if (ScrollSmoother.get()) {
        ScrollSmoother.get().refresh();
    }
    ScrollTrigger.refresh();

}

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("load", () => {
        console.log("loaded")
        initializeAnimations();
        if (ScrollSmoother.get()) {
            ScrollSmoother.get().refresh();
        }
        setTimeout(() => {
            ScrollTrigger.refresh();
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

                if (ScrollSmoother.get()) {
                    ScrollSmoother.get().refresh();
                    console.log("ScrollSmoother refreshed");
                }

                setTimeout(() => {
                    ScrollTrigger.refresh();
                    console.log("ScrollTrigger refreshed (after timeout)");
                }, 100);
            }, 100);
        }
    });
});