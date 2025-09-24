document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // Footer Year
  // =======================
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // =======================
  // Navbar (Resize + Scroll Spy)
  // =======================
  const navbar = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const pageSections = document.querySelectorAll("section, header.hero");

  function handleScroll() {
    // Resize navbar
    if (window.scrollY > 50) {
      navbar.classList.add("shrink");
    } else {
      navbar.classList.remove("shrink");
    }
  }

  // Scroll Spy using IntersectionObserver
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").replace("#", "") === entry.target.id) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  pageSections.forEach((sec) => sectionObserver.observe(sec));
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // run once at load

  // =======================
  // Carousel
  // =======================
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });
  }

  window.addEventListener("resize", updateCarousel);
  updateCarousel();

  // =======================
  // Modals (Reviews)
  // =======================
  const cards = document.querySelectorAll(".about-card");
  const closes = document.querySelectorAll(".modal .close");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const modalId = card.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "flex";
    });
  });

  closes.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      closeBtn.closest(".modal").style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });
});