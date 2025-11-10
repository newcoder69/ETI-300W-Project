document.getElementById("sendButton").addEventListener("click", () => {
  const message = document.getElementById("messageInput").value;

  // Replace this with target IP
  const targetIP = "http://0.0.0.0:3000";

  // Sends the string as JSON in a POST request
  fetch(targetIP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  })
  .then(response => {
    if (response.ok) {
      document.getElementById("status").textContent = "Message sent successfully!";
    } else {
      document.getElementById("status").textContent = "Failed to send message.";
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("status").textContent = "Error sending message.";
  });
});
