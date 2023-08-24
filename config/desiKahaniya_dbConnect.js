

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const db_desiakahaniya = mongoose.createConnection("mongodb+srv://bhola:IyNs48Pf1SNHUWpu@cluster0.acjho.mongodb.net/desikahaniya?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db_desiakahaniya.on('error', error => {
  console.error("Error connecting to db_desiakahaniya:", error);
});

db_desiakahaniya.once('open', () => {
  console.log('Connected to db_desiakahaniya');
});

module.exports = db_desiakahaniya;

