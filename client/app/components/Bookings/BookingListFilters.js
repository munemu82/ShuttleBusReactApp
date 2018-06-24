import React from 'react';
import { connect } from 'react-redux';
import { setClientNameFilter, sortByPickUpDate, sortByBookingPrice } from '../../actions/filters';
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const BookingListFilters = (props) => (
    <div> 
        <div className="form-row">
            <div className="col">
                <input type="text"
                    className="form-control" 
                    value={props.filters.clientName} 
                    onChange={(e) =>{
                        props.dispatch(setClientNameFilter(e.target.value));
                    }}
                />
            </div>
            <div className="col">
                <select 
                    className="form-control form-control-lg"
                    value={props.filters.sortBy} 
                    onChange={ (e) => {
                        if(e.target.value === 'pickupDate'){
                            props.dispatch(sortByPickUpDate());
                        }else if(e.target.value === 'tripPrice'){
                            props.dispatch(sortByBookingPrice());
                        }

                }}> 
                <option value="pickupDate"> Pickup Date </option>
                <option value="tripPrice"> Trip Price </option>
                </select>  
        </div>
        </div>
    </div>
);
const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};
export default connect(mapStateToProps)(BookingListFilters);