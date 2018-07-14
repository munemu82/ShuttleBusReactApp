import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const DriverRoute = ({
    driverEmail,
    component: Component,
    ...rest //this is to say allow the rest of the props other than ones specified 
}) => (
    <Route {...rest} component={(props) => (
        driverEmail ? (
            <Component {...props} />
        ): (
            <Redirect to="/login" />
        )
    )}/>
);

const mapStateToProps = (state) =>({
    driverEmail: !!state.driver[0].driverEmail
});

export default connect(mapStateToProps)(DriverRoute);