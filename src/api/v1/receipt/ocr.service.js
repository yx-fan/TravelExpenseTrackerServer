const Tesseract = require('tesseract.js');
const logger = require('../../../../utils/logger');
const fs = require('fs').promises;
const cld = require('cld');

class OCRService {
    async performOCR(imagePath, language = 'eng') {
        let previousStatus = '';
        try {
            const { data: { text } } = await Tesseract.recognize(
                imagePath,
                language,
                {
                    logger: m => {
                        if (m.status !== previousStatus) {
                            previousStatus = m.status;
                            logger.info(JSON.stringify(m, null, 2));
                        }
                    }
                }
            );
            return text;
        } catch (error) {
            logger.error(`Error performing OCR: ${error.message}`);
            throw new Error('Error performing OCR');
        }
    }

    async detectLanguage(text) {
        try {
            const result = await cld.detect(text);
            if (!result.reliable) {
                return 'en'; // Default to English if language detection is not reliable
            }
            return result.languages[0].code;
        } catch (error) {
            logger.error(`Error detecting language: ${error.message}`);
            throw new Error('Error detecting language');
        }
    }

    async processImage(imagePath) {
        try {
            const initialOcrResult = await this.performOCR(imagePath, 'eng');
            const detectedLanguage = await this.detectLanguage(initialOcrResult);
            const detectedLanguageCode = this._convertLanguageCode(detectedLanguage);
            const finalOcrResult = await this.performOCR(imagePath, detectedLanguageCode);
            
            // Clean up the image file after both OCR processes are complete
            await fs.unlink(imagePath);
            
            return finalOcrResult;
        } catch (error) {
            logger.error(`Error processing image: ${error.message}`);
            await fs.unlink(imagePath); // Ensure the image file is deleted in case of error
            throw new Error('Error processing image');
        }
    }

    _convertLanguageCode(cldCode) {
        const languageMap = {
            'en': 'eng',
            'es': 'spa',
            'fr': 'fra',
            'de': 'deu',
            // Add more mappings as needed
        };
        return languageMap[cldCode] || 'eng'; // Default to English if code is not found
    }
}

module.exports = new OCRService();
