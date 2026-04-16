const asyncHandler = require("express-async-handler");
const axios = require("axios");

const smartSearch = asyncHandler(async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === "") {
    res.status(400);
    return res.status(400).json({ message: "Query is required" });
    // throw new Error("Query is required");
  }

  // 🔹 Step 1: Prompt for Gemini
  const prompt = `
Convert the user query into JSON filters for an e-commerce search.

Only return valid JSON.

Fields:
- keyword (main product name like shoes, phone, laptop)
- category (string)
- rating (number, minimum rating)
- price (number, max price)

Query: "${query}"

Example Output:
{
  "keyword": "camera",
  "category": "electronics",
  "brand": "nike",
  "rating": 4,
  "price": 2000
}
`;
  // 🔹 Step 2: Call Gemini API
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    },
  );

  let text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // 🔹 Step 3: Clean AI response
  text = text.replace(/```json|```/g, "").trim();

  let filters = {};
  let isValid = true;
  try {
    filters = JSON.parse(text);
  } catch (err) {
    console.log("Invalid JSON from AI, fallback triggered");
    isValid = false;
  }

  // 🔥 Check if empty or useless
  if (
    !filters.keyword &&
    !filters.category &&
    !filters.price &&
    !filters.rating
  ) {
    isValid = false;
  }

  res.status(200).json({
    success: true,
    filters,
    isValid,
  });
});

module.exports = { smartSearch };
