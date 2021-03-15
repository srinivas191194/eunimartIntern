var mongoose = require("mongoose");


const MovieSchema = new mongoose.Schema({
    name:{type: String,required :true},
    genre:{type:String,required:true}

})
const movieModel = mongoose.model('moviedb',MovieSchema);
module.exports = {movieModel}