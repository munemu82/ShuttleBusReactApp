import React from 'react';
import { shallow } from 'enzyme';
import { BookingsSummary } from '../../components/BookingsSummary';

test('Should correctly render bookings summary with one booking', () => {
    const wrapper = shallow(<BookingsSummary bookingCount={1} bookingsTotal={85.88} />)
    expect(wrapper).toMatchSnapshot();
});

test('Should correctly render bookings summary with multiple bookings', () => {
    const wrapper = shallow(<BookingsSummary bookingCount={23} bookingsTotal={1100.88} />)
    expect(wrapper).toMatchSnapshot();
});