# 🔥 [CRITICAL] Safari-Fixes konsolidieren

## 📋 Issue Summary
Eliminate duplicate Safari fix code by consolidating two nearly identical files into a unified, configuration-based solution.

## 🎯 Problem
- `safari-fixes.js` (264 lines) and `safari-fixes-production.js` (298 lines) are 95% identical
- Only difference is debug output vs production mode
- Maintenance nightmare with double the code to update

## ✅ Solution
- ✅ **Already Created:** `safari-fixes-unified.js` with configuration-based approach
- Remove old files and update all HTML references
- Single source of truth for Safari compatibility

## 📝 Tasks
- [ ] **Remove old files:**
  - `docs/JS_Files/safari-fixes.js`
  - `docs/JS_Files/safari-fixes-production.js`
- [ ] **Update HTML references in all pages:**
  - `index.html`
  - `testformular.html` 
  - `spendenformular.html`
  - `spenden-success.html`
  - `impressum.html`
  - `datenschutz.html`
- [ ] **Test configuration modes:**
  - Debug mode: `window.SAFARI_CONFIG = { enableConsoleOutput: true }`
  - Production mode: Default (no console output)
- [ ] **Cross-browser testing:**
  - Safari desktop
  - Safari mobile/iOS
  - Chrome, Firefox, Edge (ensure no regressions)

## 🧪 Testing Checklist
- [ ] All Safari-specific fixes still work
- [ ] No console errors in production
- [ ] Debug mode works when enabled
- [ ] Memory usage within limits
- [ ] Viewport height fix working on iOS
- [ ] Touch events optimized on mobile
- [ ] Input zoom prevention working

## 💡 Success Criteria
- Single unified Safari fix file
- No functionality lost
- Easier maintenance
- Clean console in production
- Debug mode available when needed

## 🏷️ Labels
`critical`, `refactoring`, `safari`, `code-duplication`

## ⏱️ Estimated Time
2-3 hours

---
**Related:** Issue #2 (Animation consolidation), Issue #3 (i18n consolidation)
