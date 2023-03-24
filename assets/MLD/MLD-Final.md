# MLD final du projet

Ce fichier contient la dernière version du MLD du projet.

```
ETAT : enum{'Acceptee', 'Refusee', 'En attente', 'En cours'}
ETAT_OFFRE : enum{'Publiee', 'Expiree', 'Non publiee'}
SEXE : enum{'Homme', 'Femme', 'Autre'}
STATUT_UTILISATEUR : enum{'Actif', 'Inactif'}
TYPE_FORMULAIRE : enum{'Ajout organisation', 'Rejoindre organisation'}
TYPE_ORGANISATION : enum{'Association', 'EURL', 'SARL', 'SASU', 'Autre'}
TYPE_UTILISATEUR : enum{'Administrateur', 'Candidat', 'Recruteur'}
TYPE_PIECE : enum{'CV', 'Lettre de motivation', 'ID', 'Autre'}

Utilisateur(#email : string, password : hash, nom : string, prenom : string, date_naissance : date, date_creation : date, sexe : SEXE, type_utilisateur : TYPE_UTILISATEUR, statut : STATUT_UTILISATEUR)

Formulaire(#id : int, etat : ETAT, type_formulaire : TYPE_FORMULAIRE, date_creation : date, email_utilisateur : string => Utilisateur.email, siren_orga=>Organisation.siren)
Organisation(#siren : string, nom : string, siege_social : string, type : TYPE_ORGANISATION)

Candidature(#id : int, date_candidature : date, etat : ETAT, statut : STATUT_UTILISATEUR, email_utilisateur : string => Utilisateur.email, id_offre : int => Offre_d_emploi.id)
Pieces_jointes(#id : int, nom : string, lin : string, type : TYPE_PIECE, id_candidature : int => Candidature.id)
Offre_d_emploi(#id : int, indication : string, nombre_de_piece : unsigned int, etat : ETAT_OFFRE, id_poste : int => Fiche_poste.id)
Fiche_poste(#numero : int, intitule : string, statut_poste : string, responsable_hierarchique : string, type_metier : string, lieu_mission : string, rythme : string, fourchette_salaire : double[2])
Description(#numero : int, missions : string, acrtivités : string, competences_attendues : string)
```

Contraintes :
- Tout attribut est considéré comme NOT NULL
- Un utilisateur ne peut pas être candidat et recruteur en même temps
- Un utilisateur ne peut pas candidater à une offre d'emploi à laquelle il a déjà postulé