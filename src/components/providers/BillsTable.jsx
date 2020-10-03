import React, { useState } from 'react';
import { Tab, Table, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';

const BillTable = ({ bills }) => {

    const [key, setKey] = useState('enero')

    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]


    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className='mt-2 tab-payment' >
            {months.map(month => (
                <Tab eventKey={month.id} title={month.name}>
                    <Table className='mt-3' size='sm'>
                        <thead className='bg-warning text-white text-center text-uppercase'>
                            <tr>
                                <th>PROVEEDOR</th>
                                <th># FACTURA</th>
                                <th>MONTO</th>
                                <th>FECHA</th>
                                <th>COMENTARIOS</th>
                            </tr>
                        </thead>
                        <tbody>
                        { bills.length > 0 ?
                        <>
                            {bills.map(bill => (
                                <tr>
                                    <th>{bill.provider}</th>
                                    <th>{bill.billNumber}</th>
                                    <th>{bill.amount}</th>
                                    <th>{bill.date}</th>
                                    <th>{bill.comment}</th>
                                </tr>
                            )
                            )}
                        </> : <tr><td colSpan={5} className='text-center'>NO HAY PAGOS REALIZADOS</td></tr>
                        }
                        </tbody>
                    </Table>
                </Tab>
            ))}
        </Tabs>
    )
}

const MSTP = state => (
    {
        bills: state.providers.bills
    }
)

export default connect(MSTP, null)(BillTable)