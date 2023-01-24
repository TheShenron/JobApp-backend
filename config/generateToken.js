const jwt = require('jsonwebtoken')

const generateToken = (id)=>{

    return jwt.sign({id} , process.env.SECRATE_KEY , {
        expiresIn: '1d'
    })
}

module.exports = generateToken