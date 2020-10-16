import React from 'react';
import { Col, Container, Pagination, Row, Dropdown } from 'react-bootstrap';

const PaginationList = ({ usersPerPage, totalUsers, paginate, currentPage, list, setUsersPerPage }) => {
    const pageNumbers = []
    for(let i=1; i <= Math.ceil(totalUsers / usersPerPage ); i++){
        pageNumbers.push(i)
    }

    return (
        <Container fluid>
            <Row>
                <Col sm lg={1}>
                    <Dropdown onSelect={(k) => setUsersPerPage(k)}>
                        <Dropdown.Toggle variant='dark' id='drop-basic'>
                            {usersPerPage}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='border border-dark' >
                            <Dropdown.Item eventKey={10}>10</Dropdown.Item>
                            <Dropdown.Item eventKey={20}>20</Dropdown.Item>
                            <Dropdown.Item eventKey={30}>30</Dropdown.Item>
                            <Dropdown.Item eventKey={list.length}>TODOS</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col sm lg={2}>
                    <Pagination  className='pagination-cerecom mb-0 my-2' >
                        {pageNumbers.map(number => (
                            <Pagination.Item onClick={() => paginate(number)} key={number} active={number === currentPage} >
                                {number}
                            </Pagination.Item>
                            ))}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    )
}

export default PaginationList