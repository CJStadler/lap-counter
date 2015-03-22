var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var test_data = [
    {hip_number: 1, name: "Cheadle"},
    {hip_number: 2, name: "Regan"},
    {hip_number: 3, name: "Loeb"},
    {hip_number: 4, name: "Meehan"},
    {hip_number: 5, name: "Riffenburgh"},
]

var LapCounter = React.createClass({
	getInitialState: function() {
		var athletes = [];
		return {
			total_laps: 0,
			athletes: athletes,
			start_time: 0,
			started: false,
			distance: "5000m"
		};
    },
	
	startRace: function() {
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
	},
	
	// When an athlete is clicked subtract from their lap count and move them to the bottom of the queue.
	lapCompleted: function(i) {
		var athletes = this.state.athletes.slice();
		var athlete = athletes.splice(i, 1)[0];
		athlete.laps -= 1;
		athlete.splits.push((new Date().getTime()) - athlete.start_time);
		athlete.start_time = new Date().getTime();
		athletes.push(athlete);
		this.setState({athletes: athletes});

		console.log('Person ' + this.state.athletes[i].n +" will have "+this.state.athletes[i].laps+" laps.");
	},

	getLeader: function() {
		if (this.state.started) {
			var min = this.state.athletes[0].laps;
			var min_id = 0; // index of athlete with lowest laps so far;
			var n = this.state.athletes.length;
			for (var i=1; i<n; i++) { // looping from left to right will guarentee that we get the FIRST person with the lowest laps.
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
			return this.state.athletes.reduce(function(min, athlete) {
				return (athlete.laps < min ? athlete.laps : min);
			}, this.state.total_laps);
		} else {
			return this.state.total_laps;
		}
	},
	
	setLaps : function(laps) {
		this.setState({total_laps: laps});
	},
	
	createAthlete: function(hip, name) {
		// NEED TO VALIDATE UNIQUENESS OF HIP NUMBER
		var athlete = {
			hip_number: hip,
			name: name,
			splits: [],
			laps: this.state.total_laps
		};
		var athletes = this.state.athletes.slice();
		athletes.push(athlete);
		this.setState({athletes: athletes});
	},
	
	render: function() {
		var form;
		if (this.state.total_laps === 0) { // not yet set
			form = <LapsForm setLaps={this.setLaps} />;
		} else if (! this.state.started) {
			form = <AthleteForm createAthlete={this.createAthlete} />;
		}
		
		return (
			<div>
				<StatusBar
					startRace={this.startRace}
					started={this.state.started}
					start_time={this.state.start_time}
					distance={this.state.distance}
					laps_remaining={this.leaderLaps()}
				/>
				{form}
				<List
					started={this.state.started}
					total_laps={this.state.total_laps}
					leader={this.getLeader()}
					athletes={this.state.athletes}
					lapCompleted={this.lapCompleted}
				/>
			</div>
		);
	}
});

React.render(
  <LapCounter />, document.getElementById('app')
);