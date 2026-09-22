class Snake{
    constructor(){
        this.x = box*1;
        this.y =box*1;
        this.size = box;
        this.speed =  2;
        this.queue = [];
        this.vivant = false;
        this.direction = "droite";
        this.prochaine_direction = "droite";
    }

    draw_tete(){
        let diviseur_x = 0;
        let diviseur_y = 0;
        let diviseur_x2 = 0;
        let diviseur_y2 = 0;
        let decalage_pupille = {x: 0, y: 0};

        if (this.direction === "droite"){
             diviseur_x = 2.5;
             diviseur_x2 = 2.5;
             diviseur_y = 1.5;
             diviseur_y2 = 3;
             decalage_pupille.x = 1;
             decalage_pupille.y = 0;
        }else if (this.direction === "gauche"){
            diviseur_x = 1.5;
            diviseur_x2 = 1.5;
            diviseur_y = 1.5;
            diviseur_y2 = 3;
            decalage_pupille.x = -1;
            decalage_pupille.y = 0;
        }else if (this.direction === "haut"){
            diviseur_x = 1.5;
            diviseur_y = 1.5;
            diviseur_x2 = 3;
            diviseur_y2 = 1.5;
            decalage_pupille.x = 0;
            decalage_pupille.y = -1;
        }else if (this.direction === "bas"){
            diviseur_x = 1.5;
            diviseur_x2 = 3;
            diviseur_y = 2.5;
            diviseur_y2 = 2.5;
            decalage_pupille.x = 0;
            decalage_pupille.y = 1;
        }
        // ** oeuil **
        ctx.beginPath();
        ctx.fillStyle = "rgb(200, 255, 230)";
        ctx.arc(this.x+box/diviseur_x, this.y+box/diviseur_y, 5, 0, Math.PI*2);
        ctx.arc(this.x+box/diviseur_x2, this.y+box/diviseur_y2, 5, 0 ,Math.PI*2);
        ctx.fill();
        // ** pupille **
        ctx.beginPath();
        ctx.fillStyle = joueur.skin_equipe.Yeux.color;
        ctx.arc(this.x+box/diviseur_x + decalage_pupille.x, this.y+box/diviseur_y + decalage_pupille.y, 2.5, 0, Math.PI*2);
        ctx.arc(this.x+box/diviseur_x2 + decalage_pupille.x, this.y+box/diviseur_y2 + decalage_pupille.y, 2.5, 0 ,Math.PI*2);
        ctx.fill();
        // * faire varier les diviseur pour suivre du regard la pomme la + proche *

        // ** dents **
        const dent = 6;      // largeur de la base
        const profondeur = 3; // profondeur de la dent

        ctx.fillStyle = joueur.skin_equipe.Dents.color;

        if (this.direction === "droite"){
            // Dent du haut
            ctx.beginPath();
            ctx.moveTo(this.x + box +3, this.y + box/3);
            ctx.lineTo(this.x + box - profondeur, this.y + box/3 - dent/2);
            ctx.lineTo(this.x + box - profondeur, this.y + box/3 + dent/2);
            ctx.fill();
            // Dent du bas
            ctx.beginPath();
            ctx.moveTo(this.x + box +3, this.y + box/1.4);
            ctx.lineTo(this.x + box - profondeur, this.y + box/1.4 - dent/2);
            ctx.lineTo(this.x + box - profondeur, this.y + box/1.4 + dent/2);
            ctx.fill();
        }

        else if (this.direction === "gauche"){
            // Dent du haut
            ctx.beginPath();
            ctx.moveTo(this.x -3, this.y + box/3);
            ctx.lineTo(this.x + profondeur, this.y + box/3 - dent/2);
            ctx.lineTo(this.x + profondeur, this.y + box/3 + dent/2);
            ctx.fill();
            // Dent du bas
            ctx.beginPath();
            ctx.moveTo(this.x -3, this.y + box/1.4);
            ctx.lineTo(this.x + profondeur, this.y + box/1.4 - dent/2);
            ctx.lineTo(this.x + profondeur, this.y + box/1.4 + dent/2);
            ctx.fill();
        }

        else if (this.direction === "haut"){
            // Dent de gauche
            ctx.beginPath();
            ctx.moveTo(this.x + box/3, this.y -3);
            ctx.lineTo(this.x + box/3 - dent/2, this.y + profondeur);
            ctx.lineTo(this.x + box/3 + dent/2, this.y + profondeur);
            ctx.fill();
            // Dent de droite
            ctx.beginPath();
            ctx.moveTo(this.x + box/1.4, this.y -3);
            ctx.lineTo(this.x + box/1.4 - dent/2, this.y + profondeur);
            ctx.lineTo(this.x + box/1.4 + dent/2, this.y + profondeur);
            ctx.fill();
        }

        else if (this.direction === "bas"){
            // Dent de gauche
            ctx.beginPath();
            ctx.moveTo(this.x + box/3, this.y + box +3);
            ctx.lineTo(this.x + box/3 - dent/2, this.y + box - profondeur);
            ctx.lineTo(this.x + box/3 + dent/2, this.y + box - profondeur);
            ctx.fill();
            // Dent de droite
            ctx.beginPath();
            ctx.moveTo(this.x + box/1.4, this.y + box +3);
            ctx.lineTo(this.x + box/1.4 - dent/2, this.y + box - profondeur);
            ctx.lineTo(this.x + box/1.4 + dent/2, this.y + box - profondeur);
            ctx.fill();
        }
    }

    draw(){
        ctx.fillStyle = joueur.skin_equipe.Corps.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        // ** Dessin queue **
            for (let i=0; i < this.queue.length; i++){
                this.queue[i].draw();
            }
        this.draw_tete();
    }

    changement_direction(){
        if (this.direction === this.prochaine_direction) return;

        if (this.prochaine_direction === "haut" || this.prochaine_direction === "bas"){
            if (this.x  % box === 0){ 
                this.ajouter_virage(this.x, this.y, this.prochaine_direction);
                this.direction = this.prochaine_direction;
            }
        }
        else if (this.prochaine_direction === "gauche" || this.prochaine_direction === "droite"){
            if (this.y % box === 0) {
                this.ajouter_virage(this.x, this.y, this.prochaine_direction);
                this.direction = this.prochaine_direction;
            }
        }
    }

    deplacement(){
        if (this.direction === "droite") this.x += this.speed;
        else if (this.direction === "gauche") this.x -= this.speed;
        else if (this.direction === "haut") this.y -= this.speed;
        else if (this.direction === "bas") this.y += this.speed;
    }

    colision_mure(){
        if (this.x + this.size -5 >= cvs.width) this.vivant = false;
        if (this.x + 5 <= 0) this.vivant = false;
        if (this.y + this.size -5 >= cvs.height) this.vivant = false;
        if (this.y + 5 <= 0) this.vivant = false;
    }

    colision_lui_meme(){
        for (let i=1; i < this.queue.length; i++){
            this.queue[i].colision_snake();
        }
    }
    // *** Partie Queue ***
    ajouter_virage(x, y, dir){
        for (let i=0; i < this.queue.length; i++){
            this.queue[i].pro_virage.push({"x": x, "y": y, "direction": dir});
        }
    }

    changement_direction_queue(){
        for (let i=0; i < this.queue.length; i++){   
            let queue = this.queue[i];
            let queue_avant = i === 0 ?  snake : this.queue[i-1]; 

            if (queue.pro_virage.length > 0 && queue.x === queue.pro_virage[0].x && queue.y === queue.pro_virage[0].y){
                queue.direction = queue.pro_virage[0].direction;
                queue.pro_virage.splice(0, 1);
            }
        }
    }

    maj_hit_box(i){
        if (this.queue[i].x % box === 0) this.queue[i].hit_box.x = this.queue[i].x / box;
        if (this.queue[i].y % box === 0) this.queue[i].hit_box.y = this.queue[i].y / box;
    }

    deplacement_queue(){
        for (let i=0; i<this.queue.length; i++){
            let cette_queue= this.queue[i];

            if (cette_queue.direction === "droite") cette_queue.x += this.speed;
            else if (cette_queue.direction === "gauche") cette_queue.x -= this.speed;
            else if (cette_queue.direction === "haut") cette_queue.y -= this.speed;
            else if (cette_queue.direction === "bas") cette_queue.y += this.speed;
            
            this.maj_hit_box(i);
        }
    }

    mort(){
        if (!this.vivant) {
            joueur.nouv_meilleur_score();
            afficher_overlay("g_o");
            etat_jeu.game_over = true;
            etat_jeu.running = false;

            /* envoyer_donnees_snake_php();
            envoyer_stats_global_php(); */

            joueur.or_cette_game = 0;
            sauvegarder();
        }
    }

    victoire(){
        if (pommes.length === 0 || joueur.longueur >= 498) {
            joueur.nouv_meilleur_score();
            afficher_overlay("win");
            etat_jeu.win = true;
            etat_jeu.running = false;
                        
            /* envoyer_donnees_snake_php();
            envoyer_stats_global_php(); */

            joueur.or_cette_game = 0;
            sauvegarder();
        }
    }

    update(){
        this.changement_direction();
        this.deplacement();
        this.changement_direction_queue();
        this.deplacement_queue();
        this.colision_mure();
        this.colision_lui_meme();
        this.mort();
        this.victoire();
        this.draw();
    }
}

class Queue{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.hit_box = {"x": this.x/box, "y": this.y/box};
        this.size = box;
        this.direction = snake.queue.length === 0 ?  snake.direction : snake.queue.at(-1).direction;
        this.pro_virage = snake.queue.length > 0 ?[ ...snake.queue.at(-1).pro_virage] : [];
    }

    draw(){
        ctx.fillStyle = joueur.skin_equipe.Corps.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        // ** Effet particules **
        if (joueur.skin_equipe.Effet.id !== ""){
            if (particules.length < 100 && Math.random() < 0.008){
                particules.push(new Particules(this.x + box/2, this.y+box/2, joueur.skin_equipe.Effet.color, joueur.skin_equipe.Effet.forme));
            }
        }
    }

    colision_snake(){
        //  x par la D                  x par la G                  y par le H              y par le B
        if (snake.x + box > this.x  && snake.x < this.x +box && snake.y+box > this.y && snake.y < this.y+box){
            snake.vivant = false;
        }
    }
}


class Joueur{
    constructor(){
        this.or = 0;
        this.or_cette_game = 0;
        this.pts = 0;
        this.longueur = 0;
        this.skin = {Corps: [{id:"base", color:"rgb(34, 197, 94)"}], Yeux: [{id:"base", color:"rgb(34, 197, 94)"}], Dents: [{id:"base", color:"rgb(200, 255, 230)"}], Effet: [{id: "aucun", color:"rgb(255, 255, 255)", forme: ""}]};
        this.skin_equipe = {Corps: {id:"base", color:"rgb(34, 197, 94)"}, Yeux: {id:"base", color:"rgb(34, 197, 94)"}, Dents: {id:"base", color:"rgb(200, 255, 230)"}, Effet: {id: "aucun", color: "rgb(255, 255, 255)", forme: ""}};
        this.stats = {longueur_max: 0, pommes_mangees: 0, score_ttl : 0, or_ttl: 0, meilleur_score: 0}; // ** pour plateforme et stats**
    }

    gagner_or(or){
        this.or += or;
        this.stats.or_ttl += or;
        this.or_cette_game += or;
    }

    gagner_pts(pts){
        this.pts += pts;
        this.stats.score_ttl += pts;
    }

    incremente_longueur(long){
        this.longueur += long; 
    }

    verifier_record_longueur(){
        if (this.longueur > this.stats.longueur_max) this.stats.longueur_max = this.longueur;
    }

    gagner_pommes(){
        this.stats.pommes_mangees ++;
    }

    nouv_meilleur_score(){
        this.stats.meilleur_score = this.stats.meilleur_score < this.pts ? this.pts: this.stats.meilleur_score;
    }

}

function draw_forme(forme, x, y, taille){
    switch(forme){
        case "cercle":
            ctx.beginPath();
            ctx.arc(x, y, taille, 0, Math.PI*2);
            ctx.fill();
            break;
        case "triangle":
            ctx.beginPath();
            ctx.moveTo(x, y-taille);
            ctx.lineTo(x-taille, y+taille);
            ctx.lineTo(x+taille, y+taille);
            ctx.closePath();
            ctx.fill();
            break;
        case "etoile":
            taille += 1;
            ctx.beginPath();
            for (let i=0; i<5; i++){
                ctx.lineTo(x + taille * Math.cos((18 + i * 72) / 180 * Math.PI), y - taille * Math.sin((18 + i * 72) / 180 * Math.PI));
                ctx.lineTo(x + (taille/2) * Math.cos((54 + i * 72) / 180 * Math.PI), y - (taille/2) * Math.sin((54 + i * 72) / 180 * Math.PI));
            }
            ctx.closePath();
            ctx.fill();
            break;
        case "losange":
            ctx.beginPath();
            ctx.moveTo(x, y -taille);
            ctx.lineTo(x -taille, y);
            ctx.lineTo(x, y+taille);
            ctx.lineTo(x+taille, y);
            ctx.closePath();
            ctx.fill();
            break;
        case "eclair":
            taille += 1;
            ctx.beginPath();
            ctx.moveTo(x, y-taille);
            ctx.lineTo(x-taille/2, y);
            ctx.lineTo(x+taille/4, y);
            ctx.lineTo(x-taille/4, y+taille);
            ctx.lineTo(x+taille/2, y);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fill();
            break;
        case "flamme":
            taille += 1;
            ctx.beginPath();
            // Pointe haute
            ctx.moveTo(x+taille/3, y - taille);
            // Côté gauche
            ctx.lineTo(x - taille * 0.35, y - taille * 0.35);
            ctx.lineTo(x - taille * 0.8, y + taille * 0.2);
            ctx.lineTo(x - taille * 0.6, y + taille * 0.8);
            // Bas
            ctx.quadraticCurveTo(
                x,
                y + taille * 1.15,
                x + taille * 0.6,
                y + taille * 0.8
            );
            // Côté droit
            ctx.lineTo(x + taille * 0.8, y + taille * 0.2);
            ctx.lineTo(x + taille * 0.35, y - taille * 0.35);
            ctx.closePath();
            ctx.fill();
            break;
    }
}

class Particules{
    constructor(x, y, color, forme){
        this.x = x;
        this.y = y;
        this.color = color;
        this.forme = forme;
        this.vitesse = {x: Math.random() *2 -1, y: Math.random()*2-1};
        this.vie = 1 + Math.random()*1.1;
        this.taille = 3 + Math.random()*2.7;
    }

    draw(){
        ctx.fillStyle = this.color;
        draw_forme(this.forme, this.x, this.y, this.taille);
    }

    retirer(){
        if (this.vie <= 0) particules.splice(particules.indexOf(this), 1);
    }

    update(){
        this.x += this.vitesse.x;
        this.y += this.vitesse.y;
        this.vie -= 0.02;
        this.draw();
        this.retirer();
    }
}

let particules = [];
const joueur = new Joueur();

const snake = new Snake();
snake.queue.push(new Queue(snake.x-box, snake.y));
