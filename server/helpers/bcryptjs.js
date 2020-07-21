const bcryptjs = require('bcryptjs');

class Bcryptjs {
    static hashing(password) {
        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash
    }
}

module.exports = {
    Bcryptjs
};
