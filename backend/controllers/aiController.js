const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Product = require("../models/ProductModel");

const smartSearch = asyncHandler(async (req, res) => {
  const { query } = req.body;

  if (!query) {
    res.status(400);
    throw new Error("Query is required");
  }

  // 🔹 Step 1: Prompt for Gemini
  const prompt = `
  Convert the following user search query into JSON filters for an e-commerce product search.
  Only return valid JSON.

  Fields:
  - category (string)
  - brand (string)
  - rating (number, minimum rating)
  - price (lte number)

  Query: "${query}"

  Example Output:
  {
    "category": "",
    "brand": "",
    "rating": 4,
    "price": { "lte": number }
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

  try {
    filters = JSON.parse(text);
  } catch (err) {
    console.log("Invalid JSON from AI, fallback triggered");
  }

  // 🔹 Step 4: Build MongoDB query
  let mongoQuery = {};

  if (filters.category) {
    mongoQuery.category = new RegExp(filters.category, "i");
  }

  if (filters.brand) {
    mongoQuery.brand = new RegExp(filters.brand, "i");
  }
  if (filters.rating) mongoQuery.rating = { $gte: filters.rating };

  if (filters.price?.lte) {
    mongoQuery.price = { $lte: filters.price.lte };
  }

  // 🔹 Step 5: Fallback (if AI fails)
  if (Object.keys(mongoQuery).length === 0) {
    mongoQuery.name = { $regex: query, $options: "i" };
  }

  // 🔹 Step 6: Fetch products
  const products = await Product.find(mongoQuery).limit(10);

  res.status(200).json({
    success: true,
    filters,
    products,
  });
});

module.exports = { smartSearch };
