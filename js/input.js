// *** FLECHES ***
function deplacement(inverse=false){
    if (!inverse){
        document.addEventListener("keydown", (e)=>{
            // *** Evite le scroll de la page ***
            if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();

            if (e.key === "ArrowLeft" && snake.direction !== "droite"){ 
                snake.prochaine_direction = "gauche";
            }
            if (e.key === "ArrowRight" && snake.direction !== "gauche"){
                snake.prochaine_direction = "droite";
            }
            if (e.key === "ArrowUp" && snake.direction !== "bas") {
                snake.prochaine_direction = "haut";
            }
            if (e.key === "ArrowDown" && snake.direction !== "haut"){
                snake.prochaine_direction = "bas";
            }
        })
    }
    else {
        document.addEventListener("keydown", (e)=>{
            // *** Evite le scroll de la page ***
            if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();

            if (e.key === "ArrowLeft" && snake.direction !== "gauche"){ 
                snake.prochaine_direction = "droite";
            }
            if (e.key === "ArrowRight" && snake.direction !== "droite"){
                snake.prochaine_direction = "gauche";
            }
            if (e.key === "ArrowUp" && snake.direction !== "haut") {
                snake.prochaine_direction = "bas";
            }
            if (e.key === "ArrowDown" && snake.direction !== "bas"){
                snake.prochaine_direction = "haut";
            }
        })
    }
}

function deplacement_mobile(dir, inverse=false){
    if (!inverse){
            if (dir === "gauche" && snake.direction !== "droite"){ 
                snake.prochaine_direction = "gauche";
            }
            if (dir === "droite" && snake.direction !== "gauche"){
                snake.prochaine_direction = "droite";
            }
            if (dir === "haut" && snake.direction !== "bas") {
                snake.prochaine_direction = "haut";
            }
            if (dir === "bas" && snake.direction !== "haut"){
                snake.prochaine_direction = "bas";
            }
    }
    else {
            if (dir === "gauche" && snake.direction !== "gauche"){ 
                snake.prochaine_direction = "droite";
            }
            if (dir === "droite" && snake.direction !== "droite"){
                snake.prochaine_direction = "gauche";
            }
            if (dir === "haut" && snake.direction !== "haut") {
                snake.prochaine_direction = "bas";
            }
            if (dir === "bas" && snake.direction !== "bas"){
                snake.prochaine_direction = "haut";
            }
    }

}

// *** Pause ***
document.addEventListener("keypress", (e)=>{
    if (e.code === "Space") etat_jeu.pause = true;
})

// *** MOBILE ***
let touch_start_x = 0;
let touch_start_y = 0;

const seuil_swipe = 5;

cvs.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];

    touch_start_x = touch.clientX;
    touch_start_y = touch.clientY;
}, {passive: true});


cvs.addEventListener("touchend", (e) => {
    const touch = e.changedTouches[0];

    const dx = touch.clientX - touch_start_x;
    const dy = touch.clientY - touch_start_y;

    // Petit mouvement = pas un swipe
    if (Math.max(Math.abs(dx), Math.abs(dy)) < seuil_swipe) {
        return;
    }

    // Swipe horizontal
    if (Math.abs(dx) > Math.abs(dy)) {

        if (dx > 0 && snake.direction !== "gauche") {
            snake.prochaine_direction = "droite";
        }

        else if (dx < 0 && snake.direction !== "droite") {
            snake.prochaine_direction = "gauche";
        }
    }

    // Swipe vertical
    else {

        if (dy > 0 && snake.direction !== "haut") {
            snake.prochaine_direction = "bas";
        }

        else if (dy < 0 && snake.direction !== "bas") {
            snake.prochaine_direction = "haut";
        }
    }

}, {passive: true});