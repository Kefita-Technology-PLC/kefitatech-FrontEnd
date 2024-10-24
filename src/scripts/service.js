const showMoreButton = document.querySelector(".show-more");
const itemsContainer = document.querySelector(".items");
const items = document.querySelectorAll(".box");
const servicePerColumn = 3;
let visibleService = servicePerColumn;
items.forEach((item, index) => {
  if (index >= visibleService) {
    item.style.display = "none";
  }
});
function expandService() {
  visibleService += servicePerColumn;
  items.forEach((item, index) => {
    if (index < visibleService) {
      item.style.display = "block";
    }
  });
  if (visibleService >= items.length) {
    showMoreButton.style.display = "none";
  }
}

// Get the current page URL
const currentPage = window.location.pathname.split("/").pop().toLowerCase();

// Get all navigation links
const navLinks = document.querySelectorAll(".navlist a");

// Loop through each link and check for active page
navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href").split("/").pop().toLowerCase();

  // Check if the link's href matches the current page and apply 'active' class
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});
