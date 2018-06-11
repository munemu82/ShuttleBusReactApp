import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';
import { startLogout } from '../actions/auth';

let isAuthenticated = false;
let authenticatedUserEmail ='';

firebase.auth().onAuthStateChanged((user) => {
  if(user){
    isAuthenticated = true;
    authenticatedUserEmail = user.email;
  }else{
    isAuthenticated = false;
  }
});
//export const Header = ({startLogout}) => (
export const Header = () => (
  <header>
    <div className="topArea">
    <div className="row">
        <div className="col-md-4">  
          <img src="./images/logo.jpg" className="logoImg" />
        </div>
        <div className="col-md-4"><h1> Powering safe efficient travel </h1></div>
        <div className="col-md-4">
        <br />
        <a href="#" className="fa fa-facebook"></a>
        <a href="#" className="fa fa-twitter"></a>
        <a href="#" className="fa fa-google"></a>
        <a href="#" className="fa fa-linkedin"></a>
        <a href="#" className="fa fa-youtube"></a>
        <span className="glyphicon glyphicon-phone"> 1300-WEST-X-SOUTHWEST</span>
        </div>
      </div>
    </div>
      <div className="alignRight">
      {!isAuthenticated &&
        <Link to={'/login'} className="btn btn-secondary btn-lg" >
            Login
        </Link> 
      }
      {isAuthenticated && <p>Hi {authenticatedUserEmail} <button className="btn btn-warning btn-lg" onClick={startLogout}> Logout</button> </p>}
    </div>
    <div>
      <ul className="headerNav">
       <li><NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink></li>
       <li><NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink></li>
       <li><NavLink to="/create" activeClassName="is-active">Book a Ride</NavLink></li>
       <li><NavLink to="/partners" activeClassName="is-active">Partners</NavLink></li>
       <li><NavLink to="/aboutUs" activeClassName="is-active">About Us</NavLink></li>
       <li><NavLink to="/contactUs" activeClassName="is-active">Contact Us</NavLink></li>
     </ul>
   </div>
 </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
