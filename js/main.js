/* ═══════════════════════════════════════════════
   SETFLOW — CONFIGURACIÓN DE LINKS EXTERNOS
   Completar cuando estén disponibles.
   El sitio actualiza los botones automáticamente.
   ═══════════════════════════════════════════════ */
const SETFLOW_CONFIG = {
  mercadolibre: {
    standard: null,   // Ej: "https://articulo.mercadolibre.com.ar/MLA-..."
    premium:  null,   // Ej: "https://articulo.mercadolibre.com.ar/MLA-..."
    perfil:   null,   // Ej: "https://www.mercadolibre.com.ar/perfil/setflow"
  },
  instagram: "https://www.instagram.com/setflow.1/",
  whatsapp:  null,    // Ej: "https://wa.me/5491112345678?text=Hola%20SetFlow"
  email:     "setflow.26@gmail.com",
};

/* ── Navbar: scroll state ───────────────────── */
const navbar = document.getElementById("navbar");

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbarScroll, { passive: true });
handleNavbarScroll();

/* ── Mobile menu ────────────────────────────── */
const hamburger    = document.getElementById("hamburger");
const mobileMenu   = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
  mobileMenu.setAttribute("aria-hidden", !isOpen);
});

// Close menu on link click
mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", false);
    mobileMenu.setAttribute("aria-hidden", true);
  });
});

/* ── Mercado Libre button state ─────────────── */
function setupMLButtons() {
  const mlButtons = [
    document.getElementById("hero-ml-btn"),
    document.getElementById("kit-std-btn"),
    document.getElementById("kit-prm-btn"),
  ];

  mlButtons.forEach(btn => {
    if (!btn) return;

    const kitType = btn.id === "kit-prm-btn" ? "premium" : "standard";
    const targetUrl = btn.id === "hero-ml-btn"
      ? SETFLOW_CONFIG.mercadolibre.perfil
      : SETFLOW_CONFIG.mercadolibre[kitType];

    if (targetUrl) {
      // ML está disponible: convertir en link real
      btn.setAttribute("href", targetUrl);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener");
      if (kitType === "standard" || btn.id === "hero-ml-btn") {
        btn.textContent = "Comprar en Mercado Libre";
      }
    } else {
      // ML no disponible todavía: botón lleva a sección #kits
      btn.setAttribute("href", "#kits");
    }
  });
}

setupMLButtons();

/* ── Smooth scroll para anclas internas ──────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const navbarHeight = navbar.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  });
});

/* ── Scroll animations (IntersectionObserver) ── */
const animateEls = document.querySelectorAll(".animate-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

animateEls.forEach(el => observer.observe(el));

/* ── WhatsApp tooltip ───────────────────────── */
// Si SETFLOW_CONFIG.whatsapp está disponible en el futuro,
// el botón placeholder puede activarse con este bloque:
// const waBtn = document.querySelector(".wa-btn");
// if (SETFLOW_CONFIG.whatsapp && waBtn) {
//   waBtn.setAttribute("href", SETFLOW_CONFIG.whatsapp);
//   waBtn.classList.remove("btn-disabled");
// }
