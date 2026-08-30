async function askJarvis(message) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "AI request failed");
  }

  return data.reply;
}
