const OpenAI = require('openai');
const logger = require('../../../../utils/logger');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize OpenAI API configuration
const openai = new OpenAI(process.env.OPENAI_API_KEY);

class ReceiptService {

    async extractReceiptData(text) {
        try {
            const parsedData = await this.parseReceiptWithOpenAI(text);
            const receiptData = this._parseParsedDataFromOpenAI(parsedData);
            return receiptData;
        } catch (error) {
            logger.error(`Error extracting receipt data: ${error.message}`);
            throw new Error('Error extracting receipt data');
        }
    }

    async parseReceiptWithOpenAI(text) {
        try {
            const prompt = `
                Extract the information from the receipt:
                ${text}

                By using the exact keys to return a json format information according to the receipt data above:
                {
                    MerchantName
                    Address
                    Date
                    Time
                    TransactionID
                    TotalAmount
                    PostalCode
                    OtherDetails
                }
            `;

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens: 200,
                n: 1,
                temperature: 0.5
            });
            const parsedData = response.choices[0].message.content;
            return parsedData;
        } catch (error) {
            logger.error(`Error parsing receipt with OpenAI: ${error.message}`);
            throw new Error('Error parsing receipt');
        }
    }

    _parseParsedDataFromOpenAI(parsedData) {
        try {
            const jsonContent = JSON.parse(parsedData);

            return jsonContent;
        } catch (error) {
            logger.error(`Error parsing parsed data: ${error.message}`);
            throw new Error('Error parsing parsed data');
        }
    }

    async saveReceiptData(user, trip, receiptData) {
        try {
            let merchantName = receiptData.MerchantName;
            let date = receiptData.Date;
            let amount = receiptData.TotalAmount;
            let location = receiptData.Address;
            let receiptId = receiptData.TransactionID;
            let postalCode = receiptData.PostalCode;

            let receipt = new ReceiptModel({
                merchantName,
                date,
                amount,
                location,
                receiptId,
                postalCode,
                user: user,
                trip: trip,
            });

            receipt = await receipt.save();
            return receipt;
        } catch (error) {
            logger.error(`Error saving receipt data: ${error.message}`);
            throw new Error('Error saving receipt data');
        }
    }


}

module.exports = new ReceiptService();