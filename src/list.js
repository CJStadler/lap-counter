var React = require('react/addons'),
	Athlete = require('./athlete.js');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var List = React.createClass({
 
  render: function() {
    return (
      <ReactCSSTransitionGroup transitionName="queue">{
        this.props.athletes.map(function(athlete, i) {
			// before starting the key should be one less, so that everything doesn't enter and exit on starting.
			var laps = athlete.laps;
			if (! this.props.started) {
				laps -= 1;
			}
			// check if leader
			var leader = false;
			if (this.props.leader && this.props.leader.hip_number == athlete.hip_number) {
				leader = true;
			}	
				
			return <Athlete started={this.props.started} athlete={athlete} leader={leader} key={athlete.hip_number+" "+laps} start_time={athlete.start_time} lapCompleted={this.props.lapCompleted} i={i}/>;
		}.bind(this))
      }</ReactCSSTransitionGroup>
    );
  }
});

module.exports = List;
