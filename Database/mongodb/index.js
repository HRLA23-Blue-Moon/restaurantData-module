//import orm
const mongoose = require('mongoose');

//connect orm
mongoose.connect('mongodb://localhost:27017/yelp',{ useNewUrlParser: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', () => console.log('connected to mongodb'));

module.exports = connection;