const express = require("express");
const ctrlMemes = require("../controllers/memes");
const multer = require("../midlewires/multer-config");

const router = express.Router();

router.get('/', ctrlMemes.allMemes);
router.post('/create', multer, ctrlMemes.createMemes);
router.delete('/delete/:id', multer, ctrlMemes.deleteMemes);

module.exports = router;