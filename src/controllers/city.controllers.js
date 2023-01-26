const CityServices = require('../services/city.services');
const { getPagination, getPagingData } = require('../../utils/pagination');

const cityService = new CityServices();

const getCities = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let data = await cityService.findAndCount(query);
        const results = getPagingData(data, page, limit);
        return response.json({ results });

    } catch (error) {
        next(error);
    }
};

const addCity = async (req, res, next) => {
    console.log("BODY", req.body);
    const body = req.body;
    try {
        // let { body } = req;
        let data = await cityService.createCity(body);
        return res.status(201).json({ results: data });
    } catch (error) {
        next(error);
    }
};

const getCity = async (request, response, next) => {
    try {
        let { id } = request.params;
        let data = await cityService.getCityOr404(id);
        return response.json({ results: data });
    } catch (error) {
        next(error);
    }
};

const PutCity = async (request, response, next) => {
    try {
        let { id } = request.params;
        let { body } = request;
        let data = await cityService.updateCity(id, body);
        return response.json({ results: data });
    } catch (error) {
        next(error);
    }
};

const DeleteCity = async (request, response, next) => {
    try {
        let { id } = request.params;
        let data = await cityService.removeCity(id);
        return response.json({ results: data, message: 'removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCities,
    addCity,
    getCity,
    PutCity,
    DeleteCity
};