const crypto = require("crypto");

const salt = 'desire salt';

function hash(plainText) {
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
    hash
};