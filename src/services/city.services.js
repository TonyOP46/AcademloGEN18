const models = require('../../database/models');
const { Op, INTEGER } = require('sequelize');
const { CustomError } = require('../../utils/custom_error');

class CityServices {

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

        const data = await models.city.findAndCountAll(options);
        return data;
    }

    async createCity({ name, state_id }) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.city.create({
                name,
                state_id
            }, { transaction });

            await transaction.commit();
            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getCityOr404(id) {
        let data = await models.city.findByPk(id);

        if (!data) throw new CustomError('Not found city', 404, 'Not Found');

        return data;
    }

    //Return not an Instance raw:true | we also can converted to Json instead
    async getCity(id) {
        let data = await models.city.findByPk(id, { raw: true });
        return data;
    }

    async updateCity(id, { name, state_id }) {
        const transaction = await models.sequelize.transaction();
        try {
            let city = await models.city.findByPk(id);

            if (!city) throw new CustomError('Not found city', 404, 'Not Found');

            let data = await city.update({
                name,
                state_id
            }, { transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async removeCity(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.city.findByPk(id);

            if (!data) throw new CustomError('Not found city', 404, 'Not Found');

            await data.destroy({ transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

}

module.exports = CityServices;