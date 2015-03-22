var LapsForm = React.createClass({displayName: "LapsForm",
	handleSubmit: function(e) {
		e.preventDefault();
		
		var laps = this.refs.lap_input.getDOMNode().value.trim();
		this.props.setLaps(parseInt(laps));
	},
	
	render: function() {
		return (
			React.createElement("form", {onSubmit: this.handleSubmit}, 
				React.createElement("label", {htmlFor: "lap-input"}, "Set Laps:"), 
				React.createElement("input", {id: "lap-input", ref: "lap_input", type: "number"}), 
				React.createElement("input", {type: "submit", value: "Submit"})
			)
		);
	}
});

var AthleteForm = React.createClass({displayName: "AthleteForm",
	handleSubmit: function(e) {
		e.preventDefault();
		
		var hip_number = this.refs.hip_number.getDOMNode().value.trim();
		var name = this.refs.name.getDOMNode().value.trim();
		this.props.createAthlete(hip_number, name);
		
		this.refs.hip_number.getDOMNode().value = "";
		this.refs.name.getDOMNode().value = "";
		this.refs.hip_number.getDOMNode().focus();
	},
	render: function() {
		return (
			React.createElement("form", {onSubmit: this.handleSubmit}, 
				React.createElement("h2", null, "Add Athlete"), 
				React.createElement("label", {htmlFor: "hip-number"}, "Hip Number:"), 
				React.createElement("input", {id: "hip-number", ref: "hip_number", type: "number"}), 
				React.createElement("label", {htmlFor: "name"}, "Name:"), 
				React.createElement("input", {id: "name", ref: "name", type: "text"}), 
				React.createElement("input", {type: "submit", value: "Submit"})
			)
		);
	}
});