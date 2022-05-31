# My Pokédex
Un pokédex complètement personnalisable où vous pouvez ajouter et gérez vos propres pokémons ! Projet réalisé dans le cadre du cours Fullstack Developpement React.

## Fonctionnalités
- Utilisation du framework TailwindCSS pour la réalisation du frontend
- Prendre la vraie liste de pokémons en communiqueant avec une API ([pokapi.co](https://pokeapi.co))
- Mettre vos propres pokémons customisés dans la liste
- Système de listing de pokémons par page (par 50) à la fois
- Retirer n'importe quel pokémon de votre liste
- Générer des pokémons à l'infini (dans la limite du possible) depuis l'API grâce au bouton "Load more pokémons"
- Enregistrer les données dans le localStorage pour ne pas perdre les données en fin de session
- Ajout des animations, un auto scroll et d'un fond animé dans le thème
- Changement de thème entre rouge et jaune
- Tests unitaires avec JEST pour tester des éléments visuels du frontend

## Groupe
- Eray OZDEMIR
- Rayane KETTANI
- Alexis TARDIF
en E3 DAD A

## Difficultés rencontrés
- Extraction des données depuis l'API qui retourne trop de données et de façon complexe au vue de la diversité de l'univers Pokémon
- Assurer que le state assigne bien les données enregistrés dans le localStorage pour éviter de redemander de nouvelles infos à l'API
- Le filtrage des pokémons customisés

