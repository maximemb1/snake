charger_sauvegarde();
effectuer_changement();

function main(){
    if (!etat_jeu.running) return;

    ctx.clearRect(0, 0, cvs.width, cvs.height);

    deplacement(parametre.inversion_controles);
    
    grille();
    for (let i=0; i<pommes.length; i++){
        let pomme = pommes[i];
        pomme.update();
    }
    for (let i=0; i<particules.length; i++){
        let particule = particules[i];
        particule.update();
    }
    
    snake.update();

   afficher();
   pause();

    requestAnimationFrame(main);
}

function jouer(mode, premiere_fois=true){
    if (etat_jeu.running) return;
    mode_act = mode_dispo[mode];
    etat_jeu.running = true;
    snake.vivant = true;
    snake.speed = mode_act.vitesse;

    if (premiere_fois){
        
        renisialisation();

        for (let i=0; i < mode_act.nbr_pomme; i++){
            spawn_pomme();
        }
    }

    main();
}

function renisialisation(){
    pommes = [];
    particules = [];
    snake.queue = [];
    snake.x = box*1;
    snake.y = box*3;
    snake.direction = "droite";
    snake.prochaine_direction = "droite";
    snake.queue.push(new Queue(snake.x-box, snake.y));
    joueur.pts = 0;
    joueur.longueur = 0;
    joueur.stats.pommes_mangees = 0;

    switch_ecran('jeu');
    afficher_overlay("aucun");
}

function pause(){
    if (!etat_jeu.pause) return;
    etat_jeu.running = false;
    afficher_overlay("pause");
}

function reprendre() {
    if (!etat_jeu.pause) return;
    etat_jeu.pause = false;
    
    afficher_overlay("aucun");
    jouer(mode_act.nom, false);

}

