const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const PersonnelsSchema = new Schema({
  uid: {
    type: String,
    default: uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  engName: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  wellcenter: {
    type: Object,
    default: {
      status: false,
      position: "",
      engPosition: "",
      availableDate: [],
      availableTime: [],
    },
  },
  position:{
    type: String,
    default: ''
  },
  engPosition:{
    type: String,
    default: ''
  },
  img: {
    type: String,
    default: '',
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

module.exports = mongoose.model("Personnels", PersonnelsSchema);