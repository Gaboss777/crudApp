import React, {useState} from 'react'
import { Button, Modal, Tab, Table, Tabs, Row, Col } from 'react-bootstrap';
import SelectionYear from '../../Utils/SelectionYear';
import PaymentForm from './Forms/PaymentForm';
import moment from 'moment';
import { toast } from 'react-toastify';
import DeleteAlert from '../../Utils/Alerts/DeleteAlert'
import Permission from '../../Layouts/Permission';

const InfoPayment = ({user, role, salaries, year, removeSalaries, createPayment }) => {

    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]

    const [show, setShow] = useState(false)
    const initialMonth = months[0]
    const [key, setKey] = useState(initialMonth.id)

    const completeName = user.firstname.toUpperCase()+' '+user.secondname.toUpperCase()+' '+user.lastname.toUpperCase()+' '+user.secondsurname.toUpperCase()

    const handleDelete = (data) => {
        toast(<DeleteAlert action={() => removeSalaries(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
    }

    return (
    <>
        <Button variant='dark' onClick={() => setShow(true)} size='sm' >Ver Pagos</Button>
        <Modal show={show} size='lg' onHide={() => setShow(false)} dialogClassName='modal-xlg'>
            <Modal.Header closeButton className='bg-dark'>
                <Modal.Title className='text-center w-100 text-white' >PAGOS DE {completeName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm lg='2'>
                        <SelectionYear />
                    </Col>
                    <Permission
                        role={role}
                        perform='salaries:create'
                        yes={() =>
                            <Col sm lg={2}>
                                <PaymentForm isModal={true} user={user} year={year} months={months} createPayment={createPayment} />
                            </Col>
                        }
                    />
                </Row>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)} className='nav-fill mt-2 tab-payment border-bottom border-dark' >
                {months.map(m =>
                    <Tab eventKey={m.id} title={m.name} className='mb-2'>
                        <Table className='mt-2'>
                            <thead className='bg-dark text-white'>
                                <tr>
                                    <th>FECHA</th>
                                    <th>CONCEPTO</th>
                                    <th>MONTO</th>
                                    <th>MONEDA</th>
                                    <th>METODO</th>
                                    <th>BANCO</th>
                                    <th>REFERENCIA</th>
                                    <th>ACCION</th>
                                </tr>
                            </thead>
                            <tbody>
                            { salaries.length > 0 ?
                            <>
                                { salaries.filter(x => x.period === m.id+'-'+year && x.employie_id === user.id).map(s => 
                                    <tr>
                                        <td>{moment(s.date, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                                        <td>{s.concept}</td>
                                        <td>{new Intl.NumberFormat().format(s.amount)}</td>
                                        <td>{s.currency}</td>
                                        <td>{s.method}</td>
                                        <td>{s.bank}</td>
                                        <td>{s.reference}</td>
                                        <td>
                                            <Permission 
                                                role={role}
                                                perform='salaries:remove'
                                                yes={() =>
                                                    <Button variant='danger' onClick={() => handleDelete(s.id)}  size='sm'>Eliminar</Button>
                                                }
                                            />
                                        </td>
                                    </tr>
                                )}
                            </>
                                : <tr><td colSpan={8} className='text-center'>NO HAY PAGOS REALIZADOS</td></tr>
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


export default InfoPayment