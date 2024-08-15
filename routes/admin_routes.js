const express = require('express');
const adminController = require('../controllers/admin_controller');
const { verifyAdmin } = require('../middlewares/auth');
const logRequest = require('../middlewares/logRequest');
const Log = require('../models/log');

const router = express.Router();

router.route('/product')
    .get((req, res, next) => res.status(405).json({ error: "GET method is not allowed" }))
    .put((req, res, next) => res.status(405).json({ error: 'PUT method is not allowed' }))
    .delete((req, res, next) => res.status(405).json({ error: 'DELETE method is not allowed' }))
    .post(verifyAdmin, logRequest, adminController.addProduct);

router.route('/product/:product_id')
    .get((req, res, next) => res.status(405).json({ error: "GET method is not allowed" }))
    .post((req, res, next) => res.status(405).json({ error: 'POST method is not allowed' }))
    .delete(verifyAdmin, logRequest, adminController.deleteSingleProduct)
    .put(verifyAdmin, logRequest, adminController.updateProduct);


router.get('/logs', async (req, res) => {
        try {
            const logs = await Log.find().sort({ time: -1 }); // Sort by most recent
            res.json(logs);
        } catch (err) {
            res.status(500).json({ error: 'Failed to retrieve logs' });
        }
    });
module.exports = router;