const flowiseURL ="https://cloud.flowiseai.com/api/v1/prediction/1dd51e09-2bf2-43d5-becf-ba5211450011"; 

function appendMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage(userText, "user");
  input.value = "";

  try {
    const response = await fetch(flowiseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userText }),
    });

    const data = await response.json();
    const botReply = data.text || "Sorry, I didn’t understand that.";
    appendMessage(botReply, "bot");
  } catch (error) {
    appendMessage("Error connecting to the assistant.", "bot");
  }
}
