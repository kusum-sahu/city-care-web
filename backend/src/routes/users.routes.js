const router = require("express").Router();
const { getAllUsers, createUser } = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.post("/", createUser);
// router.get("/profile", authenticateUser, getUserProfile);

module.exports = router;
