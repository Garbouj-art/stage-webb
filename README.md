# Projet Stage - Concepteur de Site Web Interactif

## Description
Ce projet est une application web développée avec **Next.js** permettant de recueillir les besoins d'un client pour la création d'un site web. Il guide l'utilisateur à travers un processus interactif de plus de 25 étapes ("Wizard") pour définir l'identité visuelle, les fonctionnalités et le contenu de leur futur site.

## Fonctionnalités Clés
- **Interface Immersive** : Design "Glassmorphism" moderne et animations fluides (Framer Motion).
- **Parcours en Étapes** : Plus de 25 questions structurées par catégories (Design, Technique, Contenu...).
- **Sauvegarde Automatique** : La progression est sauvegardée en local (LocalStorage). L'utilisateur peut quitter et reprendre plus tard où il s'est arrêté.
- **Récapitulatif** : Vue d'ensemble des réponses à la fin du formulaire.

## Technologies Utilisées
- **Framework** : Next.js 16 (App Router)
- **Langage** : JavaScript (React)
- **Styling** : CSS Modules & Variables CSS (Design personnalisé sans framework CSS lourd)
- **Animations** : Framer Motion
- **Icônes** : Lucide React

## Installation
1. `npm install`
2. `npm run dev`
3. Ouvrir `http://localhost:3000`

## Structure du Projet
- `src/data/steps.js` : Configuration de toutes les questions.
- `src/components/Wizard/` : Logique du formulaire.
- `src/hooks/useLocalStorage.js` : Gestion de la persistance des données.
