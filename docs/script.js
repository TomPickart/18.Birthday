/* =========================================================
   COD QUIZ // RON 18
========================================================= */


/* =========================================================
   START SCREEN
========================================================= */

function startQuizFromButton() {

    // Menü-Musik starten
    startMenuMusic();

    // Ersten Startbildschirm ausblenden
    const startScreen =
        document.getElementById("quizStartScreen");

    if (startScreen) {

        startScreen.classList.add("hidden");

        setTimeout(() => {

            startScreen.style.display = "none";

        }, 500);

    }

}


/* =========================================================
   SAVE SYSTEM
========================================================= */

const SAVE_KEY = "ronCodQuizSave_v1";


let saveData = {

    completedQuizzes: {
        1: false,
        2: false,
        3: false
    },

    /*
       Für jede Waffe eine eigene Top-10-Liste.
    */
    leaderboards: {

        "VOYAK-KT-3.jpg": [],
        "VS-Recon-Green.jpg": [],
        "ladra.jpg": [],
        "hdr.jpg": [],
        "fara-83.png": [],
        "ax-50.png": []

    }

};


function loadSaveData() {

    try {

        const saved =
            localStorage.getItem(SAVE_KEY);


        if (saved) {

            const parsed =
                JSON.parse(saved);


            saveData = {

                ...saveData,

                ...parsed,


                completedQuizzes: {

                    ...saveData.completedQuizzes,

                    ...(parsed.completedQuizzes || {})

                },


                leaderboards: {

                    ...saveData.leaderboards,

                    ...(parsed.leaderboards || {})

                }

            };


            /*
               Alte globale Leaderboard-Daten
               werden nicht mehr verwendet.
            */

            if (
                !saveData.leaderboards ||
                typeof saveData.leaderboards !== "object"
            ) {

                saveData.leaderboards = {};

            }

        }

    } catch (error) {

        console.error(
            "Save data could not be loaded:",
            error
        );

    }

}


function saveDataToStorage() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(saveData)
    );

}


function clearSavedData() {

    const confirmed =
        confirm(
            "Wirklich ALLE gespeicherten Quiz-Fortschritte, Freischaltungen und Leaderboard-Daten löschen?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        SAVE_KEY
    );


    saveData = {

        completedQuizzes: {
            1: false,
            2: false,
            3: false
        },

        leaderboards: {

            "VOYAK-KT-3.jpg": [],
            "VS-Recon-Green.jpg": [],
            "ladra.jpg": [],
            "hdr.jpg": [],
            "fara-83.png": [],
            "ax-50.png": []

        }

    };


    updateWeaponLocks();

    renderLeaderboard();


    const saveStatus =
        document.getElementById(
            "saveStatus"
        );


    if (saveStatus) {

        saveStatus.textContent =
            "SYSTEM // ALL SAVE DATA DELETED";

    }

}


/* =========================================================
   ELEMENTS
========================================================= */

const startScreen =
    document.getElementById("startScreen");

const quizContainer =
    document.getElementById("quizContainer");

const weaponSelection =
    document.getElementById("weaponSelection");

const shootingGame =
    document.getElementById("shootingGame");

const leaderboardSection =
    document.getElementById("leaderboardSection");

const quizModeTitle =
    document.getElementById("quizModeTitle");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const quizTimer =
    document.getElementById("quizTimer");

const quizTimerValue =
    document.getElementById("quizTimerValue");

const failureModal =
    document.getElementById("failureModal");

const failureReason =
    document.getElementById("failureReason");

const completeOverlay =
    document.getElementById("completeOverlay");

const completeSubtitle =
    document.getElementById("completeSubtitle");

const completeParticles =
    document.getElementById("completeParticles");

const shootingField =
    document.getElementById("shootingField");

const gameWeapon =
    document.getElementById("gameWeapon");

const gameWeaponImage =
    document.getElementById("gameWeaponImage");

const bullet =
    document.getElementById("bullet");

const scoreDisplay =
    document.getElementById("score");

const hitMessage =
    document.getElementById("hitMessage");

const arcadeTimer =
    document.getElementById("arcadeTimer");

const arcadeTimerValue =
    document.getElementById("arcadeTimerValue");

const finalScore =
    document.getElementById("finalScore");

const playerName =
    document.getElementById("playerName");


/* =========================================================
   QUESTIONS
========================================================= */

const quizzes = {

    1: {

        title: "QUIZ 01 // CLASSIC",

        questions: [

            {
                q: "In welchem Jahr erschien das erste Call of Duty?",
                a: ["2001", "2003", "2005", "2007"],
                correct: 1
            },

            {
                q: "Welcher Schauplatz spielt in Call of Duty 2 eine große Rolle?",
                a: ["Zweiter Weltkrieg", "Vietnamkrieg", "Golfkrieg", "Erster Weltkrieg"],
                correct: 0
            },

            {
                q: "Call of Duty: World at War spielt hauptsächlich im ...?",
                a: ["Kalten Krieg", "Zweiten Weltkrieg", "Golfkrieg", "Vietnamkrieg"],
                correct: 1
            },

            {
                q: "Welche Fraktion kämpft in World at War gegen Deutschland?",
                a: ["US Marines", "NATO", "SAS", "Task Force 141"],
                correct: 0
            },

            {
                q: "Wie heißt der Hauptcharakter der US-Kampagne in World at War?",
                a: ["Miller", "Price", "Soap", "Mason"],
                correct: 0
            },

            {
                q: "Welche Einheit ist besonders mit Captain Price verbunden?",
                a: ["SAS", "CIA", "SEAL Team 6", "Spetsnaz"],
                correct: 0
            },

            {
                q: "Welcher Teil führte erstmals den Zombies-Modus ein?",
                a: ["Modern Warfare", "World at War", "Black Ops II", "Ghosts"],
                correct: 1
            },

            {
                q: "Wie heißt die bekannte Schrotflinte aus vielen klassischen CoD-Teilen?",
                a: ["SPAS-12", "AK-74u", "MP5", "M16"],
                correct: 0
            },

            {
                q: "Welche Waffe ist für ihre Trommelmagazin-Optik bekannt?",
                a: ["Thompson", "M16", "FAMAS", "SCAR-H"],
                correct: 0
            },

            {
                q: "Was bedeutet die Abkürzung 'SAS'?",
                a: ["Special Air Service", "Special Army Squad", "Strategic Assault Service", "Special Action Soldiers"],
                correct: 0
            },

            {
                q: "Welches Fahrzeug sieht man häufig in klassischen Weltkriegs-CoD-Kampagnen?",
                a: ["Panzer", "Hovercraft", "Drohne", "Jetpack"],
                correct: 0
            },

            {
                q: "Welcher CoD-Teil spielt in der Zeit des Zweiten Weltkriegs und enthält Zombies?",
                a: ["World at War", "Ghosts", "Advanced Warfare", "Infinite Warfare"],
                correct: 0
            },

            {
                q: "Welche Waffe ist eine klassische amerikanische WWII-Waffe?",
                a: ["M1 Garand", "MP7", "Kilo 141", "RAM-7"],
                correct: 0
            },

            {
                q: "Welcher Begriff bezeichnet das Nachladen einer Waffe?",
                a: ["Reload", "Respawn", "Revive", "Deploy"],
                correct: 0
            },

            {
                q: "Wie nennt man einen Wiedereinstieg nach dem Tod im Multiplayer?",
                a: ["Respawn", "Reload", "Recoil", "Retreat"],
                correct: 0
            },

            {
                q: "Welche Rolle übernimmt ein Scharfschütze?",
                a: ["Long-Range Support", "Medic", "Pilot", "Engineer"],
                correct: 0
            },

            {
                q: "Was bezeichnet 'XP' im Call-of-Duty-Universum?",
                a: ["Erfahrungspunkte", "Explosivmunition", "Extra Power", "Extreme Precision"],
                correct: 0
            },

            {
                q: "Was passiert bei einem Headshot?",
                a: ["Treffer am Kopf", "Treffer am Fuß", "Nachladen", "Respawn"],
                correct: 0
            },

            {
                q: "Was ist ein Killstreak?",
                a: ["Mehrere Kills hintereinander", "Ein Waffenwechsel", "Eine Niederlage", "Eine Map"],
                correct: 0
            },

            {
                q: "Was braucht man für einen erfolgreichen Multiplayer-Sieg?",
                a: ["Das Spielziel erreichen", "Nur Kills machen", "Nie sterben", "Nur Snipen"],
                correct: 0
            }

        ]

    },


    2: {

        title: "QUIZ 02 // MODERN WARFARE",

        questions: [

            {
                q: "In welchem Jahr erschien das ursprüngliche Modern Warfare?",
                a: ["2005", "2006", "2007", "2009"],
                correct: 2
            },

            {
                q: "Wie heißt Captain Prices Einheit im ursprünglichen Modern Warfare?",
                a: ["SAS", "CIA", "FBI", "Navy SEALs"],
                correct: 0
            },

            {
                q: "Wie heißt der Spielercharakter in Modern Warfare 2, der oft mit dem Rufnamen 'Roach' bezeichnet wird?",
                a: ["Gary Sanderson", "John MacTavish", "Simon Riley", "Kyle Garrick"],
                correct: 0
            },

            {
                q: "Wie heißt der berühmte Bösewicht aus Modern Warfare 2?",
                a: ["Vladimir Makarov", "Raul Menendez", "Zakhaev", "Khaled Al-Asad"],
                correct: 0
            },

            {
                q: "Wie lautet der Rufname von Simon Riley?",
                a: ["Ghost", "Soap", "Roach", "Gaz"],
                correct: 0
            },

            {
                q: "Wie heißt John MacTavishs Rufname?",
                a: ["Soap", "Ghost", "Price", "Roach"],
                correct: 0
            },

            {
                q: "Was ist die Task Force 141?",
                a: ["Spezialeinheit", "Panzerdivision", "Luftwaffe", "Geheimdienst-Server"],
                correct: 0
            },

            {
                q: "Welche Figur ist besonders für ihre Totenkopfmaske bekannt?",
                a: ["Ghost", "Price", "Soap", "Gaz"],
                correct: 0
            },

            {
                q: "Welche Organisation spielt in Modern Warfare eine wichtige Rolle?",
                a: ["CIA", "NASA", "FIFA", "Interpol"],
                correct: 0
            },

            {
                q: "Wie heißt der Gegenspieler in Modern Warfare 2019?",
                a: ["General Barkov", "Menendez", "Mason", "Dragovich"],
                correct: 0
            },

            {
                q: "Wie heißt der Hauptcharakter der Kampagne von Modern Warfare 2019?",
                a: ["Alex", "Roach", "Miller", "Hudson"],
                correct: 0
            },

            {
                q: "Welche britische Figur wird in Modern Warfare 2019 vorgestellt?",
                a: ["Kyle Garrick", "Frank Woods", "Jason Hudson", "Mason"],
                correct: 0
            },

            {
                q: "Wie heißt die neue Modern-Warfare-Reihe, die 2019 begann?",
                a: ["Reboot", "Classic Edition", "Origins", "Legacy"],
                correct: 0
            },

            {
                q: "Welche Waffe ist stark mit der Modern-Warfare-Reihe verbunden?",
                a: ["M4", "M1 Garand", "Ray Gun", "StG 44"],
                correct: 0
            },

            {
                q: "Was ist ein UAV?",
                a: ["Unbemanntes Aufklärungsflugzeug", "Panzer", "Raketenwerfer", "Scharfschützengewehr"],
                correct: 0
            },

            {
                q: "Was zeigt ein UAV im Multiplayer hauptsächlich?",
                a: ["Gegnerpositionen", "Munition", "Gesundheit", "Waffenwerte"],
                correct: 0
            },

            {
                q: "Wie heißt Captain Price mit Vornamen?",
                a: ["John", "Simon", "Kyle", "Alex"],
                correct: 0
            },

            {
                q: "Welche Einheit gehört zur britischen Spezialeinheit im Modern-Warfare-Universum?",
                a: ["SAS", "KSK", "GIGN", "SWAT"],
                correct: 0
            },

            {
                q: "Welche Figur trägt den Spitznamen 'Soap'?",
                a: ["John MacTavish", "Simon Riley", "Kyle Garrick", "Alex Keller"],
                correct: 0
            },

            {
                q: "Was ist eine 'Killcam'?",
                a: ["Wiederholung des Kills", "Map-Übersicht", "Waffenmenü", "Ladebildschirm"],
                correct: 0
            }

        ]

    },


    3: {

        title: "QUIZ 03 // BLACK OPS",

        questions: [

            {
                q: "Wie heißt der Hauptcharakter von Call of Duty: Black Ops?",
                a: ["Alex Mason", "Soap", "Price", "Ghost"],
                correct: 0
            },

            {
                q: "Welche Organisation wird im Black-Ops-Universum häufig erwähnt?",
                a: ["CIA", "NASA", "FIFA", "Interpol"],
                correct: 0
            },

            {
                q: "Wie heißt Masons Freund und Kamerad?",
                a: ["Frank Woods", "Simon Riley", "Kyle Garrick", "John Price"],
                correct: 0
            },

            {
                q: "In welcher Epoche spielt das erste Black Ops hauptsächlich?",
                a: ["Kalter Krieg", "Erster Weltkrieg", "Mittelalter", "Zukunft 2050"],
                correct: 0
            },

            {
                q: "Welche Stadt ist eng mit einer bekannten Black-Ops-Mission verbunden?",
                a: ["Hanoi", "Berlin", "Paris", "Madrid"],
                correct: 0
            },

            {
                q: "Wie heißt der Gegenspieler aus Black Ops II?",
                a: ["Raul Menendez", "Makarov", "Barkov", "Zakhaev"],
                correct: 0
            },

            {
                q: "Welche Figur ist besonders mit dem Namen 'Woods' verbunden?",
                a: ["Frank Woods", "Jason Hudson", "Alex Mason", "David Mason"],
                correct: 0
            },

            {
                q: "Was ist ein bekanntes Easter Egg in Black Ops?",
                a: ["Zombies", "Autorennen", "Fußball", "Flugsimulator"],
                correct: 0
            },

            {
                q: "Welche Waffe ist eine ikonische Black-Ops-Waffe?",
                a: ["Galil", "M4", "SCAR-H", "Kilo 141"],
                correct: 0
            },

            {
                q: "Welche Waffe ist besonders mit dem Zombies-Modus verbunden?",
                a: ["Ray Gun", "M16", "AK-47", "MP5"],
                correct: 0
            },

            {
                q: "Wie heißt der Zombie-Modus aus Black Ops?",
                a: ["Zombies", "Undead Warfare", "Dead Ops Only", "Nightfall"],
                correct: 0
            },

            {
                q: "Was ist 'Pack-a-Punch'?",
                a: ["Waffenverbesserung", "Perk", "Map", "Charakter"],
                correct: 0
            },

            {
                q: "Welche Figur ist eng mit dem Zombies-Universum verbunden?",
                a: ["Richtofen", "Price", "Ghost", "Roach"],
                correct: 0
            },

            {
                q: "Wie heißt der Protagonist von Black Ops II?",
                a: ["David Mason", "Alex Mason", "Frank Woods", "Jason Hudson"],
                correct: 0
            },

            {
                q: "Wer ist Raul Menendez?",
                a: ["Antagonist", "Medic", "Pilot", "Händler"],
                correct: 0
            },

            {
                q: "Black Ops III spielt im Vergleich zu Black Ops deutlich stärker in ...?",
                a: ["der Zukunft", "der Antike", "dem Mittelalter", "den 1930ern"],
                correct: 0
            },

            {
                q: "Wie heißt die Black-Ops-Reihe aus dem Jahr 2020?",
                a: ["Cold War", "Future Warfare", "Modern Cold", "Blackout"],
                correct: 0
            },

            {
                q: "Welche Figur kehrt in Black Ops Cold War zurück?",
                a: ["Alex Mason", "Soap", "Ghost", "Roach"],
                correct: 0
            },

            {
                q: "Was bezeichnet 'Black Ops' im militärischen Kontext?",
                a: ["Geheime Operationen", "Panzerangriff", "Luftshow", "Ausbildungslager"],
                correct: 0
            },

            {
                q: "Welcher Modus ist ein Markenzeichen der Black-Ops-Reihe?",
                a: ["Zombies", "Kartrennen", "Golf", "Survival Crafting"],
                correct: 0
            }

        ]

    }

};


/* =========================================================
   QUIZ STATE
========================================================= */

let currentQuiz = 1;

let currentQuestion = 0;

let quizTimerInterval = null;

let quizTimeLeft = 10;

let quizLocked = false;


/* =========================================================
   AUDIO
========================================================= */

function playSound(id) {

    const audio =
        document.getElementById(
            id + "Sound"
        );

    if (!audio) {
        return;
    }

    try {

        audio.currentTime = 0;

        if (id === "wrong") {

            audio.volume = 0.25;

        } else {

            audio.volume = 1.0;

        }

        audio.play().catch(() => { });

    } catch (error) {

        console.warn(
            "Sound error:",
            error
        );

    }

}


function startMenuMusic() {

    const music =
        document.getElementById(
            "menuMusic"
        );

    const arcade =
        document.getElementById(
            "arcadeMusic"
        );

    if (!music || !arcade) {
        return;
    }

    arcade.pause();

    try {

        music.volume = 0.25;

        music.play().catch(() => { });

    } catch (error) { }

}


function startArcadeMusic() {

    const menu =
        document.getElementById(
            "menuMusic"
        );

    const arcade =
        document.getElementById(
            "arcadeMusic"
        );

    if (!menu || !arcade) {
        return;
    }

    menu.pause();

    try {

        arcade.volume = 0.35;

        arcade.currentTime = 0;

        arcade.play().catch(() => { });

    } catch (error) { }

}


/* =========================================================
   BUTTON SOUND
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "button"
            );

        if (!button) {
            return;
        }

        if (button.disabled) {
            return;
        }

        playSound("button");

    }
);


/* =========================================================
   NAVIGATION
========================================================= */

function hideAllSections() {

    startScreen.style.display =
        "none";

    quizContainer.style.display =
        "none";

    weaponSelection.style.display =
        "none";

    shootingGame.style.display =
        "none";

    leaderboardSection.style.display =
        "none";

    failureModal.style.display =
        "none";

    completeOverlay.classList.remove(
        "active"
    );

}


function showStartScreen() {

    stopQuizTimer();

    stopArcadeTimer();

    spacePressed = false;

    hideAllSections();

    startScreen.style.display =
        "flex";

    updateWeaponLocks();

    startMenuMusic();

}


function backToStart() {

    stopQuizTimer();

    stopArcadeTimer();

    spacePressed = false;

    quizLocked = false;

    showStartScreen();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   QUIZ START
========================================================= */

function openQuiz(number) {

    const headerLeft =
        document.getElementById(
            "quizHeaderLeft"
        );

    const headerRight =
        document.getElementById(
            "quizHeaderRight"
        );


    if (headerLeft && headerRight) {

        if (number === 1) {

            headerLeft.src =
                "/18.Birthday/Bilder/B07.jpg";

            headerRight.src =
                "/18.Birthday/Bilder/MW4.jpg";

        }


        if (number === 2) {

            headerLeft.src =
                "/18.Birthday/Bilder/b06.jpg";

            headerRight.src =
                "/18.Birthday/Bilder/mw3.jpg";

        }


        if (number === 3) {

            headerLeft.src =
                "/18.Birthday/Bilder/b0coldwar.jpg";

            headerRight.src =
                "/18.Birthday/Bilder/mw2019.jpg";

        }

    }


    currentQuiz = number;

    const quiz =
        quizzes[currentQuiz];

    if (!quiz) {
        return;
    }

    stopArcadeTimer();

    spacePressed = false;

    hideAllSections();

    quizContainer.style.display =
        "block";

    quizModeTitle.textContent =
        quiz.title;


    /*
       WICHTIG:
       Das Quiz startet IMMER
       bei Frage 1.

       Es wird kein Fortschritt
       aus localStorage geladen.
    */

    currentQuestion = 0;

    quizLocked = false;

    startMenuMusic();

    renderQuestion();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   RENDER QUESTION
========================================================= */

function renderQuestion() {

    const quiz =
        quizzes[currentQuiz];

    const question =
        quiz.questions[
        currentQuestion
        ];

    if (!question) {

        missionComplete();

        return;

    }


    questionNumber.textContent =
        `QUESTION // ${String(
            currentQuestion + 1
        ).padStart(2, "0")} / 20`;


    questionText.textContent =
        question.q;


    for (let i = 0; i < 4; i++) {

        const answer =
            document.getElementById(
                `answer${i}`
            );

        if (answer) {

            answer.textContent =
                question.a[i];

        }

    }

    resetQuizTimer();

}


/* =========================================================
   QUIZ TIMER
========================================================= */

function resetQuizTimer() {

    stopQuizTimer();

    quizTimeLeft = 10;

    updateQuizTimer();

    quizTimerInterval =
        setInterval(
            () => {

                quizTimeLeft--;

                updateQuizTimer();

                if (
                    quizTimeLeft <= 0
                ) {

                    stopQuizTimer();

                    quizTimeExpired();

                }

            },
            1000
        );

}


function updateQuizTimer() {

    quizTimerValue.textContent =
        quizTimeLeft;

    quizTimer.classList.toggle(
        "danger",
        quizTimeLeft <= 5
    );

}


function stopQuizTimer() {

    if (quizTimerInterval) {

        clearInterval(
            quizTimerInterval
        );

        quizTimerInterval = null;

    }

}


/* =========================================================
   ANSWER
========================================================= */

function answerQuestion(
    answerIndex
) {

    if (quizLocked) {
        return;
    }

    quizLocked = true;

    stopQuizTimer();

    const question =
        quizzes[currentQuiz]
            .questions[
        currentQuestion
        ];


    if (
        answerIndex ===
        question.correct
    ) {

        playSound("correct");

        currentQuestion++;


        setTimeout(
            () => {

                quizLocked = false;

                if (
                    currentQuestion >=
                    quizzes[currentQuiz]
                        .questions.length
                ) {

                    missionComplete();

                } else {

                    renderQuestion();

                }

            },
            500
        );


    } else {

        playSound("wrong");

        triggerExplosion();


        setTimeout(
            () => {

                quizLocked = false;

                quizFailed(
                    "FALSCH // TRAINING ABORTED"
                );

            },
            450
        );

    }

}


/* =========================================================
   TIMER FAILED
========================================================= */

function quizTimeExpired() {

    if (quizLocked) {
        return;
    }

    quizLocked = true;

    playSound("wrong");

    triggerExplosion();


    setTimeout(
        () => {

            quizLocked = false;

            quizFailed(
                "TIME OUT // ZEIT ABGELAUFEN"
            );

        },
        450
    );

}


/* =========================================================
   EXPLOSION
========================================================= */

function triggerExplosion() {

    quizContainer.classList.remove(
        "explosion"
    );

    void quizContainer.offsetWidth;

    quizContainer.classList.add(
        "explosion"
    );

    playSound("explosion");


    setTimeout(
        () => {

            quizContainer.classList.remove(
                "explosion"
            );

        },
        600
    );

}


/* =========================================================
   QUIZ FAILED
========================================================= */

function quizFailed(reason) {

    stopQuizTimer();

    failureReason.textContent =
        reason;

    failureModal.style.display =
        "flex";

}


/* =========================================================
   MISSION COMPLETE
========================================================= */

function missionComplete() {

    stopQuizTimer();

    /*
       Nur der Abschluss des Quiz
       wird gespeichert.
    */

    saveData.completedQuizzes[
        currentQuiz
    ] = true;

    saveDataToStorage();

    updateWeaponLocks();


    completeSubtitle.textContent =
        `${quizzes[currentQuiz].title} // ALL 20 OBJECTIVES COMPLETE`;


    createCompleteParticles();

    completeOverlay.classList.add(
        "active"
    );

    playSound("complete");

    playSound("unlock");

}


/* =========================================================
   COMPLETE CLOSE
========================================================= */

function closeComplete() {

    completeOverlay.classList.remove(
        "active"
    );

    showStartScreen();

}


/* =========================================================
   COMPLETE PARTICLES
========================================================= */

function createCompleteParticles() {

    completeParticles.innerHTML = "";

    for (
        let i = 0;
        i < 55;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );

        particle.className =
            "complete-particle";

        particle.style.left =
            "50%";

        particle.style.top =
            "50%";

        particle.style.setProperty(
            "--x",
            `${Math.random() * 1000 - 500}px`
        );

        particle.style.setProperty(
            "--y",
            `${Math.random() * 700 - 350}px`
        );

        particle.style.animationDelay =
            `${Math.random() * .5}s`;

        completeParticles.appendChild(
            particle
        );

    }

}


/* =========================================================
   WEAPON UNLOCKS
========================================================= */

function isWeaponUnlocked(
    unlockQuiz
) {

    return Boolean(
        saveData.completedQuizzes[
        unlockQuiz
        ]
    );

}


function updateWeaponLocks() {

    const weapons =
        document.querySelectorAll(
            ".weapon"
        );


    weapons.forEach(
        weapon => {

            const unlockQuiz =
                Number(
                    weapon.dataset.unlock
                );


            const unlocked =
                isWeaponUnlocked(
                    unlockQuiz
                );


            const lock =
                weapon.querySelector(
                    ".weapon-lock"
                );


            const status =
                weapon.querySelector(
                    ".weapon-status"
                );


            if (unlocked) {

                weapon.classList.remove(
                    "locked"
                );

                weapon.classList.add(
                    "unlocked"
                );


                if (lock) {

                    lock.textContent =
                        "✓";

                }


                if (status) {

                    status.textContent =
                        "UNLOCKED";

                }


            } else {

                weapon.classList.add(
                    "locked"
                );

                weapon.classList.remove(
                    "unlocked"
                );


                if (lock) {

                    lock.textContent =
                        "🔒";

                }


                if (status) {

                    status.textContent =
                        `COMPLETE QUIZ 0${unlockQuiz}`;

                }

            }

        }
    );

}


/* =========================================================
   ARCADE
========================================================= */

function openArcade() {

    stopQuizTimer();

    hideAllSections();

    weaponSelection.style.display =
        "block";

    updateWeaponLocks();

    startMenuMusic();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   WEAPON DATA
========================================================= */

const weaponData = {

    "VOYAK-KT-3.jpg": {
        offset: 21,
        bulletSpeed: 40
    },

    "VS-Recon-Green.jpg": {
        offset: 31,
        bulletSpeed: 22
    },

    "ladra.jpg": {
        offset: 10,
        bulletSpeed: 47
    },

    "hdr.jpg": {
        offset: 32,
        bulletSpeed: 22
    },

    "fara-83.png": {
        offset: 21,
        bulletSpeed: 35
    },

    "ax-50.png": {
        offset: 28,
        bulletSpeed: 22
    }

};


/* =========================================================
   SHOOTING STATE
========================================================= */

let selectedWeapon = null;

let weaponY = 215;

let score = 0;

let gameActive = false;

let shooting = false;

/*
   NEU:
   Wird true, solange die Leertaste
   gedrückt gehalten wird.
*/
let spacePressed = false;

let weaponSpeed = 18;


/*
   SHOOTING RANGE:
   30 Sekunden
*/

let arcadeTimeLeft = 30;

let arcadeTimerInterval = null;

let targetMoveIntervals = [];


const targets = [

    document.getElementById(
        "target1"
    ),

    document.getElementById(
        "target2"
    ),

    document.getElementById(
        "target3"
    )

];


/* =========================================================
   SELECT WEAPON
========================================================= */

function selectWeapon(element) {

    if (
        element.classList.contains(
            "locked"
        )
    ) {

        playSound("wrong");

        showHitText(
            "🔒 LOCKED"
        );

        return;

    }


    const image =
        element.querySelector(
            "img"
        );


    if (!image) {
        return;
    }


    const weaponNameElement =
        element.querySelector(
            ".weapon-label"
        );


    if (!weaponNameElement) {
        return;
    }


    const weaponName =
        weaponNameElement.textContent;


    playSound(
        "weaponSelect"
    );


    startShootingGame(
        image.getAttribute("src"),
        weaponName
    );

}


/* =========================================================
   START SHOOTING GAME
========================================================= */

function startShootingGame(
    image,
    weaponName
) {

    selectedWeapon =
        weaponName;


    hideAllSections();

    shootingGame.style.display =
        "block";


    gameWeaponImage.src =
        image;


    score = 0;

    scoreDisplay.textContent =
        score;


    weaponY = 215;

    gameActive = true;

    shooting = false;

    spacePressed = false;


    positionWeapon();

    resetTargets();

    startArcadeMusic();

    startArcadeTimer();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   ARCADE TIMER
========================================================= */

function startArcadeTimer() {

    stopArcadeTimer();

    /*
       30 Sekunden
    */

    arcadeTimeLeft = 30;

    updateArcadeTimer();


    arcadeTimerInterval =
        setInterval(
            () => {

                arcadeTimeLeft--;

                updateArcadeTimer();


                if (
                    arcadeTimeLeft <= 0
                ) {

                    stopArcadeTimer();

                    endArcade();

                }

            },
            1000
        );

}


function stopArcadeTimer() {

    if (arcadeTimerInterval) {

        clearInterval(
            arcadeTimerInterval
        );

        arcadeTimerInterval = null;

    }

}


function updateArcadeTimer() {

    const minutes =
        Math.floor(
            arcadeTimeLeft / 60
        );


    const seconds =
        arcadeTimeLeft % 60;


    arcadeTimerValue.textContent =
        `${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(
            2,
            "0"
        )}`;


    arcadeTimer.classList.toggle(
        "warning",
        arcadeTimeLeft <= 7
    );

}


/* =========================================================
   MOVE WEAPON
========================================================= */

function moveWeapon(amount) {

    if (!gameActive) {
        return;
    }


    const fieldHeight =
        shootingField.clientHeight;


    const weaponHeight =
        gameWeapon.offsetHeight;


    weaponY += amount;


    const maxY =
        fieldHeight -
        weaponHeight;


    weaponY =
        Math.max(
            0,
            Math.min(
                weaponY,
                maxY
            )
        );


    positionWeapon();

}


function positionWeapon() {

    gameWeapon.style.top =
        `${weaponY}px`;

}


/* =========================================================
   SHOOT
========================================================= */

function shoot() {

    if (
        !gameActive ||
        shooting
    ) {
        return;
    }


    shooting = true;

    playSound("shoot");


    const startX =
        gameWeapon.offsetLeft +
        gameWeapon.offsetWidth -
        5;


    /* =========================================
       WAFFE ERMITTELN
    ========================================= */

    const weaponFile =
        gameWeaponImage.src
            .split("/")
            .pop()
            .split("?")[0];


    const weaponSettings =
        weaponData[weaponFile];


    /* =========================================
       SCHUSSHÖHE
    ========================================= */

    const bulletY =
        weaponY +
        (
            weaponSettings
                ? weaponSettings.offset
                : gameWeapon.offsetHeight / 2
        );


    bullet.style.left =
        `${startX}px`;

    bullet.style.top =
        `${bulletY}px`;

    bullet.style.display =
        "block";


    /* =========================================
       BULLET SPEED

       BLEIBT KOMPLETT UNVERÄNDERT
    ========================================= */

    const bulletSpeed =
        weaponSettings
            ? weaponSettings.bulletSpeed
            : 22;


    let bulletX =
        startX;


    /*
       Für jedes Ziel speichern wir
       den kleinsten Abstand zur Mitte.

       Dadurch wird die komplette
       Flugbahn berücksichtigt.
    */

    const targetDistances =
        new Map();


    targets.forEach(
        target => {

            if (target) {

                targetDistances.set(
                    target,
                    Infinity
                );

            }

        }
    );


    const interval =
        setInterval(
            () => {


                /* =========================================
                   SPIEL BEENDET
                ========================================= */

                if (!gameActive) {

                    clearInterval(
                        interval
                    );

                    bullet.style.display =
                        "none";

                    shooting =
                        false;

                    return;

                }


                /* =========================================
                   ALTE POSITION
                ========================================= */

                const previousBulletX =
                    bulletX;


                /* =========================================
                   KUGEL BEWEGEN

                   SPEED UNVERÄNDERT
                ========================================= */

                bulletX +=
                    bulletSpeed;


                bullet.style.left =
                    `${bulletX}px`;


                /* =========================================
                   ALLE ZIELE PRÜFEN

                   Wir berechnen den kleinsten
                   Abstand der Kugelstrecke
                   zur Zielmitte.
                ========================================= */

                targets.forEach(
                    target => {

                        if (!target) {
                            return;
                        }


                        const rect =
                            target.getBoundingClientRect();


                        const fieldRect =
                            shootingField.getBoundingClientRect();


                        const targetX =
                            rect.left -
                            fieldRect.left;


                        const targetY =
                            rect.top -
                            fieldRect.top;


                        const centerX =
                            targetX +
                            rect.width / 2;


                        const centerY =
                            targetY +
                            rect.height / 2;


                        /*
                           Vertikaler Abstand
                           zwischen Kugel und Mitte.
                        */

                        const verticalDistance =
                            Math.abs(
                                bulletY -
                                centerY
                            );


                        /*
                           Horizontalen Punkt bestimmen,
                           der auf der aktuellen Strecke
                           am nächsten an der Zielmitte liegt.
                        */

                        let closestX =
                            centerX;


                        if (
                            closestX <
                            previousBulletX
                        ) {

                            closestX =
                                previousBulletX;

                        }


                        if (
                            closestX >
                            bulletX
                        ) {

                            closestX =
                                bulletX;

                        }


                        /*
                           Exakter Abstand
                           zur Zielmitte.
                        */

                        const distance =
                            Math.sqrt(

                                Math.pow(
                                    closestX -
                                    centerX,
                                    2
                                ) +

                                Math.pow(
                                    bulletY -
                                    centerY,
                                    2
                                )

                            );


                        /*
                           Bisher kleinsten Abstand
                           speichern.
                        */

                        const oldDistance =
                            targetDistances.get(
                                target
                            );


                        if (
                            distance <
                            oldDistance
                        ) {

                            targetDistances.set(
                                target,
                                distance
                            );

                        }

                    }
                );


                /* =========================================
                   TREFFER PRÜFEN

                   Die Kugel wird NICHT beim
                   ersten Kontakt gelöscht.

                   Erst wenn sie hinter dem Ziel
                   ist, wird ausgewertet.
                ========================================= */

                for (const target of targets) {

                    if (!target) {
                        continue;
                    }


                    const rect =
                        target.getBoundingClientRect();


                    const fieldRect =
                        shootingField.getBoundingClientRect();


                    const targetX =
                        rect.left -
                        fieldRect.left;


                    const centerX =
                        targetX +
                        rect.width / 2;


                    const hitRadius =
                        Math.max(
                            rect.width,
                            rect.height
                        ) / 2;


                    /*
                       Nur prüfen, wenn die Kugel
                       das Ziel bereits passiert hat.
                    */

                    if (
                        bulletX >
                        centerX + hitRadius
                    ) {


                        const closestDistance =
                            targetDistances.get(
                                target
                            );


                        /*
                           Treffer.
                        */

                        if (
                            closestDistance <=
                            hitRadius
                        ) {


                            const points =
                                calculateHitPoints(
                                    closestDistance
                                );


                            score +=
                                points;


                            scoreDisplay.textContent =
                                score;


                            playSound(
                                "hit"
                            );


                            showHit(
                                points
                            );


                            moveTarget(
                                target
                            );


                            clearInterval(
                                interval
                            );


                            bullet.style.display =
                                "none";


                            shooting =
                                false;


                            /*
                               Bei gedrückter Space-Taste
                               direkt weiter schießen.
                            */

                            if (
                                spacePressed &&
                                gameActive
                            ) {

                                shoot();

                            }


                            return;

                        }

                    }

                }


                /* =========================================
                   KUGEL HAT DAS FELD VERLASSEN
                ========================================= */

                if (
                    bulletX >
                    shootingField.clientWidth
                ) {

                    clearInterval(
                        interval
                    );


                    bullet.style.display =
                        "none";


                    shooting =
                        false;


                    /*
                       Automatisch weiter schießen.
                    */

                    if (
                        spacePressed &&
                        gameActive
                    ) {

                        shoot();

                    }

                }

            },
            20
        );

}


/* =========================================================
   HIT POINTS
========================================================= */

function calculateHitPoints(
    distance
) {

    // ZENTRUM
    if (distance <= 10) {
        return 1000;
    }

    // äußerer Kreis
    if (distance <= 20) {
        return 500;
    }


    // äußerer Kreis
    if (distance <= 40) {
        return 250;
    }

    return 150;

}


/* =========================================================
   HIT MESSAGE
========================================================= */

function showHit(points) {

    hitMessage.textContent =
        `+${points} // HIT`;


    hitMessage.classList.remove(
        "show"
    );


    void hitMessage.offsetWidth;


    hitMessage.classList.add(
        "show"
    );

}


function showHitText(text) {

    hitMessage.textContent =
        text;


    hitMessage.classList.remove(
        "show"
    );


    void hitMessage.offsetWidth;


    hitMessage.classList.add(
        "show"
    );

}


/* =========================================================
   TARGETS
========================================================= */

function resetTargets() {

    targetMoveIntervals.forEach(
        interval =>
            clearInterval(
                interval
            )
    );


    targetMoveIntervals = [];


    targets.forEach(
        (target, index) => {

            if (!target) {
                return;
            }


            const maxY =
                shootingField.clientHeight -
                target.offsetHeight -
                10;


            const minY =
                15;


            const newY =
                Math.random() *
                (maxY - minY) +
                minY;


            target.style.top =
                `${newY}px`;


            const interval =
                setInterval(
                    () => {

                        if (!gameActive) {
                            return;
                        }

                        moveTarget(
                            target
                        );

                    },
                    1700 +
                    index * 500
                );


            targetMoveIntervals.push(
                interval
            );

        }
    );

}


function moveTarget(target) {

    if (!target) {
        return;
    }


    const maxY =
        shootingField.clientHeight -
        target.offsetHeight -
        10;


    const minY =
        10;


    const newY =
        Math.random() *
        (maxY - minY) +
        minY;


    target.style.top =
        `${newY}px`;

}


/* =========================================================
   END ARCADE
========================================================= */

function endArcade() {

    if (!gameActive) {
        return;
    }


    gameActive = false;

    shooting = false;

    spacePressed = false;


    stopArcadeTimer();


    targetMoveIntervals.forEach(
        interval =>
            clearInterval(
                interval
            )
    );


    targetMoveIntervals = [];


    const arcadeMusic =
        document.getElementById(
            "arcadeMusic"
        );


    if (arcadeMusic) {

        arcadeMusic.pause();

    }


    startMenuMusic();


    finalScore.textContent =
        score;


    playerName.value =
        "";


    const completeWeaponName =
        document.getElementById(
            "completeWeaponName"
        );


    if (completeWeaponName) {

        completeWeaponName.textContent =
            getWeaponDisplayName();

    }


    renderLeaderboard();


    hideAllSections();


    leaderboardSection.style.display =
        "block";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   EXIT SHOOTING GAME
========================================================= */

function exitShootingGame() {

    gameActive = false;

    shooting = false;

    spacePressed = false;


    stopArcadeTimer();


    targetMoveIntervals.forEach(
        interval =>
            clearInterval(
                interval
            )
    );


    targetMoveIntervals = [];


    const arcadeMusic =
        document.getElementById(
            "arcadeMusic"
        );


    if (arcadeMusic) {

        arcadeMusic.pause();

    }


    weaponSelection.style.display =
        "block";


    shootingGame.style.display =
        "none";


    updateWeaponLocks();

    startMenuMusic();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   KEYBOARD
========================================================= */

/*
   SPACE:
   Wird true, solange die Leertaste
   gedrückt gehalten wird.

   Dadurch kann man gleichzeitig:
   ↑ / ↓ bewegen
   + SPACE gedrückt halten
   + dauerhaft schießen
*/

document.addEventListener(
    "keydown",
    function (event) {

        if (!gameActive) {
            return;
        }


        /* =========================
           NACH OBEN
        ========================= */

        if (
            event.code ===
            "ArrowUp"
        ) {

            event.preventDefault();

            moveWeapon(
                -weaponSpeed
            );

        }


        /* =========================
           NACH UNTEN
        ========================= */

        if (
            event.code ===
            "ArrowDown"
        ) {

            event.preventDefault();

            moveWeapon(
                weaponSpeed
            );

        }


        /* =========================
           SCHIESSEN
        ========================= */

        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();


            /*
               Space gedrückt halten.
            */

            spacePressed = true;


            /*
               Ersten Schuss sofort abgeben.
            */

            shoot();

        }


        /* =========================
           ESC
        ========================= */

        if (
            event.code ===
            "Escape"
        ) {

            event.preventDefault();

            exitShootingGame();

        }

    }
);


/* =========================================================
   KEYBOARD KEYUP
========================================================= */

document.addEventListener(
    "keyup",
    function (event) {

        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            /*
               Automatisches Schießen stoppen.
            */

            spacePressed = false;

        }

    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (gameActive) {

            const maxY =
                shootingField.clientHeight -
                gameWeapon.offsetHeight;


            weaponY =
                Math.max(
                    0,
                    Math.min(
                        weaponY,
                        maxY
                    )
                );


            positionWeapon();

        }

    }
);


/* =========================================================
   LEADERBOARD
========================================================= */

/*
   Aktuelle Waffe anhand des Dateinamens ermitteln.
*/

function getCurrentWeaponFile() {

    if (
        !gameWeaponImage ||
        !gameWeaponImage.src
    ) {

        return null;

    }


    return gameWeaponImage.src
        .split("/")
        .pop()
        .split("?")[0];

}


/*
   Anzeigename der aktuellen Waffe.
*/

function getWeaponDisplayName() {

    const weaponFile =
        getCurrentWeaponFile();


    const weaponNames = {

        "VOYAK-KT-3.jpg":
            "VOYAK-KT-3",

        "VS-Recon-Green.jpg":
            "VS-RECON",

        "ladra.jpg":
            "LADRA",

        "hdr.jpg":
            "HDR",

        "fara-83.png":
            "FARA 83",

        "ax-50.png":
            "AX-50"

    };


    return (
        weaponNames[weaponFile] ||
        "UNKNOWN WEAPON"
    );

}


/*
   Score für die aktuell gespielte
   Waffe speichern.
*/

function saveLeaderboardScore() {

    const name =
        playerName.value.trim();


    if (!name) {

        playerName.focus();

        return;

    }


    const weaponFile =
        getCurrentWeaponFile();


    if (!weaponFile) {

        console.warn(
            "No weapon selected for leaderboard."
        );

        return;

    }


    /*
       Leaderboard-System bei Bedarf
       automatisch erstellen.
    */

    if (
        !saveData.leaderboards ||
        typeof saveData.leaderboards !== "object"
    ) {

        saveData.leaderboards = {};

    }


    if (
        !Array.isArray(
            saveData.leaderboards[weaponFile]
        )
    ) {

        saveData.leaderboards[weaponFile] = [];

    }


    /*
       Eintrag hinzufügen.
    */

    saveData.leaderboards[
        weaponFile
    ].push({

        name:
            name.substring(
                0,
                20
            ),

        score:
            score,

        date:
            new Date().toISOString()

    });


    /*
       Höchsten Score zuerst.
    */

    saveData.leaderboards[
        weaponFile
    ].sort(
        (a, b) =>
            b.score -
            a.score
    );


    /*
       Nur Top 10 behalten.
    */

    saveData.leaderboards[
        weaponFile
    ] =
        saveData.leaderboards[
            weaponFile
        ].slice(
            0,
            10
        );


    saveDataToStorage();


    renderLeaderboard();


    playerName.value =
        "";

}


/*
   Leaderboard der aktuell gespielten
   Waffe anzeigen.
*/

function renderLeaderboard() {

    const list =
        document.getElementById(
            "leaderboardList"
        );


    if (!list) {
        return;
    }


    const weaponFile =
        getCurrentWeaponFile();


    list.innerHTML =
        "";


    if (!weaponFile) {

        list.innerHTML = `

            <div class="leader-row">

                <span>-</span>

                <span>NO WEAPON SELECTED</span>

                <span>---</span>

            </div>

        `;

        return;

    }


    if (
        !saveData.leaderboards ||
        typeof saveData.leaderboards !== "object"
    ) {

        saveData.leaderboards = {};

    }


    const leaderboard =
        Array.isArray(
            saveData.leaderboards[
            weaponFile
            ]
        )
            ? saveData.leaderboards[
            weaponFile
            ]
            : [];


    if (!leaderboard.length) {

        list.innerHTML = `

            <div class="leader-row">

                <span>-</span>

                <span>NO SCORES YET</span>

                <span>---</span>

            </div>

        `;

        return;

    }


    leaderboard.forEach(
        (entry, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "leader-row";


            row.innerHTML = `

                <span class="rank">

                    #${index + 1}

                </span>


                <span>

                    ${escapeHtml(
                entry.name
            )}

                </span>


                <span class="leader-score">

                    ${entry.score}

                </span>

            `;


            list.appendChild(
                row
            );

        }
    );

}


function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================================
   INITIALIZE
========================================================= */

loadSaveData();


/* =========================================================
   INITIALIZE UI
========================================================= */

updateWeaponLocks();

renderLeaderboard();

showStartScreen();