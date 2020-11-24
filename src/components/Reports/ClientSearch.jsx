import React, { useEffect, useState } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getUserList } from '../../ducks/users'
import Alerts from '../Alerts/alerts'

const Clientsearch = ({list, getUsersList, createReport}) => {

    useEffect(() => {
        getUsersList()
    }, [])

    const [client, setClient] = useState('')
    const [location, setLocation] = useState('')
    const [mensuality, setMensuality] = useState('')
    const [services, setServices] = useState('')
    const [status, setStatus] = useState('')
    const [bandwidth, setBandwidth] = useState('')
    const [report, setReport] = useState('')

    const filtroLocations = [...new Set(list.map(x => x.location))]
    const filtroBandwidth = [...new Set(list.map(x => x.bandwidth))]
    const filtroServices = [...new Set(list.map(x => x.service))]
    const filtroStatus = [...new Set(list.map(x => x.status))]

    const handleSubmit =(e)=>{
        e.preventDefault()
        createReport(report)
    }


    const resetForm = () => {
        setClient('')
        setLocation('')
        setMensuality('')
        setBandwidth('')
        setServices('')
        setStatus('')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} sm lg={4}>
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control as='select' value={client} onChange={({target}) => setClient(target.value)}>
                        <option value='' selected>Elija</option>
                        <option value='All'>Todos</option>
                        {list.sort((a, b) => a.name > b.name ? 1 : -1).map(user =>
                            <option value={user.name}>{user.name}</option>
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label>Ubicacion</Form.Label>
                    <Form.Control as='select' value={location} onChange={({target}) => setLocation(target.value)}  >
                        <option value='' selected>Elija</option>
                        <option value='All'>Todos</option>
                        {filtroLocations.sort((a, b) => a > b ? 1 : -1).map(location =>
                            <option value={location}>{location}</option>
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm lg={1}>
                    <Form.Label>Bandwidth</Form.Label>
                    <Form.Control as='select' value={bandwidth} onChange={({target}) => setBandwidth(target.value)}>
                        <option value='' selected>Elija</option>
                        <option value='All'>Todos</option>
                        {filtroBandwidth.sort((a, b) => a - b).map(mb => 
                            <option value={mb}>{mb === '' ? 'N/A' : mb}</option>
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm lg={2}>
                    <Form.Label>Servicios</Form.Label>
                    <Form.Control as='select' value={services} onChange={({target}) => setServices(target.value)} >
                        <option value='' selected>Elija</option>
                        <option value='All'>Todos</option>
                        {filtroServices.sort((a,b) => a > b ? 1 : -1).map(service => 
                            <option value={service}>{service}</option>
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm lg={2}>
                    <Form.Label>Status</Form.Label>
                    <Form.Control as='select' value={status} onChange={({target}) => setStatus(target.value)} >
                        <option value='' selected>Elija</option>
                        <option value='All'>Todos</option>
                        {filtroStatus.sort((a,b) => a > b ? 1 : -1).map(status => 
                            <option value={status}>{status}</option>
                        )}
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Row>
                <Col className='text-center'>
                    <Button variant='success' className='mr-2' type='submit' size='sm'>Buscar</Button>
                    <Button variant='danger' onClick={resetForm} size='sm'>Reiniciar</Button>
                </Col>
            </Row>
        </Form>
    )
}

const MSTP = state => (
    {
        list: state.users.list
    }
)

const MDTP = dispatch => (
    {
        getUsersList: () => dispatch(getUserList())
    }
)

export default connect(MSTP, MDTP)(Clientsearch)