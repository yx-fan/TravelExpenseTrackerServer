const axios = require('axios');
const dotenv = require('dotenv');
const logger = require('../../../../utils/logger');

dotenv.config();

class CoordinateService {
    async getCoordinates(placeName) {
        const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(placeName)}.json?access_token=${accessToken}`;
        try {
            const response = await axios.get(url);
            if (response.data && response.data.features && response.data.features.length > 0) {
                const coordinates = response.data.features[0].geometry.coordinates;
                return {
                    latitude: coordinates[1],
                    longitude: coordinates[0]
                };
            } else {
                return null, null;
            }
        } catch (err) {
            logger.error(`Error fetching coordinates: ${err.message}`);
            throw new Error(err.message);
        }
    }
}

module.exports = new CoordinateService();