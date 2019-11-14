var resources = require('./../../resources/model');
var sensorDriver = require('node-dht-sensor');

var interval, sensor;
var device = resources.pi.sensors.dht;
var localParams = {'frequency': 2000};

function connectHardware(){
    sensor = {
        initialize : function(){
            sensorDriver.initialize(device.model, device.gpio)
        },
        read : function(){
           var driverReader = sensorDriver.read() ;
           device.temperature.value = parseFloat(driverReader.temperature.toFixed(2));
           device.humidity.value = parseFloat(driverReader.humidity.toFixed(2));
        }
    }
    sensor.initialize();
    sensor.read();
    interval = setInterval(function () {
		sensor.read();
	}, localParams.frequency);
}
exports.start = function (params){
    localParams = params ? params : localParams;
    connectHardware();
}
exports.stop = function (){
    clearInterval(interval)
}
