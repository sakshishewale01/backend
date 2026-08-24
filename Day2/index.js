const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/instagram',(req,res) => {
    res.send('<h1>Welcome to Instagram</h1>');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});