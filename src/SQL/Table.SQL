-- Date: 2020-05-06 15:00:00
-- Author: Sacha-sz; Tobias Savary;
-- Description: Création des tables de la base de données

-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS Utilisateur;
DROP TABLE IF EXISTS Formulaire;
DROP TABLE IF EXISTS Organisation;
DROP TABLE IF EXISTS Type_organisation;
DROP TABLE IF EXISTS Candidature;

-- Création des types
CREATE TYPE ETAT_OFFRE AS ENUM ('NON PUBLIEE', 'PUBLIEE', 'EXPIREE');
CREATE TYPE ETAT_CANDIDATURE AS ENUM ('EN COURS', 'REFUSEE', 'ACCEPTEE');
CREATE TYPE SEXE AS ENUM ('HOMME', 'FEMME', 'AUTRE');
CREATE TYPE TYPE_FORMULAIRE AS ENUM ('CREATION', 'REJOINDRE');
CREATE TYPE TYPE_PIECES AS ENUM ('CV', 'LM', 'Autre');
CREATE TYPE TYPE_UTILISATEUR AS ENUM ('CANDIDAT', 'RECRUTEUR', 'ADMINISTRATEUR');

-- Création des tables
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
    sexe SEXE NOT NULL,
    type_utilisateur TYPE_UTILISATEUR NOT NULL
);

CREATE TABLE Formulaire (
    id INT PRIMARY KEY AUTO_INCREMENT,
    etat_formulaire ETAT_CANDIDATURE NOT NULL, -- Accepté ou refusé
    date_creation DATE NOT NULL,
    type_formulaire TYPE_FORMULAIRE NOT NULL,
    email_utilisateur VARCHAR(255) NOT NULL,
    siren_orga VARCHAR(255) NOT NULL,
    FOREIGN KEY (email_utilisateur) REFERENCES Utilisateur(email),
    FOREIGN KEY (siren_orga) REFERENCES Organisation(siren)
);


CREATE TABLE Organisation (
    siren VARCHAR(255) PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    siege_social_lat FLOAT NOT NULL,
    siege_social_long FLOAT NOT NULL,
    type_organisation VARCHAR(50) NOT NULL,
    FOREIGN KEY (type_organisation) REFERENCES Type_organisation(nom)
);

CREATE TABLE Type_organisation (
    nom VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE Candidature (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date_candidature DATE NOT NULL,
    etat_candidature ETAT_CANDIDATURE NOT NULL,
    email_utilisateur VARCHAR(255) NOT NULL,
    id_offre INT NOT NULL,
    FOREIGN KEY (email_utilisateur) REFERENCES Utilisateur(email),
    FOREIGN KEY (id_offre) REFERENCES Offre_d_emploi(id)
);

CREATE TABLE Pieces_jointes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    type_pieces TYPE_PIECES NOT NULL,
    lien VARCHAR(255) NOT NULL,
    id_candidature INT NOT NULL,
    FOREIGN KEY (id_candidature) REFERENCES Candidature(id)
);

CREATE TABLE Offre_d_emploi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_de_piece INT UNSIGNED NOT NULL,
    etat  ETAT_OFFRE NOT NULL, 
    date_validite DATE NOT NULL, 
    indication_piece_jointes VARCHAR(255) NOT NULL,
    id_poste INT NOT NULL,
    FOREIGN KEY (id_poste) REFERENCES Fiche_poste(numero)
);


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
    FOREIGN KEY (type_metier) REFERENCES Type_metier(nom),
);

CREATE TABLE Statut_poste (
    nom VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE Type_metier (
    nom VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);


CREATE TABLE Description (
    numero INT PRIMARY KEY,
    missions VARCHAR(255) NOT NULL,
    activites VARCHAR(255) NOT NULL,
    competences_attendues VARCHAR(255) NOT NULL,
    FOREIGN KEY (numero) REFERENCES Fiche_poste(numero)
);