document
  .getElementById("subscribeButton")
  .addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent the default button action

    const email = document.getElementById("email").value;
    const messageDiv = document.getElementById("message");
    const spinner = document.getElementById("spinner");

    // Show the spinner
    spinner.style.display = "inline-block";
    document.getElementById("subscribeButton").disabled = true; // Disable button to prevent multiple clicks

    try {
      const response = await fetch(
        "https://kefita-tech-backend-1.onrender.com/api/subscribe",
        {
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
        const errorMessage = JSON.parse(errorText).message;

        // Check for duplicate email error
        if (errorMessage.includes("duplicate key error")) {
          messageDiv.textContent = "This email is already subscribed.";
        } else {
          messageDiv.textContent = `Error: ${errorMessage}`;
        }
        messageDiv.style.color = "#FA8072"; // Error message color
      }
    } catch (error) {
      console.error("Fetch error:", error);
      messageDiv.textContent = "Error subscribing: " + error.message;
      messageDiv.style.color = "#FFCCCB"; // Error message color
    } finally {
      // Hide the spinner and enable the button again
      spinner.style.display = "none";
      document.getElementById("subscribeButton").disabled = false; // Re-enable the button
    }
  });
