-- Date: 2023-03-06 15:00:00
-- Author: Sacha-sz; Tobias Savary;
-- Description: Création des tables de la base de données

-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS Utilisateur;
DROP TABLE IF EXISTS Formulaire;
DROP TABLE IF EXISTS Organisation;
DROP TABLE IF EXISTS Type_organisation;
DROP TABLE IF EXISTS Candidature;
DROP TABLE IF EXISTS Pieces_jointes;
DROP TABLE IF EXISTS Statut_poste;
DROP TABLE IF EXISTS Type_metier;
DROP TABLE IF EXISTS Offre_d_emploi;
DROP TABLE IF EXISTS Fiche_poste;
DROP TABLE IF EXISTS Description;

-- OK Création des tables
CREATE TABLE Statut_poste (
    nom VARCHAR(50) PRFFIMARY KEY,
    description VARCHAR(255) NOT NULL
);


-- OK
CREATE TABLE Type_metier (
    nom VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

-- OK
CREATE TABLE Utilisateur (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    date_naissance DATE NOT NULL,
    date_creation DATE NOT NULL,
    statut BOOLEAN NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    adresse_utilisateur_lat FLOAT NOT NULL,
    adresse_utilisateur_long FLOAT NOT NULL,
    sexe ENUM ('HOMME', 'FEMME', 'AUTRE') NOT NULL,
    type_utilisateur ENUM ('CANDIDAT', 'RECRUTEUR', 'ADMINISTRATEUR') NOT NULL
);

-- OK
CREATE TABLE Type_organisation (
    nom VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

-- OK
CREATE TABLE Fiche_poste (
    numero INT PRIMARY KEY,
    intitule VARCHAR(255) NOT NULL,
    responsable_hierarchique VARCHAR(255) NOT NULL,
    lieu_mission_lat FLOAT NOT NULL,
    lieu_mission_long FLOAT NOT NULL,
    rythme VARCHAR(255) NOT NULL,
    salaire_min FLOAT NOT NULL,
    salaire_max FLOAT NOT NULL,
    statut_poste VARCHAR(50) NOT NULL,
    type_metier VARCHAR(50) NOT NULL,
    FOREIGN KEY (statut_poste) REFERENCES Statut_poste(nom),
    FOREIGN KEY (type_metier) REFERENCES Type_metier(nom)
);

-- OK
CREATE TABLE Description (
    numero INT PRIMARY KEY,
    missions VARCHAR(255) NOT NULL,
    activites VARCHAR(255) NOT NULL,
    competences_attendues VARCHAR(255) NOT NULL,
    FOREIGN KEY (numero) REFERENCES Fiche_poste(numero)
);

-- OK
CREATE TABLE Organisation (
    siren VARCHAR(255) PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    siege_social_lat FLOAT NOT NULL,
    siege_social_long FLOAT NOT NULL,
    type_organisation VARCHAR(50) NOT NULL,
    FOREIGN KEY (type_organisation) REFERENCES Type_organisation(nom)
);


-- OK
CREATE TABLE Formulaire (
    id INT PRIMARY KEY AUTO_INCREMENT,
    etat_formulaire ENUM ('EN COURS', 'REFUSEE', 'ACCEPTEE') NOT NULL, -- Accepté ou refusé
    date_creation DATE NOT NULL,
    type_formulaire ENUM ('CREATION', 'REJOINDRE') NOT NULL,
    email_utilisateur VARCHAR(255) NOT NULL,
    siren_orga VARCHAR(255) NOT NULL,
    FOREIGN KEY (email_utilisateur) REFERENCES Utilisateur(email),
    FOREIGN KEY (siren_orga) REFERENCES Organisation(siren)
);

-- OK
CREATE TABLE Offre_d_emploi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_de_piece INT UNSIGNED NOT NULL,
    etat  ENUM ('NON PUBLIEE', 'PUBLIEE', 'EXPIREE') NOT NULL, 
    date_validite DATE NOT NULL, 
    indication_piece_jointes VARCHAR(255) NOT NULL,
    id_poste INT NOT NULL,
    FOREIGN KEY (id_poste) REFERENCES Fiche_poste(numero)
);


-- OK
CREATE TABLE Candidature (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date_candidature DATE NOT NULL,
    etat_candidature ENUM ('EN COURS', 'REFUSEE', 'ACCEPTEE') NOT NULL,
    email_utilisateur VARCHAR(255) NOT NULL,
    id_offre INT NOT NULL,
    FOREIGN KEY (email_utilisateur) REFERENCES Utilisateur(email),
    FOREIGN KEY (id_offre) REFERENCES Offre_d_emploi(id)
);

-- OK
CREATE TABLE Pieces_jointes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    type_pieces ENUM ('CV', 'LM', 'Autre') NOT NULL,
    lien VARCHAR(255) NOT NULL,
    id_candidature INT NOT NULL,
    FOREIGN KEY (id_candidature) REFERENCES Candidature(id)
);



