//import librerias
import React from 'react'; 
import { FormControl, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types'

const SearchData = ({criteria, setCriteria}) => {
    return (
        <InputGroup className='mb-2'>
            <InputGroup.Prepend className='rounded-left text-uppercase'>
                <InputGroup.Text className='text-white px-2 font-weight-bold bg-warning border border-warning'>Buscador</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type='text' placeholder='Buscar...' value={criteria} onChange={({target}) => setCriteria(target.value)} className='border border-warning rounded-right' />
        </InputGroup>
    )
}

SearchData.propTypes = {
    criteria: PropTypes.string,
    setCriteria: PropTypes.func
}

export default SearchData;
