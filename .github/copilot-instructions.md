# 🌍 GitHub Copilot Instructions - GlocalSpirit Landing Page

## Project Overview
GlocalSpirit is a multilingual community landing page with donation system, beta testing forms, and comprehensive i18n support. The project uses vanilla JavaScript, GSAP animations, PayPal/Stripe payment integration, and PHP backend.

## 📁 Project Structure & Architecture

### Core Technologies
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Animations**: GSAP 3.13+ (ScrollTrigger, MotionPath, ScrollSmoother)
- **Payments**: PayPal SDK + Stripe Checkout (dual payment system)
- **Backend**: PHP 8+ with Teams webhook integration
- **i18n**: Custom JavaScript i18n system with JSON translations
- **Deployment**: Static hosting with PHP backend support

### File Organization
```
docs/                           # Web root directory
├── index.html                  # Main landing page
├── spendenformular.html        # Donation subscription page  
├── testformular.html           # Beta testing signup page
├── spenden-success.html        # Payment success page
├── config.php                  # PHP backend configuration
├── submit_spenden.php          # Stripe payment processing
├── submit_testuser.php         # Beta signup processing
├── JS_Files/                   # JavaScript modules
│   ├── i18n.js                 # Internationalization system
│   ├── app.js                  # Main application logic
│   ├── navigation.js           # Navigation & smooth scrolling
│   ├── animations.js           # GSAP animation definitions
│   ├── form-validation.js      # Form validation logic
│   ├── form-backend.js         # PHP backend integration
│   ├── paypal-integration.js   # PayPal payment handling
│   └── spenden-validation.js   # Donation form validation
├── Styles/                     # CSS stylesheets
│   ├── style.css               # Main stylesheet
│   ├── spendenformular.css     # Donation page styles
│   ├── testformular.css        # Beta form styles
│   ├── safari-fixes.css        # Safari-specific fixes
│   └── utilities.css           # Reusable utility classes
└── locales/                    # i18n translation files
    ├── de/                     # German translations
    ├── en/                     # English translations  
    ├── fr/                     # French translations
    └── es/                     # Spanish translations
```

## 🌐 Internationalization (i18n) System

### Translation Architecture
The project uses a **custom i18n system** with these key components:

#### Translation File Structure
```javascript
// locales/{lang}/{section}.json
{
  "navigation": { "home": "Home", "about": "About" },
  "hero": { "title": "glocalSpirit", "subtitle": "..." },
  "forms": { 
    "donationform.packages.support.title": "SUPPORT",
    "testform.labels.email": "E-mail"
  }
}
```

#### Key Implementation Details
- **Flat key structure**: Use dot notation (`donationform.packages.support.title`)
- **Automatic fallback**: German (`de`) is the default fallback language
- **FOUC prevention**: Content hidden during translation loading
- **Dynamic loading**: Translations loaded asynchronously per page

#### HTML Usage Patterns
```html
<!-- Standard text translation -->
<h1 data-i18n="hero.title">glocalSpirit</h1>

<!-- HTML content translation -->
<p data-i18n-html="about.description">...</p>

<!-- Meta tag translation -->
<title data-i18n="page.title">GlocalSpirit</title>
```

#### JavaScript Integration
```javascript
// Initialize i18n system
window.i18n = new I18N();
await window.i18n.init();

// Get translation
const translation = window.i18n.translate('navigation.home');

// Change language
await window.i18n.changeLanguage('en');
```

### Supported Languages
- **de** (German) - Default language
- **en** (English) - Primary international language
- **fr** (French) - Secondary European language  
- **es** (Spanish) - Secondary international language

## 💳 Payment System Architecture

### Dual Payment Integration
The project supports **two payment systems**:

#### PayPal Integration
```javascript
// One-time payments (current implementation)
paypal.Buttons({
  createOrder: (data, actions) => actions.order.create({
    purchase_units: [{
      amount: { value: '22.00', currency_code: 'EUR' },
      description: 'glocalSpirit Early Bird Support'
    }]
  }),
  onApprove: (data, actions) => actions.order.capture()
}).render('#paypal-container');
```

#### Stripe Integration
```php
// PHP backend: submit_spenden.php
$session = \Stripe\Checkout\Session::create([
  'payment_method_types' => ['card', 'sepa_debit'],
  'mode' => 'subscription',
  'line_items' => [['price' => $priceId, 'quantity' => 1]],
  'success_url' => $successUrl,
  'cancel_url' => $cancelUrl
]);
```

### Payment Package Structure
```javascript
const packages = {
  earlybird: { amount: '22.00', priceId: 'price_1RagqmPQ7hNB5R7goFBX14jJ' },
  premium: { amount: '44.00', priceId: 'price_1RanvQPQ7hNB5R7gOSpGuoMt' },
  business: { amount: '55.00', priceId: 'price_1Ranw8PQ7hNB5R7ghbOlhEka' }
};
```

## 🎨 Animation System (GSAP)

### Core Animation Principles
- **Performance first**: Optimized for Safari and mobile devices
- **Smooth scrolling**: Custom scroll behavior with ScrollSmoother
- **Staggered animations**: Timeline-based element reveals
- **Responsive animations**: Adaptive to screen sizes

### Animation Implementation Patterns
```javascript
// Timeline-based animations
const tl = gsap.timeline();
tl.from('.hero__title', { opacity: 0, y: 50, duration: 1 })
  .from('.hero__subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5');

// ScrollTrigger integration
gsap.registerPlugin(ScrollTrigger);
gsap.from('.about__item', {
  scrollTrigger: '.about__wrapper',
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 1
});
```

### Safari-Specific Optimizations
- **Memory management**: Selective hardware acceleration
- **Composite layers**: Limited use of `transform3d()`
- **Scroll performance**: Optimized scroll listeners

## 📝 Form System Architecture

### Form Validation Pipeline
1. **Client-side validation** (form-validation.js)
2. **Backend integration** (form-backend.js)  
3. **PHP processing** (submit_testuser.php)
4. **Teams notification** (webhook integration)

### Form Implementation Pattern
```javascript
class FormBackend {
  async submitForm(formData) {
    // Validate input
    this.validateFormData(formData);
    
    // Send to PHP backend
    const response = await fetch(this.backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    return response.json();
  }
}
```

### Error Handling Strategy
- **Progressive enhancement**: Fallback to simulation in development
- **User-friendly messages**: Translated error messages
- **Retry logic**: Automatic retry for network failures
- **Logging**: Comprehensive error logging for debugging

## 🔧 Development Guidelines

### Code Style & Standards
```javascript
// Use modern ES6+ features
const { name, email } = formData;
const translation = await i18n.translate(key);

// Prefer async/await over promises
async function loadTranslations(language) {
  try {
    const response = await fetch(`locales/${language}/forms.json`);
    return await response.json();
  } catch (error) {
    console.error('Translation loading failed:', error);
    throw error;
  }
}

// Use descriptive function names
function setupLanguageSwitcher() { /* ... */ }
function validateEmailFormat(email) { /* ... */ }
```

### File Naming Conventions
- **Kebab-case**: `spenden-validation.js`, `form-backend.js`
- **Descriptive names**: `paypal-integration.js`, `safari-fixes.css`
- **Component grouping**: `form-*`, `paypal-*`, `spenden-*`

### CSS Architecture
```css
/* Utility-first approach */
.glassmorphism { /* reusable glass effect */ }
.container-centered { /* reusable centering */ }

/* Component-based structure */
.package-card { /* donation package styling */ }
.language-switcher { /* i18n component */ }

/* Safari-specific fixes in separate file */
/* safari-fixes.css */
```

## 🚀 Deployment & Configuration

### Environment Setup
```php
// config.php - Environment-specific settings
define('TEAMS_WEBHOOK_URL', getenv('TEAMS_WEBHOOK_URL'));
define('STRIPE_SECRET_KEY', getenv('STRIPE_SECRET_KEY'));
define('SMTP_HOST', getenv('SMTP_HOST'));
```

### Server Requirements
- **PHP 8.0+** with JSON, cURL extensions
- **Static file hosting** for HTML/CSS/JS
- **SSL certificate** for payment processing
- **Environment variables** for sensitive data

## 🐛 Debugging & Testing

### Debug Tools Available
- **debug-i18n.html**: Translation key testing
- **paypal-debug.html**: PayPal integration testing  
- **paypal-live-test.html**: Live payment testing
- **Console logging**: Comprehensive error tracking

### Testing Approach
```javascript
// Development mode detection
const isDevelopment = window.location.hostname === 'localhost';
if (isDevelopment) {
  console.log('Development mode active');
  window.debugValidation = debugValidation;
}

// Fallback mechanisms
try {
  await submitToBackend(data);
} catch (error) {
  if (isDevelopment) {
    return simulateSuccess(data);
  }
  throw error;
}
```

## ⚡ Performance Optimization

### Loading Strategy
- **Critical CSS**: Inline essential styles
- **Lazy loading**: Non-critical JavaScript modules
- **Preload**: Important assets (fonts, images)
- **FOUC prevention**: Hide content during initialization

### Memory Management
```javascript
// Clean up observers and listeners
setupMutationObserver() {
  if (this.observer) {
    this.observer.disconnect();
  }
  // ... setup new observer
}

// Cache translations for performance
this.translationCache = new Map();
```

## 🔐 Security Considerations

### Input Validation
```php
// PHP backend validation
function validateInput($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
```

### Payment Security
- **Server-side validation**: All payment data validated on backend
- **Environment variables**: Sensitive keys not in code
- **HTTPS only**: All payment processing over SSL
- **CORS headers**: Properly configured cross-origin requests

## 📚 Common Tasks & Patterns

### Adding New Translation
1. Update JSON files in `locales/{lang}/{section}.json`
2. Use flat key structure: `section.subsection.key`
3. Add `data-i18n="key"` to HTML elements
4. Test with debug-i18n.html

### Creating New Form
1. Create HTML with `data-i18n` attributes
2. Add form validation in `form-validation.js`
3. Extend `FormBackend` for submission logic
4. Add PHP backend processing
5. Update `config.php` for notifications

### Payment Integration
1. Add package to `packages` object
2. Create Stripe Price ID in dashboard
3. Update `submit_spenden.php` with new price mapping
4. Add PayPal button container
5. Test with debug tools

### Safari Optimization
1. Check `safari-fixes.css` for existing patterns
2. Avoid global hardware acceleration
3. Test on actual Safari devices
4. Use development tools for memory profiling

## 🎯 AI Assistant Guidelines

When working on this project:

1. **Preserve i18n**: Always maintain translation key structure
2. **Follow naming conventions**: Use established file and function naming
3. **Validate payments**: Ensure security in payment processing
4. **Test Safari compatibility**: Consider Safari-specific requirements
5. **Maintain backward compatibility**: Don't break existing functionality
6. **Document changes**: Update relevant markdown files
7. **Use utility classes**: Leverage existing CSS utilities
8. **Handle errors gracefully**: Implement proper fallback mechanisms

## 🔄 Migration & Refactoring Notes

### Planned Improvements
- **Modular i18n system**: Break down large i18n.js file
- **Webpack bundling**: Optimize JavaScript delivery
- **Component architecture**: Move toward reusable components
- **Testing framework**: Add automated testing
- **CDN integration**: Optimize asset delivery

### Legacy Code Handling
- **Backup files**: Keep `*_backup.js` versions during refactoring
- **Gradual migration**: Replace components incrementally  
- **Feature flags**: Use environment detection for new features
- **Documentation**: Update this file with architectural changes

---

*This document serves as the comprehensive guide for AI assistants working on the GlocalSpirit project. Always refer to the actual codebase for the most current implementation details.*
