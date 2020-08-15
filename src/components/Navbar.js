import React, {useState} from 'react';
import { Navbar, Nav, Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
    <Navbar expand="lg" bg='dark' variant='dark' className='py-0' >
        <Navbar.Brand href="#home">PROYECTO CRUD</Navbar.Brand>
        <Nav className='mr-auto'>
            <Button variant='secondary' size='sm' className='my-3' onClick={handleOpen} >Nuevo Usuario</Button>
        </Nav>
        <Form className='w-25' onSubmit={handleSubmit} inline >
            <Form.Group>
                <InputGroup >
                    <Form.Control 
                        type='text' 
                        size='sm'
                        placeholder='Buscar datos' 
                        value={find} 
                        onChange={onChangefindData} 
                        required 
                        className='mt-2'
                        aria-label='Buscar datos'
                        aria-describedby='addon1'
                        />
                    <InputGroup.Append >
                        <Button variant='secondary' size='sm' type='submit' id='addon1' ><FontAwesomeIcon icon={faSearch} /></Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Form>
    </Navbar>
    )
}