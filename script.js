function askJarvis() {
    const input = document.getElementById("userInput");
    const response = document.getElementById("response");

    const message = input.value.trim();

    if (message === "") {
        response.textContent = "JARVIS: Please tell me something.";
        return;
    }

    response.textContent =
        "JARVIS: I received your message — " + message;

    input.value = "";
}
