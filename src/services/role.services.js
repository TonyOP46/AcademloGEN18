const models = require('../../database/models');
const { Op, INTEGER } = require('sequelize');
const { CustomError } = require('../../utils/custom_error');

class RolesService {

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

        const data = await models.Roles.findAndCountAll(options);
        return data;
    }

    async createRole({ name }) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.Roles.create({
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
    async getRoleOr404(id) {
        let data = await models.Roles.findByPk(id);

        if (!data) throw new CustomError('Not found role', 404, 'Not Found');

        return data;
    }

    //Return not an Instance raw:true | we also can converted to Json instead
    async getRole(id) {
        let data = await models.Roles.findByPk(id, { raw: true });
        return data;
    }

    async updateRole(id, { name }) {
        const transaction = await models.sequelize.transaction();
        try {
            let role = await models.Roles.findByPk(id);

            if (!role) throw new CustomError('Not found role', 404, 'Not Found');

            let data = await role.update({
                name
            }, { transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async removeRole(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.Roles.findByPk(id);

            if (!data) throw new CustomError('Not found role', 404, 'Not Found');

            await data.destroy({ transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

}

module.exports = RolesService;