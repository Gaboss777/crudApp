//import librerias
import React from 'react'; 
import { FormControl, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types'

const SearchData = ({criteria, setCriteria}) => {
    return (
        <InputGroup className='mb-2'>
            <InputGroup.Prepend className='bg-warning rounded-left text-uppercase'>
                <InputGroup.Text className='text-white px-2 font-weight-bold'>Buscador</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type='text' placeholder='Buscando...' value={criteria} onChange={({target}) => setCriteria(target.value)} />
        </InputGroup>
    )
}

SearchData.propTypes = {
    criteria: PropTypes.string,
    setCriteria: PropTypes.func
}

export default SearchData;
