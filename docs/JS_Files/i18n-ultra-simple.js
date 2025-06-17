// Ultra-simple i18n for GlocalSpirit
class UltraSimpleI18n {
    constructor() {
        this.currentLanguage = 'de';
        this.translations = {
            'de': {
                // Navigation
                'home': 'Startseite',
                'about': 'Über uns',
                'roadmap': 'Roadmap',
                'contact': 'Kontakt',
                'beta_test': 'Beta Testen',
                'back': '← Zurück',
                
                // Hero Section
                'hero_title': 'glocalSpirit',
                'hero_description': 'GlocalSpirit ist eine Plattform für Bewusstseinsbildung und Vernetzung, die lokale und globale Gemeinschaften verbindet.<br><br>Unser Ziel ist es, ein lebendiges Friedensnetzwerk zu schaffen, in dem Menschen ihre Werte, Fähigkeiten und Ressourcen teilen können.<br><br>Durch Online-Resonanzräume, regionale Treffen und innovative Finanzmodelle wie den GlocalSpirit-Coin fördern wir eine nachhaltige, kooperative Wirtschaft.',
                
                // About Section
                'about_movement_title': 'Bewegung & Flow',
                'about_movement_desc': 'Körper, Geist und Seele verbindet sich durch achtsame, kreative und heilende Formen der Bewegung. Ob durch Yoga, Tanz, Atemarbeit oder intuitive Körperpraxis. GlocalSpirit lädt dazu ein, in einen natürlichen Rhythmus zu finden und sich darüber im Einklang mit dem Leben zu spüren.',
                'about_consciousness_title': 'Bewusstsein',
                'about_consciousness_desc': 'Bewusstsein ist gemäß der Quantentheorie ein universeller und gleichzeitig ein energiegeladener Zustand. So ist Bewusstseinsentwicklung beziehungsweise Bewusstseinserweiterung gleichzeitig ein energetisch verwandelnder Zustand. Individuelle Bewusstseinszustände folgen bestimmten energetischen Gesetzmäßigkeiten und beeinflussen somit unmittelbar die Körperfunktionen. Dies nimmt Einfluss auf Gesundheit und Krankheit, auf Wohlgefühl und Unwohlsein.',
                'about_nutrition_title': 'Gute Produkte & Ernährung',
                'about_nutrition_desc': 'GlocalSpirit steht für bewussten Konsum, achtsame Ernährung und Nährendes für Körper, Geist und Seele. Idealerweise stehen Qualität, Einfachheit und Ursprünglichkeit der Produkte im Einklang mit „Mensch und Natur".',
                'about_healing_title': 'Heilung & Gesundheit',
                'about_healing_desc': 'Bei GlocalSpirit umfasst Gesundheit einen ganzheitlichen Ansatz für körperliches, seelisches und geistiges Wohlbefinden. Wir laden dazu ein, Heilung als einen natürlichen Prozess zu verstehen. Getragen von Bewusstheit, Gemeinschaft, Naturverbundenheit und innerem Frieden.',
                'about_hope_title': 'Houses of Hope',
                'about_hope_desc': 'Die „Houses of Hope" sind lebendige Orte der Begegnung, Heilung und Ko-Kreation. Sie dienen als spirituelle, soziale und kulturelle Räume, in denen sich Menschen im Geiste des inneren Friedens und der Synarchie versammeln können. Die „Houses of Hope" sind physische Ankerpunkte innerhalb des GlocalSpirit-Netzwerks.',
                'about_creativity_title': 'Kreativität & Ausdruck',
                'about_creativity_desc': 'GlocalSpirit bietet hier geschützte Räume für freie Entfaltung, schöpferischen Fluss und authentischen Selbstausdruck. Was vielleicht vormals als Leistungsdruck erlebt wurde, kann hier als erleb- hör- und fühlbare Kreativität erlebt werden.',
                'about_learning_title': 'Lernen & Bildung',
                'about_learning_desc': 'GlocalSpirit verkörpert eine neue Form des Wissensaustausches, basierend auf Resonanz, Selbstentfaltung und innerer Stimmigkeit. Jenseits von Druck, Bewertung oder festen Lehrplänen.',
                'about_nature_title': 'Natur & Nachhaltigkeit',
                'about_nature_desc': 'Die Verbindung zur Natur steht im Zentrum unserer Vision. Nachhaltigkeit ist nicht nur ein Konzept, sondern eine gelebte Haltung im Einklang mit den natürlichen Zyklen.',
                'about_spirituality_title': 'Spiritualität & Mystik',
                'about_spirituality_desc': 'Spiritualität als universelle Kraft der Verbindung. Mystik als Erfahrung des Einheitsbewusstseins. Hier finden Suchende Raum für ihre tiefsten Fragen und Erkenntnisse.',
                'about_technology_title': 'Technologie & Bewusstsein',
                'about_technology_desc': 'Technologie im Dienste des Bewusstseins. Digitale Werkzeuge, die Verbindung fördern statt Trennung. Innovation aus Liebe statt aus Angst.',
                'about_value_title': 'Wertschöpfung & Kreislauf',
                'about_value_desc': 'Eine neue Wirtschaft basierend auf gegenseitigem Nutzen und zirkulären Prinzipien. Wertschöpfung durch Wertschätzung.',
                
                // Roadmap Section
                'roadmap_card1_title': 'Der erste Impuls',
                'roadmap_card1_date': 'August 2024',
                'roadmap_card1_desc': 'Die Vision von glocalSpirit wird empfangen – nicht als technisches Projekt, sondern als lebendiger Impuls eines neuen sozialen Nervensystems. Drei Menschen folgen dem inneren Ruf und bilden ein erstes bewusstes Dreieck: das Triangle. Es steht für Verbindung, Klarheit und Hingabe. In dieser Anfangsbewegung zeigt sich bereits das Herzstück von glocalSpirit: Das Gute, das bereits in der Welt wirkt, sichtbar zu machen und Menschen über innere Resonanz zu vernetzen. Die Idee atmet.',
                'roadmap_card2_title': 'Geburt des Feldes',
                'roadmap_card2_date': 'September/Oktober 2024',
                'roadmap_card2_desc': 'Ein fühlbarer TeamSpirit entfaltet sich. In einem geschützten Kreis wächst die Vision durch gemeinsames Denken, Fühlen und Lauschen weiter – getragen von Vertrauen statt Kontrolle. Der erste Förderantrag entsteht, nicht um etwas zu erschaffen, sondern um Raum zu halten für das, was schon lebt. Dann geschieht das Wesentliche: Menschen kommen wirklich zusammen. Die erste Zusammenkunft wird zum Resonanzraum – nicht als Meeting, sondern als Moment echter Präsenz. Es ist der erste Vorgeschmack auf das, was glocalSpirit ausmacht: Räume, in denen Verbindung geschieht – intuitiv, echt, transformierend.',
                'roadmap_card3_title': 'Das erste SyNbol',
                'roadmap_card3_date': 'November 2024',
                'roadmap_card3_desc': 'Ein SyNbol wird geboren – kein Logo, sondern ein lebendiges Portal. Der Begriff „SyNbol" vereint das klassische Symbolhafte mit der Tiefe synchroner Verbindung: Das große „N" steht für Now, Netzwerk und Naturintelligenz. Dieses erste SyNbol verkörpert die archetypischen Felder von glocalSpirit: Frieden, Kreativität, Heilung, Bewusstheit, Natürlichkeit, Verbundenheit, Wertschöpfung. Es ist nicht nur Zeichen, sondern Einladung. Auf der Plattform erscheinen sie später als Purpose Hubs – nicht als Kategorien, sondern als energetische Resonanzräume, die Menschen intuitiv zusammenführen.',
                'roadmap_card4_title': 'Die Struktur im Fluss',
                'roadmap_card4_date': 'Dez 2024 - Jan 2025',
                'roadmap_card4_desc': 'Die Struktur beginnt sich zu formen – nicht als starres Gerüst, sondern als lebendige Architektur. Das Business Model Canvas wird entwickelt, Hostingverträge aufgesetzt, ein erstes Konzeptpapier formuliert. Zugleich beginnt das Netzwerken – nicht als Zielgruppenstrategie, sondern als sanftes Lauschen: Wer schwingt schon mit? glocalSpirit bleibt dabei, was es ist: ein syntropischer Raum, der nicht Menschen steuert, sondern sie durch Synchronizität zueinander ruft.',
                'roadmap_card5_title': 'Form aus der Mitte',
                'roadmap_card5_date': 'Februar - März 2025',
                'roadmap_card5_desc': 'Die Vision verdichtet sich. Die Organisation wächst bewusst kreisförmig, nicht hierarchisch. Erste Kooperationspartner treten ins Feld: Menschen, Projekte, Orte, die selbst bereits Gutes tun. Das Prinzip des Synchronizitätsmatchings wird technisch und philosophisch verankert: Nicht Interessen, sondern innere Ausrichtung verbindet Menschen. Wer sich in einen Purpose Hub einschwingt, wird auf natürliche Weise mit jenen zusammengeführt, mit denen Wandel entstehen kann.',
                'roadmap_card6_title': 'Der erste Atemzug',
                'roadmap_card6_date': 'April 2025',
                'roadmap_card6_desc': 'Die erste Testphase beginnt. Die Plattform erwacht in der realen Welt: Inhalte fließen ein, Rückmeldungen werden empfangen, erste bewusste Verbindungen entstehen. Die Software atmet, das Feld antwortet. Begegnungen geschehen nicht nach Mustern, sondern nach Bedeutung. glocalSpirit beginnt, seine Intelligenz zu zeigen – nicht als Code, sondern als fühlendes Feld.',
                'roadmap_card7_title': 'Öffnung des Feldes',
                'roadmap_card7_date': 'Mai 2025',
                'roadmap_card7_desc': 'Die zweite Testphase bringt Bewegung. Bestehende Netzwerke werden eingeladen, Teil des Feldes zu werden. Die glocalMap entsteht – eine Landkarte gelebter Wirksamkeit, auf der Menschen sichtbar werden, die aus dem Herzen heraus wirken. Die Biete-Suche-Funktion wird aktiviert: ein Werkzeug für tiefe, passgenaue Verbindung durch Resonanz statt Reiz. Die Landingpage öffnet sich als Einladung an alle, die das Neue nicht nur träumen, sondern leben wollen.',
                'roadmap_card8_title': 'Der erste Ruf in die Welt',
                'roadmap_card8_date': 'August/September 2025',
                'roadmap_card8_desc': 'Der erste größere Launch steht bevor. Die Plattform wird für weitere Kreise geöffnet. Parallel wird die Infrastruktur stabilisiert, eine Geschäftsführung etabliert – nicht zur Kontrolle, sondern zur Raumhaltung. glocalSpirit beginnt zu leuchten: als Netzwerk, als Resonanzfeld, als gelebte Vision.',
                
                // Forms
                'form_name': 'Name',
                'form_email': 'E-Mail',
                'form_message': 'Nachricht',
                'form_submit': 'Senden',
                'form_required': 'Pflichtfeld',
                'form_success': 'Vielen Dank für Ihre Nachricht!',
                'form_error': 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
                
                // Test Form
                'testform_title': 'Beta Test Anmeldung',
                'testform_subtitle': 'Seien Sie dabei, wenn glocalSpirit erwacht',
                'testform_name_label': 'Name *',
                'testform_email_label': 'E-Mail *',
                'testform_newsletter': 'Updates per Mail erhalten?',
                'testform_submit': 'SENDEN',
                'testform_sending': 'WIRD GESENDET...',
                'testform_success_message': 'Vielen Dank für deine Anmeldung als Beta-Tester. Wir werden uns bald bei dir melden!',
                'form_error': 'Fehler bei der Anmeldung',
                'form_error_message': 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.',
                
                // Donation Form
                'donation_title': 'Spenden für glocalSpirit',
                'donation_subtitle': 'Unterstützen Sie die Vision eines lebendigen Friedensnetzwerks',
                'donation_amount': 'Spendenbetrag',
                'donation_custom': 'Eigener Betrag',
                'donation_submit': 'Jetzt spenden',
                
                // Footer
                'footer.tagline': 'GlocalSpirit – Bewusst vernetzt.',
                'footer.email': 'kontakt@glocalspirit.org',
                'footer.copyright': '© 2025 GlocalSpirit',
                'footer.privacy': 'Datenschutz',
                'footer.imprint': 'Impressum',
                // Cards 03 (use original roadmap_card3 text)
                'cards.card03.title': 'Das erste SyNbol',
                'cards.card03.date': 'November 2024',
                'cards.card03.description': 'Ein SyNbol wird geboren – kein Logo, sondern ein lebendiges Portal. Der Begriff „SyNbol" vereint das klassische Symbolhafte mit der Tiefe synchroner Verbindung: Das große „N" steht für Now, Netzwerk und Naturintelligenz. Dieses erste SyNbol verkörpert die archetypischen Felder von glocalSpirit: Frieden, Kreativität, Heilung, Bewusstheit, Natürlichkeit, Verbundenheit, Wertschöpfung. Es ist nicht nur Zeichen, sondern Einladung. Auf der Plattform erscheinen sie später als Purpose Hubs – nicht als Kategorien, sondern als energetische Resonanzräume, die Menschen intuitiv zusammenführen.',

                // Legacy keys for backward compatibility
                'hero.title': 'glocalSpirit',
                'hero.description': 'GlocalSpirit ist eine Plattform für Bewusstseinsbildung und Vernetzung, die lokale und globale Gemeinschaften verbindet.<br><br>Unser Ziel ist es, ein lebendiges Friedensnetzwerk zu schaffen, in dem Menschen ihre Werte, Fähigkeiten und Ressourcen teilen können.<br><br>Durch Online-Resonanzräume, regionale Treffen und innovative Finanzmodelle wie den GlocalSpirit-Coin fördern wir eine nachhaltige, kooperative Wirtschaft.',
                'spenden': 'Spenden'
            },
            'en': {
                // Navigation
                'home': 'Home',
                'about': 'About',
                'roadmap': 'Roadmap',
                'contact': 'Contact',
                'beta_test': 'Join Beta',
                'back': '← Back',
                
                // Hero Section
                'hero_title': 'glocalSpirit',
                'hero_description': 'GlocalSpirit is a platform for consciousness development and networking that connects local and global communities.<br><br>Our goal is to create a living peace network where people can share their values, skills, and resources.<br><br>Through online resonance spaces, regional meetings, and innovative financial models like the GlocalSpirit-Coin, we promote a sustainable, cooperative economy.',
                
                // About Section
                'about_movement_title': 'Movement & Flow',
                'about_movement_desc': 'Body, mind and soul connect through mindful, creative and healing forms of movement. Whether through yoga, dance, breathwork or intuitive body practice. GlocalSpirit invites you to find a natural rhythm and feel in harmony with life through this.',
                'about_consciousness_title': 'Consciousness',
                'about_consciousness_desc': 'According to quantum theory, consciousness is both a universal and energetically charged state. Thus, consciousness development or expansion is simultaneously an energetically transformative state. Individual states of consciousness follow certain energetic laws and thus directly influence bodily functions. This affects health and illness, well-being and discomfort.',
                'about_nutrition_title': 'Good Products & Nutrition',
                'about_nutrition_desc': 'GlocalSpirit stands for conscious consumption, mindful nutrition and nourishment for body, mind and soul. Ideally, quality, simplicity and originality of products are in harmony with "human and nature".',
                'about_healing_title': 'Healing & Health',
                'about_healing_desc': 'At GlocalSpirit, health encompasses a holistic approach to physical, emotional and mental well-being. We invite you to understand healing as a natural process. Supported by awareness, community, connection to nature and inner peace.',
                'about_hope_title': 'Houses of Hope',
                'about_hope_desc': 'The "Houses of Hope" are living places of encounter, healing and co-creation. They serve as spiritual, social and cultural spaces where people can gather in the spirit of inner peace and synarchy. The "Houses of Hope" are physical anchor points within the GlocalSpirit network.',
                'about_creativity_title': 'Creativity & Expression',
                'about_creativity_desc': 'GlocalSpirit offers protected spaces for free development, creative flow and authentic self-expression. What may have been experienced as performance pressure can be experienced here as experiential, audible and tangible creativity.',
                'about_learning_title': 'Learning & Education',
                'about_learning_desc': 'GlocalSpirit embodies a new form of knowledge exchange based on resonance, self-development and inner consistency. Beyond pressure, evaluation or fixed curricula.',
                'about_nature_title': 'Nature & Sustainability',
                'about_nature_desc': 'Connection to nature is at the center of our vision. Sustainability is not just a concept, but a lived attitude in harmony with natural cycles.',
                'about_spirituality_title': 'Spirituality & Mysticism',
                'about_spirituality_desc': 'Spirituality as a universal force of connection. Mysticism as an experience of unity consciousness. Here seekers find space for their deepest questions and insights.',
                'about_technology_title': 'Technology & Consciousness',
                'about_technology_desc': 'Technology in service of consciousness. Digital tools that promote connection rather than separation. Innovation from love rather than fear.',
                'about_value_title': 'Value Creation & Circulation',
                'about_value_desc': 'A new economy based on mutual benefit and circular principles. Value creation through appreciation.',
                
                // Roadmap Section
                'roadmap_card1_title': 'The First Impulse',
                'roadmap_card1_date': 'August 2024',
                'roadmap_card1_desc': 'The vision of glocalSpirit is received – not as a technical project, but as a living impulse of a new social nervous system. Three people follow the inner call and form a first conscious triangle: the Triangle. It stands for connection, clarity and devotion. This initial movement already shows the heart of glocalSpirit: making visible the good that already works in the world and networking people through inner resonance. The idea breathes.',
                'roadmap_card2_title': 'Birth of the Field',
                'roadmap_card2_date': 'September/October 2024',
                'roadmap_card2_desc': 'A tangible team spirit unfolds. In a protected circle, the vision grows through shared thinking, feeling and listening – carried by trust rather than control. The first funding proposal is created, not to create something, but to hold space for what already lives. Then the essential happens: people really come together. The first gathering becomes a resonance space – not as a meeting, but as a moment of genuine presence. It is the first foretaste of what glocalSpirit is about: spaces where connection happens – intuitive, authentic, transformative.',
                'roadmap_card3_title': 'The First SyNbol',
                'roadmap_card3_date': 'November 2024',
                'roadmap_card3_desc': 'A SyNbol is born – not a logo, but a living portal. The term "SyNbol" combines the classical symbolic with the depth of synchronous connection: The capital "N" stands for Now, Network and Natural Intelligence. This first SyNbol embodies the archetypal fields of glocalSpirit: Peace, Creativity, Healing, Awareness, Naturalness, Connection, Value Creation. It is not just a sign, but an invitation. On the platform they later appear as Purpose Hubs – not as categories, but as energetic resonance spaces that intuitively bring people together.',
                'roadmap_card4_title': 'Structure in Flow',
                'roadmap_card4_date': 'Dec 2024 - Jan 2025',
                'roadmap_card4_desc': 'The structure begins to form – not as a rigid framework, but as living architecture. The Business Model Canvas is developed, hosting contracts set up, a first concept paper formulated. At the same time, networking begins – not as a target group strategy, but as gentle listening: Who is already resonating? glocalSpirit remains what it is: a syntropic space that does not control people, but calls them to each other through synchronicity.',
                'roadmap_card5_title': 'Form from the Center',
                'roadmap_card5_date': 'February - March 2025',
                'roadmap_card5_desc': 'The vision condenses. The organization grows consciously in circles, not hierarchically. First cooperation partners enter the field: people, projects, places that already do good themselves. The principle of synchronicity matching is anchored technically and philosophically: Not interests, but inner alignment connects people. Those who resonate with a Purpose Hub are naturally brought together with those with whom change can emerge.',
                'roadmap_card6_title': 'The First Breath',
                'roadmap_card6_date': 'April 2025',
                'roadmap_card6_desc': 'The first test phase begins. The platform awakens in the real world: content flows in, feedback is received, first conscious connections emerge. The software breathes, the field responds. Encounters happen not according to patterns, but according to meaning. glocalSpirit begins to show its intelligence – not as code, but as a feeling field.',
                'roadmap_card7_title': 'Opening of the Field',
                'roadmap_card7_date': 'May 2025',
                'roadmap_card7_desc': 'The second test phase brings movement. Existing networks are invited to become part of the field. The glocalMap emerges – a map of lived effectiveness where people become visible who work from the heart. The offer-search function is activated: a tool for deep, precise connection through resonance instead of stimulus. The landing page opens as an invitation to all who want to live the new, not just dream it.',
                'roadmap_card8_title': 'The First Call to the World',
                'roadmap_card8_date': 'August/September 2025',
                'roadmap_card8_desc': 'The first major launch is approaching. The platform is opened to wider circles. In parallel, the infrastructure is stabilized, management is established – not for control, but for holding space. glocalSpirit begins to shine: as a network, as a resonance field, as a lived vision.',
                
                // Forms
                'form_name': 'Name',
                'form_email': 'Email',
                'form_message': 'Message',
                'form_submit': 'Send',
                'form_required': 'Required field',
                'form_success': 'Thank you for your message!',
                'form_error': 'Error sending. Please try again.',
                
                // Test Form
                'testform_title': 'Beta Test Registration',
                'testform_subtitle': 'Be there when glocalSpirit awakens',
                'testform_name_label': 'Name *',
                'testform_email_label': 'Email *',
                'testform_newsletter': 'Receive updates by email?',
                'testform_submit': 'SEND',
                'testform_sending': 'SENDING...',
                'testform_success_message': 'Thank you for registering as a beta tester. We will contact you soon!',
                'form_error': 'Registration Error',
                'form_error_message': 'An error occurred. Please try again.',
                
                // Donation Form
                'donation_title': 'Donate to glocalSpirit',
                'donation_subtitle': 'Support the vision of a living peace network',
                'donation_amount': 'Donation Amount',
                'donation_custom': 'Custom Amount',
                'donation_submit': 'Donate Now',
                
                // Footer
                'footer.tagline': 'GlocalSpirit – Consciously Connected.',
                'footer.email': 'contact@glocalspirit.org',
                'footer.copyright': '© 2025 GlocalSpirit',
                'footer.privacy': 'Privacy Policy',
                'footer.imprint': 'Imprint',
                // Cards 03
                'cards.card03.title': 'The First SyNbol',
                'cards.card03.date': 'November 2024',
                'cards.card03.description': 'A SyNbol is born – not a logo, but a living portal. The term "SyNbol" combines the classical symbolic with the depth of synchronous connection: The capital "N" stands for Now, Network and Natural Intelligence. This first SyNbol embodies the archetypal fields of glocalSpirit: Peace, Creativity, Healing, Awareness, Naturalness, Connection, Value Creation. It is not just a sign, but an invitation. On the platform they later appear as Purpose Hubs – not as categories, but as energetic resonance spaces that intuitively bring people together.',

                // Legacy keys for backward compatibility
                'hero.title': 'glocalSpirit',
                'hero.description': 'GlocalSpirit is a platform for consciousness development and networking that connects local and global communities.<br><br>Our goal is to create a living peace network where people can share their values, skills, and resources.<br><br>Through online resonance spaces, regional meetings, and innovative financial models like the GlocalSpirit-Coin, we promote a sustainable, cooperative economy.',
                'spenden': 'Donate'
            },
            'fr': {
                // Navigation
                'home': 'Accueil',
                'about': 'À propos',
                'roadmap': 'Feuille de route',
                'contact': 'Contact',
                'beta_test': 'Rejoindre Beta',
                'back': '← Retour',
                
                // Hero Section
                'hero_title': 'glocalSpirit',
                'hero_description': 'GlocalSpirit est une plateforme de développement de la conscience et de mise en réseau qui relie les communautés locales et mondiales.<br><br>Notre objectif est de créer un réseau de paix vivant où les gens peuvent partager leurs valeurs, leurs compétences et leurs ressources.<br><br>Grâce aux espaces de résonance en ligne, aux rencontres régionales et aux modèles financiers innovants comme le GlocalSpirit-Coin, nous promouvons une économie durable et coopérative.',
                
                // About Section
                'about_movement_title': 'Mouvement & Flux',
                'about_movement_desc': 'Le corps, l\'esprit et l\'âme se connectent par des formes de mouvement conscientes, créatives et guérissantes. Que ce soit par le yoga, la danse, le travail respiratoire ou la pratique corporelle intuitive. GlocalSpirit vous invite à trouver un rythme naturel et à vous sentir en harmonie avec la vie.',
                'about_consciousness_title': 'Conscience',
                'about_consciousness_desc': 'Selon la théorie quantique, la conscience est à la fois un état universel et énergétiquement chargé. Ainsi, le développement ou l\'expansion de la conscience est simultanément un état énergétiquement transformateur. Les états de conscience individuels suivent certaines lois énergétiques et influencent ainsi directement les fonctions corporelles.',
                'about_nutrition_title': 'Bons Produits & Nutrition',
                'about_nutrition_desc': 'GlocalSpirit défend la consommation consciente, la nutrition attentive et la nourriture pour le corps, l\'esprit et l\'âme. Idéalement, la qualité, la simplicité et l\'originalité des produits sont en harmonie avec "l\'humain et la nature".',
                'about_healing_title': 'Guérison & Santé',
                'about_healing_desc': 'Chez GlocalSpirit, la santé englobe une approche holistique du bien-être physique, émotionnel et mental. Nous vous invitons à comprendre la guérison comme un processus naturel. Soutenu par la conscience, la communauté, la connexion à la nature et la paix intérieure.',
                'about_hope_title': 'Maisons d\'Espoir',
                'about_hope_desc': 'Les "Maisons d\'Espoir" sont des lieux vivants de rencontre, de guérison et de co-création. Elles servent d\'espaces spirituels, sociaux et culturels où les gens peuvent se rassembler dans l\'esprit de la paix intérieure et de la synarchie.',
                'about_creativity_title': 'Créativité & Expression',
                'about_creativity_desc': 'GlocalSpirit offre des espaces protégés pour le développement libre, le flux créatif et l\'expression de soi authentique. Ce qui a pu être vécu comme une pression de performance peut être vécu ici comme une créativité expérientielle, audible et tangible.',
                'about_learning_title': 'Apprentissage & Éducation',
                'about_learning_desc': 'GlocalSpirit incarne une nouvelle forme d\'échange de connaissances basée sur la résonance, l\'auto-développement et la cohérence intérieure. Au-delà de la pression, de l\'évaluation ou des programmes fixes.',
                'about_nature_title': 'Nature & Durabilité',
                'about_nature_desc': 'La connexion à la nature est au centre de notre vision. La durabilité n\'est pas seulement un concept, mais une attitude vécue en harmonie avec les cycles naturels.',
                'about_spirituality_title': 'Spiritualité & Mysticisme',
                'about_spirituality_desc': 'La spiritualité comme force universelle de connexion. Le mysticisme comme expérience de la conscience d\'unité. Ici, les chercheurs trouvent de l\'espace pour leurs questions et insights les plus profonds.',
                'about_technology_title': 'Technologie & Conscience',
                'about_technology_desc': 'La technologie au service de la conscience. Des outils numériques qui favorisent la connexion plutôt que la séparation. L\'innovation par amour plutôt que par peur.',
                'about_value_title': 'Création de Valeur & Circulation',
                'about_value_desc': 'Une nouvelle économie basée sur le bénéfice mutuel et les principes circulaires. Création de valeur par l\'appréciation.',
                
                // Roadmap Section
                'roadmap_card1_title': 'La Première Impulsion',
                'roadmap_card1_date': 'Août 2024',
                'roadmap_card1_desc': 'La vision de glocalSpirit est reçue – non pas comme un projet technique, mais comme une impulsion vivante d\'un nouveau système nerveux social. Trois personnes suivent l\'appel intérieur et forment un premier triangle conscient : le Triangle. Il représente la connexion, la clarté et la dévotion. Ce mouvement initial montre déjà le cœur de glocalSpirit : rendre visible le bien qui agit déjà dans le monde et mettre en réseau les personnes par la résonance intérieure. L\'idée respire.',
                'roadmap_card2_title': 'Naissance du Champ',
                'roadmap_card2_date': 'Septembre/Octobre 2024',
                'roadmap_card2_desc': 'Un esprit d\'équipe tangible se déploie. Dans un cercle protégé, la vision grandit par la pensée, le sentiment et l\'écoute partagés – portés par la confiance plutôt que par le contrôle. La première proposition de financement est créée, non pas pour créer quelque chose, mais pour tenir l\'espace pour ce qui vit déjà. Puis, l\'essentiel se produit : les gens se rassemblent vraiment. La première rencontre devient un espace de résonance – non pas comme une réunion, mais comme un moment de présence authentique. C\'est le premier avant-goût de ce qu\'est glocalSpirit : des espaces où la connexion se produit – intuitive, authentique, transformative.',
                'roadmap_card3_title': 'Le Premier SyNbole',
                'roadmap_card3_date': 'Novembre 2024',
                'roadmap_card3_desc': 'Un SyNbole naît – pas un logo, mais un portail vivant. Le terme "SyNbole" combine le symbolique classique avec la profondeur de la connexion synchrone : le grand "N" représente Now, Réseau et Intelligence naturelle. Ce premier SyNbole incarne les champs archétypaux de glocalSpirit : Paix, Créativité, Guérison, Conscience, Naturalité, Connexion, Création de valeur. Ce n\'est pas seulement un signe, mais une invitation. Sur la plateforme, ils apparaîtront plus tard comme des Purpose Hubs – pas comme des catégories, mais comme des espaces de résonance énergétique qui rassemblent intuitivement les gens.',
                'roadmap_card4_title': 'Structure en Flux',
                'roadmap_card4_date': 'Déc 2024 - Jan 2025',
                'roadmap_card4_desc': 'La structure commence à se former – non pas comme un cadre rigide, mais comme une architecture vivante. Le Business Model Canvas est développé, les contrats d\'hébergement sont mis en place, un premier document conceptuel est formulé. En même temps, le réseautage commence – non pas comme une stratégie de groupe cible, mais comme une écoute douce : Qui résonne déjà ? glocalSpirit reste ce qu\'il est : un espace syntropique qui ne contrôle pas les gens, mais les appelle les uns aux autres par la synchronicité.',
                'roadmap_card5_title': 'Forme du Centre',
                'roadmap_card5_date': 'Février - Mars 2025',
                'roadmap_card5_desc': 'La vision se condense. L\'organisation grandit consciemment en cercles, non hiérarchiquement. Les premiers partenaires de coopération entrent dans le champ : des personnes, des projets, des lieux qui font déjà le bien eux-mêmes. Le principe du matching de synchronicité est ancré techniquement et philosophiquement : Ce ne sont pas les intérêts, mais l\'alignement intérieur qui connecte les gens. Ceux qui résonnent avec un Purpose Hub sont naturellement réunis avec ceux avec qui le changement peut émerger.',
                'roadmap_card6_title': 'Le Premier Souffle',
                'roadmap_card6_date': 'Avril 2025',
                'roadmap_card6_desc': 'La première phase de test commence. La plateforme s\'éveille dans le monde réel : le contenu afflue, les retours sont reçus, les premières connexions conscientes émergent. Le logiciel respire, le champ répond. Les rencontres ne se produisent pas selon des modèles, mais selon un sens. glocalSpirit commence à montrer son intelligence – pas comme un code, mais comme un champ ressenti.',
                'roadmap_card7_title': 'Ouverture du Champ',
                'roadmap_card7_date': 'Mai 2025',
                'roadmap_card7_desc': 'La deuxième phase de test apporte du mouvement. Les réseaux existants sont invités à faire partie du champ. La glocalMap émerge – une carte de l\'efficacité vécue où les gens deviennent visibles en tant qu\'acteurs du changement. La fonction d\'offre-recherche est activée : un outil pour une connexion profonde et précise par la résonance plutôt que par le stimulus. La page d\'atterrissage s\'ouvre comme une invitation à tous ceux qui veulent vivre le nouveau, pas seulement le rêver.',
                'roadmap_card8_title': 'Le Premier Appel au Monde',
                'roadmap_card8_date': 'Août/Septembre 2025',
                'roadmap_card8_desc': 'Le premier lancement majeur approche. La plateforme s\'ouvre à des cercles plus larges. Parallèlement, l\'infrastructure est stabilisée, une direction est établie – non pas pour contrôler, mais pour tenir l\'espace. glocalSpirit commence à briller : en tant que réseau, en tant que champ de résonance, en tant que vision vécue.',
                
                // Forms
                'form_name': 'Nom',
                'form_email': 'Email',
                'form_message': 'Message',
                'form_submit': 'Envoyer',
                'form_required': 'Champ requis',
                'form_success': 'Merci pour votre message!',
                'form_error': 'Erreur d\'envoi. Veuillez réessayer.',
                
                // Test Form
                'testform_title': 'Inscription Beta Test',
                'testform_subtitle': 'Soyez là quand glocalSpirit s\'éveille',
                'testform_name_label': 'Nom *',
                'testform_email_label': 'Email *',
                'testform_newsletter': 'Recevoir des mises à jour par email?',
                'testform_submit': 'ENVOYER',
                'testform_sending': 'ENVOI EN COURS...',
                'testform_success_message': 'Merci de vous être inscrit comme testeur beta. Nous vous contacterons bientôt!',
                'form_error': 'Erreur d\'inscription',
                'form_error_message': 'Une erreur s\'est produite. Veuillez réessayer.',
                
                // Donation Form
                'donation_title': 'Faire un don à glocalSpirit',
                'donation_subtitle': 'Soutenez la vision d\'un réseau de paix vivant',
                'donation_amount': 'Montant du Don',
                'donation_custom': 'Montant Personnalisé',
                'donation_submit': 'Faire un Don',
                
                // Footer
                'footer.tagline': 'GlocalSpirit – Connecté en conscience.',
                'footer.email': 'contact@glocalspirit.org',
                'footer.copyright': '© 2025 GlocalSpirit',
                'footer.privacy': 'Politique de confidentialité',
                'footer.imprint': 'Mentions légales',
                // Cards 03
                'cards.card03.title': 'Le Premier SyNbole',
                'cards.card03.date': 'Novembre 2024',
                'cards.card03.description': 'Un SyNbole naît – pas un logo, mais un portail vivant. Le terme "SyNbole" combine le symbolique classique avec la profondeur de la connexion synchrone : le grand "N" représente Now, Réseau et Intelligence naturelle. Ce premier SyNbole incarne les champs archétypaux de glocalSpirit : Paix, Créativité, Guérison, Conscience, Naturalité, Connexion, Création de valeur. Ce n\'est pas seulement un signe, mais une invitation. Sur la plateforme, ils apparaîtront plus tard comme des Purpose Hubs – pas comme des catégories, mais comme des espaces de résonance énergétique qui rassemblent intuitivement les gens.',

                // Legacy keys for backward compatibility
                'hero.title': 'glocalSpirit',
                'hero.description': 'GlocalSpirit est une plateforme de développement de la conscience et de mise en réseau qui relie les communautés locales et mondiales.<br><br>Notre objectif est de créer un réseau de paix vivant où les gens peuvent partager leurs valeurs, leurs compétences et leurs ressources.<br><br>Grâce aux espaces de résonance en ligne, aux rencontres régionales et aux modèles financiers innovants comme le GlocalSpirit-Coin, nous promouvons une économie durable et coopérative.',
                'spenden': 'Faire un don'
            },
            'es': {
                // Navigation
                'home': 'Inicio',
                'about': 'Acerca de',
                'roadmap': 'Hoja de ruta',
                'contact': 'Contacto',
                'beta_test': 'Unirse a Beta',
                'back': '← Atrás',
                
                // Hero Section
                'hero_title': 'glocalSpirit',
                'hero_description': 'GlocalSpirit es una plataforma para el desarrollo de la conciencia y la creación de redes que conecta comunidades locales y globales.<br><br>Nuestro objetivo es crear una red de paz viviente donde las personas puedan compartir sus valores, habilidades y recursos.<br><br>A través de espacios de resonancia en línea, encuentros regionales y modelos financieros innovadores como el GlocalSpirit-Coin, promovemos una economía sostenible y cooperativa.',
                
                // About Section
                'about_movement_title': 'Movimiento & Flujo',
                'about_movement_desc': 'Cuerpo, mente y alma se conectan a través de formas de movimiento conscientes, creativas y sanadoras. Ya sea a través de yoga, danza, trabajo respiratorio o práctica corporal intuitiva. GlocalSpirit te invita a encontrar un ritmo natural y sentirte en armonía con la vida.',
                'about_consciousness_title': 'Consciencia',
                'about_consciousness_desc': 'Según la teoría cuántica, la consciencia es tanto un estado universal como energéticamente cargado. Así, el desarrollo o expansión de la consciencia es simultáneamente un estado energéticamente transformador.',
                'about_nutrition_title': 'Buenos Productos & Nutrición',
                'about_nutrition_desc': 'GlocalSpirit representa el consumo consciente, la nutrición atenta y el alimento para el cuerpo, mente y alma. Idealmente, la calidad, simplicidad y originalidad de los productos están en armonía con "humano y naturaleza".',
                'about_healing_title': 'Sanación & Salud',
                'about_healing_desc': 'En GlocalSpirit, la salud abarca un enfoque holístico del bienestar físico, emocional y mental. Te invitamos a entender la sanación como un proceso natural.',
                'about_hope_title': 'Casas de Esperanza',
                'about_hope_desc': 'Las "Casas de Esperanza" son lugares vivos de encuentro, sanación y co-creación. Sirven como espacios espirituales, sociales y culturales donde las personas pueden reunirse en el espíritu de la paz interior.',
                'about_creativity_title': 'Creatividad & Expresión',
                'about_creativity_desc': 'GlocalSpirit ofrece espacios protegidos para el desarrollo libre, el flujo creativo y la autoexpresión auténtica.',
                'about_learning_title': 'Aprendizaje & Educación',
                'about_learning_desc': 'GlocalSpirit encarna una nueva forma de intercambio de conocimientos basada en la resonancia, el autodesarrollo y la coherencia interna.',
                'about_nature_title': 'Naturaleza & Sostenibilidad',
                'about_nature_desc': 'La conexión con la naturaleza está en el centro de nuestra visión. La sostenibilidad no es solo un concepto, sino una actitud vivida en armonía con los ciclos naturales.',
                'about_spirituality_title': 'Espiritualidad & Misticismo',
                'about_spirituality_desc': 'La espiritualidad como fuerza universal de conexión. El misticismo como experiencia de la consciencia de unidad.',
                'about_technology_title': 'Tecnología & Consciencia',
                'about_technology_desc': 'Tecnología al servicio de la consciencia. Herramientas digitales que promueven la conexión en lugar de la separación.',
                'about_value_title': 'Creación de Valor & Circulación',
                'about_value_desc': 'Una nueva economía basada en el beneficio mutuo y los principios circulares. Creación de valor a través del aprecio.',
                
                // Roadmap Section (shortened for space)
                'roadmap_card1_title': 'El Primer Impulso',
                'roadmap_card1_date': 'Agosto 2024',
                'roadmap_card1_desc': 'La visión de glocalSpirit es recibida – no como un proyecto técnico, sino como un impulso vivo de un nuevo sistema nervioso social.',
                'roadmap_card2_title': 'Nacimiento del Campo',
                'roadmap_card2_date': 'Septiembre/Octubre 2024',
                'roadmap_card2_desc': 'Un espíritu de equipo tangible se despliega. En un círculo protegido, la visión crece a través del pensamiento, sentimiento y escucha compartidos.',
                'roadmap_card3_title': 'El Primer SíNbolo',
                'roadmap_card3_date': 'Noviembre 2024',
                'roadmap_card3_desc': 'Nace un SíNbolo – no un logo, sino un portal vivo. El término "SíNbolo" combina lo simbólico clásico con la profundidad de la conexión síncrona: la "N" mayúscula representa Now, Red e Inteligencia Natural. Este primer SíNbolo encarna los campos arquetípicos de glocalSpirit: Paz, Creatividad, Sanación, Conciencia, Naturalidad, Conexión, Creación de Valor. No es solo un signo, sino una invitación. En la plataforma, más tarde aparecerán como Purpose Hubs – no como categorías, sino como espacios de resonancia energética que reúnen intuitivamente a las personas.',
                'roadmap_card4_title': 'Estructura en Flujo',
                'roadmap_card4_date': 'Dic 2024 - Ene 2025',
                'roadmap_card4_desc': 'La estructura comienza a formarse – no como un marco rígido, sino como una arquitectura viva.',
                'roadmap_card5_title': 'Forma desde el Centro',
                'roadmap_card5_date': 'Febrero - Marzo 2025',
                'roadmap_card5_desc': 'La visión se condensa. La organización crece conscientemente en círculos, no jerárquicamente. Los primeros socios de cooperación entran en el campo.',
                'roadmap_card6_title': 'El Primer Aliento',
                'roadmap_card6_date': 'Abril 2025',
                'roadmap_card6_desc': 'Comienza la primera fase de prueba. La plataforma despierta en el mundo real.',
                'roadmap_card7_title': 'Apertura del Campo',
                'roadmap_card7_date': 'Mayo 2025',
                'roadmap_card7_desc': 'La segunda fase de prueba trae movimiento. Las redes existentes son invitadas a formar parte del campo.',
                'roadmap_card8_title': 'La Primera Llamada al Mundo',
                'roadmap_card8_date': 'Agosto/Septiembre 2025',
                'roadmap_card8_desc': 'Se acerca el primer lanzamiento importante. La plataforma se abre a círculos más amplios.',
                
                // Forms
                'form_name': 'Nombre',
                'form_email': 'Email',
                'form_message': 'Mensaje',
                'form_submit': 'Enviar',
                'form_required': 'Campo requerido',
                'form_success': '¡Gracias por tu mensaje!',
                'form_error': 'Error al enviar. Por favor, inténtalo de nuevo.',
                
                // Test Form
                'testform_title': 'Registro Beta Test',
                'testform_subtitle': 'Sé parte cuando glocalSpirit despierte',
                'testform_name_label': 'Nombre *',
                'testform_email_label': 'Email *',
                'testform_newsletter': '¿Recibir actualizaciones por email?',
                'testform_submit': 'ENVIAR',
                'testform_sending': 'ENVIANDO...',
                'testform_success_message': '¡Gracias por registrarte como tester beta. Te contactaremos pronto!',
                'form_error': 'Error de Registro',
                'form_error_message': 'Ocurrió un error. Por favor, inténtalo de nuevo.',
                
                // Donation Form
                'donation_title': 'Donar a glocalSpirit',
                'donation_subtitle': 'Apoya la visión de una red de paz viviente',
                'donation_amount': 'Cantidad de Donación',
                'donation_custom': 'Cantidad Personalizada',
                'donation_submit': 'Donar Ahora',
                
                // Footer
                'footer.tagline': 'GlocalSpirit – Conexión consciente.',
                'footer.email': 'contacto@glocalspirit.org',
                'footer.copyright': '© 2025 GlocalSpirit',
                'footer.privacy': 'Política de privacidad',
                'footer.imprint': 'Aviso legal',
                // Cards 03
                'cards.card03.title': 'El Primer SíNbolo',
                'cards.card03.date': 'Noviembre 2024',
                'cards.card03.description': 'Nace un SíNbolo – no un logo, sino un portal vivo. El término "SíNbolo" combina lo simbólico clásico con la profundidad de la conexión síncrona: la "N" mayúscula representa Now, Red e Inteligencia Natural. Este primer SíNbolo encarna los campos arquetípicos de glocalSpirit: Paz, Creatividad, Sanación, Conciencia, Naturalidad, Conexión, Creación de Valor. No es solo un signo, sino una invitación. En la plataforma, más tarde aparecerán como Purpose Hubs – no como categorías, sino como espacios de resonancia energética que reúnen intuitivamente a las personas.',

                // Legacy keys for backward compatibility
                'hero.title': 'glocalSpirit',
                'hero.description': 'GlocalSpirit es una plataforma para el desarrollo de la conciencia y la creación de redes que conecta comunidades locales y globales.<br><br>Nuestro objetivo es crear una red de paz viviente donde las personas puedan compartir sus valores, habilidades y recursos.<br><br>A través de espacios de resonancia en línea, encuentros regionales y modelos financieros innovadores como el GlocalSpirit-Coin, promovemos una economía sostenible y cooperativa.',
                'spenden': 'Donar'
            }
        };
    }

    init() {
        console.log('🌍 Initializing ultra-simple i18n...');
        
        // Detect language
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.translations[urlLang]) {
            this.currentLanguage = urlLang;
        }
        
        // Load from localStorage
        const savedLang = localStorage.getItem('glocalspirit-language');
        if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
        }
        
        console.log(`Current language: ${this.currentLanguage}`);
        console.log('Available translations:', Object.keys(this.translations[this.currentLanguage]));
        
        // Update page
        this.updatePage();
        
        // Delayed update for elements that might be added by animations
        setTimeout(() => {
            console.log('🔄 Delayed update...');
            this.updatePage();
        }, 1000);
        
        // Setup language switcher
        this.setupSwitcher();
        
        console.log('✅ Ultra-simple i18n ready!');
        
        document.dispatchEvent(new CustomEvent('i18nReady', { 
            detail: { language: this.currentLanguage } 
        }));
    }

    t(key) {
        const translation = this.translations[this.currentLanguage][key];
        if (translation) {
            console.log(`✅ Translation found for ${key}: ${translation.substring(0, 50)}...`);
            return translation;
        }
        
        console.warn(`🔍 Missing translation: ${key}`);
        return key;
    }

    updatePage() {
        console.log('🔄 Updating page content...');
        
        // Update all data-i18n elements (text only)
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            element.textContent = translation;
            console.log(`🔤 Updated ${key} (TEXT): ${element.tagName}.${element.className}`);
        });

        // Update all data-i18n-html elements (HTML content)
        const htmlElements = document.querySelectorAll('[data-i18n-html]');
        htmlElements.forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.t(key);
            element.innerHTML = translation;
            console.log(`🔤 Updated ${key} (HTML): ${element.tagName}.${element.className}`);
        });
        
        // Update title
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const key = titleElement.getAttribute('data-i18n');
            document.title = this.t(key);
        }
        
        // Also update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        const metaDescKey = document.querySelector('meta[name="i18n-description"]');
        if (metaDesc && metaDescKey) {
            const key = metaDescKey.getAttribute('content');
            metaDesc.setAttribute('content', this.t(key));
            console.log(`📄 Updated meta description with key: ${key}`);
        }
        
        console.log('✅ Page update complete');
    }

    changeLanguage(newLang) {
        if (!this.translations[newLang]) {
            console.error(`Language ${newLang} not supported`);
            return;
        }
        
        this.currentLanguage = newLang;
        localStorage.setItem('glocalspirit-language', newLang);
        
        this.updatePage();
        
        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('lang', newLang);
        window.history.replaceState({}, '', url);
        
        console.log(`🌍 Language changed to: ${newLang}`);
    }

    setupSwitcher() {
        let select = document.getElementById('language-select');
        if (!select) {
            // Sprachmenü dynamisch erzeugen, wenn nicht vorhanden
            const header = document.querySelector('.header__nav') || document.body;
            select = document.createElement('select');
            select.id = 'language-select';
            select.className = 'language-select';
            const langs = [
                { code: 'de', label: 'DE' },
                { code: 'en', label: 'EN' },
                { code: 'fr', label: 'FR' },
                { code: 'es', label: 'ES' },
                { code: 'el', label: 'EL' },
                { code: 'pl', label: 'PL' },
                { code: 'pt', label: 'PT' },
                { code: 'ru', label: 'RU' },
                { code: 'sv', label: 'SV' },
                { code: 'tr', label: 'TR' }
            ];
            langs.forEach(lang => {
                const option = document.createElement('option');
                option.value = lang.code;
                option.textContent = lang.label;
                select.appendChild(option);
            });
            // Styling: oben rechts einfügen
            select.style.position = 'absolute';
            select.style.top = '16px';
            select.style.right = '24px';
            select.style.zIndex = '9999';
            header.appendChild(select);
        }
        select.value = this.currentLanguage;
        select.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });
        console.log('✅ Language switcher setup');
    }
}

// Global instance
window.glocalSpiritI18n = new UltraSimpleI18n();

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.glocalSpiritI18n.init();
    });
} else {
    window.glocalSpiritI18n.init();
}
