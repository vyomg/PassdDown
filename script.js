const header = document.querySelector("#site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const backToTop = document.querySelector(".back-to-top");
const loader = document.querySelector(".loader");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

window.addEventListener("load", () => {
  loader.classList.add("hidden");
});

const closeMenu = () => {
  navToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
};

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const updateScrollUi = () => {
  const scrolled = window.scrollY > 24;
  header.classList.toggle("scrolled", scrolled);
  backToTop.classList.toggle("visible", window.scrollY > 560);
};

window.addEventListener("scroll", updateScrollUi, { passive: true });
updateScrollUi();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      const duration = 1300;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        counter.textContent = Math.floor(target * eased).toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(update);
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".counter").forEach((counter) => {
  counterObserver.observe(counter);
});

document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".accordion-item");
    const panel = item.querySelector(".accordion-panel");
    const isOpen = trigger.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".accordion-trigger").forEach((otherTrigger) => {
      const otherPanel = otherTrigger.closest(".accordion-item").querySelector(".accordion-panel");
      otherTrigger.setAttribute("aria-expanded", "false");
      otherPanel.style.maxHeight = null;
    });

    if (!isOpen) {
      trigger.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
});

const sections = document.querySelectorAll("main section[id]");
const menuLinks = document.querySelectorAll(".nav-links a");

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      menuLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

sections.forEach((section) => {
  activeSectionObserver.observe(section);
});

/* ==========================================
   PASS IT ON BUTTON
========================================== */

const passButton = document.querySelector(".pass-button");
const passMessage = document.querySelector(".pass-message");
const confettiContainer = document.querySelector(".confetti-container");

if (passButton && passMessage && confettiContainer) {

    passButton.addEventListener("click", () => {

        // Bounce shirt
        passButton.classList.add("clicked");

        setTimeout(() => {
            passButton.classList.remove("clicked");
        }, 550);

        // Show thank you
const messages = [

    "👕 Another story begins.",

    "🌱 One less garment wasted.",

    "💙 Kindness looks good on you.",

    "♻️ The journey continues.",

    "🧵 Every thread has a future.",

    "👕 Someone will love this next.",

    "🌍 Fashion, just a little kinder.",

    "💫 Clothes deserve another chance.",

    "❤️ Thanks for caring.",

    "👕 I still have adventures left.",

    "🧥 Don't leave me in the wardrobe.",

    "👖 I was made to be worn.",

    "🧦 Every click matters.",

    "🌿 Keep the cycle alive.",

    "💙 Rewear. Relove. Repeat.",

    "👕 My next owner is waiting.",

    "♻️ Keep it moving.",

    "🌎 Small action. Big impact.",

    "🫶 You're awesome.",

    "👕 You found our little secret."

];

// Pick a random message
const randomMessage =
    messages[Math.floor(Math.random() * messages.length)];

passMessage.textContent = randomMessage;

passMessage.classList.add("show");

setTimeout(() => {

    passMessage.classList.remove("show");

}, 2200);

        // Confetti

        for (let i = 0; i < 14; i++) {

            const piece = document.createElement("div");
            piece.className = "confetti";

            piece.style.left =
                window.innerWidth - 60 + "px";

            piece.style.top =
                window.innerHeight - 110 + "px";

            piece.style.setProperty(
                "--x",
                `${(Math.random() - 0.5) * 280}px`
            );

            piece.style.setProperty(
                "--y",
                `${-Math.random() * 260}px`
            );

            piece.innerHTML = `
            <svg viewBox="0 0 48 48">
                <path d="M14 14h7l3 5 3-5h7l5 8-5 3v13H14V25l-5-3 5-8Z"/>
            </svg>
            `;

            confettiContainer.appendChild(piece);

            setTimeout(() => {
                piece.remove();
            }, 900);

        }

        // Hearts

        for (let i = 0; i < 6; i++) {

            const heart = document.createElement("div");

            heart.className = "heart";

            heart.innerHTML = "❤️";

            heart.style.left =
                window.innerWidth - 60 + "px";

            heart.style.top =
                window.innerHeight - 110 + "px";

            heart.style.setProperty(
                "--x",
                `${(Math.random() - 0.5) * 250}px`
            );

            heart.style.setProperty(
                "--y",
                `${-Math.random() * 240}px`
            );

            confettiContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 900);

        }

    });

}
