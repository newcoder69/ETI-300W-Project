document.getElementById("sendButton").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const ip = document.getElementById("ipInput").value;

  // Construct a full URL for the POST request
  const targetURL = `http://127.0.0.1:3000`;

  fetch(targetURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      ip: ip
    })
  })
  .then(response => {
    if (response.ok) {
      document.getElementById("status").textContent = "POST sent successfully!";
    } else {
      document.getElementById("status").textContent = "Server responded with an error.";
    }
  })
  .catch(error => {
    console.error(error);
    document.getElementById("status").textContent = "Failed to send POST.";
  });
});
