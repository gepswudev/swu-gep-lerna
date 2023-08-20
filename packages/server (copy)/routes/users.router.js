const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const { tokenize } = require('../middlewares/tokenize');
const identifyIP = require('../middlewares/ipidentify');

router.post('/register', userController.create); 
router.get('/', userController.findAll); 
router.post('/login', userController.login); 
router.put('/:userId', userController.update); 
router.delete('/:userId', userController.delete); 
router.get('/auth', identifyIP ,tokenize ,userController.auth); 

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for users system.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *         username:
 *           type: string
 *         role:
 *           type: string
 *         createAt:
 *           type: string
 *           format: date-time
 *         updateAt:
 *           type: string
 *           format: date-time
 *       example:
 *         uid: "d2e4a1f1-d0e9-4e53-87e2-5c540e8a4511"
 *         username: "example_user"
 *         role: "user"
 *         createAt: "2023-08-02T12:34:56Z"
 *         updateAt: "2023-08-02T12:34:56Z"
 *
 * /users/register:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "example_user"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "password123"
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: "User created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "User content cannot be empty"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "Some error occurred while creating the User."
 * /users/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "example_user"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: "Login successful"
 *                 username:
 *                   type: string
 *                   description: The username of the logged-in user.
 *                   example: "example_user"
 *                 role:
 *                   type: string
 *                   description: The role of the logged-in user.
 *                   example: "user"
 *                 token:
 *                   type: string
 *                   description: An authentication token for the logged-in user.
 *                   example: "SomeTokenHere!"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "Auth failed"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "User not found with id {username}"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "Error retrieving user with id {username}"
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "Some error occurred while retrieving users."
 *
 * /users/{userId}:
 *   get:
 *     summary: Retrieve a single user by their userId
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "User not found with id {userId}"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "Error retrieving user with id {userId}"
 *   put:
 *     summary: Update a user by their userId
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username of the user.
 *                 example: "updated_user"
 *               password:
 *                 type: string
 *                 description: The new password of the user.
 *                 example: "new_password123"
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "User not found with id {userId}"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "Error updating user with id {userId}"
 *
 *   delete:
 *     summary: Delete a user by their userId
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: "User deleted successfully!"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "User not found with id {userId}"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: "Could not delete user with id {userId}"
 */