const express = require('express');
const connectToMongo = require('./db/connection.js/conn');
// const cors = require('cors');
const app = express();

const Port = 5000;
connectToMongo();
// app.use(cors);
app.use(express.json());
app.use(express.static('public'));
app.use("/", require("./routers/api"));

app.listen(Port, ()=> {
    console.log('listening on port',Port);
});