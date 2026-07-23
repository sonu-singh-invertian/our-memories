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
