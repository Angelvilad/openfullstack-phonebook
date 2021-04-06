const mongoose = require('mongoose');

if(process.argv.length !==3 && process.argv.length !== 5) {
  console.log('Invalid number of parameters.'
    + '\nYou must specify only password to fetch data from database,'
    + '\nor especify password name number for create a document in database');
  process.exit(1);
}

// password must be converted into valid URI
const password = encodeURIComponent(process.argv[2]);

const connectionString = `mongodb+srv://meAdmin:${password}@cluster0.kkkog.mongodb.net/phonebookDatabase?retryWrites=true&w=majority`;

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
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

switch (process.argv.length) {
  case 3:
    Person.find({})
      .then(result => {
        console.log('phonebook:');
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close();
      });
    break;
  
  case 5:
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
      name: name,
      number: number
    });

    person.save()
      .then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
      })
      .catch(err => {
        console.error(err);
      });
    break;

  default:
    break;
}