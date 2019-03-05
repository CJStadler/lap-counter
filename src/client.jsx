var React = require('react'),
	LapCounter = require('./app.jsx'),
	Tutorial = require('./tutorial.jsx');

if (document.getElementById('tutorial') !== null) {
	React.render(
		<Tutorial />, document.getElementById('app')
	);
} else {
	React.render(
		<LapCounter />, document.getElementById('app')
	);
  console.log("hello");
}
