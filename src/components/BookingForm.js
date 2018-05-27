import React from 'react';
import moment from 'moment';
import PlacesAutocomplete from 'react-places-autocomplete';
import { SingleDatePicker } from 'react-dates';
import AddressInputFieldFunc, { SingleInputField } from './bookingForm/bookingFormFields';
import calculateDistance, {getLatLonFromAddress, getDistanceFromLatLonInKm } from '../geocoding/locationCoding';
import 'react-dates/lib/css/_datepicker.css';
import { convertDateToMilliseconds, getDateFromMillisec, isAllowedBooking } from '../utilities/manageDates';
import Form, { Button, ControlLabel, FormControl} from 'react-bootstrap';
import Request from 'superagent';
import SelectField from './bookingForm/SelectField';
import TimePicker from 'react-time-picker';
import { computeBookingFare, roundNumber } from '../utilities/bookingCalculations';

export default class BookingForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            clientName: props.booking ? props.booking.clientName : '',
            pickupAddress: props.booking ? props.booking.pickupAddress : '',
            destinationAddress: props.booking ? props.booking.destinationAddress : '',
            pickupDate:props.booking ? moment(props.booking.pickupDate) : moment(),
            createdAt: 0, bookingTime: '10:00',
            calendarFocused: false,
            error: {clientNameError: '', pickupAddressError:'', destAddressError:''},
            computedDistance: 0, computedDuration: 0,
            isSubmit: false,
            tripPrice: 0,
            noOfAdultPassenrsOptions: [],noOfChildrenPassenrsOptions: [],
            selectedNoOfAdultsOption: '', selectedNoOfChildrenOption: '',
            noOfHoursBeforePickup: '',
            baseBookingFare: '', farePerMinute:'', farePerKm:''
        };
    }
    componentDidMount() {
		fetch('./form_config.json')
			.then(res => res.json())
			.then(data => {
				this.setState({
					brandName: data.brandName,
					noOfAdultPassenrsOptions: data.noOfAdultPassenrsOptions,
                    noOfChildrenPassenrsOptions: data.noOfChildrenPassenrsOptions,
                    noOfHoursBeforePickup: data.noOfHoursBeforePickup,
                    baseBookingFare: data.baseBookingFare,
                    farePerMinute: data.farePerMinute,
                    farePerKm: data.farePerKm
				});
            });
	}
    onClientNameChange = (e) => {
        const clientName = e.target.value;
        this.setState( () => ({clientName}))
        let error = Object.assign({}, this.state.error);
            error.clientNameError = '';
            this.setState( () => ({error}));
    };
    onDateChange = (pickupDate) => {
        if(pickupDate){
            this.setState(() => ({pickupDate}));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState( () => ({ calendarFocused: focused }));
        if(this.state.pickupAddress !=='' && this.state.destinationAddress!==''){
            const distanceData = calculateDistance(this.state.pickupAddress, this.state.destinationAddress);
            this.setState(() => ({computedDistance: distanceData[0]}));
            this.setState(() => ({computedDuration: distanceData[1]}));
        }
    };
    handleChangePAddress = (pickupAddress) => {
        this.setState({ pickupAddress });
        let error = Object.assign({}, this.state.error);
            error.pickupAddressError = '';
            this.setState( () => ({error}));
    }
    handleChangeDAddress = (destinationAddress) => {
        this.setState({ destinationAddress });
    };
    handleNoOfAdultSelect = (e) => {
        const selectedOption = e.target.value;
        this.setState({ selectedNoOfAdultsOption: selectedOption}, () => console.log('Selected No. Of passenger', this.state.selectedNoOfAdultsOption));
    };
    
    handleNoOfChildrenSelect = (e) => {
        const selectedOption = e.target.value;
        this.setState({ selectedNoOfChildrenOption: selectedOption}, () => console.log('Selected No. Of passenger', this.state.selectedNoOfChildrenOption));
    };
    onTimeChange = bookingTime => this.setState({ bookingTime })
    //Form submission handler
    onSubmit = (e) =>{
        this.setState( () => ({isSubmit: true}));
        e.preventDefault();
        let error = Object.assign({}, this.state.error);
       console.log(isAllowedBooking(this.state.pickupDate, this.state.bookingTime, this.state.noOfHoursBeforePickup));
        if(this.state.clientName===''){
            error.clientNameError = 'Client name is a required field, please enter your details';
            this.setState( () => ({error}));
        }
        if(this.state.pickupAddress===''){
            error.pickupAddressError = 'Pickup address is a required field, please enter your details';
            this.setState( () => ({error}));
        }
        if(this.state.clientName && this.state.pickupAddress && this.state.destinationAddress){
            this.setState( () => ({error: ''}));
            this.props.onSubmit({
                clientName: this.state.clientName,
                pickupAddress: this.state.pickupAddress,
                destinationAddress: this.state.destinationAddress,
                createdAt: moment().valueOf(),
                pickupDate:this.state.pickupDate.valueOf()
            });
            const finalDateTime = convertDateToMilliseconds(this.state.pickupDate.valueOf(),'06:43:00: PM'); 
           //dateInMils + timeInMils;
            console.log(finalDateTime);
            console.log(moment(finalDateTime).format("DD MMM YYYY HH:mm:ss A"));
            console.log("Form submitted successfylly");
        }
    };
    render(){
        return (
            <div >
                <div className="card">
                <div className="card-header">
                    <h1> Create a booking </h1>
                </div>
                <div className="card-body">
                   <p>{this.state.computedDistance}</p>
                    <form onSubmit={this.onSubmit}>
                        <SingleInputField
                            inputType={'text'}
                            title={'Client Name'}
                            name={'Client Name'}
                            controlFunc={this.onClientNameChange}
                            content={this.state.clientName}
                            placeholder={'Type first and last name here'} 
                        />
                         {this.state.error.clientNameError &&  <div className="errorMessage">{this.state.error.clientNameError}</div>}
                        <br />
                        <ControlLabel>Pickup Address</ControlLabel>
                        <PlacesAutocomplete   // Using Google placess API
                            value={this.state.pickupAddress}
                            onChange={this.handleChangePAddress}
                        >
                        {AddressInputFieldFunc}
                        </PlacesAutocomplete>
                        {this.state.error.pickupAddressError &&  <div className="errorMessage">{this.state.error.pickupAddressError}</div>}
                        <ControlLabel>Destination Address</ControlLabel>
                        <PlacesAutocomplete   // Using Google placess API
                            value={this.state.destinationAddress}
                            onChange={this.handleChangeDAddress}
                        >
                        {AddressInputFieldFunc}
                        </PlacesAutocomplete>
                        <br />
                        <div className="form-row">
                            <div className="col">
                            <ControlLabel>Pickup Date</ControlLabel>  <br />
                            <SingleDatePicker
                                date={this.state.pickupDate}
                                onDateChange={this.onDateChange}
                                focused={this.state.calendarFocused}
                                onFocusChange={this.onFocusChange}
                                numberOfMonths={1}
                            // isOutsideRange={ () => false}  we want to allow user to choose dates in the past
                            />
                            </div>
                            <div className="col">
                            <ControlLabel>Pickup Time</ControlLabel>  <br />
                                <TimePicker
                                    onChange={this.onTimeChange}
                                    value={this.state.bookingTime}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col">
                            <ControlLabel>No. Of Adult Passengers:</ControlLabel>
                            <SelectField
                                className='form-control'
                                name={'No. of Adult Passenger'}
                                placeholder={'Choose(1,2...5)'}
                                controlFunc={this.handleNoOfAdultSelect}
                                options={this.state.noOfAdultPassenrsOptions}
                                selectedOption={this.state.selectedNoOfAdultsOption} 
                            />
                            </div>
                            <div className="col">
                            <ControlLabel>No. Of children:</ControlLabel>
                            <SelectField
                                name={'No. of children'}
                                placeholder={'Choose(1,2...5)'}
                                controlFunc={this.handleNoOfChildrenSelect}
                                options={this.state.noOfChildrenPassenrsOptions}
                                selectedOption={this.state.selectedNoOfChildrenOption} 
                            />
                            </div>
                        </div>
                        <br />
                        <div>
                        <button type="submit" className="btn btn-Secondary btn-lg">Submit</button>
                        </div>
                    </form>
                 </div>
                    <p>Test</p>
                 </div>   

            </div>
         
        )
    };
}