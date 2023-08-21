const express = require('express');
const router = express.Router();
const activities = require('../controllers/activities.controller');
const { tokenize } = require('../middlewares/tokenize');
const auth = require('../middlewares/auth');

// Create a new activity
router.get('/', activities.findAll);
router.get('/:id', activities.findOne);
router.post('/', tokenize, auth, activities.create);
router.put('/:id', tokenize, auth, activities.update);
router.delete('/:id', tokenize, auth, activities.delete);
router.get('/view/:id', activities.view);

module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Activities:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: The unique identifier of the activity.
 *         title:
 *           type: string
 *           description: The title of the activity.
 *           required: true
 *         desc:
 *           type: string
 *           description: The description of the activity.
 *         img:
 *           type: string
 *           description: The image URL of the activity.
 *         href:
 *           type: string
 *           description: The URL link of the activity.
 *         badge:
 *           type: string
 *           description: The badge of the activity.
 *         createAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the activity.
 *         updateAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the activity.
 */

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: API endpoints for managing activities.
 */

/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Create a new activity.
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activities'
 *     responses:
 *       '201':
 *         description: Successfully created a new activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activities'
 *       '500':
 *         description: Internal server error. Failed to create the activity.
 */

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Retrieve all activities.
 *     tags: [Activities]
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of activities.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Activities retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Activities'
 *       '500':
 *         description: Internal server error. Failed to retrieve activities.
 */

/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     summary: Retrieve an activity by ID.
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the activity to retrieve.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activities'
 *       '404':
 *         description: Activity not found.
 *       '500':
 *         description: Internal server error. Failed to retrieve the activity.
 */

/**
 * @swagger
 * /activities/{id}:
 *   put:
 *     summary: Update an activity by ID.
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the activity to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activities'
 *     responses:
 *       '200':
 *         description: Successfully updated the activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activities'
 *       '404':
 *         description: Activity not found.
 *       '500':
 *         description: Internal server error. Failed to update the activity.
 */

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     summary: Delete an activity by ID.
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the activity to delete.
 *     responses:
 *       '200':
 *         description: Successfully deleted the activity.
 *       '404':
 *         description: Activity not found.
 *       '500':
 *         description: Internal server error. Failed to delete the activity.
 */
