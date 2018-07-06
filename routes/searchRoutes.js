var express = require('express');
var router = express.Router();

//Require controllers
var searchController = require('../controllers/searchController');

//Search routes

//POST submit search term to OMDB
router.post('/', searchController.search);

module.exports = router;