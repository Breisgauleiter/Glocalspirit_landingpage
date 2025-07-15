// GlocalSpirit i18n System
class I18N {
    constructor() {
        // Definierte Sprachen
        this.supportedLanguages = ['de', 'en', 'fr', 'es'];
        this.defaultLanguage = 'de';
        this.currentLanguage = this.defaultLanguage;
        
        // Interner Status
        this.translations = {};
        this.isLoading = false;
        this.loadingPromise = null;
        this.initialized = false;
        this.observer = null;
        
        // Cache für Performance
        this.translationCache = new Map();
    }

    async loadTranslations(language) {
        if (!this.supportedLanguages.includes(language)) {
            console.error(`Unsupported language: ${language}`);
            return false;
        }

        if (this.translations[language]) {
            return true;
        }

        try {
            const sections = ['navigation', 'hero', 'about', 'roadmap', 'forms', 'footer'];
            this.translations[language] = {};

            await Promise.all(sections.map(async (section) => {
                try {
                    const response = await fetch(`locales/${language}/${section}.json`);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    const data = await response.json();
                    this.translations[language][section] = data;
                } catch (err) {
                    console.warn(`Failed to load ${section} for ${language}, using fallback`);
                    if (language !== this.defaultLanguage && 
                        this.translations[this.defaultLanguage]?.[section]) {
                        this.translations[language][section] = 
                            this.translations[this.defaultLanguage][section];
                    }
                }
            }));

            return true;
        } catch (error) {
            console.error(`Failed to load translations for ${language}:`, error);
            return false;
        }
    }

    translate(key) {
        if (!key) return '';

        // Check cache first
        const cacheKey = `${this.currentLanguage}:${key}`;
        if (this.translationCache.has(cacheKey)) {
            return this.translationCache.get(cacheKey);
        }

        const [section, translationKey] = key.split('.');
        let result = key;

        // Try current language
        if (this.translations[this.currentLanguage]?.[section]?.[translationKey]) {
            result = this.translations[this.currentLanguage][section][translationKey];
        }
        // Fallback to default language
        else if (this.translations[this.defaultLanguage]?.[section]?.[translationKey]) {
            result = this.translations[this.defaultLanguage][section][translationKey];
        }

        // Cache the result
        this.translationCache.set(cacheKey, result);
        return result;
    }

    updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (element.textContent !== translation) {
                element.textContent = translation;
            }
        });

        // Update meta tags
        document.querySelectorAll('meta[data-i18n]').forEach(meta => {
            const key = meta.getAttribute('data-i18n');
            const translation = this.translate(key);
            meta.setAttribute('content', translation);
        });

        // Update title if it has translation
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const key = titleElement.getAttribute('data-i18n');
            document.title = this.translate(key);
        }
    }

    setupLanguageSwitcher() {
        const switcher = document.querySelector('.header__language-switcher');
        if (!switcher) return;

        const langData = {
            'de': { name: 'Deutsch', flag: '🇩🇪' },
            'en': { name: 'English', flag: '🇺🇸' },
            'fr': { name: 'Français', flag: '🇫🇷' },
            'es': { name: 'Español', flag: '🇪🇸' }
        };

        const currentLang = this.currentLanguage;
        
        switcher.innerHTML = `
            <div class="language-dropdown">
                <button class="language-button" id="languageButton">
                    <span class="language-flag">${langData[currentLang].flag}</span>
                    <span class="language-name">${langData[currentLang].name}</span>
                    <span class="language-arrow">▼</span>
                </button>
                <div class="language-menu" id="languageMenu">
                    ${Object.entries(langData)
                        .filter(([code]) => this.supportedLanguages.includes(code))
                        .map(([code, lang]) => `
                            <button class="language-option ${code === currentLang ? 'active' : ''}" 
                                    data-lang="${code}">
                                <span class="language-flag">${lang.flag}</span>
                                ${lang.name}
                            </button>
                        `).join('')}
                </div>
            </div>
        `;

        const button = switcher.querySelector('#languageButton');
        const menu = switcher.querySelector('#languageMenu');

        button?.addEventListener('click', (e) => {
            e.preventDefault();
            menu?.classList.toggle('show');
        });

        menu?.addEventListener('click', async (e) => {
            const option = e.target.closest('.language-option');
            if (option) {
                const lang = option.getAttribute('data-lang');
                await this.changeLanguage(lang);
                menu.classList.remove('show');
            }
        });

        document.addEventListener('click', (e) => {
            if (!button?.contains(e.target) && !menu?.contains(e.target)) {
                menu?.classList.remove('show');
            }
        });
    }

    setupMutationObserver() {
        if (this.observer) {
            this.observer.disconnect();
        }

        this.observer = new MutationObserver((mutations) => {
            let needsUpdate = false;
            
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    const hasI18nElements = [...mutation.addedNodes]
                        .filter(node => node.nodeType === 1)
                        .some(element => {
                            return element.hasAttribute?.('data-i18n') ||
                                   element.querySelector?.('[data-i18n]');
                        });
                    
                    if (hasI18nElements) {
                        needsUpdate = true;
                        break;
                    }
                }
            }
            
            if (needsUpdate) {
                this.updateContent();
            }
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    async changeLanguage(newLang) {
        if (!this.supportedLanguages.includes(newLang)) return false;
        
        const oldLang = this.currentLanguage;
        this.currentLanguage = newLang;
        
        // Cache leeren
        this.translationCache.clear();
        
        // Sprache speichern
        localStorage.setItem('glocalspirit-language', newLang);
        
        // URL aktualisieren
        const url = new URL(window.location);
        url.searchParams.set('lang', newLang);
        window.history.replaceState({}, '', url);
        
        // Übersetzungen laden wenn nötig
        if (!this.translations[newLang]) {
            await this.loadTranslations(newLang);
        }
        
        // Inhalt aktualisieren
        this.updateContent();
        this.setupLanguageSwitcher();
        
        // HTML lang Attribut setzen
        document.documentElement.lang = newLang;
        
        // Event auslösen
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { oldLang, newLang }
        }));
        
        return true;
    }

    async init() {
        if (this.initialized) return;
        if (this.isLoading) return this.loadingPromise;

        // FOUC verhindern
        document.documentElement.style.visibility = 'hidden';
        
        this.isLoading = true;
        this.loadingPromise = (async () => {
            try {
                // Sprache erkennen
                const urlParams = new URLSearchParams(window.location.search);
                const browserLang = navigator.language.split('-')[0];
                const langParam = urlParams.get('lang');
                const savedLang = localStorage.getItem('glocalspirit-language');

                // Priorität: URL > localStorage > Browser > Default
                this.currentLanguage = 
                    (langParam && this.supportedLanguages.includes(langParam)) ? langParam :
                    (savedLang && this.supportedLanguages.includes(savedLang)) ? savedLang :
                    (this.supportedLanguages.includes(browserLang)) ? browserLang :
                    this.defaultLanguage;

                // Immer erst Default-Sprache laden
                await this.loadTranslations(this.defaultLanguage);
                
                // Dann aktuelle Sprache wenn anders
                if (this.currentLanguage !== this.defaultLanguage) {
                    await this.loadTranslations(this.currentLanguage);
                }

                // Inhalt aktualisieren
                this.updateContent();
                this.setupLanguageSwitcher();
                this.setupMutationObserver();
                
                document.documentElement.lang = this.currentLanguage;
                
                // Seite wieder anzeigen
                document.documentElement.style.visibility = '';
                
                this.initialized = true;
                
                // Init-Event auslösen
                window.dispatchEvent(new CustomEvent('i18nInitialized'));
            } finally {
                this.isLoading = false;
                this.loadingPromise = null;
            }
        })();

        return this.loadingPromise;
    }
}

// Styles für Language Switcher
const i18nStyles = `
.language-dropdown {
    position: relative;
    display: inline-block;
}

.language-button {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
}

.language-button:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
}

.language-arrow {
    font-size: 10px;
    transition: transform 0.3s ease;
}

.language-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: rgba(30, 29, 64, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    min-width: 140px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.language-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.language-option {
    width: 100%;
    padding: 10px 15px;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    transition: all 0.2s ease;
}

.language-option:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.language-option.active {
    background: rgba(var(--special-cta-color), 0.2);
    color: white;
}

.language-flag {
    font-size: 16px;
}

/* Safari Fixes */
@supports (-webkit-appearance: none) {
    .language-button,
    .language-option {
        -webkit-appearance: none;
        appearance: none;
    }
    
    .language-menu {
        -webkit-backdrop-filter: blur(10px);
    }
}
`;

// Styles einfügen
const style = document.createElement('style');
style.textContent = i18nStyles;
document.head.appendChild(style);

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18N();
    window.i18n.init().catch(console.error);
});

// Sofort initialisieren wenn DOM bereits geladen
if (document.readyState !== 'loading') {
    window.i18n = new I18N();
    window.i18n.init().catch(console.error);
}
