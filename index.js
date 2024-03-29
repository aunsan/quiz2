const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const studentSchema = new mongoose.Schema({
  name: String,
  studentID: Number
});

// Create a Model object
const W24student = mongoose.model("W24student", studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const url = req.body.myuri;

  // connect to the database and log the connection
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to Mongodb Database");

      // add the data to the database
      var student = new W24student({
        name: "Aung San Oo",
        studentID: 300367477
      });

      // var student = await student.save();

      // if(student) {
      //   res.send(`<h1>Document  Added</h1>`)
      // } else {
      //   res.send(`<h1>Document  Added</h1>`)
      // }

      student.save()
        .then(() =>  res.send(`<h1>Document  Added</h1>`))
        .catch(() => res.send(`<h1>Error Adding Document</h1>`));
  })
  .catch(err => {
    console.log("ERROR Connecting to MongoDB Database" + err);
    res.send(`<h1>ERROR Connecting to MongoDB Database</h1>`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
