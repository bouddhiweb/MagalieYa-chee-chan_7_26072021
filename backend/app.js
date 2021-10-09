require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
console.log(path.join(__dirname, 'image'))
app.use('/image', express.static(path.join(__dirname, 'image')));

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

//CORS - Blocks HTTP calls between different servers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());


app.use('/auth', userRoutes);
app.use('/content', postRoutes);
app.use('/comment', commentRoutes);

module.exports = app;