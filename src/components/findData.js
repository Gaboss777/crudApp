import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

export const EncontrarDatos = ({findDatas, find, setFind}) =>{
    
    const onChangefindData = e => {
        const data = e.target.value
        setFind(data)
    }
    
    return (
        <Form className='w-25'>
            <Form.Group>
                <InputGroup >
                <Form.Control type='text' placeholder='Dato a buscar' value={find} onChange={onChangefindData} />
                    <InputGroup.Append >
                        <Button variant='info' onClick={findDatas} >Buscar</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Form>
    )
}