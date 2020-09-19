//import librerias
import React from 'react'; 
import { FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

const SearchData = ({criteria,setCriteria}) => {

  
    return (
        <InputGroup className='my-2'>
            <InputGroup.Prepend className='bg-warning rounded-left text-uppercase'>
                <InputGroup.Text className='text-white px-2 font-weight-bold'>Buscador</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type='text' placeholder='Buscando...' value={criteria} onChange={({ target }) => setCriteria(target.value)} />
        </InputGroup>
    )
}

const MDTP = dispatch => (
    {
        
    }
)

export default connect(null, MDTP)(SearchData);
