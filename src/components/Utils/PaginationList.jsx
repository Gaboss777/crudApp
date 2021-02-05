import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Pagination, Row, Dropdown } from 'react-bootstrap';
import ReactPaginate from 'react-paginate'

export const BtnPagination = ({setUsersPerPage, usersPerPage, list}) => {
    return (
        <Dropdown onSelect={(k) => setUsersPerPage(k)} >
            <Dropdown.Toggle variant='dark' id='drop-basic' className='cerecom-bg-dark my-1 rounded'>
                {usersPerPage == list.length ? 'TODOS' : usersPerPage}
            </Dropdown.Toggle>
            <Dropdown.Menu className='border border-dark' >
                <Dropdown.Item eventKey={15}>15 Registros</Dropdown.Item>
                <Dropdown.Item eventKey={25}>25 Registros</Dropdown.Item>
                <Dropdown.Item eventKey={50}>50 Registros</Dropdown.Item>
                <Dropdown.Item eventKey={100}>100 Registros</Dropdown.Item>
                <Dropdown.Item eventKey={list.length} disabled={list.length === 0 ? true : false} >TODOS</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

const PaginationList = ({ usersPerPage, list, setUsersPerPage, setCurrentPage }) => {

    const pageCount = Math.ceil(list.length / usersPerPage)

    const handlePageChange = ({ selected: selectedPage}) => {
        setCurrentPage(selectedPage + 1)
    }

    return (
        <Container fluid >
            <Row className='float-right'>
                <Col sm lg={4}>
                    <ReactPaginate
                        previousLabel={<FontAwesomeIcon icon={faArrowAltCircleLeft} />}
                        nextLabel={<FontAwesomeIcon icon={faArrowAltCircleRight}  />}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={1}
                        containerClassName={'pagination-cerecom pagination my-1'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        activeClassName={'active'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        initialPage={0}
                        disableInitialCallback={true}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default PaginationList