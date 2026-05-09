const secretTrigger = document.getElementById("secretTrigger");
const hiddenMessage = document.getElementById("hiddenMessage");

secretTrigger.addEventListener("click", () => {
  hiddenMessage.style.display = "block";

  hiddenMessage.scrollIntoView({
    behavior: "smooth",
  });
});

document.getElementById("goSecret").addEventListener("click", () => {
  window.location.href = "pages/secret.html";
});

let clicks = 0;

const candle = document.getElementById("candle");
const modal = document.getElementById("modal");

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
