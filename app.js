// importation et utilisation d'express pour notre app
const express = require("express");
const authenticateRouteur = require("./routes/authenticate");
const memesRouter = require("./routes/memes");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// importation et configuration de MongoDB
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://projectGroupe3:2023DC3groupe3@projectgroupe3.vl4xcfg.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// exporte les requete json dans le body
app.use(express.json());

// correction de l'erreur CROSS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'),
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'),
    next();
});

app.use('/authenticate', authenticateRouteur);
app.use('/memes', memesRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(port, (err)=>{
  if(err) console.log(err.message)
  console.log(`Running on port ${port}`);
})

// module.exports = app;