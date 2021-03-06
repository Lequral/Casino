var button = document.getElementById("tourner");
button.disabled = true;
var isTurning = false;
var money = 4000;
const slots = document.querySelector("#slots");
const cubes = slots.querySelectorAll(".box");

function tourner() {
    if (isTurning) { //(isTurning === true)
        isTurning = false;
        button.disabled = true;
        button.textContent = "TOURNER";

        const nb1 = aleatoire();
        const nb2 = aleatoire();
        const nb3 = aleatoire();
        //arrête les cubes sur un face aléatoire

        const faceCorrespondante = [0, 0, 0, 1, 1, 1, 2, 3];
        const nombre1 = faceCorrespondante[nb1];
        const nombre2 = faceCorrespondante[nb2];
        const nombre3 = faceCorrespondante[nb3];


        var totalAnimDuration = 0;
        cubes.forEach((elem, index) => {
            //temps de l'animation jusqu'à la face en fonction du nb aleatoire
            //0→0s     1 → 0.25s    2→0.5s   3→0.75s 
            var time;
            var nbAleatoire;
            if (index === 0) {
                time = nombre1 / 4;
                nbAleatoire = nombre1;
            } else if (index === 1) {
                time = nombre2 / 4;
                nbAleatoire = nombre2;
            } else {
                time = nombre3 / 4;
                nbAleatoire = nombre3;
            };

            //Ceci va s'éxécuter quand les animations des cubes d'avant seront finis 
            setTimeout(() => {
                elem.style.animation = `spinToface${nbAleatoire} ${time}s linear`;
                // console.log(`spinToface${nbAleatoire} ${time}s linear`);
                //l'angle de rotation de l'animation est proportionnel au temps donc égale au temps * 360
                elem.style.transform = `rotateX(-${time * 360}deg)`;
            }, totalAnimDuration);
            totalAnimDuration += time * 1000 + 500;
        });

        //calcul les gains + change l'argent après les animations
        setTimeout(() => {
            console.log(nombre1, nombre2, nombre3);
            result(nombre1, nombre2, nombre3);
        }, totalAnimDuration);
    } else {

        isTurning = true;
        button.textContent = "ARRETER";

        //animation des cubes qui tournent à l'infini
        cubes.forEach(elem => {
            elem.style.animation = "spin 1s infinite linear";
        });
    }
}

function result(nombre1, nombre2, nombre3) {
    //Probabilité des gains si les faces sont les mêmes
    //0,1,2 → x2        3/8
    //3,4,5 → +3000     3/8
    //7     → x10       1/8
    //7     → +10000    1/8
    //l'essaie = -1000

    money -= 1000;
    if (nombre1 === nombre2 && nombre2 === nombre3) {
        
        //bonus
        if (nombre1 === 0) {
            money = money * 2;
            console.log("x2");
        } else if (nombre1 === 1) {
            money = money + 3000;
            console.log("+2000");
        } else if (nombre1 === 2) {
            money = money * 10;
            console.log("x10");
        } else if (nombre1 === 3) {
            money = money + 11000;
            console.log("+10000");
        }
    }
    setMoneyPara(money);
    button.disabled = false;
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

//active le bouton après 1sec de sortes qu'il ait fini l'animation du début
setTimeout(() => {
    button.disabled = false;
}, 2000);