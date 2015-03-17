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
      }.bind(null, this));
      return { 
          total_laps: this.props.total_laps,
          athletes: athletes
      };
    },
  
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(StatusBar, null), 
				React.createElement(List, {total_laps: this.props.total_laps, athletes: this.props.athletes})
			)
		);
	}
});

React.render(
  React.createElement(LapCounter, {total_laps: 5, athletes: test_data}), document.getElementById('app')
);