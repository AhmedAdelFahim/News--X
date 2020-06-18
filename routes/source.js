const express = require('express');
const router = express.Router();
const authJwt = require('../middlewares/auth_jwt')
const sourceController = require('../controllers/sourceController')

// get all Sources
router.get('/', authJwt.verifyToken, sourceController.getAllSources)

module.exports = router
