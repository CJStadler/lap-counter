(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// imports
var List = require('./list.js'),
	StatusBar = require('./status_bar.js'),
	forms = require('./form.js'),
	AthleteForm = forms.athlete_form,
	LapsForm = forms.laps_form;

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
	
var test_data = [
    {hip_number: 1, name: "Cheadle"},
    {hip_number: 2, name: "Regan"},
    {hip_number: 3, name: "Loeb"},
    {hip_number: 4, name: "Meehan"},
    {hip_number: 5, name: "Riffenburgh"},
];

var previous_states = [];

var LapCounter = React.createClass({displayName: "LapCounter",
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
				return "Finished";
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
			form = React.createElement(LapsForm, {setLaps: this.setLaps, error: this.state.error});
		} else if (! this.state.started) {
			form = React.createElement(AthleteForm, {createAthlete: this.createAthlete, hipNotUnique: this.hipNotUnique});
		}
		
		return (
			React.createElement("div", null, 
				React.createElement(StatusBar, {
					startRace: this.startRace, 
					started: this.state.started, 
					start_time: this.state.start_time, 
					distance: this.state.distance, 
					laps_remaining: this.leaderLaps(), 
					undo: this.restorePreviousState}
				), 
				form, 
				React.createElement(List, {
					started: this.state.started, 
					total_laps: this.state.total_laps, 
					leader: this.getLeader(), 
					athletes: this.state.athletes, 
					lapCompleted: this.lapCompleted}
				)
			)
		);
	}
});

React.render(
  React.createElement(LapCounter, null), document.getElementById('app')
);
},{"./form.js":3,"./list.js":4,"./status_bar.js":5}],2:[function(require,module,exports){
var Timer = require('./timer.js');

var Athlete = React.createClass({displayName: "Athlete",
    render: function() {
        var classes = "athlete";
        if (this.props.athlete.laps == 1) {
            classes += " bell";
        } else if (this.props.athlete.laps < 1) {
            classes += " finished";
        }
		if (this.props.leader) {
			classes += " leader";
		}
        return (
            React.createElement("div", {onClick: this.props.lapCompleted.bind(this, this.props.i), className: classes}, 
                React.createElement("div", {className: "info"}, this.props.athlete.hip_number, ". ", this.props.athlete.name), 
				React.createElement(Timer, {started: this.props.started, start_time: this.props.start_time}), 
                React.createElement("div", {className: "laps"}, "To Go: ", this.props.athlete.laps)
            )
        );
    }
});

module.exports = Athlete;

},{"./timer.js":6}],3:[function(require,module,exports){
var LapsForm = React.createClass({displayName: "LapsForm",
	getInitialState: function() {
		return {error: ""}
	},
	
	handleSubmit: function(e) {
		e.preventDefault();
		var laps = this.refs.lap_input.getDOMNode().value.trim();
		if (laps.length == 0) {
			this.setState({error: "Laps must be entered"});
		} else {
			this.setState({error: ""});
			this.props.setLaps(parseInt(laps));
		}
	},
	
	render: function() {
		return (
			React.createElement("form", {onSubmit: this.handleSubmit}, 
				React.createElement("label", {htmlFor: "lap-input"}, "Set Laps:"), 
				React.createElement("input", {id: "lap-input", ref: "lap_input", type: "number"}), 
				React.createElement("input", {type: "submit", value: "Submit"}), 
				React.createElement("div", {className: "error"}, this.state.error)
			)
		);
	}
});

var AthleteForm = React.createClass({displayName: "AthleteForm",
	getInitialState: function() {
		return {error: ""}
	},
	
	componentDidMount: function() {
		this.refs.hip_number.getDOMNode().focus();
	},
	
	handleSubmit: function(e) {
		e.preventDefault();
		
		var hip_number = this.refs.hip_number.getDOMNode().value.trim();
		var name = this.refs.name.getDOMNode().value.trim();
		
		// validations
		if (name.length == 0) {
			this.setState({error: "Name must be entered"});
			this.refs.name.getDOMNode().focus();
		} else if (hip_number.length == 0) {
			this.setState({error: "Hip number must be entered"});
			this.refs.hip_number.getDOMNode().focus();
		} else if (this.props.hipNotUnique(hip_number)) {
			this.setState({error: "Hip number must be unique"});
			this.refs.hip_number.getDOMNode().focus();
		} else {
			// VALID, create athlete
			this.setState({error: ""});
			this.props.createAthlete(hip_number, name);
		
			this.refs.hip_number.getDOMNode().value = "";
			this.refs.name.getDOMNode().value = "";
			this.refs.hip_number.getDOMNode().focus();
		}
		
		
	},
	
	render: function() {
		return (
			React.createElement("form", {onSubmit: this.handleSubmit}, 
				React.createElement("h2", null, "Add Athlete"), 
				React.createElement("label", {htmlFor: "hip-number"}, "Hip Number:"), 
				React.createElement("input", {id: "hip-number", ref: "hip_number", type: "number"}), 
				React.createElement("label", {htmlFor: "name"}, "Name:"), 
				React.createElement("input", {id: "name", ref: "name", type: "text"}), 
				React.createElement("input", {type: "submit", value: "Submit"}), 
				React.createElement("div", {className: "error"}, this.state.error)
			)
		);
	}
});

module.exports = {laps_form: LapsForm, athlete_form: AthleteForm};
},{}],4:[function(require,module,exports){
var Athlete = require('./athlete.js');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var List = React.createClass({displayName: "List",
 
  render: function() {
    return (
      React.createElement(ReactCSSTransitionGroup, {transitionName: "queue"}, 
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
				
            return React.createElement(Athlete, {started: this.props.started, athlete: athlete, leader: leader, key: athlete.hip_number+" "+laps, start_time: athlete.start_time, lapCompleted: this.props.lapCompleted, i: i});
        }.bind(this))
      )
    );
  }
});

module.exports = List;

},{"./athlete.js":2}],5:[function(require,module,exports){
var Timer = require('./timer.js');

/*
 * Displays total distance, time, and leader's laps remaining at the top of the screen.
 */
var StatusBar = React.createClass({displayName: "StatusBar",
	render: function() {
		var timer;
		if (this.props.started) { // show timer
			timer = React.createElement(Timer, {started: this.props.started, start_time: this.props.start_time})
		} else { // show start button
			timer = React.createElement("div", {id: "start-button", onClick: this.props.startRace}, "START")
		}
		return (
			React.createElement("div", {id: "status-bar"}, 
				React.createElement("div", {className: "info", id: "undo", onClick: this.props.undo}, "Undo"), 
				timer, 
				React.createElement("div", {className: "laps"}, "Laps: ", this.props.laps_remaining)
			)
		);
	}
});

module.exports = StatusBar;
},{"./timer.js":6}],6:[function(require,module,exports){
var Timer = React.createClass({displayName: "Timer",
	getInitialState: function() {
		return {
			elapsed: 0
		};
	},
	getElapsed: function() {
		var elapsed = new Date().getTime() - this.props.start_time
		return Math.floor(elapsed / 1000);
	},
	tick: function() {
		if (this.props.started) {
			this.setState({elapsed: this.getElapsed()});
		} else if (this.state.elapsed != 0) {
			this.setState({elapsed: 0});
		}
	},
	componentDidMount: function() {
		// rerender every 100ms
		this.interval = setInterval(this.tick, 100);
	},
	componentWillUnmount: function() {
		clearInterval(this.interval);
	},
	formatTime: function(seconds) {
		var formatted;
		// if less than a minute just show seconds, else show M:SS
		var minutes = Math.floor(seconds/60);
		if (minutes > 0) {
			var seconds = seconds%60;
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			formatted = minutes + ":" + seconds;
		} else {
			formatted = seconds + "";
		}
		return formatted
	},
	render: function() {
		return (
			React.createElement("div", {className: "timer"}, this.formatTime(this.state.elapsed))
		);
	}
});

module.exports = Timer;

},{}]},{},[1]);
