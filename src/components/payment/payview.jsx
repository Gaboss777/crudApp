
import React, { Fragment } from 'react';
import Calendar from './components/calendar';
import DropdownClient from './components/DropdownClient';

const PayView = () => {
    return (
        <Fragment>
            <DropdownClient />
            <Calendar />
        </Fragment>
    )
}


export default PayView;
