const express = require('express');
const router = express.Router();
const FunctionModel = require('../models/functionModel');

/**
 * @swagger
 * components:
 *   schemas:
 *     Function:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the function
 *         description:
 *           type: string
 *           description: The description of the function
 *       example:
 *         name: Test Function
 *         description: This is a test function
 */

/**
 * @swagger
 * /api/functions/{id}:
 *   put:
 *     summary: Update an existing function
 *     tags: [Functions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The function id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Function'
 *     responses:
 *       200:
 *         description: The function was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Function'
 *       404:
 *         description: The function was not found
 */

router.put('/:id', async (req, res) => {
  try {
    const functionModel = await FunctionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!functionModel) {
      return res.status(404).json({ error: 'Function not found' });
    }
    res.status(200).json(functionModel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
