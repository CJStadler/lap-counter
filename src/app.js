// imports
var React = require('react/addons'),
	List = require('./list.js'),
	StatusBar = require('./status_bar.js'),
	forms = require('./form.js'),
	AthleteForm = forms.athlete_form,
	LapsForm = forms.laps_form,
	Results = require('./results.js');
	
var PureRenderMixin = React.addons.PureRenderMixin;

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
	
var test_data = [
    {hip_number: 1, name: "Cheadle"},
    {hip_number: 2, name: "Regan"},
    {hip_number: 3, name: "Loeb"},
    {hip_number: 4, name: "Meehan"},
    {hip_number: 5, name: "Riffenburgh"},
];

var previous_states = [];

var LapCounter = React.createClass({
	mixins: [PureRenderMixin],
	
	getInitialState: function() {
		return {
			total_laps: 0,
			athletes: [],
			finished: [],
			start_time: 0,
			started: false,
			distance: "5000m"
		};
    },
	
	componentWillReceiveProps: function(new_props) {
		this.setState(new_props);
	},
	
	componentWillMount: function() {
		previous_states.push(this.state);
	},
	
	componentWillUpdate: function(next_props, next_state) {
		// store previous state somewhere
		previous_states.push(JSON.parse(JSON.stringify(next_state)));
	},
	
	restorePreviousState: function() {
		var l = previous_states.length;
		if (l > 0) {
			this.setState(previous_states.splice(l-2, 2)[0]);
		}
	},
	
	startRace: function() {
		if (this.state.total_laps > 0 && this.state.athletes.length >0) {
			var start_time = new Date().getTime();
			this.setState({
				started: true,
				start_time: start_time,
				athletes: this.state.athletes.map(function(a) {
					a.start_time = start_time;
					a.laps -= 1;
					return a;
				})
			});
		}
	},
	
	// When an athlete is clicked subtract from their lap count and move them to the bottom of the queue.
	lapCompleted: function(i) {
		if (this.state.started) {
			var athletes = this.state.athletes.slice();
			var athlete = athletes.splice(i, 1)[0];

			athlete.laps -= 1;
			athlete.splits.push((new Date().getTime()) - athlete.start_time);
			athlete.start_time = new Date().getTime();
			if (athlete.laps == -1) { // Finished
				var finished = this.state.finished.slice();
				finished.push(athlete);
				this.setState({finished: finished, athletes: athletes});
				console.log(athlete.name + " finished");
			} else {
				athletes.push(athlete);
				this.setState({athletes: athletes});
			}
		}
	},

	getLeader: function() {
		if (this.state.started && this.state.athletes.length > 0) {
			var min = this.state.athletes[0].laps;
			var min_id = 0; // index of athlete with lowest laps so far;
			var n = this.state.athletes.length;
			for (var i=1; i<n; i++) { // looping from left to right will guarantee that we get the FIRST person with the lowest laps.
				if (this.state.athletes[i].laps < min) {
					min = this.state.athletes[i].laps;
					min_id = i;
				}
			}
			return this.state.athletes[min_id];
		} else {
			return false;
		}
	},
	
	leaderLaps: function() {
		if (this.state.started) {
			if (this.state.athletes.length > 0) {
				return this.state.athletes.reduce(function(min, athlete) {
					return (athlete.laps < min ? athlete.laps : min);
				}, this.state.total_laps);
			} else {
				// All finished
				return -1;
			}
		} else {
			return this.state.total_laps;
		}
	},
	
	setLaps : function(laps) {
		this.setState({total_laps: laps});
	},
	
	hipNotUnique: function(n) {
		// false if unique
		return this.state.athletes.some(function(a) {
			return a.hip_number == n;
		});
	},
	
	createAthlete: function(hip, name) {
		var athletes = this.state.athletes.slice();
		var athlete = {
			hip_number: hip,
			name: name,
			splits: [],
			laps: this.state.total_laps
		};
		athletes.push(athlete);
		this.setState({athletes: athletes});
	},
	
	render: function() {
		var form;
		if (this.state.total_laps === 0) { // not yet set
			form = <LapsForm setLaps={this.setLaps} error={this.state.error}/>;
		} else if (! this.state.started) {
			form = <AthleteForm createAthlete={this.createAthlete} hipNotUnique={this.hipNotUnique} />;
		}
		
		var results;
		if (this.state.finished.length > 0) {
			results = <Results start_time={this.state.start_time} athletes={this.state.finished} />;
		}
		
		return (
			<div>
				<StatusBar
					startRace={this.startRace}
					started={this.state.started}
					start_time={this.state.start_time}
					distance={this.state.distance}
					laps_remaining={this.leaderLaps()}
					undo={this.restorePreviousState}
				/>
				{form}
				<List
					finished={false}
					started={this.state.started}
					total_laps={this.state.total_laps}
					leader={this.getLeader()}
					athletes={this.state.athletes}
					lapCompleted={this.lapCompleted}
				/>
				{results}
			</div>
		);
	}
});

module.exports = LapCounter;