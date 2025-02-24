document.addEventListener("DOMContentLoaded", function () {
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const API_KEY = AIzaSyC7sRhoe5Aq8b-SQon-_mOpgVSxc7CYKQU;  // Replace with your NEW key
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    chatForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        appendMessage("You", userMessage);
        userInput.value = "";

        try {
            const requestBody = {
                contents: [{ parts: [{ text: userMessage }] }]
            };

            const response = await fetch(GEMINI_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            console.log("API Response:", data);  // Debugging

            // Extract AI response properly
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
