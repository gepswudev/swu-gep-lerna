const logger = require("../database/logger");
const Corousels = require("../models/Corousels");

// Create a new corousel
exports.create = async (req, res) => {
  const { name, img, url } = req.body;
  try {
    // Validate input data here if required
    if (!name) {
      return res.status(400).send({
        status: "error",
        message: "Name is required",
      });
    }
    //img and url is not required so we don't validate them

    // Check if the corousel with the given name already exists
    const isExist = await Corousels.findOne({ name });
    if (isExist) {
      return res.status(400).send({
        status: "error",
        message: `Corousels ${name} already exists`,
      });
    }
    // Create a new instance of the Corousels model
    const newCorousels = new Corousels({ name, img, url });
    // Save the new corousel to the database
    const corousels = await newCorousels.save();
    res.status(201).send({
      status: "success",
      message: "Corousels created successfully",
      data: corousels,
    });
  } catch (error) {
    // Handle any errors that occur during the creation process
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// Find all corousels and sort them by createdAt in descending order
exports.findAll = async (req, res) => {
  try {
    const corousels = await Corousels.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      status: "success",
      message: "Corousels retrieved successfully",
      data: corousels,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// Find a single corousel by ID
exports.findOne = async (req, res) => {
  try {
    const corousels = await Corousels.findById(req.params.id);
    if (!corousels) {
      return res.status(404).send({
        status: "error",
        message: "Corousels not found",
      });
    }
    res.status(200).send({
      status: "success",
      message: "Corousels retrieved successfully",
      data: corousels,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// Update a corousel by ID
exports.update = async (req, res) => {
  try {
    // Find the corousel with the given ID
    if(req.body.createdAt) delete(req.body.createdAt)
    if(req.body.updateAt) delete(req.body.updateAt)
    
    const corousels = await Corousels.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updateAt: Date.now(),
      },
      {
        new: true,
      }
    );
    if (!corousels) {
      return res.status(404).send({
        status: "error",
        message: "Corousels not found",
      });
    }
    logger.update(`Corousels ${corousels.name} updated by ${req.userData?.username}`);
    res.status(200).send({
      status: "success",
      message: "Corousels updated successfully",
      data: corousels,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// Delete a corousel by ID
exports.delete = async (req, res) => {
  try {
    // Find the corousel with the given ID and remove it from the database
    const corousels = await Corousels.findByIdAndRemove(req.params.id);
    if (!corousels) {
      return res.status(404).send({
        status: "error",
        message: "Corousels not found",
      });
    }
    logger.delete(`Corousels ${corousels.name} deleted by ${req.userData?.username}`);
    res.status(200).send({
      status: "success",
      message: "Corousels deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};
