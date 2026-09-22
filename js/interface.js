function afficher_score(){
    p_score.textContent = `Score: ${joueur.pts}`;
}

function afficher_pomme(){
    p_pomme.textContent = `Pommes: ${joueur.stats.pommes_mangees}`;
}

function afficher_longueur(){
    p_long.textContent = `Longueur: ${joueur.longueur}`;
}

function afficher(){
    afficher_score();
    afficher_pomme();
    afficher_longueur();
}

function switch_ecran(ecran){
    switch (ecran){

        case "menu":
            etat_jeu.running = false;
            menu.style.display = "flex";
            jeu.style.display = "none";
            section_shop.style.display = "none";
            if (window.innerWidth < 400) h3_menu.textContent = "Joue avec les ◀️🔼▶️🔽 !"
            else h3_menu.textContent = "Joue avec les flèches !";

            sauvegarder();
            afficher_overlay("aucun");
            break;

        case "jeu":
            jeu.style.display = "flex";
            menu.style.display = "none";
            section_shop.style.display = "none";
            btn_continuer_shop.style.display = "none";
            
            afficher_overlay("aucun");
            break;
        
        case "shop":
            section_shop.style.display = "flex";
            menu.style.display = "none";
            jeu.style.display = "none";
            if (etat_jeu.pause) btn_continuer_shop.style.display = "flex";
            creer_card();
            afficher_overlay("aucun");
            break;
    }
}
if (window.innerWidth < 400) h3_menu.textContent = "Joue avec les ◀️🔼▶️🔽 !"
else h3_menu.textContent = "Joue avec les flèches !";

function afficher_overlay(ecran){
    switch (ecran){

        case "g_o":
            overlay.style.display = "flex";
            game_over.style.display = "flex";
            win.style.display = "none";
            div_pause.style.display = "none";
            p_game_over.textContent = `Meilleur score: ${joueur.stats.meilleur_score}`;
            break;
        
        case "win":
            overlay.style.display = "flex";
            game_over.style.display = "none";
            win.style.display = "flex";
            div_pause.style.display = "none";
            p_win.textContent = `Pommes mangées: ${joueur.stats.pommes_mangees}`;
            break;

        case "pause":
            overlay.style.display = "flex";
            game_over.style.display = "none";
            win.style.display = "none";
            div_pause.style.display = "flex";
            sauvegarder();
            break;
        
        case "aucun":
            overlay.style.display = "none";
            game_over.style.display = "none";
            win.style.display = "none";
            div_pause.style.display = "none";
            break;
    }
}
let timeout_message;

function messages(texte, type){
    clearTimeout(timeout_message);

    message.classList.remove("disparait");
    message.classList.remove("erreur", "reussite", "succes");
    message.classList.add(type);

    message.textContent = texte;
    message.classList.add("visible");

    timeout_message = setTimeout(() => {
        message.classList.remove("visible", type);
        message.classList.add("disparait");
        message.classList.add(type+"bg");
    }, 2000);
}

message.addEventListener("animationend", (event) => {
    if (event.animationName === "disparait") {
        message.classList.remove("disparait", "erreurbg", "reussitebg", "succesbg");
    }
});

function afficher_parametre(){
    if (section_parametre.style.display !== "flex"){
        section_parametre.style.display = "flex";

        section_parametre.innerHTML = "";
        section_parametre.innerHTML += `<h3>Paramètres</h3>
                                        <div class="parametre">
                                            <label for="inversion_controles">Inverser les contrôles</label>
                                            <input type="checkbox" id="inversion_controles" ${parametre.inversion_controles ? "checked":""}>
                                        </div>
                                        <div class="parametre">
                                            <label for="touche_sur_mobile">Jouer avec les touches sur mobile</label>
                                            <input type="checkbox" id="touche_sur_mobile" ${parametre.touche_sur_mobile ? "checked":""}>
                                        </div>`;
    }
    else{
         section_parametre.style.display = "none";
         sauvegarder_parametre();

    }
}

function sauvegarder_parametre(){
    const inversion_controles = document.getElementById("inversion_controles").checked;
    const touche_sur_mobile = document.getElementById("touche_sur_mobile").checked;

    if (inversion_controles !== parametre.inversion_controles) parametre.inversion_controles = inversion_controles;
    if (touche_sur_mobile !== parametre.touche_sur_mobile) parametre.touche_sur_mobile = touche_sur_mobile;
    effectuer_changement();
    sauvegarder();
}

function effectuer_changement(){
    if (parametre.inversion_controles) deplacement(true);
    else deplacement(false);
    
    if (parametre.touche_sur_mobile && window.innerWidth < 500) fleche_mobile.style.display = "flex";
    else fleche_mobile.style.display = "none";
}
 effectuer_changement();