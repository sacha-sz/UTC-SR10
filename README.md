# UTC-SR10

## Explication du projet
Le projet SR10 est un projet visant la création d'un site web pour la gestion des demandes d'embauche dans une entreprise.
Nous avons travaillé sur la gestion d'offre d'emplois, la candidature et la gestion des candidatures.
Nous avons également mis en place une section administrateur.

## Organisation du projet
- **assets** : contient les images des diagrammes et les futures images du site web
- **doc** : contient les documents du projet : maquettes, sujet, MCD, MLD, ainsi que le rapport de sécurité présentant 3 failles que nous avons évitées
- **src** : contient le code initial de notre projet :
  - **src/JS** : contient les fichiers JavaScript
  - **src/HMTL** : contient les fichiers HTML
  - **src/SQL** : contient les fichiers SQL de backup
- **myapp** : contient le code Node de notre projet :
  - **myapp/CSS**
  - **myapp/JobHub** : contient le contenu VueJs
  - **myapp/mesfichiers** : contient les différents CV, LM et autres fichiers déposé par les utilisateurs
  - **myapp/model** : contient la partie Modèle de notre application
  - **myapp/public** : contient les images présentes sur le site
  - **myapp/routes** : contient la partie Contrôleur (par l'utilisation de route) de notre application
  - **myapp/views** : contient la partie Vue de notre application

## Arborescence
```
.
├── README.md
├── LICENSE
├── .gitignore
├── SR10
├── doc
│   ├── MCD
│   │   ├── MCD.puml
│   │   └── MCD.png
│   ├── MLD
│   │   ├── MLD.plantuml
│   │   └── MLD.png
│   ├── Usecase
│   │   ├── UseCase.pu
│   │   └── UseCase.png
│   ├── Heures.md
│   ├── Maquette_SR10.pdf
│   └── Securite.md
├── myapp
│   ├── bin
│   │   └── www
│   ├── coverage
│   │   └── ...
│   ├── CSS
│   │   ├── 404.css
│   │   ├── connexion.css
│   │   ├── global.css
│   │   ├── inscription.css
│   │   └── utilisateur.css
│   ├── JobHub (TD Sur Vue.js)
│   │   └── ...
│   ├── mesfichiers
│   │   ├── email-TypeFichier-IdOffre.pdf
│   │   ├── Pierre@gmail.com-LM-1.pdf
│   │   └── Pierre@gmail.com-CV-1.pdf
│   ├── model
│   │   ├── Admin.js
│   │   ├── Candidature.js
│   │   └── ...
│   ├── node_modules
│   │   └── ...
│   ├── public
│   │   ├── IMG
│   │   │   └── yoda.png
│   │   └── ...
│   ├── routes
│   │   ├── admin.js
│   │   ├── api.js
│   │   └── ...
│   ├── test
│   │   ├── hello.test.js
│   │   ├── Route_entreprise.test.js
│   │   └── Unit_Utilisateur.test.js
│   ├── views
│   │   ├── partials
│   │   │   ├── footer.ejs
│   │   │   ├── head.ejs
│   │   │   └── header.ejs
│   │   ├── 404.ejs
│   │   ├── a_propos.ejs
│   │   └── ...
│   ├── app.js
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json
│   └── serveur.js
└── src
    ├── CSS
    │   └── X.css
    ├── HTML
    │   ├── X.html
    │   └── Y.html
    └── JS
        └── X.js

...
```

## Collaborateurs
- [sacha-sz](github.com/sacha-sz)
- [Tobias](github.com/TobiasInfo)
