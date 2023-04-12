require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var mongoose = require('mongoose')
var createError = require("http-errors")


var categories = require('./routes/categories');
var products = require('./routes/products');
var varients = require('./routes/varients');
var review = require('./routes/review');
var cartItem = require('./routes/cartItem');
var cart = require('./routes/carts');




var user = require('./routes/userRoutes');

var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/user', user);
app.use("/api/category", categories);
app.use("/api/product", products);
app.use("/api/varients", varients);
app.use("/api/review", review);
app.use("/api/cartItem", cartItem);
app.use("/api/cart", cart);





mongoose
    .connect(process.env.URL, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected Successfully to the Database");
    })
    .catch(console.error);

//error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        success: false,
        message: err.message,
    });
});

// Undefined routes error handling
app.use((req, res, next) => {
    next(createError(404));
});


module.exports = app;
