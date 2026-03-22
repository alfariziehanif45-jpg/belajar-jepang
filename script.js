// ==========================
// 📚 DATABASE KATA
// ==========================
const words = [

    // ==========================
    // 👋 UMUM
    // ==========================
    { indo: "halo", jp: "こんにちは", romaji: "konnichiwa" },
    { indo: "selamat pagi", jp: "おはよう", romaji: "ohayou" },
    { indo: "selamat malam", jp: "こんばんは", romaji: "konbanwa" },
    { indo: "terima kasih", jp: "ありがとう", romaji: "arigatou" },
    { indo: "maaf", jp: "ごめんなさい", romaji: "gomennasai" },
    { indo: "tolong", jp: "おねがいします", romaji: "onegaishimasu" },
    { indo: "ya", jp: "はい", romaji: "hai" },
    { indo: "tidak", jp: "いいえ", romaji: "iie" },

    // ==========================
    // 👤 ORANG
    // ==========================
    { indo: "saya", jp: "わたし", romaji: "watashi" },
    { indo: "kamu", jp: "あなた", romaji: "anata" },
    { indo: "dia", jp: "かれ", romaji: "kare" },
    { indo: "teman", jp: "ともだち", romaji: "tomodachi" },
    { indo: "guru", jp: "せんせい", romaji: "sensei" },
    { indo: "murid", jp: "がくせい", romaji: "gakusei" },

    // ==========================
    // 🍜 MAKANAN
    // ==========================
    { indo: "makan", jp: "たべる", romaji: "taberu" },
    { indo: "minum", jp: "のむ", romaji: "nomu" },
    { indo: "air", jp: "みず", romaji: "mizu" },
    { indo: "nasi", jp: "ごはん", romaji: "gohan" },
    { indo: "roti", jp: "パン", romaji: "pan" },

    // ==========================
    // 🏠 BENDA
    // ==========================
    { indo: "rumah", jp: "いえ", romaji: "ie" },
    { indo: "meja", jp: "つくえ", romaji: "tsukue" },
    { indo: "kursi", jp: "いす", romaji: "isu" },
    { indo: "buku", jp: "ほん", romaji: "hon" },
    { indo: "pena", jp: "ペン", romaji: "pen" },
    { indo: "tas", jp: "かばん", romaji: "kaban" },
    { indo: "sepatu", jp: "くつ", romaji: "kutsu" },
    { indo: "mobil", jp: "くるま", romaji: "kuruma" },
    { indo: "motor", jp: "バイク", romaji: "baiku" },

    // ==========================
    // 🐾 HEWAN
    // ==========================
    { indo: "kucing", jp: "ねこ", romaji: "neko" },
    { indo: "anjing", jp: "いぬ", romaji: "inu" },
    { indo: "burung", jp: "とり", romaji: "tori" },
    { indo: "ikan", jp: "さかな", romaji: "sakana" },
    { indo: "sapi", jp: "うし", romaji: "ushi" },
    { indo: "kuda", jp: "うま", romaji: "uma" },
    { indo: "ayam", jp: "にわとり", romaji: "niwatori" },

    // ==========================
    // 🏫 TEMPAT
    // ==========================
    { indo: "sekolah", jp: "がっこう", romaji: "gakkou" },
    { indo: "kelas", jp: "きょうしつ", romaji: "kyoushitsu" },
    { indo: "kantor", jp: "オフィス", romaji: "ofisu" },
    { indo: "toko", jp: "みせ", romaji: "mise" },

];

// ==========================
// 🔧 NORMALISASI INPUT
// ==========================
function normalize(text) {
    text = text.toLowerCase().trim();

    // amanin kalau slangDict kosong
    if (typeof slangDict !== "undefined" && slangDict[text]) {
        text = slangDict[text];
    }

    return text;
}

// ==========================
// 🔍 LEVENSHTEIN (cek typo)
// ==========================
function similarity(a, b) {
    let matrix = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// ==========================
// 🧠 SMART SEARCH
// ==========================
function findBestMatch(input) {
    let best = null;
    let minDistance = Infinity;

    words.forEach(w => {
        let dist = similarity(input, w.indo);

        if (dist < minDistance) {
            minDistance = dist;
            best = w;
        }
    });

    // toleransi typo (maks 3 beda huruf)
    if (minDistance <= 3) return best;

    return null;
}

// ==========================
// 🇯🇵 Indo → Jepang
// ==========================
function translateToJP() {
    let input = normalize(document.getElementById("inputText").value);

    // cari exact dulu
    let found = words.find(w => w.indo === input);

    // kalau gak ketemu → pakai AI sederhana (fuzzy)
    if (!found) {
        found = findBestMatch(input);
    }

    if (found) {
        document.getElementById("result").innerHTML = `
            🇯🇵 ${found.jp} <br>
            🔤 ${found.romaji} <br>
            🇮🇩 ${found.indo}
        `;
    } else {
        document.getElementById("result").innerText = "Tidak ditemukan 😢";
    }
}

// ==========================
// 🇮🇩 Jepang → Indo
// ==========================
function translateToID() {
    let input = normalize(document.getElementById("inputText").value);

    let found = words.find(w =>
        w.jp === input ||
        w.romaji.toLowerCase() === input
    );

    if (found) {
        document.getElementById("result").innerHTML = `
            🇮🇩 ${found.indo} <br>
            🔤 ${found.romaji} <br>
            🇯🇵 ${found.jp}
        `;
    } else {
        document.getElementById("result").innerText = "Tidak ditemukan 😢";
    }
}

function showWordList() {
    let html = "";

    words.forEach(w => {
        html += `
        <div style="margin-bottom:10px;">
            🇮🇩 ${w.indo} → 🇯🇵 ${w.jp} (${w.romaji})
        </div>
        `;
    });

    document.getElementById("wordList").innerHTML = html;
}

showWordList();

window.onload = function() {
    showWordList();
};