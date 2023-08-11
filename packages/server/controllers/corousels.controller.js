const logger = require("../database/logger");
const { log } = require("../logger");
const Corousels = require("../models/Corousels");
const sizeOf = require("image-size");
const fs = require("fs");

// Create a new corousel
exports.create = async (req, res) => {
  const { name, url } = req.body;
  try {
    // Validate file input
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({
        status: "error",
        message: "Image files were not uploaded.",
      });
    }

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

    // Get the uploaded file
    const uploadedFile = req.files.img;
    const fileName = uploadedFile.name;
    const fileExtension = fileName.split(".").pop();
    const renameFile = `${name.trim()}_${Date.now()}.${fileExtension}`;
    const uploadPath = `${__dirname}/../public/images/corousels/${renameFile}`;

    // Use the mv() method to place the file somewhere on your server
    // For simplicity, we'll save the file in the "uploads" directory in the project root
    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          status: "error",
          message: "Error occurred while uploading the file.",
        });
      }
      const dimensions = sizeOf(uploadPath);
      if (
        dimensions.width !== 1440 ||
        (dimensions.height < 600 && dimensions.height > 650)
      ) {
        fs.unlink(uploadPath, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              status: "error",
              message: "Error occurred while deleting the file.",
            });
          }
          log(`Corousels`, `File deleted successfully: ${uploadPath}`);
          logger.delete(
            `Corousels ${name} deleted by ${req.userData?.username}`
          );
        });
        return res.status(400).send({
          status: "error",
          message: "Image size must be 1440x600-650",
        });
      }
      log(`Corousels`, `File uploaded successfully: ${uploadPath}`);
    });

    //validate the image size width must be 1440 and height must be between 600 and 650

    const newCorousels = new Corousels({
      name,
      img: `images/corousels/${renameFile}`,
      url,
    });

    // Save the new corousel to the database
    const corousels = await newCorousels.save();
    res.status(201).send({
      status: "success",
      message: "Corousels created successfully",
      data: corousels,
    });
  } catch (error) {
    // Handle any errors that occur during the creation process
    console.error(error);
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
    if (req.body.createdAt) delete req.body.createdAt;
    if (req.body.updateAt) delete req.body.updateAt;
    if (req.body._id) delete req.body._id;
    if (req.body.__v) delete req.body.__v;
    if (req.body.img) delete req.body.img;

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
    logger.update(
      `Corousels ${corousels.name} updated by ${req.userData?.username}`
    );
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

    // Delete the file from the server if it exists
    const uploadPath = `${__dirname}/../public/${corousels.img}`;
    //check if the file exists
    if (fs.existsSync(uploadPath) && !corousels.img.includes("default.png")) {
      fs.unlink(uploadPath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            status: "error",
            message: "Error occurred while deleting the file.",
          });
        }
        log(`Corousels`, `File deleted successfully: ${uploadPath}`);
      });
    }

    logger.delete(
      `Corousels ${corousels.name} deleted by ${req.userData?.username}`
    );

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
