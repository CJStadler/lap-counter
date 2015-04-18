// This picks up the server rendered app
var React = require('react'),
	LapCounter = require('./app.js');

React.render(
	React.createElement(LapCounter, null), document.getElementById('app')
);

