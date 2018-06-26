import React from 'react';
import Form, { Button, ControlLabel, FormControl    } from 'react-bootstrap';

const SingleInput = (props) => (
	<div>
		<ControlLabel>{props.title}</ControlLabel>
		<FormControl
			name={props.name}
			type={props.inputType}
			value={props.content}
			onChange={props.controlFunc}
			placeholder={props.placeholder} 
		/>
	</div>
);

/* SingleInput.propTypes = {
	inputType: React.PropTypes.oneOf(['text', 'number']).isRequired,
	title: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	controlFunc: React.PropTypes.func.isRequired,
	content: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number,
	]).isRequired,
	placeholder: React.PropTypes.string,
}; */

export default SingleInput;