const router = require("express").Router();
const reviewController = require("../controllers/review.controller");

router.post("/reviews", reviewController.addReview);

module.exports = router;
