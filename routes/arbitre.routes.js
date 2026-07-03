
const express = require('express');
const router = express.Router();

const arbitreController = require('../controllers/arbitre.controller');


const { validateArbitre } = require('../middlewares/validate.middleware');

router.post('/', validateArbitre, arbitreController.createArbitre);
router.get('/', arbitreController.getAllArbitres);
router.get('/:id', arbitreController.getArbitreById);
router.put('/:id', validateArbitre, arbitreController.updateArbitre);
router.delete('/:id', arbitreController.deleteArbitre);
router.get('/:id/matchs', arbitreController.getArbitreMatchs);

module.exports = router;