const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyAdm = require("../helpers/verifyAdm");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/authenticaded", userController.authenticaded);

module.exports = router;