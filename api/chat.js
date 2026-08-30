import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openai.responses.create({
      model: "gpt-5",
      instructions:
        "You are J.A.R.V.I.S., a helpful, intelligent personal AI assistant. Speak clearly, naturally and concisely.",
      input: message
    });

    res.status(200).json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "JARVIS could not reach the AI."
    });
  }
}
