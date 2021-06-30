const jwt = require("jsonwebtoken");

const key = 'expectedKey';

function getNewToken(payload) {
    return jwt.sign(payload, key, { expiresIn: "90m" });
}

module.exports = {
    getNewToken
};
