document.addEventListener("DOMContentLoaded", () => {
    // Ensure DrawSVGPlugin is properly registered
    if (typeof DrawSVGPlugin === "undefined") {
        console.error("DrawSVGPlugin is not loaded. Ensure it is included in your project.");
        return;
    }
    gsap.registerPlugin(DrawSVGPlugin, MotionPathHelper, MotionPathPlugin, ScrollTrigger, ScrollSmoother);

    // Initialize ScrollSmoother
    ScrollSmoother.create({
        smooth: 1.5, // Smooth scrolling duration
        effects: true, // Enable effects like opacity and transforms
    });

    // Header animation
    gsap.from(".header", {
        y: -10,
        scale: 0.8,
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
        scale: 1.8, // Scale to 1.5 times its size
        scrollTrigger: {
            trigger: ".hero__image", // Trigger when the hero image enters the viewport
            start: "top 80%", // Start rotation when the top of the image reaches the center of the viewport
            end: "bottom top", // End rotation when the bottom of the image scrolls out of the viewport
            scrub: 1, // Smoothly tie the rotation to the scroll position
        },
    });

    // ScrollTrigger animation for .about__wrapper--glasmorphism
    gsap.from(".about__wrapper--glasmorphism", {
        scale: 0.8, // Start with scale 0.8
        y: 50, // Move upwards
        opacity: 0, // Start with opacity 0
        duration: 1.5, // Adjusted animation duration for smoother control
        ease: "power2.out", // Smooth easing
        scrollTrigger: {
            trigger: ".about__wrapper--glasmorphism",
            start: "top 60%", // Start when the top of the element is 60% down the viewport
            end: "top 40%", // End when the top of the element is 40% down the viewport
            scrub: 1.5, // Smoothly scrub the animation over 1 second
            // markers: true, // Add markers for debugging
        },
    });

    // ScrollTrigger animation for .wrapper__content
    gsap.from(".wrapper__content", {
        scale: 0.8, // Start with scale 0.8
        y: 50, // Move upwards
        opacity: 0, // Start with opacity 0
        duration: 1, // Animation duration
        ease: "power2.out", // Smooth easing
        scrollTrigger: {
            trigger: ".wrapper__content",
            start: "top 55%", // Start when the top of the element is 80% down the viewport
            end: "top 35%", // End when the top of the element is 60% down the viewport
            scrub: 1.5, // Tie animation to scroll position
        },
    });

    gsap.from(".roadmap__title", {
        scale: 0.8, // Start with scale 0.8
        y: 50, // Move upwards
        opacity: 0, // Start with opacity 0
        duration: 1, // Animation duration
        ease: "power2.out", // Smooth easing
        scrollTrigger: {
            trigger: ".roadmap__title",
            start: "top 55%", // Start when the top of the element is 80% down the viewport
            end: "top 35%", // End when the top of the element is 60% down the viewport
            scrub: 1.5, // Tie animation to scroll position
        },
    });
});

// scroller animation (about section)
const scroller = document.querySelector('.about__scroller');

function animateScroller() {
    scroller.setAttribute("data-animated", "true");

    const scrollerInner = scroller.querySelector('.about__scroller--inner');
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
        const duplicateItem = item.cloneNode(true);
        duplicateItem.setAttribute("aria-hidden", "true");
        scrollerInner.appendChild(duplicateItem);
    })
}

animateScroller();

// svg animation
gsap.defaults({ease:"none"});

// Function to initialize animations
function initializeAnimations() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth > 800) {
        // Create a timeline for sequential animations
        const main = gsap.timeline({
            scrollTrigger: {
                trigger: ".roadmap_svg",
                scrub: 1.5,
                start: "top 70%",
                end: "bottom 70%",
                markers: true, // Debug markers (optional)
            },
        });

        // Animate the line
        main.from(".line", {
            drawSVG: 0,
            duration: 20,
        });

        // Animate the circles and cards together
        main.from(".circle_01", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 1.2).from(".card01", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 7.0,
        }, 1.2);

        main.from(".circle_02", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 3.8).from(".card02", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 7.0,
        }, 3.8);

        main.from(".circle_03", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 6.3).from(".card03", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 7.0,
        }, 6.3);

        main.from(".circle_04", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 8.7).from(".card04", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 7.0,
        }, 8.7);

        main.from(".circle_05", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 11.0).from(".card05", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 7.0,
        }, 11.0);

        main.from(".circle_06", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 13.5).from(".card06", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 7.0,
        }, 13.5);

        main.from(".circle_07", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 16.5).from(".card07", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 7.0,
        }, 16.5);

        main.from(".circle_08", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 18.8).from(".card08", {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            duration: 7.0,
        }, 18.8);

        main.from(".arrowhead", {
            scale: 0,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
            duration: 1.0,
        }, 19.9);
    } else {
        console.log("Viewport width is less than or equal to 800px. Animations are disabled.");
    }
}

// Initialize animations on page load
initializeAnimations();

// // Reinitialize animations on window resize
// window.addEventListener("resize", () => {
//     ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all existing ScrollTriggers
//     initializeAnimations(); // Reinitialize animations
// });
// roadmap cards positioning
document.addEventListener("DOMContentLoaded", () => {
    const roadmapContent = document.querySelector(".roadmap__content");
    const circles = document.querySelectorAll(".roadmap_svg .circle_01, .roadmap_svg .circle_02, .roadmap_svg .circle_03, .roadmap_svg .circle_04, .roadmap_svg .circle_05, .roadmap_svg .circle_06, .roadmap_svg .circle_07, .roadmap_svg .circle_08");
    const cards = document.querySelectorAll(".cards__wrapper .card");

    // Define individual offsets for each card as percentages of the parent container's width
    const cardOffsets = {
        circle_01: { left: 8 }, // 8% of the container width
        circle_02: { left: -45 }, // -45% of the container width
        circle_03: { left: 3 }, // 3% of the container width
        circle_04: { left: -42 }, // -42% of the container width
        circle_05: { left: 7 }, // 7% of the container width
        circle_06: { left: -39 }, // -39% of the container width
        circle_07: { left: 5 }, // 5% of the container width
        circle_08: { left: -43 }, // -43% of the container width
    };

    // Define custom offsets for viewport widths between 870px and 800px
    const customCardOffsets = {
        circle_01: { left: 10 }, // Custom offset for this range
        circle_02: { left: -50 },
        circle_03: { left: 5 },
        circle_04: { left: -38 },
        circle_05: { left: 10 },
        circle_06: { left: -37},
        circle_07: { left: 8 },
        circle_08: { left: -40 },
    };

    // Function to position cards
    function positionCards() {
        const viewportWidth = window.innerWidth; // Get the current viewport width
        const roadmapContentWidth = roadmapContent.offsetWidth; // Get the container width

        circles.forEach((circle, index) => {
            const circleRect = circle.getBoundingClientRect(); // Get the circle's position
            const roadmapContentRect = roadmapContent.getBoundingClientRect(); // Get the parent container's position
            const topPosition = circleRect.top - roadmapContentRect.top; // Calculate top position

            const card = cards[index];
            if (card) {
                if (viewportWidth > 800) {
                    // Use custom offsets for widths between 870px and 800px
                    const offsets =
                        viewportWidth <= 870 && viewportWidth > 800
                            ? customCardOffsets
                            : cardOffsets;

                    const circleClass = circle.classList[0]; // e.g., "circle_01"
                    const offset = offsets[circleClass] || { left: 0 }; // Default offset if not defined
                    const leftOffsetInPixels = (offset.left / 100) * roadmapContentWidth;

                    // Apply absolute positioning
                    card.style.position = "absolute";
                    card.style.top = `${topPosition}px`;
                    card.style.left = `${circleRect.left - roadmapContentRect.left + leftOffsetInPixels}px`;
                } else {
                    // For widths <= 800px, reset to relative positioning
                    card.style.position = "relative";
                    card.style.top = "auto";
                    card.style.left = "auto";
                }
            }
        });
    }

    // Initial positioning
    positionCards();

    // Recalculate positions on window resize
    window.addEventListener("resize", positionCards);
});