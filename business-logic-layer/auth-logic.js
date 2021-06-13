require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");
const authModel = require("../models/auth-model");

//Register new user
async function registerAsync(newUser) {
    try {
        newUser.password = cryptoHelper.hash(newUser.password);
        newUser.email = newUser.email.toLowerCase();
        await newUser.save();
        newUser.token = jwtHelper.getNewToken({ newUser });
        newUser.password = undefined;
        return newUser;
    } catch (error) {
        return {
            error: Object.keys(error.keyValue)[0],
            status: 401
        }
    }
}

//Login function
async function loginAsync({ email, password }) {
    password = cryptoHelper.hash(password);
    email = email.toLowerCase();
    const user = await authModel.find({ email, password }).exec();
    if (user.length === 0) return null;
    user[0].token = jwtHelper.getNewToken({ user });
    return user[0]
};

module.exports = {
    registerAsync,
    loginAsync,
};