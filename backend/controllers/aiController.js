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

Return ONLY valid raw JSON.

Expected JSON Schema:
{
  "keyword": "string | null",
  "category": "string | null",
  "brand": "string | null",
  "rating": "number | null",
  "price": "number | null",
  "sort": "price_asc | price_desc | rating_desc | null"
}

Rules:
1. If value not found → null
2. Do not explain or add markdown, return raw JSON only.
3. cheap → price = 100
4. premium → price = 1000
5. good/best → rating = 4
6. price low to high → sort = "price_asc"
7. price high to low → sort = "price_desc"
8. top rated → sort = "rating_desc"


Example Query:
"best Mouse under 500"

Example Output:
{
  "keyword": "Mouse",
  "category": null,
  "brand": null,
  "rating": 4,
  "price": 500,
  "sort": null
}

Query: "${query}"

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
    // Fallback search: If AI fails, return empty filters
    filters = {
      keyword: query,
      category: null,
      brand: null,
      rating: null,
      price: null,
      sort: null,
    };
    isValid = false;
  }

  // 🔥 Check if empty or useless
  if (
    !filters.keyword &&
    !filters.category &&
    !filters.price &&
    !filters.rating &&
    !filters.sort
  ) {
    filters.keyword = query;
    isValid = false;
  }

  res.status(200).json({
    success: true,
    filters,
    isValid,
  });
});

module.exports = { smartSearch };
