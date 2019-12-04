var resources = require('./../../resources/model');
var Gpio = require('onoff').Gpio; 
var sensor;
var device = resources.pi.sensors.pir;

function connectHardware(){
    sensor = new Gpio(device.gpio, 'in', 'both') 
    sensor.watch(function(error, value){
        if (error) {
            return;
        }
        device.value = !!value;
    })
}
exports.start = function (params) {
    connectHardware();
};

exports.stop = function (){
    sensor.unexport();
};