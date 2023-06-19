const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (!password) {
  console.log('missing password')
  process.exit(1)
}

const url =
  `mongodb+srv://sutipong:${password}@cluster0.bkfpmeo.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {

  // Return all persons
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })

} else {
  // Save person
  const person = new Person({
    name: name,
    number: number,
  })
  
  // SAVE PERSON
  person.save().then(result => {
    console.log("phonebook:")
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
  
}
