var express = require('express');
var router = express.Router();

//Require controllers
var favoritesController = require('../controllers/favoritesController');

//favorites routes

//POST submit favorites term to backend
router.post('/', favoritesController.favorite);

//GET get favorites from backend
router.get('/', favoritesController.listFavorite);

module.exports = router;