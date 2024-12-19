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

// Optimize performance with requestAnimationFrame
function startCountdown() {
    updateCountdown();
    requestAnimationFrame(startCountdown);
}

// Audio autoplay and control functionality
function setupAudioControls() {
    const audio = document.getElementById("audio1");
    
    // Create play/pause button
    function createAudioControlButton() {
        const controlButton = document.createElement('button');
        controlButton.innerHTML = '🎵 Reproducir Música';
        controlButton.style.position = 'fixed';
        controlButton.style.bottom = '10px';
        controlButton.style.left = '10px';
        controlButton.style.zIndex = '1000';
        controlButton.style.padding = '10px';
        controlButton.style.backgroundColor = '#4e54c8';
        controlButton.style.color = 'white';
        controlButton.style.border = 'none';
        controlButton.style.borderRadius = '5px';
        controlButton.style.cursor = 'pointer';
        controlButton.style.display = 'flex';
        controlButton.style.alignItems = 'center';
        controlButton.style.gap = '5px';

        let isPlaying = false;

        controlButton.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                controlButton.innerHTML = '🎵 Reproducir Música';
                isPlaying = false;
            } else {
                audio.play()
                    .then(() => {
                        controlButton.innerHTML = '⏸ Pausar Música';
                        isPlaying = true;
                    })
                    .catch((error) => {
                        console.log("Error playing audio:", error);
                    });
            }
        });

        document.body.appendChild(controlButton);
    }

    // Function to attempt playing audio
    function tryPlayAudio() {
        if (audio) {
            audio.play()
                .then(() => {
                    console.log("Audio started playing automatically");
                })
                .catch((error) => {
                    console.log("Autoplay was prevented:", error);
                });
        }
    }

    // Try to play audio when the page loads
    window.addEventListener('load', () => {
        tryPlayAudio();
        createAudioControlButton();
    });

    // Add loop and preload attributes
    audio.loop = true;
    audio.preload = 'auto';
}

// Obtener el modal
var modal = document.getElementById("imageModal");

// Obtener la imagen y el elemento modal
var modalImg = document.getElementById("modalImage");

// Obtener el elemento de cierre
var span = document.getElementsByClassName("close")[0];

// Añadir evento de clic a todas las imágenes
document.querySelectorAll('img').forEach(img => {
  img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  }
});

// Cuando el usuario hace clic en <span> (x), cerrar el modal
span.onclick = function() {
  modal.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, cerrarlo
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Initialize everything
function init() {
    startCountdown();
    setupAudioControls();
}

// Call initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);