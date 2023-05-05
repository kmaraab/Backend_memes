const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storageImage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'temp');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extention = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extention);
  },
});

const middlewareSharp = (req, res, next) => {
    if (!req.file) {
      return next();
    }
    
    const { topText, bottomText } = req.body;
    const imagePath = req.file.path;
    const outputImagePath = `images/${req.file.filename}`;
  
    sharp(imagePath)
      .resize(800)
      .composite([
        {
          input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="100"><rect width="100%" height="100%" fill="black" /><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="Verdana" font-size="40" fill="white">${topText}</text></svg>`),
          gravity: 'north',
        },
        {
          input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="100"><rect width="100%" height="100%" fill="black" /><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="Verdana" font-size="40" fill="white">${bottomText}</text></svg>`),
          gravity: 'south',
        },
      ])
      .toBuffer((error, data) => {
        if (error) {
          return res.status(500).json({ error });
        }
        
        // Supprimez le fichier temporaire après avoir enregistré l'image finale
        fs.unlinkSync(imagePath);
  
        // Enregistrez la nouvelle image dans le dossier "images"
        fs.writeFileSync(outputImagePath, data);
  
        req.file.path = outputImagePath;
        next();
      });
  };  
  
     
module.exports = { middlewareSharp, multerUpload: multer({ storage: storageImage }).single('image') };