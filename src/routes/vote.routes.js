const express = require('express')
const router = express.Router()

const {
    getVotes,
    addVote,
    getVote,
    updateVote,
    removeVote } = require('../controllers/vote.controllers')

router.get('/', getVotes)
router.post('/', addVote)
router.get('/:id', getVote)
router.put('/:id', updateVote)
router.delete('/:id', removeVote)

module.exports = router