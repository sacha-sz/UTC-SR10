-- Date: 2023-03-31 18:46:00
-- Author: Tobias Savary; Sacha-sz; 
-- Description: Insertion d'informations dans les tables de la base de données

-- OK Ajouter un statut de poste
INSERT INTO Statut_poste (nom, description) VALUES
('CDI', 'Contrat à durée indéterminée'),
('CDD', 'Contrat à durée déterminée'),
('CTT', 'Contrat de travail temporaire'),
('Interim', 'Travail temporaire effectué par une agence de travail temporaire'),
('Apprentissage', 'Contrat de travail en alternance pour préparer un diplôme ou un titre professionnel'),
('Professionnalisation', 'Contrat de travail en alternance pour acquérir une qualification professionnelle'),
('Stage', "Période d'observation et de mise en pratique en entreprise"),
('Volontariat', "Engagement bénévole au service d'une association ou d'une collectivité"),
('Freelance', 'Professionnel indépendant prestataire de services pour une entreprise'),
('Portage salarial', "Forme d'emploi associant l'autonomie du travailleur indépendant et la sécurité du salariat"),
('Contrat unique', 'Contrat qui regroupe les différents types de contrats précaires'),
('Auto-entrepreneur', 'Statut permettant de créer facilement une entreprise individuelle'),
('Indépendant', 'Professionnel exerçant son activité de manière indépendante'),
('Gérant majoritaire', "Dirigeant et associé majoritaire d'une entreprise individuelle"),
('Gérant minoritaire', "Dirigeant et associé minoritaire d'une entreprise"),
('Associé', "Membre d'une société ayant apporté des fonds ou des biens pour sa constitution"),
('Actionnaire', "Personne détenant des actions d'une société"),
('Administrateur', "Membre du conseil d'administration d'une entreprise");




-- OK
INSERT INTO Type_metier (nom, description)
VALUES
('Informatique', "Métiers liés à l'informatique et à l'informatisation"),
('Enseignement', "Métiers liés à l'enseignement et la formation"),
('Santé', 'Métiers liés à la santé et aux soins');
INSERT INTO Type_metier (nom, description) VALUES 
('Ingénieur informatique', 'Développement logiciel'),
('Développeur Web', 'Conception de sites web'),
('Designer graphique', 'Conception d''éléments graphiques'),
('Analyste financier', 'Analyse financière'),
('Gestionnaire de projet', 'Gestion de projets'),
('Commercial', 'Vente et négociation'),
('Architecte', 'Conception de bâtiments'),
('Chef cuisinier', 'Préparation de repas'),
('Avocat', 'Droit et conseil juridique'),
('Médecin', 'Pratique médicale'),
('Pharmacien', 'Distribution de médicaments'),
('Journaliste', 'Écriture et recherche d''information'),
('Artiste peintre', 'Peinture et dessin'),
('Mécanicien automobile', 'Réparation et entretien de voitures'),
('Charpentier', 'Construction de structures en bois'),
('Électricien', 'Installation et maintenance électrique'),
('Plombier', 'Installation et maintenance de la plomberie'),
('Couturier', 'Conception et réalisation de vêtements'),
('Coiffeur', 'Coupe et coiffure'),
('Pâtissier', 'Conception de pâtisseries et de desserts');


-- Ajouter un utilisateur OK
INSERT INTO Utilisateur (email, password, nom, prenom, date_naissance, date_creation, statut, telephone, adresse_utilisateur_lat, adresse_utilisateur_long, sexe, type_utilisateur)
VALUES ('john.doe@gmail.com', 'motdepasse', 'Doe', 'John', '1990-01-01', '2021-01-01', true, '0601020304', 48.8566, 2.3522, 'HOMME', 'CANDIDAT');

INSERT INTO Utilisateur (email, password, nom, prenom, date_naissance, date_creation, statut, telephone, adresse_utilisateur_lat, adresse_utilisateur_long, sexe, type_utilisateur)
VALUES
('alice@gmail.com', 'alice123', 'Dupont', 'Alice', '1995-07-12', '2020-01-01', true, '0645678923', 48.8534, 2.3488, 'FEMME', 'CANDIDAT'),
('bob@gmail.com', 'bob123', 'Martin', 'Bob', '1992-02-22', '2020-01-02', true, '0654321876', 48.8566, 2.3522, 'HOMME', 'CANDIDAT'),
('carla@gmail.com', 'carla123', 'Garcia', 'Carla', '1991-09-17', '2020-01-03', true, '0678901234', 45.7640, 4.8357, 'FEMME', 'CANDIDAT'),
('david@gmail.com', 'david123', 'Nguyen', 'David', '1988-11-23', '2020-01-04', true, '0689567123', 43.6047, 1.4442, 'HOMME', 'CANDIDAT'),
('emilie@gmail.com', 'emilie123', 'Rousseau', 'Emilie', '1990-04-30', '2020-01-05', true, '0698765432', 48.1173, -1.6778, 'FEMME', 'CANDIDAT'),
('francois@gmail.com', 'francois123', 'Dupuis', 'Francois', '1992-12-17', '2020-01-06', true, '0632456789', 50.6311, 3.0128, 'HOMME', 'CANDIDAT'),
('gaelle@gmail.com', 'gaelle123', 'Lecomte', 'Gaelle', '1993-06-21', '2020-01-07', true, '0667891234', 47.2184, -1.5536, 'FEMME', 'CANDIDAT'),
('henri@gmail.com', 'henri123', 'Girard', 'Henri', '1995-01-29', '2020-01-08', true, '0612345678', 44.8378, -0.5792, 'HOMME', 'CANDIDAT'),
('isabelle@gmail.com', 'isabelle123', 'Mercier', 'Isabelle', '1994-08-08', '2020-01-09', true, '0678902345', 49.2583, 4.0317, 'FEMME', 'RECRUTEUR'),
('julie@gmail.com', 'julie123', 'Bonnet', 'Julie', '1991-07-05', '2020-01-10', true, '0612345678', 48.5826, 7.7492, 'FEMME', 'RECRUTEUR');




-- Ajouter un type d'organisation OK
INSERT INTO Type_organisation (nom, description) VALUES 
('Agence de communication', 'Organisation qui propose des services de communication pour des entreprises ou des organisations'),
('Association', 'Organisation à but non lucratif qui poursuit une mission particulière'),
('Association sportive', 'Organisation qui organise des activités sportives et/ou compétitives'),
('Centre de recherche', 'Organisation qui conduit des recherches scientifiques ou technologiques'),
('Collectivité territoriale', 'Organisation publique locale qui assure des compétences sur un territoire donné'),
('Entreprise', 'Organisation qui a une activité économique et produit des biens ou des services'),
('Établissement public', 'Organisation publique qui exerce une mission de service public'),
('Organisation internationale', 'Organisation qui regroupe plusieurs États et a une portée mondiale'),
('Fondation', "Organisation qui a pour but de financer des projets d'intérêt général"),
('Parti politique', 'Organisation qui représente une mouvance politique et qui vise à influencer les choix politiques'),
('Organisation professionnelle', 'Organisation qui représente une profession ou un métier'),
('Syndicat', 'Organisation qui défend les intérêts des travailleurs et travailleuses'),
('Organisation non gouvernementale', 'Organisation à but non lucratif qui agit pour le développement, la coopération internationale ou la défense des droits humains'),
('Organisme de formation', 'Organisation qui propose des formations professionnelles ou continues'),
('Organisation patronale', 'Organisation qui représente les entreprises et défend leurs intérêts'),
('Établissement scolaire', 'Organisation publique ou privée qui assure des enseignements de niveau primaire, secondaire ou supérieur'),
('Organisme de certification', 'Organisation qui évalue la conformité à des normes ou des réglementations'),
('Média', 'Organisation qui produit et diffuse des informations, des contenus ou des programmes'),
('Institution culturelle', 'Organisation qui promeut et valorise la culture et les arts'),
('Organisation religieuse', 'Organisation qui regroupe des croyants et/ou qui gère des lieux de culte');
INSERT INTO Type_organisation (nom, description) VALUES ('SAS', 'Société par actions simplifiée');
INSERT INTO Type_organisation (nom, description) VALUES ('SARL', 'Société à responsabilité limitée');
INSERT INTO Type_organisation (nom, description) VALUES ('EURL', 'Entreprise unipersonnelle à responsabilité limitée');
INSERT INTO Type_organisation (nom, description) VALUES ('SA', 'société anonyme');



INSERT INTO Fiche_poste (numero, intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier)
VALUES
(15, 'Développeur web', 'Chef de projet informatique', 48.8566, 2.3522, 'Temps plein', 28000, 38000, 'CDI', 'Informatique'),
(16, 'Professeur de maths', 'Principal du collège', 47.2184, -1.5536, 'Temps partiel', 15000, 20000, 'CDD', 'Enseignement'),
(17, 'Infirmier', 'Cadre de santé', 48.8534, 2.3488, 'Temps plein', 20000, 25000, 'CDI', 'Santé');


INSERT INTO Fiche_poste (numero, intitule, responsable_hierarchique, lieu_mission_lat, lieu_mission_long, rythme, salaire_min, salaire_max, statut_poste, type_metier) VALUES
(1, 'Développeur web', 'Jean Dupont', 48.8566, 2.3522, 'Temps plein', 25000, 35000, 'CDI', 'Informatique'),
(4, 'Ingénieur mécanique', 'Sophie Laurent', 48.1172, -1.6778, 'Temps plein', 40000, 50000, 'CDI', 'Mécanicien automobile'),
(5, 'Comptable', 'Michel Garcia', 44.8378, -0.5792, 'Temps plein', 25000, 35000, 'CDI', 'Commercial'),
(6, 'Infirmier', 'Aurélie Dupont', 47.2184, -1.5536, 'Temps partiel', 18000, 23000, 'CDD', 'Santé'),
(7, 'Technicien de maintenance', 'Pierre Bonnet', 48.5839, 7.7455, 'Temps plein', 25000, 35000, 'CDI', 'Informatique'),
(8, 'Juriste', 'Claire Durand', 43.6108, 3.8767, 'Temps plein', 35000, 45000, 'CDI', 'Avocat'),
(9, 'Responsable de rayon', 'Nathalie Lefèvre', 49.8941, 2.2958, 'Temps plein', 30000, 40000, 'CDI', 'Commercial'),
(10, "Architecte d'intérieur", 'François Moreau', 48.8566, 2.3522, 'Temps plein', 40000, 50000, 'CDI', 'Designer graphique'),
(11, 'Développeur mobile', 'Nicolas Roux', 43.2965, 5.3698, 'Temps plein', 25000, 35000, 'CDI', 'Informatique'),
(12, 'Chargé de communication', 'Céline Dubois', 48.1172, -1.6778, 'Temps plein', 25000, 35000, 'CDI', 'Commercial'),
(13, 'Chef de projet informatique', 'Alexandre Leroy', 45.7640, 4.8357, 'Temps plein', 40000, 50000, 'CDI', 'Informatique'),
(14, 'Chef de projet', 'Sophie Morel', 47.2184, -1.5536, 'Temps plein', 25000, 35000, 'CDI', 'Gestionnaire de projet');



INSERT INTO Description (numero, missions, activites, competences_attendues)
VALUES
(1, "Développer de nouvelles fonctionnalités pour le site web de l'entreprise", "Programmer en Python, HTML, CSS et JavaScript", "Maîtrise des langages de programmation, esprit d'équipe, capacité d'adaptation"),
(15, "Assurer la maintenance du parc informatique de l'entreprise", "Réparer les ordinateurs, installer des logiciels", "Connaissance des systèmes d'exploitation, compétences en maintenance informatique, autonomie"),
(13, "Développer et mettre en place une stratégie de communication digitale pour l'entreprise", "Créer des contenus pour les réseaux sociaux, optimiser le référencement naturel du site web", "Bonne connaissance des réseaux sociaux, maîtrise des outils de référencement, créativité"),
(4, "Assister le service comptable de l'entreprise", "Saisir les factures, vérifier les paiements", "Maîtrise des logiciels de comptabilité, rigueur, précision"),
(5, "Assurer la gestion des stocks de l'entreprise", "Gérer les approvisionnements, suivre les niveaux de stock, passer des commandes", "Connaissance des techniques de gestion de stock, rigueur, organisation"),
(6, "Assurer le suivi de la qualité des produits fabriqués par l'entreprise", "Mettre en place des procédures de contrôle qualité, analyser les résultats, proposer des améliorations", "Bonne connaissance des normes qualité, capacité d'analyse, esprit critique"),
(7, "Assurer la gestion des ressources humaines de l'entreprise", "Recruter du personnel, gérer les fiches de paie, mettre en place des plans de formation", "Bonne connaissance des techniques de recrutement, maîtrise des logiciels de paie, esprit d'analyse"),
(8, "Assister la direction générale dans la mise en place de la stratégie de l'entreprise", "Réaliser des études de marché, suivre l'évolution des tendances économiques, participer à la rédaction du plan stratégique", "Bonne connaissance des enjeux économiques, esprit d'analyse, créativité"),
(9, "Assurer la maintenance des installations électriques de l'entreprise", "Installer et réparer des équipements électriques, respecter les normes de sécurité", "Connaissance des normes électriques, capacité d'analyse, autonomie"),
(10, "Assurer la gestion de projet pour l'entreprise", "Organiser et planifier les différentes étapes d'un projet, suivre le budget et le planning, gérer les risques", "Bonne connaissance des techniques de gestion de projet, esprit d'équipe, capacité de négociation");
INSERT INTO Description (numero, missions, activites, competences_attendues)
VALUES (21, 'Développer des applications web', 'Coder en HTML, CSS, JS', "Maîtrise de l'ensemble des langages et outils nécessaires");




-- TODO Ajouter une organisation
INSERT INTO Organisation (siren, nom, siege_social_lat, siege_social_long, type_organisation)
VALUES
('123456789', 'Acme Inc.', 48.8534, 2.3488, 'Entreprise'),
('987654321', 'Association Les Amis de la Nature', 47.2184, -1.5536, 'Association');

INSERT INTO Organisation (siren, nom, siege_social_lat, siege_social_long, type_organisation)
Values 
    ('2468101214', 'Entreprise 3', 51.5074, -0.1278, 'SARL'),
    ('1357924680', 'Entreprise 4', 37.7749, -122.4194, 'SAS'),
    ('1112223334', 'Entreprise 5', 45.5017, -73.5673, 'EURL'),
    ('5556667778', 'Entreprise 6', 35.6895, 139.6917, 'SA'),
    ('9876543210', 'Entreprise 7', 52.5200, 13.4050, 'SAS'),
    ('1231231231', 'Entreprise 8', 48.2082, 16.3738, 'SARL'),
    ('4564564567', 'Entreprise 9', 37.5665, 126.9780, 'SA'),
    ('7897897890', 'Entreprise 10', 41.3851, 2.1734, 'SAS'),
    ('1212121212', 'Entreprise 11', 51.5074, -0.1278, 'SARL'),
    ('3434343434', 'Entreprise 12', 48.8566, 2.3522, 'SA'),
    ('5656565656', 'Entreprise 13', 40.7128, -74.0060, 'SAS'),
    ('7878787878', 'Entreprise 14', 35.6895, 139.6917, 'SA'),
    ('9090909090', 'Entreprise 15', 52.5200, 13.4050, 'SAS'),
    ('2323232323', 'Entreprise 16', 48.2082, 16.3738, 'SARL'),
    ('4545454545', 'Entreprise 17', 37.5665, 126.9780, 'SA'),
    ('6767676767', 'Entreprise 18', 41.3851, 2.1734, 'SAS'),
    ('8989898989', 'Entreprise 19', 45.5017, -73.5673, 'EURL'),
    ('1111111111', 'Entreprise 20', 37.7749, -122.4194, 'SAS');

-- Ajouter un formulaire
INSERT INTO Formulaire (etat_formulaire, date_creation, type_formulaire, email_utilisateur, siren_orga)
VALUES ('EN COURS', '2021-03-01', 'REJOINDRE', 'john.doe@gmail.com', '123456789');
INSERT INTO Formulaire (etat_formulaire, date_creation, type_formulaire, email_utilisateur, siren_orga)
VALUES
    ('EN COURS', '2022-01-01', 'CREATION', 'alice@gmail.com', '123456789'),
    ('ACCEPTEE', '2022-01-02', 'CREATION', 'alice@gmail.com', '987654321');
INSERT INTO Formulaire (etat_formulaire, date_creation, type_formulaire, email_utilisateur, siren_orga)
VALUES
    ('EN COURS', '2022-01-03', 'REJOINDRE', 'bob@gmail.com', '5556667778'),
    ('REFUSEE', '2022-01-04', 'CREATION', 'bob@gmail.com', '9876543210'),
    ('EN COURS', '2022-01-05', 'CREATION', 'carla@gmail.com', '1231231231'),
    ('EN COURS', '2022-01-06', 'REJOINDRE', 'carla@gmail.com', '4564564567'),
    ('ACCEPTEE', '2022-01-07', 'CREATION', 'carla@gmail.com', '7897897890'),
    ('EN COURS', '2022-01-08', 'CREATION', 'david@gmail.com', '5656565656'),
    ('EN COURS', '2022-01-09', 'REJOINDRE', 'david@gmail.com', '9090909090'),
    ('REFUSEE', '2022-01-10', 'CREATION', 'david@gmail.com', '6767676767'),
    ('EN COURS', '2022-01-11', 'CREATION', 'emilie@gmail.com', '1111111111');
INSERT INTO Formulaire (etat_formulaire, date_creation, type_formulaire, email_utilisateur, siren_orga)
VALUES
    ('EN COURS', '2022-01-12', 'REJOINDRE', 'emilie@gmail.com', '8989898989'),
    ('ACCEPTEE', '2022-01-13', 'CREATION', 'emilie@gmail.com', '4545454545'),
    ('EN COURS', '2022-01-14', 'CREATION', 'francois@gmail.com', '2323232323'),
    ('EN COURS', '2022-01-15', 'REJOINDRE', 'francois@gmail.com', '7878787878'),
    ('REFUSEE', '2022-01-16', 'CREATION', 'gaelle@gmail.com', '3434343434'),
    ('EN COURS', '2022-01-17', 'CREATION', 'gaelle@gmail.com', '1212121212'),
    ('EN COURS', '2022-01-18', 'REJOINDRE', 'gaelle@gmail.com', '1112223334'),
    ('ACCEPTEE', '2022-01-19', 'CREATION', 'isabelle@gmail.com', '1357924680'),
    ('EN COURS', '2022-01-20', 'CREATION', 'isabelle@gmail.com', '2468101214');



-- Ajouter une offre d'emploi
INSERT INTO Offre_d_emploi (nombre_de_piece, etat, date_validite, indication_piece_jointes, id_poste)
VALUES (2, 'PUBLIEE', '2021-04-01', 'CV, LM', 21);
INSERT INTO Offre_d_emploi (nombre_de_piece, etat, date_validite, indication_piece_jointes, id_poste) VALUES (2, 'PUBLIEE', '2022-02-01', 'CV, lettre de motivation', 1);
INSERT INTO Offre_d_emploi (nombre_de_piece, etat, date_validite, indication_piece_jointes, id_poste) VALUES (2, 'EXPIREE', '2022-05-10', 'CV, lettre de motivation', 4);
INSERT INTO Offre_d_emploi (nombre_de_piece, etat, date_validite, indication_piece_jointes, id_poste) VALUES (3, 'NON PUBLIEE', '2022-06-20', 'CV, lettre de motivation, références', 5);
INSERT INTO Offre_d_emploi (nombre_de_piece, etat, date_validite, indication_piece_jointes, id_poste)
VALUES (3, 'PUBLIEE', '2023-07-01', 'CV, lettre de motivation', 1),
       (3, 'PUBLIEE', '2023-08-01', 'CV, lettre de motivation', 4),
       (2, 'PUBLIEE', '2023-09-01', 'CV, lettre de motivation', 5),
       (4, 'NON PUBLIEE', '2023-05-15', 'CV, lettre de motivation, références', 6),
       (3, 'PUBLIEE', '2023-06-15', 'CV, lettre de motivation', 7),
       (2, 'PUBLIEE', '2023-08-15', 'CV, lettre de motivation', 8),
       (4, 'PUBLIEE', '2023-10-01', 'CV, lettre de motivation, diplômes', 9),
       (3, 'PUBLIEE', '2023-07-15', 'CV, lettre de motivation', 10),
       (2, 'PUBLIEE', '2023-09-15', 'CV, lettre de motivation', 11),
       (4, 'PUBLIEE', '2023-10-15', 'CV, lettre de motivation, diplômes', 12),
       (3, 'PUBLIEE', '2023-08-15', 'CV, lettre de motivation', 13),
       (2, 'NON PUBLIEE', '2023-05-30', 'CV, lettre de motivation', 14),
       (4, 'PUBLIEE', '2023-11-01', 'CV, lettre de motivation, diplômes', 15),
       (3, 'EXPIREE', '2023-03-31', 'CV, lettre de motivation', 16),
       (2, 'PUBLIEE', '2023-07-01', 'CV, lettre de motivation', 17);



-- Ajouter une candidature
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre)
VALUES ('2021-03-15', 'EN COURS', 'john.doe@gmail.com', 27);

INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-01', 'EN COURS', 'alice@gmail.com', 1);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-02', 'EN COURS', 'alice@gmail.com', 28);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-03', 'EN COURS', 'bob@gmail.com', 30);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-04', 'EN COURS', 'bob@gmail.com', 31);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-05', 'EN COURS', 'carla@gmail.com', 50);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-06', 'EN COURS', 'carla@gmail.com', 51);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-07', 'EN COURS', 'david@gmail.com', 57);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-08', 'EN COURS', 'david@gmail.com', 58);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-09', 'EN COURS', 'emilie@gmail.com', 59);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-10', 'EN COURS', 'emilie@gmail.com', 60);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-11', 'EN COURS', 'francois@gmail.com', 61);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-12', 'EN COURS', 'francois@gmail.com', 62);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-13', 'EN COURS', 'gaelle@gmail.com', 63);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-14', 'EN COURS', 'gaelle@gmail.com', 64);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre) 
VALUES ('2022-01-15', 'EN COURS', 'gaelle@gmail.com', 53);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre)
VALUES ('2022-01-16', 'EN COURS', 'henri@gmail.com', 54);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre)
VALUES ('2022-01-17', 'EN COURS', 'isabelle@gmail.com', 55);
INSERT INTO Candidature (date_candidature, etat_candidature, email_utilisateur, id_offre)
VALUES ('2022-01-18', 'EN COURS', 'julie@gmail.com', 56);

-- TODO Ajouter une pièce jointe

INSERT INTO Pieces_jointes (nom, type_pieces, lien, id_candidature)
VALUES ('CV_John_Doe.pdf', 'CV', 'https://example.com/cv_john_doe.pdf', 27),
       ('LM_John_Doe.pdf', 'LM', 'https://example.com/lm_john_doe.pdf', 27),
       ('Recommandation_John_Doe.pdf', 'Autre', 'https://example.com/recommandation_john_doe.pdf', 27),
       ('CV_alice.pdf', 'CV', 'https://example.com/cv_alice.pdf', 24),
       ('LM_alice.pdf', 'LM', 'https://example.com/lm_alice.pdf', 24),
       ('Recommandation_alice.pdf', 'Autre', 'https://example.com/recommandation_alice.pdf', 24),
       ('CV_Bob_Smith.pdf', 'CV', 'https://example.com/cv_bob_smith.pdf', 25),
       ('LM_Bob_Smith.pdf', 'LM', 'https://example.com/lm_bob_smith.pdf', 25),
       ('Recommandation_Bob_Smith.pdf', 'Autre', 'https://example.com/recommandation_bob_smith.pdf', 25),
       ('CV_carla.pdf', 'CV', 'https://example.com/cv_carla.pdf', 27),
       ('LM_carla.pdf', 'LM', 'https://example.com/lm_carla.pdf', 27),
       ('Recommandation_carla.pdf', 'Autre', 'https://example.com/recommandation_carla.pdf', 27),
       ('CV_david.pdf', 'CV', 'https://example.com/cv_david.pdf', 30),
       ('LM_david.pdf', 'LM', 'https://example.com/lm_david.pdf', 30),
       ('Recommandation_david.pdf', 'Autre', 'https://example.com/recommandation_david.pdf', 30),
       ('CV_gaelle.pdf', 'CV', 'https://example.com/cv_gaelle.pdf', 35),
       ('LM_gaelle.pdf', 'LM', 'https://example.com/lm_gaelle.pdf', 35),
       ('Recommandation_gaelle.pdf', 'Autre', 'https://example.com/recommandation_gaelle.pdf', 35),
       ('CV_henri.pdf', 'CV', 'https://example.com/cv_henri.pdf', 39),
       ('LM_henri.pdf', 'LM', 'https://example.com/lm_henri.pdf', 39),
       ('Recommandation_henri.pdf', 'Autre', 'https://example.com/recommandation_henri.pdf', 39);





