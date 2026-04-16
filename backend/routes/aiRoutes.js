const express = require("express");
const router = express.Router();
const { smartSearch } = require("../controllers/aiController");

router.route("/parse").post(smartSearch);

module.exports = router;
