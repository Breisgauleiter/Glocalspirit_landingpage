# 🌍 GlocalSpirit Landingpage – Internationalisierung (i18n) & Lokalisierung (l10n)

## Überblick
Dieses Projekt ist vollständig auf Mehrsprachigkeit ausgelegt. Ziel ist es, die Landingpage für eine internationale Community zugänglich zu machen und kulturell wie sprachlich optimal anzupassen.

- **i18n (Internationalization):** Technische Vorbereitung für mehrere Sprachen
- **l10n (Localization):** Inhaltliche und kulturelle Anpassung für Zielmärkte

## Zielsprachen (Phase 1)
- Deutsch (Standard)
- Englisch
- Französisch
- Spanisch

## Technische Umsetzung

### 1. Übersetzungsstruktur
- Alle Übersetzungen liegen in `/docs/locales/<lang>/` als JSON-Dateien vor:
  - `about.json`, `forms.json`, `hero.json`, `navigation.json`, `roadmap.json`, `success.json` usw.
- Beispiel: `/docs/locales/en/navigation.json`

### 2. JavaScript-Integration
- Hauptlogik in `docs/JS_Files/i18n.js` (dynamisches Nachladen, Language Switcher, Attributersetzung)
- Ultra-simple Fallback in `i18n-ultra-simple.js` (für kleine Seiten oder Tests)
- Sprachumschaltung per Dropdown/Flaggen im Header
- Automatische Spracherkennung: URL, LocalStorage, Browser, Fallback
- Alle statischen Texte in HTML werden durch `data-i18n`-Attribute ersetzt

### 3. HTML-Templates
- Beispiel: `<h1 data-i18n="hero.title">glocalSpirit</h1>`
- Komplexe Inhalte: `data-i18n-html` für HTML-Abschnitte
- Alle Formulare, Roadmap-Karten, Footer etc. sind i18n-ready

### 4. Backend
- PHP-Backend (`config.php`, `submit_*.php`) unterstützt Sprachparameter
- E-Mail-Templates und Fehlermeldungen mehrsprachig
- Sprachinfo wird bei Form-Submits übermittelt

## Lokalisierungsprozess

1. **Content-Audit:**
   - Alle Texte werden zentral inventarisiert (siehe `I18N_L10N_PLAN.md`)
   - Tone of Voice, Markenbegriffe, kulturelle Besonderheiten dokumentiert
2. **Übersetzung:**
   - Professionelle Übersetzer oder AI + Native Speaker Review
   - Kulturelle und rechtliche Anpassungen (z.B. Datenschutz, Impressum)
3. **Testing:**
   - Cross-Language-Tests (Navigation, Formulare, Error-Handling)
   - Responsive Design für alle Sprachen
   - SEO-Checks (Meta-Tags, hreflang, Sitemaps)
4. **Deployment:**
   - Sprachspezifische URLs (`/en/`, `/fr/`, `/es/`)
   - CDN-Caching für JSON-Files
   - Monitoring auf fehlende Übersetzungen

## Erweiterung & Wartung
- Neue Sprachen können durch Kopieren der JSON-Struktur ergänzt werden
- Community-Übersetzungen und AI-gestützte Updates möglich
- Regelmäßige Reviews für kulturelle und rechtliche Konformität

## Weitere Infos
- **Detaillierter Plan:** Siehe `I18N_L10N_PLAN.md`
- **Technische Details:** Siehe `docs/JS_Files/i18n.js` und `docs/JS_Files/i18n-prepare.js`
- **Content-Inventar:** Siehe `I18N_L10N_PLAN.md` (Abschnitt Content-Audit)

---

**Letztes Update:** 17. Juni 2025
