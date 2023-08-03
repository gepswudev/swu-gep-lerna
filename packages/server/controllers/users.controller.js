const bcrypt = require("bcryptjs");
const saltRound = Number(process.env.SALTROUND);
const Users = require("../models/Users.js");
const { log } = require("../logger.js");
const { generateToken, tokenize } = require("../middlewares/tokenize.js");
const logger = require("../database/logger");

// Create a new user from request body
exports.create = async (req, res) => {
  try {
    // Validate request
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        status: "error",
        message: "User content cannot be empty",
      });
    }

    // Check if user already exists
    const existsuser = await Users.findOne({
      username: req.body.username,
    }).exec();

    if (existsuser) {
      return res.status(409).send({
        status: "error",
        message: `This username: ${req.body?.username} already exists`,
      });
    }

    // Create a User object from the request body
    const user = new Users({
      username: req.body.username || "Untitled User",
      password: bcrypt.hashSync(req.body.password, saltRound),
    });

    // Save the user in the database
    const data = await user.save();
    log("User", `${req.body.username} registered!`, "info");
    logger.info(`${req.body.username} registered!`);
    return res.status(201).send({
      status: "success",
      message: "User created successfully",
      data: {
        username: data.username,
      },
    }); // Send the saved user data with status 201 (Created)
  } catch (err) {
    // Handle errors if any occurred during the creation process
    log("User", `${req.body.username} failed to register! `, "error");
    return res.status(500).send({
      status: "error",
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

// Controller to handle user login
exports.login = async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find the user by username in the Users collection
    await Users.findOne({ username: username })
      .exec()
      .then((user) => {
        // If the user is not found, send a 404 (Not Found) response
        if (!user) {
          return res.status(404).send({
            status: "error",
            message: "User not found with id " + req.body.username,
          });
        }

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            // If there's an error while comparing passwords, send a 401 (Unauthorized) response
            log("User", `${req.body.username} password do not match!`, "error");
            return res.status(401).send({
              status: "error",
              message: "Auth failed",
            });
          }

          // If the passwords match, generate a token for authentication
          if (result) {
            const token = generateToken({ username: user.username, role: user.role });

            // Send a 200 (OK) response with login successful message and user data
            log("User", `${req.body.username} logged in!`, "log");
            return res.status(200).send({
              status: "success",
              message: "Login successful",
              data: {
                username: user.username,
                role: user.role,
                token: token,
              },
            });
          }

          // If the passwords do not match, send a 401 (Unauthorized) response
          log("User", `${req.body.username} failed to login!`, "error");
          return res.status(401).send({
            status: "error",
            message: "Auth failed",
          });
        });
      });
  } catch (err) {
    // If an error occurs while processing the login, send a 500 (Internal Server Error) response
    res.status(500).send({
      status: "error",
      message: "Error retrieving user with id " + req.body.username,
    });
    console.error(err);
  }
};

exports.auth = async (req, res) => {
  try {
    if(req.userData.role === 'admin'){
      return res.status(200).send({
        status: "success",
        message: "Authorized as Admin",
        data: {
          username: req.userData.username,
          role: req.userData.role,
          loginExp: req.userData.expDate,
          redirect: '/admin'
        },
      });
    }
    return res.status(401).send({
      status: "error",
      message: "Unauthorized as Admin",
      data: {
        username: req.userData.username,
        role: req.userData.role,
        loginExp: req.userData.expDate,
        redirect: '/'
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: "error",
      message: "Unauthorized",
      data: {
        redirect: '/login'
      },
    });
  }
};

// Retrieve all users
exports.findAll = async (req, res) => {
  try {
    // Find all users, sort by 'createdAt' field in descending order, exclude 'password' field
    const users = await Users.find({})
      .sort({ createdAt: -1 })
      .select("-password");
    res.status(200).send({
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    }); // Send the list of users with status 200 (OK)
    log("User", `All users retrieved!`);
  } catch (err) {
    // Handle errors if any occurred during the retrieval process
    res.status(500).send({
      status: "error",
      message: err.message || "Some error occurred while retrieving users.",
    });
    log("User", `Failed to retrieve users!`, "error");
    console.error(err);
  }
};

// Retrieve a single user by their userId
exports.findOne = async (req, res) => {
  try {
    // Find the user with the provided 'userId', exclude 'password' field
    const user = await Users.findById(req.params.userId)
      .select("-password")
      .exec();

    // If user not found, return a 404 response
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found with id " + req.params.userId,
      });
    }

    res.status(200).send(user); // Send the user data with status 200 (OK)
    console.log(user); // Log the user data
  } catch (err) {
    // Handle errors if any occurred during the retrieval process
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        status: "error",
        message: "User not found with id " + req.params.userId,
      });
    }
    res.status(500).send({
      status: "error",
      message: "Error retrieving user with id " + req.params.userId,
    });
    console.error(err);
  }
};



// Update a user by their userId
exports.update = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        status: "error",
        message: "User content cannot be empty",
      });
    }

    // Find the user by 'userId' and update their information with the request body
    const user = await Users.findByIdAndUpdate(
      req.params.userId,
      {
        username: req.body.username || "Untitled User",
        password: req.body.password,
      },
      { new: true }
    ).exec();

    // If user not found, return a 404 response
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found with id " + req.params.userId,
      });
    }

    res.status(200).send({
      status: "success",
      message: "User updated successfully",
      data: user,
    }); // Send the updated user data with status 200 (OK)
    console.log(user); // Log the updated user data
  } catch (err) {
    // Handle errors if any occurred during the update process
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        status: "error",
        message: "User not found with id " + req.params.userId,
      });
    }
    res.status(500).send({
      message: "Error updating user with id " + req.params.userId,
    });
    console.error(err);
  }
};

// Delete a user by their userId
exports.delete = async (req, res) => {
  try {
    // Find the user by 'userId' and remove them from the database
    const user = await Users.findByIdAndRemove(req.params.userId).exec();

    // If user not found, return a 404 response
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found with id " + req.params.userId,
      });
    }
    logger.delete(`User ${user.username} deleted by ${req.userData?.username}`);
    res
      .status(200)
      .send({ status: "success", message: "User deleted successfully!" }); // Send a success message with status 200 (OK)
    console.log({ message: "User deleted successfully!" }); // Log the success message
  } catch (err) {
    // Handle errors if any occurred during the deletion process
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        status: "error",
        message: "User not found with id " + req.params.userId,
      });
    }
    res.status(500).send({
      status: "error",
      message: "Could not delete user with id " + req.params.userId,
    });
    console.error(err);
  }
};
