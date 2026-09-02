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
            "Wirklich ALLE gespeicherten Waffen-Freischaltungen und Leaderboard-Daten löschen?"
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
            "SYSTEM // ALLE GESPEICHERTEN DATEN WURDEN GELÖSCHT";

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

        title: "QUIZ 01 // BLACK OPS 7 / MODERN WARFARE 4",

        questions: [

            {
                q: "Wann kommt dieses Jahr die volle Version von Modern Warfare 4 raus?",
                a: ["21. Oktober", "22. Oktober", "23. Oktober", "24. Oktober"],
                correct: 2
            },

            {
                q: "Wann ging das erste Beta Wochendende für Wodern Warfare 4 los?",
                a: ["18. August", "19. August", "20. August", "21. August"],
                correct: 3
            },

            {
                q: "Wer ist der neue Protagonist in Modern Warfare 4?",
                a: ["Moon", "Park", "Jae", "Cho"],
                correct: 1
            },

            {
                q: "Welche Person kommt in Modern Warfare 4 wieder vor?",
                a: ["John 'Soap' MacTavish", "Captain Price", "Derek 'Frost' Westbrook", "Andrei Harkov"],
                correct: 1
            },

            {
                q: "In welchem Land ist eine Location von Modern Warfare 4",
                a: ["Kanada", "Deutschland", "Japan", "Südkorea"],
                correct: 3
            },

            {
                q: "Wann kam Black Ops 7 raus?",
                a: ["14. Oktober 2025", "14. November 2025", "14. Dezember 2025", "14. Januar 2026"],
                correct: 1
            },

            {
                q: "In welchem Jahr spielt die Kampagne von Black Ops 7?",
                a: ["2025", "2030", "2035", "2040"],
                correct: 2
            },

            {
                q: "Welcher neue Spielmodus ist in Black Ops 7 rausgekommen?",
                a: ["Endgame", "Zombies", "Koop", "Multiplayer"],
                correct: 0
            },

            {
                q: "Welche Person ist aus Zombies bekannt?",
                a: [" Chloe 'Karma' Lynch", " Mike Harper", "'Tank' Dempsey", "David 'Section' Mason"],
                correct: 2
            },

            {
                q: "Für was steht T.E.D.D.?",
                a: ["Technical Elaborate Driving Driver", "Technical Elaborate Driver Droide", "Technical Elaborate Driving Droid", "Technical Elaborate Driver"],
                correct: 2
            },

            {
                q: "Welche Warzone-Map wurde wieder zurückgebracht?",
                a: ["Ashika Island", "Verdansk", "Avalon", "Caldera"],
                correct: 1
            },

            {
                q: "Welche Person ist ein Operator in Black Ops 7?",
                a: ["The Replacer", "Oskar Strauss", "Dean Roth", "Yuri Zavoyski"],
                correct: 0
            },

            {
                q: "Welche Waffe ist eine Waffe aus Black Ops 7?",
                a: ["MP40", "M4A1", "Model 1887", "AN-94"],
                correct: 3
            },

            {
                q: "Welche Waffe ist eine Maschinenpistole in Black Ops 7?",
                a: ["REV-46", "Jäger 45", "Akita", "AK-27"],
                correct: 0
            },

            {
                q: "In welcher Zombie-Map aus Black Ops 7 kam Ol' Tessie vor?",
                a: ["Astra Malorum", "Totenreich", "Rex Infernus", "Ashes of the Damned"],
                correct: 3
            },

            {
                q: "Welches Sturmgewehr gibt es in Modern Warfare 4?",
                a: ["STG44", "Han 86", "XM4", "FFAR 1"],
                correct: 1
            },

            {
                q: "Welche Waffe gibt es in Modern Warfare und Modern Warfare 4?",
                a: ["Krait P68", "HK421", "FiNN LMG", "KG-7 Vulcan"],
                correct: 2
            },

            {
                q: "Wie viele Zombie-Maps gibt es in Black Ops 7 insgesamt?",
                a: ["5", "6", "7", "8"],
                correct: 1
            },

            {
                q: "Wie viele Multplayer-Maps kamen in Season 5 Black Ops 7 neu raus?",
                a: ["2", "3", "4", "5"],
                correct: 2
            },

            {
                q: "Welche Multplayer-Map gibt es in Modern Warfare 4?",
                a: ["Cachette", "Terminal", "Rust", "Shipment"],
                correct: 0
            }

        ]

    },


    2: {

        title: "QUIZ 02 // BLACK OPS 6 / MODERN WARFARE 3",

        questions: [

            {
                q: "An welchem Datum kam Black Ops 6 raus?",
                a: ["25. August 2024", "25. September 2024", "25. Oktober 2024", "25. November 2024"],
                correct: 2
            },

            {
                q: "Zu welcher Zeit spielt Black Ops 6?",
                a: ["Frühe 1980er", "1987", "1988", "Frühe 1990er"],
                correct: 3
            },

            {
                q: "Welche Person gibt es in Black Ops 6?",
                a: ["Russell Adler", "Viktor Reznov", "Raul Menendez", "Kyle 'Gaz' Garrick"],
                correct: 0
            },

            {
                q: "Welche Person ist von der CIA in Black Ops 6?",
                a: ["Miriam McKenna", "Troy Marshall", "Gladney", "Pritchard"],
                correct: 1
            },

            {
                q: "Wie lautet der Rufname von Sevati Dumas aus Black Ops 6?",
                a: ["Duma", "Dum", "Sevat", "Sev"],
                correct: 3
            },

            {
                q: "An welchem Datum kam Modern Warfare 3 raus?",
                a: ["10. September 2023", "10. Oktober 2023", "10. November 2023", "10. Dezember 2023"],
                correct: 2
            },

            {
                q: "Welches Land hatte eine Location in der Kampagne von Modern Warfare 3?",
                a: ["Ukraine", "Russland", "Indien", "China"],
                correct: 1
            },

            {
                q: "Welche Person ist in der Urzikstan Liberation Force in Modern Warfare 3?",
                a: ["Farah Karim", "John Price", "Kate Laswell", "Phillip Graves"],
                correct: 0
            },

            {
                q: "Wie viele Seasons gab es in Modern Warfare 3?",
                a: ["3", "4", "5", "6"],
                correct: 3
            },

            {
                q: "Was bekommt man bei einer Killserie von 15 in Modern Warfare 3 Multiplayer?",
                a: ["Fortgeschrittene Drohne", "Juggernaut", "VTOL Jet", "AC-130/Gunship"],
                correct: 1
            },

            {
                q: "Wie viele neue Multiplayer-Maps sind in der Season 6 von Modern Warfare 3 rausgekommen?",
                a: ["6", "7", "8", "9"],
                correct: 1
            },

            {
                q: "Welchen Geburtstag feierte Call Of Duty in Modern Warfare 3?",
                a: ["20. Geburtstag", "18. Geburtstag", "13. Geburtstag", "10. Geburtstag"],
                correct: 0
            },

            {
                q: "Welche Waffe ist ein Sturmgewehr in Modern Warfare 3?",
                a: ["Striker", "Lockwood 680", "BAL-27", "Bruen Mk9"],
                correct: 2
            },

            {
                q: "Welches dieser Waffen ist kein leichtes Maschinengewehr in Modern Warfare 3?",
                a: ["Pulemyot 762", "KATT-AMR", "DG-58 LSW", "Holger 26"],
                correct: 1
            },

            {
                q: "Welche dieser Waffen ist keine Maschinenpistole in Black Ops 6?",
                a: ["Ladra", "Dresden 9mm", "XMG", "LC10"],
                correct: 2
            },

            {
                q: "Wie viele Zombie-Maps gab es in Black Ops 6 insgesamt?",
                a: ["4", "5", "6", "7"],
                correct: 2
            },

            {
                q: "Wie heißt die finale Zombie-Map in Black Ops 6?",
                a: ["Reckoning", "Shattered Veil", "Citadelle des Morts", "The Tomb"],
                correct: 0
            },

            {
                q: "Welche Person gehört nicht zu den Hauptpersonen aus Zombies Black Ops 6?",
                a: ["Mackenzie Carver", "Grigori Weaver", "Elizabeth Grey", "'Tank' Dempsey"],
                correct: 3
            },

            {
                q: "Was heißt S.A.M. aus Black Ops 6 Zombies ausgeschrieben?",
                a: ["Synaptic Algorithm Medium", "Synaptic Algorithm Module", "Synaptic Alkaline Module", "Synthetic Algorithm Module"],
                correct: 1
            },

            {
                q: "In welchen zwei Zombie-Maps kommt die KI S.A.M. das erste mal vor in Black Ops 6 Zombies?",
                a: ["The Tomb und Shattered Veil", "Terminus und Citadelle des Morts", "Liberty Falls und Citadelle des Morts", "Terminus und Liberty Falls"],
                correct: 3
            }

        ]

    },


    3: {

        title: "QUIZ 03 // BLACK OPS COLD WAR / MODERN WARFARE 2019",

        questions: [

            {
                q: "An welchem Datum kam Black Ops Cold War raus?",
                a: ["13. November 2020", "13. Dezember 2020", "13. Januar 2021", "13. Februar 2021"],
                correct: 0
            },

            {
                q: "Zu welcher Zeit spielt Black Ops Cold War?",
                a: ["Frühe 1960er", "Frühe 1970er", "Frühe 1980er", "Frühe 1990er"],
                correct: 2
            },

            {
                q: "Welche Person ist vom United States Government in Black Ops Cold War?",
                a: ["Helen Park", "Ronald Reagan", "Jason Hudson", "Russell Adler"],
                correct: 1
            },

            {
                q: "Wie viele Hauptmissionen gibt es in der Kampagne in Black Ops Cold War?",
                a: ["14", "15", "16", "17"],
                correct: 2
            },

            {
                q: "Wen soll Adler vom US-Präsident aus am Anfang der Kampagne in Black Ops Cold War finden?",
                a: ["Perseus", "Anton Volkov", "Vikhor 'Stitch' Kuzmin", "Imran Zakhaev"],
                correct: 0
            },

            {
                q: "An welchem Datum kam Modern Warfare 2019 raus?",
                a: ["25. September 2023", "25. Oktober 2019", "25. November 2019", "25. Dezember 2019"],
                correct: 1
            },

            {
                q: "Welches Land hatte eine Location in der Kampagne von Modern Warfare 2019?",
                a: ["Finnland", "Polen", "Vereinigtes Königreich", "Südkorea"],
                correct: 2
            },

            {
                q: "Welche Person ist in der SAS in Modern Warfare 2019?",
                a: ["John Price", "Kate Laswell", "Kamarov", "Herschel Shepherd"],
                correct: 0
            },

            {
                q: "Wie viele Seasons gab es in Modern Warfare 2019?",
                a: ["6", "7", "8", "9"],
                correct: 0
            },

            {
                q: "Ab welcher Killserie bekommt man in Modern Warfare 2019 Multiplayer eine Drohne?",
                a: ["2er", "3er", "4er", "5er"],
                correct: 2
            },

            {
                q: "In welcher Season kam die Multiplayer-Map 'Shipment' in Modern Warfare 2019 raus?",
                a: ["1", "2", "4", "6"],
                correct: 0
            },

            {
                q: "Welche Multiplayer-Map kam in Modern Warfare 2019 als 24/7 Variante raus?",
                a: ["Atlas Superstore", "Vacant", "Scrapyard", "Shoot House"],
                correct: 3
            },

            {
                q: "Welche Waffe ist ein Scharfschützengewehr in Modern Warfare 2019?",
                a: ["M4A1", "Dragunov", "Holger-26", "Model 680"],
                correct: 1
            },

            {
                q: "Welches dieser Waffen ist kein Sturmgewehr in Modern Warfare 2019?",
                a: ["Kilo 141", "AS VAL", "CR-56 AMAX", "Uzi"],
                correct: 3
            },

            {
                q: "Welche dieser Waffen ist eine Maschinenpistole in Black Ops Cold War?",
                a: ["XM4", "M16", "1911", "MAC-10"],
                correct: 3
            },

            {
                q: "Wie viele Zombie-Maps gab es in Black Ops Cold War insgesamt?",
                a: ["4", "5", "6", "7"],
                correct: 0
            },

            {
                q: "Wie hieß der neue Modus der in Zombies in Black Ops Cold War noch rauskam in Season 2?",
                a: ["Einbruch", "Ausbruch", "Offene Welt", "Nachtausbruch"],
                correct: 1
            },

            {
                q: "Welche Person gehört zu den Hauptpersonen aus Zombies Black Ops Cold War?",
                a: ["Gabriel Krafft", "Pavel Lazarev", "Kazimir Zykov", "Sergei Ravenov"],
                correct: 3
            },

            {
                q: "In welchem Call Of Duty Teil kam die Ray Gun das erste mal vor?",
                a: ["Call of Duty: World at War", "Call of Duty: Black Ops", "Call of Duty: Black Ops 2", "Call of Duty 4: Modern Warfare"],
                correct: 0
            },

            {
                q: "In welcher Season wurde die Nagelpistole in Black Ops Cold War hinzugefügt?",
                a: ["2", "3", "4", "5"],
                correct: 2
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
        `FRAGE // ${String(
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
        `${quizzes[currentQuiz].title} // ALLE 20 FRAGEN ABGESCHLOSSEN`;


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