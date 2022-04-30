var button = document.getElementById("tourner");
var isTurning = false;
var money = 4000;
const slots = document.querySelector("#slots");
const cubes = slots.querySelectorAll(".box");

function tourner() {
    console.log("click");

    if(isTurning) { //(isTurning === true)
        isTurning = false;
        button.textContent = "TOURNER";

        const nb1 = aleatoire();
        const nb2 = aleatoire();
        const nb3 = aleatoire();
        //arrête les cubes sur un face aléatoire
        cubes.forEach(elem => {
            elem.style.animationPlayState = "paused";
        });

        console.log(nb1,nb2,nb3);
        result(nb1,nb2,nb3);
    }else {
        isTurning = true;
        button.textContent = "ARRETER";
        
        //animation des cubes qui tournent à l'infini
        cubes.forEach(elem => {
            elem.style.animation = "spin 1s infinite reverse linear";
        });
    }
}

function result(nb1,nb2,nb3) {
    //0,1,2 → x2        3/8
    //3,4,5 → +2000     3/8
    //7     → x10       1/8
    //7     → +10000    1/8
    //l'essaie = -1000
    const faceCorrespondante = [0,0,0,1,1,1,2,3];
    const nombre1 = faceCorrespondante[nb1];
    const nombre2 = faceCorrespondante[nb2];
    const nombre3 = faceCorrespondante[nb3];

    money -= 1000;
    if(nombre1 === nombre2 && nombre2 === nombre3) {
        console.log("gagne");
        
        //bonus
        if(nombre1 === 0) {
            money = money * 2;
        }else if(nombre1 === 1) {
            money = money + 2000;
        }else if(nombre1 === 2) {
            money = money * 10;
        }else if(nombre1 === 3) {
            money = money + 10000;
        }
    }
    setMoneyPara(money);
}

function setMoneyPara(val) {
    const p = document.querySelector("p#argent");
    p.textContent = val + "$";
}

function aleatoire() {
    const min = 0;
    const max = 7;
    return Math.round(Math.random() * max + min); //trouver un nombre aléatoire entre 0 et 7
}

button.addEventListener("click", tourner);