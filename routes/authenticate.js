const express = require("express");
const ctrlauth = require("../controllers/auth");

const router = express.Router();

router.post('/', ctrlauth.authenticate);

module.exports = router;