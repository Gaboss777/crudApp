import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { login } from '../../ducks/authReducer'
import { connect } from 'react-redux'
import Logo from '../../img/Logo 3.png'

const LoginScreen = ({login}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit =(e)=>{
        e.preventDefault()
        login(username, password)
    }

    return (
        <Container fluid className='login-container'>
            <Row className='justify-content-center'>
                <Col sm lg={4} className='p-5 login-form '>
                    <Row>
                        <Col sm lg={12} className='text-center'>
                            <img src={Logo} width='250' height='80' />
                        </Col>
                    </Row>
                    <Form onSubmit={onSubmit}>
                        <Form.Group as={Row} controlId='email'>
                            <Form.Label column sm lg={4}>Usuario</Form.Label>
                            <Col sm lg={8}>
                                <Form.Control type='text' value={username} onChange={({target}) => setUsername(target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='password'>
                            <Form.Label column sm lg={4}>Contrasena</Form.Label>
                            <Col sm lg={8}>
                                <Form.Control type='text' value={password} onChange={({target}) => setPassword(target.value)} />
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col className='text-center'>
                                <Button variant='primary' type='submit' >Login</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

const MDTP = dispatch => (
    {
        login: (email, password) =>  dispatch(login(email, password))
    }
)

export default connect(null, MDTP)(LoginScreen)