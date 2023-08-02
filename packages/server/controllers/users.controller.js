const bcrypt = require("bcryptjs");
const saltRound = Number(process.env.SALTROUND);
const User = require("../models/Users.js");
const { log } = require("../logger.js");

// Create a new user
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        message: "User content cannot be empty",
      });
    }

    // Create a User object from the request body
    const user = new User({
      username: req.body.username || "Untitled User",
      password: bcrypt.hashSync(req.body.password, saltRound),
    });

    // Save the user in the database
    const data = await user.save();
    res.status(201).send({
      message: "User created successfully",
      data:{
        username: data.username,
      }
    }); // Send the saved user data with status 201 (Created)
    log("User", `${req.body.username} registered!`, "info");
  } catch (err) {
    // Handle errors if any occurred during the creation process
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
    log("User", `${req.body.username} failed to register!`, "error");
  }
};

// Retrieve all users
exports.findAll = async (req, res) => {
  try {
    // Find all users, sort by 'createdAt' field in descending order, exclude 'password' field
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .exec();
    res.status(200).send(users); // Send the list of users with status 200 (OK)
    log("User", `All users retrieved!`);
  } catch (err) {
    // Handle errors if any occurred during the retrieval process
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users.",
    });
    log("User", `Failed to retrieve users!`, "error");
  }
};

// Retrieve a single user by their userId
exports.findOne = async (req, res) => {
  try {
    // Find the user with the provided 'userId', exclude 'password' field
    const user = await User.findById(req.params.userId)
      .select("-password")
      .exec();

    // If user not found, return a 404 response
    if (!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }

    res.status(200).send(user); // Send the user data with status 200 (OK)
    console.log(user); // Log the user data
  } catch (err) {
    // Handle errors if any occurred during the retrieval process
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }
    res.status(500).send({
      message: "Error retrieving user with id " + req.params.userId,
    });
    console.error(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.findOne({username:username})
    .exec()
    .then((user)=>{
      if(!user){
        return res.status(404).send({
          message: "User not found with id " + req.body.username,
        });
      }
      bcrypt.compare(password, user.password, (err, result)=>{
        if(err){
          log("User", `${req.body.username} password do not match!`, "error")
          return res.status(401).send({
            message: "Auth failed"
          });
        }
        if(result){
          log("User", `${req.body.username} logged in!`, "log")
          return res.status(200).send({message: "Login successful", username: user.username, role: user.role, token:`SomeTokenHere!`});
        }
        log("User", `${req.body.username} failed to login!`, "error")
        return res.status(401).send({
          message: "Auth failed"
        });
      });
    });
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving user with id " + req.body.username,
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
        message: "User content cannot be empty",
      });
    }

    // Find the user by 'userId' and update their information with the request body
    const user = await User.findByIdAndUpdate(
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
        message: "User not found with id " + req.params.userId,
      });
    }

    res.status(200).send(user); // Send the updated user data with status 200 (OK)
    console.log(user); // Log the updated user data
  } catch (err) {
    // Handle errors if any occurred during the update process
    if (err.kind === "ObjectId") {
      return res.status(404).send({
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
    const user = await User.findByIdAndRemove(req.params.userId).exec();

    // If user not found, return a 404 response
    if (!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }

    res.status(200).send({ message: "User deleted successfully!" }); // Send a success message with status 200 (OK)
    console.log({ message: "User deleted successfully!" }); // Log the success message
  } catch (err) {
    // Handle errors if any occurred during the deletion process
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }
    res.status(500).send({
      message: "Could not delete user with id " + req.params.userId,
    });
    console.error(err);
  }
};
