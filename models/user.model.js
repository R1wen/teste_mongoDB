//importation mongoose
const mongoose = require('mongoose');

//création du schéma pour la BD avec les variables
const userSchema = new mongoose.Schema({
    nom : {
        type : String,
        required : true
    },
    prenom : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    }

})

//création du modèle en fonction du schéma
const User = mongoose.model('User', userSchema);
module.exports = User; //exportation pour l'utiliser dans un autre fichier