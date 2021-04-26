require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person.js');
const handleErrors = require('./middlewares/handleErrors.js');

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

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons);
    })
    .catch(err => next(err));
});

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  
  Person.findById(id)
    .then(
      person => {
        if(person){
          response.json(person);
        } else {
          response.status(404).end();
        }
      }
    )
    .catch(err => next(err));
});

app.delete('/api/persons/:id', (request, response, next) => {
  const {id} = request.params;

  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end();
    })
    .catch(err => next(err));
  
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;
  
  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then(savedPerson => {
      response.status(201).json(savedPerson);
    })
    .catch(err => next(err));
});

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const personDataToUpdate = {
    number: body.number
  };

  Person.findByIdAndUpdate(id, personDataToUpdate, {new: true, runValidators: true})
    .then(result => {
      response.status(200).json(result);
    })
    .catch(err => next(err));
});

app.get('/info', (request, response) => {
  const dateNow = new Date();

  Person.find({})
    .then(people => {
      response.send(
        `<p>Phonebook has info for ${people.length} people</p>
        <p>${dateNow}</p>`);
    })
});

app.use(handleErrors);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});