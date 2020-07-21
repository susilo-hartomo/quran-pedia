const jwt = require('jsonwebtoken');
const secretKey = process.env.KEY

class Jwt {
    static generateToken(user) {
        const token = jwt.sign({
            id: user.id,
            email: user.email
        },
            secretKey);
            return token
    }

    static verifyToken(token) {
        return jwt.verify(token, secretKey)
    }

}


module.exports = {
    Jwt
};
