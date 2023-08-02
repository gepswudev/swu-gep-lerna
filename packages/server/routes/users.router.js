const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

// Define the routes using the controller functions
router.post('/register', userController.create); // Create a new user
router.get('/', userController.findAll); // Retrieve all users
router.post('/login', userController.login); // Retrieve a single user by their userId
router.put('/:userId', userController.update); // Update a user by their userId
router.delete('/:userId', userController.delete); // Delete a user by their userId

module.exports = router;

// Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: The unique identifier for the user.
 *         username:
 *           type: string
 *           description: The username of the user (must be unique).
 *         password:
 *           type: string
 *           description: The password of the user.
 *         role:
 *           type: string
 *           description: The role of the user. Default is 'user'.
 *         createAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created.
 *         updateAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was last updated.
 *       example:
 *         uid: "5d20a70a-efb3-4f68-b5e5-0eae4b50ecfb"
 *         username: "john_doe"
 *         password: "secretpassword"
 *         role: "admin"
 *         createAt: "2023-07-30T12:34:56Z"
 *         updateAt: "2023-07-30T12:34:56Z"
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided username and password.
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
 *                 description: The username of the user (must be unique).
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: secretpassword
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: User content cannot be empty
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Some error occurred while creating the User.
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with their credentials (username and password) and generate an authentication token.
 *     tags:
 *       - Authentication
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
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: secretpassword
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 username:
 *                   type: string
 *                   example: john_doe
 *                 role:
 *                   type: string
 *                   example: user
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: Auth failed
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found with id john_doe
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Error retrieving user with id john_doe
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users sorted by the 'createdAt' field in descending order. Passwords are excluded from the response.
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: OK
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
 *             example:
 *               message: Some error occurred while retrieving users.
 */
/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a single user by userId
 *     description: Retrieve a user by their userId. The password is excluded from the response.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the user to retrieve.
 *         example: 5d20a70a-efb3-4f68-b5e5-0eae4b50ecfb
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found with id 5d20a70a-efb3-4f68-b5e5-0eae4b50ecfb
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Error retrieving user with id 5d20a70a-efb3-4f68-b5e5-0eae4b50ecfb
 */
/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update a user by userId
 *     description: Update a user's information identified by their userId. The password must be provided in the request body.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the user to update.
 *         example: 5d20a70a-efb3-4f68-b5e5-0eae4b50ecfb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The updated username of the user.
 *                 example: updated_john_doe
 *               password:
 *                 type: string
 *                 description: The updated password of the user.
 *                 example: updatedsecretpassword
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: User content cannot be empty
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found with id 5d20a70a-efb3-4f68-b5e5-0eae4b50ecfb
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Error updating user with id 5d20a70a-efb3-4f68-b5e5-0eae4b50ecfb
 */
/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user by userId
 *     description: Delete a user identified by their userId.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the user to delete.
 *         example: 5d20a70a-efb3-4f68-b5e5-0eae4b50ecfb
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               message: User deleted successfully!
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found with id 5d20a70a-efb3-4f68-b5e5-0eae4b50ecfb
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Could not delete user with id 5d20a70a-efb3-4f68-b5e5-0eae4b50ecfb
 */
