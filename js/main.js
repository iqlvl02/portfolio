/* =========================================================
   MAIN INTERACTIONS
   Mobile navigation, active navigation link, contact form,
   and current year.
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const year = document.getElementById("current-year");
  const contactForm = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");

  if (year) year.textContent = String(new Date().getFullYear());

  function closeMobileMenu() {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    const icon = menuToggle.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = "menu";
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const willOpen = mobileMenu.hidden;
      mobileMenu.hidden = !willOpen;
      menuToggle.setAttribute("aria-expanded", String(willOpen));
      menuToggle.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
      const icon = menuToggle.querySelector(".material-symbols-outlined");
      if (icon) icon.textContent = willOpen ? "close" : "menu";
    });

    mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMobileMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 640) closeMobileMenu();
    });
  }

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", active);
    });
  }

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveLink(visible[0].target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] });

    sections.forEach((section) => observer.observe(section));
  }

  // This form prepares an email in the visitor's default email application.
  // It does not send or store messages on a server.
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const recipient = "hello@example.com"; // Replace with your real email address.
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      if (formNote) formNote.textContent = "Opening your email application. Replace hello@example.com in js/main.js with your real email.";
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
});
