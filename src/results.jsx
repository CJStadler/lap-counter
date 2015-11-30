var React = require('react'),
	formatTime = require('./timer.js').formatTime;
	
var Results = React.createClass({
	render: function() {
		return (<div  id="results">
			<h2>---------- Results ----------</h2>
			<ol>
				{this.props.athletes.map(function(a, i) {
					return <li key={a.name}><span className="place">{i+1}</span><span className="name">{a.name}</span><span className="time">{formatTime(a.start_time - this.props.start_time)}</span></li>
				}.bind(this))}
			</ol>
		</div>);
	}
});

module.exports = Results;