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
let stagesUnlocked = [];

const stagePasswords = ["", "WIŚNIA", "3746", "🍋🐔😀", "4", "ICTTN"];

secretTrigger.addEventListener("click", () => {
  secretModal.classList.add("active");
  updateStageDisplay();
  // Remove active state when clicked
  secretTrigger.classList.remove("active");
});

let clicks = 0;

const candle = document.getElementById("candle");
const modal = document.getElementById("modal");
const secretModal = document.getElementById("secretModal");

candle.addEventListener("click", () => {
  clicks++;

  if (clicks === 3) {
    // Show secret trigger with active state
    secretTrigger.style.display = "block";
    secretTrigger.classList.add("active");
    clicks = 0;
    currentStage = Math.max(1, currentStage);
    if (!stagesUnlocked.includes(currentStage)) {
      stagesUnlocked.push(currentStage);
    }

    // Show content for all unlocked stages
    showUnlockedStages();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    updateStageDisplay();
  }
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.style.display = "none";
});

// Close secret modal when clicking outside the modal-box
secretModal.addEventListener("click", (e) => {
  if (e.target === secretModal) {
    secretModal.classList.remove("active");
  }
});

function updateStageDisplay() {
  const display = document.getElementById("stageDisplay");
  textx = [
    "",
    "Coż za spostrzegawczość, znalazłeś miejsce na wpisanie hasła", // Wiśnia
    "Znowu Ty? Daj mi spokój, ale skoro już tu jesteś, to jesteś na dobrej drodze.", // 2025
    "Coś mi mówi, że jesteś bystry i sprytny. Ale to dopiero początek, prawdziwa zabawa zaczyna się teraz.", //🍋🐔😀
    "Ojej, czy to możliwe, że jesteś naprawdę blisko odkrycia wszystkich tajemnic tej kolacji? Nie spoczywaj na laurach, jeszcze wiele przed tobą!", // ?
    "Coraz bliżej, ale czy jesteś gotowy na to, co czeka na końcu tej drogi? Czy jesteś w stanie wskazać przepis na IDEALNĄ KOLACJĘ?", // ICTTN
  ];
  if (currentStage >= textx.length) {
    display.textContent = "Gratulacje! Odkryłeś przepis na idealną kolację!";
    return;
  }
  display.textContent = `${textx[currentStage]}`;
}

function showUnlockedStages() {
  document.querySelectorAll(".rule, .hidden-content").forEach((el) => {
    el.classList.remove("show");
    el.classList.remove("hide");
  });

  stagesUnlocked.forEach((stage) => {
    document
      .querySelectorAll(`.hidden-content[data-stage="${stage}"]`)
      .forEach((el) => {
        el.classList.add("show");
      });
  });

  document.querySelectorAll("[data-hide-from]").forEach((el) => {
    const hideFrom = parseInt(el.dataset.hideFrom);

    if (Math.max(...stagesUnlocked) >= hideFrom) {
      el.classList.add("hide");
    }
  });
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
document.querySelectorAll(".emoji-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    passwordInput.value += btn.textContent;
  });
});
clearPassword.addEventListener("click", () => {
  passwordInput.value = "";
});

// Handle password submission
document.getElementById("submitPassword").addEventListener("click", (e) => {
  const passwordInput = document.getElementById("passwordInput");
  const password = passwordInput.value.trim().toUpperCase();
  const nextStage = currentStage + 1;
  const requiredPassword = stagePasswords[currentStage];

  if (password === requiredPassword) {
    currentStage = nextStage;
    stagesUnlocked.push(currentStage);
    passwordInput.value = "";

    // Show content for all unlocked stages
    showUnlockedStages();
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });
    // document.querySelector("main").scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
    // Play stage audio

    // Update stage display
    updateStageDisplay();

    // Close modal after successful unlock
    secretModal.classList.remove("active");

    playStageAudio(currentStage);
  } else {
    passwordInput.value = "";
  }
});

// Handle Enter key in password input
document.getElementById("passwordInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("submitPassword").click();
  }
});

/* =========================
   AUDIO START (SAFE AUTOPLAY FIX)
========================= */
function startAudio() {
  if (audioStarted) return;
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
