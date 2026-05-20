const asyncHandler = require("express-async-handler");
const axios = require("axios");

const smartSearch = asyncHandler(async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === "") {
    return res.status(400).json({
      message: "Query is required",
    });
  }

  const prompt = `
Convert the user query into JSON filters for ecommerce search.

Return ONLY valid JSON.

{
  "keyword": "string | null",
  "category": "string | null",
  "brand": "string | null",
  "rating": "number | null",
  "price": "number | null",
  "sort": "price_asc | price_desc | rating_desc | null"
}

Query: "${query}"
`;

  let text = "";
  let filters = {};
  let isValid = true;

  // 🔥 API CALL
  try {
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

    text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    text = text.replace(/```json|```/g, "").trim();
  } catch (apiError) {
    console.log("Gemini API failed:", apiError.message);

    filters = {
      keyword: query,
      category: null,
      brand: null,
      rating: null,
      price: null,
      sort: null,
    };

    return res.status(200).json({
      success: true,
      filters,
      isValid: false,
      fallback: true,
      reason: "AI API failed",
    });
  }

  // 🔥 JSON PARSE
  try {
    filters = JSON.parse(text);
  } catch (parseError) {
    console.log("JSON parse failed");

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

  // 🔥 EMPTY AI RESPONSE
  if (
    !filters.keyword &&
    !filters.category &&
    !filters.brand &&
    !filters.rating &&
    !filters.price &&
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
