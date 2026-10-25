/* =========================================================
   PROJECT FILTERS
   Keeps project filtering separate from the main page scripts.
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".project-filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const emptyMessage = document.getElementById("empty-projects");

  if (!filterButtons.length || !projectCards.length) return;

  function filterProjects(category) {
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const matches = category === "all" || card.dataset.category === category;
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === category;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => filterProjects(button.dataset.filter || "all"));
  });
});
