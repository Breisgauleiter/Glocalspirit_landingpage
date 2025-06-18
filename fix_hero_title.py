#!/usr/bin/env python3
import json
import os

# Define the base directory
base_dir = "/home/orlan/landingpage/Glocalspirit_landingpage/docs/locales"

# Get all language directories
languages = ['de', 'en', 'fr', 'es', 'pt', 'ru', 'sv', 'tr', 'pl', 'el']

for lang in languages:
    hero_file = os.path.join(base_dir, lang, "hero.json")
    
    if os.path.exists(hero_file):
        with open(hero_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Add the flat hero_title key
        data["hero_title"] = "glocalSpirit"
        
        # Write back to file
        with open(hero_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"Updated {hero_file}")

print("All hero.json files updated with hero_title!")
