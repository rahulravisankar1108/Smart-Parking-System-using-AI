const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.uri
mongoose
    .connect( uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));
const connection = mongoose.connection
connection.once('open',()=>{
    console.log('MongoDB connected successfully')
})  

module.exports = connection;