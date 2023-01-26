const models = require('../../database/models');
const { Op } = require('sequelize');
const { CustomError } = require('../../utils/custom_error');

class PublicationsTypesService {

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

        //Necesario para el findAndCountAll de Sequelize
        options.distinct = true;

        const publicationType = await models.Publications_types.findAndCountAll(options);
        return publicationType;
    }

    async createPublicationType({ name, description }) {
        const transaction = await models.sequelize.transaction();
        try {
            let newPublicationType = await models.Publications_types.create({
                //id: uuid4() --> aquí se debe usar el uuid maker si es que se usa
                name,
                description
            }, { transaction });

            await transaction.commit();
            return newPublicationType;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getPublicationTypeOr404(id) {
        let publicationType = await models.Publications_types.findByPk(id);

        if (!publicationType) throw new CustomError('Not found publication type', 404, 'Not Found');

        return publicationType;
    }

    //Return not an Instance raw:true | we also can converted to Json instead
    async getPublicationType(id) {
        let publicationType = await models.Publications_types.findfindByPk(id, { raw: true });
        return publicationType;
    }

    async updatePublicationType(id, { name }) {
        const transaction = await models.sequelize.transaction();
        try {
            let publicationType = await models.Publications_types.findByPk(id);

            if (!publicationType) throw new CustomError('Not found publication type', 404, 'Not Found');

            let updatedPublicationType = await publicationType.update({
                name
            }, { transaction });

            await transaction.commit();

            return updatedPublicationType;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async removePublicationType(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let publicationType = await models.Publications_types.findByPk(id);

            if (!publicationType) throw new CustomError('Not found publication type', 404, 'Not Found');

            await publicationType.destroy({ transaction });

            await transaction.commit();

            return publicationType;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

}

module.exports = PublicationsTypesService;