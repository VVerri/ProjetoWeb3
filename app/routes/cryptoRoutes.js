const router = require("express").Router();
const cryptoController = require("../controllers/cryptoController");
const verifyAdm = require("../helpers/verifyAdm");

router.post("/create", cryptoController.create);
router.get("/:name", cryptoController.searchPair);
router.get("/:fromCurrency", cryptoController.searchFrom);
router.get("/:toCurrency", cryptoController.searchTo);

module.exports = router;