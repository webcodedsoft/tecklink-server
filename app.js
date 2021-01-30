const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' })

const app = express();
mongoose.connect(process.env.mongoUrlDev, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => { console.log("Connected")})

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(process.env.PORT);

