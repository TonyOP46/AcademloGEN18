const models = require('../../database/models');
const { Op } = require('sequelize');
const { CustomError } = require('../../utils/custom_error');

class CountriesService {

    constructor() {

    }

    async findAndCount(query) {
        const options = {
            where: {},
        };

        const { limit, offset } = query;
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }

        const { name } = query;
        if (name) {
            options.where.name = { [Op.iLike]: `%${name}%` };
        }

        options.distinct = true;

        const data = await models.Countries.findAndCountAll(options);
        return data;
    }

    async createCountry({ name }) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.Countries.create({
                name,
            }, { transaction });

            await transaction.commit();
            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getCountryOr404(id) {
        let data = await models.Countries.findByPk(id);

        if (!data) throw new CustomError('Not found country', 404, 'Not Found');

        return data;
    }

    //Return not an Instance raw:true | we also can converted to Json instead
    async getCountry(id) {
        let data = await models.Countries.findByPk(id, { raw: true });
        return data;
    }

    async updateCountry(id, { name }) {
        const transaction = await models.sequelize.transaction();
        try {
            let country = await models.Countries.findByPk(id);

            if (!country) throw new CustomError('Not found country', 404, 'Not Found');

            let data = await country.update({
                name
            }, { transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async removeCountry(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.Countries.findByPk(id);

            if (!data) throw new CustomError('Not found country', 404, 'Not Found');

            await data.destroy({ transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

}

module.exports = CountriesService;