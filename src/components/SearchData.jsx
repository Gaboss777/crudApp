//import librerias
import React from 'react'; 
import { FormControl, InputGroup } from 'react-bootstrap';

const SearchData = ({criteria,setCriteria}) => {
    return (
        <InputGroup className='mb-2'>
            <InputGroup.Prepend className='bg-warning rounded-left text-uppercase'>
                <InputGroup.Text className='text-white px-2 font-weight-bold'>Buscador</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type='text' placeholder='Buscando...' value={criteria} onChange={({ target }) => setCriteria(target.value)} />
        </InputGroup>
    )
}

export default SearchData;
