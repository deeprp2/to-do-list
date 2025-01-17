//server/server.js
var express = require('express');
var router = require('./routes/routes.js');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// DB Config
const db = require("../config/keys").mongoURI;

try {
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>
        () => console.log("MongoDB successfully connected")
    )
    .catch(err => console.log(err));
 }
catch (e) {
    console.log(e);
}

app.use('/', router);
module.exports=app;