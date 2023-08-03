const logger = require("../database/logger");
const Activities = require("../models/Activities");

// Create a new activity
exports.create = async (req, res) => {
  const { title, desc, img, href, badge } = req.body;
  try {
    // Create a new instance of the Activities model
    const newActivities = new Activities({
      title,
      desc,
      img,
      href,
      badge,
    });

    // Validate input data here if required
    if (!title) {
      return res.status(400).send({
        status: "error",
        message: "Title is required",
      });
    }

    //check if the activity with the given title already exists
    const isExist = await Activities.findOne({ title });
    if (isExist) {
      return res.status(400).send({
        status: "error",
        message: `Activities ${title} already exists`,
      });
    }

    // Save the new activity to the database
    const activities = await newActivities.save();
    res.status(201).send({
      status: "success",
      message: "Activities created successfully",
      data: activities,
    });
  } catch (error) {
    // Handle any errors that occur during the creation process
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// Retrieve all activities sorted by creation date
exports.findAll = async (req, res) => {
  try {
    // Find all activities and sort them by createdAt in descending order
    const activities = await Activities.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      status: "success",
      message: "Activities retrieved successfully",
      data: activities,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// Find a single activity by ID
exports.findOne = async (req, res) => {
  try {
    const activities = await Activities.findById(req.params.id);
    if (!activities) {
      // If the activity with the given ID is not found, return a 404 error
      return res.status(404).send({
        status: "error",
        message: "Activities not found",
      });
    }
    res.status(200).send({
      status: "success",
      message: "Activities retrieved successfully",
      data: activities,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// Update an existing activity by ID
exports.update = async (req, res) => {
  const { title, desc, img, href, badge } = req.body;
  try {
    // Find the activity by ID and update its properties
    const activities = await Activities.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updateAt: Date.now(),
      },
      {
        new: true,
      }
    );
    if (!activities) {
      // If the activity with the given ID is not found, return a 404 error
      return res.status(404).send({
        status: "error",
        message: "Activities not found",
      });
    }
    logger.update(`Activities ${activities.title} updated by ${req.userData?.username}`);
    res.status(200).send({
      status: "success",
      message: "Activities updated successfully",
      data: activities,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// Delete an activity by ID
exports.delete = async (req, res) => {
  try {
    // Find the activity by ID and remove it from the database
    const activities = await Activities.findByIdAndRemove(req.params.id);
    if (!activities) {
      // If the activity with the given ID is not found, return a 404 error
      return res.status(404).send({
        status: "error",
        message: "Activities not found",
      });
    }
    logger.delete(`Activities ${activities.title} deleted by ${req.userData?.username}`);
    res.status(200).send({
      status: "success",
      message: "Activities deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};
