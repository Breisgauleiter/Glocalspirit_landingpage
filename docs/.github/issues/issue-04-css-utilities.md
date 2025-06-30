# 🎨 [HIGH] CSS-Utilities implementieren

## 📋 Issue Summary
Eliminate CSS code duplication by implementing utility classes for common patterns like glassmorphism and responsive breakpoints.

## 🎯 Problem
- `backdrop-filter: blur()` repeated 21+ times across different files
- Inconsistent breakpoints: 700px, 768px, 800px, 1200px, 1400px
- Glassmorphism effects copy-pasted everywhere
- No standardized utility classes

## ✅ Solution
- ✅ **Already Created:** `utilities.css` with standardized utility classes
- Replace all duplicate CSS with utility classes
- Standardize responsive breakpoints

## 📝 Tasks
- [ ] **Import utilities.css in all pages:**
  - Add `<link rel="stylesheet" href="Styles/utilities.css">` to all HTML files
- [ ] **Replace glassmorphism duplicates:**
  - Find all `backdrop-filter: blur()` instances
  - Replace with `.glassmorphism`, `.glassmorphism--light`, `.glassmorphism--strong`
- [ ] **Standardize responsive breakpoints:**
  - Replace custom media queries with utility classes
  - Use: `--breakpoint-xs: 480px`, `--breakpoint-sm: 768px`, `--breakpoint-md: 1024px`
- [ ] **Update form styles:**
  - Use `.form-base`, `.form-group`, `.form-label` classes
  - Replace custom form CSS with utilities
- [ ] **Button standardization:**
  - Use `.btn-base`, `.btn-primary`, `.btn-secondary` classes
  - Remove duplicate button styles
- [ ] **Message styling:**
  - Use `.message--success`, `.message--error`, `.message--warning`

## 🧪 Testing Checklist
- [ ] All glassmorphism effects still work
- [ ] Responsive breakpoints consistent
- [ ] Forms styled correctly
- [ ] Buttons look identical
- [ ] Messages display properly
- [ ] No broken layouts
- [ ] Safari compatibility maintained

## 💡 Success Criteria
- No duplicate glassmorphism CSS
- Consistent breakpoints everywhere
- Reusable utility classes
- Smaller CSS files
- Easier maintenance

## 🏷️ Labels
`high`, `refactoring`, `css`, `utilities`, `responsive`

## ⏱️ Estimated Time
3-4 hours

---
**Related:** Issue #5 (File organization), Issue #6 (Responsive optimization)
