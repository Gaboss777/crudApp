import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationList = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = []
    for(let i=1; i <= Math.ceil(totalUsers / usersPerPage ); i++){
        pageNumbers.push(i)
    }

    return (
        <Pagination  className='pagination-cerecom mb-0 my-2' >
            {pageNumbers.map(number => (
                <Pagination.Item onClick={() => paginate(number)} key={number} active={number === currentPage} >
                    {number}
                </Pagination.Item>
                ))}
        </Pagination>
    )
}

export default PaginationList