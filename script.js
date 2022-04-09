// Generation des images qui forme le bateau 

/**@type {HTMLImageElement} */
var player = document.querySelector("div#player");
const numb = [9, 8, 2, 5, 5, 20, 20];
const offsetList = [0, 0, 0, 0, 0, -24, -26, 5];

const pathSrc = "./assets/player/boat/B3-";

function createCopies() {
    let yIndex = 0;

    for (let imageIndex = 0; imageIndex < numb.length; imageIndex++) {
        console.log("nouvelle image");

        for (let i = 0; i < numb[imageIndex]; i++) {

            console.log("copie");
            var elem = document.createElement("img");
            elem.classList += "boat";
            elem.src = pathSrc + (imageIndex + 1) + ".svg";
            elem.offset = numb[imageIndex];
            elem.style.transform = `translateY(${offsetList[imageIndex] + yIndex}px)`;

            player.append(elem);

            yIndex -= 0.5;
        }
    }
};

createCopies();



// Rotation avec touches q/d + vitesse avec touche z + diminution de la vitesse tt les 1/2 seconde

var rotation = 0;
var vitesse = 0;
var hypothenuse = 1;

function render() {
    var images = document.getElementsByClassName("boat")
    console.log("updateOffsetY");

    var offset = 0;
    var totalImgI = 0;

    for (let imageIndex = 0; imageIndex < numb.length; imageIndex++) {
        console.log("new image");

        offset += offsetList[imageIndex];
        for (let i = 0; i < numb[imageIndex]; i++) {

            const elem = images[totalImgI];
            console.log(offset);
            // elem.style.transform = `translateY(${offset}px)`;

            offset -= 0.5;
            totalImgI += 1
        }
    }
};

function press(event) {

    if (event.key === "q") {
        rotation -= 1;
        // player.style.transform = "rotate(0deg)";

        // render(rotation);

        player.style.transform = "rotate(" + rotation + "deg)";
        console.log("q", rotation);
        rotation = rotation;

    }

    else if (event.key === "d") {
        rotation += 1;
        // player.style.transform = "rotate(0deg)";

        // render();

        player.style.transform = "rotate(" + rotation + "deg)";
        console.log("d", rotation);
        rotation = rotation;

        render(rotation);
    }

    else if (event.key === "z") {
        if (vitesse < 5) {
            vitesse += 1;
        }
        // console.log("z",vitesse);
    }
};

document.addEventListener("keydown", press);



function vitesseSlow() {
    if (vitesse <= 0.01) {
        vitesse = 0
        return vitesse
    }
    vitesse = Math.round(vitesse * 2 / 3 * 100) / 100; //fois 2/3 puis garde 2 chiffres après la ,

    // console.log("rotation = ", rotation);
    // console.log("vitesse = ",vitesse);
};

function gameTick() {
    vitesseSlow();
};

setInterval(gameTick, 500);