import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { login } from '../../../ducks/authReducer'
import { connect } from 'react-redux'
import Logo from '../../../img/Logo 3.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlockAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons'

const LoginScreen = ({login}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [valid, setValid] = useState(false)

    const onSubmit =(e)=>{
        e.preventDefault()
        let form = e.currentTarget
        if(form.checkValidity() === false){
            e.stopPropagation()
        } else {
            login(username, password)
        }
        setValid(true)
    }

    return (
        <Container fluid className='login-container'>
            <Row className='justify-content-center'>
                <Col sm lg={4} className='py-3 px-3 login-form '>
                    <Row>
                        <Col sm lg={12} className='text-center'>
                            <img src={Logo} width='250' height='80' />
                        </Col>
                        <Col sm lg={12}>
                            <h4 className='text-center font-weight-bold my-3'>COBRANZA LOGIN</h4>
                        </Col>
                    </Row>
                    <Form onSubmit={onSubmit} noValidate validate={valid} >
                        <Form.Row>
                            <Col sm lg={8} className='mx-auto'>
                                <Form.Label htmlFor='usuarioInline' srOnly>
                                    Usuario
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend >
                                        <InputGroup.Text className='bg-warning border border-warning text-white px-3'><FontAwesomeIcon icon={faUserAlt} /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control required type='text' value={username} onChange={({target}) => setUsername(target.value)} id='usuarioInline' placeholder='Usuario' className='border border-warning rounded-right' />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <Form.Row className='mt-2'>
                            <Col sm lg={8} className='mx-auto'>
                                <Form.Label htmlFor='passwordInline' srOnly>
                                    Clave
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text className='bg-warning border border-warning text-white px-3'><FontAwesomeIcon icon={faUnlockAlt} /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control required type='password' value={password} onChange={({target}) => setPassword(target.value)} id='passwordInline' placeholder='Clave' className='border border-warning rounded-right' />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <Row>
                            <Col className='text-center'>
                                <Button variant='primary' type='submit' className='mt-3 rounded' >ACCEDER</Button>
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
        login: (username, password) =>  dispatch(login(username, password))
    }
)

export default connect(null, MDTP)(LoginScreen)