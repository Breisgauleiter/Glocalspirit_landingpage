// Ultra-simple i18n for GlocalSpirit - Production Version (No Debug Output)
class UltraSimpleI18n {
    constructor() {
        this.currentLanguage = 'de';
        this.translations = {
            'de': {
                // Navigation
                'home': 'Startseite',
                'about': 'Über uns',
                'roadmap': 'Roadmap',
                'contact': 'Kontakt',
                'beta_test': 'Testen',
                'back': '← Zurück',
                
                // Test Form
                'testform_title': 'Beta Test Anmeldung',
                'testform_subtitle': 'Seien Sie dabei, wenn glocalSpirit erwacht',
                'testform_name_label': 'Name *',
                'testform_email_label': 'E-Mail *',
                'testform_newsletter': 'Updates per Mail erhalten?',
                'testform_submit': 'SENDEN',
                'testform_sending': 'WIRD GESENDET...',
                'testform_success_message': 'Vielen Dank für deine Anmeldung als Beta-Tester. Wir werden uns bald bei dir melden!',
                'form_success': 'Erfolgreich angemeldet!',
                'form_error': 'Fehler bei der Anmeldung',
                'form_error_message': 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.',
                
                // Hero Section
                'hero_title': 'glocalSpirit',
                'hero_description': 'GlocalSpirit ist eine Plattform für Bewusstseinsbildung und Vernetzung, die lokale und globale Gemeinschaften verbindet.',
            },
            'en': {
                // Navigation
                'home': 'Home',
                'about': 'About',
                'roadmap': 'Roadmap',
                'contact': 'Contact',
                'beta_test': 'Test',
                'back': '← Back',
                
                // Test Form
                'testform_title': 'Beta Test Registration',
                'testform_subtitle': 'Be there when glocalSpirit awakens',
                'testform_name_label': 'Name *',
                'testform_email_label': 'Email *',
                'testform_newsletter': 'Receive updates via email?',
                'testform_submit': 'SEND',
                'testform_sending': 'SENDING...',
                'testform_success_message': 'Thank you for registering as a beta tester. We will get in touch soon!',
                'form_success': 'Successfully registered!',
                'form_error': 'Registration error',
                'form_error_message': 'An error occurred. Please try again.',
                
                // Hero Section
                'hero_title': 'glocalSpirit',
                'hero_description': 'GlocalSpirit is a platform for consciousness building and networking that connects local and global communities.',
            },
            'fr': {
                // Navigation
                'home': 'Accueil',
                'about': 'À propos',
                'roadmap': 'Feuille de route',
                'contact': 'Contact',
                'beta_test': 'Tester',
                'back': '← Retour',
                
                // Test Form
                'testform_title': 'Inscription au test bêta',
                'testform_subtitle': 'Soyez là quand glocalSpirit s\'éveille',
                'testform_name_label': 'Nom *',
                'testform_email_label': 'E-mail *',
                'testform_newsletter': 'Recevoir des mises à jour par e-mail ?',
                'testform_submit': 'ENVOYER',
                'testform_sending': 'ENVOI EN COURS...',
                'testform_success_message': 'Merci de vous être inscrit comme testeur bêta. Nous vous contacterons bientôt !',
                'form_success': 'Inscription réussie !',
                'form_error': 'Erreur d\'inscription',
                'form_error_message': 'Une erreur s\'est produite. Veuillez réessayer.',
                
                // Hero Section
                'hero_title': 'glocalSpirit',
                'hero_description': 'GlocalSpirit est une plateforme de sensibilisation et de mise en réseau qui connecte les communautés locales et mondiales.',
            },
            'es': {
                // Navigation
                'home': 'Inicio',
                'about': 'Acerca de',
                'roadmap': 'Hoja de ruta',
                'contact': 'Contacto',
                'beta_test': 'Probar',
                'back': '← Atrás',
                
                // Test Form
                'testform_title': 'Registro de prueba beta',
                'testform_subtitle': 'Esté ahí cuando glocalSpirit despierte',
                'testform_name_label': 'Nombre *',
                'testform_email_label': 'Correo electrónico *',
                'testform_newsletter': '¿Recibir actualizaciones por correo electrónico?',
                'testform_submit': 'ENVIAR',
                'testform_sending': 'ENVIANDO...',
                'testform_success_message': '¡Gracias por registrarte como probador beta. Nos pondremos en contacto pronto!',
                'form_success': '¡Registro exitoso!',
                'form_error': 'Error de registro',
                'form_error_message': 'Se produjo un error. Por favor, inténtalo de nuevo.',
                
                // Hero Section
                'hero_title': 'glocalSpirit',
                'hero_description': 'GlocalSpirit es una plataforma de construcción de conciencia y redes que conecta comunidades locales y globales.',
            }
        };
        
        this.supportedLanguages = ['de', 'en', 'fr', 'es']; // Andere Sprachen temporär deaktiviert
        this.init();
    }

    async init() {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.supportedLanguages.includes(browserLang)) {
            this.currentLanguage = browserLang;
        }
        
        // Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && this.supportedLanguages.includes(langParam)) {
            this.currentLanguage = langParam;
        }
        
        // Check localStorage
        const savedLang = localStorage.getItem('glocalspirit-language');
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            this.currentLanguage = savedLang;
        }
        
        // Update content
        this.updateContent();
        
        // Setup language switcher
        this.setupLanguageSwitcher();
    }

    translate(key) {
        const translation = this.translations[this.currentLanguage]?.[key] || this.translations['de'][key] || key;
        return translation;
    }

    updateContent() {
        // Update data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (element.innerHTML !== translation) {
                element.innerHTML = translation;
            }
        });
        
        // Update meta tags
        const metaTitle = document.querySelector('meta[name="i18n-title"]');
        if (metaTitle) {
            const titleKey = metaTitle.getAttribute('content');
            const titleTranslation = this.translate(titleKey);
            document.title = titleTranslation;
        }
        
        const metaDescription = document.querySelector('meta[name="i18n-description"]');
        if (metaDescription) {
            const descKey = metaDescription.getAttribute('content');
            const descTranslation = this.translate(descKey);
            metaDescription.setAttribute('content', descTranslation);
        }
    }

    changeLanguage(newLang) {
        if (!this.supportedLanguages.includes(newLang)) {
            return false;
        }
        
        this.currentLanguage = newLang;
        localStorage.setItem('glocalspirit-language', newLang);
        
        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('lang', newLang);
        window.history.replaceState({}, '', url);
        
        // Update content
        this.updateContent();
        
        // Update language switcher
        this.updateLanguageSwitcher();
        
        return true;
    }

    setupLanguageSwitcher() {
        const languageSwitcher = document.querySelector('.header__language-switcher');
        if (!languageSwitcher) return;
        
        const supportedLanguages = [
            { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'fr', name: 'Français', flag: '🇫🇷' },
            { code: 'es', name: 'Español', flag: '🇪🇸' }
            /* Temporär deaktiviert:
            { code: 'ru', name: 'Русский', flag: '🇷🇺' },
            { code: 'pt', name: 'Português', flag: '🇵🇹' },
            { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
            { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
            { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
            { code: 'pl', name: 'Polski', flag: '🇵🇱' }
            */
        ];

        languageSwitcher.innerHTML = `
            <div class="language-dropdown">
                <button class="language-button" id="languageButton">
                    <span class="language-flag">${supportedLanguages.find(lang => lang.code === this.currentLanguage)?.flag}</span>
                    <span class="language-name">${supportedLanguages.find(lang => lang.code === this.currentLanguage)?.name}</span>
                    <span class="language-arrow">▼</span>
                </button>
                <div class="language-menu" id="languageMenu">
                    ${supportedLanguages.map(lang => `
                        <button class="language-option ${lang.code === this.currentLanguage ? 'active' : ''}" 
                                data-lang="${lang.code}">
                            <span class="language-flag">${lang.flag}</span> ${lang.name}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Add event listeners
        const languageButton = document.getElementById('languageButton');
        const languageMenu = document.getElementById('languageMenu');
        
        if (languageButton && languageMenu) {
            languageButton.addEventListener('click', (e) => {
                e.preventDefault();
                languageMenu.classList.toggle('show');
            });

            languageMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('language-option')) {
                    const selectedLang = e.target.getAttribute('data-lang');
                    this.changeLanguage(selectedLang);
                    languageMenu.classList.remove('show');
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!languageButton.contains(e.target) && !languageMenu.contains(e.target)) {
                    languageMenu.classList.remove('show');
                }
            });
        }
    }

    updateLanguageSwitcher() {
        const languageButton = document.getElementById('languageButton');
        const languageOptions = document.querySelectorAll('.language-option');
        
        if (languageButton) {
            const currentLang = this.supportedLanguages.includes(this.currentLanguage) ? this.currentLanguage : 'de';
            const langData = {
                'de': { name: 'Deutsch', flag: '🇩🇪' },
                'en': { name: 'English', flag: '🇺🇸' }
            };
            
            languageButton.innerHTML = `
                <span class="language-flag">${langData[currentLang].flag}</span>
                <span class="language-name">${langData[currentLang].name}</span>
                <span class="language-arrow">▼</span>
            `;
        }
        
        languageOptions.forEach(option => {
            option.classList.toggle('active', option.getAttribute('data-lang') === this.currentLanguage);
        });
    }
}

// Initialize i18n when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.i18n = new UltraSimpleI18n();
    });
} else {
    window.i18n = new UltraSimpleI18n();
}

// Add CSS for language switcher
const languageSwitcherCSS = `
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
    background: white;
    border: 1px solid #ddd;
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
    color: #333;
    font-size: 14px;
    transition: background-color 0.2s ease;
}

.language-option:hover {
    background: #f5f5f5;
}

.language-option.active {
    background: #007AFF;
    color: white;
}

.language-flag {
    font-size: 16px;
}

/* Safari specific fixes for language switcher */
@supports (-webkit-appearance: none) {
    .language-button, .language-option {
        -webkit-appearance: none;
        appearance: none;
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = languageSwitcherCSS;
document.head.appendChild(style);
