#!/usr/bin/env python3
import json
import os

# Define the base directory
base_dir = "/home/orlan/landingpage/Glocalspirit_landingpage/docs/locales"

# Define translation mappings for each language
translations = {
    "fr": {
        "about_movement_title": "Mouvement & Flux",
        "about_movement_desc": "Le corps, l'esprit et l'âme se connectent par des formes de mouvement conscientes, créatives et guérissantes. Que ce soit par le yoga, la danse, le travail respiratoire ou la pratique corporelle intuitive. GlocalSpirit invite à trouver un rythme naturel et à se sentir en harmonie avec la vie à travers cela.",
        "about_consciousness_title": "Conscience", 
        "about_consciousness_desc": "La conscience ne se manifeste pas par la connaissance ou les concepts, mais par la façon d'être. Chez GlocalSpirit, il s'agit d'agir et de vivre à partir d'une attitude consciente : présent, connecté et en harmonie avec l'ensemble plus grand.",
        "about_nutrition_title": "Bons produits & Nutrition",
        "about_nutrition_desc": "GlocalSpirit représente la consommation consciente, la nutrition consciente et la nourriture pour le corps, l'esprit et l'âme. Idéalement, la qualité, la simplicité et l'authenticité des produits sont en harmonie avec \"l'humain et la nature\".",
        "about_healing_title": "Guérison & Santé",
        "about_healing_desc": "Chez GlocalSpirit, la santé englobe une approche holistique du bien-être physique, émotionnel et mental. Nous vous invitons à comprendre la guérison comme un processus naturel. Soutenu par la conscience, la communauté, la connexion à la nature et la paix intérieure.",
        "about_hope_title": "Maisons d'Espoir",
        "about_hope_desc": "Les \"Maisons d'Espoir\" sont des lieux vivants de rencontre, de guérison et de co-création. Elles servent d'espaces spirituels, sociaux et culturels où les gens peuvent se rassembler dans l'esprit de la paix intérieure et de la synarchie. Les \"Maisons d'Espoir\" sont des points d'ancrage physiques au sein du réseau GlocalSpirit.",
        "about_creativity_title": "Créativité & Expression",
        "about_creativity_desc": "GlocalSpirit offre des espaces protégés pour le développement libre, le flux créatif et l'expression authentique de soi. Ce qui pourrait avoir été vécu comme une pression de performance peut être vécu ici comme une créativité tangible, audible et ressentie.",
        "about_learning_title": "Apprentissage & Éducation",
        "about_learning_desc": "GlocalSpirit incarne une nouvelle forme d'échange de connaissances basée sur la résonance, l'auto-développement et la cohérence intérieure. Au-delà de la pression, de l'évaluation ou des programmes fixes.",
        "about_nature_title": "Nature & Durabilité",
        "about_nature_desc": "GlocalSpirit nous rappelle notre connexion originelle à la terre. Il nous invite à vivre en harmonie avec les cycles naturels, à utiliser les ressources de manière consciente et à créer des modes de vie régénératifs.",
        "about_spirituality_title": "Spiritualité & Mysticisme",
        "about_spirituality_desc": "Ici, les traditions de sagesse, les symboles intemporels et les formes modernes d'éveil spirituel se rencontrent. Cette catégorie offre un espace pour l'indicible. Que ce soit pour le silence derrière les mots, la profondeur au-delà de la pensée ou le mystère universel qui imprègne tout.",
        "about_technology_title": "Technologie & Conscience",
        "about_technology_desc": "GlocalSpirit connecte l'apparemment incompatible : l'intelligence numérique et la profondeur spirituelle. La technologie ne doit pas être \"déshumanisée\". Grâce à une conception consciente, les éléments techniques peuvent devenir des outils pour la paix, la connexion et le développement intérieur.",
        "beta_test": "Tester",
        "spenden": "Faire un don",
        "donation_success_title": "Merci pour votre soutien !",
        "donation_success_msg": "Votre abonnement a été activé avec succès. Vous recevrez bientôt un e-mail de confirmation de notre part.",
        "donation_success_next": "Que se passe-t-il ensuite ?",
        "donation_success_email": "📧 Vous recevrez un e-mail de bienvenue avec tous les détails",
        "donation_success_help": "🎉 Votre contribution nous aide à promouvoir la mise en réseau consciente",
        "donation_success_together": "🌱 Ensemble, nous créons un avenir plus conscient",
        "donation_success_info": "💫 Vous serez informé des nouvelles fonctionnalités et événements",
        "testform_title": "Devenir testeur bêta",
        "form_success": "Inscription réussie !",
        "testform_success_message": "Merci de vous être inscrit comme testeur bêta. Nous vous contacterons bientôt !",
        "form_error": "Erreur d'inscription",
        "form_error_message": "Une erreur s'est produite. Veuillez réessayer.",
        "testform_name_label": "Nom *",
        "testform_email_label": "E-mail *",
        "testform_newsletter": "Recevoir des mises à jour par e-mail ?",
        "testform_submit": "ENVOYER",
        "testform_sending": "ENVOI EN COURS...",
        "donation_title": "Soutenir glocalSpirit - Forfaits d'abonnement"
    },
    "es": {
        "about_movement_title": "Movimiento & Flujo",
        "about_movement_desc": "El cuerpo, la mente y el alma se conectan a través de formas conscientes, creativas y sanadoras de movimiento. Ya sea a través del yoga, la danza, el trabajo respiratorio o la práctica corporal intuitiva. GlocalSpirit invita a encontrar un ritmo natural y sentirse en armonía con la vida a través de ello.",
        "about_consciousness_title": "Conciencia",
        "about_consciousness_desc": "La conciencia no se muestra a través del conocimiento o conceptos, sino a través de la forma de ser. En GlocalSpirit, se trata de actuar y vivir desde una actitud consciente: presente, conectado y en armonía con el todo mayor.",
        "about_nutrition_title": "Buenos productos & Nutrición",
        "about_nutrition_desc": "GlocalSpirit representa el consumo consciente, la nutrición consciente y el alimento para el cuerpo, la mente y el alma. Idealmente, la calidad, simplicidad y autenticidad de los productos están en armonía con \"humano y naturaleza\".",
        "about_healing_title": "Sanación & Salud",
        "about_healing_desc": "En GlocalSpirit, la salud abarca un enfoque holístico del bienestar físico, emocional y mental. Te invitamos a entender la sanación como un proceso natural. Apoyado por la conciencia, la comunidad, la conexión con la naturaleza y la paz interior.",
        "about_hope_title": "Casas de Esperanza",
        "about_hope_desc": "Las \"Casas de Esperanza\" son lugares vivos de encuentro, sanación y co-creación. Sirven como espacios espirituales, sociales y culturales donde las personas pueden reunirse en el espíritu de la paz interior y la sinarquía. Las \"Casas de Esperanza\" son puntos de anclaje físicos dentro de la red GlocalSpirit.",
        "about_creativity_title": "Creatividad & Expresión",
        "about_creativity_desc": "GlocalSpirit ofrece espacios protegidos para el desarrollo libre, el flujo creativo y la autoexpresión auténtica. Lo que podría haber sido experimentado como presión de rendimiento puede ser experimentado aquí como creatividad tangible, audible y sentible.",
        "about_learning_title": "Aprendizaje & Educación", 
        "about_learning_desc": "GlocalSpirit encarna una nueva forma de intercambio de conocimientos basada en la resonancia, el autodesarrollo y la coherencia interior. Más allá de la presión, la evaluación o los planes de estudio fijos.",
        "about_nature_title": "Naturaleza & Sostenibilidad",
        "about_nature_desc": "GlocalSpirit nos recuerda nuestra conexión original con la tierra. Nos invita a vivir en armonía con los ciclos naturales, usar los recursos conscientemente y crear formas de vida regenerativas.",
        "about_spirituality_title": "Espiritualidad & Misticismo",
        "about_spirituality_desc": "Aquí se encuentran las tradiciones de sabiduría, los símbolos atemporales y las formas modernas de despertar espiritual. Esta categoría ofrece espacio para lo indecible. Ya sea para el silencio detrás de las palabras, la profundidad más allá del pensamiento o el misterio universal que lo impregna todo.",
        "about_technology_title": "Tecnología & Conciencia",
        "about_technology_desc": "GlocalSpirit conecta lo aparentemente incompatible: inteligencia digital y profundidad espiritual. La tecnología no tiene que ser \"deshumanizada\". A través del diseño consciente, los elementos técnicos pueden convertirse en herramientas para la paz, la conexión y el desarrollo interior.",
        "beta_test": "Probar",
        "spenden": "Donar",
        "donation_success_title": "¡Gracias por su apoyo!",
        "donation_success_msg": "Su suscripción ha sido activada exitosamente. Recibirá un correo de confirmación de nosotros en breve.",
        "donation_success_next": "¿Qué sigue?",
        "donation_success_email": "📧 Recibirá un correo de bienvenida con todos los detalles",
        "donation_success_help": "🎉 Su contribución nos ayuda a promover la conexión consciente",
        "donation_success_together": "🌱 Juntos creamos un futuro más consciente",
        "donation_success_info": "💫 Será informado sobre nuevas características y eventos",
        "testform_title": "Convertirse en probador beta",
        "form_success": "¡Registro exitoso!",
        "testform_success_message": "Gracias por registrarte como probador beta. ¡Nos pondremos en contacto contigo pronto!",
        "form_error": "Error de registro",
        "form_error_message": "Ocurrió un error. Por favor inténtalo de nuevo.",
        "testform_name_label": "Nombre *",
        "testform_email_label": "Correo electrónico *",
        "testform_newsletter": "¿Recibir actualizaciones por correo?",
        "testform_submit": "ENVIAR",
        "testform_sending": "ENVIANDO...",
        "donation_title": "Apoyar glocalSpirit - Paquetes de suscripción"
    }
}

def update_file(file_path, flat_translations, existing_data):
    """Update a JSON file with flat translations while preserving existing structure"""
    # Add flat translations to existing data
    for key, value in flat_translations.items():
        existing_data[key] = value
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(existing_data, f, ensure_ascii=False, indent=2)

# Update each language
for lang, flat_trans in translations.items():
    lang_dir = os.path.join(base_dir, lang)
    
    # Update about.json
    about_file = os.path.join(lang_dir, "about.json")
    if os.path.exists(about_file):
        with open(about_file, 'r', encoding='utf-8') as f:
            about_data = json.load(f)
        
        about_translations = {k: v for k, v in flat_trans.items() if k.startswith('about_')}
        update_file(about_file, about_translations, about_data)
        print(f"Updated {about_file}")
    
    # Update navigation.json
    nav_file = os.path.join(lang_dir, "navigation.json")
    if os.path.exists(nav_file):
        with open(nav_file, 'r', encoding='utf-8') as f:
            nav_data = json.load(f)
        
        nav_translations = {k: v for k, v in flat_trans.items() if k in ['beta_test', 'spenden']}
        update_file(nav_file, nav_translations, nav_data)
        print(f"Updated {nav_file}")
    
    # Update success.json
    success_file = os.path.join(lang_dir, "success.json")
    if os.path.exists(success_file):
        with open(success_file, 'r', encoding='utf-8') as f:
            success_data = json.load(f)
        
        success_translations = {k: v for k, v in flat_trans.items() 
                               if k.startswith('donation_success_') or k.startswith('testform_') or k.startswith('form_') or k == 'donation_title'}
        update_file(success_file, success_translations, success_data)
        print(f"Updated {success_file}")

print("All files updated successfully!")
