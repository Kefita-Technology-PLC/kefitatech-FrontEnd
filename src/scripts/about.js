
let numberCounter = document.querySelectorAll(".num");
let interval = 1500;

numberCounter.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.textContent = startValue + "+";
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});



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
