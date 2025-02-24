document.addEventListener("DOMContentLoaded", function () {
    console.log("Chatbot Loaded");  // Debugging

    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    if (!chatForm || !userInput || !chatBox) {
        console.error("Chat form elements not found! Check HTML IDs.");
        return;
    }

    // ✅ Make sure API key is inside double quotes
    const API_KEY = "AIzaSyCUlgkfZenPe_S51C1zO3Tlu9K477";
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    // ✅ Event listener for form submission
    chatForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("Send button clicked");

        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        appendMessage("You", userMessage);
        userInput.value = "";

        try {
            // ✅ Corrected request payload format for Gemini API
            const requestBody = {
                contents: [{ role: "user", parts: [{ text: userMessage }] }]
            };

            const response = await fetch(GEMINI_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (data.error) {
                console.error("Error from API:", data.error.message);
                appendMessage("AI", "Error: " + data.error.message);
                return;
            }

            // ✅ Extract AI response correctly
            const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
            appendMessage("AI", aiResponse);
        } catch (error) {
            console.error("Error:", error);
            appendMessage("AI", "Error fetching response.");
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement("p");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
