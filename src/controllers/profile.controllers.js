const ProfilesService = require('../services/profile.services');
const { getPagination, getPagingData } = require('../../utils/pagination');

const profilesService = new ProfilesService();

const getProfiles = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let profiles = await profilesService.findAndCount(query);
        const results = getPagingData(profiles, page, limit);
        return response.json({ results });

    } catch (error) {
        next(error);
    }
};

const addProfile = async (req, res, next) => {
    try {
        const body = req.body;
        let profile = await profilesService.createProfile(body);
        return res.status(201).json({ results: profile });
    } catch (error) {
        next(error);
    }
};

const getProfile = async (request, response, next) => {
    try {
        let { id } = request.params;
        let profile = await profilesService.getProfileOr404(id);
        return response.json({ results: profile });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (request, response, next) => {
    try {
        let { id } = request.params;
        let { body } = request;
        let profile = await profilesService.updateProfile(id, body);
        return response.json({ results: profile });
    } catch (error) {
        next(error);
    }
};

const removeProfile = async (request, response, next) => {
    try {
        let { id } = request.params;
        let profile = await profilesService.removeProfile(id);
        return response.json({ results: profile, message: 'removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfiles,
    addProfile,
    getProfile,
    updateProfile,
    removeProfile
};