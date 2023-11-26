const mongoose = require('mongoose');

const PlacesSchema = mongoose.Schema({
    place: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    district: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    important: {
        type: String,
        required: false,
    },
    veryimportant : {
        type: String,
        required: false,
    },
    recommondation: {
        type: String,
        required: false,
    },
    // nearplaces: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Places-Details'
    //     }
    // ],
    
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Places = mongoose.model('Places-Details', PlacesSchema);
