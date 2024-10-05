let posts = []; // Declare posts in a broader scope

const fetchBlogPosts = async () => {
  try {
    const response = await fetch(
      "https://kefita-tech-backend-1.onrender.com/api/blogs"
    );

    // Check if the response is okay
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    // Parse the response data
    const data = await response.json();

    // Return the blog posts data
    return data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
};

const cardContainer = document.getElementById("cardsContainer");
const loadingIndicator = document.getElementById("loadingIndicator");

const renderCard = (posts, isFiltered) => {
  cardContainer.innerHTML = posts
    .map(
      (post) =>
        `<div class="box" data-name="${post.category}">
            <div class="image">
              <img src="${
                post.image ? post.image : "../assets/images/IOT.jpg"
              }" alt="${post.title}" />
            </div>
            <div class="box-content">
              <h4>${post.title}</h4>
              <p>${post.text}</p>
              <button onclick="window.location.href='${
                post.link ? post.link : "../pages/custom-software.html"
              }'" class="readmore">Read more</button>
            </div>
          </div>`
    )
    .join(" ");

  // Adjust the card container class based on filtering
  if (isFiltered) {
    cardContainer.classList.add("filtered");
  } else {
    cardContainer.classList.remove("filtered");
  }
};

const filterButtons = document.querySelectorAll(".filerButton button");

const filtercard = (e) => {
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");
  const filter = e.target.dataset.name;

  const filteredPosts =
    filter === "show-all"
      ? posts
      : posts.filter((post) => post.category === filter);
  renderCard(filteredPosts, filter !== "show-all");
};

filterButtons.forEach((button) => button.addEventListener("click", filtercard));

const initializePosts = async () => {
  // Show loading indicator
  loadingIndicator.style.display = "block";

  posts = await fetchBlogPosts(); // Assign fetched posts to the broader scoped variable

  // Hide loading indicator
  loadingIndicator.style.display = "none";

  if (posts) {
    renderCard(posts, false);
  }
};

// Call the initialization function
initializePosts();
