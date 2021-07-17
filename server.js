const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
//const mongoose = require('mongoose');
const Person = require('./models/phonebook');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static('build')); // To serve static files such as images, CSS files, and JavaScript files.
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

morgan.token('data', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    else {
        return ''
    }
});

let persons = 
[
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23-6423122"
    }
]

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    }  else if (error.name === 'ValidationError') {
        console.log(`errorHandler validation error..`);
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Phonebook Backend');
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then(data => {
        res.json(data)
    })
});

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
});

app.get('/info', (req, res) => {
    Person.find({}).then(data => {
        let numberOfEntries = data.length
        let date = new Date()
        res.send(`
            Phonebook has info for ${numberOfEntries} people <br><br>
            ${date}
        `)
    })
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
    .then(() => {
        console.log(`Successfully deleted User!`);
        res.status(204).end()
    })
    .catch(error => next(error))

});

app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    console.log(body);
    if (!body.name) {
        return res.status(404).json({
            error: 'name is missing'
        })
    } else if (!body.number) {
        return res.status(404).json({
            error: 'number is missing'
        });
    }; 

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
    .then(newPerson => newPerson.toJSON())
    .then(savedPerson => {
        console.log('Person saved to database successfully! :)');
        res.json(savedPerson)
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(newPerson => {
        res.json(newPerson.toJSON())
    })
    .catch(error => next(error))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});