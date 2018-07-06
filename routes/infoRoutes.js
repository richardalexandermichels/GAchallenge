var express = require('express');
var router = express.Router();

//Require controllers
var infoController = require('../controllers/infoController');

//info routes

//GET submit info term to OMDB
router.get('/:oid', infoController.getInfo);

module.exports = router;