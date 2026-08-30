const reply = await askJarvis(transcript);

document.getElementById("response").textContent =
  "JARVIS: " + reply;

speechSynthesis.cancel();

const speech = new SpeechSynthesisUtterance(reply);
speech.rate = 1;
speech.pitch = 1;

speechSynthesis.speak(speech);
