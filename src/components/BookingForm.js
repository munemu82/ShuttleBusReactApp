import React from 'react';
import moment from 'moment';
import PlacesAutocomplete from 'react-places-autocomplete';
import { SingleDatePicker } from 'react-dates';
import AddressInputFieldFunc, { SingleInputField, CheckboxOrRadioGroup } from './bookingForm/bookingFormFields';
import calculateDistance, {getLatLonFromAddress, getDistanceFromLatLonInKm } from '../geocoding/locationCoding';
import { convertDateToMilliseconds, getDateFromMillisec, isAllowedBooking, getTimeFromDate } from '../utilities/manageDates';
import Form, { Button, ControlLabel, FormControl} from 'react-bootstrap';
import Request from 'superagent';
import SelectField from './bookingForm/SelectField';
import TimePicker from 'react-time-picker';
import { computeBookingFare, roundNumber } from '../utilities/bookingCalculations';
import numeral from 'numeral';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000' : 'https://westx-shuttlebus.herokuapp.com';
export default class BookingForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            clientName: props.booking ? props.booking.clientName : '',
            pickupAddress: props.booking ? props.booking.pickupAddress : '',
            destinationAddress: props.booking ? props.booking.destinationAddress : '',
            pickupDate:props.booking ? moment(props.booking.pickupDate) : moment().subtract(1, "days"),
            createdAt: 0, pickupTime:getTimeFromDate( moment().valueOf()),
            calendarFocused: false, 
            error: {clientNameError: '', pickupAddressError:'', destAddressError:'', selectedNoOfPassAdultError: ''},
            computedDistance: 0, computedDuration: 0,
            isSubmit: false,
            tripPrice: 0,
            status: 'Initialized',
            bookingData: {clientName: ''},
            bookingTimeAllowed: '', bookingStep: 'New Booking - Creation',
            noOfAdultPassenrsOptions: [],noOfChildrenPassenrsOptions: [],paymentOptions: [],
            selectedNoOfAdultsOption: '', selectedNoOfChildrenOption: '', selectedPayment: '',
            noOfHoursBeforePickup: '',
            baseBookingFare: '', farePerMinute:'', farePerKm:''
        };
        this.handlePaymentOptionSelection = this.handlePaymentOptionSelection.bind(this);
    }
    componentDidMount() {
        //fetch('./form_config.json')
        fetch(`${ROOT_URL}/form_config.json`)
			.then(res => res.json())
			.then(data => {
				this.setState({
					brandName: data.brandName,
					noOfAdultPassenrsOptions: data.noOfAdultPassenrsOptions,
                    noOfChildrenPassenrsOptions: data.noOfChildrenPassenrsOptions,
                    noOfHoursBeforePickup: data.noOfHoursBeforePickup,
                    baseBookingFare: data.baseBookingFare,
                    farePerMinute: data.farePerMinute,
                    farePerKm: data.farePerKm,
                    paymentOptions: data.paymentOptions
				});
            });
    }
    //FORM PROCESSING HANDLERS
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
        if(this.state.pickupAddress !=='' && this.state.destinationAddress!==''){
            const distanceData = calculateDistance(this.state.pickupAddress, this.state.destinationAddress);
            this.setState(() => ({computedDistance: distanceData[0]}));
            this.setState(() => ({computedDuration: distanceData[1]}));
        }
        this.setState( () => ({ calendarFocused: focused }));
    };
    handleChangePAddress = (pickupAddress) => {
        this.setState({ pickupAddress });
        let error = Object.assign({}, this.state.error);
            error.pickupAddressError = '';
            this.setState( () => ({error}));
    }
    handleChangeDAddress = (destinationAddress) => {this.setState({ destinationAddress });
        let error = Object.assign({}, this.state.error);
        error.destAddressError = '';
        this.setState( () => ({error}));
    };
    handleNoOfAdultSelect = (e) => {
        const selectedOption = e.target.value;
        this.setState({ selectedNoOfAdultsOption: selectedOption}, () => console.log('Selected No. Of passenger', this.state.selectedNoOfAdultsOption));
        let error = Object.assign({}, this.state.error);
            error.selectedNoOfPassAdultError = '';
            this.setState( () => ({error}));
    };
    handleNoOfChildrenSelect = (e) => {
        const selectedOption = e.target.value;
        this.setState({ selectedNoOfChildrenOption: selectedOption}, () => console.log('Selected No. Of passenger', this.state.selectedNoOfChildrenOption));
    };
    handlePaymentOptionSelection(e) {
        this.setState({ selectedPayment: e.target.value});
        console.log(this.state.selectedPayment);
	}
   /*  onTimeChange = pickupTime => {
        this.setState({ pickupTime });
    }  */
    onTimeChange = (pickupTime) => {
        if(pickupTime){
            this.setState(() => ({pickupTime}));
        }
    };
    //Form submission handler
    processBookingForm = (e) =>{
        e.preventDefault();
        console.log(this.props.action);
        //console.log(this.props.noOfAdultPassenrsOptions);
        let error = Object.assign({}, this.state.error);
        let bookingData = Object.assign({}, this.state.bookingData);
       console.log(isAllowedBooking(this.state.pickupDate, this.state.pickupTime, this.state.noOfHoursBeforePickup));
       console.log(this.state.pickupTime);
       if(this.state.clientName===''){
            error.clientNameError = 'Client name is a required field, please enter your details';
            this.setState( () => ({error}));
        }
        if(this.state.pickupAddress===''){
            error.pickupAddressError = 'Pickup address is a required field, please enter your details';
            this.setState( () => ({error}));
        }
        if(this.state.destinationAddress===''){
            error.destAddressError = 'Destination address is a required field, please enter your details';
            this.setState( () => ({error}));
        }
        if(this.state.selectedNoOfAdultsOption==='' && this.props.action==='Add' ){
            error.selectedNoOfPassAdultError = 'You must select at least 1 from the options list';
            this.setState( () => ({error}));
        }
        if(this.state.clientName && this.state.pickupAddress && this.state.destinationAddress 
            && this.state.selectedNoOfAdultsOption){
                this.setState( () => ({bookingData}));
                if(isAllowedBooking(this.state.pickupDate, this.state.pickupTime, this.state.noOfHoursBeforePickup)){
                    this.setState( () => ({error}));  //reset error to empty object
                    this.setState( () => ({isSubmit: true}));
                    //calculate booking trip price
                    const price = computeBookingFare(this.state.computedDistance, this.state.computedDuration, 
                        this.state.baseBookingFare, this.state.farePerMinute, this.state.farePerKm);
                    this.setState(() =>({tripPrice : price}));   
                    this.setState(() =>({bookingStep: 'New Booking - Confirmation'}));
                    console.log("Form submitted successfylly");
               }else{
                    this.setState( () => ({bookingTimeAllowed: `Booking pickup date and time must be at least ${this.state.noOfHoursBeforePickup} hours after current time`}));
               }
                
        }
    };
    onSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state.selectedPayment);
        console.log(this.state.clientName);
        this.props.onSubmit({
            clientName: this.state.clientName,
            pickupAddress: this.state.pickupAddress,
            destinationAddress: this.state.destinationAddress,
            pickupDate:this.state.pickupDate.valueOf(),
            pickupTime:this.state.pickupTime,
           // tripPrice: numeral(this.state.tripPrice).format('$0,0.00'),
            tripPrice: this.state.tripPrice,
            status: this.state.status,
            createdAt: moment().valueOf(),
            selectedNoOfAdultsOption: this.state.selectedNoOfAdultsOption
        });
        console.log('Confirmation submitted successfully!')
        console.log(this.state.selectedNoOfAdultsOption);
    }
    render(){
        return (
            <div >
                <div className="card">
                <div className="card-header">
                    <h1>{this.state.bookingStep}</h1>
                </div>
                <div className="card-body">
                   {this.state.bookingTimeAllowed && !this.state.isSubmit && <div className="alert alert-danger">{this.state.bookingTimeAllowed}</div>}
                {!this.state.isSubmit &&
                 <form id="bookingFormStep1" onSubmit={this.processBookingForm}>
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
                            onChange={this.handleChangeDAddress} >
                        {AddressInputFieldFunc}
                        </PlacesAutocomplete>
                        {this.state.error.destAddressError &&  <div className="errorMessage">{this.state.error.destAddressError}</div>}
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
                                    value={this.state.pickupTime}
                                    required={true} />
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
                                selectedOption={this.state.selectedNoOfAdultsOption} />
                                {this.state.error.selectedNoOfPassAdultError &&  <div className="errorMessage">{this.state.error.selectedNoOfPassAdultError}</div>}
                             </div>
                            <div className="col">
                            <ControlLabel>No. Of children:</ControlLabel>
                            <SelectField
                                name={'No. of children'}
                                placeholder={'Choose(1,2...5)'}
                                controlFunc={this.handleNoOfChildrenSelect}
                                options={this.state.noOfChildrenPassenrsOptions}
                                selectedOption={this.state.selectedNoOfChildrenOption} />
                        </div>
                        </div>
                        <div><button type="submit" className="btn btn-Secondary btn-lg">Submit</button> </div>
                    </form>}
                 </div>
                 {//COMFIRMATION FORM GET DISPLAYED HERE
                 }
                   {this.state.isSubmit && <div>
                   <p>Hello {this.state.clientName}, your booking is progressing well.</p></div>
                   }
                   {this.state.isSubmit && <div><p><strong>Booking fare: {numeral(this.state.tripPrice).format('$0,0.00')}</strong></p>
                   <p>To finalize your booking select your payment option below </p>
                   <form id="bookingFormStep2" onSubmit={this.onSubmit}>
                    <CheckboxOrRadioGroup
                        title={'Select Payment option:'}
                        setName={'paymentOption'}
                        type={'checkbox'}
                        controlFunc={this.handlePaymentOptionSelection}
                        options={this.state.paymentOptions}
                        selectedOptions={this.state.selectedPayment} />
                    <button type="submit" className="btn btn-Secondary btn-lg"> Confirm booking </button>
                    </form>
                   </div>
                   }
                 </div>   

            </div>
         
        )
    };
}