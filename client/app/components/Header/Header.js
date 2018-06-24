import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => (
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
    <div>
      <ul className="headerNav">
       <li><NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink></li>
       <li><NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink></li>
       <li><NavLink to="/makebooking" activeClassName="is-active">Book a Ride</NavLink></li>
       <li><NavLink to="/partners" activeClassName="is-active">Partners</NavLink></li>
       <li><NavLink to="/aboutUs" activeClassName="is-active">About Us</NavLink></li>
       <li><NavLink to="/contactUs" activeClassName="is-active">Contact Us</NavLink></li>
     </ul>
   </div>
 </header>
);
export default Header;
