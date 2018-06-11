import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <div className="content">
    <div className="card">
        <div className="card-header">
            <h1>Login to access your bookings</h1>
        </div>
        <div className="card-body">
            <div className="centered"> 
             <button className="btn btn-secondary btn-lg btn-block"  onClick={startLogin}> Login </button>
            </div>
        </div>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
  });
  
export default connect(undefined, mapDispatchToProps)(LoginPage);