const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
    theme: {
        type: String,
        default : "light",
    },
    dob : {
        type: String,
        required: false,
    },
    language : {
        type: String,
        required: false,
    },
    country : {
        type: String,
        required: false,
    },
    saved: [
        {
            item: {
                type: String,
                required: false,
            },
            createdDate: {
                type: Date,
                default: Date.now, 
            },
        }
    ],

    notes: [
        {
            content: {
                type: String,
                required: false,
            },
            createdDate: {
                type: Date,
                default: Date.now, 
        }
    }
    ],
    
    role : {
        type: String,
        default : "user",
    },
});

exports.Users = mongoose.model('Users-Details', UsersSchema);
