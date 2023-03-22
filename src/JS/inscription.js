// Vérification que les deux mots de passe sont identiques
function verifMdp() {
    var mdp1 = document.getElementById("mdp1").value;
    var mdp2 = document.getElementById("mdp2").value;
    var msg;
    if (mdp1 != mdp2) {
        msg = "<p class = 'text-danger'>Les deux mots de passe sont différents</p>";
        document.getElementById("mdp2").value = "";
        document.getElementById("submit").disabled = true;
        document.getElementById("submit").className = "btn btn-secondary";
    } else {
        msg = "<p class = 'text-success'>Les deux mots de passe sont identiques</p>";
        document.getElementById("submit").disabled = false;
        document.getElementById("submit").className = "btn btn-primary";
    }
    // Affichage du message
    document.getElementById("msg").innerHTML = msg;
}



// Verification de l'adresse email
function verifMail() {
    // Expression régulière pour vérifier le format de l'adresse email
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = document.getElementById("email").value;
    if (re.test(email)) {
        msg_email = "<p class = 'text-success'>Adresse e-mail valide</p>";
        // Activation du bouton d'envoi
        document.getElementById("submit").disabled = false;
        document.getElementById("submit").className = "btn btn-primary";
    } else {
        msg_email = "<p class = 'text-danger'>Adresse e-mail non valide</p>";
        // Desactivation du bouton d'envoi
        document.getElementById("submit").disabled = true;
        document.getElementById("submit").className = "btn btn-secondary";
    }
    // Affichage du message
    document.getElementById("msg_email").innerHTML = msg_email;
}

function verifForm() {
    if (document.getElementById("nom").value == '' || document.getElementById("prenom").value == '' || document.getElementById("tel").value == '' || document.getElementById("sexe").value == '' || document.getElementById("ddn").value == '') {
        alert("Veuillez saisir tout les champs pour vous inscrire")
        return false;
    } else {
        return true;
    }
}