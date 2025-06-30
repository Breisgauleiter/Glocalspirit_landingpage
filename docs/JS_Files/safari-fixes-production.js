// Safari-specific JavaScript fixes and optimizations - Production Version
// No debug output for better performance

(function() {
    'use strict';
    
    // Safari detection
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const safariVersion = navigator.userAgent.match(/Version\/(\d+\.\d+)/);
    
    // Fix 1: Safari viewport height issue (100vh problem)
    function fixSafariViewportHeight() {
        if (isSafari || isIOS) {
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', vh + 'px');
            };
            
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', () => {
                setTimeout(setVH, 100);
            });
        }
    }
    
    // Fix 2: Safari smooth scrolling polyfill
    function fixSafariSmoothScrolling() {
        if (isSafari && !CSS.supports('scroll-behavior', 'smooth')) {
            const smoothScrollPolyfill = (target, duration = 500) => {
                const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
                if (!targetElement) return;
                
                const targetPosition = targetElement.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                let startTime = null;
                
                const easeInOutQuad = (t, b, c, d) => {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                };
                
                const animation = (currentTime) => {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                };
                
                requestAnimationFrame(animation);
            };
            
            // Replace default smooth scroll behavior
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        smoothScrollPolyfill(target);
                    }
                });
            });
        }
    }
    
    // Fix 3: Safari touch event optimization
    function optimizeSafariTouchEvents() {
        if (isSafari || isIOS) {
            // Add touch-action CSS for better scrolling performance
            const style = document.createElement('style');
            style.textContent = `
                .touch-optimized { touch-action: manipulation; }
                .no-touch-action { touch-action: none; }
                .pan-x { touch-action: pan-x; }
                .pan-y { touch-action: pan-y; }
            `;
            document.head.appendChild(style);
            
            // Optimize button and interactive elements
            document.querySelectorAll('button, a, input, textarea, select').forEach(element => {
                element.classList.add('touch-optimized');
            });
        }
    }
    
    // Fix 4: Prevent Safari input zoom
    function preventSafariInputZoom() {
        if (isIOS) {
            const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], textarea, select');
            inputs.forEach(input => {
                const fontSize = window.getComputedStyle(input).fontSize;
                if (parseFloat(fontSize) < 16) {
                    input.style.fontSize = '16px';
                }
            });
        }
    }
    
    // Fix 5: Safari backdrop-filter fallback
    function safariBackdropFilterFallback() {
        if (!CSS.supports('backdrop-filter', 'blur(10px)') && !CSS.supports('-webkit-backdrop-filter', 'blur(10px)')) {
            const elements = document.querySelectorAll('[style*="backdrop-filter"], .backdrop-blur');
            elements.forEach(element => {
                element.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            });
        }
    }
    
    // Fix 6: GSAP Safari optimization
    function optimizeGSAPForSafari() {
        if ((isSafari || isIOS) && typeof gsap !== 'undefined') {
            gsap.config({
                force3D: true,
                nullTargetWarn: false,
                trialWarn: false
            });
            
            // Enable hardware acceleration for animations
            gsap.set("*", {force3D: true});
        }
    }
    
    // Fix 7: Safari video autoplay
    function fixSafariVideoAutoplay() {
        if (isSafari || isIOS) {
            const videos = document.querySelectorAll('video[autoplay]');
            videos.forEach(video => {
                video.muted = true;
                video.playsInline = true;
                video.setAttribute('playsinline', '');
                
                const playPromise = video.play();
                if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(() => {
                        // Autoplay prevented, handle gracefully
                        video.removeAttribute('autoplay');
                    });
                }
            });
        }
    }
    
    // Fix 8: Enhanced Safari form validation
    function enhanceSafariFormValidation() {
        if (isSafari) {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    // Fix for Safari's validation bubble positioning
                    input.addEventListener('invalid', function() {
                        setTimeout(() => {
                            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                    });
                });
            });
        }
    }
    
    // Fix 9: Safari date input fallback
    function safariDateInputFallback() {
        if (isSafari) {
            const dateInputs = document.querySelectorAll('input[type="date"]');
            dateInputs.forEach(input => {
                const testInput = document.createElement('input');
                testInput.type = 'date';
                if (testInput.type !== 'date') {
                    input.type = 'text';
                    input.placeholder = 'DD.MM.YYYY';
                }
            });
        }
    }
    
    // Fix 10: Safari memory optimization
    function optimizeSafariMemory() {
        if (isSafari || isIOS) {
            // Cleanup unused event listeners on page unload
            window.addEventListener('beforeunload', () => {
                document.querySelectorAll('*').forEach(element => {
                    element.onscroll = null;
                    element.ontouchmove = null;
                    element.ontouchstart = null;
                    element.ontouchend = null;
                });
            });
        }
    }
    
    // Fix 11: IntersectionObserver fallback
    function checkIntersectionObserver() {
        if (!window.IntersectionObserver && (isSafari || isIOS)) {
            // Simple polyfill for older Safari versions
            window.IntersectionObserver = class {
                constructor(callback) {
                    this.callback = callback;
                    this.elements = [];
                }
                
                observe(element) {
                    this.elements.push(element);
                    this.check();
                }
                
                unobserve(element) {
                    this.elements = this.elements.filter(el => el !== element);
                }
                
                check() {
                    this.elements.forEach(element => {
                        const rect = element.getBoundingClientRect();
                        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                        if (isVisible) {
                            this.callback([{ target: element, isIntersecting: true }]);
                        }
                    });
                }
            };
        }
    }
    
    // Fix 12: CSS Custom Properties fallback
    function safariCSSCustomPropertiesFallback() {
        if (isSafari && safariVersion && parseFloat(safariVersion[1]) < 10) {
            // Fallback for very old Safari versions
            const style = document.createElement('style');
            style.textContent = `
                :root {
                    --primary-color: #007AFF;
                    --secondary-color: #5856D6;
                    --background-color: #FFFFFF;
                    --text-color: #000000;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Fix 13: Safari form input styling
    function fixSafariFormInputs() {
        if (isSafari || isIOS) {
            const style = document.createElement('style');
            style.textContent = `
                input, textarea, select {
                    -webkit-appearance: none;
                    appearance: none;
                    border-radius: 0;
                }
                
                input[type="checkbox"], input[type="radio"] {
                    -webkit-appearance: checkbox;
                    -webkit-appearance: radio;
                    appearance: auto;
                }
                
                button, input[type="submit"], input[type="button"] {
                    -webkit-appearance: none;
                    appearance: none;
                    border-radius: 0;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize all fixes
    function initSafariFixes() {
        fixSafariViewportHeight();
        fixSafariSmoothScrolling();
        optimizeSafariTouchEvents();
        preventSafariInputZoom();
        safariBackdropFilterFallback();
        optimizeGSAPForSafari();
        fixSafariVideoAutoplay();
        enhanceSafariFormValidation();
        safariDateInputFallback();
        optimizeSafariMemory();
        checkIntersectionObserver();
        safariCSSCustomPropertiesFallback();
        fixSafariFormInputs();
        
        // Add Safari-specific class to body
        if (isSafari) {
            document.body.classList.add('safari-browser');
        }
        if (isIOS) {
            document.body.classList.add('ios-device');
        }
    }
    
    // Run fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSafariFixes);
    } else {
        initSafariFixes();
    }
    
    // Expose utilities for external use
    window.SafariFixes = {
        isSafari: isSafari,
        isIOS: isIOS,
        version: safariVersion ? parseFloat(safariVersion[1]) : null,
        fixViewportHeight: fixSafariViewportHeight,
        optimizeTouchEvents: optimizeSafariTouchEvents,
        preventInputZoom: preventSafariInputZoom
    };
    
})();
