const { Router } = require('express');

const petsController = require('../controllers/petsController');

const router = Router();

router.post('/', petsController.create);
router.get('/', petsController.list);
router.get('/:id', petsController.findById);

module.exports = router;
