const models = require('../../database/models');
const { Op, INTEGER } = require('sequelize');
const { CustomError } = require('../../utils/custom_error');

class StateService {

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

        const data = await models.state.findAndCountAll(options);
        return data;
    }

    async createState({ name, id_country }) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.state.create({
                name,
                id_country
            }, { transaction });

            await transaction.commit();
            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getStateOr404(id) {
        let data = await models.state.findByPk(id);

        if (!data) throw new CustomError('Not found state', 404, 'Not Found');

        return data;
    }

    //Return not an Instance raw:true | we also can converted to Json instead
    async getState(id) {
        let data = await models.state.findByPk(id, { raw: true });
        return data;
    }

    async updateState(id, { name }) {
        const transaction = await models.sequelize.transaction();
        try {
            let state = await models.state.findByPk(id);

            if (!state) throw new CustomError('Not found state', 404, 'Not Found');

            let data = await state.update({
                name
            }, { transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async removeState(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.state.findByPk(id);

            if (!data) throw new CustomError('Not found state', 404, 'Not Found');

            await data.destroy({ transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

}

module.exports = StateService;