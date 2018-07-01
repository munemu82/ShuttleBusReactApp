import React from 'react';
import { shallow } from 'enzyme';
import { BookingsList } from '../../components/BookingsList';
import bookings from '../fixtures/bookings';

test('Should render BookingsList with bookings', () =>{
    const wrapper = shallow(<BookingsList bookings={bookings} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render BookingsList with empty message', () =>{
    const wrapper = shallow(<BookingsList bookings={[]} />);
    expect(wrapper).toMatchSnapshot();
});

