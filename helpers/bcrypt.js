const bcrypt = require('bcryptjs')

const hashPassword = (userPassword) =>{
    const salt =  bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userPassword, salt)

    return hash
}

const comparePassword = (userPassword, hashedPassword) => {
    return bcrypt.compareSync(userPassword, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}