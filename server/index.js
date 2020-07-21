const dotenv = require('dotenv')
const result = dotenv.config()

const express = require('express');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

//router
const { router } = require('./routes');
const errorHanler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)
app.use(errorHanler)

app.listen(port, () => {
  console.log('Listening in port :', port);
})