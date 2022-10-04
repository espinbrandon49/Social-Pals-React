const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.connect('mongodb://localhost:27017/socialNetworkDB',function(){
//     /* Drop the DB */
//     mongoose.connection.db.dropDatabase();
// });

module.exports = mongoose.connection;
