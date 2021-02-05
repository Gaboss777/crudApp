import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { selectedMonth } from '../../ducks/datesReducer'
import { useEffect } from 'react'

const SelectionYear = ({ selectedMonth, month, ...rest}) => {

    useEffect(() => {
        if(month) {
            selectedMonth("")
        }
    }, [])

    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]

    return (
        <InputGroup>
            <InputGroup.Prepend className='rounded-left text-uppercase'>
                <InputGroup.Text className='text-white font-weight-bold bg-warning border border-warning'>MES</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as='select' className='border border-warning rounded-right' onChange={({target}) => selectedMonth(target.value)} {...rest} >
                <option value='' selected disabled>Elija</option>
                {months.map(y =>
                    <option value={y.id}>{y.name.toUpperCase()}</option>
                )}
            </FormControl>
        </InputGroup>
    )
}


const MSTP = state => (
    {
        month: state.dates.month
    }
)

const MDTP = dispatch => (
    {
        selectedMonth: (data) => dispatch(selectedMonth(data))
    }
)

export default connect(MSTP, MDTP)(SelectionYear)