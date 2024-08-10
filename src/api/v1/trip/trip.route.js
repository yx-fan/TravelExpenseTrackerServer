const express = require('express');
const TripController = require('./trip.controller');
const passport = require('../../../../config/passport');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trip
 *   description: Trip endpoints
 */

/**
 * @swagger
 * /api/v1/trip:
 *   post:
 *     summary: Create a trip
 *     tags: [Trip]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tripName:
 *                 type: string
 *                 example: Trip to Dubai
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2021-12-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2021-12-10
 *               description:
 *                 type: string
 *                 example: A trip to Dubai
 *               currencyCode:
 *                 type: string
 *                 example: AED
 *               image:
 *                 type: string
 *                 example: http://example.com/image.jpg
 *         required:
 *           - tripName
 *           - startDate
 *           - endDate
 *           - currencyCode
 *     responses:
 *       201:
 *         description: Trip created successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 */
router.post('/', passport.authenticate('jwt', { session: false }), TripController.createTrip);

/**
 * @swagger
 * /api/v1/trip:
 *   get:
 *     summary: Get all trips
 *     tags: [Trip]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trips retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', passport.authenticate('jwt', { session: false }), TripController.getTrips);

/**
 * @swagger
 *   /api/v1/trip/{tripId}:
 *     delete:
 *       summary: Delete a trip and move it to trash
 *       tags: [Trip]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: tripId
 *           schema:
 *             type: string
 *           required: true
 *           description: The trip ID
 *       responses:
 *         200:
 *           description: Trip deleted successfully
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Trip not found
 *         500:
 *           description: Internal server error
 */
router.delete('/:tripId', passport.authenticate('jwt', { session: false }), TripController.deleteOneTrip);


/**
 * @swagger
 * /api/v1/trip/revert-deleted-trip/{tripId}:
 *   post:
 *     summary: Revert a deleted trip
 *     tags: [Trip]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         schema:
 *           type: string
 *         required: true
 *         description: The trip ID
 *     responses:
 *       200:
 *         description: Trip reverted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trip not found
 *       500:
 *         description: Internal server error
 */
router.post('/revert-deleted-trip/:tripId', passport.authenticate('jwt', { session: false }), TripController.revertDeletedTrip);

module.exports = router;