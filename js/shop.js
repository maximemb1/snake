const shop = {Corps: [{nom: "Base", id:"base", color: "rgb(34, 197, 94)", prix: 0, acheter: true},
                    {nom: "Rouge", id:"red", color: "rgb(192,38,87)", prix: 50, acheter: false},
                    {nom: "Bleu", id:"bleu", color: "rgb(26,95,199)", prix: 50, acheter: false},
                    {nom: "Jaune", id:"jaune", color: "rgb(200,200,37)", prix: 50, acheter: false},
                    {nom: "Cyan", id:"cyan", color: "rgb(0, 255, 255)", prix: 50, acheter: false},
                    {nom: "Violet", id:"violet", color: "rgb(125, 68, 230)", prix: 50, acheter: false},
                    {nom: "Orange", id:"orange", color: "rgb(215, 144, 0)", prix: 50, acheter: false},
                    {nom: "Rose", id:"rose", color: "rgb(218, 16, 158)", prix: 50, acheter: false},
                    {nom: "Noir", id:"noir", color: "rgb(18, 0, 2)", prix: 50, acheter: false},
                    {nom: "Blanc", id:"blanc", color: "rgb(255, 255, 255)", prix: 50, acheter: false},
                ],
            Dents: [{nom: "Base", id: "base", color:"rgb(200,255,230)", prix: 0, acheter: true},
                {nom: "Rouge", id: "red", color:"rgb(192,38,87)", prix: 25, acheter: false},
                {nom: "Bleu", id:"bleu", color: "rgb(26,95,199)", prix: 25, acheter: false},
                {nom: "Jaune", id:"jaune", color: "rgb(160, 160, 19)", prix: 25, acheter: false},
                {nom: "Cyan", id:"cyan", color: "rgb(0, 255, 255)", prix: 25, acheter: false},
                {nom: "Violet", id:"violet", color: "rgb(125, 68, 230)", prix: 25, acheter: false},
                {nom: "Orange", id:"orange", color: "rgb(215, 144, 0)", prix: 25, acheter: false},
                {nom: "Rose", id:"rose", color: "rgb(218, 16, 158)", prix: 25, acheter: false},
                {nom: "Noir", id:"noir", color: "rgb(18, 0, 2)", prix: 25, acheter: false},
                {nom: "Blanc", id:"blanc", color: "rgb(255, 255, 255)", prix: 25, acheter: false},
            ],
            Yeux: [{nom: "Base", id: "base", color:"rgb(34,197,94)", prix: 0, acheter: true},
                    {nom: "Rouge", id: "red", color:"rgb(192,38,87)", prix: 25, acheter: false},
                    {nom: "Bleu", id:"bleu", color: "rgb(26,95,199)", prix: 25, acheter: false},
                    {nom: "Jaune", id:"jaune", color: "rgb(161, 161, 8)", prix: 25, acheter: false},
                    {nom: "Cyan", id:"cyan", color: "rgb(0, 255, 255)", prix: 25, acheter: false},
                    {nom: "Violet", id:"violet", color: "rgb(125, 68, 230)", prix: 25, acheter: false},
                    {nom: "Orange", id:"orange", color: "rgb(215, 144, 0)", prix: 25, acheter: false},
                    {nom: "Rose", id:"rose", color: "rgb(218, 16, 158)", prix: 25, acheter: false},
                    {nom: "Noir", id:"noir", color: "rgb(18, 0, 2)", prix: 25, acheter: false},
                    {nom: "Blanc", id:"blanc", color: "rgb(255, 255, 255)", prix: 25, acheter: false},

                ],
            Effet: [{nom: "Aucun", id: "aucun", color:"rgb(255, 255, 255)", forme: "", prix: 0, acheter: true},
                {nom: "Étoilé", id: "etoile", color:"rgb(255, 255, 179)", forme: "etoile", prix: 125, acheter: false},
                {nom: "Bulles", id: "bulles", color:"rgb(184, 255, 255)", forme: "cercle", prix: 125, acheter: false},
                {nom: "Triangles", id:"triangles", color:"rgb(255, 188, 255)", forme: "triangle", prix: 125, acheter: false},
                {nom: "Losanges", id:"losanges", color:"rgb(191, 253, 191)", forme: "losange", prix: 125, acheter: false},
                {nom: "Flammes", id: "flammes", color: "rgb(255,100,100)", forme: "flamme", prix: 125, acheter: false},
                {nom: "Éclairs", id: "eclairs", color: "rgb(255, 255, 73)", forme: "eclair", prix: 125, acheter: false},
            ]
        };

function creer_card(){
    or_shop.textContent = `Or disponible: ${joueur.or}`;
    conteneur_shop.innerHTML = "";
    let button;

    for (let type in shop){
        // ** Titre **
        conteneur_shop.innerHTML += `<div class="categorie">
                                            <hr>
                                            <h3>${type}</h3>
                                            <div class="cards"></div>
                                    </div>`;

        const categorie = conteneur_shop.lastElementChild;
        const cards = categorie.querySelector(".cards");

        for (let element of shop[type]){
            
            // ** elemet acheter ? **
            for (let skin of joueur.skin[type]){
                if (skin.id === element.id) element.acheter = true;
            }

            // ** creation bouton **
            if (joueur.skin_equipe[type].id === element.id && element.acheter){
                button = `<button>Activé</button>`;
            }else if (element.acheter && joueur.skin_equipe[type].id !== element.id){
                button = `<button onclick="equiper('${element.id}','${type}')">Équiper</button>`;
            }else {
                button = `<button onclick="acheter(${element.prix},'${element.id}','${type}')">${element.prix} $</button>`;
            }

            cards.innerHTML += `<div class="card ${element.acheter ? "achete":"non_achete"} ${joueur.skin_equipe[type].id === element.id ? "equipe":""}">
                                            <h4>${element.nom}</h4>
                                            <div class="apercu" style="background: ${element.color}"></div>
                                            ${button}
                                        </div>`
        }
    }
}

function acheter(prix,id, type){
    let skin_achete = null;
    if (joueur.or >= prix){
        joueur.or -= prix;

        for (let skin of shop[type]){
            if (skin.id === id)  skin_achete = skin;
        }
        skin_achete.acheter = true;
        
        if (type === "Effet") joueur.skin[type].push({id: id, color: skin_achete.color, forme: skin_achete.forme});
        else joueur.skin[type].push({id: id, color: skin_achete.color});

        equiper(id,type,true);

        messages("Skin acheté et équipé !", "reussite");

        sauvegarder();
    }
    else{
        messages("Pas assez d'or !", "erreur");
    }
}

function equiper(id,type, vient_d_achat=false){
    for (let skin of joueur.skin[type]){
        if (skin.id === id){

            if (type === "Effet") joueur.skin_equipe[type] = {id: id, color: skin.color, forme: skin.forme};
            else joueur.skin_equipe[type] = {id: id, color: skin.color};
            creer_card();

            if (!vient_d_achat) messages("Skin équipé !", "reussite");

            sauvegarder();
        }
    }
}
