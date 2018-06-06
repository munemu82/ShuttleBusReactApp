import React from 'react';
import Recaptcha from 'react-recaptcha';
import { SingleInputField, TextAreaField} from './bookingForm/bookingFormFields';

// site key
const sitekey = '6Lfql10UAAAAAKYuFMu-n72sEo9uyAdXq0Gh3uYt';
let captchaValue = '';
const callback = () => {
    console.log('Done!!!!');
  };
  
  const verifyCallback = (response) => {
    captchaValue = response;
    console.log(response);

  };
  const expiredCallback = () => {
    console.log(`Recaptcha expired`);
  };
  
  // define a variable to store the recaptcha instance
  let recaptchaInstance;
  
  // handle reset
  const resetRecaptcha = () => {
    recaptchaInstance.reset();
  };
export default class ContactForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            name:'',
            phonenumber: '',
            enquiry: '',
            error: {name: '', email:'', phonenumber:'', enquiry: '', captchaResponse: ''},
            isSubmitted: false
        }
    };
    //Input handlers
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState( () => ({name}))
        let error = Object.assign({}, this.state.error);
        error.name = '';
        this.setState( () => ({error})); 
    };
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState( () => ({email}))
        let error = Object.assign({}, this.state.error);
        error.email = '';
        this.setState( () => ({error})); 
    };
    onPhoneChange = (e) => {
        const phonenumber = e.target.value;
        this.setState( () => ({phonenumber}))
    };
    onEnquiryChange = (e) => {
        const enquiry = e.target.value;
        this.setState( () => ({enquiry}))
        let error = Object.assign({}, this.state.error);
        error.enquiry = '';
        this.setState( () => ({error})); 
    };
    //Form Submission handler
    onSubmit = (e) =>{
        e.preventDefault();
        let error = Object.assign({}, this.state.error);
        if(this.state.name===''){
            error.name = 'Name is a required field, please enter your name';
            this.setState( () => ({error}));
        }
        if(this.state.email===''){
            error.email = 'Email is a required field, please enter your enail';
            this.setState( () => ({error}));
        }
        if(this.state.enquiry===''){
            error.enquiry = 'Enquiry is a required field, please enter your enquiry';
            this.setState( () => ({error}));
        }
        if(captchaValue===''){
            error.captchaResponse = 'You must prove that you are not a robot!';
            this.setState( () => ({error}));
        }
        console.log(captchaValue);  // value of the verified captcha 
    }
    render(){
        return (
            <div >
                <div className="card">
                    <div className="card-header">
                        <h1>Contact Us</h1>
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
                            title={'Email'}
                            name={'Email'}
                            controlFunc={this.onEmailChange}
                            content={this.state.email}
                            placeholder={'Type your email here'} 
                        />
                        {this.state.error.email &&  <div className="errorMessage">{this.state.error.email}</div>}
                         <SingleInputField
                            inputType={'text'}
                            title={'Phone Number'}
                            name={'Phone Number'}
                            controlFunc={this.onPhoneChange}
                            content={this.state.phonenumber}
                            placeholder={'Type your email here'} 
                        />
                        <TextAreaField
                            title={'Your Enquiry'}
                            name={'Enquiry'}
                            controlFunc={this.onEnquiryChange}
                            numOfRows={5}
                            content={this.state.enquiry}
                            placeholder={'Type your enquiry here'} 
                        />
                         {this.state.error.enquiry &&  <div className="errorMessage">{this.state.error.enquiry}</div>}
                        <br />
                        <Recaptcha
                            ref={e => recaptchaInstance = e}
                            sitekey={sitekey}
                            size="normal"
                            render="explicit"
                            verifyCallback={verifyCallback}
                            onloadCallback={callback}
                            expiredCallback={expiredCallback}
                            theme="dark"
                            type="audio"
                        />
                         {this.state.error.captchaResponse &&  <div className="errorMessage">{this.state.error.captchaResponse}</div>}
                        <br/>
                    <div><button type="submit" className="btn btn-Secondary btn-lg">Submit</button> </div>
                    </form>
                    </div>
                </div>
            </div>
         
        )
    };

}