const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const connectDB = require('../database/connect');
const APIpath = process.env.API || 'http://localhost:3000';

const ActivitiesSchema = new Schema({
    uid: {
        type: String,
        default: uuidv4()
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: APIpath + '/images/activities/default.jpg'
    },
    createAt : {
        type: Date,
        default: Date.now
    },
    updateAt : {
        type: Date,
        default: Date.now
    }
});


module.exports.Activities = mongoose.model('Activities', ActivitiesSchema);