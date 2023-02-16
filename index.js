// configuração inicial
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express();

// const Person = require('./models/Person')

// forma de ler JSON / middlewares - programas executados entre as req e res
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


// rotas da API 
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inicial / endpoint para acessar no postman
app.get('/', (req, res) => {
    // mostrar req
    res.json({message: 'olá express'})
})
// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.yfphxbx.mongodb.net/bancoDaApi?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conectado ao MongoDB.')
    app.listen(3000);
})
.catch((err) => console.log(err))