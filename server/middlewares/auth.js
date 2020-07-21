const { Jwt } = require('../helpers/jwt');
const { User, Kanban } = require('../models');

class Auth {
    static authentication(req, res, next) {
        const { access_token } = req.headers;
        console.log('access_token: authentication', access_token);
        try {
            let decoded = Jwt.verifyToken(access_token)
            console.log('decoded: ', decoded);
            const { id, email } = decoded;
            User.findByPk(id)
                .then((result) => {
                    if (result) {
                        req.userId = id
                        next()
                    } else {
                        next({name: 'DATA_NOT_FOUND'})
                    }
                }).catch((err) => {
                    next({name: 'DATA_NOT_FOUND'})
                });
        } catch (err) {
            next({name: 'EROR_SERVER'})
        }
    }

    static authorization (req, res, next) {
        let { id } = req.params
        console.log('id: ', req.params);
        Kanban.findByPk(id)
        .then((data) => {
            console.log('data: ', data);
            if (data) {
                if (data.UserId == req.userId) {
                    next()
                } else {
                    next({name: 'DATA_NOT_FOUND'})
                }       
            } else {
                next({name: 'DATA_NOT_FOUND'})
            }
        }).catch((err) => {
            next({name: 'EROR_SERVER'})
        });
    }
}

module.exports = {
    Auth
};
