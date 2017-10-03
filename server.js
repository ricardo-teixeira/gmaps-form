const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/src', express.static('src'))

app.listen(8080, function () {
  console.log('Server is running in http://localhost:8080')
})