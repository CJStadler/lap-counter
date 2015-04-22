// This picks up the server rendered app
var React = require('react'),
	LapCounter = require('./app.js'),
	Tutorial = require('./tutorial.js');

if (document.getElementById('tutorial') !== null) {
	React.render(
		React.createElement(Tutorial, null), document.getElementById('app')
	);
} else {
	React.render(
		React.createElement(LapCounter, null), document.getElementById('app')
	);
}
