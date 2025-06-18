#!/usr/bin/env python3
import json
import os

# Define the base directory
base_dir = "/home/orlan/landingpage/Glocalspirit_landingpage/docs/locales"

# Define translation mappings for navigation flat keys
nav_translations = {
    "de": {
        "home": "Startseite",
        "about": "Über uns", 
        "roadmap": "Roadmap",
        "contact": "Kontakt"
    },
    "en": {
        "home": "Home",
        "about": "About",
        "roadmap": "Roadmap", 
        "contact": "Contact"
    },
    "fr": {
        "home": "Accueil",
        "about": "À propos",
        "roadmap": "Feuille de route",
        "contact": "Contact"
    },
    "es": {
        "home": "Inicio",
        "about": "Acerca de",
        "roadmap": "Hoja de ruta",
        "contact": "Contacto"
    },
    "pt": {
        "home": "Início",
        "about": "Sobre nós",
        "roadmap": "Roteiro",
        "contact": "Contato"
    },
    "ru": {
        "home": "Главная",
        "about": "О нас",
        "roadmap": "Дорожная карта",
        "contact": "Контакт"
    },
    "sv": {
        "home": "Hem",
        "about": "Om oss",
        "roadmap": "Färdplan",
        "contact": "Kontakt"
    },
    "tr": {
        "home": "Ana Sayfa",
        "about": "Hakkımızda",
        "roadmap": "Yol Haritası",
        "contact": "İletişim"
    },
    "pl": {
        "home": "Strona główna",
        "about": "O nas",
        "roadmap": "Mapa drogowa",
        "contact": "Kontakt"
    },
    "el": {
        "home": "Αρχική",
        "about": "Σχετικά με εμάς",
        "roadmap": "Χάρτης πορείας",
        "contact": "Επικοινωνία"
    }
}

# Update each language
for lang, translations in nav_translations.items():
    nav_file = os.path.join(base_dir, lang, "navigation.json")
    
    if os.path.exists(nav_file):
        with open(nav_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Add flat navigation keys
        for key, value in translations.items():
            data[key] = value
        
        # Write back to file
        with open(nav_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"Updated {nav_file}")

print("All navigation.json files updated with flat keys!")
