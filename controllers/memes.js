const Memes = require("../models/Memes");
const fs = require("fs");

////////////////////// Affichage de tout les mêmes ////////////////////
exports.allMemes = (req, res, next) =>{
    Memes.find()
        .then(memes => res.status(200).json(memes))
        .catch(error => res.status(404).json({error}));
}


/////////////// Création d'un nouveau memes //////////////////
exports.createMemes = (req, res, next) => {
    const memes = req.body;
    const addMemes = new Memes({
      ...memes,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    addMemes.save()
      .then(() => res.status(200).json({ message: "Meme enregistré avec succès !" }))
      .catch(error => res.status(400).json({ error }));
  };


/////////////////// Suppression d'un memes ///////////////////////
exports.deleteMemes = (req, res, next) => {
    Memes.findOne({_id : req.params.id})
        .then(memes =>{
            const filename = memes.imageUrl.split('/images/')[1]; 
            fs.unlink(`images/${filename}`, () => {
                Memes.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: "Memes supprimés avec succès !"}))
                    .catch(error => res.status(401).json({error}));
            })
        })
        .catch(error => res.status(500).json({error}));
}