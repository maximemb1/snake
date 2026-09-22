const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");

const box = 24;

cvs.width = box*25;
cvs.height = box*20;

const etat_jeu = {running: false, pause: false, win: false, game_over: false};

const mode_dispo = {normal: {nom: "normal", nbr_pomme: 5, pourcentage_noir: 0.09, pourcentage_doree: 0.9, vitesse: 2},
            infini: {nom: "infini", nbr_pomme: 20, pourcentage_noir: 0.08, pourcentage_doree: 0.85, vitesse: 2},
            hard: {nom: "hard", nbr_pomme: 2, pourcentage_noir: 0.1, pourcentage_doree: 0.91, vitesse: 4}};

let mode_act = "";

function grille(){
    ctx.strokeStyle = "rgba(200,255,212,0.5)";
    ctx.lineWidth = 0.3;
    // *** ligne horizontale ***
    for (let x = 0; x<= cvs.width; x += box){
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x, cvs.height);
        ctx.stroke();
    }
    // *** ligne verticale ***
    for (let y =0; y <= cvs.height; y += box){
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cvs.width, y);
        ctx.stroke();
    }
}

grille();

// *** Parametre ***
const parametre = {inversion_controles: false, touche_sur_mobile: false};


// *** variable html ***
const p_score = document.getElementById("score");
const p_pomme = document.getElementById("pomme");
const p_long = document.getElementById("long");
const menu = document.getElementById("menu");
const h3_menu = document.getElementById("h3_menu");
const jeu = document.getElementById("game_play");
const section_shop = document.getElementById("shop");
const overlay = document.getElementById("overlay");
const game_over = document.getElementById("game_over");
const win = document.getElementById("win");
const div_pause = document.getElementById("pause");
const p_game_over = document.getElementById("p_game_over");
const p_win = document.getElementById("p_win");
const conteneur_shop = document.getElementById("conteneur_shop");
const or_shop = document.getElementById("or_shop");
const btn_continuer_shop = document.getElementById("btn_coninuer");
const message = document.getElementById("message");
const section_parametre = document.getElementById("section_parametre");
const flech_mobile = document.getElementById("fleche_mobile");

// *** Sauvegarde ***
function sauvegarder(){
    let data = {
        or : joueur.or,
        skins : joueur.skin,
        skin_equipe : joueur.skin_equipe,
        stats : joueur.stats,
        inversion_controles: parametre.inversion_controles,
        touche_mobile: parametre.touche_sur_mobile
    } ;
    localStorage.setItem("save_snake", JSON.stringify(data));
}
function charger_sauvegarde(){
    let save = localStorage.getItem("save_snake");
    if (save){
        let data = JSON.parse(save);
        joueur.or = data.or;
        joueur.skin = data.skins;
        joueur.skin_equipe = data.skin_equipe;
        joueur.stats = data.stats;
        parametre.inversion_controles = data.inversion_controles;
        parametre.touche_sur_mobile = data.touche_mobile;
    }
}

// *** Gestion php pour plateforme jeux ***
/* function envoyer_donnees_snake_php(){
    fetch("../../api/enregistrer_snake.php",{
        method: "POST",
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({
            score: joueur.pts || 0,
            pommes_mangees: joueur.stats.pommes_mangees  || 0,
            longueur_ttl: joueur.longueur || 0,
            or: joueur.or_cette_game || 0
        })
    })
    .then(reponse => {
        console.log("2 - réponse reçue :", reponse.status);
        return reponse.text();
    })
    .then(data => {
        console.log("3 - réponse PHP :", data);
    })
    .catch(erreur => {
        console.error("ERREUR FETCH :", erreur);
    });
}
function envoyer_stats_global_php(){
    fetch("../../api/enregistrer_global.php",{
        method: "POST",
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({
            score: joueur.pts,
            dernier_jeu: 'snake'
        })
    })
} */

