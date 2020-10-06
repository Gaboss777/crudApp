//import librerias
import React, { Fragment } from 'react';
import ListBills from './ListBills';

//crear componente
const ProviderView = () => {
    return (
        <Fragment >
            <h3 className='text-center my-3'>PAGOS PROVEEDORES</h3>
            <ListBills />
        </Fragment>
    )
}

export default ProviderView;
