var React = require('react/addons'),
	LapCounter = require('./app.js'),
	PureRenderMixin = React.addons.PureRenderMixin;

var Tutorial = React.createClass({
	mixins: [PureRenderMixin],
	
	getInitialState: function() {
		return {
			step: 0
		};
	},
	
	getCurrentStep: function() {
		var steps = [
			{name:"set_laps",
				jsx: <div id="set_laps">Enter the number of laps.</div>,
				props: {}
			},
			{name:"add_athlete",
				jsx: <div id="add_athlete">Add each athlete in the race by name and hip number.</div>,
				props: {
					total_laps: 25
				}
			},
			{name:"start",
				jsx: <div id="start">Tap here to start the clock once the race has begun.</div>,
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
				jsx: <div id="athlete">Tap an athlete each time they complete a lap. This will move them to the bottom of the queue.</div>,
				props: {
					start_time: new Date().getTime(),
					started: true,
					athletes: [
						{"hip_number":"13","name":"Lucy Cheadle","splits":[],"laps":24},
						{"hip_number":"14","name":"Sophia Meehan","splits":[],"laps":24},
						{"hip_number":"11","name":"Amy Regan","splits":[],"laps":24},
						{"hip_number":"17","name":"Frances Loeb","splits":[],"laps":24},
						{"hip_number":"12","name":"Kelley Riffenburgh","splits":[],"laps":24}
					]
				}
			},
			{name:"athlete_time",
				jsx: <div id="athlete_time">The athletes current lap split is shown here.</div>,
				props: {}
			},
			{name:"athlete_laps",
				jsx: <div id="athlete_laps">The athlete's numer of laps remaining</div>,
				props: {}
			},
			{name:"total_laps",
				jsx: <div id="total_laps">The laps remaining for the current leader is displayed here. The lap sign should match this whenever the leader is approaching.</div>,
				props: {}
			},
			{name:"undo",
				jsx: <div id="undo">If you tap an athlete accidentally you can undo by tapping here.</div>,
				props: {}
			},
			{name:"done",
				jsx: <div id="done">That's it! Tap the "Next" button to practice.</div>,
				props: {}
			}
		];
		
		return steps[this.state.step]
	},
	
	nextStep: function() {
		this.setState({step: this.state.step + 1});
	},
	
	render: function() {
		var step = this.getCurrentStep();
		return (<div>
			<LapCounter {...this.getCurrentStep().props} />
			<div id="tutorial" className={"tutorial-"+step.name}>
				{step.jsx}
				<div onClick={this.nextStep} id="next-button">Next</div>
			</div>
		</div>);
	}
});

module.exports = Tutorial;