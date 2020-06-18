const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authJwt = require('../middlewares/auth_jwt')

// get all news
router.get('/news', authJwt.verifyToken, userController.getAllNews)

// subscribe source
router.patch('/:id/sources/:sourceId/subscribe', authJwt.verifyToken, userController.subscribeSource)

// unsubscribe source
router.patch('/:id/sources/:sourceId/unsubscribe', authJwt.verifyToken, userController.unsubscribeSource)


module.exports = router
