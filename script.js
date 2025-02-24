document.addEventListener("DOMContentLoaded", function () {
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const API_KEY = AIzaSyCUlgkfZenPe_S51C1zO3Tlu9K477-JsB8;  // Replace with your actual Google API Key
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    chatForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        // Display user message in chat
        appendMessage("You", userMessage);
        userInput.value = "";

        try {
            // Prepare API request body
            const requestBody = {
                contents: [{ role: "user", parts: [{ text: userMessage }] }]
            };

            // Call Gemini API
            const response = await fetch(GEMINI_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            console.log("API Response:", data);

            // Extract AI response
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
            appendMessage("AI", aiResponse);
        } catch (error) {
            console.error("Error communicating with Gemini API:", error);
            appendMessage("AI", "Error fetching response.");
        }
    });

    // Function to display messages in chat box
    function appendMessage(sender, message) {
        const messageElement = document.createElement("p");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

