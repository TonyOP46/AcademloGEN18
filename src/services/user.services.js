const models = require('../../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../../utils/custom_error')
const uuid = require('uuid')
const { hashPassword } = require('../../utils/crypto')

class UserServices {

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
    const { first_name } = query
    if (first_name) {
      options.where.name = { [Op.iLike]: `%${first_name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const users = await models.Users.findAndCountAll(options)
    return users
  }

  async findUserByEmail(email) {

    const data = await models.Users.findOne({
      where: {
        email: email
      },
      include: [
        {
          model: models.Profiles,
          as: 'profile'
        }
      ]
    })

    return data
  }

  async createUser({ first_name, last_name, email, username, password, email_verified, token, role_id, image_url, code_phone, phone, country_id }) {
    const transaction = await models.sequelize.transaction()
    try {
      let newUser = await models.Users.create({
        id: uuid.v4(),
        first_name,
        last_name,
        email,
        username,
        password: hashPassword(password),
        email_verified,
        token
      }, { transaction })

      let newProfile = await models.Profiles.create({
        id: uuid.v4(),
        user_id: newUser.id,
        role_id,
        image_url,
        code_phone,
        phone,
        country_id
      }, { transaction })

      await transaction.commit()
      return [{ user: newUser, profile: newProfile }]
    } catch (error) {
      await transaction.rollback()
      throw error
    }


  }
  //Return Instance if we do not converted to json (or raw:true)
  async getUserOr404(id) {
    let user = await models.Users.findByPk(id, {
      include: [
        { model: models.Profiles, as: 'profile' }
      ]
    })
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    return user
  }
  //Return not an Instance raw:true | we also can converted to Json instead
  async getUser(id) {
    let user = await models.Users.findByPk(id, { raw: true })
    return user
  }
  async updateUser(id, { first_name, last_name, email, username, password }) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      let updatedUser = await user.update({
        first_name,
        last_name,
        email,
        username,
        password: hashPassword(password),
      }, { transaction })
      await transaction.commit()

      return updatedUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  async removeUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      await user.destroy({ transaction })
      await transaction.commit()
      return user

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = UserServices