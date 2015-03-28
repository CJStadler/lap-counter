var LapsForm = React.createClass({
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
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="lap-input">Set Laps:</label>
				<input id="lap-input" ref="lap_input" type="number" />
				<input type="submit" value="Submit" />
				<div className="error">{this.state.error}</div>
			</form>
		);
	}
});

var AthleteForm = React.createClass({
	getInitialState: function() {
		return {error: ""}
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
			<form onSubmit={this.handleSubmit}>
				<h2>Add Athlete</h2>
				<label htmlFor="hip-number">Hip Number:</label>
				<input id="hip-number" ref="hip_number" type="number" />
				<label htmlFor="name">Name:</label>
				<input id="name" ref="name" type="text" />
				<input type="submit" value="Submit" />
				<div className="error">{this.state.error}</div>
			</form>
		);
	}
});