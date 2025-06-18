#!/usr/bin/env python3
import json
import os

# Define the base directory
base_dir = "/home/orlan/landingpage/Glocalspirit_landingpage/docs/locales"

# Define supported languages
languages = ["de", "en", "fr", "es", "pt", "ru", "sv", "tr", "pl", "el"]

def update_hero_file(file_path):
    """Update a hero.json file with flat title while preserving existing structure"""
    if not os.path.exists(file_path):
        return False
        
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Add flat title if hero.title exists
    if 'hero' in data and 'title' in data['hero']:
        data['title'] = data['hero']['title']
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
    
    return False

# Update each language
for lang in languages:
    hero_file = os.path.join(base_dir, lang, "hero.json")
    if update_hero_file(hero_file):
        print(f"Updated {hero_file}")
    else:
        print(f"Skipped {hero_file} (not found or no hero.title)")

print("All hero.json files updated successfully!")
