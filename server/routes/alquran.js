const router = require('express').Router();
const { quranCont } = require('../controllers/quranCont');

// router.get('/', (req, res) => {
//     res.send('quran page')
// })

router.get('/', quranCont.quranList)

module.exports = {
    router
};
