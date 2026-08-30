function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}


function askJarvis() {

    const input = document.getElementById("userInput");
    const response = document.getElementById("response");

    const message = input.value.trim();

    if (message === "") {
        response.textContent = "JARVIS: Please tell me something.";
        speak("Please tell me something.");
        return;
    }

    const reply =
        "I received your message. You said: " + message;

    response.textContent = "JARVIS: " + reply;

    speak(reply);

    input.value = "";
}


function startListening() {

    const status = document.getElementById("status");
    const input = document.getElementById("userInput");

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        status.textContent =
            "Voice recognition is not supported in this browser.";
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    status.textContent = "🎙️ Listening...";

    recognition.start();

    recognition.onresult = function(event) {

        const transcript =
            event.results[0][0].transcript;

        input.value = transcript;

        status.textContent =
            "I heard: " + transcript;

        askJarvis();
    };

    recognition.onerror = function(event) {

        status.textContent =
            "Voice error: " + event.error;
    };

    recognition.onend = function() {

        if (status.textContent === "🎙️ Listening...") {
            status.textContent =
                "Tap the microphone and speak.";
        }
    };
}
