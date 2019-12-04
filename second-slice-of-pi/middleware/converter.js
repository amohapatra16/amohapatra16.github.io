var json2html = require('node-json2html');

module.exports = function() {
	return function (req, res, next) {
		// TODO 2: Create the converter function
		if (req.result) {
			next()
		}
		res.send(req.result);
		if (req.accepts('html')){
			let transform = {'<>': 'div', 'html': [
				{'<>': 'p', 'html': [
					{'<>': 'b', 'html': 'Name: '},
					{'<>': 'p', 'html': '${Name}'}
				]},
				{'<>': 'p', 'html': [
					{'<>': 'b', 'html': 'Description: '},
					{'<>': 'p', 'html': '${Descripton}'}
				]},
				{'<>': 'p', 'html': [
					{'<>': 'b', 'html': 'Value: '},
					{'<>': 'p', 'html': '${Value}'}
				]}
			]};

		}

	};
};
