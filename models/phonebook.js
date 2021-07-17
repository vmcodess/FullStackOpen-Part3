const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator')
require('dotenv').config()

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {
    console.log('Connected to DB!')
})
.catch((err) => {
    console.log(`error connecting to db: ${err}`)
})

const phonebookSchema = new mongoose.Schema({
    name: {type: String, minLength: 3, required: true, unique: true},
    number: {type: String, minLength: 8, required: true, unique: true}
})

phonebookSchema.plugin(validator)

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

//const Person = mongoose.model('Users', phonebookSchema)

module.exports = mongoose.model('Users', phonebookSchema)

