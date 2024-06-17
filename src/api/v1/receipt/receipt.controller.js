const OCRService = require('./ocr.service');
const ReceiptService = require('./receipt.service');
const path = require('path');

class ReceiptController {

    async parseReceipt(req, res, next) {
        const imagePath = path.join(__dirname, `../../../../${req.file.path}`);
        try {
            const text = await OCRService.processImage(imagePath);
            const parsedReceipt = await ReceiptService.extractReceiptData(text);
            return res.success({ parsedReceipt }, 'Receipt uploaded successfully, please confirm information', 200);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new ReceiptController();