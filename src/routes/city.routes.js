const express = require('express');
const router = express.Router();

const {
    getCities,
    addCity,
    getCity,
    PutCity,
    DeleteCity } = require('../controllers/city.controllers');

router.get('/', getCities);
router.post('/', addCity);
router.get('/:id', getCity);
router.put('/:id', PutCity);
router.delete('/:id', DeleteCity);

module.exports = router;