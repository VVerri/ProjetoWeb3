const router = require("express").Router();
const cryptoController = require("../controllers/cryptoController");
const verifyAdm = require("../helpers/verifyAdm");

router.post('/create', verifyAdm, cryptoController.create);
router.get('/searchPair', cryptoController.searchPair);
router.get('/searchFrom', cryptoController.searchFrom);
router.get('/searchTo', cryptoController.searchTo);

module.exports = router;