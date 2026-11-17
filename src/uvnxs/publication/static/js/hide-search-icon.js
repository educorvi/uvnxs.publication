document.addEventListener("DOMContentLoaded", function() {
  const searchbox = document.querySelector("#portal-searchbox");
  if (searchbox) {
    searchbox.style.display = "none";
  }
  const searchToggle = document.querySelector(".header-search-toggle");
  if (searchToggle) {
    searchToggle.style.display = "none";
  }
});