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