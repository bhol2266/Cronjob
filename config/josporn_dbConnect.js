
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const db_josporn = mongoose.createConnection("mongodb+srv://ukdevelopers007:0zWn68vwCnI7nxN9@cluster0.ql5r5ax.mongodb.net/Josporn", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db_josporn.on('error', error => {
  console.error("Error connecting to db_josporn:", error);
});


//This is comitted to stop connecting to the db_josporn due to which the desikahaniya db was not connecting properly
// db_josporn.once('open', () => {
//   console.log('Connected to db_josporn');
// });

module.exports = db_josporn;
