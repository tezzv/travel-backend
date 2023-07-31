const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlacesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    place: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
const PlaceModel = mongoose.model('notes', PlacesSchema);
module.exports = PlaceModel
