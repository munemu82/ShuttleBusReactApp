import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">WestX Shuttlebus</h1>
      <p>Login to make or access your bookings.</p> 
             <button className="btn btn-secondary btn-lg btn-block"  onClick={startLogin}> Login with Google</button>
             <button className="btn btn-secondary btn-lg btn-block"> Login with Facebook</button>
   
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
  });
  
export default connect(undefined, mapDispatchToProps)(LoginPage);