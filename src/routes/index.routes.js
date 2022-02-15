const express = require("express");
const userController = require("../controllers/User");

const router = express.Router();

router.route("/users").get(userController.index);
router.route("/user/:id").get(userController.show);
router.route("/signup").post(userController.create);
router.route("/login").post(userController.login);


module.exports = router;
