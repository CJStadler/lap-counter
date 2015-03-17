var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var test_data = [
    {hip_number: 1, name: "Cheadle"},
    {hip_number: 2, name: "Regan"},
    {hip_number: 3, name: "Loeb"},
    {hip_number: 4, name: "Meehan"},
    {hip_number: 5, name: "Riffenburgh"},
]

var LapCounter = React.createClass({displayName: "LapCounter",
	getInitialState: function() {
      console.log("total laps: " +this.props.total_laps);
      athletes = this.props.athletes.map(function(a) {
          // One less because the first time they come by they will have finished a lap.
          a.laps = this.props.total_laps - 1; 
          return a;
      }.bind(this));
      return { 
          total_laps: this.props.total_laps,
          athletes: athletes
      };
    },
	
	// When an athlete is clicked subtract from their lap count and move them to the bottom of the queue.
	lapCompleted: function(i) {
		var athletes = this.state.athletes.slice();
		var athlete = athletes.splice(i, 1)[0];
		athlete.laps -= 1;
		athletes.push(athlete);
		this.setState({athletes: athletes});

		console.log('Person ' + this.state.athletes[i].n +" will have "+this.state.athletes[i].laps+" laps.");
	},

	leaderLaps: function() {
		return this.state.athletes.reduce(function(min, athlete) {
			
		}, this.state.total_laps);
	},
  
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(StatusBar, {laps_remaining: this.leaderLaps()}), 
				React.createElement(List, {total_laps: this.state.total_laps, athletes: this.state.athletes, lapCompleted: this.lapCompleted})
			)
		);
	}
});

React.render(
  React.createElement(LapCounter, {total_laps: 5, athletes: test_data}), document.getElementById('app')
);