const express = require('express');
const router = express.Router();

const {
    getRoles,
    addRole,
    getRole,
    updateRole,
    removeRole } = require('../controllers/role.controllers');

router.get('/', getRoles);
router.post('/', addRole);
router.get('/:id', getRole);
router.put('/:id', updateRole);
router.delete('/:id', removeRole);

module.exports = router;