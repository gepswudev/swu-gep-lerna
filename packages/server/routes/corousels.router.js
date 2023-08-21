const express = require('express');
const router = express.Router();
const corousels = require('../controllers/corousels.controller');
const { tokenize } = require('../middlewares/tokenize');
const auth = require('../middlewares/auth');

router.get('/', corousels.findAll);
router.get('/:id', corousels.findOne);
router.post('/', tokenize, auth, corousels.create);
router.put('/:id', tokenize, auth, corousels.update);
router.delete('/:id', tokenize, auth, corousels.delete);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Corousels
 *   description: API for managing corousels
 */

/**
 * @swagger
 * /corousels:
 *   post:
 *     summary: Create a new corousel
 *     tags: [Corousels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the corousel (required).
 *               img:
 *                 type: string
 *                 description: The image URL of the corousel.
 *               url:
 *                 type: string
 *                 description: The URL associated with the corousel.
 *             example:
 *               name: Example Corousel
 *               img: https://example.com/image.jpg
 *               url: https://example.com
 *     responses:
 *       201:
 *         description: Corousels created successfully
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
 *                   example: Corousels created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Corousels'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Name is required
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /corousels:
 *   get:
 *     summary: Retrieve all corousels
 *     tags: [Corousels]
 *     responses:
 *       200:
 *         description: Corousels retrieved successfully
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
 *                   example: Corousels retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Corousels'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /corousels/{id}:
 *   get:
 *     summary: Get a single corousel by ID
 *     tags: [Corousels]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the corousel
 *         required: true
 *         schema:
 *           type: string
 *         example: 615e43f8a536e5210a501481
 *     responses:
 *       200:
 *         description: Corousels retrieved successfully
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
 *                   example: Corousels retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Corousels'
 *       404:
 *         description: Corousels not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Corousels not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /corousels/{id}:
 *   put:
 *     summary: Update a corousel by ID
 *     tags: [Corousels]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the corousel
 *         required: true
 *         schema:
 *           type: string
 *         example: 615e43f8a536e5210a501481
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 description: The updated image URL of the corousel.
 *             example:
 *               img: https://example.com/new-image.jpg
 *     responses:
 *       200:
 *         description: Corousels updated successfully
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
 *                   example: Corousels updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Corousels'
 *       404:
 *         description: Corousels not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Corousels not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /corousels/{id}:
 *   delete:
 *     summary: Delete a corousel by ID
 *     tags: [Corousels]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the corousel
 *         required: true
 *         schema:
 *           type: string
 *         example: 615e43f8a536e5210a501481
 *     responses:
 *       200:
 *         description: Corousels deleted successfully
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
 *                   example: Corousels deleted successfully
 *       404:
 *         description: Corousels not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Corousels not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Corousels:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           example: 615e43f8a536e5210a501481
 *         name:
 *           type: string
 *           example: Example Corousel
 *         img:
 *           type: string
 *           example: https://example.com/image.jpg
 *         url:
 *           type: string
 *           example: https://example.com
 *         createAt:
 *           type: string
 *           format: date-time
 *           example: "2023-08-03T12:34:56.789Z"
 *         updateAt:
 *           type: string
 *           format: date-time
 *           example: "2023-08-03T12:34:56.789Z"
 */
