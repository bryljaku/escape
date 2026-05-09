const secretTrigger = document.getElementById("secretTrigger");
const hiddenMessage = document.getElementById("hiddenMessage");
const ambient = document.getElementById("ambientSound");
const glass = document.getElementById("glassSound");
const whisper = document.getElementById("whisperSound");

const input = document.getElementById("secretInput");
const btn = document.getElementById("unlockButton");
const hidden = document.getElementById("hiddenContent");

let audioStarted = false;
let currentStage = 0;

secretTrigger.addEventListener("click", () => {
  document.getElementById("secretModal").style.display = "flex";
  updateStageDisplay();
});

document.getElementById("goSecret").addEventListener("click", () => {
  window.location.href = "pages/secret.html";
});

let clicks = 0;

const candle = document.getElementById("candle");
const modal = document.getElementById("modal");
const secretModal = document.getElementById("secretModal");

candle.addEventListener("click", () => {
  clicks++;

  if (clicks === 3) {
    modal.style.display = "flex";
    clicks = 0;
  }
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.style.display = "none";
});

// Close secret modal when clicking outside the modal-box
secretModal.addEventListener("click", (e) => {
  if (e.target === secretModal) {
    secretModal.style.display = "none";
  }
});

function updateStageDisplay() {
  const display = document.getElementById("stageDisplay");
  if (currentStage === 0) {
    display.textContent = "Odkryj sekret (1/3)";
  } else if (currentStage === 1) {
    display.textContent = "Dodatne warstwy czekają (2/3)";
  } else if (currentStage === 2) {
    display.textContent = "Jesteś blisko końca (3/3)";
  }
}

function playStageAudio(stage) {
  if (stage >= 1 && stage <= 3) {
    const audioElement = document.getElementById(`stageAudio${stage}`);
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch((err) => {});
    }
  }
}

// Handle password submission
document.getElementById("submitPassword").addEventListener("click", () => {
  const passwordInput = document.getElementById("passwordInput");
  const password = passwordInput.value.trim().toUpperCase();

  if (password === "ICTTN") {
    currentStage += 1;
    passwordInput.value = "";

    // Hide all hidden content first
    document.querySelectorAll(".hidden-content[data-stage]").forEach((el) => {
      el.classList.remove("show");
    });

    // Show content for current stage
    document.querySelectorAll(`.hidden-content[data-stage="${currentStage}"]`).forEach((el) => {
      el.classList.add("show");
    });

    // Play stage audio
    playStageAudio(currentStage);

    // Update stage display
    updateStageDisplay();

    // Scroll to revealed content
    const revealedContent = document.querySelector(`.hidden-content[data-stage="${currentStage}"]`);
    if (revealedContent) {
      revealedContent.scrollIntoView({
        behavior: "smooth",
      });
    }

    // Close modal after successful unlock
    secretModal.style.display = "none";
  } else {
    passwordInput.value = "";
  }
});

// Handle Enter key in password input
document.getElementById("passwordInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("submitPassword").click();
  }
});

/* =========================
   AUDIO START (SAFE AUTOPLAY FIX)
========================= */
function startAudio() {
  if (audioStarted || !ambient) return;
  audioStarted = true;

  ambient.volume = 0;

  ambient
    .play()
    .then(() => {
      let v = 0;
      const fade = setInterval(() => {
        if (v < 0.25) {
          v += 0.01;
          ambient.volume = v;
        } else {
          clearInterval(fade);
        }
      }, 40);
    })
    .catch((err) => console.error("Audio playback failed:", err));
}

/* trigger audio */
if (ambient) {
  document.addEventListener("click", startAudio, { once: true });
  document.addEventListener("touchstart", startAudio, { once: true });
  document.addEventListener("scroll", startAudio, { once: true });
}
