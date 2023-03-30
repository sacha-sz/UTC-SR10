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

// Test la validité du mot de passe
function TEST_MDP(mdp1) {
    // 12 caractères minimum dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial parmis : &~"#'{}[]()-|`_\^@=/*-+.,?;:!<>€$£*
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&~"#'{}[\]\(\)-|`_\^@=/*-+.,?;:!<>€$£*]).{12,}$/;
    return re.test(mdp1);
}

// Test la validité de l'adresse email
function TEST_MAIL(email_a_tester) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email_a_tester);
}


// Verification de l'adresse email
function verifMail() {
    var email = document.getElementById("email").value;
    if (TEST_MAIL(email) {
        msg_email = "<p class = 'text-success'>Adresse e-mail valide</p>";
        // Activation du bouton d'envoi
        document.getElementById("submit").disabled = false;
        document.getElementById("submit").className = "btn btn-primary btn-block";
    } else {
        msg_email = "<p class = 'text-danger'>Adresse e-mail non valide</p>";
        // Desactivation du bouton d'envoi
        document.getElementById("submit").disabled = true;
        document.getElementById("submit").className = "btn btn-secondary btn-block";
    }
    document.getElementById("msg_email").innerHTML = msg_email;
}


// Vérification que tous les champs sont correctement remplis pour l'inscription de l'email et du mot de passe
function verifForm_email() {
    if (document.getElementById("email").value == '' || document.getElementById("mdp1").value == '' || document.getElementById("mdp2").value == '') {
        return false;
    } else {
        if (TEST_MAIL(document.getElementById("email").value) && document.getElementById("mdp1").value == document.getElementById("mdp2").value) {
            return true;
        } else {
            return false;
        }
    }
}

function verifForm() {
    if (document.getElementById("nom").value == '' || document.getElementById("prenom").value == '' || document.getElementById("tel").value == '' || document.getElementById("sexe").value == '' || document.getElementById("ddn").value == '') {
        alert("Veuillez saisir tout les champs pour vous inscrire")
        return false;
    } else {
        return true;
    }
}