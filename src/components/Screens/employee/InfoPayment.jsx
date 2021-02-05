import React, {useState} from 'react'
import { Button, Modal, Table, Row, Col } from 'react-bootstrap';
import SelectionYear from '../../Utils/SelectionYear';
import PaymentForm from './Forms/PaymentForm';
import moment from 'moment';
import { toast } from 'react-toastify';
import ConfirmAlert from '../../Utils/Alerts/ConfirmAlert'
import Permission from '../../Layouts/Permission';
import SelectionMonth from 'components/Utils/SelectionMonth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const InfoPayment = ({user, role, salaries, year, month, removeSalaries, createPayment }) => {

    const [show, setShow] = useState(false)

    const completeName = user.firstname.toUpperCase()+' '+user.secondname.toUpperCase()+' '+user.lastname.toUpperCase()+' '+user.secondsurname.toUpperCase()

    const handleDelete = (data) => {
        toast(<ConfirmAlert title='Desea eliminar los datos?' action={() => removeSalaries(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
    }

    return (
    <>
        <Button variant='dark' onClick={() => setShow(true)} size='sm' ><FontAwesomeIcon icon={faInfoCircle} /></Button>
        <Modal show={show} size='lg' onHide={() => setShow(false)} dialogClassName='modal-xlg'>
            <Modal.Header closeButton className='bg-dark'>
                <Modal.Title className='text-center w-100 text-white font-weight-bold' >PAGOS DE {completeName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm lg='2'>
                        <SelectionYear />
                    </Col>
                    <Col sm lg={3}>
                        <SelectionMonth disabled={year ? false : true} />
                    </Col>
                    <Permission
                        role={role}
                        perform='employies:create'
                        yes={
                            <Col sm lg={2}>
                                <PaymentForm isModal={true} user={user} year={year} month={month} createPayment={createPayment} />
                            </Col>
                        }
                    />
                </Row>
                <Table className='mt-2 text-center' size='sm' striped bordered responsive >
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
                        { salaries.filter(x => x.period === month+'-'+year && x.employie_id === user.id).map(s => 
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
                                        perform='employies:remove'
                                        yes={
                                            <Button variant='danger' onClick={() => handleDelete(s.id)}  size='sm'><FontAwesomeIcon icon={faTrash} /></Button>
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
            </Modal.Body>
        </Modal>
    </>
    )
}


export default InfoPayment