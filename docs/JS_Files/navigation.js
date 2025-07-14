// Navigation Enhancement - Anchor Links, Smooth Scrolling & Active States
// glocalSpirit Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const SCROLL_OFFSET = 80; // Header height offset for navigation
    const SCROLL_DURATION = 800; // Smooth scroll duration in ms
    
    // Get all navigation elements
    const headerLinks = document.querySelectorAll('.header__link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for anchor links
    function smoothScrollTo(target, duration = SCROLL_DURATION) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.offsetTop - SCROLL_OFFSET;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        // Easing function for smooth animation
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Handle navigation link clicks
    headerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                // Update active state
                document.querySelector('.header__link--active')?.classList.remove('header__link--active');
                this.classList.add('header__link--active');
                
                // Smooth scroll to section
                smoothScrollTo(href);
                
                // Close mobile menu if open
                const menuToggle = document.querySelector('.menu__toggle');
                if (menuToggle && menuToggle.checked) {
                    menuToggle.checked = false;
                }
            }
        });
    });
    
    // Update active state based on scroll position
    function updateActiveNavigation() {
        const scrollPosition = window.pageYOffset + SCROLL_OFFSET + 50;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update navigation active state
        headerLinks.forEach(link => {
            link.classList.remove('header__link--active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('header__link--active');
            }
        });
    }
    
    // Throttled scroll listener for performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavigation();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set correct active state
    updateActiveNavigation();
    
    // Mobile Navigation UX Improvements

    const menuBtn = document.querySelector('.menu-toggle-button');
    const headerNav = document.querySelector('.header__nav');
    
    if (menuBtn && headerNav) {
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
            if (expanded && !headerNav.contains(e.target) && !e.target.closest('.menu-toggle-button')) {
                menuBtn.click();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
                menuBtn.click();
            }
        });
        
        // Toggle mobile nav with button click
        menuBtn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            if (!expanded) {
                this.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
                headerNav.style.display = 'flex';
                this.querySelector('.burger-icon').style.display = 'none';
                this.querySelector('.close-icon').style.display = 'block';
            } else {
                this.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                headerNav.style.display = 'none';
                this.querySelector('.burger-icon').style.display = 'block';
                this.querySelector('.close-icon').style.display = 'none';
            }
        });
    }
    
    // Handle logo click - scroll to top
    const headerLogo = document.querySelector('.header__logo');
    if (headerLogo) {
        headerLogo.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update navigation to show "Startseite" as active
            document.querySelector('.header__link--active')?.classList.remove('header__link--active');
            document.querySelector('a[href="#hero"]')?.classList.add('header__link--active');
            
            // Smooth scroll to top
            smoothScrollTo('#hero');
            
            // Close mobile menu if open
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }
        });
    }
    
    console.log('Navigation enhancement initialized');
});
