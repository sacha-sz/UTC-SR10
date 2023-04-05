SELECT * FROM Offre_d_emploi 
INNER JOIN Fiche_poste ON Offre_d_emploi.id_poste = Fiche_poste.numero 
WHERE Fiche_poste.type_metier = 'nom_du_type_metier';

SELECT *, SQRT(POW(lieu_mission_lat - adresse_utilisateur_lat, 2) + POW(lieu_mission_long - adresse_utilisateur_long, 2)) AS distance 
FROM Offre_d_emploi 
INNER JOIN Fiche_poste ON Offre_d_emploi.id_poste = Fiche_poste.numero 
ORDER BY distance;