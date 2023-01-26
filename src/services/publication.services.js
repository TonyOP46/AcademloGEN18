const models = require('../../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../../utils/custom_error')
const uuid = require('uuid')

class PublicationServices {

    constructor() { }

    async findAndCount(query) {
        const options = {
            where: {},
        }
        const { limit, offset } = query
        if (limit && offset) {
            options.limit = limit
            options.offset = offset
        }

        //No sabemos para que funciona esa parte del codigo.
        const { title } = query
        if (title) {
            options.where.name = { [Op.iLike]: `%${title}%` }
        }

        //Necesario para el findAndCountAll de Sequelize
        options.distinct = true

        const data = await models.publications.findAndCountAll(options)
        return data
    }

    async createPublication({ profile_id, title, description, content, picture, city_id, img_url, publication_type_id }) {
        const transaction = await models.sequelize.transaction()
        try {
            let newData = await models.publications.create({
                id: uuid.v4(),
                profile_id,
                title,
                description,
                content,
                picture,
                city_id,
                img_url,
                publication_type_id
            }, { transaction })

            await transaction.commit()
            return newData
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getPublicationOr404(id) {
        let publication = await models.publications.findByPk(id)
        if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found')
        return publication
    }
    //Return not an Instance raw:true | we also can converted to Json instead
    async getPublication(id) {
        let publication = await models.publications.findByPk(id, { raw: true })
        return publication
    }
    async updatePublication(id, { title, description, content, picture, img_url }) {
        const transaction = await models.sequelize.transaction()
        try {
            let publication = await models.publications.findByPk(id)

            if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')
            let updatedPublication = await publication.update({
                title,
                description,
                content,
                picture,
                img_url
            }, { transaction })
            await transaction.commit()

            return updatedPublication
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
    async removePublication(id) {
        const transaction = await models.sequelize.transaction()
        try {
            let publication = await models.publications.findByPk(id)

            if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')
            await publication.destroy({ transaction })
            await transaction.commit()
            return publication

        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
}

module.exports = PublicationServices

