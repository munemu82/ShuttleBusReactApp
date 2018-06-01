import React from 'react';
import moment from 'moment';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Form, { Button, ControlLabel, FormControl    } from 'react-bootstrap';


const AddressInputFieldFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
        <div className="autocomplete-root">
        <FormControl
            type="text"
            {...getInputProps({
              placeholder: 'enter valid address'
          })} />
          <div className="autocomplete-dropdown-container">
            {suggestions.map(suggestion => (
              <div {...getSuggestionItemProps(suggestion)}>
                <span>{suggestion.description}</span>
              </div>  
            ))}
          </div>
        </div>
);
export const extractLatLongFromAddress = (address) => {
  geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error))
};
export default AddressInputFieldFunc;

export const SingleInputField = (props) => (
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

export const CheckboxOrRadioGroup = (props) => (
	<div>
		<label className="form-label">{props.title}</label>
		<div className="checkbox-group">
			{props.options.map(option => {
				return (
					<label key={option} className="form-label capitalize">
						<input
							className="form-checkbox"
							name={props.setName}
							onChange={props.controlFunc}
							value={option}
							checked={props.selectedOptions.indexOf(option) > -1}
							type={props.type} /> {option}
					</label>
				);
			})}
		</div>
	</div>
);


