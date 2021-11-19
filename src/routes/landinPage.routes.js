const express = require('express')
const router = express.Router();

const landingController = require('../controllers/landinPage.controller')

router.get('/', landingController.renderLanding)

module.exports = router 