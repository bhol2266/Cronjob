const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose Is Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
