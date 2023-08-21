const fs = require("fs");
const path = require("path");

const logger = require("../database/logger");
const { log } = require("../logger");
const Activities = require("../models/Activities");
const Users = require("../models/Users");

// Create a new activity
exports.create = async (req, res) => {
  const { title, desc, href, badge, tag } = req.body;

  try {
    //Validate file input
    const degree = req.body?.degree.split(",");
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({
        status: "error",
        message: "Image files were not uploaded.",
      });
    }
    if (!title || title === "") {
      return res.status(400).send({
        status: "error",
        message: "Title is required.",
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

    const uploadedFile = req.files.img;
    const fileName = uploadedFile.name;

    const fileExtension = fileName.split(".").pop();

    const renameFile = `${title.trim().substring(0,20)}_${Date.now()}.${fileExtension}`;
    const uploadPath = `${__dirname}/../public/images/activities/${renameFile}`;
    // Use the mv() method to place the file somewhere on your server
    // For simplicity, we'll save the file in the "files" directory in the project root
    uploadedFile.mv(uploadPath, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          status: "error",
          message: err.message,
        });
      }
      log(`Activities`, `File uploaded successfully: ${uploadPath}`);

      //find who created the activity
      const createdBy = req.userData?.username;
      //find _id of the user who created the activity
      const modifiedBy = Users.findOne({ username: createdBy });

      // Create a new instance of the Activities model
      const newActivities = new Activities({
        title,
        desc,
        img: `images/activities/${renameFile}`,
        href,
        badge,
        tag,
        degree,
        modifiedBy: modifiedBy._id,
      });
      

      // Save the new activity to the database
      const activities = await newActivities.save();

      logger.info(
        `Activities ${title} created by ${req.userData?.username} with image ${renameFile}`
      );
      res.status(201).send({
        status: "success",
        message: `Activities ${title} created successfully`,
        data: activities,
      });
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
  const { title, desc, href, badge, tag } = req.body;
  try {
    const degree = req.body?.degree.split(",");
    if (!title || title === "") {
      return res.status(400).send({
        status: "error",
        message: "Title is required.",
      });
    }

    //check if the activity with the given title already exists and not the same id
    const isExist = await Activities.findOne({
      title,
      _id: { $ne: req.params.id },
    });
    if (isExist) {
      return res.status(400).send({
        status: "error",
        message: `Activities ${title} already exists`,
      });
    }

    //find who created the activity
    const createdBy = req.userData?.username;
    //find _id of the user who created the activity
    const modifiedBy = Users.findOne({ username: createdBy });

    // Find the activity by ID and update its properties
    const activities = await Activities.findByIdAndUpdate(
      req.params.id,
      {
        title,
        desc,
        href,
        badge,
        updateAt: Date.now(),
        tag,
        degree,
        modifiedBy: modifiedBy._id,
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

    //if image is included in request replace old image with new image with same name
    if (req.files) {
      const uploadedFile = req.files.img;
      const fileName = uploadedFile.name;
      const fileExtension = fileName.split(".").pop();
      const renameFile = `${title.trim().replace(/\s/g, '_').substring(0,20)}_${Date.now()}.${fileExtension}`;
      const uploadPath = `${__dirname}/../public/images/activities/${renameFile}`;
      console.log(uploadPath);
      uploadedFile.mv(uploadPath, async (err) => {
        if (err) {
          log(`Activities`, err.message, "error");
          return res.status(500).send({
            status: "error",
            message: err.message + " - " + err.stack,
          });
        }
        log(`Activities`, `File uploaded successfully: ${uploadPath}`);
        //delete old image
        const activities = await Activities.findById(req.params.id);
        const imagePath = path.join(__dirname, `../public/${activities.img}`);
        fs.unlink(imagePath, async (err) => {
          if (err) {
            log(`Activities`, err.message, "error");
          }
        });
        //update new image
        await Activities.findByIdAndUpdate(
          req.params.id,
          {
            img: `images/activities/${renameFile}`,
          },
          { new: true }
        );
      });
    }

    logger.update(
      `Activities ${activities.title} updated by ${req.userData?.username}`
    );
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

    // Delete the image file from the server
    const uploadPath = `${__dirname}/../public/${activities.img}`;
    //check if the file exists
    if (fs.existsSync(uploadPath) && !activities.img.includes("default.png")) {
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
      `Activities ${activities.title} deleted by ${req.userData?.username}`
    );
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

//activities view count
exports.view = async (req, res) => {
  try {
    // Find the activity by ID and update its properties
    const activities = await Activities.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
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
