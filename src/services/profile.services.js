const models = require('../../database/models');
const { Op, INTEGER } = require('sequelize');
const { CustomError } = require('../../utils/custom_error');
const uuid = require('uuid')

class ProfilesService {

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

        const data = await models.Profiles.findAndCountAll(options);
        return data;
    }

    async createProfile({ user_id, role_id, image_url, code_phone, phone, country_id }) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.Profiles.create({
                id: uuid.v4(),
                user_id,
                role_id,
                image_url,
                code_phone,
                phone,
                country_id
            }, { transaction });

            await transaction.commit();
            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getProfileOr404(id) {
        let data = await models.Profiles.findByPk(id);

        if (!data) throw new CustomError('Not found profile', 404, 'Not Found');

        return data;
    }

    //Return not an Instance raw:true | we also can converted to Json instead
    async getProfile(id) {
        let data = await models.Profiles.findByPk(id, { raw: true });
        return data;
    }

    async updateProfile(id, { user_id, role_id, image_url, code_phone, phone, country_id }) {
        const transaction = await models.sequelize.transaction();
        try {
            let profile = await models.Profiles.findByPk(id);

            if (!profile) throw new CustomError('Not found profile', 404, 'Not Found');

            let data = await profile.update({
                user_id,
                role_id,
                image_url,
                code_phone,
                phone,
                country_id
            }, { transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async removeProfile(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.Profiles.findByPk(id);

            if (!data) throw new CustomError('Not found profile', 404, 'Not Found');

            await data.destroy({ transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

}

module.exports = ProfilesService;