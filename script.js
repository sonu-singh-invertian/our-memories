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
        createHearts(); // Floating hearts start karein
        loadDiaryEntries(); // Saved diary entries dikhayein
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
