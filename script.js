// Scroll reveal (staggered within each parent)
const revealIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => {
  el.style.transitionDelay = [...el.parentElement.children].indexOf(el) % 4 * 90 + "ms";
  revealIO.observe(el);
});

// Count-up stats
const countIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  const el = e.target, to = +el.dataset.count, suffix = el.dataset.suffix || "", t0 = performance.now();
  const tick = (t) => {
    const p = Math.min((t - t0) / 1400, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  countIO.unobserve(el);
}), { threshold: 0.5 });
document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

// Typing effect
const words = ["Machine Learning", "Predictive Modeling", "Data Pipelines", "Analytics Dashboards"];
const typer = document.querySelector(".typer");
typer.innerHTML = '<span></span><i></i>';
const out = typer.firstChild;
let wi = 0, ci = 0, deleting = false;
(function type() {
  const w = words[wi];
  ci += deleting ? -1 : 1;
  out.textContent = w.slice(0, ci);
  let delay = deleting ? 40 : 80;
  if (!deleting && ci === w.length) { deleting = true; delay = 1200; }
  else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  setTimeout(type, delay);
})();

// Scroll progress bar
const root = document.documentElement;
addEventListener("scroll", () => {
  const h = root.scrollHeight - root.clientHeight;
  root.style.setProperty("--progress", h > 0 ? root.scrollTop / h : 0);
}, { passive: true });

// Active nav link
const links = document.querySelectorAll(".side nav a");
const navIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => navIO.observe(s));

// Experience accordion
const items = document.querySelectorAll(".timeline > li");
items.forEach((li) => li.querySelector("button").addEventListener("click", () => {
  const willOpen = !li.classList.contains("on");
  items.forEach((o) => {
    o.classList.remove("on");
    o.querySelector(".more").dataset.open = "false";
    o.querySelector("button").setAttribute("aria-expanded", "false");
  });
  if (willOpen) {
    li.classList.add("on");
    li.querySelector(".more").dataset.open = "true";
    li.querySelector("button").setAttribute("aria-expanded", "true");
  }
}));

document.getElementById("year").textContent = new Date().getFullYear();
