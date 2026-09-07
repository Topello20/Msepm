document.addEventListener("DOMContentLoaded", () => {
  const minLoadTime = 3000;
  const maxLoadTime = 8000;
  const startTime = Date.now();
  const loader = document.getElementById("msepm-loader");
  const content = document.getElementById("msepm-main-content");

  let loaderRemoved = false;

  function removeLoader() {
    if (loaderRemoved) return;

    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minLoadTime - elapsed);

    setTimeout(() => {
      loaderRemoved = true;
      if (loader) {
        loader.classList.add("finished");
      }
      if (content) {
        content.classList.add("visible");
      }
      setTimeout(() => {
        if (typeof highlightCenterSlide === "function") {
          highlightCenterSlide();
        }
      }, 300);
    }, remaining);
  }

  if (document.readyState === "complete") {
    removeLoader();
  } else {
    window.addEventListener("load", removeLoader);
  }

  setTimeout(() => {
    if (!loaderRemoved) {
      removeLoader();
    }
  }, maxLoadTime);
});

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".navList");
const menuIcon = menuBtn ? menuBtn.querySelector(".menu-icon") : null;

if (menuBtn && nav && menuIcon) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    menuIcon.innerHTML = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuIcon.innerHTML = "☰";
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const trackedSections = Array.from(navLinks).map((link) =>
  document.querySelector(link.getAttribute("href"))
).filter(Boolean);

function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  },
  { rootMargin: "-80px 0px -60% 0px" }
);

trackedSections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
  const reachedBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
  if (reachedBottom) setActiveLink("contact");
});

const galleryTrack = document.getElementById("galleryTrack");
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");

if (galleryPrev && galleryTrack) {
  galleryPrev.addEventListener("click", () => {
    galleryTrack.scrollBy({ left: -260, behavior: "smooth" });
  });
}

if (galleryNext && galleryTrack) {
  galleryNext.addEventListener("click", () => {
    galleryTrack.scrollBy({ left: 260, behavior: "smooth" });
  });
}

function highlightCenterSlide() {
  if (!galleryTrack || galleryItems.length === 0) return;
  const trackCenter = galleryTrack.getBoundingClientRect().left + galleryTrack.offsetWidth / 2;
  let closestItem = galleryItems[0];
  let closestDistance = Infinity;

  galleryItems.forEach((item) => {
    const itemCenter = item.getBoundingClientRect().left + item.offsetWidth / 2;
    const distance = Math.abs(itemCenter - trackCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestItem = item;
    }
  });

  galleryItems.forEach((item) => item.classList.remove("is-center"));
  closestItem.classList.add("is-center");
}

if (galleryTrack) {
  galleryTrack.addEventListener("scroll", () => requestAnimationFrame(highlightCenterSlide));
}

window.addEventListener("load", highlightCenterSlide);

fetch("https://hook.us2.make.com/m981aperxnqb2bmv4ki3evkttrj7e8ve", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    browser: navigator.userAgent,
    screen: `${screen.width}x${screen.height}`,
    language: navigator.language,
    page: window.location.href
  })
}).catch(() => {});