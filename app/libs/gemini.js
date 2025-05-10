import axios from "axios";

export async function generateExcuse(prompt, tone, category) {
  try {
    const res = await axios.post("/api/generate", {
      prompt,
      tone,
      category,
    });

    return res.data.text;
  } catch (error) {
    console.error(
      "Failed to generate excuse:",
      error.response?.data || error.message
    );

    throw error;
  }
}
