const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());

morgan.token('showDataPost', function(req, res){
  if(req.method === 'POST') return JSON.stringify(req.body);
});
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.url(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    tokens.showDataPost(req, res)
  ].join(' ');
}));

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122'
  }
];

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find(person => person.id === id);

  if(person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter(person => person.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const person = request.body;

  if(!person || !person.name || !person.number) {
    return response.status(400).json({error: 'name and number properties are required'});
  }

  if(phonebook.some(item => item.name === person.name)) {
    return response.status(400).json({error: 'name already exists'});
  }
  
  const newPerson = {
    //random integer range 0 - 100000
    id: Math.floor(Math.random() * 100001),
    name: person.name,
    number: person.number
  };

  phonebook = [...phonebook, newPerson];

  response.status(201).json(newPerson);
});

app.get('/info', (request, response) => {
  const dateNow = new Date();

  response.send(
    `<p>Phonebook has info for ${phonebook.length} people</p>
    <p>${dateNow}</p>`);
});

const PORT = process.env.3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});