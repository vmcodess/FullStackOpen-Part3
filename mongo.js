// const mongoose = require('mongoose');
// require('dotenv').config()

// if (process.argv.length < 3) {
//     console.log('Please provide the password as an argument: node mongo.js <password>');
//     process.exit(1);
// };

// //const password = process.argv[2];
// const url = 
// `mongodb+srv://fullstack:${process.env.MONGO_DB_PASSWORD}@cluster0.geiqr.mongodb.net/phonebook?retryWrites=true&w=majority`;

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
// .then(() => {
//     console.log('Connected to DB!')
// })
// .catch((err) => {
//     console.log(`error connecting to db: ${err}`)
// })

// const phonebookSchema = new mongoose.Schema({
//     name: String,
//     number: String,
// })

// const Person = mongoose.model('Users', phonebookSchema)

// // const user = new Phonebook({
// //     name: process.argv[3],
// //     number: process.argv[4],
// //     date: new Date()
// // })

// if (process.argv.length[3]) {
//     const name = process.argv[3]
//     const number = process.argv[4]
//     const person = new Person({
//         name: name,
//         number: number
//     })

//     person.save().then(result => {
//         console.log(`added ${user.name} number ${user.number} to phonebook`)
//         mongoose.connection.close()
//     })
// } else {
//     Person.find({}).then(result => {
//         console.log('phonebook')
//         result.forEach(person => {
//             let p = `${person.name} ${person.number}`
//             console.log(p)
//         })
//         mongoose.connection.close()
//     })
// }




