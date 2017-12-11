/**
 * Created by SeedofWind on 6/19/17.
 */
var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://localhost/webdev'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds031561.mlab.com:31561/heroku_bf49z5k7'; // user yours
}




mongoose.connect(connectionString);




require('./services/user.service.server');
require('./services/book.service.server');
require('./services/order.service.server');
require('./services/shelf.service.server');