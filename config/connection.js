const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


// mongoose.connect('mongodb://localhost:27017/socialNetworkDB',function(){
//     /* Drop the DB */
//     mongoose.connection.db.dropDatabase();
// });socialNetworkDB

module.exports = mongoose.connection;
