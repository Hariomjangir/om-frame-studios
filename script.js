const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = mobileMenu.querySelectorAll("a");

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -60px 0px"
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const comparisonSliders = document.querySelectorAll("[data-before-after]");

comparisonSliders.forEach((slider) => {
  const input = slider.querySelector('input[type="range"]');
  const after = slider.querySelector(".comparison-after");
  const handle = slider.querySelector(".comparison-handle");

  const updateSlider = (value) => {
    const percentage = `${value}%`;
    after.style.width = percentage;
    handle.style.left = percentage;
  };

  updateSlider(input.value);

  input.addEventListener("input", (event) => {
    updateSlider(event.target.value);
  });
});

const testimonialTrack = document.getElementById("testimonialTrack");
const prevTestimonial = document.getElementById("prevTestimonial");
const nextTestimonial = document.getElementById("nextTestimonial");
const testimonialCount = testimonialTrack.children.length;
let testimonialIndex = 0;
let testimonialTimer;

function renderTestimonials() {
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
}

function goToNextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonialCount;
  renderTestimonials();
}

function goToPrevTestimonial() {
  testimonialIndex = (testimonialIndex - 1 + testimonialCount) % testimonialCount;
  renderTestimonials();
}

function startTestimonialAutoplay() {
  testimonialTimer = setInterval(goToNextTestimonial, 4500);
}

function resetTestimonialAutoplay() {
  clearInterval(testimonialTimer);
  startTestimonialAutoplay();
}

nextTestimonial.addEventListener("click", () => {
  goToNextTestimonial();
  resetTestimonialAutoplay();
});

prevTestimonial.addEventListener("click", () => {
  goToPrevTestimonial();
  resetTestimonialAutoplay();
});

startTestimonialAutoplay();

const modal = document.getElementById("portfolioModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalType = document.getElementById("modalType");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const portfolioCards = document.querySelectorAll(".portfolio-card");
const modalCloseTargets = document.querySelectorAll("[data-close-modal]");

function openModal(card) {
  modalImage.src = card.dataset.modalImage;
  modalImage.alt = card.dataset.modalTitle;
  modalType.textContent = card.dataset.modalType;
  modalTitle.textContent = card.dataset.modalTitle;
  modalText.textContent = card.dataset.modalText;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

portfolioCards.forEach((card) => {
  card.addEventListener("click", () => openModal(card));
});

modalClose.addEventListener("click", closeModal);
modalCloseTargets.forEach((target) => target.addEventListener("click", closeModal));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const button = contactForm.querySelector("button");
  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "Inquiry Sent";

  window.setTimeout(() => {
    contactForm.reset();
    button.disabled = false;
    button.textContent = originalText;
  }, 1800);
});
