/**
 * Safari Memory Optimizer - Intelligente Hardware-Beschleunigung und Memory-Management
 * Basiert auf WebKit Performance Best Practices
 */

(function() {
    'use strict';
    
    // Safari detection
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (!isSafari && !isIOS) return;
    
    console.log('🧠 Safari Memory Optimizer aktiv');
    
    class SafariMemoryOptimizer {
        constructor() {
            this.compositeLayers = new Set();
            this.activeAnimations = new Map();
            this.memoryThreshold = 50; // MB
            this.layerCount = 0;
            this.maxLayers = 20; // Limit für Safari
            
            this.init();
        }
        
        init() {
            this.setupGSAPOptimizations();
            this.setupMemoryMonitoring();
            this.setupCompositeLayerManagement();
            this.cleanupExcessiveHardwareAcceleration();
        }
        
        setupGSAPOptimizations() {
            if (typeof gsap === 'undefined') return;
            
            // GSAP Safari-optimierte Konfiguration
            gsap.config({
                force3D: false, // ❌ NICHT global aktivieren!
                nullTargetWarn: false,
                trialWarn: false,
                autoSleep: 60, // Deaktiviert nicht verwendete Animationen
                lazy: true // Lazy Loading für bessere Performance
            });
            
            // Nur bei aktiven Animationen Hardware-Beschleunigung
            this.optimizeGSAPAnimations();
        }
        
        optimizeGSAPAnimations() {
            const originalTo = gsap.to;
            const originalFrom = gsap.from;
            const originalFromTo = gsap.fromTo;
            
            // Wrapper für gsap.to mit Memory-Management
            gsap.to = (targets, vars) => {
                return this.createOptimizedAnimation(originalTo, targets, vars);
            };
            
            // Wrapper für gsap.from mit Memory-Management
            gsap.from = (targets, vars) => {
                return this.createOptimizedAnimation(originalFrom, targets, vars);
            };
            
            // Wrapper für gsap.fromTo mit Memory-Management
            gsap.fromTo = (targets, fromVars, toVars) => {
                return this.createOptimizedAnimationFromTo(originalFromTo, targets, fromVars, toVars);
            };
        }
        
        createOptimizedAnimation(method, targets, vars) {
            const elements = gsap.utils.toArray(targets);
            
            // Hardware-Beschleunigung nur für transform/opacity Animationen
            const needsHardwareAcceleration = this.needsHardwareAcceleration(vars);
            
            if (needsHardwareAcceleration && this.canAddCompositeLayer()) {
                this.addToCompositeLayer(elements);
                vars.force3D = true;
            } else {
                vars.force3D = false;
            }
            
            // Memory-Management Callbacks hinzufügen
            const originalOnComplete = vars.onComplete;
            vars.onComplete = () => {
                this.cleanupAnimation(elements);
                if (originalOnComplete) originalOnComplete();
            };
            
            const tl = method(targets, vars);
            this.activeAnimations.set(tl, elements);
            
            return tl;
        }
        
        createOptimizedAnimationFromTo(method, targets, fromVars, toVars) {
            const elements = gsap.utils.toArray(targets);
            
            const needsHardwareAcceleration = 
                this.needsHardwareAcceleration(fromVars) || 
                this.needsHardwareAcceleration(toVars);
            
            if (needsHardwareAcceleration && this.canAddCompositeLayer()) {
                this.addToCompositeLayer(elements);
                toVars.force3D = true;
            } else {
                toVars.force3D = false;
            }
            
            const originalOnComplete = toVars.onComplete;
            toVars.onComplete = () => {
                this.cleanupAnimation(elements);
                if (originalOnComplete) originalOnComplete();
            };
            
            const tl = method(targets, fromVars, toVars);
            this.activeAnimations.set(tl, elements);
            
            return tl;
        }
        
        needsHardwareAcceleration(vars) {
            if (!vars) return false;
            
            // Nur für diese Properties Hardware-Beschleunigung verwenden
            const hardwareAcceleratedProps = [
                'x', 'y', 'z', 'scale', 'scaleX', 'scaleY', 'rotation', 
                'rotationX', 'rotationY', 'rotationZ', 'opacity', 'transform'
            ];
            
            return hardwareAcceleratedProps.some(prop => prop in vars);
        }
        
        canAddCompositeLayer() {
            return this.layerCount < this.maxLayers;
        }
        
        addToCompositeLayer(elements) {
            elements.forEach(el => {
                if (!this.compositeLayers.has(el)) {
                    this.compositeLayers.add(el);
                    this.layerCount++;
                    
                    // will-change nur während Animation setzen
                    if (el.style) {
                        el.style.willChange = 'transform, opacity';
                    }
                }
            });
        }
        
        cleanupAnimation(elements) {
            elements.forEach(el => {
                if (el.style) {
                    // will-change nach Animation zurücksetzen
                    el.style.willChange = 'auto';
                    
                    // Transform-Properties bereinigen falls nötig
                    if (!this.hasActiveAnimation(el)) {
                        this.removeFromCompositeLayer(el);
                    }
                }
            });
        }
        
        removeFromCompositeLayer(element) {
            if (this.compositeLayers.has(element)) {
                this.compositeLayers.delete(element);
                this.layerCount--;
                
                // Hardware-Beschleunigung entfernen
                if (element.style) {
                    element.style.transform = element.style.transform.replace(/translateZ\(0px?\)/, '');
                    element.style.webkitTransform = element.style.webkitTransform.replace(/translateZ\(0px?\)/, '');
                }
            }
        }
        
        hasActiveAnimation(element) {
            for (let [tl, elements] of this.activeAnimations) {
                if (elements.includes(element) && tl.isActive()) {
                    return true;
                }
            }
            return false;
        }
        
        setupMemoryMonitoring() {
            // Memory-Monitoring für Safari
            if (performance.memory) {
                setInterval(() => {
                    const usedMemory = performance.memory.usedJSHeapSize / 1024 / 1024;
                    
                    if (usedMemory > this.memoryThreshold) {
                        console.warn(`🧠 Safari Memory Warning: ${usedMemory.toFixed(2)}MB verwendet`);
                        this.performMemoryCleanup();
                    }
                }, 5000);
            }
        }
        
        performMemoryCleanup() {
            console.log('🧹 Safari Memory Cleanup gestartet');
            
            // Inaktive Animationen bereinigen
            for (let [tl, elements] of this.activeAnimations) {
                if (!tl.isActive()) {
                    this.cleanupAnimation(elements);
                    this.activeAnimations.delete(tl);
                }
            }
            
            // Überschüssige Composite-Layer entfernen
            if (this.layerCount > this.maxLayers * 0.8) {
                this.reduceCompositeLayers();
            }
            
            // GSAP Garbage Collection
            if (typeof gsap !== 'undefined' && gsap.globalTimeline) {
                gsap.globalTimeline.clear();
            }
        }
        
        reduceCompositeLayers() {
            let removed = 0;
            const elementsToRemove = [];
            
            for (let element of this.compositeLayers) {
                if (!this.hasActiveAnimation(element)) {
                    elementsToRemove.push(element);
                    removed++;
                    if (removed >= 5) break; // Max 5 auf einmal entfernen
                }
            }
            
            elementsToRemove.forEach(el => this.removeFromCompositeLayer(el));
            
            console.log(`🧹 ${removed} Composite-Layer entfernt`);
        }
        
        setupCompositeLayerManagement() {
            // Überwache DOM-Änderungen für Cleanup
            if (window.MutationObserver) {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        mutation.removedNodes.forEach((node) => {
                            if (node.nodeType === 1) {
                                this.removeFromCompositeLayer(node);
                                // Auch Kinder-Elemente prüfen
                                node.querySelectorAll('*').forEach(child => {
                                    this.removeFromCompositeLayer(child);
                                });
                            }
                        });
                    });
                });
                
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        }
        
        cleanupExcessiveHardwareAcceleration() {
            // Entferne übermäßige Hardware-Beschleunigung aus CSS
            const styles = document.querySelectorAll('style');
            styles.forEach(style => {
                if (style.textContent.includes('* {') && 
                    style.textContent.includes('translateZ(0)')) {
                    console.log('🚫 Entferne übermäßige Hardware-Beschleunigung aus CSS');
                    style.textContent = style.textContent.replace(
                        /\*\s*{[^}]*translateZ\(0\)[^}]*}/g, 
                        ''
                    );
                }
            });
        }
        
        // Public API für manuelle Optimierung
        optimizeElement(element, enable = true) {
            if (enable && this.canAddCompositeLayer()) {
                this.addToCompositeLayer([element]);
            } else {
                this.removeFromCompositeLayer(element);
            }
        }
        
        getMemoryInfo() {
            return {
                activeLayers: this.layerCount,
                maxLayers: this.maxLayers,
                activeAnimations: this.activeAnimations.size,
                memoryUsage: performance.memory ? 
                    (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + 'MB' : 
                    'Nicht verfügbar'
            };
        }
    }
    
    // Safari Memory Optimizer initialisieren
    window.safariMemoryOptimizer = new SafariMemoryOptimizer();
    
    // Debug-Info alle 10 Sekunden (nur in Development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setInterval(() => {
            console.log('🧠 Safari Memory Info:', window.safariMemoryOptimizer.getMemoryInfo());
        }, 10000);
    }
    
})();
