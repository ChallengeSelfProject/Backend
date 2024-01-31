require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;


app.use(express.urlencoded({ extended:false }));
app.use(express.json);

app.listen(port, () => {
    console.log('app running on port', port);
});

module.exports = app;