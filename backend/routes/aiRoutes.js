const express = require("express");
const router = express.Router();
const { smartSearch } = require("../controllers/aiController");

router.route("/search").post(smartSearch);

module.exports = router;
