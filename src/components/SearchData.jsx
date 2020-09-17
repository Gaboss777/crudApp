//import librerias
import React, { Fragment } from 'react'; 
import { Col, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { searchData, getUserList } from '../ducks/users';

const SearchData = ({criteria,setCriteria}) => {

  
    return (
        <Fragment>
        <Form >
            <Form.Group as={Row} >
                <Form.Label column sm lg={1} >Buscador: </Form.Label>
                <Col sm lg={3} >
                    <Form.Control type='text' value={criteria} onChange={({ target }) => setCriteria(target.value)} />
                </Col>
            </Form.Group>
        </Form>
        </Fragment>
    )
}

const MDTP = dispatch => (
    {
        
    }
)

export default connect(null, MDTP)(SearchData);
