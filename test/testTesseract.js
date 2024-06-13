const tesseract = require('tesseract.js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

async function extractTextFromImage(imagePath, language = 'eng') {
    try {
        const langPath = path.resolve(__dirname, '../tessdata');
        console.log('langPath:', langPath);
        const { data: { text } } = await tesseract.recognize(imagePath);

    //    const { data: { text } } = await tesseract.recognize(imagePath, language, {
      //      langPath: process.env.TESSDATA_PREFIX,
        //});
        console.log('Extracted Text:', text);
        return text;
    } catch (error) {
        console.error('Error extracting text:', error);
    }
}

module.exports = extractTextFromImage;