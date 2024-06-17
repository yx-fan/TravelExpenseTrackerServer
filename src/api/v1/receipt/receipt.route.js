const express = require('express');
const multer = require('multer');
const ReceiptController = require('./receipt.controller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * tags:
 *   name: Receipt
 *   description: Receipt management endpoints
 */

/**
 * @swagger
 * /api/v1/receipt/upload:
 *   post:
 *     summary: Upload a receipt
 *     tags: [Receipt]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               receipt:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Receipt uploaded successfully
 *       500:
 *         description: Internal server error
 */
router.post('/upload', upload.single('receipt'), ReceiptController.uploadReceipt);

module.exports = router;