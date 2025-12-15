const menuBtn = document.querySelector(".menu-btn");
const navList = document.querySelector("nav ul");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navList.classList.toggle("show-menu");
  });
}

function showSection(id) {
  document
    .querySelectorAll(".section")
    .forEach((sec) => sec.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}


document.addEventListener("DOMContentLoaded", () => {
  // Only show section if hash is present
  const hash = window.location.hash.substring(1);
  if (hash) {
    showSection(hash);
  }
});


function filterClubs() {
  const select = document.getElementById("clubInterest");
  const value = select.value;
  const cards = document.querySelectorAll(".club-card");

  cards.forEach((card) => {
    card.classList.remove("club-highlight");

    if (value === "all") {
      card.style.display = "flex";
    } else {
      const tag = card.getAttribute("data-tag");
      card.style.display = tag === value ? "flex" : "none";

      if (tag === value) {
        card.classList.add("club-highlight");
      }
    }
  });
}


function viewResearchDetails(title) {
  alert(
    "You selected the research project: " +
    title +
    "\\n\\nFor more information, kindly visit the Faculty research office or check the students portal."
  );
}

function toggleInternshipTips() {
  const tips = document.getElementById("internshipTips");
  const btn = document.getElementById("tipsBtn");
  if (!tips || !btn) return;

  if (tips.style.display === "block") {
    tips.style.display = "none";
    btn.textContent = "Show Internship Tips";
  } else {
    tips.style.display = "block";
    btn.textContent = "Hide Internship Tips";
  }
}
