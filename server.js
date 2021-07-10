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

let persons = [
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

app.get('/', (req, res) => {
    res.send('Phonebook Backend');
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then(data => {
        res.json(data)
    })
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
    .then(person => {
        res.json(person)
    })
    .catch((err) => {
        console.log(`Error finding person by id: ${err}`);
    })
});

app.get('/info', (req, res) => {
    let numberOfEntries = persons.length;
    let date = new Date();
    res.send(`
        Phonebook has info for ${numberOfEntries} people <br><br>
        ${date}
    `);
});

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
    .then(() => {
        console.log(`Successfully deleted User!`);
        res.status(204).end()
    })
    .catch((err) => {
        console.log(`Error deleting user: ${err}`);
    })

});

// I'm a bit confused.. 3.14 -> "At this point, you can choose to simply allow users to create all phonebook entries. 
//                               At this stage, the phonebook can have multiple entries for a person with the same name."
// 
// In our frontend that we included in this repository (build), we would need to change the ability to add entries for a person with the same name?
app.post('/api/persons', (req, res) => {
    const body = req.body;

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

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});