// Debug test for i18n roadmap translations
window.testRoadmapTranslations = async function() {
    console.log('=== Testing Roadmap Translations ===');
    
    // Test alle Sprachen
    for (const lang of ['de', 'en', 'fr', 'es']) {
        console.log(`\n--- Testing ${lang} ---`);
        
        // Sprache laden
        await window.i18n.loadTranslations(lang);
        
        // Zeige ALLE verfügbaren keys für diese Sprache
        const allKeys = Object.keys(window.i18n.translations[lang] || {});
        console.log(`Total keys for ${lang}:`, allKeys.length);
        
        // Zeige nur roadmap keys
        const roadmapKeys = allKeys.filter(k => k.includes('roadmap'));
        console.log(`Roadmap keys for ${lang}:`, roadmapKeys);
        
        // Teste spezielle Keys direkt
        const directValue = window.i18n.translations[lang]?.['roadmap.card01_title'];
        console.log(`Direct access roadmap.card01_title for ${lang}:`, directValue);
        
        // Teste auch den translate call
        const oldLang = window.i18n.currentLanguage;
        window.i18n.currentLanguage = lang;
        const translatedValue = window.i18n.translate('roadmap.card01_title');
        window.i18n.currentLanguage = oldLang;
        console.log(`Translated roadmap.card01_title for ${lang}:`, translatedValue);
    }
    
    console.log('\n=== Test Complete ===');
};

// Test language switching specifically
window.testLanguageSwitch = async function(targetLang) {
    console.log(`\n=== Testing Language Switch to ${targetLang} ===`);
    const oldLang = window.i18n.currentLanguage;
    console.log(`Current language: ${oldLang}`);
    
    await window.i18n.changeLanguage(targetLang);
    console.log(`New language: ${window.i18n.currentLanguage}`);
    
    // Test a roadmap key
    const testValue = window.i18n.translate('roadmap.card01_title');
    console.log(`roadmap.card01_title translates to: "${testValue}"`);
};

console.log('Debug functions loaded:');
console.log('- testRoadmapTranslations()');
console.log('- testLanguageSwitch("en")');
