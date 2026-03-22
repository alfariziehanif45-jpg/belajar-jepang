// ==========================
// 📚 DATABASE KATA
// ==========================
const words = [
    { indo: "halo", jp: "こんにちは", romaji: "konnichiwa" },
    { indo: "selamat pagi", jp: "おはよう", romaji: "ohayou" },
    { indo: "selamat malam", jp: "こんばんは", romaji: "konbanwa" },
    { indo: "terima kasih", jp: "ありがとう", romaji: "arigatou" },
    { indo: "maaf", jp: "ごめんなさい", romaji: "gomennasai" },
    { indo: "tolong", jp: "おねがいします", romaji: "onegaishimasu" },
    { indo: "ya", jp: "はい", romaji: "hai" },
    { indo: "tidak", jp: "いいえ", romaji: "iie" },

    { indo: "saya", jp: "わたし", romaji: "watashi" },
    { indo: "kamu", jp: "あなた", romaji: "anata" },
    { indo: "dia", jp: "かれ", romaji: "kare" },
    { indo: "teman", jp: "ともだち", romaji: "tomodachi" },
    { indo: "guru", jp: "せんせい", romaji: "sensei" },
    { indo: "murid", jp: "がくせい", romaji: "gakusei" },

    { indo: "makan", jp: "たべる", romaji: "taberu" },
    { indo: "minum", jp: "のむ", romaji: "nomu" },
    { indo: "air", jp: "みず", romaji: "mizu" },
    { indo: "nasi", jp: "ごはん", romaji: "gohan" },
    { indo: "roti", jp: "パン", romaji: "pan" },

    { indo: "rumah", jp: "いえ", romaji: "ie" },
    { indo: "meja", jp: "つくえ", romaji: "tsukue" },
    { indo: "kursi", jp: "いす", romaji: "isu" },
    { indo: "buku", jp: "ほん", romaji: "hon" },
    { indo: "pena", jp: "ペン", romaji: "pen" },

    { indo: "kucing", jp: "ねこ", romaji: "neko" },
    { indo: "anjing", jp: "いぬ", romaji: "inu" },

    { indo: "sekolah", jp: "がっこう", romaji: "gakkou" },
    { indo: "kelas", jp: "きょうしつ", romaji: "kyoushitsu" },

    // ⭐ TAMBAHAN
    { indo: "ganteng", jp: "かっこいい", romaji: "kakkoii" },
    { indo: "cantik", jp: "きれい", romaji: "kirei" }
];

// ==========================
// 🔧 NORMALISASI INPUT
// ==========================
const slangDict = {
    "gw": "saya",
    "gua": "saya",
    "aku": "saya",
    "lu": "kamu",
    "makasih": "terima kasih"
};

function normalize(text) {
    text = text.toLowerCase().trim();
    if (slangDict[text]) text = slangDict[text];
    return text;
}

// ==========================
// 🔊 GETARAN (HP)
// ==========================
function vibrate() {
    if (navigator.vibrate) navigator.vibrate(50);
}

// ==========================
// 🇯🇵 Indo → Jepang (STRICT)
// ==========================
function translateToJP() {
    let input = normalize(document.getElementById("inputText").value);
    let found = words.find(w => w.indo === input);

    if (found) {
        document.getElementById("result").innerHTML = `
            🇯🇵 ${found.jp}<br>
            🔤 ${found.romaji}<br>
            🇮🇩 ${found.indo}
        `;
    } else {
        document.getElementById("result").innerHTML = "";
    }
}

// ==========================
// 🇮🇩 Jepang → Indo
// ==========================
function translateToID() {
    let input = normalize(document.getElementById("inputText").value);

    let found = words.find(w =>
        w.jp === input || w.romaji.toLowerCase() === input
    );

    if (found) {
        document.getElementById("result").innerHTML = `
            🇮🇩 ${found.indo}<br>
            🔤 ${found.romaji}<br>
            🇯🇵 ${found.jp}
        `;
    } else {
        document.getElementById("result").innerHTML = "";
    }
}

// ==========================
// 💬 DATA PERCAKAPAN
// ==========================
const conversationData = {

    sekolah: [
        { jp: "おはよう！", romaji: "Ohayou!", indo: "Selamat pagi!" },
        { jp: "先生はどこですか？", romaji: "Sensei wa doko?", indo: "Guru di mana?" }
    ],

    rumah: [
        { jp: "ただいま", romaji: "Tadaima", indo: "Saya pulang" },
        { jp: "おかえり", romaji: "Okaeri", indo: "Selamat datang kembali" }
    ],

    pasar: [
        { jp: "これはいくらですか？", romaji: "Kore wa ikura desu ka?", indo: "Ini berapa harganya?" },
        { jp: "やすくできますか？", romaji: "Yasuku dekimasu ka?", indo: "Bisa lebih murah?" }
    ],

    belanja: [
        { jp: "これをください", romaji: "Kore o kudasai", indo: "Saya mau ini" }
    ],

    jalan: [
        { jp: "どこに行きますか？", romaji: "Doko ni ikimasu ka?", indo: "Mau pergi ke mana?" }
    ],

    asing: [
        { jp: "こんにちは！はじめまして", romaji: "Konnichiwa! Hajimemashite", indo: "Halo! Senang bertemu" },
        { jp: "インドネシアから来ました", romaji: "Indonesia kara kimashita", indo: "Saya dari Indonesia" }
    ],

    dekat: [
        { jp: "元気？", romaji: "Genki?", indo: "Apa kabar?" }
    ],

    pdkt: [
        { jp: "あなたはとてもきれいです", romaji: "Anata wa totemo kirei desu", indo: "Kamu sangat cantik" },
        { jp: "いっしょに行きませんか？", romaji: "Issho ni ikimasen ka?", indo: "Mau pergi bersama?" }
    ]
};

// ==========================
// 🎯 TAMPILKAN PERCAKAPAN
// ==========================
function showConversation() {
    const select = document.getElementById("category");
    const box = document.getElementById("conversationBox");

    if (!select || !box) return;

    const data = conversationData[select.value];

    if (!data) {
        box.innerHTML = "Tidak ada percakapan 😢";
        return;
    }

    let html = "";

    data.forEach(c => {
        html += `
        <div class="conversation-item">
            🇯🇵 ${c.jp}<br>
            🔤 ${c.romaji}<br>
            🇮🇩 ${c.indo}
        </div>`;
    });

    box.innerHTML = html;
}

// ==========================
// 🚀 INIT
// ==========================
document.addEventListener("DOMContentLoaded", function () {

    const select = document.getElementById("category");
    if (select) {
        showConversation();
        select.addEventListener("change", showConversation);
    }

    const btn = document.getElementById("toggleWordBtn");
    const box = document.getElementById("dailyWord");

    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    if (btn && box) {
        btn.addEventListener("click", function () {
            vibrate();

            box.classList.toggle("hidden");

            if (!box.classList.contains("hidden")) {
                let w = getRandomWord();
                box.innerHTML = `
                    🇮🇩 ${w.indo}<br>
                    🔤 ${w.romaji}<br>
                    🇯🇵 ${w.jp}
                `;
                btn.innerText = "Sembunyikan Kata";
            } else {
                btn.innerText = "Tampilkan Kata";
            }
        });
    }

    const input = document.getElementById("inputText");
    if (input) {
        input.addEventListener("keypress", function(e) {
            if (e.key === "Enter") translateToJP();
        });
    }

});

// ===== SPLASH SCREEN =====
window.addEventListener("load", function () {
    const splash = document.getElementById("splash");

    setTimeout(() => {
        splash.style.opacity = "0";
        splash.style.transition = "0.5s";

        setTimeout(() => {
            splash.style.display = "none";
        }, 500);

    }, 2000);
});
