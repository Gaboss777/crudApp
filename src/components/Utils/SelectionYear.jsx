import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { selectedYear } from '../../ducks/datesReducer'
import { useEffect } from 'react'

const SelectionYear = ({ selectedYear, year, ...rest }) => {

    useEffect(() => {
        if(year) {
            selectedYear("")
        }
    }, [])

    const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026']

    return (
        <InputGroup>
            <InputGroup.Prepend className='text-uppercase'>
                <InputGroup.Text className='text-white font-weight-bold bg-warning border border-warning'>AÑO</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as='select' className='border border-warning rounded-right' onChange={({target}) => selectedYear(target.value)} {...rest} >
                <option value='' selected disabled>Elija</option>
                {years.map(year =>
                    <option value={year}>{year}</option>
                )}
            </FormControl>
        </InputGroup>
    )
}


const MSTP = state => (
    {
        year: state.dates.year
    }
)

const MDTP = dispatch => (
    {
        selectedYear: (data) => dispatch(selectedYear(data))
    }
)

export default connect(MSTP, MDTP)(SelectionYear)