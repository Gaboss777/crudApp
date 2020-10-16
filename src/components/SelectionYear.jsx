import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { selectedYear } from '../ducks/dates'

const SelectionYear = ({ selectedYear }) => {
    const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026']

    return (
        <InputGroup>
            <InputGroup.Prepend className='bg-warning rounded-left text-uppercase'>
                <InputGroup.Text className='text-white px-2 font-weight-bold'>ANO</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as='select' onChange={({target}) => selectedYear(target.value)}>
                <option value='' selected disabled>Seleccione..</option>
                {years.map(y =>
                    <option value={y}>{y}</option>
                )}
            </FormControl>
        </InputGroup>
    )
}

const MDTP = dispatch => (
    {
        selectedYear: (data) => dispatch(selectedYear(data))
    }
)

export default connect(null, MDTP)(SelectionYear)