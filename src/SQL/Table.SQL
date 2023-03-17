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

CREATE TABLE Administrateur (
    email VARCHAR() PRIMARY KEY,
    password VARCHAR() NOT NULL,
    nom VARCHAR() NOT NULL,
    prenom VARCHAR() NOT NULL,
    date_creation DATE NOT NULL,
    telephone VARCHAR(10) NOT NULL,
    statut STATUT_UTILISATEUR  NOT NULL,
    sexe SEXE
)

CREATE TABLE Recruteur (
    email VARCHAR() PRIMARY KEY,
    password VARCHAR() NOT NULL,
    nom VARCHAR() NOT NULL,
    prenom VARCHAR() NOT NULL,
    date_creation DATE NOT NULL,
    telephone VARCHAR(10) NOT NULL,
    statut STATUT_UTILISATEUR NOT NULL,
    sexe SEXE
)

CREATE TABLE Candidat (
    email VARCHAR() PRIMARY KEY,
    password VARCHAR() NOT NULL,
    nom VARCHAR() NOT NULL,
    prenom VARCHAR() NOT NULL,
    date_creation DATE NOT NULL,
    telephone VARCHAR(10) NOT NULL,
    statut STATUT_UTILISATEUR NOT NULL,
    sexe SEXE
)

