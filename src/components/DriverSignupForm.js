import React from 'react';
import { SingleInputField} from './bookingForm/bookingFormFields';
import { firebase } from '../firebase/firebase';


export default class DriverSignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            authenticatedUserEmail: '',
            name:'',
            phonenumber: '',
            error: {name: '', email:'', phonenumber:''},
            isSubmitted: false
        }
    }
    //Input handlers
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState( () => ({name}))
        let error = Object.assign({}, this.state.error);
         //Grab email from authentication user object
        firebase.auth().onAuthStateChanged((user) => {
          this.setState( () => ({authenticatedUserEmail: user.email}))
        });
        error.name = '';
        this.setState( () => ({error})); 
    };
    onPhoneChange = (e) => {
        const phonenumber = e.target.value;
        this.setState( () => ({phonenumber}))
    };
    //Form Submission handler
    onSubmit = (e) =>{
        e.preventDefault();
        let error = Object.assign({}, this.state.error);
        if(this.state.name===''){
            error.name = 'Name is a required field, please enter your name';
            this.setState( () => ({error}));
        }
        if(this.state.phonenumber===''){
            error.phonenumber = 'Phonenumber is a required field, please enter a valid phone number';
            this.setState( () => ({error}));
        }
        if(this.state.name && this.state.phonenumber){
            //if name and phone number have been specified correctly
            console.log(this.state.name);
            console.log(this.state.phonenumber);
            console.log(this.state.authenticatedUserEmail);
            this.props.onSubmit({ 
            });

        }
        
    }
    render(){
        return (
            <div >
                <div className="card">
                    <div className="card-header">
                        <h1>Driver Signup Form</h1>
                    </div>
                    <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <SingleInputField
                            inputType={'text'}
                            title={'Name'}
                            name={'Name'}
                            controlFunc={this.onNameChange}
                            content={this.state.name}
                            placeholder={'Type your name here'} 
                        />
                         {this.state.error.name &&  <div className="errorMessage">{this.state.error.name}</div>}
                        <SingleInputField
                            inputType={'text'}
                            title={'Phone Number'}
                            name={'Phone Number'}
                            controlFunc={this.onPhoneChange}
                            content={this.state.phonenumber}
                            placeholder={'Type your email here'} 
                        />
                     {this.state.error.phonenumber &&  <div className="errorMessage">{this.state.error.phonenumber}</div>}
                        
                    <div><button type="submit" className="btn btn-Secondary btn-lg">Signup</button> </div>
                    </form>
                    </div>
                </div>
            </div>
         
        )
    };

}