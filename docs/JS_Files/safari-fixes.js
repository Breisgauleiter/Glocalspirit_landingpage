// Safari-specific JavaScript fixes and optimizations

(function() {
    'use strict';
    
    // Safari detection
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const safariVersion = navigator.userAgent.match(/Version\/(\d+\.\d+)/);
    
    console.log('Safari Fixes loaded for:', isSafari ? 'Safari' : 'Other browser');
    
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
            
            // Override smooth scroll behavior
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[href^="#"]');
                if (link) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    smoothScrollPolyfill(targetId);
                }
            });
        }
    }
    
    // Fix 3: Safari touch event optimization
    function optimizeSafariTouchEvents() {
        if (isIOS) {
            // Add passive event listeners for better performance
            const passiveEvents = ['touchstart', 'touchmove', 'touchend', 'scroll'];
            passiveEvents.forEach(event => {
                document.addEventListener(event, () => {}, { passive: true });
            });
            
            // Fix for double-tap zoom
            let lastTouchEnd = 0;
            document.addEventListener('touchend', (e) => {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        }
    }
    
    // Fix 4: Safari input focus zoom prevention
    function preventSafariInputZoom() {
        if (isIOS) {
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (input.style.fontSize === '' || parseFloat(input.style.fontSize) < 16) {
                    input.style.fontSize = '16px';
                }
            });
        }
    }
    
    // Fix 5: Safari backdrop-filter fallback
    function safariBackdropFilterFallback() {
        if (isSafari && !CSS.supports('backdrop-filter', 'blur(10px)') && !CSS.supports('-webkit-backdrop-filter', 'blur(10px)')) {
            const backdropElements = document.querySelectorAll('.backdrop-blur, .backdrop-filter-test');
            backdropElements.forEach(element => {
                element.style.background = 'rgba(255, 255, 255, 0.8)';
                element.classList.add('backdrop-fallback');
            });
        }
    }
    
    // Fix 6: Safari GSAP performance optimization
    function optimizeGSAPForSafari() {
        if (typeof gsap !== 'undefined' && isSafari) {
            // Force hardware acceleration
            gsap.set('[class*="animate"], [class*="gsap"]', {
                force3D: true,
                transformPerspective: 1000
            });
            
            // Optimize ScrollTrigger for Safari
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.config({
                    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
                });
            }
        }
    }
    
    // Fix 7: Safari video autoplay fix
    function fixSafariVideoAutoplay() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.setAttribute('playsinline', 'true');
            video.setAttribute('webkit-playsinline', 'true');
            
            if (isIOS) {
                // iOS requires user interaction for autoplay
                video.muted = true;
                video.addEventListener('canplay', () => {
                    if (video.autoplay) {
                        video.play().catch(e => {
                            console.log('Autoplay prevented:', e);
                        });
                    }
                });
            }
        });
    }
    
    // Fix 8: Safari form validation enhancement
    function enhanceSafariFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                // Custom validation messages for Safari
                input.addEventListener('invalid', (e) => {
                    if (isSafari) {
                        e.preventDefault();
                        const customMessage = input.getAttribute('data-error-message') || 'Please fill out this field correctly';
                        input.setCustomValidity(customMessage);
                    }
                });
                
                input.addEventListener('input', () => {
                    input.setCustomValidity('');
                });
            });
        });
    }
    
    // Fix 9: Safari date input fallback
    function safariDateInputFallback() {
        if (isSafari) {
            const dateInputs = document.querySelectorAll('input[type="date"]');
            dateInputs.forEach(input => {
                // Test if date input is supported
                const testInput = document.createElement('input');
                testInput.type = 'date';
                testInput.value = 'not-a-date';
                
                if (testInput.value === 'not-a-date') {
                    // Date input not supported, provide fallback
                    input.type = 'text';
                    input.placeholder = 'DD/MM/YYYY';
                    input.pattern = '\\d{2}/\\d{2}/\\d{4}';
                }
            });
        }
    }
    
    // Fix 10: Safari memory management
    function optimizeSafariMemory() {
        if (isSafari) {
            // Cleanup function for better memory management
            window.addEventListener('beforeunload', () => {
                // Cancel any running animations
                if (typeof gsap !== 'undefined') {
                    gsap.killTweensOf('*');
                }
                
                // Remove event listeners
                document.removeEventListener('touchstart', () => {});
                document.removeEventListener('touchmove', () => {});
                document.removeEventListener('touchend', () => {});
            });
            
            // Monitor memory usage if available
            if (performance.memory) {
                setInterval(() => {
                    const memoryUsage = performance.memory.usedJSHeapSize / 1048576;
                    if (memoryUsage > 50) { // 50MB threshold
                        console.warn('High memory usage detected:', memoryUsage.toFixed(2) + 'MB');
                    }
                }, 30000); // Check every 30 seconds
            }
        }
    }
    
    // Fix 11: Safari intersection observer polyfill check
    function checkIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, loading polyfill...');
            // You could load a polyfill here if needed
        }
    }
    
    // Fix 12: Safari CSS custom properties fallback
    function safariCSSCustomPropertiesFallback() {
        if (isSafari && safariVersion && parseFloat(safariVersion[1]) < 10) {
            // Fallback for older Safari versions
            document.documentElement.style.setProperty('--primary-color', '#007AFF');
            document.documentElement.style.setProperty('--secondary-color', '#5856D6');
        }
    }
    
    // Initialize all fixes
    function initSafariFixes() {
        console.log('Initializing Safari fixes...');
        
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
        
        console.log('Safari fixes initialized successfully');
        
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