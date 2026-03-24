import express from "express";
import OpenAI from "openai";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("API HIT");
    console.log("KEY:", process.env.OPENROUTER_API_KEY); // 🔍 debug

    // ✅ Initialize client HERE (after dotenv loads)
    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const { code, language } = req.body;

    const prompt = `
You are a strict code reviewer.

IMPORTANT:
- Return ONLY valid JSON
- Do NOT add explanation
- Do NOT add text before/after JSON

Format:
{
  "score": "1-10",
  "issues": ["..."],
  "suggestions": ["..."],
  "improved_code": "..."
}

Code:
${code}
`;

    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [{ role: "user", content: prompt }],
    });

    const result = response.choices[0].message.content;

    res.json({ result });

  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;