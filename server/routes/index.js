const router = require('express').Router();

// require routs
const userRout  = require('./user').router;
const quranRout = require('./alquran').router;

router.get('/', (req, res) => {
    res.send('Home page')
})

router.use('/user', userRout)
router.use('/quran', quranRout)

module.exports = {
    router
};
