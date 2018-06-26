import React from 'react';
import { LINK } from 'react-router-dom';

const Footer = () => (
    <footer className="footer">
        <div className="footerContent">
        <div className="row">
            <div className="col-md-4">
                <strong>Contact Us:</strong>
                <br />
                Office full Address
                <br />
                <span className="glyphicon glyphicon-phone"> 1300-WEST-X-SOUTHWEST</span>
                <br />
                (Actual phone number)
                <br />
                Fax number
                <br />
                Email:westx-southwest@gmail.com
            </div>
            <div className="col-md-4">
             <strong> Keep in touch with us </strong> < br />
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-twitter"></a>
            <a href="#" className="fa fa-google"></a>
            <a href="#" className="fa fa-linkedin"></a>
            <a href="#" className="fa fa-youtube"></a>
            </div> 
            <div className="col-md-4">
            &copy; 2018 WEST X SOUTHWEST. All Rights Reserved.<br /><a href="https://www.westxsouthwest.com.au/privacy" title="Privacy Policy">Privacy Policy</a><br />
			<a href="https://www.westxsouthwest.com.au/terms-and-conditions" title="Terms and Conditions">Terms and Conditions</a><br />
            </div>
            </div>
        </div>
    </footer>
);

export default Footer;