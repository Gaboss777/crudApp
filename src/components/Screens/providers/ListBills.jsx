import React, { Fragment, useState } from 'react';
import { Button, Tab, Table, Tabs } from 'react-bootstrap';
import {toast} from 'react-toastify'
import ConfirmAlert from '../../Utils/Alerts/ConfirmAlert'
import Permission from '../../Layouts/Permission';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ListBills = ({bills, providers, user, year, removeBills, createBill, month }) => {

    const handleDelete = (data) => {
        toast(<ConfirmAlert title='Desea eliminar los datos?' action={() => removeBills(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
    }

    return (
    <Fragment>
        <Table size='sm' responsive striped bordered className='mt-2 text-center'>
            <thead className='cerecom-bg-dark text-white'>
                <tr>
                    <th>FECHA</th>
                    <th>PROVEEDOR</th>
                    <th>FACTURA</th>
                    <th>MONTO</th>
                    <th>MONEDA</th>
                    <th>METODO</th>
                    <th>BANCO</th>
                    <th>REFERENCIA</th>
                    <th>COMENTARIO</th>
                    <th>ACCION</th>
                </tr>
            </thead>
            <tbody>
            {bills.length > 0 ?
            <>
                { bills.filter(x=>x.period === month+'-'+year).map(bill => 
                {
                    let providerName = providers.filter(x => x.id === bill.provider_id).map(x => {return x.name})
                    return (
                    <tr className='font-cerecom-sm'>
                        <td>{bill.date}</td>
                        <td>{providerName}</td>
                        <td>{bill.billnumber}</td>
                        <td>{new Intl.NumberFormat("es-VE").format(bill.amount)}</td>
                        <td>{bill.currency}</td>
                        <td>{bill.method}</td>
                        <td>{bill.bank}</td>
                        <td>{bill.reference}</td>
                        <td>{bill.comment}</td>
                        <td>
                        <Permission 
                            role={user.role}
                            perform='providers:remove'
                            yes={
                                <Button variant='danger' onClick={() => handleDelete(bill.id)} size='sm'><FontAwesomeIcon icon={faTrash} /></Button>
                            }
                        />
                        </td>
                    </tr>
                    )}
                )}
            </>
                : <tr><td colSpan={8} className='text-center'>NO HAY PAGOS REGISTRADOS</td></tr>
            }
            </tbody>
        </Table>
    </Fragment>
    )
}

export default ListBills