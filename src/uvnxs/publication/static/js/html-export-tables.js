document.addEventListener("DOMContentLoaded", function() {
  const tableBodies = document.querySelectorAll(".article-content .table-wrap table tbody");
  tableBodies.forEach(tbody => assignRowClasses(tbody));
});

function assignRowClasses(tbody) {
  const rows = tbody.querySelectorAll("tr");
  let currentClass = "odd";
  let remainingRowspan = 0;
  rows.forEach(row => {
    row.classList.add(currentClass);

    const cells = row.querySelectorAll("td");
    let maximumRowspan = 1;
    for (const cell of cells) {
      const rowspan = parseInt(cell.getAttribute("rowspan") || "1") || 1;
      if (rowspan > maximumRowspan) {
        maximumRowspan = rowspan;
      }
    }
    remainingRowspan = Math.max(remainingRowspan, maximumRowspan - 1);
    if (remainingRowspan === 0) {
        currentClass = currentClass === "odd" ? "even" : "odd";
    }
    remainingRowspan = Math.max(remainingRowspan - 1, 0);
  });
}