//import librerias
import React, { useState } from 'react';
import { Container, Row, Col, FormControl, Form, Badge, Button, Card, Modal, Table } from 'react-bootstrap'; 
import { connect } from 'react-redux';

const Month = ({title}) => {
    return (
        <Card border='warning'>
            <Card.Body className='px-0 pt-0'>
                <Card.Title className='bg-warning py-2 text-white text-uppercase text-center'>{title}</Card.Title>
                <Card.Text className='p-3'>
                    <p>PAGO: <Badge variant='warning'>Pendiente</Badge></p>
                    <p>Fecha: ---- </p>
                </Card.Text>
                <Col className='text-center'>
                    <InfoModal title={title} />
                </Col>
            </Card.Body>
        </Card>
    )
}

const InfoModal = ({title}) => {

    const [showModal, setShowModal] = useState(false)

    const payment = [
        {
            date: "2020/01/10",
            amount: "20000",
            method: "Transferencia Bancaria",
            currency: "USD",
            bank: "BANK OF AMERICA",
            reference: "254653216544321",
            status: true,
            coment: "Non enim consequat duis dolore aute. Duis eiusmod ullamco Lorem commodo. Officia nostrud et anim commodo mollit magna quis. Minim fugiat mollit minim tempor ea officia est velit."
        },{
            date: "2020/01/10",
            amount: "20000",
            method: "Transferencia Bancaria",
            currency: "BS",
            bank: "Banco Mercantil",
            reference: "64654654865",
            status: true,
            coment: "Non enim consequat duis dolore aute. Duis eiusmod ullamco Lorem commodo. Officia nostrud et anim commodo mollit magna quis. Minim fugiat mollit minim tempor ea officia est velit."
        },{
            date: "2020/01/10",
            amount: "20000",
            method: "Zelle",
            currency: "USD",
            bank: "NO",
            reference: "NO",
            status: true,
            coment: "Non enim consequat duis dolore aute. Duis eiusmod ullamco Lorem commodo. Officia nostrud et anim commodo mollit magna quis. Minim fugiat mollit minim tempor ea officia est velit."
        }
    ]

    return (
        <>
            <Button variant='dark' onClick={() => setShowModal(true)} size='sm' >Ver Mas</Button>
            <Modal show={showModal} onHide={()=> setShowModal(false)}  className='left' dialogClassName='modal-xlg' >
                <Modal.Header closeButton className='bg-warning' >
                    <Modal.Title className='text-uppercase'>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Table >
                        <thead>
                            <tr>
                                <th>FECHA</th>
                                <th>MONTO</th>
                                <th>METODO</th>
                                <th>BANCO</th>
                                <th># REFERENCIA</th>
                                <th>STATUS</th>
                                <th>COMENTARIOS</th>
                            </tr>
                        </thead>
                        <tbody>
                            { payment.map(pay => 
                                <tr>
                                    <td>{pay.date}</td>
                                    <td>{pay.amount}</td>
                                    <td>{pay.method}</td>
                                    <td>{pay.bank}</td>
                                    <td>{pay.reference}</td>
                                    <td><Badge variant={pay.status ? 'success' : 'danger'} >{ pay.status ? "CANCELADO" : "PENDIENTE"}</Badge></td>
                                    <td>{pay.coment}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => setShowModal(false)} size='sm' >CERRAR</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


//crear componente
const Calendar = ({client}) => {

    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

    return (
        <Container fluid >
            <h3 className='text-center mt-3'>HISTORIAL DE PAGO</h3>
            { client &&
            <>
                <Form.Group as={Row}>
                    <Form.Label column sm={1}>Ano: </Form.Label>
                    <Col sm={2} >
                        <FormControl as='select' >
                            <option value='' selected >Elija un Ano</option>
                            <option value='2020'>2020</option>
                            <option value='2019'>2019</option>
                            <option value='2018'>2018</option>
                            <option value='2017'>2017</option>
                            <option value='2016'>2016</option>
                        </FormControl>
                    </Col>
                </Form.Group>
                <Row>
                    { months.map(month =>
                    <Col sm={3} className='px-1 my-2'  >
                        <Month title={month} />
                    </Col>
                    )}
                </Row>
            </>
            }
        </Container>
    )}

const MSTP = state => (
    {
        list: state.users.list,
        client: state.payment.client
    }
)

export default connect(MSTP, null)(Calendar);
