//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();


app.use(
  cors({
    origin: "*"
  }
));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.use("/", require('./routes/list'));


app.listen(8000, function() {
  console.log("Server started on port 8000");
});



