var React = require('react/addons'),
	LapCounter = require('./app.js'),
	PureRenderMixin = React.addons.PureRenderMixin;

var Tutorial = React.createClass({displayName: "Tutorial",
	mixins: [PureRenderMixin],
	
	getInitialState: function() {
		return {
			step: 0
		};
	},
	
	getCurrentStep: function() {
		var steps = [
			{name:"set_laps",
				jsx: React.createElement("div", {id: "set_laps"}, "Enter the number of laps."),
				props: {}
			},
			{name:"add_athlete",
				jsx: React.createElement("div", {id: "add_athlete"}, "Add each athlete in the race by name and hip number."),
				props: {
					total_laps: 25
				}
			},
			{name:"start",
				jsx: React.createElement("div", {id: "start"}, "Tap here to start the clock once the race has begun."),
				props: {
					total_laps: 25,
					athletes: [
						{"hip_number":"13","name":"Lucy Cheadle","splits":[],"laps":25},
						{"hip_number":"14","name":"Sophia Meehan","splits":[],"laps":25},
						{"hip_number":"11","name":"Amy Regan","splits":[],"laps":25},
						{"hip_number":"17","name":"Frances Loeb","splits":[],"laps":25},
						{"hip_number":"12","name":"Kelley Riffenburgh","splits":[],"laps":25}
					]
				}
			},
			{name:"athlete",
				jsx: React.createElement("div", {id: "athlete"}, "Tap an athlete each time they complete a lap. This will move them to the bottom of the queue."),
				props: {}
			},
			{name:"athlete_time",
				jsx: React.createElement("div", {id: "athlete_time"}, "The athletes current lap split is shown here."),
				props: {}
			},
			{name:"athlete_laps",
				jsx: React.createElement("div", {id: "athlete_laps"}, "The athlete's numer of laps remaining"),
				props: {}
			},
			{name:"total_laps",
				jsx: React.createElement("div", {id: "total_laps"}, "The laps remaining for the current leader is displayed here. The lap sign should match this whenever the leader is approaching."),
				props: {}
			},
			{name:"undo",
				jsx: React.createElement("div", {id: "undo"}, "If you tap an athlete accidentally you can undo by tapping here."),
				props: {}
			},
			{name:"done",
				jsx: React.createElement("div", {id: "done"}, "That's it! Tap the \"Next\" button to practice."),
				props: {}
			}
		];
		
		return steps[this.state.step]
	},
	
	nextStep: function() {
		this.setState({step: this.state.step + 1});
	},
	
	render: function() {
		return (React.createElement("div", null, 
			React.createElement(LapCounter, React.__spread({},  this.getCurrentStep().props)), 
			React.createElement("div", {id: "tutorial"}, 
				this.getCurrentStep().jsx, 
				React.createElement("div", {onClick: this.nextStep, id: "next-button"}, "Next")
			)
		));
	}
});

module.exports = Tutorial;