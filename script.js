function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

async function askJarvis() {
  const input = document.getElementById("userInput");
  const response = document.getElementById("response");
  const status = document.getElementById("status");
  const askBtn = document.querySelector("button[onclick='askJarvis()']");

  const message = input.value.trim();

  if (message === "") {
    response.textContent = "JARVIS: Please tell me something.";
    speak("Please tell me something.");
    return;
  }

  // Loading state
  response.textContent = "JARVIS: Thinking...";
  status.textContent = "Processing your request...";
  askBtn.disabled = true;
  input.disabled = true;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    response.textContent = "JARVIS: " + data.reply;
    speak(data.reply);
    status.textContent = "Tap the microphone and speak.";

  } catch (error) {
    console.error(error);
    response.textContent = "JARVIS: " + (error.message || "I encountered an error.");
    speak("I encountered an error. Please try again.");
    status.textContent = "Error occurred. Try again.";
  } finally {
    askBtn.disabled = false;
    input.disabled = false;
    input.value = "";
    input.focus();
  }
}

function startListening() {
  const status = document.getElementById("status");
  const input = document.getElementById("userInput");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    status.textContent = "Voice recognition is not supported in this browser.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  status.textContent = "🎙️ Listening...";

  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
    status.textContent = "I heard: " + transcript;
    askJarvis();
  };

  recognition.onerror = function (event) {
    status.textContent = "Voice error: " + event.error;
  };

  recognition.onend = function () {
    if (status.textContent === "🎙️ Listening...") {
      status.textContent = "Tap the microphone and speak.";
    }
  };
}

// Allow pressing Enter to send
document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    askJarvis();
  }
});
