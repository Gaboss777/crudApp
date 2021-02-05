import React from 'react'
import {Row, Col, InputGroup} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';

const DropdownList = ({text, data, action, labelKey, placeholder}) => {
    return (
        <Row>
            <Col>
                <InputGroup>
                    <InputGroup.Prepend className='rounded-left text-uppercase' >
                        <InputGroup.Text className='text-white px-2 font-weight-bold bg-warning border border-warning' >{text}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Typeahead id='sellers-list' defaultSelected='' labelKey={labelKey} options={data} onChange={action} placeholder={placeholder} clearButton className='form-shadow border border-warning rounded-right' />
                </InputGroup>
            </Col>
        </Row>
    )
}

export default DropdownList