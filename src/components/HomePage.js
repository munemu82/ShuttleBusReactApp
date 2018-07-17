import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => (
  <div className="homePage-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">WestX Shuttlebus</h1>
      <p>Our Services and offers.</p> 
             <button className="btn btn-secondary btn-lg btn-block"> Book a Ride</button>
             <button className="btn btn-secondary btn-lg btn-block"> Become a driver</button>
    </div>
  </div>
);

export default HomePage;
