import React from 'react';
import DriverSignupForm from './DriverSignupForm';

export default class DriverSignupPage extends React.Component { 

onSubmit = (driver) => {
  //this.props.startAddBooking(booking);
  this.props.history.push('/dashboard'); 
};
render(){
  return (
    <div className="content">
      <hr />
      <DriverSignupForm 
        onSubmit = {this.onSubmit}
      />
    </div>
  );
}
}
