// i18n Configuration and Setup for GlocalSpirit
// Using i18next for internationalization

class GlocalSpiritI18n {
    constructor() {
        this.currentLanguage = 'de';
        this.supportedLanguages = ['de', 'en', 'fr', 'es'];
        this.fallbackLanguage = 'de';
        this.translations = {};
        this.isInitialized = false;
        
        // Language detection order: URL > localStorage > browser > fallback
        this.detectionOrder = ['url', 'localStorage', 'navigator', 'fallback'];
    }

    async init() {
        try {
            // Detect user's preferred language
            const detectedLang = this.detectLanguage();
            this.currentLanguage = this.validateLanguage(detectedLang);
            
            // Load translations for current language
            await this.loadTranslations(this.currentLanguage);
            
            // Update page content
            this.updatePageLanguage();
            
            // Setup language switcher
            this.setupLanguageSwitcher();
            
            // Update HTML lang attribute
            document.documentElement.lang = this.currentLanguage;
            
            this.isInitialized = true;
            console.log(`🌍 i18n initialized with language: ${this.currentLanguage}`);
            
            // Trigger custom event for other scripts
            document.dispatchEvent(new CustomEvent('i18nReady', { 
                detail: { language: this.currentLanguage } 
            }));
            
        } catch (error) {
            console.error('❌ Failed to initialize i18n:', error);
            // Fallback to default language
            this.currentLanguage = this.fallbackLanguage;
            await this.loadTranslations(this.currentLanguage);
            this.updatePageLanguage();
        }
    }

    detectLanguage() {
        // 1. Check URL parameter (?lang=en)
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.supportedLanguages.includes(urlLang)) {
            return urlLang;
        }

        // 2. Check URL path (/en/, /fr/, etc.)
        const pathLang = this.getLanguageFromPath();
        if (pathLang) {
            return pathLang;
        }

        // 3. Check localStorage
        const storedLang = localStorage.getItem('glocalspirit-language');
        if (storedLang && this.supportedLanguages.includes(storedLang)) {
            return storedLang;
        }

        // 4. Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.supportedLanguages.includes(browserLang)) {
            return browserLang;
        }

        // 5. Fallback to default
        return this.fallbackLanguage;
    }

    getLanguageFromPath() {
        const path = window.location.pathname;
        const pathSegments = path.split('/').filter(segment => segment);
        
        if (pathSegments.length > 0) {
            const firstSegment = pathSegments[0];
            if (this.supportedLanguages.includes(firstSegment)) {
                return firstSegment;
            }
        }
        
        return null;
    }

    validateLanguage(lang) {
        return this.supportedLanguages.includes(lang) ? lang : this.fallbackLanguage;
    }

    async loadTranslations(language) {
        const translationFiles = [
            'navigation',
            'hero', 
            'about',
            'roadmap',
            'forms',
            'success'
        ];

        this.translations[language] = {};

        try {
            const loadPromises = translationFiles.map(async (file) => {
                const response = await fetch(`locales/${language}/${file}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}.json for ${language}`);
                }
                const data = await response.json();
                this.translations[language][file] = data;
            });

            await Promise.all(loadPromises);
            console.log(`✅ Loaded translations for ${language}`);
            
        } catch (error) {
            console.error(`❌ Error loading translations for ${language}:`, error);
            
            // If not fallback language, try to load fallback
            if (language !== this.fallbackLanguage) {
                console.log(`🔄 Loading fallback language: ${this.fallbackLanguage}`);
                await this.loadTranslations(this.fallbackLanguage);
                this.currentLanguage = this.fallbackLanguage;
            }
        }
    }

    t(key, defaultValue = '') {
        if (!this.isInitialized) {
            console.warn('⚠️ i18n not initialized yet');
            return defaultValue;
        }

        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Try fallback language
                let fallbackValue = this.translations[this.fallbackLanguage];
                for (const fk of keys) {
                    if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
                        fallbackValue = fallbackValue[fk];
                    } else {
                        console.warn(`🔍 Translation missing: ${key} (${this.currentLanguage})`);
                        return defaultValue || key;
                    }
                }
                return fallbackValue;
            }
        }

        return value || defaultValue || key;
    }

    updatePageLanguage() {
        // Update all elements with data-i18n attributes
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.hasAttribute('data-i18n-html')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update page title
        const titleKey = document.querySelector('meta[name="i18n-title"]');
        if (titleKey) {
            const title = this.t(titleKey.getAttribute('content'));
            document.title = title;
        }

        // Update meta description
        const descKey = document.querySelector('meta[name="i18n-description"]');
        if (descKey) {
            const desc = this.t(descKey.getAttribute('content'));
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', desc);
            }
        }
    }

    async changeLanguage(newLanguage) {
        if (!this.supportedLanguages.includes(newLanguage)) {
            console.error(`❌ Unsupported language: ${newLanguage}`);
            return;
        }

        if (newLanguage === this.currentLanguage) {
            return; // Already current language
        }

        try {
            // Load translations if not already loaded
            if (!this.translations[newLanguage]) {
                await this.loadTranslations(newLanguage);
            }

            // Update current language
            this.currentLanguage = newLanguage;
            
            // Save to localStorage
            localStorage.setItem('glocalspirit-language', newLanguage);
            
            // Update page content
            this.updatePageLanguage();
            
            // Update HTML lang attribute
            document.documentElement.lang = newLanguage;
            
            // Update URL without reload
            this.updateURL(newLanguage);
            
            // Trigger custom event
            document.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: newLanguage } 
            }));
            
            console.log(`🌍 Language changed to: ${newLanguage}`);
            
        } catch (error) {
            console.error(`❌ Failed to change language to ${newLanguage}:`, error);
        }
    }

    updateURL(language) {
        const url = new URL(window.location);
        
        // Update URL parameter
        if (language === this.fallbackLanguage) {
            url.searchParams.delete('lang');
        } else {
            url.searchParams.set('lang', language);
        }
        
        // Update browser history without reload
        window.history.replaceState({}, '', url.toString());
    }

    setupLanguageSwitcher() {
        // This will be called after DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            this.createLanguageSwitcher();
        });
        
        // If DOM is already ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createLanguageSwitcher();
            });
        } else {
            this.createLanguageSwitcher();
        }
    }

    createLanguageSwitcher() {
        const header = document.querySelector('.header__nav .header__links');
        if (!header) {
            console.warn('⚠️ Header navigation not found for language switcher');
            return;
        }

        // Create language switcher container
        const langSwitcher = document.createElement('div');
        langSwitcher.className = 'language-switcher';
        
        const langButton = document.createElement('button');
        langButton.className = 'language-switcher__button';
        langButton.innerHTML = `
            <span class="language-switcher__current">${this.currentLanguage.toUpperCase()}</span>
            <span class="language-switcher__arrow">▼</span>
        `;
        
        const langDropdown = document.createElement('div');
        langDropdown.className = 'language-switcher__dropdown';
        
        // Create language options
        this.supportedLanguages.forEach(lang => {
            const option = document.createElement('button');
            option.className = 'language-switcher__option';
            option.setAttribute('data-lang', lang);
            option.innerHTML = `
                <span class="language-switcher__flag">${this.getLanguageFlag(lang)}</span>
                <span class="language-switcher__name">${this.getLanguageName(lang)}</span>
            `;
            
            if (lang === this.currentLanguage) {
                option.classList.add('language-switcher__option--active');
            }
            
            option.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeLanguage(lang);
                this.updateLanguageSwitcher();
                langDropdown.classList.remove('language-switcher__dropdown--open');
            });
            
            langDropdown.appendChild(option);
        });
        
        // Toggle dropdown
        langButton.addEventListener('click', (e) => {
            e.preventDefault();
            langDropdown.classList.toggle('language-switcher__dropdown--open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langSwitcher.contains(e.target)) {
                langDropdown.classList.remove('language-switcher__dropdown--open');
            }
        });
        
        langSwitcher.appendChild(langButton);
        langSwitcher.appendChild(langDropdown);
        
        // Insert before beta-tester link
        header.appendChild(langSwitcher);
    }

    updateLanguageSwitcher() {
        const currentBtn = document.querySelector('.language-switcher__current');
        if (currentBtn) {
            currentBtn.textContent = this.currentLanguage.toUpperCase();
        }
        
        // Update active option
        document.querySelectorAll('.language-switcher__option').forEach(option => {
            option.classList.remove('language-switcher__option--active');
            if (option.getAttribute('data-lang') === this.currentLanguage) {
                option.classList.add('language-switcher__option--active');
            }
        });
    }

    getLanguageFlag(lang) {
        const flags = {
            'de': '🇩🇪',
            'en': '🇬🇧', 
            'fr': '🇫🇷',
            'es': '🇪🇸'
        };
        return flags[lang] || '🌍';
    }

    getLanguageName(lang) {
        const names = {
            'de': 'Deutsch',
            'en': 'English',
            'fr': 'Français', 
            'es': 'Español'
        };
        return names[lang] || lang.toUpperCase();
    }

    // Utility method to get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Utility method to check if language is supported
    isLanguageSupported(lang) {
        return this.supportedLanguages.includes(lang);
    }
}

// Global instance
window.glocalSpiritI18n = new GlocalSpiritI18n();

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.glocalSpiritI18n.init();
    });
} else {
    window.glocalSpiritI18n.init();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GlocalSpiritI18n;
}
