import React, {useState} from 'react'
import { Button, FormControl, InputGroup, Modal, Tab, Table, Tabs, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import SelectionYear from '../SelectionYear';
import PaymentForm from './Forms/PaymentForm';

const InfoPayment = ({user, payment, year }) => {

    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]

    const [show, setShow] = useState(false)
    const initialMonth = months[0]
    const [key, setKey] = useState(initialMonth.id)

    const completeName = user.firstName.toUpperCase()+' '+user.secondName.toUpperCase()+' '+user.lastName.toUpperCase()+' '+user.secondSurname.toUpperCase()

    return (
    <>
        <Button variant='dark' onClick={() => setShow(true)} size='sm' >Ver Pagos</Button>
        <Modal show={show} size='lg' onHide={() => setShow(false)} centered dialogClassName='modal-xlg'>
            <Modal.Header closeButton className='bg-dark'>
                <Modal.Title className='text-center w-100 text-white' >PAGOS DE {completeName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm lg='2'>
                        {/* <InputGroup>
                            <InputGroup.Prepend className='bg-warning rounded-left text-uppercase'>
                                <InputGroup.Text className='text-white px-2 font-weight-bold'>ANO</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as='select' value={year} onChange={({target}) => setYear(target.value)}>
                                {years.map(y =>
                                    <option value={y}>{y}</option>
                                )}
                            </FormControl>
                        </InputGroup> */}
                        <SelectionYear />
                    </Col>
                    <Col sm lg={2}>
                        <PaymentForm isModal={true} user={user} year={year} months={months} />
                    </Col>
                </Row>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)} className='nav-fill mt-2 tab-payment border-bottom border-dark' >
                {months.map(m =>
                    <Tab eventKey={m.id} title={m.name} className='mb-2'>
                        <Table>
                            <thead className='bg-dark text-white'>
                                <tr>
                                    <th>FECHA</th>
                                    <th>CONCEPTO</th>
                                    <th>MONTO</th>
                                    <th>MONEDA</th>
                                    <th>METODO</th>
                                    <th>BANCO</th>
                                    <th>REFERENCIA</th>
                                </tr>
                            </thead>
                            <tbody>
                            { payment.length > 0 ?
                            <>
                                { payment.filter(x => x.period === m.id+'-'+year).map(pay => 
                                    <tr>
                                        <td>{pay.date}</td>
                                        <td>{pay.concept}</td>
                                        <td>{pay.amount}</td>
                                        <td>{pay.currency}</td>
                                        <td>{pay.method}</td>
                                        <td>{pay.bank}</td>
                                        <td>{pay.reference}</td>
                                    </tr>
                                )}
                            </>
                                : <tr><td colSpan={7} className='text-center'>NO HAY PAGOS REALIZADOS</td></tr>
                            }
                            </tbody>
                        </Table>
                    </Tab>
                )}
                </Tabs>
            </Modal.Body>
        </Modal>
    </>
    )
}

const MSTP = state => (
    {
        payment: state.rrhh.payment,
        year: state.dates.year
    }
)

export default connect(MSTP, null)(InfoPayment)