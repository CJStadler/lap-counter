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