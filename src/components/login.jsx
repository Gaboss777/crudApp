import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Container fluid className='login-container'>
            <Row className='justify-content-center'>
                <Col sm lg={4} className='p-5 login-form '>
                    <Form>
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
                                <Button variant='primary' >Login</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login