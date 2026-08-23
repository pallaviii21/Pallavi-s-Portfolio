const greetings = [
    "Hello",       // English
    "Bonjour",     // French
    "こんにちは",   // Japanese (Konnichiwa)
    "Hallo",       // German
    "Ciao",        // Italian
    "Hola",        // Spanish
    "안녕하세요",    // Korean (Annyeonghaseyo)
    "नमस्ते",      // Hindi
];

const greetingElement = document.getElementById("greeting");
let index = 0;

// Function to update the greeting instantly
function updateGreeting() {
    if (index < greetings.length) {
        greetingElement.textContent = greetings[index];
        index++;
    } else {
        // After cycling through all greetings, trigger final animation and redirect
        clearInterval(greetingInterval);
        const container = document.getElementById("animation-container");
        if (container) {
            container.classList.add("final");
        }
        setTimeout(() => {
            window.location.href = "home.html";
        }, 800);
    }
}

// Start the greeting cycle with smooth timing
const greetingInterval = setInterval(updateGreeting, 350);

// Initialize with the first greeting
updateGreeting();


