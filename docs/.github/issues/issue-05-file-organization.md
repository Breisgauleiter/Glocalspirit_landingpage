# 📁 [MEDIUM] Dateiorganisation restrukturieren

## 📋 Issue Summary
Reorganize 22 JavaScript files into a clean, modular folder structure to improve maintainability.

## 🎯 Problem
- 22 JavaScript files in flat `/JS_Files/` directory
- No clear separation of concerns
- Hard to find specific functionality
- No distinction between core, features, and utilities

## ✅ Solution
Restructure into organized folders:
```
docs/JS_Files/
├── core/           ← Main app logic
├── features/       ← Specific features  
├── utils/          ← Reusable utilities
└── legacy/         ← Old files for reference
```

## 📝 Tasks
- [ ] **Create new folder structure:**
  - `docs/JS_Files/core/`
  - `docs/JS_Files/features/`
  - `docs/JS_Files/utils/`
  - `docs/JS_Files/legacy/`
- [ ] **Move files to appropriate folders:**
  - **Core:** `app.js`, `config.js` → `core/`
  - **Features:** `animations.js`, `navigation.js` → `features/`
  - **Utils:** `safari-fixes-unified.js`, `animation-factory.js`, `i18n-modular.js` → `utils/`
  - **Legacy:** Old files → `legacy/`
- [ ] **Update HTML script references:**
  - Update all `<script src="JS_Files/...">` paths
  - Point to new folder structure
- [ ] **Clean up legacy files:**
  - Move old, unused files to `legacy/`
  - Document what each legacy file was for

## 🧪 Testing Checklist
- [ ] All pages load without JavaScript errors
- [ ] All functionality still works
- [ ] Script paths correctly updated
- [ ] No broken references

## 💡 Success Criteria
- Clean, organized folder structure
- All scripts loading from correct paths
- Easy to find specific functionality
- Clear separation of concerns

## 🏷️ Labels
`medium`, `refactoring`, `organization`, `maintenance`

## ⏱️ Estimated Time
2-3 hours

---
**Related:** Issue #1-4 (must be completed first)
