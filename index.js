const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

// **BONUS**: Remove a user's associated thoughts when deleted
// Use a getter method to format the timestamp on query
// validate an element exists before updating or deleting 
// separate routes and controller concerns 