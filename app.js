const express = require('express');
const app = express();

/* movies */
const movies = require('./models/movies');

/* view */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
