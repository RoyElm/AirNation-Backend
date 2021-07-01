const jwt = require("jsonwebtoken");

const key = 'AirNation';

function getNewToken(payload) {
    return jwt.sign(payload, key, { expiresIn: "90m" });
}

module.exports = {
    getNewToken
};
