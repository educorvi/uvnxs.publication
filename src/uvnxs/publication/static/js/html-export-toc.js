document.addEventListener("DOMContentLoaded", function () {
  const panel = document.getElementById("article-toc-offcanvas");
  if (!panel || !window.bootstrap) return;

  const offcanvas = window.bootstrap.Offcanvas.getOrCreateInstance(panel);

  const closeBtn = panel.querySelector(".btn-close");
  closeBtn.removeAttribute("data-bs-dismiss");
  closeBtn.addEventListener("click", function () {
    offcanvas.hide();
  });

  panel.addEventListener("click", function (event) {
    const link = event.target.closest("a");
    if (!link || !panel.classList.contains("show")) return;
    event.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    panel.addEventListener("hidden.bs.offcanvas", () => target.scrollIntoView(), { once: true });
    offcanvas.hide();
  });
});
