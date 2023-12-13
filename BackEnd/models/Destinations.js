const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventDetails: {
        type: String,
        required: false,
    },
});

const DestinationsSchema = mongoose.Schema({
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
    important: {
        type: String,
        required: false,
    },
    nearplaces: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Places-Details'
        }
    ],
    events: [EventSchema],
    dates: [
        {
            type: Date,
            required: false,
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Destinations = mongoose.model('Destinations-Details', DestinationsSchema);
