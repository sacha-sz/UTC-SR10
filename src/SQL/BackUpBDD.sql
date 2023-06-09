-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 09 juin 2023 à 21:11
-- Version du serveur :  10.3.38-MariaDB-0+deb10u1
-- Version de PHP : 7.3.31-1~deb10u3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sr10p045`
--

-- --------------------------------------------------------

--
-- Structure de la table `Candidature`
--

CREATE TABLE `Candidature` (
  `id` int(11) NOT NULL,
  `date_candidature` date NOT NULL,
  `etat_candidature` enum('EN COURS','REFUSEE','ACCEPTEE') NOT NULL,
  `email_utilisateur` varchar(255) NOT NULL,
  `id_offre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Candidature`
--

INSERT INTO `Candidature` (`id`, `date_candidature`, `etat_candidature`, `email_utilisateur`, `id_offre`) VALUES
(21, '2022-01-01', 'EN COURS', 'alice@gmail.com', 1),
(24, '2022-01-02', 'EN COURS', 'alice@gmail.com', 28),
(28, '2022-01-06', 'EN COURS', 'carla@gmail.com', 51),
(29, '2022-01-07', 'EN COURS', 'david@gmail.com', 57),
(30, '2022-01-08', 'EN COURS', 'david@gmail.com', 58),
(31, '2022-01-09', 'EN COURS', 'emilie@gmail.com', 59),
(32, '2022-01-10', 'EN COURS', 'emilie@gmail.com', 60),
(33, '2022-01-11', 'EN COURS', 'francois@gmail.com', 61),
(34, '2022-01-12', 'EN COURS', 'francois@gmail.com', 62),
(35, '2022-01-13', 'EN COURS', 'gaelle@gmail.com', 63),
(36, '2022-01-14', 'EN COURS', 'gaelle@gmail.com', 64),
(38, '2022-01-15', 'EN COURS', 'gaelle@gmail.com', 53),
(39, '2022-01-16', 'EN COURS', 'henri@gmail.com', 54),
(40, '2022-01-17', 'EN COURS', 'isabelle@gmail.com', 55),
(41, '2022-01-18', 'EN COURS', 'julie@gmail.com', 56);

-- --------------------------------------------------------

--
-- Structure de la table `Description`
--

CREATE TABLE `Description` (
  `numero` int(11) NOT NULL,
  `missions` varchar(255) NOT NULL,
  `activites` varchar(255) NOT NULL,
  `competences_attendues` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Description`
--

INSERT INTO `Description` (`numero`, `missions`, `activites`, `competences_attendues`) VALUES
(1, 'Développer de nouvelles fonctionnalités pour le site web de l\'entreprise', 'Programmer en Python, HTML, CSS et JavaScript', 'Maîtrise des langages de programmation, esprit d\'équipe, capacité d\'adaptation'),
(4, 'Assister le service comptable de l\'entreprise', 'Saisir les factures, vérifier les paiements', 'Maîtrise des logiciels de comptabilité, rigueur, précision'),
(5, 'Assurer la gestion des stocks de l\'entreprise', 'Gérer les approvisionnements, suivre les niveaux de stock, passer des commandes', 'Connaissance des techniques de gestion de stock, rigueur, organisation'),
(6, 'Assurer le suivi de la qualité des produits fabriqués par l\'entreprise', 'Mettre en place des procédures de contrôle qualité, analyser les résultats, proposer des améliorations', 'Bonne connaissance des normes qualité, capacité d\'analyse, esprit critique'),
(7, 'Assurer la gestion des ressources humaines de l\'entreprise', 'Recruter du personnel, gérer les fiches de paie, mettre en place des plans de formation', 'Bonne connaissance des techniques de recrutement, maîtrise des logiciels de paie, esprit d\'analyse'),
(8, 'Assister la direction générale dans la mise en place de la stratégie de l\'entreprise', 'Réaliser des études de marché, suivre l\'évolution des tendances économiques, participer à la rédaction du plan stratégique', 'Bonne connaissance des enjeux économiques, esprit d\'analyse, créativité'),
(9, 'Assurer la maintenance des installations électriques de l\'entreprise', 'Installer et réparer des équipements électriques, respecter les normes de sécurité', 'Connaissance des normes électriques, capacité d\'analyse, autonomie'),
(10, 'Assurer la gestion de projet pour l\'entreprise', 'Organiser et planifier les différentes étapes d\'un projet, suivre le budget et le planning, gérer les risques', 'Bonne connaissance des techniques de gestion de projet, esprit d\'équipe, capacité de négociation'),
(13, 'Développer et mettre en place une stratégie de communication digitale pour l\'entreprise', 'Créer des contenus pour les réseaux sociaux, optimiser le référencement naturel du site web', 'Bonne connaissance des réseaux sociaux, maîtrise des outils de référencement, créativité'),
(15, 'Assurer la maintenance du parc informatique de l\'entreprise', 'Réparer les ordinateurs, installer des logiciels', 'Connaissance des systèmes d\'exploitation, compétences en maintenance informatique, autonomie'),
(21, 'Développer des applications web', 'Coder en HTML, CSS, JS', 'Maîtrise de l\'ensemble des langages et outils nécessaires');

-- --------------------------------------------------------

--
-- Structure de la table `Fiche_poste`
--

CREATE TABLE `Fiche_poste` (
  `numero` int(11) NOT NULL,
  `intitule` varchar(255) NOT NULL,
  `responsable_hierarchique` varchar(255) NOT NULL,
  `lieu_mission_lat` float NOT NULL,
  `lieu_mission_long` float NOT NULL,
  `rythme` varchar(255) NOT NULL,
  `salaire_min` float NOT NULL,
  `salaire_max` float NOT NULL,
  `statut_poste` varchar(50) NOT NULL,
  `type_metier` varchar(50) NOT NULL,
  `email_inscription` varchar(255) NOT NULL,
  `id_description` int(11) NOT NULL,
  `FP_SIREN` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Fiche_poste`
--

INSERT INTO `Fiche_poste` (`numero`, `intitule`, `responsable_hierarchique`, `lieu_mission_lat`, `lieu_mission_long`, `rythme`, `salaire_min`, `salaire_max`, `statut_poste`, `type_metier`, `email_inscription`, `id_description`, `FP_SIREN`) VALUES
(1, 'Développeur web', 'Jean Dupont', 44.0059, 2.3522, 'Temps plein', 25000, 35000, 'CDI', 'Informatique', 'francois@gmail.com', 21, '7878787878'),
(4, 'Ingénieur mécanique', 'Sophie Laurent', 48.1172, -1.6778, 'Temps plein', 40000, 50000, 'CDI', 'Mécanicien automobile', 'francois@gmail.com', 10, '7878787878'),
(5, 'Comptable', 'Michel Garcia', 44.8378, -0.5792, 'Temps plein', 25000, 35000, 'CDI', 'Commercial', 'gaelle@gmail.com', 4, '1112223334'),
(6, 'Infirmier', 'Aurélie Dupont', 47.2184, -1.5536, 'Temps partiel', 18000, 23000, 'CDD', 'Santé', 'gaelle@gmail.com', 7, '1112223334'),
(9, 'Responsable de rayon', 'Nathalie Lefèvre', 49.8941, 2.2958, 'Temps plein', 30000, 40000, 'CDI', 'Commercial', 'francois@gmail.com', 5, '2323232323'),
(10, 'Architecte d\'intérieur', 'François Moreau', 48.8566, 2.3522, 'Temps plein', 40000, 50000, 'CDI', 'Designer graphique', 'francois@gmail.com', 10, '2323232323'),
(11, 'Développeur mobile', 'Nicolas Roux', 43.2965, 5.3698, 'Temps plein', 25000, 35000, 'CDI', 'Informatique', 'carla@gmail.com', 1, '1231231231'),
(12, 'Chargé de communication', 'Céline Dubois', 48.1172, -1.6778, 'Temps plein', 25000, 35000, 'CDI', 'Commercial', 'carla@gmail.com', 13, '1231231231'),
(13, 'Chef de projet informatique', 'Alexandre Leroy', 45.764, 4.8357, 'Temps plein', 40000, 50000, 'CDI', 'Informatique', 'carla@gmail.com', 8, '1231231231'),
(14, 'Chef de projet', 'Sophie Morel', 47.2184, -1.5536, 'Temps plein', 25000, 35000, 'CDI', 'Gestionnaire de projet', 'carla@gmail.com', 8, '1231231231'),
(15, 'Développeur web', 'Chef de projet informatique', 48.8566, 2.3522, 'Temps plein', 28000, 38000, 'CDI', 'Informatique', 'bob@gmail.com', 21, '5556667778'),
(16, 'Professeur de maths', 'Principal du collège', 47.2184, -1.5536, 'Temps partiel', 15000, 20000, 'CDD', 'Enseignement', 'bob@gmail.com', 6, '5556667778'),
(17, 'Infirmier', 'Cadre de santé', 48.8534, 2.3488, 'Temps plein', 20000, 25000, 'CDI', 'Santé', 'bob@gmail.com', 9, '5556667778');

-- --------------------------------------------------------

--
-- Structure de la table `Formulaire`
--

CREATE TABLE `Formulaire` (
  `id` int(11) NOT NULL,
  `etat_formulaire` enum('EN COURS','REFUSEE','ACCEPTEE') NOT NULL DEFAULT 'EN COURS',
  `date_creation` date NOT NULL,
  `type_formulaire` enum('CREATION','REJOINDRE') NOT NULL DEFAULT 'REJOINDRE',
  `email_utilisateur` varchar(255) NOT NULL,
  `siren_orga` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Formulaire`
--

INSERT INTO `Formulaire` (`id`, `etat_formulaire`, `date_creation`, `type_formulaire`, `email_utilisateur`, `siren_orga`) VALUES
(103, 'EN COURS', '2021-03-01', 'REJOINDRE', 'john.doe@gmail.com', '123456789'),
(104, 'ACCEPTEE', '2022-01-01', 'CREATION', 'alice@gmail.com', '123456789'),
(105, 'ACCEPTEE', '2022-01-02', 'CREATION', 'alice@gmail.com', '987654321'),
(106, 'ACCEPTEE', '2022-01-03', 'REJOINDRE', 'bob@gmail.com', '5556667778'),
(107, 'REFUSEE', '2022-01-04', 'CREATION', 'bob@gmail.com', '9876543210'),
(108, 'ACCEPTEE', '2022-01-05', 'CREATION', 'carla@gmail.com', '1231231231'),
(109, 'ACCEPTEE', '2022-01-06', 'REJOINDRE', 'carla@gmail.com', '4564564567'),
(112, 'ACCEPTEE', '2022-01-09', 'REJOINDRE', 'david@gmail.com', '9090909090'),
(113, 'REFUSEE', '2022-01-10', 'CREATION', 'david@gmail.com', '6767676767'),
(114, 'ACCEPTEE', '2022-01-11', 'CREATION', 'emilie@gmail.com', '1111111111'),
(115, 'ACCEPTEE', '2022-01-12', 'REJOINDRE', 'emilie@gmail.com', '8989898989'),
(116, 'ACCEPTEE', '2022-01-13', 'CREATION', 'emilie@gmail.com', '4545454545'),
(117, 'ACCEPTEE', '2022-01-14', 'CREATION', 'francois@gmail.com', '2323232323'),
(118, 'ACCEPTEE', '2022-01-15', 'REJOINDRE', 'francois@gmail.com', '7878787878'),
(119, 'REFUSEE', '2022-01-16', 'CREATION', 'gaelle@gmail.com', '3434343434'),
(120, 'EN COURS', '2022-01-17', 'CREATION', 'gaelle@gmail.com', '1212121212'),
(121, 'ACCEPTEE', '2022-01-18', 'REJOINDRE', 'gaelle@gmail.com', '1112223334'),
(122, 'ACCEPTEE', '2022-01-19', 'CREATION', 'isabelle@gmail.com', '1357924680'),
(123, 'EN COURS', '2022-01-20', 'CREATION', 'isabelle@gmail.com', '2468101214'),
(124, 'EN COURS', '2023-05-10', 'REJOINDRE', 'test@gmail.com', '123456789'),
(192, 'EN COURS', '2023-05-22', 'REJOINDRE', 'admin@gmail.com', '123456789');

-- --------------------------------------------------------

--
-- Structure de la table `Offre_d_emploi`
--

CREATE TABLE `Offre_d_emploi` (
  `id` int(11) NOT NULL,
  `nombre_de_piece` int(10) UNSIGNED NOT NULL,
  `etat` enum('NON PUBLIEE','PUBLIEE','EXPIREE') NOT NULL,
  `date_validite` date NOT NULL,
  `indication_piece_jointes` varchar(255) NOT NULL,
  `id_poste` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Offre_d_emploi`
--

INSERT INTO `Offre_d_emploi` (`id`, `nombre_de_piece`, `etat`, `date_validite`, `indication_piece_jointes`, `id_poste`) VALUES
(1, 2, 'PUBLIEE', '2021-04-01', 'CV, LM', 21),
(28, 2, 'PUBLIEE', '2022-02-01', 'CV, LM', 1),
(51, 3, 'PUBLIEE', '2023-08-01', 'CV, LM', 4),
(52, 2, 'PUBLIEE', '2023-09-01', 'CV, LM', 5),
(53, 4, 'NON PUBLIEE', '2023-05-15', 'CV, LM, REF', 6),
(54, 3, 'PUBLIEE', '2023-06-15', 'CV, LM', 7),
(55, 2, 'PUBLIEE', '2023-08-15', 'CV, LM', 8),
(56, 4, 'PUBLIEE', '2023-10-01', 'CV, LM, DIP', 9),
(57, 3, 'PUBLIEE', '2023-07-15', 'CV, LM', 10),
(58, 2, 'PUBLIEE', '2023-09-15', 'CV, LM', 11),
(59, 4, 'PUBLIEE', '2023-10-15', 'CV, LM, DIP', 12),
(60, 3, 'PUBLIEE', '2023-08-15', 'CV, LM', 13),
(61, 2, 'NON PUBLIEE', '2023-05-30', 'CV, LM', 14),
(62, 4, 'PUBLIEE', '2023-11-01', 'CV, LM, DIP', 15),
(63, 3, 'EXPIREE', '2023-03-31', 'CV, LM', 16),
(64, 2, 'PUBLIEE', '2023-07-01', 'CV, LM', 17);

-- --------------------------------------------------------

--
-- Structure de la table `Organisation`
--

CREATE TABLE `Organisation` (
  `siren` varchar(255) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `siege_social_lat` float NOT NULL,
  `siege_social_long` float NOT NULL,
  `type_organisation` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Organisation`
--

INSERT INTO `Organisation` (`siren`, `nom`, `siege_social_lat`, `siege_social_long`, `type_organisation`) VALUES
('1111111111', 'Entreprise 20', 37.7749, -122.419, 'SAS'),
('1112223334', 'Entreprise 5', 45.5017, -73.5673, 'EURL'),
('1212121212', 'Entreprise 11', 51.5074, -0.1278, 'SARL'),
('1231231231', 'Entreprise 8', 48.2082, 16.3738, 'SARL'),
('123456789', 'Acme Inc.', 48.8534, 2.3488, 'Entreprise'),
('125496875', 'Pigma', 7.1659, 3.2655, 'EntrepriseDeRemi'),
('1357924680', 'Entreprise 4', 37.7749, -122.419, 'SAS'),
('193818382', 'Polytech Grenoble', 45.1844, 5.75374, 'Établissement scolaire'),
('2323232323', 'Entreprise 16', 48.2082, 16.3738, 'SARL'),
('2468101214', 'Entreprise 3', 51.5074, -0.1278, 'SARL'),
('3434343434', 'Entreprise 12', 48.8566, 2.3522, 'SA'),
('4545454545', 'Entreprise 17', 37.5665, 126.978, 'SA'),
('4564564567', 'Entreprise 9', 37.5665, 126.978, 'SA'),
('5556667778', 'Entreprise 6', 35.6895, 139.692, 'SA'),
('5656565656', 'Entreprise 13', 40.7128, -74.006, 'SAS'),
('6767676767', 'Entreprise 18', 41.3851, 2.1734, 'SAS'),
('7878787878', 'Entreprise 14', 35.6895, 139.692, 'SA'),
('7897897890', 'Entreprise 10', 41.3851, 2.1734, 'SAS'),
('832984058', 'Polytech Nice', 43.7031, 7.26608, 'Établissement scolaire'),
('8989898989', 'Entreprise 19', 45.5017, -73.5673, 'EURL'),
('9090909090', 'Entreprise 15', 52.52, 13.405, 'SAS'),
('911111113', 'Company Name', 48.8566, 2.3522, 'SAS'),
('95797458', 'Entreprise1', 123.456, 789.012, 'Type1'),
('987654321', 'Association Les Amis de la Nature', 47.2184, -1.5536, 'Association'),
('9876543210', 'Entreprise 7', 52.52, 13.405, 'SAS');

-- --------------------------------------------------------

--
-- Structure de la table `Pieces_jointes`
--

CREATE TABLE `Pieces_jointes` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `type_pieces` enum('CV','LM','Autre') NOT NULL,
  `lien` varchar(255) NOT NULL,
  `id_candidature` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Pieces_jointes`
--

INSERT INTO `Pieces_jointes` (`id`, `nom`, `type_pieces`, `lien`, `id_candidature`) VALUES
(48, 'cv_alice.pdf', 'CV', './mesfichiers/cv_alice.pdf', 24),
(49, 'lm_alice.pdf', 'LM', './mesfichiers/lm_alice.pdf', 24),
(50, 'recommandation_alice.pdf', 'Autre', './mesfichiers/recommandation_alice.pdf', 24);

-- --------------------------------------------------------

--
-- Structure de la table `Statut_poste`
--

CREATE TABLE `Statut_poste` (
  `nom` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Statut_poste`
--

INSERT INTO `Statut_poste` (`nom`, `description`) VALUES
('Actionnaire', 'Personne détenant des actions d\'une société'),
('Administrateur', 'Membre du conseil d\'administration d\'une entreprise'),
('Apprentissage', 'Contrat de travail en alternance pour préparer un diplôme ou un titre professionnel'),
('Associé', 'Membre d\'une société ayant apporté des fonds ou des biens pour sa constitution'),
('Auto-entrepreneur', 'Statut permettant de créer facilement une entreprise individuelle'),
('CDD', 'Contrat à durée déterminée'),
('CDI', 'Contrat à durée indéterminée'),
('Contrat unique', 'Contrat qui regroupe les différents types de contrats précaires'),
('CTT', 'Contrat de travail temporaire'),
('Freelance', 'Professionnel indépendant prestataire de services pour une entreprise'),
('Gérant majoritaire', 'Dirigeant et associé majoritaire d\'une entreprise individuelle'),
('Gérant minoritaire', 'Dirigeant et associé minoritaire d\'une entreprise'),
('Indépendant', 'Professionnel exerçant son activité de manière indépendante'),
('Interim', 'Travail temporaire effectué par une agence de travail temporaire'),
('Portage salarial', 'Forme d\'emploi associant l\'autonomie du travailleur indépendant et la sécurité du salariat'),
('Professionnalisation', 'Contrat de travail en alternance pour acquérir une qualification professionnelle'),
('Stage', 'Période d\'observation et de mise en pratique en entreprise'),
('Volontariat', 'Engagement bénévole au service d\'une association ou d\'une collectivité');

-- --------------------------------------------------------

--
-- Structure de la table `Type_metier`
--

CREATE TABLE `Type_metier` (
  `nom` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Type_metier`
--

INSERT INTO `Type_metier` (`nom`, `description`) VALUES
('Analyste financier', 'Analyse financière'),
('Architecte', 'Conception de bâtiments'),
('Artiste peintre', 'Peinture et dessin'),
('Avocat', 'Droit et conseil juridique'),
('Charpentier', 'Construction de structures en bois'),
('Chef cuisinier', 'Préparation de repas'),
('Coiffeur', 'Coupe et coiffure'),
('Commercial', 'Vente et négociation'),
('Couturier', 'Conception et réalisation de vêtements'),
('Designer graphique', 'Conception d\'éléments graphiques'),
('Développeur Web', 'Conception de sites web'),
('Électricien', 'Installation et maintenance électrique'),
('Enseignement', 'Métiers liés à l\'enseignement et la formation'),
('Gestionnaire de projet', 'Gestion de projets'),
('Informatique', 'Métiers liés à l\'informatique et à l\'informatisation'),
('Ingénieur informatique', 'Développement logiciel'),
('Journaliste', 'Écriture et recherche d\'information'),
('Mécanicien automobile', 'Réparation et entretien de voitures'),
('Médecin', 'Pratique médicale'),
('Pâtissier', 'Conception de pâtisseries et de desserts'),
('Pharmacien', 'Distribution de médicaments'),
('Plombier', 'Installation et maintenance de la plomberie'),
('Santé', 'Métiers liés à la santé et aux soins');

-- --------------------------------------------------------

--
-- Structure de la table `Type_organisation`
--

CREATE TABLE `Type_organisation` (
  `nom` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Type_organisation`
--

INSERT INTO `Type_organisation` (`nom`, `description`) VALUES
('Agence de communication', 'Organisation qui propose des services de communication pour des entreprises ou des organisations'),
('Association', 'Organisation à but non lucratif qui poursuit une mission particulière'),
('Association sportive', 'Organisation qui organise des activités sportives et/ou compétitives'),
('Centre de recherche', 'Organisation qui conduit des recherches scientifiques ou technologiques'),
('Collectivité territoriale', 'Organisation publique locale qui assure des compétences sur un territoire donné'),
('Entreprise', 'Organisation qui a une activité économique et produit des biens ou des services'),
('EntrepriseDeRemi', 'Pigma est l\'entreprise de Remi'),
('Établissement public', 'Organisation publique qui exerce une mission de service public'),
('Établissement scolaire', 'Organisation publique ou privée qui assure des enseignements de niveau primaire, secondaire ou supérieur'),
('EURL', 'Entreprise unipersonnelle à responsabilité limitée'),
('Fondation', 'Organisation qui a pour but de financer des projets d\'intérêt général'),
('Institution culturelle', 'Organisation qui promeut et valorise la culture et les arts'),
('Média', 'Organisation qui produit et diffuse des informations, des contenus ou des programmes'),
('Nouveau Type', 'Description du nouveau type'),
('Organisation internationale', 'Organisation qui regroupe plusieurs États et a une portée mondiale'),
('Organisation non gouvernementale', 'Organisation à but non lucratif qui agit pour le développement, la coopération internationale ou la défense des droits humains'),
('Organisation patronale', 'Organisation qui représente les entreprises et défend leurs intérêts'),
('Organisation professionnelle', 'Organisation qui représente une profession ou un métier'),
('Organisation religieuse', 'Organisation qui regroupe des croyants et/ou qui gère des lieux de culte'),
('Organisme de certification', 'Organisation qui évalue la conformité à des normes ou des réglementations'),
('Organisme de formation', 'Organisation qui propose des formations professionnelles ou continues'),
('Parti politique', 'Organisation qui représente une mouvance politique et qui vise à influencer les choix politiques'),
('SA', 'société anonyme'),
('SARL', 'Société à responsabilité limitée'),
('SAS', 'Société par actions simplifiée'),
('Syndicat', 'Organisation qui défend les intérêts des travailleurs et travailleuses'),
('TEST10Organisation', 'TEST10Desc'),
('Test7OrgaTest', 'Fake Description'),
('Type1', 'Description1');

-- --------------------------------------------------------

--
-- Structure de la table `Utilisateur`
--

CREATE TABLE `Utilisateur` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `date_naissance` date NOT NULL,
  `date_creation` date NOT NULL,
  `statut` tinyint(1) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `adresse_utilisateur_lat` float NOT NULL,
  `adresse_utilisateur_long` float NOT NULL,
  `sexe` enum('HOMME','FEMME','AUTRE') NOT NULL,
  `type_utilisateur` enum('CANDIDAT','RECRUTEUR','ADMINISTRATEUR') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Utilisateur`
--

INSERT INTO `Utilisateur` (`email`, `password`, `nom`, `prenom`, `date_naissance`, `date_creation`, `statut`, `telephone`, `adresse_utilisateur_lat`, `adresse_utilisateur_long`, `sexe`, `type_utilisateur`) VALUES
('admin@gmail.com', '$2b$10$IqdREgThT0ct7RK7EYfnuezxRjZr2zu.MQa9k/hcJvLSY.7l/K2iq', 'NomAdmin', 'PrenomAdmin', '1990-01-01', '2023-01-01', 1, '0789654534', 21.9876, 12.8765, 'HOMME', 'ADMINISTRATEUR'),
('alice@gmail.com', '$2b$10$hDUgV7JLpkNgN7kBOIGk3e5Csgyz1agtHIzBuVYZjX1IHDwrVytTC', 'Dupont', 'Alice', '1995-07-12', '2020-01-01', 1, '0645678923', 48.8534, 2.3488, 'FEMME', 'RECRUTEUR'),
('bob@gmail.com', '$2b$10$wDcea8Gqg.Y2J337LICUu.NDp8vGRZkAtmsQnpiK5w7iHmWp/fUKq', 'Martin', 'Bob', '1992-02-22', '2020-01-02', 1, '0654321876', 48.8566, 2.3522, 'HOMME', 'ADMINISTRATEUR'),
('carla@gmail.com', '$2b$10$Az7ZMZQyDWUc7HdoTm3ML.wMNtsPMwFoqdeoqOlzb2TS6ptZReby2', 'Garcia', 'Carla', '1991-09-17', '2020-01-03', 1, '0678901234', 45.764, 4.8357, 'FEMME', 'RECRUTEUR'),
('david@gmail.com', '$2b$10$VOqq7lR2xWcpkphuacDk3.7DYKZLrjU60dReFIpNwzUiD4RvpE1dm', 'Nguyen', 'David', '1988-11-23', '2020-01-04', 1, '0689567123', 43.6047, 1.4442, 'HOMME', 'RECRUTEUR'),
('emilie@gmail.com', '$2b$10$9ACTn7y1hRHdu0zR/KGjXe4MjIepsD/5bj2ssUTcPNEz8vi/YRPvy', 'Rousseau', 'Emilie', '1990-04-30', '2020-01-05', 1, '0698765432', 48.1173, -1.6778, 'FEMME', 'RECRUTEUR'),
('francois@gmail.com', '$2b$10$bw1JclRGA4fT3gbvDgLEg.Jurcmlmz127OH8eiaAhxO8HEp4PtHri', 'Dupuis', 'Francois', '1992-12-17', '2020-01-06', 1, '0632456789', 50.6311, 3.0128, 'HOMME', 'RECRUTEUR'),
('gaelle@gmail.com', '$2b$10$hfbsC2nVqyVpxKHYaz4aGeJnCOYeyCYLEiwZoxLPgtoy/ThVKva.G', 'Lecomte', 'Gaelle', '1993-06-21', '2020-01-07', 1, '0667891234', 47.2184, -1.5536, 'FEMME', 'RECRUTEUR'),
('henri@gmail.com', '$2b$10$jvefGEfKtxcKoTG8woC2beNpFLmosHiTnFftsUr4n6LJwrs71AjNy', 'Girard', 'Henri', '1995-01-29', '2020-01-08', 1, '0612345678', 44.8378, -0.5792, 'HOMME', 'CANDIDAT'),
('isabelle@gmail.com', '$2b$10$oVBvWxK2n0xLm2Ky339SG.a4dHl5nHowApDST0Rf5PHEzg/.kN7q.', 'Mercier', 'Isabelle', '1994-08-08', '2020-01-09', 1, '0678902345', 49.2583, 4.0317, 'FEMME', 'ADMINISTRATEUR'),
('john.doe@gmail.com', '$2b$10$2CbAKTitz7SAofCh1YLiN.P/myi9hS9QUfeKHiIF4MG2SLDUtZM5a', 'Doe', 'John', '1990-01-01', '2021-01-01', 1, '0601020304', 48.8566, 2.3522, 'HOMME', 'CANDIDAT'),
('julie@gmail.com', '$2b$10$jASp0QQDiVF3e3ECXockAOeGRo.8f07FX9s2iQUrZ9YEhA5Glb4TC', 'Bonnet', 'Julie', '1991-07-05', '2020-01-10', 1, '0612345678', 48.5826, 7.7492, 'FEMME', 'CANDIDAT'),
('sacha@gmail.com', '$2b$10$ne4Lz4X34qkmnboBTJe4nu.qKisbXQd7bBZPt8aDkxcERDLYUfmqa', 'SZ', 'Sacha', '2002-12-22', '2023-06-09', 1, '0707070707', 26.35, 127.7, 'HOMME', 'CANDIDAT'),
('test2@gmail.com', '$2b$10$1e8E8bGQsC/FMYNwlFlCRO8UzUxIEtYcki9e5f9jsbckRYMo1aQlK', 'T', '2', '2002-12-22', '2023-05-21', 1, '0752641550', 0, 0, 'HOMME', 'CANDIDAT'),
('test3@gmail.com', '$2b$10$1e8E8bGQsC/FMYNwlFlCRO8UzUxIEtYcki9e5f9jsbckRYMo1aQlK', 'John', 'Wick', '2002-12-22', '2023-05-21', 1, '0752641550', 0, 0, 'HOMME', 'CANDIDAT'),
('test4@gmail.com', '$2b$10$sy2dTRz0gGygteeQehHvQuIIkczdyxrCEzlJgA5pBIyj5zPA96tAa', 'j', 'w', '2002-12-22', '2023-05-21', 1, '0752641550', 0, 0, 'HOMME', 'CANDIDAT'),
('test@gmail.com', '$2b$10$a.CoYNO09FcoaRCyLLgHE.fgOaU2n.nRp1ANWaquyiYm0mO/vYEha', 'Lécasse', 'Sam', '1999-02-10', '2023-04-27', 1, 'tel', 0, 0, 'HOMME', 'CANDIDAT'),
('test_create_user@example.com', '$2b$10$o/15FW0bxKMVHjYj/boJDOGHgm6uKe2zpTkk.XthP2tFthWrGc8c.', 'Nom_test_create_user', 'Prenom_test_create_user', '1990-01-01', '2023-05-17', 1, '0612345678', 48.1234, 2.5678, 'HOMME', 'CANDIDAT');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Candidature`
--
ALTER TABLE `Candidature`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Candidature_ibfk_1` (`email_utilisateur`),
  ADD KEY `Candidature_ibfk_2` (`id_offre`);

--
-- Index pour la table `Description`
--
ALTER TABLE `Description`
  ADD PRIMARY KEY (`numero`);

--
-- Index pour la table `Fiche_poste`
--
ALTER TABLE `Fiche_poste`
  ADD PRIMARY KEY (`numero`),
  ADD KEY `Fiche_poste_ibfk_1` (`statut_poste`),
  ADD KEY `Fiche_poste_ibfk_2` (`type_metier`),
  ADD KEY `Fiche_poste_ibfk_3` (`email_inscription`),
  ADD KEY `Fiche_poste_ibfk_4` (`id_description`),
  ADD KEY `Fiche_poste_Siren` (`FP_SIREN`);

--
-- Index pour la table `Formulaire`
--
ALTER TABLE `Formulaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Formulaire_ibfk_1` (`email_utilisateur`),
  ADD KEY `Formulaire_ibfk_2` (`siren_orga`);

--
-- Index pour la table `Offre_d_emploi`
--
ALTER TABLE `Offre_d_emploi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_poste` (`id_poste`);

--
-- Index pour la table `Organisation`
--
ALTER TABLE `Organisation`
  ADD PRIMARY KEY (`siren`),
  ADD KEY `Organisation_ibfk_1` (`type_organisation`);

--
-- Index pour la table `Pieces_jointes`
--
ALTER TABLE `Pieces_jointes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Pieces_jointes_ibfk_1` (`id_candidature`);

--
-- Index pour la table `Statut_poste`
--
ALTER TABLE `Statut_poste`
  ADD PRIMARY KEY (`nom`);

--
-- Index pour la table `Type_metier`
--
ALTER TABLE `Type_metier`
  ADD PRIMARY KEY (`nom`);

--
-- Index pour la table `Type_organisation`
--
ALTER TABLE `Type_organisation`
  ADD PRIMARY KEY (`nom`);

--
-- Index pour la table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Candidature`
--
ALTER TABLE `Candidature`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `Fiche_poste`
--
ALTER TABLE `Fiche_poste`
  MODIFY `numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `Formulaire`
--
ALTER TABLE `Formulaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT pour la table `Offre_d_emploi`
--
ALTER TABLE `Offre_d_emploi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `Pieces_jointes`
--
ALTER TABLE `Pieces_jointes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Candidature`
--
ALTER TABLE `Candidature`
  ADD CONSTRAINT `Candidature_ibfk_1` FOREIGN KEY (`email_utilisateur`) REFERENCES `Utilisateur` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `Candidature_ibfk_2` FOREIGN KEY (`id_offre`) REFERENCES `Offre_d_emploi` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Fiche_poste`
--
ALTER TABLE `Fiche_poste`
  ADD CONSTRAINT `Fiche_poste_Siren` FOREIGN KEY (`FP_SIREN`) REFERENCES `Organisation` (`siren`) ON DELETE CASCADE,
  ADD CONSTRAINT `Fiche_poste_ibfk_1` FOREIGN KEY (`statut_poste`) REFERENCES `Statut_poste` (`nom`) ON DELETE CASCADE,
  ADD CONSTRAINT `Fiche_poste_ibfk_2` FOREIGN KEY (`type_metier`) REFERENCES `Type_metier` (`nom`) ON DELETE CASCADE,
  ADD CONSTRAINT `Fiche_poste_ibfk_3` FOREIGN KEY (`email_inscription`) REFERENCES `Utilisateur` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `Fiche_poste_ibfk_4` FOREIGN KEY (`id_description`) REFERENCES `Description` (`numero`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Formulaire`
--
ALTER TABLE `Formulaire`
  ADD CONSTRAINT `Formulaire_ibfk_1` FOREIGN KEY (`email_utilisateur`) REFERENCES `Utilisateur` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `Formulaire_ibfk_2` FOREIGN KEY (`siren_orga`) REFERENCES `Organisation` (`siren`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Organisation`
--
ALTER TABLE `Organisation`
  ADD CONSTRAINT `Organisation_ibfk_1` FOREIGN KEY (`type_organisation`) REFERENCES `Type_organisation` (`nom`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Pieces_jointes`
--
ALTER TABLE `Pieces_jointes`
  ADD CONSTRAINT `Pieces_jointes_ibfk_1` FOREIGN KEY (`id_candidature`) REFERENCES `Candidature` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
