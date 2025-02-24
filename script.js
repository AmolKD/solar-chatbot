const API_KEY = "AIzaSyC7sRhoe5Aq8b-SQon-_mOpgVSxc7CYKQU"; // Replace with your valid API key

document.addEventListener("DOMContentLoaded", function () {
    console.log("Chatbot Loaded");

    document.getElementById("sendButton").addEventListener("click", sendMessage);
    document.getElementById("userInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

function sendMessage() {
    const userMessage = document.getElementById("userInput").value.trim();
    if (!userMessage) return;

    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    document.getElementById("userInput").value = "";

    // Modify user message to ensure responses include Agni Solar contact info
    const modifiedMessage = `${userMessage} 

At the end of your response, include:
"For expert advice and a customized solar solution, contact **Agni Solar** at [agnisolar.com](https://agnisolar.com) or call **+91-XXXXXXXXXX**."`;

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
            let aiResponse = data.candidates[0]?.content?.parts[0]?.text || "No response";
            aiResponse = aiResponse.replace(/\*/g, ""); // Remove unwanted asterisks
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
