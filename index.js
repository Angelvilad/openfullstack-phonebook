require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person.js');
//Queda redefinir el metodo toJSON para obtener en el json de respuesta la propiedad id bien nombrada y eliminar la otra que no usamos, modularizar mongoose, poner la connectionString como una var de entorno con dotenv...etc.

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

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

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons);
    })
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

app.delete('/api/persons/:id', (request, response, next) => {
  const {id} = request.params;

  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end();
    })
    .catch(err => next(err));
  
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if(!body || !body.name || !body.number) {
    return response.status(400).json({error: 'name and number properties are required'});
  }
  
  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then(savedPerson => {
      response.status(201).json(savedPerson);
    });

});

app.get('/info', (request, response) => {
  const dateNow = new Date();

  response.send(
    `<p>Phonebook has info for ${phonebook.length} people</p>
    <p>${dateNow}</p>`);
});
process
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});