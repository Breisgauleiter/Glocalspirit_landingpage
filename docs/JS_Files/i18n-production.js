// GlocalSpirit Internationalization System
class GlocalSpiritI18n {
    constructor() {
        // Supported languages configuration
        this.languages = {
            de: { name: 'Deutsch', flag: '🇩🇪' },
            en: { name: 'English', flag: '🇺🇸' },
            fr: { name: 'Français', flag: '🇫🇷' },
            es: { name: 'Español', flag: '🇪🇸' }
        };
        
        this.currentLanguage = 'de'; // Default language
        this.translations = {};
        this.isInitialized = false;
        this.loadingPromise = null;
    }

    // Get translation for a key
    translate(key) {
        if (!key) return '';
        
        const parts = key.split('.');
        
        // Support nested paths (e.g. sections.movement.title)
        const getValue = (obj, path) => {
            return path.reduce((acc, part) => acc?.[part], obj);
        };
        
        // Try current language
        const currentTranslation = getValue(this.translations[this.currentLanguage], parts);
        if (currentTranslation) {
            return currentTranslation;
        }
        
        // Fallback to German
        const germanTranslation = getValue(this.translations['de'], parts);
        if (germanTranslation) {
            return germanTranslation;
        }
        
        // Return key if no translation found
        return key;
    }

    // Update all translatable elements in the DOM
    updateContent() {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (element.textContent !== translation) {
                element.textContent = translation;
            }
        });
        
        // Update meta tags
        const metaTags = {
            title: document.querySelector('meta[name="i18n-title"]'),
            description: document.querySelector('meta[name="i18n-description"]')
        };
        
        if (metaTags.title) {
            const titleKey = metaTags.title.getAttribute('content');
            document.title = this.translate(titleKey);
        }
        
        if (metaTags.description) {
            const descKey = metaTags.description.getAttribute('content');
            const translation = this.translate(descKey);
            metaTags.description.setAttribute('content', translation);
        }
    }

    // Load translations for a language
    async loadTranslations(language) {
        const sections = ['navigation', 'hero', 'about', 'roadmap', 'forms', 'footer'];
        
        if (!this.translations[language]) {
            this.translations[language] = {};
        }

        try {
            await Promise.all(sections.map(async (section) => {
                try {
                    const response = await fetch(`locales/${language}/${section}.json`);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    const data = await response.json();
                    this.translations[language][section] = data;
                } catch (error) {
                    console.warn(`Could not load ${section} for ${language}, using fallback`);
                    // Use German as fallback
                    if (language !== 'de' && this.translations['de']?.[section]) {
                        this.translations[language][section] = this.translations['de'][section];
                    }
                }
            }));
            return true;
        } catch (error) {
            console.error(`Failed to load translations for ${language}:`, error);
            return false;
        }
    }

    // Set up the language switcher UI
    setupLanguageSwitcher() {
        const switcher = document.querySelector('.header__language-switcher');
        if (!switcher) return;

        // Create language switcher HTML
        const currentLang = this.languages[this.currentLanguage];
        
        switcher.innerHTML = `
            <div class="language-dropdown">
                <button class="language-button" id="languageButton">
                    <span class="language-flag">${currentLang.flag}</span>
                    <span class="language-name">${currentLang.name}</span>
                    <span class="language-arrow">▼</span>
                </button>
                <div class="language-menu" id="languageMenu">
                    ${Object.entries(this.languages).map(([code, lang]) => `
                        <button class="language-option ${code === this.currentLanguage ? 'active' : ''}" 
                                data-lang="${code}">
                            <span class="language-flag">${lang.flag}</span>
                            ${lang.name}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Add event listeners
        const button = switcher.querySelector('#languageButton');
        const menu = switcher.querySelector('#languageMenu');
        
        if (button && menu) {
            // Toggle menu
            button.addEventListener('click', (e) => {
                e.preventDefault();
                menu.classList.toggle('show');
            });

            // Handle language selection
            menu.addEventListener('click', (e) => {
                if (e.target.closest('.language-option')) {
                    const lang = e.target.closest('.language-option').getAttribute('data-lang');
                    this.changeLanguage(lang);
                    menu.classList.remove('show');
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!button.contains(e.target) && !menu.contains(e.target)) {
                    menu.classList.remove('show');
                }
            });
        }
    }

    // Change the current language
    async changeLanguage(newLang) {
        if (!this.languages[newLang]) return false;
        
        const oldLang = this.currentLanguage;
        this.currentLanguage = newLang;
        
        // Update localStorage
        localStorage.setItem('glocalspirit-language', newLang);
        
        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('lang', newLang);
        window.history.replaceState({}, '', url);
        
        // Load translations if needed
        if (!this.translations[newLang]) {
            await this.loadTranslations(newLang);
        }
        
        // Update UI
        this.updateContent();
        this.setupLanguageSwitcher();
        
        // Update HTML lang attribute
        document.documentElement.lang = newLang;
        
        return true;
    }

    // Initialize the i18n system
    async init() {
        if (this.isInitialized) return;
        if (this.loadingPromise) return this.loadingPromise;

        // Hide content while loading
        document.documentElement.style.visibility = 'hidden';
        
        this.loadingPromise = (async () => {
            try {
                // Determine initial language
                const urlLang = new URLSearchParams(window.location.search).get('lang');
                const storedLang = localStorage.getItem('glocalspirit-language');
                const browserLang = navigator.language.split('-')[0];
                
                // Set initial language with priority: URL > localStorage > browser > default
                this.currentLanguage = 
                    (urlLang && this.languages[urlLang]) ? urlLang :
                    (storedLang && this.languages[storedLang]) ? storedLang :
                    (this.languages[browserLang]) ? browserLang : 'de';

                // Load German translations first (fallback)
                await this.loadTranslations('de');
                
                // Load current language if different from German
                if (this.currentLanguage !== 'de') {
                    await this.loadTranslations(this.currentLanguage);
                }

                // Update UI
                this.updateContent();
                this.setupLanguageSwitcher();
                
                // Set HTML lang attribute
                document.documentElement.lang = this.currentLanguage;
                
                // Set up observer for dynamic content
                this.setupContentObserver();
                
                this.isInitialized = true;
            } finally {
                // Show content after loading
                document.documentElement.style.visibility = '';
                this.loadingPromise = null;
            }
        })();

        return this.loadingPromise;
    }

    // Set up observer for dynamic content changes
    setupContentObserver() {
        const observer = new MutationObserver((mutations) => {
            let needsUpdate = false;
            
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    // Check if any added nodes need translation
                    const hasI18nNodes = [...mutation.addedNodes]
                        .filter(node => node.nodeType === 1)
                        .some(element => {
                            return element.hasAttribute?.('data-i18n') ||
                                   element.querySelector?.('[data-i18n]');
                        });
                    
                    if (hasI18nNodes) {
                        needsUpdate = true;
                        break;
                    }
                }
            }
            
            if (needsUpdate) {
                this.updateContent();
            }
        });

        // Observe the entire document for changes
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.i18n = new GlocalSpiritI18n();
        window.i18n.init();
    });
} else {
    window.i18n = new GlocalSpiritI18n();
    window.i18n.init();
}

// Add required CSS
const i18nStyles = document.createElement('style');
i18nStyles.textContent = `
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
    background: rgba(247, 247, 247, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 140px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
}

.language-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(4px);
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
    color: #333;
    font-size: 14px;
    transition: background-color 0.2s ease;
}

.language-option:hover {
    background: rgba(255, 255, 255, 0.5);
}

.language-option.active {
    background: rgba(0, 122, 255, 0.1);
    color: rgb(0, 122, 255);
}

.language-flag {
    font-size: 16px;
}

/* Safari fixes */
@supports (-webkit-appearance: none) {
    .language-button,
    .language-option {
        -webkit-appearance: none;
        appearance: none;
    }
    
    .language-menu {
        transform: translateZ(0);
    }
}
`;

document.head.appendChild(i18nStyles);
