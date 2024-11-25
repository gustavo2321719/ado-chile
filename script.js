// Configuration
const TARGET_DATE = new Date("2025-08-18T21:00:00-03:00");
const COUNTDOWN_ELEMENTS = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
};

// Utility function to pad numbers with leading zeros
const padZero = (num) => String(num).padStart(2, "0");

function updateCountdown() {
    const now = Date.now();
    const timeDifference = TARGET_DATE - now;

    if (timeDifference <= 0) {
        document.getElementById("countdown").innerHTML = "<h2>¡El concierto ha comenzado!</h2>";
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    COUNTDOWN_ELEMENTS.days.textContent = padZero(days);
    COUNTDOWN_ELEMENTS.hours.textContent = padZero(hours);
    COUNTDOWN_ELEMENTS.minutes.textContent = padZero(minutes);
    COUNTDOWN_ELEMENTS.seconds.textContent = padZero(seconds);
}

// Optimize performance with requestAnimationFrame and fallback
function startCountdown() {
    updateCountdown();
    if (window.requestAnimationFrame) {
        requestAnimationFrame(startCountdown);
    } else {
        // Fallback for older browsers
        setTimeout(startCountdown, 1000);
    }
}

let audio = document.getElementById("audio1");
let isPlaying = false;

// Improved event handling for mobile and desktop
document.addEventListener('click', function(event) {
    // Prevent multiple triggering
    if (event.target === audio) return;
    
    if (!isPlaying) {
        audio.play().catch(e => {
            // Handle autoplay restrictions
            console.log("Autoplay prevented", e);
        });
        isPlaying = true;
    } else {
        audio.pause();
        isPlaying = false;
    }
});

// Start countdown
startCountdown();