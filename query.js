// === Project Data ===
const projects = [
  { name: "AI Resume Analyzer", status: "working", folder: "AI-Resume-Analyzer" },
  { name: "Spam Email Classifier", status: "working", folder: "Spam-Email-Classifier" },
  { name: "Movie Recommender", status: "broken", folder: "Movie-Recommend" },
  { name: "Resume Shortlisting", status: "working", folder: "Resume-Shortlisting" },
  { name: "Chatbot App", status: "working", folder: "Chatbot" },
  { name: "Face Recognition", status: "broken", folder: "Face-Recognition" },
];

// === DOM Elements ===
const cardContainer = document.getElementById("card-container");
const themeToggle = document.getElementById("theme-checkbox");
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const searchInput = document.getElementById("search-input");

// === Create Project Cards ===
projects.forEach((project) => {
  const card = document.createElement("a");
  card.classList.add("project-card");
  card.href = `./${project.folder}/`;

  const img = document.createElement("img");
  img.src =
    project.status === "working"
      ? `./screenshots/${project.folder}.png`
      : "https://placehold.co/400x300/2d3436/dfe6e9/png?text=Preview+Not+Available";

  const title = document.createElement("h3");
  title.textContent = project.name;

  card.appendChild(img);
  card.appendChild(title);
  cardContainer.appendChild(card);
});

// === Theme Switcher ===
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light-mode") {
  document.body.classList.add("light-mode");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light-mode");
  } else {
    document.body.classList.remove("light-mode");
    localStorage.removeItem("theme");
  }
});

// === Scroll To Top Button ===
window.onscroll = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Search Functionality ===
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  const cards = document.querySelectorAll(".project-card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const match = title.includes(query);
    card.style.display = match ? "block" : "none";
    if (match) visibleCount++;
  });

  // Show "No results" message
  let noResults = document.getElementById("no-results");
  if (!noResults) {
    noResults = document.createElement("p");
    noResults.id = "no-results";
    noResults.textContent = "No projects found";
    noResults.style.textAlign = "center";
    noResults.style.marginTop = "30px";
    noResults.style.color = "var(--text-secondary)";
    cardContainer.parentNode.insertBefore(noResults, cardContainer.nextSibling);
  }

  noResults.style.display = visibleCount === 0 ? "block" : "none";
});
