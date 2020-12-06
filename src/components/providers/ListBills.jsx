import React, { Fragment, useState } from 'react';
import { Button, Tab, Table, Tabs } from 'react-bootstrap';
import PaymentForm from './PaymentForm';
import {toast} from 'react-toastify'
import DeleteAlert from '../Alerts/DeleteAlert'

const ListBills = ({bills, providers, year, removeBills, createBill }) => {

    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]
    const initialMonth = months[0]
    const [key, setKey] = useState(initialMonth.id)

    const handleDelete = (data) => {
        toast(<DeleteAlert action={() => removeBills(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
    }

    return (
    <Fragment>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className='nav-fill tab-payment'>
            {months.map(month => 
                <Tab eventKey={month.id} title={month.name} >
                <PaymentForm isModal={true} month={month} providers={providers} year={year} createBill={createBill} />
                    <Table className='mt-2'>
                        <thead className='bg-warning text-white'>
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
                            { bills.filter(x=>x.period === month.id+'-'+year).map(bill => 
                            {
                                let providerName = providers.filter(x => x.id === bill.provider_id).map(x => {return x.name})
                                return (
                                <tr>
                                    <td>{bill.date}</td>
                                    <td>{providerName}</td>
                                    <td>{bill.billnumber}</td>
                                    <td>{bill.amount}</td>
                                    <td>{bill.currency}</td>
                                    <td>{bill.method}</td>
                                    <td>{bill.bank}</td>
                                    <td>{bill.reference}</td>
                                    <td>{bill.comment}</td>
                                    <td><Button variant='danger' onClick={() => handleDelete(bill.id)} size='sm'>Eliminar</Button></td>
                                </tr>
                                )}
                            )}
                        </>
                            : <tr><td colSpan={8} className='text-center'>NO HAY PAGOS REGISTRADOS</td></tr>
                        }
                        </tbody>
                    </Table>
                </Tab>
            )}
        </Tabs>
    </Fragment>
    )
}

export default ListBills