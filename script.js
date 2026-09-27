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
        origin: { y: 0.6 }
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
    { q: "Humari first date kahan hui thi?", options: ["Cafe", "Park", "Movie", "Beach"], correct: 1 },
    { q: "Mujhe sabse zyada kya pasand hai?", options: ["Music", "Food", "Travel", "Sleep"], correct: 2 }
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

function buildWheel() {
    const wheel = document.getElementById("wheel");
    const n = WHEEL_OPTIONS.length;
    const angle = 360 / n;
    const colors = ["#ff4d6d", "#ff7eb3", "#ffb3c1", "#ff758c"];
    let gradient = "conic-gradient(";
    WHEEL_OPTIONS.forEach((opt, i) => {
        gradient += `${colors[i % colors.length]} ${i * angle}deg ${(i + 1) * angle}deg${i < n - 1 ? "," : ""}`;
    });
    gradient += ")";
    wheel.style.background = gradient;
    wheel.innerHTML = "";
    WHEEL_OPTIONS.forEach((opt, i) => {
        const label = document.createElement("div");
        label.classList.add("wheel-label");
        const mid = angle * i + angle / 2;
        label.style.transform = `rotate(${mid}deg)`;
        const span = document.createElement("span");
        span.style.transform = "rotate(90deg)";
        span.innerText = opt;
        label.appendChild(span);
        wheel.appendChild(label);
    });
}

function spinWheel() {
    if (wheelSpinning) return;
    wheelSpinning = true;
    const n = WHEEL_OPTIONS.length;
    const angle = 360 / n;
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const randomOffset = Math.random() * 360;
    wheelRotation += extraSpins * 360 + randomOffset;
    const wheel = document.getElementById("wheel");
    wheel.style.transition = "transform 4s cubic-bezier(0.2,0.8,0.2,1)";
    wheel.style.transform = `rotate(${wheelRotation}deg)`;
    setTimeout(() => {
        const normalized = wheelRotation % 360;
        const index = Math.floor(((360 - normalized) % 360) / angle);
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
    scratchCtx.fillStyle = "#c0c0c0";
    scratchCtx.fillRect(0, 0, canvas.width, canvas.height);
    scratchCtx.fillStyle = "#888";
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
