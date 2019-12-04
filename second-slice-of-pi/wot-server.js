console.log("loading server/resources");
var httpServer = require('./servers/http'),
	resources = require('./resources/model');

console.log("loading dhtplugin");
var dhtPlugin = require('./plugins/internal/dhtPlugin');

console.log("loading pirplugin");
var pirPlugin = require('./plugins/internal/pirPlugin');

console.log("starting pirplugin");
pirPlugin.start({});
console.log("starting dhtplugin");
dhtPlugin.start({'frequency': 2000});

console.log("starting server");

var server = httpServer.listen(resources.pi.port, function () {
	console.log("Running the Pi on port " + resources.pi.port);
});

process.on('SIGINT', function() {
	pirPlugin.stop();
	dhtPlugin.stop();
	process.exit();

});


