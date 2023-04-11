const { comparePassword } = require('../helpers/bcrypt');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');

class UserController{
    static register(req, res){
        const { username, email, password } = req.body;
        User.create({
            email,
            username,
            password
        })
        .then(result => {
            let response = {
                id : result.id,
                username : result.username,
                email : result.email,
            }
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err);
            
        })
    }
    
    static login(req, res){
        const {email, password} = req.body;
        User.findOne({
            where : {
                email
            }
        })
        .then(user => {
            if(!user){
                throw {
                    name : "user login error",
                    devMessage : `user with email ${email} not found`,
                }
            }
            const isCorrect = comparePassword(password, user.password)
            if(!isCorrect){
                throw {
                    name : "user login error",
                    devMessage : `password is incorrect`
                }
            }
            
            let payload = {
                id : user.id,
                email : user.email,
            }
            const token = generateToken(payload)

            return res.status(200).json({token})
        })
        .catch(err => {
            return res.status(401).json(err)
            console.log(err);
        })
    }


}

module.exports = UserController;