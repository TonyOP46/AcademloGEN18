const StateService = require('../services/state.services');
const { getPagination, getPagingData } = require('../../utils/pagination');

const stateService = new StateService();

const getStates = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let roles = await stateService.findAndCount(query);
        const results = getPagingData(roles, page, limit);
        return response.json({ results });

    } catch (error) {
        next(error);
    }
};

const addState = async (req, res, next) => {
    try {
        const body = req.body;
        let role = await stateService.createState(body);
        return res.status(201).json({ results: role });
    } catch (error) {
        next(error);
    }
};

const getState = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await stateService.getStateOr404(id);
        return response.json({ results: role });
    } catch (error) {
        next(error);
    }
};

const updateState = async (request, response, next) => {
    try {
        let { id } = request.params;
        let { body } = request;
        let role = await stateService.updateState(id, body);
        return response.json({ results: role });
    } catch (error) {
        next(error);
    }
};

const removeState = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await stateService.removeState(id);
        return response.json({ results: role, message: 'removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStates,
    addState,
    getState,
    updateState,
    removeState
};