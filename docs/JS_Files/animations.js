function initializeAnimations() {
    const viewportWidth = window.innerWidth;

    // Ensure DrawSVGPlugin is properly registered
    if (typeof DrawSVGPlugin === "undefined") {
        console.error("DrawSVGPlugin is not loaded. Ensure it is included in your project.");
        return;
    }
    gsap.registerPlugin(DrawSVGPlugin, MotionPathHelper, MotionPathPlugin, ScrollTrigger, ScrollSmoother);

    // Initialize ScrollSmoother
    ScrollSmoother.create({
        smooth: 2, // Smooth scrolling duration
        effects: true, // Enable effects like opacity and transforms
    });

    // Header animation
    gsap.from(".header", {
        // y: -10,
        // scale: 0.8,
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
                // markers: true, // Debug markers (optional)
            },
        });

        // Animate the line
        main.from(".line", {
            drawSVG: 0,
            duration: 25, // increased from 20
            ease: "none",
        });
        
        // Animate the circles and cards together
        main.from(".circle_initial", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 0)

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
            y: 20, // Slide in from below
            ease: "power4.out",
            duration: 1.5,
        }, 1.5); // Same start time as circle_01 and card01

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
            y: 20, // Slide in from below
            ease: "power4.out",
            duration: 1.5,
        }, 10.875); // Same start time as circle_02 and card02

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

        // Animate cards (card01 to card08) with ScrollTrigger
        const cards = document.querySelectorAll(".card01, .card02, .card03, .card04, .card05, .card06, .card07, .card08");

        cards.forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                scale: 0.8,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%", // Adjust as needed
                    end: "top 60%", // Adjust as needed
                    scrub: 1.5,
                },
            });
        });
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
    window.addEventListener("resize", positionCards);

    // Ensure GSAP plugins are registered
    gsap.registerPlugin(ScrollTrigger);

    
    // Ensure GSAP plugins are registered
    gsap.registerPlugin(ScrollTrigger);

    // Pin the transition wrapper to stop scrolling down
    const transitionWrapperTrigger = ScrollTrigger.create({
        trigger: ".transition_wrapper",
        start: "top top", // Pin when the top of the wrapper reaches the top of the viewport
        end: "+=9999px", // Pin indefinitely
        pin: true, // Pin the section
        pinSpacing: false, // Prevent extra spacing after unpinning
    });

    // Track the last scroll position
    let lastScrollY = window.scrollY;

    // Scroll-down prevention logic
    const preventScrollDown = () => {
        const scrollHandler = () => {
            if (window.scrollY > lastScrollY && transitionWrapperTrigger.isActive) {
                // If scrolling down and the transition wrapper is pinned, reset scroll position
                window.scrollTo(0, lastScrollY);
            } else {
                // Update the last scroll position
                lastScrollY = window.scrollY;
            }
        };

        // Remove any existing scroll event listener to avoid duplicates
        window.removeEventListener("scroll", scrollHandler);

        // Add the scroll event listener
        window.addEventListener("scroll", scrollHandler);
    };

    preventScrollDown(); // Initialize scroll-down prevention

    // Create a timeline for the door and spiral animations
    const doorAndSpiralTimeline = gsap.timeline({
        paused: true, // Start paused; will play on click
        onComplete: () => {
            // Scroll to the next section after the animation completes
            gsap.to(window, {
                scrollTo: { y: ".next_section", autoKill: false }, // Scroll to the next section
                duration: 1,
                ease: "power2.inOut",
            });

            // Unpin the transition wrapper
            transitionWrapperTrigger.kill(); // Manually unpin the wrapper
        },
    });

    // Door animation
    doorAndSpiralTimeline
        .to(".door__img", {
            rotationY: -100, // Rotate around the Y-axis
            transformOrigin: "left center", // Set the hinge point
            duration: 1.5,
            ease: "power2.out",
        }, "doorOpen") // Label for snapping

        // Spiral animation
        .to(".spiral__img", {
            scale: 10, // Scale up to fill the screen
            rotation: 360, // Full rotation
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
        }, "spiralExpand"); // Label for snapping

    // Add click event listener to the door
    const door = document.querySelector(".door__img");
    const resetDoorClick = () => {
        door.addEventListener("click", () => {
            doorAndSpiralTimeline.play(); // Play the timeline on click
        }, { once: true }); // Ensure the event is only triggered once
    };

    resetDoorClick(); // Initialize the click event

    // Reverse the animation when scrolling back up
    ScrollTrigger.create({
        trigger: ".transition_wrapper",
        start: "top top", // Trigger when the top of the wrapper reaches the top of the viewport
        end: "bottom top", // Trigger when the bottom of the wrapper leaves the viewport
        onEnterBack: () => {
            // Reverse the timeline when scrolling back up
            doorAndSpiralTimeline.reverse();

            // Reactivate scroll-down prevention
            preventScrollDown();
        },
        onLeaveBack: () => {
            // Reset the click event and animation state when scrolling above the transition wrapper
            doorAndSpiralTimeline.pause(0); // Reset the timeline to the start
            resetDoorClick(); // Reinitialize the click event

            // Reactivate scroll-down prevention
            preventScrollDown();
        },
    });
}

// Initialize animations on page load
initializeAnimations();
// Track the current viewport width
let currentViewportWidth = window.innerWidth;

// Reinitialize animations on window resize (only if width changes)


window.addEventListener("resize", () => {
    const newViewportWidth = window.innerWidth;

    // Trigger only if the width has changed
    if (newViewportWidth !== currentViewportWidth) {
        currentViewportWidth = newViewportWidth; // Update the stored width

        console.log("Resize event triggered due to width change"); // Debugging log

        // Scroll to the top of the page or the ScrollSmoother container
        if (ScrollSmoother.get()) {
            console.log("Using ScrollSmoother to scroll to the top");
            ScrollSmoother.get().scrollTo(0, true); // Smooth scroll to the top of the smooth scrolling container
        } else {
            console.log("Using window.scrollTo to scroll to the top");
            window.scrollTo({ top: 0, behavior: "smooth" }); // Fallback for normal scrolling
        }

        // Kill all existing ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        console.log("All ScrollTriggers killed");

        // Reset all properties for general elements
        gsap.set(".header, .hero__title, .hero__image, .about__wrapper--glasmorphism, .wrapper__content, .roadmap__title, .roadmap_svg, .card01, .card02, .card03, .card04, .card05, .card06, .card07, .card08, .line, .text01, .text02", {
            clearProps: "all",
        });
        console.log("General elements reset to default state");

        // Reset only scale and opacity for circles and arrowhead
        gsap.set(".circle_01, .circle_02, .circle_03, .circle_04, .circle_05, .circle_06, .circle_07, .circle_08, .arrowhead, .circle_initial", {
            scale: 1,   // Reset scale
            opacity: 1, // Reset opacity
        });
        console.log("Circles and arrowhead reset (scale and opacity only)");

        // Reinitialize animations
        initializeAnimations();
        console.log("Animations reinitialized");

        // Refresh ScrollSmoother (if used)
        if (ScrollSmoother.get()) {
            ScrollSmoother.get().refresh(); // Recalculate smooth scrolling
            console.log("ScrollSmoother refreshed");
        }

        // Refresh ScrollTrigger
        ScrollTrigger.refresh(); // Recalculate start and end positions
        console.log("ScrollTrigger refreshed");
    }
});