const CountriesService = require('../services/country.services');
const { getPagination, getPagingData } = require('../../utils/pagination');

const countriesService = new CountriesService();

const getCountries = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let countries = await countriesService.findAndCount(query);
        const results = getPagingData(countries, page, limit);
        return response.json({ results });

    } catch (error) {
        next(error);
    }
};

const addCountry = async (req, res, next) => {
    try {
        const body = req.body;
        let country = await countriesService.createCountry(body);
        return res.status(201).json({ results: country });
    } catch (error) {
        next(error);
    }
};

const getCountry = async (request, response, next) => {
    try {
        let { id } = request.params;
        let country = await countriesService.getCountryOr404(id);
        return response.json({ results: country });
    } catch (error) {
        next(error);
    }
};

const updateCountry = async (request, response, next) => {
    try {
        let { id } = request.params;
        let { body } = request;
        let country = await countriesService.updateCountry(id, body);
        return response.json({ results: country });
    } catch (error) {
        next(error);
    }
};

const removeCountry = async (request, response, next) => {
    try {
        let { id } = request.params;
        let country = await countriesService.removeCountry(id);
        return response.json({ results: country, message: 'removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCountries,
    addCountry,
    getCountry,
    updateCountry,
    removeCountry
};