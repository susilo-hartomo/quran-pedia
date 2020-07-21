const { User } = require('../models');
const { Jwt } = require('../helpers/jwt');
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library');


class UserCont {

    static register(req, res, next) {
        const { username, email, password } = req.body
        console.log(req.body);
        User.create({ username, email, password })
            .then((data) => {
                let access_token = Jwt.generateToken(data)
                console.log('access_token: ', access_token);
                res.status(201).json({
                    access_token,
                    username: data.username
                })
            }).catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    next({ name: "EROR_VALIDATION" })
                } else {
                    next({ name: 'EROR_SERVER' })
                }
            });
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then((data) => {
                // console.log('data: ', data);
                if (!data) {
                    next({ name: "EROR_VALIDATION" })
                }
                if (!bcrypt.compareSync(password, data.password)) {
                    next({ name: "EROR_VALIDATION" })
                } else {
                    // console.log(bcrypt.compareSync(password, data.password));
                    let access_token = Jwt.generateToken(data)
                    console.log('access_token: ', access_token);
                    res.status(200).json({
                        access_token,
                        username: data.username
                    })
                }
            }).catch((err) => {
                next({ name: 'EROR_SERVER' })
            });
    }

    static loginGoogle(req, res, next) {
        let CLIENT_ID = process.env.CLIENT_ID
        let token = req.body.idToken
        let userName = null
        let userEmail = null
        const client = new OAuth2Client(CLIENT_ID);
        // console.log('client: ', client);

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        })
            .then((ticket) => {
                const payload = ticket.getPayload();
                // console.log('payload: ', payload);
                userEmail = payload.email;
                userName = payload.name
                console.log('userEmail: ', userEmail);
                return User.findOne({
                    where: {
                        email: userEmail
                    }
                })
            })
            .then((data) => {
                // console.log('data: ', data);
                if (data) {
                    console.log('data: ', data);
                    let access_token = Jwt.generateToken(data)
                    res.status(200).json({
                        access_token,
                        username: data.username
                    })
                    return
                } else {
                    let newUser = {
                        username: userName,
                        email: userEmail,
                        password: process.env.PASSWORD_GOOGLE
                    }
                    // console.log('newUser: ', newUser);
                    return User.create(newUser)
                }
            })
            .then((data) => {
                let access_token = Jwt.generateToken(data)
                res.status(200).json({ 
                    access_token,
                    username: data.username })
                return
            }).catch((err) => {
                next({ name: 'ERROR_SERVER' })
            });
    }
}

module.exports = {
    UserCont
};
