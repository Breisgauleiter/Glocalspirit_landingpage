# 🌍 [CRITICAL] i18n-System modularisieren

## 📋 Issue Summary
Replace massive 772-line i18n file with modular, lazy-loading internationalization system.

## 🎯 Problem
- `i18n-ultra-simple.js` has 772 lines with ALL languages in one file
- 5 different i18n files: `i18n.js`, `i18n-simple.js`, `i18n-prepare.js`, `i18n-production.js`
- No lazy loading - all translations loaded upfront
- Maintenance nightmare for adding new languages/translations

## ✅ Solution
- ✅ **Already Created:** `i18n-modular.js` with namespace-based loading
- Remove old i18n files and implement modular system
- Lazy load translations by language and namespace

## 📝 Tasks
- [ ] **Remove old i18n files:**
  - `docs/JS_Files/i18n-ultra-simple.js`
  - `docs/JS_Files/i18n.js`
  - `docs/JS_Files/i18n-simple.js`
  - `docs/JS_Files/i18n-prepare.js`
  - `docs/JS_Files/i18n-production.js`
- [ ] **Create translation file structure:**
  - `docs/locales/de/common.json`
  - `docs/locales/de/forms.json`
  - `docs/locales/de/navigation.json`
  - `docs/locales/de/hero.json`
  - `docs/locales/de/about.json`
  - `docs/locales/de/roadmap.json`
  - (Same structure for en, fr, es)
- [ ] **Update HTML references:**
  - Replace `i18n-ultra-simple.js` with `i18n-modular.js`
  - Add namespace attributes: `data-i18n-ns="forms"`
- [ ] **Implement modular loading:**
  - Critical namespaces loaded first
  - Background loading for remaining
  - Fallback to embedded translations

## 🧪 Testing Checklist
- [ ] All translations still work
- [ ] Language switching functional
- [ ] Lazy loading working
- [ ] Fallback translations work
- [ ] No missing translation errors
- [ ] Performance improved (faster initial load)
- [ ] New languages easy to add

## 💡 Success Criteria
- Single modular i18n system
- Lazy loading implemented
- Easy to maintain translations
- Better performance
- Scalable for new languages

## 🏷️ Labels
`critical`, `refactoring`, `i18n`, `performance`, `code-duplication`

## ⏱️ Estimated Time
6-8 hours

---
**Related:** Issue #1 (Safari fixes), Issue #2 (Animation consolidation)
