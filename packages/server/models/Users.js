const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const UsersSchema = new Schema({
    uid: {
        type: String,
        default: uuidv4()
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
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


module.exports = mongoose.model('Users', UsersSchema);