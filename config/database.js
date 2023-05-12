const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://Charley:Charlesthegr8@cluster0.e4vye6e.mongodb.net/son-of-a-beach?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

