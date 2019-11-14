var actuatorRoutes = require('./../routes/actuators');
var sensorRoutes = require('./../routes/sensors');
var express = require('express'),
	cors = require('cors');

var app = express();

app.use(cors());
app.use('/pi/sensors', sensorRoutes);
app.use('/pi/actuators', actuatorRoutes);

app.get('/', function(req, res){
    res.send('You have now to access to the root in the condition ');
});
app.get('/pi', function(req, res){
    res.send('You have now to access to the root in the condition ');
});

console.log("done prepping server");
module.exports = app;
