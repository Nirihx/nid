# Maison A.Goichot

## Guide d'utilisation

* Cloner & télécharger le paquet Git repo dans voter PC.
* Installer [Node.js](https://nodejs.org/).
* instaler le package `npm install gulp -g`  
* executer `npm install` pour instaler Les dépendances
* executer `gulp` pour les tâche par default

## Dans cette projet, Gulp est configurer pour executer les fonctions suivant: 

* Compile les fichier SCSS vers CSS
* Autoprefixer & minifier le fichier CSS
* Fusionner & minifier les fichiers js 
* Créer & ajouter les fichiers compliler dans `/dist`

## Option facultatif
* pour compiler les fichier sass/scss avec dartsass
`sass --watch src/scss/style.scss:dist/css/style.css --style compressed`

