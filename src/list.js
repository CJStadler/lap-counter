var React = require('react/addons'),
	Athlete = require('./athlete.js'),
	ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
	PureRenderMixin = React.addons.PureRenderMixin;

var List = React.createClass({
	mixins: [PureRenderMixin],
	
	render: function() {
		var athletes = this.props.athletes.map(function(athlete, i) {
			// before starting the key should be one less, so that everything doesn't enter and exit on starting.
			var laps = athlete.laps;
			if (! this.props.started) {
				laps -= 1;
			}
				
			return <Athlete
					started={this.props.started}
					athlete={athlete}
					leader={this.props.leader}
					key={athlete.hip_number+" "+laps}
					start_time={athlete.start_time}
					lapCompleted={this.props.lapCompleted}
					i={i}/>;
		}.bind(this))
		// returning an empty transition group seems to cause issues.
		if (this.props.athletes.length > 0) {
			return (
			  <ReactCSSTransitionGroup transitionName="queue">{athletes}</ReactCSSTransitionGroup>
			);
		} else {
			return <div></div>;
		}
	}
});

module.exports = List;
