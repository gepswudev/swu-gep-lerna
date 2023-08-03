const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const connectDB = require('../database/connect');
const APIpath = process.env.API || 'http://localhost:5001';

const CorouselsSchema = new Schema({
    uid: {
        type: String,
        default: uuidv4()
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        // default: APIpath + '/images/corousels/default.jpg'
        default: 'https://picsum.photos/1920/800'
    },
    url: {
        type: String,
        default: '#'
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


module.exports = mongoose.model('Corousels', CorouselsSchema);