function shuffleString(input, type = "characters") {
    // String in ein Array umwandeln (nach Zeichen oder Wörtern)
    let array = type === "words" ? input.split(" ") : input.split("");

    // Fisher-Yates Shuffle Algorithmus
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Vertauschen
    }

    // Array wieder zu einem String zusammenfügen
    return type === "words" ? array.join(" ") : array.join("");
}

let alleWörter = ["Ich", "wünsche", "dir", "alles", "gute", "zum", "Muttertag", "bleib", "wie", "du", "bist", "und", "genau", "so", "bist", "du", "super", "Lasse", "dich", "von", "keinem", "aus", "der", "Ruhe", "bringen", "und", "habe", "vor", "allem", "heute", "einen", "super", "schönen", "Tag"];
let welchesSpiel = 1;

let welchesWort = 0;
let aktuellerBuchstabe = 0;

let seconds = alleWörter[welchesWort].length * 8;
let timerInterval;

function updateDisplay() {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    document.getElementById("display").textContent =
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0");

    if (seconds <= 0) {
        document.querySelector("#SchlussVerloren").style.display = "block";
        document.querySelector("#Spielbrett").style.display = "none";
        document.querySelector("#Schlüsselwort").style.display = "none";
        clearInterval(timerInterval);
        document.querySelector("#display").innerHTML = "00:00";
    }
}

document.querySelector("#codewort").addEventListener("change", () => {
    if (document.querySelector("#codewort").value == "Affe") {
        document.querySelector("#Einleitung").style.display = "none";
        document.querySelector("#AlternativerWeg").style.display = "block";
    }
})

document.querySelector("#startzweitesSpiel").addEventListener("click", () => {
    document.querySelector("#AlternativerWeg").style.display = "none";
    document.querySelector("#Spielbrett").style.display = "grid";
    document.querySelector("#Schlüsselwort").style.display = "block";

    alleWörter = ["Deine", "Aufgaben", "sind", "heute", "Ähm", "schlafen", "ausruhen", "einfach", "mal", "den", "Tag", "genießen", "usw", "Mach", "dir", "heute", "einfach", "einen", "schönen", "Tag", "und", "jetzt", "bin", "ich", "auch", "raus"];
    welchesSpiel = 2;

    neuesFeldErzeugen();
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    document.getElementById("display").textContent =
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0");

    // Timer startet automatisch
    timerInterval = setInterval(() => {
        seconds--;
        updateDisplay();
    }, 1000);
})

document.querySelector("#beginnen").addEventListener("click", () => {
    document.querySelector("#Einleitung").style.display = "none";
    document.querySelector("#Spielbrett").style.display = "grid";
    document.querySelector("#Schlüsselwort").style.display = "block";

    neuesFeldErzeugen();
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    document.getElementById("display").textContent =
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0");

    // Timer startet automatisch
    timerInterval = setInterval(() => {
        seconds--;
        updateDisplay();
    }, 1000);
})

document.querySelector("#schlüsselwortAbsenden").addEventListener("click", () => {
    if (alleWörter[welchesWort] == document.querySelector("#SchlüsselwortArea").value) {
        document.querySelector("#SchlussGewonnen").style.display = "block";

        document.querySelector("#Spielbrett").style.display = "none";
        document.querySelector("#Schlüsselwort").style.display = "none";

        clearInterval(timerInterval);
        document.querySelector("#display").innerHTML = "00:00";
        welchesWort++;
        aktuellerBuchstabe = 0;
        document.querySelector("#SchlüsselwortArea").value = "";
        if (welchesWort == alleWörter.length) {
            if (welchesSpiel == 1) {
                document.querySelector("#Spielbrett").style.display = "none";
                document.querySelector("#Schlüsselwort").style.display = "none";
                document.querySelector("#EndeKomplettGewonnen").style.display = "block";
            }
            else if (welchesSpiel == 2) {
                document.querySelector("#Spielbrett").style.display = "none";
                document.querySelector("#Schlüsselwort").style.display = "none";
                document.querySelector("#EndeKomplettGewonnenAlternativ").style.display = "block";
            }

        }
    }
})

document.querySelector("#nächsteRunde").addEventListener("click", () => {
    seconds = alleWörter[welchesWort].length * 8;
    document.querySelector("#SchlussGewonnen").style.display = "none";
    document.querySelector("#Spielbrett").style.display = "grid";
    document.querySelector("#Schlüsselwort").style.display = "block";

    neuesFeldErzeugen();
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    document.getElementById("display").textContent =
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0");

    // Timer startet automatisch
    timerInterval = setInterval(() => {
        seconds--;
        updateDisplay();
    }, 1000);

})

document.querySelector("#rundewiederholen").addEventListener("click", () => {
    seconds = alleWörter[welchesWort].length * 8;
    document.querySelector("#SchlussVerloren").style.display = "none";
    document.querySelector("#Spielbrett").style.display = "grid";
    document.querySelector("#Schlüsselwort").style.display = "block";

    aktuellerBuchstabe = 0;
    document.querySelector("#SchlüsselwortArea").value = "";

    neuesFeldErzeugen();
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    document.getElementById("display").textContent =
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0");

    // Timer startet automatisch
    timerInterval = setInterval(() => {
        seconds--;
        updateDisplay();
    }, 1000);
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function neuesFeldErzeugen() {
    if (document.querySelector(".keyObject") != null) {
        document.querySelectorAll(".keyObject").forEach(elem => {
            elem.remove();
        });
        document.querySelectorAll(".nonkeyObject").forEach(elem => {
            elem.remove();
        });
    }

    let key = document.createElement("div");
    key.className = "keyObject";
    key.innerHTML = '<img class="key" src="Bilder/Schluessel.png"><h1 class="keyletter">' + alleWörter[welchesWort][aktuellerBuchstabe] + '</h1>';
    let keypos = getRandomInt(119);

    for (let i = 0; i < 119; i++) {
        if (i == keypos) {
            document.querySelector("#Spielbrett").appendChild(key);
        }
        else {
            let other = document.createElement("div");
            other.className = "nonkeyObject";
            let bilder = ["Autoschluessel.jpg", "Gold.jpg", "Ringe.jpg", "Schatz.jpg", "Schloss.jpg", "SchluessellochMitTuerklinke.jpg"]
            other.innerHTML = '<img class="object" src="Bilder/' + bilder[getRandomInt(6)] + '"><h1 class="objectdownside">-5s</h1>';
            document.querySelector("#Spielbrett").appendChild(other);
        }
    }


    document.querySelectorAll(".key").forEach(img => {
        img.addEventListener("click", () => {
            img.style.opacity = "0";
            img.style.transform = "scale(0.5)";
            img.style.transition = "0.3s ease";

            setTimeout(() => {
                img.style.display = "none";
                document.querySelector(".keyletter").style.display = "block";
            }, 300);
            aktuellerBuchstabe++;
            if (!(aktuellerBuchstabe == alleWörter[welchesWort].length)) {
                setTimeout(neuesFeldErzeugen, 2000);
            }
        });
    });

    for (let i = 0; i < document.querySelectorAll(".object").length; i++) {
        document.querySelectorAll(".object")[i].addEventListener("click", () => {
            document.querySelectorAll(".object")[i].style.opacity = "0";
            document.querySelectorAll(".object")[i].style.transform = "scale(0.5)";
            document.querySelectorAll(".object")[i].style.transition = "0.3s ease";

            setTimeout(() => {
                document.querySelectorAll(".object")[i].style.display = "none";
                document.querySelectorAll(".objectdownside")[i].style.display = "block";
                seconds -= 5;
            }, 300);
        });
    };
}


