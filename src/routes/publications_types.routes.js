const express = require('express');
const router = express.Router();

const {
  getPublicationTypes,
  addPublicationType,
  getPublicationType,
  updatePublicationType,
  removePublicationType } = require('../controllers/publications_types.controllers');

router.get('/', getPublicationTypes);
router.post('/', addPublicationType);
router.get('/:id', getPublicationType);
router.put('/:id', updatePublicationType);
router.delete('/:id', removePublicationType);

module.exports = router;