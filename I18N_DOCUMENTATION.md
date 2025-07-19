# 🌍 GlocalSpirit Internationalization (i18n) Documentation

## Overview

The GlocalSpirit landing page features a comprehensive internationalization system supporting 4 languages:
- 🇩🇪 **German (de)** - Default language
- 🇺🇸 **English (en)** - International market
- 🇫🇷 **French (fr)** - European market
- 🇪🇸 **Spanish (es)** - Latin American market

## 🏗️ System Architecture

### Core Components

1. **i18n.js** - Main internationalization engine
2. **Translation Files** - JSON files organized by language and section
3. **HTML Attributes** - Data attributes for internationalization
4. **Language Switcher** - UI component for language selection

### File Structure

```
docs/
├── JS_Files/
│   └── i18n.js                 # Core i18n system
├── locales/
│   ├── de/                     # German translations
│   │   ├── navigation.json
│   │   ├── hero.json
│   │   ├── about.json
│   │   ├── roadmap.json
│   │   ├── forms.json
│   │   └── footer.json
│   ├── en/                     # English translations
│   │   └── [same structure]
│   ├── fr/                     # French translations
│   │   └── [same structure]
│   └── es/                     # Spanish translations
│       └── [same structure]
└── i18n-tests.html             # Test suite
└── i18n-e2e-tests.html         # End-to-end tests
```

## 🚀 Quick Start

### Basic HTML Implementation

```html
<!-- Load i18n system early -->
<script src="JS_Files/i18n.js"></script>

<!-- Prevent FOUC (Flash of Untranslated Content) -->
<script>
    document.documentElement.style.visibility = 'hidden';
    window.addEventListener('load', () => {
        if (window.i18n) {
            window.i18n.init().then(() => {
                document.documentElement.style.visibility = '';
            });
        } else {
            document.documentElement.style.visibility = '';
        }
    });
</script>

<!-- Basic text translation -->
<h1 data-i18n="hero.title">glocalSpirit</h1>

<!-- HTML content translation -->
<p data-i18n-html="hero.description">Default description...</p>

<!-- Accessibility attributes -->
<img data-i18n-alt="navigation.logo" src="logo.svg">
<button data-i18n-aria-label="navigation.menu_open">Menu</button>

<!-- Language switcher placeholder -->
<div class="header__language-switcher"></div>
```

## 📝 Translation File Format

### Standard Structure

```json
{
  "key": "Translation text",
  "nested": {
    "key": "Nested translation"
  }
}
```

### Section-Based Organization

**navigation.json**
```json
{
  "home": "Startseite",
  "about": "Über uns",
  "roadmap": "Roadmap",
  "contact": "Kontakt",
  "menu_open": "Navigation öffnen",
  "arrow_left": "Nach links",
  "logo": "glocalSpirit Logo"
}
```

**hero.json**
```json
{
  "title": "glocalSpirit",
  "description": "Platform description with <br> HTML tags..."
}
```

**about.json**
```json
{
  "sections": {
    "movement": {
      "title": "Bewegung & Flow",
      "desc": "Description text..."
    }
  }
}
```

## 🎯 HTML Attributes Reference

### Core Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-i18n` | Basic text translation | `<span data-i18n="navigation.home">Home</span>` |
| `data-i18n-html` | HTML content translation | `<div data-i18n-html="hero.description">...</div>` |
| `data-i18n-alt` | Alt attribute translation | `<img data-i18n-alt="navigation.logo">` |
| `data-i18n-aria-label` | Aria-label translation | `<button data-i18n-aria-label="navigation.menu_open">` |

### Translation Key Patterns

```
section.key              # Basic pattern
navigation.home          # Navigation items
hero.title              # Hero section
sections.movement.title  # Nested sections
footer.copyright        # Footer content
roadmap.cards.card01.title # Complex nested
```

## ⚙️ JavaScript API

### Initialization

```javascript
// Auto-initialization
window.addEventListener('load', () => {
    window.i18n.init();
});

// Manual initialization
await window.i18n.init();
```

### Language Switching

```javascript
// Change language programmatically
await window.i18n.changeLanguage('en');

// Get current language
const currentLang = window.i18n.currentLanguage;

// Check supported languages
const languages = window.i18n.supportedLanguages; // ['de', 'en', 'fr', 'es']
```

### Translation Access

```javascript
// Translate a key
const translation = window.i18n.translate('navigation.home');

// Check if translations are loaded
const isLoaded = window.i18n.translations[lang] && 
                Object.keys(window.i18n.translations[lang]).length > 0;
```

### Events

```javascript
// Listen for language changes
window.addEventListener('languageChanged', (event) => {
    console.log(`Language changed from ${event.detail.oldLang} to ${event.detail.newLang}`);
});

// Listen for initialization
window.addEventListener('i18nInitialized', () => {
    console.log('i18n system ready');
});
```

## 🎨 Language Switcher

The system automatically creates a language switcher in any element with class `header__language-switcher`:

```html
<div class="header__language-switcher"></div>
```

### Generated Structure

```html
<div class="language-dropdown">
    <button class="language-button">
        <span class="language-flag">🇩🇪</span>
        <span class="language-name">Deutsch</span>
        <span class="language-arrow">▼</span>
    </button>
    <div class="language-menu">
        <button class="language-option" data-lang="de">🇩🇪 Deutsch</button>
        <button class="language-option" data-lang="en">🇺🇸 English</button>
        <button class="language-option" data-lang="fr">🇫🇷 Français</button>
        <button class="language-option" data-lang="es">🇪🇸 Español</button>
    </div>
</div>
```

## 🔧 Adding New Languages

### 1. Create Translation Files

```bash
mkdir docs/locales/pt  # Portuguese example
```

### 2. Add All Required JSON Files

Copy the structure from existing languages:
- `navigation.json`
- `hero.json`
- `about.json`
- `roadmap.json`
- `forms.json`
- `footer.json`

### 3. Update i18n.js Configuration

```javascript
// In i18n.js constructor
this.supportedLanguages = ['de', 'en', 'fr', 'es', 'pt']; // Add 'pt'
```

### 4. Add Language to Switcher

```javascript
// In setupLanguageSwitcher method
const langData = {
    'de': { name: 'Deutsch', flag: '🇩🇪' },
    'en': { name: 'English', flag: '🇺🇸' },
    'fr': { name: 'Français', flag: '🇫🇷' },
    'es': { name: 'Español', flag: '🇪🇸' },
    'pt': { name: 'Português', flag: '🇵🇹' } // Add new language
};
```

## 📊 Testing

### Available Test Suites

1. **i18n-tests.html** - Basic functionality tests
2. **i18n-e2e-tests.html** - Comprehensive end-to-end tests

### Running Tests

```bash
# Start local server
python3 -m http.server 8000

# Open in browser
http://localhost:8000/i18n-tests.html
http://localhost:8000/i18n-e2e-tests.html
```

### Test Coverage

- ✅ Translation loading
- ✅ Language switching
- ✅ DOM updates
- ✅ URL parameter handling
- ✅ Accessibility attributes
- ✅ Content accuracy
- ✅ Error handling

## 🐛 Troubleshooting

### Common Issues

**1. Translations not loading**
```javascript
// Check if files exist and are valid JSON
fetch('locales/en/navigation.json')
    .then(response => response.json())
    .then(data => console.log(data));
```

**2. FOUC (Flash of Untranslated Content)**
```javascript
// Ensure proper initialization order
document.documentElement.style.visibility = 'hidden';
// ... load i18n ...
document.documentElement.style.visibility = '';
```

**3. Keys not found**
```javascript
// Check key format and nesting
console.log(window.i18n.translations.en); // Inspect structure
```

**4. Language switcher not appearing**
```html
<!-- Ensure container exists -->
<div class="header__language-switcher"></div>
```

### Debug Mode

```javascript
// Enable detailed logging
window.i18nDebug = true;

// Check loaded translations
console.log(window.i18n.translations);

// Test specific key
console.log(window.i18n.translate('navigation.home'));
```

## 🚀 Performance Optimization

### Best Practices

1. **Lazy Loading**: Translations are loaded only when needed
2. **Caching**: Translation cache prevents duplicate lookups
3. **Fallback**: German (default) is always loaded first
4. **FOUC Prevention**: Content hidden until translations load

### Bundle Size

- Core i18n system: ~15KB
- Translation files: ~2-5KB per language
- Total overhead: ~35-50KB for all 4 languages

## 🔄 Maintenance

### Adding New Translations

1. **Identify missing keys** using test suite
2. **Add to all language files** for consistency
3. **Update HTML** with appropriate data attributes
4. **Test across all languages**

### Translation Updates

1. **Update source language** (German) first
2. **Propagate to other languages**
3. **Validate with native speakers**
4. **Run test suite** to ensure nothing breaks

### Version Control

- Translation files are tracked in git
- Use descriptive commit messages for translation changes
- Consider translation review process for quality

## 📈 Analytics & Monitoring

### Language Usage Tracking

```javascript
// Track language changes
window.addEventListener('languageChanged', (event) => {
    // Send to analytics
    gtag('event', 'language_change', {
        'old_language': event.detail.oldLang,
        'new_language': event.detail.newLang
    });
});
```

### Error Monitoring

```javascript
// Monitor missing translations
const originalTranslate = window.i18n.translate;
window.i18n.translate = function(key) {
    const result = originalTranslate.call(this, key);
    if (result === key) {
        // Log missing translation
        console.warn(`Missing translation: ${key} for language: ${this.currentLanguage}`);
    }
    return result;
};
```

## 🎯 Future Enhancements

### Planned Features

- **Automatic translation detection** for new content
- **Translation management interface** for non-technical users
- **Context-aware translations** based on user location
- **A/B testing** for translation variants
- **Real-time translation updates** without page reload

### Advanced Integration

- **CMS integration** for dynamic content translation
- **Translation services** (Google Translate, DeepL) for initial drafts
- **Community translation** platform for crowd-sourced translations
- **SEO optimization** with translated URLs and meta tags

---

## 📞 Support

For questions about the i18n system:

1. **Check test suites** for examples and debugging
2. **Review console logs** for detailed error information
3. **Validate JSON files** using online JSON validators
4. **Test in multiple browsers** to ensure compatibility

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: GlocalSpirit Development Team