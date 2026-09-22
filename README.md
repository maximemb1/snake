# Snake

Jeu de Snake développé en JavaScript vanilla et jouable dans un navigateur. Le serpent se déplace sur une grille, mange des pommes, gagne des points et de l'or, puis peut utiliser ses gains pour débloquer des apparences dans le magasin.

## Fonctionnalités

- Trois modes de jeu : `Normal`, `Infini` et `Hard`.
- Pommes normales, dorées et noires avec des effets différents.
- Score, nombre de pommes mangées et longueur du serpent.
- Pause avec la barre espace ou le bouton pause.
- Contrôles au clavier, boutons tactiles et gestes sur le canvas mobile.
- Contrôles inversables dans les paramètres.
- Magasin avec des skins pour le corps, les dents, les yeux et les effets.
- Progression sauvegardée automatiquement dans le `localStorage` du navigateur.

## Lancer le jeu

Aucune dépendance ni compilation n'est nécessaire.

##  Jouer

👉 [Jouer à Snake](https://maximemb1.github.io/snake/)

### Clavier

Utilisez les flèches directionnelles pour déplacer le serpent. Appuyez sur `Espace` pour mettre la partie en pause.

Sur un écran tactile, les boutons directionnels peuvent être activés dans les paramètres. Les gestes de balayage directement sur le canvas sont également pris en charge.

### Modes

| Mode | Pommes au départ | Vitesse |
| --- | ---: | ---: |
| Normal | 5 | 2 |
| Infini | 20 | 2 |
| Hard | 2 | 4 |

Les pommes normales rapportent des points et agrandissent le serpent. Les pommes dorées rapportent davantage, tandis que les pommes noires retirent des points, de l'or et de la longueur.

## Progression

L'or gagné pendant les parties sert à acheter et équiper des skins dans le magasin. Les paramètres, les skins achetés, le skin équipé et les statistiques sont enregistrés automatiquement dans le navigateur sous la clé `save_snake`.

Pour réinitialiser la progression, supprimez les données de stockage local du site depuis les outils de développement du navigateur.

## Structure du projet

```text
.
├── index.html          # Structure des écrans du jeu
├── js/
│   ├── main.js         # Boucle de jeu et gestion des parties
│   ├── Snake.js        # Serpent, déplacements et collisions
│   ├── Pommes.js       # Pommes, gains et génération
│   ├── input.js        # Clavier, tactile et pause
│   ├── interface.js    # Menus, paramètres et affichage
│   ├── shop.js         # Magasin et skins
│   ├── variable.js     # État global, canvas et sauvegarde
│   └── succes.js       # Prévu pour les succès
└── style/
	└── style.css       # Mise en forme
```

## Technologies

- HTML5
- CSS3
- JavaScript vanilla
- Canvas 2D
- `localStorage`
