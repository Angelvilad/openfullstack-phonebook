const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const connectionString = process.env.MONGO_DB_URI;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  number: String
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;