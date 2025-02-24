document.addEventListener("DOMContentLoaded", function () {
    console.log("Chatbot Loaded");

    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");

    // Check if elements exist before using them
    if (!sendButton || !userInput || !chatbox) {
        console.error("Error: Missing chatbot elements. Check your HTML file.");
        return;
    }

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

function sendMessage() {
    const userInput = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");

    if (!userInput || !chatbox) {
        console.error("Error: Input or chatbox not found.");
        return;
    }

    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    chatbox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    userInput.value = "";

    // Append Agni Solar contact details
    const modifiedMessage = `${userMessage} 

At the end of your response, include:
"For expert advice and a customized solar solution, contact **Agni Solar** at [agnisolar.com](https://agnisolar.com) or call **+91-XXXXXXXXXX**."`;

    const API_KEY = "AIzaSyC7sRhoe5Aq8b-SQon-_mOpgVSxc7CYKQU"; // Replace with a valid key

    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: modifiedMessage }] }]
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data);

        if (data.error) {
            console.error("Error from API:", data.error.message);
            chatbox.innerHTML += `<p><strong>AI:</strong> Sorry, there was an error processing your request.</p>`;
        } else {
            let aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
            aiResponse = aiResponse.replace(/\*/g, ""); // Remove unnecessary asterisks
            aiResponse = aiResponse.replace(/\n/g, "<br>"); // Format line breaks

            chatbox.innerHTML += `<p style="white-space: pre-line;"><strong>AI:</strong> ${aiResponse}</p>`;
        }

        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to latest message
    })
    .catch(error => {
        console.error("Error:", error);
        chatbox.innerHTML += `<p><strong>AI:</strong> Sorry, I encountered a problem. Please try again.</p>`;
    });
}
