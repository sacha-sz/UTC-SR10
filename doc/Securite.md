# Rapport de sécurité

Dans ce rapport, nous mettons en évidence trois vulnérabilités de sécurité spécifiques qui ont été identifiées et corrigées. 
## I. Injection SQL

L'injection SQL est une vulnérabilité courante dans les applications web qui permet à un attaquant d'insérer du code SQL malveillant dans une requête SQL. Pour évaluer si notre application est vulnérable à ce type d'attaque, nous avons effectué les tests ci-dessous :

Analyse des requêtes SQL pour détecter les vulnérabilités d'injection SQL :
Nous avons examiné les requêtes SQL utilisées dans notre application afin d'identifier les points où des entrées utilisateur sont incorporées directement dans la requête sans être correctement validées ou échappées. Nous avons recherché des signes de concaténation de chaînes de caractères sans traitement approprié des caractères spéciaux potentiellement dangereux.


Protection aux injections SQL en utilisant les "?" dans les requêtes :
Nous avons modifié les requêtes SQL pour utiliser des paramètres dynamiques marqués par des "?" dans la requête, et les valeurs correspondantes sont fournies séparément. Par exemple, nous avons modifié la requête de suppression comme suit :

Ancienne requête :
```js
db.query("DELETE FROM Organisation WHERE siren =" + siren + ";", function (err, results)
    // ...
);
```
Nouvelle requête sécurisée :
```js
db.query("DELETE FROM Organisation WHERE siren = ?;", [siren], function (err, results)
    // ...
);
```

Cette modification permet d'éviter les injections SQL en s'assurant que les valeurs externes sont traitées comme des données et non comme des parties intégrantes de la requête SQL.

En d'autres termes, si un attaquant tente d'injecter du code SQL malveillant en exploitant les entrées utilisateur, les paramètres dynamiques garantissent que les valeurs sont correctement encapsulées et ne peuvent pas modifier la structure de la requête.

Cette méthode de protection est appliquée à toutes les requêtes SQL que notre projet.

En mettant en œuvre cette modification, nous avons renforcé la sécurité de notre application en prévenant efficacement les attaques d'injection SQL.

## II. Authentification

L'authentification sécurisée est d'une importance capitale pour toute application en ligne, car elle constitue la première ligne de défense contre les attaques malveillantes. Les attaques par force brute sont l'une des méthodes les plus courantes utilisées par les attaquants pour accéder illégalement à des comptes d'utilisateurs. Ces attaques consistent à essayer de deviner un mot de passe en essayant différentes combinaisons de caractères, souvent à l'aide de logiciels automatisés.  


Pour remédier aux vulnérabilités identifiées lors de l'authentification, nous avons mis en place la mesure de protection suivante :  

Empêcher les attaques par force brute lors de l'authentification en bloquant l'utilisateur après un certain nombre de tentatives infructueuses :
Nous avons ajouté une fonctionnalité de blocage pour empêcher les attaques par force brute lors du processus d'authentification. Lorsque l'utilisateur entre plusieurs fois un mot de passe incorrect, il devient bloqué pendant un certain temps et doit attendre avant de pouvoir effectuer une nouvelle tentative de connexion.

Ce mécanisme fonctionne avec les étapes suivantes :

1. On si toutes les données d'authentification (email et mot de passe) sont correctement renseignées. Si des données sont manquantes, l'utilisateur est redirigé vers la page de connexion avec un message d'erreur approprié.

2. On vérifie si l'utilisateur a dépassé le nombre de tentatives de connexion autorisées. Si c'est le cas, on vérifie également si l'utilisateur doit encore attendre avant de pouvoir effectuer une nouvelle tentative en vérifiant si le temps de blocage (connexion_possible) est supérieur à l'heure actuelle.

3. Si l'utilisateur est bloqué, on lui indique le temps restant avant de pouvoir réessayer (tempsRestant) et le redirigeons vers la page de connexion.

4. Si l'utilisateur n'est pas bloqué, on vérifie des informations d'identification en utilisant la fonction areValid_login().

5. Si les informations d'identification sont valides, l'utilisateur est considéré comme connecté avec succès. On définit les variables de session appropriées (loggedin, username, failedAttempts, connexion_possible, type_user) et on le redirige vers la page principale de l'application.

6. Si les informations d'identification sont incorrectes, on incrémente le compteur de tentatives échouées (failedAttempts) et on définis le temps de la dernière tentative (lastAttemptTime). Ensuite, on calcule le temps de blocage supplémentaire en fonction du nombre de tentatives infructueuses précédentes et le on stocke dans la variable connexion_possible. Si le nombre de tentatives échouées dépasse 2, nous affichons le temps restant avant de pouvoir réessayer (tempsRestant) et redirigeons l'utilisateur vers la page de connexion.


Ce correctif, nous a permis de renforcer la sécurité de notre application en contrant les attaques par force brute lors du processus d'authentification. En bloquant temporairement les utilisateurs après un certain nombre de tentatives infructueuses, nous limitons les possibilités d'un attaquant de deviner un mot de passe en effectuant de multiples essais.  


## III. Vérification des accès

Pour cette dernière vulnérabilité, nous avons réalisé une vérification des accès dans notre application afin de garantir que les utilisateurs ne puissent pas accéder aux pages administratives ou recruteur s'ils ne possèdent pas les droits appropriés. Pour ce faire, nous avons mis en place les fonctions suivantes :


```js
function checkRecruteur(req, res, next) {
    if (req.session.type_user == "RECRUTEUR") {
        next();
    } else {
        res.redirect('/');
    }
}

function checkCandidat(req, res, next) {
    if (req.session.type_user == "CANDIDAT") {
        next();
    } else {
        res.redirect('/');
    }
}
```

Ces fonctions sont utilisées pour vérifier les autorisations d'accès dans les différentes routes de notre application. Par exemple, dans le code ci-dessous, nous utilisons la fonction checkRecruteur pour vérifier si l'utilisateur possède le type d'utilisateur "RECRUTEUR" avant de lui permettre d'accéder à la page "liste_candidat".


```js
router.get('/liste_candidat/:id', checkRecruteur, function (req, res, next) {
    if (req.session.loggedin) {
        // Récupérer les candidats sur une offre
        candidatureModel.getInfoCandidature(req.params.id, function (err, result) {
            if (result) {
                // console.log(result);
                res.render('liste_candidat', {
                    title: 'Candidatures',
                    username: req.session.username,
                    type_user: req.session.type_user,
                    id: req.params.id, 
                    candidats: result
                }); 
            } else {
                res.status(500).send('Une erreur s\'est produite lors de la récupération des candidatures');
            }
        });
    } else {
        res.redirect('/login');
    }
});
```

Dans cet exemple, si l'utilisateur est connecté et possède le type d'utilisateur "RECRUTEUR", il sera autorisé à accéder à la page "liste_candidat" pour consulter les candidatures associées à une offre spécifique. Sinon, s'il ne possède pas les droits requis, il sera redirigé vers la page principale de l'application.

Cette vérification des accès permet de restreindre l'accès aux fonctionnalités réservées aux utilisateurs ayant les autorisations appropriées, et renforce la sécurité et la protection des données sensibles.  