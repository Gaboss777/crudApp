import React, {useState} from 'react';
import { Navbar, Nav, Button, Form, InputGroup } from 'react-bootstrap';

export const MenuCrud =({Buscar, handleOpen})=> {
    
    const initialForm = ''
    const [find, setFind] = useState(initialForm)

    const onChangefindData = e => {
        const data = e.target.value
        setFind(data)
    }

    const handleSubmit =(e)=> {
        e.preventDefault()

        Buscar(find)
        setFind(initialForm)

    }

    return(
    <Navbar expand="lg" bg='primary' variant='dark' >
        <Navbar.Brand href="#home">PROYECTO CRUD</Navbar.Brand>
        <Nav className='mr-auto'>
            <Button variant='secondary' className='my-3' onClick={handleOpen} >Nuevo Usuario</Button>
        </Nav>
        <Form className='w-25' onSubmit={handleSubmit} inline >
            <Form.Group>
                <InputGroup >
                    <Form.Control 
                        type='text' 
                        placeholder='Buscar datos' 
                        value={find} 
                        onChange={onChangefindData} 
                        required 
                        className='my-auto'/>
                    <InputGroup.Append >
                        <Button variant='secondary' type='submit'>Buscar</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Form>
    </Navbar>
    )
}