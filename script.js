const API_KEY = AIzaSyCUlgkfZenPe_S51C1zO3Tlu9K477-JsB8; // Replace with your actual API key

async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    document.getElementById("chatbox").innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    
    // Call Gemini API
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gemini-pro",
            messages: [{ role: "user", content: userInput }]
        })
    });

    let data = await response.json();
    let botReply = data.choices[0].message.content;
    document.getElementById("chatbox").innerHTML += `<p><strong>AI:</strong> ${botReply}</p>`;
}
