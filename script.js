// symboly na kartách
const symboly = ["🍎", "🚀", "🐱", "⚽", "🎸", "🌵", "🍕", "👾", "🌙", "🔥", "🎲", "🦊", "🍀", "💎", "🎧", "🐙", "🌈", "🍩"];

// proměnné hry
let karty = [];
let hotove = [];
let otevrene = [];
let tahy = 0;
let nalezeno = 0;
let zamek = false;
let cas = 0;
let casovac;
let bezi = false;

// zamíchání pole
function michat(pole) {
    for (let i = pole.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let pom = pole[i];
        pole[i] = pole[j];
        pole[j] = pom;
    }
}

// formát času
function formatCasu(s) {
    let min = Math.floor(s / 60);
    let sek = s % 60;
    let sekText = String(sek);
    if (sek < 10) {
        sekText = "0" + sek;
    }
    return min + ":" + sekText;
}

// nová hra
function novaHra() {
    clearInterval(casovac);
    document.getElementById("okno").style.display = "none";

    // vynulování hodnot
    karty = [];
    hotove = [];
    otevrene = [];
    tahy = 0;
    nalezeno = 0;
    zamek = false;
    cas = 0;
    bezi = false;
    document.getElementById("cas").textContent = "0:00";
    document.getElementById("tahy").textContent = "0";

    // vytvoření čtveřic
    const pocet = 6;
    michat(symboly);
    for (let i = 0; i < pocet; i++) {
        for (let k = 0; k < 4; k++) {
            karty.push(symboly[i]);
        }
    }
    michat(karty);

    // stav karet
    for (let i = 0; i < karty.length; i++) {
        hotove.push(false);
    }

    // vyčištění desky
    const deska = document.getElementById("deska");
    deska.innerHTML = "";

    // vykreslení karet
    for (let i = 0; i < karty.length; i++) {
        deska.innerHTML += '<button class="karta" id="karta' + i + '" onclick="klik(' + i + ')">?</button>';
    }
}

// klik na kartu
function klik(i) {
    if (zamek === true) {
        return;
    }
    if (hotove[i] === true) {
        return;
    }
    for (let j = 0; j < otevrene.length; j++) {
        if (otevrene[j] === i) {
            return;
        }
    }

    // spuštění času
    if (bezi === false) {
        bezi = true;
        casovac = setInterval(function () {
            cas++;
            document.getElementById("cas").textContent = formatCasu(cas);
        }, 1000);
    }

    // otočení karty
    const karta = document.getElementById("karta" + i);
    karta.textContent = karty[i];
    karta.style.backgroundColor = "white";
    karta.style.color = "black";
    otevrene.push(i);

    if (otevrene.length === 4) {
        zkontroluj();
    }
}

/**
* AI Generated
* Model: Claude Sonnet 5.5
*/
function zkontroluj() {
    tahy++;
    document.getElementById("tahy").textContent = String(tahy);

    let stejne = true;
    for (let j = 1; j < 4; j++) {
        if (karty[otevrene[j]] !== karty[otevrene[0]]) {
            stejne = false;
        }
    }

    if (stejne === true) {
        // správně
        for (let j = 0; j < 4; j++) {
            hotove[otevrene[j]] = true;
            document.getElementById("karta" + otevrene[j]).style.backgroundColor = "#86efac";
        }
        nalezeno = nalezeno + 4;
        otevrene = [];
        if (nalezeno === karty.length) {
            konec();
        }
    } else {
        // špatně
        zamek = true;
        for (let j = 0; j < 4; j++) {
            document.getElementById("karta" + otevrene[j]).style.backgroundColor = "#fca5a5";
        }
        setTimeout(function () {
            for (let j = 0; j < 4; j++) {
                const karta = document.getElementById("karta" + otevrene[j]);
                karta.textContent = "?";
                karta.style.backgroundColor = "#4f46e5";
                karta.style.color = "white";
            }
            otevrene = [];
            zamek = false;
        }, 1000);
    }
}

// konec hry
function konec() {
    clearInterval(casovac);
    document.getElementById("konecCas").textContent = formatCasu(cas);
    document.getElementById("konecTahy").textContent = String(tahy);
    document.getElementById("okno").style.display = "block";
}

// start hry
novaHra();
