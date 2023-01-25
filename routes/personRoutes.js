// usar o router do express, que permite criar rotas
const router = require('express').Router();
const Person = require('../models/Person')

// CREATE

router.post('/', async (req, res) => {

    //req.body
    const {name, salary, approved} = req.body;

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatório.'})
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        // criando dados
        await  Person.create(person)
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso.'})
        
    } catch (error) {
       res.status(500).json({error: error})
    }

})

// READ

router.get('/', async (req, res) => {

    try {
        const people = await Person.find()
        if(!people) {
            res.status(422).json({message: 'banco vazio'})
            return
        }
        res.status(200).json(people)
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.get('/:id', async (req, res) => {
    // extraindo o dado da req através da url = req.params

    const id = req.params.id

    try {
        
        const person = await Person.findOne({_id: id})

        if(!person) {
            res.status(422).json({message: 'usuário não encontrado'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Update - atualização de dados (PUT, PATCH)
// PUT espera que enviemos um objeto completo 
// PATCH pode ser usado para atualizar um campo só

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {name, salary, approved} = req.body;

    const person = {
        name,
        salary,
        approved,
    }

    try {
        // atualizar o dado e retornar
        const updatedPerson = await Person.updateOne({_id: id}, person)

        console.log(updatedPerson)

        // validando se o user existe
        if(updatedPerson.matchedCount === 0) {
            res.status(422).json({message: 'Usuário não encontrado!'})
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Delete - deletar dados
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    const person = await Person.findOne({_id: id})

        if(!person) {
            res.status(422).json({message: 'usuário não encontrado'})
            return
        }

        try {
            
            await Person.deleteOnde({_id: id})
            res.status(200).json({message: 'usuário removido com sucesso'})

        } catch (error) {
            res.status(500).json({error: error})
            return
        }

        res.status(200).json(person)

})

module.exports = router