
import React, { Fragment } from 'react';
import Calendar from './components/Calendar';
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
