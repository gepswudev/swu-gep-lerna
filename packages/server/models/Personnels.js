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
  wellcenter: {
    type: Object,
    default: {
      status: false,
      position: "",
      availableDate: [],
      availableTime: [],
    },
  },
  position:{
    type: String,
    default: ''
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

module.exports = mongoose.model("Personnels", PersonnelsSchema);