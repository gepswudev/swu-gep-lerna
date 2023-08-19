const Personnels = require("../models/Personnels");
const logger = require("../database/logger");
const { log } = require("../logger");

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

    const { name, position, wellcenter, email, phone } = req.body;
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
    const renameFile = `${name
      .replace(" ", "_")
      .trim()}_profile.${fileExtension}`;
      const uploadPath = `${__dirname}/../public/images/personnels/${renameFile}`;
    uploadedFile.mv(uploadPath, async (err) => {
      if (err) {
        log(`Personnels`, err.message, "error");
        return res.status(500).send({
          status: "error",
          message: err.message + " - " + err.stack,
        });
      }

      const newPersonnels = new Personnels({
        name,
        position,
        wellcenter,
        email,
        phone,
        img: `images/personnels/${renameFile}`,
      });

      const personnel = await newPersonnels.save();
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
    const { name, position, wellcenter, email, phone } = req.body;
    if (!name || name === "") {
      return res.status(400).send({
        status: "error",
        message: "Name is required.",
      });
    }
    const changed = await Personnels.findByIdAndUpdate(
      id,
      {
        name,
        position,
        email, 
        phone,
        wellcenter,
        updateAt: Date.now(),
      },
      { new: true }
    );
    log(`Personnels`, `Updated ${name}`);
    logger.info(`Personnels`, `Updated ${name}`);
    return res.status(200).send({
      status: "success",
      message: `Updated ${name}`,
      data: changed,
    });
  } catch (error) {
    log(`Personnels`, error.message, "error");
    return res.status(500).send({
      status: "error",
      message: error.message + " - " + error.stack,
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
