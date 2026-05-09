const secretTrigger = document.getElementById("secretTrigger");
const hiddenMessage = document.getElementById("hiddenMessage");
const ambient = document.getElementById("ambientSound");
const glass = document.getElementById("glassSound");
const whisper = document.getElementById("whisperSound");

const input = document.getElementById("secretInput");
const btn = document.getElementById("unlockButton");
const hidden = document.getElementById("hiddenContent");

let audioStarted = false;

secretTrigger.addEventListener("click", () => {
  document.getElementById("secretModal").style.display = "flex";
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

// Handle password submission
document.getElementById("submitPassword").addEventListener("click", () => {
  const passwordInput = document.getElementById("passwordInput");
  const password = passwordInput.value.trim();

  if (password === "ICTTN") {
    hiddenMessage.style.display = "block";
    secretModal.style.display = "none";
    passwordInput.value = "";

    document
      .querySelectorAll(".hidden-content")
      .forEach((el) => el.classList.add("show"));
    hiddenMessage.scrollIntoView({
      behavior: "smooth",
    });
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
