export const steps = [
    // SECTION 1: INTRODUCTION & BASICS
    {
        id: 'project_name',
        category: 'Introduction',
        question: 'Quel est le nom de votre projet de site web ?',
        type: 'text',
        placeholder: 'Ex: Ma Super Boutique'
    },
    {
        id: 'client_name',
        category: 'Introduction',
        question: 'Comment vous appelez-vous ?',
        type: 'text',
        placeholder: 'Votre prénom et nom'
    },
    {
        id: 'site_type',
        category: 'Introduction',
        question: 'Quel type de site souhaitez-vous ?',
        description: 'Le **type de site** définit la structure technique :\n- **Vitrine** : Pour présenter une entreprise.\n- **E-commerce** : Pour vendre des produits en ligne.\n- **Portfolio** : Pour afficher vos créations.',
        type: 'select',
        options: ['Vitrine', 'E-commerce', 'Blog', 'Portfolio', 'Application Web', 'Autre']
    },
    {
        id: 'primary_goal',
        category: 'Objectifs',
        question: 'Quel est l\'objectif principal du site ?',
        type: 'radio',
        options: ['Vendre des produits', 'Générer des leads', 'Informer', 'Présenter des travaux', 'Communautaire']
    },

    // SECTION 2: AUDIENCE
    {
        id: 'target_audience_age',
        category: 'Audience Cible',
        question: 'Quelle est la tranche d\'âge de votre public cible ?',
        type: 'checkbox',
        options: ['< 18 ans', '18-25 ans', '26-40 ans', '41-60 ans', '60+ ans']
    },
    {
        id: 'target_audience_gender',
        category: 'Audience Cible',
        question: 'Le site s\'adresse-t-il à un genre particulier ?',
        type: 'radio',
        options: ['Hommes', 'Femmes', 'Mixte']
    },

    // SECTION 3: DESIGN & STYLE
    {
        id: 'design_vibe',
        category: 'Design & Style',
        question: 'Quelle ambiance souhaitez-vous transmettre ?',
        type: 'slider', // scale 1-5 from Serious to Playful
        labels: ['Sérieux/Pro', 'Ludique/Fun']
    },
    {
        id: 'design_style',
        category: 'Design & Style',
        question: 'Quel style graphique préférez-vous ?',
        type: 'choices_with_icons',
        options: ['Minimaliste', 'Coloré', 'Sombre/Dark', 'Luxe/Premium', 'Retro/Vintage']
    },
    {
        id: 'primary_color',
        category: 'Couleurs',
        question: 'Quelle est la couleur dominante souhaitée ?',
        type: 'color',
        default: '#3b82f6'
    },
    {
        id: 'secondary_color',
        category: 'Couleurs',
        question: 'Avez-vous une couleur secondaire ?',
        type: 'color',
        default: '#ec4899'
    },
    {
        id: 'font_preference',
        category: 'Typographie',
        question: 'Préférence pour la police d\'écriture ?',
        type: 'radio',
        options: ['Sans-serif (Moderne)', 'Serif (Classique)', 'Monospace (Technique)', 'Manuscrite (Créatif)']
    },

    // SECTION 4: STRUCTURE
    {
        id: 'layout_preference',
        category: 'Mise en page',
        question: 'Quel type de mise en page préférez-vous ?',
        type: 'radio',
        options: ['Pleine largeur', 'Encadré', 'Asymétrique', 'Grille stricte']
    },
    {
        id: 'menu_style',
        category: 'Navigation',
        question: 'Quel style de menu imaginez-vous ?',
        type: 'radio',
        options: ['Menu en haut classique', 'Menu burger (Mobile style)', 'Menu latéral gauche', 'Menu sticky (reste affiché)']
    },

    // SECTION 5: PAGES
    {
        id: 'pages_needed',
        category: 'Contenu',
        question: 'Quelles pages sont indispensables ?',
        type: 'checkbox',
        options: ['Accueil', 'À propos', 'Services/Produits', 'Blog/Actualités', 'Contact', 'FAQ', 'Témoignages', 'Mentions légales']
    },
    {
        id: 'has_blog',
        category: 'Contenu',
        question: 'Comptez-vous publier des articles régulièrement ?',
        type: 'boolean'
    },

    // SECTION 6: FEATURES
    {
        id: 'features_social',
        category: 'Fonctionnalités',
        question: 'Intégration des réseaux sociaux ?',
        type: 'checkbox',
        options: ['Instagram feed', 'Facebook like', 'Liens simples', 'Partage d\'articles']
    },
    {
        id: 'features_contact',
        category: 'Fonctionnalités',
        question: 'Comment les utilisateurs vous contacteront-ils ?',
        type: 'checkbox',
        options: ['Formulaire de contact', 'Téléphone cliquable', 'Chat en direct', 'Prise de RDV en ligne']
    },
    {
        id: 'features_auth',
        category: 'Fonctionnalités',
        question: 'Les utilisateurs doivent-ils se connecter ?',
        type: 'boolean'
    },
    {
        id: 'features_multilingual',
        category: 'Fonctionnalités',
        question: 'Le site doit-il être multilingue ?',
        type: 'boolean'
    },

    // SECTION 7: CONTENT ASSETS
    {
        id: 'assets_logo',
        category: 'Ressources',
        question: 'Avez-vous déjà un logo ?',
        description: 'Un logo **vectoriel** (format .SVG, .AI) est idéal pour une qualité parfaite sur tous les écrans.',
        type: 'radio',
        options: ['Oui, vectoriel', 'Oui, image simple', 'Non, à créer', 'Non, pas besoin']
    },
    {
        id: 'assets_images',
        category: 'Ressources',
        question: 'Avez-vous des photos professionnelles ?',
        type: 'radio',
        options: ['Oui', 'Non, j\'utiliserai des banques d\'images', 'Non, il faut un photographe']
    },
    {
        id: 'assets_text',
        category: 'Ressources',
        question: 'Qui rédigera les textes ?',
        type: 'radio',
        options: ['Moi-même', 'Un professionnel', 'À définir']
    },

    // SECTION 8: TECHNICAL
    {
        id: 'domain_name',
        category: 'Technique',
        question: 'Avez-vous déjà réservé un nom de domaine ?',
        type: 'radio',
        options: ['Oui', 'Non', 'Je ne sais pas ce que c\'est']
    },
    {
        id: 'hosting',
        category: 'Technique',
        question: 'Avez-vous un hébergement ?',
        description: 'L\'**hébergement** est l\'endroit où sont stockés les fichiers de votre site pour qu\'il soit accessible sur Internet (ex: *OVH*, *Hostinger*, *Vercel*).',
        type: 'radio',
        options: ['Oui', 'Non', 'À vous de gérer']
    },

    // SECTION 9: FINAL DETAILS
    {
        id: 'competitors',
        category: 'Divers',
        question: 'Avez-vous des concurrents ou sites modèles ?',
        type: 'textarea',
        placeholder: 'Listez quelques liens...'
    },
    {
        id: 'deadline',
        category: 'Projet',
        question: 'Quelle est la date limite souhaitée ?',
        type: 'date'
    },
    {
        id: 'budget',
        category: 'Projet',
        question: 'Quel est votre budget estimé ?',
        type: 'select',
        options: ['< 500€', '500€ - 1500€', '1500€ - 3000€', '3000€+', 'À discuter']
    },
    {
        id: 'comments',
        category: 'Conclusion',
        question: 'D\'autres remarques ou besoins spécifiques ?',
        type: 'textarea',
        placeholder: 'Dites-nous tout...'
    }
];
