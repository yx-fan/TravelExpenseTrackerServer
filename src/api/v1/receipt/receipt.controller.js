const OCRService = require('./ocr.service');
const path = require('path');

class ReceiptController {

    async uploadReceipt(req, res, next) {
        const imagePath = path.join(__dirname, `../../../../${req.file.path}`);
        try {
            const text = await OCRService.processImage(imagePath);
            return res.success({ text }, 'Receipt uploaded successfully', 200);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new ReceiptController();