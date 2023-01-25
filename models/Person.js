const mongoose = require('mongoose')

// aqui estamos criando um modelo de dados
// métodos para salvar, ler e atualizar dados

const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person