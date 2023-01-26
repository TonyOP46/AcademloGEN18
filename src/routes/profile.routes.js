const express = require('express');
const router = express.Router();

const {
    getProfiles,
    addProfile,
    getProfile,
    updateProfile,
    removeProfile } = require('../controllers/profile.controllers');

router.get('/', getProfiles);
router.post('/', addProfile);
router.get('/:id', getProfile);
router.put('/:id', updateProfile);
router.delete('/:id', removeProfile);

module.exports = router;