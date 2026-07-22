// 1. Password Protection Logic
const SECRET_PASSWORD = "0609"; // 👈 Apne hisab se password badlein!

function unlockSite() {
    const userPass = document.getElementById("password-input").value;
    const errorMsg = document.getElementById("error-msg");

    if (userPass === SECRET_PASSWORD) {
        document.getElementById("lock-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        startCounter(); // Unlock hone ke baad timer start karein
    } else {
        errorMsg.innerText = "Wrong password! Hint: Ask me 😉";
    }
}

// Allow Pressing "Enter" key on input
document.getElementById("password-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        unlockSite();
    }
});


// 2. Relationship Days Counter Logic
// 👈 Apni start date format me dalein: YYYY-MM-DD
const START_DATE = new Date("2025-09-06T00:00:00"); 

function startCounter() {
    function updateCounter() {
        const now = new Date();
        const diffInMs = now - START_DATE;

        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffInMs / 1000 / 60) % 60);
        const seconds = Math.floor((diffInMs / 1000) % 60);

        document.getElementById("together-counter").innerText = 
            `${days} Days, ${hours} Hours, ${minutes} Mins, ${seconds} Secs`;
    }

    updateCounter();
    setInterval(updateCounter, 1000); // Live tick every second
}