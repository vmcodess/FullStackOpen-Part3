const express = require('express');
const app = express();
app.use(express.json());
const morgan = require('morgan');
const cors = require('cors');
const Phonebook = require('./mongo')
require('dotenv').config()
const PORT = process.env.PORT || 3001;

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
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];



app.get('/', (req, res) => {
    res.send('Phonebook Backend');
});

app.get('/api/persons', (req, res) => {
    res.json(users)
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
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
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

const generateId = () => {
    return Math.floor(Math.random() * 100);
};

app.post('/api/persons', (req, res) => {
    const person = req.body;
    const nameExists = persons.find(p => p.name === person.name);

    if (!person.name) {
        return res.status(404).json({
            error: 'name is missing'
        })
    } else if (nameExists) {
        return res.status(400).json({
            error: 'name already exists'
        })
    } else if (!person.number) {
        return res.status(404).json({
            error: 'number is missing'
        });
    };

    person.id = generateId();
    persons = persons.concat(person);
    res.json(persons);
});

// deployed to heroku : success
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});