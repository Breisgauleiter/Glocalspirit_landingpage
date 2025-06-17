// HTML i18n Preparation Script
// Automatically adds data-i18n attributes to HTML elements

function prepareHTMLForI18n() {
    // Navigation elements
    const navElements = {
        'Startseite': 'nav.home',
        'Über uns': 'nav.about', 
        'Roadmap': 'nav.roadmap',
        'Kontakt': 'nav.contact',
        'Beta Testen': 'nav.beta_test',
        '← Zurück': 'nav.back'
    };

    // About section categories
    const aboutCategories = {
        'Bewegung & Flow': { key: 'about.categories.bewegung_flow.title' },
        'Bewusstsein': { key: 'about.categories.bewusstsein.title' },
        'Gute Produkte & Ernährung': { key: 'about.categories.produkte_ernaehrung.title' },
        'Heilung & Gesundheit': { key: 'about.categories.heilung_gesundheit.title' },
        'Houses of Hope': { key: 'about.categories.house_of_hope.title' },
        'Kreativität & Ausdruck': { key: 'about.categories.kreativitaet_ausdruck.title' },
        'Lernen & Bildung': { key: 'about.categories.lernen_bildung.title' },
        'Natur & Nachhaltigkeit': { key: 'about.categories.natur_nachhaltigkeit.title' },
        'Spiritualität & Mystik': { key: 'about.categories.spiritualitaet_mystik.title' },
        'Technologie & Bewusstheit': { key: 'about.categories.technologie_bewusstsein.title' },
        'Wertschöpfung & Finanzen': { key: 'about.categories.wertschoepfung_finanzen.title' }
    };

    // Form elements
    const formElements = {
        'TESTNUTZER WERDEN': 'cta.testuser',
        'SPENDEN': 'cta.donate',
        'Testnutzer werden': 'forms.testform.title',
        'Name': 'forms.testform.labels.name',
        'E-mail': 'forms.testform.labels.email',
        'SENDEN': 'forms.testform.buttons.submit',
        'WIRD GESENDET...': 'forms.testform.buttons.sending'
    };

    // Footer elements
    const footerElements = {
        'Ein Netzwerk der Bedeutung, nicht des lärms': 'footer.tagline',
        '© 2025 GlocalSpirit. Alle Rechte vorbehalten': 'footer.copyright',
        'Datenschutz': 'footer.privacy',
        'Impressum': 'footer.imprint'
    };

    // Add data-i18n attributes to elements
    function addI18nAttributes() {
        // Process all text content
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(element => {
            const textContent = element.textContent?.trim();
            
            // Skip if element already has data-i18n
            if (element.hasAttribute('data-i18n')) return;
            
            // Skip if element has children with text content
            if (element.children.length > 0) return;
            
            // Check if text matches any of our translation keys
            let translationKey = null;
            
            // Check navigation
            if (navElements[textContent]) {
                translationKey = navElements[textContent];
            }
            // Check categories
            else if (aboutCategories[textContent]) {
                translationKey = aboutCategories[textContent].key;
            }
            // Check forms
            else if (formElements[textContent]) {
                translationKey = formElements[textContent];
            }
            // Check footer
            else if (footerElements[textContent]) {
                translationKey = footerElements[textContent];
            }
            
            if (translationKey) {
                element.setAttribute('data-i18n', translationKey);
                console.log(`Added data-i18n="${translationKey}" to element with text: "${textContent}"`);
            }
        });
    }

    // Process roadmap cards
    function processRoadmapCards() {
        const roadmapCards = document.querySelectorAll('.card');
        
        roadmapCards.forEach((card, index) => {
            const cardNumber = String(index + 1).padStart(2, '0');
            const title = card.querySelector('h3');
            const date = card.querySelector('h4');
            const description = card.querySelector('p');
            
            if (title) {
                title.setAttribute('data-i18n', `roadmap.cards.card${cardNumber}.title`);
            }
            if (date) {
                date.setAttribute('data-i18n', `roadmap.cards.card${cardNumber}.date`);
            }
            if (description) {
                description.setAttribute('data-i18n-html', `roadmap.cards.card${cardNumber}.description`);
            }
        });
    }

    // Process about item descriptions
    function processAboutDescriptions() {
        const aboutItems = document.querySelectorAll('.about__item');
        
        aboutItems.forEach(item => {
            const title = item.querySelector('.about__item-title');
            const description = item.querySelector('.about__item-description');
            
            if (title && description) {
                const titleText = title.textContent.trim();
                
                // Find matching category
                Object.entries(aboutCategories).forEach(([categoryTitle, categoryData]) => {
                    if (titleText === categoryTitle) {
                        const categoryKey = categoryData.key.replace('.title', '');
                        title.setAttribute('data-i18n', `${categoryKey}.title`);
                        description.setAttribute('data-i18n', `${categoryKey}.description`);
                    }
                });
            }
        });
    }

    // Main execution
    addI18nAttributes();
    processRoadmapCards();
    processAboutDescriptions();
    
    console.log('🌍 HTML prepared for i18n!');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prepareHTMLForI18n);
} else {
    prepareHTMLForI18n();
}

// Also export for manual execution
window.prepareHTMLForI18n = prepareHTMLForI18n;
