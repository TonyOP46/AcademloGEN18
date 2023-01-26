const express = require('express');
const router = express.Router();

const {
    getCountries,
    addCountry,
    getCountry,
    updateCountry,
    removeCountry } = require('../controllers/country.controllers');

router.get('/', getCountries);
router.post('/', addCountry);
router.get('/:id', getCountry);
router.put('/:id', updateCountry);
router.delete('/:id', removeCountry);

module.exports = router;