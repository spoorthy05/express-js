const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config');
const app = express()
const port = config.api_port
const db = require('./queries')
var cors = require('cors');

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Relayr API' })
  })

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)  



app.listen(port, () => {
    console.log(`API's running on port ${port}.`)
})  

app.get('/users', db.getUsers)