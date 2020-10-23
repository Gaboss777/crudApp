import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

const OcupationList = ({ocupations}) => {

    const [show, setShow] = useState(false)

    return(
        <>
            <Button variant='primary' onClick={() => setShow(true)} className='my-2'>CARGOS</Button>
            <Modal show={show} onHide={() => setShow(false)} >
                <Modal.Header closeButton className='bg-primary' >
                    <Modal.Title className='text-center w-100 text-white' >LISTA DE CARGOS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead className='bg-primary text-white text-center'>
                            <tr>
                                <th>ID</th>
                                <th>CARGO</th>
                                <th>AREA</th>
                                <th>GERENCIA</th>
                            </tr>
                        </thead>
                        <tbody>
                        {ocupations.map(ocu =>
                            <tr className='text-center'>
                                <td>{ocu.id}</td>
                                <td>{ocu.name}</td>
                                <td>{ocu.area}</td>
                                <td>{ocu.gerency}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}

const MSTP = state => (
    {
        ocupations: state.rrhh.ocupations
    }
)

export default connect(MSTP, null)(OcupationList)