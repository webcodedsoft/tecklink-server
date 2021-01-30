const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const messageHandler = (message, status, data) => {
    return response = { message, status, data };
}

const tokenHandler = (data) => {
    var { _id, userType } = data;
    var token = jwt.sign({ _id }, process.env.tokenKey, { expiresIn: '7d' });
    const response = { _id, userType, token };
    return response;
}

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const verifyPassword = async (password, dbpassword) => {
    return await bcrypt.compare(password, dbpassword)
}

const tokenVerifier = (token) => {
    var response = false
    var res = jwt.verify(token, process.env.tokenKey, function (err, decoded) {
        if (!err) {
            response = true
        } else {
            response = false
        }
    });
    return response
}

const Numeric = (length) => {
    var result = '';
    var characters = '012345678901234567890123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = { messageHandler, tokenHandler, tokenVerifier, Numeric, validateEmail, hashPassword, verifyPassword  }