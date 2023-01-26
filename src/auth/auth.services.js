const uuid = require('uuid')
const UserServices = require('../services/user.services')
const { comparePassword } = require('../../utils/crypto')

const userService = new UserServices()

const checkUsersCredentials = async (email, password) => {
    try {

        const user = await userService.findUserByEmail(email)

        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user
        }
        return null
    } catch (error) {
        return error
    }
}

module.exports = {
    checkUsersCredentials
}