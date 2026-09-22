const couleurs_pomme = {"normal": {"pom": "rgb(124,25,37)", "tige": "rgb(134,83,10)", "feuille": "rgb(38,169,67)"},
                        "doree": {"pom": "rgb(255, 238, 0)", "tige": "rgb(134, 115, 10)", "feuille": "rgb(147, 169, 38)"},
                        "dark": {"pom": "rgb(18, 0, 2)", "tige": "rgb(43, 26, 1)", "feuille": "rgb(10, 15, 12)"}};
const pomme_radius = 7.5;
const larg_tige = 3;
const haut_tige = 7.5;
const larg_ellipse = 5;
const haut_ellipse = 2.5;
const gains = {"normal":{"pts": 1, "or": 1, "queue": 1, "long_queue":1}, "doree": {"pts": 5, "or": 3, "queue": 2, "long_queue":2}, "dark": {"pts": -2, "or": -1, "queue": 2, "long_queue": -2}};
let multi = 1;

class Pomme {
    constructor(x,y, hit_box, type) {
        this.x = x;
        this.y = y;
        this.hit_box = hit_box;
        this.type = type;
    }

    draw(){
        animation_pomme();

        const y_tige = this.y-pomme_radius*1.7;
        const couleurs = couleurs_pomme[this.type];
        let lueur =  "";

        if (this.type === "normal"){
            lueur =  "rgba(250,252,255,0.15)";
        }
        else if (this.type === "doree"){
            lueur = "rgba(194, 182, 92, 0.35)";
        } 
        else{
            lueur = "rgba(250,252,255,0.05)";
        }  
        //*** Corp pomme ***
            ctx.beginPath();
            ctx.arc(this.x, this.y, pomme_radius *multi, 0, Math.PI*2);
            ctx.fillStyle = couleurs.pom;
            ctx.fill();
        // *** tige ***
            ctx.fillStyle = couleurs.tige;
            ctx.fillRect(this.x, y_tige , larg_tige, haut_tige *multi);
        // *** Feuille ***
            ctx.beginPath();
            ctx.fillStyle = couleurs.feuille;
            ctx.ellipse(this.x+larg_ellipse, y_tige, larg_ellipse *multi, haut_ellipse *multi, -0.6 ,0, Math.PI*2);
            ctx.fill();
        // *** lueur ***
            ctx.beginPath();
            ctx.fillStyle = lueur;
            ctx.ellipse(this.x+2, this.y, 3 *multi, 3 *multi, 0.2, 0, Math.PI*2);
            ctx.fill();
    }

    mange(){
        retirer_pomme(this);

        joueur.gagner_or(gains[this.type].or);
        joueur.gagner_pts(gains[this.type].pts);
        joueur.gagner_pommes();
        joueur.incremente_longueur(gains[this.type].long_queue);

        for (let i=0; i < gains[this.type].queue; i++){
            if (this.type === "dark"){
                snake.queue.splice(snake.queue.length-1,1);
            }
            else {
                if (joueur.longueur < 0) return;

                if (snake.queue.length > 0){
                    if (snake.queue.at(-1).direction === "droite") snake.queue.push(new Queue(snake.queue.at(-1).x-box, snake.queue.at(-1).y));
                    if (snake.queue.at(-1).direction === "gauche") snake.queue.push(new Queue(snake.queue.at(-1).x+box, snake.queue.at(-1).y));
                    if (snake.queue.at(-1).direction === "haut") snake.queue.push(new Queue(snake.queue.at(-1).x, snake.queue.at(-1).y+box));
                    if (snake.queue.at(-1).direction === "bas") snake.queue.push(new Queue(snake.queue.at(-1).x, snake.queue.at(-1).y-box));
                }
                else {
                    if (snake.direction === "droite") snake.queue.push(new Queue(snake.x-box, snake.y));
                    if (snake.direction === "gauche") snake.queue.push(new Queue(snake.x+box, snake.y));
                    if (snake.direction === "haut") snake.queue.push(new Queue(snake.x, snake.y+box));
                    if (snake.direction === "bas") snake.queue.push(new Queue(snake.x, snake.y-box));
                }
            }
        }
    }

    colision_snake(){
        if (snake.x/box === this.hit_box.x && snake.y/box === this.hit_box.y){
            this.mange();
            spawn_pomme();
            if (this.type !== "dark")  this.type = "dark";
            else this.type = "doree";
        }
    }

    update(){
        this.draw();
        this.colision_snake();
        
    }
}

function animation_pomme(){   
    let amplitude = 1.32 - 0.98;
    let sin = Math.sin(Date.now()/600);

    sin = sin < 0 ? sin*-1 : sin;
    multi = 0.98 + sin * amplitude;

    return multi;
}

function position_libre(x, y){
    // ** sous la tete **
    if (snake.x / box === x && snake.y/box === y) return false;
    
    // ** empeche de spawn sur/sous le snake **
    for (let i=0; i < snake.queue.length; i++){
        let queue = snake.queue[i];
        if (queue.hit_box.x === x && queue.hit_box.y === y){
            return false;
        }
    }
    // ** empeche spawn sur autre pomme **
    for (let i=0; i < pommes.length; i++){
        let pomme = pommes[i];
        if (pomme.hit_box.x === x && pomme.hit_box.y === y){
            return false;
        }
    }

    return true;
}

function spawn_pomme(){
    if (pommes.length + snake.queue.length >= 500 -1) return;
    let x = 0;   // ** x entre 0 et 23
    let y = 0;  // ** y entre 0 et 19
    do{
        x =  Math.floor(Math.random()*25);
        y =  Math.floor(Math.random()*20)+1;
    } while (!position_libre(x, y-1));

    let type = "normal";

    // ** pomme dark **
    if (Math.random() < mode_act.pourcentage_noir) type = "dark";
    // ** pomme doree **
    else if (Math.random() > mode_act.pourcentage_doree) type = "doree";

    pommes.push(new Pomme(box*x+box/2, box*y-box*0.4, {"x":x, "y":y-1}, type));
}

function retirer_pomme(pomme){
    for (let i=0; i < pommes.length; i++){
        if (pommes[i] === pomme) pommes.splice(i,1);
    }
}

let pommes = [];
