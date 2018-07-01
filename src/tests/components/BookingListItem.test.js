import React from 'react';
import { shallow } from 'enzyme';
import BookingListItem from '../../components/BookingListItem';
import bookings from '../fixtures/bookings';

test('Should render BookingListItem correctly', () =>{
    const wrapper = shallow(<BookingListItem {...bookings[0]} />);
    expect(wrapper).toMatchSnapshot();
});