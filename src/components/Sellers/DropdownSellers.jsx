import React, { useEffect, useState } from 'react'
import { InputGroup, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const DropdownSellers = ({list, selected, sellUserSelected}) => {
    const [selection] = useState('')
    const [newList, setNewList] = useState('')

    useEffect(() => {
        const names = list.map(x => {return {name: x.firstname+' '+x.secondname+' '+x.lastname+' '+x.secondsurname, id: x.id}} )
        setNewList(names)
        if(selected) {
            handlerSelection(selection)
        }
    },[list])

    const handlerSelection = (selection) => {
        sellUserSelected(selection)
    }

    return (
        <Row>
            <Col>
                <InputGroup>
                    <InputGroup.Prepend className='bg-warning rounded-left text-uppercase' >
                        <InputGroup.Text className='text-white px-2 font-weight-bold' >VENDEDOR</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Typeahead id='sellers-list' defaultSelected={selection} labelKey='name' options={newList} onChange={( selected )=>handlerSelection(selected)} placeholder='Elija un vendedor' clearButton />
                </InputGroup>
            </Col>
        </Row>
    )
}

export default DropdownSellers