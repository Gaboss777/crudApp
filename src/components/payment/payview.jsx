
import React, { Fragment } from 'react';
import Calendar from './components/calendar';
import DropdownClient from './components/client-list';

const PayView = () => {
    return (
        <Fragment>
            <DropdownClient />
            <Calendar />
        </Fragment>
    )
}


export default PayView;
