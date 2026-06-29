const header = document.querySelector("[data-header]");
const parallaxFrame = document.querySelector("[data-parallax]");
const floatingWhatsApp = document.querySelector(".floating-whatsapp");
const solutionsSection = document.querySelector(".solutions-section");
const processSection = document.querySelector(".process-section");
const quoteSection = document.querySelector(".quote-section");
const finalSection = document.querySelector(".final-cta");
const revealItems = document.querySelectorAll(".reveal");
const quoteForm = document.querySelector("[data-form]");
const trackedItems = document.querySelectorAll("[data-track]");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.dataLayer = window.dataLayer || [];

const trackEvent = (eventName, eventLabel) => {
  window.dataLayer.push({
    event: eventName,
    event_category: "Landing Page",
    event_label: eventLabel || "",
  });
};

const updatePage = () => {
  const y = window.scrollY;

  if (header) {
    header.classList.toggle("is-solid", y > 24);
  }

  if (floatingWhatsApp) {
    const revealPoint = window.innerWidth > 980 ? window.innerHeight * 1.25 : window.innerHeight * 0.62;
    const sectionIsVisible = (section) => section
      ? y + window.innerHeight > section.offsetTop &&
        y < section.offsetTop + section.offsetHeight
      : false;
    const ctaWouldCompete =
      sectionIsVisible(solutionsSection) ||
      sectionIsVisible(processSection) ||
      sectionIsVisible(quoteSection) ||
      sectionIsVisible(finalSection);

    floatingWhatsApp.classList.toggle("is-visible", y > revealPoint && !ctaWouldCompete);
  }

  if (parallaxFrame && !prefersReducedMotion) {
    parallaxFrame.style.transform = window.innerWidth > 980
      ? `translateY(${y * -0.035 + window.innerHeight * 0.04}px)`
      : "none";
  }
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18,
  rootMargin: "0px 0px -8% 0px",
});

revealItems.forEach((item) => revealObserver.observe(item));

trackedItems.forEach((item) => {
  item.addEventListener("click", () => {
    trackEvent(item.dataset.track, item.dataset.trackLabel);
  });
});

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    trackEvent("quote_submit", "Formulário de orçamento");

    const formData = new FormData(quoteForm);
    const lines = [
      "Olá, quero solicitar um orçamento com a Edson Som Volante.",
      "",
      `Nome: ${formData.get("nome") || "-"}`,
      `Empresa: ${formData.get("empresa") || "-"}`,
      `Cidade ou bairro: ${formData.get("local") || "-"}`,
      `Data de interesse: ${formData.get("data") || "-"}`,
      `Objetivo: ${formData.get("objetivo") || "-"}`,
      `Solução: ${formData.get("campanha") || "-"}`,
      `Mensagem: ${formData.get("mensagem") || "-"}`,
    ];

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/5548999824930?text=${message}`, "_blank", "noopener,noreferrer");
  });
}

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
  updatePage();

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    window.requestAnimationFrame(() => target?.scrollIntoView({ block: "start" }));
  }
});

window.addEventListener("scroll", () => {
  window.requestAnimationFrame(updatePage);
}, { passive: true });

window.addEventListener("resize", updatePage);
