const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const Personnels = require("../models/Personnels");
const logger = require("../database/logger");
const { log } = require("../logger");
const Users = require("../models/Users");

// POST /personnels
exports.create = async (req, res) => {
  try {
    //Validate file input
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({
        status: "error",
        message: "No files were uploaded.",
      });
    }
    console.log(req.body);

    const {
      name,
      engName,
      position,
      engPosition,
      wellcenterStatus,
      wellcenterDate,
      wellcenterPosition,
      wellcenterEngPosition,
      wellcenterTime,
      email,
      phone,
    } = req.body;
    if (!name || name === "") {
      return res.status(400).send({
        status: "error",
        message: "Name is required.",
      });
    }
    const isExist = await Personnels.findOne({ name });
    if (isExist) {
      return res.status(400).send({
        status: "error",
        message: `Personnels ${name} already exists`,
      });
    }

    const uploadedFile = req.files.img;
    const fileName = uploadedFile.name;
    const fileExtension = fileName.split(".").pop();
    const renameFile = `${uuidv4()}_${Date.now()}_profile.${fileExtension}`;
    const uploadPath = path.join(
      `${__dirname}/../public/images/personnels/${renameFile}`
    );
    uploadedFile.mv(uploadPath, async (err) => {
      if (err) {
        log(`Personnels`, err.message, "error");
        return res.status(500).send({
          status: "error",
          message: err.message + " - " + err.stack,
        });
      }
      let wellcenter = {
        status: false,
        position: "",
        availableDate: [],
        availableTime: [],
      };
      if (wellcenterStatus) {
        const WDate = wellcenterDate?.split(",");
        const Time = wellcenterTime?.split(",");
        wellcenter = {
          status: wellcenterStatus,
          position: wellcenterPosition,
          engPosition: wellcenterEngPosition,
          availableDate: WDate,
          availableTime: Time,
        };
      }

      //find who created the activity
      const createdBy = req.userData?.username;
      //find _id of the user who created the activity
      const modifiedBy = Users.findOne({ username: createdBy });

      const newPersonnels = new Personnels({
        name,
        engName,
        position,
        engPosition,
        wellcenter,
        email,
        phone,
        img: `images/personnels/${renameFile}`,
        modifiedBy: modifiedBy._id,
      });

      const personnel = await newPersonnels.save();
      console.log(personnel);
      log(`Personnels`, `Created ${name}`);
      logger.info(`Personnels`, `Created ${name}`);
      return res.status(200).send({
        status: "success",
        message: `Created ${name}`,
        data: personnel,
      });
    });
  } catch (error) {
    log(`Personnels`, error.message, "error");
    return res.status(500).send({
      status: "error",
      message: error.message + " - " + error.stack,
      example: {
        name: "Firstname Lastname",
        position: "Professor",
        img: "Image file",
        wellcenter: {
          status: true,
          position: "Professor",
          availableDate: ["Monday", "Tuesday"],
          availableTime: ["08:00-09:00", "09:00-10:00"],
        },
      },
    });
  }
};

// PUT /personnels/:id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      engName,
      position,
      engPosition,
      wellcenterStatus,
      wellcenterPosition,
      wellcenterEngPosition,
      wellcenterDate,
      wellcenterTime,
      email,
      phone,
    } = req.body;
    if (!name || name === "") {
      return res.status(400).send({
        status: "error",
        message: "Name is required.",
      });
    }
    let wellcenter = {
      status: false,
      position: "",
      availableDate: [],
      availableTime: [],
    };
    if (wellcenterStatus) {
      const WDate = wellcenterDate?.split(",");
      const Time = wellcenterTime?.split(",");
      wellcenter = {
        status: wellcenterStatus,
        position: wellcenterPosition,
        engPosition: wellcenterEngPosition,
        availableDate: WDate,
        availableTime: Time,
      };
    }
    //find who created the activity
    const createdBy = req.userData?.username;
    //find _id of the user who created the activity
    const modifiedBy = Users.findOne({ username: createdBy });

    const changed = await Personnels.findByIdAndUpdate(
      id,
      {
        name,
        engName,
        position,
        engPosition,
        email,
        phone,
        wellcenter,
        updateAt: Date.now(),
        modifiedBy: modifiedBy._id,
      },
      { new: true }
    );

    console.log(req.files);
    //if image is included in request replace old image with new image with same name
    if (req.files) {
      const uploadedFile = req.files.img;
      const fileName = uploadedFile.name;
      const fileExtension = fileName.split(".").pop();
      const renameFile = `${uuidv4()}_${Date.now()}_profile.${fileExtension}`;
      const uploadPath = path.join(
        `${__dirname}/../public/images/personnels/${renameFile}`
      );
      console.log(uploadPath);
      uploadedFile.mv(uploadPath, async (err) => {
        if (err) {
          log(`Personnels`, err.message, "error");
          return res.status(500).send({
            status: "error",
            message: err.message + " - " + err.stack,
          });
        }
        //delete old image
        const personnels = await Personnels.findById(id);
        const imagePath = path.join(__dirname, `../public/${personnels.img}`);
        fs.unlink(imagePath, async (err) => {
          if (err) {
            log(`Personnels`, err.message, "error");
          }
        });
        //update new image
        await Personnels.findByIdAndUpdate(
          id,
          {
            img: `images/personnels/${renameFile}`,
          },
          { new: true }
        );
      });
    }
    log(`Personnels`, `Updated ${name}`);
    logger.info(`Personnels`, `Updated ${name}`);
    return res.status(200).send({
      status: "success",
      message: `Updated ${name}`,
      data: changed,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: error.message,
      example: {
        name: "Firstname Lastname",
        position: "Professor",
        wellcenter: {
          status: true,
          position: "Professor",
          availableDate: ["Monday", "Tuesday"],
          availableTime: ["08:00-09:00", "09:00-10:00"],
        },
      },
    });
  }
};

// DELETE /personnels/:id
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const personnels = await Personnels.findById(id);
    if (!personnels) {
      return res.status(400).send({
        status: "error",
        message: "Personnels not found.",
      });
    }
    //delete image
    const imagePath = path.join(__dirname, `../public/${personnels.img}`);
    fs.unlink(imagePath, async (err) => {
      if (err) {
        log(`Personnels`, err.message, "error");
      }
    });

    await Personnels.findByIdAndDelete(id);
    log(`Personnels`, `Deleted ${personnels.name}`);
    logger.info(`Personnels`, `Deleted ${personnels.name}`);
    return res.status(200).send({
      status: "success",
      message: `Deleted ${personnels.name}`,
    });
  } catch (error) {
    log(`Personnels`, error.message, "error");
    return res.status(500).send({
      status: "error",
      message: error.message + " - " + error.stack,
    });
  }
};

// GET /personnels
exports.findAll = async (req, res) => {
  try {
    const personnels = await Personnels.find();
    return res.status(200).send({
      status: "success",
      message: "Get all personnels",
      data: personnels,
    });
  } catch (error) {
    log(`Personnels`, error.message, "error");
    return res.status(500).send({
      status: "error",
      message: error.message + " - " + error.stack,
    });
  }
};

// GET /personnels/:id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const personnels = await Personnels.findById(id);
    if (!personnels) {
      return res.status(400).send({
        status: "error",
        message: "Personnels not found.",
      });
    }
    return res.status(200).send({
      status: "success",
      message: "Get personnels",
      data: personnels,
    });
  } catch (error) {
    log(`Personnels`, error.message, "error");
    return res.status(500).send({
      status: "error",
      message: error.message + " - " + error.stack,
    });
  }
};
