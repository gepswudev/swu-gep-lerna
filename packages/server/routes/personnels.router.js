const express = require('express');
const router = express.Router();
const { tokenize } = require('../middlewares/tokenize');
const personnels = require('../controllers/personnels.controller');

router.get('/', personnels.findAll);
router.get('/:id', personnels.findOne);
router.post('/', personnels.create);
router.put('/:id', tokenize, personnels.update);
router.delete('/:id', tokenize, personnels.delete);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Personnels:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           example: "2f6e4c1d-95c0-4b67-b292-9664db784675"
 *         name:
 *           type: string
 *           example: "John Doe"
 *           required: true
 *         wellcenter:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             position:
 *               type: string
 *               example: "Center Manager"
 *             availableDate:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "Monday"
 *             availableTime:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "08:00-09:00"
 *         position:
 *           type: string
 *           example: "Manager"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "error"
 *         message:
 *           type: string
 *           example: "An error occurred."
 *         example:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe"
 *             position:
 *               type: string
 *               example: "Manager"
 *             wellcenter:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 position:
 *                   type: string
 *                   example: "Manager"
 *                 availableDate:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Monday"
 *                 availableTime:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "08:00-09:00"
 */

/**
 * @swagger
 * tags:
 *   name: Personnels
 *   description: APIs for managing personnels
 */

/**
 * @swagger
 * /personnels:
 *   post:
 *     summary: Create a new personnel
 *     tags: [Personnels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               wellcenter:
 *                 type: object
 *             example:
 *               name: Firstname Lastname
 *               position: Professor
 *               wellcenter:
 *                 status: true
 *                 position: Professor
 *                 availableDate: ["Monday", "Tuesday"]
 *                 availableTime: ["08:00-09:00", "09:00-10:00"]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *             example:
 *               status: success
 *               message: Created Firstname Lastname
 *               data:
 *                 name: Firstname Lastname
 *                 position: Professor
 *                 wellcenter:
 *                   status: true
 *                   position: Professor
 *                   availableDate: ["Monday", "Tuesday"]
 *                   availableTime: ["08:00-09:00", "09:00-10:00"]
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /personnels/{id}:
 *   put:
 *     summary: Edit a personnel by ID
 *     tags: [Personnels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the personnel to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               wellcenter:
 *                 type: object
 *             example:
 *               name: Firstname Lastname
 *               position: Professor
 *               wellcenter:
 *                 status: true
 *                 position: Professor
 *                 availableDate: ["Monday", "Tuesday"]
 *                 availableTime: ["08:00-09:00", "09:00-10:00"]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: success
 *               message: Updated Firstname Lastname
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /personnels/{id}:
 *   delete:
 *     summary: Delete a personnel by ID
 *     tags: [Personnels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the personnel to delete
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: success
 *               message: Deleted Firstname Lastname
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /personnels:
 *   get:
 *     summary: Get all personnels
 *     tags: [Personnels]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Personnel'
 *             example:
 *               status: success
 *               message: Get all personnels
 *               data: []
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /personnels/{id}:
 *   get:
 *     summary: Get a personnel by ID
 *     tags: [Personnels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the personnel to fetch
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Personnel'
 *             example:
 *               status: success
 *               message: Get personnel
 *               data:
 *                 name: Firstname Lastname
 *                 position: Professor
 *                 wellcenter:
 *                   status: true
 *                   position: Professor
 *                   availableDate: ["Monday", "Tuesday"]
 *                   availableTime: ["08:00-09:00", "09:00-10:00"]
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
