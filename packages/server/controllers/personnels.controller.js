const Personnels = require("../models/Personnels");
const logger = require("../database/logger");
const { log } = require("../logger");

// POST /personnels
exports.create = async (req, res) => {
  try {
    const { name, position, wellcenter } = req.body;
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
    const newPersonnels = new Personnels({
      name,
      position,
      wellcenter,
    });
    await newPersonnels.save();
    log(`Personnels`, `Created ${name}`);
    logger.info(`Personnels`, `Created ${name}`);
    return res.status(200).send({
      status: "success",
      message: `Created ${name}`,
      data: newPersonnels,
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

// PUT /personnels/:id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, wellcenter } = req.body;
    if (!name || name === "") {
      return res.status(400).send({
        status: "error",
        message: "Name is required.",
      });
    }
    const changed = await Personnels.findByIdAndUpdate(
      id,
      {
        ...req.body,
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
