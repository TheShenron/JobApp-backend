const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
const connect =  mongoose.connect(process.env.MongoDBUrl )

module.exports = connect