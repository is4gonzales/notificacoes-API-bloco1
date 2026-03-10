const express = require("express");
const router = express.Router();

const InscricaoController = require("../controllers/InscricaoController");

router.get("/", InscricaoController.index);
router.post("/", InscricaoController.store);
router.patch("/:id", InscricaoController.update);

module.exports = router;