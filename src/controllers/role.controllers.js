const RolesService = require('../services/role.services');
const { getPagination, getPagingData } = require('../../utils/pagination');

const rolesService = new RolesService();

const getRoles = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let roles = await rolesService.findAndCount(query);
        const results = getPagingData(roles, page, limit);
        return response.json({ results });

    } catch (error) {
        next(error);
    }
};

const addRole = async (req, res, next) => {
    try {
        const body = req.body;
        let role = await rolesService.createRole(body);
        return res.status(201).json({ results: role });
    } catch (error) {
        next(error);
    }
};

const getRole = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await rolesService.getRoleOr404(id);
        return response.json({ results: role });
    } catch (error) {
        next(error);
    }
};

const updateRole = async (request, response, next) => {
    try {
        let { id } = request.params;
        let { body } = request;
        let role = await rolesService.updateRole(id, body);
        return response.json({ results: role });
    } catch (error) {
        next(error);
    }
};

const removeRole = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await rolesService.removeRole(id);
        return response.json({ results: role, message: 'removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getRoles,
    addRole,
    getRole,
    updateRole,
    removeRole
};