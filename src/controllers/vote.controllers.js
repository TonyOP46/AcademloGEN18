const VoteServices = require('../services/vote.services')
const { getPagination, getPagingData } = require('../../utils/pagination')

const voteServices = new VoteServices()

const getVotes = async (request, response, next) => {
    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let votes = await voteServices.findAndCount(query)
        const results = getPagingData(votes, page, limit)
        return response.json({ results: results })

    } catch (error) {
        next(error)
    }
}

const addVote = async (request, response, next) => {
    try {
        let { body } = request
        let vote = await voteServices.createVote(body)
        return response.status(201).json({ results: vote })
    } catch (error) {
        next(error)
    }
}

const getVote = async (request, response, next) => {
    try {
        let { id } = request.params
        let votes = await voteServices.getVoteOr404(id)
        return response.json({ results: votes })
    } catch (error) {
        next(error)
    }
}

const updateVote = async (request, response, next) => {
    try {
        let { id } = request.params
        let { body } = request
        let vote = await voteServices.updateVote(id, body)
        return response.json({ results: vote })
    } catch (error) {
        next(error)
    }
}

const removeVote = async (request, response, next) => {
    try {
        let { id } = request.params
        let vote = await voteServices.removeVote(id)
        return response.json({ results: vote, message: 'removed' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getVotes,
    addVote,
    getVote,
    updateVote,
    removeVote
}