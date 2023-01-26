const jwt = require('jsonwebtoken');
const authServices = require('./auth.services');
const UserServices = require('../services/user.services');

const userServices = new UserServices();

const postSignup = async (request, response, next) => {
    try {
        let { body } = request;
        let user = await userServices.createUser(body);
        return response.status(201).json({ results: user });
    } catch (error) {
        next(error);
    }

};

const postLogin = (request, response, next) => {
    const { email, password } = request.body;

    if (email && password) {
        authServices.checkUsersCredentials(email, password)
            .then((data) => {
                if (data) {
                    const token = jwt.sign({
                        id: data.id,
                        email: data.email,
                        role: data.profile[0].role_id
                    }, 'ac4d3ml0');

                    response.status(200).json({
                        message: 'Correct Credentials!',
                        token
                    });
                } else {
                    response.status(401).json({ message: 'Invalid Credentials' });
                }
            })
            .catch((err) => {
                response.status(400).json({ message: err.message });
            });
    } else {
        response.status(400).json({
            message: 'Missing Data', fields: {
                email: 'example@example.com',
                password: "string"
            }
        });
    }
};

module.exports = {
    postLogin,
    postSignup
};