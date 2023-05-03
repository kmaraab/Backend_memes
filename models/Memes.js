const mongoose = require('mongoose');

const memesSchema = mongoose.Schema({
    topText : {type: String}, 
    bottomText : {type: String}, 
    imageUrl : {type: String},
})

module.exports = mongoose.model("Memes", memesSchema);