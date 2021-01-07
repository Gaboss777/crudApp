import React from 'react';
import { Col, Container, Pagination, Row, Dropdown } from 'react-bootstrap';
import ReactPaginate from 'react-paginate'

const PaginationList = ({ usersPerPage, list, setUsersPerPage, setCurrentPage, ...rest }) => {

    const pageCount = Math.ceil(list.length / usersPerPage)

    const handlePageChange = ({ selected: selectedPage}) => {
        setCurrentPage(selectedPage + 1)
    }

    return (
        <Container fluid className='my-2 align' >
            <Row>
                <Col sm lg={1} className='px-0 text-center mr-2'>
                    <Dropdown onSelect={(k) => setUsersPerPage(k)} >
                        <Dropdown.Toggle variant='dark' id='drop-basic'>
                            {usersPerPage == list.length ? 'TODOS' : usersPerPage}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='border border-dark' >
                            <Dropdown.Item eventKey={10}>10</Dropdown.Item>
                            <Dropdown.Item eventKey={20}>20</Dropdown.Item>
                            <Dropdown.Item eventKey={30}>30</Dropdown.Item>
                            <Dropdown.Item eventKey={list.length} disabled={list.length === 0 ? true : false} >TODOS</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col sm lg={3} className='pl-0'>
                    <ReactPaginate
                        previousLabel={'Prev'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        marginPagesDisplayed={1}
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