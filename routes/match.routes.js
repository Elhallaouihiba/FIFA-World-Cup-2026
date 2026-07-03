const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');

router.post('/', matchController.createMatch);
router.get('/:id/arbitres', matchController.getMatchArbitres);

module.exports = router;