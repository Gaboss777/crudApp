//import librerias
import React, { Fragment } from 'react';
import BillsTable from './BillsTable';
import PaymentForm from './PaymentForm';

//crear componente
const ProviderView = () => {
    return (
        <Fragment >
            <h3 className='text-center my-3'>TABLA DE PAGOS</h3>
            <PaymentForm isModal={true} />
            <BillsTable />
        </Fragment>
    )
}

export default ProviderView;
