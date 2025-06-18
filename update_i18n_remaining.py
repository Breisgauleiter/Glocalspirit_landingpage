#!/usr/bin/env python3
import json
import os

# Define the base directory
base_dir = "/home/orlan/landingpage/Glocalspirit_landingpage/docs/locales"

# Define translation mappings for remaining languages
translations = {
    "pt": {
        "about_movement_title": "Movimento & Fluxo",
        "about_movement_desc": "Corpo, mente e alma se conectam através de formas conscientes, criativas e curadoras de movimento. Seja através de yoga, dança, trabalho respiratório ou prática corporal intuitiva. GlocalSpirit convida a encontrar um ritmo natural e se sentir em harmonia com a vida através disso.",
        "about_consciousness_title": "Consciência",
        "about_consciousness_desc": "A consciência não se manifesta através do conhecimento ou conceitos, mas através do modo de ser. No GlocalSpirit, trata-se de agir e viver a partir de uma atitude consciente: presente, conectado e em harmonia com o todo maior.",
        "about_nutrition_title": "Bons produtos & Nutrição",
        "about_nutrition_desc": "GlocalSpirit representa o consumo consciente, nutrição consciente e alimento para corpo, mente e alma. Idealmente, a qualidade, simplicidade e autenticidade dos produtos estão em harmonia com \"humano e natureza\".",
        "about_healing_title": "Cura & Saúde",
        "about_healing_desc": "No GlocalSpirit, a saúde abrange uma abordagem holística do bem-estar físico, emocional e mental. Convidamos você a entender a cura como um processo natural. Apoiado pela consciência, comunidade, conexão com a natureza e paz interior.",
        "about_hope_title": "Casas de Esperança",
        "about_hope_desc": "As \"Casas de Esperança\" são lugares vivos de encontro, cura e co-criação. Servem como espaços espirituais, sociais e culturais onde as pessoas podem se reunir no espírito da paz interior e sinarquia. As \"Casas de Esperança\" são pontos de ancoragem físicos dentro da rede GlocalSpirit.",
        "about_creativity_title": "Criatividade & Expressão",
        "about_creativity_desc": "GlocalSpirit oferece espaços protegidos para desenvolvimento livre, fluxo criativo e autoexpressão autêntica. O que poderia ter sido experimentado como pressão de desempenho pode ser experimentado aqui como criatividade tangível, audível e sentível.",
        "about_learning_title": "Aprendizado & Educação",
        "about_learning_desc": "GlocalSpirit incorpora uma nova forma de troca de conhecimento baseada em ressonância, autodesenvolvimento e coerência interior. Além da pressão, avaliação ou currículos fixos.",
        "about_nature_title": "Natureza & Sustentabilidade",
        "about_nature_desc": "GlocalSpirit nos lembra de nossa conexão original com a terra. Convida-nos a viver em harmonia com os ciclos naturais, usar recursos conscientemente e criar formas de vida regenerativas.",
        "about_spirituality_title": "Espiritualidade & Misticismo",
        "about_spirituality_desc": "Aqui se encontram tradições de sabedoria, símbolos atemporais e formas modernas de despertar espiritual. Esta categoria oferece espaço para o indizível. Seja para o silêncio por trás das palavras, a profundidade além do pensamento ou o mistério universal que permeia tudo.",
        "about_technology_title": "Tecnologia & Consciência",
        "about_technology_desc": "GlocalSpirit conecta o aparentemente incompatível: inteligência digital e profundidade espiritual. A tecnologia não precisa ser \"desumanizada\". Através do design consciente, elementos técnicos podem se tornar ferramentas para paz, conexão e desenvolvimento interior.",
        "beta_test": "Testar",
        "spenden": "Doar",
        "donation_success_title": "Obrigado pelo seu apoio!",
        "donation_success_msg": "Sua assinatura foi ativada com sucesso. Você receberá um e-mail de confirmação de nós em breve.",
        "donation_success_next": "O que acontece a seguir?",
        "donation_success_email": "📧 Você receberá um e-mail de boas-vindas com todos os detalhes",
        "donation_success_help": "🎉 Sua contribuição nos ajuda a promover a conexão consciente",
        "donation_success_together": "🌱 Juntos criamos um futuro mais consciente",
        "donation_success_info": "💫 Você será informado sobre novos recursos e eventos",
        "testform_title": "Tornar-se testador beta",
        "form_success": "Registrado com sucesso!",
        "testform_success_message": "Obrigado por se inscrever como beta tester. Entraremos em contato em breve!",
        "form_error": "Erro de registro",
        "form_error_message": "Ocorreu um erro. Por favor, tente novamente.",
        "testform_name_label": "Nome *",
        "testform_email_label": "E-mail *",
        "testform_newsletter": "Receber atualizações por e-mail?",
        "testform_submit": "ENVIAR",
        "testform_sending": "ENVIANDO...",
        "donation_title": "Apoiar glocalSpirit - Pacotes de assinatura"
    },
    "ru": {
        "about_movement_title": "Движение & Поток",
        "about_movement_desc": "Тело, разум и душа соединяются через осознанные, творческие и исцеляющие формы движения. Будь то йога, танец, дыхательная работа или интуитивная телесная практика. GlocalSpirit приглашает найти естественный ритм и почувствовать себя в гармонии с жизнью через это.",
        "about_consciousness_title": "Сознание",
        "about_consciousness_desc": "Сознание проявляется не через знания или концепции, а через способ бытия. В GlocalSpirit речь идет о том, чтобы действовать и жить из осознанной позиции: присутствующей, связанной и в гармонии с большим целым.",
        "about_nutrition_title": "Хорошие продукты & Питание",
        "about_nutrition_desc": "GlocalSpirit представляет осознанное потребление, осознанное питание и пищу для тела, разума и души. В идеале качество, простота и подлинность продуктов находятся в гармонии с \"человеком и природой\".",
        "about_healing_title": "Исцеление & Здоровье",
        "about_healing_desc": "В GlocalSpirit здоровье охватывает целостный подход к физическому, эмоциональному и ментальному благополучию. Мы приглашаем понимать исцеление как естественный процесс. Поддерживаемый осознанностью, сообществом, связью с природой и внутренним миром.",
        "about_hope_title": "Дома Надежды",
        "about_hope_desc": "\"Дома Надежды\" - это живые места встречи, исцеления и со-творчества. Они служат духовными, социальными и культурными пространствами, где люди могут собираться в духе внутреннего мира и синархии. \"Дома Надежды\" - это физические точки привязки в сети GlocalSpirit.",
        "about_creativity_title": "Творчество & Выражение",
        "about_creativity_desc": "GlocalSpirit предлагает защищенные пространства для свободного развития, творческого потока и аутентичного самовыражения. То, что могло быть пережито как давление производительности, здесь может быть пережито как осязаемое, слышимое и ощутимое творчество.",
        "about_learning_title": "Обучение & Образование",
        "about_learning_desc": "GlocalSpirit воплощает новую форму обмена знаниями, основанную на резонансе, саморазвитии и внутренней согласованности. За пределами давления, оценки или фиксированных учебных планов.",
        "about_nature_title": "Природа & Устойчивость",
        "about_nature_desc": "GlocalSpirit напоминает нам о нашей изначальной связи с землей. Приглашает жить в гармонии с природными циклами, осознанно использовать ресурсы и создавать регенеративные формы жизни.",
        "about_spirituality_title": "Духовность & Мистицизм",
        "about_spirituality_desc": "Здесь встречаются традиции мудрости, вневременные символы и современные формы духовного пробуждения. Эта категория предлагает пространство для невыразимого. Будь то тишина за словами, глубина за пределами мышления или универсальная тайна, которая пронизывает все.",
        "about_technology_title": "Технология & Осознанность",
        "about_technology_desc": "GlocalSpirit соединяет кажущееся несовместимым: цифровой интеллект и духовную глубину. Технология не должна быть \"обесчеловечена\". Через осознанный дизайн технические элементы могут стать инструментами для мира, связи и внутреннего развития.",
        "beta_test": "Тестировать",
        "spenden": "Пожертвовать",
        "donation_success_title": "Спасибо за вашу поддержку!",
        "donation_success_msg": "Ваша подписка была успешно активирована. Вы получите подтверждающий email от нас в ближайшее время.",
        "donation_success_next": "Что происходит дальше?",
        "donation_success_email": "📧 Вы получите приветственный email со всеми деталями",
        "donation_success_help": "🎉 Ваш вклад помогает нам продвигать осознанную сеть",
        "donation_success_together": "🌱 Вместе мы создаем более осознанное будущее",
        "donation_success_info": "💫 Вы будете информированы о новых функциях и событиях",
        "testform_title": "Стать бета-тестером",
        "form_success": "Успешно зарегистрирован!",
        "testform_success_message": "Спасибо за регистрацию в качестве бета-тестера. Мы скоро свяжемся с вами!",
        "form_error": "Ошибка регистрации",
        "form_error_message": "Произошла ошибка. Пожалуйста, попробуйте снова.",
        "testform_name_label": "Имя *",
        "testform_email_label": "Email *",
        "testform_newsletter": "Получать обновления по email?",
        "testform_submit": "ОТПРАВИТЬ",
        "testform_sending": "ОТПРАВКА...",
        "donation_title": "Поддержать glocalSpirit - Пакеты подписки"
    },
    "sv": {
        "about_movement_title": "Rörelse & Flöde",
        "about_movement_desc": "Kropp, sinne och själ förbinds genom medvetna, kreativa och helande former av rörelse. Oavsett om det är genom yoga, dans, andningsarbete eller intuitiv kroppspraktik. GlocalSpirit inbjuder till att hitta en naturlig rytm och känna sig i harmoni med livet genom det.",
        "about_consciousness_title": "Medvetenhet",
        "about_consciousness_desc": "Medvetenhet visas inte genom kunskap eller koncept, utan genom sättet att vara. På GlocalSpirit handlar det om att agera och leva från en medveten attityd: närvarande, ansluten och i harmoni med det större hela.",
        "about_nutrition_title": "Bra produkter & Näring",
        "about_nutrition_desc": "GlocalSpirit står för medveten konsumtion, uppmärksam näring och näring för kropp, sinne och själ. Idealt sett är kvalitet, enkelhet och autenticitet hos produkter i harmoni med \"människa och natur\".",
        "about_healing_title": "Healing & Hälsa",
        "about_healing_desc": "På GlocalSpirit omfattar hälsa en holistisk approach till fysiskt, emotionellt och mentalt välbefinnande. Vi inbjuder dig att förstå healing som en naturlig process. Stödd av medvetenhet, gemenskap, anslutning till naturen och inre frid.",
        "about_hope_title": "Hus av Hopp",
        "about_hope_desc": "\"Hus av Hopp\" är levande platser för möten, healing och medskapande. De fungerar som andliga, sociala och kulturella utrymmen där människor kan samlas i andan av inre frid och synarki. \"Hus av Hopp\" är fysiska ankarpunkter inom GlocalSpirit-nätverket.",
        "about_creativity_title": "Kreativitet & Uttryck",
        "about_creativity_desc": "GlocalSpirit erbjuder skyddade utrymmen för fri utveckling, kreativt flöde och autentiskt självuttryck. Det som kanske tidigare upplevdes som prestationspress kan här upplevas som påtaglig, hörbar och kännbar kreativitet.",
        "about_learning_title": "Lärande & Utbildning",
        "about_learning_desc": "GlocalSpirit förkroppsligar en ny form av kunskapsutbyte baserad på resonans, själv-utveckling och inre sammanhang. Bortom press, utvärdering eller fasta läroplaner.",
        "about_nature_title": "Natur & Hållbarhet",
        "about_nature_desc": "GlocalSpirit påminner oss om vår ursprungliga anslutning till jorden. Det inbjuder oss att leva i harmoni med naturliga cykler, använda resurser medvetet och skapa regenerativa levnadssätt.",
        "about_spirituality_title": "Spiritualitet & Mystik",
        "about_spirituality_desc": "Här möts visdomstraditioner, tidlösa symboler och moderna former av andligt uppvaknande. Denna kategori erbjuder utrymme för det outsägliga. Vare sig det är för tystnaden bakom ord, djupet bortom tänkande eller det universella mysteriet som genomsyrar allt.",
        "about_technology_title": "Teknologi & Medvetenhet",
        "about_technology_desc": "GlocalSpirit förbinder det till synes oförenliga: digital intelligens och andlig djup. Teknologi behöver inte vara \"avhumaniserad\". Genom medveten design kan tekniska element bli verktyg för fred, anslutning och inre utveckling.",
        "beta_test": "Testa",
        "spenden": "Donera",
        "donation_success_title": "Tack för ditt stöd!",
        "donation_success_msg": "Din prenumeration har aktiverats framgångsrikt. Du kommer att få ett bekräftelse-email från oss inom kort.",
        "donation_success_next": "Vad händer härnäst?",
        "donation_success_email": "📧 Du kommer att få ett välkomstmail med alla detaljer",
        "donation_success_help": "🎉 Ditt bidrag hjälper oss att främja medveten nätverkande",
        "donation_success_together": "🌱 Tillsammans skapar vi en mer medveten framtid",
        "donation_success_info": "💫 Du kommer att informeras om nya funktioner och evenemang",
        "testform_title": "Bli beta-testare",
        "form_success": "Framgångsrikt registrerad!",
        "testform_success_message": "Tack för att du registrerar dig som beta-testare. Vi kommer att kontakta dig snart!",
        "form_error": "Registreringsfel",
        "form_error_message": "Ett fel uppstod. Vänligen försök igen.",
        "testform_name_label": "Namn *",
        "testform_email_label": "Email *",
        "testform_newsletter": "Ta emot uppdateringar via email?",
        "testform_submit": "SKICKA",
        "testform_sending": "SKICKAR...",
        "donation_title": "Stöd glocalSpirit - Prenumerationspaket"
    },
    "tr": {
        "about_movement_title": "Hareket & Akış",
        "about_movement_desc": "Beden, zihin ve ruh bilinçli, yaratıcı ve şifa verici hareket formları aracılığıyla bağlanır. Yoga, dans, nefes çalışması veya sezgisel beden pratiği yoluyla olsun. GlocalSpirit doğal bir ritim bulmaya ve bunun aracılığıyla yaşamla uyum içinde hissetmeye davet eder.",
        "about_consciousness_title": "Bilinç",
        "about_consciousness_desc": "Bilinç bilgi veya kavramlar aracılığıyla değil, var olma biçimi aracılığıyla gösterilir. GlocalSpirit'te bilinçli bir tutumla hareket etmek ve yaşamak söz konusudur: mevcut, bağlı ve daha büyük bütünle uyum içinde.",
        "about_nutrition_title": "İyi Ürünler & Beslenme",
        "about_nutrition_desc": "GlocalSpirit bilinçli tüketim, dikkatli beslenme ve beden, zihin ve ruh için besini temsil eder. İdeal olarak, ürünlerin kalitesi, sadeliği ve özgünlüğü \"insan ve doğa\" ile uyum içindedir.",
        "about_healing_title": "Şifa & Sağlık",
        "about_healing_desc": "GlocalSpirit'te sağlık, fiziksel, duygusal ve zihinsel refahın bütünsel bir yaklaşımını kapsar. Şifayı doğal bir süreç olarak anlamaya davet ediyoruz. Bilinç, topluluk, doğayla bağlantı ve iç huzur tarafından desteklenir.",
        "about_hope_title": "Umut Evleri",
        "about_hope_desc": "\"Umut Evleri\" karşılaşma, şifa ve ortak yaratımın yaşayan yerleridir. İç huzur ve sinarşi ruhunda insanların toplanabileceği ruhsal, sosyal ve kültürel alanlar olarak hizmet ederler. \"Umut Evleri\" GlocalSpirit ağı içindeki fiziksel çapa noktalarıdır.",
        "about_creativity_title": "Yaratıcılık & İfade",
        "about_creativity_desc": "GlocalSpirit özgür gelişim, yaratıcı akış ve otantik kendini ifade için korumalı alanlar sunar. Daha önce performans baskısı olarak yaşanmış olan şey, burada somut, işitilebilir ve hissedilebilir yaratıcılık olarak yaşanabilir.",
        "about_learning_title": "Öğrenme & Eğitim",
        "about_learning_desc": "GlocalSpirit rezonans, kendi kendini geliştirme ve iç tutarlılık temelli yeni bir bilgi alışverişi formunu somutlaştırır. Baskı, değerlendirme veya sabit müfredatların ötesinde.",
        "about_nature_title": "Doğa & Sürdürülebilirlik",
        "about_nature_desc": "GlocalSpirit bize toprakla olan orijinal bağlantımızı hatırlatır. Doğal döngülerle uyum içinde yaşamaya, kaynakları bilinçli kullanmaya ve yenileyici yaşam biçimleri yaratmaya davet eder.",
        "about_spirituality_title": "Maneviyat & Mistisizm",
        "about_spirituality_desc": "Burada bilgelik gelenekleri, zamansız semboller ve modern ruhsal uyanış biçimleri buluşur. Bu kategori söylenemez olan için alan sunar. Sözlerin arkasındaki sessizlik, düşüncenin ötesindeki derinlik veya her şeye nüfuz eden evrensel gizem için olsun.",
        "about_technology_title": "Teknoloji & Bilinç",
        "about_technology_desc": "GlocalSpirit görünüşte bağdaşmaz olanı bağlar: dijital zeka ve ruhsal derinlik. Teknolojinin \"insanlıktan çıkarılması\" gerekmez. Bilinçli tasarım aracılığıyla, teknik unsurlar barış, bağlantı ve iç gelişim için araçlar haline gelebilir.",
        "beta_test": "Test Et",
        "spenden": "Bağış Yap",
        "donation_success_title": "Desteğiniz için teşekkürler!",
        "donation_success_msg": "Aboneliğiniz başarıyla etkinleştirildi. Kısa süre içinde bizden bir onay e-postası alacaksınız.",
        "donation_success_next": "Sırada ne var?",
        "donation_success_email": "📧 Tüm ayrıntılarla birlikte bir hoş geldiniz e-postası alacaksınız",
        "donation_success_help": "🎉 Katkınız bilinçli ağ oluşturmayı teşvik etmemize yardımcı oluyor",
        "donation_success_together": "🌱 Birlikte daha bilinçli bir gelecek yaratıyoruz",
        "donation_success_info": "💫 Yeni özellikler ve etkinlikler hakkında bilgilendirileceksiniz",
        "testform_title": "Beta test kullanıcısı ol",
        "form_success": "Başarıyla kaydedildi!",
        "testform_success_message": "Beta test kullanıcısı olarak kaydolduğunuz için teşekkürler. Yakında sizinle iletişime geçeceğiz!",
        "form_error": "Kayıt hatası",
        "form_error_message": "Bir hata oluştu. Lütfen tekrar deneyin.",
        "testform_name_label": "İsim *",
        "testform_email_label": "E-posta *",
        "testform_newsletter": "E-posta ile güncelleme almak?",
        "testform_submit": "GÖNDER",
        "testform_sending": "GÖNDERİLİYOR...",
        "donation_title": "glocalSpirit'i Destekle - Abonelik Paketleri"
    },
    "pl": {
        "about_movement_title": "Ruch & Przepływ",
        "about_movement_desc": "Ciało, umysł i dusza łączą się poprzez świadome, kreatywne i uzdrawiające formy ruchu. Czy to przez jogę, taniec, pracę z oddechem czy intuicyjną praktykę cielesną. GlocalSpirit zaprasza do znalezienia naturalnego rytmu i poczucia harmonii z życiem przez to.",
        "about_consciousness_title": "Świadomość",
        "about_consciousness_desc": "Świadomość nie pokazuje się przez wiedzę czy koncepcje, ale przez sposób bycia. W GlocalSpirit chodzi o działanie i życie z świadomej postawy: obecnej, połączonej i w harmonii z większą całością.",
        "about_nutrition_title": "Dobre produkty & Odżywianie",
        "about_nutrition_desc": "GlocalSpirit reprezentuje świadomą konsumpcję, uważne odżywianie i pożywienie dla ciała, umysłu i duszy. Idealnie jakość, prostota i autentyczność produktów są w harmonii z \"człowiekiem i naturą\".",
        "about_healing_title": "Uzdrowienie & Zdrowie",
        "about_healing_desc": "W GlocalSpirit zdrowie obejmuje holistyczne podejście do dobrostanu fizycznego, emocjonalnego i mentalnego. Zapraszamy do rozumienia uzdrowienia jako naturalnego procesu. Wspieranego przez świadomość, społeczność, połączenie z naturą i wewnętrzny spokój.",
        "about_hope_title": "Domy Nadziei",
        "about_hope_desc": "\"Domy Nadziei\" to żywe miejsca spotkań, uzdrowienia i współtworzenia. Służą jako duchowe, społeczne i kulturalne przestrzenie, gdzie ludzie mogą się gromadzić w duchu wewnętrznego spokoju i synarchii. \"Domy Nadziei\" to fizyczne punkty zakotwiczenia w sieci GlocalSpirit.",
        "about_creativity_title": "Kreatywność & Wyrażanie",
        "about_creativity_desc": "GlocalSpirit oferuje chronione przestrzenie dla swobodnego rozwoju, kreatywnego przepływu i autentycznego wyrażania siebie. To, co mogło być doświadczane jako presja wydajności, może być tutaj doświadczane jako namacalna, słyszalna i odczuwalna kreatywność.",
        "about_learning_title": "Nauka & Edukacja",
        "about_learning_desc": "GlocalSpirit ucieleśnia nową formę wymiany wiedzy opartą na rezonansie, samorozwoju i wewnętrznej spójności. Poza presją, oceną czy stałymi programami nauczania.",
        "about_nature_title": "Natura & Zrównoważoność",
        "about_nature_desc": "GlocalSpirit przypomina nam o naszym pierwotnym połączeniu z ziemią. Zaprasza do życia w harmonii z naturalnymi cyklami, świadomego wykorzystywania zasobów i tworzenia regeneracyjnych sposobów życia.",
        "about_spirituality_title": "Duchowość & Mistycyzm",
        "about_spirituality_desc": "Tutaj spotykają się tradycje mądrości, ponadczasowe symbole i nowoczesne formy duchowego przebudzenia. Ta kategoria oferuje przestrzeń dla niewysłowionego. Czy to dla ciszy za słowami, głębi poza myśleniem czy uniwersalnej tajemnicy, która przenika wszystko.",
        "about_technology_title": "Technologia & Świadomość",
        "about_technology_desc": "GlocalSpirit łączy pozornie niekompatybilne: cyfrową inteligencję i duchową głębię. Technologia nie musi być \"odhumanizowana\". Poprzez świadomy design, elementy techniczne mogą stać się narzędziami dla pokoju, połączenia i wewnętrznego rozwoju.",
        "beta_test": "Testuj",
        "spenden": "Wpłać",
        "donation_success_title": "Dziękujemy za wsparcie!",
        "donation_success_msg": "Twoja subskrypcja została pomyślnie aktywowana. Wkrótce otrzymasz od nas email z potwierdzeniem.",
        "donation_success_next": "Co dalej?",
        "donation_success_email": "📧 Otrzymasz email powitalny ze wszystkimi szczegółami",
        "donation_success_help": "🎉 Twój wkład pomaga nam promować świadome networking",
        "donation_success_together": "🌱 Razem tworzymy bardziej świadomą przyszłość",
        "donation_success_info": "💫 Będziesz informowany o nowych funkcjach i wydarzeniach",
        "testform_title": "Zostań beta testerem",
        "form_success": "Pomyślnie zarejestrowany!",
        "testform_success_message": "Dziękujemy za rejestrację jako beta tester. Wkrótce się z Tobą skontaktujemy!",
        "form_error": "Błąd rejestracji",
        "form_error_message": "Wystąpił błąd. Spróbuj ponownie.",
        "testform_name_label": "Imię *",
        "testform_email_label": "Email *",
        "testform_newsletter": "Otrzymywać aktualizacje przez email?",
        "testform_submit": "WYŚLIJ",
        "testform_sending": "WYSYŁANIE...",
        "donation_title": "Wspierać glocalSpirit - Pakiety subskrypcji"
    },
    "el": {
        "about_movement_title": "Κίνηση & Ροή",
        "about_movement_desc": "Το σώμα, το μυαλό και η ψυχή συνδέονται μέσω συνειδητών, δημιουργικών και θεραπευτικών μορφών κίνησης. Είτε μέσω γιόγκα, χορού, αναπνευστικής εργασίας ή διαισθητικής σωματικής πρακτικής. Το GlocalSpirit προσκαλεί να βρείτε έναν φυσικό ρυθμό και να αισθανθείτε σε αρμονία με τη ζωή μέσω αυτού.",
        "about_consciousness_title": "Συνείδηση",
        "about_consciousness_desc": "Η συνείδηση δεν εκδηλώνεται μέσω της γνώσης ή των εννοιών, αλλά μέσω του τρόπου ύπαρξης. Στο GlocalSpirit, πρόκειται για δράση και ζωή από μια συνειδητή στάση: παρούσα, συνδεδεμένη και σε αρμονία με το μεγαλύτερο όλον.",
        "about_nutrition_title": "Καλά Προϊόντα & Διατροφή",
        "about_nutrition_desc": "Το GlocalSpirit αντιπροσωπεύει τη συνειδητή κατανάλωση, την προσεκτική διατροφή και την τροφή για το σώμα, το μυαλό και την ψυχή. Ιδανικά, η ποιότητα, η απλότητα και η αυθεντικότητα των προϊόντων είναι σε αρμονία με τον \"άνθρωπο και τη φύση\".",
        "about_healing_title": "Θεραπεία & Υγεία",
        "about_healing_desc": "Στο GlocalSpirit, η υγεία περιλαμβάνει μια ολιστική προσέγγιση στη σωματική, συναισθηματική και ψυχική ευημερία. Σας προσκαλούμε να κατανοήσετε τη θεραπεία ως μια φυσική διαδικασία. Υποστηριζόμενη από συνείδηση, κοινότητα, σύνδεση με τη φύση και εσωτερική ειρήνη.",
        "about_hope_title": "Σπίτια Ελπίδας",
        "about_hope_desc": "Τα \"Σπίτια Ελπίδας\" είναι ζωντανοί τόποι συνάντησης, θεραπείας και συν-δημιουργίας. Λειτουργούν ως πνευματικοί, κοινωνικοί και πολιτιστικοί χώροι όπου οι άνθρωποι μπορούν να συγκεντρωθούν με το πνεύμα της εσωτερικής ειρήνης και της συναρχίας. Τα \"Σπίτια Ελπίδας\" είναι φυσικά σημεία αγκύρωσης εντός του δικτύου GlocalSpirit.",
        "about_creativity_title": "Δημιουργικότητα & Έκφραση",
        "about_creativity_desc": "Το GlocalSpirit προσφέρει προστατευμένους χώρους για ελεύθερη ανάπτυξη, δημιουργική ροή και αυθεντική αυτο-έκφραση. Αυτό που θα μπορούσε να είχε βιωθεί ως πίεση απόδοσης, μπορεί εδώ να βιωθεί ως απτή, ακουστή και αισθητή δημιουργικότητα.",
        "about_learning_title": "Μάθηση & Εκπαίδευση",
        "about_learning_desc": "Το GlocalSpirit ενσωματώνει μια νέα μορφή ανταλλαγής γνώσης βασισμένη στον συντονισμό, την αυτο-ανάπτυξη και την εσωτερική συνοχή. Πέρα από την πίεση, την αξιολόγηση ή τα σταθερά προγράμματα σπουδών.",
        "about_nature_title": "Φύση & Βιωσιμότητα",
        "about_nature_desc": "Το GlocalSpirit μας θυμίζει την αρχική μας σύνδεση με τη γη. Μας προσκαλεί να ζούμε σε αρμονία με τους φυσικούς κύκλους, να χρησιμοποιούμε τους πόρους συνειδητά και να δημιουργούμε αναγεννητικούς τρόπους ζωής.",
        "about_spirituality_title": "Πνευματικότητα & Μυστικισμός",
        "about_spirituality_desc": "Εδώ συναντώνται παραδόσεις σοφίας, διαχρονικά σύμβολα και σύγχρονες μορφές πνευματικής αφύπνισης. Αυτή η κατηγορία προσφέρει χώρο για το αρρητο. Είτε για τη σιωπή πίσω από τις λέξεις, το βάθος πέρα από τη σκέψη ή το παγκόσμιο μυστήριο που διαπερνά τα πάντα.",
        "about_technology_title": "Τεχνολογία & Συνείδηση",
        "about_technology_desc": "Το GlocalSpirit συνδέει το φαινομενικά ασυμβίβαστο: ψηφιακή νοημοσύνη και πνευματικό βάθος. Η τεχνολογία δεν χρειάζεται να είναι \"απανθρωποποιημένη\". Μέσω συνειδητού σχεδιασμού, τα τεχνικά στοιχεία μπορούν να γίνουν εργαλεία για ειρήνη, σύνδεση και εσωτερική ανάπτυξη.",
        "beta_test": "Δοκιμή",
        "spenden": "Δωρεά",
        "donation_success_title": "Ευχαριστούμε για την υποστήριξή σας!",
        "donation_success_msg": "Η συνδρομή σας ενεργοποιήθηκε επιτυχώς. Θα λάβετε email επιβεβαίωσης από εμάς σύντομα.",
        "donation_success_next": "Τι συμβαίνει μετά;",
        "donation_success_email": "📧 Θα λάβετε email καλωσορίσματος με όλες τις λεπτομέρειες",
        "donation_success_help": "🎉 Η συνεισφορά σας μας βοηθά να προωθήσουμε τη συνειδητή δικτύωση",
        "donation_success_together": "🌱 Μαζί δημιουργούμε ένα πιο συνειδητό μέλλον",
        "donation_success_info": "💫 Θα ενημερώνεστε για νέα χαρακτηριστικά και εκδηλώσεις",
        "testform_title": "Γίνετε beta tester",
        "form_success": "Επιτυχής εγγραφή!",
        "testform_success_message": "Ευχαριστούμε που εγγραφήκατε ως beta tester. Θα επικοινωνήσουμε μαζί σας σύντομα!",
        "form_error": "Σφάλμα εγγραφής",
        "form_error_message": "Προέκυψε σφάλμα. Παρακαλώ δοκιμάστε ξανά.",
        "testform_name_label": "Όνομα *",
        "testform_email_label": "Email *",
        "testform_newsletter": "Λήψη ενημερώσεων μέσω email;",
        "testform_submit": "ΑΠΟΣΤΟΛΗ",
        "testform_sending": "ΑΠΟΣΤΟΛΗ...",
        "donation_title": "Υποστηρίξτε το glocalSpirit - Πακέτα συνδρομής"
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

print("All remaining files updated successfully!")
