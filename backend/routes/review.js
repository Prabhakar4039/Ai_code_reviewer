import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("API HIT");

    const { code, language } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Analyze this ${language} code and return STRICT JSON:

{
  "score": "",
  "issues": [],
  "suggestions": [],
  "improved_code": ""
}

Code:
${code}`
          }
        ]
      })
    });

    const data = await response.json();

    console.log("AI RESPONSE:", data);

    const result = data.choices?.[0]?.message?.content || "No response";

    res.json({ result });

  } catch (err) {
    console.error("BACKEND ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;