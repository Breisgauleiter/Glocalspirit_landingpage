// Modular i18n System - Eliminating Massive Translation Files
// Lazy loading, language separation, namespace organization

class ModularI18n {
    constructor(config = {}) {
        this.config = {
            defaultLanguage: 'de',
            supportedLanguages: ['de', 'en', 'fr', 'es'],
            fallbackLanguage: 'de',
            namespaces: ['common', 'forms', 'navigation', 'hero', 'about', 'roadmap'],
            storageKey: 'glocalspirit-language',
            debug: false,
            ...config
        };
        
        this.currentLanguage = this.config.defaultLanguage;
        this.translations = new Map(); // language -> namespace -> translations
        this.loadingPromises = new Map(); // track loading states
        this.loadedNamespaces = new Set();
        
        this.init();
    }
    
    log(...args) {
        if (this.config.debug) {
            console.log('[ModularI18n]', ...args);
        }
    }
    
    async init() {
        this.log('Initializing modular i18n system...');
        
        // Detect language from various sources
        this.detectLanguage();
        
        // Load critical namespaces first
        await this.loadNamespaces(['common', 'navigation']);
        
        // Update page with available translations
        this.updatePage();
        
        // Setup language switcher
        this.setupLanguageSwitcher();
        
        // Load remaining namespaces in background
        this.loadRemainingNamespaces();
        
        this.log('Modular i18n system ready!');
        document.dispatchEvent(new CustomEvent('i18nReady', { 
            detail: { language: this.currentLanguage } 
        }));
    }
    
    detectLanguage() {
        // Priority: URL param > localStorage > browser > default
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        const savedLang = localStorage.getItem(this.config.storageKey);
        const browserLang = navigator.language.split('-')[0];
        
        const candidates = [urlLang, savedLang, browserLang, this.config.defaultLanguage];
        
        for (const lang of candidates) {
            if (lang && this.config.supportedLanguages.includes(lang)) {
                this.currentLanguage = lang;
                this.log(`Language detected: ${lang}`);
                return;
            }
        }
        
        this.log(`Using default language: ${this.config.defaultLanguage}`);
    }
    
    async loadNamespaces(namespaces) {
        const promises = namespaces.map(namespace => this.loadNamespace(namespace));
        await Promise.allSettled(promises);
    }
    
    async loadNamespace(namespace) {
        const cacheKey = `${this.currentLanguage}:${namespace}`;
        
        // Return existing promise if already loading
        if (this.loadingPromises.has(cacheKey)) {
            return this.loadingPromises.get(cacheKey);
        }
        
        // Return immediately if already loaded
        if (this.loadedNamespaces.has(cacheKey)) {
            return Promise.resolve();
        }
        
        const promise = this._fetchNamespace(namespace);
        this.loadingPromises.set(cacheKey, promise);
        
        try {
            await promise;
            this.loadedNamespaces.add(cacheKey);
            this.log(`Loaded namespace: ${namespace} for ${this.currentLanguage}`);
        } catch (error) {
            this.log(`Failed to load namespace: ${namespace}`, error);
        } finally {
            this.loadingPromises.delete(cacheKey);
        }
        
        return promise;
    }
    
    async _fetchNamespace(namespace) {
        try {
            // Try dynamic translation files first
            const response = await fetch(`locales/${this.currentLanguage}/${namespace}.json`);
            if (response.ok) {
                const data = await response.json();
                this.setTranslations(this.currentLanguage, namespace, data);
                return;
            }
        } catch (error) {
            this.log(`Dynamic file not found: locales/${this.currentLanguage}/${namespace}.json`);
        }
        
        // Fallback to embedded translations
        this.loadEmbeddedNamespace(namespace);
    }
    
    loadEmbeddedNamespace(namespace) {
        // Embedded translations for critical namespaces
        const embedded = this.getEmbeddedTranslations();
        
        if (embedded[this.currentLanguage] && embedded[this.currentLanguage][namespace]) {
            this.setTranslations(this.currentLanguage, namespace, embedded[this.currentLanguage][namespace]);
        } else if (embedded[this.config.fallbackLanguage] && embedded[this.config.fallbackLanguage][namespace]) {
            this.log(`Using fallback language for namespace: ${namespace}`);
            this.setTranslations(this.currentLanguage, namespace, embedded[this.config.fallbackLanguage][namespace]);
        }
    }
    
    setTranslations(language, namespace, translations) {
        if (!this.translations.has(language)) {
            this.translations.set(language, new Map());
        }
        
        const langMap = this.translations.get(language);
        langMap.set(namespace, this.flattenTranslations(translations));
    }
    
    flattenTranslations(obj, prefix = '') {
        const result = {};
        
        for (const [key, value] of Object.entries(obj)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                Object.assign(result, this.flattenTranslations(value, newKey));
            } else {
                result[newKey] = value;
            }
        }
        
        return result;
    }
    
    async t(key, namespace = 'common') {
        // Try to get translation from loaded namespaces
        const translation = this.getTranslation(key, namespace);
        if (translation !== key) {
            return translation;
        }
        
        // If not found, try to load the namespace and retry
        await this.loadNamespace(namespace);
        return this.getTranslation(key, namespace);
    }
    
    getTranslation(key, namespace = 'common') {
        const langMap = this.translations.get(this.currentLanguage);
        if (!langMap) return key;
        
        // Try specific namespace first
        const nsTranslations = langMap.get(namespace);
        if (nsTranslations && nsTranslations[key]) {
            return nsTranslations[key];
        }
        
        // Try all namespaces as fallback
        for (const [, translations] of langMap) {
            if (translations[key]) {
                return translations[key];
            }
        }
        
        // Try fallback language
        const fallbackLangMap = this.translations.get(this.config.fallbackLanguage);
        if (fallbackLangMap) {
            for (const [, translations] of fallbackLangMap) {
                if (translations[key]) {
                    this.log(`Using fallback translation for: ${key}`);
                    return translations[key];
                }
            }
        }
        
        this.log(`Translation not found: ${key}`);
        return key;
    }
    
    async changeLanguage(newLanguage) {
        if (!this.config.supportedLanguages.includes(newLanguage)) {
            this.log(`Language not supported: ${newLanguage}`);
            return;
        }
        
        this.currentLanguage = newLanguage;
        localStorage.setItem(this.config.storageKey, newLanguage);
        
        // Clear loaded namespaces to force reload for new language
        this.loadedNamespaces.clear();
        this.loadingPromises.clear();
        
        // Load critical namespaces
        await this.loadNamespaces(['common', 'navigation']);
        
        // Update page
        this.updatePage();
        
        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('lang', newLanguage);
        window.history.replaceState({}, '', url);
        
        // Load remaining namespaces
        this.loadRemainingNamespaces();
        
        this.log(`Language changed to: ${newLanguage}`);
    }
    
    updatePage() {
        // Update text elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const namespace = element.getAttribute('data-i18n-ns') || 'common';
            element.textContent = this.getTranslation(key, namespace);
        });
        
        // Update HTML elements
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const namespace = element.getAttribute('data-i18n-ns') || 'common';
            element.innerHTML = this.getTranslation(key, namespace);
        });
        
        // Update title
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const key = titleElement.getAttribute('data-i18n');
            document.title = this.getTranslation(key, 'common');
        }
    }
    
    async loadRemainingNamespaces() {
        const remaining = this.config.namespaces.filter(ns => 
            !this.loadedNamespaces.has(`${this.currentLanguage}:${ns}`)
        );
        
        if (remaining.length > 0) {
            this.log(`Loading remaining namespaces: ${remaining.join(', ')}`);
            await this.loadNamespaces(remaining);
            this.updatePage(); // Update again with new translations
        }
    }
    
    setupLanguageSwitcher() {
        // Find or create language switcher
        let switcher = document.querySelector('.language-switcher');
        if (!switcher) {
            switcher = this.createLanguageSwitcher();
        }
        
        this.updateLanguageSwitcher(switcher);
    }
    
    createLanguageSwitcher() {
        const container = document.querySelector('.header__language-switcher');
        if (!container) return null;
        
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher glassmorphism';
        switcher.innerHTML = `
            <button class="language-switcher__button btn-base btn-secondary">
                <span class="language-switcher__current">${this.currentLanguage.toUpperCase()}</span>
                <span class="language-switcher__arrow">▼</span>
            </button>
            <div class="language-switcher__dropdown">
                ${this.config.supportedLanguages.map(lang => `
                    <button class="language-switcher__option" data-lang="${lang}">
                        ${lang.toUpperCase()}
                    </button>
                `).join('')}
            </div>
        `;
        
        container.appendChild(switcher);
        return switcher;
    }
    
    updateLanguageSwitcher(switcher) {
        if (!switcher) return;
        
        // Update current language display
        const current = switcher.querySelector('.language-switcher__current');
        if (current) {
            current.textContent = this.currentLanguage.toUpperCase();
        }
        
        // Add event listeners
        const button = switcher.querySelector('.language-switcher__button');
        const dropdown = switcher.querySelector('.language-switcher__dropdown');
        const options = switcher.querySelectorAll('.language-switcher__option');
        
        button?.addEventListener('click', () => {
            dropdown?.classList.toggle('show');
        });
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                if (lang) {
                    this.changeLanguage(lang);
                    dropdown?.classList.remove('show');
                }
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!switcher.contains(e.target)) {
                dropdown?.classList.remove('show');
            }
        });
    }
    
    getEmbeddedTranslations() {
        // Critical translations embedded for immediate availability
        return {
            de: {
                common: {
                    'home': 'Startseite',
                    'about': 'Über uns',
                    'contact': 'Kontakt',
                    'loading': 'Lädt...',
                    'error': 'Fehler'
                },
                navigation: {
                    'spenden': 'Spenden',
                    'beta_test': 'Testen',
                    'back': '← Zurück'
                }
            },
            en: {
                common: {
                    'home': 'Home',
                    'about': 'About',
                    'contact': 'Contact',
                    'loading': 'Loading...',
                    'error': 'Error'
                },
                navigation: {
                    'spenden': 'Donate',
                    'beta_test': 'Test',
                    'back': '← Back'
                }
            },
            fr: {
                common: {
                    'home': 'Accueil',
                    'about': 'À propos',
                    'contact': 'Contact',
                    'loading': 'Chargement...',
                    'error': 'Erreur'
                },
                navigation: {
                    'spenden': 'Faire un don',
                    'beta_test': 'Tester',
                    'back': '← Retour'
                }
            },
            es: {
                common: {
                    'home': 'Inicio',
                    'about': 'Acerca de',
                    'contact': 'Contacto',
                    'loading': 'Cargando...',
                    'error': 'Error'
                },
                navigation: {
                    'spenden': 'Donar',
                    'beta_test': 'Probar',
                    'back': '← Atrás'
                }
            }
        };
    }
}

// Global instance
window.ModularI18n = ModularI18n;

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new ModularI18n({ debug: false });
});
