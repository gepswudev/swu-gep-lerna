const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

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
        default: 'images/corousels/default.png'
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
    },
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});


module.exports = mongoose.model('Corousels', CorouselsSchema);