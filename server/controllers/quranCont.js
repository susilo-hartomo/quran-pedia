const axios = require('axios');

class quranCont {

    static quranList(req, res, next) {
        axios({
            method: 'GET',
            url: 'http://api.alquran.cloud/v1/quran/ar.alafasy'
        })
            .then((data) => {
                if (data.data.code == 200) {
                    res.status(200).json(data.data)
                } else {
                    next({ name: 'DATA_NOT_FOUND' })
                }
            }).catch((err) => {
                next({ name: 'EROR_SERVER' })
            });
    }

}

module.exports = {
    quranCont
};
