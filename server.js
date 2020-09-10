const express = require('express');
const path = require('path');
const cors=require('cors');

const app = express();


require('dotenv').config();

app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log(`App listening at ${port}`);