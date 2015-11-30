// This picks up the server rendered app
var React = require('react'),
	LapCounter = require('./app.js'),
	Tutorial = require('./tutorial.js');

if (document.getElementById('tutorial') !== null) {
	React.render(
		<Tutorial />, document.getElementById('app')
	);
} else {
	React.render(
		<LapCounter />, document.getElementById('app')
	);
}
