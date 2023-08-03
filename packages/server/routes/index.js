/**
 * @swagger
 * tags:
 *   name: Main
 *   description: Main page of API server and API documentation
 * 
 * /:
 *   get:
 *     summary: Main page of API server
 *     description: This is the main page of the API server for the GEP SWU Website. You can find all the API documentation here.
 *     tags: [Main]
 *     responses:
 *       200:
 *         description: Successfully rendered the main page.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * tags:
 *   name: Documentation
 *   description: API documentation
 * 
 * /docs:
 *   get:
 *     summary: API documentation page
 *     description: This is the API documentation page of the API server for the GEP SWU Website. You can find all the API documentation here.
 *     tags: [Documentation]
 *     responses:
 *       200:
 *         description: Successfully rendered the API documentation page.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check
 * 
 * /health:
 *   get:
 *     summary: Health check page
 *     description: This is the health check page of the API server for the GEP SWU Website. You can check if the server is running or not here.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the server.
 *                   example: OK
 *                 message:
 *                   type: string
 *                   description: Status message.
 *                   example: Server is running
 *       500:
 *         description: Internal server error.
 */

const express = require("express");
const router = express.Router();

// Middleware
const identifyIP = require("../middlewares/ipidentify");

router.get("/", identifyIP, async (req, res, next) => {
  res.locals.userAgent = req.get("User-Agent");
  res.render("index", { title: "GEP-SWU Server" });
});

router.get("/health", async (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
  });
});

module.exports = router;
