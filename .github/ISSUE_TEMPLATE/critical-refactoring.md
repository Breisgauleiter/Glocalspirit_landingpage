---
name: 🔥 Critical Refactoring Issue
about: Template for critical refactoring tasks
title: '[CRITICAL] '
labels: ['priority:critical', 'type:refactoring']
assignees: ''
---

## 🎯 **Objective**
<!-- Clear description of what needs to be refactored and why -->

## 🔍 **Current Problem**
<!-- Describe the current code issues (duplication, performance, maintainability) -->

**Code Duplication:** 
- [ ] Lines duplicated: X → Y (reduction target)
- [ ] Files affected: X files
- [ ] Patterns identified: List patterns

**Performance Impact:**
- [ ] Load time impact: X ms
- [ ] Bundle size impact: X KB

## ✅ **Acceptance Criteria**
<!-- Define what success looks like -->

- [ ] Code reduction achieved: X → Y lines (-Z%)
- [ ] No visual changes for users
- [ ] All existing functionality preserved
- [ ] Performance maintained or improved
- [ ] Cross-browser compatibility maintained

## 📋 **Implementation Tasks**

### Phase 1: Preparation
- [ ] Create new unified module/utility
- [ ] Implement consolidated functionality
- [ ] Add configuration options if needed

### Phase 2: Migration
- [ ] Update HTML files to use new system
- [ ] Replace old implementations
- [ ] Update imports/references

### Phase 3: Cleanup
- [ ] Move old files to `/legacy`
- [ ] Update documentation
- [ ] Remove dead code

## 📁 **Files Affected**

**To be deprecated:**
- [ ] `filename1.js` (X lines)
- [ ] `filename2.js` (Y lines)

**To be created/updated:**
- [ ] `new-unified-file.js` (Z lines)
- [ ] `existing-file.js` (update imports)

## 🧪 **Testing Checklist**

**Functionality Testing:**
- [ ] Feature X works as expected
- [ ] Feature Y works as expected
- [ ] Error handling works correctly

**Cross-browser Testing:**
- [ ] Chrome (latest)
- [ ] Firefox (latest) 
- [ ] Safari (latest)
- [ ] Edge (latest)

**Mobile Testing:**
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Responsive breakpoints

## 📈 **Success Metrics**

**Before Refactoring:**
- Lines of code: X
- File count: Y
- Bundle size: Z KB
- Performance metric: A ms

**After Refactoring:**
- Lines of code: X (-N%)
- File count: Y (-N%)
- Bundle size: Z KB (-N%)
- Performance metric: A ms (change)

## 🔗 **Dependencies**
<!-- List any other issues that need to be completed first -->

- Depends on: #issue-number
- Blocks: #issue-number

## 📝 **Additional Notes**
<!-- Any additional context, links to documentation, etc. -->

---

**Priority:** 🔥 Critical  
**Estimated Effort:** X hours  
**Milestone:** Phase N  
**Assignee:** @username
