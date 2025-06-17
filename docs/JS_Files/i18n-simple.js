// Simplified i18n for GlocalSpirit
class SimpleI18n {
    constructor() {
        this.currentLanguage = 'de';
        this.supportedLanguages = ['de', 'en', 'fr', 'es'];
        this.translations = {};
        this.isReady = false;
    }

    async init() {
        console.log('🌍 Initializing simple i18n...');
        
        // Detect language
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.supportedLanguages.includes(urlLang)) {
            this.currentLanguage = urlLang;
        }
        
        // Load all translations
        await this.loadAllTranslations();
        
        // Update page
        this.updatePage();
        
        // Setup language switcher
        this.setupSwitcher();
        
        this.isReady = true;
        console.log('✅ Simple i18n ready!');
        
        document.dispatchEvent(new CustomEvent('i18nReady', { 
            detail: { language: this.currentLanguage } 
        }));
    }

    async loadAllTranslations() {
        console.log(`📥 Loading translations for ${this.currentLanguage}...`);
        
        // Flache Übersetzungsstruktur
        this.translations[this.currentLanguage] = {};
        
        // Navigation
        const navData = await this.fetchJson(`locales/${this.currentLanguage}/navigation.json`);
        console.log('🧭 Navigation data:', navData);
        if (navData && navData.nav) {
            Object.assign(this.translations[this.currentLanguage], navData.nav);
            console.log('✅ Added navigation translations:', navData.nav);
        }
        
        // Hero
        const heroData = await this.fetchJson(`locales/${this.currentLanguage}/hero.json`);
        console.log('🦸 Hero data:', heroData);
        if (heroData && heroData.hero) {
            this.translations[this.currentLanguage]['hero.title'] = heroData.hero.title;
            this.translations[this.currentLanguage]['hero.description'] = heroData.hero.description;
            console.log('✅ Added hero translations:', heroData.hero);
        }
        
        console.log('📊 Final translations:', this.translations[this.currentLanguage]);
    }

    async fetchJson(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`❌ Failed to load ${url}:`, error);
            return null;
        }
    }

    t(key) {
        if (!this.isReady) {
            console.warn('⚠️ i18n not ready yet');
            return key;
        }
        
        const translation = this.translations[this.currentLanguage][key];
        if (translation) {
            console.log(`✅ Found translation for ${key}: ${translation}`);
            return translation;
        }
        
        console.warn(`🔍 Missing translation: ${key}, available keys:`, Object.keys(this.translations[this.currentLanguage]));
        return key;
    }

    updatePage() {
        console.log('🔄 Updating page content...');
        
        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.hasAttribute('data-i18n-html')) {
                element.innerHTML = translation;
                console.log(`🔤 Updated ${key} (HTML): ${translation}`);
            } else {
                element.textContent = translation;
                console.log(`🔤 Updated ${key} (TEXT): ${translation}`);
            }
        });
        
        // Update title
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const key = titleElement.getAttribute('data-i18n');
            document.title = this.t(key);
        }
        
        console.log('✅ Page update complete');
    }

    async changeLanguage(newLang) {
        if (!this.supportedLanguages.includes(newLang)) return;
        
        this.currentLanguage = newLang;
        localStorage.setItem('glocalspirit-language', newLang);
        
        await this.loadAllTranslations();
        this.updatePage();
        
        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('lang', newLang);
        window.history.replaceState({}, '', url);
        
        console.log(`🌍 Language changed to: ${newLang}`);
    }

    setupSwitcher() {
        const select = document.getElementById('language-select');
        if (select) {
            select.value = this.currentLanguage;
            select.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
            console.log('✅ Language switcher setup');
        }
    }
}

// Global instance
window.glocalSpiritI18n = new SimpleI18n();

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.glocalSpiritI18n.init();
    });
} else {
    window.glocalSpiritI18n.init();
}
