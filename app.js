const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routerUsers = require('./src/users/users.router')

require('dotenv').config();

mongoose.connect(process.env.BD, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.port || 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', routerUsers)



app.listen(port, () => {
    console.log(`Start server at http://localhost:${port}`)
})