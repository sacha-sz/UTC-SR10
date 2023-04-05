// *******************************
// * Gestion de l'authentification lors de la connexion et de l'inscription
// *******************************


// *******************************
// *        Communs
// *******************************

function TEST_MDP(mdp1) {
    // 12 caractères minimum dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial parmis : &~"#'{}[]()-|`_\^@=/*-+.,?;:!<>€$£*
    var correct_password_test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&~"#'{}[\]\(\)-|`_\^@=/*-+.,?;:!<>€$£*]).{12,}$/;
    return correct_password_test.test(mdp1);
}

function TEST_MAIL(email_a_tester) {
    // Vérification de l'adresse e-mail 
    // Format :
    //  - 1 ou plusieurs caractères alphanumériques ou caractères spéciaux . _ - +
    //  - @
    //  - 1 ou plusieurs caractères alphanumériques ou caractères spéciaux . _ - +
    //  - .
    //  - 2 ou 3 caractères alphanumériques

    var correct_email_test = /^([a-zA-Z0-9_\.\-+]+)@([a-zA-Z0-9_\.\-+]+)\.([a-zA-Z]{2,3})$/;
    return correct_email_test.test(email_a_tester);
}
// *******************************
// *        Inscription
// *******************************


function verifMdp() {
    // Vérification que les deux mots de passe sont identiques
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
    
    document.getElementById("msg").innerHTML = msg;
}


function verifMail_inscription() {
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