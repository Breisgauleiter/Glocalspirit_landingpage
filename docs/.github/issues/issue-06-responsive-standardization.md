# 📱 [MEDIUM] Responsive Breakpoints standardisieren

## 📋 Issue Summary
Standardize inconsistent responsive breakpoints and implement utility-based responsive design system.

## 🎯 Problem
- Inconsistent breakpoints: 700px, 768px, 800px, 870px, 1199px, 1200px, 1400px
- Scattered media queries across multiple files
- Hard to maintain responsive behavior
- No systematic approach to breakpoints

## ✅ Solution
- ✅ **Already Created:** Standardized breakpoints in `utilities.css`
- Replace all custom breakpoints with utility classes
- Implement mobile-first responsive approach

## 📝 Tasks
- [ ] **Audit all media queries:**
  - Search for `@media` across all CSS files
  - Document current breakpoints used
- [ ] **Replace with standard breakpoints:**
  - `480px` → `--breakpoint-xs`
  - `768px` → `--breakpoint-sm`
  - `1024px` → `--breakpoint-md`
  - `1280px` → `--breakpoint-lg`
- [ ] **Update CSS files:**
  - `style.css`
  - `tablets.css`
  - `smallscreens.css`
  - `testformular.css`
  - `spendenformular.css`
  - `i18n.css`
- [ ] **Implement utility classes:**
  - Use `.sm:hidden`, `.md:block` etc.
  - Replace custom responsive CSS

## 🧪 Testing Checklist
- [ ] All breakpoints work correctly
- [ ] Mobile layout intact
- [ ] Tablet layout intact
- [ ] Desktop layout intact
- [ ] Navigation responsive
- [ ] Forms responsive
- [ ] No broken layouts at any screen size

## 💡 Success Criteria
- Consistent breakpoints everywhere
- Mobile-first approach
- Easier responsive maintenance
- Utility-based responsive design

## 🏷️ Labels
`medium`, `refactoring`, `responsive`, `css`, `mobile`

## ⏱️ Estimated Time
3-4 hours

---
**Related:** Issue #4 (CSS utilities)
