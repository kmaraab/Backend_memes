const express = require("express");
const ctrlMemes = require("../controllers/memes");
const { middlewareSharp, multerUpload } = require('../midlewires/multer-config');
const router = express.Router();

router.get('/', ctrlMemes.allMemes);
router.post('/create', multerUpload, middlewareSharp, ctrlMemes.createMemes);
router.delete('/delete/:id', ctrlMemes.deleteMemes);

module.exports = router;