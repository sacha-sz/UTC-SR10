-- Date: 2020-05-06 15:00:00
-- Author: Sacha-sz; Tobias Savary;
-- Description: Création des tables de la base de données

-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS Administrateur;
DROP TABLE IF EXISTS Recruteur;
DROP TABLE IF EXISTS Candidat;

-- Création des types
CREATE TYPE STATUT_UTILISATEUR AS ENUM ('ACTIF', 'INACTIF');
CREATE TYPE ETAT_OFFRE AS ENUM ('NON PUBLIEE', 'PUBLIEE', 'EXPIREE');
CREATE TYPE SEXE AS ENUM ('HOMME', 'FEMME', 'AUTRE');
CREATE TYPE TYPE_ORGANISATION AS ENUM ('ENTREPRISE', 'ASSOCIATION', 'EURL', 'SARL', 'SASU' ,'AUTRE');
CREATE TYPE TYPE_FORMATION AS ENUM ('AJOUT_ORGANISATION', 'ORGANISATION_EXISTANTE');

CREATE TABLE Utilisateur (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    date_naissance DATE NOT NULL,
    date_creation DATE NOT NULL,
    statut BOOLEAN NOT NULL,
    telephone VARCHAR(255) NOT NULL,
    adresse_utilisateur_lat FLOAT NOT NULL,
    adresse_utilisateur_long FLOAT NOT NULL,
    sexe VARCHAR(255) NOT NULL,
    type_utilisateur VARCHAR(255) NOT NULL
);

CREATE TABLE Organisation (
    siren VARCHAR(255) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    siege_social_lat FLOAT NOT NULL,
    siege_social_long FLOAT NOT NULL,
    type VARCHAR(255) NOT NULL,
    FOREIGN KEY (type) REFERENCES Type_organisation(nom)
);

CREATE TABLE Type_organisation (
    nom VARCHAR(255) PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE Fiche_poste (
    numero INT PRIMARY KEY,
    intitule VARCHAR(255) NOT NULL,
    responsable_hierarchique VARCHAR(255) NOT NULL,
    lieu_mission_lat FLOAT NOT NULL,
    lieu_mission_long FLOAT NOT NULL,
    rythme VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    salaire_min FLOAT NOT NULL,
    salaire_max FLOAT NOT NULL,
    statut_poste VARCHAR(255) NOT NULL,
    type_metier VARCHAR(255) NOT NULL,
    FOREIGN KEY (statut_poste) REFERENCES Statut_poste(nom),
    FOREIGN KEY (type_metier) REFERENCES Type_metier(nom)
);

CREATE TABLE Statut_poste (
    nom VARCHAR(255) PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE Type_metier (
    nom VARCHAR(255) PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE Formulaire (
    id INT PRIMARY KEY AUTO_INCREMENT,
    etat_offre VARCHAR(255) NOT NULL,
    date_creation DATE NOT NULL,
    type_formulaire VARCHAR(255) NOT NULL,
    email_utilisateur VARCHAR(255) NOT NULL,
    siren_orga VARCHAR(255) NOT NULL,
    FOREIGN KEY (email_utilisateur) REFERENCES Utilisateur(email),
    FOREIGN KEY (siren_orga) REFERENCES Organisation(siren)
);

CREATE TABLE Offre_d_emploi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_de_piece INT UNSIGNED NOT NULL,
    etat VARCHAR(255) NOT NULL,
    date_validite DATE NOT NULL,
    indication_piece_jointes VARCHAR(255) NOT NULL,
    id_poste INT NOT NULL,
    FOREIGN KEY (id_poste) REFERENCES Fiche_poste(numero)
);

CREATE TABLE Candidature (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date_candidature DATE NOT NULL,
    etat VARCHAR(255) NOT NULL,
    statut VARCHAR(255) NOT NULL,
    email_utilisateur VARCHAR(255) NOT NULL,
    id_offre INT NOT NULL,
    FOREIGN KEY (email_utilisateur) REFERENCES Utilisateur(email),
    FOREIGN KEY (id_offre) REFERENCES Offre_d_emploi(id)
);

CREATE TABLE Pieces_jointes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    lien VARCHAR(255) NOT NULL,
    id_candidature INT NOT NULL,
    FOREIGN KEY (id_candidature) REFERENCES Candidature(id)
);

CREATE TABLE Description (
    numero INT PRIMARY KEY,
    missions VARCHAR(255) NOT NULL,
    activites VARCHAR(255) NOT NULL,
    competences_attendues VARCHAR(255) NOT NULL
);

