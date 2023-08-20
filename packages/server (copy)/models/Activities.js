const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const ActivitiesSchema = new Schema({
    uid: {
        type: String,
        default: uuidv4()
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        // default: APIpath + '/images/activities/default.jpg'
        default: 'https://picsum.photos/500/200'
    },
    href: {
        type: String,
        default: ''
    },
    badge: {
        type: String,
        default: ''
    },
    tag:{
        type: String,
        default: ''
    },
    degree:{
        type:[String],
        default: []
    },
    views:{
        type: Number,
        default: 0
    } ,
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


module.exports = mongoose.model('Activities', ActivitiesSchema);