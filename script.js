const SECRET_PASSWORD = "0609"; // 👈 Yahan apna password rakhein!
const START_DATE = new Date("2025-09-06T00:00:00"); // 👈 Yahan apni date set karein!

// Password Unlock
function unlockSite() {
    const userPass = document.getElementById("password-input").value;
    const errorMsg = document.getElementById("error-msg");

    if (userPass === SECRET_PASSWORD) {
        document.getElementById("lock-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        startCounter();
        createHearts();       // Floating hearts start karein
        loadDiaryEntries();   // Saved diary entries dikhayein
        renderQuiz();         // Love quiz shuru karein
        buildWheel();         // Spin wheel taiyaar karein
        newScratchCard();     // Scratch card taiyaar karein
    } else {
        errorMsg.innerText = "Ghalat password! Kuch aur try karo 😉";
    }
}

// Enter Key Support
document.getElementById("password-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") unlockSite();
});

// Days Counter
function startCounter() {
    function update() {
        const now = new Date();
        const diff = now - START_DATE;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        document.getElementById("together-counter").innerText = 
            `${days} Days, ${hours} Hours, ${mins} Mins, ${secs} Secs`;
    }
    update();
    setInterval(update, 1000);
}

// Background Hearts Animation
function createHearts() {
    const container = document.getElementById("hearts-container");
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 3 + "s";
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }, 400);
}

// Background Music Toggle
function toggleMusic() {
    const music = document.getElementById("bg-music");
    const btn = document.getElementById("music-btn");
    if (music.paused) {
        music.play();
        btn.innerText = "⏸️ Pause Song";
    } else {
        music.pause();
        btn.innerText = "🎵 Play Song";
    }
}

// Surprise Confetti Pop-up
function triggerSurprise() {
    document.getElementById("surprise-modal").classList.remove("hidden");
    // Confetti Patakhe Effect
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#cda86e", "#e8c893", "#c85a78", "#7d3550", "#f0e6d8"]
    });
}

function closeSurprise() {
    document.getElementById("surprise-modal").classList.add("hidden");
}

// ---------- Compliment Generator ----------
const COMPLIMENTS = [
    "Tumhari smile duniya ki sabse khoobsurat cheez hai. 🌸",
    "Tum jitni pyari ho, utni hi caring bhi ho. 💖",
    "Tumhare saath har din ek naya adventure lagta hai. ✨",
    "Tum meri sabse badi khushi ho. 🥰",
    "Tumhari awaaz sunke sara din achha ho jata hai. 🎶",
    "Tumhare saath hone se sab kuch aasan lagta hai. 🌈",
    "Tum jaisa dost/partner milna meri kismat hai. 🍀"
    // 👈 Apni khud ki lines yahan comma se separate karke add/edit karo
];

function generateCompliment() {
    const box = document.getElementById("compliment-box");
    let msg;
    do {
        msg = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    } while (msg === box.dataset.last && COMPLIMENTS.length > 1);
    box.dataset.last = msg;
    box.style.opacity = 0;
    setTimeout(() => {
        box.innerText = msg;
        box.style.opacity = 1;
    }, 200);
}

// ---------- Love Quiz ----------
const QUIZ_QUESTIONS = [
    // 👈 Apne khud ke sawal-jawab yahan edit karo (correct: sahi option ka index, 0 se shuru)
    { q: "Meri favorite color kya hai?", options: ["Pink", "Blue", "Black", "Green"], correct: 0 },
    { q: "Humari first date kahan hui thi?", options: ["Cafe", "bus stop", "Movie", "Beach"], correct: 1 },
    { q: "Mujhe sabse zyada kya pasand hai?", options: ["Music", "cuddle", "Travel", "Sleep"], correct: 2 }
];

let quizIndex = 0;
let quizScore = 0;

function renderQuiz() {
    const box = document.getElementById("quiz-box");
    const result = document.getElementById("quiz-result");

    if (quizIndex >= QUIZ_QUESTIONS.length) {
        box.classList.add("hidden");
        result.classList.remove("hidden");
        const pct = Math.round((quizScore / QUIZ_QUESTIONS.length) * 100);
        let msg;
        if (pct === 100) msg = "Perfect! Tum mujhe pura jaante ho! 💯❤️";
        else if (pct >= 60) msg = "Not bad! Thoda aur jaanna baaki hai 😄";
        else msg = "Haha thoda aur time saath bitana padega! 😜";
        result.innerHTML = `<p>Score: ${quizScore}/${QUIZ_QUESTIONS.length}</p><p>${msg}</p>`;
        const btn = document.createElement("button");
        btn.classList.add("quiz-btn");
        btn.innerText = "Play Again 🔁";
        btn.onclick = resetQuiz;
        result.appendChild(btn);
        return;
    }

    box.classList.remove("hidden");
    result.classList.add("hidden");
    const current = QUIZ_QUESTIONS[quizIndex];
    document.getElementById("quiz-question").innerText = current.q;
    const optionsDiv = document.getElementById("quiz-options");
    optionsDiv.innerHTML = "";
    current.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.classList.add("quiz-option-btn");
        btn.innerText = opt;
        btn.onclick = () => answerQuiz(i);
        optionsDiv.appendChild(btn);
    });
}

function answerQuiz(selected) {
    const current = QUIZ_QUESTIONS[quizIndex];
    if (selected === current.correct) quizScore++;
    quizIndex++;
    renderQuiz();
}

function resetQuiz() {
    quizIndex = 0;
    quizScore = 0;
    renderQuiz();
}

// ---------- Spin the Wheel ----------
const WHEEL_OPTIONS = [
    // 👈 Apni khud ki date ideas yahan edit karo
    "Movie Night 🎬", "Cook Together 🍳", "Long Drive 🚗", "Stargazing 🌌",
    "Picnic Date 🧺", "Game Night 🎮", "Dance Together 💃", "Coffee Date ☕"
];

let wheelRotation = 0;
let wheelSpinning = false;

function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildWheel() {
    const wheel = document.getElementById("wheel");
    const n = WHEEL_OPTIONS.length;
    const angle = 360 / n;
    const cx = 130, cy = 130, r = 126;
    const palette = [
        { bg: "#cda86e", fg: "#17111f" },
        { bg: "#c85a78", fg: "#17111f" },
        { bg: "#7d3550", fg: "#f0e6d8" },
        { bg: "#e8c893", fg: "#17111f" }
    ];
    // slice 0 starts at the top (12 o'clock) and goes clockwise
    const pt = (deg) => {
        const rad = (deg - 90) * Math.PI / 180;
        return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
    };
    let svg = '<svg viewBox="0 0 260 260" width="100%" height="100%">';
    WHEEL_OPTIONS.forEach((opt, i) => {
        const a0 = i * angle, a1 = (i + 1) * angle;
        const [x0, y0] = pt(a0);
        const [x1, y1] = pt(a1);
        let ci = i % palette.length;
        if (i === n - 1 && ci === 0 && n > 1) ci = 2; // avoid same colour touching first slice
        const c = palette[ci];
        svg += `<path d="M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${angle > 180 ? 1 : 0} 1 ${x1},${y1} Z" fill="${c.bg}" stroke="#211829" stroke-width="1"/>`;
        const mid = a0 + angle / 2;
        svg += `<text x="${cx + r - 10}" y="${cy}" text-anchor="end" dominant-baseline="middle" font-size="10" font-weight="600" fill="${c.fg}" transform="rotate(${mid - 90} ${cx} ${cy})">${escapeHtml(opt)}</text>`;
    });
    svg += `<circle cx="${cx}" cy="${cy}" r="12" fill="#211829" stroke="#cda86e" stroke-width="2"/></svg>`;
    wheel.innerHTML = svg;
}

function spinWheel() {
    if (wheelSpinning) return;
    wheelSpinning = true;
    document.getElementById("wheel-result").innerText = "";

    const n = WHEEL_OPTIONS.length;
    const angle = 360 / n;

    // Winner pehle decide hota hai, phir wheel exactly us slice pe rukta hai
    const index = Math.floor(Math.random() * n);
    const jitter = (Math.random() - 0.5) * angle * 0.6; // slice ke beech ke 60% mein hi ruke, boundary se door
    const sliceAtPointer = index * angle + angle / 2 + jitter;
    const targetMod = ((360 - sliceAtPointer) % 360 + 360) % 360;
    const currentMod = ((wheelRotation % 360) + 360) % 360;
    let delta = targetMod - currentMod;
    if (delta < 0) delta += 360;
    wheelRotation += (5 + Math.floor(Math.random() * 3)) * 360 + delta;

    const wheel = document.getElementById("wheel");
    wheel.style.transition = "transform 4s cubic-bezier(0.2,0.8,0.2,1)";
    wheel.style.transform = `rotate(${wheelRotation}deg)`;

    setTimeout(() => {
        document.getElementById("wheel-result").innerText = `Tumhe mila: ${WHEEL_OPTIONS[index]} 🎉`;
        wheelSpinning = false;
    }, 4100);
}

// ---------- Scratch Card ----------
const SCRATCH_MESSAGES = [
    // 👈 Apne khud ke surprises/messages yahan edit karo
    "Tumse pyaar karta/karti hoon! 💖",
    "Tum meri jaan ho! 💫",
    "Aaj tumhe dinner pe le ja raha/rahi hoon! 🍽️",
    "Tum duniya ki sabse best ho! 🌟"
];

let scratchCtx;
let isScratching = false;

function newScratchCard() {
    const canvas = document.getElementById("scratch-canvas");
    const msgBox = document.getElementById("scratch-message");
    scratchCtx = canvas.getContext("2d");

    msgBox.innerText = SCRATCH_MESSAGES[Math.floor(Math.random() * SCRATCH_MESSAGES.length)];

    scratchCtx.globalCompositeOperation = "source-over";
    scratchCtx.fillStyle = "#3a2f42";
    scratchCtx.fillRect(0, 0, canvas.width, canvas.height);
    scratchCtx.fillStyle = "#cda86e";
    scratchCtx.font = "bold 16px sans-serif";
    scratchCtx.textAlign = "center";
    scratchCtx.fillText("Scratch here! 👆", canvas.width / 2, canvas.height / 2);

    canvas.onmousedown = () => { isScratching = true; };
    canvas.onmouseup = () => { isScratching = false; };
    canvas.onmouseleave = () => { isScratching = false; };
    canvas.onmousemove = doScratch;
    canvas.ontouchstart = (e) => { isScratching = true; doScratch(e); };
    canvas.ontouchend = () => { isScratching = false; };
    canvas.ontouchmove = doScratch;
}

function doScratch(e) {
    if (!isScratching) return;
    e.preventDefault();
    const canvas = document.getElementById("scratch-canvas");
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    scratchCtx.globalCompositeOperation = "destination-out";
    scratchCtx.beginPath();
    scratchCtx.arc(x, y, 18, 0, Math.PI * 2);
    scratchCtx.fill();
}

// ---------- Diary Functions ----------
// Entries save hote hain browser ke localStorage mein (is device/browser tak limited).

function getDiaryEntries() {
    return JSON.parse(localStorage.getItem("diaryEntries") || "[]");
}

function loadDiaryEntries() {
    renderDiaryEntries(getDiaryEntries());
}

function saveDiaryEntry() {
    const input = document.getElementById("diary-input");
    const text = input.value.trim();
    if (!text) return;

    const entries = getDiaryEntries();
    entries.unshift({
        text: text,
        date: new Date().toLocaleString()
    });
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
    input.value = "";
    renderDiaryEntries(entries);
}

function deleteDiaryEntry(index) {
    const entries = getDiaryEntries();
    entries.splice(index, 1);
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
    renderDiaryEntries(entries);
}

function renderDiaryEntries(entries) {
    const container = document.getElementById("diary-entries");
    container.innerHTML = "";
    entries.forEach((entry, i) => {
        const div = document.createElement("div");
        div.classList.add("diary-entry");

        const deleteSpan = document.createElement("span");
        deleteSpan.classList.add("entry-delete");
        deleteSpan.innerText = "✖";
        deleteSpan.onclick = () => deleteDiaryEntry(i);

        const dateDiv = document.createElement("div");
        dateDiv.classList.add("entry-date");
        dateDiv.innerText = entry.date;

        const textDiv = document.createElement("div");
        textDiv.classList.add("entry-text");
        textDiv.innerText = entry.text; // innerText = safe, no HTML injection

        div.appendChild(deleteSpan);
        div.appendChild(dateDiv);
        div.appendChild(textDiv);
        container.appendChild(div);
    });
}
