import React from 'react';
import DriverSignupForm from './DriverSignupForm';
import { connect } from 'react-redux';
import { startSignupDriver } from '../actions/drivers';

export class DriverSignupPage extends React.Component { 

onSubmit = (driver) => {
  this.props.startSignupDriver(driver);
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

const mapDispatchToProps = (dispatch) => ({
  startSignupDriver: (driver) => dispatch(startSignupDriver(driver))
});

export default connect(undefined, mapDispatchToProps)(DriverSignupPage); //this connect to the drivers store and save the driver record
