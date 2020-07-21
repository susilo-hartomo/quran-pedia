const router = require('express').Router();
const {UserCont} = require('../controllers/userCont');

// router.get('/login', (req,res) => {
//     res.send('login user router')
// })

router.post('/login',UserCont.login)
router.post('/login/google',UserCont.loginGoogle)
router.post('/register',UserCont.register)

module.exports = {
    router
};
