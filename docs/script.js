const chatBox = document.getElementById("chat-box");

function appendMessage(message, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (message === "") return;

  appendMessage(message, "user");
  input.value = "";

  // Show loading message
  appendMessage("⏳ Thinking...", "bot");

  fetch("https://cloud.flowiseai.com/api/v1/prediction/1dd51e09-2bf2-43d5-becf-ba5211450011", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer CkDo0GvF1fqlpciROGkhvJGBq6vY_QxfjK_XOBdj4wY"
    },
    body: JSON.stringify({
      question: message
    })
  })
    .then((response) => response.json())
    .then((data) => {
      // Remove the loading message
      const botMessages = document.querySelectorAll(".message.bot");
      if (botMessages.length > 0 && botMessages[botMessages.length - 1].innerText === "⏳ Thinking...") {
        botMessages[botMessages.length - 1].remove();
      }

      const reply = data.text || "⚠️ No response from assistant.";
      appendMessage(reply, "bot");
    })
    .catch((error) => {
      console.error(error);
      appendMessage("❌ Error connecting to the assistant.", "bot");
    });
}

// Start with welcome message
appendMessage("👋 Welcome! I'm your Real Estate Assistant. Ask me anything about buying or renting properties in Dubai.", "bot");


 

