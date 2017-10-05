const express = require('express')
const app = express()

app.use('/', express.static(__dirname + 'index.html'))
app.use('/src', express.static('src'))

app.listen(8080, function () {
  console.log('Server is running in http://localhost:8080')
})