document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseMessage = document.getElementById("responseMessage");
  const loadRoller = document.getElementById("lds-roller");
  const submit = document.getElementById("submit");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission
    loadRoller.style.display = "block"; // Show loading animation
    submit.value = "Sending the message"; // Change button text

    // Create FormData from form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        "https://kefita-tech-backend-1.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.text();

      if (response.ok) {
        responseMessage.textContent = "Message Sent Successfully"; // Success message
        responseMessage.style.color = "green"; // Change text color to green
        form.reset(); // Reset form fields
      } else {
        responseMessage.textContent =
          "Failed to send message. Please try again."; // Error message
        responseMessage.style.color = "red"; // Change text color to red
      }

      console.log("Response:", result); // Log the response
    } catch (error) {
      responseMessage.textContent = "An error occurred. Please try again."; // Catch any errors
      responseMessage.style.color = "red"; // Change text color to red
      console.error("Error:", error); // Log the error
    } finally {
      loadRoller.style.display = "none"; // Hide loading animation
      submit.value = "Send Message"; // Reset button text after completion
    }
  });

  // Update submit button text if form fields change
  form.addEventListener("input", () => {
    submit.value = "Send Message"; // Reset button text when user types in form
  });
});
