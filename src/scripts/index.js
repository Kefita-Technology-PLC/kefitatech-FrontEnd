document
  .getElementById("subscribeButton")
  .addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent the default button action

    const email = document.getElementById("email").value;
    const messageDiv = document.getElementById("message");

    try {
      const response = await fetch(
        "https://kefita-tech-backend-1.onrender.com/api/subscribe",
        {
          // Change this URL to your production backend
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        messageDiv.textContent = "Subscription successful!";
        messageDiv.style.color = "#28a745"; // Success message color
      } else {
        const errorText = await response.text();
        messageDiv.textContent = `Error: ${errorText}`;
        messageDiv.style.color = "#FA8072"; // Error message color
      }
    } catch (error) {
      console.error("Fetch error:", error);
      messageDiv.textContent = "Error subscribing: " + error.message;
      messageDiv.style.color = "#FFCCCB"; // Error message color
    }
  });
