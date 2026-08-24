const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".navList");
const menuIcon = menuBtn.querySelector(".menu-icon");
menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("active");
  menuIcon.innerHTML = isOpen ? "&#10005;" : "&#9776;";
  menuBtn.setAttribute("aria-expanded", isOpen);
});
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuIcon.innerHTML = "&#9776;";
    menuBtn.setAttribute("aria-expanded", false);
  });
});
const trackedSections = Array.from(navLinks).map((link) =>
  document.querySelector(link.getAttribute("href"))
);
function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
  });
}
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });qqqq
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

document.getElementById("galleryPrev").addEventListener("click", () => {
  galleryTrack.scrollBy({ left: -260, behavior: "smooth" });
});
document.getElementById("galleryNext").addEventListener("click", () => {
  galleryTrack.scrollBy({ left: 260, behavior: "smooth" });
});
function highlightCenterSlide() {
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
galleryTrack.addEventListener("scroll", () => requestAnimationFrame(highlightCenterSlide));
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
});
