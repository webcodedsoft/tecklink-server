const mongoose = require('mongoose');
const Schema = mongoose.Schema
var ObjectId = Schema.ObjectId


//Auth Schema
const auth = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
    },
    userType: {
        type: Boolean,
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})
const authSchema = mongoose.model('users', auth);

//Ticket Schema
const ticket = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        trim: true
    },
    ticketId: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})
const ticketSchema = mongoose.model('tickets', ticket);

module.exports = { authSchema, ticketSchema }