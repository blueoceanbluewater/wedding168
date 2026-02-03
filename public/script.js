const layer = document.getElementById("bubble-layer");

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnBubble(xPercent = null) {
  if (!layer) return;

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const size = Math.round(rand(26, 74));
  const dur = rand(6.0, 12.5).toFixed(2);
  const drift = Math.round(rand(-80, 80));
  const rise = Math.round(rand(520, 980));

  const left = xPercent !== null ? xPercent : rand(5, 95);

  bubble.style.setProperty("--size", `${size}px`);
  bubble.style.setProperty("--dur", `${dur}s`);
  bubble.style.setProperty("--drift", `${drift}px`);
  bubble.style.setProperty("--rise", `${rise}px`);
  bubble.style.left = `${left}%`;

  layer.appendChild(bubble);
  bubble.addEventListener("animationend", () => bubble.remove());
}

// steady romantic bubble flow
setInterval(() => {
  spawnBubble();
  if (Math.random() > 0.55) spawnBubble();
}, 520);

// extra bubbles on click/tap
window.addEventListener("pointerdown", (e) => {
  const xPercent = (e.clientX / window.innerWidth) * 100;
  for (let i = 0; i < 5; i++) {
    setTimeout(
      () => spawnBubble(Math.min(98, Math.max(2, xPercent + rand(-6, 6)))),
      i * 60
    );
  }
});

// Scroll-reveal album photos
(function setupReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => obs.observe(el));
})();

// =========================
// Khmer modal open/close + QR
// =========================
(() => {
  const modal = document.getElementById("khmerModal");
  const openBtn = document.getElementById("openKhmerCard");
  const closeBtn = document.getElementById("closeKhmerCard");
  const qrEl = document.getElementById("qrcode");

  if (!modal || !openBtn || !closeBtn) return;

  let qrMade = false;

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Create QR only once
    if (!qrMade && window.QRCode && qrEl) {
      qrEl.innerHTML = "";

      const QR_VALUE = "https://maps.app.goo.gl/Vzhn8yLBqQ136chw5"; // change to your map link

      new QRCode(qrEl, {
        text: QR_VALUE,
        width: 120,
        height: 120,
        correctLevel: QRCode.CorrectLevel.M
      });

      qrMade = true;
    }
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  // Click outside to close
  modal.addEventListener("click", (e) => {
    if (e.target && e.target.dataset && e.target.dataset.close === "true") {
      closeModal();
    }
  });

  // ESC key to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
})();
