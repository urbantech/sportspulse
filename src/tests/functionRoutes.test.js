const express = require('express');
const router = express.Router();
const functionController = require('../controllers/functionController');

/**
 * @swagger
 * /api/functions:
 *   post:
 *     summary: Create a new function
 *     description: Create a new function
 *     responses:
 *       201:
 *         description: Function created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', functionController.createFunction);

/**
 * @swagger
 * /api/functions/{id}:
 *   put:
 *     summary: Update an existing function
 *     description: Update an existing function by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the function to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: function
 *         required: true
 *         description: Function data to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: Function updated successfully
 *       404:
 *         description: Function not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', functionController.updateFunction);

module.exports = router;
