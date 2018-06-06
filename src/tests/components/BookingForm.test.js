import React from 'react';
import { shallow } from 'enzyme';
import BookingForm from '../../components/BookingForm';
import bookings from '../fixtures/bookings';

//REF DOCS
//http://airbnb.io/enzyme/docs/api/shallow.html

test('Should render BookingForm correctly', () =>{
    const wrapper = shallow(<BookingForm />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render BookingForm with booking data', () =>{
    const wrapper = shallow(<BookingForm bookings={bookings[1]} />);
    expect(wrapper).toMatchSnapshot();
});

//Test Booking form user interactions and event handlers
test('Should render BookingForm submission with error', () =>{
    const wrapper = shallow(<BookingForm bookings={bookings[1]} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('#bookingFormStep1').simulate('submit', {
        preventDefault : () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

//Unit test client Name input field 
test('Should set client Name on input change', () =>{
    const wrapper = shallow(<BookingForm bookings={bookings[1]} />);
    const value ='New Client Name';
    wrapper.find('input').at0.simulate('change', {
        target: { value }
    });
    expect(wrapper).toMatchSnapshot();
});

