document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(DrawSVGPlugin,MotionPathHelper,MotionPathPlugin,ScrollTrigger,ScrollSmoother);
    // gsap code here!;


    //Header animation
    gsap.from(".header", {
        y: -50, // Move from 50px above
        opacity: 0, // Start with opacity 0
        duration: 1.5, // Animation duration
        ease: "power2.in", // Smooth easing
        delay: 2.5, // Delay before the animation starts
        onComplete: () => {
            // Clear inline styles after animation completes
            gsap.set(".header", { clearProps: "all" });
        }
        
    });

    // Hero title animation
    gsap.from(".hero__title", {
        y: 50, // Move from 50px below
        opacity: 0, // Start with opacity 0
        duration: 1.8, // Animation duration
        ease: "power2.in", // Smooth easing
    });

    // Hero image animation (delayed)
    gsap.from(".hero__image", {
        y: 50, // Move from 50px below
        opacity: 0, // Start with opacity 0
        duration: 1.5, // Animation duration
        ease: "power2.in", // Smooth easing
        delay: 1, // Delay after the title animation
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
