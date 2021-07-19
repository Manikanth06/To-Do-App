//jshint esversion:6

const express = require("express")
router = express.Router()
list = require('../controllers/showList')

router.get("/api", list.showList);

router.post("/api", list.new);

router.post("/api/delete", list.delete);

module.exports = router;