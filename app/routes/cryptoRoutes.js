const router = require("express").Router();
const cryptoController = require("../controllers/cryptoController");
const verifyAdm = require("../helpers/verifyAdm");

router.post("/create",verifyAdm, cryptoController.create);
router.get("/pairs/:pairName", cryptoController.searchPair);
router.get("/from/:fromCurrency", cryptoController.searchFrom);
router.get("/to/:toCurrency", cryptoController.searchTo);

module.exports = router;